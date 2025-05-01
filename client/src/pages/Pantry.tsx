import { useState } from "react";
import { Plus, Search, Filter, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock data for demonstration
const PANTRY_ITEMS = [
  { id: 1, name: "Organic Apples", quantity: 5, unit: "pcs", location: "refrigerator", category: "Produce", expiry: "2023-05-10", daysUntilExpiry: 3 },
  { id: 2, name: "Whole Milk", quantity: 1, unit: "gal", location: "refrigerator", category: "Dairy", expiry: "2023-05-07", daysUntilExpiry: 0 },
  { id: 3, name: "Wheat Bread", quantity: 1, unit: "loaf", location: "pantry", category: "Bakery", expiry: "2023-05-12", daysUntilExpiry: 5 },
  { id: 4, name: "Chicken Breast", quantity: 2, unit: "lbs", location: "freezer", category: "Meat", expiry: "2023-06-15", daysUntilExpiry: 30 },
  { id: 5, name: "Spinach", quantity: 1, unit: "bunch", location: "refrigerator", category: "Produce", expiry: "2023-05-06", daysUntilExpiry: -1 },
  { id: 6, name: "Rice", quantity: 5, unit: "lbs", location: "pantry", category: "Grains", expiry: "2023-12-31", daysUntilExpiry: 200 },
  { id: 7, name: "Pasta", quantity: 3, unit: "boxes", location: "pantry", category: "Pasta", expiry: "2023-12-15", daysUntilExpiry: 190 },
  { id: 8, name: "Cereal", quantity: 2, unit: "boxes", location: "pantry", category: "Breakfast", expiry: "2023-08-30", daysUntilExpiry: 90 },
];

export default function Pantry() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { toast } = useToast();

  // Filter items based on search query and filters
  const filteredItems = PANTRY_ITEMS
    .filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (locationFilter === "all" || item.location === locationFilter) &&
      (categoryFilter === "all" || item.category === categoryFilter) &&
      (activeTab === "all" || 
       (activeTab === "expiring-soon" && item.daysUntilExpiry >= 0 && item.daysUntilExpiry <= 7) ||
       (activeTab === "expired" && item.daysUntilExpiry < 0))
    );

  const consumeItem = (id: number) => {
    toast({
      title: "Item Consumed",
      description: "Item has been marked as consumed and removed from pantry.",
    });
  };

  const addToPantry = () => {
    toast({
      title: "Add New Item",
      description: "New item form would open in a real implementation.",
    });
  };

  const getExpiryStatusColor = (daysUntilExpiry: number) => {
    if (daysUntilExpiry < 0) return "bg-red-100 text-red-800";
    if (daysUntilExpiry <= 3) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  const getExpiryStatusText = (daysUntilExpiry: number) => {
    if (daysUntilExpiry < 0) return "Expired";
    if (daysUntilExpiry === 0) return "Expires today";
    if (daysUntilExpiry === 1) return "Expires tomorrow";
    if (daysUntilExpiry <= 7) return `Expires in ${daysUntilExpiry} days`;
    return "Good for a while";
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pantry Management</h1>
            <p className="mt-2 text-lg text-gray-600">
              Track, organize, and manage your food inventory
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90" onClick={addToPantry}>
            <Plus className="mr-2 h-4 w-4" /> Add Item
          </Button>
        </div>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Items</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{PANTRY_ITEMS.length}</p>
              <p className="text-sm text-gray-500">Items in your pantry</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Expiring Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{PANTRY_ITEMS.filter(item => item.daysUntilExpiry >= 0 && item.daysUntilExpiry <= 7).length}</p>
              <p className="text-sm text-gray-500">Items expiring in 7 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Expired</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{PANTRY_ITEMS.filter(item => item.daysUntilExpiry < 0).length}</p>
              <p className="text-sm text-gray-500">Items that have expired</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>My Pantry</CardTitle>
            <CardDescription>
              View and manage all your food items across different storage locations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search items..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-[160px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="pantry">Pantry</SelectItem>
                    <SelectItem value="refrigerator">Refrigerator</SelectItem>
                    <SelectItem value="freezer">Freezer</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[160px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Produce">Produce</SelectItem>
                    <SelectItem value="Dairy">Dairy</SelectItem>
                    <SelectItem value="Meat">Meat</SelectItem>
                    <SelectItem value="Bakery">Bakery</SelectItem>
                    <SelectItem value="Grains">Grains</SelectItem>
                    <SelectItem value="Pasta">Pasta</SelectItem>
                    <SelectItem value="Breakfast">Breakfast</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All Items</TabsTrigger>
                <TabsTrigger value="expiring-soon">Expiring Soon</TabsTrigger>
                <TabsTrigger value="expired">Expired</TabsTrigger>
              </TabsList>
              <TabsContent value={activeTab} className="pt-4">
                {filteredItems.length === 0 ? (
                  <div className="text-center py-10 px-4">
                    <RefreshCw className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No items found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {searchQuery || locationFilter !== "all" || categoryFilter !== "all" 
                        ? "Try adjusting your search or filters" 
                        : "Add some items to your pantry to get started"}
                    </p>
                  </div>
                ) : (
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Item
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantity
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Location
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredItems.map((item) => (
                          <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.quantity} {item.unit}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <Badge variant="outline" className="capitalize">
                                {item.location}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.category}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getExpiryStatusColor(item.daysUntilExpiry)}`}>
                                {item.daysUntilExpiry < 0 && <AlertCircle className="mr-1 h-3 w-3" />}
                                {getExpiryStatusText(item.daysUntilExpiry)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Smart Pantry Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col space-y-2">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center">
                  <RefreshCw className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Expiry Tracking</h3>
                <p className="text-sm text-gray-500">
                  Get notified about foods that are about to expire to reduce waste.
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center">
                  <RefreshCw className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Location Organization</h3>
                <p className="text-sm text-gray-500">
                  Organize items by storage location for easy inventory management.
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center">
                  <RefreshCw className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Smart Consumption</h3>
                <p className="text-sm text-gray-500">
                  Track consumption patterns to help optimize your shopping habits.
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