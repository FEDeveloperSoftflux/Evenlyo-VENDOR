import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import NotificationCard from "./NotificationCard";
import BookingDetailsModal from "./BookingDetailsModal";
import DropdownFilter from "../ui/DropdownFilter";
import SearchInput from "../ui/SearchInput";

const NotificationList = ({
  notifications = [],
  onMarkAsRead,
  onNotificationUpdate,
}) => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter options - matching the dropdown in the design
  const filterOptions = [
    { value: "all", label: "Notifications" },
    { value: "all", label: "All" },
    { value: "unread", label: "Unread" },
    { value: "read", label: "Read" },
  ];

  // Filter and search notifications
  const filteredNotifications = useMemo(() => {
    let filtered = notifications;

    // Apply status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter((notification) => {
        const status = notification.status.toLowerCase();
        return filterStatus === "unread"
          ? status === "unread"
          : status === "read";
      });
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (notification) =>
          notification.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          notification.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          notification.clientName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          notification.service.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [notifications, filterStatus, searchQuery]);

  const handleViewBooking = (notification) => {
    setSelectedBooking(notification);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const handleMarkAsRead = (notificationId) => {
    if (onMarkAsRead) {
      onMarkAsRead(notificationId);
    }

    // Update local state if needed
    if (onNotificationUpdate) {
      onNotificationUpdate(notificationId, { status: "Read" });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-card">
      {/* Header Section */}
      <div className="p-6 lg:p-8 border-b border-gray-100">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Notification History
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage and view all your booking notifications
          </p>
        </div>

        {/* Search and Filter Row */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="w-full sm:w-auto sm:flex-1 sm:max-w-md">
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="w-full"
            />
          </div>

          <div className="w-full sm:w-auto sm:min-w-[180px]">
            <DropdownFilter
              label=""
              options={filterOptions}
              selectedValue={filterStatus}
              onSelectionChange={setFilterStatus}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-gray-100">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-20 px-6">
            <div className="flex flex-col items-center gap-6">
              <div className="p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl">
                <Search className="w-10 h-10 text-pink-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {filterStatus === "all"
                    ? "No notifications yet"
                    : `No ${filterStatus} notifications`}
                </h3>
                <p className="text-gray-600 max-w-md leading-relaxed">
                  {filterStatus === "all"
                    ? "When you receive booking updates and important notifications, they will appear here."
                    : `You don't have any ${filterStatus} notifications at the moment.`}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {filteredNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onViewBooking={handleViewBooking}
              />
            ))}
          </>
        )}
      </div>

      {/* Booking Details Modal */}
      <BookingDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        booking={selectedBooking}
        onMarkAsRead={handleMarkAsRead}
      />
    </div>
  );
};

export default NotificationList;
