import { useState } from "react";
import { 
  BarChart, Bar, 
  PieChart, Pie, Cell, 
  LineChart, Line, 
  AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts";
import { 
  Calendar, 
  TrendingDown, TrendingUp, 
  DollarSign, Clock, 
  AlertCircle, PieChart as PieChartIcon, 
  BarChart2, LineChart as LineChartIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock data for demonstration
const SPENDING_DATA = [
  { month: 'Jan', amount: 420 },
  { month: 'Feb', amount: 380 },
  { month: 'Mar', amount: 450 },
  { month: 'Apr', amount: 410 },
  { month: 'May', amount: 390 },
  { month: 'Jun', amount: 370 },
];

const CATEGORY_DATA = [
  { name: 'Produce', value: 32 },
  { name: 'Dairy', value: 18 },
  { name: 'Meat', value: 25 },
  { name: 'Bakery', value: 12 },
  { name: 'Pantry', value: 13 },
];

const LOCATION_DATA = [
  { name: 'Pantry', value: 45 },
  { name: 'Refrigerator', value: 35 },
  { name: 'Freezer', value: 20 },
];

const EXPIRY_DATA = [
  { days: '0-3', count: 5 },
  { days: '4-7', count: 8 },
  { days: '8-14', count: 12 },
  { days: '15-30', count: 18 },
  { days: '30+', count: 32 },
];

const SAVINGS_DATA = [
  { month: 'Jan', amount: 32 },
  { month: 'Feb', amount: 28 },
  { month: 'Mar', count: 45 },
  { month: 'Apr', amount: 38 },
  { month: 'May', amount: 42 },
  { month: 'Jun', amount: 53 },
];

const FOOD_WASTE_DATA = [
  { month: 'Jan', wasted: 8, saved: 35 },
  { month: 'Feb', wasted: 7, saved: 36 },
  { month: 'Mar', wasted: 5, saved: 40 },
  { month: 'Apr', wasted: 4, saved: 45 },
  { month: 'May', wasted: 3, saved: 50 },
  { month: 'Jun', wasted: 2, saved: 55 },
];

const COLORS = ['#10b981', '#3b82f6', '#ef4444', '#f59e0b', '#8b5cf6'];

export default function Analytics() {
  const [activeTab, setActiveTab] = useState("pantry");
  const [timeRange, setTimeRange] = useState("6months");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Smart Analytics</h1>
            <p className="mt-2 text-lg text-gray-600">
              Insights into your grocery habits and spending
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              Export Report
            </Button>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Total Spending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-green-500 mr-2" />
                <p className="text-2xl font-bold">$2,420</p>
              </div>
              <div className="flex items-center mt-1 text-xs text-green-600">
                <TrendingDown className="h-3 w-3 mr-1" />
                <span>8% less than last period</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Items in Pantry</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">75</p>
              <div className="flex items-center mt-1 text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>12 new items this month</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Total Savings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-green-500 mr-2" />
                <p className="text-2xl font-bold">$238</p>
              </div>
              <div className="flex items-center mt-1 text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>15% more than last period</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Food Waste Reduced</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">32%</p>
              <div className="flex items-center mt-1 text-xs text-green-600">
                <TrendingDown className="h-3 w-3 mr-1" />
                <span>6.5 lbs less waste</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="pantry">Pantry Analytics</TabsTrigger>
            <TabsTrigger value="spending">Spending Analysis</TabsTrigger>
            <TabsTrigger value="savings">Savings Tracker</TabsTrigger>
            <TabsTrigger value="waste">Waste Reduction</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pantry" className="pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChartIcon className="h-5 w-5 mr-2 text-primary" />
                    Pantry by Category
                  </CardTitle>
                  <CardDescription>
                    Distribution of items by category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={CATEGORY_DATA}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {CATEGORY_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} items`, 'Count']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChartIcon className="h-5 w-5 mr-2 text-primary" />
                    Items by Location
                  </CardTitle>
                  <CardDescription>
                    Where items are stored in your home
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={LOCATION_DATA}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {LOCATION_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} items`, 'Count']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-primary" />
                    Expiry Timeline
                  </CardTitle>
                  <CardDescription>
                    Number of items expiring by time period
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={EXPIRY_DATA}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="days" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value} items`, 'Count']} />
                        <Legend />
                        <Bar dataKey="count" name="Items Expiring" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="spending" className="pt-6">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart2 className="h-5 w-5 mr-2 text-primary" />
                    Monthly Grocery Spending
                  </CardTitle>
                  <CardDescription>
                    Track your grocery expenses over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={SPENDING_DATA}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value}`, 'Spending']} />
                        <Legend />
                        <Bar dataKey="amount" name="Monthly Spending" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PieChartIcon className="h-5 w-5 mr-2 text-primary" />
                      Spending by Category
                    </CardTitle>
                    <CardDescription>
                      Where your grocery budget goes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={CATEGORY_DATA}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {CATEGORY_DATA.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2 text-primary" />
                      Shopping Frequency
                    </CardTitle>
                    <CardDescription>
                      Your shopping patterns
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex flex-col justify-center items-center">
                      <div className="text-center mb-6">
                        <div className="text-5xl font-bold text-gray-900">2.8</div>
                        <div className="text-lg text-gray-500 mt-2">Average shopping trips per week</div>
                      </div>
                      <div className="grid grid-cols-2 gap-6 w-full">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-gray-900">$34.50</div>
                          <div className="text-sm text-gray-500 mt-1">Average per trip</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-primary">Tuesday</div>
                          <div className="text-sm text-gray-500 mt-1">Most common day</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="savings" className="pt-6">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LineChartIcon className="h-5 w-5 mr-2 text-primary" />
                    Monthly Savings
                  </CardTitle>
                  <CardDescription>
                    Money saved through price comparison
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={SAVINGS_DATA}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value}`, 'Savings']} />
                        <Legend />
                        <Line type="monotone" dataKey="amount" name="Monthly Savings" stroke="#10b981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="h-5 w-5 mr-2 text-primary" />
                      Biggest Savings Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Meat</span>
                          <span className="text-sm font-medium text-green-600">$82</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Dairy</span>
                          <span className="text-sm font-medium text-green-600">$65</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Produce</span>
                          <span className="text-sm font-medium text-green-600">$48</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Pantry Items</span>
                          <span className="text-sm font-medium text-green-600">$32</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Bakery</span>
                          <span className="text-sm font-medium text-green-600">$11</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '10%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="h-5 w-5 mr-2 text-primary" />
                      Best Stores for Savings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Kroger</span>
                          <span className="text-sm font-medium text-green-600">$112</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Trader Joe's</span>
                          <span className="text-sm font-medium text-green-600">$78</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '55%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Aldi</span>
                          <span className="text-sm font-medium text-green-600">$48</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Whole Foods</span>
                          <span className="text-sm font-medium text-green-600">$0</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="h-5 w-5 mr-2 text-primary" />
                      Annual Projection
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="relative pt-1 w-44 h-44 mb-4">
                        <svg viewBox="0 0 36 36" className="w-44 h-44" style={{ transform: 'rotate(-90deg)' }}>
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="2"
                          />
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="2"
                            strokeDasharray="75, 100"
                          />
                        </svg>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                          <div className="text-3xl font-bold">75%</div>
                          <div className="text-sm text-gray-500">of goal</div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">$2,856</div>
                        <div className="text-sm text-gray-500 mt-1">Annual savings projection</div>
                        <div className="text-sm text-primary mt-1">$712 more to reach goal</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="waste" className="pt-6">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LineChartIcon className="h-5 w-5 mr-2 text-primary" />
                    Food Waste Reduction
                  </CardTitle>
                  <CardDescription>
                    Track your progress in reducing food waste
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={FOOD_WASTE_DATA}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value, name) => [`${value} lbs`, name === 'wasted' ? 'Food Wasted' : 'Food Saved']} />
                        <Legend />
                        <Area type="monotone" dataKey="wasted" name="Food Wasted" stroke="#ef4444" fill="#fecaca" />
                        <Area type="monotone" dataKey="saved" name="Food Saved" stroke="#10b981" fill="#d1fae5" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2 text-primary" />
                      Most Wasted Foods
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Leafy Greens</span>
                          <span className="text-sm font-medium text-red-600">32%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: '32%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Berries</span>
                          <span className="text-sm font-medium text-red-600">28%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Bread</span>
                          <span className="text-sm font-medium text-red-600">18%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: '18%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Herbs</span>
                          <span className="text-sm font-medium text-red-600">12%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Milk</span>
                          <span className="text-sm font-medium text-red-600">10%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2 text-primary" />
                      Common Waste Reasons
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Forgot in fridge</span>
                          <span className="text-sm font-medium text-red-600">45%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Bought too much</span>
                          <span className="text-sm font-medium text-red-600">30%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Poor storage</span>
                          <span className="text-sm font-medium text-red-600">15%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Changed plans</span>
                          <span className="text-sm font-medium text-red-600">10%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingDown className="h-5 w-5 mr-2 text-primary" />
                      Environmental Impact
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center h-full space-y-4">
                      <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold text-green-600">48 lbs</div>
                        <div className="text-sm text-gray-500">Food waste prevented</div>
                      </div>
                      <div className="w-full border-t border-gray-200 pt-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-gray-900">32 kg</div>
                            <div className="text-xs text-gray-500">CO² emissions saved</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-gray-900">1,240</div>
                            <div className="text-xs text-gray-500">Gallons of water saved</div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full border-t border-gray-200 pt-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary">Equivalent to</div>
                          <div className="text-sm text-gray-600 mt-1">Driving 80 miles less</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}