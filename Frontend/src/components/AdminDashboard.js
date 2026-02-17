import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Bell, Activity, Shield, ArrowLeft } from 'lucide-react';
import UserManagement from './admin/UserManagement';
import AlertManagement from './admin/AlertManagement';
import SystemMonitor from './admin/SystemMonitor';

const AdminDashboard = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState('users');

    const tabs = [
        { id: 'users', label: 'User Management', icon: <Users size={20} /> },
        { id: 'alerts', label: 'Alert Management', icon: <Bell size={20} /> },
        { id: 'system', label: 'System Monitor', icon: <Activity size={20} /> }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'users':
                return <UserManagement />;
            case 'alerts':
                return <AlertManagement />;
            case 'system':
                return <SystemMonitor />;
            default:
                return <UserManagement />;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                background: 'linear-gradient(135deg, #001428 0%, #002040 50%, #001428 100%)',
                zIndex: 3000,
                overflow: 'hidden'
            }}
        >
            {/* Animated Background Grid */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `
                    linear-gradient(rgba(0, 255, 204, 0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 255, 204, 0.05) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
                opacity: 0.3,
                pointerEvents: 'none'
            }} />

            {/* Header */}
            <div style={{
                position: 'relative',
                background: 'rgba(0, 20, 40, 0.8)',
                borderBottom: '2px solid #00FFCC',
                padding: '20px 32px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 10
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                }}>
                    <Shield size={40} color="#00FFCC" />
                    <div>
                        <h1 style={{
                            color: '#00FFCC',
                            fontSize: '32px',
                            fontFamily: 'Orbitron, monospace',
                            fontWeight: 'bold',
                            margin: 0,
                            textShadow: '0 0 20px rgba(0, 255, 204, 0.5)'
                        }}>
                            ADMIN DASHBOARD
                        </h1>
                        <p style={{
                            color: '#00FFCC',
                            fontSize: '12px',
                            fontFamily: 'Rajdhani, sans-serif',
                            opacity: 0.7,
                            letterSpacing: '2px',
                            margin: 0
                        }}>
                            SYSTEM ADMINISTRATION & CONTROL CENTER
                        </p>
                    </div>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    style={{
                        background: 'rgba(0, 255, 204, 0.1)',
                        border: '2px solid #00FFCC',
                        borderRadius: '8px',
                        padding: '12px 24px',
                        color: '#00FFCC',
                        fontFamily: 'Orbitron, monospace',
                        fontSize: '14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontWeight: 'bold'
                    }}
                >
                    <ArrowLeft size={18} />
                    BACK TO DASHBOARD
                </motion.button>
            </div>

            {/* Tab Navigation */}
            <div style={{
                position: 'relative',
                background: 'rgba(0, 20, 40, 0.6)',
                borderBottom: '1px solid rgba(0, 255, 204, 0.2)',
                padding: '0 32px',
                display: 'flex',
                gap: '8px',
                zIndex: 10
            }}>
                {tabs.map((tab) => (
                    <motion.button
                        key={tab.id}
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 0 }}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            background: activeTab === tab.id
                                ? 'linear-gradient(180deg, rgba(0, 255, 204, 0.2), rgba(0, 255, 204, 0.1))'
                                : 'transparent',
                            border: 'none',
                            borderBottom: activeTab === tab.id ? '3px solid #00FFCC' : '3px solid transparent',
                            padding: '16px 24px',
                            color: activeTab === tab.id ? '#00FFCC' : '#00FFCC80',
                            fontFamily: 'Orbitron, monospace',
                            fontSize: '13px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontWeight: 'bold',
                            letterSpacing: '1px',
                            transition: 'all 0.3s'
                        }}
                    >
                        {tab.icon}
                        {tab.label}
                    </motion.button>
                ))}
            </div>

            {/* Content Area */}
            <div style={{
                position: 'relative',
                height: 'calc(100vh - 140px)',
                overflowY: 'auto',
                zIndex: 1
            }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default AdminDashboard;
