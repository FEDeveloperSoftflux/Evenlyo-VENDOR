import React from "react";

const WelcomeSection = ({ userName = "John Doe", userRole = "Vendor" }) => {
  return (
    <div className="bg-background px-3 sm:px-4 md:px-6 lg:px-8 pt-4 sm:pt-6 pb-3 sm:pb-4 lg:pb-6">
      <h2 className="text-xl sm:text-2xl sm:mt-2 lg:text-3xl lg:mt-4 font-bold text-gray-900">
        Welcome, {userName}
      </h2>
      <p className="text-gray-400 mt-2 text-xs sm:text-sm lg:text-base">
        Role: {userRole} • Here's an overview of your business performance
      </p>
    </div>
  );
};

export default WelcomeSection;
