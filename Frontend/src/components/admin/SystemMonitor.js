import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Cpu, HardDrive, Wifi, Server, TrendingUp, Clock, CheckCircle } from 'lucide-react';

const SystemMonitor = () => {
    // Mock system data
    const systemStats = {
        uptime: '45 days, 12 hours',
        cpuUsage: 34,
        memoryUsage: 62,
        diskUsage: 48,
        networkStatus: 'Optimal',
        activeConnections: 1247,
        requestsPerSecond: 856,
        avgResponseTime: '124ms'
    };

    const recentLogs = [
        { id: 1, timestamp: '2026-02-17 15:15:30', type: 'INFO', message: 'User authentication successful: AGENT SUVANWIT' },
        { id: 2, timestamp: '2026-02-17 15:14:22', type: 'WARNING', message: 'High CPU usage detected: 89%' },
        { id: 3, timestamp: '2026-02-17 15:12:15', type: 'INFO', message: 'Database backup completed successfully' },
        { id: 4, timestamp: '2026-02-17 15:10:05', type: 'ERROR', message: 'Failed API request to external service' },
        { id: 5, timestamp: '2026-02-17 15:08:42', type: 'INFO', message: 'New alert created: Military Buildup' },
        { id: 6, timestamp: '2026-02-17 15:05:18', type: 'INFO', message: 'Data sync completed for 45 countries' }
    ];

    const getLogColor = (type) => {
        switch (type) {
            case 'ERROR': return '#FF0000';
            case 'WARNING': return '#FFA500';
            case 'INFO': return '#00FFCC';
            default: return '#FFFFFF';
        }
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
                    <Activity size={32} />
                    SYSTEM MONITOR
                </h2>
                <p style={{
                    color: '#00FFCC',
                    fontSize: '12px',
                    fontFamily: 'Rajdhani, sans-serif',
                    opacity: 0.6,
                    letterSpacing: '2px'
                }}>
                    REAL-TIME SYSTEM HEALTH & PERFORMANCE METRICS
                </p>
            </div>

            {/* System Status Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '16px',
                marginBottom: '32px'
            }}>
                <StatusCard
                    icon={<Clock size={24} />}
                    label="System Uptime"
                    value={systemStats.uptime}
                    color="#00FF00"
                />
                <StatusCard
                    icon={<Wifi size={24} />}
                    label="Network Status"
                    value={systemStats.networkStatus}
                    color="#00FFCC"
                />
                <StatusCard
                    icon={<Server size={24} />}
                    label="Active Connections"
                    value={systemStats.activeConnections.toLocaleString()}
                    color="#FFA500"
                />
                <StatusCard
                    icon={<TrendingUp size={24} />}
                    label="Requests/Sec"
                    value={systemStats.requestsPerSecond.toLocaleString()}
                    color="#FFFF00"
                />
            </div>

            {/* Resource Usage */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                marginBottom: '32px'
            }}>
                <ResourceCard
                    icon={<Cpu size={24} />}
                    label="CPU Usage"
                    percentage={systemStats.cpuUsage}
                    color="#00FFCC"
                />
                <ResourceCard
                    icon={<Activity size={24} />}
                    label="Memory Usage"
                    percentage={systemStats.memoryUsage}
                    color="#FFA500"
                />
                <ResourceCard
                    icon={<HardDrive size={24} />}
                    label="Disk Usage"
                    percentage={systemStats.diskUsage}
                    color="#00FF00"
                />
            </div>

            {/* System Logs */}
            <div style={{
                background: 'rgba(0, 20, 40, 0.6)',
                border: '2px solid rgba(0, 255, 204, 0.3)',
                borderRadius: '12px',
                padding: '24px'
            }}>
                <h3 style={{
                    color: '#00FFCC',
                    fontSize: '18px',
                    fontFamily: 'Orbitron, monospace',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <CheckCircle size={20} />
                    SYSTEM LOGS
                </h3>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    maxHeight: '400px',
                    overflowY: 'auto'
                }}>
                    {recentLogs.map((log) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            style={{
                                padding: '12px',
                                background: 'rgba(0, 255, 204, 0.03)',
                                border: '1px solid rgba(0, 255, 204, 0.1)',
                                borderLeft: `3px solid ${getLogColor(log.type)}`,
                                borderRadius: '4px',
                                display: 'flex',
                                gap: '12px',
                                alignItems: 'center'
                            }}
                        >
                            <span style={{
                                padding: '4px 8px',
                                background: `${getLogColor(log.type)}20`,
                                border: `1px solid ${getLogColor(log.type)}`,
                                borderRadius: '4px',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                color: getLogColor(log.type),
                                fontFamily: 'Orbitron, monospace',
                                minWidth: '70px',
                                textAlign: 'center'
                            }}>
                                {log.type}
                            </span>
                            <span style={{
                                color: '#00FFCC',
                                fontSize: '11px',
                                fontFamily: 'Rajdhani, sans-serif',
                                opacity: 0.7,
                                minWidth: '140px'
                            }}>
                                {log.timestamp}
                            </span>
                            <span style={{
                                color: '#FFFFFF',
                                fontSize: '13px',
                                fontFamily: 'Rajdhani, sans-serif',
                                flex: 1
                            }}>
                                {log.message}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const StatusCard = ({ icon, label, value, color }) => (
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
        <div style={{
            color: color,
            marginBottom: '12px',
            display: 'flex',
            justifyContent: 'center'
        }}>
            {icon}
        </div>
        <p style={{
            color: color,
            fontSize: '20px',
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

const ResourceCard = ({ icon, label, percentage, color }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        style={{
            background: 'rgba(0, 20, 40, 0.6)',
            border: `2px solid ${color}40`,
            borderRadius: '8px',
            padding: '20px'
        }}
    >
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: color
            }}>
                {icon}
                <span style={{
                    fontSize: '14px',
                    fontFamily: 'Orbitron, monospace',
                    fontWeight: 'bold'
                }}>
                    {label}
                </span>
            </div>
            <span style={{
                color: color,
                fontSize: '24px',
                fontFamily: 'Orbitron, monospace',
                fontWeight: 'bold'
            }}>
                {percentage}%
            </span>
        </div>
        <div style={{
            width: '100%',
            height: '8px',
            background: 'rgba(0, 255, 204, 0.1)',
            borderRadius: '4px',
            overflow: 'hidden'
        }}>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{
                    height: '100%',
                    background: `linear-gradient(90deg, ${color}, ${color}CC)`,
                    borderRadius: '4px'
                }}
            />
        </div>
    </motion.div>
);

export default SystemMonitor;
