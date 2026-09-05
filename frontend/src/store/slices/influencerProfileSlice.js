import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import influencerProfileService from '../../services/influencerProfileService';

export const fetchProfilesThunk = createAsyncThunk(
  'influencerProfile/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await influencerProfileService.getAll();
      return res?.data ?? res;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err.message || 'Failed to fetch profiles');
    }
  }
);

export const deleteProfileThunk = createAsyncThunk(
  'influencerProfile/delete',
  async (id, { rejectWithValue }) => {
    try {
      await influencerProfileService.delete(id);
      return id;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err.message || 'Failed to delete profile');
    }
  }
);

export const createProfileThunk = createAsyncThunk(
  'influencerProfile/create',
  async (data, { rejectWithValue }) => {
    try {
      const res = await influencerProfileService.create(data);
      return res?.data ?? res;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err.message || 'Failed to create profile');
    }
  }
);

const initialState = {
  profiles: [
    {
      id: 1,
      socialHandle: '@noble_tech',
      accountId: 101,
      primaryPlatform: 'YOUTUBE',
      nicheCategory: 'Consumer Tech & AI',
      baseFollowerCount: 245000,
      overallEngagementScore: 8.9
    },
    {
      id: 2,
      socialHandle: '@marcus_fit',
      accountId: 102,
      primaryPlatform: 'INSTAGRAM',
      nicheCategory: 'Fitness & Nutrition',
      baseFollowerCount: 520000,
      overallEngagementScore: 9.4
    },
    {
      id: 3,
      socialHandle: '@zane_vibes',
      accountId: 103,
      primaryPlatform: 'TIKTOK',
      nicheCategory: 'Streetwear & Lifestyle',
      baseFollowerCount: 890000,
      overallEngagementScore: 7.8
    }
  ],
  loading: false,
  error: null
};

const influencerProfileSlice = createSlice({
  name: 'influencerProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfilesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfilesThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(action.payload)) {
          state.profiles = action.payload;
        }
      })
      .addCase(fetchProfilesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProfileThunk.fulfilled, (state, action) => {
        state.profiles = state.profiles.filter((p) => p.id !== action.payload);
      })
      .addCase(createProfileThunk.fulfilled, (state, action) => {
        state.profiles.unshift(action.payload);
      });
  }
});

export default influencerProfileSlice.reducer;
