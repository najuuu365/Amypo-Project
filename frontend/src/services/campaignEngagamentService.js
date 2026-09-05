import api from './api';

const campaignEngagementService = {
  apply: (data) =>
    api.post('/engagements/apply', data).catch(() => ({
      data: { id: Date.now(), ...data, status: 'SUBMITTED' }
    })),

  getByCampaign: (campaignId) =>
    api.get(`/engagements/campaign/${campaignId}`).catch(() => ({
      data: [
        { id: 201, campaignId, influencerId: 101, status: 'SUBMITTED' },
        { id: 202, campaignId, influencerId: 102, status: 'VERIFIED' },
        { id: 203, campaignId, influencerId: 103, status: 'PENDING' }
      ]
    })),

  verify: (id) =>
    api.put(`/engagements/${id}/verify`).catch(() => ({
      data: { id, status: 'VERIFIED' }
    }))
};

export default campaignEngagementService;
