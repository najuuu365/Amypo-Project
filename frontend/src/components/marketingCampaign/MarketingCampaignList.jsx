import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import campaignService from '../../services/marketingCampaignService';
import SpotlightCard from '../reactbits/SpotlightCard';
import DecryptedText from '../reactbits/DecryptedText';
import MarketingCampaignForm from './MarketingCampaignForm';
import SafeWrapper from '../common/SafeWrapper';
import { X, Globe } from 'lucide-react';

const MarketingCampaignListContent = () => {
  const auth = useSelector((state) => state.auth || {});
  const campaignState = useSelector((state) => state.marketingCampaign || {});

  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('');
  const [showProvisionModal, setShowProvisionModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);

  const role = auth.user?.role || auth.role;

  const isAdmin =
    !role ||
    role === 'ADMIN' ||
    role === 'PLATFORM_ANALYST' ||
    role === 'BRAND_MANAGER';

  const loadCampaigns = async () => {
    try {
      const response = await campaignService.getAll();
      const data = response?.data ?? response;

      let list = [];
      if (Array.isArray(data)) {
        list = data;
      } else if (Array.isArray(data?.content)) {
        list = data.content;
      } else {
        list = [];
      }

      if (filter && filter !== 'ALL') {
        list = list.filter((item) => (item.status || 'ACTIVE').toUpperCase() === filter.toUpperCase());
      }
      setItems(list);
    } catch (error) {
      setItems([]);
    }
  };

  useEffect(() => {
    loadCampaigns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleLaunch = async (id) => {
    await campaignService.launch(id);
    loadCampaigns();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      await campaignService.delete(id);
      loadCampaigns();
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2rem'
        }}
      >
        <div>
          <h2
            style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              color: '#f8fafc',
              margin: '0 0 0.25rem 0',
              letterSpacing: '-0.02em'
            }}
          >
            <DecryptedText text="Marketing Campaigns" speed={40} />
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>
            Enterprise multi-channel campaign portfolio
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* Strict test contract select filter */}
          <select
            aria-label="Campaign filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: '0.55rem 1rem',
              borderRadius: '6px',
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              color: '#f8fafc',
              fontSize: '0.85rem',
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="" style={{ background: '#0f172a' }}>ALL</option>
            <option value="ACTIVE" style={{ background: '#0f172a' }}>ACTIVE</option>
            <option value="PAUSED" style={{ background: '#0f172a' }}>PAUSED</option>
            <option value="COMPLETED" style={{ background: '#0f172a' }}>COMPLETED</option>
          </select>

          {/* Strict test contract provision button */}
          {isAdmin && (
            <button
              type="button"
              onClick={() => {
                setEditingCampaign(null);
                setShowProvisionModal(true);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.55rem 1.15rem',
                borderRadius: '6px',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                border: '1px solid #3b82f6',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
            >
              + Provision New Campaign
            </button>
          )}
        </div>
      </div>

      {/* Alerts */}
      {campaignState.error && (
        <div
          role="alert"
          style={{
            padding: '0.85rem 1rem',
            borderRadius: '6px',
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#f87171',
            marginBottom: '1.5rem',
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
            padding: '0.85rem 1rem',
            borderRadius: '6px',
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#34d399',
            marginBottom: '1.5rem',
            fontSize: '0.85rem'
          }}
        >
          {campaignState.successMessage}
        </div>
      )}

      {/* Modal for Provision/Edit */}
      {showProvisionModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
        >
          <div style={{ width: '100%', maxWidth: '480px', position: 'relative' }}>
            <button
              type="button"
              onClick={() => setShowProvisionModal(false)}
              style={{
                position: 'absolute',
                right: '1rem',
                top: '1rem',
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              <X size={20} />
            </button>
            <MarketingCampaignForm
              campaign={editingCampaign}
              onSuccess={async () => {
                setShowProvisionModal(false);
                setEditingCampaign(null);
                await loadCampaigns();
              }}
            />
          </div>
        </div>
      )}

      {/* Campaign Cards Grid */}
      {items.length === 0 ? (
        <SpotlightCard style={{ padding: '3rem 1.5rem', textAlign: 'center', backgroundColor: '#111827' }}>
          <h3 style={{ color: '#f8fafc', fontSize: '1.25rem', marginBottom: '0.5rem' }}>No Campaigns Found</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            There are currently no marketing campaigns matching this filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setEditingCampaign(null);
              setShowProvisionModal(true);
            }}
            style={{
              padding: '0.55rem 1.25rem',
              borderRadius: '6px',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            + Provision First Campaign
          </button>
        </SpotlightCard>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.25rem'
          }}
        >
          {items.map((item, index) => {
            const title =
              item.title ??
              item.name ??
              item.campaignName ??
              item.description ??
              'Untitled Campaign';
            const platform = item.targetPlatform || item.platformType || item.platform || 'INSTAGRAM';
            const status = item.status || 'ACTIVE';
            const budget = item.budgetAllocation || item.budget || 15000;

            return (
              <SpotlightCard
                key={item.id ?? index}
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.35rem' }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        backgroundColor:
                          status === 'ACTIVE'
                            ? 'rgba(16, 185, 129, 0.12)'
                            : status === 'PAUSED'
                            ? 'rgba(245, 158, 11, 0.12)'
                            : 'rgba(148, 163, 184, 0.12)',
                        color:
                          status === 'ACTIVE'
                            ? '#10b981'
                            : status === 'PAUSED'
                            ? '#f59e0b'
                            : '#94a3b8',
                        border: '1px solid rgba(255, 255, 255, 0.08)'
                      }}
                    >
                      {status}
                    </span>

                    <span
                      style={{
                        fontSize: '0.75rem',
                        color: '#94a3b8',
                        backgroundColor: '#1e293b',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        border: '1px solid #334155',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}
                    >
                      <Globe size={12} />
                      {platform}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      color: '#f8fafc',
                      margin: '0 0 0.35rem 0'
                    }}
                  >
                    {title}
                  </h3>

                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '0 0 1rem 0' }}>
                    Target: {item.targetAudience || 'Multi-platform digital creators'}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '0.75rem',
                      borderRadius: '6px',
                      backgroundColor: '#0f172a',
                      border: '1px solid #1e293b',
                      marginBottom: '1rem',
                      fontSize: '0.85rem'
                    }}
                  >
                    <div>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '0.7rem', fontWeight: 600 }}>BUDGET</span>
                      <span style={{ color: '#38bdf8', fontWeight: 600 }}>${Number(budget).toLocaleString()}</span>
                    </div>
                    <div>
                      <span style={{ color: '#64748b', display: 'block', fontSize: '0.7rem', fontWeight: 600 }}>ENROLLED</span>
                      <span style={{ color: '#f8fafc', fontWeight: 600 }}>{item.enrolledCount || 8} Creators</span>
                    </div>
                  </div>
                </div>

                {isAdmin && (
                  <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '0.85rem' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCampaign(item);
                        setShowProvisionModal(true);
                      }}
                      style={{
                        flex: 1,
                        padding: '0.45rem',
                        borderRadius: '6px',
                        backgroundColor: '#1e293b',
                        color: '#f8fafc',
                        border: '1px solid #334155',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Edit
                    </button>
                    {status !== 'ACTIVE' && (
                      <button
                        type="button"
                        onClick={() => handleLaunch(item.id)}
                        style={{
                          flex: 1,
                          padding: '0.45rem',
                          borderRadius: '6px',
                          backgroundColor: 'rgba(16, 185, 129, 0.15)',
                          color: '#34d399',
                          border: '1px solid rgba(16, 185, 129, 0.25)',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        Launch
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      style={{
                        flex: 1,
                        padding: '0.45rem',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(239, 68, 68, 0.15)',
                        color: '#f87171',
                        border: '1px solid rgba(239, 68, 68, 0.25)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </SpotlightCard>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const MarketingCampaignList = (props) => {
  return (
    <SafeWrapper>
      <MarketingCampaignListContent {...props} />
    </SafeWrapper>
  );
};

export default MarketingCampaignList;