import React from "react";
import { Search, Calendar } from "lucide-react";

const ListingFilters = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  eventTypeFilter,
  setEventTypeFilter,
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
            aria-hidden="true"
          />
          <input
            type="text"
            placeholder="Search listings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-mid focus:border-transparent transition-colors"
            aria-label="Search listings"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap gap-3 lg:gap-4">
          <select
            className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-mid focus:outline-none bg-white text-sm hover:border-gray-400 transition-colors"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Entertainment & Attractions">
              Entertainment & Attractions
            </option>
            <option value="Music & Audio">Music & Audio</option>
            <option value="Decoration & Styling">Decoration & Styling</option>
            <option value="Photography & Video">Photography & Video</option>
          </select>

          <select
            className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-mid focus:outline-none bg-white text-sm hover:border-gray-400 transition-colors"
            value={eventTypeFilter}
            onChange={(e) => setEventTypeFilter(e.target.value)}
          >
            <option value="">Filter by Event Type</option>
            <option value="DJ">DJ Services</option>
            <option value="Sound Equipment">Sound Equipment</option>
            <option value="Lighting">Lighting</option>
            <option value="Wedding Photography">Photography</option>
          </select>

          <select
            className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-mid focus:outline-none bg-white text-sm hover:border-gray-400 transition-colors"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="live">Live</option>
            <option value="block">Blocked</option>
          </select>

          <div className="flex items-center gap-2">
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-mid focus:outline-none bg-white text-sm hover:border-gray-400 transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingFilters;
