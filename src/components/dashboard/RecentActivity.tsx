import React from 'react';
import { Calendar, ShoppingBag } from 'lucide-react';
import Card from '../common/Card';
import { Receipt } from '../../types';

interface RecentActivityProps {
  receipts: Receipt[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ receipts }) => {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <Card 
      title="Recent Activity" 
      subtitle="Your latest shopping trips"
      icon={<ShoppingBag size={24} />}
      className="h-full"
    >
      <div className="space-y-4">
        {receipts.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No recent shopping activity</p>
        ) : (
          receipts.map((receipt) => (
            <div 
              key={receipt.id}
              className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-800">{receipt.store}</span>
                <span className="font-semibold text-gray-900">{formatCurrency(receipt.total)}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 space-x-1">
                <Calendar size={14} />
                <span>{formatDate(receipt.date)}</span>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  {receipt.items.length} {receipt.items.length === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default RecentActivity;