import React from 'react';
import './AuroraBackground.css';

export const AuroraBackground = ({ children, className = '' }) => {
  return (
    <div className={`enterprise-background ${className}`}>
      <div className="enterprise-grid-pattern" />
      <div className="enterprise-content-relative">{children}</div>
    </div>
  );
};

export default AuroraBackground;
