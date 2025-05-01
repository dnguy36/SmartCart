import { useState } from "react";
import { Upload, Camera, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Scanner() {
  const [activeTab, setActiveTab] = useState("upload");
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scannedItems, setScannedItems] = useState<{name: string, price: number, category: string}[]>([]);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processReceipt();
    }
  };

  const handleCameraCapture = () => {
    // In a real implementation, this would access the device camera
    processReceipt();
  };

  const processReceipt = () => {
    setIsScanning(true);
    setScanProgress(0);
    
    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          // Mock data - in a real app, this would come from Tesseract OCR
          setScannedItems([
            { name: "Organic Apples", price: 4.99, category: "Produce" },
            { name: "Whole Milk", price: 3.49, category: "Dairy" },
            { name: "Wheat Bread", price: 2.99, category: "Bakery" },
            { name: "Chicken Breast", price: 8.99, category: "Meat" },
            { name: "Spinach", price: 3.29, category: "Produce" }
          ]);
          toast({
            title: "Receipt Scanned Successfully",
            description: "5 items were detected from your receipt.",
          });
        }
        return newProgress;
      });
    }, 300);
  };

  const addToPantry = () => {
    toast({
      title: "Items Added to Pantry",
      description: "All items have been added to your pantry inventory.",
    });
  };

  const rescanReceipt = () => {
    setScannedItems([]);
    setScanProgress(0);
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
            {!scannedItems.length ? (
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
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {scannedItems.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${item.price.toFixed(2)}
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
                    Retry Scan
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90" onClick={addToPantry}>
                    Add to Pantry
                  </Button>
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
      </main>
      <Footer />
    </div>
  );
}