import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, AlertTriangle, CheckCircle, XCircle, Clock, Filter, Trash2 } from 'lucide-react';

const AlertManagement = () => {
    const [alerts, setAlerts] = useState([
        {
            id: 1,
            type: 'CRITICAL',
            title: 'Nuclear Threat Detected',
            message: 'Unusual nuclear activity detected in North Korea',
            country: 'North Korea',
            timestamp: '2026-02-17 14:45:00',
            status: 'Active',
            priority: 1
        },
        {
            id: 2,
            type: 'HIGH',
            title: 'Military Buildup',
            message: 'Significant military troop movement near border regions',
            country: 'Russia',
            timestamp: '2026-02-17 13:30:00',
            status: 'Active',
            priority: 2
        },
        {
            id: 3,
            type: 'MEDIUM',
            title: 'Economic Sanctions',
            message: 'New economic sanctions imposed affecting trade relations',
            country: 'Iran',
            timestamp: '2026-02-17 12:15:00',
            status: 'Resolved',
            priority: 3
        },
        {
            id: 4,
            type: 'LOW',
            title: 'Diplomatic Meeting',
            message: 'Scheduled high-level diplomatic talks announced',
            country: 'China',
            timestamp: '2026-02-17 10:00:00',
            status: 'Active',
            priority: 4
        }
    ]);

    const [filterType, setFilterType] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');

    const filteredAlerts = alerts.filter(alert => {
        const typeMatch = filterType === 'All' || alert.type === filterType;
        const statusMatch = filterStatus === 'All' || alert.status === filterStatus;
        return typeMatch && statusMatch;
    });

    const getAlertColor = (type) => {
        switch (type) {
            case 'CRITICAL': return '#FF0000';
            case 'HIGH': return '#FFA500';
            case 'MEDIUM': return '#FFFF00';
            case 'LOW': return '#00FF00';
            default: return '#00FFCC';
        }
    };

    const getAlertIcon = (type) => {
        switch (type) {
            case 'CRITICAL': return <XCircle size={20} />;
            case 'HIGH': return <AlertTriangle size={20} />;
            case 'MEDIUM': return <Bell size={20} />;
            case 'LOW': return <CheckCircle size={20} />;
            default: return <Bell size={20} />;
        }
    };

    const handleResolveAlert = (id) => {
        setAlerts(alerts.map(alert =>
            alert.id === id ? { ...alert, status: 'Resolved' } : alert
        ));
    };

    const handleDeleteAlert = (id) => {
        setAlerts(alerts.filter(alert => alert.id !== id));
    };

    return (
        <div style={{ padding: '24px' }}>
            {/* Header */}
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{
                    color: '#00FFCC',
                    fontSize: '28px',
                    fontFamily: 'Orbitron, monospace',
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <Bell size={32} />
                    ALERT MANAGEMENT
                </h2>
                <p style={{
                    color: '#00FFCC',
                    fontSize: '12px',
                    fontFamily: 'Rajdhani, sans-serif',
                    opacity: 0.6,
                    letterSpacing: '2px'
                }}>
                    MONITOR & MANAGE REAL-TIME THREAT ALERTS
                </p>
            </div>

            {/* Stats */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '16px',
                marginBottom: '32px'
            }}>
                <AlertStatCard
                    label="Critical Alerts"
                    value={alerts.filter(a => a.type === 'CRITICAL' && a.status === 'Active').length}
                    color="#FF0000"
                />
                <AlertStatCard
                    label="High Priority"
                    value={alerts.filter(a => a.type === 'HIGH' && a.status === 'Active').length}
                    color="#FFA500"
                />
                <AlertStatCard
                    label="Active Alerts"
                    value={alerts.filter(a => a.status === 'Active').length}
                    color="#00FFCC"
                />
                <AlertStatCard
                    label="Resolved Today"
                    value={alerts.filter(a => a.status === 'Resolved').length}
                    color="#00FF00"
                />
            </div>

            {/* Filters */}
            <div style={{
                display: 'flex',
                gap: '16px',
                marginBottom: '24px',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Filter size={20} color="#00FFCC" />
                    <span style={{
                        color: '#00FFCC',
                        fontSize: '12px',
                        fontFamily: 'Rajdhani, sans-serif',
                        letterSpacing: '1px'
                    }}>
                        FILTERS:
                    </span>
                </div>
                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    style={{
                        padding: '8px 16px',
                        background: 'rgba(0, 255, 204, 0.05)',
                        border: '1px solid rgba(0, 255, 204, 0.3)',
                        borderRadius: '6px',
                        color: '#FFFFFF',
                        fontFamily: 'Rajdhani, sans-serif',
                        fontSize: '12px',
                        outline: 'none',
                        cursor: 'pointer'
                    }}
                >
                    <option value="All" style={{ background: '#001428' }}>All Types</option>
                    <option value="CRITICAL" style={{ background: '#001428' }}>Critical</option>
                    <option value="HIGH" style={{ background: '#001428' }}>High</option>
                    <option value="MEDIUM" style={{ background: '#001428' }}>Medium</option>
                    <option value="LOW" style={{ background: '#001428' }}>Low</option>
                </select>
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    style={{
                        padding: '8px 16px',
                        background: 'rgba(0, 255, 204, 0.05)',
                        border: '1px solid rgba(0, 255, 204, 0.3)',
                        borderRadius: '6px',
                        color: '#FFFFFF',
                        fontFamily: 'Rajdhani, sans-serif',
                        fontSize: '12px',
                        outline: 'none',
                        cursor: 'pointer'
                    }}
                >
                    <option value="All" style={{ background: '#001428' }}>All Status</option>
                    <option value="Active" style={{ background: '#001428' }}>Active</option>
                    <option value="Resolved" style={{ background: '#001428' }}>Resolved</option>
                </select>
            </div>

            {/* Alerts List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {filteredAlerts.map((alert, index) => (
                    <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        style={{
                            background: 'rgba(0, 20, 40, 0.6)',
                            border: `2px solid ${getAlertColor(alert.type)}40`,
                            borderLeft: `4px solid ${getAlertColor(alert.type)}`,
                            borderRadius: '8px',
                            padding: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px'
                        }}
                    >
                        {/* Icon */}
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: `${getAlertColor(alert.type)}20`,
                            border: `2px solid ${getAlertColor(alert.type)}`,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: getAlertColor(alert.type)
                        }}>
                            {getAlertIcon(alert.type)}
                        </div>

                        {/* Content */}
                        <div style={{ flex: 1 }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                marginBottom: '8px'
                            }}>
                                <h3 style={{
                                    color: '#FFFFFF',
                                    fontSize: '16px',
                                    fontFamily: 'Orbitron, monospace',
                                    fontWeight: 'bold',
                                    margin: 0
                                }}>
                                    {alert.title}
                                </h3>
                                <span style={{
                                    padding: '4px 12px',
                                    background: `${getAlertColor(alert.type)}20`,
                                    border: `1px solid ${getAlertColor(alert.type)}`,
                                    borderRadius: '4px',
                                    fontSize: '10px',
                                    fontWeight: 'bold',
                                    color: getAlertColor(alert.type),
                                    fontFamily: 'Orbitron, monospace'
                                }}>
                                    {alert.type}
                                </span>
                                <span style={{
                                    padding: '4px 12px',
                                    background: alert.status === 'Active' ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 255, 0, 0.1)',
                                    border: alert.status === 'Active' ? '1px solid #FF0000' : '1px solid #00FF00',
                                    borderRadius: '4px',
                                    fontSize: '10px',
                                    fontWeight: 'bold',
                                    color: alert.status === 'Active' ? '#FF0000' : '#00FF00',
                                    fontFamily: 'Orbitron, monospace'
                                }}>
                                    {alert.status}
                                </span>
                            </div>
                            <p style={{
                                color: '#FFFFFF',
                                fontSize: '14px',
                                fontFamily: 'Rajdhani, sans-serif',
                                margin: '0 0 8px 0',
                                opacity: 0.9
                            }}>
                                {alert.message}
                            </p>
                            <div style={{
                                display: 'flex',
                                gap: '16px',
                                fontSize: '12px',
                                color: '#00FFCC',
                                fontFamily: 'Rajdhani, sans-serif',
                                opacity: 0.7
                            }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Clock size={14} />
                                    {alert.timestamp}
                                </span>
                                <span>Country: {alert.country}</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {alert.status === 'Active' && (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleResolveAlert(alert.id)}
                                    style={{
                                        background: 'rgba(0, 255, 0, 0.1)',
                                        border: '1px solid rgba(0, 255, 0, 0.5)',
                                        borderRadius: '6px',
                                        padding: '8px 16px',
                                        color: '#00FF00',
                                        fontFamily: 'Orbitron, monospace',
                                        fontSize: '11px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    RESOLVE
                                </motion.button>
                            )}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDeleteAlert(alert.id)}
                                style={{
                                    background: 'rgba(255, 0, 0, 0.1)',
                                    border: '1px solid rgba(255, 0, 0, 0.5)',
                                    borderRadius: '6px',
                                    padding: '8px 16px',
                                    color: '#FF0000',
                                    fontFamily: 'Orbitron, monospace',
                                    fontSize: '11px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    fontWeight: 'bold'
                                }}
                            >
                                <Trash2 size={14} />
                                DELETE
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const AlertStatCard = ({ label, value, color }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        style={{
            background: 'rgba(0, 20, 40, 0.6)',
            border: `2px solid ${color}40`,
            borderRadius: '8px',
            padding: '20px',
            textAlign: 'center'
        }}
    >
        <p style={{
            color: color,
            fontSize: '32px',
            fontFamily: 'Orbitron, monospace',
            fontWeight: 'bold',
            marginBottom: '8px'
        }}>
            {value}
        </p>
        <p style={{
            color: '#00FFCC',
            fontSize: '11px',
            fontFamily: 'Rajdhani, sans-serif',
            opacity: 0.7,
            letterSpacing: '1px',
            textTransform: 'uppercase'
        }}>
            {label}
        </p>
    </motion.div>
);

export default AlertManagement;
