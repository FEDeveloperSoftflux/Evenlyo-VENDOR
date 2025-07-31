import React, { useState } from "react";
import Button from "../ui/Button";
import entertainmentIcon from "../../assets/icons/entertainment.svg";
import decorationIcon from "../../assets/icons/decoration.svg";
import djIcon from "../../assets/icons/entertain-dj.svg";
import liveBandIcon from "../../assets/icons/entertain-live.svg";
import photoBoothIcon from "../../assets/icons/entertain-photo.svg";
import ledIcon from "../../assets/icons/deco-led.svg";
import tableFloralIcon from "../../assets/icons/deco-table.svg";
import floralChandelierIcon from "../../assets/icons/deco-floral.svg";
import heliumIcon from "../../assets/icons/deco-helium.svg";
import partyIcon from "../../assets/icons/party.svg";
import staffIcon from "../../assets/icons/staff.svg";
import { X } from "lucide-react";
import SuccessModal from "./SuccessModal";

// Food & Drinks Icon Component
const FoodIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-8 h-8"
  >
    <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.20-1.10-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" />
  </svg>
);

const AddNewCategoryModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1); // 1 for main categories, 2 for sub categories
  const [selectedMainCategories, setSelectedMainCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const mainCategories = [
    { name: "Entertainment & Attractions", icon: entertainmentIcon },
    { name: "Food & Drinks", icon: "food" }, // Special case for food icon
    { name: "Decoration & Styling", icon: decorationIcon },
    { name: "Locations & Party Tents", icon: partyIcon },
    { name: "Staff & Services", icon: staffIcon },
  ];

  const subCategories = {
    "Entertainment & Attractions": [
      { name: "DJ", icon: djIcon },
      { name: "Live Band", icon: liveBandIcon },
      { name: "Photo Booth", icon: photoBoothIcon },
    ],
    "Decoration & Styling": [
      { name: "LED Fairy Lights", icon: ledIcon },
      { name: "Table Floral Centerpieces", icon: tableFloralIcon },
      { name: "Floral Chandelier", icon: floralChandelierIcon },
      { name: "Helium Balloon Setup", icon: heliumIcon },
    ],
  };

  const handleMainCategoryClick = (category) => {
    setSelectedMainCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategories((prev) =>
      prev.includes(subCategory)
        ? prev.filter((sc) => sc !== subCategory)
        : [...prev, subCategory]
    );
  };

  const handleNext = () => {
    if (step === 1 && selectedMainCategories.length > 0) {
      setStep(2);
    }
  };

  const handleCancel = () => {
    setStep(1);
    setSelectedMainCategories([]);
    setSelectedSubCategories([]);
    onClose();
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    // Reset all state
    setStep(1);
    setSelectedMainCategories([]);
    setSelectedSubCategories([]);
  };

  const getAvailableSubCategories = () => {
    const allSubCategories = [];
    selectedMainCategories.forEach((mainCategory) => {
      if (subCategories[mainCategory]) {
        allSubCategories.push(...subCategories[mainCategory]);
      }
    });
    return allSubCategories;
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
          {/* Header - Sticky */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white rounded-t-2xl sticky top-0 z-10">
            <h2 className="text-2xl font-semibold text-gray-900">
              {step === 1 ? "Select Main Categories" : "Select Sub Categories"}
            </h2>
            <button 
              onClick={handleCancel}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-mid hover:bg-primary-to text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-y-auto flex-1 p-6">
          {step === 1 ? (
            /* Main Categories Step */
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-6 mb-8">
                {mainCategories.map(({ name, icon }) => (
                  <div key={name} className="relative">
                    <button
                      onClick={() => handleMainCategoryClick(name)}
                      className={`w-full h-36 flex flex-col items-center justify-center rounded-2xl border-2 transition-all duration-200 relative ${
                        selectedMainCategories.includes(name)
                          ? "border-pink-500 bg-pink-50"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {/* Checkmark for selected state */}
                      {selectedMainCategories.includes(name) && (
                        <div className="absolute top-3 right-3 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}

                      <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full border-2 border-pink-200">
                        {icon === "food" ? (
                          <FoodIcon />
                        ) : icon ? (
                          <img src={icon} alt={name} className="w-8 h-8" />
                        ) : (
                          <div className="w-8 h-8 bg-gray-300 rounded"></div>
                        )}
                      </div>
                      <span className="text-center text-base font-medium text-gray-800 px-4 leading-tight">
                        {name}
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Sub Categories Step */
            <div className="mb-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Entertainment & Attractions
                </h3>
                <div className="flex flex-wrap gap-4 mb-6">
                  {subCategories["Entertainment & Attractions"]?.map(
                    ({ name, icon }) => (
                      <button
                        key={name}
                        onClick={() => handleSubCategoryClick(name)}
                        className={`relative px-6 py-3 rounded-full border-2 transition-all duration-200 flex items-center gap-3 ${
                          selectedSubCategories.includes(name)
                            ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white border-pink-500"
                            : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        <img src={icon} alt={name} className="w-6 h-6" />
                        <span className="font-medium">{name}</span>
                      </button>
                    )
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Decoration & Styling
                </h3>
                <div className="flex flex-wrap gap-4">
                  {subCategories["Decoration & Styling"]?.map(
                    ({ name, icon }) => (
                      <button
                        key={name}
                        onClick={() => handleSubCategoryClick(name)}
                        className={`relative px-6 py-3 rounded-full border-2 transition-all duration-200 flex items-center gap-3 ${
                          selectedSubCategories.includes(name)
                            ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white border-pink-500"
                            : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        <img src={icon} alt={name} className="w-6 h-6" />
                        <span className="font-medium">{name}</span>
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-100 mt-6">
            <Button
              onClick={handleCancel}
              variant="secondary"
              className="px-8"
            >
              Cancel
            </Button>
            <Button
              onClick={
                step === 1
                  ? handleNext
                  : () => {
                      console.log("Selected:", selectedSubCategories);
                      onClose();
                      setShowSuccessModal(true);
                    }
              }
              variant="gradient"
              className="px-8"
              disabled={step === 1 && selectedMainCategories.length === 0}
            >
              {step === 1 ? 'Next' : 'Add Categories'}
            </Button>
          </div>
          </div>
        </div>
      </div>
      
      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        type="category"
        data={{
          mainCategories: selectedMainCategories,
          subCategories: selectedSubCategories
        }}
        showSecondaryAction={true}
        secondaryActionText="View Profile"
        onSecondaryAction={() => {
          handleSuccessModalClose();
          console.log('Navigate to profile page');
        }}
      />
    </>
  );
};

export default AddNewCategoryModal;
