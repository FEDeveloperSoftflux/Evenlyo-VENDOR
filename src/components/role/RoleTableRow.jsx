import React, { useState } from 'react';
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import Badge from '../ui/Badge';
import StatusToggle from './StatusToggle';

const RoleTableRow = ({ 
  role, 
  onEdit, 
  onDelete,
  onToggleStatus,
  className = '' 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleEdit = () => {
    if (onEdit) onEdit(role);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(role);
  };

  const handleStatusToggle = () => {
    if (onToggleStatus) onToggleStatus(role);
  };

  return (
    <tr className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${className}`}>
      <td className="py-4 px-6 text-sm text-gray-600">
        {role.dateTime}
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img 
              src={role.avatar || '/api/placeholder/32/32'} 
              alt={role.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {role.name}
            </p>
            <div className="flex flex-wrap gap-1 mt-1">
              {role.roles && role.roles.map((roleName, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-pink-100 text-pink-800"
                >
                  {roleName}
                </span>
              ))}
            </div>
          </div>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="text-sm text-gray-900">
          {role.email}
        </div>
        <div className="text-xs text-gray-500">
          {role.phone}
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center space-x-2">
          <div className="text-sm text-gray-900 font-mono">
            {showPassword ? role.password : '•'.repeat(8)}
          </div>
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
            title={showPassword ? "Hide password" : "Show password"}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="flex flex-wrap gap-2">
          {role.roles && role.roles.map((roleName, index) => (
            <Badge 
              key={index}
              status="confirmed"
              className="text-xs"
            >
              {roleName}
            </Badge>
          ))}
        </div>
      </td>
      <td className="py-4 px-6">
        <StatusToggle 
          isActive={role.status === 'Active'} 
          onToggle={handleStatusToggle}
          className="mx-auto"
        />
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleEdit}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Edit role"
            aria-label={`Edit ${role.name}`}
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete role"
            aria-label={`Delete ${role.name}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default RoleTableRow;

