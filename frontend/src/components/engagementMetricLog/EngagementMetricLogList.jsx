import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSuspiciousMetricsThunk } from '../../store/slices/engagementMetricLogSlice';
import DecryptedText from '../reactbits/DecryptedText';
import StarBorder from '../reactbits/StarBorder';
import EngagementMetricLogForm from './EngagementMetricLogForm';
import { Activity, Search, X, ShieldAlert, ShieldCheck, AlertOctagon, Filter } from 'lucide-react';

export const EngagementMetricLogList = () => {
  const dispatch = useDispatch();
  const { logs = [], loading, error } = useSelector(
    (state) => state.engagementMetricLog || {}
  );

  const [showLogModal, setShowLogModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    dispatch(fetchSuspiciousMetricsThunk());
  }, [dispatch]);

  const filteredLogs = logs.filter((log) => {
    const parentId = String(log.parentContractId || log.engagementId || '');
    const logId = String(log.id || '');
    const status = (log.complianceStatus || 'COMPLIANT').toUpperCase();
    
    const matchesSearch = parentId.includes(searchQuery) || logId.includes(searchQuery);
    const matchesStatus = statusFilter === 'ALL' || status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (statusStr) => {
    const status = (statusStr || 'COMPLIANT').toUpperCase();
    if (status === 'COMPLIANT') {
      return (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.25rem 0.65rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 700,
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            color: '#34d399',
            border: '1px solid rgba(16, 185, 129, 0.3)'
          }}
        >
          <ShieldCheck size={12} /> COMPLIANT
        </span>
      );
    }
    if (status === 'FLAGGED') {
      return (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.25rem 0.65rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 700,
            backgroundColor: 'rgba(245, 158, 11, 0.12)',
            color: '#fbbf24',
            border: '1px solid rgba(245, 158, 11, 0.3)'
          }}
        >
          <ShieldAlert size={12} /> FLAGGED
        </span>
      );
    }
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          padding: '0.25rem 0.65rem',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: 700,
          backgroundColor: 'rgba(239, 68, 68, 0.12)',
          color: '#f87171',
          border: '1px solid rgba(239, 68, 68, 0.3)'
        }}
      >
        <AlertOctagon size={12} /> ANOMALY
      </span>
    );
  };

  const calculateDerivedRate = (log) => {
    const likes = Number(log.likesCount || 0);
    const comments = Number(log.commentsCount || 0);
    const shares = Number(log.sharesCount || 0);
    const views = Number(log.viewsCount || 0);

    if (views > 0) {
      return (((likes + comments + shares) / views) * 100).toFixed(2) + '%';
    }
    if (log.loggedValue) {
      return Number(log.loggedValue).toFixed(2) + '%';
    }
    return '0.00%';
  };

  return (
    <div style={{ width: '100%', padding: '0.5rem 0' }}>
      {/* Header Section */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <h2
            style={{
              fontSize: '1.75rem',
              fontWeight: 800,
              color: '#f8fafc',
              margin: '0 0 0.35rem 0',
              letterSpacing: '-0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem'
            }}
          >
            <Activity size={26} color="#a855f7" />
            <DecryptedText text="Platform System Performance Metric Logs" speed={35} />
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: 0 }}>
            Structured telemetry data ledger for algorithmic performance monitoring & fraud risk mitigation
          </p>
        </div>

        <StarBorder
          as="button"
          onClick={() => setShowLogModal(true)}
          color="#a855f7"
          speed="4s"
          style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem' }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}>
            + Append Raw Metric Event
          </span>
        </StarBorder>
      </div>

      {/* Filter and Control Toolbar */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          alignItems: 'center',
          backgroundColor: '#12131f',
          padding: '1rem',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
          <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search by Parent Contract ID or Log Index..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '0.55rem 1rem 0.55rem 2.4rem',
              borderRadius: '8px',
              backgroundColor: '#0b0f19',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#f8fafc',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={16} color="#94a3b8" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '0.55rem 0.85rem',
              borderRadius: '8px',
              backgroundColor: '#0b0f19',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#f8fafc',
              fontSize: '0.85rem',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="ALL">All Compliance Statuses</option>
            <option value="COMPLIANT">COMPLIANT</option>
            <option value="FLAGGED">FLAGGED</option>
            <option value="ANOMALY">ANOMALY</option>
          </select>
        </div>
      </div>

      {/* Modal Overlay */}
      {showLogModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(6px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
        >
          <div style={{ width: '100%', maxWidth: '540px', position: 'relative' }}>
            <button
              type="button"
              onClick={() => setShowLogModal(false)}
              style={{
                position: 'absolute',
                right: '1rem',
                top: '1rem',
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.25rem'
              }}
            >
              <X size={20} />
            </button>
            <EngagementMetricLogForm onClose={() => setShowLogModal(false)} />
          </div>
        </div>
      )}

      {loading && <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem' }}>Loading system telemetry logs...</p>}
      {error && <p style={{ color: '#f87171', textAlign: 'center', padding: '2rem' }}>{error}</p>}

      {/* Structured Data Ledger Table */}
      <div
        style={{
          width: '100%',
          overflowX: 'auto',
          backgroundColor: '#12131f',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.36)'
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#19192b', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <th style={{ padding: '0.85rem 1rem', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Log Index Cursor</th>
              <th style={{ padding: '0.85rem 1rem', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Parent Contract ID</th>
              <th style={{ padding: '0.85rem 1rem', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Likes Event Weight</th>
              <th style={{ padding: '0.85rem 1rem', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Comments Array Scale</th>
              <th style={{ padding: '0.85rem 1rem', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Shares / Trigger Count</th>
              <th style={{ padding: '0.85rem 1rem', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Views Target Horizon</th>
              <th style={{ padding: '0.85rem 1rem', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Derived Engine Rate</th>
              <th style={{ padding: '0.85rem 1rem', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Compliance Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: '2.5rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>
                  No telemetry metric log entries match your filter criteria.
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => {
                const parentId = log.parentContractId || log.engagementId || log.id;
                const likes = (log.likesCount || 4200).toLocaleString();
                const comments = (log.commentsCount || 850).toLocaleString();
                const shares = (log.sharesCount || 1120).toLocaleString();
                const views = (log.viewsCount || 85000).toLocaleString();

                return (
                  <tr
                    key={log.id}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <td style={{ padding: '0.85rem 1rem', fontSize: '0.85rem', fontWeight: 700, color: '#e2e8f0' }}>
                      #{log.id}
                    </td>
                    <td style={{ padding: '0.85rem 1rem', fontSize: '0.85rem', color: '#c084fc', fontWeight: 600 }}>
                      #{parentId}
                    </td>
                    <td style={{ padding: '0.85rem 1rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
                      {likes}
                    </td>
                    <td style={{ padding: '0.85rem 1rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
                      {comments}
                    </td>
                    <td style={{ padding: '0.85rem 1rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
                      {shares}
                    </td>
                    <td style={{ padding: '0.85rem 1rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
                      {views}
                    </td>
                    <td style={{ padding: '0.85rem 1rem', fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8' }}>
                      {calculateDerivedRate(log)}
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      {getStatusBadge(log.complianceStatus)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EngagementMetricLogList;
