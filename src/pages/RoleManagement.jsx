import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import DesignationTable from '../components/role/DesignationTable';
import RoleTable from '../components/role/RoleTable';
import SearchInput from '../components/ui/SearchInput';
import Button from '../components/ui/Button';
import CreateRoleModal from '../components/role/CreateRoleModal';
import CreateDesignationModal from '../components/role/CreateDesignationModal';
import jaydeepImage from '../assets/images/jaydeep.png';

const RoleManagement = ({ onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Sample data for designations
  const [designations, setDesignations] = useState([
    {
      id: 1,
      name: 'Super Admin',
      role: 'Full Access',
      dateTime: '12/15/2024 10:30 AM',
      avatar: jaydeepImage,
      permissions: ['User Management: View Edit', 'Content Management: View Edit', 'Analytics: View Edit', 'Settings: View Edit', 'Role Management: View Edit'],
      status: 'Active'
    },
    {
      id: 2,
      name: 'Admin',
      role: 'Limited Access',
      dateTime: '12/10/2024 2:15 PM',
      avatar: jaydeepImage,
      permissions: ['User Management: View Edit', 'Content Management: View Edit', 'Analytics: View', 'Settings: View'],
      status: 'Active'
    },
    {
      id: 3,
      name: 'Operations Manager',
      role: 'Operational Access',
      dateTime: '12/8/2024 9:45 AM',
      avatar: jaydeepImage,
      permissions: ['User Management: View', 'Content Management: View Edit', 'Analytics: View', 'Operations: View Edit'],
      status: 'Active'
    },
    {
      id: 4,
      name: 'Content Manager',
      role: 'Content Access',
      dateTime: '12/5/2024 1:20 PM',
      avatar: jaydeepImage,
      permissions: ['Content Management: View Edit', 'Analytics: View', 'Media: View Edit'],
      status: 'Active'
    }
  ]);

  // Sample data for roles
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: 'John Doe',
      roles: ['Manager', 'Administrator'],
      email: 'john.doe@example.com',
      phone: '+1234567890',
      password: 'password123',
      dateTime: '1/5/2024 3:00 AM',
      avatar: jaydeepImage,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Jane Smith',
      roles: ['Editor', 'Contributor'],
      email: 'jane.smith@example.com',
      phone: '+0987654321',
      password: 'securepass456',
      dateTime: '1/6/2024 10:00 AM',
      avatar: jaydeepImage,
      status: 'De-Active'
    },
    {
      id: 3,
      name: 'Alice Brown',
      roles: ['Supervisor', 'Reviewer'],
      email: 'alice.brown@example.com',
      phone: '+1122334455',
      password: 'alicepass789',
      dateTime: '1/7/2024 9:30 AM',
      avatar: jaydeepImage,
      status: 'Active'
    },
    {
      id: 4,
      name: 'Bob White',
      roles: ['Support', 'Operator'],
      email: 'bob.white@example.com',
      phone: '+1098765432',
      password: 'bobsecure123',
      dateTime: '1/8/2024 2:15 PM',
      avatar: jaydeepImage,
      status: 'Active'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeView, setActiveView] = useState('designations'); // 'designations' or 'roles'
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
  const [isCreateDesignationOpen, setIsCreateDesignationOpen] = useState(false);

  const availableDesignations = [
    { value: 'administrator', label: 'Administrator' },
    { value: 'editor', label: 'Editor' },
    { value: 'manager', label: 'Manager' },
    { value: 'supervisor', label: 'Supervisor' }
  ];

  const handleCreateRole = (newRoleData) => {
    const newRole = {
      id: roles.length + 1,
      name: newRoleData.fullName,
      roles: [newRoleData.designation],
      email: newRoleData.email,
      phone: newRoleData.phoneNumber,
      password: newRoleData.password,
      dateTime: new Date().toLocaleString(),
      avatar: '/api/placeholder/32/32',
      permissions: Object.keys(newRoleData.permissions)
        .filter(key => newRoleData.permissions[key])
        .map(key => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())),
      status: 'Active'
    };
    setRoles([...roles, newRole]);
  };

  const handleCreateDesignation = (newDesignationData) => {
    const newDesignation = {
      id: designations.length + 1,
      name: newDesignationData.name,
      role: newDesignationData.name,
      dateTime: new Date().toLocaleString(),
      avatar: '/api/placeholder/32/32',
      permissions: Object.keys(newDesignationData.permissions)
        .filter(module => newDesignationData.permissions[module].view || newDesignationData.permissions[module].edit)
        .map(module => {
          const { view, edit } = newDesignationData.permissions[module];
          const moduleLabel = module.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
          const permissions = [];
          if (view) permissions.push('View');
          if (edit) permissions.push('Edit');
          return `${moduleLabel}: ${permissions.join(' ')}`;
        }),
      status: 'Active'
    };
    setDesignations([...designations, newDesignation]);
  };

  const handleEditRole = (item) => {
    console.log('Edit:', item);
  };

  const handleDeleteRole = (item) => {
    if (activeView === 'designations') {
      if (window.confirm(`Are you sure you want to delete designation "${item.name}"?`)) {
        setDesignations(designations.filter(d => d.id !== item.id));
      }
    } else {
      if (window.confirm(`Are you sure you want to delete role "${item.name}"?`)) {
        setRoles(roles.filter(r => r.id !== item.id));
      }
    }
  };

  const handleToggleRoleStatus = (role) => {
    setRoles(roles.map(r => 
      r.id === role.id 
        ? { ...r, status: r.status === 'Active' ? 'De-Active' : 'Active' } 
        : r
    ));
  };

  const filteredDesignations = designations.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRoles = roles.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar activeItem="Role Management" isOpen={sidebarOpen} onClose={closeSidebar} onNavigate={onNavigate} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header userName="John Doe" userRole="Vendor" currentModule="Role Management" onMenuToggle={toggleSidebar} />
        
        {/* Role Management Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-background">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Role Management</h1>
              <p className="text-gray-600">You can add and edit designations</p>
            </div>

            {/* Tab Navigation */}
            <div className="mb-8">
              {/* Full width tabs */}
              <div className="flex w-full mb-6">
                <button
                  onClick={() => setActiveView('designations')}
                  className={`flex-1 px-6 py-3 rounded-2xl font-medium text-sm transition-colors mr-2 ${
                    activeView === 'designations'
                      ? 'bg-gradient-primary text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Set Designation
                </button>
                <button
                  onClick={() => setActiveView('roles')}
                  className={`flex-1 px-6 py-3 rounded-2xl font-medium text-sm transition-colors ml-2 ${
                    activeView === 'roles'
                      ? 'bg-gradient-primary text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Manage Roles
                </button>
              </div>
              
              {/* Search and Create Button - Context Specific */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
                <SearchInput
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search"
                  className="w-full sm:w-64"
                />
                {activeView === 'designations' ? (
                  <Button 
                    onClick={() => setIsCreateDesignationOpen(true)} 
                    variant="primary"
                    className="w-full sm:w-auto whitespace-nowrap"
                  >
                    + Create New Designation
                  </Button>
                ) : (
                  <Button 
                    onClick={() => setIsCreateRoleOpen(true)} 
                    variant="primary"
                    className="w-full sm:w-auto whitespace-nowrap"
                  >
                    + Create New Role
                  </Button>
                )}
              </div>
            </div>

            {/* Content based on active view */}
            {activeView === 'designations' ? (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">All Designations</h2>
                  <p className="text-gray-500 text-sm">You can add and edit designation</p>
                </div>
                
                <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                  <DesignationTable 
                    designations={filteredDesignations}
                    onEdit={handleEditRole}
                    onDelete={handleDeleteRole}
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">All Rolls</h2>
                  <p className="text-gray-500 text-sm">You can view, edit and control rolls</p>
                </div>
                
                <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                  <RoleTable
                    roles={filteredRoles}
                    onEdit={handleEditRole}
                    onDelete={handleDeleteRole}
                    onToggleStatus={handleToggleRoleStatus}
                  />
                </div>
              </div>
            )}

            {/* Modals */}
            <CreateRoleModal 
              isOpen={isCreateRoleOpen}
              onClose={() => setIsCreateRoleOpen(false)}
              onSubmit={handleCreateRole}
              designations={availableDesignations}
            />

            <CreateDesignationModal
              isOpen={isCreateDesignationOpen}
              onClose={() => setIsCreateDesignationOpen(false)}
              onSubmit={handleCreateDesignation}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default RoleManagement;

