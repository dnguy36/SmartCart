import { useState, useEffect } from "react";
import { Plus, Search, Filter, RefreshCw, AlertCircle, Pencil } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { format, differenceInDays, addDays } from "date-fns";

interface PantryItem {
  _id: string;
  name: string;
  quantity: number | string;
  unit: string;
  location: string;
  category: string;
  expiry: string;
  addedAt: string;
  tips?: string; // Storage tips may be available
}

export default function Pantry() {
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: "1",
    unit: "pcs",
    location: "pantry",
    category: "Other",
    expiry: format(addDays(new Date(), 30), "yyyy-MM-dd"),
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingItems, setEditingItems] = useState<Record<string, PantryItem>>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchPantryItems();
  }, []);

  const fetchPantryItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required. Please log in.');
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
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to fetch pantry items');
      }

      const data = await response.json();
      setPantryItems(data.items || []);
    } catch (err) {
      console.error('Error fetching pantry items:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to fetch pantry items",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addItem = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required. Please log in.');
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
        body: JSON.stringify({ 
          items: [{
            name: newItem.name,
            quantity: isNaN(Number(newItem.quantity)) ? newItem.quantity : Number(newItem.quantity),
            unit: newItem.unit,
            location: newItem.location,
            category: newItem.category,
            expiry: new Date(newItem.expiry),
          }]
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to add item to pantry');
      }

      toast({
        title: "Item Added",
        description: "Item has been added to your pantry.",
      });

      // Reset form and close dialog
      setNewItem({
        name: "",
        quantity: "1",
        unit: "pcs",
        location: "pantry",
        category: "Other",
        expiry: format(addDays(new Date(), 30), "yyyy-MM-dd"),
      });
      setIsAddDialogOpen(false);
      
      // Refresh the list
      fetchPantryItems();
    } catch (err) {
      console.error('Error adding item to pantry:', err);
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to add item to pantry",
        variant: "destructive"
      });
    }
  };

  const consumeItem = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required. Please log in.');
      }

      // This would be implemented in a real app
      // For now, just show a toast
      toast({
        title: "Item Consumed",
        description: "Item has been marked as consumed and removed from pantry.",
      });
      
      // Refresh the list
      fetchPantryItems();
    } catch (err) {
      console.error('Error consuming item:', err);
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to consume item",
        variant: "destructive"
      });
    }
  };

  // Calculate days until expiry for each item
  const itemsWithExpiryDays = pantryItems.map(item => {
    const expiryDate = new Date(item.expiry);
    const daysUntilExpiry = differenceInDays(expiryDate, new Date());
    return { ...item, daysUntilExpiry };
  });

  // Filter items based on search query and filters
  const filteredItems = itemsWithExpiryDays
    .filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (locationFilter === "all" || item.location === locationFilter) &&
      (categoryFilter === "all" || item.category === categoryFilter) &&
      (activeTab === "all" || 
       (activeTab === "expiring-soon" && item.daysUntilExpiry >= 0 && item.daysUntilExpiry <= 7) ||
       (activeTab === "expired" && item.daysUntilExpiry < 0))
    );

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

  const formatQuantity = (quantity: number | string, unit: string) => {
    if (typeof quantity === 'number') {
      return `${quantity} ${unit}`;
    } else if (quantity === 'by weight') {
      return 'By weight';
    } else {
      return `${quantity} ${unit}`;
    }
  };

  const handleEditModeToggle = () => {
    setIsEditMode(!isEditMode);
    if (!isEditMode) {
      // Initialize editing state for all items
      const initialEditingState = filteredItems.reduce((acc, item) => {
        acc[item._id] = { ...item };
        return acc;
      }, {} as Record<string, PantryItem>);
      setEditingItems(initialEditingState);
    } else {
      // Clear editing state when exiting edit mode
      setEditingItems({});
    }
  };

  const handleItemChange = (id: string, field: keyof PantryItem, value: any) => {
    setEditingItems(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required. Please log in.');
      }

      // Save all modified items
      const savePromises = Object.entries(editingItems).map(async ([id, item]) => {
        const response = await fetch(`/api/pantry/items/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            name: item.name,
            quantity: item.quantity,
            unit: item.unit,
            location: item.location,
            category: item.category,
            expiry: item.expiry
          })
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Failed to update item');
        }

        return response.json();
      });

      await Promise.all(savePromises);

      toast({
        title: "Changes Saved",
        description: "All items have been updated successfully.",
      });

      // Exit edit mode and refresh the list
      setIsEditMode(false);
      setEditingItems({});
      fetchPantryItems();
    } catch (err) {
      console.error('Error saving changes:', err);
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to save changes",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!isEditMode) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required. Please log in.');
      }

      // Optimistically update the UI
      setPantryItems(prevItems => prevItems.filter(item => item._id !== id));
      setEditingItems(prev => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });

      const response = await fetch(`/api/pantry/items/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        // If the delete failed, revert the optimistic update
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete item');
      }

      toast({
        title: "Item Deleted",
        description: "Item has been removed from your pantry.",
      });
    } catch (err) {
      console.error('Error deleting item:', err);
      // Revert the optimistic update on error
      fetchPantryItems();
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to delete item",
        variant: "destructive"
      });
    }
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
          <div className="flex gap-2">
            {isEditMode ? (
              <>
                <Button variant="outline" onClick={() => setIsEditMode(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={handleEditModeToggle}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Mode
                </Button>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Plus className="mr-2 h-4 w-4" /> Add Item
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Item</DialogTitle>
                      <DialogDescription>
                        Add a new item to your pantry inventory.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="name"
                          value={newItem.name}
                          onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                          className="col-span-3"
                          placeholder="Item name"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="quantity" className="text-right">
                          Quantity
                        </Label>
                        <Input
                          id="quantity"
                          value={newItem.quantity}
                          onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
                          className="col-span-3"
                          placeholder="Quantity"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="unit" className="text-right">
                          Unit
                        </Label>
                        <Select value={newItem.unit} onValueChange={(value) => setNewItem({...newItem, unit: value})}>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pcs">Pieces</SelectItem>
                            <SelectItem value="lbs">Pounds</SelectItem>
                            <SelectItem value="oz">Ounces</SelectItem>
                            <SelectItem value="kg">Kilograms</SelectItem>
                            <SelectItem value="g">Grams</SelectItem>
                            <SelectItem value="boxes">Boxes</SelectItem>
                            <SelectItem value="cans">Cans</SelectItem>
                            <SelectItem value="bottles">Bottles</SelectItem>
                            <SelectItem value="weight">By Weight</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="location" className="text-right">
                          Location
                        </Label>
                        <Select value={newItem.location} onValueChange={(value) => setNewItem({...newItem, location: value})}>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pantry">Pantry</SelectItem>
                            <SelectItem value="refrigerator">Refrigerator</SelectItem>
                            <SelectItem value="freezer">Freezer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">
                          Category
                        </Label>
                        <Select value={newItem.category} onValueChange={(value) => setNewItem({...newItem, category: value})}>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Produce">Produce</SelectItem>
                            <SelectItem value="Dairy">Dairy</SelectItem>
                            <SelectItem value="Meat">Meat</SelectItem>
                            <SelectItem value="Bakery">Bakery</SelectItem>
                            <SelectItem value="Grains">Grains</SelectItem>
                            <SelectItem value="Pasta">Pasta</SelectItem>
                            <SelectItem value="Breakfast">Breakfast</SelectItem>
                            <SelectItem value="Canned">Canned Goods</SelectItem>
                            <SelectItem value="Frozen">Frozen Foods</SelectItem>
                            <SelectItem value="Snacks">Snacks</SelectItem>
                            <SelectItem value="Beverages">Beverages</SelectItem>
                            <SelectItem value="Condiments">Condiments</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="expiry" className="text-right">
                          Expiry Date
                        </Label>
                        <Input
                          id="expiry"
                          type="date"
                          value={newItem.expiry}
                          onChange={(e) => setNewItem({...newItem, expiry: e.target.value})}
                          className="col-span-3"
                          min={format(new Date(), "yyyy-MM-dd")}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={addItem} disabled={!newItem.name}>Add to Pantry</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Items</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{isLoading ? "..." : pantryItems.length}</p>
              <p className="text-sm text-gray-500">Items in your pantry</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Expiring Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{isLoading ? "..." : itemsWithExpiryDays.filter(item => item.daysUntilExpiry >= 0 && item.daysUntilExpiry <= 7).length}</p>
              <p className="text-sm text-gray-500">Items expiring in 7 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Expired</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{isLoading ? "..." : itemsWithExpiryDays.filter(item => item.daysUntilExpiry < 0).length}</p>
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
                    <SelectItem value="Canned">Canned Goods</SelectItem>
                    <SelectItem value="Frozen">Frozen Foods</SelectItem>
                    <SelectItem value="Snacks">Snacks</SelectItem>
                    <SelectItem value="Beverages">Beverages</SelectItem>
                    <SelectItem value="Condiments">Condiments</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
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
                {isLoading ? (
                  <div className="text-center py-10 px-4">
                    <RefreshCw className="mx-auto h-12 w-12 text-gray-400 animate-spin" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Loading items...</h3>
                  </div>
                ) : error ? (
                  <div className="text-center py-10 px-4">
                    <AlertCircle className="mx-auto h-12 w-12 text-red-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Error loading items</h3>
                    <p className="mt-1 text-sm text-gray-500">{error}</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={fetchPantryItems}
                    >
                      Try Again
                    </Button>
                  </div>
                ) : filteredItems.length === 0 ? (
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
                    <div className="max-h-[600px] overflow-y-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 sticky top-0 z-10">
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
                            {isEditMode && (
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                              </th>
                            )}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <AnimatePresence>
                            {filteredItems.map((item) => (
                              <motion.tr
                                key={item._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                              >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {isEditMode ? (
                                    <Input
                                      value={editingItems[item._id]?.name || item.name}
                                      onChange={(e) => handleItemChange(item._id, 'name', e.target.value)}
                                      className="w-full"
                                    />
                                  ) : (
                                    item.name
                                  )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {isEditMode ? (
                                    <div className="flex gap-2">
                                      <Input
                                        value={editingItems[item._id]?.quantity || item.quantity}
                                        onChange={(e) => handleItemChange(item._id, 'quantity', e.target.value)}
                                        className="w-24"
                                      />
                                      <Select
                                        value={editingItems[item._id]?.unit || item.unit}
                                        onValueChange={(value) => handleItemChange(item._id, 'unit', value)}
                                      >
                                        <SelectTrigger className="w-24">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="pcs">Pieces</SelectItem>
                                          <SelectItem value="lbs">Pounds</SelectItem>
                                          <SelectItem value="oz">Ounces</SelectItem>
                                          <SelectItem value="kg">Kilograms</SelectItem>
                                          <SelectItem value="g">Grams</SelectItem>
                                          <SelectItem value="boxes">Boxes</SelectItem>
                                          <SelectItem value="cans">Cans</SelectItem>
                                          <SelectItem value="bottles">Bottles</SelectItem>
                                          <SelectItem value="weight">By Weight</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  ) : (
                                    formatQuantity(item.quantity, item.unit)
                                  )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {isEditMode ? (
                                    <Select
                                      value={editingItems[item._id]?.location || item.location}
                                      onValueChange={(value) => handleItemChange(item._id, 'location', value)}
                                    >
                                      <SelectTrigger className="w-32">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="pantry">Pantry</SelectItem>
                                        <SelectItem value="refrigerator">Refrigerator</SelectItem>
                                        <SelectItem value="freezer">Freezer</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  ) : (
                                    <Badge variant="outline" className="capitalize">
                                      {item.location}
                                    </Badge>
                                  )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {isEditMode ? (
                                    <Select
                                      value={editingItems[item._id]?.category || item.category}
                                      onValueChange={(value) => handleItemChange(item._id, 'category', value)}
                                    >
                                      <SelectTrigger className="w-32">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Produce">Produce</SelectItem>
                                        <SelectItem value="Dairy">Dairy</SelectItem>
                                        <SelectItem value="Meat">Meat</SelectItem>
                                        <SelectItem value="Bakery">Bakery</SelectItem>
                                        <SelectItem value="Grains">Grains</SelectItem>
                                        <SelectItem value="Pasta">Pasta</SelectItem>
                                        <SelectItem value="Breakfast">Breakfast</SelectItem>
                                        <SelectItem value="Canned">Canned Goods</SelectItem>
                                        <SelectItem value="Frozen">Frozen Foods</SelectItem>
                                        <SelectItem value="Snacks">Snacks</SelectItem>
                                        <SelectItem value="Beverages">Beverages</SelectItem>
                                        <SelectItem value="Condiments">Condiments</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  ) : (
                                    item.category
                                  )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {isEditMode ? (
                                    <Input
                                      type="date"
                                      value={format(new Date(editingItems[item._id]?.expiry || item.expiry), "yyyy-MM-dd")}
                                      onChange={(e) => handleItemChange(item._id, 'expiry', e.target.value)}
                                      className="w-32"
                                      min={format(new Date(), "yyyy-MM-dd")}
                                    />
                                  ) : (
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getExpiryStatusColor(item.daysUntilExpiry)}`}>
                                      {item.daysUntilExpiry < 0 && <AlertCircle className="mr-1 h-3 w-3" />}
                                      {getExpiryStatusText(item.daysUntilExpiry)}
                                    </span>
                                  )}
                                </td>
                                {isEditMode && (
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => handleDelete(item._id)}
                                    >
                                      Delete
                                    </Button>
                                  </td>
                                )}
                              </motion.tr>
                            ))}
                          </AnimatePresence>
                        </tbody>
                      </table>
                    </div>
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