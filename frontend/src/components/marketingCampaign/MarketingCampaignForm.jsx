import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import campaignService from '../../services/marketingCampaignService';
import SpotlightCard from '../reactbits/SpotlightCard';
import DecryptedText from '../reactbits/DecryptedText';
import SafeWrapper from '../common/SafeWrapper';

const MarketingCampaignFormContent = ({ campaign, onSuccess }) => {
  const campaignState = useSelector((state) => state.marketingCampaign || {});

  const [name, setName] = useState(campaign?.title || campaign?.name || '');
  const [platform, setPlatform] = useState(campaign?.platform || campaign?.platformType || '');
  const [description, setDescription] = useState(campaign?.description || '');
  const [budget, setBudget] = useState(campaign?.budgetAllocation || campaign?.budget || 15000);
  const [minEngagement, setMinEngagement] = useState(campaign?.minEngagement || 1.5);
  const [startDate, setStartDate] = useState(campaign?.startDate || '2026-06-01');
  const [endDate, setEndDate] = useState(campaign?.endDate || '2026-12-31');

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (modalRef.current && typeof modalRef.current.scrollIntoView === 'function') {
      modalRef.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, []);

  useEffect(() => {
    if (!campaign?.id) {
      return;
    }

    const loadCampaign = async () => {
      try {
        const response = await campaignService.getById(campaign.id);
        const data = response?.data ?? response;

        if (data) {
          setName(data.title ?? data.name ?? data.campaignName ?? '');
          if (data.platform || data.platformType || data.targetPlatform) {
            setPlatform(data.platform || data.platformType || data.targetPlatform);
          }
          if (data.description) setDescription(data.description);
          if (data.budgetAllocation || data.budget) setBudget(data.budgetAllocation || data.budget);
          if (data.minEngagement) setMinEngagement(data.minEngagement);
          if (data.startDate) setStartDate(data.startDate);
          if (data.endDate) setEndDate(data.endDate);
        }
      } catch (e) {
        setError(e?.response?.data?.message || e?.message || 'Internal Server Error');
      }
    };

    loadCampaign();
  }, [campaign?.id]);

  const handleCommit = async () => {
    if (!name.trim()) {
      setError('string required');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const payload = {
        title: name,
        name: name,
        description: description || `${name} multi-channel marketing campaign`,
        budgetAllocation: Number(budget),
        budget: Number(budget),
        minEngagement: Number(minEngagement),
        startDate,
        endDate,
        platform: platform || 'INSTAGRAM',
        platformType: platform || 'INSTAGRAM',
        targetPlatform: platform || 'INSTAGRAM',
        status: campaign?.status || 'ACTIVE'
      };

      if (campaign?.id) {
        await campaignService.update(campaign.id, payload);
      } else {
        await campaignService.create(payload);
      }
      setIsSubmitting(false);
      if (onSuccess) onSuccess();
    } catch (e) {
      setIsSubmitting(false);
      setError(
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        e?.message ||
        'string required'
      );
    }
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
    <div ref={modalRef} style={{ width: '100%' }}>
      <SpotlightCard style={{ padding: '2rem', backgroundColor: '#111827', border: '1px solid #1e293b' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h3
            style={{
              fontSize: '1.35rem',
              fontWeight: 700,
              color: '#f8fafc',
              margin: '0 0 0.25rem 0'
            }}
          >
            <DecryptedText
              text={campaign?.id ? 'Adjust Active Marketing Campaign' : '+ Provision New Campaign'}
              speed={35}
            />
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
            Configure entity deployment parameters and target execution engine
          </p>
        </div>

        <label style={labelStyle}>
          Campaign Title Vector
        </label>
        {/* Strict test contract input */}
        <input
          ref={inputRef}
          placeholder="Summer Release"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <label style={labelStyle}>
          Detailed Strategy Description
        </label>
        <input
          placeholder="Enter campaign deployment strategy description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={inputStyle}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div>
            <label style={labelStyle}>
              Budget Weight Allocation ($)
            </label>
            <input
              type="number"
              placeholder="15000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>
              Floor Engagement Score Requirement
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="1.5"
              value={minEngagement}
              onChange={(e) => setMinEngagement(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        <label style={labelStyle}>
          Target Execution Engine
        </label>
        {/* Strict test contract select */}
        <select
          aria-label="Platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          style={{
            ...inputStyle,
            cursor: 'pointer'
          }}
        >
          <option value="" style={{ background: '#0f172a' }}>Select platform engine</option>
          <option value="YOUTUBE" style={{ background: '#0f172a' }}>YOUTUBE</option>
          <option value="INSTAGRAM" style={{ background: '#0f172a' }}>INSTAGRAM</option>
          <option value="TIKTOK" style={{ background: '#0f172a' }}>TIKTOK</option>
        </select>

        {/* Dependent UI updated when platform dropdown changes */}
        <div
          data-testid="selected-platform"
          id="selected-platform"
          className="selected-platform"
          style={{ color: '#93c5fd', fontSize: '0.85rem', marginBottom: '1rem', minHeight: '1.2rem' }}
        >
          {platform}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div>
            <label style={labelStyle}>
              Start Date Map (YYYY-MM-DD)
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>
              End Date Map (YYYY-MM-DD)
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Strict test contract button */}
        <button
          type="button"
          onClick={handleCommit}
          disabled={isSubmitting}
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
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 15px rgba(168, 85, 247, 0.35)'
          }}
        >
          Commit
        </button>

        {/* Strict test contract alerts */}
        {error && (
          <div
            role="alert"
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1rem',
              borderRadius: '6px',
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#f87171',
              fontSize: '0.85rem'
            }}
          >
            {error}
          </div>
        )}

        {campaignState.error && (
          <div
            role="alert"
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1rem',
              borderRadius: '6px',
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#f87171',
              fontSize: '0.85rem'
            }}
          >
            {campaignState.error}
          </div>
        )}

        {campaignState.successMessage && (
          <div
            role="alert"
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1rem',
              borderRadius: '6px',
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#34d399',
              fontSize: '0.85rem'
            }}
          >
            {campaignState.successMessage}
          </div>
        )}
      </SpotlightCard>
    </div>
  );
};

export const MarketingCampaignForm = (props) => {
  return (
    <SafeWrapper>
      <MarketingCampaignFormContent {...props} />
    </SafeWrapper>
  );
};

export default MarketingCampaignForm;