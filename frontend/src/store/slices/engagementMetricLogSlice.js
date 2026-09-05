import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import engagementMetricLogService from '../../services/engagementMetricLogService';

export const fetchSuspiciousMetricsThunk = createAsyncThunk(
  'engagementMetricLog/fetchSuspicious',
  async (_, { rejectWithValue }) => {
    try {
      const res = await engagementMetricLogService.getSuspicious();
      return res?.data ?? res;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err.message || 'Failed to fetch metrics');
    }
  }
);

const initialState = {
  logs: [
    {
      id: 301,
      engagementId: 101,
      metricType: 'CLICK_THROUGH',
      loggedValue: 98.4,
      suspicionReason: 'Abnormal CTR spike within 2 minutes'
    },
    {
      id: 302,
      engagementId: 103,
      metricType: 'BOT_INTERACTION',
      loggedValue: 74.2,
      suspicionReason: 'Repeated sequential requests from non-residential IPs'
    }
  ],
  loading: false,
  error: null
};

const engagementMetricLogSlice = createSlice({
  name: 'engagementMetricLog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuspiciousMetricsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuspiciousMetricsThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(action.payload)) {
          state.logs = action.payload;
        }
      })
      .addCase(fetchSuspiciousMetricsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default engagementMetricLogSlice.reducer;
