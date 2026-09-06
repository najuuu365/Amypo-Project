import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProfilesThunk,
  deleteProfileThunk
} from '../../store/slices/influencerProfileSlice';
import DecryptedText from '../reactbits/DecryptedText';
import InfluencerProfileForm from './InfluencerProfileForm';
import { UserPlus, X, Search, Edit2, Trash2 } from 'lucide-react';

const InfluencerProfileList = ({ onEdit }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth || {});

  const {
    profiles = []
  } = useSelector((state) => state.influencerProfile || {});

  const [editingProfile, setEditingProfile] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState('');

  const currentRole = auth.user?.role || auth.role || 'BRAND_MANAGER';
  const isAdminOrManager = currentRole === 'BRAND_MANAGER' || currentRole === 'PLATFORM_ANALYST' || currentRole === 'ADMIN';

  useEffect(() => {
    dispatch(fetchProfilesThunk());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (!window.confirm('Delete this influencer profile record?')) {
      return;
    }
    dispatch(deleteProfileThunk(id));
  };

  const handleEditClick = (profile) => {
    if (onEdit) {
      onEdit(profile);
    } else {
      setEditingProfile(profile);
      setShowFormModal(true);
    }
  };

  const seedProfiles = profiles && profiles.length > 0 ? profiles : [
    { id: 1, socialHandle: '@noble_tech', primaryPlatform: 'YOUTUBE', nicheCategory: 'Consumer Tech & AI', baseFollowerCount: 245000, overallEngagementScore: 8.9 },
    { id: 2, socialHandle: '@marcus_fit', primaryPlatform: 'INSTAGRAM', nicheCategory: 'Fitness & Nutrition', baseFollowerCount: 520000, overallEngagementScore: 9.4 },
    { id: 3, socialHandle: '@zane_vibes', primaryPlatform: 'TIKTOK', nicheCategory: 'Streetwear & Lifestyle', baseFollowerCount: 890000, overallEngagementScore: 7.8 },
    { id: 4, socialHandle: '@alex_creator', primaryPlatform: 'YOUTUBE', nicheCategory: 'Gaming & Telemetry', baseFollowerCount: 310000, overallEngagementScore: 9.1 }
  ];

  const filteredItems = seedProfiles.filter((item) => {
    const matchesPlatform = !platformFilter || platformFilter === 'ALL' || item.primaryPlatform === platformFilter;
    const matchesQuery = !searchQuery ||
      (item.socialHandle || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.nicheCategory || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPlatform && matchesQuery;
  });

  return (
    <div className="influencer-profile-list" style={{ maxWidth: '1280px', margin: '0 auto', padding: '1.5rem 1rem' }}>
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
            <DecryptedText text="Creator Influencer Profile Roster" speed={35} />
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
            Structured creator directory and dynamic engagement scorecards
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
              placeholder="Search specific social handles or niche categories..."
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

          {/* Platform filter dropdown */}
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
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
            <option value="" style={{ background: '#0f172a' }}>All Target Platforms</option>
            <option value="INSTAGRAM" style={{ background: '#0f172a' }}>INSTAGRAM</option>
            <option value="YOUTUBE" style={{ background: '#0f172a' }}>YOUTUBE</option>
            <option value="TIKTOK" style={{ background: '#0f172a' }}>TIKTOK</option>
          </select>

          {isAdminOrManager && (
            <button
              type="button"
              onClick={() => {
                setEditingProfile(null);
                setShowFormModal(true);
              }}
              style={{
                display: 'flex',
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
              <UserPlus size={15} />
              <span>+ Register New Creator</span>
            </button>
          )}
        </div>
      </div>

      {showFormModal && (
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
          onClick={() => setShowFormModal(false)}
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
              onClick={() => setShowFormModal(false)}
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
            <InfluencerProfileForm
              profile={editingProfile}
              onClose={() => {
                setShowFormModal(false);
                dispatch(fetchProfilesThunk());
              }}
            />
          </div>
        </div>
      )}

      {/* Structured Creator Roster Table */}
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
                <th style={{ padding: '1rem 1.25rem', width: '90px' }}>Identifier</th>
                <th style={{ padding: '1rem 1.25rem' }}>Creator Handle</th>
                <th style={{ padding: '1rem 1.25rem' }}>Primary Target Platform</th>
                <th style={{ padding: '1rem 1.25rem' }}>Industry Niche Category</th>
                <th style={{ padding: '1rem 1.25rem' }}>Base Follower Count</th>
                <th style={{ padding: '1rem 1.25rem' }}>Derived Dynamic Engagement Benchmark</th>
                {isAdminOrManager && <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Administrative Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={isAdminOrManager ? 7 : 6} style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                    No creator profile records found.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => {
                  const platformVal = item.primaryPlatform || 'INSTAGRAM';
                  const badgeBg =
                    platformVal === 'YOUTUBE' ? 'rgba(239, 68, 68, 0.15)' :
                    platformVal === 'TIKTOK' ? 'rgba(6, 182, 212, 0.15)' : 'rgba(236, 72, 153, 0.15)';
                  const badgeColor =
                    platformVal === 'YOUTUBE' ? '#f87171' :
                    platformVal === 'TIKTOK' ? '#38bdf8' : '#f472b6';

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
                      <td style={{ padding: '1rem 1.25rem', color: '#64748b', fontWeight: 600 }}>
                        #{item.id}
                      </td>

                      <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: '#f8fafc' }}>
                        {item.socialHandle}
                      </td>

                      <td style={{ padding: '1rem 1.25rem' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '0.25rem 0.65rem',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            backgroundColor: badgeBg,
                            color: badgeColor,
                            border: `1px solid ${badgeColor}35`
                          }}
                        >
                          {platformVal}
                        </span>
                      </td>

                      <td style={{ padding: '1rem 1.25rem', color: '#cbd5e1' }}>
                        {item.nicheCategory}
                      </td>

                      <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: '#38bdf8' }}>
                        {Number(item.baseFollowerCount || 10000).toLocaleString()}
                      </td>

                      <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: '#10b981' }}>
                        {item.overallEngagementScore || 8.5}
                      </td>

                      {isAdminOrManager && (
                        <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                            <button
                              type="button"
                              onClick={() => handleEditClick(item)}
                              style={{
                                padding: '0.35rem 0.65rem',
                                borderRadius: '6px',
                                backgroundColor: 'rgba(99, 102, 241, 0.15)',
                                color: '#818cf8',
                                border: '1px solid rgba(99, 102, 241, 0.25)',
                                fontSize: '0.78rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              <Edit2 size={13} />
                              <span>Edit</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(item.id)}
                              style={{
                                padding: '0.35rem 0.65rem',
                                borderRadius: '6px',
                                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                                color: '#f87171',
                                border: '1px solid rgba(239, 68, 68, 0.25)',
                                fontSize: '0.78rem',
                                fontWeight: 600,
                                cursor: 'pointer'
                              }}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
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

export default InfluencerProfileList;