import React, { useState } from 'react';
import campaignEngagementService from '../../services/campaignEngagamentService';
import SpotlightCard from '../reactbits/SpotlightCard';
import DecryptedText from '../reactbits/DecryptedText';
import { CheckCircle2, Send } from 'lucide-react';

export const CampaignEngagementForm = ({ campaignId = 1, onClose }) => {
  const [influencerId, setInfluencerId] = useState(1);
  const [proposedRate, setProposedRate] = useState(1500);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await campaignEngagementService.apply({
      campaignId: Number(campaignId),
      influencerId: Number(influencerId),
      proposedRate: Number(proposedRate),
      notes
    });
    setSubmitted(true);
    setTimeout(() => {
      if (onClose) onClose();
    }, 1200);
  };

  const inputStyle = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    backgroundColor: '#0b0f19',
    border: '1px solid #1e293b',
    color: '#f8fafc',
    fontSize: '0.95rem',
    outline: 'none',
    marginBottom: '1rem'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.85rem',
    color: '#cbd5e1',
    marginBottom: '0.35rem',
    fontWeight: 500
  };

  return (
    <SpotlightCard style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#f8fafc', margin: '0 0 0.35rem 0' }}>
          <DecryptedText text="Apply for Campaign" speed={35} />
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
          Submit enrollment proposal for Campaign #{campaignId}
        </p>
      </div>

      {submitted ? (
        <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
          <CheckCircle2 size={44} color="#10b981" style={{ margin: '0 auto 0.5rem auto' }} />
          <h4 style={{ color: '#34d399', fontSize: '1.2rem', marginTop: '0.5rem' }}>
            Application Submitted!
          </h4>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Pending brand manager review and verification.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={labelStyle}>Creator / Influencer Account ID</label>
          <input
            type="number"
            value={influencerId}
            onChange={(e) => setInfluencerId(e.target.value)}
            required
            style={inputStyle}
          />

          <label style={labelStyle}>Proposed Engagement Rate ($)</label>
          <input
            type="number"
            value={proposedRate}
            onChange={(e) => setProposedRate(e.target.value)}
            required
            style={inputStyle}
          />

          <label style={labelStyle}>Pitch / Creative Direction Notes</label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Outline content angles, estimated deliverables, and timeline..."
            style={{
              ...inputStyle,
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
          />

          <button
            type="submit"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              width: '100%',
              padding: '0.75rem',
              borderRadius: '8px',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              marginTop: '0.5rem',
              transition: 'background-color 0.15s ease'
            }}
          >
            <Send size={16} />
            Submit Application
          </button>
        </form>
      )}
    </SpotlightCard>
  );
};

export default CampaignEngagementForm;
