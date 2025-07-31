import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import brandLogo from "../../assets/icons/brand.svg";
import { useSidebar } from "../../contexts/SidebarContext";

// Import custom icons
import dashboardIcon from "../../assets/icons/dashbaord-icon.svg";
import listIcon from "../../assets/icons/list-icon.svg";
import analyticsIcon from "../../assets/icons/analytics-icon.svg";
import trackingIcon from "../../assets/icons/tracking-icon.svg";
import roleIcon from "../../assets/icons/role-icon.svg";
import stockIcon from "../../assets/icons/stock-icon.svg";
import billingIcon from "../../assets/icons/billing-icon.svg";
import inboxIcon from "../../assets/icons/inbox-icon.svg";
import notificationIcon from "../../assets/icons/notification-icon.svg";
import profileIcon from "../../assets/icons/profile-icon.svg";
import settingIcon from "../../assets/icons/setting-icon.svg";

const Sidebar = ({ activeItem = "Dashboard", onNavigate }) => {
  const { isCollapsed, isMobileOpen, toggleCollapse, closeMobile } =
    useSidebar();

  const navigation = [
    {
      name: "Dashboard",
      icon: dashboardIcon,
      active: activeItem === "Dashboard",
    },
    {
      name: "Listing Management",
      icon: listIcon,
      active: activeItem === "Listing Management",
    },
    {
      name: "Booking Analytics",
      icon: analyticsIcon,
      active: activeItem === "Booking Analytics",
    },
    { name: "Tracking", icon: trackingIcon, active: activeItem === "Tracking" },
    {
      name: "Role Management",
      icon: roleIcon,
      active: activeItem === "Role Management",
    },
    {
      name: "Stock Management",
      icon: stockIcon,
      active: activeItem === "Stock Management",
    },
    {
      name: "Analytics & Report",
      icon: analyticsIcon,
      active: activeItem === "Analytics & Report",
    },
    { name: "Billing", icon: billingIcon, active: activeItem === "Billing" },
    {
      name: "Inbox / Chat",
      icon: inboxIcon,
      active: activeItem === "Inbox / Chat",
    },
    {
      name: "Notifications",
      icon: notificationIcon,
      active: activeItem === "Notifications",
    },
  ];

  const bottomNavigation = [
    { name: "Profile Management", icon: profileIcon, active: activeItem === "Profile Management" },
    { name: "Setting", icon: settingIcon, active: activeItem === "Setting" },
  ];

  const NavItem = ({ item }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0 });

    const handleMouseEnter = (e) => {
      if (isCollapsed) {
        const rect = e.currentTarget.getBoundingClientRect();
        setTooltipPosition({ top: rect.top + rect.height / 2 });
      }
      setShowTooltip(true);
    };

    return (
      <div
        className={`relative flex items-center ${
          isCollapsed ? "justify-center px-2" : "space-x-3 px-4"
        } py-3 rounded-2xl mx-4 mb-1 transition-all duration-200 cursor-pointer group ${
          item.active
            ? "bg-primary-from/10 text-primary-mid"
            : "text-gray-700 hover:bg-gray-50 hover:text-gray-800"
        }`}
        onClick={() => {
          if (onNavigate) {
            onNavigate(item.name);
          }
          // Auto-close mobile sidebar on navigation
          if (isMobileOpen) {
            closeMobile();
          }
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Left border for active item */}
        {item.active && (
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-primary-mid rounded-r-full"></div>
        )}

        {/* Icon */}
        <div className="relative">
          <img
            src={item.icon}
            alt={item.name}
            className={`w-5 h-5 transition-all duration-200 ${
              item.active
                ? "brightness-0 saturate-100" 
                : "opacity-75 group-hover:opacity-100"
            }`}
            style={{
              filter: item.active 
                ? 'brightness(0) saturate(100%) invert(27%) sepia(99%) saturate(2476%) hue-rotate(316deg) brightness(94%) contrast(94%)'
                : 'grayscale(0) brightness(0.4) saturate(100%) invert(55%) sepia(8%) saturate(878%) hue-rotate(169deg) brightness(94%) contrast(86%)'
            }}
          />
        </div>

        {/* Tooltip for collapsed state - positioned outside sidebar */}
        {isCollapsed && showTooltip && (
          <div className="fixed left-20 z-[9999] px-3 py-2 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
               style={{
                 top: `${tooltipPosition.top}px`,
                 transform: 'translateY(-50%)'
               }}>
            {item.name}
            <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
          </div>
        )}

        {/* Text label - hidden when collapsed */}
        {!isCollapsed && (
          <span
            className={`text-sm transition-all duration-200 ${
              item.active ? "font-semibold" : "font-medium"
            }`}
          >
            {item.name}
          </span>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeMobile}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 ${
          isCollapsed ? "lg:w-20" : "lg:w-64"
        } w-64 bg-white h-screen sidebar-shadow flex flex-col transform transition-all duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:flex`}
      >
        {/* Header with Logo and Toggle */}
        <div
          className={`${
            isCollapsed ? "px-2" : "px-6"
          } py-8 transition-all duration-300`}
        >
          <div className="flex items-center justify-between">
            {/* Logo - hidden when collapsed on desktop */}
            {!isCollapsed && (
              <div className="flex items-center">
                <img src={brandLogo} alt="Evenlyo" className="h-7" />
              </div>
            )}

            {/* Collapsed state - show mini logo or icon */}
            {isCollapsed && (
              <div className="flex items-center justify-center w-full">
                <div className="w-6 h-6 bg-gradient-primary rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">E</span>
                </div>
              </div>
            )}

            {/* Desktop collapse toggle */}
            <button
              onClick={toggleCollapse}
              className="hidden lg:flex p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors"
            >
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
            </button>

            {/* Close button for mobile */}
            <button
              onClick={closeMobile}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Subtle border between logo and nav links */}
        <div className="mx-4 border-b border-gray-100"></div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto pt-4">
          <div className="space-y-1">
            {navigation.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </div>
        </nav>

        {/* Bottom Navigation */}
        <div className="border-t border-gray-100 pt-4 pb-6">
          <div className="space-y-1">
            {bottomNavigation.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
