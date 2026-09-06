import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerThunk, clearAuthError } from '../store/slices/authSlice';
import { UserPlus } from 'lucide-react';
import DecryptedText from './reactbits/DecryptedText';
import StarBorder from './reactbits/StarBorder';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [primaryPlatform, setPrimaryPlatform] = useState('');
  const [nicheCategory, setNicheCategory] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
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
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const inputStyle = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '0.75rem 0.9rem',
    borderRadius: '8px',
    backgroundColor: 'rgba(10, 12, 20, 0.8)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
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
          maxWidth: '500px',
          padding: '2.5rem 2rem',
          backgroundColor: 'rgba(14, 17, 26, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 35px rgba(236, 72, 153, 0.15)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              margin: '0 auto 1rem auto',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.25) 0%, rgba(168, 85, 247, 0.25) 100%)',
              border: '1px solid rgba(236, 72, 153, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#f472b6',
              boxShadow: '0 0 20px rgba(236, 72, 153, 0.3)'
            }}
          >
            <UserPlus size={24} />
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
            <DecryptedText text="Provision Access Platform" speed={35} />
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
            Provision user credentials across SocialSift intelligence nodes
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <label htmlFor="username" style={labelStyle}>
            Account Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter handle identifier"
            required
            style={inputStyle}
          />

          <label htmlFor="email" style={labelStyle}>
            Security Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            required
            style={inputStyle}
          />

          <label htmlFor="password" style={labelStyle}>
            Cryptographic Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            style={inputStyle}
          />

          <label htmlFor="role" style={labelStyle}>
            Domain Role Assignment
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
            <option value="" style={{ background: '#0f172a', color: '#fff' }}>Select role assignment</option>
            <option value="INFLUENCER" style={{ background: '#0f172a', color: '#fff' }}>INFLUENCER</option>
            <option value="BRAND_MANAGER" style={{ background: '#0f172a', color: '#fff' }}>BRAND_MANAGER</option>
            <option value="PLATFORM_ANALYST" style={{ background: '#0f172a', color: '#fff' }}>PLATFORM_ANALYST</option>
          </select>

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
            <option value="" style={{ background: '#0f172a', color: '#fff' }}>Select primary platform</option>
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
            placeholder="e.g. Technology Review, Gaming Lifestyle"
            required
            style={inputStyle}
          />

          {/* Strict test contract button with StarBorder */}
          <StarBorder
            as="button"
            type="submit"
            disabled={loading}
            color="#ec4899"
            speed="4s"
            thickness={2}
            backgroundColor="linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)"
            borderColor="rgba(236, 72, 153, 0.5)"
            style={{ width: '100%', marginTop: '0.5rem', borderRadius: '10px' }}
          >
            <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
              {loading ? 'Processing...' : 'Register Credentials (6 Inputs)'}
            </span>
          </StarBorder>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>
          <Link to="/login" style={{ color: '#ec4899', fontWeight: 600, textDecoration: 'none' }}>
            Existing Account? Authorize Session
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;