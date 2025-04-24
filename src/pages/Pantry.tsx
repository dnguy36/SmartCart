import React, { useEffect, useState } from 'react';
import { Search, Package, Filter, PlusCircle, Check, X } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import PantryStats from '../components/pantry/PantryStats';
import ExpiringItems from '../components/pantry/ExpiringItems';
import { GroceryItem, mockGroceryItems } from '../types';

const Pantry: React.FC = () => {
  // Set page title
  useEffect(() => {
    document.title = 'Pantry | SmartCart';
  }, []);

  const [items, setItems] = useState<GroceryItem[]>(mockGroceryItems);
  const [filterLocation, setFilterLocation] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showConsumed, setShowConsumed] = useState(false);

  // Filter items based on search term, location filter, and consumed status
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = filterLocation === 'all' || item.location === filterLocation;
    const matchesConsumed = showConsumed || !item.consumed;
    
    return matchesSearch && matchesLocation && matchesConsumed;
  });

  // Toggle consumed status for an item
  const toggleConsumed = (id: string) => {
    setItems(items.map(item => 
      item.id === id 
        ? { ...item, consumed: !item.consumed } 
        : item
    ));
  };

  // Format date
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="pt-20">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Pantry</h1>
          <p className="text-gray-600 mt-1">Manage your food inventory</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button 
            variant="primary" 
            icon={<PlusCircle size={16} />}
          >
            Add Item Manually
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <PantryStats items={items} />
        </div>
        <div>
          <ExpiringItems items={items} />
        </div>
      </div>
      
      <Card 
        title="Pantry Inventory" 
        subtitle="All your food items in one place"
        icon={<Package size={24} />}
      >
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={16} className="text-gray-500" />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Search items by name or category"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter size={16} className="text-gray-600" />
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                >
                  <option value="all">All Locations</option>
                  <option value="pantry">Pantry</option>
                  <option value="refrigerator">Refrigerator</option>
                  <option value="freezer">Freezer</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="show-consumed"
                  checked={showConsumed}
                  onChange={() => setShowConsumed(!showConsumed)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="show-consumed" className="text-sm text-gray-600">
                  Show Consumed
                </label>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left font-medium text-gray-600 border-b">Item</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600 border-b">Category</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600 border-b">Location</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600 border-b">Quantity</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-600 border-b">Expiry Date</th>
                  <th className="py-3 px-4 text-center font-medium text-gray-600 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-4 px-6 text-center text-gray-500">
                      No items found
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
                    <tr 
                      key={item.id}
                      className={`hover:bg-gray-50 transition-colors ${
                        item.consumed ? 'bg-gray-50 text-gray-400' : ''
                      }`}
                    >
                      <td className="py-3 px-4 border-b border-gray-200 font-medium">
                        {item.name}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-200">
                        {item.category}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-200 capitalize">
                        {item.location || 'N/A'}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-200">
                        {item.quantity} {item.unit || 'units'}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-200">
                        {formatDate(item.expiryDate)}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-200 text-center">
                        <button
                          onClick={() => toggleConsumed(item.id)}
                          className={`p-1.5 rounded-full ${
                            item.consumed 
                              ? 'bg-gray-200 text-gray-600 hover:bg-gray-300' 
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                          title={item.consumed ? 'Mark as available' : 'Mark as consumed'}
                        >
                          {item.consumed ? <X size={16} /> : <Check size={16} />}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Pantry;