import { useState } from "react";
import { Search, MapPin, Star, TrendingDown, ShoppingCart, AlertCircle, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock data for demonstration
const ITEMS_WITH_PRICES = [
  { 
    id: 1, 
    name: "Organic Apples", 
    category: "Produce",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    stores: [
      { id: 1, name: "Whole Foods", price: 4.99, distance: 1.2, priceHistory: [5.49, 5.29, 4.99], onSale: false },
      { id: 2, name: "Trader Joe's", price: 3.99, distance: 2.5, priceHistory: [3.99, 3.99, 3.99], onSale: false },
      { id: 3, name: "Kroger", price: 3.49, distance: 3.1, priceHistory: [4.29, 3.99, 3.49], onSale: true }
    ]
  },
  { 
    id: 2, 
    name: "Whole Milk", 
    category: "Dairy",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    stores: [
      { id: 1, name: "Whole Foods", price: 4.79, distance: 1.2, priceHistory: [4.99, 4.89, 4.79], onSale: false },
      { id: 2, name: "Trader Joe's", price: 3.49, distance: 2.5, priceHistory: [3.79, 3.69, 3.49], onSale: true },
      { id: 3, name: "Kroger", price: 3.99, distance: 3.1, priceHistory: [3.99, 3.99, 3.99], onSale: false }
    ]
  },
  { 
    id: 3, 
    name: "Wheat Bread", 
    category: "Bakery",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    stores: [
      { id: 1, name: "Whole Foods", price: 4.49, distance: 1.2, priceHistory: [4.49, 4.49, 4.49], onSale: false },
      { id: 2, name: "Trader Joe's", price: 3.29, distance: 2.5, priceHistory: [3.49, 3.29, 3.29], onSale: false },
      { id: 3, name: "Kroger", price: 2.99, distance: 3.1, priceHistory: [3.79, 3.29, 2.99], onSale: true }
    ]
  },
  { 
    id: 4, 
    name: "Chicken Breast", 
    category: "Meat",
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    stores: [
      { id: 1, name: "Whole Foods", price: 7.99, distance: 1.2, priceHistory: [8.99, 8.49, 7.99], onSale: true },
      { id: 2, name: "Trader Joe's", price: 8.49, distance: 2.5, priceHistory: [8.49, 8.49, 8.49], onSale: false },
      { id: 3, name: "Kroger", price: 7.49, distance: 3.1, priceHistory: [7.99, 7.99, 7.49], onSale: true }
    ]
  },
];

const STORES = [
  { id: 1, name: "Whole Foods", address: "123 Market St", distance: 1.2, rating: 4.5 },
  { id: 2, name: "Trader Joe's", address: "456 Main Ave", distance: 2.5, rating: 4.7 },
  { id: 3, name: "Kroger", address: "789 Oak Blvd", distance: 3.1, rating: 4.2 },
];

export default function Prices() {
  const [activeTab, setActiveTab] = useState("products");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStore, setSelectedStore] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [maxDistance, setMaxDistance] = useState([5]);
  const [showOnSaleOnly, setShowOnSaleOnly] = useState(false);
  const { toast } = useToast();

  // Filter items based on search query and filters
  const filteredItems = ITEMS_WITH_PRICES.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (showOnSaleOnly === false || item.stores.some(store => store.onSale)) &&
    item.stores.some(store => store.distance <= maxDistance[0])
  );

  const filteredStores = STORES.filter(store => 
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    store.distance <= maxDistance[0]
  );

  const createPriceAlert = (itemId: number, storeId: number) => {
    toast({
      title: "Price Alert Created",
      description: "We'll notify you when the price drops.",
    });
  };

  const optimizeShoppingList = () => {
    toast({
      title: "Shopping List Optimized",
      description: "Your shopping list has been optimized for the best prices.",
    });
  };

  const addToShoppingList = (itemId: number) => {
    toast({
      title: "Added to Shopping List",
      description: "Item added to your shopping list.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Smart Price Comparison</h1>
            <p className="mt-2 text-lg text-gray-600">
              Compare prices across local stores to save money
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90" onClick={optimizeShoppingList}>
            <ShoppingCart className="mr-2 h-4 w-4" /> Optimize Shopping List
          </Button>
        </div>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Potential Savings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">$24.53</p>
              <p className="text-sm text-gray-500">By shopping at the best stores</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Price Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">7</p>
              <p className="text-sm text-gray-500">Active price alerts</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Best Store Today</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">Kroger</p>
              <p className="text-sm text-gray-500">For your current shopping list</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <CardTitle>Price Comparison</CardTitle>
                <CardDescription>
                  View and compare prices across different stores
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search items or stores..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="sale-only"
                    checked={showOnSaleOnly}
                    onCheckedChange={setShowOnSaleOnly}
                  />
                  <label
                    htmlFor="sale-only"
                    className="text-sm font-medium leading-none whitespace-nowrap"
                  >
                    On Sale Only
                  </label>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Max Distance ({maxDistance[0]} miles)</h3>
              <Slider
                defaultValue={[5]}
                max={10}
                step={0.5}
                value={maxDistance}
                onValueChange={setMaxDistance}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0 mi</span>
                <span>5 mi</span>
                <span>10 mi</span>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="products">By Products</TabsTrigger>
                <TabsTrigger value="stores">By Stores</TabsTrigger>
              </TabsList>
              <TabsContent value="products" className="pt-6">
                <div className="grid grid-cols-1 gap-6">
                  {filteredItems.length === 0 ? (
                    <div className="text-center py-10 px-4">
                      <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No items found</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  ) : (
                    filteredItems.map(item => (
                      <Card key={item.id} className={`overflow-hidden ${selectedItem === item.id ? 'ring-2 ring-primary' : ''}`}>
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/4 p-4">
                            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="object-cover w-full h-full"
                              />
                            </div>
                          </div>
                          <div className="flex-1 p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-semibold hover:text-primary cursor-pointer" onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}>
                                  {item.name}
                                </h3>
                                <p className="text-sm text-gray-500">{item.category}</p>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-primary border-primary hover:bg-primary/10"
                                onClick={() => addToShoppingList(item.id)}
                              >
                                <ShoppingCart className="h-4 w-4 mr-1" />
                                Add to List
                              </Button>
                            </div>

                            <div className="mt-4">
                              <h4 className="text-sm font-medium mb-2">Price Comparison:</h4>
                              <div className="space-y-3">
                                {/* Sort stores by price (lowest first) */}
                                {[...item.stores]
                                  .sort((a, b) => a.price - b.price)
                                  .map((store, index) => (
                                    <div key={store.id} className={`flex justify-between items-center p-3 rounded-lg ${index === 0 ? 'bg-green-50 border border-green-100' : 'bg-gray-50 border border-gray-100'}`}>
                                      <div className="flex items-center">
                                        {index === 0 && (
                                          <Badge className="mr-2 bg-green-100 text-green-800 hover:bg-green-100">
                                            Best Price
                                          </Badge>
                                        )}
                                        <div>
                                          <p className="font-medium">{store.name}</p>
                                          <div className="flex items-center text-sm text-gray-500">
                                            <MapPin className="h-3 w-3 mr-1" />
                                            {store.distance} miles
                                          </div>
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <div className="flex items-center">
                                          {store.onSale && (
                                            <Badge className="mr-2 bg-red-100 text-red-800 hover:bg-red-100">
                                              <Percent className="h-3 w-3 mr-1" />
                                              Sale
                                            </Badge>
                                          )}
                                          <span className={`text-lg font-bold ${store.onSale ? 'text-red-600' : ''}`}>
                                            ${store.price.toFixed(2)}
                                          </span>
                                        </div>
                                        {store.priceHistory[0] > store.price && (
                                          <div className="flex items-center text-sm text-green-600">
                                            <TrendingDown className="h-3 w-3 mr-1" />
                                            <span>
                                              was ${store.priceHistory[0].toFixed(2)}
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>

                            <div className="mt-4 flex justify-end">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-primary"
                                onClick={() => createPriceAlert(item.id, item.stores[0].id)}
                              >
                                <AlertCircle className="h-4 w-4 mr-1" />
                                Set Price Alert
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>
              <TabsContent value="stores" className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredStores.length === 0 ? (
                    <div className="col-span-full text-center py-10 px-4">
                      <MapPin className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No stores found</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Try adjusting your search or distance filter
                      </p>
                    </div>
                  ) : (
                    filteredStores.map(store => (
                      <Card key={store.id} className={`${selectedStore === store.id ? 'ring-2 ring-primary' : ''}`}>
                        <CardHeader>
                          <CardTitle className="flex justify-between items-center">
                            <span>{store.name}</span>
                            <Badge variant="outline">
                              <MapPin className="h-3 w-3 mr-1" />
                              {store.distance} mi
                            </Badge>
                          </CardTitle>
                          <CardDescription>{store.address}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center mb-4">
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < Math.floor(store.rating) ? 'text-yellow-400 fill-yellow-400' : i < store.rating ? 'text-yellow-400 fill-yellow-400 opacity-50' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-600">{store.rating}</span>
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-sm font-medium">Current Deals:</h3>
                            <ul className="space-y-1">
                              {ITEMS_WITH_PRICES
                                .filter(item => item.stores.some(s => s.id === store.id && s.onSale))
                                .slice(0, 3)
                                .map(item => {
                                  const storeInfo = item.stores.find(s => s.id === store.id);
                                  return (
                                    <li key={item.id} className="flex justify-between text-sm">
                                      <span>{item.name}</span>
                                      <span className="font-medium text-red-600">${storeInfo?.price.toFixed(2)}</span>
                                    </li>
                                  );
                                })}
                              {ITEMS_WITH_PRICES.filter(item => 
                                item.stores.some(s => s.id === store.id && s.onSale)
                              ).length > 3 && (
                                <li className="text-sm text-primary hover:underline cursor-pointer">
                                  + more deals
                                </li>
                              )}
                            </ul>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button 
                            variant="outline" 
                            className="text-primary border-primary hover:bg-primary/10"
                            onClick={() => setSelectedStore(selectedStore === store.id ? null : store.id)}
                          >
                            View Details
                          </Button>
                          <Button 
                            className="bg-primary hover:bg-primary/90"
                            onClick={() => {
                              toast({
                                title: "Store Selected",
                                description: `${store.name} has been selected for price comparison.`,
                              });
                            }}
                          >
                            Compare Prices
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Smart Price Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col space-y-2">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center">
                  <TrendingDown className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Price History Tracking</h3>
                <p className="text-sm text-gray-500">
                  Track price changes over time and identify the best moment to buy.
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Price Drop Alerts</h3>
                <p className="text-sm text-gray-500">
                  Get notified when prices drop below your target for specific items.
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Shopping List Optimization</h3>
                <p className="text-sm text-gray-500">
                  Automatically calculate which store combination gives you the best overall price.
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