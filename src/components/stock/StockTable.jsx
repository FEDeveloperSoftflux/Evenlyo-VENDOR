import React from 'react';
import StockTableRow from './StockTableRow';
import Badge from '../ui/Badge';

const StockTable = ({ data, activeTab, onStockIn, onEdit }) => {
  const getColumns = () => {
    switch (activeTab) {
      case 'check-in':
        return ['S#No', 'ID', 'Item Name', 'Check In (Quantity)', 'Stock In (Date Time)'];
      case 'check-out':
        return ['S#No', 'ID', 'Item Name', 'Reserved for booking', 'Stock Out'];
      case 'missing-items':
        return ['S#No', 'ID', 'Item Name', 'Missing Items', 'Stock Out'];
      case 'stock-in':
        return ['S#No', 'ID', 'Item Name', 'In Stock (Quantity)', 'Actions'];
      default:
        return ['S#No', 'ID', 'Item Name', 'Quantity', 'Date Time'];
    }
  };

  const renderTableRow = (item, index) => {
    const commonProps = {
      key: index,
      number: String(index + 1).padStart(2, '0'),
      id: item.id,
      name: item.name,
    };

    switch (activeTab) {
      case 'check-in':
        return (
          <tr className="text-sm text-gray-700" key={index}>
            <td className="px-2 sm:px-4 py-3 whitespace-nowrap">{commonProps.number}</td>
            <td className="px-2 sm:px-4 py-3 whitespace-nowrap">{commonProps.id}</td>
            <td className="px-2 sm:px-4 py-3 whitespace-nowrap">{commonProps.name}</td>
            <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
              <Badge status="confirmed">{item.checkInQuantity}</Badge>
            </td>
            <td className="px-2 sm:px-4 py-3 whitespace-nowrap">{item.dateTime}</td>
          </tr>
        );
      case 'check-out':
        return (
          <tr className="text-sm text-gray-700" key={index}>
            <td className="px-2 sm:px-4 py-3 whitespace-nowrap">{commonProps.number}</td>
            <td className="px-2 sm:px-4 py-3 whitespace-nowrap">{commonProps.id}</td>
            <td className="px-2 sm:px-4 py-3 whitespace-nowrap">{commonProps.name}</td>
            <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
              <Badge status="confirmed">{item.reservedForBooking}</Badge>
            </td>
            <td className="px-2 sm:px-4 py-3 whitespace-nowrap">{item.stockOut}</td>
          </tr>
        );
      case 'missing-items':
        return (
          <tr className="text-sm text-gray-700" key={index}>
            <td className="px-2 sm:px-4 py-3 whitespace-nowrap">{commonProps.number}</td>
            <td className="px-2 sm:px-4 py-3 whitespace-nowrap">{commonProps.id}</td>
            <td className="px-2 sm:px-4 py-3 whitespace-nowrap">{commonProps.name}</td>
            <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
              <Badge status="rejected">{item.missingItems}</Badge>
            </td>
            <td className="px-2 sm:px-4 py-3 whitespace-nowrap">{item.stockOut}</td>
          </tr>
        );
      case 'stock-in':
        return (
          <StockTableRow
            {...commonProps}
            quantity={item.inStockQuantity}
            onStockIn={() => onStockIn(item)}
            onEdit={() => onEdit && onEdit(item)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-pink-100 border-b border-gray-200">
            <tr>
              {getColumns().map((column, index) => (
                <th
                  key={index}
                  className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => renderTableRow(item, index))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockTable;
