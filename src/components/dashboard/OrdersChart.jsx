import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';
import Card from '../ui/Card';

const OrdersChart = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('1 Month');

  const data = [
    { day: 'Mon', orders: 16 },
    { day: 'Tue', orders: 14 },
    { day: 'Wed', orders: 20 },
    { day: 'Thu', orders: 32 },
    { day: 'Fri', orders: 22 },
    { day: 'Sat', orders: 26 },
  ];

  const periods = ['1 Month', '3 Months', '6 Months', '1 Year'];

  return (
    <Card className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h3 className="text-lg font-semibold text-gray-900">Orders Overview</h3>
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto justify-between sm:justify-center"
          >
            <span>{selectedPeriod}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              {periods.map((period) => (
                <button
                  key={period}
                  onClick={() => {
                    setSelectedPeriod(period);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  {period}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="h-48 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9CA3AF' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9CA3AF' }}
              domain={[0, 32]}
              width={30}
            />
            <Line 
              type="monotone" 
              dataKey="orders" 
              stroke="url(#gradient)" 
              strokeWidth={3}
              dot={{ fill: '#E31B95', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#E31B95' }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF295D" />
                <stop offset="50%" stopColor="#E31B95" />
                <stop offset="100%" stopColor="#C817AE" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span className="font-medium">Peak: 32</span>
        <span className="text-xs sm:text-sm">Thu: 32 orders</span>
      </div>
    </Card>
  );
};

export default OrdersChart;
