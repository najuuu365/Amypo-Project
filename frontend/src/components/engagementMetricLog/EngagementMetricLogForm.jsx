import React, { useState } from 'react';
import engagementMetricLogService from '../../services/engagementMetricLogService';
import SpotlightCard from '../reactbits/SpotlightCard';
import DecryptedText from '../reactbits/DecryptedText';
import { ShieldCheck, Plus } from 'lucide-react';

export const EngagementMetricLogForm = ({ onClose }) => {
  const [engagementId, setEngagementId] = useState(101);
  const [metricType, setMetricType] = useState('CLICK_THROUGH');
  const [loggedValue, setLoggedValue] = useState(95.5);
  const [suspicionReason, setSuspicionReason] = useState('');
  const [recorded, setRecorded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await engagementMetricLogService.record({
      engagementId: Number(engagementId),
      metricType,
      loggedValue: Number(loggedValue),
      suspicionReason
    });
    setRecorded(true);
    setTimeout(() => {
      if (onClose) onClose();
    }, 1000);
  };

  const inputStyle = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    backgroundColor: '#0b0f19',
    border: '1px solid #1e293b',
    color: '#f8fafc',
    fontSize: '0.95rem',
    outline: 'none',
    marginBottom: '1rem'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.85rem',
    color: '#cbd5e1',
    marginBottom: '0.35rem',
    fontWeight: 500
  };

  return (
    <SpotlightCard style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#f8fafc', margin: '0 0 0.35rem 0' }}>
          <DecryptedText text="Record Metric Audit" speed={35} />
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
          Ingest raw telemetry for anomaly detection
        </p>
      </div>

      {recorded ? (
        <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
          <ShieldCheck size={44} color="#10b981" style={{ margin: '0 auto 0.5rem auto' }} />
          <h4 style={{ color: '#34d399', fontSize: '1.2rem', marginTop: '0.5rem' }}>
            Metric Recorded!
          </h4>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={labelStyle}>Engagement ID</label>
          <input
            type="number"
            value={engagementId}
            onChange={(e) => setEngagementId(e.target.value)}
            required
            style={inputStyle}
          />

          <label style={labelStyle}>Metric Type</label>
          <select
            value={metricType}
            onChange={(e) => setMetricType(e.target.value)}
            style={{ ...inputStyle, cursor: 'pointer' }}
          >
            <option value="CLICK_THROUGH" style={{ background: '#111827' }}>CLICK_THROUGH</option>
            <option value="BOT_INTERACTION" style={{ background: '#111827' }}>BOT_INTERACTION</option>
            <option value="FOLLOWER_CHURN" style={{ background: '#111827' }}>FOLLOWER_CHURN</option>
            <option value="ENGAGEMENT_SPIKE" style={{ background: '#111827' }}>ENGAGEMENT_SPIKE</option>
          </select>

          <label style={labelStyle}>Recorded Value</label>
          <input
            type="number"
            step="0.1"
            value={loggedValue}
            onChange={(e) => setLoggedValue(e.target.value)}
            required
            style={inputStyle}
          />

          <label style={labelStyle}>Suspicion Flag Reason</label>
          <input
            type="text"
            placeholder="e.g. Irregular burst traffic spike"
            value={suspicionReason}
            onChange={(e) => setSuspicionReason(e.target.value)}
            required
            style={inputStyle}
          />

          <button
            type="submit"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              width: '100%',
              padding: '0.75rem',
              borderRadius: '8px',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              marginTop: '0.5rem',
              transition: 'background-color 0.15s ease'
            }}
          >
            <Plus size={16} />
            Commit Telemetry Log
          </button>
        </form>
      )}
    </SpotlightCard>
  );
};

export default EngagementMetricLogForm;
