import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Shield, Activity, Lock, Rocket, Target, Radio,
    Anchor, Plane, Crosshair, Eye, CheckCircle,
    ShieldAlert, Bomb, MapPin, AlertTriangle, Fingerprint,
    Users, Zap, Navigation, Clock, Flame, ChevronRight
} from 'lucide-react';

const LAND_MISSILES = [
    { id: 'AGNI-V', name: 'Agni-V', range: '5,000–8,000 km', rangeKm: 8000, warhead: '150 kT–1 MT', readiness: 95, deployment: 'Central India (Classified)', tels: 12, type: 'ICBM', status: 'OPERATIONAL' },
    { id: 'AGNI-IV', name: 'Agni-IV', range: '4,000 km', rangeKm: 4000, warhead: '150 kT', readiness: 90, deployment: 'Eastern Command Zone', tels: 8, type: 'IRBM', status: 'OPERATIONAL' },
    { id: 'AGNI-III', name: 'Agni-III', range: '3,000 km', rangeKm: 3000, warhead: '200 kT', readiness: 92, deployment: 'Northern Sector', tels: 10, type: 'IRBM', status: 'OPERATIONAL' },
    { id: 'AGNI-P', name: 'Agni-P (Prime)', range: '2,000 km', rangeKm: 2000, warhead: 'MIRV (3–6 warheads)', readiness: 78, deployment: 'Western Command Zone', tels: 6, type: 'MRBM / MIRV', status: 'DEPLOYMENT' },
    { id: 'PRITHVI-II', name: 'Prithvi-II', range: '350 km', rangeKm: 350, warhead: '12 kT', readiness: 88, deployment: 'Forward Bases', tels: 16, type: 'SRBM', status: 'OPERATIONAL' }
];

const AIR_PLATFORMS = [
    { id: 'SU30', name: 'Su-30MKI', base: 'Halwara / Thanjavur', alertStatus: 'READY', weaponLoaded: 'BrahMos-A (Nuclear)', squadron: '222 Sqn "Tigersharks"', range: '3,000 km combat', status: 'OPERATIONAL' },
    { id: 'RAFALE', name: 'Rafale', base: 'Ambala / Hasimara', alertStatus: 'READY', weaponLoaded: 'ASMP-A Equivalent', squadron: '17 Sqn "Golden Arrows"', range: '3,700 km combat', status: 'OPERATIONAL' },
    { id: 'MIRAGE', name: 'Mirage 2000H', base: 'Gwalior', alertStatus: 'STANDBY', weaponLoaded: 'Gravity Bomb (Nuclear)', squadron: '7 Sqn "Battleaxes"', range: '1,850 km combat', status: 'OPERATIONAL' }
];

const SEA_PLATFORMS = [
    { id: 'ARIHANT', name: 'INS Arihant (S2)', missile: 'K-15 Sagarika SLBM', missileRange: '750 km', missilesLoaded: 12, patrolStatus: 'ON DETERRENT PATROL', depth: '150m (est)', position: 'CLASSIFIED — Bay of Bengal', reactor: '83 MW PWR', status: 'OPERATIONAL' },
    { id: 'ARIGHAT', name: 'INS Arighat (S3)', missile: 'K-4 SLBM', missileRange: '3,500 km', missilesLoaded: 8, patrolStatus: 'ON DETERRENT PATROL', depth: '200m (est)', position: 'CLASSIFIED — Arabian Sea', reactor: '83 MW PWR', status: 'OPERATIONAL' }
];

const NUCLEAR_TARGETS = [
    { id: 'T1', name: 'Sargodha Air Base', country: 'Pakistan', type: 'MILITARY', coords: '32.0493° N, 72.6653° E', distKm: 680, strategic: 'PAF nuclear-capable F-16 base, major strike complex', priority: 'ALPHA' },
    { id: 'T2', name: 'Kamra / Minhas Air Base', country: 'Pakistan', type: 'MILITARY', coords: '33.8691° N, 72.4012° E', distKm: 620, strategic: 'Pakistan Aeronautical Complex, JF-17 production', priority: 'ALPHA' },
    { id: 'T3', name: 'Kahuta Research Labs (KRL)', country: 'Pakistan', type: 'NUCLEAR FACILITY', coords: '33.5825° N, 73.1864° E', distKm: 640, strategic: 'Uranium enrichment, Khan Research Laboratories', priority: 'ALPHA' },
    { id: 'T4', name: 'Khushab Nuclear Complex', country: 'Pakistan', type: 'NUCLEAR FACILITY', coords: '32.0167° N, 72.2167° E', distKm: 710, strategic: 'Plutonium production reactors, weapons-grade material', priority: 'ALPHA' },
    { id: 'T5', name: 'Gwadar Naval Base', country: 'Pakistan', type: 'NAVAL', coords: '25.1264° N, 62.3225° E', distKm: 1200, strategic: 'Chinese-built deep water port, PLAN projection', priority: 'BRAVO' },
    { id: 'T6', name: 'Aksai Chin Forward Base', country: 'China', type: 'MILITARY', coords: '35.2° N, 79.9° E', distKm: 480, strategic: 'PLA Western Theater forward deployment zone', priority: 'ALPHA' },
    { id: 'T7', name: 'Hotan Air Base', country: 'China', type: 'MILITARY', coords: '37.0383° N, 79.8647° E', distKm: 750, strategic: 'PLAAF fighter base, J-20 forward deployment', priority: 'BRAVO' },
    { id: 'T8', name: 'Lhasa Gonggar Base', country: 'China', type: 'MILITARY', coords: '29.2948° N, 90.9120° E', distKm: 1100, strategic: 'Tibet Military District HQ, logistics hub', priority: 'BRAVO' },
    { id: 'T9', name: 'Kunming PLARF Base', country: 'China', type: 'MISSILE', coords: '25.0389° N, 102.7183° E', distKm: 2400, strategic: 'PLA Rocket Force DF-26 deployment zone', priority: 'CHARLIE' },
    { id: 'T10', name: 'Chengdu Military Region', country: 'China', type: 'C2 NODE', coords: '30.5723° N, 104.0665° E', distKm: 2800, strategic: 'Western Theater Command headquarters', priority: 'CHARLIE' },
    { id: 'CUSTOM', name: 'Custom Coordinates', country: 'Manual Entry', type: 'CUSTOM', coords: 'USER DEFINED', distKm: 0, strategic: 'User-specified target coordinates', priority: 'VARIABLE' }
];

const AUTHORITY_HEADS = [
    { id: 'PRESIDENT', name: 'Smt. Droupadi Murmu', title: 'President of India', subtitle: 'Supreme Commander of Armed Forces', icon: Shield, color: '#A78BFA', avatar: 'DM', scanType: 'RETINAL + BIOMETRIC', authCode: 'TRIDENT-ALPHA' },
    { id: 'COAS', name: 'Gen. Upendra Dwivedi', title: 'Chief of Army Staff', subtitle: 'COAS — Indian Army', icon: Target, color: '#34D399', avatar: 'UD', scanType: 'FINGERPRINT + VOICE', authCode: 'THUNDER-STRIKE' },
    { id: 'CNS', name: 'Adm. Dinesh Kumar Tripathi', title: 'Chief of Naval Staff', subtitle: 'CNS — Indian Navy', icon: Anchor, color: '#60A5FA', avatar: 'DT', scanType: 'PALMPRINT + RETINAL', authCode: 'TRIDENT-NEPTUNE' },
    { id: 'CAS', name: 'Air Chf Mshl A.P. Singh', title: 'Chief of Air Staff', subtitle: 'CAS — Indian Air Force', icon: Plane, color: '#FBBF24', avatar: 'AS', scanType: 'RETINAL + DNA KEY', authCode: 'VAYU-PRAHAR' },
    { id: 'NSA', name: 'Shri Ajit Doval', title: 'National Security Advisor', subtitle: 'NSA — Cabinet Secretariat', icon: Eye, color: '#F472B6', avatar: 'AD', scanType: 'MULTI-BIOMETRIC', authCode: 'SHADOW-PRIME' }
];

const ARMY_ENGAGEMENT_UNITS = [
    { id: 'STRIKE1', name: '1st Strike Corps (Mathura)', type: 'ARMORED', strength: '45,000', readiness: 94 },
    { id: 'STRIKE2', name: '2nd Strike Corps (Ambala)', type: 'MECHANIZED', strength: '38,000', readiness: 91 },
    { id: 'RAPID', name: '17th Mountain Strike Corps', type: 'MOUNTAIN', strength: '35,000', readiness: 88 },
    { id: 'PARASF', name: 'Para SF (Special Forces)', type: 'SPECIAL OPS', strength: '9,500', readiness: 97 },
    { id: 'ARTY', name: 'Regiment of Artillery (Nuclear)', type: 'NUCLEAR ARTY', strength: '12,000', readiness: 92 },
    { id: 'MARCOS', name: 'MARCOS (Marine Commandos)', type: 'NAVAL SF', strength: '3,000', readiness: 96 },
    { id: 'GARUD', name: 'Garud Commando Force', type: 'AIR FORCE SF', strength: '2,100', readiness: 95 },
    { id: 'CARRIER', name: 'INS Vikrant Carrier Group', type: 'CARRIER STRIKE', strength: '8 ships', readiness: 90 }
];

const EARLY_WARNING_SYSTEMS = [
    { id: 'BMEW', name: 'Ballistic Missile Early Warning', type: 'Ground-Based Radar', status: 'ACTIVE', coverage: '5,000 km', location: 'Rajasthan Sector' },
    { id: 'SBIRS', name: 'Satellite-Based IR Sensors', type: 'Space-Based', status: 'ACTIVE', coverage: 'Full Hemisphere', location: 'GEO Orbit (GSAT-7C)' },
    { id: 'OTH', name: 'Over-The-Horizon Radar', type: 'OTH-B Radar', status: 'ACTIVE', coverage: '3,000 km', location: 'Eastern Seaboard' },
    { id: 'GPINE', name: 'Green Pine Radar', type: 'Fire Control Radar', status: 'STANDBY', coverage: '800 km', location: 'Western Air Command' }
];

const WARHEAD_DATA = {
    estimated: '~164',
    fissile: [
        { type: 'Weapons-Grade Plutonium', status: 'PRODUCING', facility: 'BARC, Trombay' },
        { type: 'Highly Enriched Uranium', status: 'STOCKPILED', facility: 'Rare Materials Plant, Rattehalli' }
    ],
    tests: [
        { name: 'Pokhran-I (Smiling Buddha)', year: '1974', yield: '12 kT', type: 'Peaceful Nuclear Explosion' },
        { name: 'Pokhran-II (Operation Shakti)', year: '1998', yield: '45 kT (thermonuclear) + 4 sub-kT', type: '5 simultaneous detonations' }
    ]
};

const DOCTRINE_POINTS = [
    { label: 'No-First-Use (NFU)', text: 'Nuclear weapons will only be used in retaliation against a nuclear attack on Indian territory or Indian forces.' },
    { label: 'Credible Minimum Deterrent', text: 'Maintain sufficient capability to inflict unacceptable damage without engaging in an arms race.' },
    { label: 'Massive Retaliation', text: 'Nuclear retaliation to a first strike will be massive and designed to inflict unacceptable damage.' },
    { label: 'Political Control', text: 'Authority to authorize nuclear use rests solely with the elected political leadership through the CCS.' }
];

const STRIKE_PHASES = ['AUTHORIZATION', 'TARGET_SELECT', 'WEAPON_SELECT', 'ARMY_ENGAGE', 'FINAL_CONFIRM', 'LAUNCHING', 'IN_FLIGHT', 'IMPACT'];

const statusColor = (st) => {
    switch (st) {
        case 'OPERATIONAL': case 'ACTIVE': case 'READY': case 'ON DETERRENT PATROL': return '#34D399';
        case 'DEPLOYMENT': case 'STANDBY': case 'PRODUCING': return '#FBBF24';
        case 'OFFLINE': case 'MAINTENANCE': return '#F87171';
        default: return '#60A5FA';
    }
};

const NuclearCommand = ({ onBack }) => {
    const [systemTime, setSystemTime] = useState(new Date());
    const [selectedTriad, setSelectedTriad] = useState('LAND');
    const [alertLevel, setAlertLevel] = useState('DEFCON 4 — NORMAL');

    const [approvals, setApprovals] = useState({});
    const [scanningAuth, setScanningAuth] = useState(null);
    const [scanPhase, setScanPhase] = useState('');
    const allApproved = AUTHORITY_HEADS.every(h => approvals[h.id]);

    const [strikePhase, setStrikePhase] = useState('AUTHORIZATION');
    const [selectedTarget, setSelectedTarget] = useState(null);
    const [selectedWeapon, setSelectedWeapon] = useState(null);
    const [customCoords, setCustomCoords] = useState({ lat: '', lng: '' });
    const [engagedUnits, setEngagedUnits] = useState([]);
    const [missileProgress, setMissileProgress] = useState(0);
    const [impactComplete, setImpactComplete] = useState(false);
    const [launchLog, setLaunchLog] = useState([]);
    const progressRef = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => setSystemTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (allApproved && strikePhase === 'AUTHORIZATION') {
            setAlertLevel('DEFCON 1 — NUCLEAR WAR IMMINENT');
            setTimeout(() => setStrikePhase('TARGET_SELECT'), 1500);
        }
    }, [allApproved, strikePhase]);

    const initiateAuthScan = useCallback((authId) => {
        if (approvals[authId] || scanningAuth) return;
        setScanningAuth(authId);
        const head = AUTHORITY_HEADS.find(h => h.id === authId);
        const phases = ['INITIATING SECURE LINK...', `SCANNING ${head.scanType}...`, 'VERIFYING BIOMETRICS...', `VALIDATING AUTH CODE: ${head.authCode}`, 'CROSS-REFERENCING IDENTITY...', 'AUTHORIZATION GRANTED'];
        let i = 0;
        const interval = setInterval(() => {
            setScanPhase(phases[i]);
            i++;
            if (i >= phases.length) {
                clearInterval(interval);
                setTimeout(() => {
                    setApprovals(prev => ({ ...prev, [authId]: true }));
                    setScanningAuth(null);
                    setScanPhase('');
                }, 600);
            }
        }, 800);
    }, [approvals, scanningAuth]);

    const selectTarget = useCallback((target) => {
        setSelectedTarget(target);
        addLog(`TARGET ACQUIRED: ${target.name} [${target.coords}]`);
    }, []);

    const selectWeapon = useCallback((weapon) => {
        setSelectedWeapon(weapon);
        addLog(`WEAPON SELECTED: ${weapon.name} — ${weapon.warhead} yield`);
    }, []);

    const toggleArmyUnit = useCallback((unitId) => {
        setEngagedUnits(prev =>
            prev.includes(unitId) ? prev.filter(u => u !== unitId) : [...prev, unitId]
        );
    }, []);

    const addLog = (msg) => {
        setLaunchLog(prev => [...prev, { time: new Date().toISOString().substr(11, 8), msg }]);
    };

    const executeLaunch = useCallback(() => {
        setStrikePhase('LAUNCHING');
        addLog('LAUNCH SEQUENCE INITIATED');
        addLog(`DELIVERY: ${selectedWeapon.name} — TARGET: ${selectedTarget.name}`);
        if (engagedUnits.length > 0) {
            addLog(`ARMY ENGAGEMENT: ${engagedUnits.length} UNITS MOBILIZED`);
        }

        setTimeout(() => {
            addLog('LAUNCH CODES TRANSMITTED TO TEL/PLATFORM');
        }, 1500);
        setTimeout(() => {
            addLog('MISSILE IGNITION CONFIRMED — BOOST PHASE');
            setStrikePhase('IN_FLIGHT');
            setMissileProgress(0);

            const totalTime = 45000;
            const startTime = Date.now();
            progressRef.current = setInterval(() => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min((elapsed / totalTime) * 100, 100);
                setMissileProgress(progress);

                if (progress >= 20 && progress < 21) addLog('MIDCOURSE PHASE — EXOATMOSPHERIC TRAJECTORY');
                if (progress >= 50 && progress < 51) addLog('APOGEE REACHED — RE-ENTRY VEHICLE SEPARATING');
                if (progress >= 75 && progress < 76) addLog('TERMINAL PHASE — TARGET ACQUISITION CONFIRMED');
                if (progress >= 95 && progress < 96) addLog('WARHEAD ARMED — DETONATION IMMINENT');

                if (progress >= 100) {
                    clearInterval(progressRef.current);
                    setStrikePhase('IMPACT');
                    setImpactComplete(true);
                    addLog(`IMPACT CONFIRMED — ${selectedTarget.name} — DETONATION SUCCESSFUL`);
                    addLog('DAMAGE ASSESSMENT IN PROGRESS...');
                }
            }, 200);
        }, 4000);
    }, [selectedWeapon, selectedTarget, engagedUnits]);

    const resetAll = useCallback(() => {
        setApprovals({});
        setScanningAuth(null);
        setScanPhase('');
        setStrikePhase('AUTHORIZATION');
        setSelectedTarget(null);
        setSelectedWeapon(null);
        setCustomCoords({ lat: '', lng: '' });
        setEngagedUnits([]);
        setMissileProgress(0);
        setImpactComplete(false);
        setLaunchLog([]);
        setAlertLevel('DEFCON 4 — NORMAL');
        if (progressRef.current) clearInterval(progressRef.current);
    }, []);

    const formatUTC = (date) => date.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
    const approvedCount = AUTHORITY_HEADS.filter(h => approvals[h.id]).length;
    const totalDeliverySystems = LAND_MISSILES.reduce((s, m) => s + m.tels, 0) + AIR_PLATFORMS.length + SEA_PLATFORMS.reduce((s, p) => s + p.missilesLoaded, 0);
    const avgReadiness = Math.round(LAND_MISSILES.reduce((s, m) => s + m.readiness, 0) / LAND_MISSILES.length);
    const phaseIndex = STRIKE_PHASES.indexOf(strikePhase);

    const sty = {
        panel: { padding: '14px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)' },
        label: { fontFamily: 'Orbitron, monospace', fontSize: '10px', letterSpacing: '2.5px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' },
        mono: { fontFamily: 'JetBrains Mono, monospace' },
        tiny: { fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', color: '#ffffff40', letterSpacing: '1px' }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'linear-gradient(135deg, #020617 0%, #0a0a1a 50%, #020617 100%)', color: '#fff', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
        >
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                {Array.from({ length: 40 }).map((_, i) => (
                    <motion.div key={i} animate={{ opacity: [0.05, 0.3, 0.05] }} transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
                        style={{ position: 'absolute', width: '2px', height: '2px', borderRadius: '50%', background: i % 5 === 0 ? '#DC2626' : '#fff', top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }} />
                ))}
            </div>

            <motion.button whileHover={{ scale: 1.1, background: 'rgba(220,38,38,0.3)' }} whileTap={{ scale: 0.9 }} onClick={onBack}
                style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10001, width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(220,38,38,0.15)', border: '1px solid #DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <X size={18} color="#F87171" />
            </motion.button>

            {/* HEADER */}
            <div style={{ padding: '12px 24px', borderBottom: '1px solid rgba(220,38,38,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(220,38,38,0.03)', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <motion.div animate={{ boxShadow: ['0 0 8px rgba(220,38,38,0.4)', '0 0 24px rgba(220,38,38,0.8)', '0 0 8px rgba(220,38,38,0.4)'] }} transition={{ duration: 2, repeat: Infinity }}
                        style={{ width: '14px', height: '14px', borderRadius: '50%', background: allApproved ? '#DC2626' : '#34D399', border: `2px solid ${allApproved ? '#F87171' : '#00FFCC'}` }} />
                    <div>
                        <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '14px', fontWeight: 700, letterSpacing: '3px', color: '#DC2626' }}>
                            NUCLEAR COMMAND AUTHORITY — STRATEGIC FORCES COMMAND
                        </div>
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#ffffff40', marginTop: '2px', letterSpacing: '1px' }}>
                            GOVERNMENT OF INDIA — CCS — COSMIC TOP SECRET // NOFORN
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ padding: '4px 14px', borderRadius: '4px', background: allApproved ? 'rgba(220,38,38,0.2)' : 'rgba(0,255,204,0.08)', border: `1px solid ${allApproved ? '#DC2626' : 'rgba(0,255,204,0.2)'}`, fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: allApproved ? '#F87171' : '#00FFCC', letterSpacing: '2px' }}>
                        {alertLevel}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#00FFCC', letterSpacing: '1px' }}>{formatUTC(systemTime)}</div>
                        <div style={{ ...sty.tiny }}>AUTHORIZATION: {approvedCount}/{AUTHORITY_HEADS.length}</div>
                    </div>
                </div>
            </div>

            {/* PHASE PROGRESS BAR */}
            <div style={{ padding: '6px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)', display: 'flex', gap: '4px', flexShrink: 0, alignItems: 'center' }}>
                {STRIKE_PHASES.map((phase, idx) => (
                    <React.Fragment key={phase}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: idx < phaseIndex ? '#34D399' : idx === phaseIndex ? '#FBBF24' : 'rgba(255,255,255,0.1)', border: `1px solid ${idx <= phaseIndex ? (idx < phaseIndex ? '#34D399' : '#FBBF24') : 'rgba(255,255,255,0.1)'}`, transition: 'all 0.3s' }} />
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '7px', color: idx <= phaseIndex ? '#ffffff80' : '#ffffff25', letterSpacing: '0.5px' }}>{phase.replace('_', ' ')}</span>
                        </div>
                        {idx < STRIKE_PHASES.length - 1 && <div style={{ width: '12px', height: '1px', background: idx < phaseIndex ? '#34D399' : 'rgba(255,255,255,0.08)' }} />}
                    </React.Fragment>
                ))}
            </div>

            {/* STATS BAR */}
            <div style={{ display: 'flex', gap: '6px', padding: '6px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.15)', flexShrink: 0 }}>
                {[
                    { label: 'WARHEADS', value: WARHEAD_DATA.estimated, icon: Bomb, color: '#DC2626' },
                    { label: 'DELIVERY SYSTEMS', value: totalDeliverySystems, icon: Rocket, color: '#F87171' },
                    { label: 'READINESS', value: `${avgReadiness}%`, icon: Activity, color: '#34D399' },
                    { label: 'APPROVALS', value: `${approvedCount}/5`, icon: Fingerprint, color: approvedCount === 5 ? '#34D399' : '#FBBF24' },
                    { label: 'ALERT STATUS', value: allApproved ? 'MAXIMUM' : 'NORMAL', icon: ShieldAlert, color: allApproved ? '#DC2626' : '#FBBF24' }
                ].map((stat) => (
                    <div key={stat.label} style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <stat.icon size={14} color={stat.color} />
                        <div>
                            <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '14px', fontWeight: 700, color: stat.color }}>{stat.value}</div>
                            <div style={{ ...sty.tiny }}>{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* MAIN CONTENT */}
            <div style={{ flex: 1, overflow: 'auto', padding: '12px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

                {/* DOCTRINE */}
                <div style={{ ...sty.panel, background: 'rgba(220,38,38,0.03)', border: '1px solid rgba(220,38,38,0.12)' }}>
                    <div style={{ ...sty.label, color: '#DC2626' }}><Shield size={13} color="#DC2626" />NUCLEAR DOCTRINE — NO-FIRST-USE POLICY</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                        {DOCTRINE_POINTS.map((p) => (
                            <div key={p.label} style={{ padding: '8px 10px', borderRadius: '5px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(220,38,38,0.08)' }}>
                                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '8px', color: '#F87171', letterSpacing: '1.5px', marginBottom: '3px' }}>{p.label}</div>
                                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', color: '#ffffff60', lineHeight: '1.4' }}>{p.text}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', flex: 1, minHeight: 0 }}>
                    {/* LEFT: TRIAD + TARGETS */}
                    <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '12px', overflow: 'auto' }}>

                        {/* NUCLEAR TRIAD */}
                        <div style={{ ...sty.panel, background: 'rgba(0,255,204,0.02)', border: '1px solid rgba(0,255,204,0.1)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <div style={{ ...sty.label, marginBottom: 0, color: '#00FFCC' }}><Crosshair size={13} color="#00FFCC" />NUCLEAR TRIAD STATUS</div>
                                <div style={{ display: 'flex', gap: '4px' }}>
                                    {[{ key: 'LAND', icon: Rocket }, { key: 'AIR', icon: Plane }, { key: 'SEA', icon: Anchor }].map((tab) => (
                                        <motion.button key={tab.key} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setSelectedTriad(tab.key)}
                                            style={{ padding: '3px 12px', borderRadius: '4px', cursor: 'pointer', background: selectedTriad === tab.key ? 'rgba(0,255,204,0.15)' : 'rgba(255,255,255,0.03)', border: `1px solid ${selectedTriad === tab.key ? '#00FFCC' : 'rgba(255,255,255,0.08)'}`, fontFamily: 'Orbitron, monospace', fontSize: '8px', color: selectedTriad === tab.key ? '#00FFCC' : '#ffffff60', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <tab.icon size={10} />{tab.key}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                {selectedTriad === 'LAND' && LAND_MISSILES.map((m) => (
                                    <motion.div key={m.id} whileHover={{ background: 'rgba(0,255,204,0.06)' }} onClick={() => { if (allApproved) selectWeapon(m); }}
                                        style={{ padding: '10px 12px', borderRadius: '5px', background: selectedWeapon?.id === m.id ? 'rgba(220,38,38,0.1)' : 'rgba(0,0,0,0.3)', border: `1px solid ${selectedWeapon?.id === m.id ? '#DC2626' : 'rgba(255,255,255,0.05)'}`, display: 'flex', alignItems: 'center', gap: '12px', cursor: allApproved ? 'pointer' : 'default' }}>
                                        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: statusColor(m.status), boxShadow: `0 0 8px ${statusColor(m.status)}60` }} />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                                                <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '11px', color: '#fff', fontWeight: 700 }}>{m.name}</span>
                                                <span style={{ padding: '1px 6px', borderRadius: '3px', fontSize: '7px', ...sty.mono, background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)', color: '#60A5FA', letterSpacing: '1px' }}>{m.type}</span>
                                                {selectedWeapon?.id === m.id && <span style={{ padding: '1px 6px', borderRadius: '3px', fontSize: '7px', ...sty.mono, background: 'rgba(220,38,38,0.2)', border: '1px solid rgba(220,38,38,0.4)', color: '#F87171', letterSpacing: '1px' }}>SELECTED</span>}
                                            </div>
                                            <div style={{ display: 'flex', gap: '16px', ...sty.mono, fontSize: '8px', color: '#ffffff45' }}>
                                                <span>RANGE: <span style={{ color: '#00FFCC' }}>{m.range}</span></span>
                                                <span>YIELD: <span style={{ color: '#F87171' }}>{m.warhead}</span></span>
                                                <span>TELs: <span style={{ color: '#FBBF24' }}>{m.tels}</span></span>
                                            </div>
                                        </div>
                                        <div style={{ width: '80px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', ...sty.mono, fontSize: '7px', color: '#ffffff35', marginBottom: '2px' }}>
                                                <span>READY</span><span style={{ color: '#00FFCC' }}>{m.readiness}%</span>
                                            </div>
                                            <div style={{ height: '3px', borderRadius: '2px', background: 'rgba(255,255,255,0.06)' }}>
                                                <motion.div initial={{ width: 0 }} animate={{ width: `${m.readiness}%` }} transition={{ duration: 1.5 }}
                                                    style={{ height: '100%', borderRadius: '2px', background: m.readiness >= 90 ? '#34D399' : '#FBBF24' }} />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                                {selectedTriad === 'AIR' && AIR_PLATFORMS.map((p) => (
                                    <motion.div key={p.id} whileHover={{ background: 'rgba(0,255,204,0.06)' }}
                                        style={{ padding: '10px 12px', borderRadius: '5px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <Plane size={16} color={statusColor(p.alertStatus)} />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                                                <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '11px', color: '#fff', fontWeight: 700 }}>{p.name}</span>
                                                <span style={{ padding: '1px 6px', borderRadius: '3px', fontSize: '7px', ...sty.mono, background: `${statusColor(p.alertStatus)}15`, border: `1px solid ${statusColor(p.alertStatus)}30`, color: statusColor(p.alertStatus) }}>{p.alertStatus}</span>
                                            </div>
                                            <div style={{ display: 'flex', gap: '16px', ...sty.mono, fontSize: '8px', color: '#ffffff45' }}>
                                                <span>BASE: <span style={{ color: '#60A5FA' }}>{p.base}</span></span>
                                                <span>WEAPON: <span style={{ color: '#F87171' }}>{p.weaponLoaded}</span></span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                                {selectedTriad === 'SEA' && SEA_PLATFORMS.map((p) => (
                                    <motion.div key={p.id} whileHover={{ background: 'rgba(0,255,204,0.06)' }}
                                        style={{ padding: '10px 12px', borderRadius: '5px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                            <Anchor size={16} color="#60A5FA" />
                                            <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '12px', color: '#fff', fontWeight: 700 }}>{p.name}</span>
                                            <span style={{ padding: '1px 8px', borderRadius: '3px', fontSize: '7px', ...sty.mono, background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)', color: '#34D399' }}>{p.patrolStatus}</span>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', ...sty.mono, fontSize: '8px' }}>
                                            {[{ l: 'MISSILE', v: p.missile, c: '#F87171' }, { l: 'RANGE', v: p.missileRange, c: '#00FFCC' }, { l: 'LOADED', v: p.missilesLoaded, c: '#FBBF24' }].map(f => (
                                                <div key={f.l}><div style={{ color: '#ffffff30', letterSpacing: '1px', marginBottom: '2px' }}>{f.l}</div><div style={{ color: f.c, fontSize: '9px' }}>{f.v}</div></div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* TARGET SELECTION — visible after all approvals */}
                        <AnimatePresence>
                            {(strikePhase === 'TARGET_SELECT' || (phaseIndex > 1 && phaseIndex < 7)) && (
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                    style={{ ...sty.panel, background: 'rgba(220,38,38,0.04)', border: '1px solid rgba(220,38,38,0.2)' }}>
                                    <div style={{ ...sty.label, color: '#DC2626' }}><Target size={13} color="#DC2626" />TARGET LOCATION SELECTION — STRIKE ZONE</div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', maxHeight: '260px', overflow: 'auto' }}>
                                        {NUCLEAR_TARGETS.map((t) => (
                                            <motion.div key={t.id} whileHover={{ background: 'rgba(220,38,38,0.08)' }}
                                                onClick={() => { if (t.id === 'CUSTOM') { selectTarget({ ...t, coords: `${customCoords.lat}, ${customCoords.lng}` }); } else selectTarget(t); }}
                                                style={{ padding: '8px 10px', borderRadius: '5px', background: selectedTarget?.id === t.id ? 'rgba(220,38,38,0.12)' : 'rgba(0,0,0,0.25)', border: `1px solid ${selectedTarget?.id === t.id ? '#DC2626' : 'rgba(255,255,255,0.04)'}`, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: selectedTarget?.id === t.id ? '#DC2626' : 'rgba(255,255,255,0.1)', border: `1px solid ${selectedTarget?.id === t.id ? '#DC2626' : 'rgba(255,255,255,0.15)'}` }} />
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '10px', color: '#fff', fontWeight: 600 }}>{t.name}</span>
                                                        <span style={{ padding: '1px 5px', borderRadius: '2px', fontSize: '6px', ...sty.mono, background: t.priority === 'ALPHA' ? 'rgba(220,38,38,0.15)' : t.priority === 'BRAVO' ? 'rgba(251,191,36,0.15)' : 'rgba(96,165,250,0.15)', color: t.priority === 'ALPHA' ? '#F87171' : t.priority === 'BRAVO' ? '#FBBF24' : '#60A5FA', letterSpacing: '1px' }}>{t.priority}</span>
                                                        <span style={{ padding: '1px 5px', borderRadius: '2px', fontSize: '6px', ...sty.mono, background: 'rgba(167,139,250,0.1)', color: '#A78BFA', letterSpacing: '1px' }}>{t.type}</span>
                                                    </div>
                                                    <div style={{ display: 'flex', gap: '14px', ...sty.mono, fontSize: '7px', color: '#ffffff40', marginTop: '2px' }}>
                                                        <span>{t.country}</span>
                                                        <span>COORDS: <span style={{ color: '#00FFCC' }}>{t.coords}</span></span>
                                                        {t.distKm > 0 && <span>DIST: <span style={{ color: '#FBBF24' }}>{t.distKm} km</span></span>}
                                                    </div>
                                                    {t.id !== 'CUSTOM' && <div style={{ ...sty.mono, fontSize: '7px', color: '#ffffff30', marginTop: '2px' }}>{t.strategic}</div>}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px', alignItems: 'center' }}>
                                        <div style={{ ...sty.mono, fontSize: '8px', color: '#ffffff40', flexShrink: 0 }}>CUSTOM:</div>
                                        <input value={customCoords.lat} onChange={(e) => setCustomCoords(p => ({ ...p, lat: e.target.value }))} placeholder="Latitude"
                                            style={{ flex: 1, padding: '4px 8px', borderRadius: '4px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)', color: '#00FFCC', fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', outline: 'none' }} />
                                        <input value={customCoords.lng} onChange={(e) => setCustomCoords(p => ({ ...p, lng: e.target.value }))} placeholder="Longitude"
                                            style={{ flex: 1, padding: '4px 8px', borderRadius: '4px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)', color: '#00FFCC', fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', outline: 'none' }} />
                                    </div>
                                    {strikePhase === 'TARGET_SELECT' && selectedTarget && (
                                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                            onClick={() => setStrikePhase('WEAPON_SELECT')}
                                            style={{ width: '100%', marginTop: '10px', padding: '10px', borderRadius: '6px', cursor: 'pointer', background: 'rgba(220,38,38,0.15)', border: '2px solid #DC2626', fontFamily: 'Orbitron, monospace', fontSize: '10px', color: '#DC2626', letterSpacing: '3px', fontWeight: 700 }}>
                                            CONFIRM TARGET — PROCEED TO WEAPON SELECT <ChevronRight size={14} style={{ verticalAlign: 'middle' }} />
                                        </motion.button>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', overflow: 'auto' }}>

                        {/* 5-AUTHORITY APPROVAL PANEL */}
                        <div style={{ ...sty.panel, background: allApproved ? 'rgba(220,38,38,0.06)' : 'rgba(167,139,250,0.03)', border: `1px solid ${allApproved ? 'rgba(220,38,38,0.25)' : 'rgba(167,139,250,0.12)'}` }}>
                            <div style={{ ...sty.label, color: '#A78BFA' }}><Lock size={13} color="#A78BFA" />5-AUTHORITY NUCLEAR AUTHORIZATION</div>
                            <div style={{ ...sty.mono, fontSize: '8px', color: '#ffffff35', marginBottom: '10px', letterSpacing: '1px' }}>
                                ALL 5 AUTHORITIES MUST INDEPENDENTLY AUTHORIZE — PRESIDENT + COAS + CNS + CAS + NSA
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                {AUTHORITY_HEADS.map((head) => {
                                    const approved = approvals[head.id];
                                    const scanning = scanningAuth === head.id;
                                    return (
                                        <motion.div key={head.id}
                                            animate={scanning ? { borderColor: [head.color + '30', head.color, head.color + '30'], boxShadow: [`0 0 0px ${head.color}00`, `0 0 16px ${head.color}30`, `0 0 0px ${head.color}00`] } : {}}
                                            transition={scanning ? { duration: 1.2, repeat: Infinity } : {}}
                                            style={{ padding: '8px 10px', borderRadius: '6px', background: approved ? `${head.color}10` : 'rgba(0,0,0,0.3)', border: `1px solid ${approved ? head.color + '40' : 'rgba(255,255,255,0.05)'}`, display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: approved ? `${head.color}20` : 'rgba(255,255,255,0.03)', border: `2px solid ${approved ? head.color : 'rgba(255,255,255,0.1)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Orbitron, monospace', fontSize: '11px', color: approved ? head.color : '#ffffff30', fontWeight: 700, flexShrink: 0 }}>
                                                {approved ? <CheckCircle size={16} color={head.color} /> : head.avatar}
                                            </div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '9px', color: approved ? head.color : '#ffffff60', letterSpacing: '1px', fontWeight: 700 }}>{head.name}</div>
                                                <div style={{ ...sty.mono, fontSize: '7px', color: '#ffffff30', marginTop: '1px' }}>{head.title}</div>
                                                {scanning && (
                                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                                        style={{ ...sty.mono, fontSize: '7px', color: head.color, marginTop: '3px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}><Fingerprint size={10} color={head.color} /></motion.div>
                                                        {scanPhase}
                                                    </motion.div>
                                                )}
                                            </div>
                                            {!approved && !scanning && (
                                                <motion.button whileHover={{ scale: 1.05, boxShadow: `0 0 12px ${head.color}30` }} whileTap={{ scale: 0.95 }}
                                                    onClick={() => initiateAuthScan(head.id)}
                                                    style={{ padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', background: `${head.color}15`, border: `1px solid ${head.color}40`, fontFamily: 'Orbitron, monospace', fontSize: '7px', color: head.color, letterSpacing: '1px' }}>
                                                    AUTHORIZE
                                                </motion.button>
                                            )}
                                            {approved && (
                                                <span style={{ padding: '2px 8px', borderRadius: '3px', fontSize: '7px', ...sty.mono, background: `${head.color}20`, border: `1px solid ${head.color}40`, color: head.color, letterSpacing: '1px' }}>CONFIRMED</span>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </div>

                            <AnimatePresence>
                                {allApproved && (
                                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                        style={{ marginTop: '10px', padding: '12px', borderRadius: '6px', textAlign: 'center', background: 'rgba(220,38,38,0.15)', border: '2px solid #DC2626' }}>
                                        <motion.div animate={{ textShadow: ['0 0 10px #DC262600', '0 0 30px #DC2626', '0 0 10px #DC262600'] }} transition={{ duration: 1.5, repeat: Infinity }}
                                            style={{ fontFamily: 'Orbitron, monospace', fontSize: '13px', fontWeight: 900, color: '#DC2626', letterSpacing: '4px' }}>
                                            ALL 5 AUTHORITIES CONFIRMED
                                        </motion.div>
                                        <div style={{ ...sty.mono, fontSize: '8px', color: '#F87171', marginTop: '4px', letterSpacing: '1px' }}>
                                            NUCLEAR STRIKE AUTHORIZED — SELECT TARGET & WEAPON
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* ARMY ENGAGEMENT PANEL — visible after weapon select */}
                        <AnimatePresence>
                            {(strikePhase === 'WEAPON_SELECT' || strikePhase === 'ARMY_ENGAGE' || strikePhase === 'FINAL_CONFIRM') && (
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                    style={{ ...sty.panel, background: 'rgba(52,211,153,0.03)', border: '1px solid rgba(52,211,153,0.15)' }}>
                                    <div style={{ ...sty.label, color: '#34D399' }}><Users size={13} color="#34D399" />ARMY ENGAGEMENT — FORCE DEPLOYMENT</div>
                                    <div style={{ ...sty.mono, fontSize: '7px', color: '#ffffff30', marginBottom: '8px', letterSpacing: '1px' }}>
                                        SELECT UNITS TO DEPLOY ALONGSIDE NUCLEAR STRIKE (OPTIONAL)
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        {ARMY_ENGAGEMENT_UNITS.map((unit) => {
                                            const engaged = engagedUnits.includes(unit.id);
                                            return (
                                                <motion.div key={unit.id} whileHover={{ background: 'rgba(52,211,153,0.06)' }}
                                                    onClick={() => toggleArmyUnit(unit.id)}
                                                    style={{ padding: '6px 10px', borderRadius: '5px', background: engaged ? 'rgba(52,211,153,0.08)' : 'rgba(0,0,0,0.25)', border: `1px solid ${engaged ? 'rgba(52,211,153,0.3)' : 'rgba(255,255,255,0.04)'}`, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <div style={{ width: '14px', height: '14px', borderRadius: '3px', background: engaged ? '#34D399' : 'transparent', border: `1.5px solid ${engaged ? '#34D399' : 'rgba(255,255,255,0.15)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                        {engaged && <CheckCircle size={10} color="#020617" />}
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '8px', color: engaged ? '#34D399' : '#ffffff70', fontWeight: 600, letterSpacing: '0.5px' }}>{unit.name}</div>
                                                        <div style={{ display: 'flex', gap: '10px', ...sty.mono, fontSize: '7px', color: '#ffffff30' }}>
                                                            <span>{unit.type}</span>
                                                            <span>STR: {unit.strength}</span>
                                                        </div>
                                                    </div>
                                                    <div style={{ width: '50px' }}>
                                                        <div style={{ height: '3px', borderRadius: '2px', background: 'rgba(255,255,255,0.06)' }}>
                                                            <div style={{ height: '100%', borderRadius: '2px', width: `${unit.readiness}%`, background: '#34D399' }} />
                                                        </div>
                                                        <div style={{ ...sty.mono, fontSize: '6px', color: '#ffffff30', textAlign: 'right', marginTop: '1px' }}>{unit.readiness}%</div>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                    {engagedUnits.length > 0 && (
                                        <div style={{ marginTop: '8px', ...sty.mono, fontSize: '8px', color: '#34D399' }}>
                                            {engagedUnits.length} UNITS SELECTED — {ARMY_ENGAGEMENT_UNITS.filter(u => engagedUnits.includes(u.id)).reduce((s, u) => s + parseInt(u.strength.replace(/,/g, '')) || 0, 0).toLocaleString()} PERSONNEL
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* FINAL CONFIRM / WEAPON + LAUNCH */}
                        <AnimatePresence>
                            {strikePhase === 'WEAPON_SELECT' && selectedWeapon && selectedTarget && (
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                    style={{ ...sty.panel, background: 'rgba(220,38,38,0.06)', border: '2px solid rgba(220,38,38,0.3)' }}>
                                    <div style={{ ...sty.label, color: '#F87171' }}><AlertTriangle size={13} color="#F87171" />FINAL STRIKE CONFIRMATION</div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
                                        <div style={{ padding: '8px', borderRadius: '5px', background: 'rgba(0,0,0,0.3)' }}>
                                            <div style={{ ...sty.mono, fontSize: '7px', color: '#ffffff30', letterSpacing: '1px', marginBottom: '3px' }}>TARGET</div>
                                            <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '10px', color: '#DC2626', fontWeight: 700 }}>{selectedTarget.name}</div>
                                            <div style={{ ...sty.mono, fontSize: '7px', color: '#ffffff40', marginTop: '2px' }}>{selectedTarget.country} — {selectedTarget.coords}</div>
                                        </div>
                                        <div style={{ padding: '8px', borderRadius: '5px', background: 'rgba(0,0,0,0.3)' }}>
                                            <div style={{ ...sty.mono, fontSize: '7px', color: '#ffffff30', letterSpacing: '1px', marginBottom: '3px' }}>WEAPON</div>
                                            <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '10px', color: '#FBBF24', fontWeight: 700 }}>{selectedWeapon.name}</div>
                                            <div style={{ ...sty.mono, fontSize: '7px', color: '#ffffff40', marginTop: '2px' }}>YIELD: {selectedWeapon.warhead} — RANGE: {selectedWeapon.range}</div>
                                        </div>
                                    </div>
                                    {engagedUnits.length > 0 && (
                                        <div style={{ padding: '6px 8px', borderRadius: '4px', background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.15)', marginBottom: '10px', ...sty.mono, fontSize: '8px', color: '#34D399' }}>
                                            ARMY ENGAGEMENT: {engagedUnits.length} UNITS MOBILIZED
                                        </div>
                                    )}
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={resetAll}
                                            style={{ flex: 1, padding: '10px', borderRadius: '6px', cursor: 'pointer', background: 'rgba(0,255,204,0.05)', border: '1px solid rgba(0,255,204,0.2)', fontFamily: 'Orbitron, monospace', fontSize: '9px', color: '#00FFCC', letterSpacing: '2px' }}>
                                            ABORT MISSION
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(220,38,38,0.4)' }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={executeLaunch}
                                            style={{ flex: 2, padding: '10px', borderRadius: '6px', cursor: 'pointer', background: 'linear-gradient(135deg, rgba(220,38,38,0.3) 0%, rgba(220,38,38,0.15) 100%)', border: '2px solid #DC2626', fontFamily: 'Orbitron, monospace', fontSize: '11px', color: '#DC2626', letterSpacing: '3px', fontWeight: 900 }}>
                                            <Flame size={14} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                                            EXECUTE NUCLEAR STRIKE
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* MISSILE IN-FLIGHT TRACKER */}
                        <AnimatePresence>
                            {(strikePhase === 'LAUNCHING' || strikePhase === 'IN_FLIGHT' || strikePhase === 'IMPACT') && (
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                    style={{ ...sty.panel, background: impactComplete ? 'rgba(220,38,38,0.1)' : 'rgba(251,191,36,0.04)', border: `2px solid ${impactComplete ? '#DC2626' : '#FBBF24'}` }}>
                                    <div style={{ ...sty.label, color: impactComplete ? '#DC2626' : '#FBBF24' }}>
                                        <Rocket size={13} color={impactComplete ? '#DC2626' : '#FBBF24'} />
                                        {impactComplete ? 'IMPACT CONFIRMED' : strikePhase === 'LAUNCHING' ? 'LAUNCH SEQUENCE' : 'MISSILE IN-FLIGHT TRACKING'}
                                    </div>

                                    <div style={{ marginBottom: '10px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', ...sty.mono, fontSize: '8px', color: '#ffffff40', marginBottom: '4px' }}>
                                            <span>LAUNCH ORIGIN</span>
                                            <span>{Math.round(missileProgress)}%</span>
                                            <span>TARGET: {selectedTarget?.name}</span>
                                        </div>
                                        <div style={{ height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
                                            <motion.div style={{ height: '100%', borderRadius: '4px', width: `${missileProgress}%`, background: impactComplete ? '#DC2626' : missileProgress > 75 ? '#F87171' : missileProgress > 50 ? '#FBBF24' : '#34D399', transition: 'width 0.2s' }} />
                                            {!impactComplete && missileProgress > 0 && (
                                                <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.5, repeat: Infinity }}
                                                    style={{ position: 'absolute', top: '-2px', left: `${missileProgress}%`, transform: 'translateX(-50%)', width: '12px', height: '12px', borderRadius: '50%', background: '#FBBF24', boxShadow: '0 0 12px #FBBF24' }} />
                                            )}
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', ...sty.mono, fontSize: '7px', color: '#ffffff25', marginTop: '3px' }}>
                                            <span>BOOST</span><span>MIDCOURSE</span><span>TERMINAL</span><span>IMPACT</span>
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginBottom: '8px' }}>
                                        {[
                                            { l: 'WEAPON', v: selectedWeapon?.name, c: '#FBBF24' },
                                            { l: 'YIELD', v: selectedWeapon?.warhead, c: '#F87171' },
                                            { l: 'PHASE', v: missileProgress < 20 ? 'BOOST' : missileProgress < 50 ? 'MIDCOURSE' : missileProgress < 90 ? 'TERMINAL' : 'IMPACT', c: missileProgress > 75 ? '#DC2626' : '#00FFCC' }
                                        ].map(d => (
                                            <div key={d.l} style={{ padding: '6px', borderRadius: '4px', background: 'rgba(0,0,0,0.3)' }}>
                                                <div style={{ ...sty.mono, fontSize: '6px', color: '#ffffff25', letterSpacing: '1px' }}>{d.l}</div>
                                                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '10px', color: d.c, fontWeight: 700 }}>{d.v}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <AnimatePresence>
                                        {impactComplete && (
                                            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                                                style={{ padding: '14px', borderRadius: '8px', textAlign: 'center', background: 'rgba(220,38,38,0.2)', border: '2px solid #DC2626', marginBottom: '8px' }}>
                                                <motion.div animate={{ scale: [1, 1.1, 1], textShadow: ['0 0 20px #DC262600', '0 0 40px #DC2626', '0 0 20px #DC262600'] }} transition={{ duration: 2, repeat: Infinity }}
                                                    style={{ fontFamily: 'Orbitron, monospace', fontSize: '18px', fontWeight: 900, color: '#DC2626', letterSpacing: '5px' }}>
                                                    DETONATION CONFIRMED
                                                </motion.div>
                                                <div style={{ ...sty.mono, fontSize: '9px', color: '#F87171', marginTop: '6px' }}>
                                                    {selectedTarget?.name} — {selectedTarget?.country} — {selectedWeapon?.warhead} YIELD
                                                </div>
                                                <div style={{ ...sty.mono, fontSize: '8px', color: '#ffffff40', marginTop: '4px' }}>
                                                    DAMAGE ASSESSMENT & FALLOUT ANALYSIS IN PROGRESS
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {impactComplete && (
                                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={resetAll}
                                            style={{ width: '100%', padding: '8px', borderRadius: '6px', cursor: 'pointer', background: 'rgba(0,255,204,0.05)', border: '1px solid rgba(0,255,204,0.2)', fontFamily: 'Orbitron, monospace', fontSize: '9px', color: '#00FFCC', letterSpacing: '2px' }}>
                                            RESET COMMAND SYSTEM
                                        </motion.button>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* LAUNCH LOG */}
                        {launchLog.length > 0 && (
                            <div style={{ ...sty.panel, background: 'rgba(0,0,0,0.4)', maxHeight: '160px', overflow: 'auto' }}>
                                <div style={{ ...sty.label, color: '#FBBF24', marginBottom: '8px' }}><Clock size={13} color="#FBBF24" />MISSION LOG</div>
                                {launchLog.map((entry, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '8px', padding: '3px 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                        <span style={{ ...sty.mono, fontSize: '7px', color: '#ffffff30', flexShrink: 0 }}>{entry.time}</span>
                                        <span style={{ ...sty.mono, fontSize: '7px', color: '#FBBF24' }}>{entry.msg}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* WARHEAD INVENTORY (compact) */}
                        <div style={{ ...sty.panel, background: 'rgba(248,113,113,0.03)', border: '1px solid rgba(248,113,113,0.1)' }}>
                            <div style={{ ...sty.label, color: '#F87171' }}><Bomb size={13} color="#F87171" />WARHEAD INVENTORY</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', padding: '8px', borderRadius: '5px', background: 'rgba(0,0,0,0.3)' }}>
                                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '24px', fontWeight: 900, color: '#DC2626' }}>{WARHEAD_DATA.estimated}</div>
                                <div style={{ ...sty.mono, fontSize: '8px', color: '#ffffff35', lineHeight: '1.5' }}>
                                    <div>ESTIMATED WARHEADS</div>
                                    <div style={{ color: '#ffffff20' }}>SIPRI / FAS 2025</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                {WARHEAD_DATA.tests.map((t) => (
                                    <div key={t.name} style={{ flex: 1, padding: '5px 8px', borderRadius: '4px', background: 'rgba(0,0,0,0.2)' }}>
                                        <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '8px', color: '#FBBF24' }}>{t.year}</div>
                                        <div style={{ ...sty.mono, fontSize: '7px', color: '#ffffff30', marginTop: '1px' }}>{t.yield}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* EARLY WARNING */}
                <div style={{ ...sty.panel, background: 'rgba(96,165,250,0.03)', border: '1px solid rgba(96,165,250,0.1)', flexShrink: 0 }}>
                    <div style={{ ...sty.label, color: '#60A5FA' }}><Radio size={13} color="#60A5FA" />EARLY WARNING SYSTEMS</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                        {EARLY_WARNING_SYSTEMS.map((sys) => (
                            <div key={sys.id} style={{ padding: '10px', borderRadius: '5px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(96,165,250,0.06)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                                    <motion.div animate={{ background: sys.status === 'ACTIVE' ? ['#34D399', '#34D39960', '#34D399'] : ['#FBBF24', '#FBBF2460', '#FBBF24'] }} transition={{ duration: 2, repeat: Infinity }}
                                        style={{ width: '7px', height: '7px', borderRadius: '50%' }} />
                                    <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '8px', color: statusColor(sys.status), letterSpacing: '1px' }}>{sys.status}</span>
                                </div>
                                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '9px', color: '#fff', fontWeight: 700, marginBottom: '4px' }}>{sys.name}</div>
                                <div style={{ ...sty.mono, fontSize: '7px', color: '#ffffff35', lineHeight: '1.5' }}>
                                    <div>COVERAGE: <span style={{ color: '#60A5FA' }}>{sys.coverage}</span></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default NuclearCommand;
