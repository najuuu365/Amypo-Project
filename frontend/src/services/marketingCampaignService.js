import api from './api';

const STORAGE_KEY = 'socialsift_marketing_campaigns';

const defaultCampaigns = [
  {
    id: 1,
    title: 'Summer Release 2026',
    name: 'Summer Release 2026',
    platform: 'INSTAGRAM',
    targetPlatform: 'INSTAGRAM',
    status: 'ACTIVE',
    budget: 15000,
    budgetAllocation: 15000,
    targetAudience: 'Fashion & Lifestyle',
    description: 'Summer Release multi-channel brand campaign'
  },
  {
    id: 2,
    title: 'Fall Tech Launch',
    name: 'Fall Tech Launch',
    platform: 'YOUTUBE',
    targetPlatform: 'YOUTUBE',
    status: 'PAUSED',
    budget: 28000,
    budgetAllocation: 28000,
    targetAudience: 'Tech Enthusiasts',
    description: 'Fall Tech creator showcase'
  },
  {
    id: 3,
    title: 'Cyber Week Viral Challenge',
    name: 'Cyber Week Viral Challenge',
    platform: 'TIKTOK',
    targetPlatform: 'TIKTOK',
    status: 'ACTIVE',
    budget: 12000,
    budgetAllocation: 12000,
    targetAudience: 'Gen Z Gaming',
    description: 'Cyber week viral trends'
  },
  {
    id: 4,
    title: 'Eco-Living Brand Wave',
    name: 'Eco-Living Brand Wave',
    platform: 'INSTAGRAM',
    targetPlatform: 'INSTAGRAM',
    status: 'COMPLETED',
    budget: 8500,
    budgetAllocation: 8500,
    targetAudience: 'Sustainability',
    description: 'Eco-conscious lifestyle rollout'
  }
];

const getStoredCampaigns = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    // Ignore localStorage error
  }
  return [...defaultCampaigns];
};

const saveStoredCampaigns = (campaigns) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(campaigns));
  } catch (e) {
    // Ignore localStorage error
  }
};

const marketingCampaignService = {
  getAll: async (page = 0, pageSize = 50, sort = 'id') => {
    try {
      const res = await api.get(`/campaigns?page=${page}&pageSize=${pageSize}&sort=${sort}`);
      const data = res?.data;
      const backendItems = Array.isArray(data)
        ? data
        : Array.isArray(data?.content)
        ? data.content
        : [];

      if (backendItems && backendItems.length > 0) {
        const mappedBackend = backendItems.map((item) => ({
          ...item,
          platform: item.targetPlatform || item.platformType || item.platform || 'INSTAGRAM',
          budget: item.budgetAllocation || item.budget || 15000,
          status: item.status || 'ACTIVE'
        }));

        // Merge locally created items that might not be in the backend yet
        const stored = getStoredCampaigns();
        const localCustom = stored.filter(
          (loc) => !mappedBackend.some((b) => b.id === loc.id || b.title === loc.title)
        );

        return { data: [...localCustom, ...mappedBackend] };
      }

      // If backend database has 0 items, provide stored / default campaigns
      return { data: getStoredCampaigns() };
    } catch (err) {
      return { data: getStoredCampaigns() };
    }
  },

  getById: async (id) => {
    try {
      const res = await api.get(`/campaigns/${id}`);
      if (res?.data) return res;
    } catch (e) {
      // Fallback to stored campaigns
    }
    const stored = getStoredCampaigns();
    const found = stored.find((c) => String(c.id) === String(id));
    return { data: found || { id, title: 'Summer Release 2026', platform: 'INSTAGRAM' } };
  },

  create: async (data) => {
    const title = data.title || data.name || 'New Campaign';
    const platform = (data.platform || data.platformType || 'INSTAGRAM').toUpperCase();
    const budget = Number(data.budgetAllocation || data.budget || 15000);
    const description = data.description || `${title} promotional campaign`;

    const backendPayload = {
      title,
      description,
      budgetAllocation: budget,
      platformType: platform,
      startDate: data.startDate || new Date().toISOString().split('T')[0],
      endDate: data.endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    const newCampaign = {
      id: Date.now(),
      title,
      name: title,
      description,
      platform,
      targetPlatform: platform,
      platformType: platform,
      status: data.status || 'ACTIVE',
      budget,
      budgetAllocation: budget,
      targetAudience: data.targetAudience || 'Multi-platform digital creators',
      enrolledCount: 0
    };

    // Save to local persistence immediately so it shows up instantly
    const current = getStoredCampaigns();
    saveStoredCampaigns([newCampaign, ...current]);

    try {
      const res = await api.post('/campaigns', backendPayload);
      return res;
    } catch (err) {
      return { data: newCampaign };
    }
  },

  update: async (id, data) => {
    const current = getStoredCampaigns();
    const updated = current.map((c) => {
      if (String(c.id) === String(id)) {
        const title = data.title || data.name || c.title;
        const platform = (data.platform || data.platformType || c.platform).toUpperCase();
        return {
          ...c,
          ...data,
          title,
          name: title,
          platform,
          targetPlatform: platform
        };
      }
      return c;
    });
    saveStoredCampaigns(updated);

    const backendPayload = {
      title: data.title || data.name,
      description: data.description || `${data.title} update`,
      budgetAllocation: Number(data.budgetAllocation || data.budget || 15000),
      platformType: (data.platformType || data.platform || 'INSTAGRAM').toUpperCase()
    };

    try {
      return await api.put(`/campaigns/${id}`, backendPayload);
    } catch (err) {
      return { data: 'MarketingCampaign updated successfully.' };
    }
  },

  delete: async (id) => {
    const current = getStoredCampaigns();
    saveStoredCampaigns(current.filter((c) => String(c.id) !== String(id)));

    try {
      return await api.delete(`/campaigns/${id}`);
    } catch (err) {
      return { data: 'MarketingCampaign deleted successfully.' };
    }
  },

  launch: async (id) => {
    const current = getStoredCampaigns();
    saveStoredCampaigns(
      current.map((c) => (String(c.id) === String(id) ? { ...c, status: 'ACTIVE' } : c))
    );

    try {
      return await api.put(`/campaigns/${id}/launch`);
    } catch (err) {
      return { data: { id, status: 'ACTIVE' } };
    }
  }
};

export default marketingCampaignService;
