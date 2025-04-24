import React, { useEffect, useState } from 'react';
import { Receipt, Search, Plus, Calendar, ArrowDown, ArrowUp } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import ReceiptScanner from '../components/receipts/ReceiptScanner';
import { mockReceipts } from '../types';

const Receipts: React.FC = () => {
  // Set page title
  useEffect(() => {
    document.title = 'Receipts | SmartCart';
  }, []);

  const [sortBy, setSortBy] = useState<'date' | 'store' | 'amount'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');

  // Sort and filter receipts
  const sortedReceipts = [...mockReceipts]
    .filter(receipt => 
      receipt.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc' 
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === 'store') {
        return sortOrder === 'asc'
          ? a.store.localeCompare(b.store)
          : b.store.localeCompare(a.store);
      } else {
        return sortOrder === 'asc'
          ? a.total - b.total
          : b.total - a.total;
      }
    });

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

  // Toggle sort
  const toggleSort = (column: 'date' | 'store' | 'amount') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  return (
    <div className="pt-20">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Receipts</h1>
          <p className="text-gray-600 mt-1">View and scan your grocery receipts</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button 
            variant="primary" 
            icon={<Plus size={16} />}
            onClick={() => document.getElementById('receipt-upload')?.click()}
          >
            Scan New Receipt
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <ReceiptScanner />
        </div>
        
        <div className="md:col-span-2">
          <Card 
            title="Receipt History" 
            subtitle="View all your past grocery purchases"
            icon={<Receipt size={24} />}
          >
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={16} className="text-gray-500" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Search by store or item name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-3 px-4 text-left font-medium text-gray-600 border-b">
                        <button 
                          className="flex items-center space-x-1"
                          onClick={() => toggleSort('date')}
                        >
                          <span>Date</span>
                          {sortBy === 'date' && (
                            sortOrder === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                          )}
                        </button>
                      </th>
                      <th className="py-3 px-4 text-left font-medium text-gray-600 border-b">
                        <button 
                          className="flex items-center space-x-1"
                          onClick={() => toggleSort('store')}
                        >
                          <span>Store</span>
                          {sortBy === 'store' && (
                            sortOrder === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                          )}
                        </button>
                      </th>
                      <th className="py-3 px-4 text-left font-medium text-gray-600 border-b">
                        <span>Items</span>
                      </th>
                      <th className="py-3 px-4 text-right font-medium text-gray-600 border-b">
                        <button 
                          className="flex items-center space-x-1 ml-auto"
                          onClick={() => toggleSort('amount')}
                        >
                          <span>Amount</span>
                          {sortBy === 'amount' && (
                            sortOrder === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                          )}
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedReceipts.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-4 px-6 text-center text-gray-500">
                          No receipts found
                        </td>
                      </tr>
                    ) : (
                      sortedReceipts.map((receipt) => (
                        <tr 
                          key={receipt.id}
                          className="hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <td className="py-3 px-4 border-b border-gray-200">
                            <div className="flex items-center space-x-2">
                              <Calendar size={16} className="text-gray-400" />
                              <span>{formatDate(receipt.date)}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 border-b border-gray-200 font-medium">
                            {receipt.store}
                          </td>
                          <td className="py-3 px-4 border-b border-gray-200 text-gray-600">
                            {receipt.items.length} items
                          </td>
                          <td className="py-3 px-4 border-b border-gray-200 text-right font-semibold">
                            {formatCurrency(receipt.total)}
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
      </div>
    </div>
  );
};

export default Receipts;