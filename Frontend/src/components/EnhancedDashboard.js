import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, FileText, ArrowLeftRight, BarChart3, Menu, X, Mail, ShieldCheck, Folder, Bell } from 'lucide-react';
import Dashboard from './Dashboard';
import SearchFilter from './SearchFilter';
import FilterPanel from './FilterPanel';
import AlertSystem from './AlertSystem';
import Analytics from './Analytics';
import CountryComparison from './CountryComparison';
import NewsPanel from './NewsPanel';
import ReportGenerator from './ReportGenerator';
import UserPreferences from './UserPreferences';
import ContactUs from './ContactUs';
import AdminDashboard from './AdminDashboard';
import GovernmentFiles from './GovernmentFiles';
import NotificationCenter from './NotificationCenter';
import { useApp } from '../context/AppContext';

const EnhancedDashboard = ({ agentName, onLogout }) => {
    const { alerts, favorites } = useApp();
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [showComparison, setShowComparison] = useState(false);
    const [showReport, setShowReport] = useState(false);
    const [showPreferences, setShowPreferences] = useState(false);
    const [showAnalytics, setShowAnalytics] = useState(false);
    const [showContact, setShowContact] = useState(false);
    const [showAdmin, setShowAdmin] = useState(false);
    const [showGovFiles, setShowGovFiles] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [filterPanelOpen, setFilterPanelOpen] = useState(false);
    const [activeFilters, setActiveFilters] = useState({});
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
    };

    const handleFilterChange = (filters) => {
        setActiveFilters(filters);
        // Apply filters to the dashboard
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
            {/* Alert System */}
            <AlertSystem alerts={alerts} />

            {/* Main Dashboard */}
            <Dashboard agentName={agentName} onLogout={onLogout} />

            {/* Floating Action Buttons */}
            <div style={{
                position: 'fixed',
                bottom: '24px',
                right: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                zIndex: 1000
            }}>
                {/* Analytics Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowAnalytics(!showAnalytics)}
                    style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: showAnalytics ? 'rgba(0, 255, 204, 0.3)' : 'rgba(0, 255, 204, 0.1)',
                        border: '2px solid #00FFCC',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                    }}
                    title="Analytics"
                >
                    <BarChart3 size={24} color="#00FFCC" />
                </motion.button>

                {/* Notification Bell Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowNotifications(true)}
                    style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: 'rgba(255, 165, 0, 0.2)',
                        border: '2px solid #FFA500',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                        position: 'relative'
                    }}
                    title="Notifications"
                >
                    <Bell size={24} color="#FFA500" />
                    {/* Unread indicator */}
                    <div style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: '#ff0000',
                        border: '2px solid #020617'
                    }} />
                </motion.button>

                {/* Contact Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowContact(true)}
                    style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: 'rgba(0, 255, 204, 0.1)',
                        border: '2px solid #00FFCC',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                    }}
                    title="Contact Us"
                >
                    <Mail size={24} color="#00FFCC" />
                </motion.button>

                {/* Comparison Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowComparison(true)}
                    style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: 'rgba(0, 255, 204, 0.1)',
                        border: '2px solid #00FFCC',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                    }}
                    title="Compare Countries"
                >
                    <ArrowLeftRight size={24} color="#00FFCC" />
                </motion.button>

                {/* Report Button */}
                {selectedCountry && (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowReport(true)}
                        style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '50%',
                            background: 'rgba(0, 255, 204, 0.1)',
                            border: '2px solid #00FFCC',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                        }}
                        title="Generate Report"
                    >
                        <FileText size={24} color="#00FFCC" />
                    </motion.button>
                )}

                {/* Settings Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowPreferences(true)}
                    style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: 'rgba(0, 255, 204, 0.1)',
                        border: '2px solid #00FFCC',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                    }}
                    title="Preferences"
                >
                    <Settings size={24} color="#00FFCC" />
                </motion.button>

                {/* Government Files Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowGovFiles(true)}
                    style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.3))',
                        border: '2px solid #3b82f6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
                    }}
                    title="Government Files"
                >
                    <Folder size={24} color="#3b82f6" />
                </motion.button>

                {/* Admin Dashboard Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowAdmin(true)}
                    style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(255, 165, 0, 0.2), rgba(255, 165, 0, 0.3))',
                        border: '2px solid #FFA500',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(255, 165, 0, 0.4)'
                    }}
                    title="Admin Dashboard"
                >
                    <ShieldCheck size={24} color="#FFA500" />
                </motion.button>
            </div>

            {/* Search & Filter Overlay */}
            <div style={{
                position: 'fixed',
                top: '100px',
                left: '24px',
                zIndex: 999,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                maxWidth: '400px'
            }}>
                <SearchFilter
                    onFilterChange={handleFilterChange}
                    onCountrySelect={handleCountrySelect}
                />
                <FilterPanel
                    onFilterChange={handleFilterChange}
                    isOpen={filterPanelOpen}
                    onToggle={() => setFilterPanelOpen(!filterPanelOpen)}
                />
            </div>

            {/* Analytics Panel */}
            {showAnalytics && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    style={{
                        position: 'fixed',
                        bottom: '100px',
                        right: '24px',
                        width: '600px',
                        maxHeight: '500px',
                        background: 'rgba(0, 20, 40, 0.98)',
                        border: '2px solid #00FFCC',
                        borderRadius: '12px',
                        padding: '20px',
                        zIndex: 998,
                        overflowY: 'auto'
                    }}
                >
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '16px'
                    }}>
                        <h3 style={{ color: '#00FFCC', fontSize: '16px', fontFamily: 'Orbitron, monospace' }}>
                            ANALYTICS
                        </h3>
                        <X
                            size={20}
                            color="#00FFCC"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setShowAnalytics(false)}
                        />
                    </div>
                    <Analytics selectedCountries={favorites.slice(0, 3)} />
                </motion.div>
            )}

            {/* News Panel */}
            {selectedCountry && (
                <div style={{
                    position: 'fixed',
                    bottom: '24px',
                    left: '24px',
                    zIndex: 997
                }}>
                    <NewsPanel country={selectedCountry} />
                </div>
            )}

            {/* Modals */}
            {showComparison && (
                <CountryComparison onClose={() => setShowComparison(false)} />
            )}

            {showReport && selectedCountry && (
                <ReportGenerator
                    country={selectedCountry}
                    onClose={() => setShowReport(false)}
                />
            )}

            {showPreferences && (
                <UserPreferences onClose={() => setShowPreferences(false)} />
            )}

            {showContact && (
                <ContactUs onBack={() => setShowContact(false)} />
            )}

            {showAdmin && (
                <AdminDashboard onClose={() => setShowAdmin(false)} />
            )}

            {showGovFiles && (
                <GovernmentFiles onBack={() => setShowGovFiles(false)} />
            )}

            {/* Notification Center */}
            <NotificationCenter
                isOpen={showNotifications}
                onClose={() => setShowNotifications(false)}
            />

            {/* Mobile Menu Toggle */}
            <div style={{
                position: 'fixed',
                top: '100px',
                right: '24px',
                zIndex: 1001,
                display: 'none'
            }}
                className="mobile-menu-toggle"
            >
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'rgba(0, 255, 204, 0.2)',
                        border: '2px solid #00FFCC',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                >
                    {mobileMenuOpen ? (
                        <X size={24} color="#00FFCC" />
                    ) : (
                        <Menu size={24} color="#00FFCC" />
                    )}
                </motion.button>
            </div>
        </div>
    );
};

export default EnhancedDashboard;
