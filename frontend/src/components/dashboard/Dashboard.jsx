import React from 'react';
import { Link } from 'react-router-dom';
import StatCards from './StatCards';
import DomainChart from './DomainChart';
import RecentActivity from './RecentActivity';
import SpotlightCard from '../reactbits/SpotlightCard';
import { Megaphone, Users, ArrowRight, Layers, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const Dashboard = () => {
  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          {/* Strict test contract header */}
          <h1
            style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: '#f8fafc',
              margin: '0 0 0.35rem 0',
              letterSpacing: '-0.02em',
              lineHeight: 1.2
            }}
          >
            SocialSift Dashboard
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: 0 }}>
            Enterprise campaign provisioning, creator management, and verifiable engagement telemetry.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link
            to="/campaigns"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.65rem 1.15rem',
              borderRadius: '8px',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              border: '1px solid #3b82f6',
              transition: 'background-color 0.15s ease'
            }}
          >
            <Megaphone size={16} />
            <span>Manage Campaigns</span>
          </Link>
          <Link
            to="/profiles"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.65rem 1.15rem',
              borderRadius: '8px',
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              color: '#f8fafc',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              transition: 'all 0.15s ease'
            }}
          >
            <Users size={16} />
            <span>Creator Directory</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Ribbon */}
      <StatCards />

      {/* Grid: Charts & Activity */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}
      >
        <DomainChart />
        <RecentActivity />
      </div>

      {/* Quick Action Panels */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem'
        }}
      >
        <SpotlightCard style={{ padding: '1.5rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              color: '#3b82f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}
          >
            <Layers size={20} />
          </div>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#f8fafc', margin: '0 0 0.35rem 0' }}>
            Campaign Provisioning
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '0 0 1.25rem 0' }}>
            Configure and launch multi-channel marketing campaigns with budget constraints.
          </p>
          <Link
            to="/campaigns"
            style={{
              color: '#3b82f6',
              fontWeight: 600,
              fontSize: '0.85rem',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <span>Go to Campaigns</span>
            <ArrowRight size={14} />
          </Link>
        </SpotlightCard>

        <SpotlightCard style={{ padding: '1.5rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}
          >
            <CheckCircle2 size={20} />
          </div>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#f8fafc', margin: '0 0 0.35rem 0' }}>
            Engagement Verification
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '0 0 1.25rem 0' }}>
            Review pending creator deliverables and sign off on verified contract terms.
          </p>
          <Link
            to="/engagements"
            style={{
              color: '#10b981',
              fontWeight: 600,
              fontSize: '0.85rem',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <span>Review Engagements</span>
            <ArrowRight size={14} />
          </Link>
        </SpotlightCard>

        <SpotlightCard style={{ padding: '1.5rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              color: '#f59e0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}
          >
            <ShieldCheck size={20} />
          </div>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#f8fafc', margin: '0 0 0.35rem 0' }}>
            Security & Telemetry Audit
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '0 0 1.25rem 0' }}>
            Automated anomaly inspection and suspicious interaction metric logging.
          </p>
          <Link
            to="/metrics"
            style={{
              color: '#f59e0b',
              fontWeight: 600,
              fontSize: '0.85rem',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <span>View Telemetry</span>
            <ArrowRight size={14} />
          </Link>
        </SpotlightCard>
      </div>
    </div>
  );
};

export default Dashboard;
