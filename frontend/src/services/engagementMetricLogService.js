import api from './api';

const DEFAULT_METRIC_LOGS = [
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
    numericValue: 98.4,
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
    numericValue: 74.2,
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
    numericValue: 120.5,
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
    numericValue: 45.1,
    suspicionReason: 'Verified organic interaction signature'
  }
];

const getStoredLocalLogs = () => {
  try {
    const raw = localStorage.getItem('socialsift_telemetry_logs');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

const saveLocalLogs = (logs) => {
  try {
    localStorage.setItem('socialsift_telemetry_logs', JSON.stringify(logs));
  } catch (e) {}
};

const engagementMetricLogService = {
  getSuspicious: async () => {
    try {
      const res = await api.get('/metrics/suspicious');
      const backendData = res?.data ?? res;
      if (Array.isArray(backendData) && backendData.length > 0) {
        const local = getStoredLocalLogs();
        const merged = [...backendData];
        for (const item of local) {
          if (!merged.some((m) => String(m.id) === String(item.id))) {
            merged.unshift(item);
          }
        }
        return { data: merged };
      }
    } catch (err) {
      console.warn('Backend metrics fetch fallback:', err);
    }
    const local = getStoredLocalLogs();
    const list = [...local, ...DEFAULT_METRIC_LOGS];
    return { data: list };
  },

  record: async (data) => {
    const newLogEntry = {
      id: Date.now(),
      ...data
    };
    try {
      const res = await api.post('/metrics/record', data);
      const saved = res?.data ?? res;
      if (saved && saved.id) {
        newLogEntry.id = saved.id;
      }
    } catch (err) {
      console.warn('Backend metrics record fallback to persistent local cache:', err);
    }
    const local = getStoredLocalLogs();
    const updated = [newLogEntry, ...local.filter((l) => String(l.id) !== String(newLogEntry.id))];
    saveLocalLogs(updated);
    return { data: newLogEntry };
  }
};

export default engagementMetricLogService;
