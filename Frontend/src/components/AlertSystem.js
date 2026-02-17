import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Bell, Volume2, VolumeX } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as storage from '../utils/storage';

const AlertSystem = ({ alerts = [], onDismiss }) => {
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [settings, setSettings] = useState(storage.getAlertSettings());

    useEffect(() => {
        setSoundEnabled(settings.sound);
    }, [settings]);

    useEffect(() => {
        // Show toast for new alerts
        if (alerts.length > 0 && settings.showToast) {
            const latestAlert = alerts[0];
            showToast(latestAlert);
        }
    }, [alerts]);

    const showToast = (alert) => {
        const priorityColors = {
            CRITICAL: '#DC2626',
            HIGH: '#F87171',
            MEDIUM: '#FBBF24',
            LOW: '#34D399'
        };

        toast(
            <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                <AlertTriangle size={20} color={priorityColors[alert.priority]} />
                <div>
                    <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                        {alert.country}
                    </div>
                    <div style={{ fontSize: '13px', opacity: 0.9 }}>
                        {alert.event}
                    </div>
                </div>
            </div>,
            {
                position: 'top-right',
                autoClose: settings.autoHide ? 5000 : false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style: {
                    background: 'rgba(0, 20, 40, 0.95)',
                    border: `1px solid ${priorityColors[alert.priority]}`,
                    color: '#fff'
                }
            }
        );

        // Play sound if enabled
        if (soundEnabled && settings.sound) {
            playAlertSound(alert.priority);
        }
    };

    const playAlertSound = (priority) => {
        // Simple beep using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            // Different frequencies for different priorities
            const frequencies = {
                CRITICAL: 800,
                HIGH: 600,
                MEDIUM: 400,
                LOW: 300
            };

            oscillator.frequency.value = frequencies[priority] || 400;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (error) {
            console.error('Error playing alert sound:', error);
        }
    };

    const toggleSound = () => {
        const newSettings = { ...settings, sound: !soundEnabled };
        setSoundEnabled(!soundEnabled);
        setSettings(newSettings);
        storage.setAlertSettings(newSettings);
    };

    const getPriorityColor = (priority) => {
        const colors = {
            CRITICAL: '#DC2626',
            HIGH: '#F87171',
            MEDIUM: '#FBBF24',
            LOW: '#34D399'
        };
        return colors[priority] || '#00FFCC';
    };

    return (
        <>
            <ToastContainer />

            {/* Floating Alert Badge */}
            {alerts.length > 0 && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{
                        position: 'fixed',
                        top: '20px',
                        right: '20px',
                        zIndex: 9999,
                        display: 'flex',
                        gap: '12px'
                    }}
                >
                    {/* Sound Toggle */}
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleSound}
                        style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            background: soundEnabled ? 'rgba(0, 255, 204, 0.2)' : 'rgba(255, 0, 0, 0.2)',
                            border: `2px solid ${soundEnabled ? '#00FFCC' : '#FF6B6B'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                        }}
                    >
                        {soundEnabled ? (
                            <Volume2 size={24} color="#00FFCC" />
                        ) : (
                            <VolumeX size={24} color="#FF6B6B" />
                        )}
                    </motion.div>

                    {/* Alert Count Badge */}
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        animate={{
                            boxShadow: [
                                '0 0 0 0 rgba(220, 38, 38, 0.7)',
                                '0 0 0 10px rgba(220, 38, 38, 0)',
                            ]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: 'loop'
                        }}
                        style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            background: 'rgba(220, 38, 38, 0.2)',
                            border: '2px solid #DC2626',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            position: 'relative'
                        }}
                    >
                        <Bell size={24} color="#DC2626" />
                        <div style={{
                            position: 'absolute',
                            top: '-4px',
                            right: '-4px',
                            background: '#DC2626',
                            color: '#fff',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10px',
                            fontWeight: 'bold'
                        }}>
                            {alerts.length}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};

export default AlertSystem;
