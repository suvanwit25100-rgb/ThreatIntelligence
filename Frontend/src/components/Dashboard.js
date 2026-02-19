import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import {
    Globe, LogOut, AlertTriangle, Shield, DollarSign,
    Users, TrendingUp, Flag, MapPin, Zap, Target, Activity,
    Cpu, Radio, ShieldCheck, Bomb, Award, BarChart3
} from 'lucide-react';
import { countryData, getThreatColor, getThreatLabel } from '../data/countryData';

const geoUrl = "https://raw.githubusercontent.com/lotusms/world-map-data/master/world.json";

const Dashboard = ({ agentName = "AGENT SUVANWIT", onLogout }) => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [hoveredCountry, setHoveredCountry] = useState("");
    const [currentTime, setCurrentTime] = useState(new Date());

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Auto-select India on mount
    useEffect(() => {
        setSelectedCountry(countryData["India"]);
    }, []);

    const handleCountryClick = (geo) => {
        const countryName = geo.properties.name;
        const country = countryData[countryName];
        if (country) {
            setSelectedCountry(country);
        }
    };

    const getCountryFillColor = (geo) => {
        const countryName = geo.properties.name;
        const country = countryData[countryName];

        if (selectedCountry && selectedCountry.name === countryName) {
            return "#00FFCC";
        }

        if (hoveredCountry === countryName) {
            return "#0c1e33";
        }

        if (country) {
            const threatColor = getThreatColor(country.threatLevel);
            return threatColor + "20"; // Add transparency
        }

        return "#020617";
    };



    return (
        <div className="h-screen w-full bg-[#020617] text-[#00FFCC] overflow-hidden font-sans relative">
            {/* Animated Background Grid */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(#00FFCC 1px, transparent 1px), linear-gradient(90deg, #00FFCC 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }} />
            </div>

            {/* Top Navigation Bar */}
            <div className="relative z-50 bg-black/40 backdrop-blur-md border-b border-[#00FFCC]/20 px-8 py-4">
                <div className="flex items-center justify-between">
                    {/* Left: Logo & Title */}
                    <div className="flex items-center gap-6">
                        <Globe className="text-[#00FFCC]" size={32} />
                        <div>
                            <h1 className="text-2xl font-black uppercase tracking-tight text-white">Intelligence Dashboard</h1>
                            <p className="text-[8px] tracking-[0.3em] text-[#00FFCC]/40 uppercase font-mono">Global Threat Assessment System</p>
                        </div>
                    </div>

                    {/* Center: Time & Status */}
                    <div className="flex items-center gap-8 font-mono text-sm">
                        <div className="text-center">
                            <p className="text-[8px] text-[#00FFCC]/40 uppercase mb-1">System Time</p>
                            <p className="text-[#00FFCC] font-bold tabular-nums">{currentTime.toLocaleTimeString()}</p>
                        </div>
                        <div className="h-8 w-[1px] bg-[#00FFCC]/20" />
                        <div className="flex items-center gap-2">
                            <motion.div
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="h-2 w-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                            />
                            <span className="text-[8px] text-emerald-400 font-bold uppercase tracking-widest">Operational</span>
                        </div>
                    </div>

                    {/* Right: Agent Info & Logout */}
                    <div className="flex items-center gap-6">
                        <div className="text-right">
                            <p className="text-[8px] text-[#00FFCC]/40 uppercase mb-1">Logged In As</p>
                            <p className="text-white font-bold uppercase tracking-wide">{agentName}</p>
                        </div>
                        <button
                            onClick={onLogout}
                            className="px-6 py-2 border border-[#00FFCC]/30 text-[#00FFCC] text-xs font-bold uppercase tracking-wider hover:bg-[#00FFCC] hover:text-[#020617] transition-all flex items-center gap-2"
                        >
                            <LogOut size={14} />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="relative z-10 flex h-[calc(100vh-80px)]">
                {/* Left: Interactive Map */}
                <div className="flex-1 relative">
                    {/* Map Container */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-60">
                        <ComposableMap projection="geoMercator" projectionConfig={{ scale: 150, center: [0, 20] }} className="w-full h-full">
                            <Geographies geography={geoUrl}>
                                {({ geographies }) => geographies.map((geo) => (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        onClick={() => handleCountryClick(geo)}
                                        onMouseEnter={() => setHoveredCountry(geo.properties.name)}
                                        onMouseLeave={() => setHoveredCountry("")}
                                        stroke="#00FFCC"
                                        strokeWidth={0.5}
                                        fill={getCountryFillColor(geo)}
                                        className="outline-none transition-colors duration-300 cursor-pointer hover:opacity-80"
                                    />
                                ))}
                            </Geographies>

                            {/* Capital Markers */}
                            {Object.values(countryData).map((country) => (
                                <Marker key={country.code} coordinates={country.coords}>
                                    <circle
                                        r={3}
                                        fill={getThreatColor(country.threatLevel)}
                                        className="animate-pulse cursor-pointer"
                                        style={{ filter: `drop-shadow(0 0 6px ${getThreatColor(country.threatLevel)})` }}
                                        onClick={() => setSelectedCountry(country)}
                                    />
                                </Marker>
                            ))}
                        </ComposableMap>
                    </div>



                    {/* Selected Country Indicator */}
                    {selectedCountry && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute bottom-8 left-8 bg-black/60 backdrop-blur-md border-2 border-[#00FFCC]/30 p-6 w-80"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <Flag className="text-[#00FFCC]" size={32} />
                                <div className="flex-1">
                                    <h3 className="text-xl font-black uppercase text-white">{selectedCountry.name}</h3>
                                    <p className="text-xs text-[#00FFCC]/60 font-mono uppercase">{selectedCountry.capital}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-[#00FFCC]/20">
                                <span className="text-[8px] text-[#00FFCC]/40 uppercase font-mono">Threat Level</span>
                                <span
                                    className="text-xs font-black uppercase px-3 py-1"
                                    style={{
                                        color: getThreatColor(selectedCountry.threatLevel),
                                        backgroundColor: getThreatColor(selectedCountry.threatLevel) + '20'
                                    }}
                                >
                                    {getThreatLabel(selectedCountry.threatLevel)}
                                </span>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Right: Intelligence Panels */}
                <div className="w-[500px] bg-black/20 backdrop-blur-sm border-l border-[#00FFCC]/20 overflow-y-auto">
                    <AnimatePresence mode="wait">
                        {selectedCountry ? (
                            <motion.div
                                key={selectedCountry.code}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                className="p-6 space-y-4"
                            >
                                {/* Country Overview Panel */}
                                <IntelPanel
                                    icon={<Flag size={20} />}
                                    title="Country Overview"
                                    delay={0.1}
                                >
                                    <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                                        <DataItem label="Population" value={selectedCountry.population} />
                                        <DataItem label="Area" value={selectedCountry.area} />
                                        <DataItem label="GDP" value={selectedCountry.gdp} />
                                        <DataItem label="Growth" value={selectedCountry.gdpGrowth} valueColor="text-emerald-400" />
                                        <DataItem label="Government" value={selectedCountry.government} span={2} />
                                        <DataItem label="Leader" value={selectedCountry.leader} span={2} />
                                        <DataItem label="Title" value={selectedCountry.leaderTitle} span={2} />
                                    </div>
                                </IntelPanel>

                                {/* Threat Assessment Panel */}
                                <IntelPanel
                                    icon={<AlertTriangle size={20} />}
                                    title="Threat Assessment"
                                    delay={0.2}
                                >
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-[#00FFCC]/60 uppercase font-mono">Threat Score</span>
                                            <span
                                                className="text-2xl font-black tabular-nums"
                                                style={{ color: getThreatColor(selectedCountry.threatLevel) }}
                                            >
                                                {selectedCountry.threatScore}
                                            </span>
                                        </div>
                                        <div className="w-full h-2 bg-[#00FFCC]/10 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${selectedCountry.threatScore}%` }}
                                                transition={{ duration: 1, delay: 0.3 }}
                                                className="h-full"
                                                style={{ backgroundColor: getThreatColor(selectedCountry.threatLevel) }}
                                            />
                                        </div>
                                        {selectedCountry.riskFactors.length > 0 && (
                                            <div className="pt-4 border-t border-[#00FFCC]/10">
                                                <p className="text-[8px] text-[#00FFCC]/40 uppercase mb-2 font-mono">Risk Factors</p>
                                                <div className="space-y-1">
                                                    {selectedCountry.riskFactors.map((factor, idx) => (
                                                        <div key={idx} className="flex items-center gap-2 text-xs">
                                                            <div className="h-1 w-1 bg-red-400 rounded-full" />
                                                            <span className="text-[#00FFCC]/80">{factor}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </IntelPanel>

                                {/* Military Intelligence Panel */}
                                <IntelPanel
                                    icon={<Shield size={20} />}
                                    title="Military Intelligence"
                                    delay={0.3}
                                >
                                    <div className="space-y-3 text-xs font-mono">
                                        <DataItem label="Active Personnel" value={selectedCountry.military.personnel} />
                                        <DataItem label="Reserves" value={selectedCountry.military.reserves} />
                                        <DataItem label="Defense Budget" value={selectedCountry.military.budget} />
                                        <DataItem label="% of GDP" value={selectedCountry.military.budgetPercent} />
                                        <DataItem
                                            label="Nuclear Capable"
                                            value={selectedCountry.military.nuclear ? "YES" : "NO"}
                                            valueColor={selectedCountry.military.nuclear ? "text-red-400" : "text-emerald-400"}
                                        />
                                        {selectedCountry.military.nuclear && (
                                            <DataItem label="Nuclear Warheads" value={`~${selectedCountry.military.icbm}`} valueColor="text-red-400" />
                                        )}
                                        <div className="pt-3 border-t border-[#00FFCC]/10">
                                            <p className="text-[8px] text-[#00FFCC]/40 uppercase mb-2">Key Capabilities</p>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedCountry.military.capabilities.map((cap, idx) => (
                                                    <span key={idx} className="px-2 py-1 bg-[#00FFCC]/10 text-[#00FFCC] text-[10px] uppercase">
                                                        {cap}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </IntelPanel>

                                {/* Economic Profile Panel */}
                                <IntelPanel
                                    icon={<DollarSign size={20} />}
                                    title="Economic Profile"
                                    delay={0.4}
                                >
                                    <div className="space-y-3 text-xs font-mono">
                                        <DataItem label="GDP Growth" value={selectedCountry.economy.growth} valueColor="text-emerald-400" />
                                        <DataItem label="Unemployment" value={selectedCountry.economy.unemployment} />
                                        <DataItem label="Inflation" value={selectedCountry.economy.inflation} valueColor="text-amber-400" />
                                        <DataItem label="Exports" value={selectedCountry.economy.exports} />
                                        <DataItem label="Imports" value={selectedCountry.economy.imports} />
                                        <DataItem label="Currency" value={selectedCountry.economy.currency} />
                                        <div className="pt-3 border-t border-[#00FFCC]/10">
                                            <p className="text-[8px] text-[#00FFCC]/40 uppercase mb-2">Major Industries</p>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedCountry.economy.industries.map((ind, idx) => (
                                                    <span key={idx} className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] uppercase">
                                                        {ind}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </IntelPanel>

                                {/* Diplomatic Relations Panel */}
                                <IntelPanel
                                    icon={<Users size={20} />}
                                    title="Diplomatic Relations"
                                    delay={0.5}
                                >
                                    <div className="space-y-4 text-xs">
                                        <div>
                                            <p className="text-[8px] text-[#00FFCC]/40 uppercase mb-2 font-mono">Allies</p>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedCountry.relations.allies.map((ally, idx) => (
                                                    <span key={idx} className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] uppercase border border-emerald-500/30">
                                                        {ally}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[8px] text-[#00FFCC]/40 uppercase mb-2 font-mono">Tensions</p>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedCountry.relations.tensions.map((tension, idx) => (
                                                    <span key={idx} className="px-2 py-1 bg-red-500/20 text-red-400 text-[10px] uppercase border border-red-500/30">
                                                        {tension}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="pt-3 border-t border-[#00FFCC]/10">
                                            <DataItem label="Status" value={selectedCountry.relations.status} valueColor="text-[#00FFCC]" />
                                        </div>
                                    </div>
                                </IntelPanel>

                                {/* Recent Intelligence Panel */}
                                <IntelPanel
                                    icon={<Activity size={20} />}
                                    title="Recent Intelligence"
                                    delay={0.6}
                                >
                                    <div className="space-y-3">
                                        {selectedCountry.recentIntel.map((intel, idx) => (
                                            <div key={idx} className="pb-3 border-b border-[#00FFCC]/10 last:border-b-0 last:pb-0">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-[8px] text-[#00FFCC]/40 font-mono">{intel.date}</span>
                                                    <span
                                                        className={`text-[8px] font-bold uppercase px-2 py-0.5 ${intel.priority === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
                                                            intel.priority === 'HIGH' ? 'bg-amber-500/20 text-amber-400' :
                                                                'bg-[#00FFCC]/20 text-[#00FFCC]'
                                                            }`}
                                                    >
                                                        {intel.priority}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-white">{intel.event}</p>
                                            </div>
                                        ))}
                                    </div>
                                </IntelPanel>

                                {/* Strategic Assets Panel */}
                                <IntelPanel
                                    icon={<Target size={20} />}
                                    title="Strategic Assets"
                                    delay={0.7}
                                >
                                    <div className="space-y-2">
                                        {selectedCountry.strategicAssets.map((asset, idx) => (
                                            <div key={idx} className="flex items-center gap-3 text-xs">
                                                <Zap className="text-amber-400" size={14} />
                                                <span className="text-[#00FFCC]/80">{asset}</span>
                                            </div>
                                        ))}
                                    </div>
                                </IntelPanel>

                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full flex items-center justify-center p-8 text-center"
                            >
                                <div>
                                    <Globe className="text-[#00FFCC]/20 mx-auto mb-4" size={64} />
                                    <p className="text-[#00FFCC]/40 uppercase tracking-wider text-sm font-mono">
                                        Select a country to view intelligence
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

// Reusable Intelligence Panel Component
const IntelPanel = ({ icon, title, children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="bg-black/40 backdrop-blur-md border border-[#00FFCC]/20 p-5"
    >
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#00FFCC]/10">
            <div className="text-[#00FFCC]">{icon}</div>
            <h3 className="text-sm font-black uppercase tracking-wide text-white">{title}</h3>
        </div>
        {children}
    </motion.div>
);

// Reusable Data Item Component
const DataItem = ({ label, value, valueColor = "text-white", span = 1 }) => (
    <div className={`${span === 2 ? 'col-span-2' : ''}`}>
        <p className="text-[8px] text-[#00FFCC]/40 uppercase mb-1">{label}</p>
        <p className={`${valueColor} font-bold`}>{value}</p>
    </div>
);

export default Dashboard;
