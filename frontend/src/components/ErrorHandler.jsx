import React from 'react';
import { AlertCircle } from 'lucide-react';

function ErrorHandler({ error, children }) {
  if (error) {
    return (
      <div
        role="alert"
        style={{
          margin: '2rem auto',
          maxWidth: '600px',
          padding: '1.5rem',
          borderRadius: '8px',
          backgroundColor: '#1f1315',
          border: '1px solid #7f1d1d',
          color: '#fca5a5',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
        }}
      >
        <AlertCircle size={32} color="#ef4444" style={{ margin: '0 auto 0.75rem auto' }} />
        <strong style={{ fontSize: '1.05rem', display: 'block', marginBottom: '0.35rem', color: '#f87171' }}>
          System Exception Encountered
        </strong>
        <div style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>{error}</div>
      </div>
    );
  }

  return children;
}

export default ErrorHandler;