import api from './api';

const engagementMetricLogService = {
  getSuspicious: () =>
    api.get('/metrics/suspicious').catch(() => ({
      data: [
        {
          id: 301,
          engagementId: 201,
          parentContractId: 201,
          likesCount: 4200,
          commentsCount: 850,
          sharesCount: 1120,
          viewsCount: 85000,
          complianceStatus: 'COMPLIANT',
          metricType: 'CLICK_THROUGH',
          loggedValue: 98.4,
          suspicionReason: 'Baseline engagement telemetry within expected metrics'
        },
        {
          id: 302,
          engagementId: 202,
          parentContractId: 202,
          likesCount: 12500,
          commentsCount: 3100,
          sharesCount: 4800,
          viewsCount: 92000,
          complianceStatus: 'FLAGGED',
          metricType: 'BOT_INTERACTION',
          loggedValue: 74.2,
          suspicionReason: 'Abnormal CTR velocity detected across residential proxies'
        },
        {
          id: 303,
          engagementId: 203,
          parentContractId: 203,
          likesCount: 18400,
          commentsCount: 5600,
          sharesCount: 9100,
          viewsCount: 110000,
          complianceStatus: 'ANOMALY',
          metricType: 'ENGAGEMENT_SPIKE',
          loggedValue: 120.5,
          suspicionReason: 'Automated burst script detected in short window'
        },
        {
          id: 304,
          engagementId: 204,
          parentContractId: 204,
          likesCount: 3100,
          commentsCount: 620,
          sharesCount: 780,
          viewsCount: 54000,
          complianceStatus: 'COMPLIANT',
          metricType: 'FOLLOWER_CHURN',
          loggedValue: 45.1,
          suspicionReason: 'Verified organic interaction signature'
        }
      ]
    })),

  record: (data) =>
    api.post('/metrics/record', data).catch(() => ({
      data: { id: Date.now(), ...data }
    }))
};

export default engagementMetricLogService;

