import {
  TextractClient,
  AnalyzeDocumentCommand,
  AnalyzeDocumentCommandInput,
  Block,
} from "@aws-sdk/client-textract";

interface ReceiptItem {
  name: string;
  price: string;
  quantity?: string;
  type?: string;
}

interface ReceiptData {
  items: ReceiptItem[];
  total: string | null;
  date: string | null;
  merchantName: string | null;
  rawBlocks?: any; // For debugging
}

class TextractService {
  private client: TextractClient;

  constructor() {
    console.log('Initializing Textract service with region:', process.env.AWS_REGION);
    
    // Validate AWS credentials
    if (!process.env.AWS_REGION || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      throw new Error('Missing AWS credentials. Please check your environment variables.');
    }
    
    this.client = new TextractClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  /**
   * Analyze a receipt image using Amazon Textract
   * @param imageBuffer - The receipt image as a Buffer
   * @returns Processed receipt data
   */
  async analyzeReceipt(imageBuffer: Buffer): Promise<ReceiptData> {
    try {
      console.log('Analyzing receipt with buffer size:', imageBuffer.length);
      
      const params: AnalyzeDocumentCommandInput = {
        Document: {
          Bytes: imageBuffer,
        },
        FeatureTypes: ["TABLES", "LAYOUT", "QUERIES"],
        QueriesConfig: {
          Queries: [
            { Text: "What is the total amount?" },
            { Text: "What is the store name?" },
            { Text: "What is the date?" },
            { Text: "What items were purchased?" },
            { Text: "What are the quantities of each item?" },
            { Text: "What are the prices of each item?" }
          ]
        }
      };

      console.log('Sending request to Textract with params:', JSON.stringify(params, null, 2));
      const command = new AnalyzeDocumentCommand(params);
      const response = await this.client.send(command);
      console.log('Received response from Textract');

      // Log the raw response for debugging
      console.log('Raw Textract response:', JSON.stringify(response, null, 2));

      return this.processReceiptResponse(response);
    } catch (error) {
      console.error('Error analyzing receipt:', error);
      throw error;
    }
  }

  /**
   * Process the raw Textract response into structured receipt data
   * @param response - Raw Textract response
   * @returns Structured receipt data
   */
  private processReceiptResponse(response: any): ReceiptData {
    const blocks = response.Blocks || [];
    console.log(`Processing ${blocks.length} blocks from Textract`);

    const receiptData: ReceiptData = {
      items: [],
      total: null,
      date: null,
      merchantName: null,
      rawBlocks: blocks
    };

    // First pass: collect all items and their prices
    const itemOccurrences = new Map<string, { count: number; price: string; type: string }>();
    
    // Find store name first - it's usually in the first few lines
    const lines = blocks
      .filter((block: Block) => block.BlockType === 'LINE')
      .map((block: Block) => this.getTextFromBlock(block, blocks));

    // Look for common store names in first few lines
    const storeNames = ['WALMART', 'TRADER', 'GIANT', 'SAFEWAY', 'TARGET', 'COSTCO'];
    for (let i = 0; i < Math.min(5, lines.length); i++) {
      const line = lines[i].toUpperCase();
      const foundStore = storeNames.find(store => line.includes(store));
      if (foundStore) {
        receiptData.merchantName = line;
        break;
      }
    }

    // If no store found, use first non-empty line that's not a URL
    if (!receiptData.merchantName && lines.length > 0) {
      const firstLine = lines[0].trim();
      if (firstLine && !firstLine.includes('http') && !firstLine.includes('www')) {
        receiptData.merchantName = firstLine;
      }
    }

    // Find tables in the blocks
    const tables = blocks.filter((block: Block) => block.BlockType === 'TABLE');
    console.log(`Found ${tables.length} tables`);

    tables.forEach((table: Block, tableIndex: number) => {
      console.log(`\nProcessing Table ${tableIndex}`);
      
      const cells = blocks.filter((block: Block) => 
        block.BlockType === 'CELL' && 
        block.RowIndex !== undefined &&
        block.ColumnIndex !== undefined &&
        block.Id &&
        table.Relationships?.some(r => r.Type === 'CHILD' && r.Ids?.includes(block.Id))
      );

      console.log(`Found ${cells.length} cells in table ${tableIndex}`);

      const rows = new Map<number, Block[]>();
      cells.forEach((cell: Block) => {
        const rowIndex = cell.RowIndex || 0;
        if (!rows.has(rowIndex)) {
          rows.set(rowIndex, []);
        }
        const rowCells = rows.get(rowIndex);
        if (rowCells) {
          rowCells.push(cell);
        }
      });

      console.log(`Grouped into ${rows.size} rows`);

      rows.forEach((rowCells, rowIndex) => {
        rowCells.sort((a, b) => (a.ColumnIndex || 0) - (b.ColumnIndex || 0));
        const rowTexts = rowCells.map(cell => this.getTextFromBlock(cell, blocks));
        console.log(`Row ${rowIndex} texts:`, rowTexts);

        if (rowIndex === 0 || rowTexts.every(text => !text)) {
          console.log(`Skipping row ${rowIndex} (header or empty)`);
          return;
        }

        if (rowTexts.length >= 3) {
          const [name, code, priceInfo] = rowTexts;
          
          // Skip non-item rows
          if (name && 
              !name.toLowerCase().includes('total') &&
              !name.toLowerCase().includes('tax') &&
              !name.toLowerCase().includes('subtotal')) {
            
            // Match price and sale type (X for each, T for by weight)
            const priceMatch = priceInfo.match(/(\d+\.\d{2})\s*([XT])/);
            if (priceMatch) {
              const [_, price, saleType] = priceMatch;
              const itemName = name.trim();
              
              // Update item count and price
              if (itemOccurrences.has(itemName)) {
                const item = itemOccurrences.get(itemName)!;
                item.count++;
              } else {
                itemOccurrences.set(itemName, {
                  count: 1,
                  price,
                  type: saleType === 'T' ? 'by weight' : 'each'
                });
              }
            }
          }
        }
      });
    });

    // Convert grouped items to final format using Array.from() to avoid iteration issues
    Array.from(itemOccurrences.entries()).forEach(([name, info]) => {
      receiptData.items.push({
        name,
        price: info.price,
        quantity: info.type === 'by weight' ? 'by weight' : info.count.toString()
      });
      console.log(`Added item: ${name} - $${info.price} (Quantity: ${info.type === 'by weight' ? 'by weight' : info.count})`);
    });

    // Find total
    for (let i = 0; i < lines.length; i++) {
      if (lines[i] === 'TOTAL' && i + 1 < lines.length) {
        const nextLine = lines[i + 1];
        if (/^\d+\.\d{2}$/.test(nextLine)) {
          receiptData.total = nextLine;
          break;
        }
      }
    }

    // Find date (format: MM/DD/YY)
    const dateLine = lines.find((line: string) => /^\d{2}\/\d{2}\/\d{2}$/.test(line));
    if (dateLine) {
      receiptData.date = dateLine;
    }

    console.log('Final processed receipt data:', {
      merchantName: receiptData.merchantName,
      total: receiptData.total,
      date: receiptData.date,
      itemCount: receiptData.items.length,
      items: receiptData.items
    });

    return receiptData;
  }

  private extractPrice(text: string): string | null {
    const match = text.match(/\$?\s*\d+\.\d{2}/);
    return match ? match[0].replace(/\s+/g, '') : null;
  }

  private looksLikePrice(text: string): boolean {
    return /^\$?\s*\d+\.\d{2}$/.test(text.trim()) || 
           /^\d+\.\d{2}\$?$/.test(text.trim());
  }

  /**
   * Get text from a block using its relationships
   */
  private getTextFromBlock(block: Block, allBlocks: Block[] = []): string {
    if (block.Text) return block.Text;

    // Get text from child relationships
    const words = block.Relationships
      ?.filter(r => r.Type === 'CHILD')
      .flatMap(r => r.Ids || [])
      .map(id => allBlocks.find(b => b.Id === id))
      .filter(b => b?.BlockType === 'WORD')
      .map(b => b?.Text || '')
      .join(' ') || '';

    return words.trim();
  }
}

export const textractService = new TextractService(); 