import React from 'react';
import { Download } from 'lucide-react';

const BookingTableRow = ({ booking, onExportClick }) => {
  const handleExportClick = () => {
    if (onExportClick) {
      onExportClick();
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {booking.id}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {booking.item}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
        {booking.totalCost}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm font-semibold text-green-600">
          {booking.earning}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button
          onClick={handleExportClick}
          className="p-2 text-gray-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
          aria-label="Export booking data"
        >
          <Download className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
};

export default BookingTableRow;
