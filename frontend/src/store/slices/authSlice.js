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
      return {
        ...data,
        email: formData.email,
        username: formData.username || formData.email.split('@')[0],
        role: data.role || formData.role
      };
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
      return {
        ...data,
        email: credentials.email,
        username: credentials.email.split('@')[0]
      };
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err.message || 'Invalid credentials');
    }
  }
);

const savedToken = localStorage.getItem('token');
let savedUser = null;
try {
  savedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
} catch (e) {
  savedUser = null;
}

const initialState = {
  token: savedToken || null,
  user: savedUser || null,
  isAuthenticated: Boolean(savedToken && savedUser),
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
      localStorage.removeItem('user');
    },
    clearAuthError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload?.token;
        state.user = {
          role: action.payload?.role || 'BRAND_MANAGER',
          accountId: action.payload?.accountId || 1,
          email: action.payload?.email || '',
          username: action.payload?.username || 'User',
          profileId: action.payload?.profileId
        };
        state.isAuthenticated = true;
        state.error = null;
        if (action.payload?.token) {
          localStorage.setItem('token', action.payload.token);
        }
        localStorage.setItem('user', JSON.stringify(state.user));
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message || 'Invalid credentials';
      })
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload?.token;
        state.user = {
          role: action.payload?.role || 'INFLUENCER',
          accountId: action.payload?.accountId || 1,
          email: action.payload?.email || '',
          username: action.payload?.username || 'User',
          profileId: action.payload?.profileId
        };
        state.isAuthenticated = true;
        state.error = null;
        if (action.payload?.token) {
          localStorage.setItem('token', action.payload.token);
        }
        localStorage.setItem('user', JSON.stringify(state.user));
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message || 'Registration failed';
      });
  }
});

export const { logout, clearAuthError, setRole } = authSlice.actions;

export default authSlice.reducer;