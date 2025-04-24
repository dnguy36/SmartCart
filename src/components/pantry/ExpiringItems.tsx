import React from 'react';
import { AlertTriangle, Clock } from 'lucide-react';
import Card from '../common/Card';
import { GroceryItem } from '../../types';

interface ExpiringItemsProps {
  items: GroceryItem[];
}

const ExpiringItems: React.FC<ExpiringItemsProps> = ({ items }) => {
  // Filter for items expiring in the next 5 days
  const now = new Date();
  const fiveDaysFromNow = new Date();
  fiveDaysFromNow.setDate(fiveDaysFromNow.getDate() + 5);

  const expiringItems = items
    .filter(item => {
      if (!item.expiryDate || item.consumed) return false;
      const expiryDate = new Date(item.expiryDate);
      return expiryDate >= now && expiryDate <= fiveDaysFromNow;
    })
    .sort((a, b) => new Date(a.expiryDate!).getTime() - new Date(b.expiryDate!).getTime());

  // Calculate days until expiry
  const getDaysUntilExpiry = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get appropriate badge color based on days until expiry
  const getBadgeColor = (days: number) => {
    if (days <= 1) return 'bg-red-100 text-red-800';
    if (days <= 3) return 'bg-orange-100 text-orange-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  return (
    <Card 
      title="Expiring Soon" 
      subtitle="Items to use in the next 5 days"
      icon={<Clock size={24} />}
      className="h-full"
    >
      <div className="space-y-4">
        {expiringItems.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <p>No items expiring soon</p>
            <p className="text-sm mt-1">Everything in your pantry is fresh!</p>
          </div>
        ) : (
          expiringItems.map((item) => {
            const daysUntil = getDaysUntilExpiry(item.expiryDate!);
            return (
              <div 
                key={item.id}
                className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.quantity} {item.unit || 'units'} • {item.location}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getBadgeColor(daysUntil)}`}>
                    {daysUntil === 0 
                      ? 'Today' 
                      : daysUntil === 1 
                        ? 'Tomorrow' 
                        : `${daysUntil} days`}
                  </span>
                </div>
              </div>
            );
          })
        )}
        
        {expiringItems.length > 0 && (
          <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-start space-x-2 mt-4">
            <AlertTriangle size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-700">
              Use these items soon to reduce food waste and save money!
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ExpiringItems;