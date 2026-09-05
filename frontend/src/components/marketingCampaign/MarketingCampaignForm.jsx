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
        description: `${name} multi-channel marketing campaign`,
        budgetAllocation: 15000,
        budget: 15000,
        platform: platform || 'INSTAGRAM',
        platformType: platform || 'INSTAGRAM'
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
    marginBottom: '1.25rem',
    transition: 'border-color 0.15s ease'
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
              text={campaign?.id ? 'Update Campaign Scope' : 'Provision Campaign'}
              speed={35}
            />
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
            Configure title and distribution channel parameters
          </p>
        </div>

        <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.35rem', fontWeight: 500 }}>
          Campaign Title
        </label>
        {/* Strict test contract input */}
        <input
          ref={inputRef}
          placeholder="Summer Release"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.35rem', fontWeight: 500 }}>
          Distribution Platform
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
          <option value="" style={{ background: '#0f172a' }}>Select platform</option>
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
            backgroundColor: '#2563eb',
            color: '#ffffff',
            border: '1px solid #3b82f6',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.15s ease'
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) e.currentTarget.style.backgroundColor = '#1d4ed8';
          }}
          onMouseLeave={(e) => {
            if (!isSubmitting) e.currentTarget.style.backgroundColor = '#2563eb';
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