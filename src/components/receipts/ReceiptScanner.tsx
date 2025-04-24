import React, { useState } from 'react';
import { Upload, Camera, Scan, X } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';

const ReceiptScanner: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanning, setScanning] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreviewUrl(URL.createObjectURL(file));
      setIsUploading(true);
      
      // Simulate scanning process
      simulateScan();
    }
  };

  const simulateScan = () => {
    setScanning(true);
    setScanProgress(0);
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setScanning(false);
          setIsUploading(false);
          // Here you would normally process the result
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  const resetUpload = () => {
    setPreviewUrl(null);
    setIsUploading(false);
    setScanning(false);
    setScanProgress(0);
  };

  return (
    <Card 
      title="Receipt Scanner" 
      subtitle="Upload a receipt to add items to your pantry"
      icon={<Scan size={24} />}
    >
      <div className="space-y-4">
        {!isUploading ? (
          <>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-500 transition-colors">
              <input
                type="file"
                accept="image/*"
                id="receipt-upload"
                className="hidden"
                onChange={handleFileChange}
              />
              <label 
                htmlFor="receipt-upload"
                className="cursor-pointer block"
              >
                <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                <p className="text-gray-700 font-medium">Drop your receipt here or click to upload</p>
                <p className="text-sm text-gray-500 mt-1">JPG, PNG or PDF accepted</p>
              </label>
            </div>
            
            <div className="text-center">
              <p className="text-gray-600 mb-2">Or use your camera</p>
              <Button 
                variant="outline" 
                icon={<Camera size={16} />}
                onClick={() => document.getElementById('receipt-upload')?.click()}
              >
                Take a photo
              </Button>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              {previewUrl && (
                <div className="relative">
                  <img 
                    src={previewUrl} 
                    alt="Receipt preview" 
                    className="w-full h-60 object-cover rounded-lg"
                  />
                  <button 
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                    onClick={resetUpload}
                  >
                    <X size={16} className="text-gray-600" />
                  </button>
                </div>
              )}
            </div>
            
            {scanning && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Scanning receipt...</span>
                  <span className="text-sm text-gray-600">{scanProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-emerald-600 transition-all duration-300"
                    style={{ width: `${scanProgress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 italic">
                  Our AI is identifying items and prices from your receipt
                </p>
              </div>
            )}
            
            {!scanning && scanProgress === 100 && (
              <div className="p-3 bg-green-50 border border-green-100 rounded-lg flex items-start space-x-2">
                <div className="flex-grow">
                  <p className="font-medium text-green-800">Scan complete!</p>
                  <p className="text-sm text-green-700">
                    We identified 8 items from your receipt.
                  </p>
                </div>
                <Button variant="primary" size="sm">
                  View Items
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default ReceiptScanner;