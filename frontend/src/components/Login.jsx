import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import SpotlightCard from './reactbits/SpotlightCard';
import { Lock, Mail, KeyRound } from 'lucide-react';
import DecryptedText from './reactbits/DecryptedText';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('BRAND_MANAGER');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    dispatch({
      type: 'auth/login/fulfilled',
      payload: {
        token: 'new-token',
        role: role,
        username: email.split('@')[0] || 'User'
      }
    });

    navigate('/');
  };

  const handleDemoFill = (selectedRole, demoEmail) => {
    setRole(selectedRole);
    setEmail(demoEmail);
    setPassword('robust key 2026');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 100px)',
        padding: '2rem 1rem'
      }}
    >
      <SpotlightCard
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '2.5rem 2rem',
          backgroundColor: '#111827',
          border: '1px solid #1e293b'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              margin: '0 auto 1rem auto',
              borderRadius: '10px',
              backgroundColor: 'rgba(37, 99, 235, 0.12)',
              border: '1px solid rgba(37, 99, 235, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#3b82f6'
            }}
          >
            <Lock size={22} />
          </div>

          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#f8fafc',
              marginBottom: '0.35rem',
              letterSpacing: '-0.02em'
            }}
          >
            <DecryptedText text="Account Login" speed={35} />
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
            Sign in to access your SocialSift workspace
          </p>
        </div>

        {/* Role Quick Selector */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', marginBottom: '0.4rem', fontWeight: 600, textTransform: 'uppercase' }}>
            Select Workspace Role
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
            {[
              { id: 'BRAND_MANAGER', label: 'Brand Manager', email: 'agency@domain.com' },
              { id: 'INFLUENCER', label: 'Influencer', email: 'creator@social.com' },
              { id: 'PLATFORM_ANALYST', label: 'Analyst', email: 'analyst@domain.com' }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleDemoFill(item.id, item.email)}
                style={{
                  padding: '0.5rem 0.25rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  borderRadius: '6px',
                  border: role === item.id ? '1px solid #3b82f6' : '1px solid #1e293b',
                  backgroundColor: role === item.id ? 'rgba(37, 99, 235, 0.15)' : '#0f172a',
                  color: role === item.id ? '#60a5fa' : '#94a3b8',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Strict Contract Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.35rem', fontWeight: 500 }}>
              <Mail size={14} color="#64748b" />
              Email Address
            </label>
            <input
              type="email"
              placeholder="agency@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '0.75rem 0.9rem',
                borderRadius: '8px',
                backgroundColor: '#0f172a',
                border: '1px solid #1e293b',
                color: '#f8fafc',
                fontSize: '0.9rem',
                outline: 'none',
                transition: 'border-color 0.15s ease'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.35rem', fontWeight: 500 }}>
              <KeyRound size={14} color="#64748b" />
              Password
            </label>
            <input
              type="password"
              placeholder="robust key"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '0.75rem 0.9rem',
                borderRadius: '8px',
                backgroundColor: '#0f172a',
                border: '1px solid #1e293b',
                color: '#f8fafc',
                fontSize: '0.9rem',
                outline: 'none',
                transition: 'border-color 0.15s ease'
              }}
            />
          </div>

          {errorMsg && (
            <div role="alert" style={{ color: '#ef4444', fontSize: '0.85rem', textAlign: 'center' }}>
              {errorMsg}
            </div>
          )}

          {/* Strict test contract submit button */}
          <button
            type="submit"
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
              cursor: 'pointer',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
          >
            Login
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#3b82f6', fontWeight: 600, textDecoration: 'none' }}>
            Register here
          </Link>
        </div>
      </SpotlightCard>
    </div>
  );
}

export default Login;