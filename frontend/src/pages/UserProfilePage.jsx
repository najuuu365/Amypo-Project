import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import {
  User,
  Mail,
  Shield,
  CheckCircle2,
  Calendar,
  Sparkles,
  LayoutDashboard,
  LogOut,
  Award,
  TrendingUp,
  Activity,
  Megaphone
} from 'lucide-react';
import DecryptedText from '../components/reactbits/DecryptedText';
import './UserProfilePage.css';

const DEFAULT_PROFILES = {
  BRAND_MANAGER: {
    name: 'Nadia Rachel',
    email: 'nadia.rachel@socialsift.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80',
    title: 'Brand Marketing Director',
    org: 'SocialSift Enterprise Brand Studio',
    accountTier: 'Enterprise Executive',
    joined: 'Jan 2025',
    metrics: [
      { label: 'Active Campaigns', val: '8' },
      { label: 'Deployed Budget', val: '$12.3k' },
      { label: 'Creator Partners', val: '24' },
      { label: 'ROI Score', val: '98.4%' }
    ]
  },
  INFLUENCER: {
    name: 'Alex Morgan',
    email: 'alex.morgan@creators.io',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
    title: 'Verified Influencer',
    org: 'Top 1% Consumer Tech & Lifestyle',
    accountTier: 'Pro Creator Partner',
    joined: 'Mar 2025',
    metrics: [
      { label: 'Total Reach', val: '850K' },
      { label: 'Engagements', val: '42' },
      { label: 'Engagement Rate', val: '4.8%' },
      { label: 'Escrow Cleared', val: '$18.4k' }
    ]
  },
  PLATFORM_ANALYST: {
    name: 'Marcus Vance',
    email: 'marcus.vance@audit.io',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
    title: 'Platform Security Auditor',
    org: 'SocialSift Cyber Telemetry Team',
    accountTier: 'Lead Protocol Auditor',
    joined: 'Dec 2024',
    metrics: [
      { label: 'Audited Logs', val: '1.42M' },
      { label: 'Bot Farms Blocked', val: '18' },
      { label: 'Integrity Index', val: '99.8%' },
      { label: 'Auditor Level', val: 'Tier 4' }
    ]
  }
};

export const UserProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth || {});
  const user = auth.user;
  const currentRole = user?.role || auth.role || 'BRAND_MANAGER';

  const defaultMeta = DEFAULT_PROFILES[currentRole] || DEFAULT_PROFILES.BRAND_MANAGER;
  const displayName = user?.username && user.username !== 'User' ? user.username : defaultMeta.name;
  const displayEmail = user?.email || auth.email || defaultMeta.email;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="user-profile-container">
      {/* Hero Profile Card */}
      <div className="profile-hero-card">
        <div className="profile-banner">
          <div className="profile-banner-pattern" />
        </div>

        <div className="profile-header-content">
          <div className="profile-avatar-stack">
            <div className="profile-avatar-wrapper">
              <img
                src={defaultMeta.avatar}
                alt={displayName}
                className="profile-avatar-img"
              />
              <div className="profile-verified-badge" title="Verified Account">
                <CheckCircle2 size={16} />
              </div>
            </div>

            <div className="profile-user-info">
              <h1>{displayName}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span className="profile-role-pill">
                  <Shield size={13} />
                  <span>{currentRole}</span>
                </span>
                <span style={{ fontSize: '0.88rem', color: '#a855f7', fontWeight: 600 }}>
                  {defaultMeta.title}
                </span>
              </div>

              <div className="profile-user-meta">
                <div className="meta-item">
                  <Mail size={14} color="#64748b" />
                  <span>{displayEmail}</span>
                </div>
                <div className="meta-item">
                  <Calendar size={14} color="#64748b" />
                  <span>Joined {defaultMeta.joined}</span>
                </div>
                <div className="meta-item">
                  <Award size={14} color="#10b981" />
                  <span style={{ color: '#10b981', fontWeight: 600 }}>{defaultMeta.accountTier}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-header-actions">
            <Link to="/dashboard" className="profile-action-btn primary">
              <LayoutDashboard size={15} />
              <span>My Dashboard</span>
            </Link>
            <button onClick={handleLogout} className="profile-action-btn secondary">
              <LogOut size={15} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="profile-details-grid">
        {/* Left Column: Role Metrics & Activity Overview */}
        <div>
          <div className="profile-card">
            <div className="profile-card-title">
              <TrendingUp size={18} color="#a855f7" />
              <span>
                <DecryptedText text={`${currentRole} Performance Summary`} speed={35} />
              </span>
            </div>

            <div className="stat-metric-row">
              {defaultMeta.metrics.map((m, idx) => (
                <div key={idx} className="stat-metric-box">
                  <span className="metric-val">{m.val}</span>
                  <span className="metric-label">{m.label}</span>
                </div>
              ))}
            </div>

            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
              {currentRole === 'BRAND_MANAGER' &&
                'Authorized to allocate marketing capital, negotiate influencer deliverable contracts, and verify audience retention scorecard milestones.'}
              {currentRole === 'INFLUENCER' &&
                'Authorized to receive brand collaboration proposals, upload creative content deliverables, and draw verified escrow payouts.'}
              {currentRole === 'PLATFORM_ANALYST' &&
                'Granted high-priority telemetry clearance to inspect API activity streams, mitigate click fraud clusters, and validate metric logs.'}
            </p>
          </div>

          <div className="profile-card">
            <div className="profile-card-title">
              <Sparkles size={18} color="#ec4899" />
              <span>Role Permissions & Scope</span>
            </div>

            <div className="info-list-row">
              <span className="info-list-label">Workspace Organization</span>
              <span className="info-list-value">{defaultMeta.org}</span>
            </div>
            <div className="info-list-row">
              <span className="info-list-label">Platform Role</span>
              <span className="info-list-value" style={{ color: '#c084fc' }}>{currentRole}</span>
            </div>
            <div className="info-list-row">
              <span className="info-list-label">Security Tier</span>
              <span className="info-list-value">{defaultMeta.accountTier}</span>
            </div>
            <div className="info-list-row">
              <span className="info-list-label">Two-Factor Authentication</span>
              <span className="info-list-value" style={{ color: '#10b981' }}>Enabled (Hardware Token)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Account Security & Quick Navigation */}
        <div>
          <div className="profile-card">
            <div className="profile-card-title">
              <User size={18} color="#38bdf8" />
              <span>Account Credentials</span>
            </div>

            <div className="info-list-row">
              <span className="info-list-label">Account ID</span>
              <span className="info-list-value">#{user?.accountId || 1042}</span>
            </div>
            <div className="info-list-row">
              <span className="info-list-label">Email Verified</span>
              <span className="info-list-value" style={{ color: '#10b981' }}>Verified</span>
            </div>
            <div className="info-list-row">
              <span className="info-list-label">Session Status</span>
              <span className="info-list-value" style={{ color: '#10b981' }}>Active (JWT Valid)</span>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <Link
                to="/campaigns"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '0.65rem',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(168, 85, 247, 0.12)',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  color: '#e2e8f0',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 600
                }}
              >
                <Megaphone size={14} color="#c084fc" />
                <span>Explore Campaigns</span>
              </Link>
              <Link
                to="/dashboard"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '0.65rem',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#cbd5e1',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 600
                }}
              >
                <Activity size={14} />
                <span>Return to Role Workspace</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
