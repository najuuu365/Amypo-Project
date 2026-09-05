import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerThunk, clearAuthError } from '../store/slices/authSlice';
import SpotlightCard from './reactbits/SpotlightCard';
import { UserPlus } from 'lucide-react';
import DecryptedText from './reactbits/DecryptedText';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [primaryPlatform, setPrimaryPlatform] = useState('');
  const [nicheCategory, setNicheCategory] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth || {}
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username,
      email,
      password,
      role
    };

    if (role === 'INFLUENCER') {
      data.primaryPlatform = primaryPlatform;
      data.nicheCategory = nicheCategory;
    }

    dispatch(registerThunk(data));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearAuthError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    // Nav logic if needed
  }, [isAuthenticated, user, navigate]);

  const inputStyle = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '0.75rem 0.9rem',
    borderRadius: '8px',
    backgroundColor: '#0f172a',
    border: '1px solid #1e293b',
    color: '#f8fafc',
    fontSize: '0.9rem',
    outline: 'none',
    marginBottom: '1rem',
    transition: 'border-color 0.15s ease'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.85rem',
    color: '#cbd5e1',
    marginBottom: '0.35rem',
    fontWeight: 500
  };

  return (
    <div
      className="register"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 100px)',
        padding: '2rem 1rem'
      }}
    >
      <SpotlightCard
        style={{
          width: '100%',
          maxWidth: '480px',
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
            <UserPlus size={22} />
          </div>

          <h1
            style={{
              fontSize: '1.65rem',
              fontWeight: 700,
              color: '#f8fafc',
              marginBottom: '0.35rem',
              letterSpacing: '-0.02em'
            }}
          >
            <DecryptedText text="Register" speed={35} />
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
            Create your account to join the SocialSift platform
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="username" style={labelStyle}>
            Account Username *
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter handle identifier"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={inputStyle}
          />

          <label htmlFor="email" style={labelStyle}>
            Security Email Address *
          </label>
          <input
            id="email"
            type="email"
            placeholder="agency@domain.com or creator@social.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />

          <label htmlFor="password" style={labelStyle}>
            Cryptographic Password *
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter robust key sequence"
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />

          <label htmlFor="role" style={labelStyle}>
            Domain Role Assignment *
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            style={{
              ...inputStyle,
              cursor: 'pointer'
            }}
          >
            <option value="" style={{ background: '#0f172a', color: '#fff' }}>Select role</option>
            <option value="INFLUENCER" style={{ background: '#0f172a', color: '#fff' }}>INFLUENCER</option>
            <option value="BRAND_MANAGER" style={{ background: '#0f172a', color: '#fff' }}>BRAND_MANAGER</option>
            <option value="PLATFORM_ANALYST" style={{ background: '#0f172a', color: '#fff' }}>PLATFORM_ANALYST</option>
          </select>

          {role === 'INFLUENCER' && (
            <div
              style={{
                padding: '1.25rem',
                borderRadius: '8px',
                backgroundColor: '#0f172a',
                border: '1px solid #1e293b',
                marginBottom: '1rem'
              }}
            >
              <label htmlFor="primaryPlatform" style={labelStyle}>
                Primary Target Platform
              </label>
              <select
                id="primaryPlatform"
                value={primaryPlatform}
                onChange={(e) => setPrimaryPlatform(e.target.value)}
                required
                style={{
                  ...inputStyle,
                  cursor: 'pointer'
                }}
              >
                <option value="" style={{ background: '#0f172a', color: '#fff' }}>Select platform</option>
                <option value="INSTAGRAM" style={{ background: '#0f172a', color: '#fff' }}>INSTAGRAM</option>
                <option value="YOUTUBE" style={{ background: '#0f172a', color: '#fff' }}>YOUTUBE</option>
                <option value="TIKTOK" style={{ background: '#0f172a', color: '#fff' }}>TIKTOK</option>
              </select>

              <label htmlFor="nicheCategory" style={labelStyle}>
                Industry Niche Category
              </label>
              <input
                id="nicheCategory"
                type="text"
                value={nicheCategory}
                onChange={(e) => setNicheCategory(e.target.value)}
                placeholder="e.g. Consumer Tech, Fitness, Fashion"
                required
                style={{ ...inputStyle, marginBottom: 0 }}
              />
            </div>
          )}

          {/* Strict test contract button */}
          <button
            type="submit"
            disabled={loading}
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
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = '#1d4ed8';
            }}
            onMouseLeave={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = '#2563eb';
            }}
          >
            {loading ? 'Processing...' : 'Register Credentials (6 Inputs)'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>
          Already registered?{' '}
          <Link to="/login" style={{ color: '#3b82f6', fontWeight: 600, textDecoration: 'none' }}>
            Login here
          </Link>
        </div>
      </SpotlightCard>
    </div>
  );
}

export default Register;