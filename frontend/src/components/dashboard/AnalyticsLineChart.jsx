import React, { useState, useMemo } from 'react';
import SpotlightCard from '../reactbits/SpotlightCard';
import { TrendingUp } from 'lucide-react';

const TIMEFRAME_DATA = {
  '7D': {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    reach: [34000, 48000, 42000, 68000, 89000, 115000, 142000],
    engagements: [2400, 3900, 3100, 5600, 7200, 9400, 11800],
    conversions: [3.8, 4.2, 4.0, 4.9, 5.3, 5.8, 6.2],
    growth: '+31.8%',
    peak: '142.0K',
    avg: '76.8K'
  },
  '30D': {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    reach: [280000, 390000, 440000, 545000],
    engagements: [21000, 29500, 36200, 44800],
    conversions: [4.1, 4.6, 5.2, 5.8],
    growth: '+24.5%',
    peak: '545.0K',
    avg: '413.7K'
  },
  '90D': {
    labels: ['Month 1', 'Month 2', 'Month 3'],
    reach: [780000, 1120000, 1655000],
    engagements: [62000, 91000, 138000],
    conversions: [4.2, 5.0, 5.8],
    growth: '+42.1%',
    peak: '1.65M',
    avg: '1.18M'
  },
  '1Y': {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    reach: [1200000, 2400000, 3900000, 5200000],
    engagements: [95000, 192000, 310000, 425000],
    conversions: [3.9, 4.7, 5.4, 6.1],
    growth: '+78.6%',
    peak: '5.20M',
    avg: '3.17M'
  }
};

export const AnalyticsLineChart = () => {
  const [timeframe, setTimeframe] = useState('30D');
  const [activeMetric, setActiveMetric] = useState('reach'); // 'reach' | 'engagements' | 'conversions'
  const [hoverIndex, setHoverIndex] = useState(null);

  const currentDataset = TIMEFRAME_DATA[timeframe];
  const series = currentDataset[activeMetric];
  const labels = currentDataset.labels;

  const width = 640;
  const height = 240;
  const padding = { top: 25, right: 25, bottom: 35, left: 45 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const minVal = useMemo(() => Math.min(...series) * 0.85, [series]);
  const maxVal = useMemo(() => Math.max(...series) * 1.08, [series]);

  // Generate SVG coordinates
  const points = useMemo(() => {
    return series.map((val, idx) => {
      const x = padding.left + (idx / (series.length - 1)) * chartWidth;
      const y = padding.top + chartHeight - ((val - minVal) / (maxVal - minVal || 1)) * chartHeight;
      return { x, y, val, label: labels[idx] };
    });
  }, [series, minVal, maxVal, labels, chartWidth, chartHeight, padding.left, padding.top]);

  // Generate smooth cubic bezier SVG path
  const linePath = useMemo(() => {
    if (points.length === 0) return '';
    if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cx1 = p0.x + (p1.x - p0.x) / 2;
      const cy1 = p0.y;
      const cx2 = p0.x + (p1.x - p0.x) / 2;
      const cy2 = p1.y;
      path += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p1.x} ${p1.y}`;
    }
    return path;
  }, [points]);

  const areaPath = useMemo(() => {
    if (points.length === 0) return '';
    const first = points[0];
    const last = points[points.length - 1];
    const bottomY = padding.top + chartHeight;
    return `${linePath} L ${last.x} ${bottomY} L ${first.x} ${bottomY} Z`;
  }, [linePath, points, padding.top, chartHeight]);

  const formatValue = (val) => {
    if (activeMetric === 'conversions') return `${val.toFixed(1)}%`;
    if (val >= 1000000) return `${(val / 1000000).toFixed(2)}M`;
    if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
    return val.toLocaleString();
  };

  const metricColors = {
    reach: { stroke: '#a855f7', fillStart: 'rgba(168, 85, 247, 0.45)', fillEnd: 'rgba(168, 85, 247, 0.0)' },
    engagements: { stroke: '#06b6d4', fillStart: 'rgba(6, 182, 212, 0.45)', fillEnd: 'rgba(6, 182, 212, 0.0)' },
    conversions: { stroke: '#10b981', fillStart: 'rgba(16, 185, 129, 0.45)', fillEnd: 'rgba(16, 185, 129, 0.0)' }
  };

  const currentColor = metricColors[activeMetric];

  return (
    <SpotlightCard className="analytics-chart-card" style={{ padding: '1.5rem', width: '100%' }}>
      {/* Chart Header with Controls */}
      <div className="analytics-chart-header">
        <div className="analytics-chart-title-box">
          <div className="analytics-chart-title-row">
            <h3 className="analytics-chart-title">Reach & Engagement Trajectory</h3>
            <span className="analytics-growth-badge">
              <TrendingUp size={13} />
              {currentDataset.growth}
            </span>
          </div>
          <p className="analytics-chart-subtitle">
            Audited cross-platform performance curve over {timeframe} window
          </p>
        </div>

        {/* Metric Switcher & Timeframe Selector */}
        <div className="analytics-chart-controls">
          <div className="metric-pill-group">
            <button
              className={`metric-pill-btn ${activeMetric === 'reach' ? 'active reach' : ''}`}
              onClick={() => setActiveMetric('reach')}
            >
              Reach
            </button>
            <button
              className={`metric-pill-btn ${activeMetric === 'engagements' ? 'active engagements' : ''}`}
              onClick={() => setActiveMetric('engagements')}
            >
              Engagements
            </button>
            <button
              className={`metric-pill-btn ${activeMetric === 'conversions' ? 'active conversions' : ''}`}
              onClick={() => setActiveMetric('conversions')}
            >
              ROI Rate
            </button>
          </div>

          <div className="timeframe-pill-group">
            {['7D', '30D', '90D', '1Y'].map((tf) => (
              <button
                key={tf}
                className={`timeframe-pill-btn ${timeframe === tf ? 'active' : ''}`}
                onClick={() => setTimeframe(tf)}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Highlight Strip */}
      <div className="analytics-kpi-strip">
        <div className="kpi-mini-item">
          <span className="kpi-mini-label">Peak Metric</span>
          <span className="kpi-mini-val" style={{ color: currentColor.stroke }}>
            {currentDataset.peak}
          </span>
        </div>
        <div className="kpi-mini-divider" />
        <div className="kpi-mini-item">
          <span className="kpi-mini-label">Rolling Average</span>
          <span className="kpi-mini-val">{currentDataset.avg}</span>
        </div>
        <div className="kpi-mini-divider" />
        <div className="kpi-mini-item">
          <span className="kpi-mini-label">Period Trend</span>
          <span className="kpi-mini-val positive">{currentDataset.growth}</span>
        </div>
        <div className="kpi-mini-divider" />
        <div className="kpi-mini-item">
          <span className="kpi-mini-label">Telemetry Status</span>
          <span className="kpi-mini-val" style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span className="pulse-indicator" /> Live
          </span>
        </div>
      </div>

      {/* Main SVG Line Graph */}
      <div className="analytics-svg-wrapper">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="analytics-svg"
          preserveAspectRatio="none"
          onMouseLeave={() => setHoverIndex(null)}
        >
          <defs>
            <linearGradient id={`gradient-${activeMetric}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={currentColor.stroke} stopOpacity="0.4" />
              <stop offset="100%" stopColor={currentColor.stroke} stopOpacity="0.0" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Horizontal Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
            const y = padding.top + chartHeight * (1 - pct);
            const labelVal = minVal + pct * (maxVal - minVal);
            return (
              <g key={i}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="rgba(255, 255, 255, 0.06)"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={padding.left - 8}
                  y={y + 3}
                  textAnchor="end"
                  fill="#64748b"
                  fontSize="10"
                  fontFamily="sans-serif"
                >
                  {formatValue(labelVal)}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <path d={areaPath} fill={`url(#gradient-${activeMetric})`} />

          {/* Main Line */}
          <path
            d={linePath}
            fill="none"
            stroke={currentColor.stroke}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />

          {/* X Axis Labels & Interactive Hover Columns */}
          {points.map((p, idx) => (
            <g key={idx}>
              {/* X Axis Label */}
              <text
                x={p.x}
                y={height - 10}
                textAnchor="middle"
                fill={hoverIndex === idx ? '#f8fafc' : '#94a3b8'}
                fontSize="11"
                fontWeight={hoverIndex === idx ? '700' : '500'}
                fontFamily="sans-serif"
              >
                {p.label}
              </text>

              {/* Hover vertical bar target */}
              <rect
                x={p.x - chartWidth / (points.length * 2)}
                y={padding.top}
                width={chartWidth / points.length}
                height={chartHeight}
                fill="transparent"
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHoverIndex(idx)}
              />

              {/* Active Hover Guideline & Point */}
              {hoverIndex === idx && (
                <g>
                  <line
                    x1={p.x}
                    y1={padding.top}
                    x2={p.x}
                    y2={padding.top + chartHeight}
                    stroke="rgba(255, 255, 255, 0.25)"
                    strokeDasharray="3 3"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="6"
                    fill="#0f172a"
                    stroke={currentColor.stroke}
                    strokeWidth="3.5"
                  />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="10"
                    fill={currentColor.stroke}
                    opacity="0.25"
                  />
                </g>
              )}
            </g>
          ))}
        </svg>

        {/* Floating Tooltip */}
        {hoverIndex !== null && points[hoverIndex] && (
          <div
            className="analytics-tooltip"
            style={{
              left: `${(points[hoverIndex].x / width) * 100}%`,
              top: `${(points[hoverIndex].y / height) * 100}%`
            }}
          >
            <div className="tooltip-header">{points[hoverIndex].label}</div>
            <div className="tooltip-value" style={{ color: currentColor.stroke }}>
              {formatValue(points[hoverIndex].val)}
            </div>
            <div className="tooltip-sub">
              {activeMetric === 'reach' ? 'Unique Impressions' : activeMetric === 'engagements' ? 'Total Interactions' : 'ROI Score'}
            </div>
          </div>
        )}
      </div>
    </SpotlightCard>
  );
};

export default AnalyticsLineChart;
