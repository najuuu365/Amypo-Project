import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import {
  LayoutDashboard,
  Megaphone,
  Users,
  CheckCircle2,
  ShieldAlert,
  LogOut,
  LogIn,
  UserPlus,
  Sparkles,
  Compass,
  Bell,
  Settings,
  X,
  Shield,
  ExternalLink,
  User
} from 'lucide-react';
import CircularText from '../reactbits/CircularText';
import StarBorder from '../reactbits/StarBorder';
import DecryptedText from '../reactbits/DecryptedText';

// Role profile specifications matching Helios Investments UI
const ROLE_PROFILES = {
  BRAND_MANAGER: {
    name: 'Nadia Rachel',
    email: 'rachel_helios@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    title: 'Brand Marketing Director',
    org: 'Helios Enterprise Brand Studio',
    accountTier: 'Enterprise Executive'
  },
  INFLUENCER: {
    name: 'Alex Morgan',
    email: 'alex_creator@helios.net',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    title: 'Verified Influencer',
    org: 'Top 1% Consumer Tech & Lifestyle',
    accountTier: 'Pro Creator Partner'
  },
  PLATFORM_ANALYST: {
    name: 'Marcus Vance',
    email: 'marcus_analyst@helios.ai',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    title: 'Platform Security Auditor',
    org: 'SocialSift Cyber Telemetry Team',
    accountTier: 'Lead Protocol Auditor'
  }
};

function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth || {});
  const user = auth.user;
  const currentRole = user?.role || auth.role || 'BRAND_MANAGER';

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Role-exclusive tabs allowing each user to view their own profile
  const getNavLinks = (role, isAuthenticated) => {
    if (!isAuthenticated) {
      return [{ to: '/', label: 'Home', Icon: LayoutDashboard }];
    }

    if (role === 'BRAND_MANAGER') {
      return [
        { to: '/dashboard', label: 'Dashboard', Icon: Compass },
        { to: '/campaigns', label: 'Campaigns', Icon: Megaphone },
        { to: '/profiles', label: 'Influencers', Icon: Users },
        { to: '/engagements', label: 'Engagements', Icon: CheckCircle2 },
        { to: '/profile', label: 'My Profile', Icon: User }
      ];
    } else if (role === 'INFLUENCER') {
      return [
        { to: '/dashboard', label: 'Dashboard', Icon: Compass },
        { to: '/profile', label: 'My Profile', Icon: User },
        { to: '/engagements', label: 'Engagements', Icon: CheckCircle2 }
      ];
    } else if (role === 'PLATFORM_ANALYST') {
      return [
        { to: '/dashboard', label: 'Dashboard', Icon: Compass },
        { to: '/metrics', label: 'Metrics Audit', Icon: ShieldAlert },
        { to: '/profiles', label: 'Influencers', Icon: Users },
        { to: '/campaigns', label: 'Campaigns', Icon: Megaphone },
        { to: '/profile', label: 'My Profile', Icon: User }
      ];
    }

    return [
      { to: '/dashboard', label: 'Dashboard', Icon: Compass },
      { to: '/campaigns', label: 'Campaigns', Icon: Megaphone },
      { to: '/profiles', label: 'Influencers', Icon: Users },
      { to: '/profile', label: 'My Profile', Icon: User }
    ];
  };

  const navLinks = getNavLinks(currentRole, auth.isAuthenticated);
  const activeProfile = ROLE_PROFILES[currentRole] || ROLE_PROFILES.BRAND_MANAGER;
  const displayName = user?.username && user.username !== 'User' && user.username !== 'SocialSift Admin'
    ? user.username
    : activeProfile.name;
  const displayEmail = user?.email || auth.email || activeProfile.email;

  return (
    <>
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: 'rgba(7, 7, 13, 0.75)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '0.65rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Brand & Logo with CircularText */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              textDecoration: 'none',
              color: '#f8fafc'
            }}
          >
            {/* Animated Logo with CircularText */}
            <div
              style={{
                position: 'relative',
                width: '46px',
                height: '46px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-77px',
                  left: '-77px',
                  transform: 'scale(0.23)',
                  pointerEvents: 'none',
                  opacity: 0.85
                }}
              >
                <CircularText
                  text="SOCIALSIFT*INTELLIGENCE*"
                  spinDuration={16}
                  onHover="speedUp"
                />
              </div>

              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  boxShadow: '0 0 16px rgba(99, 102, 241, 0.6)',
                  zIndex: 2
                }}
              >
                <Sparkles size={16} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: '#f8fafc',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.2rem'
                }}
              >
                <DecryptedText text="SocialSift" speed={40} />
                <span style={{ color: '#818cf8', fontSize: '0.9rem' }}>.ai</span>
              </span>
            </div>
          </Link>

          {/* Role-Exclusive Navigation Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              const IconComponent = link.Icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.45rem 0.95rem',
                    borderRadius: '9999px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    color: isActive ? '#ffffff' : '#94a3b8',
                    backgroundColor: isActive ? 'rgba(99, 102, 241, 0.22)' : 'transparent',
                    border: isActive ? '1px solid rgba(99, 102, 241, 0.45)' : '1px solid transparent',
                    boxShadow: isActive ? '0 0 16px rgba(99, 102, 241, 0.25)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <IconComponent size={15} color={isActive ? '#818cf8' : '#94a3b8'} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {auth.isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              {/* Notification Icon (Helios style) */}
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(20, 24, 38, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  position: 'relative'
                }}
                title="Notifications"
              >
                <Bell size={16} />
                <span
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                    boxShadow: '0 0 6px #10b981'
                  }}
                />
              </button>

              {/* Settings Icon (Helios style) */}
              <button
                onClick={() => setShowProfileModal(true)}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(20, 24, 38, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#94a3b8',
                  cursor: 'pointer'
                }}
                title="Settings & Role Profile"
              >
                <Settings size={16} />
              </button>

              {/* Helios Profile Chip (Avatar + Name + Email) */}
              <div
                onClick={() => setShowProfileModal(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.25rem 0.65rem 0.25rem 0.35rem',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(20, 24, 38, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <img
                  src={activeProfile.avatar}
                  alt={displayName}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1.5px solid #a855f7'
                  }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1.15 }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f8fafc' }}>
                    {displayName}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                    {displayEmail}
                  </span>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={() => dispatch(logout())}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.8rem',
                  borderRadius: '9999px',
                  backgroundColor: 'transparent',
                  color: '#94a3b8',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#ef4444';
                  e.currentTarget.style.color = '#f87171';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.color = '#94a3b8';
                }}
              >
                <LogOut size={13} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              {/* Login button with StarBorder */}
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <StarBorder
                  as="div"
                  color="#6366f1"
                  speed="5s"
                  thickness={1}
                  backgroundColor="rgba(15, 23, 42, 0.85)"
                  borderColor="rgba(255, 255, 255, 0.12)"
                  style={{ borderRadius: '9999px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.25rem 0.65rem', fontSize: '0.82rem', fontWeight: 600 }}>
                    <LogIn size={13} color="#818cf8" />
                    <span>Login</span>
                  </div>
                </StarBorder>
              </Link>

              {/* Register button with StarBorder */}
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <StarBorder
                  as="div"
                  color="#ec4899"
                  speed="4s"
                  thickness={1.5}
                  backgroundColor="rgba(79, 70, 229, 0.9)"
                  borderColor="rgba(147, 51, 234, 0.4)"
                  style={{ borderRadius: '9999px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.25rem 0.75rem', fontSize: '0.82rem', fontWeight: 700 }}>
                    <UserPlus size={13} />
                    <span>Register</span>
                  </div>
                </StarBorder>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Helios Profile Drawer Modal */}
      {showProfileModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
          onClick={() => setShowProfileModal(false)}
        >
          <div
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '480px',
              backgroundColor: 'rgba(14, 17, 26, 0.88)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '24px',
              padding: '2rem',
              boxShadow: '0 25px 70px rgba(0, 0, 0, 0.8), 0 0 40px rgba(168, 85, 247, 0.25)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowProfileModal(false)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
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

            {/* Profile Content */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.75rem' }}>
              <img
                src={activeProfile.avatar}
                alt={displayName}
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #a855f7',
                  boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)'
                }}
              />
              <div>
                <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc' }}>
                  {displayName}
                </h3>
                <span style={{ fontSize: '0.85rem', color: '#a855f7', fontWeight: 600, display: 'block', marginBottom: '0.2rem' }}>
                  {activeProfile.title}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  {activeProfile.email}
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '0.85rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Active Role</span>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#e2e8f0', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Shield size={14} color="#818cf8" />
                  <span>{currentRole}</span>
                </div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '0.85rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Account Tier</span>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#10b981', marginTop: '0.2rem' }}>
                  {activeProfile.accountTier}
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Organization Unit</span>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: '#cbd5e1' }}>
                {activeProfile.org}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link
                to="/profile"
                onClick={() => setShowProfileModal(false)}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(168, 85, 247, 0.3)'
                }}
              >
                <User size={15} />
                <span>View Full Profile</span>
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setShowProfileModal(false)}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  textDecoration: 'none'
                }}
              >
                <span>Dashboard</span>
                <ExternalLink size={14} />
              </Link>
              <button
                onClick={() => {
                  setShowProfileModal(false);
                  dispatch(logout());
                }}
                style={{
                  padding: '0.75rem 1.15rem',
                  borderRadius: '10px',
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#f87171',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;