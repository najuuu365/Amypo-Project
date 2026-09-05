import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import ErrorHandler from './components/ErrorHandler';
import NotificationStack from './components/NotificationStack';
import AuroraBackground from './components/reactbits/AuroraBackground';
import Dashboard from './components/dashboard/Dashboard';
import ManageMarketingCampaigns from './pages/ManageMarketingCampaigns';
import ManageInfluencerProfile from './pages/ManageInfluencerProfile';
import CampaignEngagementList from './components/campaignEngagement/CampaignEngagementList';
import EngagementMetricLogList from './components/engagementMetricLog/EngagementMetricLogList';
import './App.css';

function App() {
  return (
    <ErrorHandler>
      <BrowserRouter>
        <AuroraBackground>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/campaigns" element={<ManageMarketingCampaigns />} />
              <Route path="/profiles" element={<ManageInfluencerProfile />} />
              <Route path="/engagements" element={<CampaignEngagementList />} />
              <Route path="/metrics" element={<EngagementMetricLogList />} />
            </Routes>
          </main>
          <NotificationStack />
        </AuroraBackground>
      </BrowserRouter>
    </ErrorHandler>
  );
}

export default App;