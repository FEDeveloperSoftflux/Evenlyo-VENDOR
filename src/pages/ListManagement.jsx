import React from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import AddNewListingModal from '../components/modals/AddNewListingModal';
import AddNewCategoryModal from '../components/modals/AddNewCategoryModal';
import ListingBarChart from '../components/listing/ListingBarChart';
import ListingTable from '../components/listing/ListingTable';
import ListingFilters from '../components/listing/ListingFilters';
import { Plus } from 'lucide-react';
import listC1Icon from '../assets/icons/list-c1.svg';
import listC2Icon from '../assets/icons/list-c2.svg';
import listC3Icon from '../assets/icons/list-c3.svg';

const ListManagement = ({ onNavigate }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  
  // Filter states
  const [searchTerm, setSearchTerm] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('');
  const [eventTypeFilter, setEventTypeFilter] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('');
  const [dateFilter, setDateFilter] = React.useState('');

  // Sample chart data - replace with actual data from your API/state
  const chartData = [
    { name: "Food & Drinks", value: 450, shortName: "Food & Drinks" },
    { name: "Decoration & Styling", value: 1200, shortName: "Decoration" },
    { name: "Location & Party Tents", value: 800, shortName: "Location" },
    { name: "Entertainment & Attractions", value: 950, shortName: "Entertainment" },
    { name: "Staff & Services", value: 600, shortName: "Staff" },
    { name: "Photography & Videography", value: 750, shortName: "Photography" },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar activeItem="Listing Management" isOpen={sidebarOpen} onClose={closeSidebar} onNavigate={onNavigate} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header userName="John Doe" userRole="Vendor" currentModule="Listing Management" onMenuToggle={toggleSidebar} />

        {/* List Management Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-background">
          {/* Page Header with Title and Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">All Listings</h2>
              <p className="text-base text-gray-500 mt-1">You can manage all your items: Add, Update, Delete.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => setCategoryModalOpen(true)}
                className="flex items-center justify-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add More Categories</span>
              </Button>
              <Button 
                variant="primary" 
                size="sm" 
                onClick={() => setModalOpen(true)}
                className="flex items-center justify-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Listing</span>
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Total Main Category Card */}
            <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden">
              <div className="relative z-10">
                {/* Icon */}
                <div className="absolute right-4 top-4 w-10 h-10 bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl flex items-center justify-center">
                  <img src={listC1Icon} alt="Main Category Icon" className="w-5 h-5" />
                </div>
                
                {/* Content */}
                <div className="pr-16">
                  <p className="text-sm font-medium mb-3 text-gray-700">Total Main category</p>
                  <p className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">6</p>
                  <p className="text-xs md:text-sm text-gray-500">+2 from last month</p>
                </div>
              </div>
            </Card>

            {/* Total Sub Category Card - Pink Gradient */}
            <Card gradient={true} className="p-6 relative overflow-hidden">
              <div className="relative z-10">
                {/* Icon */}
                <div className="absolute right-4 top-4 w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <img src={listC2Icon} alt="Sub Category Icon" className="w-5 h-5 filter brightness-0 invert" />
                </div>
                
                {/* Content */}
                <div className="pr-16">
                  <p className="text-sm font-medium mb-3 text-white/90">Total Sub category</p>
                  <p className="text-3xl md:text-4xl font-bold mb-2 text-white">23</p>
                  <p className="text-xs md:text-sm text-white/80">+5 from last month</p>
                </div>
              </div>
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            </Card>

            {/* Total Items Card */}
            <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden">
              <div className="relative z-10">
                {/* Icon */}
                <div className="absolute right-4 top-4 w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                  <img src={listC3Icon} alt="Items Icon" className="w-5 h-5" />
                </div>
                
                {/* Content */}
                <div className="pr-16">
                  <p className="text-sm font-medium mb-3 text-gray-700">Total Items</p>
                  <p className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">555</p>
                  <p className="text-xs md:text-sm text-gray-500">+18 from last month</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Bar Chart Section */}
          <div className="mb-8">
            <ListingBarChart 
              data={chartData}
              title="Most Booked Items Overview"
              className="shadow-sm"
            />
          </div>

          {/* Filters */}
          <ListingFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            eventTypeFilter={eventTypeFilter}
            setEventTypeFilter={setEventTypeFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
          />
          
          {/* Listings Table */}
          <div>
            <ListingTable 
              searchTerm={searchTerm}
              categoryFilter={categoryFilter}
              eventTypeFilter={eventTypeFilter}
              statusFilter={statusFilter}
              dateFilter={dateFilter}
            />
          </div>
        </main>
      </div>
      
      {/* Add New Listing Modal */}
      <AddNewListingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      
      {/* Add New Category Modal */}
      <AddNewCategoryModal isOpen={categoryModalOpen} onClose={() => setCategoryModalOpen(false)} />
    </div>
  );
};

export default ListManagement;

