import React from 'react';
import './StarBorder.css';

export const StarBorder = ({
  as: Component = 'button',
  className = '',
  color = '#2563eb',
  speed = '6s',
  children,
  ...rest
}) => {
  return (
    <Component className={`star-border-container ${className}`} {...rest}>
      <div className="star-border-inner">{children}</div>
    </Component>
  );
};

export default StarBorder;
