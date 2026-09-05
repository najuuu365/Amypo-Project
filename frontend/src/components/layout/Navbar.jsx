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
  UserPlus
} from 'lucide-react';
import DecryptedText from '../reactbits/DecryptedText';

function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth || {});
  const user = auth.user;
  const currentRole = user?.role || auth.role || 'BRAND_MANAGER';

  const navLinks = [
    { to: '/', label: 'Dashboard', Icon: LayoutDashboard },
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
        backgroundColor: '#0f172a',
        borderBottom: '1px solid #1e293b',
        padding: '0.75rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            textDecoration: 'none',
            color: '#f8fafc'
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              backgroundColor: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '0.9rem'
            }}
          >
            S
          </div>
          <span
            style={{
              fontSize: '1.2rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#f8fafc'
            }}
          >
            <DecryptedText text="SocialSift" speed={40} />
          </span>
        </Link>

        {/* Navigation Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
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
                  padding: '0.45rem 0.8rem',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: isActive ? '#f8fafc' : '#94a3b8',
                  backgroundColor: isActive ? '#1e293b' : 'transparent',
                  border: isActive ? '1px solid #334155' : '1px solid transparent',
                  transition: 'all 0.15s ease'
                }}
              >
                <IconComponent size={16} />
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
            padding: '0.3rem 0.6rem',
            borderRadius: '6px',
            backgroundColor: '#1e293b',
            border: '1px solid #334155'
          }}
        >
          <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>ROLE:</span>
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
                backgroundColor: '#1e293b',
                borderRadius: '6px',
                border: '1px solid #334155',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981'
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
                padding: '0.45rem 0.8rem',
                borderRadius: '6px',
                backgroundColor: 'transparent',
                color: '#94a3b8',
                border: '1px solid #334155',
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
                e.currentTarget.style.borderColor = '#334155';
                e.currentTarget.style.color = '#94a3b8';
              }}
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Link
              to="/login"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '6px',
                backgroundColor: '#1e293b',
                color: '#f8fafc',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 500,
                border: '1px solid #334155'
              }}
            >
              <LogIn size={14} />
              <span>Login</span>
            </Link>
            <Link
              to="/register"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '6px',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 500,
                border: '1px solid #3b82f6'
              }}
            >
              <UserPlus size={14} />
              <span>Register</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;