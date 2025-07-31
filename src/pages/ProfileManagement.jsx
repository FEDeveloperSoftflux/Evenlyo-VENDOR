import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import BannerUploader from '../components/profile/BannerUploader';
import ProfileImageEditor from '../components/profile/ProfileImageEditor';
import ProfileForm from '../components/profile/ProfileForm';

const ProfileManagement = ({ onNavigate }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleBannerChange = (file, preview) => {
    console.log('Banner changed:', file, preview);
  };

  const handleProfileImageChange = (file, preview) => {
    console.log('Profile image changed:', file, preview);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 3000);
  };

  return (
    <div className="flex h-screen bg-[#FBFBFF]">
      <Sidebar activeItem="Profile Management" onNavigate={onNavigate} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentModule="Profile Management" />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Management</h1>
              <p className="text-gray-600">You can update your profile details</p>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              {/* Banner Section */}
              <div className="relative">
                <BannerUploader onImageChange={handleBannerChange} />
                
                {/* Profile Image positioned to overlap banner */}
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 lg:left-8 lg:transform-none">
                  <ProfileImageEditor onImageChange={handleProfileImageChange} />
                </div>
              </div>

              {/* Form Content */}
              <div className="pt-20 lg:pt-16 p-6 lg:p-8">
                <ProfileForm onSubmit={handleFormSubmit} />
              </div>
            </div>

            {/* Success Modal */}
            {showSuccessModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Success!</h3>
                  <p className="text-gray-600">Your profile has been updated successfully.</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfileManagement;

