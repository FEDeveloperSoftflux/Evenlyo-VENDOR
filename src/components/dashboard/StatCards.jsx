import React from 'react';
import StatCard from './StatCard';

const StatCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          valueColor={stat.valueColor}
          iconType={stat.iconType}
          dotColor={stat.dotColor}
          highlighted={stat.highlighted}
          showIcon={stat.showIcon !== false} // Default to true for dashboard
        />
      ))}
    </div>
  );
};

export default StatCards;
