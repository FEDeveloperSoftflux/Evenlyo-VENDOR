import React, { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import Card from "../ui/Card";

const ListingBarChart = ({ 
  data: propData,
  title = "Most Booked Items Overview",
  className = ""
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState("1 Month");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const periods = ["1 Month", "3 Months", "6 Months", "1 Year"];

  // Default data if no data is provided
  const defaultData = [
    { name: "Food & Drinks", value: 400, shortName: "Food & Drinks" },
    {
      name: "Decoration & Styling",
      value: 1400,
      shortName: "Decoration & Styling",
    },
    {
      name: "Location & Party Tents",
      value: 1100,
      shortName: "Location & Party Tents",
    },
    {
      name: "Entertainment & Attractions",
      value: 1600,
      shortName: "Entertainment & Attractions",
    },
    { name: "Staff & Services", value: 550, shortName: "Staff & Services" },
    { name: "Food & Drinks", value: 1300, shortName: "Food & Drinks" },
    {
      name: "Decoration & Styling",
      value: 1420,
      shortName: "Decoration & Styling",
    },
    {
      name: "Location & Party Tents",
      value: 1280,
      shortName: "Location & Party Tents",
    },
  ];

  const data = propData || defaultData;

  // Calculate dynamic scale values
  const { maxValue, minValue, yAxisLabels, originalMax } = useMemo(() => {
    const max = Math.max(...data.map((item) => item.value));
    const min = Math.min(...data.map((item) => item.value), 0);
    
    // Create a nice scale with 5 points
    const range = max - min;
    const padding = range * 0.1; // 10% padding
    const adjustedMax = max + padding;
    const adjustedMin = Math.max(0, min - padding);
    
    const step = (adjustedMax - adjustedMin) / 4;
    const labels = [];
    
    for (let i = 4; i >= 0; i--) {
      const value = adjustedMin + (step * i);
      labels.push(Math.round(value));
    }
    
    return {
      maxValue: adjustedMax,
      minValue: adjustedMin,
      yAxisLabels: labels,
      originalMax: max
    };
  }, [data]);

  return (
    <Card className={`p-4 sm:p-6 bg-white ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-3 sm:space-y-0">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
          {title}
        </h3>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 px-3 py-2 text-xs sm:text-sm text-gray-500 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none"
          >
            <span>{selectedPeriod}</span>
            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-28 sm:w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              {periods.map((period) => (
                <button
                  key={period}
                  onClick={() => {
                    setSelectedPeriod(period);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {period}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
        {/* Y-axis */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 pr-2 sm:pr-3 w-8 sm:w-12">
          {yAxisLabels.map((label, index) => (
            <span key={index} className="text-right">
              {label.toLocaleString()}
            </span>
          ))}
        </div>

        {/* Grid Lines */}
        <div className="absolute left-8 sm:left-12 top-0 right-0 h-full">
          {[0, 1, 2, 3, 4].map((line, index) => (
            <div
              key={line}
              className="absolute w-full border-t border-gray-100"
              style={{ top: `${(index / 4) * 100}%` }}
            />
          ))}
        </div>

        {/* Chart Bars */}
        <div className="absolute left-8 sm:left-12 top-0 right-0 h-full flex items-end justify-between px-1">
          {data.map((item, index) => {
            const heightPercentage = Math.max(1, (item.value / originalMax) * 90); // Use original max, 90% of container height, minimum 1%
            const barWidth = data.length <= 4 ? "20%" : data.length <= 6 ? "14%" : "11%";
            const minWidth = data.length <= 4 ? "60px" : data.length <= 6 ? "45px" : "32px";
            
            return (
              <div
                key={index}
                className="flex flex-col items-center group"
                style={{ 
                  width: barWidth, 
                  minWidth: minWidth,
                  maxWidth: "120px"
                }}
              >
                <div
                  className="w-full rounded-t-lg transition-all duration-300 hover:opacity-80 cursor-pointer relative overflow-hidden"
                  style={{
                    height: `${heightPercentage}%`,
                    minHeight: "12px",
                    background:
                      "linear-gradient(180deg, #FF295D 0%, #E31B95 48.56%, #C817AE 100%)",
                    boxShadow: "0 2px 8px rgba(255, 41, 93, 0.3)",
                  }}
                  title={`${item.name}: ${item.value.toLocaleString()} bookings`}
                >
                  {/* Value label on hover */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                    {item.value.toLocaleString()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* X-axis Labels */}
        <div className="absolute -bottom-12 sm:-bottom-16 left-8 sm:left-12 right-0 flex justify-between px-1">
          {data.map((item, index) => {
            const barWidth = data.length <= 4 ? "20%" : data.length <= 6 ? "14%" : "11%";
            const minWidth = data.length <= 4 ? "60px" : data.length <= 6 ? "45px" : "32px";
            
            return (
              <div
                key={index}
                className="text-center"
                style={{ 
                  width: barWidth, 
                  minWidth: minWidth,
                  maxWidth: "120px"
                }}
              >
                <div className="text-xs text-gray-500 leading-tight px-1">
                  {item.shortName || item.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Extra spacing for labels */}
      <div className="h-12 sm:h-16"></div>
    </Card>
  );
};

export default ListingBarChart;
