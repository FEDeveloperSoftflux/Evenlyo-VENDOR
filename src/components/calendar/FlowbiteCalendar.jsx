import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  MapPin,
} from "lucide-react";
import EventPopover from "../booking/EventPopover";

const FlowbiteCalendar = ({
  onBookingClick,
  statusFilter,
  deliveryFilter,
  viewBy,
  setViewBy, // <-- Add this if you want to control the dropdown from parent
}) => {
  // Set initial date to March 2025 to match the image
  const [currentDate, setCurrentDate] = useState(new Date(2025, 2, 1)); // March 2025
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });

  // Comprehensive booking data from March to July 2025
  const bookings = [
    // March 2025 bookings
    {
      id: 1,
      title: "Reject",
      client: "Event Client",
      date: "2025-03-01",
      time: "9:00",
      status: "Reject",
      delivery: "Cancelled",
      color: "bg-red-500",
      statusColor: "text-red-500",
      description: "Event booking was rejected due to scheduling conflicts",
      location: "Grand Ballroom",
      phone: "+1 234-567-8901",
    },
    {
      id: 2,
      title: "New Order",
      client: "Wedding Client",
      date: "2025-03-04",
      time: "12:30",
      status: "New Order",
      delivery: "Pending",
      color: "bg-pink-500",
      statusColor: "text-pink-500",
      description: "Wedding photography and videography service",
      location: "Rose Garden Venue",
      phone: "+1 234-567-8902",
    },
    {
      id: 3,
      title: "Complete",
      client: "Corporate Event",
      date: "2025-03-06",
      time: "11:30",
      status: "Complete",
      delivery: "Delivered",
      color: "bg-green-500",
      statusColor: "text-green-500",
      description: "Corporate annual meeting setup and catering",
      location: "Downtown Convention Center",
      phone: "+1 234-567-8903",
    },
    {
      id: 4,
      title: "New Order",
      client: "Birthday Party",
      date: "2025-03-09",
      time: "2:00",
      status: "New Order",
      delivery: "Pending",
      color: "bg-pink-500",
      statusColor: "text-pink-500",
      description: "25th birthday celebration with DJ and decoration",
      location: "Community Hall",
      phone: "+1 234-567-8904",
    },
    {
      id: 5,
      title: "Complete",
      client: "Anniversary",
      date: "2025-03-12",
      time: "9:30",
      status: "Complete",
      delivery: "Delivered",
      color: "bg-green-500",
      statusColor: "text-green-500",
      description: "50th wedding anniversary celebration",
      location: "Sunset Terrace",
      phone: "+1 234-567-8905",
    },
    {
      id: 6,
      title: "In progress",
      client: "Photo Shoot",
      date: "2025-03-15",
      time: "",
      status: "In Progress",
      delivery: "In Transit",
      color: "bg-yellow-500",
      statusColor: "text-yellow-500",
      description: "Professional portrait photography session",
      location: "Studio A",
      phone: "+1 234-567-8906",
    },
    {
      id: 7,
      title: "Complete",
      client: "Event Setup",
      date: "2025-03-16",
      time: "4:00",
      status: "Complete",
      delivery: "Delivered",
      color: "bg-green-500",
      statusColor: "text-green-500",
      description: "Corporate event setup and equipment rental",
      location: "City Conference Hall",
      phone: "+1 234-567-8907",
    },
    {
      id: 8,
      title: "In progress",
      client: "Declined Event",
      date: "2025-03-19",
      time: "1:00",
      status: "In Progress",
      delivery: "In Transit",
      color: "bg-yellow-500",
      statusColor: "text-yellow-500",
      description: "Event declined due to unavailability",
      location: "TBD",
      phone: "+1 234-567-8908",
    },
    {
      id: 9,
      title: "Reject",
      client: "Party Planning",
      date: "2025-03-21",
      time: "9:30",
      status: "Reject",
      delivery: "Cancelled",
      color: "bg-red-500",
      statusColor: "text-red-500",
      description: "Children's birthday party planning and decoration",
      location: "Family Recreation Center",
      phone: "+1 234-567-8909",
    },
    {
      id: 10,
      title: "Complete",
      client: "Wedding Reception",
      date: "2025-03-25",
      time: "11:00",
      status: "Complete",
      delivery: "Delivered",
      color: "bg-green-500",
      statusColor: "text-green-500",
      description: "Wedding reception catering and entertainment",
      location: "Lakeside Manor",
      phone: "+1 234-567-8910",
    },

    // April 2025 bookings
    {
      id: 11,
      title: "New Order",
      client: "Spring Festival",
      date: "2025-04-05",
      time: "10:00",
      status: "New Order",
      delivery: "Pending",
      color: "bg-pink-500",
      statusColor: "text-pink-500",
      description: "Spring festival event planning",
      location: "City Park",
      phone: "+1 234-567-8911",
    },
    {
      id: 12,
      title: "Complete",
      client: "Easter Event",
      date: "2025-04-12",
      time: "2:30",
      status: "Complete",
      delivery: "Delivered",
      color: "bg-green-500",
      statusColor: "text-green-500",
      description: "Easter celebration event",
      location: "Community Center",
      phone: "+1 234-567-8912",
    },
    {
      id: 13,
      title: "In progress",
      client: "Corporate Meeting",
      date: "2025-04-18",
      time: "3:00",
      status: "In Progress",
      delivery: "In Transit",
      color: "bg-yellow-500",
      statusColor: "text-yellow-500",
      description: "Monthly corporate meeting setup",
      location: "Business District",
      phone: "+1 234-567-8913",
    },
    {
      id: 14,
      title: "Reject",
      client: "Cancelled Wedding",
      date: "2025-04-25",
      time: "6:00",
      status: "Reject",
      delivery: "Cancelled",
      color: "bg-red-500",
      statusColor: "text-red-500",
      description: "Wedding event cancelled last minute",
      location: "Garden Venue",
      phone: "+1 234-567-8914",
    },

    // May 2025 bookings
    {
      id: 15,
      title: "Complete",
      client: "Mother's Day",
      date: "2025-05-11",
      time: "1:00",
      status: "Complete",
      delivery: "Delivered",
      color: "bg-green-500",
      statusColor: "text-green-500",
      description: "Mother's Day celebration",
      location: "Restaurant Venue",
      phone: "+1 234-567-8915",
    },
    {
      id: 16,
      title: "New Order",
      client: "Graduation Party",
      date: "2025-05-15",
      time: "4:30",
      status: "New Order",
      delivery: "Pending",
      color: "bg-pink-500",
      statusColor: "text-pink-500",
      description: "High school graduation celebration",
      location: "School Auditorium",
      phone: "+1 234-567-8916",
    },
    {
      id: 17,
      title: "In progress",
      client: "Memorial Day",
      date: "2025-05-26",
      time: "11:00",
      status: "In Progress",
      delivery: "In Transit",
      color: "bg-yellow-500",
      statusColor: "text-yellow-500",
      description: "Memorial Day ceremony",
      location: "City Memorial",
      phone: "+1 234-567-8917",
    },

    // June 2025 bookings
    {
      id: 18,
      title: "Complete",
      client: "Summer Wedding",
      date: "2025-06-07",
      time: "5:00",
      status: "Complete",
      delivery: "Delivered",
      color: "bg-green-500",
      statusColor: "text-green-500",
      description: "Beautiful summer wedding ceremony",
      location: "Beach Resort",
      phone: "+1 234-567-8918",
    },
    {
      id: 19,
      title: "New Order",
      client: "Father's Day",
      date: "2025-06-15",
      time: "12:00",
      status: "New Order",
      delivery: "Pending",
      color: "bg-pink-500",
      statusColor: "text-pink-500",
      description: "Father's Day family gathering",
      location: "Family Home",
      phone: "+1 234-567-8919",
    },
    {
      id: 20,
      title: "Reject",
      client: "Cancelled Concert",
      date: "2025-06-20",
      time: "8:00",
      status: "Reject",
      delivery: "Cancelled",
      color: "bg-red-500",
      statusColor: "text-red-500",
      description: "Concert event cancelled due to weather",
      location: "Outdoor Venue",
      phone: "+1 234-567-8920",
    },

    // July 2025 bookings
    {
      id: 21,
      title: "Complete",
      client: "Independence Day",
      date: "2025-07-04",
      time: "7:00",
      status: "Complete",
      delivery: "Delivered",
      color: "bg-green-500",
      statusColor: "text-green-500",
      description: "4th of July celebration event",
      location: "City Center",
      phone: "+1 234-567-8921",
    },
    {
      id: 22,
      title: "In progress",
      client: "Summer Camp",
      date: "2025-07-12",
      time: "9:00",
      status: "In Progress",
      delivery: "In Transit",
      color: "bg-yellow-500",
      statusColor: "text-yellow-500",
      description: "Summer camp activity setup",
      location: "Camp Grounds",
      phone: "+1 234-567-8922",
    },
    {
      id: 23,
      title: "New Order",
      client: "Beach Party",
      date: "2025-07-25",
      time: "3:00",
      status: "New Order",
      delivery: "Pending",
      color: "bg-pink-500",
      statusColor: "text-pink-500",
      description: "Summer beach party event",
      location: "Sunset Beach",
      phone: "+1 234-567-8923",
    },
  ];

  const handleEventHover = (event, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPopoverPosition({
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
    setHoveredEvent(event);
  };

  const handleEventLeave = () => {
    setHoveredEvent(null);
  };

  const filterBookings = () => {
    return bookings.filter((booking) => {
      const statusMatch =
        statusFilter === "All Status" || booking.status === statusFilter;
      const deliveryMatch =
        deliveryFilter === "All Delivery Status" ||
        booking.delivery === deliveryFilter;
      return statusMatch && deliveryMatch;
    });
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDate = firstDay.getDay();

    const days = [];

    // Previous month's days
    for (let i = startDate - 1; i >= 0; i--) {
      const prevMonth = new Date(year, month - 1, 0).getDate() - i;
      days.push({
        date: prevMonth,
        isCurrentMonth: false,
        fullDate: new Date(year, month - 1, prevMonth),
      });
    }

    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        isCurrentMonth: true,
        fullDate: new Date(year, month, i),
      });
    }

    // Next month's days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: i,
        isCurrentMonth: false,
        fullDate: new Date(year, month + 1, i),
      });
    }

    return days;
  };

  const getWeekDays = (date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDays.push(day);
    }
    return weekDays;
  };

  const getBookingsForDate = (date) => {
    const dateString = date.toISOString().split("T")[0];
    return filterBookings().filter((booking) => booking.date === dateString);
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + direction * 7);
    setCurrentDate(newDate);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const shortDayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Month View Component (Default View as per the new requirement)
  const MonthView = () => {
    const daysInMonth = getDaysInMonth(currentDate);

    return (
      <div className="bg-white rounded-lg">
        {/* Month Navigation */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-xl font-bold text-gray-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 border-l border-t border-gray-200">
          {/* Day Headers */}
          {dayNames.map((day) => (
            <div
              key={day}
              className="p-4 text-center border-r border-b border-gray-200 bg-gray-50"
            >
              <span className="text-sm font-medium text-gray-600">{day}</span>
            </div>
          ))}

          {/* Calendar Days */}
          {daysInMonth.map((day, index) => {
            const dayBookings = getBookingsForDate(day.fullDate);
            const isToday =
              day.fullDate.toDateString() === new Date().toDateString();

            return (
              <div
                key={index}
                className={`min-h-32 p-2 border-r border-b border-gray-200 ${
                  day.isCurrentMonth
                    ? "bg-white hover:bg-gray-50"
                    : "bg-gray-50 opacity-60"
                }`}
              >
                <div
                  className={`text-sm font-medium mb-2 ${
                    isToday
                      ? "text-blue-600"
                      : day.isCurrentMonth
                      ? "text-gray-900"
                      : "text-gray-400"
                  }`}
                >
                  {day.date}
                </div>
                <div className="space-y-1">
                  {dayBookings.map((booking) => (
                    <div
                      key={booking.id}
                      onClick={() => onBookingClick(booking)}
                      className={`px-2 py-1 rounded-md text-xs font-medium cursor-pointer transition-all hover:shadow-sm text-white`}
                      style={{
                        backgroundColor:
                          booking.color
                            .replace("bg-", "")
                            .replace("500", "") === "red"
                            ? "#ef4444"
                            : booking.color
                                .replace("bg-", "")
                                .replace("500", "") === "green"
                            ? "#22c55e"
                            : booking.color
                                .replace("bg-", "")
                                .replace("500", "") === "yellow"
                            ? "#eab308"
                            : booking.color
                                .replace("bg-", "")
                                .replace("500", "") === "pink"
                            ? "#ec4899"
                            : "#6b7280",
                      }}
                      onMouseEnter={(e) => handleEventHover(booking, e)}
                      onMouseLeave={handleEventLeave}
                    >
                      <div className="flex items-center justify-between">
                        <span className="truncate">{booking.title}</span>
                        {booking.time && (
                          <span className="ml-1 text-xs">{booking.time}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Day View Component matching the second image
  const DayView = () => {
    const dayBookings = getBookingsForDate(currentDate);
    const isToday = currentDate.toDateString() === new Date().toDateString();

    return (
      <div className="bg-white rounded-lg">
        {/* Day Navigation */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">
            {currentDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h2>
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Day Content aligned with second image */}
        <div className="p-4">
          {dayBookings.length > 0 ? (
            <div className="space-y-3">
              {dayBookings.map((booking) => (
                <div
                  key={booking.id}
                  onClick={() => onBookingClick(booking)}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <div className="overflow-hidden">
                    <h3 className="font-medium text-gray-900 truncate">
                      {dayNames[currentDate.getDay()]} {booking.time}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">
                      {booking.title} - {booking.client}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No bookings for this day</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Week View Component now follows the month logic (image 1)
  const WeekView = () => {
    const weekDays = getWeekDays(currentDate);

    return (
      <div className="bg-white rounded-lg">
        {/* Week Navigation */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <button
            onClick={() => navigateWeek(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">
            {monthNames[weekDays[0].getMonth()]} {weekDays[0].getFullYear()}
          </h2>
          <button
            onClick={() => navigateWeek(1)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Week Grid Layout matching first image */}
        <div className="grid grid-cols-7">
          {weekDays.map((day, index) => {
            const dayBookings = getBookingsForDate(day);
            const isToday = day.toDateString() === new Date().toDateString();

            return (
              <div key={index} className="bg-white min-h-32 p-2">
                <div
                  className={`text-sm font-medium mb-2 ${
                    isToday ? "text-blue-600" : "text-gray-900"
                  }`}
                >
                  {shortDayNames[index]} {day.getDate()}
                </div>
                <div className="space-y-1">
                  {dayBookings.map((booking) => (
                    <div
                      key={booking.id}
                      onClick={() => onBookingClick(booking)}
                      className={`${booking.color} text-white p-1 rounded text-xs cursor-pointer hover:opacity-80`}
                      onMouseEnter={(e) => handleEventHover(booking, e)}
                      onMouseLeave={handleEventLeave}
                    >
                      <div className="font-medium truncate">
                        {booking.title}
                      </div>
                      <div className="truncate">{booking.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Dropdown for view selection (Week, Day, Month)
  // If you want to control the dropdown from here, add this:
  const handleViewChange = (e) => {
    if (setViewBy) setViewBy(e.target.value);
  };

  return (
    <div className="w-full">
      {/* Render Month View by default, Week View when viewBy is "Week" */}
      {viewBy === "Week" ? <WeekView /> : <MonthView />}

      {/* Event Popover */}
      {hoveredEvent && (
        <EventPopover
          event={hoveredEvent}
          position={popoverPosition}
          onClose={handleEventLeave}
        />
      )}
    </div>
  );
};

export default FlowbiteCalendar;
