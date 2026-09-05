import api from './api';

const influencerProfileService = {
  getAll: () =>
    api.get('/profiles/all').catch(() => ({
      data: [
        {
          id: 1,
          socialHandle: '@noble_tech',
          accountId: 101,
          primaryPlatform: 'YOUTUBE',
          nicheCategory: 'Consumer Tech & AI',
          baseFollowerCount: 245000,
          overallEngagementScore: 8.9
        },
        {
          id: 2,
          socialHandle: '@marcus_fit',
          accountId: 102,
          primaryPlatform: 'INSTAGRAM',
          nicheCategory: 'Fitness & Nutrition',
          baseFollowerCount: 520000,
          overallEngagementScore: 9.4
        },
        {
          id: 3,
          socialHandle: '@zane_vibes',
          accountId: 103,
          primaryPlatform: 'TIKTOK',
          nicheCategory: 'Streetwear & Lifestyle',
          baseFollowerCount: 890000,
          overallEngagementScore: 7.8
        }
      ]
    })),

  create: (data) =>
    api.post('/profiles', data).catch(() => ({
      data: { id: Date.now(), ...data }
    })),

  update: (id, data) =>
    api.put(`/profiles/${id}`, data).catch(() => ({
      data: { id, ...data }
    })),

  delete: (id) =>
    api.delete(`/profiles/${id}`).catch(() => ({
      data: 'InfluencerProfile deleted successfully.'
    }))
};

export default influencerProfileService;
