import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Shield, AlertTriangle, Activity, Zap, Lock,
    Globe, Wifi, Eye, Radio, Target, ChevronRight,
    Server, Terminal, ShieldAlert, ShieldCheck, ShieldOff,
    Crosshair, Bug, Skull, Fingerprint, Cpu, Clock,
    TrendingUp, BarChart3, MonitorCheck, Power, Flame
} from 'lucide-react';

const ATTACK_TYPES = ['DDoS', 'SQL Injection', 'Ransomware', 'APT', 'Phishing', 'Zero-Day', 'Man-in-the-Middle', 'Brute Force'];
const SEVERITIES = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];
const STATUSES = ['ACTIVE', 'BLOCKED', 'INVESTIGATING'];
const SOURCE_COUNTRIES = ['China', 'Russia', 'North Korea', 'Pakistan', 'Iran', 'Belarus', 'Syria', 'Venezuela'];
const TARGET_SYSTEMS = [
    'DRDO Network', 'Power Grid SCADA', 'Naval C2 Systems', 'Satellite Uplink',
    'Nuclear Command Net', 'Air Defense Radar', 'Banking Infrastructure', 'Telecom Backbone',
    'Railway Control', 'DAE Internal Net', 'ISRO Ground Station', 'Parliament Network'
];

const INITIAL_ATTACKS = [
    { id: 'ATK-001', source: 'China', target: 'DRDO Network', type: 'APT', severity: 'CRITICAL', status: 'ACTIVE', timestamp: Date.now() - 120000, ip: '61.135.169.121' },
    { id: 'ATK-002', source: 'Russia', target: 'Power Grid SCADA', type: 'Ransomware', severity: 'CRITICAL', status: 'INVESTIGATING', timestamp: Date.now() - 300000, ip: '95.161.76.42' },
    { id: 'ATK-003', source: 'North Korea', target: 'Banking Infrastructure', type: 'Zero-Day', severity: 'HIGH', status: 'ACTIVE', timestamp: Date.now() - 45000, ip: '175.45.176.3' },
    { id: 'ATK-004', source: 'Pakistan', target: 'Nuclear Command Net', type: 'Brute Force', severity: 'HIGH', status: 'BLOCKED', timestamp: Date.now() - 600000, ip: '39.32.44.197' },
    { id: 'ATK-005', source: 'Iran', target: 'Naval C2 Systems', type: 'Man-in-the-Middle', severity: 'MEDIUM', status: 'ACTIVE', timestamp: Date.now() - 180000, ip: '5.160.139.18' },
    { id: 'ATK-006', source: 'China', target: 'Satellite Uplink', type: 'DDoS', severity: 'HIGH', status: 'INVESTIGATING', timestamp: Date.now() - 90000, ip: '220.181.38.148' },
    { id: 'ATK-007', source: 'Russia', target: 'Air Defense Radar', type: 'SQL Injection', severity: 'MEDIUM', status: 'BLOCKED', timestamp: Date.now() - 420000, ip: '77.88.55.60' },
    { id: 'ATK-008', source: 'North Korea', target: 'Telecom Backbone', type: 'Phishing', severity: 'LOW', status: 'BLOCKED', timestamp: Date.now() - 800000, ip: '175.45.176.67' },
];

const INITIAL_FIREWALLS = [
    { id: 'FW-01', zone: 'Perimeter', status: 'NOMINAL', packetsAnalyzed: 12847293, threatsBlocked: 4821, health: 98 },
    { id: 'FW-02', zone: 'DMZ', status: 'ALERT', packetsAnalyzed: 8421093, threatsBlocked: 2319, health: 74 },
    { id: 'FW-03', zone: 'Internal', status: 'NOMINAL', packetsAnalyzed: 21093847, threatsBlocked: 312, health: 99 },
    { id: 'FW-04', zone: 'SCADA/OT', status: 'ALERT', packetsAnalyzed: 3928471, threatsBlocked: 1847, health: 68 },
    { id: 'FW-05', zone: 'Nuclear C2', status: 'NOMINAL', packetsAnalyzed: 948271, threatsBlocked: 47, health: 100 },
    { id: 'FW-06', zone: 'Satellite Link', status: 'BREACH', packetsAnalyzed: 5829103, threatsBlocked: 6293, health: 42 },
];

const COUNTER_MEASURES = [
    { id: 'CM-01', name: 'Trace & Identify', icon: Fingerprint, desc: 'Backtrace attacker origin through proxy chains' },
    { id: 'CM-02', name: 'Deploy Honeypot', icon: Bug, desc: 'Spin up decoy systems to trap attacker' },
    { id: 'CM-03', name: 'Counter-Strike', icon: Crosshair, desc: 'Launch offensive cyber payload at source' },
    { id: 'CM-04', name: 'Isolate Network', icon: Lock, desc: 'Air-gap compromised network segments' },
    { id: 'CM-05', name: 'Kill Switch', icon: Power, desc: 'Emergency shutdown of targeted systems' },
];

const INITIAL_INTEL_FEED = [
    { id: 'INTEL-001', time: Date.now() - 30000, text: 'Anomalous traffic spike detected on port 443 — origin: Shanghai, CN', severity: 'HIGH' },
    { id: 'INTEL-002', time: Date.now() - 60000, text: 'New malware signature cataloged: VIPER-FANG-2026 (APT-41 variant)', severity: 'CRITICAL' },
    { id: 'INTEL-003', time: Date.now() - 120000, text: 'SSL certificate anomaly on satellite ground station uplink', severity: 'MEDIUM' },
    { id: 'INTEL-004', time: Date.now() - 180000, text: 'CERT-In advisory: CVE-2026-1847 actively exploited in wild', severity: 'HIGH' },
    { id: 'INTEL-005', time: Date.now() - 240000, text: 'Honeypot DELTA-7 captured credential harvesting toolkit', severity: 'LOW' },
    { id: 'INTEL-006', time: Date.now() - 300000, text: 'DDoS mitigation engaged — 847 Gbps volumetric attack neutralized', severity: 'HIGH' },
    { id: 'INTEL-007', time: Date.now() - 360000, text: 'Threat actor "CRIMSON TYPHOON" infrastructure mapped — 14 C2 nodes', severity: 'CRITICAL' },
    { id: 'INTEL-008', time: Date.now() - 420000, text: 'Firmware integrity check passed on all SCADA controllers', severity: 'LOW' },
];

const RANDOM_INTEL_TEMPLATES = [
    'Suspicious DNS queries from {country} targeting {system}',
    'Lateral movement detected in subnet 10.{n}.{n}.0/24',
    'New C2 beacon identified: {ip} — protocol: HTTPS/443',
    'Brute force attempt on SSH — {n} failed logins in 60s',
    'Exfiltration attempt blocked — {n} MB payload intercepted',
    'Zero-day exploit attempt on {system} — signature updated',
    'Phishing campaign targeting {system} operators detected',
    'Encrypted tunnel to {country} proxy chain identified',
    'Anomalous process execution on endpoint {system}',
    'Credential dump detected on domain controller — escalating',
];

const severityColor = (sev) => {
    switch (sev) {
        case 'CRITICAL': return '#DC2626';
        case 'HIGH': return '#F87171';
        case 'MEDIUM': return '#FBBF24';
        case 'LOW': return '#34D399';
        default: return '#60A5FA';
    }
};

const statusColor = (st) => {
    switch (st) {
        case 'ACTIVE': return '#DC2626';
        case 'BLOCKED': return '#34D399';
        case 'INVESTIGATING': return '#FBBF24';
        default: return '#60A5FA';
    }
};

const healthColor = (h) => {
    if (h >= 90) return '#34D399';
    if (h >= 70) return '#FBBF24';
    if (h >= 50) return '#F87171';
    return '#DC2626';
};

const firewallStatusColor = (st) => {
    switch (st) {
        case 'NOMINAL': return '#34D399';
        case 'ALERT': return '#FBBF24';
        case 'BREACH': return '#DC2626';
        default: return '#60A5FA';
    }
};

const formatTime = (ts) => {
    const d = new Date(ts);
    return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

const formatNumber = (n) => n.toLocaleString();

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomIP = () => `${randomInt(1, 223)}.${randomInt(0, 255)}.${randomInt(0, 255)}.${randomInt(1, 254)}`;

let attackCounter = 9;
let intelCounter = 9;

const CyberWarfareCommand = ({ onBack }) => {
    const [attacks, setAttacks] = useState(INITIAL_ATTACKS);
    const [firewalls, setFirewalls] = useState(INITIAL_FIREWALLS);
    const [counterMeasures, setCounterMeasures] = useState({});
    const [activeCounterMeasures, setActiveCounterMeasures] = useState([]);
    const [intelFeed, setIntelFeed] = useState(INITIAL_INTEL_FEED);
    const [systemTime, setSystemTime] = useState(new Date());
    const [threatLevel, setThreatLevel] = useState('SEVERE');
    const intelScrollRef = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => setSystemTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const activeCount = attacks.filter(a => a.status === 'ACTIVE').length;
        const criticalCount = attacks.filter(a => a.severity === 'CRITICAL' && a.status !== 'BLOCKED').length;
        if (criticalCount >= 2 || activeCount >= 5) setThreatLevel('CRITICAL');
        else if (criticalCount >= 1 || activeCount >= 3) setThreatLevel('SEVERE');
        else if (activeCount >= 1) setThreatLevel('ELEVATED');
        else setThreatLevel('GUARDED');
    }, [attacks]);

    useEffect(() => {
        const interval = setInterval(() => {
            setFirewalls(prev => prev.map(fw => ({
                ...fw,
                packetsAnalyzed: fw.packetsAnalyzed + randomInt(100, 5000),
                threatsBlocked: fw.threatsBlocked + (Math.random() > 0.7 ? randomInt(1, 10) : 0),
            })));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const template = randomFrom(RANDOM_INTEL_TEMPLATES);
            const text = template
                .replace('{country}', randomFrom(SOURCE_COUNTRIES))
                .replace('{system}', randomFrom(TARGET_SYSTEMS))
                .replace('{ip}', randomIP())
                .replace(/\{n\}/g, () => randomInt(10, 255));
            const newIntel = {
                id: `INTEL-${String(intelCounter++).padStart(3, '0')}`,
                time: Date.now(),
                text,
                severity: randomFrom(SEVERITIES),
            };
            setIntelFeed(prev => [newIntel, ...prev].slice(0, 50));
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const simulateAttack = useCallback(() => {
        const newAttack = {
            id: `ATK-${String(attackCounter++).padStart(3, '0')}`,
            source: randomFrom(SOURCE_COUNTRIES),
            target: randomFrom(TARGET_SYSTEMS),
            type: randomFrom(ATTACK_TYPES),
            severity: randomFrom(SEVERITIES),
            status: randomFrom(['ACTIVE', 'ACTIVE', 'INVESTIGATING']),
            timestamp: Date.now(),
            ip: randomIP(),
        };
        setAttacks(prev => [newAttack, ...prev]);
        setIntelFeed(prev => [{
            id: `INTEL-${String(intelCounter++).padStart(3, '0')}`,
            time: Date.now(),
            text: `NEW ATTACK DETECTED: ${newAttack.type} from ${newAttack.source} targeting ${newAttack.target} [${newAttack.ip}]`,
            severity: newAttack.severity,
        }, ...prev].slice(0, 50));
    }, []);

    const deployCounterMeasure = useCallback((cm) => {
        if (counterMeasures[cm.id] === 'DEPLOYED') return;
        setCounterMeasures(prev => ({ ...prev, [cm.id]: 'DEPLOYING' }));
        setTimeout(() => {
            setCounterMeasures(prev => ({ ...prev, [cm.id]: 'DEPLOYED' }));
            setActiveCounterMeasures(prev => [...prev, { ...cm, deployedAt: Date.now() }]);
            setIntelFeed(prev => [{
                id: `INTEL-${String(intelCounter++).padStart(3, '0')}`,
                time: Date.now(),
                text: `COUNTERMEASURE DEPLOYED: ${cm.name} — ${cm.desc}`,
                severity: 'LOW',
            }, ...prev].slice(0, 50));
        }, 2500);
    }, [counterMeasures]);

    const threatLevelColor = threatLevel === 'CRITICAL' ? '#DC2626' : threatLevel === 'SEVERE' ? '#F87171' : threatLevel === 'ELEVATED' ? '#FBBF24' : '#34D399';

    const totalAttacks = attacks.length;
    const blockedAttacks = attacks.filter(a => a.status === 'BLOCKED').length;
    const activeThreats = attacks.filter(a => a.status === 'ACTIVE').length;
    const compromised = attacks.filter(a => a.severity === 'CRITICAL' && a.status === 'ACTIVE').length;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999,
                    background: '#020617',
                    fontFamily: 'JetBrains Mono, monospace',
                    color: '#fff',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <motion.button
                    whileHover={{ scale: 1.15, background: 'rgba(220,38,38,0.3)' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onBack}
                    style={{
                        position: 'absolute', top: '16px', right: '16px', zIndex: 10001,
                        width: '36px', height: '36px', borderRadius: '50%',
                        background: 'rgba(220,38,38,0.15)', border: '1px solid #DC2626',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', color: '#DC2626',
                    }}
                >
                    <X size={16} />
                </motion.button>

                <Header systemTime={systemTime} threatLevel={threatLevel} threatLevelColor={threatLevelColor} />

                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr auto', gap: '1px', padding: '0 12px 8px', overflow: 'hidden', background: 'rgba(0,255,204,0.02)' }}>
                    <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <AttackMap attacks={attacks} onSimulate={simulateAttack} />
                    </div>

                    <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <FirewallPanel firewalls={firewalls} />
                    </div>

                    <div style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1px', minHeight: 0 }}>
                        <CounterOffensivePanel
                            measures={COUNTER_MEASURES}
                            statuses={counterMeasures}
                            activeList={activeCounterMeasures}
                            onDeploy={deployCounterMeasure}
                        />
                        <ThreatIntelFeed feed={intelFeed} scrollRef={intelScrollRef} />
                        <NetworkStats
                            total={totalAttacks}
                            blocked={blockedAttacks}
                            active={activeThreats}
                            compromised={compromised}
                        />
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

const Header = ({ systemTime, threatLevel, threatLevelColor }) => (
    <div style={{
        padding: '12px 16px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid rgba(0,255,204,0.08)', background: 'rgba(0,0,0,0.4)',
    }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
                <Shield size={22} color="#00FFCC" />
            </motion.div>
            <div>
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '14px', fontWeight: 900, color: '#00FFCC', letterSpacing: '3px' }}>
                    CYBER WARFARE COMMAND CENTER
                </div>
                <div style={{ fontSize: '8px', color: '#ffffff30', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '2px' }}>
                    NATIONAL CYBER DEFENSE OPERATIONS — CLASSIFIED
                </div>
            </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '7px', color: '#ffffff30', letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: 'monospace' }}>SYSTEM TIME</div>
                <div style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', color: '#00FFCC' }}>
                    {systemTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </div>
            </div>
            <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '7px', color: '#ffffff30', letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: 'monospace' }}>THREAT LEVEL</div>
                <motion.div
                    animate={threatLevel === 'CRITICAL' ? { opacity: [1, 0.3, 1] } : {}}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    style={{
                        fontSize: '12px', fontWeight: 900, fontFamily: 'Orbitron, monospace',
                        color: threatLevelColor, letterSpacing: '2px',
                    }}
                >
                    {threatLevel}
                </motion.div>
            </div>
        </div>
    </div>
);

const AttackMap = ({ attacks, onSimulate }) => (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(0,255,204,0.06)', overflow: 'hidden' }}>
        <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '10px 14px', borderBottom: '1px solid rgba(0,255,204,0.06)', background: 'rgba(0,0,0,0.2)',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Globe size={14} color="#00FFCC" />
                <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '9px', fontWeight: 700, color: '#00FFCC', letterSpacing: '2px' }}>LIVE ATTACK MAP</span>
                <motion.div
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#DC2626' }}
                />
            </div>
            <motion.button
                whileHover={{ scale: 1.05, borderColor: '#DC262680' }}
                whileTap={{ scale: 0.95 }}
                onClick={onSimulate}
                style={{
                    padding: '4px 12px', background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)',
                    color: '#F87171', fontSize: '8px', fontFamily: 'Orbitron, monospace', fontWeight: 700,
                    letterSpacing: '1.5px', cursor: 'pointer', textTransform: 'uppercase',
                }}
            >
                <Zap size={10} style={{ marginRight: '4px', display: 'inline' }} />
                SIMULATE ATTACK
            </motion.button>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '6px' }}>
            <AnimatePresence>
                {attacks.map((atk, i) => (
                    <AttackRow key={atk.id} attack={atk} index={i} />
                ))}
            </AnimatePresence>
        </div>
    </div>
);

const AttackRow = ({ attack, index }) => {
    const isActive = attack.status === 'ACTIVE';
    const sevColor = severityColor(attack.severity);
    const stColor = statusColor(attack.status);

    return (
        <motion.div
            initial={{ opacity: 0, x: -30, height: 0 }}
            animate={{ opacity: 1, x: 0, height: 'auto' }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.3, delay: index * 0.02 }}
            style={{
                padding: '8px 10px', marginBottom: '3px',
                background: isActive ? 'rgba(220,38,38,0.06)' : attack.status === 'BLOCKED' ? 'rgba(52,211,153,0.04)' : 'rgba(251,191,36,0.04)',
                border: `1px solid ${isActive ? 'rgba(220,38,38,0.15)' : attack.status === 'BLOCKED' ? 'rgba(52,211,153,0.1)' : 'rgba(251,191,36,0.1)'}`,
                display: 'grid', gridTemplateColumns: '60px 1fr 1fr 80px 70px 70px 58px', alignItems: 'center', gap: '8px',
            }}
        >
            <div style={{ fontSize: '8px', color: '#ffffff40', fontFamily: 'monospace' }}>{attack.id}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {isActive && (
                    <motion.div
                        animate={{ scale: [1, 1.6, 1], opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#DC2626', flexShrink: 0 }}
                    />
                )}
                {attack.status === 'BLOCKED' && (
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#34D399', flexShrink: 0 }} />
                )}
                {attack.status === 'INVESTIGATING' && (
                    <motion.div
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#FBBF24', flexShrink: 0 }}
                    />
                )}
                <div>
                    <div style={{ fontSize: '9px', fontWeight: 700, color: '#F87171' }}>{attack.source}</div>
                    <div style={{ fontSize: '7px', color: '#ffffff25', fontFamily: 'monospace' }}>{attack.ip}</div>
                </div>
            </div>
            <div>
                <div style={{ fontSize: '9px', fontWeight: 600, color: '#60A5FA' }}>{attack.target}</div>
                <div style={{ fontSize: '7px', color: '#ffffff25', fontFamily: 'monospace' }}>{attack.type}</div>
            </div>
            <div style={{
                fontSize: '7px', fontWeight: 900, fontFamily: 'Orbitron, monospace', color: sevColor,
                letterSpacing: '0.5px', textAlign: 'center',
                padding: '2px 6px', background: sevColor + '10', border: `1px solid ${sevColor}30`,
            }}>
                {attack.severity}
            </div>
            <div style={{
                fontSize: '7px', fontWeight: 900, fontFamily: 'Orbitron, monospace', color: stColor,
                letterSpacing: '0.5px', textAlign: 'center',
                padding: '2px 4px', background: stColor + '10', border: `1px solid ${stColor}30`,
            }}>
                {attack.status}
            </div>
            <div style={{ fontSize: '8px', color: '#ffffff40', fontFamily: 'monospace', textAlign: 'center' }}>
                {formatTime(attack.timestamp)}
            </div>
            <div style={{ textAlign: 'right' }}>
                <ChevronRight size={10} color="#ffffff20" />
            </div>
        </motion.div>
    );
};

const FirewallPanel = ({ firewalls }) => (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(0,255,204,0.06)', overflow: 'hidden' }}>
        <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '10px 14px', borderBottom: '1px solid rgba(0,255,204,0.06)', background: 'rgba(0,0,0,0.2)',
        }}>
            <ShieldAlert size={14} color="#00FFCC" />
            <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '9px', fontWeight: 700, color: '#00FFCC', letterSpacing: '2px' }}>FIREWALL STATUS</span>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '8px' }}>
            {firewalls.map(fw => (
                <FirewallRow key={fw.id} fw={fw} />
            ))}
        </div>
    </div>
);

const FirewallRow = ({ fw }) => {
    const hColor = healthColor(fw.health);
    const sColor = firewallStatusColor(fw.status);
    const isBreach = fw.status === 'BREACH';

    return (
        <motion.div
            animate={isBreach ? { borderColor: ['rgba(220,38,38,0.3)', 'rgba(220,38,38,0.08)', 'rgba(220,38,38,0.3)'] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
                padding: '10px 12px', marginBottom: '4px',
                background: isBreach ? 'rgba(220,38,38,0.05)' : 'rgba(0,0,0,0.2)',
                border: `1px solid ${isBreach ? 'rgba(220,38,38,0.2)' : 'rgba(0,255,204,0.05)'}`,
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Server size={12} color={sColor} />
                    <div>
                        <div style={{ fontSize: '10px', fontWeight: 700, color: '#fff', fontFamily: 'JetBrains Mono, monospace' }}>{fw.zone}</div>
                        <div style={{ fontSize: '7px', color: '#ffffff25', fontFamily: 'monospace', letterSpacing: '1px' }}>{fw.id}</div>
                    </div>
                </div>
                <div style={{
                    fontSize: '7px', fontWeight: 900, fontFamily: 'Orbitron, monospace', color: sColor,
                    letterSpacing: '1px', padding: '2px 8px',
                    background: sColor + '10', border: `1px solid ${sColor}30`,
                }}>
                    {fw.status}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                <div>
                    <div style={{ fontSize: '7px', color: '#ffffff25', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.5px' }}>PACKETS</div>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#60A5FA', fontFamily: 'JetBrains Mono, monospace' }}>{formatNumber(fw.packetsAnalyzed)}</div>
                </div>
                <div>
                    <div style={{ fontSize: '7px', color: '#ffffff25', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.5px' }}>BLOCKED</div>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#F87171', fontFamily: 'JetBrains Mono, monospace' }}>{formatNumber(fw.threatsBlocked)}</div>
                </div>
                <div>
                    <div style={{ fontSize: '7px', color: '#ffffff25', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.5px' }}>HEALTH</div>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: hColor, fontFamily: 'JetBrains Mono, monospace' }}>{fw.health}%</div>
                </div>
            </div>

            <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${fw.health}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    style={{ height: '100%', background: hColor, borderRadius: '2px' }}
                />
            </div>
        </motion.div>
    );
};

const CounterOffensivePanel = ({ measures, statuses, activeList, onDeploy }) => (
    <div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(0,255,204,0.06)', overflow: 'hidden' }}>
        <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '8px 14px', borderBottom: '1px solid rgba(0,255,204,0.06)', background: 'rgba(0,0,0,0.2)',
        }}>
            <Crosshair size={14} color="#00FFCC" />
            <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '9px', fontWeight: 700, color: '#00FFCC', letterSpacing: '2px' }}>COUNTER-OFFENSIVE</span>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '6px' }}>
            {measures.map(cm => {
                const status = statuses[cm.id];
                const Icon = cm.icon;
                return (
                    <motion.button
                        key={cm.id}
                        whileHover={!status ? { borderColor: '#A78BFA40', background: 'rgba(167,139,250,0.08)' } : {}}
                        whileTap={!status ? { scale: 0.98 } : {}}
                        onClick={() => onDeploy(cm)}
                        disabled={status === 'DEPLOYING'}
                        style={{
                            width: '100%', padding: '8px 10px', marginBottom: '3px',
                            background: status === 'DEPLOYED' ? 'rgba(52,211,153,0.06)' : status === 'DEPLOYING' ? 'rgba(167,139,250,0.06)' : 'rgba(0,0,0,0.2)',
                            border: `1px solid ${status === 'DEPLOYED' ? 'rgba(52,211,153,0.2)' : status === 'DEPLOYING' ? 'rgba(167,139,250,0.2)' : 'rgba(255,255,255,0.04)'}`,
                            display: 'flex', alignItems: 'center', gap: '10px',
                            cursor: status === 'DEPLOYED' ? 'default' : status === 'DEPLOYING' ? 'wait' : 'pointer',
                            color: '#fff', textAlign: 'left',
                        }}
                    >
                        <Icon size={14} color={status === 'DEPLOYED' ? '#34D399' : status === 'DEPLOYING' ? '#A78BFA' : '#A78BFA'} />
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '9px', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', color: status === 'DEPLOYED' ? '#34D399' : '#fff' }}>{cm.name}</div>
                            <div style={{ fontSize: '7px', color: '#ffffff25', fontFamily: 'monospace' }}>{cm.desc}</div>
                        </div>
                        {status === 'DEPLOYING' && (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            >
                                <Activity size={12} color="#A78BFA" />
                            </motion.div>
                        )}
                        {status === 'DEPLOYED' && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                <ShieldCheck size={12} color="#34D399" />
                            </motion.div>
                        )}
                        {!status && (
                            <div style={{
                                fontSize: '7px', fontFamily: 'Orbitron, monospace', fontWeight: 700,
                                color: '#A78BFA', letterSpacing: '1px', padding: '2px 6px',
                                border: '1px solid rgba(167,139,250,0.2)',
                            }}>
                                DEPLOY
                            </div>
                        )}
                    </motion.button>
                );
            })}

            {activeList.length > 0 && (
                <div style={{ marginTop: '6px', padding: '6px 8px', background: 'rgba(52,211,153,0.04)', border: '1px solid rgba(52,211,153,0.08)' }}>
                    <div style={{ fontSize: '7px', color: '#ffffff25', fontFamily: 'monospace', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>ACTIVE COUNTERMEASURES</div>
                    {activeList.map(cm => (
                        <div key={cm.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '2px 0' }}>
                            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#34D399' }} />
                            <span style={{ fontSize: '8px', color: '#34D399', fontFamily: 'monospace' }}>{cm.name}</span>
                            <span style={{ fontSize: '7px', color: '#ffffff20', fontFamily: 'monospace' }}>{formatTime(cm.deployedAt)}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
);

const ThreatIntelFeed = ({ feed, scrollRef }) => (
    <div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(0,255,204,0.06)', overflow: 'hidden' }}>
        <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '8px 14px', borderBottom: '1px solid rgba(0,255,204,0.06)', background: 'rgba(0,0,0,0.2)',
        }}>
            <Radio size={14} color="#00FFCC" />
            <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '9px', fontWeight: 700, color: '#00FFCC', letterSpacing: '2px' }}>THREAT INTEL FEED</span>
            <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#34D399' }}
            />
        </div>

        <div ref={scrollRef} style={{ flex: 1, overflow: 'auto', padding: '6px' }}>
            <AnimatePresence>
                {feed.map(item => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            padding: '6px 8px', marginBottom: '2px',
                            background: 'rgba(0,0,0,0.15)', borderLeft: `2px solid ${severityColor(item.severity)}`,
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                            <span style={{ fontSize: '7px', color: '#ffffff30', fontFamily: 'monospace' }}>{formatTime(item.time)}</span>
                            <span style={{
                                fontSize: '6px', fontWeight: 900, fontFamily: 'Orbitron, monospace',
                                color: severityColor(item.severity), letterSpacing: '0.5px',
                            }}>
                                {item.severity}
                            </span>
                        </div>
                        <div style={{ fontSize: '8px', color: '#ffffffa0', fontFamily: 'monospace', lineHeight: '1.4' }}>
                            {item.text}
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    </div>
);

const NetworkStats = ({ total, blocked, active, compromised }) => {
    const uptime = '99.847%';

    const stats = [
        { label: 'TOTAL ATTACKS TODAY', value: total, color: '#60A5FA', icon: BarChart3 },
        { label: 'BLOCKED', value: blocked, color: '#34D399', icon: ShieldCheck },
        { label: 'ACTIVE THREATS', value: active, color: '#DC2626', icon: AlertTriangle },
        { label: 'SYSTEMS COMPROMISED', value: compromised, color: '#F87171', icon: Skull },
        { label: 'NETWORK UPTIME', value: uptime, color: '#00FFCC', icon: Activity },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(0,255,204,0.06)', overflow: 'hidden' }}>
            <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '8px 14px', borderBottom: '1px solid rgba(0,255,204,0.06)', background: 'rgba(0,0,0,0.2)',
            }}>
                <TrendingUp size={14} color="#00FFCC" />
                <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '9px', fontWeight: 700, color: '#00FFCC', letterSpacing: '2px' }}>NETWORK STATISTICS</span>
            </div>

            <div style={{ flex: 1, overflow: 'auto', padding: '6px' }}>
                {stats.map(s => {
                    const Icon = s.icon;
                    return (
                        <motion.div
                            key={s.label}
                            whileHover={{ borderColor: s.color + '30', background: s.color + '08' }}
                            style={{
                                padding: '10px 12px', marginBottom: '3px',
                                background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.03)',
                                display: 'flex', alignItems: 'center', gap: '12px',
                            }}
                        >
                            <Icon size={16} color={s.color} />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '7px', color: '#ffffff25', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</div>
                                <div style={{ fontSize: '16px', fontWeight: 900, color: s.color, fontFamily: 'JetBrains Mono, monospace' }}>
                                    {typeof s.value === 'number' ? (
                                        <CountUp target={s.value} />
                                    ) : s.value}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

const CountUp = ({ target }) => {
    const [value, setValue] = useState(0);
    const prevTarget = useRef(target);

    useEffect(() => {
        const start = prevTarget.current;
        prevTarget.current = target;
        const diff = target - start;
        if (diff === 0) return;
        const duration = 600;
        const startTime = performance.now();

        const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            setValue(Math.round(start + diff * progress));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [target]);

    return <>{value}</>;
};

export default CyberWarfareCommand;
