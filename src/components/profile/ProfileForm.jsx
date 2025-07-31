import React, { useState } from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import CategoryBadgeList from './CategoryBadgeList';

const categories = ['Food & Drinks', 'Decoration & Styling', 'DJ', 'Live Band'];
const subCategories = ['Catering', 'Lighting', 'Floral Arrangement', 'Stage Setup'];

const ProfileForm = ({ onSubmit }) => {
  const [formState, setFormState] = useState({
    firstName: 'Asima',
    lastName: 'Khan',
    email: 'john@gmail.com',
    contactNumber: '12345678',
    address: 'Via Camilla Cavour, Florence (FI), Tuscany, Italy',
    tagline: 'Coach In Organization Name',
    description: 'Focused on creating "vibes" through immersive sound, ambient lighting, and DJ talent perfectly matched to your setting. Why Choose Us: "Perfect for intimate parties, upscale lounges, and beach weddings. Our approach is laid-back yet detail-driven."',
    selectedCategories: ['Food & Drinks', 'Decoration & Styling'],
    selectedSubCategories: ['DJ', 'Live Band'],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleCategoryChange = (category) => {
    if (!formState.selectedCategories.includes(category)) {
      setFormState({
        ...formState,
        selectedCategories: [...formState.selectedCategories, category],
      });
    }
  };

  const handleRemoveCategory = (index, type) => {
    const selected = type === 'category' ? 'selectedCategories' : 'selectedSubCategories';
    const updatedCategories = formState[selected].filter((_, i) => i !== index);
    setFormState({
      ...formState,
      [selected]: updatedCategories,
    });
  };

  const handleSubCategoryChange = (subCategory) => {
    if (!formState.selectedSubCategories.includes(subCategory)) {
      setFormState({
        ...formState,
        selectedSubCategories: [...formState.selectedSubCategories, subCategory],
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <form className="flex-1 space-y-6" onSubmit={handleSubmit}>
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            name="firstName"
            value={formState.firstName}
            onChange={handleChange}
            showEditIcon={true}
            required
          />
          <Input
            label="Last Name"
            name="lastName"
            value={formState.lastName}
            onChange={handleChange}
            showEditIcon={true}
            required
          />
          <Input
            label="Contact Number"
            name="contactNumber"
            value={formState.contactNumber}
            onChange={handleChange}
            showEditIcon={true}
            required
          />
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
            showEditIcon={true}
            required
          />
        </div>
        <Input
          label="Address"
          name="address"
          value={formState.address}
          onChange={handleChange}
          showEditIcon={true}
          required
        />
        <Input
          label="Tagline"
          name="tagline"
          value={formState.tagline}
          onChange={handleChange}
          showEditIcon={true}
          placeholder="Your organization tagline"
        />
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formState.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
            placeholder="Tell us about your services and what makes you unique..."
          />
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Explore Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Categories"
            options={categories}
            placeholder="Select Categories"
            onChange={(e) => handleCategoryChange(e.target.value)}
          />
          <Select
            label="Sub Categories"
            options={subCategories}
            placeholder="Select Sub Categories"
            onChange={(e) => handleSubCategoryChange(e.target.value)}
          />
        </div>
        
        {/* Selected Categories */}
        {formState.selectedCategories.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Selected Categories</h4>
            <CategoryBadgeList 
              categories={formState.selectedCategories} 
              onRemoveCategory={(index) => handleRemoveCategory(index, 'category')}
            />
          </div>
        )}
        
        {/* Selected Sub Categories */}
        {formState.selectedSubCategories.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Selected Sub Categories</h4>
            <CategoryBadgeList 
              categories={formState.selectedSubCategories} 
              onRemoveCategory={(index) => handleRemoveCategory(index, 'subCategory')}
            />
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex flex-col sm:flex-row sm:justify-end pt-6">
        <button
          type="submit"
          className="w-full sm:w-auto bg-gradient-to-b from-[#FF295D] via-[#E31B95] to-[#C817AE] text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;

