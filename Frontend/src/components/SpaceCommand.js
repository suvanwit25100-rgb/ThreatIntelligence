import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Satellite, Radio, Shield, AlertTriangle, Activity,
    ChevronRight, Target, Rocket, Globe, Wifi, Eye,
    Lock, CheckCircle, XCircle, Clock, Zap, Navigation,
    MapPin, Signal, RefreshCw, Crosshair, Layers, Orbit,
    ArrowUpRight, BarChart3, Sun, CloudLightning, Gauge
} from 'lucide-react';

const SATELLITES = [
    { id: 'GSAT-7', name: 'GSAT-7 (Rukmini)', type: 'MILITARY', subtype: 'Naval Communication', orbit: 'GEO', altitude: '35,786 km', status: 'OPERATIONAL', coverage: 'Indian Ocean Region', launchDate: '2013-08-30', inclination: '0.06°', period: '23h 56m', transponders: 'UHF, S-band, C-band, Ku-band', operator: 'Indian Navy' },
    { id: 'GSAT-7A', name: 'GSAT-7A', type: 'MILITARY', subtype: 'Air Force Communication', orbit: 'GEO', altitude: '35,786 km', status: 'OPERATIONAL', coverage: 'Indian Subcontinent', launchDate: '2018-12-19', inclination: '0.04°', period: '23h 56m', transponders: 'Ku-band, S-band', operator: 'Indian Air Force' },
    { id: 'CARTOSAT-3', name: 'Cartosat-3', type: 'MILITARY', subtype: 'High-Res Imaging', orbit: 'LEO', altitude: '509 km', status: 'OPERATIONAL', coverage: 'Global (Sun-Synchronous)', launchDate: '2019-11-27', inclination: '97.5°', period: '94.8m', transponders: 'Panchromatic 0.25m, MX 1.13m', operator: 'ISRO / Defence' },
    { id: 'RISAT-2BR1', name: 'RISAT-2BR1', type: 'MILITARY', subtype: 'Radar Imaging (SAR)', orbit: 'LEO', altitude: '556 km', status: 'OPERATIONAL', coverage: 'All-weather, Day/Night', launchDate: '2019-12-11', inclination: '37°', period: '95.6m', transponders: 'X-band SAR (0.35m resolution)', operator: 'ISRO / R&AW' },
    { id: 'EMISAT', name: 'EMISAT', type: 'MILITARY', subtype: 'ELINT / SIGINT', orbit: 'LEO', altitude: '748 km', status: 'OPERATIONAL', coverage: 'Electromagnetic Surveillance', launchDate: '2019-04-01', inclination: '98.4°', period: '99.9m', transponders: 'Kautilya ELINT Payload', operator: 'DRDO / DIA' },
    { id: 'MICROSAT-R', name: 'Microsat-R', type: 'MILITARY', subtype: 'Imaging (Classified)', orbit: 'LEO', altitude: '274 km', status: 'DEGRADED', coverage: 'Classified Orbit', launchDate: '2019-01-24', inclination: '96.6°', period: '89.8m', transponders: 'Classified Payload', operator: 'DRDO' },
    { id: 'IRNSS-1A', name: 'NavIC-1A (IRNSS-1A)', type: 'NAVIGATION', subtype: 'NavIC Constellation', orbit: 'GEO', altitude: '35,786 km', status: 'DEGRADED', coverage: '1,500 km around India', launchDate: '2013-07-01', inclination: '29°', period: '23h 56m', transponders: 'L5, S-band Navigation', operator: 'ISRO' },
    { id: 'IRNSS-1B', name: 'NavIC-1B (IRNSS-1B)', type: 'NAVIGATION', subtype: 'NavIC Constellation', orbit: 'GEO', altitude: '35,786 km', status: 'OPERATIONAL', coverage: '1,500 km around India', launchDate: '2014-04-04', inclination: '29°', period: '23h 56m', transponders: 'L5, S-band Navigation', operator: 'ISRO' },
    { id: 'IRNSS-1C', name: 'NavIC-1C (IRNSS-1C)', type: 'NAVIGATION', subtype: 'NavIC Constellation', orbit: 'GEO', altitude: '35,786 km', status: 'OPERATIONAL', coverage: '1,500 km around India', launchDate: '2014-10-16', inclination: '5°', period: '23h 56m', transponders: 'L5, S-band Navigation', operator: 'ISRO' },
    { id: 'IRNSS-1D', name: 'NavIC-1D (IRNSS-1D)', type: 'NAVIGATION', subtype: 'NavIC Constellation', orbit: 'GEO', altitude: '35,786 km', status: 'OPERATIONAL', coverage: '1,500 km around India', launchDate: '2015-03-28', inclination: '29°', period: '23h 56m', transponders: 'L5, S-band Navigation', operator: 'ISRO' },
    { id: 'IRNSS-1E', name: 'NavIC-1E (IRNSS-1E)', type: 'NAVIGATION', subtype: 'NavIC Constellation', orbit: 'GEO', altitude: '35,786 km', status: 'OPERATIONAL', coverage: '1,500 km around India', launchDate: '2016-01-20', inclination: '29°', period: '23h 56m', transponders: 'L5, S-band Navigation', operator: 'ISRO' },
    { id: 'IRNSS-1F', name: 'NavIC-1F (IRNSS-1F)', type: 'NAVIGATION', subtype: 'NavIC Constellation', orbit: 'GEO', altitude: '35,786 km', status: 'OPERATIONAL', coverage: '1,500 km around India', launchDate: '2016-03-10', inclination: '5°', period: '23h 56m', transponders: 'L5, S-band Navigation', operator: 'ISRO' },
    { id: 'IRNSS-1G', name: 'NavIC-1G (IRNSS-1G)', type: 'NAVIGATION', subtype: 'NavIC Constellation', orbit: 'GEO', altitude: '35,786 km', status: 'OPERATIONAL', coverage: '1,500 km around India', launchDate: '2016-04-28', inclination: '5°', period: '23h 56m', transponders: 'L5, S-band Navigation', operator: 'ISRO' },
    { id: 'GSAT-6', name: 'GSAT-6', type: 'COMMUNICATION', subtype: 'Tactical Communication', orbit: 'GEO', altitude: '35,786 km', status: 'OPERATIONAL', coverage: 'Indian Subcontinent', launchDate: '2015-08-27', inclination: '0.05°', period: '23h 56m', transponders: 'S-band (5m unfurlable antenna)', operator: 'ISRO / Armed Forces' },
    { id: 'GSAT-11', name: 'GSAT-11', type: 'COMMUNICATION', subtype: 'High-Throughput', orbit: 'GEO', altitude: '35,786 km', status: 'OPERATIONAL', coverage: 'Indian Subcontinent + IOR', launchDate: '2018-12-05', inclination: '0.03°', period: '23h 56m', transponders: 'Ka-band, Ku-band (16 Gbps HTS)', operator: 'ISRO' },
    { id: 'GSAT-30', name: 'GSAT-30', type: 'COMMUNICATION', subtype: 'C/Ku-band Communication', orbit: 'GEO', altitude: '35,786 km', status: 'OPERATIONAL', coverage: 'Indian Mainland + Islands', launchDate: '2020-01-17', inclination: '0.02°', period: '23h 56m', transponders: 'C-band (12), Ku-band extended', operator: 'ISRO' }
];

const HOSTILE_SATELLITES = [
    { id: 'YAOGAN-35A', name: 'Yaogan-35A', country: 'China', type: 'ELINT/SIGINT', orbit: 'LEO', altitude: '500 km', status: 'TRACKING', passFrequency: '3–4 passes/day over India', threatLevel: 'HIGH', lastPass: '14:22 UTC' },
    { id: 'JILIN-1-GF03D', name: 'Jilin-1 GF03D', country: 'China', type: 'High-Res Imaging', orbit: 'LEO', altitude: '535 km', status: 'TRACKING', passFrequency: '2–3 passes/day over India', threatLevel: 'MEDIUM', lastPass: '11:47 UTC' },
    { id: 'SHIJIAN-21', name: 'Shijian-21', country: 'China', type: 'Space Debris / RPO', orbit: 'GEO', altitude: '35,800 km', status: 'MANEUVERING', passFrequency: 'Geostationary — Persistent', threatLevel: 'CRITICAL', lastPass: 'PERSISTENT' },
    { id: 'PAKTES-1A', name: 'PakTES-1A', country: 'Pakistan', type: 'Earth Observation', orbit: 'LEO', altitude: '610 km', status: 'TRACKING', passFrequency: '2 passes/day over India', threatLevel: 'LOW', lastPass: '09:33 UTC' }
];

const ASAT_DATA = {
    system: 'PDV Mk-II (Prithvi Defence Vehicle)',
    range: '300 km (LEO intercept)',
    speed: 'Mach 10+ (3.4 km/s)',
    killVehicle: 'Kinetic Kill Vehicle (KKV) — Hit-to-Kill',
    guidance: 'Infrared Seeker + Inertial Navigation + Ring Laser Gyro',
    testHistory: 'Mission Shakti — 27 March 2019 — Microsat-R destroyed at 283 km',
    readiness: 'READY',
    interceptors: 4,
    platforms: ['Abdul Kalam Island (Wheeler Island)', 'ITR Chandipur'],
    debrisTracked: 127
};

const LAUNCH_VEHICLES = [
    { id: 'PSLV', name: 'PSLV-C58', type: 'Polar Satellite Launch Vehicle', status: 'READY', payload: '1,750 kg to SSO', stages: 4, successRate: '94.6%' },
    { id: 'GSLV-III', name: 'LVM3 (GSLV Mk III)', type: 'Heavy Lift Vehicle', status: 'INTEGRATION', payload: '8,000 kg to LEO / 4,000 kg to GTO', stages: 3, successRate: '100%' },
    { id: 'SSLV', name: 'SSLV-D3', type: 'Small Satellite Launch Vehicle', status: 'READY', payload: '500 kg to LEO', stages: 3, successRate: '66.7%' },
    { id: 'RLV', name: 'RLV-TD (Pushpak)', type: 'Reusable Launch Vehicle', status: 'TESTING', payload: 'Technology Demonstrator', stages: 2, successRate: 'Experimental' }
];

const LAUNCH_PADS = [
    { id: 'FLP', name: 'First Launch Pad (FLP)', location: 'SDSC SHAR, Sriharikota', status: 'ACTIVE', currentVehicle: 'PSLV-C58', lat: '13.72°N', lon: '80.23°E' },
    { id: 'SLP', name: 'Second Launch Pad (SLP)', location: 'SDSC SHAR, Sriharikota', status: 'ACTIVE', currentVehicle: 'LVM3', lat: '13.72°N', lon: '80.23°E' },
    { id: 'TLP', name: 'Third Launch Pad (TLP)', location: 'SDSC SHAR, Sriharikota', status: 'CONSTRUCTION', currentVehicle: 'SSLV / RLV', lat: '13.72°N', lon: '80.23°E' },
    { id: 'TERLS', name: 'TERLS Pad', location: 'Thumba, Thiruvananthapuram', status: 'STANDBY', currentVehicle: 'Sounding Rockets', lat: '8.53°N', lon: '76.86°E' }
];

const GROUND_STATIONS = [
    { id: 'ISTRAC-BLR', name: 'ISTRAC Bengaluru', location: 'Bengaluru, Karnataka', uplink: 'ACTIVE', downlink: 'ACTIVE', signalStrength: 98, activeTracking: 14, frequency: 'S-band, VHF' },
    { id: 'HASSAN', name: 'Hassan Deep Space', location: 'Hassan, Karnataka', uplink: 'ACTIVE', downlink: 'ACTIVE', signalStrength: 95, activeTracking: 6, frequency: 'S-band, X-band' },
    { id: 'PORT-BLAIR', name: 'Port Blair Station', location: 'Port Blair, A&N Islands', uplink: 'ACTIVE', downlink: 'ACTIVE', signalStrength: 91, activeTracking: 8, frequency: 'S-band' },
    { id: 'BRUNEI', name: 'Brunei Station', location: 'Brunei Darussalam', uplink: 'ACTIVE', downlink: 'ACTIVE', signalStrength: 87, activeTracking: 4, frequency: 'S-band' },
    { id: 'BIAK', name: 'Biak Station', location: 'Biak, Indonesia', uplink: 'ACTIVE', downlink: 'DEGRADED', signalStrength: 72, activeTracking: 3, frequency: 'S-band, VHF' },
    { id: 'MAURITIUS', name: 'Mauritius Station', location: 'Mauritius', uplink: 'ACTIVE', downlink: 'ACTIVE', signalStrength: 89, activeTracking: 5, frequency: 'S-band' }
];

const UPCOMING_LAUNCHES = [
    { id: 'L1', mission: 'PSLV-C58 / XPoSat', date: '2026-03-15T09:30:00Z', vehicle: 'PSLV-XL', pad: 'First Launch Pad', payload: 'X-ray Polarimeter Satellite', orbit: 'LEO (650 km)', status: 'GO' },
    { id: 'L2', mission: 'LVM3-M5 / OneWeb India-3', date: '2026-04-22T14:00:00Z', vehicle: 'LVM3', pad: 'Second Launch Pad', payload: '36 OneWeb Satellites', orbit: 'LEO (1,200 km)', status: 'NOMINAL' },
    { id: 'L3', mission: 'SSLV-D3 / EOS-08', date: '2026-06-10T06:00:00Z', vehicle: 'SSLV', pad: 'First Launch Pad', payload: 'Earth Observation Satellite', orbit: 'LEO (475 km)', status: 'HOLD' }
];

const FOREIGN_PASSES = [
    { id: 'FP1', satellite: 'USA-326 (KH-11)', country: 'USA', type: 'Reconnaissance', nextPass: '16:45 UTC', region: 'Northern India', altitude: '260 km' },
    { id: 'FP2', satellite: 'Yaogan-35B', country: 'China', type: 'ELINT', nextPass: '18:12 UTC', region: 'Western India', altitude: '500 km' },
    { id: 'FP3', satellite: 'Kosmos-2558', country: 'Russia', type: 'Inspector Satellite', nextPass: '20:30 UTC', region: 'Southern India', altitude: '420 km' },
    { id: 'FP4', satellite: 'Jilin-1 Video 04', country: 'China', type: 'Video Imaging', nextPass: '22:05 UTC', region: 'Eastern India', altitude: '535 km' }
];

const SPACE_WEATHER = {
    solarFlareActivity: 'MODERATE (C4.2)',
    kpIndex: 4,
    radiationLevel: 'ELEVATED',
    protonFlux: '2.3×10² pfu',
    solarWind: '485 km/s',
    geomagneticStorm: 'G1 — Minor',
    forecast: 'M-class flare probability 35% next 24h'
};

const COLLISION_WARNINGS = [
    { id: 'CW1', object1: 'Cartosat-3', object2: 'CZ-2C Debris (46271)', tca: '2026-02-21T08:14:00Z', missDistance: '1.2 km', probability: '1.4×10⁻⁴', risk: 'MEDIUM' },
    { id: 'CW2', object1: 'EMISAT', object2: 'Cosmos 1408 Fragment', tca: '2026-02-23T14:30:00Z', missDistance: '3.8 km', probability: '2.1×10⁻⁵', risk: 'LOW' }
];

const AUTH_STEPS = [
    { id: 'STEP1', label: 'COMMANDER AUTHORIZATION', desc: 'Space Command Director authentication' },
    { id: 'STEP2', label: 'CDS CONFIRMATION', desc: 'Chief of Defence Staff dual-key confirmation' },
    { id: 'STEP3', label: 'STRATEGIC FORCES COMMAND', desc: 'SFC authorization — weapons release code' },
    { id: 'STEP4', label: 'PRIME MINISTER APPROVAL', desc: 'Final executive authorization for ASAT engagement' }
];

const SpaceCommand = ({ onBack }) => {
    const [systemTime, setSystemTime] = useState(new Date());
    const [selectedSatellite, setSelectedSatellite] = useState(null);
    const [satFilter, setSatFilter] = useState('ALL');
    const [activeSection, setActiveSection] = useState('CONSTELLATION');

    const [asatAuthStep, setAsatAuthStep] = useState(0);
    const [asatAuthActive, setAsatAuthActive] = useState(false);
    const [asatTarget, setAsatTarget] = useState(null);
    const [asatEngaged, setAsatEngaged] = useState(false);
    const [authCodes, setAuthCodes] = useState({});

    const [launchCountdown, setLaunchCountdown] = useState(null);

    const [selectedGroundStation, setSelectedGroundStation] = useState(null);

    useEffect(() => {
        const timer = setInterval(() => setSystemTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (!UPCOMING_LAUNCHES[0]) return;
        const targetDate = new Date(UPCOMING_LAUNCHES[0].date);
        const calcCountdown = () => {
            const now = new Date();
            const diff = targetDate - now;
            if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
            return {
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / (1000 * 60)) % 60),
                seconds: Math.floor((diff / 1000) % 60)
            };
        };
        setLaunchCountdown(calcCountdown());
        const timer = setInterval(() => setLaunchCountdown(calcCountdown()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleAsatAuth = useCallback((step, code) => {
        const codes = { ...authCodes, [step]: code };
        setAuthCodes(codes);
        if (code.length >= 6) {
            setTimeout(() => {
                if (asatAuthStep < AUTH_STEPS.length - 1) {
                    setAsatAuthStep(prev => prev + 1);
                } else {
                    setAsatEngaged(true);
                    setAsatAuthActive(false);
                }
            }, 1500);
        }
    }, [authCodes, asatAuthStep]);

    const filteredSatellites = satFilter === 'ALL' ? SATELLITES : SATELLITES.filter(s => s.type === satFilter);
    const operationalCount = SATELLITES.filter(s => s.status === 'OPERATIONAL').length;
    const totalTracked = 4832;
    const groundOnline = GROUND_STATIONS.filter(g => g.uplink === 'ACTIVE').length;
    const coveragePercent = 94.7;

    const formatUTC = (date) => {
        return date.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
    };

    const statusColor = (status) => {
        switch (status) {
            case 'OPERATIONAL': case 'ACTIVE': case 'READY': case 'GO': return '#34D399';
            case 'MANEUVERING': case 'INTEGRATION': case 'NOMINAL': return '#FBBF24';
            case 'DEGRADED': case 'TESTING': case 'HOLD': return '#F87171';
            case 'TRACKING': return '#60A5FA';
            case 'CONSTRUCTION': case 'STANDBY': return '#A78BFA';
            default: return '#ffffff60';
        }
    };

    const threatColor = (level) => {
        switch (level) {
            case 'CRITICAL': return '#DC2626';
            case 'HIGH': return '#F87171';
            case 'MEDIUM': return '#FBBF24';
            case 'LOW': return '#34D399';
            default: return '#ffffff60';
        }
    };

    const orbitColor = (orbit) => {
        switch (orbit) {
            case 'LEO': return '#60A5FA';
            case 'GEO': return '#A78BFA';
            case 'MEO': return '#FBBF24';
            default: return '#00FFCC';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed', inset: 0, zIndex: 9999,
                background: 'linear-gradient(135deg, #020617 0%, #0a0a1a 50%, #020617 100%)',
                color: '#fff', overflow: 'hidden', display: 'flex', flexDirection: 'column'
            }}
        >
            <div style={{
                position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none'
            }}>
                {Array.from({ length: 60 }).map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ opacity: [0.1, 0.6, 0.1] }}
                        transition={{ duration: 2 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
                        style={{
                            position: 'absolute',
                            width: '2px', height: '2px', borderRadius: '50%',
                            background: '#fff',
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`
                        }}
                    />
                ))}
            </div>

            <motion.button
                whileHover={{ scale: 1.1, background: 'rgba(220,38,38,0.3)' }}
                whileTap={{ scale: 0.9 }}
                onClick={onBack}
                style={{
                    position: 'absolute', top: '16px', right: '16px', zIndex: 10001,
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: 'rgba(220,38,38,0.15)', border: '1px solid #DC2626',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                }}
            >
                <X size={18} color="#F87171" />
            </motion.button>

            <div style={{
                padding: '14px 24px', borderBottom: '1px solid rgba(0,255,204,0.1)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                background: 'rgba(0,0,0,0.4)', position: 'relative', zIndex: 2
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                        <Orbit size={28} color="#00FFCC" />
                    </motion.div>
                    <div>
                        <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '16px', fontWeight: 900, color: '#00FFCC', letterSpacing: '3px' }}>
                            SPACE COMMAND
                        </div>
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#ffffff50', letterSpacing: '2px' }}>
                            DEFENCE SPACE AGENCY — INTEGRATED DEFENCE STAFF
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#00FFCC', fontWeight: 700 }}>
                            {formatUTC(systemTime)}
                        </div>
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', color: '#ffffff40', letterSpacing: '1px' }}>
                            ORBITAL TIME — EPOCH J2000
                        </div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '4px 14px', border: '1px solid rgba(52,211,153,0.3)', background: 'rgba(52,211,153,0.08)' }}>
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '18px', fontWeight: 900, color: '#34D399' }}>
                            {operationalCount}
                        </div>
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '7px', color: '#34D39980', letterSpacing: '1px' }}>
                            SATELLITES ACTIVE
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', borderBottom: '1px solid rgba(0,255,204,0.06)', background: 'rgba(0,0,0,0.2)', position: 'relative', zIndex: 2 }}>
                {[
                    { id: 'CONSTELLATION', label: 'CONSTELLATION', icon: <Satellite size={12} /> },
                    { id: 'ASAT', label: 'ASAT OPS', icon: <Target size={12} /> },
                    { id: 'SSA', label: 'SPACE AWARENESS', icon: <Eye size={12} /> },
                    { id: 'LAUNCH', label: 'LAUNCH OPS', icon: <Rocket size={12} /> },
                    { id: 'GROUND', label: 'GROUND STATIONS', icon: <Radio size={12} /> }
                ].map(tab => (
                    <motion.button
                        key={tab.id}
                        whileHover={{ background: 'rgba(0,255,204,0.08)' }}
                        onClick={() => setActiveSection(tab.id)}
                        style={{
                            flex: 1, padding: '10px 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                            background: activeSection === tab.id ? 'rgba(0,255,204,0.1)' : 'transparent',
                            border: 'none', borderBottom: activeSection === tab.id ? '2px solid #00FFCC' : '2px solid transparent',
                            color: activeSection === tab.id ? '#00FFCC' : '#ffffff50',
                            fontFamily: 'Orbitron, monospace', fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px', cursor: 'pointer'
                        }}
                    >
                        {tab.icon} {tab.label}
                    </motion.button>
                ))}
            </div>

            <div style={{ flex: 1, overflow: 'auto', padding: '16px', position: 'relative', zIndex: 2 }}>
                <AnimatePresence mode="wait">
                    {activeSection === 'CONSTELLATION' && (
                        <motion.div key="constellation" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            <ConstellationPanel
                                satellites={filteredSatellites}
                                filter={satFilter}
                                setFilter={setSatFilter}
                                selected={selectedSatellite}
                                setSelected={setSelectedSatellite}
                                statusColor={statusColor}
                                orbitColor={orbitColor}
                            />
                        </motion.div>
                    )}
                    {activeSection === 'ASAT' && (
                        <motion.div key="asat" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            <ASATPanel
                                asatData={ASAT_DATA}
                                hostileSatellites={HOSTILE_SATELLITES}
                                asatAuthActive={asatAuthActive}
                                setAsatAuthActive={setAsatAuthActive}
                                asatAuthStep={asatAuthStep}
                                setAsatAuthStep={setAsatAuthStep}
                                asatTarget={asatTarget}
                                setAsatTarget={setAsatTarget}
                                asatEngaged={asatEngaged}
                                setAsatEngaged={setAsatEngaged}
                                handleAsatAuth={handleAsatAuth}
                                authCodes={authCodes}
                                setAuthCodes={setAuthCodes}
                                statusColor={statusColor}
                                threatColor={threatColor}
                            />
                        </motion.div>
                    )}
                    {activeSection === 'SSA' && (
                        <motion.div key="ssa" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            <SSAPanel
                                totalTracked={totalTracked}
                                collisionWarnings={COLLISION_WARNINGS}
                                foreignPasses={FOREIGN_PASSES}
                                spaceWeather={SPACE_WEATHER}
                                threatColor={threatColor}
                            />
                        </motion.div>
                    )}
                    {activeSection === 'LAUNCH' && (
                        <motion.div key="launch" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            <LaunchPanel
                                vehicles={LAUNCH_VEHICLES}
                                pads={LAUNCH_PADS}
                                launches={UPCOMING_LAUNCHES}
                                countdown={launchCountdown}
                                statusColor={statusColor}
                            />
                        </motion.div>
                    )}
                    {activeSection === 'GROUND' && (
                        <motion.div key="ground" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            <GroundStationsPanel
                                stations={GROUND_STATIONS}
                                selected={selectedGroundStation}
                                setSelected={setSelectedGroundStation}
                                statusColor={statusColor}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1px',
                borderTop: '1px solid rgba(0,255,204,0.1)', background: 'rgba(0,0,0,0.5)',
                position: 'relative', zIndex: 2
            }}>
                <StatBar icon={<Satellite size={14} />} label="SATELLITES ACTIVE" value={operationalCount} color="#34D399" />
                <StatBar icon={<Shield size={14} />} label="ASAT READINESS" value={ASAT_DATA.readiness} color="#00FFCC" />
                <StatBar icon={<Globe size={14} />} label="OBJECTS TRACKED" value={totalTracked.toLocaleString()} color="#60A5FA" />
                <StatBar icon={<Radio size={14} />} label="GROUND STATIONS" value={`${groundOnline}/${GROUND_STATIONS.length}`} color="#A78BFA" />
                <StatBar icon={<Gauge size={14} />} label="COVERAGE" value={`${coveragePercent}%`} color="#FBBF24" />
            </div>
        </motion.div>
    );
};

const ConstellationPanel = ({ satellites, filter, setFilter, selected, setSelected, statusColor, orbitColor }) => {
    const filters = ['ALL', 'MILITARY', 'NAVIGATION', 'COMMUNICATION'];

    return (
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: '16px' }}>
            <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <SectionTitle icon={<Satellite size={14} />} title="SATELLITE CONSTELLATION" />
                    <div style={{ display: 'flex', gap: '4px' }}>
                        {filters.map(f => (
                            <motion.button
                                key={f}
                                whileHover={{ background: 'rgba(0,255,204,0.15)' }}
                                onClick={() => setFilter(f)}
                                style={{
                                    padding: '4px 10px', border: filter === f ? '1px solid #00FFCC' : '1px solid rgba(255,255,255,0.1)',
                                    background: filter === f ? 'rgba(0,255,204,0.1)' : 'transparent',
                                    color: filter === f ? '#00FFCC' : '#ffffff50',
                                    fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', fontWeight: 700,
                                    letterSpacing: '1px', cursor: 'pointer'
                                }}
                            >
                                {f}
                            </motion.button>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: 'calc(100vh - 320px)', overflow: 'auto' }}>
                    {satellites.map(sat => (
                        <motion.div
                            key={sat.id}
                            whileHover={{ borderColor: '#00FFCC40', x: 2 }}
                            onClick={() => setSelected(sat.id === selected?.id ? null : sat)}
                            style={{
                                padding: '10px 14px', background: selected?.id === sat.id ? 'rgba(0,255,204,0.08)' : 'rgba(0,0,0,0.3)',
                                border: selected?.id === sat.id ? '1px solid rgba(0,255,204,0.3)' : '1px solid rgba(255,255,255,0.04)',
                                cursor: 'pointer', display: 'grid', gridTemplateColumns: '1.5fr 0.8fr 0.6fr 0.5fr 0.8fr', alignItems: 'center', gap: '8px'
                            }}
                        >
                            <div>
                                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', fontWeight: 700, color: '#fff' }}>{sat.name}</div>
                                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', color: '#ffffff40' }}>{sat.subtype}</div>
                            </div>
                            <div style={{
                                fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', fontWeight: 700,
                                color: sat.type === 'MILITARY' ? '#F87171' : sat.type === 'NAVIGATION' ? '#60A5FA' : '#A78BFA',
                                letterSpacing: '1px'
                            }}>
                                {sat.type}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: orbitColor(sat.orbit) }} />
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: orbitColor(sat.orbit) }}>{sat.orbit}</span>
                            </div>
                            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#ffffff60' }}>{sat.altitude}</div>
                            <div style={{
                                fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', fontWeight: 700,
                                color: statusColor(sat.status), textAlign: 'right', letterSpacing: '0.5px'
                            }}>
                                {sat.status}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0,255,204,0.15)', padding: '20px' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                            <div>
                                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '14px', fontWeight: 900, color: '#00FFCC', letterSpacing: '2px' }}>
                                    {selected.name}
                                </div>
                                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#ffffff40', marginTop: '4px' }}>
                                    {selected.subtype} — {selected.operator}
                                </div>
                            </div>
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                style={{
                                    width: '10px', height: '10px', borderRadius: '50%',
                                    background: statusColor(selected.status),
                                    boxShadow: `0 0 10px ${statusColor(selected.status)}`
                                }}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                            <MiniData label="ORBIT TYPE" value={selected.orbit} color={orbitColor(selected.orbit)} />
                            <MiniData label="ALTITUDE" value={selected.altitude} color="#fff" />
                            <MiniData label="INCLINATION" value={selected.inclination} color="#fff" />
                            <MiniData label="ORBITAL PERIOD" value={selected.period} color="#fff" />
                            <MiniData label="STATUS" value={selected.status} color={statusColor(selected.status)} />
                            <MiniData label="LAUNCH DATE" value={selected.launchDate} color="#ffffff80" />
                        </div>

                        <div style={{ borderTop: '1px solid rgba(0,255,204,0.08)', paddingTop: '12px', marginBottom: '12px' }}>
                            <MiniData label="COVERAGE AREA" value={selected.coverage} color="#00FFCC" />
                        </div>
                        <div style={{ borderTop: '1px solid rgba(0,255,204,0.08)', paddingTop: '12px', marginBottom: '12px' }}>
                            <MiniData label="PAYLOAD / TRANSPONDERS" value={selected.transponders} color="#ffffff80" />
                        </div>
                        <div style={{ borderTop: '1px solid rgba(0,255,204,0.08)', paddingTop: '12px' }}>
                            <MiniData label="OPERATOR" value={selected.operator} color="#A78BFA" />
                        </div>

                        <motion.div
                            animate={{ background: ['rgba(0,255,204,0.03)', 'rgba(0,255,204,0.08)', 'rgba(0,255,204,0.03)'] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            style={{ marginTop: '16px', padding: '10px', border: '1px solid rgba(0,255,204,0.1)', display: 'flex', alignItems: 'center', gap: '8px' }}
                        >
                            <Activity size={12} color="#00FFCC" />
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#00FFCC' }}>
                                TELEMETRY ACTIVE — LINK NOMINAL
                            </span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ASATPanel = ({
    asatData, hostileSatellites, asatAuthActive, setAsatAuthActive,
    asatAuthStep, setAsatAuthStep, asatTarget, setAsatTarget,
    asatEngaged, setAsatEngaged, handleAsatAuth, authCodes, setAuthCodes,
    statusColor, threatColor
}) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <SectionCard title="MISSION SHAKTI — ASAT CAPABILITY" icon={<Shield size={14} />}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                        <MiniData label="WEAPON SYSTEM" value={asatData.system} color="#00FFCC" />
                        <MiniData label="INTERCEPT RANGE" value={asatData.range} color="#fff" />
                        <MiniData label="INTERCEPTOR SPEED" value={asatData.speed} color="#fff" />
                        <MiniData label="KILL MECHANISM" value={asatData.killVehicle} color="#F87171" />
                        <MiniData label="GUIDANCE" value={asatData.guidance} color="#ffffff80" />
                        <MiniData label="READINESS" value={asatData.readiness} color="#34D399" />
                    </div>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        <div style={{ flex: 1, padding: '8px', background: 'rgba(0,255,204,0.05)', border: '1px solid rgba(0,255,204,0.1)', textAlign: 'center' }}>
                            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '20px', fontWeight: 900, color: '#00FFCC' }}>{asatData.interceptors}</div>
                            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '7px', color: '#00FFCC80', letterSpacing: '1px' }}>INTERCEPTORS READY</div>
                        </div>
                        <div style={{ flex: 1, padding: '8px', background: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.1)', textAlign: 'center' }}>
                            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '20px', fontWeight: 900, color: '#F87171' }}>{asatData.debrisTracked}</div>
                            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '7px', color: '#F8717180', letterSpacing: '1px' }}>DEBRIS TRACKED</div>
                        </div>
                    </div>
                    <div style={{ padding: '6px 10px', background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.15)' }}>
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', color: '#FBBF24', letterSpacing: '0.5px' }}>
                            VALIDATED: {asatData.testHistory}
                        </div>
                    </div>
                </SectionCard>

                <SectionCard title="LAUNCH PLATFORMS" icon={<MapPin size={14} />}>
                    {asatData.platforms.map((p, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                            <Crosshair size={10} color="#00FFCC" />
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#fff' }}>{p}</span>
                            <span style={{ marginLeft: 'auto', fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', color: '#34D399' }}>OPERATIONAL</span>
                        </div>
                    ))}
                </SectionCard>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <SectionCard title="HOSTILE SATELLITE TRACKING" icon={<Crosshair size={14} />}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {hostileSatellites.map(hs => (
                            <motion.div
                                key={hs.id}
                                whileHover={{ borderColor: threatColor(hs.threatLevel) + '60' }}
                                onClick={() => setAsatTarget(hs)}
                                style={{
                                    padding: '10px', background: asatTarget?.id === hs.id ? 'rgba(220,38,38,0.08)' : 'rgba(0,0,0,0.3)',
                                    border: asatTarget?.id === hs.id ? '1px solid rgba(220,38,38,0.4)' : '1px solid rgba(255,255,255,0.04)',
                                    cursor: 'pointer'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', fontWeight: 700, color: '#fff' }}>{hs.name}</span>
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', fontWeight: 700, color: threatColor(hs.threatLevel), letterSpacing: '1px' }}>
                                        {hs.threatLevel}
                                    </span>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
                                    <MiniData label="COUNTRY" value={hs.country} color="#F87171" />
                                    <MiniData label="TYPE" value={hs.type} color="#ffffff80" />
                                    <MiniData label="ALT" value={hs.altitude} color="#60A5FA" />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', color: '#ffffff40' }}>{hs.passFrequency}</span>
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', color: '#60A5FA' }}>LAST: {hs.lastPass}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </SectionCard>

                {!asatAuthActive && !asatEngaged && (
                    <motion.button
                        whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(220,38,38,0.3)' }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                            if (!asatTarget) return;
                            setAsatAuthActive(true);
                            setAsatAuthStep(0);
                            setAuthCodes({});
                        }}
                        style={{
                            padding: '14px', background: asatTarget ? 'rgba(220,38,38,0.15)' : 'rgba(100,100,100,0.1)',
                            border: asatTarget ? '2px solid #DC2626' : '2px solid rgba(100,100,100,0.2)',
                            color: asatTarget ? '#F87171' : '#ffffff30',
                            fontFamily: 'Orbitron, monospace', fontSize: '12px', fontWeight: 900, letterSpacing: '3px',
                            cursor: asatTarget ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
                        }}
                    >
                        <Target size={16} /> ENGAGE ASAT {asatTarget ? `— ${asatTarget.name}` : '— SELECT TARGET'}
                    </motion.button>
                )}

                <AnimatePresence>
                    {asatAuthActive && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <SectionCard title="ASAT AUTHORIZATION SEQUENCE" icon={<Lock size={14} />}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {AUTH_STEPS.map((step, i) => {
                                        const isActive = i === asatAuthStep;
                                        const isComplete = i < asatAuthStep;
                                        return (
                                            <motion.div
                                                key={step.id}
                                                animate={isActive ? { borderColor: ['rgba(220,38,38,0.3)', 'rgba(220,38,38,0.8)', 'rgba(220,38,38,0.3)'] } : {}}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                                style={{
                                                    padding: '10px 12px',
                                                    background: isComplete ? 'rgba(52,211,153,0.08)' : isActive ? 'rgba(220,38,38,0.05)' : 'rgba(0,0,0,0.2)',
                                                    border: `1px solid ${isComplete ? 'rgba(52,211,153,0.3)' : isActive ? 'rgba(220,38,38,0.3)' : 'rgba(255,255,255,0.05)'}`,
                                                    display: 'flex', alignItems: 'center', gap: '10px'
                                                }}
                                            >
                                                {isComplete ? (
                                                    <CheckCircle size={14} color="#34D399" />
                                                ) : isActive ? (
                                                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                                                        <RefreshCw size={14} color="#DC2626" />
                                                    </motion.div>
                                                ) : (
                                                    <Lock size={14} color="#ffffff30" />
                                                )}
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '9px', fontWeight: 700, color: isComplete ? '#34D399' : isActive ? '#F87171' : '#ffffff30', letterSpacing: '1px' }}>
                                                        STEP {i + 1}: {step.label}
                                                    </div>
                                                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', color: '#ffffff30' }}>{step.desc}</div>
                                                </div>
                                                {isActive && (
                                                    <input
                                                        type="password"
                                                        placeholder="AUTH CODE"
                                                        value={authCodes[step.id] || ''}
                                                        onChange={(e) => handleAsatAuth(step.id, e.target.value)}
                                                        style={{
                                                            width: '100px', padding: '4px 8px', background: 'rgba(0,0,0,0.5)',
                                                            border: '1px solid rgba(220,38,38,0.4)', color: '#F87171',
                                                            fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', outline: 'none', letterSpacing: '2px'
                                                        }}
                                                    />
                                                )}
                                            </motion.div>
                                        );
                                    })}
                                </div>
                                <motion.button
                                    whileHover={{ background: 'rgba(220,38,38,0.15)' }}
                                    onClick={() => { setAsatAuthActive(false); setAsatAuthStep(0); setAuthCodes({}); }}
                                    style={{
                                        marginTop: '10px', padding: '6px 16px', background: 'transparent',
                                        border: '1px solid rgba(220,38,38,0.3)', color: '#F87171',
                                        fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', cursor: 'pointer'
                                    }}
                                >
                                    ABORT SEQUENCE
                                </motion.button>
                            </SectionCard>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {asatEngaged && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                animate={{ borderColor: ['rgba(220,38,38,0.3)', 'rgba(220,38,38,1)', 'rgba(220,38,38,0.3)'] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                style={{ padding: '20px', background: 'rgba(220,38,38,0.08)', border: '2px solid #DC2626', textAlign: 'center' }}
                            >
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 0.5, repeat: Infinity }}
                                >
                                    <Target size={32} color="#DC2626" style={{ margin: '0 auto 10px' }} />
                                </motion.div>
                                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '14px', fontWeight: 900, color: '#DC2626', letterSpacing: '4px', marginBottom: '6px' }}>
                                    ASAT WEAPON ENGAGED
                                </div>
                                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#F87171' }}>
                                    PDV Mk-II launched — targeting {asatTarget?.name || 'UNKNOWN'}
                                </div>
                                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#ffffff50', marginTop: '8px' }}>
                                    ALL AUTHORIZATION CODES VERIFIED — KINETIC KILL VEHICLE DEPLOYED
                                </div>
                                <motion.button
                                    whileHover={{ background: 'rgba(0,255,204,0.15)' }}
                                    onClick={() => { setAsatEngaged(false); setAsatTarget(null); setAsatAuthStep(0); setAuthCodes({}); }}
                                    style={{
                                        marginTop: '14px', padding: '8px 24px', background: 'rgba(0,0,0,0.3)',
                                        border: '1px solid rgba(0,255,204,0.3)', color: '#00FFCC',
                                        fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', cursor: 'pointer', letterSpacing: '1px'
                                    }}
                                >
                                    RESET SYSTEM
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const SSAPanel = ({ totalTracked, collisionWarnings, foreignPasses, spaceWeather, threatColor }) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <SectionCard title="SPACE SITUATIONAL AWARENESS" icon={<Eye size={14} />}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                        <div style={{ padding: '12px', background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.15)', textAlign: 'center' }}>
                            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '24px', fontWeight: 900, color: '#60A5FA' }}>{totalTracked.toLocaleString()}</div>
                            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '7px', color: '#60A5FA80', letterSpacing: '1px' }}>OBJECTS IN ORBIT</div>
                        </div>
                        <div style={{ padding: '12px', background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.15)', textAlign: 'center' }}>
                            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '24px', fontWeight: 900, color: '#FBBF24' }}>{collisionWarnings.length}</div>
                            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '7px', color: '#FBBF2480', letterSpacing: '1px' }}>COLLISION WARNINGS</div>
                        </div>
                    </div>

                    <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '9px', color: '#FBBF24', letterSpacing: '1.5px', marginBottom: '8px' }}>
                        CONJUNCTION ALERTS
                    </div>
                    {collisionWarnings.map(cw => (
                        <motion.div
                            key={cw.id}
                            whileHover={{ borderColor: threatColor(cw.risk) + '60' }}
                            style={{
                                padding: '10px', marginBottom: '6px',
                                background: 'rgba(0,0,0,0.3)', border: `1px solid ${threatColor(cw.risk)}20`
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', fontWeight: 700, color: '#fff' }}>
                                    {cw.object1} × {cw.object2}
                                </span>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', fontWeight: 700, color: threatColor(cw.risk) }}>
                                    {cw.risk}
                                </span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
                                <MiniData label="TCA" value={new Date(cw.tca).toLocaleString()} color="#ffffff80" />
                                <MiniData label="MISS DIST" value={cw.missDistance} color="#FBBF24" />
                                <MiniData label="PROBABILITY" value={cw.probability} color="#F87171" />
                            </div>
                        </motion.div>
                    ))}
                </SectionCard>

                <SectionCard title="JAMMING THREAT ASSESSMENT" icon={<Zap size={14} />}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {[
                            { band: 'L-band (NavIC)', threat: 'LOW', source: 'No active jammers detected' },
                            { band: 'S-band (TT&C)', threat: 'MEDIUM', source: 'Intermittent interference — Western sector' },
                            { band: 'Ku-band (SATCOM)', threat: 'LOW', source: 'Clear spectrum' },
                            { band: 'GPS/GLONASS', threat: 'HIGH', source: 'Spoofing detected — Northern border region' }
                        ].map((j, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 8px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.04)' }}>
                                <Signal size={10} color={threatColor(j.threat)} />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#fff' }}>{j.band}</div>
                                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', color: '#ffffff40' }}>{j.source}</div>
                                </div>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', fontWeight: 700, color: threatColor(j.threat) }}>{j.threat}</span>
                            </div>
                        ))}
                    </div>
                </SectionCard>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <SectionCard title="FOREIGN SATELLITE PASSES OVER INDIA" icon={<Globe size={14} />}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {foreignPasses.map(fp => (
                            <motion.div
                                key={fp.id}
                                whileHover={{ borderColor: '#60A5FA40' }}
                                style={{ padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.04)' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', fontWeight: 700, color: '#fff' }}>{fp.satellite}</span>
                                    <span style={{
                                        fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', fontWeight: 700, padding: '2px 6px',
                                        background: fp.country === 'China' ? 'rgba(220,38,38,0.1)' : fp.country === 'Russia' ? 'rgba(251,191,36,0.1)' : 'rgba(96,165,250,0.1)',
                                        color: fp.country === 'China' ? '#F87171' : fp.country === 'Russia' ? '#FBBF24' : '#60A5FA',
                                        border: `1px solid ${fp.country === 'China' ? '#F8717130' : fp.country === 'Russia' ? '#FBBF2430' : '#60A5FA30'}`
                                    }}>
                                        {fp.country}
                                    </span>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
                                    <MiniData label="TYPE" value={fp.type} color="#ffffff80" />
                                    <MiniData label="NEXT PASS" value={fp.nextPass} color="#00FFCC" />
                                    <MiniData label="REGION" value={fp.region} color="#ffffff60" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </SectionCard>

                <SectionCard title="SPACE WEATHER" icon={<Sun size={14} />}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <MiniData label="SOLAR FLARE" value={spaceWeather.solarFlareActivity} color="#FBBF24" />
                        <MiniData label="Kp INDEX" value={spaceWeather.kpIndex.toString()} color={spaceWeather.kpIndex >= 5 ? '#F87171' : '#FBBF24'} />
                        <MiniData label="RADIATION" value={spaceWeather.radiationLevel} color="#F87171" />
                        <MiniData label="PROTON FLUX" value={spaceWeather.protonFlux} color="#ffffff80" />
                        <MiniData label="SOLAR WIND" value={spaceWeather.solarWind} color="#60A5FA" />
                        <MiniData label="GEOMAGNETIC" value={spaceWeather.geomagneticStorm} color="#FBBF24" />
                    </div>
                    <div style={{ marginTop: '10px', padding: '8px', background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.15)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <CloudLightning size={10} color="#FBBF24" />
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#FBBF24' }}>
                                FORECAST: {spaceWeather.forecast}
                            </span>
                        </div>
                    </div>
                </SectionCard>
            </div>
        </div>
    );
};

const LaunchPanel = ({ vehicles, pads, launches, countdown, statusColor }) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {countdown && (
                    <SectionCard title="NEXT LAUNCH COUNTDOWN" icon={<Clock size={14} />}>
                        <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#ffffff50', marginBottom: '8px', letterSpacing: '1px' }}>
                                {launches[0]?.mission}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                                {[
                                    { val: countdown.days, unit: 'DAYS' },
                                    { val: countdown.hours, unit: 'HRS' },
                                    { val: countdown.minutes, unit: 'MIN' },
                                    { val: countdown.seconds, unit: 'SEC' }
                                ].map((t, i) => (
                                    <div key={i} style={{ textAlign: 'center' }}>
                                        <motion.div
                                            key={t.val}
                                            initial={{ y: -5, opacity: 0.5 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            style={{
                                                fontFamily: 'Orbitron, monospace', fontSize: '28px', fontWeight: 900, color: '#00FFCC',
                                                minWidth: '50px', padding: '4px 8px', background: 'rgba(0,255,204,0.05)', border: '1px solid rgba(0,255,204,0.15)'
                                            }}
                                        >
                                            {String(t.val).padStart(2, '0')}
                                        </motion.div>
                                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '7px', color: '#00FFCC60', letterSpacing: '1px', marginTop: '4px' }}>
                                            {t.unit}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                            <MiniData label="VEHICLE" value={launches[0]?.vehicle} color="#fff" />
                            <MiniData label="PAD" value={launches[0]?.pad} color="#fff" />
                            <MiniData label="PAYLOAD" value={launches[0]?.payload} color="#A78BFA" />
                            <MiniData label="TARGET ORBIT" value={launches[0]?.orbit} color="#60A5FA" />
                        </div>
                        <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: statusColor(launches[0]?.status) }} />
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: statusColor(launches[0]?.status), fontWeight: 700 }}>
                                STATUS: {launches[0]?.status}
                            </span>
                        </div>
                    </SectionCard>
                )}

                <SectionCard title="UPCOMING LAUNCHES" icon={<Rocket size={14} />}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {launches.map(l => (
                            <div key={l.id} style={{ padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.04)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', fontWeight: 700, color: '#fff' }}>{l.mission}</span>
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', fontWeight: 700, color: statusColor(l.status) }}>{l.status}</span>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px' }}>
                                    <MiniData label="DATE" value={new Date(l.date).toLocaleDateString()} color="#ffffff80" />
                                    <MiniData label="VEHICLE" value={l.vehicle} color="#00FFCC" />
                                    <MiniData label="ORBIT" value={l.orbit} color="#60A5FA" />
                                </div>
                            </div>
                        ))}
                    </div>
                </SectionCard>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <SectionCard title="LAUNCH VEHICLE READINESS" icon={<ArrowUpRight size={14} />}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {vehicles.map(v => (
                            <motion.div
                                key={v.id}
                                whileHover={{ borderColor: '#00FFCC30' }}
                                style={{ padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.04)' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', fontWeight: 700, color: '#fff' }}>{v.name}</span>
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', fontWeight: 700, color: statusColor(v.status) }}>{v.status}</span>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                                    <MiniData label="TYPE" value={v.type} color="#ffffff60" />
                                    <MiniData label="PAYLOAD CAPACITY" value={v.payload} color="#00FFCC" />
                                    <MiniData label="STAGES" value={v.stages.toString()} color="#ffffff80" />
                                    <MiniData label="SUCCESS RATE" value={v.successRate} color="#34D399" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </SectionCard>

                <SectionCard title="ACTIVE LAUNCH PADS" icon={<MapPin size={14} />}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {pads.map(p => (
                            <div key={p.id} style={{
                                padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.04)',
                                display: 'flex', alignItems: 'center', gap: '10px'
                            }}>
                                <div style={{
                                    width: '8px', height: '8px', borderRadius: '50%',
                                    background: statusColor(p.status),
                                    boxShadow: `0 0 6px ${statusColor(p.status)}`
                                }} />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', fontWeight: 700, color: '#fff' }}>{p.name}</div>
                                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', color: '#ffffff40' }}>{p.location}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', color: statusColor(p.status), fontWeight: 700 }}>{p.status}</div>
                                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', color: '#ffffff40' }}>{p.currentVehicle}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </SectionCard>
            </div>
        </div>
    );
};

const GroundStationsPanel = ({ stations, selected, setSelected, statusColor }) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: '16px' }}>
            <div>
                <SectionTitle icon={<Radio size={14} />} title="GROUND STATION NETWORK — ISTRAC" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '12px' }}>
                    {stations.map(gs => (
                        <motion.div
                            key={gs.id}
                            whileHover={{ borderColor: '#00FFCC30', x: 2 }}
                            onClick={() => setSelected(gs.id === selected?.id ? null : gs)}
                            style={{
                                padding: '14px', background: selected?.id === gs.id ? 'rgba(0,255,204,0.06)' : 'rgba(0,0,0,0.3)',
                                border: selected?.id === gs.id ? '1px solid rgba(0,255,204,0.25)' : '1px solid rgba(255,255,255,0.04)',
                                cursor: 'pointer', display: 'grid', gridTemplateColumns: '1.2fr 0.6fr 0.6fr 0.5fr 0.4fr', alignItems: 'center', gap: '8px'
                            }}
                        >
                            <div>
                                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', fontWeight: 700, color: '#fff' }}>{gs.name}</div>
                                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', color: '#ffffff40' }}>{gs.location}</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <ArrowUpRight size={8} color={statusColor(gs.uplink)} />
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', color: statusColor(gs.uplink) }}>UP: {gs.uplink}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Navigation size={8} color={statusColor(gs.downlink)} />
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', color: statusColor(gs.downlink) }}>DN: {gs.downlink}</span>
                            </div>
                            <div>
                                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', color: '#ffffff40' }}>SIGNAL</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${gs.signalStrength}%` }}
                                            style={{
                                                height: '100%', borderRadius: '2px',
                                                background: gs.signalStrength > 90 ? '#34D399' : gs.signalStrength > 75 ? '#FBBF24' : '#F87171'
                                            }}
                                        />
                                    </div>
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', fontWeight: 700, color: gs.signalStrength > 90 ? '#34D399' : gs.signalStrength > 75 ? '#FBBF24' : '#F87171' }}>
                                        {gs.signalStrength}%
                                    </span>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '16px', fontWeight: 900, color: '#00FFCC' }}>{gs.activeTracking}</div>
                                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '7px', color: '#00FFCC60' }}>TRACKING</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0,255,204,0.15)', padding: '20px' }}
                    >
                        <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '14px', fontWeight: 900, color: '#00FFCC', letterSpacing: '2px', marginBottom: '4px' }}>
                            {selected.name}
                        </div>
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#ffffff40', marginBottom: '16px' }}>
                            {selected.location}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                            <div style={{ padding: '12px', background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.15)', textAlign: 'center' }}>
                                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', fontWeight: 700, color: statusColor(selected.uplink) }}>
                                    {selected.uplink}
                                </div>
                                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '7px', color: '#ffffff40', marginTop: '2px' }}>UPLINK</div>
                            </div>
                            <div style={{ padding: '12px', background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.15)', textAlign: 'center' }}>
                                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', fontWeight: 700, color: statusColor(selected.downlink) }}>
                                    {selected.downlink}
                                </div>
                                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '7px', color: '#ffffff40', marginTop: '2px' }}>DOWNLINK</div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                            <MiniData label="SIGNAL STRENGTH" value={`${selected.signalStrength}%`} color={selected.signalStrength > 90 ? '#34D399' : '#FBBF24'} />
                            <MiniData label="ACTIVE TRACKING" value={selected.activeTracking.toString()} color="#00FFCC" />
                            <MiniData label="FREQUENCY BANDS" value={selected.frequency} color="#ffffff80" />
                        </div>

                        <div style={{ borderTop: '1px solid rgba(0,255,204,0.08)', paddingTop: '12px' }}>
                            <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '8px', color: '#00FFCC80', letterSpacing: '1px', marginBottom: '8px' }}>TELEMETRY STREAM</div>
                            <div style={{ padding: '8px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0,255,204,0.06)', fontFamily: 'JetBrains Mono, monospace', fontSize: '9px' }}>
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                                        style={{ color: '#00FFCC80', marginBottom: '2px' }}
                                    >
                                        [{new Date().toISOString().substring(11, 19)}] TLM_CH{i + 1}: {(Math.random() * 100).toFixed(2)} dBm — LOCK
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const StatBar = ({ icon, label, value, color }) => (
    <div style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px', borderRight: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ color }}>{icon}</div>
        <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '7px', color: color + '80', letterSpacing: '1px', textTransform: 'uppercase' }}>{label}</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '14px', fontWeight: 900, color: '#fff' }}>{value}</div>
        </div>
    </div>
);

const SectionTitle = ({ icon, title }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: '#00FFCC' }}>{icon}</span>
        <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '11px', fontWeight: 700, color: '#00FFCC', letterSpacing: '2px' }}>{title}</span>
    </div>
);

const SectionCard = ({ title, icon, children }) => (
    <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(0,255,204,0.08)', padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid rgba(0,255,204,0.06)' }}>
            <span style={{ color: '#00FFCC' }}>{icon}</span>
            <span style={{ color: '#00FFCC', fontSize: '10px', fontFamily: 'Orbitron, monospace', fontWeight: 700, letterSpacing: '2px' }}>{title}</span>
        </div>
        {children}
    </div>
);

const MiniData = ({ label, value, color = '#ffffff80' }) => (
    <div style={{ marginBottom: '4px' }}>
        <div style={{ color: '#ffffff30', fontSize: '8px', fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>{label}</div>
        <div style={{ color, fontSize: '11px', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>{value}</div>
    </div>
);

export default SpaceCommand;
