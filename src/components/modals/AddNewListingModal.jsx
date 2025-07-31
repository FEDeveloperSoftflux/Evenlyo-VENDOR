import React, { useState } from "react";
import Button from "../ui/Button";
import { X } from "lucide-react";
import uploadIcon from "../../assets/icons/upload.svg";
import SuccessModal from "./SuccessModal";

const AddNewListingModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    mainCategory: "",
    subCategory: "",
    totalKilometer: "",
    description: "",
    pricingType: "Per Hour",
    cost: "",
    extraTimeCost: "",
    securityFee: false,
    securityFeeAmount: "",
    availableDays: {
      sun: false,
      mon: true,
      tue: true,
      wed: false,
      thu: true,
      fri: true,
      sat: false,
    },
    startTime: "07:00 AM",
    endTime: "10:00 PM",
    agreeToTerms: false,
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Categories with living/non-living classification
  const categoriesData = {
    "entertainment": {
      name: "Entertainment & Attractions",
      subCategories: {
        "dj": { name: "DJ Services", isLiving: true },
        "band": { name: "Live Band", isLiving: true },
        "speaker": { name: "Speaker Rental", isLiving: false },
        "lighting": { name: "Lighting Equipment", isLiving: false },
        "photobooth": { name: "Photo Booth", isLiving: false }
      }
    },
    "music": {
      name: "Music & Audio",
      subCategories: {
        "instruments": { name: "Musical Instruments", isLiving: false },
        "sound-system": { name: "Sound System", isLiving: false },
        "microphone": { name: "Microphones", isLiving: false }
      }
    },
    "catering": {
      name: "Catering Services",
      subCategories: {
        "chef": { name: "Personal Chef", isLiving: true },
        "waitstaff": { name: "Wait Staff", isLiving: true },
        "equipment": { name: "Catering Equipment", isLiving: false },
        "utensils": { name: "Utensils & Serving", isLiving: false }
      }
    },
    "decoration": {
      name: "Decoration & Design",
      subCategories: {
        "flowers": { name: "Floral Arrangements", isLiving: false },
        "balloons": { name: "Balloon Decoration", isLiving: false },
        "lighting-deco": { name: "Decorative Lighting", isLiving: false },
        "furniture": { name: "Event Furniture", isLiving: false }
      }
    },
    "photography": {
      name: "Photography & Video",
      subCategories: {
        "photographer": { name: "Photographer", isLiving: true },
        "videographer": { name: "Videographer", isLiving: true },
        "camera-equipment": { name: "Camera Equipment", isLiving: false },
        "drone": { name: "Drone Services", isLiving: false }
      }
    },
    "venue": {
      name: "Venue Services",
      subCategories: {
        "indoor": { name: "Indoor Venues", isLiving: false },
        "outdoor": { name: "Outdoor Venues", isLiving: false },
        "tents": { name: "Event Tents", isLiving: false },
        "coordinator": { name: "Venue Coordinator", isLiving: true }
      }
    }
  };

  // Check if selected subcategory involves living things
  const isLivingCategory = () => {
    if (!formData.mainCategory || !formData.subCategory) return false;
    const mainCat = categoriesData[formData.mainCategory];
    if (!mainCat) return false;
    const subCat = mainCat.subCategories[formData.subCategory];
    return subCat ? subCat.isLiving : false;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDayChange = (day) => {
    setFormData((prev) => ({
      ...prev,
      availableDays: {
        ...prev.availableDays,
        [day]: !prev.availableDays[day],
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
    
    // Close the main modal and show success modal
    onClose();
    setShowSuccessModal(true);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    // Reset form data
    setFormData({
      title: "",
      subTitle: "",
      mainCategory: "",
      subCategory: "",
      totalKilometer: "",
      description: "",
      pricingType: "Per Hour",
      cost: "",
      extraTimeCost: "",
      securityFee: false,
      securityFeeAmount: "",
      availableDays: {
        sun: false,
        mon: true,
        tue: true,
        wed: false,
        thu: true,
        fri: true,
        sat: false,
      },
      startTime: "07:00 AM",
      endTime: "10:00 PM",
      agreeToTerms: false,
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
          {/* Modal Header - Sticky */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white rounded-t-2xl sticky top-0 z-10">
            <h2 className="text-2xl font-semibold text-gray-900">
              Add New Listing
            </h2>
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-mid hover:bg-primary-to text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-y-auto flex-1">
            <form onSubmit={handleSubmit} className="p-6">
          {/* Basic Information */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter listing title"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sub Title
                </label>
                <input
                  type="text"
                  name="subTitle"
                  value={formData.subTitle}
                  onChange={handleInputChange}
                  placeholder="Enter sub title"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Main Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="mainCategory"
                  value={formData.mainCategory}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
                  required
                >
                  <option value="">Select main category</option>
                  <option value="entertainment">
                    Entertainment & Attractions
                  </option>
                  <option value="music">Music & Audio</option>
                  <option value="catering">Catering Services</option>
                  <option value="decoration">Decoration & Design</option>
                  <option value="photography">Photography & Video</option>
                  <option value="venue">Venue Services</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sub Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
                  required
                >
                  <option value="">Select sub category</option>
                  <option value="dj">DJ Services</option>
                  <option value="band">Live Band</option>
                  <option value="speaker">Speaker Rental</option>
                  <option value="lighting">Lighting Equipment</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Kilometer
              </label>
              <input
                type="text"
                name="totalKilometer"
                value={formData.totalKilometer}
                onChange={handleInputChange}
                placeholder="Enter Kilometer"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your item in detail"
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                required
              />
            </div>
          </div>

          {/* Pricing Section */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Pricing Section
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pricing Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="pricingType"
                  value={formData.pricingType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
                  required
                >
                  <option value="Per Hour">Per Hour</option>
                  <option value="Per Day">Per Day</option>
                  <option value="Per Event">Per Event</option>
                  <option value="Fixed Price">Fixed Price</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cost <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="cost"
                  value={formData.cost}
                  onChange={handleInputChange}
                  placeholder="Enter cost"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Extra Time Cost
                </label>
                <input
                  type="text"
                  name="extraTimeCost"
                  value={formData.extraTimeCost}
                  onChange={handleInputChange}
                  placeholder="Extra Time Cost"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Security Fee Section - Only for non-living categories */}
            {!isLivingCategory() && (
              <div className="mt-4">
                <label className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    name="securityFee"
                    checked={formData.securityFee}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Security Fee (Non-living things only)
                  </span>
                </label>
                
                {/* Security Fee Amount Input */}
                {formData.securityFee && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Security Fee Amount <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="securityFeeAmount"
                      value={formData.securityFeeAmount}
                      onChange={handleInputChange}
                      placeholder="Enter security fee amount"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      required
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Gallery View */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Gallery View
            </h3>

            {/* Video Upload */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video (Maximum 1)
              </label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-pink-300 transition-colors">
                <img
                  src={uploadIcon}
                  alt="Upload"
                  className="w-12 h-12 mx-auto mb-4 opacity-40"
                />
                <p className="text-gray-500 text-sm">Click to upload images</p>
              </div>
            </div>

            {/* Images Upload */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Images (Maximum 3)
              </label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-pink-300 transition-colors">
                <img
                  src={uploadIcon}
                  alt="Upload"
                  className="w-12 h-12 mx-auto mb-4 opacity-40"
                />
                <p className="text-gray-500 text-sm">Click to upload images</p>
              </div>
            </div>
          </div>

          {/* Booking Date/Time */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Booking Date/Time
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Available Days
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "sun", label: "Sun" },
                  { key: "mon", label: "Mon" },
                  { key: "tue", label: "Tue" },
                  { key: "wed", label: "Wed" },
                  { key: "thu", label: "Thu" },
                  { key: "fri", label: "Fri" },
                  { key: "sat", label: "Sat" },
                ].map((day) => (
                  <button
                    key={day.key}
                    type="button"
                    onClick={() => handleDayChange(day.key)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      formData.availableDays[day.key]
                        ? "bg-pink-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  placeholder="07:00 AM"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  placeholder="10:00 PM"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="mb-6">
            <label className="flex items-start">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500 mt-1"
                required
              />
              <span className="ml-2 text-sm text-gray-700">
                I agree to the{" "}
                <a
                  href="#"
                  className="text-pink-500 hover:text-pink-600 underline"
                >
                  Terms & Conditions
                </a>
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end pt-6 border-t border-gray-100">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="px-8"
            >
              Cancel
            </Button>
            <Button type="submit" variant="gradient" className="px-8">
              Update Listing
            </Button>
          </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={handleSuccessModalClose}
          type="listing"
          data={{
            title: formData.title,
            mainCategory: formData.mainCategory,
            cost: formData.cost ? `$${formData.cost}` : 'N/A'
          }}
          showSecondaryAction={true}
          secondaryActionText="View Listings"
          onSecondaryAction={() => {
            handleSuccessModalClose();
            // Here you could navigate to listings page
            console.log('Navigate to listings page');
          }}
        />
      )}
    </>
  );
};

export default AddNewListingModal;
