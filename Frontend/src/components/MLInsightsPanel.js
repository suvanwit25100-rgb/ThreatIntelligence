import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Brain, ChevronRight, X, Cpu, Activity, Shield,
    AlertTriangle, Zap, Target, TrendingUp, BarChart3,
    Search, Play, RefreshCw, CheckCircle, AlertCircle,
    Users, Crosshair, Layers, DollarSign, Flame,
    ShieldAlert
} from 'lucide-react';

const API = 'http://localhost:8000/api/ml';

// ─── Palette ────────────────────────────────────
const C = {
    teal: '#00FFCC',
    blue: '#60A5FA',
    purple: '#A78BFA',
    red: '#F87171',
    orange: '#FB923C',
    yellow: '#FBBF24',
    green: '#34D399',
    dark: 'rgba(0,20,40,0.85)',
    card: 'rgba(255,255,255,0.03)',
    border: 'rgba(0,255,204,0.15)',
};

const TABS = [
    { id: 'threat', label: 'THREAT PREDICTOR', icon: Target, color: C.red },
    { id: 'anomaly', label: 'ANOMALY DETECTOR', icon: Activity, color: C.orange },
    { id: 'nlp', label: 'NLP CLASSIFIER', icon: Search, color: C.blue },
    { id: 'agent', label: 'AGENT SCORER', icon: Users, color: C.purple },
];

const CATEGORY_ICONS = {
    Military: Target, Cyber: Cpu, Terrorism: Flame,
    Economic: DollarSign, Political: ShieldAlert, Nuclear: Zap,
};
const CATEGORY_COLORS = {
    Military: '#F87171', Cyber: '#60A5FA', Terrorism: '#FB923C',
    Economic: '#FBBF24', Political: '#A78BFA', Nuclear: '#34D399',
};

// ─── Sub-components ──────────────────────────────────────────

const GlowBar = ({ value, max = 100, color = C.teal, height = 6 }) => (
    <div style={{ width: '100%', height, background: 'rgba(255,255,255,0.06)', borderRadius: height / 2, overflow: 'hidden' }}>
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, (value / max) * 100)}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ height: '100%', background: color, borderRadius: height / 2, boxShadow: `0 0 10px ${color}60` }}
        />
    </div>
);

const ScoreGauge = ({ score, color, label }) => {
    const angle = (score / 100) * 180 - 90; // -90 to +90 degrees
    return (
        <div style={{ textAlign: 'center' }}>
            <svg width="160" height="90" viewBox="0 0 160 90">
                {/* Track arc */}
                <path d="M 10 85 A 70 70 0 0 1 150 85" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" strokeLinecap="round" />
                {/* Value arc — approximated with dasharray */}
                <path d="M 10 85 A 70 70 0 0 1 150 85" fill="none" stroke={color}
                    strokeWidth="12" strokeLinecap="round"
                    strokeDasharray={`${(score / 100) * 220} 220`}
                    style={{ filter: `drop-shadow(0 0 8px ${color})` }}
                />
                {/* Needle */}
                <motion.line
                    x1="80" y1="85" x2="80" y2="25"
                    stroke={color} strokeWidth="2.5" strokeLinecap="round"
                    animate={{ rotate: angle }}
                    style={{ transformOrigin: '80px 85px' }}
                    transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                />
                <circle cx="80" cy="85" r="5" fill={color} style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
                {/* Score text */}
                <text x="80" y="68" textAnchor="middle" fill={color}
                    style={{ fontSize: 18, fontFamily: "'Orbitron', monospace", fontWeight: 700 }}>
                    {Math.round(score)}
                </text>
            </svg>
            <div style={{ fontSize: 10, color: C.teal, letterSpacing: 2, marginTop: -4 }}>{label}</div>
        </div>
    );
};

const StatusBadge = ({ label, color }) => (
    <span style={{
        padding: '3px 10px', borderRadius: 4, fontSize: 10, fontWeight: 700,
        background: `${color}20`, color, border: `1px solid ${color}40`,
        fontFamily: "'Orbitron', monospace", letterSpacing: 1
    }}>{label}</span>
);

const Slider = ({ label, min, max, value, onChange, step = 1, unit = '' }) => (
    <div style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 10, color: '#94A3B8', letterSpacing: 1 }}>{label}</span>
            <span style={{ fontSize: 11, color: C.teal, fontFamily: "'Orbitron', monospace", fontWeight: 700 }}>
                {value}{unit}
            </span>
        </div>
        <input type="range" min={min} max={max} step={step} value={value}
            onChange={e => onChange(Number(e.target.value))}
            style={{ width: '100%', accentColor: C.teal, cursor: 'pointer' }}
        />
    </div>
);

const RunButton = ({ onClick, loading, label = 'RUN ANALYSIS', color = C.teal }) => (
    <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onClick}
        disabled={loading}
        style={{
            width: '100%', padding: '11px', borderRadius: 8, cursor: loading ? 'not-allowed' : 'pointer',
            background: loading ? 'rgba(255,255,255,0.04)' : `${color}18`,
            border: `1px solid ${loading ? 'rgba(255,255,255,0.1)' : color + '60'}`,
            color: loading ? '#64748B' : color,
            fontFamily: "'Orbitron', monospace", fontSize: 11, fontWeight: 700, letterSpacing: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            transition: 'all 0.2s', marginTop: 16,
        }}
    >
        {loading
            ? <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}><RefreshCw size={14} /></motion.div> PROCESSING...</>
            : <><Play size={14} /> {label}</>
        }
    </motion.button>
);

const SectionHeader = ({ icon: Icon, title, color, subtitle }) => (
    <div style={{ marginBottom: 20, paddingBottom: 14, borderBottom: `1px solid ${color}20` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: `${color}15`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={18} color={color} />
            </div>
            <div>
                <h3 style={{ margin: 0, fontFamily: "'Orbitron', monospace", fontSize: 13, color, letterSpacing: 2 }}>{title}</h3>
                {subtitle && <p style={{ margin: 0, fontSize: 10, color: '#64748B', marginTop: 2 }}>{subtitle}</p>}
            </div>
        </div>
    </div>
);

// ─── 1. THREAT SCORE PREDICTOR ───────────────────────────────
const ThreatPredictor = () => {
    const [features, setFeatures] = useState({
        military_budget: 150, military_personnel: 1.4, gdp: 3500,
        nuclear: 1, cyber_index: 70, air_power: 600, naval_power: 140,
        active_conflicts: 2, sanctions: 0, landmass: 3, population: 1400,
        exports: 500, debt_to_gdp: 85, internal_instability: 45, num_allies: 12,
    });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const set = (k) => (v) => setFeatures(f => ({ ...f, [k]: v }));

    const run = useCallback(async () => {
        setLoading(true); setError('');
        try {
            const qs = new URLSearchParams(Object.fromEntries(Object.entries(features).map(([k, v]) => [k, String(v)]))).toString();
            const res = await fetch(`${API}/threat-predict/?${qs}`);
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setResult(data);
        } catch (e) { setError(e.message); }
        finally { setLoading(false); }
    }, [features]);

    const scoreColor = result
        ? result.score >= 70 ? C.red : result.score >= 45 ? C.yellow : C.green
        : C.teal;

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 20 }}>
            {/* Controls */}
            <div style={{ background: C.card, borderRadius: 10, padding: 18, border: `1px solid ${C.border}` }}>
                <SectionHeader icon={Target} title="THREAT PREDICTOR" color={C.red}
                    subtitle="Random Forest Regressor — 15 geopolitical features" />

                <Slider label="MILITARY BUDGET ($B)" min={1} max={800} value={features.military_budget} onChange={set('military_budget')} />
                <Slider label="GDP ($B)" min={50} max={25000} value={features.gdp} step={50} onChange={set('gdp')} />
                <Slider label="CYBER INDEX (0–100)" min={0} max={100} value={features.cyber_index} onChange={set('cyber_index')} />
                <Slider label="ACTIVE CONFLICTS" min={0} max={8} value={features.active_conflicts} onChange={set('active_conflicts')} />
                <Slider label="INTERNAL INSTABILITY (0–100)" min={0} max={100} value={features.internal_instability} onChange={set('internal_instability')} />
                <Slider label="ALLIES" min={0} max={30} value={features.num_allies} onChange={set('num_allies')} />

                <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                        <input type="checkbox" checked={!!features.nuclear} onChange={e => set('nuclear')(e.target.checked ? 1 : 0)}
                            style={{ accentColor: C.teal }} />
                        <span style={{ fontSize: 10, color: '#94A3B8', letterSpacing: 1 }}>NUCLEAR CAPABLE</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                        <input type="checkbox" checked={!!features.sanctions} onChange={e => set('sanctions')(e.target.checked ? 1 : 0)}
                            style={{ accentColor: C.teal }} />
                        <span style={{ fontSize: 10, color: '#94A3B8', letterSpacing: 1 }}>UNDER SANCTIONS</span>
                    </label>
                </div>

                <RunButton onClick={run} loading={loading} color={C.red} label="PREDICT THREAT SCORE" />
                {error && <div style={{ marginTop: 10, fontSize: 10, color: C.red }}>{error}</div>}
            </div>

            {/* Results */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ background: C.card, borderRadius: 10, padding: 18, border: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {result ? (
                        <AnimatePresence mode="wait">
                            <motion.div key={result.score} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                                <ScoreGauge score={result.score} color={scoreColor} label="THREAT SCORE" />
                                <div style={{ display: 'flex', gap: 12 }}>
                                    <StatusBadge label={`SCORE: ${result.score}`} color={scoreColor} />
                                    <StatusBadge label={`CONFIDENCE: ${result.confidence}%`} color={C.blue} />
                                    <StatusBadge label={`±${result.uncertainty}`} color={C.yellow} />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '30px 0', color: '#64748B' }}>
                            <Brain size={36} style={{ marginBottom: 10, opacity: 0.3 }} />
                            <div style={{ fontSize: 11, letterSpacing: 2 }}>AWAITING INPUT</div>
                        </div>
                    )}
                </div>

                {result?.feature_importances && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        style={{ background: C.card, borderRadius: 10, padding: 18, border: `1px solid ${C.border}` }}>
                        <div style={{ fontSize: 10, color: C.red, letterSpacing: 2, marginBottom: 14, fontFamily: "'Orbitron', monospace" }}>
                            FEATURE IMPORTANCES
                        </div>
                        {result.feature_importances.map((fi, i) => (
                            <div key={fi.feature} style={{ marginBottom: 10 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                    <span style={{ fontSize: 10, color: '#94A3B8' }}>{fi.feature.replace(/_/g, ' ').toUpperCase()}</span>
                                    <span style={{ fontSize: 10, color: C.teal, fontWeight: 700 }}>{(fi.importance * 100).toFixed(1)}%</span>
                                </div>
                                <GlowBar value={fi.importance * 100} color={i === 0 ? C.red : i === 1 ? C.orange : C.teal} height={5} />
                            </div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

// ─── 2. ANOMALY DETECTOR ─────────────────────────────────────
const SEVERITIES = ['LOW', 'LOW', 'MEDIUM', 'MEDIUM', 'HIGH', 'CRITICAL'];
const CATEGORIES = ['MILITARY', 'CYBER', 'TERRORISM', 'ECONOMIC', 'DIPLOMATIC', 'NUCLEAR', 'GENERAL'];

function generateAlertStream(n = 40) {
    const alerts = [];
    for (let i = 0; i < n; i++) {
        const isSpike = i >= 15 && i <= 19; // inject 5-alert anomaly burst
        alerts.push({
            severity: isSpike ? 'CRITICAL' : SEVERITIES[Math.floor(Math.random() * SEVERITIES.length)],
            category: isSpike ? 'CYBER' : CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
        });
    }
    return alerts;
}

const AnomalyDetect = () => {
    const [alertCount, setAlertCount] = useState(40);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const run = useCallback(async () => {
        setLoading(true); setError('');
        try {
            const alerts = generateAlertStream(alertCount);
            const res = await fetch(`${API}/anomaly-detect/`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ alerts }),
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setResult(data);
        } catch (e) { setError(e.message); }
        finally { setLoading(false); }
    }, [alertCount]);

    const riskColor = result?.overall_risk === 'HIGH' ? C.red : result?.overall_risk === 'MEDIUM' ? C.yellow : C.green;

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20 }}>
            <div style={{ background: C.card, borderRadius: 10, padding: 18, border: `1px solid ${C.border}` }}>
                <SectionHeader icon={Activity} title="ANOMALY DETECTOR" color={C.orange}
                    subtitle="Isolation Forest — alert stream analysis" />
                <Slider label="ALERT STREAM SIZE" min={10} max={100} value={alertCount} onChange={setAlertCount} step={5} unit=" alerts" />
                <div style={{ fontSize: 10, color: '#64748B', lineHeight: 1.6, marginBottom: 12 }}>
                    Generates a synthetic 60-day alert log with an injected burst anomaly (alerts 15–19)
                    to simulate a real cyber-attack surge. Isolation Forest flags statistically unusual windows.
                </div>
                <RunButton onClick={run} loading={loading} color={C.orange} label="SCAN ALERT STREAM" />
                {error && <div style={{ marginTop: 10, fontSize: 10, color: C.red }}>{error}</div>}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {result ? (
                    <AnimatePresence mode="wait">
                        <motion.div key={JSON.stringify(result)} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            {/* Summary row */}
                            <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
                                {[
                                    { label: 'WINDOWS SCANNED', value: result.total_windows, color: C.teal },
                                    { label: 'ANOMALIES FOUND', value: result.anomaly_count, color: result.anomaly_count > 0 ? C.red : C.green },
                                    { label: 'RISK LEVEL', value: result.overall_risk, color: riskColor },
                                ].map(s => (
                                    <div key={s.label} style={{ flex: 1, background: C.card, borderRadius: 8, padding: '12px 14px', border: `1px solid ${s.color}30` }}>
                                        <div style={{ fontSize: 18, fontWeight: 700, color: s.color, fontFamily: "'Orbitron', monospace" }}>{s.value}</div>
                                        <div style={{ fontSize: 9, color: '#64748B', letterSpacing: 1 }}>{s.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Window timeline */}
                            <div style={{ background: C.card, borderRadius: 10, padding: 18, border: `1px solid ${C.border}` }}>
                                <div style={{ fontSize: 10, color: C.orange, letterSpacing: 2, marginBottom: 14, fontFamily: "'Orbitron', monospace" }}>
                                    ANOMALY SCORE TIMELINE — ALERT WINDOWS
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 100 }}>
                                    {result.anomalies.map((w, i) => {
                                        const h = Math.max(6, w.anomaly_score * 55);
                                        const col = w.is_anomaly ? C.red : C.teal;
                                        return (
                                            <motion.div key={i} title={`Window ${w.window_idx}: score=${w.anomaly_score.toFixed(2)} ${w.is_anomaly ? '⚠ ANOMALY' : ''}`}
                                                initial={{ height: 0 }} animate={{ height: h }}
                                                transition={{ duration: 0.5, delay: i * 0.04 }}
                                                style={{
                                                    flex: 1, background: col, borderRadius: '3px 3px 0 0', minWidth: 6, cursor: 'pointer',
                                                    boxShadow: w.is_anomaly ? `0 0 12px ${C.red}80` : 'none',
                                                    border: w.is_anomaly ? `1px solid ${C.red}` : 'none'
                                                }}
                                            />
                                        );
                                    })}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#475569', marginTop: 6 }}>
                                    <span>WINDOW 0</span><span>→ TIME →</span><span>WINDOW {result.total_windows - 1}</span>
                                </div>
                                <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <div style={{ width: 12, height: 8, background: C.teal, borderRadius: 2 }} />
                                        <span style={{ fontSize: 9, color: '#64748B' }}>NORMAL</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <div style={{ width: 12, height: 8, background: C.red, borderRadius: 2 }} />
                                        <span style={{ fontSize: 9, color: '#64748B' }}>ANOMALY</span>
                                    </div>
                                </div>
                            </div>

                            {/* Anomaly detail cards */}
                            {result.anomalies.filter(w => w.is_anomaly).length > 0 && (
                                <div style={{ marginTop: 14 }}>
                                    <div style={{ fontSize: 10, color: C.red, letterSpacing: 2, marginBottom: 10, fontFamily: "'Orbitron', monospace" }}>
                                        FLAGGED WINDOWS
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10 }}>
                                        {result.anomalies.filter(w => w.is_anomaly).map((w, i) => (
                                            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.05 }}
                                                style={{ background: `${C.red}08`, borderRadius: 8, padding: 12, border: `1px solid ${C.red}30` }}>
                                                <div style={{ fontSize: 11, fontWeight: 700, color: C.red }}>WINDOW {w.window_idx}</div>
                                                <div style={{ fontSize: 9, color: '#94A3B8', marginTop: 4 }}>Alerts: {w.count}</div>
                                                <div style={{ fontSize: 9, color: '#94A3B8' }}>Avg Severity: {w.avg_severity?.toFixed(1)}</div>
                                                <div style={{ fontSize: 10, color: C.red, marginTop: 6, fontWeight: 700 }}>
                                                    Score: {w.anomaly_score?.toFixed(3)}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    <div style={{ background: C.card, borderRadius: 10, padding: 30, border: `1px solid ${C.border}`, textAlign: 'center', color: '#64748B' }}>
                        <Activity size={36} style={{ marginBottom: 10, opacity: 0.3 }} />
                        <div style={{ fontSize: 11, letterSpacing: 2 }}>AWAITING ALERT STREAM SCAN</div>
                    </div>
                )}
            </div>
        </div>
    );
};

// ─── 3. NLP INTEL CLASSIFIER ─────────────────────────────────
const SAMPLE_TEXTS = [
    "PLA armored divisions repositioning near LAC amid rising tensions",
    "APT-41 infrastructure reactivated targeting Indian SCADA systems",
    "Militant handlers coordinating sleeper cell activation via encrypted comms",
    "PBOC quietly devaluing yuan amid trade war escalation",
    "Government demands expulsion of foreign ambassador citing espionage",
    "Nuclear test site shows increased tunneling activity at Punggye-ri",
];

const NLPClassify = () => {
    const [text, setText] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const run = useCallback(async () => {
        if (!text.trim()) return;
        setLoading(true); setError('');
        try {
            const res = await fetch(`${API}/classify-text/`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text }),
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setResult(data);
        } catch (e) { setError(e.message); }
        finally { setLoading(false); }
    }, [text]);

    const CatIcon = result ? (CATEGORY_ICONS[result.category] || Layers) : null;
    const catColor = result ? (CATEGORY_COLORS[result.category] || C.teal) : C.teal;

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {/* Input */}
            <div>
                <div style={{ background: C.card, borderRadius: 10, padding: 18, border: `1px solid ${C.border}`, marginBottom: 14 }}>
                    <SectionHeader icon={Search} title="NLP INTEL CLASSIFIER" color={C.blue}
                        subtitle="TF-IDF Trigrams + Logistic Regression — 108 labeled samples" />
                    <div style={{ fontSize: 10, color: '#64748B', marginBottom: 10, letterSpacing: 1 }}>INTEL TEXT / HEADLINE</div>
                    <textarea
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder="Enter any intelligence report, news headline, or threat description..."
                        style={{
                            width: '100%', minHeight: 100, background: 'rgba(0,0,0,0.4)',
                            border: `1px solid ${C.border}`, borderRadius: 6, padding: 10,
                            color: '#E2E8F0', fontSize: 12, fontFamily: 'inherit', resize: 'vertical',
                            outline: 'none', boxSizing: 'border-box',
                        }}
                    />
                    <RunButton onClick={run} loading={loading} color={C.blue} label="CLASSIFY TEXT" />
                    {error && <div style={{ marginTop: 10, fontSize: 10, color: C.red }}>{error}</div>}
                </div>

                <div style={{ background: C.card, borderRadius: 10, padding: 18, border: `1px solid ${C.border}` }}>
                    <div style={{ fontSize: 10, color: C.blue, letterSpacing: 2, marginBottom: 12, fontFamily: "'Orbitron', monospace" }}>
                        SAMPLE INTEL TEXTS
                    </div>
                    {SAMPLE_TEXTS.map((t, i) => (
                        <motion.div key={i} whileHover={{ x: 4 }}
                            onClick={() => setText(t)}
                            style={{
                                padding: '8px 10px', borderRadius: 6, marginBottom: 6, cursor: 'pointer',
                                background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)',
                                fontSize: 11, color: '#94A3B8', lineHeight: 1.4, transition: 'all 0.15s'
                            }}>
                            <ChevronRight size={10} style={{ marginRight: 6, color: C.blue }} />
                            {t}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Results */}
            <div>
                {result ? (
                    <AnimatePresence mode="wait">
                        <motion.div key={result.category} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                            {/* Primary result */}
                            <div style={{ background: `${catColor}08`, borderRadius: 10, padding: 20, border: `1px solid ${catColor}30`, marginBottom: 14, textAlign: 'center' }}>
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}
                                    style={{
                                        width: 56, height: 56, borderRadius: 14, background: `${catColor}20`, border: `2px solid ${catColor}50`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px'
                                    }}>
                                    {CatIcon && <CatIcon size={26} color={catColor} />}
                                </motion.div>
                                <div style={{ fontSize: 20, fontWeight: 900, color: catColor, fontFamily: "'Orbitron', monospace", letterSpacing: 3 }}>
                                    {result.category.toUpperCase()}
                                </div>
                                <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 6 }}>CLASSIFIED CATEGORY</div>
                                <div style={{ marginTop: 12 }}>
                                    <StatusBadge label={`${result.confidence}% CONFIDENCE`} color={catColor} />
                                </div>
                            </div>

                            {/* Probability breakdown */}
                            <div style={{ background: C.card, borderRadius: 10, padding: 18, border: `1px solid ${C.border}` }}>
                                <div style={{ fontSize: 10, color: C.blue, letterSpacing: 2, marginBottom: 14, fontFamily: "'Orbitron', monospace" }}>
                                    CATEGORY PROBABILITIES
                                </div>
                                {result.ranked_categories.map((rc, i) => {
                                    const col = CATEGORY_COLORS[rc.category] || C.teal;
                                    return (
                                        <div key={rc.category} style={{ marginBottom: 12 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, alignItems: 'center' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                    {i === 0 && <CheckCircle size={10} color={col} />}
                                                    <span style={{ fontSize: 10, color: i === 0 ? col : '#94A3B8', fontWeight: i === 0 ? 700 : 400 }}>
                                                        {rc.category.toUpperCase()}
                                                    </span>
                                                </div>
                                                <span style={{ fontSize: 10, color: col, fontWeight: 700 }}>{rc.probability.toFixed(1)}%</span>
                                            </div>
                                            <GlowBar value={rc.probability} color={col} height={4} />
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    <div style={{ background: C.card, borderRadius: 10, padding: 40, border: `1px solid ${C.border}`, textAlign: 'center', color: '#64748B' }}>
                        <Search size={36} style={{ marginBottom: 10, opacity: 0.3 }} />
                        <div style={{ fontSize: 11, letterSpacing: 2 }}>AWAITING INTEL TEXT</div>
                        <div style={{ fontSize: 10, marginTop: 8 }}>Select a sample or enter your own text</div>
                    </div>
                )}
            </div>
        </div>
    );
};

// ─── 4. AGENT SUITABILITY SCORER ─────────────────────────────
const SPECIALIZATIONS = ['HUMINT', 'SIGINT', 'CYBER', 'COVERT_OPS', 'ANALYSIS', 'COUNTER_INTEL'];
const TIER_COLORS = ['#94A3B8', C.blue, C.teal];
const TIER_GLOWS = ['#94A3B830', `${C.blue}30`, `${C.teal}30`];

const AgentScorer = () => {
    const [params, setParams] = useState({ iq: 125, physical: 78, languages: 3, specialization: 'CYBER', service_years: 8, prior_ops: 5 });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const set = (k) => (v) => setParams(p => ({ ...p, [k]: v }));

    const run = useCallback(async () => {
        setLoading(true); setError('');
        try {
            const res = await fetch(`${API}/score-agent/`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(params),
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setResult(data);
        } catch (e) { setError(e.message); }
        finally { setLoading(false); }
    }, [params]);

    const tierColor = result ? TIER_COLORS[result.tier_idx ?? 0] : C.purple;
    const tierGlow = result ? TIER_GLOWS[result.tier_idx ?? 0] : `${C.purple}30`;

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 20 }}>
            {/* Controls */}
            <div style={{ background: C.card, borderRadius: 10, padding: 18, border: `1px solid ${C.border}` }}>
                <SectionHeader icon={Users} title="AGENT SCORER" color={C.purple}
                    subtitle="Gradient Boosting Classifier — candidate profiling" />

                <Slider label="IQ SCORE" min={80} max={160} value={params.iq} onChange={set('iq')} unit="" />
                <Slider label="PHYSICAL FITNESS (0–100)" min={30} max={100} value={params.physical} onChange={set('physical')} />
                <Slider label="LANGUAGES SPOKEN" min={1} max={7} value={params.languages} onChange={set('languages')} />
                <Slider label="SERVICE YEARS" min={0} max={25} value={params.service_years} onChange={set('service_years')} />
                <Slider label="PRIOR OPERATIONS" min={0} max={15} value={params.prior_ops} onChange={set('prior_ops')} />

                <div style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 10, color: '#94A3B8', letterSpacing: 1, marginBottom: 8 }}>SPECIALIZATION</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {SPECIALIZATIONS.map(s => (
                            <motion.button key={s} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                onClick={() => set('specialization')(s)}
                                style={{
                                    padding: '4px 10px', borderRadius: 4, cursor: 'pointer', fontSize: 9,
                                    fontFamily: "'Orbitron', monospace", letterSpacing: 1, border: 'none',
                                    background: params.specialization === s ? `${C.purple}30` : 'rgba(255,255,255,0.04)',
                                    color: params.specialization === s ? C.purple : '#64748B',
                                    outline: params.specialization === s ? `1px solid ${C.purple}50` : 'none',
                                }}>{s}</motion.button>
                        ))}
                    </div>
                </div>

                <RunButton onClick={run} loading={loading} color={C.purple} label="ASSESS CANDIDATE" />
                {error && <div style={{ marginTop: 10, fontSize: 10, color: C.red }}>{error}</div>}
            </div>

            {/* Results */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {result ? (
                    <AnimatePresence mode="wait">
                        <motion.div key={result.tier} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            {/* Tier card */}
                            <div style={{ background: tierGlow, borderRadius: 10, padding: 24, border: `1px solid ${tierColor}40`, display: 'flex', alignItems: 'center', gap: 24, marginBottom: 14 }}>
                                <ScoreGauge score={result.score} color={tierColor} label="SUITABILITY" />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 22, fontWeight: 900, color: tierColor, fontFamily: "'Orbitron', monospace", letterSpacing: 2 }}>
                                        {result.tier}
                                    </div>
                                    <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 6, lineHeight: 1.6 }}>
                                        {result.recommendation}
                                    </div>
                                </div>
                            </div>

                            {/* Tier probabilities */}
                            <div style={{ background: C.card, borderRadius: 10, padding: 18, border: `1px solid ${C.border}`, marginBottom: 14 }}>
                                <div style={{ fontSize: 10, color: C.purple, letterSpacing: 2, marginBottom: 14, fontFamily: "'Orbitron', monospace" }}>
                                    TIER PROBABILITIES
                                </div>
                                {Object.entries(result.tier_probabilities).map(([tier, prob], i) => (
                                    <div key={tier} style={{ marginBottom: 10 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                            <span style={{ fontSize: 10, color: TIER_COLORS[2 - i] }}>{tier}</span>
                                            <span style={{ fontSize: 10, color: TIER_COLORS[2 - i], fontWeight: 700 }}>{prob}%</span>
                                        </div>
                                        <GlowBar value={prob} color={TIER_COLORS[2 - i]} height={5} />
                                    </div>
                                ))}
                            </div>

                            {/* Strengths / Weaknesses */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                                <div style={{ background: `${C.green}08`, borderRadius: 10, padding: 16, border: `1px solid ${C.green}20` }}>
                                    <div style={{ fontSize: 10, color: C.green, letterSpacing: 2, marginBottom: 10, fontFamily: "'Orbitron', monospace" }}>STRENGTHS</div>
                                    {result.strengths.length > 0 ? result.strengths.map((s, i) => (
                                        <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6, fontSize: 10, color: '#94A3B8', lineHeight: 1.5 }}>
                                            <CheckCircle size={10} style={{ color: C.green, flexShrink: 0, marginTop: 2 }} />{s}
                                        </div>
                                    )) : <div style={{ fontSize: 10, color: '#475569' }}>No notable strengths identified.</div>}
                                </div>
                                <div style={{ background: `${C.red}08`, borderRadius: 10, padding: 16, border: `1px solid ${C.red}20` }}>
                                    <div style={{ fontSize: 10, color: C.red, letterSpacing: 2, marginBottom: 10, fontFamily: "'Orbitron', monospace" }}>WEAKNESSES</div>
                                    {result.weaknesses.length > 0 ? result.weaknesses.map((w, i) => (
                                        <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6, fontSize: 10, color: '#94A3B8', lineHeight: 1.5 }}>
                                            <AlertCircle size={10} style={{ color: C.red, flexShrink: 0, marginTop: 2 }} />{w}
                                        </div>
                                    )) : <div style={{ fontSize: 10, color: '#475569' }}>No notable weaknesses identified.</div>}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    <div style={{ background: C.card, borderRadius: 10, padding: 40, border: `1px solid ${C.border}`, textAlign: 'center', color: '#64748B', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Users size={36} style={{ marginBottom: 10, opacity: 0.3 }} />
                        <div style={{ fontSize: 11, letterSpacing: 2 }}>AWAITING CANDIDATE PROFILE</div>
                    </div>
                )}
            </div>
        </div>
    );
};

// ─── MAIN PANEL ──────────────────────────────────────────────
const MLInsightsPanel = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState('threat');

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed', inset: 0, zIndex: 9999,
                background: 'linear-gradient(135deg, #020617 0%, #060d1a 50%, #020617 100%)',
                color: '#E2E8F0', display: 'flex', flexDirection: 'column',
                fontFamily: "'Inter', sans-serif", overflow: 'hidden',
            }}
        >
            {/* Header */}
            <div style={{
                padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderBottom: '1px solid rgba(0,255,204,0.12)',
                background: 'linear-gradient(90deg, rgba(0,255,204,0.04), transparent, rgba(96,165,250,0.04))',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    >
                        <Brain size={30} color={C.teal} style={{ filter: `drop-shadow(0 0 12px ${C.teal}80)` }} />
                    </motion.div>
                    <div>
                        <h1 style={{ margin: 0, fontFamily: "'Orbitron', monospace", fontSize: 16, fontWeight: 900, color: C.teal, letterSpacing: 3 }}>
                            ML INSIGHTS ENGINE
                        </h1>
                        <span style={{ fontSize: 10, color: '#64748B', letterSpacing: 2 }}>
                            LIVE SCIKIT-LEARN INFERENCE — 4 TRAINED MODELS ACTIVE
                        </span>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ display: 'flex', gap: 16 }}>
                        {[
                            { label: 'RF REGRESSOR', color: C.red },
                            { label: 'ISOLATION FOREST', color: C.orange },
                            { label: 'TF-IDF + LR', color: C.blue },
                            { label: 'GRAD BOOSTING', color: C.purple },
                        ].map(m => (
                            <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
                                    style={{ width: 6, height: 6, borderRadius: '50%', background: m.color }} />
                                <span style={{ fontSize: 9, color: m.color, fontFamily: "'Orbitron', monospace" }}>{m.label}</span>
                            </div>
                        ))}
                    </div>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onBack}
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: 8, cursor: 'pointer', display: 'flex' }}>
                        <X size={18} color="#94A3B8" />
                    </motion.button>
                </div>
            </div>

            {/* Tab Bar */}
            <div style={{ display: 'flex', padding: '0 28px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
                {TABS.map(tab => (
                    <motion.button key={tab.id} whileHover={{ background: 'rgba(255,255,255,0.04)' }}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '12px 22px', display: 'flex', alignItems: 'center', gap: 8,
                            background: activeTab === tab.id ? `${tab.color}10` : 'transparent',
                            border: 'none', borderBottom: activeTab === tab.id ? `2px solid ${tab.color}` : '2px solid transparent',
                            cursor: 'pointer', fontFamily: "'Orbitron', monospace", fontSize: 10,
                            color: activeTab === tab.id ? tab.color : '#64748B', letterSpacing: 1, transition: 'all 0.2s',
                        }}>
                        <tab.icon size={13} />
                        {tab.label}
                    </motion.button>
                ))}
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflow: 'auto', padding: '20px 28px' }}>
                <AnimatePresence mode="wait">
                    {activeTab === 'threat' && <motion.div key="threat" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><ThreatPredictor /></motion.div>}
                    {activeTab === 'anomaly' && <motion.div key="anomaly" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><AnomalyDetect /></motion.div>}
                    {activeTab === 'nlp' && <motion.div key="nlp" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><NLPClassify /></motion.div>}
                    {activeTab === 'agent' && <motion.div key="agent" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><AgentScorer /></motion.div>}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default MLInsightsPanel;
