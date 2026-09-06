import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProfileThunk } from '../../store/slices/influencerProfileSlice';
import SpotlightCard from '../reactbits/SpotlightCard';
import DecryptedText from '../reactbits/DecryptedText';

export const InfluencerProfileForm = ({ profile, onClose }) => {
  const dispatch = useDispatch();

  const [socialHandle, setSocialHandle] = useState(profile?.socialHandle || '');
  const accountId = profile?.accountId || Math.floor(Math.random() * 900) + 100;
  const [primaryPlatform, setPrimaryPlatform] = useState(profile?.primaryPlatform || 'INSTAGRAM');
  const [nicheCategory, setNicheCategory] = useState(profile?.nicheCategory || '');
  const [baseFollowerCount, setBaseFollowerCount] = useState(profile?.baseFollowerCount || 10000);
  const [overallEngagementScore, setOverallEngagementScore] = useState(profile?.overallEngagementScore || 8.5);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createProfileThunk({
        socialHandle,
        accountId: Number(accountId),
        primaryPlatform,
        nicheCategory,
        baseFollowerCount: Number(baseFollowerCount),
        overallEngagementScore: Number(overallEngagementScore)
      })
    );
    if (onClose) onClose();
  };

  const inputStyle = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '0.75rem 0.9rem',
    borderRadius: '8px',
    backgroundColor: '#0f172a',
    border: '1px solid #1e293b',
    color: '#f8fafc',
    fontSize: '0.9rem',
    outline: 'none',
    marginBottom: '1rem',
    transition: 'border-color 0.15s ease'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.85rem',
    color: '#cbd5e1',
    marginBottom: '0.35rem',
    fontWeight: 500
  };

  return (
    <SpotlightCard style={{ padding: '2rem', backgroundColor: '#111827', border: '1px solid #1e293b' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#f8fafc', margin: '0 0 0.25rem 0' }}>
          <DecryptedText text={profile ? 'Update Entity Metadata Profile' : '+ Register New Creator'} speed={35} />
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
          Manage creator entity metadata and follower scale parameters
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={labelStyle}>Social Handle Map</label>
        <input
          type="text"
          placeholder="@TechRaveOfficials"
          value={socialHandle}
          onChange={(e) => setSocialHandle(e.target.value)}
          required
          style={inputStyle}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={labelStyle}>Primary Target Platform</label>
            <select
              value={primaryPlatform}
              onChange={(e) => setPrimaryPlatform(e.target.value)}
              style={{ ...inputStyle, cursor: 'pointer' }}
            >
              <option value="INSTAGRAM" style={{ background: '#0f172a' }}>INSTAGRAM</option>
              <option value="YOUTUBE" style={{ background: '#0f172a' }}>YOUTUBE</option>
              <option value="TIKTOK" style={{ background: '#0f172a' }}>TIKTOK</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Industry Niche Category</label>
            <input
              type="text"
              placeholder="e.g. Technology Review"
              value={nicheCategory}
              onChange={(e) => setNicheCategory(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={labelStyle}>Base Follower Scale Count</label>
            <input
              type="number"
              value={baseFollowerCount}
              onChange={(e) => setBaseFollowerCount(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Dynamic Engagement Benchmark</label>
            <input
              type="number"
              step="0.1"
              value={overallEngagementScore}
              onChange={(e) => setOverallEngagementScore(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            marginTop: '0.5rem',
            padding: '0.75rem',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
            color: '#ffffff',
            border: 'none',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(168, 85, 247, 0.35)'
          }}
        >
          Commit Entity Modifications
        </button>
      </form>
    </SpotlightCard>
  );
};

export default InfluencerProfileForm;
