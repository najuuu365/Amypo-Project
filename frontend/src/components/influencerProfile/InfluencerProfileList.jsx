import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProfilesThunk,
  deleteProfileThunk
} from '../../store/slices/influencerProfileSlice';
import SpotlightCard from '../reactbits/SpotlightCard';
import DecryptedText from '../reactbits/DecryptedText';
import InfluencerProfileForm from './InfluencerProfileForm';
import { UserPlus, X } from 'lucide-react';

const InfluencerProfileList = ({ onEdit }) => {
  const dispatch = useDispatch();

  const {
    profiles = [],
    loading,
    error
  } = useSelector((state) => state.influencerProfile || {});

  const [editingProfile, setEditingProfile] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);

  useEffect(() => {
    dispatch(fetchProfilesThunk());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (!window.confirm('Delete this influencer profile?')) {
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

  if (loading) {
    return <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem' }}>Loading profiles...</p>;
  }

  if (error) {
    return <p style={{ color: '#f87171', textAlign: 'center', padding: '2rem' }}>{error}</p>;
  }

  if (!profiles || profiles.length === 0) {
    return <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem' }}>No influencer profiles available.</p>;
  }

  return (
    <div className="influencer-profile-list" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
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
              fontSize: '1.75rem',
              fontWeight: 700,
              color: '#f8fafc',
              margin: '0 0 0.25rem 0',
              letterSpacing: '-0.02em'
            }}
          >
            <DecryptedText text="Influencer Profiles" speed={35} />
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>
            Enterprise creator directory and scorecard verification
          </p>
        </div>

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
          <UserPlus size={16} />
          <span>+ Register New Creator</span>
        </button>
      </div>

      {showFormModal && (
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
              onClick={() => setShowFormModal(false)}
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
            <InfluencerProfileForm
              profile={editingProfile}
              onClose={() => setShowFormModal(false)}
            />
          </div>
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.25rem'
        }}
      >
        {profiles.map((profile) => (
          <SpotlightCard
            key={profile.id}
            className="profile-card"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.35rem' }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#f8fafc',
                    fontWeight: 700,
                    fontSize: '0.95rem'
                  }}
                >
                  {profile.socialHandle ? profile.socialHandle.charAt(1).toUpperCase() : 'C'}
                </div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    backgroundColor: '#1e293b',
                    color: '#94a3b8',
                    border: '1px solid #334155'
                  }}
                >
                  {profile.primaryPlatform || 'INSTAGRAM'}
                </span>
              </div>

              {/* Strict test contract elements */}
              <h3
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: '#f8fafc',
                  margin: '0 0 0.5rem 0'
                }}
              >
                {profile.socialHandle}
              </h3>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                  backgroundColor: '#0f172a',
                  padding: '0.85rem',
                  borderRadius: '6px',
                  border: '1px solid #1e293b',
                  marginBottom: '1rem',
                  fontSize: '0.85rem'
                }}
              >
                <p style={{ margin: 0, color: '#cbd5e1' }}>
                  Account ID: {profile.accountId}
                </p>

                <p style={{ margin: 0, color: '#cbd5e1' }}>
                  Platform: {profile.primaryPlatform}
                </p>

                <p style={{ margin: 0, color: '#cbd5e1' }}>
                  Niche: {profile.nicheCategory}
                </p>

                <p style={{ margin: 0, color: '#38bdf8', fontWeight: 600 }}>
                  Followers: {profile.baseFollowerCount}
                </p>

                <p style={{ margin: 0, color: '#10b981', fontWeight: 600 }}>
                  Engagement Score: {profile.overallEngagementScore}
                </p>
              </div>
            </div>

            {/* Strict test contract buttons */}
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                borderTop: '1px solid #1e293b',
                paddingTop: '0.75rem'
              }}
            >
              <button
                type="button"
                onClick={() => handleEditClick(profile)}
                style={{
                  flex: 1,
                  padding: '0.45rem',
                  borderRadius: '6px',
                  backgroundColor: '#1e293b',
                  color: '#e2e8f0',
                  border: '1px solid #334155',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => handleDelete(profile.id)}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
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
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
};

export default InfluencerProfileList;