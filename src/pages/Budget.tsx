import React, { useEffect, useState } from 'react';
import { PieChart, DollarSign, CreditCard, Calendar, TrendingUp, Edit } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { mockBudget, mockReceipts } from '../types';

const Budget: React.FC = () => {
  // Set page title
  useEffect(() => {
    document.title = 'Budget | SmartCart';
  }, []);

  const [periodFilter, setPeriodFilter] = useState<'weekly' | 'monthly'>('monthly');
  const [currentBudget, setCurrentBudget] = useState(mockBudget);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  // Calculate total spent
  const totalSpent = mockReceipts.reduce((sum, receipt) => sum + receipt.total, 0);
  
  // Calculate percentages for pie chart
  const calculateCategorySpending = () => {
    const categories: Record<string, number> = {};
    
    mockReceipts.forEach(receipt => {
      receipt.items.forEach(item => {
        if (categories[item.category]) {
          categories[item.category] += item.price;
        } else {
          categories[item.category] = item.price;
        }
      });
    });
    
    return categories;
  };
  
  const categorySpending = calculateCategorySpending();
  
  // Generate colors for categories
  const getCategoryColor = (index: number) => {
    const colors = [
      'bg-emerald-500',
      'bg-blue-500',
      'bg-indigo-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-yellow-500',
      'bg-orange-500',
      'bg-red-500',
    ];
    
    return colors[index % colors.length];
  };

  return (
    <div className="pt-20">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Budget</h1>
          <p className="text-gray-600 mt-1">Track and manage your grocery spending</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button 
            variant="outline" 
            icon={<Edit size={16} />}
          >
            Edit Budget
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card 
            title="Spending Overview" 
            subtitle={`Your ${periodFilter} grocery spending by category`}
            icon={<PieChart size={24} />}
          >
            <div className="pt-4">
              <div className="flex justify-end mb-4">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <button
                    type="button"
                    onClick={() => setPeriodFilter('weekly')}
                    className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
                      periodFilter === 'weekly'
                        ? 'bg-emerald-500 text-white border-emerald-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Weekly
                  </button>
                  <button
                    type="button"
                    onClick={() => setPeriodFilter('monthly')}
                    className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
                      periodFilter === 'monthly'
                        ? 'bg-emerald-500 text-white border-emerald-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex justify-center items-center">
                  {/* This would be a real pie chart in a production app */}
                  <div className="relative w-48 h-48 rounded-full bg-gray-100 flex items-center justify-center">
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center">
                      <span className="text-xl font-bold text-gray-800">{formatCurrency(totalSpent)}</span>
                      <span className="text-sm text-gray-600">Total Spent</span>
                    </div>
                    {/* Example pie chart segments - in a real app use a chart library */}
                    <div className="absolute inset-0">
                      <div className="w-full h-full rounded-full overflow-hidden">
                        {Object.entries(categorySpending).map(([category, amount], index) => {
                          const percentage = (amount / totalSpent) * 100;
                          const rotation = index === 0 ? 0 : 
                            Object.entries(categorySpending)
                              .slice(0, index)
                              .reduce((acc, [_, prevAmount]) => {
                                return acc + ((prevAmount / totalSpent) * 360);
                              }, 0);
                          
                          return (
                            <div 
                              key={category}
                              className={`absolute inset-0 ${getCategoryColor(index)}`}
                              style={{
                                clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(rotation * Math.PI / 180)}% ${50 - 50 * Math.sin(rotation * Math.PI / 180)}%, ${50 + 50 * Math.cos((rotation + percentage * 3.6) * Math.PI / 180)}% ${50 - 50 * Math.sin((rotation + percentage * 3.6) * Math.PI / 180)}%)`,
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-3">Spending by Category</h3>
                  <div className="space-y-3">
                    {Object.entries(categorySpending)
                      .sort(([_, a], [__, b]) => b - a)
                      .map(([category, amount], index) => {
                        const percentage = ((amount / totalSpent) * 100).toFixed(1);
                        
                        return (
                          <div key={category} className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${getCategoryColor(index)}`}></div>
                            <div className="flex-grow">
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">{category}</span>
                                <span className="text-sm text-gray-600">{percentage}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div
                                  className={getCategoryColor(index)}
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        <div>
          <Card 
            title="Budget Details" 
            subtitle="Your current grocery budget"
            icon={<DollarSign size={24} />}
            className="h-full"
          >
            <div className="space-y-6">
              <div className="bg-emerald-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-emerald-800">
                    {currentBudget.period.charAt(0).toUpperCase() + currentBudget.period.slice(1)} Budget
                  </span>
                  <button className="text-emerald-700 hover:text-emerald-800">
                    <Edit size={14} />
                  </button>
                </div>
                <div className="text-2xl font-bold text-emerald-700">
                  {formatCurrency(currentBudget.amount)}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 mb-3 flex items-center space-x-1">
                  <CreditCard size={16} />
                  <span>Category Allocations</span>
                </h3>
                <div className="space-y-3">
                  {Object.entries(currentBudget.categories).map(([category, amount]) => (
                    <div key={category} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{category}</span>
                      <span className="font-medium text-gray-800">{formatCurrency(amount)}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 mb-3 flex items-center space-x-1">
                  <Calendar size={16} />
                  <span>Budget Period</span>
                </h3>
                <div className="text-sm text-gray-600">
                  <p>Started: {new Date(currentBudget.startDate).toLocaleDateString()}</p>
                  <p>Resets: {
                    currentBudget.period === 'monthly' 
                      ? new Date(new Date(currentBudget.startDate).setMonth(new Date(currentBudget.startDate).getMonth() + 1)).toLocaleDateString()
                      : new Date(new Date(currentBudget.startDate).setDate(new Date(currentBudget.startDate).getDate() + 7)).toLocaleDateString()
                  }</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Budget;