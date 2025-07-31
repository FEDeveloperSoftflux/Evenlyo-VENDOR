import React, { useState } from 'react';
import { Download, ChevronDown } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import SearchInput from '../components/ui/SearchInput';
import Button from '../components/ui/Button';
import StockTabs from '../components/stock/StockTabs';
import StockTabPanel from '../components/stock/StockTabPanel';
import StockTable from '../components/stock/StockTable';
import StockInModal from '../components/stock/StockInModal';

const StockManagement = ({ onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('check-in');
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [filterByItem, setFilterByItem] = useState('');
  const [filterByDate, setFilterByDate] = useState('');
  const [mainCategory, setMainCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const tabs = [
    { id: 'check-in', label: 'Check In' },
    { id: 'check-out', label: 'Check Out' },
    { id: 'missing-items', label: 'Missing Items' },
    { id: 'stock-in', label: 'Stock In' },
  ];

  // Sample data based on the images
  const stockData = [
    { 
      id: 'ITM001', 
      name: 'DJ', 
      checkInQuantity: 4, 
      inStockQuantity: 12, 
      reservedForBooking: 6, 
      stockOut: '1/5/2024', 
      dateTime: '1/5/2024', 
      missingItems: 0 
    },
    { 
      id: 'ITM001', 
      name: 'Live Band', 
      checkInQuantity: 4, 
      inStockQuantity: 15, 
      reservedForBooking: 6, 
      stockOut: '1/5/2024', 
      dateTime: '1/5/2024', 
      missingItems: 0 
    },
    { 
      id: 'ITM001', 
      name: 'DJ', 
      checkInQuantity: 4, 
      inStockQuantity: 30, 
      reservedForBooking: 6, 
      stockOut: '1/5/2024', 
      dateTime: '1/5/2024', 
      missingItems: 0 
    },
    { 
      id: 'ITM001', 
      name: 'Live Band', 
      checkInQuantity: 4, 
      inStockQuantity: 40, 
      reservedForBooking: 6, 
      stockOut: '1/5/2024', 
      dateTime: '1/5/2024', 
      missingItems: 0 
    },
    { 
      id: 'ITM001', 
      name: 'DJ', 
      checkInQuantity: 4, 
      inStockQuantity: 5, 
      reservedForBooking: 6, 
      stockOut: '1/5/2024', 
      dateTime: '1/5/2024', 
      missingItems: 0 
    },
    { 
      id: 'ITM001', 
      name: 'Live Band', 
      checkInQuantity: 4, 
      inStockQuantity: 3, 
      reservedForBooking: 6, 
      stockOut: '1/5/2024', 
      dateTime: '1/5/2024', 
      missingItems: 0 
    },
  ];

  const getPageTitle = () => {
    switch (activeTab) {
      case 'check-in':
        return 'All Item Check In';
      case 'check-out':
        return 'All Item Check Out';
      case 'missing-items':
        return 'All Item Missing Items';
      case 'stock-in':
        return 'All Item Stock In';
      default:
        return 'Stock Management';
    }
  };

  const getPageSubtitle = () => {
    switch (activeTab) {
      case 'check-in':
        return 'You can see list of Check In';
      case 'check-out':
        return 'You can see list of Check Out';
      case 'missing-items':
        return 'You can see list of Missing Items';
      case 'stock-in':
        return 'You can see list of Stock In';
      default:
        return '';
    }
  };

  const handleTabChange = (tabId) => setActiveTab(tabId);

  const handleStockIn = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  const handleConfirmStockIn = (quantity) => {
    console.log(`Stock in confirmed for ${selectedItem.name}: +${quantity}`);
    handleCloseModal();
    // Here you would typically update the stock data
  };

  const handleEditStock = (item) => {
    console.log('Edit stock for item:', item);
    // Here you would typically open an edit modal or navigate to edit page
  };

  const SelectField = ({ value, onChange, options, placeholder }) => (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-mid focus:border-transparent transition-colors appearance-none bg-white text-gray-700"
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar 
        activeItem="Stock Management" 
        isOpen={sidebarOpen} 
        onClose={closeSidebar} 
        onNavigate={onNavigate} 
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header 
          userName="Jaydeep" 
          userRole="jaydeep@gmail.com" 
          currentModule="Stock Management" 
          onMenuToggle={toggleSidebar} 
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-8 bg-background">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900">
                  {getPageTitle()}
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  {getPageSubtitle()}
                </p>
              </div>
              <div className="flex-shrink-0">
                <Button variant="gradient" className="gap-2 w-full sm:w-auto">
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download History</span>
                  <span className="sm:hidden">Download</span>
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <StockTabs 
              activeTab={activeTab} 
              onTabChange={handleTabChange} 
              tabs={tabs} 
            />

            {/* Filters */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* Search */}
              <SearchInput
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Item Name / ID"
                className="lg:col-span-1"
              />
              
              {/* Main Category */}
              <SelectField
                value={mainCategory}
                onChange={(e) => setMainCategory(e.target.value)}
                options={['Entertainment & Attractions', 'Decoration', 'Catering']}
                placeholder="Main Category"
              />
              
              {/* Sub Category */}
              <SelectField
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                options={['DJ', 'Live Band', 'Photography']}
                placeholder="Sub Category"
              />
              
              {/* Filter by Item */}
              <SelectField
                value={filterByItem}
                onChange={(e) => setFilterByItem(e.target.value)}
                options={['All Items', 'DJ Equipment', 'Sound System']}
                placeholder="Filter by Item"
              />
              
              {/* Filter by Date */}
              <input
                type="date"
                value={filterByDate}
                onChange={(e) => setFilterByDate(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-mid focus:border-transparent transition-colors"
                placeholder="Filter by date"
              />
            </div>

            {/* Tab Panels */}
            <StockTabPanel activeTab={activeTab} tabId="check-in">
              <StockTable 
                data={stockData} 
                activeTab="check-in" 
                onStockIn={handleStockIn} 
              />
            </StockTabPanel>

            <StockTabPanel activeTab={activeTab} tabId="check-out">
              <StockTable 
                data={stockData} 
                activeTab="check-out" 
                onStockIn={handleStockIn} 
              />
            </StockTabPanel>

            <StockTabPanel activeTab={activeTab} tabId="missing-items">
              <StockTable 
                data={stockData} 
                activeTab="missing-items" 
                onStockIn={handleStockIn} 
              />
            </StockTabPanel>

            <StockTabPanel activeTab={activeTab} tabId="stock-in">
              <StockTable 
                data={stockData} 
                activeTab="stock-in" 
                onStockIn={handleStockIn}
                onEdit={handleEditStock}
              />
            </StockTabPanel>
          </div>
        </main>
      </div>

      {/* Stock In Modal */}
      {selectedItem && (
        <StockInModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          onConfirm={handleConfirmStockIn} 
          item={selectedItem} 
        />
      )}
    </div>
  );
};

export default StockManagement;

