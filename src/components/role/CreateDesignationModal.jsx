import React, { useState } from 'react';
import { X } from 'lucide-react';
import Button from '../ui/Button';

const CreateDesignationModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    permissions: {
      userManagement: { view: false, edit: false },
      contentManagement: { view: false, edit: false },
      analytics: { view: false, edit: false },
      settings: { view: false, edit: false },
      reports: { view: false, edit: false },
      billing: { view: false, edit: false },
      support: { view: false, edit: false },
      notifications: { view: false, edit: false }
    }
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePermissionChange = (module, type) => {
    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions,
        [module]: {
          ...formData.permissions[module],
          [type]: !formData.permissions[module][type]
        }
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    setFormData({
      name: '',
      permissions: {
        userManagement: { view: false, edit: false },
        contentManagement: { view: false, edit: false },
        analytics: { view: false, edit: false },
        settings: { view: false, edit: false },
        reports: { view: false, edit: false },
        billing: { view: false, edit: false },
        support: { view: false, edit: false },
        notifications: { view: false, edit: false }
      }
    });
    onClose();
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      permissions: {
        userManagement: { view: false, edit: false },
        contentManagement: { view: false, edit: false },
        analytics: { view: false, edit: false },
        settings: { view: false, edit: false },
        reports: { view: false, edit: false },
        billing: { view: false, edit: false },
        support: { view: false, edit: false },
        notifications: { view: false, edit: false }
      }
    });
    onClose();
  };

  if (!isOpen) return null;

  const modules = [
    { key: 'userManagement', label: 'User Management' },
    { key: 'contentManagement', label: 'Content Management' },
    { key: 'analytics', label: 'Analytics' },
    { key: 'settings', label: 'Settings' },
    { key: 'reports', label: 'Reports' },
    { key: 'billing', label: 'Billing' },
    { key: 'support', label: 'Support' },
    { key: 'notifications', label: 'Notifications' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Create New Designation</h2>
          <button
            onClick={handleCancel}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Designation Name */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Designation Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter designation name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-mid focus:border-transparent transition-colors"
              required
            />
          </div>

          {/* Module Permissions */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Module Permissions</h3>
            <p className="text-sm text-gray-500 mb-6">Select view and edit permissions for each module</p>
            
            <div className="space-y-4">
              {modules.map((module) => (
                <div key={module.key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <span className="text-sm font-medium text-gray-700">{module.label}</span>
                  <div className="flex items-center space-x-6">
                    {/* View Permission */}
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.permissions[module.key].view}
                        onChange={() => handlePermissionChange(module.key, 'view')}
                        className="w-5 h-5 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
                      />
                      <span className="ml-2 text-sm text-gray-600">View</span>
                    </label>
                    
                    {/* Edit Permission */}
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.permissions[module.key].edit}
                        onChange={() => handlePermissionChange(module.key, 'edit')}
                        className="w-5 h-5 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
                      />
                      <span className="ml-2 text-sm text-gray-600">Edit</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
            >
              Create Designation
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDesignationModal;
