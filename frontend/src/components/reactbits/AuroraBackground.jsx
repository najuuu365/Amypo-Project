import React from 'react';
import Aurora from './Aurora';
import './AuroraBackground.css';

export const AuroraBackground = ({ children, className = '' }) => {
  return (
    <div className={`enterprise-background ${className}`}>
      {/* Fixed full-screen WebGL Aurora layer covering the entire viewport throughout the whole app */}
      <div className="enterprise-aurora-layer">
        <Aurora
          colorStops={['#5227FF', '#B497CF', '#ec4899']}
          blend={0.28}
          amplitude={0.95}
          speed={1.1}
        />
        <div className="enterprise-vignette-overlay" />
      </div>
      <div className="enterprise-grid-pattern" />
      <div className="enterprise-content-relative">{children}</div>
    </div>
  );
};

export default AuroraBackground;
