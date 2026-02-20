import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Plane, Target, AlertTriangle, Radio, MapPin, Eye, Crosshair,
    Navigation, Activity, ChevronRight, Shield, Zap, Clock, Send,
    Camera, Video, Wifi, Battery, Gauge, Compass, Circle, Square,
    Play, Pause, RotateCw, ArrowUp, ArrowDown, Layers, Sun, Moon,
    Flame, Search, CheckCircle, XCircle, Lock, Unlock, Monitor,
    Radar, Aperture, Maximize, Signal, Cpu, Thermometer, Wind
} from 'lucide-react';

const DRONE_FLEET = [
    {
        id: 'DRN-001', name: 'Heron TP', type: 'ISR', manufacturer: 'IAI',
        altitude: 45000, maxAltitude: 45000, speed: 220, maxSpeed: 220,
        endurance: '36 hrs', payload: '2,700 kg', fuel: 82, battery: 95,
        status: 'AIRBORNE', armed: false, signal: 94,
        coords: { lat: 34.0837, lng: 74.7973 }, heading: 45,
        mission: 'Border Surveillance — LOC Sector',
        camera: 'EO/IR MOSP', wingspan: '26m'
    },
    {
        id: 'DRN-002', name: 'Hermes 900', type: 'ISR', manufacturer: 'Elbit',
        altitude: 30000, maxAltitude: 30000, speed: 180, maxSpeed: 220,
        endurance: '30 hrs', payload: '350 kg', fuel: 67, battery: 88,
        status: 'AIRBORNE', armed: false, signal: 91,
        coords: { lat: 28.6139, lng: 77.2090 }, heading: 120,
        mission: 'Capital Region ELINT',
        camera: 'CoMPASS III', wingspan: '15m'
    },
    {
        id: 'DRN-003', name: 'Searcher II', type: 'ISR', manufacturer: 'IAI',
        altitude: 0, maxAltitude: 23000, speed: 0, maxSpeed: 200,
        endurance: '18 hrs', payload: '120 kg', fuel: 100, battery: 100,
        status: 'ON GROUND', armed: false, signal: 0,
        coords: { lat: 26.2389, lng: 73.0488 }, heading: 0,
        mission: 'Awaiting Tasking',
        camera: 'POP300D', wingspan: '8.5m'
    },
    {
        id: 'DRN-004', name: 'Rustom-II (Tapas)', type: 'ISR', manufacturer: 'DRDO',
        altitude: 28000, maxAltitude: 35000, speed: 190, maxSpeed: 225,
        endurance: '24 hrs', payload: '350 kg', fuel: 54, battery: 76,
        status: 'AIRBORNE', armed: false, signal: 87,
        coords: { lat: 32.7266, lng: 74.8570 }, heading: 270,
        mission: 'Jammu Sector Reconnaissance',
        camera: 'MRSAM EO/IR', wingspan: '20.6m'
    },
    {
        id: 'DRN-005', name: 'Tapas BH-201', type: 'ISR', manufacturer: 'DRDO/HAL',
        altitude: 0, maxAltitude: 28000, speed: 0, maxSpeed: 200,
        endurance: '18 hrs', payload: '150 kg', fuel: 30, battery: 45,
        status: 'MAINTENANCE', armed: false, signal: 0,
        coords: { lat: 15.3647, lng: 75.1240 }, heading: 0,
        mission: 'Engine Overhaul — ETA 48hrs',
        camera: 'EO/IR Pod', wingspan: '20.6m'
    },
    {
        id: 'DRN-006', name: 'MQ-9B SeaGuardian', type: 'Strike', manufacturer: 'GA-ASI',
        altitude: 40000, maxAltitude: 50000, speed: 250, maxSpeed: 370,
        endurance: '40 hrs', payload: '2,155 kg', fuel: 71, battery: 92,
        status: 'ARMED', armed: true, signal: 98,
        coords: { lat: 8.7642, lng: 72.1579 }, heading: 180,
        mission: 'Indian Ocean Maritime Patrol',
        camera: 'Lynx SAR/GMTI', wingspan: '24m',
        weapons: ['AGM-114 Hellfire', 'GBU-12 Paveway II']
    },
    {
        id: 'DRN-007', name: 'DRDO Ghatak', type: 'UCAV', manufacturer: 'DRDO',
        altitude: 35000, maxAltitude: 50000, speed: 290, maxSpeed: 950,
        endurance: '2 hrs', payload: '1,500 kg', fuel: 63, battery: 85,
        status: 'ARMED', armed: true, signal: 96,
        coords: { lat: 27.1767, lng: 78.0081 }, heading: 315,
        mission: 'Stealth Penetration Exercise',
        camera: 'AESA + EO/DAS', wingspan: '12m (est)',
        weapons: ['SAAW', 'Helina ATGM', 'Smart Anti-Airfield Weapon']
    },
    {
        id: 'DRN-008', name: 'HAL CATS Warrior', type: 'UCAV', manufacturer: 'HAL',
        altitude: 32000, maxAltitude: 45000, speed: 270, maxSpeed: 800,
        endurance: '3 hrs', payload: '1,000 kg', fuel: 78, battery: 90,
        status: 'AIRBORNE', armed: true, signal: 93,
        coords: { lat: 12.9716, lng: 77.5946 }, heading: 60,
        mission: 'Loyal Wingman Formation Test',
        camera: 'Multi-Spectral EO/IR', wingspan: '10m (est)',
        weapons: ['Derby AAM', 'SAAW']
    }
];

const MISSION_TYPES = [
    { id: 'surveillance', label: 'Surveillance', icon: Eye, color: '#00FFCC' },
    { id: 'recon', label: 'Reconnaissance', icon: Search, color: '#60A5FA' },
    { id: 'strike', label: 'Strike', icon: Target, color: '#DC2626' },
    { id: 'sar', label: 'Search & Rescue', icon: Shield, color: '#FBBF24' },
    { id: 'border', label: 'Border Patrol', icon: Navigation, color: '#34D399' }
];

const CAMERA_MODES = [
    { id: 'daylight', label: 'DAYLIGHT', color: '#60A5FA' },
    { id: 'nightvision', label: 'NIGHT VISION', color: '#34D399' },
    { id: 'thermal', label: 'THERMAL', color: '#DC2626' }
];

const PRESET_TARGETS = [
    { id: 'PT-001', name: 'Forward Operating Base Alpha', coords: '34.0522°N, 74.1234°E', priority: 'HIGH' },
    { id: 'PT-002', name: 'Hostile Convoy — Route 7', coords: '32.8764°N, 73.9812°E', priority: 'CRITICAL' },
    { id: 'PT-003', name: 'Supply Depot Echo', coords: '33.1456°N, 75.3421°E', priority: 'MEDIUM' },
    { id: 'PT-004', name: 'Radar Installation', coords: '31.5203°N, 74.3587°E', priority: 'HIGH' },
    { id: 'PT-005', name: 'Communications Hub', coords: '35.2145°N, 76.1598°E', priority: 'MEDIUM' }
];

const WEAPON_SYSTEMS = [
    { id: 'hellfire', name: 'AGM-114 Hellfire', type: 'Anti-Tank Missile', range: '8 km', warhead: 'HEAT / Thermobaric', status: 'READY' },
    { id: 'gbu12', name: 'GBU-12 Paveway II', type: 'Laser-Guided Bomb', range: '15 km (glide)', warhead: '227 kg HE', status: 'READY' },
    { id: 'saaw', name: 'SAAW (Smart Anti-Airfield)', type: 'Precision Guided Munition', range: '100 km', warhead: 'Penetrator + HE', status: 'READY' },
    { id: 'helina', name: 'Helina / Dhruvastra', type: 'Anti-Tank Guided Missile', range: '7 km', warhead: 'Tandem HEAT', status: 'READY' }
];

const statusColors = {
    AIRBORNE: '#34D399',
    'ON GROUND': '#60A5FA',
    MAINTENANCE: '#FBBF24',
    ARMED: '#DC2626'
};

const typeColors = {
    ISR: '#60A5FA',
    Strike: '#F87171',
    UCAV: '#A78BFA'
};

const DroneCommand = ({ onBack }) => {
    const [selectedDrone, setSelectedDrone] = useState(DRONE_FLEET[0]);
    const [cameraMode, setCameraMode] = useState('daylight');
    const [isRecording, setIsRecording] = useState(true);
    const [selectedMission, setSelectedMission] = useState('surveillance');
    const [selectedTarget, setSelectedTarget] = useState(null);
    const [selectedWeapon, setSelectedWeapon] = useState(null);
    const [strikeConfirm, setStrikeConfirm] = useState(0);
    const [missionLog, setMissionLog] = useState([
        { time: '14:32:07', event: 'Heron TP reached patrol altitude', type: 'info' },
        { time: '14:28:51', event: 'MQ-9B weapons systems armed', type: 'warning' },
        { time: '14:25:14', event: 'DRDO Ghatak stealth mode engaged', type: 'info' },
        { time: '14:20:33', event: 'Searcher II RTB — fuel low', type: 'warning' },
        { time: '14:15:02', event: 'Hostile radar emission detected — Sector 7', type: 'critical' },
        { time: '14:10:44', event: 'CATS Warrior formation link established', type: 'info' }
    ]);
    const [fleetData, setFleetData] = useState(DRONE_FLEET);
    const [flightTime, setFlightTime] = useState(0);
    const [customCoords, setCustomCoords] = useState({ lat: '', lng: '' });
    const crosshairRotation = useRef(0);

    const addLogEntry = useCallback((event, type = 'info') => {
        const now = new Date();
        const time = now.toTimeString().split(' ')[0];
        setMissionLog(prev => [{ time, event, type }, ...prev].slice(0, 20));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setFleetData(prev => prev.map(drone => {
                if (drone.status === 'AIRBORNE' || drone.status === 'ARMED') {
                    return {
                        ...drone,
                        coords: {
                            lat: drone.coords.lat + (Math.random() - 0.5) * 0.002,
                            lng: drone.coords.lng + (Math.random() - 0.5) * 0.002
                        },
                        altitude: Math.max(1000, drone.altitude + (Math.random() - 0.5) * 200),
                        speed: Math.max(50, drone.speed + (Math.random() - 0.5) * 10),
                        heading: (drone.heading + (Math.random() - 0.5) * 5 + 360) % 360,
                        fuel: Math.max(0, drone.fuel - Math.random() * 0.05),
                        signal: Math.min(100, Math.max(70, drone.signal + (Math.random() - 0.5) * 2))
                    };
                }
                return drone;
            }));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setFlightTime(prev => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const updated = fleetData.find(d => d.id === selectedDrone.id);
        if (updated) setSelectedDrone(updated);
    }, [fleetData, selectedDrone.id]);

    const handleStrikeAuth = useCallback(() => {
        if (!selectedDrone.armed) return;
        if (!selectedTarget) {
            addLogEntry('STRIKE DENIED — No target designated', 'critical');
            return;
        }
        if (!selectedWeapon) {
            addLogEntry('STRIKE DENIED — No weapon selected', 'critical');
            return;
        }
        if (strikeConfirm === 0) {
            setStrikeConfirm(1);
            addLogEntry('STRIKE AUTHORIZATION REQUESTED — Awaiting confirmation', 'warning');
        } else if (strikeConfirm === 1) {
            setStrikeConfirm(2);
            addLogEntry(`STRIKE AUTHORIZED — ${selectedWeapon.name} on ${selectedTarget.name}`, 'critical');
            setTimeout(() => {
                addLogEntry('WEAPON RELEASED — Impact in 12 seconds', 'critical');
            }, 2000);
            setTimeout(() => {
                addLogEntry('TARGET HIT — BDA pending', 'info');
                setStrikeConfirm(0);
            }, 5000);
        }
    }, [selectedDrone, selectedTarget, selectedWeapon, strikeConfirm, addLogEntry]);

    const formatFlightTime = (seconds) => {
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    const getCameraTint = () => {
        switch (cameraMode) {
            case 'nightvision': return 'rgba(52, 211, 153, 0.08)';
            case 'thermal': return 'rgba(220, 38, 38, 0.08)';
            default: return 'transparent';
        }
    };

    const getCameraOverlayColor = () => {
        switch (cameraMode) {
            case 'nightvision': return '#34D399';
            case 'thermal': return '#F87171';
            default: return '#00FFCC';
        }
    };

    const airborneDrones = fleetData.filter(d => d.status === 'AIRBORNE' || d.status === 'ARMED');
    const armedDrones = fleetData.filter(d => d.status === 'ARMED');

    const GaugeBar = ({ label, value, max, color, unit, icon: Icon }) => (
        <div style={{ flex: 1, minWidth: 120 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                {Icon && <Icon size={11} color={color} />}
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#94A3B8', textTransform: 'uppercase' }}>{label}</span>
            </div>
            <div style={{ position: 'relative', height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 3 }}>
                <motion.div
                    animate={{ width: `${(value / max) * 100}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    style={{
                        position: 'absolute', top: 0, left: 0, height: '100%',
                        background: `linear-gradient(90deg, ${color}44, ${color})`,
                        borderRadius: 3, boxShadow: `0 0 8px ${color}40`
                    }}
                />
            </div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color, marginTop: 2 }}>
                {typeof value === 'number' ? value.toFixed(0) : value}{unit && ` ${unit}`}
            </div>
        </div>
    );

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: '#020617', zIndex: 9999, display: 'flex', flexDirection: 'column',
                    fontFamily: 'JetBrains Mono, monospace', color: '#E2E8F0', overflow: 'hidden'
                }}
            >
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onBack}
                    style={{
                        position: 'absolute', top: 12, right: 12, zIndex: 10001,
                        width: 36, height: 36, borderRadius: '50%',
                        background: 'rgba(220, 38, 38, 0.2)', border: '1px solid #DC2626',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                    }}
                >
                    <X size={18} color="#F87171" />
                </motion.button>

                <div style={{
                    background: 'linear-gradient(180deg, rgba(0,255,204,0.06) 0%, transparent 100%)',
                    borderBottom: '1px solid rgba(0,255,204,0.15)', padding: '8px 16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <Plane size={20} color="#00FFCC" />
                        <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '14px', color: '#00FFCC', letterSpacing: '2px' }}>
                            DRONE COMMAND & SURVEILLANCE CENTER
                        </span>
                        <div style={{
                            padding: '2px 8px', borderRadius: 4, fontSize: '10px',
                            background: 'rgba(220, 38, 38, 0.15)', border: '1px solid rgba(220, 38, 38, 0.4)',
                            color: '#F87171', fontFamily: 'Orbitron, monospace'
                        }}>
                            CLASSIFIED
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '10px', color: '#94A3B8' }}>
                        <Clock size={12} />
                        <span>{new Date().toLocaleTimeString()}</span>
                        <span style={{ margin: '0 4px', color: '#334155' }}>|</span>
                        <Signal size={12} color="#34D399" />
                        <span style={{ color: '#34D399' }}>SATCOM LINK ACTIVE</span>
                    </div>
                </div>

                <div style={{
                    display: 'flex', gap: 1, padding: '6px 16px',
                    background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.05)'
                }}>
                    {[
                        { label: 'DRONES AIRBORNE', value: airborneDrones.length, total: fleetData.length, color: '#34D399', icon: Plane },
                        { label: 'MISSIONS ACTIVE', value: airborneDrones.length, color: '#60A5FA', icon: Target },
                        { label: 'SURVEILLANCE COVERAGE', value: '78%', color: '#FBBF24', icon: Eye },
                        { label: 'TARGETS IDENTIFIED', value: PRESET_TARGETS.length, color: '#F87171', icon: Crosshair },
                        { label: 'ARMED UCAV', value: armedDrones.length, color: '#DC2626', icon: Zap },
                        { label: 'SIGNAL QUALITY', value: '94%', color: '#A78BFA', icon: Wifi }
                    ].map((stat, i) => (
                        <div key={i} style={{
                            flex: 1, display: 'flex', alignItems: 'center', gap: 8,
                            padding: '6px 12px', background: 'rgba(255,255,255,0.02)',
                            borderRadius: 4, border: '1px solid rgba(255,255,255,0.04)'
                        }}>
                            <stat.icon size={14} color={stat.color} />
                            <div>
                                <div style={{ fontSize: '9px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</div>
                                <div style={{ fontSize: '16px', fontFamily: 'Orbitron, monospace', color: stat.color }}>
                                    {stat.value}{stat.total !== undefined && <span style={{ fontSize: '10px', color: '#64748B' }}>/{stat.total}</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ flex: 1, display: 'flex', gap: 1, padding: '4px', overflow: 'hidden' }}>
                    <div style={{
                        width: 260, display: 'flex', flexDirection: 'column', gap: 1,
                        background: '#0a0a1a', borderRadius: 6, border: '1px solid rgba(255,255,255,0.06)',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            padding: '8px 12px', borderBottom: '1px solid rgba(0,255,204,0.15)',
                            display: 'flex', alignItems: 'center', gap: 6
                        }}>
                            <Layers size={13} color="#00FFCC" />
                            <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '10px', color: '#00FFCC', letterSpacing: '1px' }}>DRONE FLEET</span>
                            <span style={{
                                marginLeft: 'auto', fontSize: '9px', padding: '1px 6px',
                                borderRadius: 8, background: 'rgba(52,211,153,0.15)', color: '#34D399'
                            }}>{airborneDrones.length} ACTIVE</span>
                        </div>
                        <div style={{ flex: 1, overflowY: 'auto', padding: 4 }}>
                            {fleetData.map(drone => (
                                <motion.div
                                    key={drone.id}
                                    whileHover={{ scale: 1.01 }}
                                    onClick={() => {
                                        setSelectedDrone(drone);
                                        setStrikeConfirm(0);
                                    }}
                                    style={{
                                        padding: '8px 10px', marginBottom: 2, borderRadius: 4, cursor: 'pointer',
                                        background: selectedDrone.id === drone.id
                                            ? 'rgba(0,255,204,0.1)' : 'rgba(255,255,255,0.02)',
                                        border: selectedDrone.id === drone.id
                                            ? '1px solid rgba(0,255,204,0.3)' : '1px solid transparent',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                                        <span style={{ fontSize: '11px', color: '#E2E8F0', fontWeight: 600 }}>{drone.name}</span>
                                        <span style={{
                                            fontSize: '8px', padding: '1px 5px', borderRadius: 3,
                                            background: `${statusColors[drone.status]}20`,
                                            color: statusColors[drone.status],
                                            border: `1px solid ${statusColors[drone.status]}40`
                                        }}>{drone.status}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                                        <span style={{
                                            fontSize: '8px', padding: '0px 4px', borderRadius: 2,
                                            background: `${typeColors[drone.type]}20`, color: typeColors[drone.type]
                                        }}>{drone.type}</span>
                                        <span style={{ fontSize: '9px', color: '#64748B' }}>{drone.id}</span>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 8px', fontSize: '9px', color: '#94A3B8' }}>
                                        <span>ALT: {drone.altitude > 0 ? `${(drone.altitude / 1000).toFixed(1)}k ft` : '—'}</span>
                                        <span>SPD: {drone.speed > 0 ? `${drone.speed.toFixed(0)} kts` : '—'}</span>
                                        <span>END: {drone.endurance}</span>
                                        <span>PAY: {drone.payload}</span>
                                    </div>
                                    {(drone.status === 'AIRBORNE' || drone.status === 'ARMED') && (
                                        <div style={{ marginTop: 4 }}>
                                            <div style={{ height: 2, background: 'rgba(255,255,255,0.05)', borderRadius: 1 }}>
                                                <div style={{
                                                    height: '100%', borderRadius: 1,
                                                    width: `${drone.fuel}%`,
                                                    background: drone.fuel > 50 ? '#34D399' : drone.fuel > 25 ? '#FBBF24' : '#DC2626'
                                                }} />
                                            </div>
                                            <div style={{ fontSize: '8px', color: '#64748B', marginTop: 1 }}>FUEL: {drone.fuel.toFixed(0)}%</div>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div style={{
                        flex: 1, display: 'flex', flexDirection: 'column', gap: 1,
                        background: '#0a0a1a', borderRadius: 6, border: '1px solid rgba(255,255,255,0.06)',
                        overflow: 'hidden', position: 'relative'
                    }}>
                        <div style={{
                            padding: '6px 12px', borderBottom: '1px solid rgba(0,255,204,0.15)',
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <Camera size={13} color="#00FFCC" />
                                <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '10px', color: '#00FFCC', letterSpacing: '1px' }}>
                                    LIVE FEED — {selectedDrone.name.toUpperCase()}
                                </span>
                            </div>
                            <div style={{ display: 'flex', gap: 4 }}>
                                {CAMERA_MODES.map(mode => (
                                    <motion.button
                                        key={mode.id}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setCameraMode(mode.id)}
                                        style={{
                                            padding: '2px 8px', borderRadius: 3, fontSize: '9px', cursor: 'pointer',
                                            fontFamily: 'Orbitron, monospace', letterSpacing: '0.5px',
                                            background: cameraMode === mode.id ? `${mode.color}25` : 'rgba(255,255,255,0.03)',
                                            border: `1px solid ${cameraMode === mode.id ? mode.color + '60' : 'rgba(255,255,255,0.08)'}`,
                                            color: cameraMode === mode.id ? mode.color : '#64748B'
                                        }}
                                    >
                                        {mode.label}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        <div style={{
                            flex: 1, position: 'relative', overflow: 'hidden',
                            background: cameraMode === 'nightvision'
                                ? 'linear-gradient(135deg, #021a0a 0%, #0a1f0a 50%, #021a0a 100%)'
                                : cameraMode === 'thermal'
                                    ? 'linear-gradient(135deg, #1a0505 0%, #1f0a0a 50%, #1a0505 100%)'
                                    : 'linear-gradient(135deg, #050a14 0%, #0a0f1a 50%, #050a14 100%)'
                        }}>
                            <div style={{ position: 'absolute', inset: 0, background: getCameraTint(), pointerEvents: 'none', zIndex: 1 }} />

                            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 2, pointerEvents: 'none' }}>
                                {Array.from({ length: 20 }).map((_, i) => (
                                    <line key={`vg-${i}`} x1={`${(i + 1) * 5}%`} y1="0" x2={`${(i + 1) * 5}%`} y2="100%"
                                        stroke={getCameraOverlayColor()} strokeOpacity="0.06" strokeWidth="0.5" />
                                ))}
                                {Array.from({ length: 20 }).map((_, i) => (
                                    <line key={`hg-${i}`} x1="0" y1={`${(i + 1) * 5}%`} x2="100%" y2={`${(i + 1) * 5}%`}
                                        stroke={getCameraOverlayColor()} strokeOpacity="0.06" strokeWidth="0.5" />
                                ))}
                            </svg>

                            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 3, pointerEvents: 'none' }}>
                                <line x1="50%" y1="30%" x2="50%" y2="70%" stroke={getCameraOverlayColor()} strokeOpacity="0.6" strokeWidth="1" />
                                <line x1="30%" y1="50%" x2="70%" y2="50%" stroke={getCameraOverlayColor()} strokeOpacity="0.6" strokeWidth="1" />
                                <circle cx="50%" cy="50%" r="8%" fill="none" stroke={getCameraOverlayColor()} strokeOpacity="0.4" strokeWidth="1" />
                                <circle cx="50%" cy="50%" r="15%" fill="none" stroke={getCameraOverlayColor()} strokeOpacity="0.2" strokeWidth="0.5" strokeDasharray="4 4" />
                                <circle cx="50%" cy="50%" r="22%" fill="none" stroke={getCameraOverlayColor()} strokeOpacity="0.1" strokeWidth="0.5" strokeDasharray="2 6" />
                                <line x1="46%" y1="50%" x2="44%" y2="50%" stroke={getCameraOverlayColor()} strokeOpacity="0.8" strokeWidth="1.5" />
                                <line x1="54%" y1="50%" x2="56%" y2="50%" stroke={getCameraOverlayColor()} strokeOpacity="0.8" strokeWidth="1.5" />
                                <line x1="50%" y1="46%" x2="50%" y2="44%" stroke={getCameraOverlayColor()} strokeOpacity="0.8" strokeWidth="1.5" />
                                <line x1="50%" y1="54%" x2="50%" y2="56%" stroke={getCameraOverlayColor()} strokeOpacity="0.8" strokeWidth="1.5" />
                            </svg>

                            <div style={{
                                position: 'absolute', top: 8, left: 8, zIndex: 5,
                                display: 'flex', flexDirection: 'column', gap: 2
                            }}>
                                <span style={{ fontSize: '10px', color: getCameraOverlayColor(), fontFamily: 'Orbitron, monospace' }}>
                                    {selectedDrone.name.toUpperCase()} — {selectedDrone.camera}
                                </span>
                                <span style={{ fontSize: '9px', color: getCameraOverlayColor() + 'AA' }}>
                                    MISSION: {selectedDrone.mission}
                                </span>
                            </div>

                            <div style={{
                                position: 'absolute', top: 8, right: 8, zIndex: 5,
                                display: 'flex', alignItems: 'center', gap: 8
                            }}>
                                {isRecording && (
                                    <motion.div
                                        animate={{ opacity: [1, 0.3, 1] }}
                                        transition={{ duration: 1.2, repeat: Infinity }}
                                        style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                                    >
                                        <Circle size={8} fill="#DC2626" color="#DC2626" />
                                        <span style={{ fontSize: '9px', color: '#DC2626', fontFamily: 'Orbitron, monospace' }}>REC</span>
                                    </motion.div>
                                )}
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setIsRecording(!isRecording)}
                                    style={{
                                        padding: '2px 6px', borderRadius: 3, fontSize: '8px', cursor: 'pointer',
                                        background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)',
                                        color: '#94A3B8', fontFamily: 'JetBrains Mono, monospace'
                                    }}
                                >
                                    {isRecording ? 'STOP' : 'REC'}
                                </motion.button>
                            </div>

                            <div style={{
                                position: 'absolute', bottom: 8, left: 8, right: 8, zIndex: 5,
                                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'
                            }}>
                                <div style={{
                                    display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: '2px 16px',
                                    background: 'rgba(0,0,0,0.6)', padding: '6px 10px', borderRadius: 4,
                                    border: `1px solid ${getCameraOverlayColor()}20`
                                }}>
                                    <span style={{ fontSize: '8px', color: '#64748B' }}>ALT</span>
                                    <span style={{ fontSize: '8px', color: '#64748B' }}>SPD</span>
                                    <span style={{ fontSize: '8px', color: '#64748B' }}>HDG</span>
                                    <span style={{ fontSize: '11px', color: getCameraOverlayColor(), fontFamily: 'Orbitron, monospace' }}>
                                        {selectedDrone.altitude > 0 ? `${selectedDrone.altitude.toFixed(0)} FT` : 'GND'}
                                    </span>
                                    <span style={{ fontSize: '11px', color: getCameraOverlayColor(), fontFamily: 'Orbitron, monospace' }}>
                                        {selectedDrone.speed > 0 ? `${selectedDrone.speed.toFixed(0)} KTS` : '0 KTS'}
                                    </span>
                                    <span style={{ fontSize: '11px', color: getCameraOverlayColor(), fontFamily: 'Orbitron, monospace' }}>
                                        {selectedDrone.heading.toFixed(0)}°
                                    </span>
                                </div>

                                <div style={{
                                    background: 'rgba(0,0,0,0.6)', padding: '6px 10px', borderRadius: 4,
                                    border: `1px solid ${getCameraOverlayColor()}20`, textAlign: 'right'
                                }}>
                                    <div style={{ fontSize: '8px', color: '#64748B', marginBottom: 2 }}>GPS COORDINATES</div>
                                    <div style={{ fontSize: '10px', color: getCameraOverlayColor(), fontFamily: 'Orbitron, monospace' }}>
                                        {selectedDrone.coords.lat.toFixed(4)}°N {selectedDrone.coords.lng.toFixed(4)}°E
                                    </div>
                                    <div style={{ fontSize: '8px', color: '#64748B', marginTop: 2 }}>
                                        FUEL: {selectedDrone.fuel.toFixed(0)}% | SIG: {selectedDrone.signal.toFixed(0)}%
                                    </div>
                                </div>
                            </div>

                            <div style={{
                                position: 'absolute', top: '50%', left: 8, transform: 'translateY(-50%)', zIndex: 5
                            }}>
                                <svg width="20" height="200" viewBox="0 0 20 200">
                                    <line x1="15" y1="0" x2="15" y2="200" stroke={getCameraOverlayColor()} strokeOpacity="0.3" strokeWidth="1" />
                                    {Array.from({ length: 11 }).map((_, i) => (
                                        <React.Fragment key={i}>
                                            <line x1="10" y1={i * 20} x2="15" y2={i * 20} stroke={getCameraOverlayColor()} strokeOpacity="0.5" strokeWidth="1" />
                                            <text x="7" y={i * 20 + 3} fill={getCameraOverlayColor()} fillOpacity="0.4" fontSize="6" textAnchor="end" fontFamily="JetBrains Mono, monospace">
                                                {(50 - i * 5)}k
                                            </text>
                                        </React.Fragment>
                                    ))}
                                    <motion.circle
                                        animate={{ cy: 200 - ((selectedDrone.altitude / selectedDrone.maxAltitude) * 200) }}
                                        transition={{ duration: 1 }}
                                        cx="15" r="3" fill={getCameraOverlayColor()}
                                    />
                                </svg>
                            </div>

                            <div style={{
                                position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', zIndex: 5
                            }}>
                                <svg width="200" height="24" viewBox="0 0 200 24">
                                    {['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'].map((dir, i) => {
                                        const angle = i * 45;
                                        const offset = ((angle - selectedDrone.heading + 540) % 360 - 180);
                                        if (Math.abs(offset) > 60) return null;
                                        const x = 100 + offset * 1.5;
                                        return (
                                            <text key={dir} x={x} y="18" fill={getCameraOverlayColor()} fillOpacity={dir === 'N' ? 0.9 : 0.4}
                                                fontSize={dir.length === 1 ? '9' : '7'} textAnchor="middle" fontFamily="Orbitron, monospace">
                                                {dir}
                                            </text>
                                        );
                                    })}
                                    <line x1="100" y1="0" x2="100" y2="8" stroke={getCameraOverlayColor()} strokeWidth="1.5" />
                                </svg>
                            </div>

                            {selectedDrone.status !== 'AIRBORNE' && selectedDrone.status !== 'ARMED' && (
                                <div style={{
                                    position: 'absolute', inset: 0, zIndex: 6,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: 'rgba(0,0,0,0.7)'
                                }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <Monitor size={32} color="#64748B" style={{ marginBottom: 8 }} />
                                        <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '13px', color: '#64748B' }}>
                                            NO LIVE FEED
                                        </div>
                                        <div style={{ fontSize: '10px', color: '#475569', marginTop: 4 }}>
                                            Drone is {selectedDrone.status}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div style={{
                        width: 280, display: 'flex', flexDirection: 'column', gap: 1,
                        background: '#0a0a1a', borderRadius: 6, border: '1px solid rgba(255,255,255,0.06)',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            padding: '8px 12px', borderBottom: '1px solid rgba(0,255,204,0.15)',
                            display: 'flex', alignItems: 'center', gap: 6
                        }}>
                            <Target size={13} color="#00FFCC" />
                            <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '10px', color: '#00FFCC', letterSpacing: '1px' }}>MISSION CONTROL</span>
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto', padding: 8, display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <div>
                                <div style={{ fontSize: '9px', color: '#64748B', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Mission Type</div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                                    {MISSION_TYPES.map(mt => (
                                        <motion.button
                                            key={mt.id}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => {
                                                setSelectedMission(mt.id);
                                                addLogEntry(`Mission type changed: ${mt.label}`);
                                            }}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: 4,
                                                padding: '3px 8px', borderRadius: 3, fontSize: '9px', cursor: 'pointer',
                                                background: selectedMission === mt.id ? `${mt.color}20` : 'rgba(255,255,255,0.03)',
                                                border: `1px solid ${selectedMission === mt.id ? mt.color + '50' : 'rgba(255,255,255,0.06)'}`,
                                                color: selectedMission === mt.id ? mt.color : '#94A3B8',
                                                fontFamily: 'JetBrains Mono, monospace'
                                            }}
                                        >
                                            <mt.icon size={10} />
                                            {mt.label}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div style={{ fontSize: '9px', color: '#64748B', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Target Designation</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {PRESET_TARGETS.map(tgt => (
                                        <motion.div
                                            key={tgt.id}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => {
                                                setSelectedTarget(tgt);
                                                addLogEntry(`Target designated: ${tgt.name}`, 'warning');
                                            }}
                                            style={{
                                                padding: '4px 8px', borderRadius: 3, cursor: 'pointer',
                                                background: selectedTarget?.id === tgt.id ? 'rgba(220,38,38,0.1)' : 'rgba(255,255,255,0.02)',
                                                border: `1px solid ${selectedTarget?.id === tgt.id ? '#DC262640' : 'rgba(255,255,255,0.04)'}`,
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <span style={{ fontSize: '9px', color: '#E2E8F0' }}>{tgt.name}</span>
                                                <span style={{
                                                    fontSize: '7px', padding: '0px 4px', borderRadius: 2,
                                                    background: tgt.priority === 'CRITICAL' ? '#DC262620' : tgt.priority === 'HIGH' ? '#F8717120' : '#FBBF2420',
                                                    color: tgt.priority === 'CRITICAL' ? '#DC2626' : tgt.priority === 'HIGH' ? '#F87171' : '#FBBF24'
                                                }}>{tgt.priority}</span>
                                            </div>
                                            <span style={{ fontSize: '8px', color: '#64748B' }}>{tgt.coords}</span>
                                        </motion.div>
                                    ))}
                                </div>
                                <div style={{ marginTop: 6, display: 'flex', gap: 4 }}>
                                    <input
                                        placeholder="LAT"
                                        value={customCoords.lat}
                                        onChange={e => setCustomCoords(prev => ({ ...prev, lat: e.target.value }))}
                                        style={{
                                            flex: 1, padding: '4px 6px', borderRadius: 3, fontSize: '9px',
                                            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                                            color: '#E2E8F0', fontFamily: 'JetBrains Mono, monospace', outline: 'none'
                                        }}
                                    />
                                    <input
                                        placeholder="LNG"
                                        value={customCoords.lng}
                                        onChange={e => setCustomCoords(prev => ({ ...prev, lng: e.target.value }))}
                                        style={{
                                            flex: 1, padding: '4px 6px', borderRadius: 3, fontSize: '9px',
                                            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                                            color: '#E2E8F0', fontFamily: 'JetBrains Mono, monospace', outline: 'none'
                                        }}
                                    />
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => {
                                            if (customCoords.lat && customCoords.lng) {
                                                const tgt = {
                                                    id: 'CUSTOM', name: `Custom (${customCoords.lat}, ${customCoords.lng})`,
                                                    coords: `${customCoords.lat}°N, ${customCoords.lng}°E`, priority: 'CUSTOM'
                                                };
                                                setSelectedTarget(tgt);
                                                addLogEntry(`Custom target: ${customCoords.lat}, ${customCoords.lng}`, 'warning');
                                            }
                                        }}
                                        style={{
                                            padding: '4px 8px', borderRadius: 3, fontSize: '8px', cursor: 'pointer',
                                            background: 'rgba(0,255,204,0.1)', border: '1px solid rgba(0,255,204,0.3)',
                                            color: '#00FFCC', fontFamily: 'JetBrains Mono, monospace'
                                        }}
                                    >
                                        SET
                                    </motion.button>
                                </div>
                            </div>

                            {selectedDrone.armed && (
                                <div>
                                    <div style={{ fontSize: '9px', color: '#DC2626', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: 4 }}>
                                        <Zap size={10} /> Weapon Systems
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        {WEAPON_SYSTEMS.filter(w => selectedDrone.weapons?.some(dw => dw.toLowerCase().includes(w.id.split('-')[0]?.toLowerCase()) || w.name.toLowerCase().includes(dw.split(' ')[0]?.toLowerCase())) || true).slice(0, 4).map(weapon => (
                                            <motion.div
                                                key={weapon.id}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => {
                                                    setSelectedWeapon(weapon);
                                                    addLogEntry(`Weapon selected: ${weapon.name}`, 'warning');
                                                }}
                                                style={{
                                                    padding: '4px 8px', borderRadius: 3, cursor: 'pointer',
                                                    background: selectedWeapon?.id === weapon.id ? 'rgba(220,38,38,0.1)' : 'rgba(255,255,255,0.02)',
                                                    border: `1px solid ${selectedWeapon?.id === weapon.id ? '#DC262650' : 'rgba(255,255,255,0.04)'}`,
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                <div style={{ fontSize: '9px', color: '#F87171', fontWeight: 600 }}>{weapon.name}</div>
                                                <div style={{ display: 'flex', gap: 8, fontSize: '8px', color: '#64748B' }}>
                                                    <span>{weapon.type}</span>
                                                    <span>RNG: {weapon.range}</span>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleStrikeAuth}
                                        animate={strikeConfirm === 1 ? { boxShadow: ['0 0 10px #DC262640', '0 0 20px #DC262680', '0 0 10px #DC262640'] } : {}}
                                        transition={strikeConfirm === 1 ? { duration: 1, repeat: Infinity } : {}}
                                        style={{
                                            width: '100%', marginTop: 8, padding: '8px 12px', borderRadius: 4,
                                            fontSize: '11px', fontFamily: 'Orbitron, monospace', letterSpacing: '1px',
                                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                                            background: strikeConfirm === 0
                                                ? 'linear-gradient(135deg, #DC262620, #DC262640)'
                                                : strikeConfirm === 1
                                                    ? 'linear-gradient(135deg, #DC262640, #DC262680)'
                                                    : 'rgba(34,197,94,0.2)',
                                            border: `1px solid ${strikeConfirm === 2 ? '#34D399' : '#DC2626'}`,
                                            color: strikeConfirm === 2 ? '#34D399' : '#F87171'
                                        }}
                                    >
                                        {strikeConfirm === 2 ? <CheckCircle size={14} /> : strikeConfirm === 1 ? <AlertTriangle size={14} /> : <Lock size={14} />}
                                        {strikeConfirm === 0 ? 'AUTHORIZE STRIKE' : strikeConfirm === 1 ? 'CONFIRM STRIKE — TAP AGAIN' : 'STRIKE AUTHORIZED'}
                                    </motion.button>
                                    {strikeConfirm === 1 && (
                                        <motion.button
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            onClick={() => {
                                                setStrikeConfirm(0);
                                                addLogEntry('Strike authorization cancelled', 'info');
                                            }}
                                            style={{
                                                width: '100%', marginTop: 4, padding: '4px', borderRadius: 3,
                                                fontSize: '9px', cursor: 'pointer', background: 'rgba(255,255,255,0.03)',
                                                border: '1px solid rgba(255,255,255,0.08)', color: '#94A3B8',
                                                fontFamily: 'JetBrains Mono, monospace'
                                            }}
                                        >
                                            CANCEL
                                        </motion.button>
                                    )}
                                </div>
                            )}

                            {!selectedDrone.armed && selectedMission === 'strike' && (
                                <div style={{
                                    padding: 8, borderRadius: 4,
                                    background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.2)',
                                    display: 'flex', alignItems: 'center', gap: 6
                                }}>
                                    <AlertTriangle size={14} color="#FBBF24" />
                                    <span style={{ fontSize: '9px', color: '#FBBF24' }}>Selected drone is not armed. Choose an armed UCAV for strike operations.</span>
                                </div>
                            )}

                            <div>
                                <div style={{ fontSize: '9px', color: '#64748B', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <Activity size={10} /> Mission Log
                                </div>
                                <div style={{
                                    maxHeight: 180, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 1,
                                    background: 'rgba(0,0,0,0.3)', borderRadius: 4, padding: 4,
                                    border: '1px solid rgba(255,255,255,0.04)'
                                }}>
                                    <AnimatePresence>
                                        {missionLog.map((entry, i) => (
                                            <motion.div
                                                key={`${entry.time}-${i}`}
                                                initial={i === 0 ? { opacity: 0, y: -10 } : false}
                                                animate={{ opacity: 1, y: 0 }}
                                                style={{
                                                    padding: '3px 6px', borderRadius: 2, fontSize: '8px',
                                                    borderLeft: `2px solid ${entry.type === 'critical' ? '#DC2626' : entry.type === 'warning' ? '#FBBF24' : '#00FFCC'}`,
                                                    background: entry.type === 'critical' ? 'rgba(220,38,38,0.05)' : 'transparent'
                                                }}
                                            >
                                                <span style={{ color: '#64748B', marginRight: 6 }}>{entry.time}</span>
                                                <span style={{
                                                    color: entry.type === 'critical' ? '#F87171' : entry.type === 'warning' ? '#FBBF24' : '#94A3B8'
                                                }}>{entry.event}</span>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{
                    borderTop: '1px solid rgba(0,255,204,0.1)',
                    background: 'linear-gradient(0deg, rgba(0,255,204,0.03) 0%, transparent 100%)',
                    padding: '8px 16px', display: 'flex', gap: 12, alignItems: 'stretch'
                }}>
                    <div style={{
                        flex: 1, display: 'flex', gap: 16, alignItems: 'center',
                        padding: '4px 12px', background: 'rgba(0,0,0,0.3)', borderRadius: 4,
                        border: '1px solid rgba(255,255,255,0.04)'
                    }}>
                        <GaugeBar label="Altitude" value={selectedDrone.altitude} max={selectedDrone.maxAltitude} color="#60A5FA" unit="ft" icon={ArrowUp} />
                        <GaugeBar label="Speed" value={selectedDrone.speed} max={selectedDrone.maxSpeed} color="#34D399" unit="kts" icon={Wind} />
                        <GaugeBar label="Fuel" value={selectedDrone.fuel} max={100} color={selectedDrone.fuel > 50 ? '#34D399' : selectedDrone.fuel > 25 ? '#FBBF24' : '#DC2626'} unit="%" icon={Gauge} />
                        <GaugeBar label="Battery" value={selectedDrone.battery} max={100} color={selectedDrone.battery > 50 ? '#34D399' : '#FBBF24'} unit="%" icon={Battery} />
                        <GaugeBar label="Signal" value={selectedDrone.signal} max={100} color={selectedDrone.signal > 80 ? '#00FFCC' : '#FBBF24'} unit="%" icon={Wifi} />
                    </div>

                    <div style={{
                        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                        padding: '4px 16px', background: 'rgba(0,0,0,0.3)', borderRadius: 4,
                        border: '1px solid rgba(255,255,255,0.04)', minWidth: 140
                    }}>
                        <div style={{ fontSize: '8px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 2 }}>GPS Position</div>
                        <div style={{ fontSize: '10px', color: '#00FFCC', fontFamily: 'JetBrains Mono, monospace' }}>
                            {selectedDrone.coords.lat.toFixed(4)}°N
                        </div>
                        <div style={{ fontSize: '10px', color: '#00FFCC', fontFamily: 'JetBrains Mono, monospace' }}>
                            {selectedDrone.coords.lng.toFixed(4)}°E
                        </div>
                    </div>

                    <div style={{
                        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                        padding: '4px 16px', background: 'rgba(0,0,0,0.3)', borderRadius: 4,
                        border: '1px solid rgba(255,255,255,0.04)', minWidth: 100
                    }}>
                        <div style={{ fontSize: '8px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 2 }}>Heading</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Compass size={14} color="#A78BFA" />
                            <span style={{ fontSize: '14px', color: '#A78BFA', fontFamily: 'Orbitron, monospace' }}>
                                {selectedDrone.heading.toFixed(0)}°
                            </span>
                        </div>
                    </div>

                    <div style={{
                        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                        padding: '4px 16px', background: 'rgba(0,0,0,0.3)', borderRadius: 4,
                        border: '1px solid rgba(255,255,255,0.04)', minWidth: 100
                    }}>
                        <div style={{ fontSize: '8px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 2 }}>Flight Time</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Clock size={14} color="#FBBF24" />
                            <span style={{ fontSize: '14px', color: '#FBBF24', fontFamily: 'Orbitron, monospace' }}>
                                {formatFlightTime(flightTime)}
                            </span>
                        </div>
                    </div>

                    <div style={{
                        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                        padding: '4px 16px', background: 'rgba(0,0,0,0.3)', borderRadius: 4,
                        border: `1px solid ${selectedDrone.status === 'ARMED' ? 'rgba(220,38,38,0.2)' : 'rgba(255,255,255,0.04)'}`,
                        minWidth: 90
                    }}>
                        <div style={{ fontSize: '8px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 2 }}>Status</div>
                        <motion.span
                            animate={selectedDrone.status === 'ARMED' ? { opacity: [1, 0.5, 1] } : {}}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            style={{
                                fontSize: '11px', fontFamily: 'Orbitron, monospace',
                                color: statusColors[selectedDrone.status],
                                fontWeight: 700
                            }}
                        >
                            {selectedDrone.status}
                        </motion.span>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default DroneCommand;
