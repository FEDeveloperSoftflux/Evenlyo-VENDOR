import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import DesignationTableRow from './DesignationTableRow';
import Badge from '../ui/Badge';

const DesignationTable = ({ designations = [], onEdit, onDelete }) => {
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
                Designation Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-pink-800 uppercase tracking-wider">
                All Access
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
            {designations.map((designation, index) => (
              <DesignationTableRow
                key={index}
                designation={designation}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile responsive cards */}
      <div className="md:hidden space-y-4 p-4">
        {designations.map((designation, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img 
                    src={designation.avatar || '/api/placeholder/32/32'} 
                    alt={designation.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-900 text-sm">{designation.name}</h3>
                  <p className="text-xs text-gray-500">{designation.id ? `B00${designation.id}` : 'B001'}</p>
                  <p className="text-xs text-gray-400">{designation.dateTime}</p>
                </div>
              </div>
              <Badge 
                status={designation.status === 'Active' ? 'confirmed' : 'rejected'}
                className="text-xs"
              >
                {designation.status}
              </Badge>
            </div>
            
            <div className="space-y-2 text-sm mb-4">
              <div>
                <span className="font-medium text-gray-700">All Access:</span>
                <span className="ml-2 text-gray-600">{designation.role}</span>
              </div>
              
              <div>
                <span className="font-medium text-gray-700">Permissions:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {designation.permissions && designation.permissions.map((permission, idx) => (
                    <Badge key={idx} status="confirmed" className="text-xs">
                      {permission}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100">
              <button
                onClick={() => onEdit && onEdit(designation)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Edit designation"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete && onDelete(designation)}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete designation"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty state */}
      {designations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-sm">No designations found.</p>
        </div>
      )}
    </div>
  );
};

export default DesignationTable;
