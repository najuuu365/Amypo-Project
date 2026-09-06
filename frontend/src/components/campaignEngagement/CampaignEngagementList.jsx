import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCampaignEngagementsThunk,
  verifyEngagementThunk
} from '../../store/slices/campaignEngagementSlice';
import DecryptedText from '../reactbits/DecryptedText';
import CampaignEngagementForm from './CampaignEngagementForm';
import { ShieldCheck, Clock, X, Plus, Search, ExternalLink } from 'lucide-react';

const CampaignEngagementList = ({ campaignId = 1 }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth || {});

  const {
    engagements = [],
    loading,
    error
  } = useSelector((state) => state.campaignEngagement || {});

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState(campaignId);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const currentRole = auth.user?.role || auth.role || 'BRAND_MANAGER';
  const isManagerOrAnalyst = currentRole === 'BRAND_MANAGER' || currentRole === 'PLATFORM_ANALYST' || currentRole === 'ADMIN';

  useEffect(() => {
    if (selectedCampaignId) {
      dispatch(fetchCampaignEngagementsThunk(selectedCampaignId));
    }
  }, [dispatch, selectedCampaignId]);

  const handleVerify = (id) => {
    dispatch(verifyEngagementThunk(id));
  };

  const seedEngagements = engagements && engagements.length > 0 ? engagements : [
    { id: 201, campaignId: 1, influencerId: 101, status: 'SUBMITTED', verificationUri: 'https://audit.socialsift.ai/proof/201', score: 8.9, payout: 2500 },
    { id: 202, campaignId: 1, influencerId: 102, status: 'VERIFIED', verificationUri: 'https://audit.socialsift.ai/proof/202', score: 9.4, payout: 4200 },
    { id: 203, campaignId: 2, influencerId: 103, status: 'PENDING', verificationUri: 'https://audit.socialsift.ai/proof/203', score: 7.8, payout: 1800 },
    { id: 204, campaignId: 3, influencerId: 104, status: 'VERIFIED', verificationUri: 'https://audit.socialsift.ai/proof/204', score: 9.1, payout: 3500 }
  ];

  const filteredItems = seedEngagements.filter((item) => {
    const matchesCampaign = !selectedCampaignId || Number(item.campaignId) === Number(selectedCampaignId) || selectedCampaignId === 0;
    const matchesFilter = !statusFilter || statusFilter === 'ALL' || item.status === statusFilter;
    const matchesQuery = !searchQuery ||
      String(item.id).includes(searchQuery) ||
      String(item.campaignId).includes(searchQuery) ||
      String(item.influencerId).includes(searchQuery);
    return matchesCampaign && matchesFilter && matchesQuery;
  });

  return (
    <div className="campaign-engagement-list" style={{ maxWidth: '1280px', margin: '0 auto', padding: '1.5rem 1rem' }}>
      {/* Header & Controls bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.75rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <h2
            style={{
              fontSize: '1.6rem',
              fontWeight: 800,
              color: '#f8fafc',
              margin: '0 0 0.25rem 0',
              letterSpacing: '-0.02em'
            }}
          >
            <DecryptedText text="Campaign Enrollment Contracts Ledger" speed={35} />
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
            Relational campaign receipts, proof verification, and financial settlement
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Search input */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '0.75rem' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search receipts locked to relational campaign IDs..."
              style={{
                padding: '0.55rem 0.85rem 0.55rem 2.25rem',
                borderRadius: '8px',
                backgroundColor: 'rgba(10, 14, 26, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#f8fafc',
                fontSize: '0.85rem',
                outline: 'none',
                width: '280px'
              }}
            />
          </div>

          {/* Enrollment status filter dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '0.55rem 1rem',
              borderRadius: '8px',
              backgroundColor: 'rgba(10, 14, 26, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#f8fafc',
              fontSize: '0.85rem',
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="" style={{ background: '#0f172a' }}>All Enrollment Statuses</option>
            <option value="VERIFIED" style={{ background: '#0f172a' }}>VERIFIED</option>
            <option value="SUBMITTED" style={{ background: '#0f172a' }}>SUBMITTED</option>
            <option value="PENDING" style={{ background: '#0f172a' }}>PENDING</option>
          </select>

          {/* Campaign Selector dropdown */}
          <select
            value={selectedCampaignId}
            onChange={(e) => setSelectedCampaignId(Number(e.target.value))}
            style={{
              padding: '0.55rem 1rem',
              borderRadius: '8px',
              backgroundColor: 'rgba(10, 14, 26, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#f8fafc',
              fontSize: '0.85rem',
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value={0} style={{ background: '#0f172a' }}>All Campaigns</option>
            <option value={1} style={{ background: '#0f172a' }}>Campaign #1 - Summer Release</option>
            <option value={2} style={{ background: '#0f172a' }}>Campaign #2 - Fall Tech Launch</option>
            <option value={3} style={{ background: '#0f172a' }}>Campaign #3 - Cyber Week Viral</option>
          </select>

          <button
            type="button"
            onClick={() => setShowApplyModal(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.55rem 1.15rem',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
              color: '#ffffff',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(168, 85, 247, 0.35)'
            }}
          >
            <Plus size={15} />
            <span>Apply for Campaign</span>
          </button>
        </div>
      </div>

      {showApplyModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(16px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
          onClick={() => setShowApplyModal(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '520px',
              backgroundColor: 'rgba(14, 18, 30, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '20px',
              padding: '2rem',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowApplyModal(false)}
              style={{
                position: 'absolute',
                right: '1rem',
                top: '1rem',
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94a3b8',
                cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>
            <CampaignEngagementForm
              campaignId={selectedCampaignId || 1}
              onClose={() => setShowApplyModal(false)}
            />
          </div>
        </div>
      )}

      {/* Structured Contracts Ledger Table */}
      <div
        style={{
          backgroundColor: 'rgba(14, 18, 30, 0.75)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'rgba(20, 26, 44, 0.9)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#94a3b8', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                <th style={{ padding: '1rem 1.25rem' }}>Intersection Node ID</th>
                <th style={{ padding: '1rem 1.25rem' }}>Campaign Ref ID</th>
                <th style={{ padding: '1rem 1.25rem' }}>Creator Target Profile ID</th>
                <th style={{ padding: '1rem 1.25rem' }}>Contract Validation State</th>
                <th style={{ padding: '1rem 1.25rem' }}>Deliverable Verification Link</th>
                <th style={{ padding: '1rem 1.25rem' }}>Assigned Aggregated Score Result</th>
                <th style={{ padding: '1rem 1.25rem' }}>Allocated Financial Payout</th>
                {isManagerOrAnalyst && <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={isManagerOrAnalyst ? 8 : 7} style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                    No relational campaign receipts found.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => {
                  const statusVal = (item.status || 'SUBMITTED').toUpperCase();
                  const isVerified = statusVal === 'VERIFIED';
                  const isPending = statusVal === 'PENDING';

                  const badgeBg = isVerified ? 'rgba(16, 185, 129, 0.15)' : isPending ? 'rgba(245, 158, 11, 0.15)' : 'rgba(99, 102, 241, 0.15)';
                  const badgeColor = isVerified ? '#34d399' : isPending ? '#fbbf24' : '#818cf8';

                  const payoutVal = item.payout || 2500;
                  const scoreVal = item.score || (isVerified ? 9.4 : 8.9);
                  const verificationUri = item.verificationUri || `https://audit.socialsift.ai/proof/${item.id}`;

                  return (
                    <tr
                      key={item.id}
                      style={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                        transition: 'background-color 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: '#f8fafc' }}>
                        Node #{item.id}
                      </td>

                      <td style={{ padding: '1rem 1.25rem', color: '#cbd5e1', fontWeight: 600 }}>
                        Campaign #{item.campaignId}
                      </td>

                      <td style={{ padding: '1rem 1.25rem', color: '#94a3b8' }}>
                        Creator Node #{item.influencerId || 101}
                      </td>

                      <td style={{ padding: '1rem 1.25rem' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '0.25rem 0.65rem',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            backgroundColor: badgeBg,
                            color: badgeColor,
                            border: `1px solid ${badgeColor}35`
                          }}
                        >
                          {isVerified ? <ShieldCheck size={13} /> : <Clock size={13} />}
                          <span>{statusVal}</span>
                        </span>
                      </td>

                      <td style={{ padding: '1rem 1.25rem' }}>
                        <a
                          href={verificationUri}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: '#38bdf8',
                            textDecoration: 'none',
                            fontWeight: 600,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.82rem'
                          }}
                        >
                          <span>Auditor Verification URI</span>
                          <ExternalLink size={12} />
                        </a>
                      </td>

                      <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: '#f8fafc' }}>
                        {scoreVal}
                      </td>

                      <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: '#10b981' }}>
                        ${Number(payoutVal).toLocaleString()}
                      </td>

                      {isManagerOrAnalyst && (
                        <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                          {!isVerified && (
                            <button
                              type="button"
                              onClick={() => handleVerify(item.id)}
                              style={{
                                padding: '0.4rem 0.85rem',
                                borderRadius: '6px',
                                background: '#16a34a',
                                color: '#ffffff',
                                border: 'none',
                                fontWeight: 700,
                                fontSize: '0.8rem',
                                cursor: 'pointer',
                                boxShadow: '0 2px 8px rgba(22, 163, 74, 0.3)'
                              }}
                            >
                              Verify & Release Payout
                            </button>
                          )}
                        </td>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CampaignEngagementList;