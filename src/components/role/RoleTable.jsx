import React, { useState } from 'react';
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import RoleTableRow from './RoleTableRow';
import Badge from '../ui/Badge';
import StatusToggle from './StatusToggle';

const RoleTable = ({ roles = [], onEdit, onDelete, onToggleStatus }) => {
  const [showPasswords, setShowPasswords] = useState({});
  
  const togglePasswordVisibility = (roleId) => {
    setShowPasswords(prev => ({
      ...prev,
      [roleId]: !prev[roleId]
    }));
  };
  
  return (
    <div className="w-full">
      {/* Desktop/Tablet Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-pink-50 border-b border-pink-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-pink-800 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-pink-800 uppercase tracking-wider">
                Roll Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-pink-800 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-pink-800 uppercase tracking-wider">
                Password
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-pink-800 uppercase tracking-wider">
                Roles
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-pink-800 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-pink-800 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {roles.map((role, index) => (
              <RoleTableRow
                key={index}
                role={role}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleStatus={onToggleStatus}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile responsive cards */}
      <div className="md:hidden space-y-4 p-4">
        {roles.map((role, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img 
                    src={role.avatar || '/api/placeholder/32/32'} 
                    alt={role.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-900 text-sm">{role.name}</h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {role.roles && role.roles.map((roleName, idx) => (
                      <span 
                        key={idx}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-pink-100 text-pink-800"
                      >
                        {roleName}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{role.dateTime}</p>
                </div>
              </div>
              <StatusToggle 
                isActive={role.status === 'Active'} 
                onToggle={() => onToggleStatus && onToggleStatus(role)}
              />
            </div>
            
            <div className="space-y-2 text-sm mb-4">
              <div>
                <span className="font-medium text-gray-700">Roles:</span>
                <span className="ml-2 text-gray-600">{role.designation}</span>
              </div>
              
              <div>
                <span className="font-medium text-gray-700">Assigned Roles:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {role.roles && role.roles.map((roleName, idx) => (
                    <Badge key={idx} status="confirmed" className="text-xs">
                      {roleName}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <span className="font-medium text-gray-700">Contact:</span>
                <div className="text-sm text-gray-900">
                  <span>{role.email}</span>
                  <span className="block text-xs text-gray-500 leading-tight">{role.phone}</span>
                </div>
              </div>
              
              <div>
                <span className="font-medium text-gray-700">Password:</span>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-gray-900 font-mono">
                    {showPasswords[role.id] ? role.password : '•'.repeat(8)}
                  </span>
                  <button
                    onClick={() => togglePasswordVisibility(role.id)}
                    className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                    title={showPasswords[role.id] ? "Hide password" : "Show password"}
                    aria-label={showPasswords[role.id] ? "Hide password" : "Show password"}
                  >
                    {showPasswords[role.id] ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100">
              <button
                onClick={() => onEdit && onEdit(role)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Edit role"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete && onDelete(role)}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete role"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {roles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-sm">No roles found.</p>
        </div>
      )}
    </div>
  );
};

export default RoleTable;
