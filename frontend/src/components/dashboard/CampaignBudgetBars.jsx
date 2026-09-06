import React from 'react';
import SpotlightCard from '../reactbits/SpotlightCard';
import { Target, CheckCircle2, PauseCircle, PlayCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CAMPAIGN_DATA = [
  {
    id: 1,
    name: 'Summer Release 2026',
    platform: 'INSTAGRAM',
    platformColor: '#e1306c',
    budget: 15000,
    spent: 13200,
    deliverables: '8/8 Delivered',
    reach: '540K',
    status: 'ACTIVE'
  },
  {
    id: 2,
    name: 'Fall Tech Launch',
    platform: 'YOUTUBE',
    platformColor: '#ef4444',
    budget: 28000,
    spent: 18400,
    deliverables: '4/6 Delivered',
    reach: '680K',
    status: 'PAUSED'
  },
  {
    id: 3,
    name: 'Cyber Week Viral Challenge',
    platform: 'TIKTOK',
    platformColor: '#06b6d4',
    budget: 12000,
    spent: 11950,
    deliverables: '12/12 Delivered',
    reach: '410K',
    status: 'ACTIVE'
  },
  {
    id: 4,
    name: 'Eco-Living Brand Wave',
    platform: 'INSTAGRAM',
    platformColor: '#10b981',
    budget: 8500,
    spent: 8500,
    deliverables: '5/5 Delivered',
    reach: '225K',
    status: 'COMPLETED'
  }
];

export const CampaignBudgetBars = () => {
  return (
    <SpotlightCard className="campaign-budget-card" style={{ padding: '1.5rem', width: '100%' }}>
      <div className="campaign-bars-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <Target size={18} color="#06b6d4" />
            <h3 className="campaign-bars-title">Campaign Budget & Spend Utilization</h3>
          </div>
          <p className="campaign-bars-subtitle">
            Capital deployment efficiency against target campaign deliverables
          </p>
        </div>

        <Link to="/campaigns" className="view-all-campaigns-link">
          <span>Manage Campaigns</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="campaign-bars-list">
        {CAMPAIGN_DATA.map((camp) => {
          const percentSpent = Math.min(100, Math.round((camp.spent / camp.budget) * 100));

          return (
            <div key={camp.id} className="campaign-bar-item">
              <div className="campaign-bar-info">
                <div className="campaign-info-left">
                  <span className="campaign-name">{camp.name}</span>
                  <span
                    className="campaign-platform-badge"
                    style={{
                      color: camp.platformColor,
                      backgroundColor: `${camp.platformColor}18`,
                      border: `1px solid ${camp.platformColor}33`
                    }}
                  >
                    {camp.platform}
                  </span>
                </div>

                <div className="campaign-info-right">
                  <span className="campaign-spent-text">
                    ${camp.spent.toLocaleString()} / <span className="budget-max">${camp.budget.toLocaleString()}</span>
                  </span>
                  <span
                    className={`campaign-status-pill ${
                      camp.status === 'ACTIVE'
                        ? 'active'
                        : camp.status === 'PAUSED'
                        ? 'paused'
                        : 'completed'
                    }`}
                  >
                    {camp.status === 'ACTIVE' && <PlayCircle size={10} />}
                    {camp.status === 'PAUSED' && <PauseCircle size={10} />}
                    {camp.status === 'COMPLETED' && <CheckCircle2 size={10} />}
                    {camp.status}
                  </span>
                </div>
              </div>

              {/* Bar track */}
              <div className="campaign-track">
                <div
                  className="campaign-fill"
                  style={{
                    width: `${percentSpent}%`,
                    backgroundColor:
                      percentSpent >= 95
                        ? '#10b981'
                        : percentSpent >= 70
                        ? '#3b82f6'
                        : '#8b5cf6'
                  }}
                />
              </div>

              <div className="campaign-sub-meta">
                <span className="campaign-meta-label">
                  Reach: <strong>{camp.reach}</strong>
                </span>
                <span className="campaign-meta-label">
                  Deliverables: <strong>{camp.deliverables}</strong>
                </span>
                <span className="campaign-utilization">
                  {percentSpent}% budget deployed
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </SpotlightCard>
  );
};

export default CampaignBudgetBars;
