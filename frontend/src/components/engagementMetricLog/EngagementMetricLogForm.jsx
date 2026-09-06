import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import engagementMetricLogService from '../../services/engagementMetricLogService';
import { fetchSuspiciousMetricsThunk } from '../../store/slices/engagementMetricLogSlice';
import SpotlightCard from '../reactbits/SpotlightCard';
import DecryptedText from '../reactbits/DecryptedText';
import StarBorder from '../reactbits/StarBorder';
import { ShieldCheck, Plus, Activity } from 'lucide-react';

export const EngagementMetricLogForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [parentContractId, setParentContractId] = useState('205');
  const [likesCount, setLikesCount] = useState(5000);
  const [commentsCount, setCommentsCount] = useState(1000);
  const [sharesCount, setSharesCount] = useState(1200);
  const [viewsCount, setViewsCount] = useState(90000);
  const [complianceStatus, setComplianceStatus] = useState('COMPLIANT');
  const [recorded, setRecorded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newLog = {
      parentContractId: Number(parentContractId),
      engagementId: Number(parentContractId),
      likesCount: Number(likesCount),
      commentsCount: Number(commentsCount),
      sharesCount: Number(sharesCount),
      viewsCount: Number(viewsCount),
      complianceStatus,
      metricType: complianceStatus === 'ANOMALY' ? 'BOT_INTERACTION' : 'CLICK_THROUGH',
      loggedValue: Number((((Number(likesCount) + Number(commentsCount) + Number(sharesCount)) / (Number(viewsCount) || 1)) * 100).toFixed(2)),
      suspicionReason: `Log submitted with status: ${complianceStatus}`
    };

    await engagementMetricLogService.record(newLog);
    dispatch(fetchSuspiciousMetricsThunk());
    setRecorded(true);
    setTimeout(() => {
      if (onClose) onClose();
    }, 1000);
  };

  const inputStyle = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '0.65rem 0.85rem',
    borderRadius: '8px',
    backgroundColor: '#0b0f19',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    color: '#f8fafc',
    fontSize: '0.85rem',
    outline: 'none',
    marginBottom: '0.85rem',
    transition: 'border-color 0.2s ease'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.78rem',
    color: '#a1a1aa',
    marginBottom: '0.3rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.04em'
  };

  return (
    <SpotlightCard style={{ padding: '1.75rem', backgroundColor: '#12131f', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
      <div style={{ marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 0.35rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={20} color="#a855f7" />
          <DecryptedText text="Append Raw Metric Event" speed={35} />
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.825rem', margin: 0 }}>
          Ingest system performance telemetry into the anomaly detection ledger
        </p>
      </div>

      {recorded ? (
        <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
          <ShieldCheck size={48} color="#10b981" style={{ margin: '0 auto 0.5rem auto' }} />
          <h4 style={{ color: '#34d399', fontSize: '1.15rem', marginTop: '0.5rem', fontWeight: 700 }}>
            Metric Event Recorded!
          </h4>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={labelStyle}>Parent Contract ID</label>
              <input
                type="number"
                value={parentContractId}
                onChange={(e) => setParentContractId(e.target.value)}
                placeholder="e.g. 205"
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Compliance Status</label>
              <select
                value={complianceStatus}
                onChange={(e) => setComplianceStatus(e.target.value)}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                <option value="COMPLIANT" style={{ background: '#111827' }}>COMPLIANT</option>
                <option value="FLAGGED" style={{ background: '#111827' }}>FLAGGED</option>
                <option value="ANOMALY" style={{ background: '#111827' }}>ANOMALY</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={labelStyle}>Likes Event Weight</label>
              <input
                type="number"
                value={likesCount}
                onChange={(e) => setLikesCount(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Comments Array Scale</label>
              <input
                type="number"
                value={commentsCount}
                onChange={(e) => setCommentsCount(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={labelStyle}>Shares / Trigger Count</label>
              <input
                type="number"
                value={sharesCount}
                onChange={(e) => setSharesCount(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Views Target Horizon</label>
              <input
                type="number"
                value={viewsCount}
                onChange={(e) => setViewsCount(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ marginTop: '0.5rem' }}>
            <StarBorder as="button" type="submit" color="#a855f7" speed="4s" style={{ width: '100%' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
                <Plus size={16} />
                + Append Raw Metric Event
              </span>
            </StarBorder>
          </div>
        </form>
      )}
    </SpotlightCard>
  );
};

export default EngagementMetricLogForm;
