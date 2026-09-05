import React from 'react';
import SpotlightCard from '../reactbits/SpotlightCard';
import { Globe, BarChart3 } from 'lucide-react';

export const DomainChart = () => {
  const platforms = [
    { name: 'Instagram', percentage: 48, count: '1.2M interactions', color: '#e1306c' },
    { name: 'YouTube', percentage: 34, count: '840K interactions', color: '#ef4444' },
    { name: 'TikTok', percentage: 18, count: '450K interactions', color: '#06b6d4' }
  ];

  return (
    <SpotlightCard style={{ height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#f8fafc', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BarChart3 size={18} color="#3b82f6" />
            Platform Channel Share
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>
            Audited cross-platform volume
          </p>
        </div>
        <span
          style={{
            fontSize: '0.75rem',
            padding: '0.2rem 0.55rem',
            borderRadius: '4px',
            backgroundColor: '#1e293b',
            color: '#94a3b8',
            border: '1px solid #334155',
            fontWeight: 500
          }}
        >
          Telemetry
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {platforms.map((p) => (
          <div key={p.name}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.85rem' }}>
              <span style={{ color: '#f1f5f9', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Globe size={14} color="#64748b" />
                {p.name}
              </span>
              <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                {p.count} <strong style={{ color: '#f8fafc', marginLeft: '0.4rem' }}>{p.percentage}%</strong>
              </span>
            </div>
            <div
              style={{
                width: '100%',
                height: '6px',
                backgroundColor: '#1e293b',
                borderRadius: '3px',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  width: `${p.percentage}%`,
                  height: '100%',
                  backgroundColor: p.color,
                  borderRadius: '3px',
                  transition: 'width 0.8s ease'
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: '1.5rem',
          padding: '0.85rem',
          borderRadius: '8px',
          backgroundColor: '#0f172a',
          border: '1px solid #1e293b',
          display: 'flex',
          justifyContent: 'space-around',
          textAlign: 'center'
        }}
      >
        <div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Avg Engagement</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#38bdf8', marginTop: '0.15rem' }}>5.82%</div>
        </div>
        <div style={{ borderLeft: '1px solid #1e293b' }} />
        <div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Verified Creators</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#10b981', marginTop: '0.15rem' }}>1,240</div>
        </div>
        <div style={{ borderLeft: '1px solid #1e293b' }} />
        <div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Campaign Multiplier</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginTop: '0.15rem' }}>3.4x</div>
        </div>
      </div>
    </SpotlightCard>
  );
};

export default DomainChart;
