import React, { useState, useRef } from 'react';
import vendorProfile from '../../assets/images/vendor-profile.png';
import cameraIcon from '../../assets/icons/camera.svg';

const ProfileImageEditor = ({ onImageChange }) => {
  const [profileImage, setProfileImage] = useState(vendorProfile);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setPreviewImage(imageUrl);
        if (onImageChange) {
          onImageChange(file, imageUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative w-[120px] h-[120px] mx-auto">
      <img
        src={previewImage || profileImage}
        alt="Profile"
        className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
      />
      
      {/* Camera icon button */}
      <button
        onClick={handleImageClick}
        className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-200"
        aria-label="Change profile picture"
      >
        <img src={cameraIcon} alt="Camera" className="w-4 h-4" />
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload profile image"
      />
    </div>
  );
};

export default ProfileImageEditor;
