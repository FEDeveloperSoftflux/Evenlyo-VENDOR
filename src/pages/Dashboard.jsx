import React from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import StatCard from "../components/dashboard/StatCard";
import OrdersChart from "../components/dashboard/OrdersChart";
import RecentBookings from "../components/dashboard/RecentBookings";
import RecentlyJoined from "../components/dashboard/RecentlyJoined";
import ActivityLog from "../components/dashboard/ActivityLog";
import WelcomeSection from "../components/dashboard/WelcomeSection";

const Dashboard = ({ onNavigate }) => {
  const stats = [
    {
      title: "All Clients",
      value: "1,247",
      change: "+12% from last month",
      iconType: "users",
      highlighted: false,
    },
    {
      title: "Total Items",
      value: "89",
      change: "+5% from last month",
      iconType: "package",
      highlighted: true,
    },
    {
      title: "Complete Bookings",
      value: "456",
      change: "+18% from last month",
      iconType: "check",
      highlighted: false,
    },
    {
      title: "Monthly Revenue",
      value: "$12,450",
      change: "-3% from last month",
      iconType: "dollar",
      highlighted: false,
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar activeItem="Dashboard" onNavigate={onNavigate} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          userName="John Doe"
          userRole="Vendor"
          currentModule="Dashboard"
        />

        {/* Welcome Section - Only for Dashboard */}
        <WelcomeSection userName="John Doe" userRole="Vendor" />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-8 bg-background">
          <div className="max-w-7xl mx-auto">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  change={stat.change}
                  iconType={stat.iconType}
                  highlighted={stat.highlighted}
                />
              ))}
            </div>

            {/* Charts and Lists */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
              <div className="w-full min-h-0 flex flex-col">
                <OrdersChart />
              </div>
              <div className="w-full min-h-0 flex flex-col">
                <RecentBookings />
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
              <div className="w-full min-h-0 flex flex-col">
                <RecentlyJoined />
              </div>
              <div className="w-full min-h-0 flex flex-col">
                <ActivityLog />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
