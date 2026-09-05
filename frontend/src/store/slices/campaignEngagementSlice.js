import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import campaignEngagementService from '../../services/campaignEngagamentService';

export const fetchCampaignEngagementsThunk = createAsyncThunk(
  'campaignEngagement/fetchByCampaign',
  async (campaignId, { rejectWithValue }) => {
    try {
      const res = await campaignEngagementService.getByCampaign(campaignId);
      return res?.data ?? res;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err.message || 'Failed to fetch engagements');
    }
  }
);

export const verifyEngagementThunk = createAsyncThunk(
  'campaignEngagement/verify',
  async (id, { rejectWithValue }) => {
    try {
      await campaignEngagementService.verify(id);
      return id;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err.message || 'Failed to verify engagement');
    }
  }
);

const initialState = {
  engagements: [
    { id: 101, campaignId: 1, influencerId: 1, status: 'SUBMITTED', influencerName: '@noble_tech' },
    { id: 102, campaignId: 1, influencerId: 2, status: 'VERIFIED', influencerName: '@marcus_fit' },
    { id: 103, campaignId: 2, influencerId: 3, status: 'PENDING', influencerName: '@zane_vibes' }
  ],
  loading: false,
  error: null
};

const campaignEngagementSlice = createSlice({
  name: 'campaignEngagement',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampaignEngagementsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampaignEngagementsThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(action.payload)) {
          state.engagements = action.payload;
        }
      })
      .addCase(fetchCampaignEngagementsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyEngagementThunk.fulfilled, (state, action) => {
        state.engagements = state.engagements.map((e) =>
          e.id === action.payload ? { ...e, status: 'VERIFIED' } : e
        );
      });
  }
});

export default campaignEngagementSlice.reducer;
