import React from 'react';
import SpotlightCard from '../reactbits/SpotlightCard';
import AnimatedCounter from '../reactbits/AnimatedCounter';
import { Activity, Users, TrendingUp, ShieldCheck } from 'lucide-react';

export const StatCards = () => {
  const stats = [
    {
      id: 1,
      title: 'Total Active Campaigns',
      value: 4,
      prefix: '',
      suffix: '',
      change: '+33.3%',
      isPositive: true,
      Icon: Activity,
      iconColor: '#3b82f6',
      iconBg: 'rgba(59, 130, 246, 0.1)'
    },
    {
      id: 2,
      title: 'System Deployable Budget',
      value: 63500,
      prefix: '$ ',
      suffix: '',
      change: '+$15,000',
      isPositive: true,
      Icon: TrendingUp,
      iconColor: '#8b5cf6',
      iconBg: 'rgba(139, 92, 246, 0.1)'
    },
    {
      id: 3,
      title: 'Indexed Target Creator Reach',
      value: 1655000,
      prefix: '',
      suffix: ' Reach',
      change: '+24.5%',
      isPositive: true,
      Icon: Users,
      iconColor: '#06b6d4',
      iconBg: 'rgba(6, 182, 212, 0.1)'
    },
    {
      id: 4,
      title: 'Registered Profiles',
      value: 4,
      prefix: '',
      suffix: '',
      change: '+100%',
      isPositive: true,
      Icon: ShieldCheck,
      iconColor: '#10b981',
      iconBg: 'rgba(16, 185, 129, 0.1)'
    }
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1rem',
        marginBottom: '1.75rem'
      }}
    >
      {stats.map((stat) => {
        const IconComponent = stat.Icon;
        return (
          <SpotlightCard
            key={stat.id}
            style={{ padding: '1.25rem', cursor: 'default' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {stat.title}
                </span>
                <div
                  style={{
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: '#f8fafc',
                    marginTop: '0.35rem',
                    fontVariantNumeric: 'tabular-nums'
                  }}
                >
                  {stat.prefix || ''}
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals || 0}
                    duration={1000}
                  />
                </div>
              </div>

              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: stat.iconBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: stat.iconColor,
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}
              >
                <IconComponent size={18} />
              </div>
            </div>

            <div
              style={{
                marginTop: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.8rem'
              }}
            >
              <span
                style={{
                  color: '#10b981',
                  fontWeight: 600,
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  padding: '0.15rem 0.45rem',
                  borderRadius: '4px'
                }}
              >
                {stat.change}
              </span>
              <span style={{ color: '#64748b' }}>vs last cycle</span>
            </div>
          </SpotlightCard>
        );
      })}
    </div>
  );
};

export default StatCards;
