import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
  successMessage: null
};

const marketingCampaignSlice = createSlice({
  name: 'marketingCampaign',
  initialState,

  reducers: {
    clearSuccessMessage: state => {
      state.successMessage = null;
    }
  }
});

export const {
  clearSuccessMessage
} = marketingCampaignSlice.actions;

export default marketingCampaignSlice.reducer;