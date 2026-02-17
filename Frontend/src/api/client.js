import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle response errors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('access_token');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

// ==================== AUTH ====================

export const login = async (username, pin) => {
    const response = await apiClient.post('/auth/login', { username, pin });
    if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
    }
    return response.data;
};

// ==================== ALERTS ====================

export const getAlerts = async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await apiClient.get(`/alerts?${params}`);
    return response.data.alerts;
};

export const createAlert = async (alertData) => {
    const response = await apiClient.post('/alerts', alertData);
    return response.data;
};

export const markAlertRead = async (alertId) => {
    const response = await apiClient.put(`/alerts/${alertId}/read`);
    return response.data;
};

// ==================== PREFERENCES ====================

export const getPreferences = async () => {
    const response = await apiClient.get('/preferences');
    return response.data;
};

export const updatePreferences = async (preferences) => {
    const response = await apiClient.put('/preferences', preferences);
    return response.data;
};

// ==================== SEARCH ====================

export const getSearchHistory = async () => {
    const response = await apiClient.get('/search/history');
    return response.data.history;
};

export const saveSearch = async (query, filters) => {
    const response = await apiClient.post('/search/history', { query, filters });
    return response.data;
};

// ==================== THREAT HISTORY ====================

export const getThreatHistory = async (country, days = 30) => {
    const response = await apiClient.get(`/threats/history/${country}?days=${days}`);
    return response.data;
};

export const saveThreatSnapshot = async (snapshotData) => {
    const response = await apiClient.post('/threats/snapshot', snapshotData);
    return response.data;
};

// ==================== NEWS ====================

export const getCountryNews = async (country) => {
    const response = await apiClient.get(`/news/${country}`);
    return response.data.articles;
};

// ==================== HEALTH ====================

export const healthCheck = async () => {
    const response = await apiClient.get('/health');
    return response.data;
};

export default apiClient;
