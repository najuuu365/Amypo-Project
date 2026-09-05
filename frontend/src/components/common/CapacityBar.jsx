import React from 'react';

export const CapacityBar = ({ value = 0, max = 100, label = 'Capacity', unit = '%' }) => {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  const getColor = () => {
    if (percentage > 85) return '#ef4444';
    if (percentage > 60) return '#f59e0b';
    return '#2563eb';
  };

  return (
    <div className="capacity-bar-container" style={{ width: '100%', margin: '0.5rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.85rem', color: '#94a3b8' }}>
        <span>{label}</span>
        <span style={{ fontWeight: 600, color: '#f8fafc' }}>
          {value}/{max} {unit && `(${percentage}%)`}
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
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: getColor(),
            borderRadius: '3px',
            transition: 'width 0.6s ease'
          }}
        />
      </div>
    </div>
  );
};

export default CapacityBar;
