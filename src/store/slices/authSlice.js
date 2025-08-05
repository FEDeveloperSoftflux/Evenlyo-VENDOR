import { createSlice } from '@reduxjs/toolkit';

// Check if user is already logged in
const checkAuthState = () => {
  const token = localStorage.getItem('vendorToken');
  const user = localStorage.getItem('vendorUser');
  
  if (token && user) {
    return {
      user: JSON.parse(user),
      token,
      isAuthenticated: true,
    };
  }
  
  return {
    user: null,
    token: null,
    isAuthenticated: false,
  };
};

// Initialize state with existing auth data
const authState = checkAuthState();

const initialState = {
  isAuthenticated: authState.isAuthenticated,
  user: authState.user,
  loading: false,
  error: null,
  token: authState.token,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;

export default authSlice.reducer;
