import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Shield, Anchor, Plane, Target, MapPin, Users, ChevronRight,
    Activity, Eye, Navigation, Award, Star, CheckCircle, Clock,
    Crosshair, Radio, Fuel, Truck, Heart, Zap, Flag, Layers,
    ArrowUpRight, BarChart3, Globe, Wifi, AlertTriangle, Play
} from 'lucide-react';

const THEATERS = {
    NORTHERN: 'northern',
    WESTERN: 'western',
    EASTERN: 'eastern',
    MARITIME: 'maritime',
    ALL: 'all'
};

const THEATER_META = {
    [THEATERS.NORTHERN]: { label: 'Northern Theater', subtitle: 'J&K / Ladakh', icon: Target, color: '#F87171' },
    [THEATERS.WESTERN]: { label: 'Western Theater', subtitle: 'Pakistan Border', icon: Shield, color: '#FBBF24' },
    [THEATERS.EASTERN]: { label: 'Eastern Theater', subtitle: 'China LAC', icon: Crosshair, color: '#60A5FA' },
    [THEATERS.MARITIME]: { label: 'Maritime Theater', subtitle: 'Indian Ocean', icon: Anchor, color: '#A78BFA' },
    [THEATERS.ALL]: { label: 'All Theaters', subtitle: 'Combined View', icon: Globe, color: '#00FFCC' }
};

const OPERATION_PHASES = [
    { id: 1, name: 'Mobilization', desc: 'Force assembly & logistics staging', duration: '48-72 hrs' },
    { id: 2, name: 'Deployment', desc: 'Forward positioning & reconnaissance', duration: '24-48 hrs' },
    { id: 3, name: 'Engagement', desc: 'Active operations & fire missions', duration: 'Variable' },
    { id: 4, name: 'Consolidation', desc: 'Secure objectives & stabilize', duration: '72-96 hrs' }
];

const buildUnits = () => ({
    army: [
        { id: 'INF-1', name: '10th Infantry Division', branch: 'army', type: 'Infantry Divisions', strength: 18000, readiness: 92, location: 'Bathinda', deployed: false },
        { id: 'INF-2', name: '25th Infantry Division', branch: 'army', type: 'Infantry Divisions', strength: 17500, readiness: 88, location: 'Firozpur', deployed: false },
        { id: 'ARM-1', name: '1st Armoured Brigade', branch: 'army', type: 'Armored Brigades', strength: 5200, readiness: 95, location: 'Jaisalmer', deployed: false },
        { id: 'ARM-2', name: '43rd Armoured Brigade', branch: 'army', type: 'Armored Brigades', strength: 4800, readiness: 90, location: 'Hisar', deployed: false },
        { id: 'ART-1', name: '41st Artillery Regiment', branch: 'army', type: 'Artillery Regiments', strength: 3200, readiness: 94, location: 'Nasirabad', deployed: false },
        { id: 'ART-2', name: '171st Field Regiment', branch: 'army', type: 'Artillery Regiments', strength: 2800, readiness: 87, location: 'Devlali', deployed: false },
        { id: 'MTN-1', name: '8th Mountain Division', branch: 'army', type: 'Mountain Divisions', strength: 15000, readiness: 96, location: 'Tezpur', deployed: false },
        { id: 'MTN-2', name: '3rd Mountain Division', branch: 'army', type: 'Mountain Divisions', strength: 14500, readiness: 91, location: 'Leh', deployed: false },
        { id: 'PSF-1', name: '1 Para SF Battalion', branch: 'army', type: 'Para SF Teams', strength: 900, readiness: 99, location: 'Agra', deployed: false },
        { id: 'PSF-2', name: '9 Para SF Battalion', branch: 'army', type: 'Para SF Teams', strength: 850, readiness: 98, location: 'Bangalore', deployed: false }
    ],
    airforce: [
        { id: 'FTR-1', name: 'No. 17 Squadron (Rafale)', branch: 'airforce', type: 'Fighter Squadrons', strength: 18, readiness: 97, location: 'Ambala', deployed: false },
        { id: 'FTR-2', name: 'No. 1 Squadron (Su-30MKI)', branch: 'airforce', type: 'Fighter Squadrons', strength: 20, readiness: 93, location: 'Bareilly', deployed: false },
        { id: 'FTR-3', name: 'No. 45 Squadron (Tejas Mk1)', branch: 'airforce', type: 'Fighter Squadrons', strength: 16, readiness: 89, location: 'Sulur', deployed: false },
        { id: 'BMR-1', name: 'No. 7 Squadron (Jaguar)', branch: 'airforce', type: 'Bomber Wings', strength: 14, readiness: 85, location: 'Ambala', deployed: false },
        { id: 'TRN-1', name: 'No. 44 Squadron (C-17)', branch: 'airforce', type: 'Transport Fleet', strength: 11, readiness: 91, location: 'Hindan', deployed: false },
        { id: 'AWC-1', name: 'No. 50 Squadron (Netra AEW&C)', branch: 'airforce', type: 'AWACS', strength: 3, readiness: 94, location: 'Bhatinda', deployed: false },
        { id: 'UAV-1', name: 'No. 120 Squadron (Heron)', branch: 'airforce', type: 'UAV Squadrons', strength: 12, readiness: 90, location: 'Porbandar', deployed: false }
    ],
    navy: [
        { id: 'CSG-1', name: 'INS Vikrant CSG', branch: 'navy', type: 'Carrier Strike Group', strength: 7500, readiness: 93, location: 'Karwar', deployed: false },
        { id: 'SUB-1', name: 'Eastern Submarine Flotilla', branch: 'navy', type: 'Submarine Flotilla', strength: 2200, readiness: 96, location: 'Visakhapatnam', deployed: false },
        { id: 'SUB-2', name: 'Western Submarine Flotilla', branch: 'navy', type: 'Submarine Flotilla', strength: 1800, readiness: 92, location: 'Mumbai', deployed: false },
        { id: 'DES-1', name: 'Kolkata-class Destroyer Sqn', branch: 'navy', type: 'Destroyer Squadron', strength: 3200, readiness: 95, location: 'Mumbai', deployed: false },
        { id: 'DES-2', name: 'Visakhapatnam-class Sqn', branch: 'navy', type: 'Destroyer Squadron', strength: 2800, readiness: 94, location: 'Visakhapatnam', deployed: false },
        { id: 'AMP-1', name: 'Amphibious Assault Group', branch: 'navy', type: 'Amphibious Force', strength: 4500, readiness: 88, location: 'Port Blair', deployed: false }
    ]
});

const THEATER_DATA = {
    [THEATERS.NORTHERN]: {
        friendly: { divisions: 8, personnel: '280,000', tanks: 850, aircraft: 120, artillery: 1200 },
        enemy: { divisions: 6, personnel: '200,000', tanks: 600, aircraft: 95, artillery: 900 },
        neutral: { observers: 12, un_posts: 5 },
        forceRatio: '1.4:1',
        strategicPoints: ['Siachen Glacier', 'Kargil Heights', 'Leh-Manali Highway', 'Srinagar Air Base', 'Pangong Tso'],
        terrain: 'High altitude mountainous (3,000-6,700m). Glaciated passes. Limited vehicular access. Extreme cold weather ops.',
        weather: 'Heavy snowfall expected. Temps: -25°C to -40°C. Visibility: 2-5 km. Wind: 40-60 kmph.',
        objectives: [
            { id: 'n1', text: 'Secure LAC positions along Depsang Plains', done: false },
            { id: 'n2', text: 'Reinforce Siachen Glacier outposts', done: false },
            { id: 'n3', text: 'Establish air superiority over Ladakh sector', done: false },
            { id: 'n4', text: 'Counter infiltration along LoC', done: true },
            { id: 'n5', text: 'Maintain supply routes through Zoji La', done: false }
        ],
        roe: 'DEFENSIVE — Engage only if fired upon. No first strike. Proportional response authorized.',
        logistics: { ammo: 78, fuel: 65, rations: 82, medical: 71 }
    },
    [THEATERS.WESTERN]: {
        friendly: { divisions: 10, personnel: '350,000', tanks: 1800, aircraft: 200, artillery: 2400 },
        enemy: { divisions: 8, personnel: '280,000', tanks: 1200, aircraft: 150, artillery: 1800 },
        neutral: { observers: 8, un_posts: 3 },
        forceRatio: '1.25:1',
        strategicPoints: ['Wagah-Attari Border', 'Rajasthan Desert Sector', 'Rann of Kutch', 'Barmer Forward Base', 'Longewala Post'],
        terrain: 'Desert & semi-arid plains. Thar Desert operations. Open tank warfare terrain. Sand dune navigation.',
        weather: 'Clear skies. Temps: 15°C-32°C. Visibility: 8-15 km. Sand storms possible.',
        objectives: [
            { id: 'w1', text: 'Maintain defensive posture along IB', done: true },
            { id: 'w2', text: 'Armored reserves at strike readiness', done: false },
            { id: 'w3', text: 'Air defense umbrella over Punjab sector', done: false },
            { id: 'w4', text: 'Electronic warfare superiority in Gujarat', done: false },
            { id: 'w5', text: 'Protect critical infrastructure in border states', done: true }
        ],
        roe: 'ACTIVE DEFENSE — Preemptive strikes authorized on confirmed hostile build-up.',
        logistics: { ammo: 85, fuel: 79, rations: 90, medical: 88 }
    },
    [THEATERS.EASTERN]: {
        friendly: { divisions: 7, personnel: '230,000', tanks: 450, aircraft: 110, artillery: 1100 },
        enemy: { divisions: 9, personnel: '300,000', tanks: 800, aircraft: 180, artillery: 1500 },
        neutral: { observers: 15, un_posts: 0 },
        forceRatio: '0.77:1',
        strategicPoints: ['Tawang', 'Doklam Tri-junction', 'Nathu La Pass', 'Arunachal Forward Posts', 'Chumbi Valley'],
        terrain: 'Dense jungle to high-altitude. Northeast hill terrain. Limited road infrastructure. River crossings required.',
        weather: 'Monsoon approaching. Temps: 5°C-20°C. Visibility: 3-8 km. Heavy rainfall zones.',
        objectives: [
            { id: 'e1', text: 'Reinforce Tawang sector positions', done: false },
            { id: 'e2', text: 'Complete road infrastructure for rapid deployment', done: false },
            { id: 'e3', text: 'Mountain warfare readiness at all forward posts', done: true },
            { id: 'e4', text: 'Establish ISR coverage over Doklam', done: false },
            { id: 'e5', text: 'Pre-position logistics at Walong & Kibithu', done: false }
        ],
        roe: 'HEIGHTENED ALERT — Patrols authorized. No crossing LAC. Escalation requires CDS approval.',
        logistics: { ammo: 62, fuel: 55, rations: 68, medical: 60 }
    },
    [THEATERS.MARITIME]: {
        friendly: { divisions: 3, personnel: '67,000', tanks: 0, aircraft: 80, artillery: 0, ships: 45, submarines: 16 },
        enemy: { divisions: 2, personnel: '40,000', tanks: 0, aircraft: 50, artillery: 0, ships: 30, submarines: 8 },
        neutral: { observers: 20, un_posts: 0 },
        forceRatio: '1.5:1',
        strategicPoints: ['Strait of Malacca (approaches)', 'Gulf of Aden', 'Lakshadweep Islands', 'Andaman & Nicobar', 'Chabahar Port'],
        terrain: 'Open ocean & littoral. Chokepoint operations. Island chain defense. Anti-submarine warfare zones.',
        weather: 'Sea state 3-4. Temps: 28°C-33°C. Visibility: 10-20 km. Cyclone watch in Bay of Bengal.',
        objectives: [
            { id: 'm1', text: 'Maintain IOR surveillance network', done: true },
            { id: 'm2', text: 'Anti-piracy patrols in Gulf of Aden', done: true },
            { id: 'm3', text: 'Submarine deterrence patrol cycle', done: false },
            { id: 'm4', text: 'Carrier battle group deployment to Arabian Sea', done: false },
            { id: 'm5', text: 'Secure SLOC from Persian Gulf to Malacca', done: false }
        ],
        roe: 'FREEDOM OF NAVIGATION — Defend sovereign waters. Board & inspect authority in EEZ.',
        logistics: { ammo: 72, fuel: 68, rations: 85, medical: 80 }
    },
    [THEATERS.ALL]: {
        friendly: { divisions: 28, personnel: '927,000', tanks: 3100, aircraft: 510, artillery: 4700 },
        enemy: { divisions: 25, personnel: '820,000', tanks: 2600, aircraft: 475, artillery: 4200 },
        neutral: { observers: 55, un_posts: 8 },
        forceRatio: '1.13:1',
        strategicPoints: ['Northern LAC', 'Western IB', 'Eastern LAC', 'Indian Ocean Region', 'Nuclear Deterrence'],
        terrain: 'Multi-domain — mountains, deserts, jungles, oceans. Full spectrum operational environment.',
        weather: 'Varied across theaters. Multi-season planning required.',
        objectives: [
            { id: 'a1', text: 'Achieve integrated theater command readiness', done: false },
            { id: 'a2', text: 'Maintain nuclear triad operational status', done: true },
            { id: 'a3', text: 'Full spectrum ISR coverage across all borders', done: false },
            { id: 'a4', text: 'Joint forces interoperability validation', done: false },
            { id: 'a5', text: 'Strategic reserves at 72-hour deploy readiness', done: false }
        ],
        roe: 'NATIONAL DIRECTIVE — CDS-level authorization. Theater-specific ROE in effect.',
        logistics: { ammo: 74, fuel: 67, rations: 81, medical: 75 }
    }
};

const COMM_CHANNELS = [
    { name: 'SATCOM Primary', status: 'ONLINE', latency: '12ms' },
    { name: 'HF Radio Network', status: 'ONLINE', latency: '45ms' },
    { name: 'Fiber Backbone', status: 'ONLINE', latency: '3ms' },
    { name: 'Tactical Mesh', status: 'DEGRADED', latency: '120ms' }
];

const orbitron = "'Orbitron', monospace";
const jetbrains = "'JetBrains Mono', monospace";

const WarRoomPlanner = ({ onBack }) => {
    const [activeTheater, setActiveTheater] = useState(THEATERS.NORTHERN);
    const [units, setUnits] = useState(buildUnits);
    const [activePhase, setActivePhase] = useState(1);
    const [objectives, setObjectives] = useState(() => {
        const map = {};
        Object.entries(THEATER_DATA).forEach(([key, val]) => {
            map[key] = val.objectives.map(o => ({ ...o }));
        });
        return map;
    });
    const [expandedBranch, setExpandedBranch] = useState('army');

    const theaterData = THEATER_DATA[activeTheater];
    const theaterObjectives = objectives[activeTheater];

    const deployUnit = useCallback((unitId, branch) => {
        setUnits(prev => {
            const updated = { ...prev };
            updated[branch] = prev[branch].map(u =>
                u.id === unitId ? { ...u, deployed: !u.deployed } : u
            );
            return updated;
        });
    }, []);

    const toggleObjective = useCallback((objId) => {
        setObjectives(prev => ({
            ...prev,
            [activeTheater]: prev[activeTheater].map(o =>
                o.id === objId ? { ...o, done: !o.done } : o
            )
        }));
    }, [activeTheater]);

    const allUnits = [...units.army, ...units.airforce, ...units.navy];
    const deployedCount = allUnits.filter(u => u.deployed).length;
    const totalStrength = allUnits.filter(u => u.deployed).reduce((s, u) => s + u.strength, 0);

    const airUnitsDeployed = units.airforce.filter(u => u.deployed).length;
    const airSuperiority = units.airforce.length > 0 ? Math.round((airUnitsDeployed / units.airforce.length) * 100) : 0;
    const navalDeployed = units.navy.filter(u => u.deployed).length;
    const navalDominance = units.navy.length > 0 ? Math.round((navalDeployed / units.navy.length) * 100) : 0;
    const supplyStatus = Math.round((theaterData.logistics.ammo + theaterData.logistics.fuel + theaterData.logistics.rations + theaterData.logistics.medical) / 4);

    const readinessColor = (r) => r >= 95 ? '#00FFCC' : r >= 85 ? '#34D399' : r >= 70 ? '#FBBF24' : '#F87171';

    const BranchIcon = ({ branch, size = 16 }) => {
        if (branch === 'army') return <Shield size={size} />;
        if (branch === 'airforce') return <Plane size={size} />;
        return <Anchor size={size} />;
    };

    const ProgressBar = ({ value, color, height = 8 }) => (
        <div style={{ width: '100%', height, background: 'rgba(255,255,255,0.08)', borderRadius: height / 2, overflow: 'hidden' }}>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{ height: '100%', background: color || '#00FFCC', borderRadius: height / 2 }}
            />
        </div>
    );

    const logisticsColor = (v) => v >= 80 ? '#34D399' : v >= 60 ? '#FBBF24' : '#DC2626';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                background: 'linear-gradient(135deg, #020617 0%, #0a0a1a 50%, #020617 100%)',
                zIndex: 9999, display: 'flex', flexDirection: 'column', overflow: 'hidden',
                fontFamily: jetbrains, color: '#E2E8F0'
            }}
        >
            <motion.button
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onBack}
                style={{
                    position: 'absolute', top: 16, right: 16, zIndex: 10001,
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'rgba(220, 38, 38, 0.2)', border: '2px solid #DC2626',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: '#F87171'
                }}
            >
                <X size={20} />
            </motion.button>

            <div style={{
                background: 'rgba(0,0,0,0.4)', borderBottom: '1px solid rgba(0,255,204,0.15)',
                padding: '10px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                flexShrink: 0
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <Crosshair size={28} color="#00FFCC" />
                    <div>
                        <h1 style={{
                            fontFamily: orbitron, fontSize: 18, fontWeight: 700,
                            color: '#00FFCC', margin: 0, letterSpacing: 3, lineHeight: 1.2
                        }}>
                            WAR ROOM — STRATEGIC BATTLE PLANNER
                        </h1>
                        <span style={{ fontSize: 10, color: '#64748B', letterSpacing: 1 }}>
                            INDIAN ARMED FORCES JOINT OPERATIONS CENTER
                        </span>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                    {[
                        { label: 'FORCES DEPLOYED', value: `${deployedCount} / ${allUnits.length}`, icon: Users, color: '#00FFCC' },
                        { label: 'STRENGTH', value: totalStrength.toLocaleString(), icon: Shield, color: '#34D399' },
                        { label: 'AIR SUPERIORITY', value: `${airSuperiority}%`, icon: Plane, color: '#60A5FA' },
                        { label: 'NAVAL DOMINANCE', value: `${navalDominance}%`, icon: Anchor, color: '#A78BFA' },
                        { label: 'SUPPLY LINES', value: `${supplyStatus}%`, icon: Truck, color: supplyStatus >= 75 ? '#34D399' : supplyStatus >= 50 ? '#FBBF24' : '#DC2626' }
                    ].map((stat) => (
                        <motion.div
                            key={stat.label}
                            whileHover={{ scale: 1.04 }}
                            style={{
                                background: 'rgba(0,255,204,0.04)', border: '1px solid rgba(0,255,204,0.12)',
                                borderRadius: 8, padding: '6px 14px', minWidth: 120, textAlign: 'center'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 2 }}>
                                <stat.icon size={12} color={stat.color} />
                                <span style={{ fontSize: 9, color: '#64748B', letterSpacing: 1, fontFamily: orbitron }}>{stat.label}</span>
                            </div>
                            <span style={{ fontSize: 16, fontWeight: 700, color: stat.color, fontFamily: orbitron }}>{stat.value}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div style={{
                display: 'flex', gap: 2, padding: '0 24px',
                background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(0,255,204,0.08)',
                flexShrink: 0
            }}>
                {Object.entries(THEATER_META).map(([key, meta]) => {
                    const Icon = meta.icon;
                    const active = activeTheater === key;
                    return (
                        <motion.button
                            key={key}
                            whileHover={{ backgroundColor: 'rgba(0,255,204,0.08)' }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setActiveTheater(key)}
                            style={{
                                padding: '10px 18px', cursor: 'pointer',
                                background: active ? 'rgba(0,255,204,0.1)' : 'transparent',
                                border: 'none', borderBottom: active ? `2px solid ${meta.color}` : '2px solid transparent',
                                display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s'
                            }}
                        >
                            <Icon size={16} color={active ? meta.color : '#475569'} />
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontSize: 11, fontWeight: 600, color: active ? meta.color : '#94A3B8', fontFamily: orbitron, letterSpacing: 1 }}>
                                    {meta.label}
                                </div>
                                <div style={{ fontSize: 9, color: '#475569' }}>{meta.subtitle}</div>
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            <div style={{ flex: 1, display: 'flex', overflow: 'hidden', padding: '8px' }}>
                <div style={{
                    width: 300, flexShrink: 0, display: 'flex', flexDirection: 'column',
                    background: 'rgba(0,0,0,0.3)', borderRadius: 10,
                    border: '1px solid rgba(0,255,204,0.1)', marginRight: 8, overflow: 'hidden'
                }}>
                    <div style={{
                        padding: '10px 14px', borderBottom: '1px solid rgba(0,255,204,0.1)',
                        display: 'flex', alignItems: 'center', gap: 8
                    }}>
                        <Layers size={16} color="#00FFCC" />
                        <span style={{ fontFamily: orbitron, fontSize: 11, color: '#00FFCC', letterSpacing: 2 }}>FORCE DEPLOYMENT</span>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', padding: 8 }}>
                        {['army', 'airforce', 'navy'].map(branch => {
                            const branchUnits = units[branch];
                            const branchLabel = branch === 'airforce' ? 'AIR FORCE' : branch.toUpperCase();
                            const branchColor = branch === 'army' ? '#34D399' : branch === 'airforce' ? '#60A5FA' : '#A78BFA';
                            const isExpanded = expandedBranch === branch;
                            const deployedInBranch = branchUnits.filter(u => u.deployed).length;

                            return (
                                <div key={branch} style={{ marginBottom: 6 }}>
                                    <motion.button
                                        whileHover={{ backgroundColor: 'rgba(0,255,204,0.06)' }}
                                        onClick={() => setExpandedBranch(isExpanded ? null : branch)}
                                        style={{
                                            width: '100%', padding: '8px 10px', cursor: 'pointer',
                                            background: isExpanded ? 'rgba(0,255,204,0.05)' : 'transparent',
                                            border: '1px solid', borderColor: isExpanded ? `${branchColor}33` : 'rgba(255,255,255,0.05)',
                                            borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <BranchIcon branch={branch} size={14} />
                                            <span style={{ fontFamily: orbitron, fontSize: 10, color: branchColor, letterSpacing: 1 }}>{branchLabel}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <span style={{ fontSize: 10, color: '#64748B' }}>{deployedInBranch}/{branchUnits.length}</span>
                                            <motion.div animate={{ rotate: isExpanded ? 90 : 0 }}>
                                                <ChevronRight size={14} color="#475569" />
                                            </motion.div>
                                        </div>
                                    </motion.button>

                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                                style={{ overflow: 'hidden' }}
                                            >
                                                {branchUnits.map(unit => (
                                                    <motion.div
                                                        key={unit.id}
                                                        layout
                                                        whileHover={{ backgroundColor: 'rgba(0,255,204,0.06)' }}
                                                        onClick={() => deployUnit(unit.id, branch)}
                                                        style={{
                                                            padding: '8px 10px', margin: '3px 0', cursor: 'pointer',
                                                            borderRadius: 6, border: '1px solid',
                                                            borderColor: unit.deployed ? 'rgba(0,255,204,0.3)' : 'rgba(255,255,255,0.04)',
                                                            background: unit.deployed ? 'rgba(0,255,204,0.06)' : 'transparent',
                                                            transition: 'all 0.2s'
                                                        }}
                                                    >
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                                                            <span style={{ fontSize: 10, fontWeight: 600, color: unit.deployed ? '#00FFCC' : '#CBD5E1' }}>
                                                                {unit.name}
                                                            </span>
                                                            <AnimatePresence mode="wait">
                                                                {unit.deployed ? (
                                                                    <motion.span
                                                                        key="deployed"
                                                                        initial={{ scale: 0 }}
                                                                        animate={{ scale: 1 }}
                                                                        exit={{ scale: 0 }}
                                                                        style={{
                                                                            fontSize: 8, padding: '2px 6px', borderRadius: 4,
                                                                            background: 'rgba(0,255,204,0.2)', color: '#00FFCC',
                                                                            fontFamily: orbitron, letterSpacing: 1
                                                                        }}
                                                                    >
                                                                        DEPLOYED
                                                                    </motion.span>
                                                                ) : (
                                                                    <motion.span
                                                                        key="standby"
                                                                        initial={{ scale: 0 }}
                                                                        animate={{ scale: 1 }}
                                                                        exit={{ scale: 0 }}
                                                                        style={{
                                                                            fontSize: 8, padding: '2px 6px', borderRadius: 4,
                                                                            background: 'rgba(100,116,139,0.2)', color: '#64748B',
                                                                            fontFamily: orbitron, letterSpacing: 1
                                                                        }}
                                                                    >
                                                                        STANDBY
                                                                    </motion.span>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>
                                                        <div style={{ display: 'flex', gap: 10, fontSize: 9, color: '#64748B' }}>
                                                            <span><Users size={9} style={{ marginRight: 3, verticalAlign: 'middle' }} />{typeof unit.strength === 'number' ? unit.strength.toLocaleString() : unit.strength}</span>
                                                            <span style={{ color: readinessColor(unit.readiness) }}>
                                                                <Activity size={9} style={{ marginRight: 3, verticalAlign: 'middle' }} />{unit.readiness}%
                                                            </span>
                                                        </div>
                                                        <div style={{ fontSize: 9, color: '#475569', marginTop: 2 }}>
                                                            <MapPin size={9} style={{ marginRight: 3, verticalAlign: 'middle' }} />{unit.location}
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTheater}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            flex: 1, display: 'flex', flexDirection: 'column',
                            background: 'rgba(0,0,0,0.3)', borderRadius: 10,
                            border: '1px solid rgba(0,255,204,0.1)', overflow: 'hidden'
                        }}
                    >
                        <div style={{
                            padding: '10px 14px', borderBottom: '1px solid rgba(0,255,204,0.1)',
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <Eye size={16} color={THEATER_META[activeTheater].color} />
                                <span style={{ fontFamily: orbitron, fontSize: 11, color: THEATER_META[activeTheater].color, letterSpacing: 2 }}>
                                    BATTLE SITUATION — {THEATER_META[activeTheater].label.toUpperCase()}
                                </span>
                            </div>
                            <span style={{ fontSize: 10, color: '#475569' }}>
                                <Clock size={10} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                                LIVE FEED
                            </span>
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto', padding: 14 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 14 }}>
                                <div style={{
                                    padding: 12, borderRadius: 8, background: 'rgba(52,211,153,0.06)',
                                    border: '1px solid rgba(52,211,153,0.2)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#34D399' }} />
                                        <span style={{ fontFamily: orbitron, fontSize: 10, color: '#34D399', letterSpacing: 1 }}>FRIENDLY FORCES</span>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, fontSize: 10 }}>
                                        <div><span style={{ color: '#64748B' }}>Divisions: </span><span style={{ color: '#34D399', fontWeight: 600 }}>{theaterData.friendly.divisions}</span></div>
                                        <div><span style={{ color: '#64748B' }}>Personnel: </span><span style={{ color: '#34D399', fontWeight: 600 }}>{theaterData.friendly.personnel}</span></div>
                                        <div><span style={{ color: '#64748B' }}>Tanks: </span><span style={{ color: '#34D399', fontWeight: 600 }}>{theaterData.friendly.tanks.toLocaleString()}</span></div>
                                        <div><span style={{ color: '#64748B' }}>Aircraft: </span><span style={{ color: '#34D399', fontWeight: 600 }}>{theaterData.friendly.aircraft}</span></div>
                                        {theaterData.friendly.ships && (
                                            <div><span style={{ color: '#64748B' }}>Ships: </span><span style={{ color: '#34D399', fontWeight: 600 }}>{theaterData.friendly.ships}</span></div>
                                        )}
                                        {theaterData.friendly.submarines && (
                                            <div><span style={{ color: '#64748B' }}>Submarines: </span><span style={{ color: '#34D399', fontWeight: 600 }}>{theaterData.friendly.submarines}</span></div>
                                        )}
                                    </div>
                                </div>

                                <div style={{
                                    padding: 12, borderRadius: 8, background: 'rgba(220,38,38,0.06)',
                                    border: '1px solid rgba(220,38,38,0.2)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#DC2626' }} />
                                        <span style={{ fontFamily: orbitron, fontSize: 10, color: '#F87171', letterSpacing: 1 }}>ENEMY FORCES</span>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, fontSize: 10 }}>
                                        <div><span style={{ color: '#64748B' }}>Divisions: </span><span style={{ color: '#F87171', fontWeight: 600 }}>{theaterData.enemy.divisions}</span></div>
                                        <div><span style={{ color: '#64748B' }}>Personnel: </span><span style={{ color: '#F87171', fontWeight: 600 }}>{theaterData.enemy.personnel}</span></div>
                                        <div><span style={{ color: '#64748B' }}>Tanks: </span><span style={{ color: '#F87171', fontWeight: 600 }}>{theaterData.enemy.tanks.toLocaleString()}</span></div>
                                        <div><span style={{ color: '#64748B' }}>Aircraft: </span><span style={{ color: '#F87171', fontWeight: 600 }}>{theaterData.enemy.aircraft}</span></div>
                                        {theaterData.enemy.ships && (
                                            <div><span style={{ color: '#64748B' }}>Ships: </span><span style={{ color: '#F87171', fontWeight: 600 }}>{theaterData.enemy.ships}</span></div>
                                        )}
                                        {theaterData.enemy.submarines && (
                                            <div><span style={{ color: '#64748B' }}>Submarines: </span><span style={{ color: '#F87171', fontWeight: 600 }}>{theaterData.enemy.submarines}</span></div>
                                        )}
                                    </div>
                                </div>

                                <div style={{
                                    padding: 12, borderRadius: 8, background: 'rgba(251,191,36,0.06)',
                                    border: '1px solid rgba(251,191,36,0.2)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FBBF24' }} />
                                        <span style={{ fontFamily: orbitron, fontSize: 10, color: '#FBBF24', letterSpacing: 1 }}>NEUTRAL / INTEL</span>
                                    </div>
                                    <div style={{ fontSize: 10 }}>
                                        <div style={{ marginBottom: 4 }}><span style={{ color: '#64748B' }}>Observers: </span><span style={{ color: '#FBBF24', fontWeight: 600 }}>{theaterData.neutral.observers}</span></div>
                                        <div style={{ marginBottom: 8 }}><span style={{ color: '#64748B' }}>UN Posts: </span><span style={{ color: '#FBBF24', fontWeight: 600 }}>{theaterData.neutral.un_posts}</span></div>
                                        <div style={{
                                            padding: '6px 10px', borderRadius: 6,
                                            background: 'rgba(0,255,204,0.06)', border: '1px solid rgba(0,255,204,0.15)',
                                            textAlign: 'center'
                                        }}>
                                            <span style={{ color: '#64748B', fontSize: 9 }}>FORCE RATIO</span>
                                            <div style={{ fontSize: 18, fontWeight: 700, color: '#00FFCC', fontFamily: orbitron }}>{theaterData.forceRatio}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
                                <div style={{
                                    padding: 12, borderRadius: 8, background: 'rgba(0,255,204,0.03)',
                                    border: '1px solid rgba(0,255,204,0.08)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                                        <Flag size={12} color="#00FFCC" />
                                        <span style={{ fontFamily: orbitron, fontSize: 10, color: '#00FFCC', letterSpacing: 1 }}>STRATEGIC POINTS</span>
                                    </div>
                                    {theaterData.strategicPoints.map((pt, i) => (
                                        <div key={i} style={{
                                            display: 'flex', alignItems: 'center', gap: 6,
                                            padding: '4px 8px', marginBottom: 3, borderRadius: 4,
                                            background: 'rgba(0,255,204,0.03)', fontSize: 10, color: '#94A3B8'
                                        }}>
                                            <MapPin size={10} color="#00FFCC" />
                                            {pt}
                                        </div>
                                    ))}
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    <div style={{
                                        padding: 12, borderRadius: 8, background: 'rgba(96,165,250,0.04)',
                                        border: '1px solid rgba(96,165,250,0.15)', flex: 1
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                                            <Navigation size={12} color="#60A5FA" />
                                            <span style={{ fontFamily: orbitron, fontSize: 10, color: '#60A5FA', letterSpacing: 1 }}>TERRAIN</span>
                                        </div>
                                        <p style={{ fontSize: 10, color: '#94A3B8', margin: 0, lineHeight: 1.5 }}>{theaterData.terrain}</p>
                                    </div>
                                    <div style={{
                                        padding: 12, borderRadius: 8, background: 'rgba(167,139,250,0.04)',
                                        border: '1px solid rgba(167,139,250,0.15)', flex: 1
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                                            <Activity size={12} color="#A78BFA" />
                                            <span style={{ fontFamily: orbitron, fontSize: 10, color: '#A78BFA', letterSpacing: 1 }}>WEATHER</span>
                                        </div>
                                        <p style={{ fontSize: 10, color: '#94A3B8', margin: 0, lineHeight: 1.5 }}>{theaterData.weather}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div style={{
                    width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column',
                    background: 'rgba(0,0,0,0.3)', borderRadius: 10,
                    border: '1px solid rgba(0,255,204,0.1)', marginLeft: 8, overflow: 'hidden'
                }}>
                    <div style={{
                        padding: '10px 14px', borderBottom: '1px solid rgba(0,255,204,0.1)',
                        display: 'flex', alignItems: 'center', gap: 8
                    }}>
                        <Target size={16} color="#00FFCC" />
                        <span style={{ fontFamily: orbitron, fontSize: 11, color: '#00FFCC', letterSpacing: 2 }}>ORDERS & OBJECTIVES</span>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', padding: 10 }}>
                        <div style={{ marginBottom: 14 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                                <Star size={12} color="#FBBF24" />
                                <span style={{ fontFamily: orbitron, fontSize: 9, color: '#FBBF24', letterSpacing: 1 }}>MISSION OBJECTIVES</span>
                            </div>
                            {theaterObjectives.map(obj => (
                                <motion.div
                                    key={obj.id}
                                    whileHover={{ backgroundColor: 'rgba(0,255,204,0.04)' }}
                                    onClick={() => toggleObjective(obj.id)}
                                    style={{
                                        display: 'flex', alignItems: 'flex-start', gap: 8,
                                        padding: '6px 8px', marginBottom: 3, borderRadius: 5,
                                        cursor: 'pointer', fontSize: 10
                                    }}
                                >
                                    <motion.div animate={{ scale: obj.done ? [1, 1.3, 1] : 1 }} transition={{ duration: 0.2 }}>
                                        <CheckCircle size={14} color={obj.done ? '#34D399' : '#334155'} />
                                    </motion.div>
                                    <span style={{
                                        color: obj.done ? '#34D399' : '#94A3B8',
                                        textDecoration: obj.done ? 'line-through' : 'none',
                                        lineHeight: 1.4
                                    }}>
                                        {obj.text}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        <div style={{
                            padding: 10, borderRadius: 6, marginBottom: 14,
                            background: 'rgba(220,38,38,0.05)', border: '1px solid rgba(220,38,38,0.15)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                                <AlertTriangle size={12} color="#F87171" />
                                <span style={{ fontFamily: orbitron, fontSize: 9, color: '#F87171', letterSpacing: 1 }}>RULES OF ENGAGEMENT</span>
                            </div>
                            <p style={{ fontSize: 9, color: '#F87171', margin: 0, lineHeight: 1.5, opacity: 0.9 }}>{theaterData.roe}</p>
                        </div>

                        <div style={{ marginBottom: 14 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                                <Radio size={12} color="#60A5FA" />
                                <span style={{ fontFamily: orbitron, fontSize: 9, color: '#60A5FA', letterSpacing: 1 }}>COMM CHANNELS</span>
                            </div>
                            {COMM_CHANNELS.map((ch, i) => (
                                <div key={i} style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    padding: '5px 8px', marginBottom: 3, borderRadius: 4,
                                    background: 'rgba(0,0,0,0.2)', fontSize: 10
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <div style={{
                                            width: 6, height: 6, borderRadius: '50%',
                                            background: ch.status === 'ONLINE' ? '#34D399' : '#FBBF24',
                                            boxShadow: ch.status === 'ONLINE' ? '0 0 6px #34D399' : '0 0 6px #FBBF24'
                                        }} />
                                        <span style={{ color: '#CBD5E1' }}>{ch.name}</span>
                                    </div>
                                    <span style={{ color: '#475569', fontSize: 9 }}>{ch.latency}</span>
                                </div>
                            ))}
                        </div>

                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                                <Truck size={12} color="#34D399" />
                                <span style={{ fontFamily: orbitron, fontSize: 9, color: '#34D399', letterSpacing: 1 }}>LOGISTICS STATUS</span>
                            </div>
                            {[
                                { label: 'Ammunition', value: theaterData.logistics.ammo, icon: Zap },
                                { label: 'Fuel', value: theaterData.logistics.fuel, icon: Fuel },
                                { label: 'Rations', value: theaterData.logistics.rations, icon: Award },
                                { label: 'Medical', value: theaterData.logistics.medical, icon: Heart }
                            ].map(item => (
                                <div key={item.label} style={{ marginBottom: 8 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: '#94A3B8' }}>
                                            <item.icon size={10} color={logisticsColor(item.value)} />
                                            {item.label}
                                        </div>
                                        <span style={{ fontSize: 10, fontWeight: 600, color: logisticsColor(item.value) }}>{item.value}%</span>
                                    </div>
                                    <ProgressBar value={item.value} color={logisticsColor(item.value)} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div style={{
                flexShrink: 0, background: 'rgba(0,0,0,0.4)',
                borderTop: '1px solid rgba(0,255,204,0.1)',
                padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 12
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginRight: 8 }}>
                    <BarChart3 size={14} color="#00FFCC" />
                    <span style={{ fontFamily: orbitron, fontSize: 10, color: '#00FFCC', letterSpacing: 2 }}>OPERATION TIMELINE</span>
                </div>

                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 4 }}>
                    {OPERATION_PHASES.map((phase, idx) => {
                        const isActive = activePhase === phase.id;
                        const isPast = activePhase > phase.id;
                        const phaseColor = isActive ? '#00FFCC' : isPast ? '#34D399' : '#334155';

                        return (
                            <React.Fragment key={phase.id}>
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => setActivePhase(phase.id)}
                                    style={{
                                        flex: 1, padding: '8px 12px', cursor: 'pointer',
                                        background: isActive ? 'rgba(0,255,204,0.1)' : isPast ? 'rgba(52,211,153,0.06)' : 'rgba(0,0,0,0.2)',
                                        border: '1px solid', borderColor: isActive ? '#00FFCC' : isPast ? 'rgba(52,211,153,0.3)' : 'rgba(255,255,255,0.05)',
                                        borderRadius: 8, textAlign: 'left', position: 'relative', overflow: 'hidden'
                                    }}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activePhaseGlow"
                                            style={{
                                                position: 'absolute', inset: 0, borderRadius: 8,
                                                background: 'rgba(0,255,204,0.05)',
                                                boxShadow: 'inset 0 0 20px rgba(0,255,204,0.1)'
                                            }}
                                        />
                                    )}
                                    <div style={{ position: 'relative', zIndex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                                            {isActive ? (
                                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                                                    <Play size={10} color="#00FFCC" />
                                                </motion.div>
                                            ) : isPast ? (
                                                <CheckCircle size={10} color="#34D399" />
                                            ) : (
                                                <Clock size={10} color="#334155" />
                                            )}
                                            <span style={{ fontFamily: orbitron, fontSize: 9, color: phaseColor, letterSpacing: 1 }}>
                                                PHASE {phase.id}
                                            </span>
                                        </div>
                                        <div style={{ fontSize: 10, fontWeight: 600, color: isActive ? '#00FFCC' : isPast ? '#34D399' : '#64748B', marginBottom: 1 }}>
                                            {phase.name}
                                        </div>
                                        <div style={{ fontSize: 8, color: '#475569' }}>{phase.desc}</div>
                                        <div style={{ fontSize: 8, color: '#334155', marginTop: 2 }}>{phase.duration}</div>
                                    </div>
                                </motion.button>
                                {idx < OPERATION_PHASES.length - 1 && (
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <ArrowUpRight size={14} color={isPast ? '#34D399' : '#1E293B'} style={{ transform: 'rotate(45deg)' }} />
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
};

export default WarRoomPlanner;
