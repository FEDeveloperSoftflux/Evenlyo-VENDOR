import React, { useReducer, useEffect, useMemo, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
} from "lucide-react";
import Badge from "../ui/Badge";
import EventPopover from "./EventPopover";
import BookingDetailDrawer from "./BookingDetailDrawer";
import AcceptedModal from "../modals/AcceptedModal";
import RejectModal from "../modals/RejectModal";
import { getBadgeStyle } from "../../assets/styleguide/badges";

/**
 * OPTIMIZED STATE MANAGEMENT APPROACH
 *
 * Instead of using multiple useState hooks which can cause:
 * - Multiple re-renders
 * - Complex state dependencies
 * - Performance issues
 *
 * We use useReducer for:
 * - Centralized state management
 * - Predictable state updates
 * - Better performance with fewer re-renders
 * - Easier debugging and testing
 */

// Initial state for the calendar component
const initialState = {
  currentDate: new Date(2025, 2), // March 2025
  selectedBooking: null,
  modals: {
    drawer: false,
    accept: false,
    reject: false,
  },
  popover: {
    event: null,
    position: { x: 0, y: 0 },
    isVisible: false,
  },
  viewport: {
    isMobile: false,
    isSmallMobile: false,
  },
};

// Reducer function to handle all state updates
const calendarReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATE":
      return { ...state, currentDate: action.payload };
    case "SET_SELECTED_BOOKING":
      return { ...state, selectedBooking: action.payload };
    case "TOGGLE_MODAL":
      return {
        ...state,
        modals: { ...state.modals, [action.modal]: action.isOpen },
      };
    case "SET_POPOVER":
      return {
        ...state,
        popover: { ...state.popover, ...action.payload },
      };
    case "HIDE_POPOVER":
      return {
        ...state,
        popover: { ...state.popover, event: null, isVisible: false },
      };
    case "SET_VIEWPORT":
      return {
        ...state,
        viewport: { ...state.viewport, ...action.payload },
      };
    default:
      return state;
  }
};

const BookingCalendar = ({ viewBy = "Week" }) => {
  const [state, dispatch] = useReducer(calendarReducer, initialState);

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
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  /**
   * RESPONSIVE BEHAVIOR WITH PERFORMANCE OPTIMIZATION
   *
   * Using useCallback to prevent unnecessary re-renders
   * and memoize the resize handler function
   */
  const handleResize = useCallback(() => {
    const isMobile = window.innerWidth < 640;
    const isSmallMobile = window.innerWidth < 480;

    dispatch({
      type: "SET_VIEWPORT",
      payload: { isMobile, isSmallMobile },
    });
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  /**
   * NAVIGATION FUNCTIONS WITH USECALLBACK
   *
   * These functions are memoized to prevent unnecessary re-renders
   * when passed as props to child components
   */
  const navigateMonth = useCallback(
    (direction) => {
      dispatch({
        type: "SET_DATE",
        payload: new Date(
          state.currentDate.getFullYear(),
          state.currentDate.getMonth() + direction,
          state.currentDate.getDate()
        ),
      });
    },
    [state.currentDate]
  );

  const navigateDay = useCallback(
    (direction) => {
      const newDate = new Date(state.currentDate);
      newDate.setDate(state.currentDate.getDate() + direction);
      dispatch({ type: "SET_DATE", payload: newDate });
    },
    [state.currentDate]
  );

  /**
   * MEMOIZED CALCULATIONS FOR BETTER PERFORMANCE
   *
   * Calendar calculations that only update when currentDate changes
   */
  const { daysInMonth, firstDayOfWeek } = useMemo(() => {
    const daysInMonth = new Date(
      state.currentDate.getFullYear(),
      state.currentDate.getMonth() + 1,
      0
    ).getDate();
    const firstDayOfWeek =
      (new Date(
        state.currentDate.getFullYear(),
        state.currentDate.getMonth(),
        1
      ).getDay() +
        6) %
      7;
    return { daysInMonth, firstDayOfWeek };
  }, [state.currentDate]);

  // Sample events data with more detailed information for popover
  const events = useMemo(
    () => [
      {
        id: 1,
        date: "2025-03-01",
        status: "rejected",
        title: "Reject",
        time: "9:00",
        customer: "Jane D.",
        description: "Customer declined booking",
        service: "Portrait Session",
        location: "Studio A - Downtown",
        bookingId: "#BK001",
      },
      // Additional bookings for March 1, 2025
      {
        id: 27,
        date: "2025-03-01",
        status: "new",
        title: "New Order",
        time: "10:00",
        customer: "Alex B.",
        description: "Initial consultation",
        service: "Wedding Photography",
        location: "Main Office",
        bookingId: "#BK027",
      },
      {
        id: 28,
        date: "2025-03-01",
        status: "in-progress",
        title: "In Progress",
        time: "12:00",
        customer: "Elizabeth C.",
        description: "Editing photo session",
        service: "Editing",
        location: "Editing Room 2",
        bookingId: "#BK028",
      },
      {
        id: 29,
        date: "2025-03-01",
        status: "complete",
        title: "Complete",
        time: "15:00",
        customer: "Mark R.",
        description: "Portrait session complete",
        service: "Portrait Photography",
        location: "Corner Studio B",
        bookingId: "#BK029",
      },
      {
        id: 30,
        date: "2025-03-01",
        status: "new",
        title: "New Order",
        time: "10:00",
        customer: "Sarah M.",
        description: "Second consultation at same time",
        service: "Corporate Photography",
        location: "Conference Room A",
        bookingId: "#BK030",
      },
      {
        id: 31,
        date: "2025-03-01",
        status: "in-progress",
        title: "In Progress",
        time: "15:00",
        customer: "David L.",
        description: "Overlapping afternoon session",
        service: "Event Photography",
        location: "Hall B",
        bookingId: "#BK031",
      },
      {
        id: 32,
        date: "2025-03-01",
        status: "rejected",
        title: "Reject",
        time: "15:00",
        customer: "Lisa K.",
        description: "Third booking at 3 PM - cancelled",
        service: "Fashion Photography",
        location: "Fashion Studio",
        bookingId: "#BK032",
      },
      {
        id: 33,
        date: "2025-03-01",
        status: "complete",
        title: "Complete",
        time: "17:00",
        customer: "Robert T.",
        description: "Evening session completed",
        service: "Portrait Photography",
        location: "Studio C",
        bookingId: "#BK033",
      },
      {
        id: 2,
        date: "2025-03-04",
        status: "new",
        title: "New Order",
        time: "12:30",
        customer: "John S.",
        description: "Wedding photography session",
        service: "Wedding Photography",
        location: "Grand Ballroom Hotel",
        bookingId: "#BK002",
      },
      {
        id: 3,
        date: "2025-03-05",
        status: "complete",
        title: "Complete",
        time: "11:30",
        customer: "Mike R.",
        description: "Portrait session completed",
        service: "Portrait Session",
        location: "Studio B - Uptown",
        bookingId: "#BK003",
      },
      {
        id: 4,
        date: "2025-03-09",
        status: "new",
        title: "New Order",
        time: "14:00",
        customer: "Sarah L.",
        description: "Corporate event photography",
        service: "Event Photography",
        location: "Business Conference Center",
        bookingId: "#BK004",
      },
      {
        id: 5,
        date: "2025-03-12",
        status: "complete",
        title: "Complete",
        time: "9:30",
        customer: "Alex T.",
        description: "Family photoshoot completed",
        service: "Family Photography",
        location: "Central Park Pavilion",
        bookingId: "#BK005",
      },
      {
        id: 6,
        date: "2025-03-16",
        status: "in-progress",
        title: "In Progress",
        time: "16:00",
        customer: "Emma W.",
        description: "Editing in progress",
        service: "Product Photography",
        location: "Commercial Studio",
        bookingId: "#BK006",
      },
      {
        id: 7,
        date: "2025-03-19",
        status: "in-progress",
        title: "In Progress",
        time: "13:00",
        customer: "David M.",
        description: "Shoot completed, editing pending",
        service: "Corporate Photography",
        location: "Executive Boardroom",
        bookingId: "#BK007",
      },
      {
        id: 8,
        date: "2025-03-21",
        status: "rejected",
        title: "Reject",
        time: "9:30",
        customer: "Lisa K.",
        description: "Schedule conflict",
        service: "Wedding Photography",
        location: "Garden Wedding Venue",
        bookingId: "#BK008",
      },
      {
        id: 9,
        date: "2025-03-25",
        status: "complete",
        title: "Complete",
        time: "11:00",
        customer: "Tom H.",
        description: "Event photography completed",
        service: "Event Photography",
        location: "Convention Center",
        bookingId: "#BK009",
      },
      // Additional dummy data for more variety in day view
      {
        id: 10,
        date: "2025-03-03",
        status: "new",
        title: "New Order",
        time: "10:00",
        customer: "Anna B.",
        description: "Maternity photoshoot session",
        service: "Maternity Photography",
        location: "Garden Studio",
        bookingId: "#BK010",
      },
      {
        id: 11,
        date: "2025-03-03",
        status: "in-progress",
        title: "In Progress",
        time: "15:30",
        customer: "Robert J.",
        description: "Post-processing headshots",
        service: "Headshot Photography",
        location: "Professional Studio",
        bookingId: "#BK011",
      },
      {
        id: 12,
        date: "2025-03-07",
        status: "complete",
        title: "Complete",
        time: "8:00",
        customer: "Maria G.",
        description: "Sunrise engagement session",
        service: "Engagement Photography",
        location: "Lakeside Park",
        bookingId: "#BK012",
      },
      {
        id: 13,
        date: "2025-03-07",
        status: "new",
        title: "New Order",
        time: "17:00",
        customer: "Chris P.",
        description: "Corporate headshots",
        service: "Corporate Photography",
        location: "Executive Office",
        bookingId: "#BK013",
      },
      {
        id: 14,
        date: "2025-03-10",
        status: "rejected",
        title: "Reject",
        time: "14:30",
        customer: "Sophie M.",
        description: "Client cancelled due to weather",
        service: "Outdoor Photography",
        location: "Mountain Trail",
        bookingId: "#BK014",
      },
      {
        id: 15,
        date: "2025-03-14",
        status: "in-progress",
        title: "In Progress",
        time: "12:00",
        customer: "James L.",
        description: "Product catalog shoot",
        service: "Product Photography",
        location: "White Backdrop Studio",
        bookingId: "#BK015",
      },
      {
        id: 16,
        date: "2025-03-18",
        status: "complete",
        title: "Complete",
        time: "10:30",
        customer: "Rachel F.",
        description: "Birthday party coverage",
        service: "Event Photography",
        location: "Community Center",
        bookingId: "#BK016",
      },
      {
        id: 17,
        date: "2025-03-22",
        status: "new",
        title: "New Order",
        time: "16:30",
        customer: "Kevin W.",
        description: "Architecture photography",
        service: "Architecture Photography",
        location: "Modern Building Complex",
        bookingId: "#BK017",
      },
      {
        id: 18,
        date: "2025-03-26",
        status: "in-progress",
        title: "In Progress",
        time: "13:30",
        customer: "Linda S.",
        description: "Fashion portfolio shoot",
        service: "Fashion Photography",
        location: "Fashion Studio Downtown",
        bookingId: "#BK018",
      },
      {
        id: 19,
        date: "2025-03-28",
        status: "complete",
        title: "Complete",
        time: "15:00",
        customer: "Mark D.",
        description: "Real estate photography",
        service: "Real Estate Photography",
        location: "Luxury Home Listing",
        bookingId: "#BK019",
      },
      {
        id: 20,
        date: "2025-03-30",
        status: "new",
        title: "New Order",
        time: "11:15",
        customer: "Patricia N.",
        description: "Pet photography session",
        service: "Pet Photography",
        location: "Dog Park Studio",
        bookingId: "#BK020",
      },
      // Additional events with same time slots to demonstrate +N indicators
      {
        id: 21,
        date: "2025-03-07",
        status: "in-progress",
        title: "In Progress",
        time: "8:00",
        customer: "Jennifer L.",
        description: "Second session of the day",
        service: "Portrait Photography",
        location: "Studio C - Central",
        bookingId: "#BK021",
      },
      {
        id: 22,
        date: "2025-03-15",
        status: "new",
        title: "New Order",
        time: "14:00",
        customer: "Michael K.",
        description: "Business portrait session",
        service: "Corporate Photography",
        location: "Executive Office Suite",
        bookingId: "#BK022",
      },
      {
        id: 23,
        date: "2025-03-15",
        status: "complete",
        title: "Complete",
        time: "14:00",
        customer: "Amanda R.",
        description: "Completed headshot session",
        service: "Headshot Photography",
        location: "Professional Studio B",
        bookingId: "#BK023",
      },
      {
        id: 24,
        date: "2025-03-15",
        status: "rejected",
        title: "Reject",
        time: "14:00",
        customer: "Brian T.",
        description: "Client scheduling conflict",
        service: "Event Photography",
        location: "Community Hall",
        bookingId: "#BK024",
      },
      {
        id: 25,
        date: "2025-03-20",
        status: "new",
        title: "New Order",
        time: "10:30",
        customer: "Diana H.",
        description: "Fashion shoot consultation",
        service: "Fashion Photography",
        location: "Fashion District Studio",
        bookingId: "#BK025",
      },
      {
        id: 26,
        date: "2025-03-20",
        status: "in-progress",
        title: "In Progress",
        time: "10:30",
        customer: "Gregory M.",
        description: "Product catalog editing",
        service: "Product Photography",
        location: "Commercial Studio East",
        bookingId: "#BK026",
      }
    ],
    []
  );

  /**
   * HOVER AND POPOVER LOGIC
   *
   * Desktop: Shows popover on hover with booking details
   * Mobile: Disabled for touch devices (better UX)
   */
  const handleEventHover = useCallback(
    (event, mouseEvent) => {
      // Only show popover on desktop (non-mobile devices)
      if (!state.viewport.isMobile && mouseEvent) {
        const rect = mouseEvent.currentTarget.getBoundingClientRect();
        dispatch({
          type: "SET_POPOVER",
          payload: {
            event,
            position: {
              x: rect.left + rect.width / 2,
              y: rect.top - 10,
            },
            isVisible: true,
          },
        });
      }
    },
    [state.viewport.isMobile]
  );

  const handleEventLeave = useCallback(() => {
    if (!state.viewport.isMobile) {
      dispatch({ type: "HIDE_POPOVER" });
    }
  }, [state.viewport.isMobile]);

  const handleEventClick = useCallback((event) => {
    dispatch({ type: "SET_SELECTED_BOOKING", payload: event });
    dispatch({ type: "TOGGLE_MODAL", modal: "drawer", isOpen: true });
    // Hide popover when clicking
    dispatch({ type: "HIDE_POPOVER" });
  }, []);

  const handleModalActions = useCallback((modalType, isOpen = false) => {
    dispatch({ type: "TOGGLE_MODAL", modal: modalType, isOpen });
    if (modalType === "accept" || modalType === "reject") {
      dispatch({ type: "TOGGLE_MODAL", modal: "drawer", isOpen: false });
    }
  }, []);

  /**
   * MEMOIZED CALENDAR DAYS CALCULATION
   *
   * Only recalculates when dependencies change
   */
  const calendarDays = useMemo(() => {
    const days = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${state.currentDate.getFullYear()}-${String(
        state.currentDate.getMonth() + 1
      ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const dayEvents = events.filter((event) => event.date === dateString);
      days.push({ day, dayEvents });
    }
    return days;
  }, [state.currentDate, firstDayOfWeek, daysInMonth, events]);

  /**
   * DAY VIEW COMPONENT
   *
   * Memoized for performance optimization
   */
  const DayView = useMemo(() => {
    const dayEvents = events.filter(
      (event) => event.date === state.currentDate.toISOString().split("T")[0]
    );

    return (
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* Day Navigation */}
        <div className="flex items-center justify-between p-3 xs:p-4 sm:p-6 border-b border-gray-200">
          <button
            onClick={() => navigateDay(-1)}
            className="p-1.5 xs:p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Previous day"
          >
            <ChevronLeft className="w-4 h-4 xs:w-5 xs:h-5 text-gray-600" />
          </button>
          <h2 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-gray-900 text-center px-2">
            {state.viewport.isMobile
              ? state.currentDate.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })
              : state.currentDate.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
          </h2>
          <button
            onClick={() => navigateDay(1)}
            className="p-1.5 xs:p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Next day"
          >
            <ChevronRight className="w-4 h-4 xs:w-5 xs:h-5 text-gray-600" />
          </button>
        </div>

        {/* Time Schedule */}
        <div className="p-2 xs:p-3 sm:p-4 md:p-6">
          <div className="space-y-1 xs:space-y-2">
            {Array.from({ length: 14 }, (_, i) => {
              const hour = i + 7; // Start from 7 AM
              const timeString = `${hour.toString().padStart(2, "0")}:00`;
              const hourEvents = dayEvents.filter((event) => {
                const eventHour = parseInt(event.time?.split(":")[0] || "0");
                return eventHour === hour;
              });

              return (
                <div
                  key={hour}
                  className="grid grid-cols-12 gap-1 xs:gap-2 sm:gap-4 min-h-[40px] xs:min-h-[50px] border-b border-gray-100 last:border-b-0"
                >
                  <div className="col-span-3 xs:col-span-2 sm:col-span-1 flex items-center">
                    <span className="text-xs sm:text-sm text-gray-500 font-medium">
                      {timeString}
                    </span>
                  </div>
                  <div className="col-span-9 xs:col-span-10 sm:col-span-11 flex items-center">
                    {hourEvents.length > 0 ? (
                      <div className="w-full space-y-0.5 xs:space-y-1">
                        {/* Show first event */}
                        <div
                          key={hourEvents[0].id}
                          className={`px-2 xs:px-3 py-1 xs:py-2 rounded-lg text-xs font-medium cursor-pointer transition-all hover:shadow-sm ${getBadgeStyle(
                            hourEvents[0].status
                          )}`}
                          onClick={() => handleEventClick(hourEvents[0])}
                          onMouseEnter={(e) => handleEventHover(hourEvents[0], e)}
                          onMouseLeave={handleEventLeave}
                        >
                          <div className="flex items-center justify-between">
                            <span className="truncate">{hourEvents[0].title}</span>
                            <div className="flex items-center gap-1">
                              <span className="text-xs opacity-75">
                                {hourEvents[0].time}
                              </span>
                              {/* Show additional booking indicator */}
                              {hourEvents.length > 1 && (
                                <span className="ml-1 px-1.5 py-0.5 bg-gray-600 text-white text-xs rounded-full font-medium">
                                  +{hourEvents.length - 1}
                                </span>
                              )}
                            </div>
                          </div>
                          {hourEvents[0].customer &&
                            !state.viewport.isSmallMobile && (
                              <div className="text-xs opacity-80 mt-1">
                                {hourEvents[0].customer}
                                {hourEvents.length > 1 && (
                                  <span className="ml-2 text-xs opacity-60">
                                    & {hourEvents.length - 1} more
                                  </span>
                                )}
                              </div>
                            )}
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center">
                        <div className="w-full h-6 xs:h-8 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer opacity-50"></div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {dayEvents.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-sm sm:text-base">
                No bookings scheduled for this day
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }, [
    state.currentDate,
    state.viewport,
    events,
    navigateDay,
    handleEventClick,
    handleEventHover,
    handleEventLeave,
  ]);

  /**
   * MONTH VIEW COMPONENT
   *
   * Memoized for performance optimization
   */
  const MonthView = useMemo(
    () => (
      <div className="border border-gray-200 rounded-2xl overflow-hidden">
        {/* Week Days Header */}
        <div className="grid grid-cols-7 bg-gray-50">
          {weekDays.map((day) => (
            <div
              key={day}
              className="p-1 xs:p-2 sm:p-3 md:p-4 text-center border-r border-gray-200 last:border-r-0"
            >
              <span className="text-xs sm:text-sm font-medium text-gray-600">
                {state.viewport.isSmallMobile
                  ? day.substring(0, 1)
                  : state.viewport.isMobile
                    ? day.substring(0, 3)
                    : day}
              </span>
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {calendarDays.map((cell, index) => (
            <div
              key={index}
              className={`min-h-[60px] xs:min-h-[80px] sm:min-h-[100px] md:min-h-[120px] p-1 xs:p-2 border-r border-b border-gray-200 last:border-r-0 ${cell ? "bg-white hover:bg-gray-50" : "bg-gray-50"
                }`}
            >
              {cell && (
                <>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs sm:text-sm font-medium text-gray-900">
                      {cell.day}
                    </span>
                    {cell.dayEvents.length > 0 && (
                      <span
                        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                          cell.dayEvents[0].status === "new"
                            ? "bg-blue-500"
                            : cell.dayEvents[0].status === "complete"
                              ? "bg-green-800"
                              : cell.dayEvents[0].status === "in-progress"
                                ? "bg-green-500"
                                : cell.dayEvents[0].status === "rejected"
                                  ? "bg-red-600"
                                  : cell.dayEvents[0].status === "paid"
                                    ? "bg-purple-600"
                                    : cell.dayEvents[0].status === "pickedup" || cell.dayEvents[0].status === "picked up"
                                      ? "bg-blue-800"
                                      : cell.dayEvents[0].status === "on the way"
                                        ? "bg-amber-600"
                                        : cell.dayEvents[0].status === "received back"
                                          ? "bg-blue-500"
                                          : cell.dayEvents[0].status === "claim"
                                            ? "bg-orange-600"
                                            : "bg-gray-500"
                          }`}
                      ></span>
                    )}
                  </div>
                  <div className="space-y-0.5 sm:space-y-1">
                    {cell.dayEvents
                      .slice(0, state.viewport.isMobile ? 1 : 2)
                      .map((event, i) => (
                        <div
                          key={i}
                          className={`px-1 xs:px-2 py-0.5 rounded text-xs font-medium cursor-pointer transition-all ${getBadgeStyle(
                            event.status
                          )}`}
                          onClick={() => handleEventClick(event)}
                          onMouseEnter={(e) => handleEventHover(event, e)}
                          onMouseLeave={handleEventLeave}
                        >
                          <div className="flex items-center justify-between">
                            <span className="truncate text-xs">
                              {event.title}
                            </span>
                            <div className="flex items-center gap-1">
                              {event.time && (
                                <span className="text-xs hidden sm:inline">
                                  {event.time}
                                </span>
                              )}
                              {/* Show +N indicator for multiple bookings on the first event */}
                              {i === 0 && cell.dayEvents.length > (state.viewport.isMobile ? 1 : 2) && (
                                <span className="px-1 py-0.5 bg-gray-600 text-white text-xs rounded-full font-medium">
                                  +{cell.dayEvents.length - (state.viewport.isMobile ? 1 : 2)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    [
      calendarDays,
      state.viewport,
      handleEventClick,
      handleEventHover,
      handleEventLeave,
      weekDays,
    ]
  );

  return (
    <div className="w-full">
      {/* Navigation Header */}
      {viewBy !== "Day" && (
        <div className="flex items-center justify-between mb-3 xs:mb-4 sm:mb-6">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-1.5 xs:p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4 xs:w-5 xs:h-5 text-gray-600" />
          </button>
          <h2 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-gray-900 text-center px-2">
            {state.viewport.isMobile
              ? `${monthNames[state.currentDate.getMonth()].substring(
                0,
                3
              )} ${state.currentDate.getFullYear()}`
              : `${monthNames[state.currentDate.getMonth()]
              } ${state.currentDate.getFullYear()}`}
          </h2>
          <button
            onClick={() => navigateMonth(1)}
            className="p-1.5 xs:p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4 xs:w-5 xs:h-5 text-gray-600" />
          </button>
        </div>
      )}

      {/* Render appropriate view */}
      {viewBy === "Day" ? DayView : MonthView}

      {/* Event Popover - Only shows on desktop */}
      {state.popover.isVisible &&
        state.popover.event &&
        !state.viewport.isMobile && (
          <EventPopover
            event={state.popover.event}
            position={state.popover.position}
            onClose={() => dispatch({ type: "HIDE_POPOVER" })}
          />
        )}

      {/* Booking Detail Drawer */}
      <BookingDetailDrawer
        isOpen={state.modals.drawer}
        booking={state.selectedBooking}
        onAccept={() => handleModalActions("accept", true)}
        onReject={() => handleModalActions("reject", true)}
        onClose={() => handleModalActions("drawer", false)}
      />

      {/* Modals */}
      <AcceptedModal
        isOpen={state.modals.accept}
        onClose={() => handleModalActions("accept", false)}
        booking={state.selectedBooking}
      />
      <RejectModal
        isOpen={state.modals.reject}
        onClose={() => handleModalActions("reject", false)}
        booking={state.selectedBooking}
      />
    </div>
  );
};

export default BookingCalendar;
