import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import marketingCampaignReducer from './slices/marketingCampaignSlice';
import influencerProfileReducer from './slices/influencerProfileSlice';
import campaignEngagementReducer from './slices/campaignEngagementSlice';
import engagementMetricLogReducer from './slices/engagementMetricLogSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    marketingCampaign: marketingCampaignReducer,
    influencerProfile: influencerProfileReducer,
    campaignEngagement: campaignEngagementReducer,
    engagementMetricLog: engagementMetricLogReducer
  }
});

export default store;