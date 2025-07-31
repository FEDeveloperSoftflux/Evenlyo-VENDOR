import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import Badge from '../ui/Badge';

const DesignationTableRow = ({ 
  designation, 
  onEdit, 
  onDelete,
  className = '' 
}) => {
  const handleEdit = () => {
    if (onEdit) onEdit(designation);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(designation);
  };

  return (
    <tr className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${className}`}>
      <td className="py-4 px-6 text-sm text-gray-600">
        {designation.dateTime}
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img 
              src={designation.avatar || '/api/placeholder/32/32'} 
              alt={designation.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {designation.name}
            </p>
            <p className="text-xs text-gray-500">
              {designation.id ? `B00${designation.id}` : 'B001'}
            </p>
          </div>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="flex flex-wrap gap-2">
          {designation.permissions && designation.permissions.map((permission, index) => (
            <Badge 
              key={index}
              status="confirmed"
              className="text-xs"
            >
              {permission}
            </Badge>
          ))}
        </div>
      </td>
      <td className="py-4 px-6">
        <Badge 
          status={designation.status === 'Active' ? 'confirmed' : 'rejected'}
          className="text-xs"
        >
          {designation.status}
        </Badge>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleEdit}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Edit designation"
            aria-label={`Edit ${designation.name}`}
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete designation"
            aria-label={`Delete ${designation.name}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default DesignationTableRow;
