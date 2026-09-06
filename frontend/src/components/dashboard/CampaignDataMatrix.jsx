import React from 'react';
import SpotlightCard from '../reactbits/SpotlightCard';
import { Table, ExternalLink, ArrowRight, CheckCircle2, PauseCircle, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const MATRIX_DATA = [
  {
    id: 1,
    title: 'Summer Release 2026',
    platform: 'INSTAGRAM',
    category: 'Fashion & Lifestyle',
    budget: '$15,000',
    spent: '$13,200',
    reach: '540K',
    engagementRate: '6.4%',
    status: 'ACTIVE'
  },
  {
    id: 2,
    title: 'Fall Tech Launch',
    platform: 'YOUTUBE',
    category: 'Tech Enthusiasts',
    budget: '$28,000',
    spent: '$18,400',
    reach: '680K',
    engagementRate: '5.8%',
    status: 'PAUSED'
  },
  {
    id: 3,
    title: 'Cyber Week Viral Challenge',
    platform: 'TIKTOK',
    category: 'Gen Z Gaming',
    budget: '$12,000',
    spent: '$11,950',
    reach: '410K',
    engagementRate: '7.8%',
    status: 'ACTIVE'
  },
  {
    id: 4,
    title: 'Eco-Living Brand Wave',
    platform: 'INSTAGRAM',
    category: 'Sustainability',
    budget: '$8,500',
    spent: '$8,500',
    reach: '225K',
    engagementRate: '5.2%',
    status: 'COMPLETED'
  }
];

export const CampaignDataMatrix = () => {
  return (
    <SpotlightCard className="data-matrix-card" style={{ padding: '1.5rem', width: '100%' }}>
      <div className="data-matrix-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <Table size={18} color="#10b981" />
            <h3 className="data-matrix-title">Campaign Performance & Metric Stream</h3>
          </div>
          <p className="data-matrix-subtitle">
            Consolidated live telemetry data across active sponsorship contracts
          </p>
        </div>

        <Link to="/campaigns" className="view-all-campaigns-link">
          <span>Explore All Campaigns</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="data-matrix-table-wrap">
        <table className="analytics-data-table">
          <thead>
            <tr>
              <th>Campaign Name</th>
              <th>Platform</th>
              <th>Target Audience</th>
              <th>Budget</th>
              <th>Spent</th>
              <th>Audited Reach</th>
              <th>Avg Engagement</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {MATRIX_DATA.map((row) => (
              <tr key={row.id}>
                <td className="table-campaign-name">{row.title}</td>
                <td>
                  <span className={`platform-pill-badge ${row.platform.toLowerCase()}`}>
                    {row.platform}
                  </span>
                </td>
                <td className="table-category">{row.category}</td>
                <td className="table-numeric">{row.budget}</td>
                <td className="table-numeric" style={{ color: '#cbd5e1' }}>{row.spent}</td>
                <td className="table-numeric highlighted">{row.reach}</td>
                <td className="table-numeric" style={{ color: '#10b981', fontWeight: 600 }}>
                  {row.engagementRate}
                </td>
                <td>
                  <span
                    className={`status-chip ${
                      row.status === 'ACTIVE'
                        ? 'active'
                        : row.status === 'PAUSED'
                        ? 'paused'
                        : 'completed'
                    }`}
                  >
                    {row.status === 'ACTIVE' && <PlayCircle size={11} />}
                    {row.status === 'PAUSED' && <PauseCircle size={11} />}
                    {row.status === 'COMPLETED' && <CheckCircle2 size={11} />}
                    {row.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <Link
                    to="/campaigns"
                    className="table-action-btn"
                    title={`View ${row.title}`}
                  >
                    <ExternalLink size={13} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SpotlightCard>
  );
};

export default CampaignDataMatrix;
