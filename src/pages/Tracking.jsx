import React, { useState, useEffect } from "react";
import { Search, Filter, Download, ChevronDown } from "lucide-react";
import TrackingTable from "../components/tracking/TrackingTable";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Card from "../components/ui/Card";
import userPhoto from "../assets/images/jaydeep.png";

const Tracking = ({ onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subCategoryFilter, setSubCategoryFilter] = useState("");
  const [vendorFilter, setVendorFilter] = useState("");
  const [trackingData, setTrackingData] = useState([
    // Initial data will be set below
  ]);

  // Initialize tracking data
  useEffect(() => {
    setTrackingData(initialTrackingData);
  }, []);

  // Handle status change
  const handleStatusChange = (orderId, newStatus) => {
    setTrackingData((prevData) =>
      prevData.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  // Comprehensive sample data for tracking
  const initialTrackingData = [
    {
      id: "TRK002",
      dateTime: "2024-06-27 10:00",
      buyer: {
        avatar: userPhoto,
        name: "Jane Doe",
        id: "USR002",
        email: "jane@example.com",
        phone: "1234567891",
        location: "789 Main St, Central City",
      },
      seller: {
        avatar: userPhoto,
        name: "Tech Store",
        location: "New York, NY",
        email: "tech@example.com",
        phone: "1234567890",
      },
      items: ["Laptop, Mouse"],
      deliveryDate: "2024-06-28",
      destination: "789 Main St, Central City",
      status: "on the way",
    },
    {
      id: "TRK003",
      dateTime: "2024-06-26 14:30",
      buyer: {
        avatar: userPhoto,
        name: "Mike Johnson",
        id: "USR003",
        email: "mike@example.com",
        phone: "1234567892",
        location: "321 Oak Ave, East Side",
      },
      seller: {
        avatar: userPhoto,
        name: "Electronics Hub",
        location: "California, CA",
        email: "hub@example.com",
        phone: "1234567893",
      },
      items: ["Smartphone, Case"],
      deliveryDate: "2024-06-29",
      destination: "321 Oak Ave, East Side",
      status: "received back",
    },
    {
      id: "TRK004",
      dateTime: "2024-06-25 09:15",
      buyer: {
        avatar: userPhoto,
        name: "Sarah Wilson",
        id: "USR004",
        email: "sarah@example.com",
        phone: "1234567894",
        location: "654 Pine St, West End",
      },
      seller: {
        avatar: userPhoto,
        name: "Gadget World",
        location: "Texas, TX",
        email: "gadget@example.com",
        phone: "1234567895",
      },
      items: ["Tablet, Keyboard"],
      deliveryDate: "2024-06-30",
      destination: "654 Pine St, West End",
      status: "complete",
    },
    {
      id: "TRK005",
      dateTime: "2024-06-24 16:45",
      buyer: {
        avatar: userPhoto,
        name: "Tom Brown",
        id: "USR005",
        email: "tom@example.com",
        phone: "1234567896",
        location: "987 Elm St, South Side",
      },
      seller: {
        avatar: userPhoto,
        name: "Digital Store",
        location: "Florida, FL",
        email: "digital@example.com",
        phone: "1234567897",
      },
      items: ["Camera, Lens"],
      deliveryDate: "2024-07-01",
      destination: "987 Elm St, South Side",
      status: "rejected",
    },
    {
      id: "TRK006",
      dateTime: "2024-06-23 11:20",
      buyer: {
        avatar: userPhoto,
        name: "Lisa Davis",
        id: "USR006",
        email: "lisa@example.com",
        phone: "1234567898",
        location: "147 Maple Ave, North Side",
      },
      seller: {
        avatar: userPhoto,
        name: "Tech Solutions",
        location: "Washington, WA",
        email: "solutions@example.com",
        phone: "1234567899",
      },
      items: ["Headphones, Speaker"],
      deliveryDate: "2024-07-02",
      destination: "147 Maple Ave, North Side",
      status: "claim",
    },
    {
      id: "TRK007",
      dateTime: "2024-06-22 15:30",
      buyer: {
        avatar: userPhoto,
        name: "David Wilson",
        id: "USR007",
        email: "david@example.com",
        phone: "1234567800",
        location: "258 Event Plaza, Downtown",
      },
      seller: {
        avatar: userPhoto,
        name: "Event Equipment Co",
        location: "New York, NY",
        email: "events@example.com",
        phone: "1234567801",
      },
      items: ["DJ Console", "Speaker Set", "Stage Lights"],
      deliveryDate: "2024-07-03",
      destination: "258 Event Plaza, Downtown",
      status: "pickedup",
    },
  ];

  const filteredData = trackingData.filter((item) => {
    return (
      (searchTerm === "" ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "" || item.status === statusFilter)
    );
  });

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        activeItem="Tracking"
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNavigate={onNavigate}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          userName="John Doe"
          userRole="Vendor"
          currentModule="Tracking"
          onMenuToggle={() => setIsSidebarOpen(true)}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {/* Header Section */}
              <div className="mb-6">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  All Order Tracking
                </h1>
                <p className="text-gray-600 text-sm lg:text-base">
                  You can track, see status and download the invoice
                </p>
              </div>

              {/* Filters */}
              <Card className="p-4 sm:p-6 mb-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Search Input */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Item Name / ID"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-mid focus:border-transparent transition-colors text-sm"
                    />
                  </div>

                  {/* Filter Dropdowns */}
                  <div className="flex flex-wrap gap-3 lg:gap-4">
                    <select
                      className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-mid focus:outline-none bg-white text-sm hover:border-gray-400 transition-colors min-w-[120px]"
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                      <option value="">Main Category</option>
                      <option value="entertainment">
                        Entertainment & Attractions
                      </option>
                      <option value="food">Food & Drinks</option>
                      <option value="decoration">Decoration & Styling</option>
                      <option value="locations">Locations & Party Tents</option>
                      <option value="staff">Staff & Services</option>
                    </select>

                    <select
                      className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-mid focus:outline-none bg-white text-sm hover:border-gray-400 transition-colors min-w-[120px]"
                      value={subCategoryFilter}
                      onChange={(e) => setSubCategoryFilter(e.target.value)}
                    >
                      <option value="">Sub Category</option>
                      <option value="dj">DJ</option>
                      <option value="live_band">Live Band</option>
                      <option value="photo_booth">Photo Booth</option>
                    </select>

                    <select
                      className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-mid focus:outline-none bg-white text-sm hover:border-gray-400 transition-colors min-w-[120px]"
                      value={vendorFilter}
                      onChange={(e) => setVendorFilter(e.target.value)}
                    >
                      <option value="">All Vendors</option>
                      <option value="jhon_smith">Jhon Smith</option>
                      <option value="tech-store">Tech Store</option>
                    </select>

                    <div className="flex items-center gap-2 flex-wrap">
                      <input
                        type="date"
                        className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-mid focus:outline-none bg-white text-sm hover:border-gray-400 transition-colors"
                      />
                      <span className="text-sm text-gray-500 whitespace-nowrap">
                        Filter by date
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Tracking Table */}
              <Card className="overflow-hidden">
                <TrackingTable
                  data={filteredData}
                  onStatusChange={handleStatusChange}
                />
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Tracking;
