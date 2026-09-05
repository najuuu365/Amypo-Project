import React from 'react';
import { Folder } from 'lucide-react';

export const EmptyState = ({
  title = 'No items found',
  description = 'There are currently no records matching your criteria.',
  icon = null,
  actionLabel,
  onAction
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
        borderRadius: '12px',
        border: '1px dashed #334155',
        backgroundColor: '#111827',
        textAlign: 'center',
        margin: '1.5rem 0'
      }}
    >
      <div
        style={{
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {icon || <Folder size={40} color="#64748b" strokeWidth={1.5} />}
      </div>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#f8fafc', marginBottom: '0.5rem' }}>
        {title}
      </h3>
      <p style={{ color: '#94a3b8', maxWidth: '400px', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          style={{
            padding: '0.5rem 1.25rem',
            borderRadius: '6px',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            border: 'none',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background-color 0.15s ease'
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
