import React from 'react';
import { BarChart2, DollarSign, Package } from 'lucide-react';
import Card from '../common/Card';
import { GroceryItem } from '../../types';

interface PantryStatsProps {
  items: GroceryItem[];
}

const PantryStats: React.FC<PantryStatsProps> = ({ items }) => {
  // Calculate total value of pantry
  const totalValue = items
    .filter(item => !item.consumed)
    .reduce((sum, item) => sum + item.price, 0);
  
  // Count items by location
  const itemsByLocation = items
    .filter(item => !item.consumed)
    .reduce((acc, item) => {
      const location = item.location || 'other';
      acc[location] = (acc[location] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  
  // Count items by category
  const itemsByCategory = items
    .filter(item => !item.consumed)
    .reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Card 
      title="Pantry Overview" 
      subtitle="Your inventory at a glance"
      icon={<Package size={24} />}
      className="h-full"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-emerald-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <Package size={18} className="text-emerald-600" />
              <span className="text-sm font-medium text-emerald-800">Total Items</span>
            </div>
            <p className="text-2xl font-bold text-emerald-700">
              {items.filter(item => !item.consumed).length}
            </p>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <DollarSign size={18} className="text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Total Value</span>
            </div>
            <p className="text-2xl font-bold text-blue-700">
              {formatCurrency(totalValue)}
            </p>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-700 mb-2 flex items-center space-x-1">
            <BarChart2 size={16} />
            <span>Items by Location</span>
          </h4>
          <div className="space-y-2">
            {Object.entries(itemsByLocation).map(([location, count]) => (
              <div key={location} className="flex items-center">
                <span className="text-sm text-gray-600 capitalize w-1/3">{location}</span>
                <div className="w-2/3 flex items-center space-x-2">
                  <div className="flex-grow bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        location === 'pantry' 
                          ? 'bg-emerald-500' 
                          : location === 'refrigerator' 
                            ? 'bg-blue-500' 
                            : location === 'freezer' 
                              ? 'bg-purple-500' 
                              : 'bg-gray-500'
                      }`}
                      style={{ width: `${(count / items.length) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PantryStats;