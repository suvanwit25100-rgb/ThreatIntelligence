// LocalStorage helper functions for user preferences and data persistence

const STORAGE_KEYS = {
    FAVORITES: 'threat_intel_favorites',
    WATCHLIST: 'threat_intel_watchlist',
    THEME: 'threat_intel_theme',
    ALERT_SETTINGS: 'threat_intel_alert_settings',
    DASHBOARD_LAYOUT: 'threat_intel_dashboard_layout',
    SEARCH_PRESETS: 'threat_intel_search_presets',
    LAST_VIEWED: 'threat_intel_last_viewed',
};

// ==================== GENERIC STORAGE ====================

export const setItem = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
};

export const getItem = (key, defaultValue = null) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return defaultValue;
    }
};

export const removeItem = (key) => {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Error removing from localStorage:', error);
        return false;
    }
};

// ==================== FAVORITES ====================

export const getFavorites = () => {
    return getItem(STORAGE_KEYS.FAVORITES, []);
};

export const addFavorite = (country) => {
    const favorites = getFavorites();
    if (!favorites.includes(country)) {
        favorites.push(country);
        setItem(STORAGE_KEYS.FAVORITES, favorites);
    }
    return favorites;
};

export const removeFavorite = (country) => {
    const favorites = getFavorites();
    const updated = favorites.filter(c => c !== country);
    setItem(STORAGE_KEYS.FAVORITES, updated);
    return updated;
};

export const isFavorite = (country) => {
    return getFavorites().includes(country);
};

// ==================== WATCHLIST ====================

export const getWatchlist = () => {
    return getItem(STORAGE_KEYS.WATCHLIST, []);
};

export const addToWatchlist = (country) => {
    const watchlist = getWatchlist();
    if (!watchlist.includes(country)) {
        watchlist.push(country);
        setItem(STORAGE_KEYS.WATCHLIST, watchlist);
    }
    return watchlist;
};

export const removeFromWatchlist = (country) => {
    const watchlist = getWatchlist();
    const updated = watchlist.filter(c => c !== country);
    setItem(STORAGE_KEYS.WATCHLIST, updated);
    return updated;
};

export const isInWatchlist = (country) => {
    return getWatchlist().includes(country);
};

// ==================== THEME ====================

export const getTheme = () => {
    return getItem(STORAGE_KEYS.THEME, 'dark');
};

export const setTheme = (theme) => {
    setItem(STORAGE_KEYS.THEME, theme);
    return theme;
};

// ==================== ALERT SETTINGS ====================

export const getAlertSettings = () => {
    return getItem(STORAGE_KEYS.ALERT_SETTINGS, {
        sound: true,
        criticalOnly: false,
        showToast: true,
        autoHide: true,
    });
};

export const setAlertSettings = (settings) => {
    setItem(STORAGE_KEYS.ALERT_SETTINGS, settings);
    return settings;
};

// ==================== DASHBOARD LAYOUT ====================

export const getDashboardLayout = () => {
    return getItem(STORAGE_KEYS.DASHBOARD_LAYOUT, {
        showMap: true,
        showAlerts: true,
        showNews: true,
        showAnalytics: true,
    });
};

export const setDashboardLayout = (layout) => {
    setItem(STORAGE_KEYS.DASHBOARD_LAYOUT, layout);
    return layout;
};

// ==================== SEARCH PRESETS ====================

export const getSearchPresets = () => {
    return getItem(STORAGE_KEYS.SEARCH_PRESETS, []);
};

export const saveSearchPreset = (name, filters) => {
    const presets = getSearchPresets();
    const existing = presets.findIndex(p => p.name === name);

    if (existing >= 0) {
        presets[existing] = { name, filters };
    } else {
        presets.push({ name, filters });
    }

    setItem(STORAGE_KEYS.SEARCH_PRESETS, presets);
    return presets;
};

export const deleteSearchPreset = (name) => {
    const presets = getSearchPresets();
    const updated = presets.filter(p => p.name !== name);
    setItem(STORAGE_KEYS.SEARCH_PRESETS, updated);
    return updated;
};

// ==================== LAST VIEWED ====================

export const getLastViewed = () => {
    return getItem(STORAGE_KEYS.LAST_VIEWED, []);
};

export const addLastViewed = (country) => {
    const lastViewed = getLastViewed();
    // Remove if already exists
    const filtered = lastViewed.filter(c => c !== country);
    // Add to beginning
    filtered.unshift(country);
    // Keep only last 10
    const updated = filtered.slice(0, 10);
    setItem(STORAGE_KEYS.LAST_VIEWED, updated);
    return updated;
};

// ==================== CLEAR ALL ====================

export const clearAllData = () => {
    Object.values(STORAGE_KEYS).forEach(key => {
        removeItem(key);
    });
};

export default {
    setItem,
    getItem,
    removeItem,
    getFavorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    getWatchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    getTheme,
    setTheme,
    getAlertSettings,
    setAlertSettings,
    getDashboardLayout,
    setDashboardLayout,
    getSearchPresets,
    saveSearchPreset,
    deleteSearchPreset,
    getLastViewed,
    addLastViewed,
    clearAllData,
};
