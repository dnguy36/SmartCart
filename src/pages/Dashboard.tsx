import React, { useEffect } from 'react';
import BudgetSummary from '../components/dashboard/BudgetSummary';
import RecentActivity from '../components/dashboard/RecentActivity';
import ExpiringItems from '../components/pantry/ExpiringItems';
import ReceiptScanner from '../components/receipts/ReceiptScanner';
import { mockGroceryItems, mockReceipts, mockBudget } from '../types';

const Dashboard: React.FC = () => {
  // Set page title
  useEffect(() => {
    document.title = 'Dashboard | SmartCart';
  }, []);

  return (
    <div className="pt-20">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to SmartCart</h1>
        <p className="text-gray-600 mt-1">Track your groceries, budget, and pantry all in one place</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ReceiptScanner />
        </div>
        <div>
          <BudgetSummary budget={mockBudget} />
        </div>
        <div>
          <RecentActivity receipts={mockReceipts} />
        </div>
        <div>
          <ExpiringItems items={mockGroceryItems} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;