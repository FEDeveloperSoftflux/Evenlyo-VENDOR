import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import OtpRequestModal from './OtpRequestModal';
import OtpSuccessModal from './OtpSuccessModal';

const SecurityTab = () => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [isOtpRequestOpen, setIsOtpRequestOpen] = useState(false);
  const [isOtpSuccessOpen, setIsOtpSuccessOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRequestOtp = () => {
    // Validate form fields
    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      alert('Please fill all password fields');
      return;
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    setIsOtpRequestOpen(true);
  };

  const handleOtpSuccess = () => {
    setIsOtpRequestOpen(false);
    setIsOtpSuccessOpen(true);
    // Reset form after successful password change
    setFormData({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-card p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Security Details</h2>
      <p className="text-gray-500 text-sm mb-6">Update your Personal Details</p>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Old Password"
            type="password"
            name="oldPassword"
            placeholder="Enter Your Current Password"
            value={formData.oldPassword}
            onChange={handleInputChange}
            required
          />
          <Input
            label="New Password"
            type="password"
            name="newPassword"
            placeholder="Enter Your New Password"
            value={formData.newPassword}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Your New Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          <div className="flex items-end">
            <Button
              onClick={handleRequestOtp}
              variant="gradient"
              className="px-5 py-2 rounded-full text-sm font-medium"
            >
              Request OTP
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <OtpRequestModal
        isOpen={isOtpRequestOpen}
        onClose={() => setIsOtpRequestOpen(false)}
        onOtpSuccess={handleOtpSuccess}
      />

      <OtpSuccessModal
        isOpen={isOtpSuccessOpen}
        onClose={() => setIsOtpSuccessOpen(false)}
      />
    </div>
  );
};

export default SecurityTab;
