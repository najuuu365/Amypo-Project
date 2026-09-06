import React, { useState } from 'react';
import SpotlightCard from '../reactbits/SpotlightCard';
import { BarChart3, Layers, DollarSign, Users } from 'lucide-react';

const PLATFORM_METRICS = [
  {
    name: 'Instagram',
    color: '#e1306c',
    gradient: 'linear-gradient(180deg, #f43f5e 0%, #e1306c 100%)',
    budget: 28500,
    reach: 745000,
    engagementRate: 6.2,
    sharePercent: 45
  },
  {
    name: 'YouTube',
    color: '#ef4444',
    gradient: 'linear-gradient(180deg, #f97316 0%, #ef4444 100%)',
    budget: 22200,
    reach: 520000,
    engagementRate: 5.8,
    sharePercent: 35
  },
  {
    name: 'TikTok',
    color: '#06b6d4',
    gradient: 'linear-gradient(180deg, #38bdf8 0%, #06b6d4 100%)',
    budget: 12800,
    reach: 390000,
    engagementRate: 7.4,
    sharePercent: 20
  },
  {
    name: 'Twitch / Live',
    color: '#a855f7',
    gradient: 'linear-gradient(180deg, #c084fc 0%, #a855f7 100%)',
    budget: 8500,
    reach: 180000,
    engagementRate: 8.1,
    sharePercent: 12
  }
];

export const PlatformBarChart = () => {
  const [viewMode, setViewMode] = useState('budget'); // 'budget' | 'reach' | 'rate'

  const maxVal = Math.max(
    ...PLATFORM_METRICS.map((p) =>
      viewMode === 'budget' ? p.budget : viewMode === 'reach' ? p.reach : p.engagementRate
    )
  );

  return (
    <SpotlightCard className="platform-bar-card" style={{ padding: '1.5rem', width: '100%', height: '100%' }}>
      <div className="platform-bar-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <BarChart3 size={18} color="#8b5cf6" />
            <h3 className="platform-bar-title">Platform Channel Distribution</h3>
          </div>
          <p className="platform-bar-subtitle">
            Cross-channel volume comparison & allocation
          </p>
        </div>

        {/* View Toggle */}
        <div className="platform-view-pills">
          <button
            className={`platform-view-btn ${viewMode === 'budget' ? 'active' : ''}`}
            onClick={() => setViewMode('budget')}
          >
            <DollarSign size={12} /> Budget
          </button>
          <button
            className={`platform-view-btn ${viewMode === 'reach' ? 'active' : ''}`}
            onClick={() => setViewMode('reach')}
          >
            <Users size={12} /> Reach
          </button>
          <button
            className={`platform-view-btn ${viewMode === 'rate' ? 'active' : ''}`}
            onClick={() => setViewMode('rate')}
          >
            <Layers size={12} /> ROI %
          </button>
        </div>
      </div>

      {/* Main Vertical/Horizontal Bars Container */}
      <div className="platform-bars-container">
        {PLATFORM_METRICS.map((item) => {
          const val =
            viewMode === 'budget' ? item.budget : viewMode === 'reach' ? item.reach : item.engagementRate;
          const percentage = Math.round((val / maxVal) * 100);

          const displayValue =
            viewMode === 'budget'
              ? `$${(item.budget / 1000).toFixed(1)}k`
              : viewMode === 'reach'
              ? `${(item.reach / 1000).toFixed(0)}k reach`
              : `${item.engagementRate}% rate`;

          return (
            <div key={item.name} className="platform-bar-row">
              <div className="platform-bar-meta">
                <div className="platform-name-tag">
                  <span
                    className="platform-dot"
                    style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}88` }}
                  />
                  <span className="platform-label">{item.name}</span>
                </div>
                <div className="platform-stats-tag">
                  <span className="platform-val-text">{displayValue}</span>
                  <span className="platform-share-badge">{item.sharePercent}% vol</span>
                </div>
              </div>

              {/* Progress Bar Track */}
              <div className="platform-bar-track">
                <div
                  className="platform-bar-fill"
                  style={{
                    width: `${percentage}%`,
                    background: item.gradient,
                    boxShadow: `0 0 12px ${item.color}40`
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Metrics Row */}
      <div className="platform-bar-footer">
        <div className="platform-footer-stat">
          <span className="platform-footer-label">Total Allocated</span>
          <span className="platform-footer-val">$72,000</span>
        </div>
        <div className="platform-footer-stat">
          <span className="platform-footer-label">Blended Reach</span>
          <span className="platform-footer-val">1.83M Users</span>
        </div>
        <div className="platform-footer-stat">
          <span className="platform-footer-label">Avg Interaction Rate</span>
          <span className="platform-footer-val" style={{ color: '#10b981' }}>6.87%</span>
        </div>
      </div>
    </SpotlightCard>
  );
};

export default PlatformBarChart;
