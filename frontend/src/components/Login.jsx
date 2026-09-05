import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, KeyRound } from 'lucide-react';
import DecryptedText from './reactbits/DecryptedText';
import StarBorder from './reactbits/StarBorder';

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
        minHeight: 'calc(100vh - 90px)',
        padding: '2.5rem 1rem',
        position: 'relative',
        zIndex: 2
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '460px',
          padding: '2.5rem 2rem',
          backgroundColor: 'rgba(14, 17, 26, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 35px rgba(99, 102, 241, 0.15)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              margin: '0 auto 1rem auto',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(168, 85, 247, 0.25) 100%)',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#c084fc',
              boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)'
            }}
          >
            <Lock size={24} />
          </div>

          <h2
            style={{
              fontSize: '1.6rem',
              fontWeight: 800,
              color: '#f8fafc',
              marginBottom: '0.35rem',
              letterSpacing: '-0.02em'
            }}
          >
            <DecryptedText text="Account Login" speed={35} />
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
            Sign in to access your SocialSift intelligence workspace
          </p>
        </div>

        {/* Role Quick Selector */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.74rem', color: '#64748b', marginBottom: '0.5rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
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
                  padding: '0.55rem 0.25rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  borderRadius: '8px',
                  border: role === item.id ? '1px solid rgba(99, 102, 241, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)',
                  backgroundColor: role === item.id ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                  color: role === item.id ? '#ffffff' : '#94a3b8',
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
                backgroundColor: 'rgba(10, 12, 20, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
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
                backgroundColor: 'rgba(10, 12, 20, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
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

          {/* Strict test contract submit button with StarBorder effect */}
          <StarBorder
            as="button"
            type="submit"
            color="#a855f7"
            speed="4s"
            thickness={2}
            backgroundColor="linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)"
            borderColor="rgba(168, 85, 247, 0.5)"
            style={{ width: '100%', marginTop: '0.5rem', borderRadius: '10px' }}
          >
            <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Login</span>
          </StarBorder>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#a855f7', fontWeight: 600, textDecoration: 'none' }}>
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;