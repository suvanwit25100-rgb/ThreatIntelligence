import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Eye, Shield, AlertTriangle, Activity, Users, MapPin,
  Lock, Send, Radio, Globe, Clock, ChevronRight, Crosshair,
  UserCheck, UserX, FileText, Camera, Signal, Wifi, Hash,
  AlertCircle, CheckCircle, XCircle, Zap, Target, Navigation,
  Building, Key, MessageSquare, Skull, ArrowDownCircle
} from 'lucide-react';

const AGENTS = [
  {
    id: 'A001', codename: 'PHANTOM', coverName: 'Dr. Arjun Mehta', country: 'China',
    coverProfession: 'Visiting Professor, Tsinghua University', handler: 'CONTROL-7',
    status: 'ACTIVE', lastContact: '2026-02-19', intelValue: 'CRITICAL',
    coverNationality: 'Nepalese', yearsDeployed: 6, languages: ['Mandarin', 'English', 'Hindi', 'Nepali'],
    specialization: 'Nuclear Weapons Program Intelligence',
    missions: [
      { date: '2024-06-15', name: 'OP SILENT DRAGON', result: 'SUCCESS' },
      { date: '2025-01-22', name: 'OP JADE SERPENT', result: 'SUCCESS' },
      { date: '2025-09-10', name: 'OP RED LOTUS', result: 'ONGOING' },
      { date: '2023-03-18', name: 'OP GREAT WALL', result: 'SUCCESS' }
    ],
    intel: ['HUMINT — PLA force deployment schedules', 'SIGINT — Encrypted military frequencies', 'Documents — DF-27 missile test data', 'Photos — Submarine base expansion at Yulin'],
    threatLevel: 82
  },
  {
    id: 'A002', codename: 'SHADOW', coverName: 'Khalid Raza', country: 'Pakistan',
    coverProfession: 'Textile Export Businessman', handler: 'CONTROL-3',
    status: 'ACTIVE', lastContact: '2026-02-18', intelValue: 'HIGH',
    coverNationality: 'Pakistani (naturalized)', yearsDeployed: 9, languages: ['Urdu', 'Punjabi', 'Pashto', 'English'],
    specialization: 'ISI Counter-Intelligence & Terror Networks',
    missions: [
      { date: '2023-11-05', name: 'OP BLACK THUNDER', result: 'SUCCESS' },
      { date: '2024-08-14', name: 'OP CRESCENT FALL', result: 'SUCCESS' },
      { date: '2025-04-20', name: 'OP IRON CURTAIN', result: 'FAILED' },
      { date: '2025-12-01', name: 'OP SCORPION NEST', result: 'ONGOING' }
    ],
    intel: ['HUMINT — ISI operative identities', 'Documents — Terror funding routes', 'SIGINT — Cross-border comms intercepts', 'Photos — Terror launch pads in PoK'],
    threatLevel: 91
  },
  {
    id: 'A003', codename: 'VIPER', coverName: 'Saeed Al-Rashid', country: 'UAE',
    coverProfession: 'Investment Banking Consultant', handler: 'CONTROL-5',
    status: 'ACTIVE', lastContact: '2026-02-17', intelValue: 'HIGH',
    coverNationality: 'Omani', yearsDeployed: 4, languages: ['Arabic', 'English', 'Hindi', 'French'],
    specialization: 'Hawala Networks & Terror Financing',
    missions: [
      { date: '2024-03-12', name: 'OP GOLDEN SAND', result: 'SUCCESS' },
      { date: '2025-02-28', name: 'OP DESERT MIRAGE', result: 'SUCCESS' },
      { date: '2025-11-15', name: 'OP FALCON EYE', result: 'ONGOING' }
    ],
    intel: ['HUMINT — Hawala network operators', 'Documents — Shell company financials', 'SIGINT — Encrypted money transfer logs'],
    threatLevel: 45
  },
  {
    id: 'A004', codename: 'COBRA', coverName: 'James Whitfield', country: 'UK',
    coverProfession: 'Cybersecurity Researcher, Cambridge', handler: 'CONTROL-1',
    status: 'DORMANT', lastContact: '2026-01-05', intelValue: 'MEDIUM',
    coverNationality: 'British', yearsDeployed: 7, languages: ['English', 'Hindi', 'Russian'],
    specialization: 'Five Eyes Intelligence Sharing Monitoring',
    missions: [
      { date: '2023-07-20', name: 'OP LONDON FOG', result: 'SUCCESS' },
      { date: '2024-05-10', name: 'OP CROWN JEWEL', result: 'SUCCESS' },
      { date: '2025-06-30', name: 'OP THAMES WATCH', result: 'SUCCESS' }
    ],
    intel: ['HUMINT — GCHQ liaison protocols', 'Documents — Five Eyes India briefings', 'SIGINT — Diplomatic cable intercepts'],
    threatLevel: 28
  },
  {
    id: 'A005', codename: 'EAGLE', coverName: 'Raj Krishnamurthy', country: 'USA',
    coverProfession: 'Senior Software Engineer, Defense Contractor', handler: 'CONTROL-2',
    status: 'ACTIVE', lastContact: '2026-02-20', intelValue: 'CRITICAL',
    coverNationality: 'Indian-American', yearsDeployed: 11, languages: ['English', 'Hindi', 'Tamil'],
    specialization: 'Pentagon & Defense Technology Intelligence',
    missions: [
      { date: '2022-09-01', name: 'OP BALD EAGLE', result: 'SUCCESS' },
      { date: '2024-01-15', name: 'OP SILICON SHIELD', result: 'SUCCESS' },
      { date: '2025-05-22', name: 'OP LIBERTY BELL', result: 'SUCCESS' },
      { date: '2025-12-10', name: 'OP DARK STAR', result: 'ONGOING' }
    ],
    intel: ['HUMINT — DARPA project briefings', 'Documents — F-35 avionics specifications', 'SIGINT — NSA monitoring protocols', 'Photos — Classified drone prototypes'],
    threatLevel: 55
  },
  {
    id: 'A006', codename: 'WOLF', coverName: 'Dmitri Volkov', country: 'Russia',
    coverProfession: 'Energy Sector Consultant', handler: 'CONTROL-4',
    status: 'COMPROMISED', lastContact: '2026-02-10', intelValue: 'HIGH',
    coverNationality: 'Ukrainian', yearsDeployed: 5, languages: ['Russian', 'Ukrainian', 'English', 'Hindi'],
    specialization: 'Russian Military Equipment & Arms Sales',
    missions: [
      { date: '2024-02-20', name: 'OP FROZEN BEAR', result: 'SUCCESS' },
      { date: '2024-10-05', name: 'OP RED SQUARE', result: 'SUCCESS' },
      { date: '2025-08-18', name: 'OP SIBERIAN WIND', result: 'FAILED' }
    ],
    intel: ['HUMINT — FSB double agent network', 'Documents — S-500 system capabilities', 'SIGINT — GRU operational frequencies'],
    threatLevel: 97
  },
  {
    id: 'A007', codename: 'SPARROW', coverName: 'Fatima Hosseini', country: 'Iran',
    coverProfession: 'Academic Researcher, University of Tehran', handler: 'CONTROL-6',
    status: 'ACTIVE', lastContact: '2026-02-16', intelValue: 'CRITICAL',
    coverNationality: 'Afghan', yearsDeployed: 3, languages: ['Farsi', 'Dari', 'English', 'Arabic'],
    specialization: 'Iranian Nuclear Program & IRGC Operations',
    missions: [
      { date: '2024-07-10', name: 'OP PERSIAN FLAME', result: 'SUCCESS' },
      { date: '2025-03-25', name: 'OP NATANZ SHADOW', result: 'SUCCESS' },
      { date: '2025-11-30', name: 'OP URANIUM TRAIL', result: 'ONGOING' }
    ],
    intel: ['HUMINT — IRGC Quds Force deployments', 'Documents — Fordow enrichment data', 'Photos — Underground centrifuge facilities'],
    threatLevel: 72
  },
  {
    id: 'A008', codename: 'HAWK', coverName: 'Abdul Ghani', country: 'Afghanistan',
    coverProfession: 'NGO Aid Worker', handler: 'CONTROL-3',
    status: 'MIA', lastContact: '2025-12-28', intelValue: 'HIGH',
    coverNationality: 'Afghan', yearsDeployed: 8, languages: ['Pashto', 'Dari', 'Urdu', 'English'],
    specialization: 'Taliban & Al-Qaeda Remnants Intelligence',
    missions: [
      { date: '2023-05-14', name: 'OP MOUNTAIN LION', result: 'SUCCESS' },
      { date: '2024-09-22', name: 'OP KABUL GHOST', result: 'SUCCESS' },
      { date: '2025-06-15', name: 'OP HINDU KUSH', result: 'FAILED' },
      { date: '2025-12-20', name: 'OP SILENT PRAYER', result: 'FAILED' }
    ],
    intel: ['HUMINT — Taliban leadership movements', 'Documents — Al-Qaeda recruitment pipelines', 'SIGINT — Cross-border radio intercepts'],
    threatLevel: 95
  },
  {
    id: 'A009', codename: 'TIGER', coverName: 'Mehmet Yilmaz', country: 'Turkey',
    coverProfession: 'Import/Export Company Owner', handler: 'CONTROL-5',
    status: 'ACTIVE', lastContact: '2026-02-15', intelValue: 'MEDIUM',
    coverNationality: 'Turkish', yearsDeployed: 2, languages: ['Turkish', 'English', 'Arabic', 'Hindi'],
    specialization: 'ISIS Remnants & Syrian Corridor Intelligence',
    missions: [
      { date: '2025-04-08', name: 'OP BOSPHORUS GATE', result: 'SUCCESS' },
      { date: '2025-10-12', name: 'OP ANATOLIAN WIND', result: 'ONGOING' }
    ],
    intel: ['HUMINT — ISIS sleeper cell locations', 'Documents — Smuggling route maps', 'SIGINT — Turkish MIT surveillance gaps'],
    threatLevel: 38
  },
  {
    id: 'A010', codename: 'LOTUS', coverName: 'Anika Chowdhury', country: 'Bangladesh',
    coverProfession: 'Garment Industry Quality Auditor', handler: 'CONTROL-7',
    status: 'ACTIVE', lastContact: '2026-02-19', intelValue: 'MEDIUM',
    coverNationality: 'Bangladeshi', yearsDeployed: 3, languages: ['Bengali', 'English', 'Hindi'],
    specialization: 'Cross-Border Insurgent Movement Tracking',
    missions: [
      { date: '2024-12-01', name: 'OP DELTA CURRENT', result: 'SUCCESS' },
      { date: '2025-07-20', name: 'OP PADMA BRIDGE', result: 'SUCCESS' },
      { date: '2026-01-05', name: 'OP MONSOON WATCH', result: 'ONGOING' }
    ],
    intel: ['HUMINT — NE insurgent safe houses in Dhaka', 'Documents — Fake passport networks', 'SIGINT — Rohingya camp radical comms'],
    threatLevel: 42
  },
  {
    id: 'A011', codename: 'PHOENIX', coverName: 'Viktor Petrov', country: 'Russia',
    coverProfession: 'Aerospace Engineer', handler: 'CONTROL-4',
    status: 'EXTRACTED', lastContact: '2026-01-30', intelValue: 'HIGH',
    coverNationality: 'Kazakh', yearsDeployed: 4, languages: ['Russian', 'Kazakh', 'English'],
    specialization: 'Hypersonic Weapons & Space Defense Programs',
    missions: [
      { date: '2024-04-20', name: 'OP AURORA BOREALIS', result: 'SUCCESS' },
      { date: '2025-02-14', name: 'OP TUNDRA GHOST', result: 'SUCCESS' },
      { date: '2025-09-28', name: 'OP SPUTNIK FALL', result: 'FAILED' }
    ],
    intel: ['HUMINT — Avangard hypersonic glide data', 'Documents — Burevestnik cruise missile specs', 'Photos — Plesetsk Cosmodrome upgrades'],
    threatLevel: 60
  },
  {
    id: 'A012', codename: 'SERPENT', coverName: 'Li Wei Chen', country: 'China',
    coverProfession: 'Tech Startup Founder, Shenzhen', handler: 'CONTROL-7',
    status: 'COMPROMISED', lastContact: '2026-02-05', intelValue: 'CRITICAL',
    coverNationality: 'Singaporean', yearsDeployed: 5, languages: ['Mandarin', 'Cantonese', 'English', 'Malay'],
    specialization: 'PLA Cyber Warfare & AI Weapons Programs',
    missions: [
      { date: '2023-12-01', name: 'OP SILK ROAD', result: 'SUCCESS' },
      { date: '2024-08-22', name: 'OP FIREWALL BREACH', result: 'SUCCESS' },
      { date: '2025-05-15', name: 'OP QUANTUM DRAGON', result: 'FAILED' },
      { date: '2025-11-08', name: 'OP SHENZHEN GHOST', result: 'ONGOING' }
    ],
    intel: ['HUMINT — Unit 61398 cyber operators', 'Documents — AI-driven autonomous weapons', 'SIGINT — PLA Strategic Support Force comms', 'Photos — Quantum computing military lab'],
    threatLevel: 99
  }
];

const SAFE_HOUSES = [
  { id: 'SH1', city: 'Dubai', country: 'UAE', codename: 'OASIS', status: 'SECURE', lastInspection: '2026-02-10', capacity: 4 },
  { id: 'SH2', city: 'Bangkok', country: 'Thailand', codename: 'ORCHID', status: 'SECURE', lastInspection: '2026-01-28', capacity: 6 },
  { id: 'SH3', city: 'Istanbul', country: 'Turkey', codename: 'BAZAAR', status: 'COMPROMISED', lastInspection: '2025-12-15', capacity: 3 },
  { id: 'SH4', city: 'Kathmandu', country: 'Nepal', codename: 'SUMMIT', status: 'SECURE', lastInspection: '2026-02-05', capacity: 5 },
  { id: 'SH5', city: 'Berlin', country: 'Germany', codename: 'CHECKPOINT', status: 'ABANDONED', lastInspection: '2025-08-20', capacity: 4 },
  { id: 'SH6', city: 'Colombo', country: 'Sri Lanka', codename: 'PEARL', status: 'SECURE', lastInspection: '2026-02-12', capacity: 3 }
];

const OPERATIONS_LOG_INITIAL = [
  { id: 'OP01', date: '2026-02-20', name: 'OP CRIMSON TIDE', country: 'Pakistan', type: 'Intelligence Gathering', status: 'ACTIVE', classification: 'TOP SECRET/SCI' },
  { id: 'OP02', date: '2026-02-19', name: 'OP NIGHT HARVEST', country: 'China', type: 'Infiltration', status: 'ACTIVE', classification: 'TOP SECRET' },
  { id: 'OP03', date: '2026-02-18', name: 'OP DESERT WIND', country: 'UAE', type: 'Intelligence Gathering', status: 'COMPLETE', classification: 'SECRET' },
  { id: 'OP04', date: '2026-02-17', name: 'OP WOLF EXTRACT', country: 'Russia', type: 'Extraction', status: 'PLANNING', classification: 'TOP SECRET/SCI' },
  { id: 'OP05', date: '2026-02-16', name: 'OP BLACK ORCHID', country: 'Iran', type: 'Sabotage', status: 'ACTIVE', classification: 'TOP SECRET/SCI' },
  { id: 'OP06', date: '2026-02-15', name: 'OP HAWK RESCUE', country: 'Afghanistan', type: 'Extraction', status: 'PLANNING', classification: 'TOP SECRET' },
  { id: 'OP07', date: '2026-02-14', name: 'OP SILENT BLADE', country: 'Pakistan', type: 'Assassination', status: 'COMPLETE', classification: 'EYES ONLY' },
  { id: 'OP08', date: '2026-02-13', name: 'OP THUNDER CROSS', country: 'Bangladesh', type: 'Intelligence Gathering', status: 'ACTIVE', classification: 'SECRET' },
  { id: 'OP09', date: '2026-02-12', name: 'OP IRON FIST', country: 'Turkey', type: 'Infiltration', status: 'COMPLETE', classification: 'TOP SECRET' },
  { id: 'OP10', date: '2026-02-11', name: 'OP GHOST PROTOCOL', country: 'China', type: 'Sabotage', status: 'ACTIVE', classification: 'EYES ONLY' }
];

const NEW_OPS = [
  { name: 'OP VENOM STRIKE', country: 'Pakistan', type: 'Assassination', classification: 'EYES ONLY' },
  { name: 'OP DRAGON WAKE', country: 'China', type: 'Intelligence Gathering', classification: 'TOP SECRET/SCI' },
  { name: 'OP SPIDER WEB', country: 'Iran', type: 'Infiltration', classification: 'TOP SECRET' },
  { name: 'OP SHADOW NET', country: 'Russia', type: 'Sabotage', classification: 'TOP SECRET/SCI' },
  { name: 'OP FALCON DIVE', country: 'Afghanistan', type: 'Extraction', classification: 'TOP SECRET' },
  { name: 'OP GOLDEN ARROW', country: 'UAE', type: 'Intelligence Gathering', classification: 'SECRET' },
  { name: 'OP DARK HORIZON', country: 'Turkey', type: 'Infiltration', classification: 'TOP SECRET' },
  { name: 'OP MONSOON FURY', country: 'Bangladesh', type: 'Intelligence Gathering', classification: 'SECRET' }
];

const DEAD_DROPS = [
  { location: 'Lodi Gardens, New Delhi', codename: 'BENCH-7', status: 'ACTIVE', lastUsed: '2026-02-14' },
  { location: 'Victoria Peak, Hong Kong', codename: 'VIEWPOINT-3', status: 'ACTIVE', lastUsed: '2026-01-29' },
  { location: 'Blue Mosque perimeter, Istanbul', codename: 'MINARET-1', status: 'BURNED', lastUsed: '2025-12-10' },
  { location: 'Central Park Reservoir, NYC', codename: 'RUNNER-5', status: 'ACTIVE', lastUsed: '2026-02-08' },
  { location: 'Gorky Park, Moscow', codename: 'FROST-9', status: 'ACTIVE', lastUsed: '2026-01-20' }
];

const statusColor = (status) => {
  switch (status) {
    case 'ACTIVE': return '#34D399';
    case 'DORMANT': return '#60A5FA';
    case 'COMPROMISED': return '#DC2626';
    case 'EXTRACTED': return '#A78BFA';
    case 'MIA': return '#FBBF24';
    default: return '#64748b';
  }
};

const intelValueColor = (val) => {
  switch (val) {
    case 'CRITICAL': return '#DC2626';
    case 'HIGH': return '#FBBF24';
    case 'MEDIUM': return '#60A5FA';
    default: return '#64748b';
  }
};

const missionResultColor = (result) => {
  switch (result) {
    case 'SUCCESS': return '#34D399';
    case 'FAILED': return '#F87171';
    case 'ONGOING': return '#FBBF24';
    default: return '#64748b';
  }
};

const opStatusColor = (s) => {
  switch (s) {
    case 'ACTIVE': return '#34D399';
    case 'COMPLETE': return '#60A5FA';
    case 'PLANNING': return '#FBBF24';
    case 'FAILED': return '#F87171';
    default: return '#64748b';
  }
};

const safeHouseStatusColor = (s) => {
  switch (s) {
    case 'SECURE': return '#34D399';
    case 'COMPROMISED': return '#DC2626';
    case 'ABANDONED': return '#64748b';
    default: return '#64748b';
  }
};

const SpyNetwork = ({ onBack }) => {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [opsLog, setOpsLog] = useState(OPERATIONS_LOG_INITIAL);
  const [encryptionActive, setEncryptionActive] = useState(false);
  const [encryptionPhase, setEncryptionPhase] = useState('');
  const [extractStep, setExtractStep] = useState(0);
  const [extractTarget, setExtractTarget] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [pulsePhase, setPulsePhase] = useState(0);
  const opsEndRef = useRef(null);
  const newOpIndex = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const pulse = setInterval(() => setPulsePhase(p => (p + 1) % 100), 50);
    return () => clearInterval(pulse);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const op = NEW_OPS[newOpIndex.current % NEW_OPS.length];
      newOpIndex.current += 1;
      const now = new Date();
      const dateStr = now.toISOString().split('T')[0];
      setOpsLog(prev => [
        {
          id: `OP-NEW-${Date.now()}`,
          date: dateStr,
          name: op.name,
          country: op.country,
          type: op.type,
          status: 'ACTIVE',
          classification: op.classification
        },
        ...prev.slice(0, 14)
      ]);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (opsEndRef.current) {
      opsEndRef.current.scrollTop = 0;
    }
  }, [opsLog]);

  const handleSendMessage = useCallback(() => {
    if (!selectedAgent || encryptionActive) return;
    setEncryptionActive(true);
    setEncryptionPhase('INITIATING SECURE CHANNEL...');
    setTimeout(() => setEncryptionPhase('GENERATING AES-256 SESSION KEY...'), 800);
    setTimeout(() => setEncryptionPhase('RSA-4096 HANDSHAKE IN PROGRESS...'), 1600);
    setTimeout(() => setEncryptionPhase('ROUTING THROUGH TOR NETWORK...'), 2400);
    setTimeout(() => setEncryptionPhase('APPLYING STEGANOGRAPHIC ENCODING...'), 3200);
    setTimeout(() => setEncryptionPhase('MESSAGE ENCRYPTED & DISPATCHED'), 4000);
    setTimeout(() => {
      setEncryptionActive(false);
      setEncryptionPhase('');
    }, 5500);
  }, [selectedAgent, encryptionActive]);

  const handleExtractInit = useCallback((agent) => {
    setExtractTarget(agent);
    setExtractStep(1);
  }, []);

  const handleExtractConfirm = useCallback(() => {
    if (extractStep === 1) {
      setExtractStep(2);
    } else if (extractStep === 2) {
      setExtractStep(3);
      setTimeout(() => {
        setExtractStep(0);
        setExtractTarget(null);
      }, 3000);
    }
  }, [extractStep]);

  const handleExtractCancel = useCallback(() => {
    setExtractStep(0);
    setExtractTarget(null);
  }, []);

  const activeAgents = AGENTS.filter(a => a.status === 'ACTIVE').length;
  const compromisedAgents = AGENTS.filter(a => a.status === 'COMPROMISED').length;
  const countriesPenetrated = [...new Set(AGENTS.filter(a => a.status === 'ACTIVE' || a.status === 'DORMANT').map(a => a.country))].length;
  const opsRunning = opsLog.filter(o => o.status === 'ACTIVE').length;
  const safeHouseSecure = SAFE_HOUSES.filter(s => s.status === 'SECURE').length;
  const intelReports = 147;

  const countryAgentMap = {};
  AGENTS.forEach(a => {
    if (a.status !== 'EXTRACTED') {
      if (!countryAgentMap[a.country]) countryAgentMap[a.country] = [];
      countryAgentMap[a.country].push(a);
    }
  });

  const pulseOpacity = 0.4 + 0.6 * Math.abs(Math.sin(pulsePhase * 0.08));

  const styles = {
    overlay: {
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'linear-gradient(135deg, #020617 0%, #0a0a1a 50%, #020617 100%)',
      zIndex: 9999, display: 'flex', flexDirection: 'column', fontFamily: "'JetBrains Mono', monospace",
      color: '#e2e8f0', overflow: 'hidden'
    },
    header: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 24px', borderBottom: '1px solid rgba(0,255,204,0.15)',
      background: 'linear-gradient(90deg, rgba(0,255,204,0.05) 0%, rgba(2,6,23,0.9) 50%, rgba(0,255,204,0.05) 100%)',
      flexShrink: 0
    },
    title: {
      fontFamily: "'Orbitron', monospace", fontSize: '18px', fontWeight: 700,
      color: '#00FFCC', letterSpacing: '3px', textShadow: '0 0 20px rgba(0,255,204,0.4)'
    },
    badge: {
      padding: '4px 14px', borderRadius: '4px', fontSize: '10px', fontWeight: 700,
      letterSpacing: '2px', fontFamily: "'Orbitron', monospace"
    },
    statsBar: {
      display: 'flex', gap: '16px', padding: '8px 24px',
      borderBottom: '1px solid rgba(0,255,204,0.08)', background: 'rgba(0,0,0,0.3)',
      flexShrink: 0, flexWrap: 'wrap'
    },
    statItem: {
      display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 12px',
      borderRadius: '6px', background: 'rgba(0,255,204,0.04)', border: '1px solid rgba(0,255,204,0.08)'
    },
    mainContent: {
      display: 'grid', gridTemplateColumns: '280px 1fr 300px',
      gridTemplateRows: '1fr 220px', flex: 1, gap: '1px',
      background: 'rgba(0,255,204,0.06)', overflow: 'hidden'
    },
    panel: {
      background: '#020617', overflow: 'hidden', display: 'flex', flexDirection: 'column'
    },
    panelHeader: {
      fontFamily: "'Orbitron', monospace", fontSize: '11px', fontWeight: 700,
      color: '#00FFCC', letterSpacing: '2px', padding: '10px 14px',
      borderBottom: '1px solid rgba(0,255,204,0.12)',
      background: 'rgba(0,255,204,0.03)', flexShrink: 0,
      display: 'flex', alignItems: 'center', gap: '8px'
    },
    agentItem: (isSelected, status) => ({
      padding: '8px 12px', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.04)',
      background: isSelected ? 'rgba(0,255,204,0.1)' : 'transparent',
      borderLeft: isSelected ? '3px solid #00FFCC' : '3px solid transparent',
      transition: 'all 0.2s ease'
    }),
    button: (bg, hoverBg) => ({
      padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer',
      fontFamily: "'Orbitron', monospace", fontSize: '10px', fontWeight: 700,
      letterSpacing: '1px', color: '#fff', background: bg,
      display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center'
    }),
    closeBtn: {
      background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '6px', padding: '6px', cursor: 'pointer', color: '#e2e8f0',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }
  };

  const renderStatItem = (icon, label, value, color = '#00FFCC') => (
    <div style={styles.statItem}>
      {icon}
      <div>
        <div style={{ fontSize: '9px', color: '#64748b', letterSpacing: '1px', textTransform: 'uppercase' }}>{label}</div>
        <div style={{ fontSize: '16px', fontWeight: 700, color, fontFamily: "'Orbitron', monospace" }}>{value}</div>
      </div>
    </div>
  );

  const renderAgentRoster = () => (
    <div style={{ ...styles.panel, gridRow: '1 / 2' }}>
      <div style={styles.panelHeader}>
        <Users size={14} />
        AGENT ROSTER
      </div>
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {AGENTS.map(agent => {
          const isSelected = selectedAgent?.id === agent.id;
          const isCompromised = agent.status === 'COMPROMISED';
          const isMIA = agent.status === 'MIA';
          return (
            <motion.div
              key={agent.id}
              style={styles.agentItem(isSelected, agent.status)}
              onClick={() => setSelectedAgent(agent)}
              whileHover={{ background: 'rgba(0,255,204,0.06)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {(isCompromised || isMIA) && (
                    <div style={{
                      width: '8px', height: '8px', borderRadius: '50%',
                      background: isCompromised ? '#DC2626' : '#FBBF24',
                      opacity: pulseOpacity,
                      boxShadow: `0 0 8px ${isCompromised ? '#DC2626' : '#FBBF24'}`
                    }} />
                  )}
                  <span style={{
                    fontFamily: "'Orbitron', monospace", fontSize: '12px', fontWeight: 700,
                    color: statusColor(agent.status)
                  }}>
                    {agent.codename}
                  </span>
                </div>
                <span style={{
                  fontSize: '8px', padding: '2px 6px', borderRadius: '3px',
                  background: `${statusColor(agent.status)}20`, color: statusColor(agent.status),
                  fontWeight: 700, letterSpacing: '0.5px'
                }}>
                  {agent.status}
                </span>
              </div>
              <div style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '1px' }}>{agent.coverName}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '9px', color: '#64748b' }}>
                  <MapPin size={9} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '3px' }} />
                  {agent.country}
                </span>
                <span style={{
                  fontSize: '8px', color: intelValueColor(agent.intelValue),
                  fontWeight: 600
                }}>
                  {agent.intelValue}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const renderAgentDetail = () => (
    <div style={{ ...styles.panel, gridRow: '1 / 2' }}>
      <div style={styles.panelHeader}>
        <FileText size={14} />
        AGENT DOSSIER
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px' }}>
        <AnimatePresence mode="wait">
          {selectedAgent ? (
            <motion.div
              key={selectedAgent.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  width: '50px', height: '50px', borderRadius: '50%',
                  background: `linear-gradient(135deg, ${statusColor(selectedAgent.status)}40, ${statusColor(selectedAgent.status)}10)`,
                  border: `2px solid ${statusColor(selectedAgent.status)}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Crosshair size={22} color={statusColor(selectedAgent.status)} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '20px', fontWeight: 700, color: '#00FFCC' }}>
                    {selectedAgent.codename}
                  </div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>{selectedAgent.coverName}</div>
                  <span style={{
                    fontSize: '9px', padding: '2px 8px', borderRadius: '3px', marginTop: '2px', display: 'inline-block',
                    background: `${statusColor(selectedAgent.status)}20`, color: statusColor(selectedAgent.status),
                    fontWeight: 700
                  }}>
                    {selectedAgent.status}
                  </span>
                </div>
              </div>

              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px',
                padding: '10px', borderRadius: '8px', background: 'rgba(0,255,204,0.03)',
                border: '1px solid rgba(0,255,204,0.08)'
              }}>
                {[
                  ['Cover Nationality', selectedAgent.coverNationality],
                  ['Country Deployed', selectedAgent.country],
                  ['Years Deployed', selectedAgent.yearsDeployed],
                  ['Handler', selectedAgent.handler],
                  ['Cover', selectedAgent.coverProfession],
                  ['Last Contact', selectedAgent.lastContact]
                ].map(([label, val], i) => (
                  <div key={i} style={{ gridColumn: i >= 4 ? '1 / -1' : undefined }}>
                    <div style={{ fontSize: '8px', color: '#64748b', letterSpacing: '1px', textTransform: 'uppercase' }}>{label}</div>
                    <div style={{ fontSize: '11px', color: '#e2e8f0' }}>{val}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '9px', color: '#64748b', letterSpacing: '1px', marginBottom: '4px' }}>LANGUAGES</div>
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  {selectedAgent.languages.map(l => (
                    <span key={l} style={{
                      padding: '2px 8px', borderRadius: '4px', fontSize: '10px',
                      background: 'rgba(96,165,250,0.1)', color: '#60A5FA', border: '1px solid rgba(96,165,250,0.2)'
                    }}>{l}</span>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '9px', color: '#64748b', letterSpacing: '1px', marginBottom: '4px' }}>SPECIALIZATION</div>
                <div style={{ fontSize: '11px', color: '#A78BFA', fontWeight: 600 }}>{selectedAgent.specialization}</div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <div style={{
                  fontFamily: "'Orbitron', monospace", fontSize: '10px', color: '#00FFCC',
                  letterSpacing: '1px', marginBottom: '6px'
                }}>
                  MISSION HISTORY
                </div>
                {selectedAgent.missions.map((m, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '8px', padding: '5px 8px',
                    borderRadius: '4px', marginBottom: '3px',
                    background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent'
                  }}>
                    <span style={{ fontSize: '9px', color: '#64748b', minWidth: '70px' }}>{m.date}</span>
                    <span style={{ fontSize: '10px', color: '#e2e8f0', flex: 1 }}>{m.name}</span>
                    <span style={{
                      fontSize: '9px', fontWeight: 700, color: missionResultColor(m.result),
                      padding: '1px 6px', borderRadius: '3px',
                      background: `${missionResultColor(m.result)}15`
                    }}>
                      {m.result}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: '14px' }}>
                <div style={{
                  fontFamily: "'Orbitron', monospace", fontSize: '10px', color: '#00FFCC',
                  letterSpacing: '1px', marginBottom: '6px'
                }}>
                  INTELLIGENCE GATHERED
                </div>
                {selectedAgent.intel.map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: '6px', marginBottom: '4px',
                    fontSize: '10px', color: '#94a3b8'
                  }}>
                    <ChevronRight size={10} color="#00FFCC" style={{ marginTop: '2px', flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{
                  fontFamily: "'Orbitron', monospace", fontSize: '10px', color: '#00FFCC',
                  letterSpacing: '1px', marginBottom: '6px'
                }}>
                  RISK ASSESSMENT
                </div>
                <div style={{
                  height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)',
                  overflow: 'hidden'
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedAgent.threatLevel}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    style={{
                      height: '100%', borderRadius: '4px',
                      background: selectedAgent.threatLevel > 80
                        ? 'linear-gradient(90deg, #FBBF24, #DC2626)'
                        : selectedAgent.threatLevel > 50
                          ? 'linear-gradient(90deg, #34D399, #FBBF24)'
                          : 'linear-gradient(90deg, #34D399, #60A5FA)'
                    }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3px' }}>
                  <span style={{ fontSize: '9px', color: '#64748b' }}>THREAT LEVEL</span>
                  <span style={{
                    fontSize: '11px', fontWeight: 700, fontFamily: "'Orbitron', monospace",
                    color: selectedAgent.threatLevel > 80 ? '#DC2626' : selectedAgent.threatLevel > 50 ? '#FBBF24' : '#34D399'
                  }}>
                    {selectedAgent.threatLevel}%
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <motion.button
                  style={{
                    ...styles.button('linear-gradient(135deg, #00FFCC, #059669)'),
                    flex: 1, position: 'relative', overflow: 'hidden'
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSendMessage}
                  disabled={encryptionActive}
                >
                  <Lock size={12} />
                  SEND ENCRYPTED MESSAGE
                </motion.button>
                <motion.button
                  style={{ ...styles.button('linear-gradient(135deg, #DC2626, #991b1b)'), flex: 1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleExtractInit(selectedAgent)}
                >
                  <ArrowDownCircle size={12} />
                  EXTRACT AGENT
                </motion.button>
              </div>

              <AnimatePresence>
                {encryptionActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{
                      marginTop: '12px', padding: '12px', borderRadius: '8px',
                      background: 'rgba(0,255,204,0.05)', border: '1px solid rgba(0,255,204,0.2)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Key size={14} color="#00FFCC" />
                      </motion.div>
                      <span style={{ fontFamily: "'Orbitron', monospace", fontSize: '10px', color: '#00FFCC', letterSpacing: '1px' }}>
                        ENCRYPTION IN PROGRESS
                      </span>
                    </div>
                    <motion.div
                      key={encryptionPhase}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      style={{ fontSize: '11px', color: '#34D399', fontWeight: 600 }}
                    >
                      {encryptionPhase}
                    </motion.div>
                    <div style={{
                      marginTop: '8px', fontFamily: 'monospace', fontSize: '9px', color: '#64748b',
                      letterSpacing: '1px', lineHeight: '1.6', wordBreak: 'break-all'
                    }}>
                      {Array.from({ length: 3 }, (_, i) =>
                        Array.from({ length: 48 }, () =>
                          '0123456789ABCDEF'[Math.floor(Math.random() * 16)]
                        ).join('')
                      ).join('\n')}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                height: '100%', color: '#334155', textAlign: 'center', padding: '40px'
              }}
            >
              <Shield size={48} style={{ marginBottom: '16px', opacity: 0.3 }} />
              <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '12px', letterSpacing: '2px', marginBottom: '8px' }}>
                SELECT AN AGENT
              </div>
              <div style={{ fontSize: '11px', color: '#475569' }}>
                Choose an operative from the roster to view their classified dossier
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  const renderNetworkMap = () => (
    <div style={{ ...styles.panel, gridRow: '1 / 2' }}>
      <div style={styles.panelHeader}>
        <Globe size={14} />
        NETWORK MAP
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
        <div style={{ marginBottom: '14px' }}>
          <div style={{
            fontFamily: "'Orbitron', monospace", fontSize: '9px', color: '#00FFCC',
            letterSpacing: '1px', marginBottom: '8px'
          }}>
            COUNTRIES — ACTIVE OPERATIVES
          </div>
          {Object.entries(countryAgentMap).map(([country, agents]) => (
            <div key={country} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '5px 8px', marginBottom: '2px', borderRadius: '4px',
              background: 'rgba(255,255,255,0.02)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={10} color="#00FFCC" />
                <span style={{ fontSize: '11px', color: '#e2e8f0' }}>{country}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{
                  fontSize: '10px', color: '#94a3b8'
                }}>
                  {agents.map(a => a.codename).join(', ')}
                </span>
                <span style={{
                  fontFamily: "'Orbitron', monospace", fontSize: '12px', fontWeight: 700,
                  color: '#00FFCC', minWidth: '18px', textAlign: 'right'
                }}>
                  {agents.length}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '14px' }}>
          <div style={{
            fontFamily: "'Orbitron', monospace", fontSize: '9px', color: '#00FFCC',
            letterSpacing: '1px', marginBottom: '8px'
          }}>
            ENCRYPTED CHANNELS
          </div>
          {['AES-256-GCM Primary', 'RSA-4096 Backup', 'Quantum-Resistant Lattice', 'One-Time Pad (Emergency)'].map((ch, i) => (
            <div key={ch} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '4px 8px', marginBottom: '2px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Signal size={10} color={i < 3 ? '#34D399' : '#FBBF24'} />
                <span style={{ fontSize: '10px', color: '#94a3b8' }}>{ch}</span>
              </div>
              <span style={{
                fontSize: '8px', fontWeight: 700, padding: '2px 6px', borderRadius: '3px',
                background: i < 3 ? 'rgba(52,211,153,0.1)' : 'rgba(251,191,36,0.1)',
                color: i < 3 ? '#34D399' : '#FBBF24'
              }}>
                {i < 3 ? 'ONLINE' : 'STANDBY'}
              </span>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '14px' }}>
          <div style={{
            fontFamily: "'Orbitron', monospace", fontSize: '9px', color: '#00FFCC',
            letterSpacing: '1px', marginBottom: '8px'
          }}>
            DEAD DROPS
          </div>
          {DEAD_DROPS.map((dd, i) => (
            <div key={i} style={{
              padding: '5px 8px', marginBottom: '3px', borderRadius: '4px',
              background: 'rgba(255,255,255,0.02)', borderLeft: `2px solid ${dd.status === 'ACTIVE' ? '#34D399' : '#DC2626'}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '10px', color: '#e2e8f0', fontWeight: 600 }}>{dd.codename}</span>
                <span style={{
                  fontSize: '8px', fontWeight: 700, color: dd.status === 'ACTIVE' ? '#34D399' : '#DC2626'
                }}>
                  {dd.status}
                </span>
              </div>
              <div style={{ fontSize: '9px', color: '#64748b' }}>{dd.location}</div>
              <div style={{ fontSize: '8px', color: '#475569' }}>Last: {dd.lastUsed}</div>
            </div>
          ))}
        </div>

        <div>
          <div style={{
            fontFamily: "'Orbitron', monospace", fontSize: '9px', color: '#00FFCC',
            letterSpacing: '1px', marginBottom: '8px'
          }}>
            SAFE HOUSES
          </div>
          {SAFE_HOUSES.map(sh => (
            <div key={sh.id} style={{
              padding: '6px 8px', marginBottom: '3px', borderRadius: '4px',
              background: 'rgba(255,255,255,0.02)',
              borderLeft: `2px solid ${safeHouseStatusColor(sh.status)}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                <span style={{
                  fontFamily: "'Orbitron', monospace", fontSize: '10px', fontWeight: 700,
                  color: '#e2e8f0'
                }}>
                  {sh.codename}
                </span>
                <span style={{
                  fontSize: '8px', fontWeight: 700, padding: '2px 6px', borderRadius: '3px',
                  background: `${safeHouseStatusColor(sh.status)}15`,
                  color: safeHouseStatusColor(sh.status)
                }}>
                  {sh.status}
                </span>
              </div>
              <div style={{ fontSize: '9px', color: '#94a3b8' }}>
                {sh.city}, {sh.country}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: '#475569' }}>
                <span>Capacity: {sh.capacity}</span>
                <span>Inspected: {sh.lastInspection}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderOpsLog = () => (
    <div style={{ ...styles.panel, gridColumn: '1 / -1' }}>
      <div style={styles.panelHeader}>
        <Activity size={14} />
        COVERT OPERATIONS LOG
        <span style={{ marginLeft: 'auto', fontSize: '9px', color: '#64748b' }}>
          LIVE FEED — {opsLog.length} OPERATIONS
        </span>
      </div>
      <div ref={opsEndRef} style={{ flex: 1, overflowY: 'auto', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px' }}>
          <thead>
            <tr style={{ background: 'rgba(0,255,204,0.03)' }}>
              {['DATE', 'OPERATION', 'COUNTRY', 'TYPE', 'STATUS', 'CLASSIFICATION'].map(h => (
                <th key={h} style={{
                  padding: '6px 10px', textAlign: 'left', fontFamily: "'Orbitron', monospace",
                  fontSize: '8px', color: '#64748b', letterSpacing: '1px',
                  borderBottom: '1px solid rgba(0,255,204,0.08)', position: 'sticky', top: 0,
                  background: '#020617'
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {opsLog.map((op, i) => (
                <motion.tr
                  key={op.id}
                  initial={i === 0 ? { opacity: 0, x: -20, background: 'rgba(0,255,204,0.1)' } : false}
                  animate={{ opacity: 1, x: 0, background: 'transparent' }}
                  transition={{ duration: 0.5 }}
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}
                >
                  <td style={{ padding: '5px 10px', color: '#64748b' }}>{op.date}</td>
                  <td style={{ padding: '5px 10px', color: '#e2e8f0', fontWeight: 600 }}>{op.name}</td>
                  <td style={{ padding: '5px 10px', color: '#94a3b8' }}>{op.country}</td>
                  <td style={{ padding: '5px 10px' }}>
                    <span style={{
                      padding: '2px 6px', borderRadius: '3px', fontSize: '9px',
                      background: op.type === 'Assassination' ? 'rgba(220,38,38,0.1)' :
                        op.type === 'Sabotage' ? 'rgba(251,191,36,0.1)' :
                          op.type === 'Extraction' ? 'rgba(167,139,250,0.1)' :
                            op.type === 'Infiltration' ? 'rgba(96,165,250,0.1)' :
                              'rgba(52,211,153,0.1)',
                      color: op.type === 'Assassination' ? '#F87171' :
                        op.type === 'Sabotage' ? '#FBBF24' :
                          op.type === 'Extraction' ? '#A78BFA' :
                            op.type === 'Infiltration' ? '#60A5FA' :
                              '#34D399'
                    }}>
                      {op.type}
                    </span>
                  </td>
                  <td style={{ padding: '5px 10px' }}>
                    <span style={{
                      fontSize: '9px', fontWeight: 700, color: opStatusColor(op.status)
                    }}>
                      {op.status}
                    </span>
                  </td>
                  <td style={{ padding: '5px 10px' }}>
                    <span style={{
                      padding: '2px 6px', borderRadius: '3px', fontSize: '8px', fontWeight: 700,
                      letterSpacing: '0.5px',
                      background: op.classification === 'EYES ONLY' ? 'rgba(220,38,38,0.15)' :
                        op.classification.includes('SCI') ? 'rgba(251,191,36,0.1)' :
                          'rgba(96,165,250,0.08)',
                      color: op.classification === 'EYES ONLY' ? '#F87171' :
                        op.classification.includes('SCI') ? '#FBBF24' :
                          '#60A5FA'
                    }}>
                      {op.classification}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={styles.overlay}
    >
      <div style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Eye size={22} color="#00FFCC" />
          </motion.div>
          <div>
            <div style={styles.title}>COVERT INTELLIGENCE NETWORK — R&AW / IB</div>
            <div style={{ fontSize: '10px', color: '#64748b', letterSpacing: '1px' }}>
              RESEARCH & ANALYSIS WING • INTELLIGENCE BUREAU • NATIONAL SECURITY COUNCIL
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            ...styles.badge,
            background: 'rgba(220,38,38,0.2)', color: '#F87171',
            border: '1px solid rgba(220,38,38,0.4)'
          }}>
            EYES ONLY
          </span>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '4px 12px', borderRadius: '6px',
            background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)'
          }}>
            <div style={{
              width: '6px', height: '6px', borderRadius: '50%', background: '#34D399',
              boxShadow: '0 0 8px #34D399'
            }} />
            <span style={{ fontSize: '10px', color: '#34D399', fontFamily: "'Orbitron', monospace" }}>
              {activeAgents} AGENTS ACTIVE
            </span>
          </div>
          <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '11px', color: '#64748b' }}>
            {currentTime.toISOString().replace('T', ' ').substring(0, 19)} UTC
          </div>
          <motion.button
            style={styles.closeBtn}
            whileHover={{ scale: 1.1, background: 'rgba(220,38,38,0.2)' }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
          >
            <X size={18} />
          </motion.button>
        </div>
      </div>

      <div style={styles.statsBar}>
        {renderStatItem(<Users size={14} color="#00FFCC" />, 'Agents Active', activeAgents)}
        {renderStatItem(<Globe size={14} color="#60A5FA" />, 'Countries Penetrated', countriesPenetrated, '#60A5FA')}
        {renderStatItem(<FileText size={14} color="#34D399" />, 'Intel Reports (Mo)', intelReports, '#34D399')}
        {renderStatItem(<Target size={14} color="#FBBF24" />, 'Ops Running', opsRunning, '#FBBF24')}
        {renderStatItem(<Building size={14} color="#A78BFA" />, 'Safe Houses', safeHouseSecure, '#A78BFA')}
        {renderStatItem(<AlertTriangle size={14} color="#DC2626" />, 'Compromised', compromisedAgents, '#DC2626')}
      </div>

      <div style={styles.mainContent}>
        {renderAgentRoster()}
        {renderAgentDetail()}
        {renderNetworkMap()}
        {renderOpsLog()}
      </div>

      <AnimatePresence>
        {extractStep > 0 && extractTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.85)', zIndex: 10000,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
            onClick={handleExtractCancel}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: '#0a0a1a', borderRadius: '12px', padding: '32px',
                border: '1px solid rgba(220,38,38,0.3)', maxWidth: '480px', width: '100%',
                boxShadow: '0 0 60px rgba(220,38,38,0.15)'
              }}
            >
              {extractStep === 1 && (
                <>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px'
                  }}>
                    <AlertTriangle size={28} color="#DC2626" />
                    <div style={{
                      fontFamily: "'Orbitron', monospace", fontSize: '16px', fontWeight: 700,
                      color: '#DC2626', letterSpacing: '2px'
                    }}>
                      EMERGENCY EXTRACTION
                    </div>
                  </div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>
                    Initiating extraction protocol for:
                  </div>
                  <div style={{
                    padding: '12px', borderRadius: '8px', background: 'rgba(220,38,38,0.05)',
                    border: '1px solid rgba(220,38,38,0.15)', marginBottom: '16px'
                  }}>
                    <div style={{
                      fontFamily: "'Orbitron', monospace", fontSize: '18px', color: '#F87171', fontWeight: 700
                    }}>
                      {extractTarget.codename}
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                      {extractTarget.coverName} — {extractTarget.country}
                    </div>
                  </div>
                  <div style={{
                    fontSize: '11px', color: '#FBBF24', marginBottom: '20px', padding: '10px',
                    borderRadius: '6px', background: 'rgba(251,191,36,0.05)',
                    border: '1px solid rgba(251,191,36,0.15)'
                  }}>
                    WARNING: This will burn the agent's cover identity permanently. All ongoing operations in {extractTarget.country} will be compromised. This action cannot be reversed.
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <motion.button
                      style={{ ...styles.button('rgba(255,255,255,0.06)'), flex: 1, border: '1px solid rgba(255,255,255,0.1)' }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleExtractCancel}
                    >
                      ABORT
                    </motion.button>
                    <motion.button
                      style={{ ...styles.button('linear-gradient(135deg, #DC2626, #991b1b)'), flex: 1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleExtractConfirm}
                    >
                      CONFIRM EXTRACTION
                    </motion.button>
                  </div>
                </>
              )}

              {extractStep === 2 && (
                <>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px'
                  }}>
                    <Skull size={28} color="#DC2626" />
                    <div style={{
                      fontFamily: "'Orbitron', monospace", fontSize: '14px', fontWeight: 700,
                      color: '#DC2626', letterSpacing: '2px'
                    }}>
                      FINAL CONFIRMATION REQUIRED
                    </div>
                  </div>
                  <div style={{
                    fontSize: '12px', color: '#F87171', textAlign: 'center', marginBottom: '20px',
                    padding: '16px', borderRadius: '8px', background: 'rgba(220,38,38,0.08)',
                    border: '1px solid rgba(220,38,38,0.3)', fontWeight: 600
                  }}>
                    AUTHORIZING EXTRACTION OF AGENT {extractTarget.codename} FROM {extractTarget.country.toUpperCase()}.
                    THIS IS A LEVEL-5 DIRECTIVE. CONFIRM TO PROCEED.
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <motion.button
                      style={{ ...styles.button('rgba(255,255,255,0.06)'), flex: 1, border: '1px solid rgba(255,255,255,0.1)' }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleExtractCancel}
                    >
                      CANCEL
                    </motion.button>
                    <motion.button
                      style={{ ...styles.button('linear-gradient(135deg, #DC2626, #7f1d1d)'), flex: 1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleExtractConfirm}
                    >
                      <Zap size={14} />
                      EXECUTE EXTRACTION
                    </motion.button>
                  </div>
                </>
              )}

              {extractStep === 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ textAlign: 'center' }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle size={48} color="#34D399" style={{ margin: '0 auto 16px' }} />
                  </motion.div>
                  <div style={{
                    fontFamily: "'Orbitron', monospace", fontSize: '16px', fontWeight: 700,
                    color: '#34D399', letterSpacing: '2px', marginBottom: '12px'
                  }}>
                    EXTRACTION ORDER DISPATCHED
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                    Extraction team mobilized for {extractTarget.codename}. ETA to safe house: 4-6 hours. Secure comm channel established.
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SpyNetwork;
