import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Plane, Rocket, Ship, Shield, Cpu, Satellite, Crosshair,
    ChevronRight, ChevronDown, Activity, Target, Zap, Clock,
    TrendingUp, BarChart3, AlertTriangle, CheckCircle, Factory,
    Anchor, Truck, BrainCircuit, ArrowLeft, IndianRupee,
    Layers, Eye, Star, Users, Gauge, CircleDot, Hexagon
} from 'lucide-react';

const PHASES = ['Concept', 'Design', 'Prototype', 'Testing', 'Production', 'Inducted'];

const ORGANIZATIONS = ['All', 'DRDO', 'HAL', 'BEL', 'BDL', 'MDL', 'GRSE', 'L&T Defense'];

const PROJECTS = [
    {
        id: 'P001', name: 'HAL Tejas Mk.2', org: 'HAL', type: 'Aircraft', icon: Plane,
        phase: 3, budget: '₹9,000 Cr', timeline: '2020–2029', induction: 2029,
        status: 'ON TRACK', specs: ['Medium-weight fighter', 'GE F414 engine', '130 kN thrust class'],
        fullSpecs: ['Max Speed: Mach 1.8', 'Combat Radius: 500 km', 'Payload: 6,500 kg', 'AESA Radar: Uttam Mk.2', 'Weapons: Derby, Python-5, Astra Mk.2, BrahMos-NG'],
        milestones: [{ year: 2020, event: 'Design finalized' }, { year: 2022, event: 'First prototype rollout' }, { year: 2024, event: 'First flight' }, { year: 2026, event: 'Weapons integration testing' }, { year: 2029, event: 'IOC declaration' }],
        contractors: ['HAL (Prime)', 'GE Aviation (Engine)', 'LRDE (Radar)', 'BEL (Avionics)', 'Rafael (EW Suite)'],
        challenges: ['Engine supply chain dependency', 'AESA radar maturation delays', 'Weight management critical'],
        strategicImportance: 9
    },
    {
        id: 'P002', name: 'AMCA (5th Gen Stealth)', org: 'DRDO', type: 'Aircraft', icon: Plane,
        phase: 1, budget: '₹15,000 Cr', timeline: '2022–2035', induction: 2035,
        status: 'ON TRACK', specs: ['5th gen stealth fighter', 'Twin-engine design', 'Internal weapons bay'],
        fullSpecs: ['Max Speed: Mach 2.5', 'Supercruise capable', 'RCS: <0.1 m²', 'AESA Radar: Next-Gen Uttam', 'Stealth coatings: Indigenous RAM', 'AI-assisted combat systems'],
        milestones: [{ year: 2022, event: 'Design phase initiated' }, { year: 2025, event: 'Preliminary design review' }, { year: 2028, event: 'First prototype build' }, { year: 2031, event: 'First flight' }, { year: 2035, event: 'IOC planned' }],
        contractors: ['ADA/DRDO (Prime)', 'HAL (Manufacture)', 'GTRE (Engine Kaveri Mk.2)', 'BEL (Mission Computer)'],
        challenges: ['Engine development critical path', 'Stealth material maturity', 'Cost escalation risk'],
        strategicImportance: 10
    },
    {
        id: 'P003', name: 'TEDBF (Twin Engine Deck-Based)', org: 'HAL', type: 'Aircraft', icon: Plane,
        phase: 1, budget: '₹12,000 Cr', timeline: '2021–2032', induction: 2032,
        status: 'ON TRACK', specs: ['Carrier-based fighter', 'Twin GE F414 engines', 'STOBAR capable'],
        fullSpecs: ['Max Speed: Mach 1.8+', 'Folding wings for carrier ops', 'AESA Radar with IRST', 'Anti-ship missile integration', 'Carrier landing gear reinforced'],
        milestones: [{ year: 2021, event: 'Project sanction' }, { year: 2024, event: 'Design freeze' }, { year: 2027, event: 'Prototype rollout' }, { year: 2030, event: 'Carrier trials' }, { year: 2032, event: 'IOC planned' }],
        contractors: ['HAL (Prime)', 'GE Aviation (Engine)', 'Indian Navy (Requirements)', 'LRDE (Radar)'],
        challenges: ['Carrier compatibility validation', 'Salt corrosion resistance', 'Concurrent IAC-2 timeline dependency'],
        strategicImportance: 8
    },
    {
        id: 'P004', name: 'HAL CATS Warrior', org: 'HAL', type: 'Aircraft', icon: Plane,
        phase: 2, budget: '₹4,500 Cr', timeline: '2021–2028', induction: 2028,
        status: 'ON TRACK', specs: ['Loyal Wingman UCAV', 'AI autonomous ops', 'Stealth profile'],
        fullSpecs: ['Range: 700 km', 'Payload: 1,000 kg', 'Autonomous AI flight', 'Manned-Unmanned Teaming (MUM-T)', 'Modular mission payloads'],
        milestones: [{ year: 2021, event: 'Concept revealed at Aero India' }, { year: 2023, event: 'Design review complete' }, { year: 2025, event: 'Prototype build initiated' }, { year: 2027, event: 'Flight testing' }, { year: 2028, event: 'IOC planned' }],
        contractors: ['HAL (Prime)', 'NewSpace Research (AI)', 'BEL (Datalinks)', 'DRDO (Weapons)'],
        challenges: ['AI autonomy certification', 'Reliable MUM-T communications', 'Cost per unit optimization'],
        strategicImportance: 8
    },
    {
        id: 'P005', name: 'BrahMos-II (Hypersonic)', org: 'DRDO', type: 'Missile', icon: Rocket,
        phase: 2, budget: '₹8,000 Cr', timeline: '2018–2030', induction: 2030,
        status: 'DELAYED', specs: ['Hypersonic cruise missile', 'Mach 7+ speed', 'Scramjet propulsion'],
        fullSpecs: ['Speed: Mach 7–8', 'Range: 600 km', 'Scramjet engine: Indigenous', 'Sea-skimming terminal phase', 'Anti-ship & land-attack variants'],
        milestones: [{ year: 2018, event: 'Scramjet test (HSTDV)' }, { year: 2022, event: 'HSTDV successful test' }, { year: 2025, event: 'BrahMos-II prototype' }, { year: 2028, event: 'Flight tests' }, { year: 2030, event: 'IOC planned' }],
        contractors: ['DRDO (Prime)', 'BrahMos Aerospace (JV)', 'NPO Mashinostroyenia (Russia)', 'HAL (Integration)'],
        challenges: ['Scramjet reliability at sustained Mach 7', 'Thermal management', 'Guidance at hypersonic speeds'],
        strategicImportance: 10
    },
    {
        id: 'P006', name: 'Agni-VI (ICBM)', org: 'DRDO', type: 'Missile', icon: Rocket,
        phase: 2, budget: '₹5,500 Cr', timeline: '2017–2028', induction: 2028,
        status: 'ON TRACK', specs: ['Intercontinental ballistic missile', 'Range 10,000+ km', 'MIRV capable'],
        fullSpecs: ['Range: 10,000–12,000 km', 'MIRV: 3–6 warheads', 'Canisterized for road/rail launch', 'Three-stage solid fuel', 'MaRV capability'],
        milestones: [{ year: 2017, event: 'Development authorized' }, { year: 2021, event: 'Design phase complete' }, { year: 2024, event: 'Sub-system testing' }, { year: 2027, event: 'Flight test planned' }, { year: 2028, event: 'Induction planned' }],
        contractors: ['DRDO/ASL (Prime)', 'BDL (Production)', 'DRDL (Guidance)', 'SFC (Deployment)'],
        challenges: ['MIRV accuracy validation', 'Political sensitivity of testing', 'Counter-BMD penetration aids'],
        strategicImportance: 10
    },
    {
        id: 'P007', name: 'SMART (Torpedo System)', org: 'DRDO', type: 'Missile', icon: Rocket,
        phase: 3, budget: '₹2,800 Cr', timeline: '2019–2027', induction: 2027,
        status: 'ON TRACK', specs: ['Supersonic missile-assisted torpedo', 'Standoff anti-sub weapon', '600 km range'],
        fullSpecs: ['Range: 600 km', 'Speed: Supersonic (Mach 2)', 'Torpedo: Lightweight', 'Launch: Ship/coastal battery', 'Parachute torpedo delivery'],
        milestones: [{ year: 2019, event: 'Development initiated' }, { year: 2021, event: 'First test launch' }, { year: 2023, event: 'Successful torpedo delivery test' }, { year: 2025, event: 'User trials' }, { year: 2027, event: 'Induction planned' }],
        contractors: ['DRDO/DRDL (Prime)', 'BDL (Production)', 'Naval Science & Tech Lab (Torpedo)', 'BEL (Guidance)'],
        challenges: ['Torpedo accuracy after supersonic release', 'Sea-state performance validation', 'Integration with naval platforms'],
        strategicImportance: 7
    },
    {
        id: 'P008', name: 'Pralay (Quasi-Ballistic)', org: 'DRDO', type: 'Missile', icon: Rocket,
        phase: 4, budget: '₹1,500 Cr', timeline: '2018–2026', induction: 2026,
        status: 'ON TRACK', specs: ['Quasi-ballistic missile', '150–500 km range', 'Maneuverable warhead'],
        fullSpecs: ['Range: 150–500 km', 'Speed: Mach 2+', 'Warhead: 350–700 kg', 'Solid propellant', 'Terminal maneuver for BMD evasion'],
        milestones: [{ year: 2018, event: 'Project sanction' }, { year: 2021, event: 'First test' }, { year: 2022, event: 'Second successful test' }, { year: 2024, event: 'Production clearance' }, { year: 2026, event: 'Induction planned' }],
        contractors: ['DRDO (Prime)', 'BDL (Production)', 'DRDL (Guidance)', 'Army Strategic Command'],
        challenges: ['Counter-BMD effectiveness validation', 'Rapid deployment logistics', 'Variant standardization'],
        strategicImportance: 8
    },
    {
        id: 'P009', name: 'Project 75I (Submarines)', org: 'MDL', type: 'Naval', icon: Anchor,
        phase: 1, budget: '₹43,000 Cr', timeline: '2023–2035', induction: 2032,
        status: 'DELAYED', specs: ['6 conventional submarines', 'AIP propulsion', 'Vertical launch system'],
        fullSpecs: ['Displacement: 3,000+ tonnes', 'AIP: Fuel cell based', 'VLS for BrahMos', 'Range: 8,000+ nm', 'Endurance: 50+ days', 'Torpedo tubes: 533mm'],
        milestones: [{ year: 2023, event: 'RFP issued' }, { year: 2025, event: 'Vendor selection' }, { year: 2028, event: 'First hull laid' }, { year: 2032, event: 'First boat delivery' }, { year: 2035, event: 'All 6 delivered' }],
        contractors: ['MDL/L&T (Shortlisted)', 'Navantia/TKMS (Technology)', 'DRDO (AIP)', 'BEL (Combat System)'],
        challenges: ['Technology transfer negotiations', 'AIP integration complexity', 'Cost overrun risk at ₹43,000 Cr'],
        strategicImportance: 10
    },
    {
        id: 'P010', name: 'IAC-2 (Aircraft Carrier)', org: 'MDL', type: 'Naval', icon: Ship,
        phase: 0, budget: '₹50,000 Cr', timeline: '2025–2037', induction: 2037,
        status: 'ON TRACK', specs: ['65,000-ton CATOBAR carrier', 'EMALS catapult', 'Nuclear propulsion (proposed)'],
        fullSpecs: ['Displacement: 65,000 tonnes', 'CATOBAR configuration', 'EMALS catapult system', 'Air wing: 40+ aircraft', 'Nuclear propulsion under evaluation', 'Integrated electric propulsion'],
        milestones: [{ year: 2025, event: 'Detailed design begins' }, { year: 2028, event: 'Steel cutting' }, { year: 2032, event: 'Hull launch' }, { year: 2035, event: 'Sea trials' }, { year: 2037, event: 'Commissioning' }],
        contractors: ['Cochin Shipyard (Prime)', 'DRDO (EMALS R&D)', 'HAL (Air wing)', 'BEL (Combat Management)'],
        challenges: ['EMALS technology maturation', 'Nuclear propulsion decision pending', 'Massive budget requirement'],
        strategicImportance: 10
    },
    {
        id: 'P011', name: 'Project 17A (Frigates)', org: 'MDL', type: 'Naval', icon: Ship,
        phase: 4, budget: '₹45,000 Cr', timeline: '2017–2026', induction: 2024,
        status: 'ON TRACK', specs: ['7 stealth frigates', '6,670 tonnes', 'BrahMos & Barak-8 armed'],
        fullSpecs: ['Displacement: 6,670 tonnes', 'Speed: 28 knots', 'BrahMos Block III', 'Barak-8 SAM', 'RAN-40L 3D radar', 'Integrated stealth features'],
        milestones: [{ year: 2017, event: 'First hull laid' }, { year: 2022, event: 'INS Nilgiri launched' }, { year: 2024, event: 'First ship commissioned' }, { year: 2026, event: 'All 7 delivered' }],
        contractors: ['MDL (4 ships)', 'GRSE (3 ships)', 'BEL (Combat System)', 'BrahMos Aerospace'],
        challenges: ['Concurrent build across two yards', 'Equipment delivery coordination', 'Propulsion system integration'],
        strategicImportance: 8
    },
    {
        id: 'P012', name: 'Next-Gen Destroyer (Visakhapatnam)', org: 'MDL', type: 'Naval', icon: Ship,
        phase: 4, budget: '₹35,000 Cr', timeline: '2014–2026', induction: 2024,
        status: 'ON TRACK', specs: ['P15B stealth destroyers', '7,400 tonnes', '32 Barak-8 VLS cells'],
        fullSpecs: ['Displacement: 7,400 tonnes', 'Speed: 30 knots', '32 Barak-8 ER cells', 'BrahMos launchers', 'Indigenous CMS', 'Total atmospheric control'],
        milestones: [{ year: 2014, event: 'Lead ship laid down' }, { year: 2021, event: 'INS Visakhapatnam commissioned' }, { year: 2023, event: 'INS Mormugao commissioned' }, { year: 2025, event: 'INS Imphal commissioned' }, { year: 2026, event: 'INS Surat delivery' }],
        contractors: ['MDL (Prime)', 'BEL (Radar & EW)', 'BrahMos Aerospace', 'IAI (Barak-8)', 'Zorya-Mashproekt (Gas turbines)'],
        challenges: ['Gas turbine import dependency', 'Last ship delivery timeline', 'Crew training pipeline'],
        strategicImportance: 9
    },
    {
        id: 'P013', name: 'FICV (Infantry Combat Vehicle)', org: 'DRDO', type: 'Land', icon: Truck,
        phase: 1, budget: '₹60,000 Cr', timeline: '2024–2035', induction: 2032,
        status: 'DELAYED', specs: ['Next-gen ICV for Indian Army', '2,600+ vehicles planned', 'Modular armor'],
        fullSpecs: ['Weight: 25–30 tonnes', 'Crew: 3 + 7 dismounts', '30mm autocannon + ATGM', 'Active Protection System', 'Amphibious capability', 'NBC protection'],
        milestones: [{ year: 2024, event: 'RFI issued' }, { year: 2026, event: 'Vendor downselect' }, { year: 2028, event: 'Prototype trials' }, { year: 2031, event: 'Production begins' }, { year: 2035, event: 'Full order delivered' }],
        contractors: ['Tata Advanced Systems (Bidder)', 'L&T Defense (Bidder)', 'Mahindra Defence (Bidder)', 'DRDO (APS & Armor)'],
        challenges: ['Longest-delayed Army program', 'Requirements volatility', 'Budget at ₹60,000 Cr is largest Army order'],
        strategicImportance: 8
    },
    {
        id: 'P014', name: 'Zorawar Light Tank', org: 'DRDO', type: 'Land', icon: Crosshair,
        phase: 2, budget: '₹8,500 Cr', timeline: '2022–2028', induction: 2028,
        status: 'ON TRACK', specs: ['Light tank for high altitude', '25 tonnes', 'High-altitude ops optimized'],
        fullSpecs: ['Weight: 25 tonnes', '105mm or 120mm main gun', 'ATGM integration', 'Active protection suite', 'Operable at 15,000+ ft', 'C-17 air-transportable'],
        milestones: [{ year: 2022, event: 'Project approved' }, { year: 2024, event: 'Design freeze' }, { year: 2025, event: 'First prototype' }, { year: 2027, event: 'High-altitude trials' }, { year: 2028, event: 'Induction planned' }],
        contractors: ['L&T Defense (Prime)', 'DRDO/CVRDE (Design)', 'BEL (FCS)', 'Bharat Forge (Turret)'],
        challenges: ['High-altitude performance validation', 'Weight vs protection trade-off', 'LAC deployment logistics'],
        strategicImportance: 9
    },
    {
        id: 'P015', name: 'ATAGS (Artillery Gun System)', org: 'DRDO', type: 'Land', icon: Target,
        phase: 4, budget: '₹3,400 Cr', timeline: '2013–2026', induction: 2026,
        status: 'ON TRACK', specs: ['155mm/52 cal towed howitzer', 'Longest range in class', '48 km range'],
        fullSpecs: ['Caliber: 155mm/52 cal', 'Range: 48 km (world record in class)', 'Rate of fire: 5 rpm', 'All-electric drive', 'Automated loading assist', 'Fire control with GPS/INS'],
        milestones: [{ year: 2013, event: 'Development started' }, { year: 2017, event: 'First firing tests' }, { year: 2021, event: 'User trials complete' }, { year: 2024, event: 'Bulk production ordered (400)' }, { year: 2026, event: 'Full induction' }],
        contractors: ['DRDO/ARDE (Design)', 'Bharat Forge (Production)', 'Tata Advanced Systems (Production)', 'BEL (Fire Control)'],
        challenges: ['Dual production line coordination', 'Ammunition supply chain', 'Weight reduction for mobility'],
        strategicImportance: 7
    },
    {
        id: 'P016', name: 'Mission Shakti-II (ASAT)', org: 'DRDO', type: 'Space/Cyber', icon: Satellite,
        phase: 2, budget: '₹3,000 Cr', timeline: '2020–2028', induction: 2028,
        status: 'ON TRACK', specs: ['Next-gen ASAT weapon', 'Co-orbital & direct ascent', 'Debris-minimized kill'],
        fullSpecs: ['Direct ascent: PDV Mk-III', 'Co-orbital: Robotic interceptor', 'Directed Energy (R&D phase)', 'Cyber-ASAT capability', 'Range: LEO to GEO capable'],
        milestones: [{ year: 2019, event: 'Mission Shakti (PDV Mk-II) success' }, { year: 2020, event: 'Shakti-II concept' }, { year: 2023, event: 'Co-orbital vehicle design' }, { year: 2026, event: 'PDV Mk-III test planned' }, { year: 2028, event: 'Full capability' }],
        contractors: ['DRDO/ASL (Prime)', 'ISRO (Launch support)', 'BEL (Tracking)', 'LRDE (Radar)'],
        challenges: ['International debris mitigation norms', 'GEO intercept complexity', 'Directed energy power requirements'],
        strategicImportance: 9
    },
    {
        id: 'P017', name: 'Quantum Key Distribution', org: 'DRDO', type: 'Space/Cyber', icon: BrainCircuit,
        phase: 1, budget: '₹1,200 Cr', timeline: '2023–2030', induction: 2030,
        status: 'ON TRACK', specs: ['Quantum-secure military comms', 'QKD over fiber & satellite', 'Unhackable encryption'],
        fullSpecs: ['Protocol: BB84 + Decoy state', 'Fiber QKD: 200 km demonstrated', 'Satellite QKD: In development', 'Key rate: 10 kbps @ 100 km', 'Integration with military C4ISR'],
        milestones: [{ year: 2023, event: 'Lab demonstration' }, { year: 2025, event: 'Field trial (100 km fiber)' }, { year: 2027, event: 'Satellite QKD experiment' }, { year: 2029, event: 'Network deployment' }, { year: 2030, event: 'Full operational capability' }],
        contractors: ['DRDO/DYSL-QT (Prime)', 'IIT Delhi (Research)', 'C-DOT (Network)', 'ISRO (Satellite payload)'],
        challenges: ['Photon loss over long distances', 'Satellite integration complexity', 'Scaling to operational networks'],
        strategicImportance: 8
    },
    {
        id: 'P018', name: 'AI Combat Systems', org: 'DRDO', type: 'Space/Cyber', icon: Cpu,
        phase: 1, budget: '₹2,500 Cr', timeline: '2022–2030', induction: 2030,
        status: 'ON TRACK', specs: ['AI for battlefield decision support', 'Autonomous swarm control', 'Predictive threat analysis'],
        fullSpecs: ['Autonomous drone swarms', 'AI-driven fire control', 'Predictive maintenance AI', 'Natural language C2 interface', 'Adversarial ML defense', 'Real-time ISR fusion'],
        milestones: [{ year: 2022, event: 'AI Task Force formed' }, { year: 2024, event: 'Swarm demo (75 drones)' }, { year: 2026, event: 'AI fire control integration' }, { year: 2028, event: 'Field trials with Army' }, { year: 2030, event: 'Full deployment' }],
        contractors: ['DRDO/CAIR (Prime)', 'IIT Bombay (ML Research)', 'TCS/Infosys (Software)', 'BEL (Hardware integration)'],
        challenges: ['AI ethics & autonomous weapons debate', 'Training data for Indian battlefield', 'Latency in real-time combat AI'],
        strategicImportance: 9
    }
];

const BUDGET_DATA = {
    totalBudget: '₹1,18,000 Cr',
    rdBudget: '₹23,855 Cr',
    selfRelianceIndex: 75,
    yoyGrowth: 12.8,
    orgAllocation: [
        { org: 'DRDO', amount: 23855, percentage: 38 },
        { org: 'HAL', amount: 15200, percentage: 24 },
        { org: 'MDL', amount: 8900, percentage: 14 },
        { org: 'BEL', amount: 5600, percentage: 9 },
        { org: 'BDL', amount: 3200, percentage: 5 },
        { org: 'GRSE', amount: 2800, percentage: 4 },
        { org: 'L&T Defense', amount: 3445, percentage: 6 }
    ]
};

const STATUS_COLORS = {
    'ON TRACK': { bg: 'rgba(52, 211, 153, 0.15)', border: '#34D399', text: '#34D399' },
    'DELAYED': { bg: 'rgba(251, 191, 36, 0.15)', border: '#FBBF24', text: '#FBBF24' },
    'CRITICAL': { bg: 'rgba(220, 38, 38, 0.15)', border: '#DC2626', text: '#F87171' },
    'COMPLETED': { bg: 'rgba(0, 255, 204, 0.15)', border: '#00FFCC', text: '#00FFCC' }
};

const TYPE_ICONS = {
    'Aircraft': Plane,
    'Missile': Rocket,
    'Naval': Ship,
    'Land': Shield,
    'Space/Cyber': Satellite
};

const ORG_COLORS = {
    'DRDO': '#00FFCC',
    'HAL': '#60A5FA',
    'BEL': '#A78BFA',
    'BDL': '#F87171',
    'MDL': '#FBBF24',
    'GRSE': '#34D399',
    'L&T Defense': '#f472b6'
};

const DefenseProjects = ({ onBack }) => {
    const [selectedOrg, setSelectedOrg] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);
    const [animatedPhases, setAnimatedPhases] = useState({});
    const [showBudgetPanel, setShowBudgetPanel] = useState(false);
    const [selfRelianceAnimated, setSelfRelianceAnimated] = useState(0);

    const filteredProjects = selectedOrg === 'All'
        ? PROJECTS
        : PROJECTS.filter(p => p.org === selectedOrg);

    const stats = {
        active: PROJECTS.filter(p => p.status !== 'COMPLETED').length,
        totalBudget: '₹3,05,855 Cr',
        selfReliance: BUDGET_DATA.selfRelianceIndex,
        onTrack: PROJECTS.filter(p => p.status === 'ON TRACK').length,
        delayed: PROJECTS.filter(p => p.status === 'DELAYED').length,
        completed: PROJECTS.filter(p => p.status === 'COMPLETED').length
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            const phases = {};
            PROJECTS.forEach(p => { phases[p.id] = p.phase; });
            setAnimatedPhases(phases);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        let frame;
        let start;
        const target = BUDGET_DATA.selfRelianceIndex;
        const duration = 1500;
        const animate = (ts) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            setSelfRelianceAnimated(Math.round(progress * target));
            if (progress < 1) frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, []);

    const handleProjectClick = useCallback((project) => {
        setSelectedProject(prev => prev?.id === project.id ? null : project);
    }, []);

    const renderPhaseBar = (projectId, currentPhase) => {
        const animated = animatedPhases[projectId] ?? 0;
        return (
            <div style={{ display: 'flex', gap: '3px', alignItems: 'center', width: '100%' }}>
                {PHASES.map((phase, i) => {
                    const isActive = i === currentPhase;
                    const isComplete = i < animated;
                    const isFuture = i > animated;
                    return (
                        <div key={phase} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: i * 0.08, duration: 0.3 }}
                                style={{
                                    width: '100%',
                                    height: '6px',
                                    borderRadius: '3px',
                                    background: isComplete ? '#00FFCC' : isActive ? '#FBBF24' : 'rgba(255,255,255,0.1)',
                                    boxShadow: isActive ? '0 0 8px rgba(251, 191, 36, 0.5)' : isComplete ? '0 0 6px rgba(0, 255, 204, 0.3)' : 'none',
                                    transformOrigin: 'left'
                                }}
                            />
                            <span style={{
                                fontSize: '8px',
                                fontFamily: 'JetBrains Mono, monospace',
                                color: isActive ? '#FBBF24' : isComplete ? '#00FFCC' : isFuture ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.5)',
                                fontWeight: isActive ? 700 : 400,
                                whiteSpace: 'nowrap'
                            }}>
                                {phase}
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderProjectDetail = (project) => (
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
        >
            <div style={{
                padding: '20px',
                background: 'rgba(0, 255, 204, 0.03)',
                borderTop: '1px solid rgba(0, 255, 204, 0.1)',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px'
            }}>
                <div>
                    <h4 style={{ fontFamily: 'Orbitron, monospace', fontSize: '11px', color: '#00FFCC', marginBottom: '10px', letterSpacing: '1px' }}>
                        FULL SPECIFICATIONS
                    </h4>
                    {project.fullSpecs.map((spec, i) => (
                        <div key={i} style={{
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '11px',
                            color: 'rgba(255,255,255,0.8)',
                            padding: '3px 0',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}>
                            <CircleDot size={8} color="#00FFCC" />
                            {spec}
                        </div>
                    ))}
                </div>

                <div>
                    <h4 style={{ fontFamily: 'Orbitron, monospace', fontSize: '11px', color: '#60A5FA', marginBottom: '10px', letterSpacing: '1px' }}>
                        DEVELOPMENT MILESTONES
                    </h4>
                    <div style={{ position: 'relative', paddingLeft: '16px' }}>
                        <div style={{
                            position: 'absolute', left: '5px', top: '4px', bottom: '4px',
                            width: '2px', background: 'linear-gradient(180deg, #00FFCC, rgba(0,255,204,0.1))'
                        }} />
                        {project.milestones.map((ms, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '8px', position: 'relative' }}>
                                <div style={{
                                    position: 'absolute', left: '-14px', top: '4px',
                                    width: '8px', height: '8px', borderRadius: '50%',
                                    background: ms.year <= 2026 ? '#00FFCC' : 'rgba(255,255,255,0.3)',
                                    border: ms.year <= 2026 ? '2px solid #00FFCC' : '2px solid rgba(255,255,255,0.2)',
                                    boxShadow: ms.year <= 2026 ? '0 0 6px rgba(0,255,204,0.4)' : 'none'
                                }} />
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#FBBF24', minWidth: '36px' }}>{ms.year}</span>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>{ms.event}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 style={{ fontFamily: 'Orbitron, monospace', fontSize: '11px', color: '#A78BFA', marginBottom: '10px', letterSpacing: '1px' }}>
                        KEY CONTRACTORS & PARTNERS
                    </h4>
                    {project.contractors.map((c, i) => (
                        <div key={i} style={{
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '11px',
                            color: 'rgba(255,255,255,0.7)',
                            padding: '4px 8px',
                            marginBottom: '4px',
                            background: 'rgba(167, 139, 250, 0.08)',
                            borderRadius: '4px',
                            borderLeft: '2px solid rgba(167, 139, 250, 0.3)'
                        }}>
                            <Users size={10} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} color="#A78BFA" />
                            {c}
                        </div>
                    ))}
                </div>

                <div>
                    <h4 style={{ fontFamily: 'Orbitron, monospace', fontSize: '11px', color: '#F87171', marginBottom: '10px', letterSpacing: '1px' }}>
                        CHALLENGES & RISKS
                    </h4>
                    {project.challenges.map((ch, i) => (
                        <div key={i} style={{
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '11px',
                            color: 'rgba(255,255,255,0.7)',
                            padding: '4px 8px',
                            marginBottom: '4px',
                            background: 'rgba(248, 113, 113, 0.08)',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}>
                            <AlertTriangle size={10} color="#F87171" />
                            {ch}
                        </div>
                    ))}

                    <div style={{ marginTop: '16px' }}>
                        <h4 style={{ fontFamily: 'Orbitron, monospace', fontSize: '11px', color: '#FBBF24', marginBottom: '8px', letterSpacing: '1px' }}>
                            STRATEGIC IMPORTANCE
                        </h4>
                        <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
                            {Array.from({ length: 10 }).map((_, i) => (
                                <Star
                                    key={i}
                                    size={14}
                                    color={i < project.strategicImportance ? '#FBBF24' : 'rgba(255,255,255,0.15)'}
                                    fill={i < project.strategicImportance ? '#FBBF24' : 'transparent'}
                                />
                            ))}
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#FBBF24', marginLeft: '8px' }}>
                                {project.strategicImportance}/10
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                background: 'linear-gradient(135deg, #020617 0%, #0a0a1a 50%, #020617 100%)',
                zIndex: 9999, overflow: 'hidden', display: 'flex', flexDirection: 'column'
            }}
        >
            <div style={{
                padding: '16px 24px',
                borderBottom: '1px solid rgba(0, 255, 204, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(0, 255, 204, 0.03)',
                flexShrink: 0
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onBack}
                        style={{
                            background: 'rgba(0, 255, 204, 0.1)',
                            border: '1px solid rgba(0, 255, 204, 0.3)',
                            borderRadius: '8px',
                            padding: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <ArrowLeft size={18} color="#00FFCC" />
                    </motion.button>
                    <div>
                        <h1 style={{
                            fontFamily: 'Orbitron, monospace',
                            fontSize: '18px',
                            color: '#00FFCC',
                            letterSpacing: '3px',
                            margin: 0,
                            textShadow: '0 0 20px rgba(0, 255, 204, 0.3)'
                        }}>
                            INDIGENOUS DEFENSE PROJECTS — MAKE IN INDIA
                        </h1>
                        <div style={{
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '11px',
                            color: 'rgba(255,255,255,0.5)',
                            marginTop: '4px',
                            display: 'flex',
                            gap: '16px'
                        }}>
                            <span>{PROJECTS.length} Projects Tracked</span>
                            <span>|</span>
                            <span>Budget Allocation: {BUDGET_DATA.totalBudget}</span>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowBudgetPanel(!showBudgetPanel)}
                        style={{
                            background: showBudgetPanel ? 'rgba(0, 255, 204, 0.2)' : 'rgba(0, 255, 204, 0.08)',
                            border: '1px solid rgba(0, 255, 204, 0.3)',
                            borderRadius: '8px',
                            padding: '8px 16px',
                            cursor: 'pointer',
                            fontFamily: 'Orbitron, monospace',
                            fontSize: '10px',
                            color: '#00FFCC',
                            letterSpacing: '1px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <IndianRupee size={14} />
                        BUDGET OVERVIEW
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onBack}
                        style={{
                            background: 'rgba(220, 38, 38, 0.1)',
                            border: '1px solid rgba(220, 38, 38, 0.3)',
                            borderRadius: '8px',
                            padding: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <X size={18} color="#F87171" />
                    </motion.button>
                </div>
            </div>

            <div style={{
                display: 'flex',
                gap: '8px',
                padding: '12px 24px',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                flexShrink: 0,
                flexWrap: 'wrap'
            }}>
                {ORGANIZATIONS.map(org => (
                    <motion.button
                        key={org}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedOrg(org)}
                        style={{
                            padding: '6px 16px',
                            borderRadius: '6px',
                            border: selectedOrg === org
                                ? `1px solid ${org === 'All' ? '#00FFCC' : (ORG_COLORS[org] || '#00FFCC')}`
                                : '1px solid rgba(255,255,255,0.1)',
                            background: selectedOrg === org
                                ? `${org === 'All' ? 'rgba(0,255,204,0.15)' : `${ORG_COLORS[org] || '#00FFCC'}25`}`
                                : 'rgba(255,255,255,0.03)',
                            color: selectedOrg === org
                                ? (org === 'All' ? '#00FFCC' : (ORG_COLORS[org] || '#00FFCC'))
                                : 'rgba(255,255,255,0.5)',
                            fontFamily: 'Orbitron, monospace',
                            fontSize: '10px',
                            letterSpacing: '1px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {org}
                    </motion.button>
                ))}
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: '1px',
                padding: '0 24px',
                margin: '12px 0',
                flexShrink: 0,
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '8px',
                marginLeft: '24px',
                marginRight: showBudgetPanel ? '340px' : '24px',
                transition: 'margin-right 0.3s ease'
            }}>
                {[
                    { label: 'PROJECTS ACTIVE', value: stats.active, icon: Activity, color: '#00FFCC' },
                    { label: 'TOTAL BUDGET', value: stats.totalBudget, icon: IndianRupee, color: '#FBBF24' },
                    { label: 'SELF-RELIANCE', value: `${selfRelianceAnimated}%`, icon: Gauge, color: '#60A5FA' },
                    { label: 'ON TRACK', value: stats.onTrack, icon: CheckCircle, color: '#34D399' },
                    { label: 'DELAYED', value: stats.delayed, icon: Clock, color: '#FBBF24' },
                    { label: 'COMPLETED', value: stats.completed, icon: Hexagon, color: '#A78BFA' }
                ].map((stat, i) => {
                    const StatIcon = stat.icon;
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            style={{
                                padding: '12px 16px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                background: 'rgba(0,0,0,0.2)',
                                borderRadius: i === 0 ? '8px 0 0 8px' : i === 5 ? '0 8px 8px 0' : '0'
                            }}
                        >
                            <StatIcon size={18} color={stat.color} />
                            <div>
                                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '8px', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px' }}>
                                    {stat.label}
                                </div>
                                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '16px', color: stat.color, fontWeight: 700 }}>
                                    {stat.value}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div style={{
                flex: 1,
                overflow: 'auto',
                padding: '0 24px 24px',
                display: 'flex',
                gap: '0',
                position: 'relative'
            }}>
                <div style={{
                    flex: 1,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))',
                    gap: '12px',
                    alignContent: 'start',
                    marginRight: showBudgetPanel ? '316px' : '0',
                    transition: 'margin-right 0.3s ease'
                }}>
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => {
                            const TypeIcon = TYPE_ICONS[project.type] || Shield;
                            const statusStyle = STATUS_COLORS[project.status] || STATUS_COLORS['ON TRACK'];
                            const isSelected = selectedProject?.id === project.id;

                            return (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: index * 0.03, duration: 0.25 }}
                                    onClick={() => handleProjectClick(project)}
                                    style={{
                                        background: isSelected
                                            ? 'linear-gradient(135deg, rgba(0, 255, 204, 0.08), rgba(0, 255, 204, 0.02))'
                                            : 'rgba(255,255,255,0.02)',
                                        border: isSelected
                                            ? '1px solid rgba(0, 255, 204, 0.3)'
                                            : '1px solid rgba(255,255,255,0.06)',
                                        borderRadius: '10px',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        transition: 'border-color 0.2s ease'
                                    }}
                                    whileHover={{ borderColor: 'rgba(0, 255, 204, 0.25)' }}
                                >
                                    <div style={{ padding: '16px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                                                <div style={{
                                                    width: '40px', height: '40px',
                                                    borderRadius: '8px',
                                                    background: `${ORG_COLORS[project.org] || '#00FFCC'}15`,
                                                    border: `1px solid ${ORG_COLORS[project.org] || '#00FFCC'}40`,
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    flexShrink: 0
                                                }}>
                                                    <TypeIcon size={18} color={ORG_COLORS[project.org] || '#00FFCC'} />
                                                </div>
                                                <div style={{ minWidth: 0 }}>
                                                    <div style={{
                                                        fontFamily: 'Orbitron, monospace',
                                                        fontSize: '12px',
                                                        color: '#fff',
                                                        letterSpacing: '0.5px',
                                                        lineHeight: 1.3
                                                    }}>
                                                        {project.name}
                                                    </div>
                                                    <div style={{
                                                        fontFamily: 'JetBrains Mono, monospace',
                                                        fontSize: '10px',
                                                        color: ORG_COLORS[project.org] || '#00FFCC',
                                                        marginTop: '2px'
                                                    }}>
                                                        {project.org} • {project.type}
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{
                                                padding: '3px 8px',
                                                borderRadius: '4px',
                                                background: statusStyle.bg,
                                                border: `1px solid ${statusStyle.border}40`,
                                                fontFamily: 'JetBrains Mono, monospace',
                                                fontSize: '9px',
                                                color: statusStyle.text,
                                                fontWeight: 600,
                                                letterSpacing: '0.5px',
                                                whiteSpace: 'nowrap',
                                                flexShrink: 0
                                            }}>
                                                {project.status}
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: '12px' }}>
                                            {renderPhaseBar(project.id, project.phase)}
                                        </div>

                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: '1fr 1fr 1fr',
                                            gap: '8px',
                                            marginBottom: '10px'
                                        }}>
                                            <div>
                                                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '8px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.5px' }}>BUDGET</div>
                                                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#FBBF24' }}>{project.budget}</div>
                                            </div>
                                            <div>
                                                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '8px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.5px' }}>TIMELINE</div>
                                                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>{project.timeline}</div>
                                            </div>
                                            <div>
                                                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '8px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.5px' }}>INDUCTION</div>
                                                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#60A5FA' }}>{project.induction}</div>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                            {project.specs.map((spec, i) => (
                                                <div key={i} style={{
                                                    fontFamily: 'JetBrains Mono, monospace',
                                                    fontSize: '10px',
                                                    color: 'rgba(255,255,255,0.5)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '6px'
                                                }}>
                                                    <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(0, 255, 204, 0.5)', flexShrink: 0 }} />
                                                    {spec}
                                                </div>
                                            ))}
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-end',
                                            marginTop: '10px',
                                            gap: '4px',
                                            fontFamily: 'JetBrains Mono, monospace',
                                            fontSize: '9px',
                                            color: 'rgba(0, 255, 204, 0.5)'
                                        }}>
                                            {isSelected ? 'COLLAPSE' : 'EXPAND DETAILS'}
                                            {isSelected ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {isSelected && renderProjectDetail(project)}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                <AnimatePresence>
                    {showBudgetPanel && (
                        <motion.div
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 300, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            style={{
                                position: 'fixed',
                                right: 0,
                                top: 0,
                                bottom: 0,
                                width: '320px',
                                background: 'linear-gradient(180deg, rgba(2, 6, 23, 0.98), rgba(10, 10, 26, 0.98))',
                                borderLeft: '1px solid rgba(0, 255, 204, 0.15)',
                                padding: '24px 20px',
                                overflowY: 'auto',
                                zIndex: 10000,
                                backdropFilter: 'blur(20px)'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: '13px', color: '#00FFCC', letterSpacing: '2px', margin: 0 }}>
                                    BUDGET OVERVIEW
                                </h3>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setShowBudgetPanel(false)}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                                >
                                    <X size={16} color="rgba(255,255,255,0.5)" />
                                </motion.button>
                            </div>

                            <div style={{
                                padding: '16px',
                                background: 'rgba(0, 255, 204, 0.05)',
                                borderRadius: '8px',
                                border: '1px solid rgba(0, 255, 204, 0.1)',
                                marginBottom: '20px'
                            }}>
                                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '9px', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', marginBottom: '4px' }}>
                                    TOTAL DEFENSE R&D BUDGET
                                </div>
                                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '22px', color: '#00FFCC', fontWeight: 700 }}>
                                    {BUDGET_DATA.rdBudget}
                                </div>
                                <div style={{
                                    fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
                                    color: '#34D399', marginTop: '8px',
                                    display: 'flex', alignItems: 'center', gap: '4px'
                                }}>
                                    <TrendingUp size={12} />
                                    +{BUDGET_DATA.yoyGrowth}% YoY Growth
                                </div>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.5)', letterSpacing: '1px', marginBottom: '12px' }}>
                                    ALLOCATION BY ORGANIZATION
                                </div>
                                {BUDGET_DATA.orgAllocation.map((item, i) => (
                                    <div key={item.org} style={{ marginBottom: '10px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: ORG_COLORS[item.org] || '#fff' }}>
                                                {item.org}
                                            </span>
                                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>
                                                ₹{item.amount.toLocaleString()} Cr ({item.percentage}%)
                                            </span>
                                        </div>
                                        <div style={{
                                            width: '100%', height: '6px',
                                            background: 'rgba(255,255,255,0.05)',
                                            borderRadius: '3px',
                                            overflow: 'hidden'
                                        }}>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${item.percentage}%` }}
                                                transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: 'easeOut' }}
                                                style={{
                                                    height: '100%',
                                                    background: ORG_COLORS[item.org] || '#00FFCC',
                                                    borderRadius: '3px',
                                                    boxShadow: `0 0 8px ${ORG_COLORS[item.org] || '#00FFCC'}40`
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{
                                padding: '16px',
                                background: 'rgba(96, 165, 250, 0.05)',
                                borderRadius: '8px',
                                border: '1px solid rgba(96, 165, 250, 0.1)',
                                marginBottom: '20px'
                            }}>
                                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '9px', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', marginBottom: '8px' }}>
                                    SELF-RELIANCE INDEX
                                </div>
                                <div style={{ position: 'relative', width: '100%', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <svg width="120" height="80" viewBox="0 0 120 80">
                                        <path
                                            d="M 10 70 A 50 50 0 0 1 110 70"
                                            fill="none"
                                            stroke="rgba(255,255,255,0.08)"
                                            strokeWidth="8"
                                            strokeLinecap="round"
                                        />
                                        <motion.path
                                            d="M 10 70 A 50 50 0 0 1 110 70"
                                            fill="none"
                                            stroke="#60A5FA"
                                            strokeWidth="8"
                                            strokeLinecap="round"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: BUDGET_DATA.selfRelianceIndex / 100 }}
                                            transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
                                        />
                                    </svg>
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '4px',
                                        fontFamily: 'JetBrains Mono, monospace',
                                        fontSize: '24px',
                                        fontWeight: 700,
                                        color: '#60A5FA'
                                    }}>
                                        {selfRelianceAnimated}%
                                    </div>
                                </div>
                                <div style={{
                                    fontFamily: 'JetBrains Mono, monospace',
                                    fontSize: '10px',
                                    color: 'rgba(255,255,255,0.4)',
                                    textAlign: 'center',
                                    marginTop: '4px'
                                }}>
                                    Target: 80% by 2028
                                </div>
                            </div>

                            <div style={{
                                padding: '16px',
                                background: 'rgba(251, 191, 36, 0.05)',
                                borderRadius: '8px',
                                border: '1px solid rgba(251, 191, 36, 0.1)'
                            }}>
                                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '9px', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', marginBottom: '12px' }}>
                                    YEAR-OVER-YEAR GROWTH
                                </div>
                                {[
                                    { year: 'FY 2023-24', growth: 9.5, budget: '₹18,400 Cr' },
                                    { year: 'FY 2024-25', growth: 11.2, budget: '₹20,460 Cr' },
                                    { year: 'FY 2025-26', growth: 12.8, budget: '₹23,855 Cr' },
                                ].map((yr, i) => (
                                    <div key={yr.year} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>
                                            {yr.year}
                                        </span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>
                                                {yr.budget}
                                            </span>
                                            <span style={{
                                                fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
                                                color: '#34D399',
                                                display: 'flex', alignItems: 'center', gap: '2px'
                                            }}>
                                                <TrendingUp size={10} />
                                                +{yr.growth}%
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default DefenseProjects;
