import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import Card from '../ui/Card';

const CategoryPieChart = () => {
  const categoryData = [
    { name: 'DJ', value: 4500, color: '#FF295D', percentage: 45 },
    { name: 'Live Band', value: 2500, color: '#5A5BFF', percentage: 25 },
    { name: 'Photo Booth', value: 1500, color: '#FFC107', percentage: 15 },
    { name: 'Sound System', value: 1500, color: '#10B981', percentage: 15 }
  ];

  const CustomLegend = ({ payload }) => {
    return (
      <div className="space-y-3 mt-6">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm font-medium text-gray-700">
                {entry.value}
              </span>
            </div>
            <span className="text-sm font-semibold text-gray-900">
              ${categoryData[index]?.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="600"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Profit by Item Category</h3>
        <div>
          <select className="text-sm text-gray-700 bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent cursor-pointer transition-colors hover:border-gray-400">
            <option>1 Month</option>
            <option>3 Months</option>
            <option>6 Months</option>
            <option>1 Year</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Pie Chart */}
        <div className="flex-shrink-0 w-80 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                strokeWidth={0}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex-1">
          <CustomLegend 
            payload={categoryData.map(item => ({ 
              value: item.name, 
              color: item.color 
            }))} 
          />
          
          {/* Total */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Total Revenue</span>
              <span className="text-lg font-bold text-gray-900">
                ${categoryData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CategoryPieChart;
