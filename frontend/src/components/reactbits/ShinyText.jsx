import React from 'react';
import './ShinyText.css';

export const ShinyText = ({
  text,
  disabled = false,
  speed = 4,
  className = '',
  shimmerColor = '#ffffff'
}) => {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`shiny-text ${disabled ? 'disabled' : ''} ${className}`}
      style={{
        animationDuration,
        '--shimmer-color': shimmerColor
      }}
    >
      {text}
    </span>
  );
};

export default ShinyText;
