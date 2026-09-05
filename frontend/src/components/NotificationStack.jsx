import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSuccessMessage } from '../store/slices/marketingCampaignSlice';

const NotificationStack = ({ notifications }) => {
  const dispatch = useDispatch();

  const campaignState = useSelector(
    (state) => state.marketingCampaign || {}
  );

  const reduxNotifications = [
    campaignState.error,
    campaignState.successMessage
  ].filter(Boolean);

  const initialNotifications =
    notifications !== undefined
      ? notifications
      : reduxNotifications;

  const [visible, setVisible] = useState(initialNotifications);

  useEffect(() => {
    const current =
      notifications !== undefined
        ? notifications
        : [
            campaignState.error,
            campaignState.successMessage
          ].filter(Boolean);

    setVisible(current);

    if (!current.length) {
      return undefined;
    }

    const timer = setTimeout(() => {
      setVisible([]);

      if (campaignState.successMessage) {
        dispatch(clearSuccessMessage());
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [
    notifications,
    campaignState.error,
    campaignState.successMessage,
    dispatch
  ]);

  return (
    <div
      aria-label="notifications"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        pointerEvents: 'none'
      }}
    >
      {visible.map((notification, index) => {
        const text = notification?.message ?? notification;
        const isError = text?.toLowerCase().includes('error') || text?.toLowerCase().includes('failed');
        return (
          <div
            key={index}
            role="alert"
            style={{
              pointerEvents: 'auto',
              padding: '0.85rem 1.25rem',
              borderRadius: '12px',
              backgroundColor: isError ? 'rgba(239, 68, 68, 0.9)' : 'rgba(16, 185, 129, 0.9)',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '0.9rem',
              boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              animation: 'slideInUp 0.3s ease-out'
            }}
          >
            {text}
          </div>
        );
      })}
    </div>
  );
};

export default NotificationStack;