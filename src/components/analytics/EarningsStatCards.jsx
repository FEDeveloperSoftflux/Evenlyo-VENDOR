import React from "react";
import Card from "../ui/Card";
import {
  TrendingUp,
  DollarSign,
  Calendar,
  HandCoins,
  Wallet,
} from "lucide-react";
import dashC4 from "../../assets/icons/dash-c4.svg";

const EarningsStatCards = () => {
  const earningsData = [
    {
      title: "Today Earning",
      value: "$2,450",
      change: "+12.5% from to Day",
      icon: "svg",
      iconSrc: dashC4,
      highlighted: false,
      iconBg: "border border-gray-200",
      iconColor: "text-pink-600",
      border: "border border-gray-200",
    },
    {
      title: "Last Week Earning",
      value: "$18,500",
      change: "-3.2% from last Week",
      icon: HandCoins,
      highlighted: true,
      iconBg: "border border-gray-200",
      iconColor: "opacity-90",
      border: "border border-gray-200",
    },
    {
      title: "Total Earning",
      value: "$125,000",
      change: "+8.7% from last month",
      icon: TrendingUp,
      highlighted: false,
      iconBg: "border border-gray-200",
      iconColor: "text-pink-600",
      background: "bg-white",
      border: "border border-gray-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {earningsData.map((item, index) => (
        <Card
          key={index}
          gradient={item.highlighted && !item.background}
          className={`p-6 relative overflow-hidden ${item.border || ""} ${
            item.background ? item.background : ""
          }`}
        >
          <div className="relative z-10">
            {/* Icon */}
            <div
              className={`absolute right-4 top-4 w-10 h-10 ${item.iconBg} rounded-xl flex items-center justify-center`}
            >
              {item.icon === "svg" ? (
                <img src={item.iconSrc} alt="icon" className="w-5 h-5" />
              ) : (
                <item.icon className={`w-5 h-5 ${item.iconColor}`} />
              )}
            </div>

            {/* Content */}
            <div className="pr-16">
              <p
                className={`text-sm font-medium mb-3 ${
                  item.highlighted ? "text-white/90" : "text-gray-700"
                }`}
              >
                {item.title}
              </p>

              <p
                className={`text-3xl md:text-4xl font-bold mb-2 ${
                  item.highlighted ? "text-white" : "text-gray-900"
                }`}
              >
                {item.value}
              </p>

              <p
                className={`text-xs md:text-sm ${
                  item.highlighted ? "text-white/80" : "text-gray-500"
                }`}
              >
                {item.change}
              </p>
            </div>
          </div>

          {/* Gradient overlay for highlighted card */}
          {item.highlighted && (
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          )}
        </Card>
      ))}
    </div>
  );
};

export default EarningsStatCards;
