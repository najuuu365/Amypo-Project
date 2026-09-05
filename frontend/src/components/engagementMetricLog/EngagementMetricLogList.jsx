import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSuspiciousMetricsThunk } from '../../store/slices/engagementMetricLogSlice';
import SpotlightCard from '../reactbits/SpotlightCard';
import DecryptedText from '../reactbits/DecryptedText';
import EngagementMetricLogForm from './EngagementMetricLogForm';
import { AlertTriangle, X, Plus, ShieldCheck } from 'lucide-react';

export const EngagementMetricLogList = () => {
  const dispatch = useDispatch();
  const { logs = [], loading, error } = useSelector(
    (state) => state.engagementMetricLog || {}
  );

  const [showLogModal, setShowLogModal] = useState(false);

  useEffect(() => {
    dispatch(fetchSuspiciousMetricsThunk());
  }, [dispatch]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem 1rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <h2
            style={{
              fontSize: '1.85rem',
              fontWeight: 800,
              color: '#f8fafc',
              margin: '0 0 0.35rem 0',
              letterSpacing: '-0.02em'
            }}
          >
            <DecryptedText text="Metric Anomaly Audits" speed={35} />
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>
            Platform Analyst fraud mitigation & telemetry log inspection
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowLogModal(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.65rem 1.25rem',
            borderRadius: '8px',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            border: 'none',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: 'pointer',
            transition: 'background-color 0.15s ease'
          }}
        >
          <Plus size={16} />
          Record Telemetry Log
        </button>
      </div>

      {showLogModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
        >
          <div style={{ width: '100%', maxWidth: '520px', position: 'relative' }}>
            <button
              type="button"
              onClick={() => setShowLogModal(false)}
              style={{
                position: 'absolute',
                right: '1rem',
                top: '1rem',
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.25rem'
              }}
            >
              <X size={20} />
            </button>
            <EngagementMetricLogForm onClose={() => setShowLogModal(false)} />
          </div>
        </div>
      )}

      {loading && <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem' }}>Loading suspicious metric logs...</p>}
      {error && <p style={{ color: '#f87171', textAlign: 'center', padding: '2rem' }}>{error}</p>}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1.5rem'
        }}
      >
        {logs.map((log) => (
          <SpotlightCard key={log.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={18} color="#f59e0b" />
                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#fbbf24',
                    backgroundColor: 'rgba(245, 158, 11, 0.12)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '4px',
                    border: '1px solid rgba(245, 158, 11, 0.25)'
                  }}
                >
                  {log.metricType}
                </span>
              </div>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Log #{log.id}</span>
            </div>

            <div
              style={{
                backgroundColor: '#0b0f19',
                border: '1px solid #1e293b',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1rem'
              }}
            >
              <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>
                <strong>Target Engagement:</strong> #{log.engagementId}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>
                <strong>Recorded Value:</strong> <span style={{ color: '#ef4444', fontWeight: 700 }}>{log.loggedValue}</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontStyle: 'italic' }}>
                "{log.suspicionReason}"
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
              <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <ShieldCheck size={14} /> Auto-quarantined
              </span>
              <button
                type="button"
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  backgroundColor: '#1e293b',
                  color: '#e2e8f0',
                  border: '1px solid #334155',
                  cursor: 'pointer',
                  fontWeight: 500
                }}
              >
                Inspect Telemetry
              </button>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
};

export default EngagementMetricLogList;
