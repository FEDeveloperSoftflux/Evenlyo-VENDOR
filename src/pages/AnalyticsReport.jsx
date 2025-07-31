import React, { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import EarningsStatCards from "../components/analytics/EarningsStatCards";
import EarningsLineChart from "../components/analytics/EarningsLineChart";
import CategoryPieChart from "../components/analytics/CategoryPieChart";
import BookingTable from "../components/analytics/BookingTable";
import ExportReportModal from "../components/analytics/ExportReportModal";
import { Download } from "lucide-react";

const AnalyticsReport = ({ onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleExportClick = () => {
    setIsExportModalOpen(true);
  };

  const closeExportModal = () => {
    setIsExportModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        activeItem="Analytics & Report"
        isOpen={sidebarOpen}
        onClose={closeSidebar}
        onNavigate={onNavigate}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          userName="John Doe"
          userRole="Vendor"
          currentModule="Analytics & Report"
          onMenuToggle={toggleSidebar}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-6 lg:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Analytics & Report
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                You can directly view your payout & Earnings
              </p>
            </div>

            {/* Earnings Statistics Cards */}
            <div className="mb-6 lg:mb-8">
              <EarningsStatCards />
            </div>

            {/* Date Range Filter */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6 lg:mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  Filter by Date Range:
                </span>
                <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 w-full sm:w-auto">
                  <input
                    type="date"
                    className="w-full xs:w-auto px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Filter by date"
                  />
                  <span className="text-gray-500 text-sm hidden xs:block">
                    to
                  </span>
                  <input
                    type="date"
                    className="w-full xs:w-auto px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Filter by date"
                  />
                </div>
              </div>

              <div className="flex flex-col xs:flex-row gap-3 w-full lg:w-auto">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors">
                  <Download className="w-4 h-4 inline-block mr-2" />
                  Export CSV
                </button>
                <button
                  onClick={handleExportClick}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-600 to-pink-700 rounded-lg hover:from-pink-700 hover:to-pink-800 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors"
                >
                  <Download className="w-4 h-4 inline-block mr-2 text-white" />
                  Export PDF
                </button>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 lg:mb-8">
              <div className="w-full min-h-0">
                <EarningsLineChart />
              </div>
              <div className="w-full min-h-0">
                <CategoryPieChart />
              </div>
            </div>

            {/* Booking Table */}
            <div className="w-full">
              <BookingTable onExportClick={handleExportClick} />
            </div>
          </div>
        </main>
      </div>

      {/* */}
      {isExportModalOpen && <ExportReportModal onClose={closeExportModal} />}
    </div>
  );
};

export default AnalyticsReport;
