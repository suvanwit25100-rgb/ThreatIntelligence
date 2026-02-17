import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, AlertTriangle, Info, Shield, Zap, Check, Trash2 } from 'lucide-react';

const NotificationCenter = ({ isOpen, onClose }) => {
    const [notifications, setNotifications] = useState([]);
    const [filter, setFilter] = useState('all');

    // Initialize with sample notifications
    useEffect(() => {
        const sampleNotifications = [
            {
                id: 1,
                type: 'threat',
                title: 'High Threat Alert: Border Activity',
                message: 'Unusual military movement detected near LAC. Immediate assessment required.',
                timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
                read: false,
                priority: 'high'
            },
            {
                id: 2,
                type: 'intel',
                title: 'Intelligence Update: Diplomatic Relations',
                message: 'New strategic partnership agreement signed with Australia.',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
                read: false,
                priority: 'medium'
            },
            {
                id: 3,
                type: 'system',
                title: 'System Update',
                message: 'Security protocols updated. New encryption standards implemented.',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
                read: true,
                priority: 'low'
            },
            {
                id: 4,
                type: 'threat',
                title: 'Cyber Threat Detected',
                message: 'CERT-In reports increased phishing attempts targeting government networks.',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
                read: true,
                priority: 'high'
            },
            {
                id: 5,
                type: 'intel',
                title: 'DRDO: Missile Test Successful',
                message: 'Agni-V test launch completed successfully. All parameters nominal.',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
                read: true,
                priority: 'medium'
            },
            {
                id: 6,
                type: 'system',
                title: 'New Documents Available',
                message: '12 new classified documents added to Government Repository.',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
                read: true,
                priority: 'low'
            }
        ];

        const saved = localStorage.getItem('notifications');
        if (saved) {
            setNotifications(JSON.parse(saved));
        } else {
            setNotifications(sampleNotifications);
            localStorage.setItem('notifications', JSON.stringify(sampleNotifications));
        }
    }, []);

    const getIcon = (type) => {
        switch (type) {
            case 'threat': return AlertTriangle;
            case 'intel': return Shield;
            case 'system': return Info;
            default: return Bell;
        }
    };

    const getColor = (type, priority) => {
        if (priority === 'high') return 'text-red-500 bg-red-500/20 border-red-500/50';
        if (type === 'threat') return 'text-orange-500 bg-orange-500/20 border-orange-500/50';
        if (type === 'intel') return 'text-cyan-500 bg-cyan-500/20 border-cyan-500/50';
        return 'text-gray-500 bg-gray-500/20 border-gray-500/50';
    };

    const markAsRead = (id) => {
        const updated = notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        );
        setNotifications(updated);
        localStorage.setItem('notifications', JSON.stringify(updated));
    };

    const markAllAsRead = () => {
        const updated = notifications.map(n => ({ ...n, read: true }));
        setNotifications(updated);
        localStorage.setItem('notifications', JSON.stringify(updated));
    };

    const deleteNotification = (id) => {
        const updated = notifications.filter(n => n.id !== id);
        setNotifications(updated);
        localStorage.setItem('notifications', JSON.stringify(updated));
    };

    const clearAll = () => {
        setNotifications([]);
        localStorage.setItem('notifications', JSON.stringify([]));
    };

    const getTimeAgo = (timestamp) => {
        const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
        if (seconds < 60) return `${seconds}s ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        return `${days}d ago`;
    };

    const filteredNotifications = filter === 'all'
        ? notifications
        : filter === 'unread'
            ? notifications.filter(n => !n.read)
            : notifications.filter(n => n.type === filter);

    const unreadCount = notifications.filter(n => !n.read).length;

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-start justify-end bg-black/50 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ x: 400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 400, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#020617] border-2 border-[#00FFCC]/30 w-full max-w-md h-[90vh] flex flex-col"
            >
                {/* Header */}
                <div className="bg-black/40 backdrop-blur-md border-b border-[#00FFCC]/20 p-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Bell className="text-[#00FFCC]" size={24} />
                            <div>
                                <h2 className="text-xl font-black uppercase text-white">Notifications</h2>
                                <p className="text-[8px] text-[#00FFCC]/60 uppercase font-mono">
                                    {unreadCount} Unread
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-[#00FFCC]/60 hover:text-[#00FFCC] transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2 flex-wrap">
                        {['all', 'unread', 'threat', 'intel', 'system'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-all ${filter === f
                                        ? 'bg-[#00FFCC] text-[#020617]'
                                        : 'border border-[#00FFCC]/30 text-[#00FFCC] hover:bg-[#00FFCC]/10'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Notifications List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    <AnimatePresence>
                        {filteredNotifications.length === 0 ? (
                            <div className="text-center py-12">
                                <Bell className="mx-auto mb-4 text-[#00FFCC]/20" size={48} />
                                <p className="text-[#00FFCC]/40 text-sm">No notifications</p>
                            </div>
                        ) : (
                            filteredNotifications.map((notification, idx) => {
                                const IconComponent = getIcon(notification.type);
                                return (
                                    <motion.div
                                        key={notification.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className={`bg-black/40 border p-4 transition-all ${notification.read
                                                ? 'border-[#00FFCC]/10 opacity-60'
                                                : 'border-[#00FFCC]/30'
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`p-2 border ${getColor(notification.type, notification.priority)}`}>
                                                <IconComponent size={16} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2 mb-1">
                                                    <h3 className="text-sm font-bold text-white">
                                                        {notification.title}
                                                    </h3>
                                                    <span className="text-[8px] text-[#00FFCC]/40 uppercase font-mono whitespace-nowrap">
                                                        {getTimeAgo(notification.timestamp)}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-[#00FFCC]/60 mb-3">
                                                    {notification.message}
                                                </p>
                                                <div className="flex gap-2">
                                                    {!notification.read && (
                                                        <button
                                                            onClick={() => markAsRead(notification.id)}
                                                            className="px-2 py-1 text-[8px] font-bold uppercase border border-[#00FFCC]/30 text-[#00FFCC] hover:bg-[#00FFCC]/10 transition-all flex items-center gap-1"
                                                        >
                                                            <Check size={10} />
                                                            Mark Read
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => deleteNotification(notification.id)}
                                                        className="px-2 py-1 text-[8px] font-bold uppercase border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-all flex items-center gap-1"
                                                    >
                                                        <Trash2 size={10} />
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer Actions */}
                {notifications.length > 0 && (
                    <div className="bg-black/40 backdrop-blur-md border-t border-[#00FFCC]/20 p-4 flex gap-2">
                        <button
                            onClick={markAllAsRead}
                            className="flex-1 py-2 border border-[#00FFCC]/30 text-[#00FFCC] text-xs font-bold uppercase hover:bg-[#00FFCC]/10 transition-all"
                        >
                            Mark All Read
                        </button>
                        <button
                            onClick={clearAll}
                            className="flex-1 py-2 border border-red-500/30 text-red-500 text-xs font-bold uppercase hover:bg-red-500/10 transition-all"
                        >
                            Clear All
                        </button>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default NotificationCenter;
