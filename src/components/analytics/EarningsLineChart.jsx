import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../ui/Card';

const EarningsLineChart = () => {
  const earningsData = [
    { date: 'May 29', earning: 700, displayDate: 'May 29' },
    { date: 'Jun 01', earning: 650, displayDate: 'Jun 01' },
    { date: 'Jun 07', earning: 580, displayDate: 'Jun 07' },
    { date: 'Jun 12', earning: 750, displayDate: 'Jun 12' },
    { date: 'Jun 15', earning: 720, displayDate: 'Jun 15' },
    { date: 'Jun 20', earning: 865, displayDate: 'Jun 20' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-medium text-gray-700">{label}</p>
          <p className="text-sm font-semibold text-pink-600">
            Earning: ${payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Booking Earnings</h3>
        <div>
          <select className="text-sm text-gray-700 bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent cursor-pointer transition-colors hover:border-gray-400">
            <option>1 Month</option>
            <option>3 Months</option>
            <option>6 Months</option>
            <option>1 Year</option>
          </select>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={earningsData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#f0f0f0" 
              vertical={false}
            />
            <XAxis 
              dataKey="displayDate"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={(value) => `$${value}`}
              domain={['dataMin - 100', 'dataMax + 100']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="earning" 
              stroke="#E31B95"
              strokeWidth={3}
              dot={{ 
                fill: '#E31B95', 
                r: 6,
                stroke: '#fff',
                strokeWidth: 2
              }}
              activeDot={{ 
                r: 8, 
                fill: '#E31B95',
                stroke: '#fff',
                strokeWidth: 3
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Additional Info */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Peak Earning</span>
          <span className="font-semibold text-gray-900">$865 (Jun 20)</span>
        </div>
      </div>
    </Card>
  );
};

export default EarningsLineChart;
