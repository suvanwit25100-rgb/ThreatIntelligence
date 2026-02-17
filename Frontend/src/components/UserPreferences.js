import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Star, Bell, Palette, Layout, Save } from 'lucide-react';
import { useApp } from '../context/AppContext';
import * as storage from '../utils/storage';

const UserPreferences = ({ onClose }) => {
    const { favorites, watchlist, theme, alertSettings, dashboardLayout, updateTheme, updateAlertSettings, updateDashboardLayout } = useApp();

    const [localAlertSettings, setLocalAlertSettings] = useState(alertSettings);
    const [localLayout, setLocalLayout] = useState(dashboardLayout);
    const [localTheme, setLocalTheme] = useState(theme);

    const handleSave = () => {
        updateTheme(localTheme);
        updateAlertSettings(localAlertSettings);
        updateDashboardLayout(localLayout);
        onClose();
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.9)',
                zIndex: 10000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: 'rgba(0, 20, 40, 0.98)',
                    border: '2px solid #00FFCC',
                    borderRadius: '12px',
                    padding: '32px',
                    maxWidth: '600px',
                    width: '100%',
                    maxHeight: '90vh',
                    overflowY: 'auto'
                }}
            >
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '24px'
                }}>
                    <Settings size={24} color="#00FFCC" />
                    <h2 style={{
                        color: '#00FFCC',
                        fontSize: '20px',
                        fontFamily: 'Orbitron, monospace',
                        margin: 0
                    }}>
                        USER PREFERENCES
                    </h2>
                </div>

                {/* Favorites */}
                <div style={{ marginBottom: '24px' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#00FFCC',
                        fontSize: '14px',
                        marginBottom: '12px'
                    }}>
                        <Star size={16} />
                        <span>FAVORITES ({favorites.length})</span>
                    </div>
                    <div style={{
                        padding: '12px',
                        background: 'rgba(0, 255, 204, 0.05)',
                        border: '1px solid rgba(0, 255, 204, 0.3)',
                        borderRadius: '6px',
                        minHeight: '60px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px'
                    }}>
                        {favorites.length > 0 ? favorites.map(country => (
                            <div key={country} style={{
                                padding: '6px 12px',
                                background: 'rgba(255, 215, 0, 0.2)',
                                border: '1px solid rgba(255, 215, 0, 0.5)',
                                borderRadius: '4px',
                                color: '#FFD700',
                                fontSize: '12px'
                            }}>
                                {country}
                            </div>
                        )) : (
                            <div style={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: '12px' }}>
                                No favorites yet
                            </div>
                        )}
                    </div>
                </div>

                {/* Alert Settings */}
                <div style={{ marginBottom: '24px' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#00FFCC',
                        fontSize: '14px',
                        marginBottom: '12px'
                    }}>
                        <Bell size={16} />
                        <span>ALERT SETTINGS</span>
                    </div>
                    <div style={{
                        padding: '16px',
                        background: 'rgba(0, 255, 204, 0.05)',
                        border: '1px solid rgba(0, 255, 204, 0.3)',
                        borderRadius: '6px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                    }}>
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            color: '#00FFCC',
                            fontSize: '12px',
                            cursor: 'pointer'
                        }}>
                            <span>Sound Notifications</span>
                            <input
                                type="checkbox"
                                checked={localAlertSettings.sound}
                                onChange={(e) => setLocalAlertSettings({
                                    ...localAlertSettings,
                                    sound: e.target.checked
                                })}
                                style={{ cursor: 'pointer' }}
                            />
                        </label>
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            color: '#00FFCC',
                            fontSize: '12px',
                            cursor: 'pointer'
                        }}>
                            <span>Show Toast Notifications</span>
                            <input
                                type="checkbox"
                                checked={localAlertSettings.showToast}
                                onChange={(e) => setLocalAlertSettings({
                                    ...localAlertSettings,
                                    showToast: e.target.checked
                                })}
                                style={{ cursor: 'pointer' }}
                            />
                        </label>
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            color: '#00FFCC',
                            fontSize: '12px',
                            cursor: 'pointer'
                        }}>
                            <span>Auto-hide Notifications</span>
                            <input
                                type="checkbox"
                                checked={localAlertSettings.autoHide}
                                onChange={(e) => setLocalAlertSettings({
                                    ...localAlertSettings,
                                    autoHide: e.target.checked
                                })}
                                style={{ cursor: 'pointer' }}
                            />
                        </label>
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            color: '#00FFCC',
                            fontSize: '12px',
                            cursor: 'pointer'
                        }}>
                            <span>Critical Alerts Only</span>
                            <input
                                type="checkbox"
                                checked={localAlertSettings.criticalOnly}
                                onChange={(e) => setLocalAlertSettings({
                                    ...localAlertSettings,
                                    criticalOnly: e.target.checked
                                })}
                                style={{ cursor: 'pointer' }}
                            />
                        </label>
                    </div>
                </div>

                {/* Dashboard Layout */}
                <div style={{ marginBottom: '24px' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#00FFCC',
                        fontSize: '14px',
                        marginBottom: '12px'
                    }}>
                        <Layout size={16} />
                        <span>DASHBOARD LAYOUT</span>
                    </div>
                    <div style={{
                        padding: '16px',
                        background: 'rgba(0, 255, 204, 0.05)',
                        border: '1px solid rgba(0, 255, 204, 0.3)',
                        borderRadius: '6px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                    }}>
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            color: '#00FFCC',
                            fontSize: '12px',
                            cursor: 'pointer'
                        }}>
                            <span>Show Map</span>
                            <input
                                type="checkbox"
                                checked={localLayout.showMap}
                                onChange={(e) => setLocalLayout({
                                    ...localLayout,
                                    showMap: e.target.checked
                                })}
                                style={{ cursor: 'pointer' }}
                            />
                        </label>
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            color: '#00FFCC',
                            fontSize: '12px',
                            cursor: 'pointer'
                        }}>
                            <span>Show Alerts</span>
                            <input
                                type="checkbox"
                                checked={localLayout.showAlerts}
                                onChange={(e) => setLocalLayout({
                                    ...localLayout,
                                    showAlerts: e.target.checked
                                })}
                                style={{ cursor: 'pointer' }}
                            />
                        </label>
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            color: '#00FFCC',
                            fontSize: '12px',
                            cursor: 'pointer'
                        }}>
                            <span>Show News</span>
                            <input
                                type="checkbox"
                                checked={localLayout.showNews}
                                onChange={(e) => setLocalLayout({
                                    ...localLayout,
                                    showNews: e.target.checked
                                })}
                                style={{ cursor: 'pointer' }}
                            />
                        </label>
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            color: '#00FFCC',
                            fontSize: '12px',
                            cursor: 'pointer'
                        }}>
                            <span>Show Analytics</span>
                            <input
                                type="checkbox"
                                checked={localLayout.showAnalytics}
                                onChange={(e) => setLocalLayout({
                                    ...localLayout,
                                    showAnalytics: e.target.checked
                                })}
                                style={{ cursor: 'pointer' }}
                            />
                        </label>
                    </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        onClick={onClose}
                        style={{
                            flex: 1,
                            padding: '12px',
                            background: 'rgba(255, 0, 0, 0.1)',
                            border: '1px solid rgba(255, 0, 0, 0.3)',
                            borderRadius: '6px',
                            color: '#FF6B6B',
                            fontSize: '14px',
                            fontFamily: 'Orbitron, monospace',
                            cursor: 'pointer'
                        }}
                    >
                        CANCEL
                    </button>
                    <button
                        onClick={handleSave}
                        style={{
                            flex: 1,
                            padding: '12px',
                            background: 'rgba(0, 255, 204, 0.2)',
                            border: '1px solid #00FFCC',
                            borderRadius: '6px',
                            color: '#00FFCC',
                            fontSize: '14px',
                            fontFamily: 'Orbitron, monospace',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}
                    >
                        <Save size={16} />
                        SAVE PREFERENCES
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default UserPreferences;
