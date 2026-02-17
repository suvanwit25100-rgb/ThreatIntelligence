import React, { createContext, useContext, useState, useEffect } from 'react';
import { getPreferences, updatePreferences } from '../api/client';
import * as storage from '../utils/storage';

const AppContext = createContext();

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
};

export const AppProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [theme, setTheme] = useState('dark');
    const [alertSettings, setAlertSettings] = useState({
        sound: true,
        criticalOnly: false,
        showToast: true,
        autoHide: true,
    });
    const [dashboardLayout, setDashboardLayout] = useState({
        showMap: true,
        showAlerts: true,
        showNews: true,
        showAnalytics: true,
    });
    const [alerts, setAlerts] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [searchFilters, setSearchFilters] = useState({});

    // Load preferences on mount
    useEffect(() => {
        loadPreferences();
    }, []);

    const loadPreferences = async () => {
        try {
            // Try to load from API first
            const prefs = await getPreferences();
            setFavorites(prefs.favorites || []);
            setWatchlist(prefs.watchlist || []);
            setTheme(prefs.theme || 'dark');
            setAlertSettings(prefs.alert_settings || alertSettings);
            setDashboardLayout(prefs.dashboard_layout || dashboardLayout);
        } catch (error) {
            // Fallback to localStorage
            setFavorites(storage.getFavorites());
            setWatchlist(storage.getWatchlist());
            setTheme(storage.getTheme());
            setAlertSettings(storage.getAlertSettings());
            setDashboardLayout(storage.getDashboardLayout());
        }
    };

    const savePreferences = async (updates) => {
        try {
            await updatePreferences(updates);
        } catch (error) {
            console.error('Error saving preferences to API:', error);
        }
    };

    // Favorites
    const addFavorite = (country) => {
        const updated = storage.addFavorite(country);
        setFavorites(updated);
        savePreferences({ favorites: updated });
    };

    const removeFavorite = (country) => {
        const updated = storage.removeFavorite(country);
        setFavorites(updated);
        savePreferences({ favorites: updated });
    };

    // Watchlist
    const addToWatchlist = (country) => {
        const updated = storage.addToWatchlist(country);
        setWatchlist(updated);
        savePreferences({ watchlist: updated });
    };

    const removeFromWatchlist = (country) => {
        const updated = storage.removeFromWatchlist(country);
        setWatchlist(updated);
        savePreferences({ watchlist: updated });
    };

    // Theme
    const updateTheme = (newTheme) => {
        storage.setTheme(newTheme);
        setTheme(newTheme);
        savePreferences({ theme: newTheme });
    };

    // Alert Settings
    const updateAlertSettings = (settings) => {
        storage.setAlertSettings(settings);
        setAlertSettings(settings);
        savePreferences({ alert_settings: settings });
    };

    // Dashboard Layout
    const updateDashboardLayout = (layout) => {
        storage.setDashboardLayout(layout);
        setDashboardLayout(layout);
        savePreferences({ dashboard_layout: layout });
    };

    // Alerts
    const addAlert = (alert) => {
        setAlerts(prev => [alert, ...prev]);
    };

    const clearAlerts = () => {
        setAlerts([]);
    };

    const value = {
        // State
        favorites,
        watchlist,
        theme,
        alertSettings,
        dashboardLayout,
        alerts,
        selectedCountry,
        searchFilters,

        // Actions
        addFavorite,
        removeFavorite,
        addToWatchlist,
        removeFromWatchlist,
        updateTheme,
        updateAlertSettings,
        updateDashboardLayout,
        addAlert,
        clearAlerts,
        setSelectedCountry,
        setSearchFilters,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
