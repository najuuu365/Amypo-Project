import React from 'react';
import SpotlightCard from '../reactbits/SpotlightCard';
import { CheckCircle2, Megaphone, UserPlus, AlertTriangle, Clock } from 'lucide-react';

export const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      title: 'Engagement Verified',
      description: '@marcus_fit verified for Fall Tech Launch',
      time: '12m ago',
      badge: 'VERIFIED',
      badgeColor: '#10b981',
      badgeBg: 'rgba(16, 185, 129, 0.1)',
      Icon: CheckCircle2,
      iconColor: '#10b981'
    },
    {
      id: 2,
      title: 'Campaign Provisioned',
      description: 'Summer Release 2026 reached 50K impressions',
      time: '45m ago',
      badge: 'ACTIVE',
      badgeColor: '#3b82f6',
      badgeBg: 'rgba(59, 130, 246, 0.1)',
      Icon: Megaphone,
      iconColor: '#3b82f6'
    },
    {
      id: 3,
      title: 'Creator Registered',
      description: '@noble_tech assigned to YouTube channel',
      time: '2h ago',
      badge: 'NEW',
      badgeColor: '#8b5cf6',
      badgeBg: 'rgba(139, 92, 246, 0.1)',
      Icon: UserPlus,
      iconColor: '#8b5cf6'
    },
    {
      id: 4,
      title: 'Metric Audit Logged',
      description: 'Analyst flagged non-residential IP burst',
      time: '4h ago',
      badge: 'AUDIT',
      badgeColor: '#f59e0b',
      badgeBg: 'rgba(245, 158, 11, 0.1)',
      Icon: AlertTriangle,
      iconColor: '#f59e0b'
    }
  ];

  return (
    <SpotlightCard style={{ height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#f8fafc', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={18} color="#3b82f6" />
            Recent Activity Log
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>
            System events and audit records
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {activities.map((act) => {
          const IconComponent = act.Icon;
          return (
            <div
              key={act.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 0.9rem',
                borderRadius: '8px',
                backgroundColor: '#0f172a',
                border: '1px solid #1e293b'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '6px',
                    backgroundColor: act.badgeBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: act.iconColor
                  }}
                >
                  <IconComponent size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}>
                    {act.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                    {act.description}
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    padding: '0.15rem 0.45rem',
                    borderRadius: '4px',
                    backgroundColor: act.badgeBg,
                    color: act.badgeColor,
                    border: `1px solid ${act.badgeColor}33`
                  }}
                >
                  {act.badge}
                </span>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>
                  {act.time}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SpotlightCard>
  );
};

export default RecentActivity;
