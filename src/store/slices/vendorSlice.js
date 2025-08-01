import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  services: [],
  bookings: [],
  notifications: [],
  stats: {
    totalBookings: 0,
    totalRevenue: 0,
    activeServices: 0,
    completedBookings: 0,
  },
  loading: false,
  error: null,
};

const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    setServices: (state, action) => {
      state.services = action.payload;
    },
    addService: (state, action) => {
      state.services.push(action.payload);
    },
    updateService: (state, action) => {
      const index = state.services.findIndex(service => service.id === action.payload.id);
      if (index !== -1) {
        state.services[index] = action.payload;
      }
    },
    removeService: (state, action) => {
      state.services = state.services.filter(service => service.id !== action.payload);
    },
    setBookings: (state, action) => {
      state.bookings = action.payload;
    },
    addBooking: (state, action) => {
      state.bookings.push(action.payload);
    },
    updateBooking: (state, action) => {
      const index = state.bookings.findIndex(booking => booking.id === action.payload.id);
      if (index !== -1) {
        state.bookings[index] = action.payload;
      }
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
    },
    markNotificationAsRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    setStats: (state, action) => {
      state.stats = action.payload;
    },
    updateStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload };
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setProfile,
  updateProfile,
  setServices,
  addService,
  updateService,
  removeService,
  setBookings,
  addBooking,
  updateBooking,
  setNotifications,
  addNotification,
  markNotificationAsRead,
  setStats,
  updateStats,
  setLoading,
  setError,
  clearError,
} = vendorSlice.actions;

export default vendorSlice.reducer;
