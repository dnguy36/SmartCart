import React from 'react';
import { PieChart, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';
import Card from '../common/Card';
import { Budget, mockReceipts } from '../../types';

interface BudgetSummaryProps {
  budget: Budget;
}

const BudgetSummary: React.FC<BudgetSummaryProps> = ({ budget }) => {
  // Calculate total spent this period
  const totalSpent = mockReceipts.reduce((sum, receipt) => sum + receipt.total, 0);
  
  // Calculate percentage of budget spent
  const percentSpent = (totalSpent / budget.amount) * 100;
  
  // Determine if over budget
  const isOverBudget = totalSpent > budget.amount;
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Card 
      title="Budget Summary" 
      subtitle={`${budget.period.charAt(0).toUpperCase() + budget.period.slice(1)} Budget`}
      icon={<PieChart size={24} />}
      className="h-full"
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Budget:</span>
          <span className="font-semibold text-gray-800">{formatCurrency(budget.amount)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Spent so far:</span>
          <span className="font-semibold text-gray-800">{formatCurrency(totalSpent)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Remaining:</span>
          <span className={`font-semibold ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
            {formatCurrency(budget.amount - totalSpent)}
          </span>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">Budget progress</span>
            <span className="text-sm font-medium text-gray-700">{percentSpent.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${
                percentSpent < 70 
                  ? 'bg-green-600' 
                  : percentSpent < 90 
                    ? 'bg-yellow-500' 
                    : 'bg-red-600'
              }`}
              style={{ width: `${Math.min(percentSpent, 100)}%` }}
            ></div>
          </div>
        </div>
        
        {/* Alert if over budget */}
        {isOverBudget && (
          <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-start space-x-2">
            <AlertTriangle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-red-700">Budget Exceeded</p>
              <p className="text-sm text-red-600">
                You've spent {formatCurrency(totalSpent - budget.amount)} over your {budget.period} budget.
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default BudgetSummary;