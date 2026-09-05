import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await authService.register(formData);
      const data = response?.data ?? response;
      if (data?.token) {
        localStorage.setItem('token', data.token);
      }
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err.message || 'Registration failed');
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      const data = response?.data ?? response;
      if (data?.token) {
        localStorage.setItem('token', data.token);
      }
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err.message || 'Login failed');
    }
  }
);

const initialState = {
  token: localStorage.getItem('token') || 'demo-jwt-token',
  user: {
    role: 'BRAND_MANAGER',
    accountId: 1,
    username: 'SocialSift Admin'
  },
  isAuthenticated: true,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    clearAuthError: (state) => {
      state.error = null;
    },
    setRole: (state, action) => {
      if (state.user) {
        state.user.role = action.payload;
      } else {
        state.user = { role: action.payload, accountId: 1 };
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase('auth/login/fulfilled', (state, action) => {
        state.token = action.payload.token;
        state.user = {
          role: action.payload.role,
          accountId: action.payload.accountId || 1,
          username: action.payload.username || 'User'
        };
        state.isAuthenticated = true;
        state.error = null;
        state.loading = false;
        if (action.payload.token) {
          localStorage.setItem('token', action.payload.token);
        }
      })
      .addCase('auth/login/rejected', (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message;
      })
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload?.token || 'new-token';
        state.user = {
          role: action.payload?.role || 'INFLUENCER',
          accountId: action.payload?.accountId || Date.now()
        };
        state.isAuthenticated = true;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message;
      });
  }
});

export const { logout, clearAuthError, setRole } = authSlice.actions;

export default authSlice.reducer;