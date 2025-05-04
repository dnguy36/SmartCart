import { useState } from "react";
import { Link } from "wouter";
import { 
  LayoutDashboard, 
  Receipt, 
  ShoppingBag, 
  ChefHat, 
  LineChart, 
  DollarSign,
  Bell,
  Search,
  User,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import { useAuth } from "@/hooks/use-auth";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();

  // Quick access features
  const quickAccessFeatures = [
    { 
      title: "Scan Receipt", 
      description: "Upload or take a photo of your receipts",
      icon: Receipt,
      color: "bg-purple-100 text-purple-600",
      link: "/scanner"
    },
    { 
      title: "Manage Pantry", 
      description: "Track and organize your food inventory",
      icon: ShoppingBag,
      color: "bg-blue-100 text-blue-600",
      link: "/pantry"
    },
    { 
      title: "Find Recipes", 
      description: "Discover recipes with your ingredients",
      icon: ChefHat,
      color: "bg-green-100 text-green-600",
      link: "/recipes"
    },
    { 
      title: "Compare Prices", 
      description: "Find the best deals across stores",
      icon: DollarSign,
      color: "bg-amber-100 text-amber-600",
      link: "/prices"
    },
    { 
      title: "View Analytics", 
      description: "Track spending and consumption patterns",
      icon: LineChart,
      color: "bg-red-100 text-red-600",
      link: "/analytics"
    }
  ];

  // Notifications for demonstration
  const notifications = [
    {
      title: "3 items expiring soon",
      description: "Spinach, Milk, and Bananas will expire in 2 days",
      type: "expiry",
      time: "2h ago"
    },
    {
      title: "Price drop alert",
      description: "Chicken breasts are on sale at Kroger for $3.99/lb (was $5.99/lb)",
      type: "price",
      time: "6h ago"
    },
    {
      title: "Recipe recommendation",
      description: "We found 3 new recipes based on your pantry items",
      type: "recipe",
      time: "1d ago"
    },
    {
      title: "Smart shopping list generated",
      description: "Your weekly shopping list is ready for review",
      type: "shopping",
      time: "1d ago"
    }
  ];

  // Recent activity for demonstration
  const recentActivity = [
    {
      action: "Added 12 items to pantry",
      time: "Today, 2:34 PM",
      icon: ShoppingBag
    },
    {
      action: "Scanned Kroger receipt",
      time: "Today, 2:30 PM",
      icon: Receipt
    },
    {
      action: "Marked 3 items as consumed",
      time: "Yesterday, 6:15 PM",
      icon: ShoppingBag
    },
    {
      action: "Cooked Chicken Stir Fry recipe",
      time: "Yesterday, 5:20 PM",
      icon: ChefHat
    },
    {
      action: "Saved $18.45 on weekly shopping",
      time: "2 days ago",
      icon: DollarSign
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome to SmartCart</h1>
            <p className="mt-2 text-lg text-gray-600">
              Your intelligent grocery management assistant
            </p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search across SmartCart..."
              className="pl-10 w-full md:w-80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="col-span-full md:col-span-2">
            <CardHeader>
              <CardTitle>Quick Access</CardTitle>
              <CardDescription>
                Manage your grocery shopping and meal planning in one place
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {quickAccessFeatures.map((feature, index) => (
                  <Link key={index} href={feature.link}>
                    <div className="border rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer h-full flex">
                      <div className={`rounded-full p-3 ${feature.color} mr-4`}>
                        <feature.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{feature.title}</h3>
                        <p className="text-sm text-gray-500">{feature.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Notifications</span>
                <Badge className="bg-primary">{notifications.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-80 overflow-y-auto pr-2">
              <div className="space-y-4">
                {notifications.map((notification, index) => (
                  <div key={index} className="flex p-3 border rounded-lg">
                    <div className="flex-shrink-0 mr-3">
                      {notification.type === "expiry" && (
                        <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                          <Bell className="h-5 w-5 text-yellow-600" />
                        </div>
                      )}
                      {notification.type === "price" && (
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <DollarSign className="h-5 w-5 text-green-600" />
                        </div>
                      )}
                      {notification.type === "recipe" && (
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <ChefHat className="h-5 w-5 text-blue-600" />
                        </div>
                      )}
                      {notification.type === "shopping" && (
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <ShoppingBag className="h-5 w-5 text-purple-600" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{notification.title}</h4>
                      <p className="text-xs text-gray-500">{notification.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="ghost" className="w-full text-primary" size="sm">
                View All Notifications
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center p-2">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                      <activity.icon className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="ghost" className="w-full text-primary" size="sm">
                View Full History
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Account</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-6">
                <Avatar className="h-16 w-16 mr-4">
                  <AvatarImage src="" alt={user?.username} />
                  <AvatarFallback className="bg-primary text-white">
                    {user?.username?.substring(0, 2).toUpperCase() || "SC"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{user?.username || "User"}</h3>
                  <p className="text-sm text-gray-500">{user?.email || "No email"}</p>
                </div>
              </div>
              <div className="space-y-3">
                <Link href="/profile">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Preferences
                </Button>
                <Button variant="outline" className="w-full justify-start text-purple-600 border-purple-200 hover:bg-purple-50" size="sm">
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Premium Features
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}