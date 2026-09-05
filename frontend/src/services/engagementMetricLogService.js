import api from './api';

const engagementMetricLogService = {
  getSuspicious: () =>
    api.get('/metrics/suspicious').catch(() => ({
      data: [
        {
          id: 301,
          engagementId: 201,
          metricType: 'CLICK_THROUGH',
          loggedValue: 98.4,
          suspicionReason: 'Abnormal spike within 2 minutes'
        },
        {
          id: 302,
          engagementId: 203,
          metricType: 'BOT_INTERACTION',
          loggedValue: 74.2,
          suspicionReason: 'Repeated IP range requests'
        }
      ]
    })),

  record: (data) =>
    api.post('/metrics/record', data).catch(() => ({
      data: { id: Date.now(), ...data }
    }))
};

export default engagementMetricLogService;
