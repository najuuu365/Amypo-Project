import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, setRole } from '../../store/slices/authSlice';
import {
  LayoutDashboard,
  Megaphone,
  Users,
  CheckCircle2,
  ShieldAlert,
  LogOut,
  LogIn,
  UserPlus,
  Sparkles
} from 'lucide-react';
import CircularText from '../reactbits/CircularText';
import StarBorder from '../reactbits/StarBorder';
import DecryptedText from '../reactbits/DecryptedText';

function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth || {});
  const user = auth.user;
  const currentRole = user?.role || auth.role || 'BRAND_MANAGER';

  const navLinks = [
    { to: '/', label: 'Home', Icon: LayoutDashboard },
    { to: '/campaigns', label: 'Campaigns', Icon: Megaphone },
    { to: '/profiles', label: 'Influencers', Icon: Users },
    { to: '/engagements', label: 'Engagements', Icon: CheckCircle2 },
    { to: '/metrics', label: 'Metrics Audit', Icon: ShieldAlert }
  ];

  const handleRoleChange = (newRole) => {
    dispatch(setRole(newRole));
  };

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(7, 7, 13, 0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
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
            {/* Spinning circular text */}
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

            {/* Glowing Central Badge */}
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

        {/* Navigation Links */}
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
                  padding: '0.45rem 0.85rem',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  backgroundColor: isActive ? 'rgba(99, 102, 241, 0.18)' : 'transparent',
                  border: isActive ? '1px solid rgba(99, 102, 241, 0.35)' : '1px solid transparent',
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        {/* Role Switcher */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.3rem 0.65rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, letterSpacing: '0.05em' }}>ROLE:</span>
          <select
            value={currentRole}
            onChange={(e) => handleRoleChange(e.target.value)}
            style={{
              background: 'none',
              border: 'none',
              color: '#f8fafc',
              fontWeight: 600,
              fontSize: '0.8rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="BRAND_MANAGER" style={{ background: '#0f172a', color: '#fff' }}>
              BRAND_MANAGER
            </option>
            <option value="INFLUENCER" style={{ background: '#0f172a', color: '#fff' }}>
              INFLUENCER
            </option>
            <option value="PLATFORM_ANALYST" style={{ background: '#0f172a', color: '#fff' }}>
              PLATFORM_ANALYST
            </option>
          </select>
        </div>

        {auth.isAuthenticated ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                fontSize: '0.85rem',
                color: '#cbd5e1',
                padding: '0.35rem 0.75rem',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem'
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  boxShadow: '0 0 8px #10b981'
                }}
              />
              <span>{user?.username || 'Admin'}</span>
            </div>

            <button
              onClick={() => dispatch(logout())}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '9999px',
                backgroundColor: 'transparent',
                color: '#94a3b8',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontSize: '0.85rem',
                fontWeight: 500,
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
              <LogOut size={14} />
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
  );
}

export default Navbar;