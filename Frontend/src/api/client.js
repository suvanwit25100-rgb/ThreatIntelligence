import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('access_token');
        }
        return Promise.reject(error);
    }
);

// ==================== AUTH ====================

export const login = async (username, pin) => {
    const response = await apiClient.post('/auth/login/', { username, password: pin, pin });
    if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
        if (response.data.refresh_token) {
            localStorage.setItem('refresh_token', response.data.refresh_token);
        }
    }
    return response.data;
};

export const register = async (userData) => {
    const response = await apiClient.post('/auth/register/', userData);
    if (response.data.access) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
    }
    return response.data;
};

export const getMe = async () => {
    const response = await apiClient.get('/auth/me/');
    return response.data;
};

// ==================== ALERTS ====================

export const getAlerts = async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await apiClient.get(`/alerts/?${params}`);
    return response.data.results || response.data;
};

export const createAlert = async (alertData) => {
    const response = await apiClient.post('/alerts/', alertData);
    return response.data;
};

export const markAlertRead = async (alertId) => {
    const response = await apiClient.put(`/alerts/${alertId}/read/`);
    return response.data;
};

// ==================== PREFERENCES ====================

export const getPreferences = async () => {
    const response = await apiClient.get('/preferences/');
    return response.data;
};

export const updatePreferences = async (preferences) => {
    const response = await apiClient.put('/preferences/', preferences);
    return response.data;
};

// ==================== SEARCH ====================

export const getSearchHistory = async () => {
    const response = await apiClient.get('/search/history/');
    const data = response.data;
    return data.results || data.history || data;
};

export const saveSearch = async (query, filters) => {
    const response = await apiClient.post('/search/history/', { query, filters });
    return response.data;
};

// ==================== THREATS ====================

export const getThreatHistory = async (country, days = 30) => {
    const response = await apiClient.get(`/threats/history/${country}/?days=${days}`);
    return response.data;
};

export const saveThreatSnapshot = async (snapshotData) => {
    const response = await apiClient.post('/threats/snapshot/', snapshotData);
    return response.data;
};

// ==================== NEWS ====================

export const getCountryNews = async (country) => {
    const response = await apiClient.get(`/news/${country}/`);
    return response.data.articles;
};

// ==================== CANDIDATES ====================

export const getCandidates = async (stage) => {
    const params = stage ? `?stage=${stage}` : '';
    const response = await apiClient.get(`/candidates/${params}`);
    return response.data.results || response.data;
};

export const createCandidate = async (data) => {
    const response = await apiClient.post('/candidates/', data);
    return response.data;
};

export const getCandidate = async (id) => {
    const response = await apiClient.get(`/candidates/${id}/`);
    return response.data;
};

export const advanceCandidate = async (id) => {
    const response = await apiClient.post(`/candidates/${id}/advance/`);
    return response.data;
};

export const rejectCandidate = async (id) => {
    const response = await apiClient.post(`/candidates/${id}/reject/`);
    return response.data;
};

// ==================== AGENTS ====================

export const getAgents = async () => {
    const response = await apiClient.get('/agents/');
    return response.data.results || response.data;
};

export const getAgent = async (id) => {
    const response = await apiClient.get(`/agents/${id}/`);
    return response.data;
};

export const getAgentTraining = async (id) => {
    const response = await apiClient.get(`/agents/${id}/training/`);
    return response.data;
};

export const recordTrainingScore = async (agentId, data) => {
    const response = await apiClient.post(`/agents/${agentId}/training/`, data);
    return response.data;
};

// ==================== AGENT IDs ====================

export const getAgentIDs = async () => {
    const response = await apiClient.get('/agent-ids/');
    return response.data.results || response.data;
};

export const generateAgentID = async (data) => {
    const response = await apiClient.post('/agent-ids/', data);
    return response.data;
};

export const revokeAgentID = async (id) => {
    const response = await apiClient.post(`/agent-ids/${id}/revoke/`);
    return response.data;
};

// ==================== CLEARANCE ====================

export const getClearanceRequests = async (filterStatus) => {
    const params = filterStatus ? `?status=${filterStatus}` : '';
    const response = await apiClient.get(`/clearance-requests/${params}`);
    return response.data.results || response.data;
};

export const approveClearance = async (id) => {
    const response = await apiClient.post(`/clearance-requests/${id}/approve/`);
    return response.data;
};

export const denyClearance = async (id) => {
    const response = await apiClient.post(`/clearance-requests/${id}/deny/`);
    return response.data;
};

// ==================== MISSIONS ====================

export const getMissions = async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await apiClient.get(`/missions/?${params}`);
    return response.data.results || response.data;
};

export const createMission = async (data) => {
    const response = await apiClient.post('/missions/', data);
    return response.data;
};

export const getMission = async (id) => {
    const response = await apiClient.get(`/missions/${id}/`);
    return response.data;
};

export const assignMission = async (missionId, agentId) => {
    const response = await apiClient.post(`/missions/${missionId}/assign/`, { agent_id: agentId });
    return response.data;
};

export const getMissionMatch = async (missionId) => {
    const response = await apiClient.get(`/missions/${missionId}/match/`);
    return response.data;
};

export const getDeployments = async () => {
    const response = await apiClient.get('/deployments/');
    return response.data.results || response.data;
};

// ==================== COMMS ====================

export const getThreads = async () => {
    const response = await apiClient.get('/threads/');
    return response.data.results || response.data;
};

export const getThreadMessages = async (threadId) => {
    const response = await apiClient.get(`/threads/${threadId}/messages/`);
    return response.data;
};

export const sendMessage = async (data) => {
    const response = await apiClient.post('/messages/', data);
    return response.data;
};

export const getCheckins = async () => {
    const response = await apiClient.get('/checkins/');
    return response.data.results || response.data;
};

export const recordCheckin = async (data) => {
    const response = await apiClient.post('/checkins/', data);
    return response.data;
};

export const getDeadDrops = async () => {
    const response = await apiClient.get('/dead-drops/');
    return response.data.results || response.data;
};

export const getExtractions = async () => {
    const response = await apiClient.get('/extractions/');
    return response.data.results || response.data;
};

export const requestExtraction = async (data) => {
    const response = await apiClient.post('/extractions/', data);
    return response.data;
};

export const approveExtraction = async (id) => {
    const response = await apiClient.post(`/extractions/${id}/approve/`);
    return response.data;
};

// ==================== FILES ====================

export const getGovFiles = async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await apiClient.get(`/gov-files/?${params}`);
    return response.data.results || response.data;
};

export const createGovFile = async (data) => {
    const response = await apiClient.post('/gov-files/', data);
    return response.data;
};

export const getGovFile = async (id) => {
    const response = await apiClient.get(`/gov-files/${id}/`);
    return response.data;
};

export const deleteGovFile = async (id) => {
    const response = await apiClient.delete(`/gov-files/${id}/`);
    return response.data;
};

// ==================== ADMIN ====================

export const getAdminStats = async () => {
    const response = await apiClient.get('/admin/stats/');
    return response.data;
};

// ==================== HEALTH ====================

export const healthCheck = async () => {
    const response = await apiClient.get('/health/');
    return response.data;
};

export default apiClient;
