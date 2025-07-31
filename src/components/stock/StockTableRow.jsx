import React from 'react';
import { Edit } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const StockTableRow = ({ number, id, name, quantity, onStockIn, onEdit }) => {
  return (
    <tr className="text-sm text-gray-700">
      <td className="px-2 sm:px-4 py-3 whitespace-nowrap">{number}</td>
      <td className="px-2 sm:px-4 py-3 whitespace-nowrap">{id}</td>
      <td className="px-2 sm:px-4 py-3 whitespace-nowrap">{name}</td>
      <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
        <Badge status="confirmed" className="font-bold">
          {quantity}
        </Badge>
      </td>
      <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
        <div className="flex items-center space-x-2">
          <Button variant="secondary" size="sm" onClick={onStockIn} className="font-bold">
            + Stock In
          </Button>
          <button
            onClick={onEdit}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Edit stock"
            aria-label="Edit stock"
          >
            <Edit className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default StockTableRow;
