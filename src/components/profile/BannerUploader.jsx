import React, { useState, useRef } from 'react';
import vendorBanner from '../../assets/images/vendor-banner.png';
import uploadIcon from '../../assets/icons/upload.svg';

const BannerUploader = ({ onImageChange }) => {
  const [bannerImage, setBannerImage] = useState(vendorBanner);
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
    <div className="relative w-full h-[200px] group cursor-pointer" onClick={handleImageClick}>
      <img
        src={previewImage || bannerImage}
        alt="Banner"
        className="w-full h-full object-cover rounded-2xl"
      />
      
      {/* Upload overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-2xl flex items-center justify-center">
        {/* Change Banner Button */}
        <div className="absolute top-4 right-4">
          <button 
            type="button"
            className="bg-white text-gray-700 px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
            aria-label="Change banner image"
          >
            <img src={uploadIcon} alt="Upload" className="w-4 h-4" />
            Change Banner
          </button>
        </div>
        
        {/* Overlay text on hover */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="bg-white bg-opacity-90 px-6 py-3 rounded-xl text-sm font-medium text-gray-700">
            Click to upload new banner
          </span>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload banner image"
      />
    </div>
  );
};

export default BannerUploader;
