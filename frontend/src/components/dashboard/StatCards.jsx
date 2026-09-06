import React from 'react';
import SpotlightCard from '../reactbits/SpotlightCard';
import AnimatedCounter from '../reactbits/AnimatedCounter';
import { Megaphone, Users, TrendingUp, ShieldCheck, ArrowUpRight } from 'lucide-react';

const stats = [
  {
    id: 1,
    title: 'Active Campaigns',
    value: 4,
    prefix: '',
    suffix: '',
    change: '+33.3%',
    isPositive: true,
    Icon: Megaphone,
    iconColor: '#3b82f6',
    iconBg: 'rgba(59, 130, 246, 0.12)',
    sparkline: [2, 2, 3, 3, 3, 4, 4],
    sparkColor: '#3b82f6'
  },
  {
    id: 2,
    title: 'Deployable Budget',
    value: 63500,
    prefix: '$',
    suffix: '',
    change: '+$15,000',
    isPositive: true,
    Icon: TrendingUp,
    iconColor: '#a855f7',
    iconBg: 'rgba(168, 85, 247, 0.12)',
    sparkline: [42, 45, 50, 48, 54, 59, 63.5],
    sparkColor: '#a855f7'
  },
  {
    id: 3,
    title: 'Indexed Creator Reach',
    value: 1655000,
    prefix: '',
    suffix: '',
    change: '+24.5%',
    isPositive: true,
    Icon: Users,
    iconColor: '#06b6d4',
    iconBg: 'rgba(6, 182, 212, 0.12)',
    sparkline: [1.1, 1.25, 1.32, 1.4, 1.48, 1.55, 1.65],
    sparkColor: '#06b6d4'
  },
  {
    id: 4,
    title: 'Audited Authentic Traffic',
    value: 99.8,
    prefix: '',
    suffix: '%',
    decimals: 1,
    change: '+0.4%',
    isPositive: true,
    Icon: ShieldCheck,
    iconColor: '#10b981',
    iconBg: 'rgba(16, 185, 129, 0.12)',
    sparkline: [98.6, 99.0, 99.2, 99.4, 99.5, 99.7, 99.8],
    sparkColor: '#10b981'
  }
];

const renderSparkline = (points, color) => {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const width = 80;
  const height = 28;
  const coords = points.map((val, idx) => {
    const x = (idx / (points.length - 1)) * width;
    const y = height - ((val - min) / (max - min || 1)) * (height - 6) - 3;
    return `${x},${y}`;
  });

  const path = `M ${coords.join(' L ')}`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`spark-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <path
        d={`M ${coords.join(' L ')} L ${width},${height} L 0,${height} Z`}
        fill={`url(#spark-${color.replace('#', '')})`}
      />
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={coords[coords.length - 1].split(',')[0]}
        cy={coords[coords.length - 1].split(',')[1]}
        r="3"
        fill={color}
      />
    </svg>
  );
};

export const StatCards = () => {
  return (
    <div className="stat-cards-analytics-grid">
      {stats.map((stat) => {
        const IconComponent = stat.Icon;
        return (
          <SpotlightCard
            key={stat.id}
            className="stat-card-item"
            style={{ padding: '1.25rem', cursor: 'default' }}
          >
            <div className="stat-card-top-row">
              <span className="stat-card-label">{stat.title}</span>
              <div
                className="stat-card-icon-box"
                style={{
                  backgroundColor: stat.iconBg,
                  color: stat.iconColor
                }}
              >
                <IconComponent size={17} />
              </div>
            </div>

            <div className="stat-card-val-row">
              <div className="stat-card-value">
                {stat.prefix || ''}
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals || 0}
                  duration={1000}
                />
              </div>

              {/* Sparkline Visual */}
              <div className="stat-card-sparkline">
                {renderSparkline(stat.sparkline, stat.sparkColor)}
              </div>
            </div>

            <div className="stat-card-footer">
              <div className="stat-card-badge">
                <ArrowUpRight size={12} />
                <span>{stat.change}</span>
              </div>
              <span className="stat-card-period">vs last 30 days</span>
            </div>
          </SpotlightCard>
        );
      })}
    </div>
  );
};

export default StatCards;
