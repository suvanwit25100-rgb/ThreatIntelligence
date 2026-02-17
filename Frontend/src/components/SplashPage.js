import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import {
  Target, Fingerprint, Loader2, Lock, ShieldAlert,
  AlertTriangle, Terminal, MapPin, Radio,
  RefreshCcw, Zap, Cpu, ShieldCheck
} from 'lucide-react';

// Assets
import rawLogo from '../assets/raw-logo.png';

const geoUrl = "https://raw.githubusercontent.com/lotusms/world-map-data/master/world.json";

// --- Tactical Data Arrays ---
const intelUpdates = [
  "STRATCOM: SATELLITE INDRA-7 MAINTAINING GEOSTATIONARY ORBIT OVER INDIAN OCEAN.",
  "INTEL: UNUSUAL SIGNAL ACTIVITY DETECTED IN SECTOR-7G. MONITORING INITIATED.",
  "CYBER: FIREWALL INTEGRITY AT 99.8%. NO UNAUTHORIZED INTRUSIONS DETECTED.",
  "GEO: LOCALIZED WEATHER PATTERNS IN NEW DELHI FAVORING HIGH-ALTITUDE SURVEILLANCE.",
  "NODE: SECURE UPLINK WITH WASHINGTON D.C. VERIFIED VIA RSA-4096.",
  "PROTOCOL: KINETIC FAILSAFE ARMED. STANDBY FOR SERVICE PIN VERIFICATION."
];

const capitalSignals = [
  { name: 'NEW DELHI', coords: [77.2090, 28.6139] },
  { name: 'WASHINGTON D.C.', coords: [-77.0369, 38.9072] },
  { name: 'MOSCOW', coords: [37.6173, 55.7558] },
  { name: 'LONDON', coords: [-0.1278, 51.5074] },
  { name: 'BEIJING', coords: [116.4074, 39.9042] },
  { name: 'TOKYO', coords: [139.6917, 35.6895] },
  { name: 'ISLAMABAD', coords: [73.0479, 33.6844] }
];

const countryRelations = {
  "India": { level: "STRATEGIC_CORE", color: "text-[#00FFCC]" },
  "United States of America": { level: "LOW_RISK", color: "text-emerald-400" },
  "Russia": { level: "LOW_RISK", color: "text-emerald-400" },
  "China": { level: "HIGH_THREAT", color: "text-red-500" },
  "Pakistan": { level: "CRITICAL_THREAT", color: "text-red-600" }
};

const SplashPage = ({ onLaunch }) => {
  const [headerText, setHeaderText] = useState('');
  const [hoveredCountry, setHoveredCountry] = useState("");
  const [threatData, setThreatData] = useState({ level: "ANALYZING...", color: "text-[#00FFCC]" });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Security & State Management
  const [showAuth, setShowAuth] = useState(false);
  const [password, setPassword] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [destructTimer, setDestructTimer] = useState(30);
  const [isDead, setIsDead] = useState(false);
  const [isRebooting, setIsRebooting] = useState(false);
  const [rebootProgress, setRebootProgress] = useState(0);
  const [securityLogs, setSecurityLogs] = useState(["> KERNEL_STABLE_v9.1.0", "> ENCRYPTED_UPLINK_NEW_DELHI_ESTABLISHED"]);

  // Premium Login Features
  const [biometricScan, setBiometricScan] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [authStep, setAuthStep] = useState(1); // 1: Biometric, 2: Password, 3: Verification
  const [clearanceLevel, setClearanceLevel] = useState(0);

  // Live Telemetry Data
  const [liveMetrics, setLiveMetrics] = useState({ packets: 42047, uplink: 98.2, cpu: 14, lat: 28.6139, lng: 77.2090 });
  const [agentName, setAgentName] = useState('');
  const [missionBrief, setMissionBrief] = useState('');
  const [networkTraffic, setNetworkTraffic] = useState({ incoming: 1247, outgoing: 892, threats: 3 });
  const [satelliteData, setSatelliteData] = useState({ altitude: 35786, velocity: 3.07, coverage: 42 });
  const [threatLevel, setThreatLevel] = useState(12);
  const [systemDiagnostics, setSystemDiagnostics] = useState({ memory: 67, disk: 43, temp: 42 });

  const logEndRef = useRef(null);
  const loginSound = useRef(null);
  const blipSound = useRef(null);
  const errorSound = useRef(null);
  const emergencySound = useRef(null);

  // 1. Audio Assets Initialization
  useEffect(() => {
    loginSound.current = new Audio('/sounds/login-signal.mp3');
    blipSound.current = new Audio('/sounds/blip.mp3');
    errorSound.current = new Audio('/sounds/error-signal.mp3');
    emergencySound.current = new Audio('/sounds/emergency-alarm.mp3');

    if (blipSound.current) blipSound.current.volume = 0.12;
    if (emergencySound.current) {
      emergencySound.current.loop = true;
      emergencySound.current.volume = 0.5;
    }
  }, []);

  // 2. Real-Time Telemetry Loop
  useEffect(() => {
    if (isDead || isLocked || isRebooting) return;
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        packets: prev.packets + Math.floor(Math.random() * 15),
        uplink: parseFloat((98.8 + Math.random() * 1.1).toFixed(1)),
        cpu: Math.floor(8 + Math.random() * 12),
        lat: parseFloat((28.6139 + (Math.random() - 0.5) * 0.008).toFixed(4)),
        lng: parseFloat((77.2090 + (Math.random() - 0.5) * 0.008).toFixed(4))
      }));

      // Update network traffic
      setNetworkTraffic(prev => ({
        incoming: prev.incoming + Math.floor(Math.random() * 50),
        outgoing: prev.outgoing + Math.floor(Math.random() * 30),
        threats: Math.max(0, prev.threats + (Math.random() > 0.7 ? 1 : -1))
      }));

      // Update satellite data
      setSatelliteData(prev => ({
        altitude: parseFloat((35786 + (Math.random() - 0.5) * 2).toFixed(1)),
        velocity: parseFloat((3.07 + (Math.random() - 0.5) * 0.02).toFixed(2)),
        coverage: Math.min(100, Math.max(35, prev.coverage + (Math.random() - 0.5) * 3))
      }));

      // Update threat level
      setThreatLevel(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 5)));

      // Update system diagnostics
      setSystemDiagnostics(prev => ({
        memory: Math.min(95, Math.max(50, prev.memory + (Math.random() - 0.5) * 3)),
        disk: Math.min(90, Math.max(40, prev.disk + (Math.random() - 0.5) * 2)),
        temp: Math.min(75, Math.max(35, prev.temp + (Math.random() - 0.5) * 4))
      }));

      if (blipSound.current) blipSound.current.play().catch(() => { });
    }, 2000);
    return () => clearInterval(interval);
  }, [isDead, isLocked, isRebooting]);

  // 3. Typing Effect
  useEffect(() => {
    if (isDead || isRebooting) return;
    let i = 0;
    const fullText = "RESEARCH & ANALYSIS WING";
    const interval = setInterval(() => {
      setHeaderText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [isDead, isRebooting]);

  // 3b. Agent Name Typing Effect
  useEffect(() => {
    if (isDead || isRebooting) return;
    let i = 0;
    const fullName = "AGENT SUVANWIT";
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setAgentName(fullName.slice(0, i));
        i++;
        if (i > fullName.length) clearInterval(interval);
      }, 80);
      return () => clearInterval(interval);
    }, 1200);
    return () => clearTimeout(timeout);
  }, [isDead, isRebooting]);

  // 3c. Mission Brief Typing Effect
  useEffect(() => {
    if (isDead || isRebooting) return;
    let i = 0;
    const fullBrief = "STRATEGIC INTELLIGENCE OPERATIONS CLEARANCE VERIFIED";
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setMissionBrief(fullBrief.slice(0, i));
        i++;
        if (i > fullBrief.length) clearInterval(interval);
      }, 40);
      return () => clearInterval(interval);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [isDead, isRebooting]);

  // 4. Emergency Sound Control (simplified)
  useEffect(() => {
    if (isLocked && !isDead) {
      emergencySound.current?.play().catch(() => { });
    } else {
      emergencySound.current?.pause();
      if (emergencySound.current) emergencySound.current.currentTime = 0;
    }
  }, [isLocked, isDead]);

  // 5. Simplified Timer (no countdown needed)
  useEffect(() => {
    // Timer state is kept for compatibility but no longer counts down
    if (isLocked && !isDead) {
      // Just maintain the locked state without countdown
    }
  }, [isLocked, isDead]);

  // 6. Reboot Logic
  useEffect(() => {
    if (isRebooting) {
      const interval = setInterval(() => {
        setRebootProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setIsRebooting(false);
            setIsLocked(false);
            setAttempts(0);
            setDestructTimer(30);
            setShowAuth(false);
            setSecurityLogs(["> SYSTEM_RESTORED_v9.1", "> SECURITY_FLAGS_CLEARED"]);
            return 100;
          }
          return p + 2;
        });
      }, 80);
      return () => clearInterval(interval);
    }
  }, [isRebooting]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [securityLogs]);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (isLocked || isRebooting) return;
    setIsVerifying(true);
    setError('');

    setTimeout(() => {
      if (password === 'RAW-2026') {
        if (loginSound.current) loginSound.current.play().catch(() => { });
        setSecurityLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ACCESS_GRANTED`]);
        onLaunch();
      } else {
        if (errorSound.current) errorSound.current.play().catch(() => { });
        const next = attempts + 1;
        setAttempts(next);
        setPassword('');
        setIsVerifying(false);
        setSecurityLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] AUTH_FAILURE: ${next}/3`]);
        if (next >= 3) {
          setIsLocked(true);
          setError('SYSTEM LOCKOUT: UNAUTHORIZED');
        } else {
          setError(`ACCESS DENIED. REMAINING: ${3 - next}`);
        }
      }
    }, 1400);
  };

  return (
    <div
      className={`h-screen w-full transition-all duration-1000 flex flex-col items-center justify-center relative overflow-hidden font-sans ${isDead ? 'bg-black' : (isLocked ? 'bg-[#1a0505]' : 'bg-[#020617]')} text-[#00FFCC]`}
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
    >

      {/* --- INTERACTIVE RETICLE SCANNER --- */}
      {!isDead && !isLocked && !isRebooting && (
        <div
          className="pointer-events-none absolute z-[60] hidden md:block"
          style={{ left: mousePos.x, top: mousePos.y, transform: 'translate(-50%, -50%)' }}
        >
          <div className="relative h-20 w-20 border border-[#00FFCC]/20 rounded-full flex items-center justify-center">
            <div className="absolute h-[1px] w-full bg-[#00FFCC]/40" />
            <div className="absolute h-full w-[1px] bg-[#00FFCC]/40" />
            <div className="h-1 w-1 bg-red-500 rounded-full shadow-[0_0_5px_red]" />
          </div>
        </div>
      )}

      {/* --- REBOOT INTERFACE --- */}
      {isRebooting && (
        <div className="fixed inset-0 z-[500] flex flex-col items-center justify-center bg-black font-mono">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-80 space-y-4">
            <p className="text-[10px] tracking-[0.5em] text-[#00FFCC] uppercase animate-pulse">Flushing Failsafe Buffer...</p>
            <div className="w-full h-[2px] bg-[#00FFCC]/10">
              <motion.div className="h-full bg-[#00FFCC] shadow-[0_0_10px_#00FFCC]" style={{ width: `${rebootProgress}%` }} />
            </div>
            <div className="flex justify-between text-[10px] font-bold">
              <span>REBOOT_SEQ</span>
              <span>{rebootProgress}%</span>
            </div>
          </motion.div>
        </div>
      )}

      {/* --- DEAD STATE / HQ BROADCAST --- */}
      <AnimatePresence>
        {isDead && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[400] bg-black flex items-center justify-center p-12 font-mono">
            <div className="border border-red-600/40 p-16 max-w-3xl w-full bg-red-950/5 relative">
              <button onClick={() => setIsRebooting(true)} className="absolute bottom-4 right-4 opacity-0 hover:opacity-10 transition-all cursor-default"><RefreshCcw size={12} /></button>
              <div className="flex items-center gap-4 mb-10 text-red-600">
                <Radio className="animate-pulse" size={28} />
                <h2 className="text-2xl font-black uppercase tracking-tighter">Satellite_Uplink_Established</h2>
              </div>
              <div className="space-y-6 text-xs tracking-widest leading-relaxed">
                <p className="bg-red-600/10 p-4 border-l-2 border-red-600 text-white uppercase font-bold">
                  System Termination Sequence Complete. Current Metadata and GPS Packet broadcasted to New Delhi Command.
                </p>
                <div className="grid grid-cols-2 pt-6 border-t border-red-600/20">
                  <div>
                    <p className="opacity-40 uppercase mb-2 text-[9px]">Uplink_Target</p>
                    <p className="text-white font-bold">HQ_NEW_DELHI</p>
                  </div>
                  <div className="text-right">
                    <p className="opacity-40 uppercase mb-2 text-[9px]">Origin_GPS</p>
                    <p className="text-white font-bold">{liveMetrics.lat}N / {liveMetrics.lng}E</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`radar-sweep-hd ${isLocked || isDead || isRebooting ? 'opacity-0' : 'opacity-40'}`} />

      {/* --- TACTICAL 2D MAP --- */}
      <div className={`absolute inset-0 z-0 opacity-40 flex items-center justify-center transition-all ${isRebooting ? 'scale-105 blur-2xl' : 'scale-100'}`}>
        <ComposableMap projection="geoMercator" projectionConfig={{ scale: 150, center: [0, 20] }} className="w-full h-full">
          <Geographies geography={geoUrl}>
            {({ geographies }) => geographies.map((geo) => (
              <Geography
                key={geo.rsmKey} geography={geo}
                onMouseEnter={() => {
                  if (!isLocked && !isDead && !isRebooting) {
                    setHoveredCountry(geo.properties.name);
                    setThreatData(countryRelations[geo.properties.name] || { level: "STABLE", color: "text-[#00FFCC]/60" });
                  }
                }}
                onMouseLeave={() => setHoveredCountry("")}
                stroke="#00FFCC" strokeWidth={0.4}
                fill={hoveredCountry === geo.properties.name ? "#0c1e33" : "#020617"}
                className="outline-none transition-colors duration-300"
              />
            ))}
          </Geographies>
          {capitalSignals.map(({ name, coords }) => (
            <Marker key={name} coordinates={coords} onMouseEnter={() => !isLocked && setHoveredCountry(`${name}_NODE`)}>
              <circle r={2.5} fill="#ff0000" className="animate-pulse cursor-crosshair" style={{ filter: 'drop-shadow(0 0 8px #ff0000) drop-shadow(0 0 12px #ff0000)' }} />
              <text textAnchor="start" x={10} y={4} className="fill-[#00FFCC]/40 text-[8px] font-bold uppercase tracking-tighter font-mono">{name}</text>

              {/* Detailed Node Tooltips */}
              {hoveredCountry === `${name}_NODE` && (
                <g transform="translate(10, -25)">
                  <rect width="90" height="35" fill="rgba(2, 6, 23, 0.95)" stroke="#00FFCC" strokeWidth="0.5" />
                  <text x="5" y="12" className="fill-[#00FFCC] text-[7px] font-bold uppercase font-mono">{name}</text>
                  <text x="5" y="22" className="fill-[#00FFCC]/60 text-[6px] uppercase tracking-tighter font-mono">LATENCY: {Math.floor(Math.random() * 40) + 12}MS</text>
                  <text x="5" y="30" className="fill-emerald-400 text-[6px] uppercase font-black font-mono">LINK: SECURE</text>
                </g>
              )}
            </Marker>
          ))}
        </ComposableMap>
      </div>

      {/* --- SECTOR SCANNER PANEL --- */}
      <AnimatePresence>
        {hoveredCountry && !hoveredCountry.includes('_NODE') && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="absolute top-12 right-12 z-[150] p-6 border border-[#00FFCC]/20 bg-black/80 backdrop-blur-md w-72">
            <div className="flex items-center gap-3 text-[#00FFCC]/40 text-[9px] mb-4 font-bold tracking-[0.2em] uppercase font-mono"><Target size={12} /> Scanner_Active</div>
            <p className="text-2xl font-black mb-6 uppercase text-[#00FFCC]">{hoveredCountry}</p>
            <div className="space-y-4 text-[10px] font-mono">
              <div className="flex justify-between border-b border-[#00FFCC]/10 pb-2"><span className="opacity-40 uppercase">Threat_Lv</span><span className={`${threatData.color} font-bold uppercase`}>{threatData.level}</span></div>
              <div className="flex justify-between border-b border-[#00FFCC]/10 pb-2"><span className="opacity-40 uppercase">Surveillance</span><span className="text-emerald-400 font-bold uppercase">Active</span></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- LIVE DATA PANELS (RIGHT SIDE) --- */}
      <div className={`absolute right-12 top-32 w-80 space-y-4 z-50 font-mono transition-opacity ${isDead || isRebooting || showAuth || isLocked ? 'opacity-0' : 'opacity-100'}`}>

        {/* Network Traffic Panel */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="border border-[#00FFCC]/20 bg-black/40 backdrop-blur-md p-6"
        >
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#00FFCC]/10">
            <Radio className="text-[#00FFCC]" size={16} />
            <p className="text-[8px] tracking-[0.3em] text-[#00FFCC]/40 uppercase">Network_Traffic</p>
          </div>
          <div className="space-y-3 text-[9px]">
            <div className="flex justify-between items-center">
              <span className="text-[#00FFCC]/60 uppercase">Incoming</span>
              <span className="text-emerald-400 font-bold tabular-nums">{networkTraffic.incoming.toLocaleString()} MB/s</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#00FFCC]/60 uppercase">Outgoing</span>
              <span className="text-[#00FFCC] font-bold tabular-nums">{networkTraffic.outgoing.toLocaleString()} MB/s</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#00FFCC]/60 uppercase">Threats_Blocked</span>
              <span className="text-red-400 font-bold tabular-nums">{networkTraffic.threats}</span>
            </div>
          </div>
        </motion.div>

        {/* Satellite Telemetry Panel */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="border border-[#00FFCC]/20 bg-black/40 backdrop-blur-md p-6"
        >
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#00FFCC]/10">
            <MapPin className="text-[#00FFCC]" size={16} />
            <p className="text-[8px] tracking-[0.3em] text-[#00FFCC]/40 uppercase">Satellite_INDRA-7</p>
          </div>
          <div className="space-y-3 text-[9px]">
            <div className="flex justify-between items-center">
              <span className="text-[#00FFCC]/60 uppercase">Altitude</span>
              <span className="text-[#00FFCC] font-bold tabular-nums">{satelliteData.altitude.toFixed(1)} km</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#00FFCC]/60 uppercase">Velocity</span>
              <span className="text-[#00FFCC] font-bold tabular-nums">{satelliteData.velocity} km/s</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#00FFCC]/60 uppercase">Coverage</span>
              <span className="text-emerald-400 font-bold tabular-nums">{satelliteData.coverage.toFixed(0)}%</span>
            </div>
          </div>
        </motion.div>

        {/* Threat Assessment Panel */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="border border-[#00FFCC]/20 bg-black/40 backdrop-blur-md p-6"
        >
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#00FFCC]/10">
            <ShieldAlert className="text-amber-400" size={16} />
            <p className="text-[8px] tracking-[0.3em] text-[#00FFCC]/40 uppercase">Threat_Assessment</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[9px] mb-2">
              <span className="text-[#00FFCC]/60 uppercase">Current_Level</span>
              <span className={`font-bold tabular-nums ${threatLevel < 30 ? 'text-emerald-400' : threatLevel < 60 ? 'text-amber-400' : 'text-red-400'}`}>
                {threatLevel.toFixed(0)}%
              </span>
            </div>
            <div className="w-full h-2 bg-[#00FFCC]/10 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${threatLevel < 30 ? 'bg-emerald-500' : threatLevel < 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                style={{ width: `${threatLevel}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* System Diagnostics Panel */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="border border-[#00FFCC]/20 bg-black/40 backdrop-blur-md p-6"
        >
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#00FFCC]/10">
            <Cpu className="text-[#00FFCC]" size={16} />
            <p className="text-[8px] tracking-[0.3em] text-[#00FFCC]/40 uppercase">System_Diagnostics</p>
          </div>
          <div className="space-y-3 text-[9px]">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[#00FFCC]/60 uppercase">Memory</span>
                <span className="text-[#00FFCC] font-bold tabular-nums">{systemDiagnostics.memory.toFixed(0)}%</span>
              </div>
              <div className="w-full h-1 bg-[#00FFCC]/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#00FFCC]" style={{ width: `${systemDiagnostics.memory}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[#00FFCC]/60 uppercase">Disk</span>
                <span className="text-[#00FFCC] font-bold tabular-nums">{systemDiagnostics.disk.toFixed(0)}%</span>
              </div>
              <div className="w-full h-1 bg-[#00FFCC]/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#00FFCC]" style={{ width: `${systemDiagnostics.disk}%` }} />
              </div>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-[#00FFCC]/10">
              <span className="text-[#00FFCC]/60 uppercase">Temperature</span>
              <span className={`font-bold tabular-nums ${systemDiagnostics.temp > 60 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {systemDiagnostics.temp.toFixed(0)}°C
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* --- CENTRAL INTERFACE --- */}
      <motion.div animate={{ opacity: showAuth || isLocked || isDead || isRebooting ? 0.02 : 1 }} className="text-center z-30 pointer-events-none">
        <div className="mb-8 p-2 border border-[#00FFCC]/20 rounded-xl inline-block bg-black shadow-2xl">
          <img src={rawLogo} alt="R&AW" className="w-32 h-auto rounded-lg" />
        </div>
        <h1 className="text-7xl font-bold tracking-tighter mb-4 text-[#00FFCC] uppercase leading-none">{headerText}<span className="animate-pulse">_</span></h1>
        <p className="text-[10px] tracking-[1.2em] text-[#00FFCC]/20 uppercase mb-20 font-bold">Integrated Strategic Command</p>
        <button
          onClick={() => !isLocked && !isDead && setShowAuth(true)}
          disabled={isLocked || isDead}
          className="pointer-events-auto px-20 py-6 border border-[#00FFCC]/20 text-[#00FFCC] text-sm font-bold uppercase tracking-[0.5em] hover:bg-[#00FFCC] hover:text-[#020617] transition-all"
        >
          Initialize_Uplink
        </button>
      </motion.div>

      {/* --- INTEL TICKER BAR --- */}
      <div className={`absolute bottom-44 w-full bg-[#00FFCC]/5 border-y border-[#00FFCC]/10 py-2 overflow-hidden z-40 transition-opacity ${isDead || isLocked ? 'opacity-0' : 'opacity-100'}`}>
        <motion.div
          animate={{ x: ["100%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
          className="flex whitespace-nowrap gap-24 text-[9px] font-bold text-[#00FFCC]/50 uppercase tracking-[0.3em] font-mono"
        >
          {intelUpdates.map((update, i) => (
            <span key={i} className="flex items-center gap-4">
              <div className="h-1 w-1 bg-[#00FFCC]/60 rounded-full" /> {update}
            </span>
          ))}
        </motion.div>
      </div>

      {/* --- PREMIUM AUTHENTICATION TERMINAL --- */}
      <AnimatePresence>
        {showAuth && !isLocked && !isDead && !isRebooting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center backdrop-blur-xl bg-black/90 font-sans"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-[600px] bg-gradient-to-br from-[#020617] to-[#0a0f1e] border-2 border-[#00FFCC]/30 p-12 shadow-[0_0_50px_rgba(0,255,204,0.2)] relative overflow-hidden"
            >
              {/* Animated Background Grid */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'linear-gradient(#00FFCC 1px, transparent 1px), linear-gradient(90deg, #00FFCC 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }} />
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  setShowAuth(false);
                  setAuthStep(1);
                  setBiometricScan(false);
                  setScanProgress(0);
                  setClearanceLevel(0);
                  setPassword('');
                  setError('');
                }}
                className="absolute top-6 right-6 text-[#00FFCC]/40 hover:text-[#00FFCC] text-[10px] font-bold uppercase tracking-widest font-mono transition-colors z-10"
              >
                Esc_[x]
              </button>

              <div className="relative z-10">
                {/* Step 1: Biometric Scan */}
                {authStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex flex-col items-center"
                  >
                    {/* Fingerprint Scanner */}
                    <div className="relative mb-8">
                      <motion.div
                        animate={{
                          scale: biometricScan ? [1, 1.1, 1] : 1,
                          rotate: biometricScan ? [0, 5, -5, 0] : 0
                        }}
                        transition={{ repeat: biometricScan ? Infinity : 0, duration: 2 }}
                      >
                        <Fingerprint
                          className={`${biometricScan ? 'text-[#00FFCC]' : 'text-[#00FFCC]/40'} transition-colors`}
                          size={120}
                        />
                      </motion.div>

                      {/* Scanning Ring */}
                      {biometricScan && (
                        <motion.div
                          className="absolute inset-0 border-4 border-[#00FFCC] rounded-full"
                          animate={{ scale: [1, 1.3], opacity: [1, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        />
                      )}
                    </div>

                    <h2 className="text-2xl font-black tracking-[0.3em] mb-4 uppercase text-white">
                      Biometric_Scan
                    </h2>
                    <p className="text-[10px] tracking-[0.4em] text-[#00FFCC]/60 uppercase mb-8 font-mono">
                      Identity_Verification_Required
                    </p>

                    {/* Scan Progress */}
                    {biometricScan && (
                      <div className="w-full mb-8">
                        <div className="flex justify-between text-[9px] font-mono text-[#00FFCC]/60 mb-2">
                          <span>SCANNING...</span>
                          <span>{scanProgress}%</span>
                        </div>
                        <div className="w-full h-2 bg-[#00FFCC]/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-[#00FFCC] to-emerald-400 shadow-[0_0_10px_#00FFCC]"
                            style={{ width: `${scanProgress}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Scan Button */}
                    <button
                      onClick={() => {
                        setBiometricScan(true);
                        let progress = 0;
                        const interval = setInterval(() => {
                          progress += 5;
                          setScanProgress(progress);
                          if (progress >= 100) {
                            clearInterval(interval);
                            setTimeout(() => {
                              setAuthStep(2);
                              setBiometricScan(false);
                              setScanProgress(0);
                            }, 500);
                          }
                        }, 100);
                      }}
                      disabled={biometricScan}
                      className="px-16 py-5 bg-[#00FFCC] text-[#020617] font-black uppercase tracking-[0.4em] hover:bg-white transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,255,204,0.3)]"
                    >
                      {biometricScan ? 'Scanning...' : 'Initiate_Scan'}
                    </button>
                  </motion.div>
                )}

                {/* Step 2: Password Entry */}
                {authStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col items-center"
                  >
                    <div className="mb-8 relative">
                      <Lock className="text-[#00FFCC]" size={80} />
                      <motion.div
                        className="absolute -inset-4 border-2 border-[#00FFCC]/30 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                      />
                    </div>

                    <h2 className="text-2xl font-black tracking-[0.3em] mb-4 uppercase text-white">
                      Security_Clearance
                    </h2>
                    <p className="text-[10px] tracking-[0.4em] text-emerald-400 uppercase mb-8 font-mono flex items-center gap-2">
                      <ShieldCheck size={12} /> Biometric_Verified
                    </p>

                    <form onSubmit={handleAuthSubmit} className="w-full space-y-8">
                      <div className="space-y-4 font-mono">
                        <p className="text-[9px] uppercase tracking-[0.5em] text-[#00FFCC]/40 text-center">
                          Service_Passkey
                        </p>
                        <div className="relative">
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full py-5 px-8 text-center text-2xl tracking-[0.8em] bg-black/40 border-2 border-[#00FFCC]/20 text-[#00FFCC] outline-none focus:border-[#00FFCC] focus:shadow-[0_0_20px_rgba(0,255,204,0.2)] transition-all rounded-sm"
                            required
                            autoFocus
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <Terminal className="text-[#00FFCC]/40" size={20} />
                          </div>
                        </div>
                      </div>

                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-3 text-[10px] font-bold justify-center uppercase text-red-500 font-mono bg-red-500/10 py-3 px-4 border border-red-500/30"
                        >
                          <ShieldAlert size={14} /> {error}
                        </motion.div>
                      )}

                      <button
                        type="submit"
                        disabled={isVerifying}
                        className="w-full py-5 bg-gradient-to-r from-[#00FFCC] to-emerald-400 text-[#020617] font-black uppercase tracking-[0.4em] hover:shadow-[0_0_30px_rgba(0,255,204,0.5)] transition-all text-sm disabled:opacity-50 relative overflow-hidden group"
                      >
                        {isVerifying && (
                          <motion.div
                            className="absolute inset-0 bg-white/20"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          />
                        )}
                        <span className="relative z-10 flex items-center justify-center gap-3">
                          {isVerifying ? (
                            <>
                              <Loader2 className="animate-spin" size={16} />
                              Verifying...
                            </>
                          ) : (
                            'Authorize_Session'
                          )}
                        </span>
                      </button>
                    </form>

                    {/* Security Info */}
                    <div className="mt-8 pt-6 border-t border-[#00FFCC]/10 w-full">
                      <div className="grid grid-cols-2 gap-4 text-[8px] font-mono">
                        <div className="text-center">
                          <p className="text-[#00FFCC]/40 uppercase mb-1">Encryption</p>
                          <p className="text-emerald-400 font-bold">RSA-4096</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[#00FFCC]/40 uppercase mb-1">Attempts</p>
                          <p className="text-[#00FFCC] font-bold">{attempts}/3</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Corner Decorations */}
              <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-[#00FFCC]/40" />
              <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-[#00FFCC]/40" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-[#00FFCC]/40" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-[#00FFCC]/40" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- WELCOME AGENT PANEL --- */}
      <AnimatePresence>
        {!isDead && !isRebooting && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: showAuth || isLocked ? 0.1 : 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute left-12 top-32 w-80 z-50 font-mono"
          >
            {/* Main Panel */}
            <div className="border border-[#00FFCC]/20 bg-black/40 backdrop-blur-md p-8 shadow-2xl">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#00FFCC]/10">
                <Fingerprint className="text-[#00FFCC]" size={24} />
                <div className="flex-1">
                  <p className="text-[8px] tracking-[0.3em] text-[#00FFCC]/40 uppercase mb-1">Identity_Verified</p>
                  <h3 className="text-xl font-black text-[#00FFCC] uppercase tracking-tight">
                    {agentName}<span className="animate-pulse">_</span>
                  </h3>
                </div>
              </div>

              {/* Clearance Level */}
              <div className="mb-6 pb-6 border-b border-[#00FFCC]/10">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[8px] tracking-[0.3em] text-[#00FFCC]/40 uppercase">Clearance_Level</p>
                  <ShieldCheck className="text-emerald-400" size={16} />
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-[#00FFCC]/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2, delay: 1.5 }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-[#00FFCC] shadow-[0_0_10px_#00FFCC]"
                    />
                  </div>
                  <span className="text-emerald-400 font-black text-xs">OMEGA</span>
                </div>
              </div>

              {/* Mission Status */}
              <div className="mb-6 pb-6 border-b border-[#00FFCC]/10">
                <p className="text-[8px] tracking-[0.3em] text-[#00FFCC]/40 uppercase mb-3">Mission_Status</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[9px]">
                    <span className="text-[#00FFCC]/60 uppercase">Active_Ops</span>
                    <span className="text-[#00FFCC] font-bold tabular-nums">07</span>
                  </div>
                  <div className="flex items-center justify-between text-[9px]">
                    <span className="text-[#00FFCC]/60 uppercase">Completed</span>
                    <span className="text-emerald-400 font-bold tabular-nums">142</span>
                  </div>
                  <div className="flex items-center justify-between text-[9px]">
                    <span className="text-[#00FFCC]/60 uppercase">Success_Rate</span>
                    <span className="text-emerald-400 font-bold tabular-nums">98.7%</span>
                  </div>
                </div>
              </div>

              {/* Tactical Brief */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="text-amber-400" size={12} />
                  <p className="text-[8px] tracking-[0.3em] text-[#00FFCC]/40 uppercase">Tactical_Brief</p>
                </div>
                <p className="text-[9px] leading-relaxed text-[#00FFCC]/70 uppercase tracking-wide min-h-[3rem]">
                  {missionBrief}<span className="animate-pulse">_</span>
                </p>
              </div>

              {/* Status Indicator */}
              <div className="mt-6 pt-6 border-t border-[#00FFCC]/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="h-2 w-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                  />
                  <span className="text-[8px] text-emerald-400 font-bold uppercase tracking-widest">Online</span>
                </div>
                <Cpu className="text-[#00FFCC]/20" size={14} />
              </div>
            </div>

            {/* Decorative Corner Brackets */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-[#00FFCC]/40" />
            <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-[#00FFCC]/40" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-[#00FFCC]/40" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-[#00FFCC]/40" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- TACTICAL LOG PANEL --- */}
      <div className={`absolute left-12 bottom-56 w-72 h-36 z-50 overflow-hidden text-[9px] border-l border-[#00FFCC]/10 pl-6 bg-black/20 transition-opacity font-mono ${isDead || isRebooting ? 'opacity-0' : 'opacity-100'}`}>
        <p className="mb-4 opacity-20 flex items-center gap-2 font-bold uppercase tracking-widest"><Terminal size={10} /> Telemetry_Feed</p>
        <div className="space-y-2 text-[#00FFCC]/50 uppercase font-bold">
          {securityLogs.map((log, i) => <p key={i}>{log}</p>)}
          <div ref={logEndRef} />
        </div>
      </div>

      {/* --- LIVE TELEMETRY FOOTER --- */}
      <div className={`absolute bottom-0 w-full px-20 py-12 grid grid-cols-4 gap-12 bg-black/90 border-t border-[#00FFCC]/10 z-50 font-mono transition-opacity ${isDead || isRebooting ? 'opacity-0' : 'opacity-100'}`}>
        <div>
          <p className="text-[9px] opacity-30 uppercase mb-3 tracking-widest font-bold">Intercept_Count</p>
          <p className="text-3xl font-black tabular-nums">{liveMetrics.packets.toLocaleString()}</p>
        </div>
        <div className="border-l border-[#00FFCC]/10 pl-10">
          <p className="text-[9px] opacity-30 uppercase mb-3 tracking-widest font-bold">Coordinate_Sync</p>
          <p className="text-xl font-bold tabular-nums uppercase">{liveMetrics.lat}N / {liveMetrics.lng}E</p>
        </div>
        <div className="border-l border-[#00FFCC]/10 pl-10">
          <p className="text-[9px] opacity-30 uppercase mb-3 tracking-widest font-bold">Signal_Quality</p>
          <div className="flex items-center gap-4">
            <p className="text-3xl font-black tabular-nums">{liveMetrics.uplink}%</p>
            <Zap size={20} className="animate-pulse text-emerald-500" />
          </div>
        </div>
        <div className="text-right flex flex-col items-end">
          <p className="text-[9px] opacity-30 uppercase mb-3 tracking-widest font-bold">Operational_Status</p>
          <div className="flex items-center gap-4 text-emerald-500 font-bold uppercase tracking-widest text-xs">
            Encrypted <ShieldCheck size={18} />
          </div>
        </div>
      </div>

      {/* --- HEADQUARTERS NOTIFICATION OVERLAY --- */}
      {isLocked && !isDead && (
        <div className="absolute inset-0 z-[300] bg-black/95 flex flex-col items-center justify-center backdrop-blur-md font-mono">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl w-full border-2 border-red-600/40 p-12 bg-red-950/10 relative"
          >
            {/* Hidden reboot trigger */}
            <button
              onClick={() => setIsRebooting(true)}
              className="absolute bottom-4 right-4 opacity-0 hover:opacity-10 transition-all cursor-default"
            >
              <RefreshCcw size={12} />
            </button>

            {/* Header with icon */}
            <div className="flex items-center gap-4 mb-8 text-red-600">
              <Radio className="animate-pulse" size={32} />
              <h2 className="text-3xl font-black uppercase tracking-tight">
                Satellite_Uplink_Established
              </h2>
            </div>

            {/* Main notification */}
            <div className="space-y-6 text-sm tracking-wide leading-relaxed">
              <p className="bg-red-600/10 p-6 border-l-4 border-red-600 text-white uppercase font-bold">
                UNAUTHORIZED ACCESS ATTEMPT DETECTED. LOCATION AND DEVICE METADATA TRANSMITTED TO NEW DELHI COMMAND.
              </p>

              {/* Uplink details */}
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-red-600/20">
                <div>
                  <p className="opacity-40 uppercase mb-2 text-xs">Uplink_Target</p>
                  <p className="text-white font-bold text-lg">HQ_NEW_DELHI</p>
                </div>
                <div className="text-right">
                  <p className="opacity-40 uppercase mb-2 text-xs">Origin_GPS</p>
                  <p className="text-white font-bold text-lg">{liveMetrics.lat}N / {liveMetrics.lng}E</p>
                </div>
              </div>

              {/* Status indicator */}
              <div className="pt-6 border-t border-red-600/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="h-3 w-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                  />
                  <span className="text-red-500 font-bold uppercase tracking-wider text-xs">
                    Transmission_Complete
                  </span>
                </div>
                <p className="text-xs text-red-400/60 uppercase">
                  Attempts: {attempts}/3
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};