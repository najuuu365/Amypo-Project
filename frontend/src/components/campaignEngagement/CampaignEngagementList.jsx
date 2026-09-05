import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCampaignEngagementsThunk,
  verifyEngagementThunk
} from '../../store/slices/campaignEngagementSlice';
import SpotlightCard from '../reactbits/SpotlightCard';
import DecryptedText from '../reactbits/DecryptedText';
import CampaignEngagementForm from './CampaignEngagementForm';
import { ShieldCheck, Clock, X, Plus } from 'lucide-react';

const CampaignEngagementList = ({ campaignId = 1 }) => {
  const dispatch = useDispatch();

  const {
    engagements = [],
    loading,
    error
  } = useSelector((state) => state.campaignEngagement || {});

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState(campaignId);

  useEffect(() => {
    if (selectedCampaignId) {
      dispatch(fetchCampaignEngagementsThunk(selectedCampaignId));
    }
  }, [dispatch, selectedCampaignId]);

  const handleVerify = (id) => {
    dispatch(verifyEngagementThunk(id));
  };

  if (loading) {
    return <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem' }}>Loading engagements...</p>;
  }

  if (error) {
    return <p style={{ color: '#f87171', textAlign: 'center', padding: '2rem' }}>{error}</p>;
  }

  if (!engagements || engagements.length === 0) {
    return <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem' }}>No campaign engagements found.</p>;
  }

  return (
    <div className="campaign-engagement-list" style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem 1rem' }}>
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
            <DecryptedText text="Campaign Engagements" speed={35} />
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>
            Creator enrollments, contract verifications, and status tracking
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <select
            value={selectedCampaignId}
            onChange={(e) => setSelectedCampaignId(Number(e.target.value))}
            style={{
              padding: '0.65rem 1rem',
              borderRadius: '8px',
              backgroundColor: '#111827',
              border: '1px solid #1e293b',
              color: '#f8fafc',
              fontSize: '0.9rem',
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value={1} style={{ background: '#111827' }}>Campaign #1 - Summer Release</option>
            <option value={2} style={{ background: '#111827' }}>Campaign #2 - Fall Tech Launch</option>
            <option value={3} style={{ background: '#111827' }}>Campaign #3 - Cyber Week Viral</option>
          </select>

          <button
            type="button"
            onClick={() => setShowApplyModal(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.65rem 1.25rem',
              borderRadius: '8px',
              background: '#2563eb',
              color: '#ffffff',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
            }}
          >
            <Plus size={16} />
            Apply for Campaign
          </button>
        </div>
      </div>

      {showApplyModal && (
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
              onClick={() => setShowApplyModal(false)}
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
            <CampaignEngagementForm
              campaignId={selectedCampaignId}
              onClose={() => setShowApplyModal(false)}
            />
          </div>
        </div>
      )}

      {/* Engagements Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}
      >
        {engagements.map((engagement) => {
          const isVerified = engagement.status === 'VERIFIED';
          return (
            <SpotlightCard
              key={engagement.id}
              className="engagement-card"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {isVerified ? (
                      <ShieldCheck size={20} color="#10b981" />
                    ) : (
                      <Clock size={20} color="#f59e0b" />
                    )}
                    <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 500 }}>
                      {isVerified ? 'Verified Contract' : 'Pending Verification'}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.25rem 0.6rem',
                      borderRadius: '4px',
                      backgroundColor: isVerified ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                      color: isVerified ? '#34d399' : '#fbbf24',
                      border: `1px solid ${isVerified ? 'rgba(52, 211, 153, 0.3)' : 'rgba(251, 191, 36, 0.3)'}`
                    }}
                  >
                    {engagement.status}
                  </span>
                </div>

                {/* Strict test contract paragraphs */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem',
                    backgroundColor: '#0b0f19',
                    border: '1px solid #1e293b',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    fontSize: '0.9rem'
                  }}
                >
                  <p style={{ margin: 0, color: '#f8fafc', fontWeight: 600 }}>
                    Engagement ID: {engagement.id}
                  </p>

                  <p style={{ margin: 0, color: '#94a3b8' }}>
                    Campaign ID: {engagement.campaignId}
                  </p>

                  <p style={{ margin: 0, color: '#94a3b8' }}>
                    Influencer ID: {engagement.influencerId}
                  </p>

                  <p style={{ margin: 0, color: isVerified ? '#34d399' : '#fbbf24', fontWeight: 600 }}>
                    Status: {engagement.status}
                  </p>
                </div>
              </div>

              {/* Strict test contract verify button */}
              {engagement.status !== 'VERIFIED' && (
                <button
                  type="button"
                  onClick={() => handleVerify(engagement.id)}
                  style={{
                    width: '100%',
                    padding: '0.65rem',
                    borderRadius: '8px',
                    background: '#16a34a',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease'
                  }}
                >
                  Verify
                </button>
              )}
            </SpotlightCard>
          );
        })}
      </div>
    </div>
  );
};

export default CampaignEngagementList;