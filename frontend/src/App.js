import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import ErrorHandler from './components/ErrorHandler';
import NotificationStack from './components/NotificationStack';
import AuroraBackground from './components/reactbits/AuroraBackground';
import Dashboard from './components/dashboard/Dashboard';
import './App.css';

function App() {
  return (
    <ErrorHandler>
      <BrowserRouter>
        <AuroraBackground>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/campaigns" element={<Dashboard />} />
              <Route path="/profiles" element={<Dashboard />} />
              <Route path="/engagements" element={<Dashboard />} />
              <Route path="/metrics" element={<Dashboard />} />
            </Routes>
          </main>
          <NotificationStack />
        </AuroraBackground>
      </BrowserRouter>
    </ErrorHandler>
  );
}

export default App;