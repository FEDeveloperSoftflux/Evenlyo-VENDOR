import React, { useState } from 'react';
import Card from '../ui/Card';
import BookingTableRow from './BookingTableRow';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BookingTable = ({ onExportClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sample booking data
  const bookingData = [
    { id: 'ITM001', item: 'DJ', totalCost: '$1,195', earning: '$359' },
    { id: 'ITM001', item: 'DJ', totalCost: '$1,195', earning: '$359' },
    { id: 'ITM001', item: 'DJ', totalCost: '$1,195', earning: '$359' },
    { id: 'ITM001', item: 'DJ', totalCost: '$1,195', earning: '$359' },
    { id: 'ITM001', item: 'DJ', totalCost: '$1,195', earning: '$359' },
    { id: 'ITM002', item: 'Live Band', totalCost: '$2,195', earning: '$659' },
    { id: 'ITM003', item: 'Photo Booth', totalCost: '$895', earning: '$269' },
    { id: 'ITM004', item: 'DJ', totalCost: '$1,195', earning: '$359' },
    { id: 'ITM005', item: 'Live Band', totalCost: '$2,195', earning: '$659' }
  ];

  const totalPages = Math.ceil(bookingData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = bookingData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Card className="overflow-hidden">

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-pink-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Booking Id
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Booking Item
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Cost
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Earning
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Export
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {currentData.map((booking, index) => (
              <BookingTableRow 
                key={`${booking.id}-${index}`}
                booking={booking}
                onExportClick={onExportClick}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, bookingData.length)} of {bookingData.length} results
          </div>
          
          <div className="flex items-center gap-2">
            {/* Previous Button */}
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg border transition-colors ${
                currentPage === 1
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                  currentPage === page
                    ? 'bg-pink-600 text-white border-pink-600'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}

            {/* Show ellipsis if more than 5 pages */}
            {totalPages > 5 && (
              <span className="px-2 py-2 text-sm text-gray-500">...</span>
            )}

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg border transition-colors ${
                currentPage === totalPages
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BookingTable;
