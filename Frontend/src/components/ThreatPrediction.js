import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Brain, Shield, AlertTriangle, Activity, TrendingUp, TrendingDown,
  Minus, Target, ChevronRight, Cpu, Clock,
  BarChart3, Crosshair, Radar,
  DollarSign, Flame, Users,
  ShieldAlert, Satellite,
  Megaphone, CircleDot, Layers, ScanLine, RefreshCw
} from 'lucide-react';

const CATEGORIES = ['Military', 'Cyber', 'Economic', 'Terrorism', 'Political', 'Hybrid'];
const SEVERITIES = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];

const INITIAL_PREDICTIONS = [
  {
    id: 'TP-001',
    title: 'China LAC Escalation',
    region: 'South Asia',
    country: 'China',
    confidence: 78,
    timeframe: '30 days',
    category: 'Military',
    severity: 'HIGH',
    evidence: [
      'Satellite imagery shows PLA armor repositioning near Aksai Chin',
      'SIGINT intercepts indicate increased PLA Western Theater Command chatter',
      'OSINT: Chinese state media escalating rhetoric on border sovereignty',
      'HUMINT: Sources report logistics buildup at forward airbases'
    ],
    countermeasures: [
      'Reinforce forward deployments along LAC sectors',
      'Activate SIGINT monitoring on PLA Western Theater frequencies',
      'Pre-position Indian Mountain Corps reserves',
      'Elevate diplomatic back-channel communications'
    ]
  },
  {
    id: 'TP-002',
    title: 'Pakistan Cross-Border Strike',
    region: 'South Asia',
    country: 'Pakistan',
    confidence: 65,
    timeframe: '60 days',
    category: 'Terrorism',
    severity: 'HIGH',
    evidence: [
      'HUMINT: Cross-border infiltration training observed at Muzaffarabad camps',
      'SIGINT: Encrypted comms spike between ISI and militant handlers',
      'IMINT: New staging areas identified near LoC in Neelum Valley',
      'OSINT: Pak-based social media accounts amplifying Kashmir narratives'
    ],
    countermeasures: [
      'Increase LoC surveillance with UAV patrols',
      'Deploy additional counter-infiltration teams',
      'Activate HUMINT assets in PoK for early warning',
      'Coordinate with NSA and RAW for joint assessment'
    ]
  },
  {
    id: 'TP-003',
    title: 'Chinese Cyber Campaign on Infrastructure',
    region: 'East Asia',
    country: 'China',
    confidence: 82,
    timeframe: '14 days',
    category: 'Cyber',
    severity: 'CRITICAL',
    evidence: [
      'APT-41 infrastructure reactivated with new C2 domains targeting Indian IPs',
      'Anomalous traffic patterns on SCADA networks in northern grid sectors',
      'CERT-In flagged 3 new zero-day exploits attributed to Chinese state actors',
      'MASINT: Electromagnetic signatures from Hainan suggest cyber-ops facility activation'
    ],
    countermeasures: [
      'Patch all SCADA systems against CVE-2026-1847 immediately',
      'Activate NCIIPC emergency response protocols',
      'Deploy honeypots on critical infrastructure segments',
      'Initiate counter-cyber operations via NTRO'
    ]
  },
  {
    id: 'TP-004',
    title: 'North Korea Nuclear Test',
    region: 'East Asia',
    country: 'North Korea',
    confidence: 71,
    timeframe: '45 days',
    category: 'Military',
    severity: 'CRITICAL',
    evidence: [
      'IMINT: Tunnel excavation activity at Punggye-ri nuclear test site resumed',
      'SIGINT: DPRK military frequencies show increased nuclear command traffic',
      'OSINT: North Korean state media referencing "strategic deterrent" capability',
      'MASINT: Seismic sensors detect underground construction activity'
    ],
    countermeasures: [
      'Coordinate intelligence sharing with South Korea and Japan',
      'Activate ballistic missile defense early warning systems',
      'Brief NSC on potential fallout scenarios for Indian territory',
      'Prepare diplomatic response framework through MEA channels'
    ]
  },
  {
    id: 'TP-005',
    title: 'Iranian Proxy Attack on Indian Assets',
    region: 'Middle East',
    country: 'Iran',
    confidence: 58,
    timeframe: '90 days',
    category: 'Hybrid',
    severity: 'MEDIUM',
    evidence: [
      'HUMINT: Houthi-linked groups discussing Indian shipping as potential target',
      'SIGINT: IRGC Quds Force communications reference "eastern partners"',
      'OSINT: Escalating Iran-Israel tensions increasing regional instability',
      'Maritime tracking shows unusual vessel movements near Chabahar approach'
    ],
    countermeasures: [
      'Increase Indian Navy presence in Arabian Sea shipping lanes',
      'Activate maritime domain awareness protocols',
      'Coordinate with Oman and UAE for port security intelligence',
      'Brief Indian shipping companies on threat level escalation'
    ]
  },
  {
    id: 'TP-006',
    title: 'Maritime Confrontation South China Sea',
    region: 'East Asia',
    country: 'China',
    confidence: 74,
    timeframe: '21 days',
    category: 'Military',
    severity: 'HIGH',
    evidence: [
      'IMINT: PLAN carrier group deploying toward Spratly Islands',
      'SIGINT: Chinese maritime militia vessels converging near Philippine EEZ',
      'OSINT: Beijing issued new "historical waters" navigational warnings',
      'HUMINT: Vietnamese sources report Chinese survey ships in disputed waters'
    ],
    countermeasures: [
      'Coordinate with Quad partners for maritime surveillance sharing',
      'Deploy Indian Navy assets to Malacca Strait as precaution',
      'Activate bilateral hotlines with Vietnam and Philippines',
      'Monitor impact on Indian Ocean Region force posture'
    ]
  },
  {
    id: 'TP-007',
    title: 'Domestic Terror Attack (Kashmir)',
    region: 'South Asia',
    country: 'India',
    confidence: 67,
    timeframe: '30 days',
    category: 'Terrorism',
    severity: 'HIGH',
    evidence: [
      'HUMINT: Intelligence reports of weapons cache discovered near Pulwama',
      'SIGINT: Spike in encrypted messaging between known OGW networks',
      'OSINT: Social media radicalization campaigns targeting Kashmiri youth intensifying',
      'Pattern analysis correlates with pre-attack indicators from 2019 Pulwama model'
    ],
    countermeasures: [
      'Elevate CRPF convoy security protocols to maximum',
      'Deploy additional QRT teams in south Kashmir districts',
      'Intensify cordon-and-search operations in identified hotspots',
      'Activate NIA joint task force for preemptive arrests'
    ]
  },
  {
    id: 'TP-008',
    title: 'Economic Warfare — Currency Manipulation',
    region: 'Global',
    country: 'China',
    confidence: 61,
    timeframe: '60 days',
    category: 'Economic',
    severity: 'MEDIUM',
    evidence: [
      'PBOC quietly increased USD reserves by $47B in last quarter',
      'Algorithmic trading patterns suggest coordinated yuan devaluation strategy',
      'OSINT: Chinese economic forums discussing "managed depreciation" timeline',
      'RBI flagged abnormal capital outflow patterns from Indian equity markets'
    ],
    countermeasures: [
      'RBI to increase forex intervention readiness',
      'Coordinate with Finance Ministry on capital flow monitoring',
      'Activate bilateral currency swap agreements with allied nations',
      'Brief SEBI on potential market manipulation scenarios'
    ]
  }
];

const DATA_SOURCES = [
  { name: 'HUMINT', fullName: 'Human Intelligence', percentage: 23, color: '#00FFCC' },
  { name: 'SIGINT', fullName: 'Signals Intelligence', percentage: 31, color: '#60A5FA' },
  { name: 'OSINT', fullName: 'Open Source Intelligence', percentage: 19, color: '#FBBF24' },
  { name: 'IMINT', fullName: 'Imagery Intelligence', percentage: 17, color: '#A78BFA' },
  { name: 'MASINT', fullName: 'Measurement & Signature Intel', percentage: 10, color: '#F87171' }
];

const TREND_REGIONS = [
  { region: 'South Asia', direction: 'rising', change: '+12.4%', driver: 'LAC tensions & cross-border infiltration', index: 78 },
  { region: 'East Asia', direction: 'rising', change: '+8.7%', driver: 'SCS maritime buildup & nuclear posturing', index: 72 },
  { region: 'Middle East', direction: 'stable', change: '+1.2%', driver: 'Iran proxy networks & energy corridor risks', index: 61 },
  { region: 'Africa', direction: 'rising', change: '+5.3%', driver: 'Chinese BRI debt leverage & Wagner activity', index: 44 },
  { region: 'Europe', direction: 'falling', change: '-3.1%', driver: 'Stabilizing Eastern front, NATO expansion', index: 52 },
  { region: 'Americas', direction: 'stable', change: '+0.4%', driver: 'Cartel cyber operations & trade disputes', index: 31 }
];

const DETECTED_PATTERNS = [
  { id: 'PAT-01', name: 'PLA Armor Repositioning', source: 'IMINT + SIGINT', correlation: 91, relatedPrediction: 'TP-001', description: 'Heavy armor units moving from interior to forward positions along LAC' },
  { id: 'PAT-02', name: 'Cyber Probing Escalation', source: 'SIGINT + MASINT', correlation: 87, relatedPrediction: 'TP-003', description: 'Systematic port scanning of Indian critical infrastructure from Chinese IPs' },
  { id: 'PAT-03', name: 'Militant Communication Spike', source: 'SIGINT + HUMINT', correlation: 79, relatedPrediction: 'TP-002', description: 'Encrypted message volume between PoK handlers and sleeper cells increased 340%' },
  { id: 'PAT-04', name: 'Nuclear Site Construction', source: 'IMINT + MASINT', correlation: 84, relatedPrediction: 'TP-004', description: 'Tunneling activity and equipment movement consistent with test preparation' },
  { id: 'PAT-05', name: 'Economic Data Anomalies', source: 'OSINT + SIGINT', correlation: 72, relatedPrediction: 'TP-008', description: 'Unusual PBOC interventions correlated with Indian market volatility' }
];

const ECONOMIC_DATA = {
  sanctions: [
    { country: 'Russia', impact: 'Moderate', sectors: 'Energy, Defense', effectiveness: 62 },
    { country: 'Iran', impact: 'High', sectors: 'Oil, Banking', effectiveness: 74 },
    { country: 'North Korea', impact: 'Severe', sectors: 'All sectors', effectiveness: 88 },
    { country: 'Myanmar', impact: 'Low', sectors: 'Military', effectiveness: 34 }
  ],
  currencyManipulation: [
    { country: 'China', activity: 'Yuan devaluation signals', risk: 'HIGH', forex: '-2.3% (30d)' },
    { country: 'Turkey', activity: 'Lira defense spending', risk: 'MEDIUM', forex: '-4.7% (30d)' },
    { country: 'Pakistan', activity: 'PKR artificial stabilization', risk: 'MEDIUM', forex: '-1.8% (30d)' }
  ],
  tradeDisruptions: [
    { route: 'Strait of Hormuz', status: 'ELEVATED', impact: 'Oil supply — 21% of global transit' },
    { route: 'South China Sea', status: 'HIGH', impact: 'Trade goods — $3.4T annual transit' },
    { route: 'Suez Canal', status: 'MODERATE', impact: 'Europe-Asia trade — 12% of global' }
  ],
  energyThreats: [
    { source: 'Middle East Oil', threat: 'Houthi attacks on tankers', severity: 'HIGH' },
    { source: 'Russian Gas', threat: 'Pipeline weaponization', severity: 'MEDIUM' },
    { source: 'LNG Supply', threat: 'Chinese strategic reserve hoarding', severity: 'MEDIUM' }
  ]
};

const MEDIA_PROPAGANDA = {
  stateMedia: [
    { country: 'China', outlet: 'Global Times / Xinhua', narrative: 'LAC sovereignty claims, anti-Quad rhetoric', intensity: 'HIGH', trend: 'rising' },
    { country: 'Pakistan', outlet: 'Geo News / Dawn', narrative: 'Kashmir human rights, military modernization', intensity: 'MEDIUM', trend: 'stable' },
    { country: 'Russia', outlet: 'RT / Sputnik', narrative: 'Multipolar world order, anti-Western alignment', intensity: 'MEDIUM', trend: 'falling' },
    { country: 'Iran', outlet: 'Press TV / IRNA', narrative: 'Regional resistance axis, anti-Israel operations', intensity: 'HIGH', trend: 'rising' }
  ],
  disinfo: [
    { campaign: 'Operation Lotus Storm', origin: 'China', platform: 'Twitter/X, Telegram', targets: 'Indian military morale', status: 'ACTIVE' },
    { campaign: 'Kashmir Bleed', origin: 'Pakistan', platform: 'Instagram, WhatsApp', targets: 'Kashmiri youth radicalization', status: 'ACTIVE' },
    { campaign: 'Divide & Rule 2.0', origin: 'Russia', platform: 'Facebook, YouTube', targets: 'Indian communal tensions', status: 'MONITORING' }
  ],
  influenceOps: [
    { operation: 'Confucius Institute Network', actor: 'China', reach: '14 Indian universities', risk: 'MEDIUM' },
    { operation: 'Social Bot Farm — Lahore', actor: 'Pakistan', reach: '2.4M fake accounts', risk: 'HIGH' },
    { operation: 'Troll Factory — St. Petersburg', actor: 'Russia', reach: '890K Indian-targeted posts', risk: 'LOW' }
  ],
  sentiment: [
    { country: 'China', level: 'Hostile', score: -72, color: '#DC2626' },
    { country: 'Pakistan', level: 'Hostile', score: -81, color: '#DC2626' },
    { country: 'Russia', level: 'Neutral', score: 12, color: '#FBBF24' },
    { country: 'Iran', level: 'Neutral', score: -18, color: '#FBBF24' },
    { country: 'USA', level: 'Friendly', score: 64, color: '#34D399' },
    { country: 'Japan', level: 'Friendly', score: 71, color: '#34D399' },
    { country: 'Israel', level: 'Friendly', score: 58, color: '#34D399' },
    { country: 'France', level: 'Friendly', score: 42, color: '#34D399' }
  ]
};

const severityColor = (sev) => {
  switch (sev) {
    case 'CRITICAL': return '#DC2626';
    case 'HIGH': return '#F87171';
    case 'MEDIUM': return '#FBBF24';
    case 'LOW': return '#34D399';
    default: return '#60A5FA';
  }
};

const categoryIcon = (cat) => {
  switch (cat) {
    case 'Military': return Target;
    case 'Cyber': return Cpu;
    case 'Economic': return DollarSign;
    case 'Terrorism': return Flame;
    case 'Political': return Users;
    case 'Hybrid': return Layers;
    default: return Shield;
  }
};

const trendIcon = (dir) => {
  switch (dir) {
    case 'rising': return TrendingUp;
    case 'falling': return TrendingDown;
    case 'stable': return Minus;
    default: return Minus;
  }
};

const trendColor = (dir) => {
  switch (dir) {
    case 'rising': return '#F87171';
    case 'falling': return '#34D399';
    case 'stable': return '#FBBF24';
    default: return '#60A5FA';
  }
};

const GlowBar = ({ value, max = 100, color = '#00FFCC', height = 6 }) => (
  <div style={{ width: '100%', height, background: 'rgba(255,255,255,0.05)', borderRadius: height / 2, overflow: 'hidden' }}>
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${(value / max) * 100}%` }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      style={{ height: '100%', background: color, borderRadius: height / 2, boxShadow: `0 0 8px ${color}40` }}
    />
  </div>
);

const ScanOverlay = () => (
  <motion.div
    initial={{ top: 0, opacity: 0.8 }}
    animate={{ top: '100%', opacity: 0 }}
    transition={{ duration: 2.5, ease: 'linear' }}
    style={{
      position: 'absolute', left: 0, right: 0, height: 3, zIndex: 10,
      background: 'linear-gradient(90deg, transparent, #00FFCC, transparent)',
      boxShadow: '0 0 20px #00FFCC60',
      pointerEvents: 'none'
    }}
  />
);

const ThreatPrediction = ({ onBack }) => {
  const [predictions, setPredictions] = useState(INITIAL_PREDICTIONS);
  const [scanning, setScanning] = useState(false);
  const [scanPhase, setScanPhase] = useState('');
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [activeTab, setActiveTab] = useState('predictions');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [modelUptime, setModelUptime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setModelUptime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const runAnalysis = useCallback(() => {
    if (scanning) return;
    setScanning(true);
    setScanPhase('INITIALIZING NEURAL CORES...');

    const phases = [
      'LOADING INTELLIGENCE DATABASES...',
      'PROCESSING HUMINT FEEDS...',
      'ANALYZING SIGINT INTERCEPTS...',
      'CORRELATING OSINT DATA...',
      'RUNNING PATTERN RECOGNITION...',
      'CALCULATING THREAT VECTORS...',
      'GENERATING PREDICTIONS...',
      'FINALIZING CONFIDENCE SCORES...'
    ];

    let phaseIdx = 0;
    const phaseTimer = setInterval(() => {
      if (phaseIdx < phases.length) {
        setScanPhase(phases[phaseIdx]);
        phaseIdx++;
      }
    }, 400);

    setTimeout(() => {
      clearInterval(phaseTimer);
      setPredictions(prev => prev.map(p => ({
        ...p,
        confidence: Math.max(15, Math.min(99, p.confidence + Math.floor(Math.random() * 11) - 5))
      })));
      setScanning(false);
      setScanPhase('');
    }, 3500);
  }, [scanning]);

  const stats = {
    active: predictions.length,
    avgConfidence: Math.round(predictions.reduce((a, p) => a + p.confidence, 0) / predictions.length),
    critical: predictions.filter(p => p.severity === 'CRITICAL').length,
    patterns: DETECTED_PATTERNS.length,
    accuracy: 94.7,
    sources: DATA_SOURCES.length
  };

  const formatUptime = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'linear-gradient(135deg, #020617 0%, #0a0a1a 50%, #020617 100%)',
        color: '#E2E8F0', overflow: 'hidden', display: 'flex', flexDirection: 'column',
        fontFamily: "'JetBrains Mono', monospace"
      }}
    >
      {scanning && <ScanOverlay />}

      <div style={{
        padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid rgba(0,255,204,0.15)',
        background: 'linear-gradient(90deg, rgba(0,255,204,0.03), transparent, rgba(0,255,204,0.03))'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <motion.div
            animate={{ rotate: scanning ? 360 : 0 }}
            transition={{ duration: 2, repeat: scanning ? Infinity : 0, ease: 'linear' }}
          >
            <Brain size={28} color="#00FFCC" />
          </motion.div>
          <div>
            <h1 style={{
              fontFamily: "'Orbitron', monospace", fontSize: 16, fontWeight: 700,
              color: '#00FFCC', margin: 0, letterSpacing: 3
            }}>
              AI THREAT PREDICTION ENGINE
            </h1>
            <span style={{ fontSize: 10, color: '#64748B', letterSpacing: 2 }}>
              NEURAL DEFENSE NETWORK — INDRA-7 OPERATIONAL
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 8, height: 8, borderRadius: '50%', background: '#34D399' }}
            />
            <span style={{ fontSize: 11, color: '#34D399' }}>MODEL ACTIVE</span>
          </div>
          <div style={{
            padding: '4px 12px', borderRadius: 4,
            background: `${severityColor(stats.critical > 1 ? 'CRITICAL' : 'HIGH')}20`,
            border: `1px solid ${severityColor(stats.critical > 1 ? 'CRITICAL' : 'HIGH')}40`
          }}>
            <span style={{ fontSize: 11, color: severityColor(stats.critical > 1 ? 'CRITICAL' : 'HIGH'), fontWeight: 600 }}>
              CONFIDENCE: {stats.avgConfidence}%
            </span>
          </div>
          <span style={{ fontSize: 11, color: '#64748B' }}>
            {currentTime.toLocaleTimeString('en-GB')} UTC
          </span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 6, padding: 6, cursor: 'pointer', display: 'flex'
            }}
          >
            <X size={18} color="#94A3B8" />
          </motion.button>
        </div>
      </div>

      <div style={{
        display: 'flex', gap: 4, padding: '0 24px', borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(0,0,0,0.2)'
      }}>
        {[
          { id: 'predictions', label: 'PREDICTIONS', icon: Crosshair },
          { id: 'patterns', label: 'PATTERN DETECTION', icon: Radar },
          { id: 'economic', label: 'ECONOMIC WARFARE', icon: DollarSign },
          { id: 'media', label: 'MEDIA & PROPAGANDA', icon: Megaphone }
        ].map(tab => (
          <motion.button
            key={tab.id}
            whileHover={{ background: 'rgba(0,255,204,0.08)' }}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 8,
              background: activeTab === tab.id ? 'rgba(0,255,204,0.1)' : 'transparent',
              border: 'none', borderBottom: activeTab === tab.id ? '2px solid #00FFCC' : '2px solid transparent',
              cursor: 'pointer', fontFamily: "'Orbitron', monospace", fontSize: 10,
              color: activeTab === tab.id ? '#00FFCC' : '#64748B', letterSpacing: 1, transition: 'all 0.2s'
            }}
          >
            <tab.icon size={14} />
            {tab.label}
          </motion.button>
        ))}
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12,
        padding: '12px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        {[
          { label: 'Active Predictions', value: stats.active, icon: Crosshair, color: '#00FFCC' },
          { label: 'Avg Confidence', value: `${stats.avgConfidence}%`, icon: BarChart3, color: '#60A5FA' },
          { label: 'Critical Threats', value: stats.critical, icon: AlertTriangle, color: '#DC2626' },
          { label: 'Patterns Detected', value: stats.patterns, icon: Radar, color: '#A78BFA' },
          { label: 'AI Accuracy', value: `${stats.accuracy}%`, icon: Brain, color: '#34D399' },
          { label: 'Data Sources', value: stats.sources, icon: Satellite, color: '#FBBF24' }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            style={{
              background: 'rgba(255,255,255,0.02)', borderRadius: 6, padding: '10px 14px',
              border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 12
            }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: `${stat.color}10`, border: `1px solid ${stat.color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <stat.icon size={18} color={stat.color} />
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: stat.color, fontFamily: "'Orbitron', monospace" }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 9, color: '#64748B', letterSpacing: 1 }}>{stat.label.toUpperCase()}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', padding: '0 24px 16px' }}>
        <div style={{ flex: 1, overflow: 'auto', paddingRight: 16, paddingTop: 12 }}>
          <AnimatePresence mode="wait">
            {activeTab === 'predictions' && (
              <motion.div
                key="predictions"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                  {predictions.map((pred, idx) => {
                    const CatIcon = categoryIcon(pred.category);
                    const isExpanded = selectedPrediction === pred.id;
                    return (
                      <motion.div
                        key={pred.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => setSelectedPrediction(isExpanded ? null : pred.id)}
                        style={{
                          background: 'rgba(255,255,255,0.02)', borderRadius: 8, padding: 16,
                          border: `1px solid ${isExpanded ? severityColor(pred.severity) + '60' : 'rgba(255,255,255,0.06)'}`,
                          cursor: 'pointer', position: 'relative', overflow: 'hidden',
                          transition: 'border-color 0.3s'
                        }}
                      >
                        {scanning && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 3, ease: 'easeInOut' }}
                            style={{
                              position: 'absolute', inset: 0, zIndex: 5,
                              background: 'rgba(0,255,204,0.05)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontFamily: "'Orbitron', monospace", fontSize: 12, color: '#00FFCC',
                              letterSpacing: 4
                            }}
                          >
                            <ScanLine size={16} style={{ marginRight: 8 }} />
                            ANALYZING...
                          </motion.div>
                        )}

                        <div style={{
                          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                          background: severityColor(pred.severity),
                          opacity: 0.6
                        }} />

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{
                              width: 32, height: 32, borderRadius: 6,
                              background: `${severityColor(pred.severity)}15`,
                              border: `1px solid ${severityColor(pred.severity)}30`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                              <CatIcon size={16} color={severityColor(pred.severity)} />
                            </div>
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 700, color: '#E2E8F0', lineHeight: 1.2 }}>{pred.title}</div>
                              <div style={{ fontSize: 10, color: '#64748B' }}>{pred.region} — {pred.country}</div>
                            </div>
                          </div>
                          <div style={{
                            padding: '2px 8px', borderRadius: 3, fontSize: 9, fontWeight: 700,
                            background: `${severityColor(pred.severity)}20`,
                            color: severityColor(pred.severity),
                            border: `1px solid ${severityColor(pred.severity)}40`
                          }}>
                            {pred.severity}
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 10 }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                              <span style={{ fontSize: 10, color: '#94A3B8' }}>CONFIDENCE</span>
                              <span style={{
                                fontSize: 12, fontWeight: 700,
                                fontFamily: "'Orbitron', monospace",
                                color: pred.confidence >= 75 ? '#F87171' : pred.confidence >= 60 ? '#FBBF24' : '#34D399'
                              }}>
                                {pred.confidence}%
                              </span>
                            </div>
                            <GlowBar
                              value={pred.confidence}
                              color={pred.confidence >= 75 ? '#F87171' : pred.confidence >= 60 ? '#FBBF24' : '#34D399'}
                              height={5}
                            />
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 9, color: '#64748B' }}>TIMEFRAME</div>
                            <div style={{ fontSize: 12, color: '#E2E8F0', fontWeight: 600 }}>{pred.timeframe}</div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                          <span style={{
                            fontSize: 9, padding: '2px 8px', borderRadius: 3,
                            background: 'rgba(0,255,204,0.1)', color: '#00FFCC',
                            border: '1px solid rgba(0,255,204,0.2)'
                          }}>
                            {pred.category}
                          </span>
                          <span style={{
                            fontSize: 9, padding: '2px 8px', borderRadius: 3,
                            background: 'rgba(96,165,250,0.1)', color: '#60A5FA',
                            border: '1px solid rgba(96,165,250,0.2)'
                          }}>
                            {pred.id}
                          </span>
                        </div>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              style={{ overflow: 'hidden' }}
                            >
                              <div style={{
                                borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 8, paddingTop: 10
                              }}>
                                <div style={{ fontSize: 10, color: '#00FFCC', fontWeight: 600, marginBottom: 6, letterSpacing: 1 }}>
                                  SUPPORTING EVIDENCE
                                </div>
                                {pred.evidence.map((e, ei) => (
                                  <div key={ei} style={{
                                    display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 4,
                                    fontSize: 10, color: '#94A3B8', lineHeight: 1.5
                                  }}>
                                    <ChevronRight size={10} style={{ marginTop: 3, flexShrink: 0 }} color="#00FFCC" />
                                    {e}
                                  </div>
                                ))}

                                <div style={{
                                  fontSize: 10, color: '#60A5FA', fontWeight: 600,
                                  marginTop: 10, marginBottom: 6, letterSpacing: 1
                                }}>
                                  RECOMMENDED COUNTERMEASURES
                                </div>
                                {pred.countermeasures.map((c, ci) => (
                                  <div key={ci} style={{
                                    display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 4,
                                    fontSize: 10, color: '#94A3B8', lineHeight: 1.5
                                  }}>
                                    <Shield size={10} style={{ marginTop: 3, flexShrink: 0 }} color="#60A5FA" />
                                    {c}
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
                          <span style={{ fontSize: 9, color: '#475569' }}>
                            {isExpanded ? 'CLICK TO COLLAPSE' : 'CLICK FOR DETAILS'}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div style={{ marginTop: 20 }}>
                  <div style={{
                    fontFamily: "'Orbitron', monospace", fontSize: 12, color: '#00FFCC',
                    marginBottom: 12, letterSpacing: 2, display: 'flex', alignItems: 'center', gap: 8
                  }}>
                    <TrendingUp size={16} />
                    TREND ANALYSIS — GLOBAL THREAT INDEX
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                    {TREND_REGIONS.map((tr, i) => {
                      const TIcon = trendIcon(tr.direction);
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.08 }}
                          style={{
                            background: 'rgba(255,255,255,0.02)', borderRadius: 6, padding: 12,
                            border: '1px solid rgba(255,255,255,0.05)'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                            <span style={{ fontSize: 12, fontWeight: 700, color: '#E2E8F0' }}>{tr.region}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                              <TIcon size={14} color={trendColor(tr.direction)} />
                              <span style={{ fontSize: 11, fontWeight: 600, color: trendColor(tr.direction) }}>{tr.change}</span>
                            </div>
                          </div>
                          <GlowBar value={tr.index} color={trendColor(tr.direction)} height={4} />
                          <div style={{ fontSize: 9, color: '#64748B', marginTop: 6 }}>
                            {tr.driver}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'patterns' && (
              <motion.div
                key="patterns"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                style={{ paddingTop: 4 }}
              >
                <div style={{
                  fontFamily: "'Orbitron', monospace", fontSize: 12, color: '#A78BFA',
                  marginBottom: 14, letterSpacing: 2, display: 'flex', alignItems: 'center', gap: 8
                }}>
                  <Radar size={16} />
                  DETECTED INTELLIGENCE PATTERNS
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {DETECTED_PATTERNS.map((pat, i) => (
                    <motion.div
                      key={pat.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      style={{
                        background: 'rgba(255,255,255,0.02)', borderRadius: 8, padding: 16,
                        border: '1px solid rgba(167,139,250,0.15)',
                        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                          <CircleDot size={14} color="#A78BFA" />
                          <span style={{ fontSize: 13, fontWeight: 700, color: '#E2E8F0' }}>{pat.name}</span>
                        </div>
                        <div style={{ fontSize: 11, color: '#94A3B8', lineHeight: 1.5, marginBottom: 8 }}>{pat.description}</div>
                        <div style={{ display: 'flex', gap: 12 }}>
                          <span style={{ fontSize: 10, color: '#64748B' }}>SOURCE: <span style={{ color: '#60A5FA' }}>{pat.source}</span></span>
                          <span style={{ fontSize: 10, color: '#64748B' }}>LINKED: <span style={{ color: '#00FFCC' }}>{pat.relatedPrediction}</span></span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end' }}>
                        <div style={{ fontSize: 10, color: '#64748B', marginBottom: 4 }}>CORRELATION STRENGTH</div>
                        <div style={{
                          fontSize: 24, fontWeight: 700, fontFamily: "'Orbitron', monospace",
                          color: pat.correlation >= 85 ? '#F87171' : pat.correlation >= 70 ? '#FBBF24' : '#34D399'
                        }}>
                          {pat.correlation}%
                        </div>
                        <div style={{ width: 120, marginTop: 4 }}>
                          <GlowBar
                            value={pat.correlation}
                            color={pat.correlation >= 85 ? '#F87171' : pat.correlation >= 70 ? '#FBBF24' : '#34D399'}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'economic' && (
              <motion.div
                key="economic"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                style={{ paddingTop: 4 }}
              >
                <div style={{
                  fontFamily: "'Orbitron', monospace", fontSize: 12, color: '#FBBF24',
                  marginBottom: 14, letterSpacing: 2, display: 'flex', alignItems: 'center', gap: 8
                }}>
                  <DollarSign size={16} />
                  ECONOMIC WARFARE ANALYSIS
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                  <div style={{
                    background: 'rgba(255,255,255,0.02)', borderRadius: 8, padding: 14,
                    border: '1px solid rgba(251,191,36,0.15)'
                  }}>
                    <div style={{ fontSize: 11, color: '#FBBF24', fontWeight: 600, marginBottom: 10, letterSpacing: 1, fontFamily: "'Orbitron', monospace" }}>
                      SANCTIONS IMPACT TRACKER
                    </div>
                    {ECONOMIC_DATA.sanctions.map((s, i) => (
                      <div key={i} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '8px 0', borderBottom: i < ECONOMIC_DATA.sanctions.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none'
                      }}>
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 600, color: '#E2E8F0' }}>{s.country}</div>
                          <div style={{ fontSize: 9, color: '#64748B' }}>Sectors: {s.sectors}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{
                            fontSize: 10, fontWeight: 600,
                            color: s.effectiveness >= 70 ? '#34D399' : s.effectiveness >= 50 ? '#FBBF24' : '#F87171'
                          }}>
                            {s.effectiveness}% effective
                          </div>
                          <div style={{ width: 80, marginTop: 2 }}>
                            <GlowBar
                              value={s.effectiveness}
                              color={s.effectiveness >= 70 ? '#34D399' : s.effectiveness >= 50 ? '#FBBF24' : '#F87171'}
                              height={3}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{
                    background: 'rgba(255,255,255,0.02)', borderRadius: 8, padding: 14,
                    border: '1px solid rgba(248,113,113,0.15)'
                  }}>
                    <div style={{ fontSize: 11, color: '#F87171', fontWeight: 600, marginBottom: 10, letterSpacing: 1, fontFamily: "'Orbitron', monospace" }}>
                      CURRENCY MANIPULATION DETECTION
                    </div>
                    {ECONOMIC_DATA.currencyManipulation.map((c, i) => (
                      <div key={i} style={{
                        padding: '8px 0',
                        borderBottom: i < ECONOMIC_DATA.currencyManipulation.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                          <span style={{ fontSize: 12, fontWeight: 600, color: '#E2E8F0' }}>{c.country}</span>
                          <span style={{
                            fontSize: 9, padding: '2px 6px', borderRadius: 3, fontWeight: 600,
                            background: `${severityColor(c.risk)}20`, color: severityColor(c.risk)
                          }}>
                            {c.risk}
                          </span>
                        </div>
                        <div style={{ fontSize: 10, color: '#94A3B8' }}>{c.activity}</div>
                        <div style={{ fontSize: 10, color: '#F87171', marginTop: 2 }}>Forex: {c.forex}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div style={{
                    background: 'rgba(255,255,255,0.02)', borderRadius: 8, padding: 14,
                    border: '1px solid rgba(96,165,250,0.15)'
                  }}>
                    <div style={{ fontSize: 11, color: '#60A5FA', fontWeight: 600, marginBottom: 10, letterSpacing: 1, fontFamily: "'Orbitron', monospace" }}>
                      TRADE ROUTE DISRUPTION
                    </div>
                    {ECONOMIC_DATA.tradeDisruptions.map((t, i) => (
                      <div key={i} style={{
                        padding: '8px 0',
                        borderBottom: i < ECONOMIC_DATA.tradeDisruptions.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                          <span style={{ fontSize: 12, fontWeight: 600, color: '#E2E8F0' }}>{t.route}</span>
                          <span style={{
                            fontSize: 9, padding: '2px 6px', borderRadius: 3, fontWeight: 600,
                            background: t.status === 'HIGH' ? 'rgba(248,113,113,0.2)' : t.status === 'ELEVATED' ? 'rgba(251,191,36,0.2)' : 'rgba(96,165,250,0.2)',
                            color: t.status === 'HIGH' ? '#F87171' : t.status === 'ELEVATED' ? '#FBBF24' : '#60A5FA'
                          }}>
                            {t.status}
                          </span>
                        </div>
                        <div style={{ fontSize: 10, color: '#94A3B8' }}>{t.impact}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{
                    background: 'rgba(255,255,255,0.02)', borderRadius: 8, padding: 14,
                    border: '1px solid rgba(251,191,36,0.15)'
                  }}>
                    <div style={{ fontSize: 11, color: '#FBBF24', fontWeight: 600, marginBottom: 10, letterSpacing: 1, fontFamily: "'Orbitron', monospace" }}>
                      ENERGY SUPPLY THREATS
                    </div>
                    {ECONOMIC_DATA.energyThreats.map((e, i) => (
                      <div key={i} style={{
                        padding: '8px 0',
                        borderBottom: i < ECONOMIC_DATA.energyThreats.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                          <span style={{ fontSize: 12, fontWeight: 600, color: '#E2E8F0' }}>{e.source}</span>
                          <span style={{
                            fontSize: 9, padding: '2px 6px', borderRadius: 3, fontWeight: 600,
                            background: `${severityColor(e.severity)}20`, color: severityColor(e.severity)
                          }}>
                            {e.severity}
                          </span>
                        </div>
                        <div style={{ fontSize: 10, color: '#94A3B8' }}>{e.threat}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'media' && (
              <motion.div
                key="media"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                style={{ paddingTop: 4 }}
              >
                <div style={{
                  fontFamily: "'Orbitron', monospace", fontSize: 12, color: '#A78BFA',
                  marginBottom: 14, letterSpacing: 2, display: 'flex', alignItems: 'center', gap: 8
                }}>
                  <Megaphone size={16} />
                  MEDIA & PROPAGANDA ANALYSIS
                </div>

                <div style={{
                  background: 'rgba(255,255,255,0.02)', borderRadius: 8, padding: 14,
                  border: '1px solid rgba(167,139,250,0.15)', marginBottom: 12
                }}>
                  <div style={{ fontSize: 11, color: '#A78BFA', fontWeight: 600, marginBottom: 10, letterSpacing: 1, fontFamily: "'Orbitron', monospace" }}>
                    FOREIGN STATE MEDIA NARRATIVE TRACKING
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                    {MEDIA_PROPAGANDA.stateMedia.map((m, i) => {
                      const MTIcon = trendIcon(m.trend);
                      return (
                        <div key={i} style={{
                          background: 'rgba(0,0,0,0.2)', borderRadius: 6, padding: 12,
                          border: '1px solid rgba(255,255,255,0.04)'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                            <span style={{ fontSize: 13, fontWeight: 700, color: '#E2E8F0' }}>{m.country}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                              <MTIcon size={12} color={trendColor(m.trend)} />
                              <span style={{
                                fontSize: 9, padding: '2px 6px', borderRadius: 3, fontWeight: 600,
                                background: `${severityColor(m.intensity)}20`, color: severityColor(m.intensity)
                              }}>
                                {m.intensity}
                              </span>
                            </div>
                          </div>
                          <div style={{ fontSize: 9, color: '#64748B', marginBottom: 4 }}>{m.outlet}</div>
                          <div style={{ fontSize: 10, color: '#94A3B8', lineHeight: 1.5 }}>{m.narrative}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                  <div style={{
                    background: 'rgba(255,255,255,0.02)', borderRadius: 8, padding: 14,
                    border: '1px solid rgba(220,38,38,0.15)'
                  }}>
                    <div style={{ fontSize: 11, color: '#DC2626', fontWeight: 600, marginBottom: 10, letterSpacing: 1, fontFamily: "'Orbitron', monospace" }}>
                      DISINFORMATION CAMPAIGNS
                    </div>
                    {MEDIA_PROPAGANDA.disinfo.map((d, i) => (
                      <div key={i} style={{
                        padding: '8px 0',
                        borderBottom: i < MEDIA_PROPAGANDA.disinfo.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                          <span style={{ fontSize: 12, fontWeight: 600, color: '#E2E8F0' }}>{d.campaign}</span>
                          <span style={{
                            fontSize: 9, padding: '2px 6px', borderRadius: 3, fontWeight: 600,
                            background: d.status === 'ACTIVE' ? 'rgba(220,38,38,0.2)' : 'rgba(251,191,36,0.2)',
                            color: d.status === 'ACTIVE' ? '#DC2626' : '#FBBF24'
                          }}>
                            {d.status}
                          </span>
                        </div>
                        <div style={{ fontSize: 10, color: '#64748B' }}>
                          Origin: <span style={{ color: '#F87171' }}>{d.origin}</span> — Platform: <span style={{ color: '#60A5FA' }}>{d.platform}</span>
                        </div>
                        <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 2 }}>Target: {d.targets}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{
                    background: 'rgba(255,255,255,0.02)', borderRadius: 8, padding: 14,
                    border: '1px solid rgba(96,165,250,0.15)'
                  }}>
                    <div style={{ fontSize: 11, color: '#60A5FA', fontWeight: 600, marginBottom: 10, letterSpacing: 1, fontFamily: "'Orbitron', monospace" }}>
                      INFLUENCE OPERATIONS
                    </div>
                    {MEDIA_PROPAGANDA.influenceOps.map((op, i) => (
                      <div key={i} style={{
                        padding: '8px 0',
                        borderBottom: i < MEDIA_PROPAGANDA.influenceOps.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                          <span style={{ fontSize: 12, fontWeight: 600, color: '#E2E8F0' }}>{op.operation}</span>
                          <span style={{
                            fontSize: 9, padding: '2px 6px', borderRadius: 3, fontWeight: 600,
                            background: `${severityColor(op.risk)}20`, color: severityColor(op.risk)
                          }}>
                            {op.risk}
                          </span>
                        </div>
                        <div style={{ fontSize: 10, color: '#64748B' }}>
                          Actor: <span style={{ color: '#F87171' }}>{op.actor}</span>
                        </div>
                        <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 2 }}>Reach: {op.reach}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{
                  background: 'rgba(255,255,255,0.02)', borderRadius: 8, padding: 14,
                  border: '1px solid rgba(0,255,204,0.15)'
                }}>
                  <div style={{ fontSize: 11, color: '#00FFCC', fontWeight: 600, marginBottom: 10, letterSpacing: 1, fontFamily: "'Orbitron', monospace" }}>
                    SENTIMENT ANALYSIS — BY COUNTRY
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                    {MEDIA_PROPAGANDA.sentiment.map((s, i) => (
                      <div key={i} style={{
                        background: 'rgba(0,0,0,0.2)', borderRadius: 6, padding: 10,
                        border: `1px solid ${s.color}20`, textAlign: 'center'
                      }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: '#E2E8F0', marginBottom: 4 }}>{s.country}</div>
                        <div style={{
                          fontSize: 20, fontWeight: 700, fontFamily: "'Orbitron', monospace",
                          color: s.color, marginBottom: 2
                        }}>
                          {s.score > 0 ? '+' : ''}{s.score}
                        </div>
                        <div style={{
                          fontSize: 9, fontWeight: 600, color: s.color,
                          padding: '2px 6px', borderRadius: 3,
                          background: `${s.color}15`
                        }}>
                          {s.level.toUpperCase()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div style={{
          width: 300, flexShrink: 0, paddingLeft: 16, paddingTop: 12,
          borderLeft: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', flexDirection: 'column', gap: 12, overflow: 'auto'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.02)', borderRadius: 8, padding: 14,
            border: '1px solid rgba(0,255,204,0.15)'
          }}>
            <div style={{
              fontFamily: "'Orbitron', monospace", fontSize: 11, color: '#00FFCC',
              marginBottom: 12, letterSpacing: 2, display: 'flex', alignItems: 'center', gap: 6
            }}>
              <Cpu size={14} />
              AI MODEL STATUS
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'MODEL', value: 'INDRA-7 Neural Threat Analyzer' },
                { label: 'TRAINING DATA', value: '14.2M intelligence reports, 47 years' },
                { label: 'ACCURACY', value: '94.7% (validated)' },
                { label: 'LAST TRAINED', value: '2026-02-18 03:42 UTC' },
                { label: 'PROCESSING', value: 'Real-time neural inference' },
                { label: 'UPTIME', value: formatUptime(modelUptime) }
              ].map((item, i) => (
                <div key={i}>
                  <div style={{ fontSize: 9, color: '#64748B', letterSpacing: 1, marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: '#E2E8F0', fontWeight: 500 }}>{item.value}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 12, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 10 }}>
              <div style={{ fontSize: 9, color: '#64748B', letterSpacing: 1, marginBottom: 8 }}>DATA SOURCES</div>
              {DATA_SOURCES.map((ds, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ fontSize: 10, color: ds.color, fontWeight: 600 }}>{ds.name}</span>
                    <span style={{ fontSize: 10, color: '#94A3B8' }}>{ds.percentage}%</span>
                  </div>
                  <GlowBar value={ds.percentage} max={35} color={ds.color} height={4} />
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(0,255,204,0.3)' }}
              whileTap={{ scale: 0.98 }}
              onClick={runAnalysis}
              disabled={scanning}
              style={{
                width: '100%', marginTop: 12, padding: '10px 16px',
                background: scanning ? 'rgba(0,255,204,0.05)' : 'linear-gradient(135deg, rgba(0,255,204,0.15), rgba(0,255,204,0.05))',
                border: '1px solid rgba(0,255,204,0.3)', borderRadius: 6,
                fontFamily: "'Orbitron', monospace", fontSize: 11,
                color: '#00FFCC', letterSpacing: 2, cursor: scanning ? 'wait' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
              }}
            >
              {scanning ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                    <RefreshCw size={14} />
                  </motion.div>
                  SCANNING...
                </>
              ) : (
                <>
                  <ScanLine size={14} />
                  RUN NEW ANALYSIS
                </>
              )}
            </motion.button>

            {scanning && scanPhase && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  marginTop: 8, padding: '6px 10px', borderRadius: 4,
                  background: 'rgba(0,255,204,0.05)', border: '1px solid rgba(0,255,204,0.1)',
                  fontSize: 9, color: '#00FFCC', textAlign: 'center', letterSpacing: 1
                }}
              >
                {scanPhase}
              </motion.div>
            )}
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.02)', borderRadius: 8, padding: 14,
            border: '1px solid rgba(255,255,255,0.06)'
          }}>
            <div style={{
              fontFamily: "'Orbitron', monospace", fontSize: 11, color: '#60A5FA',
              marginBottom: 10, letterSpacing: 2, display: 'flex', alignItems: 'center', gap: 6
            }}>
              <Activity size={14} />
              THREAT DISTRIBUTION
            </div>
            {CATEGORIES.map((cat, i) => {
              const count = predictions.filter(p => p.category === cat).length;
              const CIcon = categoryIcon(cat);
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <CIcon size={12} color="#64748B" />
                  <span style={{ fontSize: 10, color: '#94A3B8', width: 70 }}>{cat}</span>
                  <div style={{ flex: 1 }}>
                    <GlowBar value={count} max={3} color="#60A5FA" height={4} />
                  </div>
                  <span style={{ fontSize: 11, color: '#60A5FA', fontWeight: 600, width: 16, textAlign: 'right' }}>{count}</span>
                </div>
              );
            })}
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.02)', borderRadius: 8, padding: 14,
            border: '1px solid rgba(255,255,255,0.06)'
          }}>
            <div style={{
              fontFamily: "'Orbitron', monospace", fontSize: 11, color: '#F87171',
              marginBottom: 10, letterSpacing: 2, display: 'flex', alignItems: 'center', gap: 6
            }}>
              <ShieldAlert size={14} />
              SEVERITY BREAKDOWN
            </div>
            {SEVERITIES.map((sev, i) => {
              const count = predictions.filter(p => p.severity === sev).length;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: severityColor(sev),
                    boxShadow: `0 0 6px ${severityColor(sev)}60`
                  }} />
                  <span style={{ fontSize: 10, color: severityColor(sev), width: 70 }}>{sev}</span>
                  <div style={{ flex: 1 }}>
                    <GlowBar value={count} max={4} color={severityColor(sev)} height={4} />
                  </div>
                  <span style={{ fontSize: 11, color: severityColor(sev), fontWeight: 600, width: 16, textAlign: 'right' }}>{count}</span>
                </div>
              );
            })}
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.02)', borderRadius: 8, padding: 14,
            border: '1px solid rgba(255,255,255,0.06)'
          }}>
            <div style={{
              fontFamily: "'Orbitron', monospace", fontSize: 11, color: '#FBBF24',
              marginBottom: 10, letterSpacing: 2, display: 'flex', alignItems: 'center', gap: 6
            }}>
              <Clock size={14} />
              PREDICTION TIMELINE
            </div>
            {predictions
              .sort((a, b) => parseInt(a.timeframe) - parseInt(b.timeframe))
              .map((pred, i) => (
                <div key={pred.id} style={{
                  display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6,
                  padding: '4px 0',
                  borderBottom: i < predictions.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none'
                }}>
                  <div style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: severityColor(pred.severity),
                    flexShrink: 0
                  }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 10, color: '#E2E8F0', fontWeight: 500,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                    }}>
                      {pred.title}
                    </div>
                  </div>
                  <span style={{
                    fontSize: 9, color: '#FBBF24', fontWeight: 600, flexShrink: 0,
                    fontFamily: "'Orbitron', monospace"
                  }}>
                    {pred.timeframe}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ThreatPrediction;
