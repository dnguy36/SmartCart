import { useState } from "react";
import { Upload, Camera, RefreshCw, CheckCircle, Store, DollarSign, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ReceiptData {
  items: Array<{
    name: string;
    price: string;
    quantity?: string;
  }>;
  total: string | null;
  date: string | null;
  merchantName: string | null;
}

export default function Scanner() {
  const [activeTab, setActiveTab] = useState("upload");
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [receiptHistory, setReceiptHistory] = useState<Array<{
    data: ReceiptData;
    image: string;
    timestamp: Date;
  }>>([]);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select an image under 5MB.",
        variant: "destructive"
      });
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File Type",
        description: "Please select an image file.",
        variant: "destructive"
      });
      return;
    }

    await processReceipt(file);
  };

  const handleCameraCapture = () => {
    // In a real implementation, this would access the device camera
    toast({
      title: "Camera Feature",
      description: "Camera capture will be implemented soon.",
    });
  };

  const processReceipt = async (file: File) => {
    setIsScanning(true);
    setScanProgress(0);
    setReceiptData(null);
    
    try {
      // Create form data
      const formData = new FormData();
      formData.append('receipt', file);

      // Start progress animation
      const progressInterval = setInterval(() => {
        setScanProgress(prev => Math.min(prev + 10, 90));
      }, 500);

      // Get auth token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }

      // Send to our Textract endpoint
      const response = await fetch('/api/receipts/scan', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Receipt scanning failed:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText
        });
        throw new Error('Failed to process receipt');
      }

      const data = await response.json();
      console.log('Textract Response:', data);
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to process receipt');
      }

      setReceiptData(data.data);
      setScanProgress(100);

      // Add to history
      setReceiptHistory(prev => [...prev, {
        data: data.data,
        image: URL.createObjectURL(file),
        timestamp: new Date()
      }]);

      toast({
        title: "Receipt Scanned Successfully",
        description: `${data.data.items.length} items were detected from your receipt.`,
      });
    } catch (error: any) {
      console.error('Full error:', error);
      toast({
        title: "Scanning Failed",
        description: error.message || "Failed to process receipt",
        variant: "destructive"
      });
    } finally {
      setIsScanning(false);
    }
  };

  const addToPantry = async () => {
    if (!receiptData) return;
    
    try {
      // Transform receipt items to pantry items
      const pantryItems = receiptData.items.map(item => {
        // Handle quantity based on the item type
        let quantity: number | string = 1;
        let unit = 'pcs';

        if (item.quantity) {
          // If quantity is a number, use it directly
          const parsedNumber = Number(item.quantity);
          if (!isNaN(parsedNumber)) {
            quantity = parsedNumber;
          } else {
            // If quantity is a string like "by weight", use it as is
            quantity = item.quantity;
            unit = 'weight';
          }
        }

        return {
          name: item.name,
          quantity,
          unit,
          location: 'pantry', // Default location
          category: 'Other', // Default category
          // Let the server determine the recommended expiry date based on the item type
        };
      });

      console.log('Sending items to pantry:', pantryItems);

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      // First check if the token is valid
      const authCheck = await fetch('/api/auth/status', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const authData = await authCheck.json();
      
      if (!authCheck.ok || !authData.isAuthenticated) {
        // Clear invalid token
        localStorage.removeItem('token');
        throw new Error('Your session has expired. Please log in again.');
      }

      const response = await fetch('/api/pantry/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ items: pantryItems })
      });

      const data = await response.json();
      console.log('Server response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add items to pantry');
      }

      toast({
        title: "Items Added to Pantry",
        description: "All items have been added to your pantry inventory with recommended expiry dates.",
        duration: 5000,
      });

      // Clear the receipt data after successful addition
      setReceiptData(null);
      setScanProgress(0);
    } catch (error) {
      console.error('Error adding items to pantry:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add items to pantry. Please try again.",
        variant: "destructive"
      });
    }
  };

  const rescanReceipt = () => {
    setReceiptData(null);
    setScanProgress(0);
  };

  const formatPrice = (price: string) => {
    const numPrice = parseFloat(price.replace(/[^0-9.-]+/g, ""));
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(numPrice);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Smart Receipt Scanner</h1>
          <p className="mt-2 text-lg text-gray-600">
            Upload or take a photo of your grocery receipt to automatically add items to your pantry
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Scan Your Receipt</CardTitle>
            <CardDescription>
              Our advanced OCR technology will extract item names, prices, and quantities
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!receiptData ? (
              <>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upload">Upload Image</TabsTrigger>
                    <TabsTrigger value="camera">Take Photo</TabsTrigger>
                  </TabsList>
                  <TabsContent value="upload" className="py-4">
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-10 h-10 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG or PDF (MAX. 10MB)</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </TabsContent>
                  <TabsContent value="camera" className="py-4">
                    <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 rounded-lg bg-gray-50">
                      <Camera className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-4 text-sm text-gray-500">Access your camera to take a photo</p>
                      <Button onClick={handleCameraCapture} className="bg-primary hover:bg-primary/90">
                        Open Camera
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>

                {isScanning && (
                  <div className="mt-6">
                    <div className="flex items-center mb-2">
                      <RefreshCw className="animate-spin mr-2 h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Scanning Receipt...</span>
                    </div>
                    <Progress value={scanProgress} className="h-2" />
                    <p className="text-xs text-gray-500 mt-2">
                      Analyzing text and extracting items ({scanProgress}%)
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-6">
                {/* Receipt Header Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {receiptData.merchantName && (
                    <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
                      <Store className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Store</p>
                        <p className="text-lg font-semibold">{receiptData.merchantName}</p>
                      </div>
                    </div>
                  )}
                  {receiptData.total && (
                    <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
                      <DollarSign className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Total Amount</p>
                        <p className="text-lg font-semibold">{formatPrice(receiptData.total)}</p>
                      </div>
                    </div>
                  )}
                  {receiptData.date && (
                    <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
                      <ShoppingCart className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Purchase Date</p>
                        <p className="text-lg font-semibold">{new Date(receiptData.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Items Table */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Scanned Items</h3>
                    <Button variant="outline" size="sm" onClick={rescanReceipt} className="text-sm">
                      Scan New Receipt
                    </Button>
                  </div>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Item
                          </th>
                          {receiptData.items.some(item => item.quantity) && (
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Quantity
                            </th>
                          )}
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {receiptData.items.map((item, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.name}
                            </td>
                            {receiptData.items.some(item => item.quantity) && (
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.quantity || '-'}
                              </td>
                            )}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatPrice(item.price)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <CheckCircle className="mr-1 h-3 w-3" /> Detected
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 flex justify-end space-x-3">
                    <Button variant="outline" onClick={rescanReceipt}>
                      Scan New Receipt
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90" onClick={addToPantry}>
                      Add to Pantry
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Smart Receipt Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col space-y-2">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Automatic Item Detection</h3>
                <p className="text-sm text-gray-500">
                  Our OCR technology automatically detects items, prices, and quantities from receipts.
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Category Classification</h3>
                <p className="text-sm text-gray-500">
                  SmartCart intelligently categorizes your purchases for better pantry organization.
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Expense Tracking</h3>
                <p className="text-sm text-gray-500">
                  Track your grocery spending over time and identify opportunities to save.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Receipt History */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Receipt History</CardTitle>
            <CardDescription>
              Previously scanned receipts and their details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {receiptHistory.length === 0 ? (
                <p className="text-center text-gray-500">No receipts scanned yet</p>
              ) : (
                receiptHistory.map((receipt, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Receipt Image */}
                      <div className="aspect-[4/5] relative">
                        <img
                          src={receipt.image}
                          alt={`Receipt ${index + 1}`}
                          className="object-cover rounded-lg w-full h-full"
                        />
                      </div>
                      {/* Receipt Details */}
                      <div>
                        <div className="mb-4">
                          <h4 className="font-semibold">
                            {receipt.data.merchantName || 'Unknown Store'}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {receipt.timestamp.toLocaleDateString()} at{' '}
                            {receipt.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p className="font-medium">Items: {receipt.data.items.length}</p>
                          <p className="font-medium">
                            Total: {receipt.data.total ? formatPrice(receipt.data.total) : 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}