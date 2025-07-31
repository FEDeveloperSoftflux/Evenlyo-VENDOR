import React from 'react';
import { Download, Clock } from 'lucide-react';
import Badge from '../ui/Badge';
import IconButton from '../ui/IconButton';

const InvoiceRow = ({ invoice, onDownloadClick, onStatusClick }) => {
  const renderStatusBadge = () => {
    if (invoice.status === 'left' && invoice.daysLeft) {
      return (
        <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2">
          <button 
            onClick={() => onStatusClick(invoice)}
            className="cursor-pointer hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-1 rounded-full"
          >
            <Badge status={invoice.status}>
              Left
            </Badge>
          </button>
          <div className="flex items-center gap-1 text-xs text-red-600">
            <Clock className="w-3 h-3" />
            <span>{invoice.daysLeft} days</span>
          </div>
        </div>
      );
    }

    return (
      <button 
        onClick={() => onStatusClick(invoice)}
        className="cursor-pointer hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-1 rounded-full"
      >
        <Badge status={invoice.status}>
          {invoice.status === 'paid' ? 'Paid' : invoice.status}
        </Badge>
      </button>
    );
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-3 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">
        {invoice.id}
      </td>
      <td className="px-3 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-600">
        {invoice.date}
      </td>
      <td className="px-3 md:px-6 py-4 whitespace-nowrap">
        <Badge 
          status="edit" 
          className="bg-gray-100 text-gray-600 text-xs"
        >
          {invoice.subscriptionPlan}
        </Badge>
      </td>
      <td className="px-3 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">
        ${invoice.amount}
      </td>
      <td className="px-3 md:px-6 py-4 whitespace-nowrap">
        {renderStatusBadge()}
      </td>
      <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <IconButton
          size="sm"
          variant="ghost"
          onClick={() => onDownloadClick(invoice)}
          aria-label="Download invoice"
        >
          <Download className="w-4 h-4" />
        </IconButton>
      </td>
    </tr>
  );
};

export default InvoiceRow;
