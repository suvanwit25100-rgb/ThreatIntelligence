import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Shield, Anchor, Plane, Target, AlertTriangle, Lock,
    Radio, MapPin, Users, Zap, ChevronRight, Activity,
    Eye, Crosshair, Navigation, Bomb, Award, Star,
    CheckCircle, XCircle, Clock, Send, Fingerprint,
    Scan, Mic, UserCheck, Globe, Wifi, VideoIcon
} from 'lucide-react';

const BRANCHES = {
    ARMY: 'army',
    AIRFORCE: 'airforce',
    NAVY: 'navy',
    PRESIDENTIAL: 'presidential'
};

const READINESS_LEVELS = {
    DEFCON1: { label: 'DEFCON 1', color: '#DC2626', desc: 'Maximum Force Readiness — Nuclear War Imminent' },
    DEFCON2: { label: 'DEFCON 2', color: '#F87171', desc: 'Armed Forces Ready to Deploy in 6 Hours' },
    DEFCON3: { label: 'DEFCON 3', color: '#FBBF24', desc: 'Air Force Ready to Mobilize in 15 Minutes' },
    DEFCON4: { label: 'DEFCON 4', color: '#34D399', desc: 'Increased Intelligence & Strengthened Security' },
    DEFCON5: { label: 'DEFCON 5', color: '#00FFCC', desc: 'Normal Peacetime Readiness' }
};

const MISSILE_TYPES = [
    { id: 'AGNI-V', name: 'Agni-V ICBM', range: '5,000–8,000 km', speed: 'Mach 24', warhead: 'Nuclear / Conventional (1,500 kg)', cep: '10m', flightTime: 1800, category: 'ICBM' },
    { id: 'AGNI-IV', name: 'Agni-IV IRBM', range: '3,500–4,000 km', speed: 'Mach 20', warhead: 'Nuclear / Conventional (1,000 kg)', cep: '15m', flightTime: 1200, category: 'IRBM' },
    { id: 'AGNI-P', name: 'Agni-P (Canister)', range: '1,000–2,000 km', speed: 'Mach 15', warhead: 'Nuclear / MIRV Capable (1,500 kg)', cep: '10m', flightTime: 600, category: 'MRBM' },
    { id: 'BRAHMOS', name: 'BrahMos Cruise', range: '290–500 km', speed: 'Mach 2.8', warhead: 'Conventional (200–300 kg)', cep: '1m', flightTime: 180, category: 'CRUISE' },
    { id: 'BRAHMOS-II', name: 'BrahMos-II Hypersonic', range: '600 km', speed: 'Mach 7', warhead: 'Conventional (300 kg)', cep: '1m', flightTime: 120, category: 'HYPERSONIC' },
    { id: 'PRITHVI-II', name: 'Prithvi-II SRBM', range: '250–350 km', speed: 'Mach 5', warhead: 'Nuclear / Conventional (500–1,000 kg)', cep: '25m', flightTime: 120, category: 'SRBM' },
    { id: 'SHAURYA', name: 'Shaurya Hypersonic', range: '700–1,900 km', speed: 'Mach 7.5', warhead: 'Nuclear / Conventional (1,000 kg)', cep: '20m', flightTime: 400, category: 'HYPERSONIC' },
    { id: 'NIRBHAY', name: 'Nirbhay LACM', range: '1,000–1,500 km', speed: 'Mach 0.7', warhead: 'Conventional / Nuclear (300 kg)', cep: '5m', flightTime: 3600, category: 'CRUISE' },
    { id: 'PINAKA', name: 'Pinaka Mk.II MLRS', range: '60–75 km', speed: 'Mach 3', warhead: 'HE / Cluster (100 kg)', cep: '30m', flightTime: 45, category: 'MLRS' },
    { id: 'K4-SLBM', name: 'K-4 SLBM (Sub-launched)', range: '3,500 km', speed: 'Mach 20', warhead: 'Nuclear (2,000 kg)', cep: '15m', flightTime: 1000, category: 'SLBM' }
];

const TARGET_LOCATIONS = [
    { id: 'TGT-001', name: 'Sargodha Air Base', country: 'Pakistan', coords: [72.67, 32.05], type: 'AIR BASE', priority: 'HIGH' },
    { id: 'TGT-002', name: 'Kamra Aviation Complex', country: 'Pakistan', coords: [72.40, 33.87], type: 'MILITARY INDUSTRY', priority: 'HIGH' },
    { id: 'TGT-003', name: 'Kahuta Research Labs', country: 'Pakistan', coords: [73.38, 33.60], type: 'NUCLEAR FACILITY', priority: 'CRITICAL' },
    { id: 'TGT-004', name: 'Gwadar Port', country: 'Pakistan', coords: [62.33, 25.12], type: 'NAVAL BASE', priority: 'MEDIUM' },
    { id: 'TGT-005', name: 'Aksai Chin Forward Base', country: 'China', coords: [79.50, 35.20], type: 'FORWARD BASE', priority: 'HIGH' },
    { id: 'TGT-006', name: 'Hotan Air Base', country: 'China', coords: [79.86, 37.04], type: 'AIR BASE', priority: 'MEDIUM' },
    { id: 'TGT-007', name: 'Lhasa Military Region HQ', country: 'China', coords: [91.13, 29.65], type: 'COMMAND CENTER', priority: 'HIGH' },
    { id: 'TGT-008', name: 'Coco Islands Radar', country: 'Myanmar', coords: [93.37, 14.10], type: 'SIGINT STATION', priority: 'MEDIUM' },
    { id: 'TGT-009', name: 'Custom Coordinates', country: 'Manual Entry', coords: [0, 0], type: 'CUSTOM', priority: 'VARIABLE' }
];

const RAW_ATTENDEES = [
    { name: 'R&AW Secretary', designation: 'Director — Research & Analysis Wing', status: 'OFFLINE', avatar: 'RS' },
    { name: 'NSA', designation: 'National Security Advisor', status: 'OFFLINE', avatar: 'NA' },
    { name: 'COAS', designation: 'Chief of Army Staff', status: 'OFFLINE', avatar: 'CA' },
    { name: 'CNS', designation: 'Chief of Naval Staff', status: 'OFFLINE', avatar: 'CN' },
    { name: 'CAS', designation: 'Chief of Air Staff', status: 'OFFLINE', avatar: 'AS' },
    { name: 'Cabinet Secretary', designation: 'Cabinet Secretariat', status: 'OFFLINE', avatar: 'CS' },
    { name: 'CDS', designation: 'Chief of Defence Staff', status: 'OFFLINE', avatar: 'CD' },
    { name: 'IB Director', designation: 'Intelligence Bureau', status: 'OFFLINE', avatar: 'IB' }
];

const armyData = {
    totalPersonnel: '1,460,000',
    activePersonnel: '1,237,000',
    reserves: '960,000',
    commands: [
        { name: 'Northern Command', hq: 'Udhampur', status: 'ACTIVE', troops: '280,000', area: 'J&K, Ladakh', threatLevel: 'HIGH' },
        { name: 'Western Command', hq: 'Chandimandir', status: 'ACTIVE', troops: '250,000', area: 'Punjab, Rajasthan', threatLevel: 'MEDIUM' },
        { name: 'South Western Command', hq: 'Jaipur', status: 'ACTIVE', troops: '180,000', area: 'Rajasthan, Gujarat', threatLevel: 'LOW' },
        { name: 'Southern Command', hq: 'Pune', status: 'ACTIVE', troops: '200,000', area: 'Maharashtra, Karnataka', threatLevel: 'LOW' },
        { name: 'Eastern Command', hq: 'Kolkata', status: 'ACTIVE', troops: '230,000', area: 'Eastern Theater, LAC', threatLevel: 'HIGH' },
        { name: 'Central Command', hq: 'Lucknow', status: 'ACTIVE', troops: '200,000', area: 'Central India, Reserve', threatLevel: 'LOW' },
        { name: 'Army Training Command', hq: 'Shimla', status: 'OPERATIONAL', troops: '97,000', area: 'Nationwide', threatLevel: 'LOW' }
    ],
    equipment: [
        { type: 'Main Battle Tanks', count: '4,614', models: ['T-90S Bhishma', 'Arjun Mk.II', 'T-72M1'] },
        { type: 'Infantry Fighting Vehicles', count: '2,600+', models: ['BMP-2 Sarath', 'FICV Program'] },
        { type: 'Artillery Systems', count: '11,000+', models: ['K9 Vajra', 'Dhanush', 'M777', 'Pinaka MLRS'] },
        { type: 'Air Defense Systems', count: '2,000+', models: ['Akash', 'S-400 Triumf', 'MRSAM'] },
        { type: 'Attack Helicopters', count: '80+', models: ['AH-64E Apache', 'HAL Rudra', 'HAL LCH Prachand'] },
        { type: 'Ballistic Missiles', count: '160+', models: ['Agni-V', 'Agni-IV', 'Prithvi-II', 'BrahMos'] }
    ],
    specialForces: ['Para (SF)', 'Ghatak Forces', 'Rashtriya Rifles', 'NSG', 'Marcos Integration Units'],
    currentOps: [
        { name: 'Op Meghdoot', region: 'Siachen Glacier', status: 'ONGOING', since: '1984' },
        { name: 'Op Rakshak', region: 'J&K Counter-Insurgency', status: 'ONGOING', since: '1990' },
        { name: 'Op Orchid', region: 'Northeast India', status: 'ACTIVE', since: '2020' },
        { name: 'Op Snow Leopard', region: 'Eastern Ladakh (LAC)', status: 'HIGH ALERT', since: '2020' }
    ]
};

const airforceData = {
    totalPersonnel: '170,000',
    aircraft: '1,700+',
    squadrons: '35+',
    commands: [
        { name: 'Western Air Command', hq: 'New Delhi', status: 'ACTIVE', squadrons: '12', coverage: 'Western Theater', threatLevel: 'HIGH' },
        { name: 'South Western Air Command', hq: 'Gandhinagar', status: 'ACTIVE', squadrons: '6', coverage: 'SW Border', threatLevel: 'MEDIUM' },
        { name: 'Central Air Command', hq: 'Prayagraj', status: 'ACTIVE', squadrons: '5', coverage: 'Central India', threatLevel: 'LOW' },
        { name: 'Eastern Air Command', hq: 'Shillong', status: 'ACTIVE', squadrons: '8', coverage: 'Eastern Theater, LAC', threatLevel: 'HIGH' },
        { name: 'Southern Air Command', hq: 'Thiruvananthapuram', status: 'ACTIVE', squadrons: '4', coverage: 'Southern Peninsula, IOR', threatLevel: 'LOW' },
        { name: 'Training Command', hq: 'Bengaluru', status: 'OPERATIONAL', squadrons: '-', coverage: 'Nationwide', threatLevel: 'LOW' },
        { name: 'Maintenance Command', hq: 'Nagpur', status: 'OPERATIONAL', squadrons: '-', coverage: 'Nationwide', threatLevel: 'LOW' }
    ],
    fleet: [
        { type: 'Air Superiority', count: '272', models: ['Rafale', 'Su-30MKI', 'MiG-29UPG'] },
        { type: 'Strike / Multi-role', count: '140+', models: ['Jaguar DARIN III', 'Mirage 2000-5', 'HAL Tejas Mk.1A'] },
        { type: 'Strategic Bombers', count: '12', models: ['Tu-160 (Planned)', 'Su-30MKI (Nuclear Role)'] },
        { type: 'Transport', count: '250+', models: ['C-17 Globemaster III', 'C-130J Super Hercules', 'An-32'] },
        { type: 'AWACS / AEW&C', count: '11', models: ['A-50 Phalcon', 'DRDO AEW&C Netra'] },
        { type: 'Aerial Refueling', count: '6', models: ['Il-78MKI'] },
        { type: 'Attack Helicopters', count: '22', models: ['AH-64E Apache'] },
        { type: 'UAVs/Drones', count: '200+', models: ['Heron TP', 'Searcher II', 'Rustom-II', 'Tapas BH-201'] }
    ],
    airBases: ['Ambala', 'Jodhpur', 'Hashimara', 'Tezpur', 'Thanjavur', 'Halwara', 'Srinagar', 'Leh'],
    missiles: ['BrahMos-A (Air-Launched)', 'Astra Mk.I/II (BVR)', 'HAMMER', 'SCALP (Storm Shadow)', 'Rudram-I (Anti-Radiation)']
};

const navyData = {
    totalPersonnel: '67,000',
    vessels: '150+',
    submarines: '17',
    commands: [
        { name: 'Western Naval Command', hq: 'Mumbai', status: 'ACTIVE', fleet: 'Western Fleet', coverage: 'Arabian Sea', threatLevel: 'MEDIUM' },
        { name: 'Eastern Naval Command', hq: 'Visakhapatnam', status: 'ACTIVE', fleet: 'Eastern Fleet', coverage: 'Bay of Bengal', threatLevel: 'HIGH' },
        { name: 'Southern Naval Command', hq: 'Kochi', status: 'ACTIVE', fleet: 'Training Fleet', coverage: 'IOR South', threatLevel: 'LOW' },
        { name: 'Andaman & Nicobar Command', hq: 'Port Blair', status: 'ACTIVE', fleet: 'Tri-Service', coverage: 'Malacca Strait Approach', threatLevel: 'HIGH' },
        { name: 'Submarine Command', hq: 'Visakhapatnam', status: 'ACTIVE', fleet: 'Nuclear & Diesel', coverage: 'Strategic Deterrent', threatLevel: 'CRITICAL' }
    ],
    fleet: [
        { type: 'Aircraft Carriers', count: '2', vessels: ['INS Vikramaditya (R33)', 'INS Vikrant (IAC-1)'] },
        { type: 'Nuclear Submarines (SSBN)', count: '2', vessels: ['INS Arihant (S2)', 'INS Arighat (S3)'] },
        { type: 'Nuclear Attack Sub (SSN)', count: '1', vessels: ['INS Chakra III (Akula-class, lease)'] },
        { type: 'Diesel Submarines', count: '14', vessels: ['Scorpène-class (Kalvari)', 'Sindhughosh-class', 'Shishumar-class'] },
        { type: 'Destroyers', count: '11', vessels: ['Visakhapatnam-class', 'Kolkata-class', 'Delhi-class'] },
        { type: 'Frigates', count: '14', vessels: ['Nilgiri-class (P17A)', 'Shivalik-class', 'Talwar-class'] },
        { type: 'Corvettes', count: '24', vessels: ['Kamorta-class (ASW)', 'Kora-class', 'Khukri-class'] },
        { type: 'Amphibious Warfare', count: '4', vessels: ['INS Jalashwa (LPD)', 'Shardul-class (LST)'] },
        { type: 'Naval Air Arm', count: '45 Fixed Wing', vessels: ['MiG-29K', 'P-8I Poseidon', 'HAL Tejas (Navy)'] }
    ],
    navalBases: ['Mumbai', 'Visakhapatnam', 'Kochi', 'Karwar (INS Kadamba)', 'Port Blair', 'Goa', 'Chennai'],
    nuclearTriad: ['K-4 SLBM (3,500km)', 'K-15 Sagarika SLBM (750km)', 'BrahMos (Ship/Sub-launched)']
};

const presidentialCommands = [
    { id: 'ALPHA-STRIKE', name: 'Operation Alpha Strike', type: 'OFFENSIVE', branches: ['ARMY', 'AIR FORCE'], description: 'Full-spectrum combined arms offensive on designated theater. Simultaneous ground assault with close air support and strategic air strikes.', targetTheater: 'Western / Northern Theater', estimatedForce: '350,000 troops, 200+ aircraft', readinessTime: '72 hours', authorization: 'PRESIDENTIAL + TRI-SERVICE', classification: 'TOP SECRET // COSMIC' },
    { id: 'TRIDENT-FURY', name: 'Operation Trident Fury', type: 'NAVAL BLOCKADE', branches: ['NAVY', 'AIR FORCE'], description: 'Complete maritime dominance operation. Carrier strike group deployment with submarine picket lines and aerial interdiction of enemy ports.', targetTheater: 'Arabian Sea / Bay of Bengal', estimatedForce: '2 Carrier Groups, 8 Submarines, 150+ Aircraft', readinessTime: '48 hours', authorization: 'PRESIDENTIAL + TRI-SERVICE', classification: 'TOP SECRET // COSMIC' },
    { id: 'THUNDER-BOLT', name: 'Operation Thunderbolt', type: 'SURGICAL STRIKE', branches: ['AIR FORCE', 'ARMY (SF)'], description: 'Precision surgical strike package. Special Forces insertion with air superiority cover and real-time satellite intelligence.', targetTheater: 'Cross-Border / Designated Zone', estimatedForce: '500 SF Operators, 50+ Aircraft, UAV Cover', readinessTime: '12 hours', authorization: 'PRESIDENTIAL + TRI-SERVICE', classification: 'TOP SECRET // SCI' },
    { id: 'IRON-DOME', name: 'Operation Iron Dome', type: 'DEFENSIVE', branches: ['ARMY', 'AIR FORCE', 'NAVY'], description: 'Full national defense mobilization. All branches to defensive stations with integrated missile defense and counter-strike readiness.', targetTheater: 'All Theaters', estimatedForce: 'Full Armed Forces Mobilization', readinessTime: '24 hours', authorization: 'PRESIDENTIAL + TRI-SERVICE', classification: 'TOP SECRET // NOFORN' },
    { id: 'NUCLEAR-TRIAD', name: 'Strategic Nuclear Response', type: 'NUCLEAR', branches: ['ARMY (Strategic)', 'AIR FORCE (Strategic)', 'NAVY (SSBN)'], description: 'Second-strike nuclear response activation. Full nuclear triad engagement: land-based ICBMs, air-delivered weapons, and submarine-launched ballistic missiles.', targetTheater: 'Strategic — Global', estimatedForce: 'Nuclear Triad — 160+ Warheads', readinessTime: 'IMMEDIATE', authorization: 'PRESIDENTIAL + TRI-SERVICE — DUAL KEY', classification: 'TOP SECRET // RESTRICTED DATA' },
    { id: 'DEEP-STRIKE', name: 'Operation Deep Strike', type: 'COVERT', branches: ['ARMY (SF)', 'NAVY (MARCOS)'], description: 'Deep penetration covert operation behind enemy lines. MARCOS and Para SF joint insertion for high-value target neutralization.', targetTheater: 'Classified', estimatedForce: 'Classified — Special Operations', readinessTime: '6 hours', authorization: 'PRESIDENTIAL + TRI-SERVICE', classification: 'TOP SECRET // SAP' }
];

const MISSILE_PHASES = ['ARMING', 'IGNITION', 'LAUNCHED', 'BOOST_PHASE', 'MID_COURSE', 'TERMINAL', 'IMPACT'];
const PHASE_LABELS = { ARMING: 'Arming Warhead', IGNITION: 'Ignition Sequence', LAUNCHED: 'Launched', BOOST_PHASE: 'Boost Phase', MID_COURSE: 'Mid-Course Guidance', TERMINAL: 'Terminal Phase', IMPACT: 'TARGET DESTROYED' };

const AUTHORIZED_USERS = [
    { id: 'PRESIDENT', name: 'Smt. Droupadi Murmu', title: 'President of India & Supreme Commander of Armed Forces', password: 'DeMr26', role: 'SUPREME COMMANDER', clearance: 'COSMIC TOP SECRET', avatar: 'DM' },
    { id: 'COAS', name: 'Gen. Upendra Dwivedi', title: 'Chief of Army Staff (COAS)', password: 'COAS@SFC', role: 'ARMY CHIEF', clearance: 'TOP SECRET // SCI', avatar: 'UD' },
    { id: 'CNS', name: 'Adm. Dinesh Kumar Tripathi', title: 'Chief of Naval Staff (CNS)', password: 'CNS@NHQ', role: 'NAVY CHIEF', clearance: 'TOP SECRET // SCI', avatar: 'DT' },
    { id: 'CAS', name: 'ACM Amar Preet Singh', title: 'Chief of Air Staff (CAS)', password: 'CAS@VAY', role: 'AIR FORCE CHIEF', clearance: 'TOP SECRET // SCI', avatar: 'AS' }
];

const INCOMING_THREATS_DB = [
    { id: 'INC-001', missile: 'Shaheen-III MRBM', origin: 'Pakistan', launchSite: 'Tilla Range, Punjab', technology: 'Solid-fuel, two-stage, Chinese M-series derived, HQ-9 guidance', speed: 'Mach 12', range: '2,750 km', warhead: 'Nuclear / HE (1,000 kg)', targetCity: 'New Delhi', targetCoords: [77.21, 28.61], eta: 45 },
    { id: 'INC-002', missile: 'DF-21D ASBM', origin: 'China', launchSite: 'Korla Missile Test Complex, Xinjiang', technology: 'Solid-fuel, two-stage, terminal maneuvering warhead, BeiDou guidance', speed: 'Mach 10', range: '1,450 km', warhead: 'Conventional / Anti-Ship (600 kg)', targetCity: 'INS Kadamba, Karwar', targetCoords: [74.13, 14.80], eta: 55 },
    { id: 'INC-003', missile: 'Ghauri-II MRBM', origin: 'Pakistan', launchSite: 'Somniani Test Range, Balochistan', technology: 'Liquid-fuel, Nodong-derived DPRK tech, inertial + GPS', speed: 'Mach 8', range: '1,800 km', warhead: 'Nuclear / HE (700 kg)', targetCity: 'Mumbai', targetCoords: [72.88, 19.08], eta: 60 },
    { id: 'INC-004', missile: 'DF-26 IRBM', origin: 'China', launchSite: 'Delingha Base, Qinghai', technology: 'Solid-fuel, two-stage, MaRV, BeiDou + INS, hot-swap warhead', speed: 'Mach 18', range: '4,000 km', warhead: 'Nuclear / Conventional (1,200 kg)', targetCity: 'Bengaluru (Strategic Command)', targetCoords: [77.59, 12.97], eta: 40 },
    { id: 'INC-005', missile: 'Babur-3 SLCM', origin: 'Pakistan', launchSite: 'Submarine PNS Khalid, Arabian Sea', technology: 'Sub-launched cruise, terrain-hugging, TERCOM + DSMAC, stealth profile', speed: 'Mach 0.8', range: '450 km', warhead: 'Nuclear (350 kg)', targetCity: 'Jamnagar Refinery Complex', targetCoords: [70.07, 22.47], eta: 90 }
];

const DEFENSE_SYSTEMS = [
    { id: 'S400-1', name: 'S-400 Triumf (Sqn 1)', type: 'S-400', location: 'Punjab Sector', range: '400 km', interceptors: 'Loaded: 48N6E4 / 40N6E', status: 'STANDBY', engageRange: '30–400 km', killProb: '96%' },
    { id: 'S400-2', name: 'S-400 Triumf (Sqn 2)', type: 'S-400', location: 'Delhi NCR', range: '400 km', interceptors: 'Loaded: 48N6E4 / 40N6E', status: 'STANDBY', engageRange: '30–400 km', killProb: '96%' },
    { id: 'S400-3', name: 'S-400 Triumf (Sqn 3)', type: 'S-400', location: 'Western Sector', range: '400 km', interceptors: 'Loaded: 9M96E2 / 48N6E4', status: 'STANDBY', engageRange: '30–400 km', killProb: '96%' },
    { id: 'AKASH-1', name: 'Akash-NG Battery A', type: 'AKASH', location: 'New Delhi Air Defense', range: '80 km', interceptors: 'Akash-NG SAM x 12', status: 'STANDBY', engageRange: '5–80 km', killProb: '88%' },
    { id: 'AKASH-2', name: 'Akash-NG Battery B', type: 'AKASH', location: 'Mumbai Air Defense', range: '80 km', interceptors: 'Akash-NG SAM x 12', status: 'STANDBY', engageRange: '5–80 km', killProb: '88%' },
    { id: 'AKASH-3', name: 'Akash Prime Battery', type: 'AKASH', location: 'Bengaluru Air Defense', range: '60 km', interceptors: 'Akash Prime SAM x 8', status: 'STANDBY', engageRange: '5–60 km', killProb: '90%' },
    { id: 'MRSAM-1', name: 'MRSAM Battery (Barak-8)', type: 'MRSAM', location: 'Western Theater', range: '100 km', interceptors: 'Barak-8ER x 16', status: 'STANDBY', engageRange: '10–100 km', killProb: '93%' }
];

const ArmedForcesCommand = ({ onBack }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);

    if (!authenticated) {
        return <SecureLoginGate onAuthenticated={(user) => { setLoggedInUser(user); setAuthenticated(true); }} onBack={onBack} />;
    }

    return <CommandCenter onBack={onBack} loggedInUser={loggedInUser} />;
};

const CommandCenter = ({ onBack, loggedInUser }) => {
    const [activeBranch, setActiveBranch] = useState(BRANCHES.ARMY);
    const [currentDefcon, setCurrentDefcon] = useState('DEFCON5');
    const [selectedCommand, setSelectedCommand] = useState(null);
    const [commandLog, setCommandLog] = useState([]);
    const [engagementActive, setEngagementActive] = useState({});
    const [systemTime, setSystemTime] = useState(new Date());

    // 3-Factor Auth
    const [triAuth, setTriAuth] = useState({});
    const [authStage, setAuthStage] = useState({});
    const [authScanning, setAuthScanning] = useState({});

    // Incoming Missile Defense
    const [incomingThreats, setIncomingThreats] = useState([]);
    const [defenseSystems, setDefenseSystems] = useState(DEFENSE_SYSTEMS.map(d => ({ ...d })));
    const [threatIntel, setThreatIntel] = useState([]);
    const [showDefensePanel, setShowDefensePanel] = useState(false);
    const defenseTimersRef = useRef({});

    // RAW Meeting
    const [rawMeeting, setRawMeeting] = useState(null);
    const [rawAttendees, setRawAttendees] = useState(RAW_ATTENDEES.map(a => ({ ...a })));
    const [rawAgenda, setRawAgenda] = useState('');
    const [rawMessages, setRawMessages] = useState([]);

    // Missile System
    const [missileMode, setMissileMode] = useState(false);
    const [selectedMissile, setSelectedMissile] = useState(null);
    const [selectedTarget, setSelectedTarget] = useState(null);
    const [customCoords, setCustomCoords] = useState({ lat: '', lng: '' });
    const [launchSequence, setLaunchSequence] = useState(null);
    const [activeMissiles, setActiveMissiles] = useState([]);
    const missileTimersRef = useRef({});

    useEffect(() => {
        const timer = setInterval(() => setSystemTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        return () => {
            Object.values(missileTimersRef.current).forEach(clearInterval);
        };
    }, []);

    const initTriAuth = (commandId) => {
        setTriAuth(prev => ({ ...prev, [commandId]: { army: false, navy: false, airforce: false } }));
        setAuthStage(prev => ({ ...prev, [commandId]: 'army' }));
    };

    const processAuth = useCallback((commandId, branch) => {
        setAuthScanning(prev => ({ ...prev, [`${commandId}-${branch}`]: true }));
        const duration = 2000 + Math.random() * 1000;
        setTimeout(() => {
            setAuthScanning(prev => ({ ...prev, [`${commandId}-${branch}`]: false }));
            setTriAuth(prev => ({
                ...prev,
                [commandId]: { ...prev[commandId], [branch]: true }
            }));
            const nextBranch = branch === 'army' ? 'navy' : branch === 'navy' ? 'airforce' : 'complete';
            setAuthStage(prev => ({ ...prev, [commandId]: nextBranch }));

            if (nextBranch === 'complete') {
                setTimeout(() => activateCommand(commandId), 500);
            }
        }, duration);
    }, []);

    const activateCommand = (commandId) => {
        const cmd = presidentialCommands.find(c => c.id === commandId);
        setEngagementActive(prev => ({ ...prev, [commandId]: true }));
        setCommandLog(prev => [{
            timestamp: new Date().toISOString(), command: cmd.name, type: cmd.type,
            status: 'ENGAGED', authBy: 'SUPREME COMMANDER + TRI-SERVICE CHIEFS'
        }, ...prev]);
        setSelectedCommand(null);
        setAuthStage(prev => ({ ...prev, [commandId]: null }));
        if (currentDefcon === 'DEFCON5') setCurrentDefcon('DEFCON3');
        if (commandId === 'NUCLEAR-TRIAD') setCurrentDefcon('DEFCON1');
    };

    const revokeCommand = (commandId) => {
        const cmd = presidentialCommands.find(c => c.id === commandId);
        setEngagementActive(prev => { const u = { ...prev }; delete u[commandId]; return u; });
        setTriAuth(prev => { const u = { ...prev }; delete u[commandId]; return u; });
        setCommandLog(prev => [{
            timestamp: new Date().toISOString(), command: cmd.name, type: cmd.type,
            status: 'REVOKED', authBy: 'SUPREME COMMANDER'
        }, ...prev]);
        const activeCount = Object.keys(engagementActive).length - 1;
        if (activeCount <= 0) setCurrentDefcon('DEFCON5');
    };

    const startRawMeeting = () => {
        setRawMeeting('CONVENING');
        setRawMessages([{ sender: 'SYSTEM', text: 'Encrypted channel establishing... AES-256-GCM', time: new Date() }]);
        const updated = rawAttendees.map(a => ({ ...a, status: 'CONNECTING' }));
        setRawAttendees(updated);
        let i = 0;
        const interval = setInterval(() => {
            if (i < updated.length) {
                setRawAttendees(prev => prev.map((a, idx) => idx === i ? { ...a, status: 'ONLINE' } : a));
                setRawMessages(prev => [...prev, { sender: 'SYSTEM', text: `${updated[i].name} joined the secure channel`, time: new Date() }]);
                i++;
            } else {
                clearInterval(interval);
                setRawMeeting('IN_SESSION');
                setRawMessages(prev => [...prev, { sender: 'SYSTEM', text: 'ALL PRINCIPALS ONLINE — Session is LIVE and encrypted', time: new Date() }]);
            }
        }, 800);
    };

    const endRawMeeting = () => {
        setRawMeeting('CONCLUDED');
        setRawMessages(prev => [...prev, { sender: 'SYSTEM', text: 'Meeting concluded. All recordings destroyed per protocol.', time: new Date() }]);
        setRawAttendees(prev => prev.map(a => ({ ...a, status: 'OFFLINE' })));
        setTimeout(() => setRawMeeting(null), 3000);
    };

    const sendRawMessage = () => {
        if (!rawAgenda.trim()) return;
        setRawMessages(prev => [...prev, { sender: 'SUPREME COMMANDER', text: rawAgenda, time: new Date() }]);
        setRawAgenda('');
        setTimeout(() => {
            const responders = ['NSA', 'COAS', 'R&AW Secretary', 'CDS'];
            const responses = [
                'Acknowledged. Intelligence assets are being repositioned.',
                'Roger. Forces on standby awaiting further orders.',
                'Copy. HUMINT sources confirm the assessment.',
                'Understood. Coordinating tri-service response protocol.'
            ];
            const idx = Math.floor(Math.random() * responders.length);
            setRawMessages(prev => [...prev, { sender: responders[idx], text: responses[idx], time: new Date() }]);
        }, 1500 + Math.random() * 2000);
    };

    const launchMissile = () => {
        if (!selectedMissile || !selectedTarget) return;
        const missile = MISSILE_TYPES.find(m => m.id === selectedMissile);
        const target = TARGET_LOCATIONS.find(t => t.id === selectedTarget);
        const coords = selectedTarget === 'TGT-009' ? [parseFloat(customCoords.lng) || 0, parseFloat(customCoords.lat) || 0] : target.coords;

        const missileId = `MSL-${Date.now()}`;
        const totalTime = Math.min(missile.flightTime, 60);

        setLaunchSequence('ARMING');
        let phaseIdx = 0;
        const phaseInterval = setInterval(() => {
            phaseIdx++;
            if (phaseIdx < MISSILE_PHASES.length - 1) {
                setLaunchSequence(MISSILE_PHASES[phaseIdx]);
            }
            if (phaseIdx === 2) {
                const newMissile = {
                    id: missileId, type: missile.name, target: target.name, targetCoords: coords,
                    phase: 'LAUNCHED', progress: 0, startTime: Date.now(), totalTime,
                    speed: missile.speed, warhead: missile.warhead
                };
                setActiveMissiles(prev => [...prev, newMissile]);

                missileTimersRef.current[missileId] = setInterval(() => {
                    setActiveMissiles(prev => prev.map(m => {
                        if (m.id !== missileId) return m;
                        const elapsed = (Date.now() - m.startTime) / 1000;
                        const progress = Math.min((elapsed / totalTime) * 100, 100);
                        let phase = 'LAUNCHED';
                        if (progress >= 100) phase = 'IMPACT';
                        else if (progress >= 85) phase = 'TERMINAL';
                        else if (progress >= 30) phase = 'MID_COURSE';
                        else if (progress >= 10) phase = 'BOOST_PHASE';
                        if (phase === 'IMPACT') {
                            clearInterval(missileTimersRef.current[missileId]);
                            delete missileTimersRef.current[missileId];
                        }
                        return { ...m, progress, phase };
                    }));
                }, 200);
            }
            if (phaseIdx >= MISSILE_PHASES.length - 2) {
                clearInterval(phaseInterval);
                setTimeout(() => {
                    setLaunchSequence(null);
                    setSelectedMissile(null);
                    setSelectedTarget(null);
                }, 2000);
            }
        }, 1200);
    };

    const simulateIncomingAttack = () => {
        setShowDefensePanel(true);
        if (currentDefcon === 'DEFCON5') setCurrentDefcon('DEFCON2');
        const threat = INCOMING_THREATS_DB[Math.floor(Math.random() * INCOMING_THREATS_DB.length)];
        const threatId = `THR-${Date.now()}`;
        const incoming = {
            ...threat, uid: threatId, progress: 0, status: 'DETECTED', interceptedBy: null,
            startTime: Date.now(), totalTime: threat.eta
        };
        setIncomingThreats(prev => [...prev, incoming]);

        setDefenseSystems(prev => prev.map(d => ({ ...d, status: 'TRACKING' })));

        setTimeout(() => {
            setIncomingThreats(prev => prev.map(t => t.uid === threatId ? { ...t, status: 'TRACKING' } : t));
        }, 2000);

        setTimeout(() => {
            const bestSystem = defenseSystems.find(d => d.type === 'S-400') || defenseSystems[0];
            setDefenseSystems(prev => prev.map(d => d.id === bestSystem.id ? { ...d, status: 'ENGAGING' } : d));
            setIncomingThreats(prev => prev.map(t => t.uid === threatId ? { ...t, status: 'S-400 ENGAGING', interceptedBy: bestSystem.name } : t));
        }, 4000);

        setTimeout(() => {
            const akash = defenseSystems.find(d => d.type === 'AKASH') || defenseSystems[3];
            setDefenseSystems(prev => prev.map(d => d.id === akash.id ? { ...d, status: 'ENGAGING (BACKUP)' } : d));
        }, 5500);

        setTimeout(() => {
            setIncomingThreats(prev => prev.map(t => t.uid === threatId ? { ...t, status: 'INTERCEPTED', progress: 100 } : t));
            setDefenseSystems(prev => prev.map(d => d.status === 'ENGAGING' || d.status === 'ENGAGING (BACKUP)' ? { ...d, status: 'KILL CONFIRMED' } : d));
            setThreatIntel(prev => [{
                id: threatId, timestamp: new Date().toISOString(), missile: threat.missile,
                origin: threat.origin, launchSite: threat.launchSite, technology: threat.technology,
                speed: threat.speed, warhead: threat.warhead, targetCity: threat.targetCity,
                result: 'INTERCEPTED & DESTROYED', interceptedBy: 'S-400 Triumf + Akash-NG (Layered Defense)'
            }, ...prev]);
        }, 8000);

        setTimeout(() => {
            setDefenseSystems(prev => prev.map(d => ({ ...d, status: 'STANDBY' })));
        }, 14000);

        defenseTimersRef.current[threatId] = setInterval(() => {
            setIncomingThreats(prev => prev.map(t => {
                if (t.uid !== threatId || t.status === 'INTERCEPTED') return t;
                const elapsed = (Date.now() - t.startTime) / 1000;
                return { ...t, progress: Math.min((elapsed / t.totalTime) * 100, 95) };
            }));
        }, 300);

        setTimeout(() => {
            clearInterval(defenseTimersRef.current[threatId]);
            delete defenseTimersRef.current[threatId];
        }, 9000);
    };

    const getThreatColor = (level) => {
        const colors = { LOW: '#34D399', MEDIUM: '#FBBF24', HIGH: '#F87171', CRITICAL: '#DC2626' };
        return colors[level] || '#00FFCC';
    };

    const getTypeColor = (type) => {
        const colors = { OFFENSIVE: '#F87171', 'NAVAL BLOCKADE': '#60A5FA', 'SURGICAL STRIKE': '#FBBF24', DEFENSIVE: '#34D399', NUCLEAR: '#DC2626', COVERT: '#A78BFA' };
        return colors[type] || '#00FFCC';
    };

    const branchTabs = [
        { id: BRANCHES.ARMY, label: 'ARMY', icon: <Shield size={18} />, color: '#34D399' },
        { id: BRANCHES.AIRFORCE, label: 'AIR FORCE', icon: <Plane size={18} />, color: '#60A5FA' },
        { id: BRANCHES.NAVY, label: 'NAVY', icon: <Anchor size={18} />, color: '#06B6D4' },
        { id: BRANCHES.PRESIDENTIAL, label: 'PRESIDENTIAL COMMAND', icon: <Star size={18} />, color: '#EF4444' }
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'linear-gradient(135deg, #020617 0%, #0a0a1a 50%, #0f172a 100%)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

            {/* Header */}
            <div style={{ background: 'rgba(0,0,0,0.6)', borderBottom: `2px solid ${READINESS_LEVELS[currentDefcon].color}40`, padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Shield size={28} color="#00FFCC" />
                    <div>
                        <h1 style={{ color: '#fff', fontSize: '18px', fontFamily: 'Orbitron, monospace', fontWeight: 900, letterSpacing: '2px' }}>ARMED FORCES COMMAND CENTER</h1>
                        <p style={{ color: '#00FFCC', fontSize: '9px', fontFamily: 'monospace', letterSpacing: '3px', opacity: 0.6 }}>
                            LOGGED IN: {loggedInUser.name} — {loggedInUser.role} — CLEARANCE: {loggedInUser.clearance}
                        </p>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    {/* Simulate Incoming Attack */}
                    <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(220,38,38,0.4)' }} whileTap={{ scale: 0.95 }}
                        onClick={simulateIncomingAttack}
                        style={{ padding: '8px 16px', background: 'rgba(220,38,38,0.15)', border: '1px solid #DC2626', color: '#DC2626', cursor: 'pointer', fontFamily: 'monospace', fontSize: '9px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', letterSpacing: '1px' }}>
                        <AlertTriangle size={14} /> SIMULATE INCOMING THREAT
                    </motion.button>
                    {incomingThreats.some(t => t.status !== 'INTERCEPTED') && (
                        <motion.div animate={{ opacity: [1, 0.3, 1], scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}
                            onClick={() => setShowDefensePanel(!showDefensePanel)}
                            style={{ padding: '6px 14px', background: 'rgba(220,38,38,0.3)', border: '2px solid #DC2626', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <AlertTriangle size={14} color="#DC2626" />
                            <span style={{ color: '#DC2626', fontSize: '10px', fontFamily: 'Orbitron, monospace', fontWeight: 900 }}>INCOMING MISSILE</span>
                        </motion.div>
                    )}
                    <motion.div
                        animate={{ boxShadow: [`0 0 10px ${READINESS_LEVELS[currentDefcon].color}40`, `0 0 25px ${READINESS_LEVELS[currentDefcon].color}60`, `0 0 10px ${READINESS_LEVELS[currentDefcon].color}40`] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        style={{ padding: '8px 20px', border: `2px solid ${READINESS_LEVELS[currentDefcon].color}`, background: `${READINESS_LEVELS[currentDefcon].color}15`, display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1 }}
                            style={{ width: 10, height: 10, borderRadius: '50%', background: READINESS_LEVELS[currentDefcon].color }} />
                        <div>
                            <div style={{ color: READINESS_LEVELS[currentDefcon].color, fontSize: '14px', fontFamily: 'Orbitron, monospace', fontWeight: 900 }}>{READINESS_LEVELS[currentDefcon].label}</div>
                            <div style={{ color: READINESS_LEVELS[currentDefcon].color, fontSize: '8px', fontFamily: 'monospace', opacity: 0.7 }}>{READINESS_LEVELS[currentDefcon].desc}</div>
                        </div>
                    </motion.div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ color: '#00FFCC', fontSize: '13px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>{systemTime.toLocaleTimeString()} IST</div>
                        <div style={{ color: '#00FFCC50', fontSize: '9px', fontFamily: 'monospace' }}>{systemTime.toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</div>
                    </div>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onBack}
                        style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,0,0,0.1)', border: '1px solid rgba(255,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <X size={20} color="#ff4444" />
                    </motion.button>
                </div>
            </div>

            {/* Branch Tabs */}
            <div style={{ display: 'flex', background: 'rgba(0,0,0,0.4)', borderBottom: '1px solid rgba(0,255,204,0.1)', padding: '0 24px' }}>
                {branchTabs.map(tab => (
                    <motion.button key={tab.id} whileHover={{ backgroundColor: `${tab.color}15` }} onClick={() => setActiveBranch(tab.id)}
                        style={{ padding: '14px 28px', display: 'flex', alignItems: 'center', gap: '10px', background: activeBranch === tab.id ? `${tab.color}20` : 'transparent', border: 'none', borderBottom: activeBranch === tab.id ? `3px solid ${tab.color}` : '3px solid transparent', cursor: 'pointer', transition: 'all 0.2s' }}>
                        <span style={{ color: activeBranch === tab.id ? tab.color : '#ffffff40' }}>{tab.icon}</span>
                        <span style={{ color: activeBranch === tab.id ? tab.color : '#ffffff40', fontSize: '11px', fontFamily: 'Orbitron, monospace', fontWeight: 700, letterSpacing: '2px' }}>{tab.label}</span>
                    </motion.button>
                ))}
            </div>

            {/* Incoming Missile Defense Panel */}
            <AnimatePresence>
                {showDefensePanel && (incomingThreats.length > 0 || threatIntel.length > 0) && (
                    <IncomingMissileDefense
                        incomingThreats={incomingThreats} defenseSystems={defenseSystems}
                        threatIntel={threatIntel} onClose={() => setShowDefensePanel(false)} />
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div style={{ flex: 1, overflow: 'auto', padding: '20px 24px' }}>
                <AnimatePresence mode="wait">
                    {activeBranch === BRANCHES.ARMY && (
                        <ArmyPanel key="army" getThreatColor={getThreatColor}
                            missileMode={missileMode} setMissileMode={setMissileMode}
                            selectedMissile={selectedMissile} setSelectedMissile={setSelectedMissile}
                            selectedTarget={selectedTarget} setSelectedTarget={setSelectedTarget}
                            customCoords={customCoords} setCustomCoords={setCustomCoords}
                            launchSequence={launchSequence} launchMissile={launchMissile}
                            activeMissiles={activeMissiles} />
                    )}
                    {activeBranch === BRANCHES.AIRFORCE && <AirForcePanel key="airforce" getThreatColor={getThreatColor} />}
                    {activeBranch === BRANCHES.NAVY && <NavyPanel key="navy" getThreatColor={getThreatColor} />}
                    {activeBranch === BRANCHES.PRESIDENTIAL && (
                        <PresidentialPanel key="presidential"
                            commands={presidentialCommands} engagementActive={engagementActive}
                            commandLog={commandLog} selectedCommand={selectedCommand} setSelectedCommand={setSelectedCommand}
                            revokeCommand={revokeCommand} getTypeColor={getTypeColor}
                            triAuth={triAuth} authStage={authStage} authScanning={authScanning}
                            initTriAuth={initTriAuth} processAuth={processAuth}
                            rawMeeting={rawMeeting} startRawMeeting={startRawMeeting} endRawMeeting={endRawMeeting}
                            rawAttendees={rawAttendees} rawMessages={rawMessages}
                            rawAgenda={rawAgenda} setRawAgenda={setRawAgenda} sendRawMessage={sendRawMessage} />
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

/* ========================================================================== */
/*  ARMY PANEL — with Missile Launch System                                   */
/* ========================================================================== */
const ArmyPanel = ({ getThreatColor, missileMode, setMissileMode, selectedMissile, setSelectedMissile, selectedTarget, setSelectedTarget, customCoords, setCustomCoords, launchSequence, launchMissile, activeMissiles }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <StatCard icon={<Users size={20} />} label="Active Personnel" value={armyData.totalPersonnel} color="#34D399" />
            <StatCard icon={<Shield size={20} />} label="Commands" value={`${armyData.commands.length} Regional`} color="#34D399" />
            <StatCard icon={<Target size={20} />} label="Battle Tanks" value="4,614" color="#FBBF24" />
            <StatCard icon={<Bomb size={20} />} label="Missile Systems" value="160+" color="#F87171" />
            <motion.div whileHover={{ borderColor: '#DC262650', y: -2 }} onClick={() => setMissileMode(!missileMode)}
                style={{ padding: '16px 20px', background: missileMode ? 'rgba(220,38,38,0.15)' : 'rgba(0,0,0,0.4)', border: `1px solid ${missileMode ? '#DC2626' : '#DC262620'}`, display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
                <Crosshair size={20} color="#DC2626" />
                <div>
                    <div style={{ color: '#DC262680', fontSize: '8px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '1px' }}>Missile Launch</div>
                    <div style={{ color: '#DC2626', fontSize: '14px', fontWeight: 900, fontFamily: 'Orbitron, monospace' }}>{missileMode ? 'ACTIVE' : 'OPEN'}</div>
                </div>
            </motion.div>
        </div>

        {/* Missile Launch System */}
        <AnimatePresence>
            {missileMode && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden', marginBottom: '24px' }}>
                    <MissileLaunchSystem
                        selectedMissile={selectedMissile} setSelectedMissile={setSelectedMissile}
                        selectedTarget={selectedTarget} setSelectedTarget={setSelectedTarget}
                        customCoords={customCoords} setCustomCoords={setCustomCoords}
                        launchSequence={launchSequence} launchMissile={launchMissile}
                        activeMissiles={activeMissiles} />
                </motion.div>
            )}
        </AnimatePresence>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <SectionCard title="REGIONAL COMMANDS" icon={<MapPin size={16} />}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {armyData.commands.map((cmd, i) => (
                        <div key={i} style={{ padding: '10px 14px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(0,255,204,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ color: '#fff', fontSize: '12px', fontWeight: 700 }}>{cmd.name}</div>
                                <div style={{ color: '#00FFCC60', fontSize: '9px', fontFamily: 'monospace' }}>HQ: {cmd.hq} | {cmd.area}</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ color: '#ffffff80', fontSize: '10px', fontFamily: 'monospace' }}>{cmd.troops}</span>
                                <span style={{ padding: '2px 8px', fontSize: '8px', fontWeight: 700, fontFamily: 'monospace', background: getThreatColor(cmd.threatLevel) + '20', color: getThreatColor(cmd.threatLevel), border: `1px solid ${getThreatColor(cmd.threatLevel)}40` }}>{cmd.threatLevel}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </SectionCard>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <SectionCard title="EQUIPMENT & ARSENAL" icon={<Crosshair size={16} />}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {armyData.equipment.map((eq, i) => (
                            <div key={i} style={{ padding: '8px 12px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(0,255,204,0.08)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                    <span style={{ color: '#fff', fontSize: '11px', fontWeight: 700 }}>{eq.type}</span>
                                    <span style={{ color: '#FBBF24', fontSize: '12px', fontWeight: 900, fontFamily: 'monospace' }}>{eq.count}</span>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                    {eq.models.map((m, j) => (
                                        <span key={j} style={{ padding: '1px 6px', fontSize: '8px', fontFamily: 'monospace', background: 'rgba(0,255,204,0.08)', color: '#00FFCC80', border: '1px solid rgba(0,255,204,0.1)' }}>{m}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </SectionCard>
                <SectionCard title="ACTIVE OPERATIONS" icon={<Activity size={16} />}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {armyData.currentOps.map((op, i) => (
                            <div key={i} style={{ padding: '10px 14px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(0,255,204,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ color: '#fff', fontSize: '12px', fontWeight: 700 }}>{op.name}</div>
                                    <div style={{ color: '#00FFCC60', fontSize: '9px', fontFamily: 'monospace' }}>{op.region} | Since {op.since}</div>
                                </div>
                                <motion.span animate={op.status === 'HIGH ALERT' ? { opacity: [1, 0.4, 1] } : {}} transition={{ repeat: Infinity, duration: 1.5 }}
                                    style={{ padding: '3px 10px', fontSize: '8px', fontWeight: 700, fontFamily: 'monospace', background: op.status === 'HIGH ALERT' ? 'rgba(248,113,113,0.2)' : 'rgba(52,211,153,0.2)', color: op.status === 'HIGH ALERT' ? '#F87171' : '#34D399', border: `1px solid ${op.status === 'HIGH ALERT' ? '#F8717140' : '#34D39940'}` }}>
                                    {op.status}
                                </motion.span>
                            </div>
                        ))}
                    </div>
                </SectionCard>
                <SectionCard title="SPECIAL FORCES" icon={<Award size={16} />}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {armyData.specialForces.map((sf, i) => (
                            <span key={i} style={{ padding: '4px 12px', fontSize: '10px', fontWeight: 700, fontFamily: 'monospace', background: 'rgba(251,191,36,0.1)', color: '#FBBF24', border: '1px solid rgba(251,191,36,0.2)' }}>{sf}</span>
                        ))}
                    </div>
                </SectionCard>
            </div>
        </div>
    </motion.div>
);

/* ========================================================================== */
/*  MISSILE LAUNCH SYSTEM                                                      */
/* ========================================================================== */
const MissileLaunchSystem = ({ selectedMissile, setSelectedMissile, selectedTarget, setSelectedTarget, customCoords, setCustomCoords, launchSequence, launchMissile, activeMissiles }) => {
    const missile = MISSILE_TYPES.find(m => m.id === selectedMissile);
    const target = TARGET_LOCATIONS.find(t => t.id === selectedTarget);
    const phaseIdx = launchSequence ? MISSILE_PHASES.indexOf(launchSequence) : -1;

    return (
        <div style={{ background: 'rgba(220,38,38,0.04)', border: '2px solid rgba(220,38,38,0.2)', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid rgba(220,38,38,0.15)' }}>
                <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    <Crosshair size={20} color="#DC2626" />
                </motion.div>
                <span style={{ color: '#DC2626', fontSize: '13px', fontFamily: 'Orbitron, monospace', fontWeight: 900, letterSpacing: '2px' }}>STRATEGIC MISSILE COMMAND</span>
                <span style={{ marginLeft: 'auto', color: '#DC262660', fontSize: '9px', fontFamily: 'monospace' }}>AUTHORIZATION: SUPREME COMMANDER</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 350px', gap: '20px' }}>
                {/* Select Missile */}
                <div>
                    <div style={{ color: '#DC2626', fontSize: '10px', fontFamily: 'Orbitron, monospace', fontWeight: 700, marginBottom: '10px', letterSpacing: '1px' }}>SELECT MISSILE TYPE</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '320px', overflow: 'auto' }}>
                        {MISSILE_TYPES.map(m => (
                            <motion.div key={m.id} whileHover={{ borderColor: '#DC262660' }}
                                onClick={() => setSelectedMissile(m.id)}
                                style={{ padding: '10px 12px', background: selectedMissile === m.id ? 'rgba(220,38,38,0.15)' : 'rgba(0,0,0,0.3)', border: `1px solid ${selectedMissile === m.id ? '#DC2626' : 'rgba(255,255,255,0.05)'}`, cursor: 'pointer' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: '#fff', fontSize: '11px', fontWeight: 700 }}>{m.name}</span>
                                    <span style={{ color: '#DC2626', fontSize: '8px', fontWeight: 700, fontFamily: 'monospace', padding: '2px 6px', background: 'rgba(220,38,38,0.15)' }}>{m.category}</span>
                                </div>
                                <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                                    <span style={{ color: '#ffffff50', fontSize: '9px', fontFamily: 'monospace' }}>Range: {m.range}</span>
                                    <span style={{ color: '#ffffff50', fontSize: '9px', fontFamily: 'monospace' }}>Speed: {m.speed}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Select Target */}
                <div>
                    <div style={{ color: '#DC2626', fontSize: '10px', fontFamily: 'Orbitron, monospace', fontWeight: 700, marginBottom: '10px', letterSpacing: '1px' }}>SELECT TARGET</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '320px', overflow: 'auto' }}>
                        {TARGET_LOCATIONS.map(t => (
                            <motion.div key={t.id} whileHover={{ borderColor: '#F8717160' }}
                                onClick={() => setSelectedTarget(t.id)}
                                style={{ padding: '10px 12px', background: selectedTarget === t.id ? 'rgba(248,113,113,0.15)' : 'rgba(0,0,0,0.3)', border: `1px solid ${selectedTarget === t.id ? '#F87171' : 'rgba(255,255,255,0.05)'}`, cursor: 'pointer' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: '#fff', fontSize: '11px', fontWeight: 700 }}>{t.name}</span>
                                    <span style={{ color: t.priority === 'CRITICAL' ? '#DC2626' : t.priority === 'HIGH' ? '#F87171' : '#FBBF24', fontSize: '8px', fontWeight: 700, fontFamily: 'monospace' }}>{t.priority}</span>
                                </div>
                                <div style={{ color: '#ffffff50', fontSize: '9px', fontFamily: 'monospace', marginTop: '2px' }}>{t.country} | {t.type} | [{t.coords[1].toFixed(2)}, {t.coords[0].toFixed(2)}]</div>
                            </motion.div>
                        ))}
                    </div>
                    {selectedTarget === 'TGT-009' && (
                        <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
                            <input placeholder="Latitude" value={customCoords.lat} onChange={e => setCustomCoords(p => ({ ...p, lat: e.target.value }))}
                                style={{ flex: 1, padding: '8px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(220,38,38,0.3)', color: '#DC2626', fontFamily: 'monospace', fontSize: '11px', outline: 'none' }} />
                            <input placeholder="Longitude" value={customCoords.lng} onChange={e => setCustomCoords(p => ({ ...p, lng: e.target.value }))}
                                style={{ flex: 1, padding: '8px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(220,38,38,0.3)', color: '#DC2626', fontFamily: 'monospace', fontSize: '11px', outline: 'none' }} />
                        </div>
                    )}
                </div>

                {/* Launch Panel & Tracking */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {/* Selected Summary */}
                    <div style={{ padding: '12px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(220,38,38,0.15)' }}>
                        <div style={{ color: '#DC262680', fontSize: '9px', fontFamily: 'monospace', letterSpacing: '1px', marginBottom: '8px' }}>LAUNCH PARAMETERS</div>
                        <MiniData label="Missile" value={missile ? missile.name : '—'} color={missile ? '#DC2626' : '#ffffff30'} />
                        <MiniData label="Target" value={target ? target.name : '—'} color={target ? '#F87171' : '#ffffff30'} />
                        {missile && <MiniData label="Warhead" value={missile.warhead} color="#FBBF24" />}
                        {missile && <MiniData label="CEP" value={missile.cep} color="#34D399" />}
                    </div>

                    {/* Launch Button or Sequence */}
                    {launchSequence ? (
                        <div style={{ padding: '14px', background: 'rgba(220,38,38,0.1)', border: '2px solid #DC2626' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 0.5 }}>
                                    <AlertTriangle size={16} color="#DC2626" />
                                </motion.div>
                                <span style={{ color: '#DC2626', fontSize: '11px', fontFamily: 'Orbitron, monospace', fontWeight: 900 }}>{PHASE_LABELS[launchSequence]}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                {MISSILE_PHASES.slice(0, -1).map((p, i) => (
                                    <motion.div key={p}
                                        animate={i === phaseIdx ? { opacity: [1, 0.3, 1] } : {}}
                                        transition={{ repeat: Infinity, duration: 0.5 }}
                                        style={{ flex: 1, height: 6, background: i <= phaseIdx ? '#DC2626' : 'rgba(220,38,38,0.15)', transition: 'background 0.3s' }} />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <motion.button
                            whileHover={selectedMissile && selectedTarget ? { scale: 1.02, boxShadow: '0 0 30px rgba(220,38,38,0.4)' } : {}}
                            whileTap={selectedMissile && selectedTarget ? { scale: 0.98 } : {}}
                            onClick={launchMissile}
                            disabled={!selectedMissile || !selectedTarget}
                            style={{ padding: '16px', background: selectedMissile && selectedTarget ? 'rgba(220,38,38,0.2)' : 'rgba(220,38,38,0.05)', border: `2px solid ${selectedMissile && selectedTarget ? '#DC2626' : '#DC262640'}`, color: selectedMissile && selectedTarget ? '#DC2626' : '#DC262640', cursor: selectedMissile && selectedTarget ? 'pointer' : 'not-allowed', fontFamily: 'Orbitron, monospace', fontSize: '14px', fontWeight: 900, letterSpacing: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                            <Bomb size={20} /> LAUNCH MISSILE
                        </motion.button>
                    )}

                    {/* Active Missile Tracking */}
                    {activeMissiles.length > 0 && (
                        <div style={{ maxHeight: '200px', overflow: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ color: '#DC262680', fontSize: '9px', fontFamily: 'monospace', letterSpacing: '1px' }}>LIVE MISSILE TRACKING</div>
                            {activeMissiles.map(m => (
                                <MissileTracker key={m.id} missile={m} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const MissileTracker = ({ missile }) => {
    const phaseColor = missile.phase === 'IMPACT' ? '#34D399' : missile.phase === 'TERMINAL' ? '#DC2626' : '#FBBF24';
    return (
        <motion.div
            animate={missile.phase === 'IMPACT' ? { borderColor: ['#34D39940', '#34D399', '#34D39940'] } : missile.phase === 'TERMINAL' ? { borderColor: ['#DC262640', '#DC2626', '#DC262640'] } : {}}
            transition={{ repeat: Infinity, duration: 1 }}
            style={{ padding: '10px 12px', background: 'rgba(0,0,0,0.4)', border: `1px solid ${phaseColor}30` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#fff', fontSize: '10px', fontWeight: 700 }}>{missile.id}</span>
                    <span style={{ color: '#ffffff50', fontSize: '9px', fontFamily: 'monospace' }}>{missile.type}</span>
                </div>
                <motion.span
                    animate={missile.phase === 'IMPACT' ? {} : { opacity: [1, 0.4, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    style={{ padding: '2px 8px', fontSize: '8px', fontWeight: 900, fontFamily: 'monospace', background: `${phaseColor}20`, color: phaseColor }}>
                    {PHASE_LABELS[missile.phase] || missile.phase}
                </motion.span>
            </div>
            <div style={{ color: '#ffffff40', fontSize: '8px', fontFamily: 'monospace', marginBottom: '6px' }}>
                Target: {missile.target} | Speed: {missile.speed}
            </div>
            <div style={{ width: '100%', height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden' }}>
                <motion.div
                    style={{ height: '100%', width: `${missile.progress}%`, background: phaseColor, borderRadius: 2, transition: 'width 0.2s linear' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                <span style={{ color: '#ffffff30', fontSize: '8px', fontFamily: 'monospace' }}>Progress</span>
                <span style={{ color: phaseColor, fontSize: '9px', fontWeight: 900, fontFamily: 'monospace' }}>{missile.progress.toFixed(1)}%</span>
            </div>
        </motion.div>
    );
};

/* ========================================================================== */
/*  AIR FORCE PANEL                                                            */
/* ========================================================================== */
const AirForcePanel = ({ getThreatColor }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <StatCard icon={<Users size={20} />} label="Personnel" value={airforceData.totalPersonnel} color="#60A5FA" />
            <StatCard icon={<Plane size={20} />} label="Aircraft" value={airforceData.aircraft} color="#60A5FA" />
            <StatCard icon={<Target size={20} />} label="Squadrons" value={airforceData.squadrons} color="#FBBF24" />
            <StatCard icon={<Navigation size={20} />} label="Air Bases" value={`${airforceData.airBases.length}+ Major`} color="#34D399" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <SectionCard title="AIR COMMANDS" icon={<Radio size={16} />}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {airforceData.commands.map((cmd, i) => (
                        <div key={i} style={{ padding: '10px 14px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(96,165,250,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ color: '#fff', fontSize: '12px', fontWeight: 700 }}>{cmd.name}</div>
                                <div style={{ color: '#60A5FA60', fontSize: '9px', fontFamily: 'monospace' }}>HQ: {cmd.hq} | {cmd.coverage}</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                {cmd.squadrons !== '-' && <span style={{ color: '#ffffff80', fontSize: '10px', fontFamily: 'monospace' }}>{cmd.squadrons} Sqn</span>}
                                <span style={{ padding: '2px 8px', fontSize: '8px', fontWeight: 700, fontFamily: 'monospace', background: getThreatColor(cmd.threatLevel) + '20', color: getThreatColor(cmd.threatLevel) }}>{cmd.threatLevel}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </SectionCard>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <SectionCard title="AIRCRAFT FLEET" icon={<Plane size={16} />}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {airforceData.fleet.map((f, i) => (
                            <div key={i} style={{ padding: '8px 12px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(96,165,250,0.08)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                    <span style={{ color: '#fff', fontSize: '11px', fontWeight: 700 }}>{f.type}</span>
                                    <span style={{ color: '#60A5FA', fontSize: '12px', fontWeight: 900, fontFamily: 'monospace' }}>{f.count}</span>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                    {f.models.map((m, j) => (
                                        <span key={j} style={{ padding: '1px 6px', fontSize: '8px', fontFamily: 'monospace', background: 'rgba(96,165,250,0.08)', color: '#60A5FA80', border: '1px solid rgba(96,165,250,0.1)' }}>{m}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </SectionCard>
                <SectionCard title="MISSILE SYSTEMS" icon={<Bomb size={16} />}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {airforceData.missiles.map((m, i) => (
                            <span key={i} style={{ padding: '4px 12px', fontSize: '10px', fontWeight: 700, fontFamily: 'monospace', background: 'rgba(248,113,113,0.1)', color: '#F87171', border: '1px solid rgba(248,113,113,0.2)' }}>{m}</span>
                        ))}
                    </div>
                </SectionCard>
                <SectionCard title="KEY AIR BASES" icon={<MapPin size={16} />}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {airforceData.airBases.map((b, i) => (
                            <span key={i} style={{ padding: '4px 12px', fontSize: '10px', fontWeight: 700, fontFamily: 'monospace', background: 'rgba(96,165,250,0.1)', color: '#60A5FA', border: '1px solid rgba(96,165,250,0.2)' }}>{b}</span>
                        ))}
                    </div>
                </SectionCard>
            </div>
        </div>
    </motion.div>
);

/* ========================================================================== */
/*  NAVY PANEL                                                                 */
/* ========================================================================== */
const NavyPanel = ({ getThreatColor }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <StatCard icon={<Users size={20} />} label="Personnel" value={navyData.totalPersonnel} color="#06B6D4" />
            <StatCard icon={<Anchor size={20} />} label="Vessels" value={navyData.vessels} color="#06B6D4" />
            <StatCard icon={<Eye size={20} />} label="Submarines" value={navyData.submarines} color="#FBBF24" />
            <StatCard icon={<Bomb size={20} />} label="Nuclear Triad" value="ACTIVE" color="#DC2626" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <SectionCard title="NAVAL COMMANDS" icon={<Radio size={16} />}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {navyData.commands.map((cmd, i) => (
                            <div key={i} style={{ padding: '10px 14px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(6,182,212,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div>
                                    <div style={{ color: '#fff', fontSize: '12px', fontWeight: 700 }}>{cmd.name}</div>
                                    <div style={{ color: '#06B6D460', fontSize: '9px', fontFamily: 'monospace' }}>HQ: {cmd.hq} | {cmd.coverage}</div>
                                </div>
                                <span style={{ padding: '2px 8px', fontSize: '8px', fontWeight: 700, fontFamily: 'monospace', background: getThreatColor(cmd.threatLevel) + '20', color: getThreatColor(cmd.threatLevel) }}>{cmd.threatLevel}</span>
                            </div>
                        ))}
                    </div>
                </SectionCard>
                <SectionCard title="NUCLEAR SUBMARINE TRIAD" icon={<Bomb size={16} />}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {navyData.nuclearTriad.map((n, i) => (
                            <div key={i} style={{ padding: '8px 12px', background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.15)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Zap size={14} color="#DC2626" />
                                <span style={{ color: '#F87171', fontSize: '11px', fontWeight: 700, fontFamily: 'monospace' }}>{n}</span>
                            </div>
                        ))}
                    </div>
                </SectionCard>
                <SectionCard title="NAVAL BASES" icon={<MapPin size={16} />}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {navyData.navalBases.map((b, i) => (
                            <span key={i} style={{ padding: '4px 12px', fontSize: '10px', fontWeight: 700, fontFamily: 'monospace', background: 'rgba(6,182,212,0.1)', color: '#06B6D4', border: '1px solid rgba(6,182,212,0.2)' }}>{b}</span>
                        ))}
                    </div>
                </SectionCard>
            </div>
            <SectionCard title="FLEET COMPOSITION" icon={<Anchor size={16} />}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {navyData.fleet.map((f, i) => (
                        <div key={i} style={{ padding: '8px 12px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(6,182,212,0.08)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                <span style={{ color: '#fff', fontSize: '11px', fontWeight: 700 }}>{f.type}</span>
                                <span style={{ color: '#06B6D4', fontSize: '12px', fontWeight: 900, fontFamily: 'monospace' }}>{f.count}</span>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                {f.vessels.map((v, j) => (
                                    <span key={j} style={{ padding: '1px 6px', fontSize: '8px', fontFamily: 'monospace', background: 'rgba(6,182,212,0.08)', color: '#06B6D480', border: '1px solid rgba(6,182,212,0.1)' }}>{v}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </SectionCard>
        </div>
    </motion.div>
);

/* ========================================================================== */
/*  PRESIDENTIAL COMMAND PANEL — 3-Factor Auth + RAW Meeting                   */
/* ========================================================================== */
const PresidentialPanel = ({
    commands, engagementActive, commandLog, selectedCommand, setSelectedCommand,
    revokeCommand, getTypeColor,
    triAuth, authStage, authScanning, initTriAuth, processAuth,
    rawMeeting, startRawMeeting, endRawMeeting, rawAttendees, rawMessages,
    rawAgenda, setRawAgenda, sendRawMessage
}) => {
    const messagesEndRef = useRef(null);
    useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [rawMessages]);

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            {/* Warning Banner */}
            <motion.div animate={{ borderColor: ['rgba(220,38,38,0.3)', 'rgba(220,38,38,0.8)', 'rgba(220,38,38,0.3)'] }} transition={{ repeat: Infinity, duration: 3 }}
                style={{ padding: '14px 20px', marginBottom: '20px', background: 'rgba(220,38,38,0.08)', border: '2px solid rgba(220,38,38,0.3)', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <AlertTriangle size={24} color="#DC2626" />
                <div>
                    <div style={{ color: '#DC2626', fontSize: '13px', fontFamily: 'Orbitron, monospace', fontWeight: 900 }}>3-FACTOR TRI-SERVICE AUTHORIZATION REQUIRED</div>
                    <div style={{ color: '#DC262680', fontSize: '9px', fontFamily: 'monospace', marginTop: '2px' }}>All missions require sequential authorization from Army Chief, Naval Chief, and Air Chief Marshal before engagement.</div>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Lock size={16} color="#DC2626" />
                    <span style={{ color: '#DC2626', fontSize: '10px', fontFamily: 'monospace', fontWeight: 700 }}>CLASSIFICATION: TOP SECRET</span>
                </div>
            </motion.div>

            {/* RAW Meeting Button */}
            <div style={{ marginBottom: '20px' }}>
                {!rawMeeting ? (
                    <motion.button whileHover={{ scale: 1.01, boxShadow: '0 0 20px rgba(167,139,250,0.3)' }} whileTap={{ scale: 0.99 }} onClick={startRawMeeting}
                        style={{ width: '100%', padding: '14px 20px', background: 'rgba(167,139,250,0.08)', border: '2px solid rgba(167,139,250,0.3)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <Eye size={22} color="#A78BFA" />
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ color: '#A78BFA', fontSize: '13px', fontFamily: 'Orbitron, monospace', fontWeight: 900 }}>CONVENE RAW SECRET MEETING</div>
                            <div style={{ color: '#A78BFA60', fontSize: '9px', fontFamily: 'monospace' }}>Research & Analysis Wing — Encrypted Channel — Eyes Only</div>
                        </div>
                        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Lock size={14} color="#A78BFA" />
                            <span style={{ color: '#A78BFA', fontSize: '9px', fontFamily: 'monospace' }}>AES-256 ENCRYPTED</span>
                        </div>
                    </motion.button>
                ) : (
                    <RawMeetingPanel rawMeeting={rawMeeting} rawAttendees={rawAttendees} rawMessages={rawMessages}
                        rawAgenda={rawAgenda} setRawAgenda={setRawAgenda} sendRawMessage={sendRawMessage}
                        endRawMeeting={endRawMeeting} messagesEndRef={messagesEndRef} />
                )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '20px' }}>
                {/* Command Cards with 3-Factor Auth */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {commands.map((cmd) => {
                        const isActive = engagementActive[cmd.id];
                        const typeColor = getTypeColor(cmd.type);
                        const auth = triAuth[cmd.id];
                        const stage = authStage[cmd.id];
                        return (
                            <motion.div key={cmd.id} whileHover={{ borderColor: typeColor + '60' }}
                                style={{ padding: '16px 20px', background: isActive ? `${typeColor}08` : 'rgba(0,0,0,0.3)', border: `1px solid ${isActive ? typeColor + '50' : 'rgba(255,255,255,0.05)'}`, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
                                onClick={() => setSelectedCommand(selectedCommand === cmd.id ? null : cmd.id)}>
                                {isActive && <motion.div animate={{ opacity: [0.05, 0.15, 0.05] }} transition={{ repeat: Infinity, duration: 2 }} style={{ position: 'absolute', inset: 0, background: typeColor }} />}
                                <div style={{ position: 'relative', zIndex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <span style={{ padding: '3px 10px', fontSize: '8px', fontWeight: 900, fontFamily: 'monospace', background: typeColor + '20', color: typeColor, border: `1px solid ${typeColor}40` }}>{cmd.type}</span>
                                            <span style={{ color: '#fff', fontSize: '14px', fontWeight: 900, fontFamily: 'Orbitron, monospace' }}>{cmd.name}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            {isActive && <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1 }} style={{ padding: '3px 12px', fontSize: '9px', fontWeight: 900, fontFamily: 'monospace', background: 'rgba(52,211,153,0.2)', color: '#34D399', border: '1px solid rgba(52,211,153,0.3)' }}>ENGAGED</motion.span>}
                                            <ChevronRight size={16} color="#ffffff40" style={{ transform: selectedCommand === cmd.id ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
                                        </div>
                                    </div>
                                    <p style={{ color: '#ffffff80', fontSize: '11px', lineHeight: '1.5' }}>{cmd.description}</p>

                                    <AnimatePresence>
                                        {selectedCommand === cmd.id && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                                                <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                                    <MiniData label="Target Theater" value={cmd.targetTheater} />
                                                    <MiniData label="Estimated Force" value={cmd.estimatedForce} />
                                                    <MiniData label="Branches" value={cmd.branches.join(', ')} />
                                                    <MiniData label="Readiness" value={cmd.readinessTime} />
                                                    <MiniData label="Authorization" value={cmd.authorization} color="#DC2626" />
                                                    <MiniData label="Classification" value={cmd.classification} color="#FBBF24" />
                                                </div>

                                                {/* 3-Factor Auth or Revoke */}
                                                <div style={{ marginTop: '14px' }}>
                                                    {!isActive ? (
                                                        auth ? (
                                                            <TriFactorAuthPanel commandId={cmd.id} auth={auth} stage={stage} authScanning={authScanning} processAuth={processAuth} />
                                                        ) : (
                                                            <motion.button whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(220,38,38,0.3)' }} whileTap={{ scale: 0.98 }}
                                                                onClick={(e) => { e.stopPropagation(); initTriAuth(cmd.id); }}
                                                                style={{ width: '100%', padding: '12px', background: 'rgba(220,38,38,0.15)', border: '2px solid #DC2626', color: '#DC2626', cursor: 'pointer', fontFamily: 'Orbitron, monospace', fontSize: '12px', fontWeight: 900, letterSpacing: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                                                <Target size={18} /> INITIATE 3-FACTOR AUTHORIZATION
                                                            </motion.button>
                                                        )
                                                    ) : (
                                                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                                            onClick={(e) => { e.stopPropagation(); revokeCommand(cmd.id); }}
                                                            style={{ width: '100%', padding: '12px', background: 'rgba(251,191,36,0.15)', border: '2px solid #FBBF24', color: '#FBBF24', cursor: 'pointer', fontFamily: 'Orbitron, monospace', fontSize: '12px', fontWeight: 900, letterSpacing: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                                            <XCircle size={18} /> REVOKE COMMAND
                                                        </motion.button>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Right Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <SectionCard title="ACTIVE ENGAGEMENTS" icon={<Zap size={16} />}>
                        {Object.keys(engagementActive).length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {Object.keys(engagementActive).map(id => {
                                    const cmd = commands.find(c => c.id === id);
                                    return (
                                        <motion.div key={id} animate={{ borderColor: [getTypeColor(cmd.type) + '30', getTypeColor(cmd.type) + '80', getTypeColor(cmd.type) + '30'] }} transition={{ repeat: Infinity, duration: 2 }}
                                            style={{ padding: '10px', background: getTypeColor(cmd.type) + '08', border: `1px solid ${getTypeColor(cmd.type)}30` }}>
                                            <div style={{ color: '#fff', fontSize: '11px', fontWeight: 700 }}>{cmd.name}</div>
                                            <div style={{ color: getTypeColor(cmd.type), fontSize: '9px', fontFamily: 'monospace' }}>{cmd.type}</div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div style={{ padding: '20px', textAlign: 'center' }}>
                                <Shield size={32} color="#ffffff10" style={{ margin: '0 auto 8px' }} />
                                <div style={{ color: '#ffffff30', fontSize: '10px', fontFamily: 'monospace' }}>No Active Engagements</div>
                            </div>
                        )}
                    </SectionCard>

                    <SectionCard title="COMMAND LOG" icon={<Clock size={16} />}>
                        {commandLog.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '300px', overflow: 'auto' }}>
                                {commandLog.map((log, i) => (
                                    <div key={i} style={{ padding: '8px 10px', background: 'rgba(0,0,0,0.3)', border: `1px solid ${log.status === 'ENGAGED' ? 'rgba(52,211,153,0.15)' : 'rgba(251,191,36,0.15)'}` }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ color: '#fff', fontSize: '10px', fontWeight: 700 }}>{log.command}</span>
                                            <span style={{ fontSize: '8px', fontWeight: 900, fontFamily: 'monospace', color: log.status === 'ENGAGED' ? '#34D399' : '#FBBF24' }}>{log.status}</span>
                                        </div>
                                        <div style={{ color: '#ffffff40', fontSize: '8px', fontFamily: 'monospace', marginTop: '2px' }}>
                                            {new Date(log.timestamp).toLocaleTimeString()} | {log.authBy}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={{ padding: '20px', textAlign: 'center' }}>
                                <Clock size={32} color="#ffffff10" style={{ margin: '0 auto 8px' }} />
                                <div style={{ color: '#ffffff30', fontSize: '10px', fontFamily: 'monospace' }}>No Commands Issued</div>
                            </div>
                        )}
                    </SectionCard>
                </div>
            </div>
        </motion.div>
    );
};

/* ========================================================================== */
/*  3-FACTOR TRI-SERVICE AUTH PANEL                                            */
/* ========================================================================== */
const TriFactorAuthPanel = ({ commandId, auth, stage, authScanning, processAuth }) => {
    const factors = [
        { id: 'army', label: 'CHIEF OF ARMY STAFF', designation: 'Factor 1 — Fingerprint + Auth Code', icon: <Fingerprint size={20} />, color: '#34D399', method: 'FINGERPRINT SCAN' },
        { id: 'navy', label: 'CHIEF OF NAVAL STAFF', designation: 'Factor 2 — Retinal Scan + Auth Code', icon: <Scan size={20} />, color: '#06B6D4', method: 'RETINAL SCAN' },
        { id: 'airforce', label: 'CHIEF OF AIR STAFF', designation: 'Factor 3 — Voice Auth + Auth Code', icon: <Mic size={20} />, color: '#60A5FA', method: 'VOICE RECOGNITION' }
    ];

    return (
        <div onClick={e => e.stopPropagation()} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(220,38,38,0.2)', padding: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <Lock size={14} color="#DC2626" />
                <span style={{ color: '#DC2626', fontSize: '10px', fontFamily: 'Orbitron, monospace', fontWeight: 700, letterSpacing: '2px' }}>TRI-SERVICE AUTHORIZATION</span>
                <div style={{ flex: 1, height: 1, background: 'rgba(220,38,38,0.2)' }} />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
                {factors.map((f) => {
                    const isVerified = auth[f.id];
                    const isActive = stage === f.id;
                    const isScanning = authScanning[`${commandId}-${f.id}`];
                    return (
                        <motion.div key={f.id}
                            animate={isActive && !isScanning ? { borderColor: [f.color + '40', f.color, f.color + '40'] } : {}}
                            transition={{ repeat: Infinity, duration: 2 }}
                            style={{ flex: 1, padding: '14px', textAlign: 'center', background: isVerified ? `${f.color}10` : 'rgba(0,0,0,0.3)', border: `2px solid ${isVerified ? f.color : isActive ? f.color + '60' : 'rgba(255,255,255,0.05)'}`, position: 'relative' }}>
                            {isScanning ? (
                                <>
                                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }} style={{ margin: '0 auto 8px', width: 32, height: 32 }}>
                                        <Activity size={32} color={f.color} />
                                    </motion.div>
                                    <div style={{ color: f.color, fontSize: '9px', fontFamily: 'Orbitron, monospace', fontWeight: 700 }}>SCANNING...</div>
                                    <div style={{ color: f.color + '60', fontSize: '8px', fontFamily: 'monospace', marginTop: 4 }}>{f.method}</div>
                                    <motion.div animate={{ width: ['0%', '100%'] }} transition={{ duration: 2.5 }} style={{ height: 3, background: f.color, marginTop: 8, borderRadius: 2 }} />
                                </>
                            ) : isVerified ? (
                                <>
                                    <CheckCircle size={32} color={f.color} style={{ margin: '0 auto 8px' }} />
                                    <div style={{ color: f.color, fontSize: '9px', fontFamily: 'Orbitron, monospace', fontWeight: 700 }}>VERIFIED</div>
                                    <div style={{ color: f.color + '60', fontSize: '8px', fontFamily: 'monospace', marginTop: 4 }}>{f.label}</div>
                                </>
                            ) : (
                                <>
                                    <div style={{ margin: '0 auto 8px', opacity: isActive ? 1 : 0.3 }}>{React.cloneElement(f.icon, { color: f.color })}</div>
                                    <div style={{ color: isActive ? f.color : '#ffffff30', fontSize: '9px', fontFamily: 'Orbitron, monospace', fontWeight: 700 }}>{f.label}</div>
                                    <div style={{ color: '#ffffff30', fontSize: '8px', fontFamily: 'monospace', marginTop: 4 }}>{f.designation}</div>
                                    {isActive && (
                                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                            onClick={() => processAuth(commandId, f.id)}
                                            style={{ marginTop: 10, padding: '6px 16px', background: `${f.color}20`, border: `1px solid ${f.color}`, color: f.color, cursor: 'pointer', fontFamily: 'monospace', fontSize: '9px', fontWeight: 700 }}>
                                            AUTHENTICATE
                                        </motion.button>
                                    )}
                                </>
                            )}
                        </motion.div>
                    );
                })}
            </div>
            {stage === 'complete' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: '12px', padding: '10px', background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)', textAlign: 'center' }}>
                    <div style={{ color: '#34D399', fontSize: '11px', fontFamily: 'Orbitron, monospace', fontWeight: 900 }}>ALL 3 FACTORS VERIFIED — ENGAGING...</div>
                </motion.div>
            )}
        </div>
    );
};

/* ========================================================================== */
/*  RAW SECRET MEETING PANEL                                                   */
/* ========================================================================== */
const RawMeetingPanel = ({ rawMeeting, rawAttendees, rawMessages, rawAgenda, setRawAgenda, sendRawMessage, endRawMeeting, messagesEndRef }) => (
    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
        style={{ background: 'rgba(167,139,250,0.04)', border: '2px solid rgba(167,139,250,0.25)', padding: '16px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid rgba(167,139,250,0.15)' }}>
            <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                <Eye size={20} color="#A78BFA" />
            </motion.div>
            <span style={{ color: '#A78BFA', fontSize: '12px', fontFamily: 'Orbitron, monospace', fontWeight: 900, letterSpacing: '2px' }}>RAW SECRET MEETING</span>
            <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}
                style={{ padding: '3px 10px', fontSize: '8px', fontWeight: 900, fontFamily: 'monospace', background: rawMeeting === 'IN_SESSION' ? 'rgba(52,211,153,0.2)' : rawMeeting === 'CONCLUDED' ? 'rgba(251,191,36,0.2)' : 'rgba(167,139,250,0.2)', color: rawMeeting === 'IN_SESSION' ? '#34D399' : rawMeeting === 'CONCLUDED' ? '#FBBF24' : '#A78BFA' }}>
                {rawMeeting === 'IN_SESSION' ? 'LIVE' : rawMeeting === 'CONCLUDED' ? 'CONCLUDED' : 'CONNECTING'}
            </motion.span>
            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Wifi size={12} color="#A78BFA" />
                <span style={{ color: '#A78BFA60', fontSize: '8px', fontFamily: 'monospace' }}>E2E ENCRYPTED</span>
            </div>
            {rawMeeting === 'IN_SESSION' && (
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={endRawMeeting}
                    style={{ padding: '6px 14px', background: 'rgba(220,38,38,0.15)', border: '1px solid #DC2626', color: '#DC2626', cursor: 'pointer', fontFamily: 'monospace', fontSize: '9px', fontWeight: 700 }}>
                    END MEETING
                </motion.button>
            )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '16px' }}>
            {/* Attendees */}
            <div>
                <div style={{ color: '#A78BFA80', fontSize: '9px', fontFamily: 'monospace', letterSpacing: '1px', marginBottom: '8px' }}>PRINCIPALS ({rawAttendees.filter(a => a.status === 'ONLINE').length}/{rawAttendees.length})</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {rawAttendees.map((a, i) => (
                        <div key={i} style={{ padding: '8px 10px', background: 'rgba(0,0,0,0.3)', border: `1px solid ${a.status === 'ONLINE' ? 'rgba(52,211,153,0.2)' : 'rgba(255,255,255,0.05)'}`, display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: 28, height: 28, borderRadius: '50%', background: a.status === 'ONLINE' ? 'rgba(167,139,250,0.2)' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 900, color: a.status === 'ONLINE' ? '#A78BFA' : '#ffffff30', fontFamily: 'monospace' }}>
                                {a.avatar}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ color: a.status === 'ONLINE' ? '#fff' : '#ffffff40', fontSize: '10px', fontWeight: 700 }}>{a.name}</div>
                                <div style={{ color: '#ffffff30', fontSize: '8px', fontFamily: 'monospace' }}>{a.designation}</div>
                            </div>
                            <motion.div animate={a.status === 'CONNECTING' ? { opacity: [1, 0.3, 1] } : {}} transition={{ repeat: Infinity, duration: 1 }}
                                style={{ width: 8, height: 8, borderRadius: '50%', background: a.status === 'ONLINE' ? '#34D399' : a.status === 'CONNECTING' ? '#FBBF24' : '#ffffff15' }} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat / Messages */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1, maxHeight: '240px', overflow: 'auto', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '10px', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(167,139,250,0.1)' }}>
                    {rawMessages.map((msg, i) => (
                        <div key={i} style={{ padding: '6px 10px', background: msg.sender === 'SYSTEM' ? 'rgba(167,139,250,0.06)' : msg.sender === 'SUPREME COMMANDER' ? 'rgba(220,38,38,0.06)' : 'rgba(0,0,0,0.2)', borderLeft: `3px solid ${msg.sender === 'SYSTEM' ? '#A78BFA40' : msg.sender === 'SUPREME COMMANDER' ? '#DC262660' : '#34D39960'}` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: msg.sender === 'SYSTEM' ? '#A78BFA' : msg.sender === 'SUPREME COMMANDER' ? '#DC2626' : '#34D399', fontSize: '9px', fontWeight: 700, fontFamily: 'monospace' }}>{msg.sender}</span>
                                <span style={{ color: '#ffffff30', fontSize: '8px', fontFamily: 'monospace' }}>{msg.time.toLocaleTimeString()}</span>
                            </div>
                            <div style={{ color: '#ffffffCC', fontSize: '11px', marginTop: '2px' }}>{msg.text}</div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                {rawMeeting === 'IN_SESSION' && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <input type="text" placeholder="Type classified message..." value={rawAgenda} onChange={e => setRawAgenda(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && sendRawMessage()}
                            style={{ flex: 1, padding: '10px 14px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(167,139,250,0.3)', color: '#A78BFA', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', outline: 'none' }} />
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={sendRawMessage}
                            style={{ padding: '10px 20px', background: 'rgba(167,139,250,0.2)', border: '1px solid #A78BFA', color: '#A78BFA', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'monospace', fontWeight: 700, fontSize: '11px' }}>
                            <Send size={14} /> SEND
                        </motion.button>
                    </div>
                )}
            </div>
        </div>
    </motion.div>
);

/* ========================================================================== */
/*  SECURE LOGIN GATE                                                          */
/* ========================================================================== */
const SecureLoginGate = ({ onAuthenticated, onBack }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [verifying, setVerifying] = useState(false);
    const [scanPhase, setScanPhase] = useState(null);
    const [loginTime] = useState(new Date());

    const handleLogin = () => {
        if (!selectedUser || !password) { setError('Select identity and enter authorization code'); return; }
        const user = AUTHORIZED_USERS.find(u => u.id === selectedUser);
        if (user && user.password === password) {
            setError('');
            setVerifying(true);
            setScanPhase('BIOMETRIC');
            setTimeout(() => setScanPhase('RETINAL'), 1500);
            setTimeout(() => setScanPhase('CLEARANCE'), 3000);
            setTimeout(() => {
                setScanPhase('GRANTED');
                setTimeout(() => onAuthenticated(user), 1000);
            }, 4500);
        } else {
            setError('AUTHORIZATION DENIED — Invalid credentials. This attempt has been logged.');
            setPassword('');
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'linear-gradient(135deg, #020617 0%, #0a0e1a 50%, #020617 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'linear-gradient(#00FFCC 1px, transparent 1px), linear-gradient(90deg, #00FFCC 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onBack}
                style={{ position: 'absolute', top: 20, right: 20, width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,0,0,0.1)', border: '1px solid rgba(255,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}>
                <X size={20} color="#ff4444" />
            </motion.button>

            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}
                style={{ width: 520, background: 'rgba(0,0,0,0.6)', border: '2px solid rgba(220,38,38,0.3)', padding: '40px', position: 'relative', backdropFilter: 'blur(20px)' }}>
                <motion.div animate={{ borderColor: ['rgba(220,38,38,0.2)', 'rgba(220,38,38,0.6)', 'rgba(220,38,38,0.2)'] }} transition={{ repeat: Infinity, duration: 3 }}
                    style={{ position: 'absolute', inset: -2, border: '2px solid rgba(220,38,38,0.2)', pointerEvents: 'none' }} />

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 3 }}>
                        <Shield size={48} color="#DC2626" style={{ margin: '0 auto 16px' }} />
                    </motion.div>
                    <h1 style={{ color: '#DC2626', fontSize: '16px', fontFamily: 'Orbitron, monospace', fontWeight: 900, letterSpacing: '4px', marginBottom: 6 }}>RESTRICTED ACCESS</h1>
                    <p style={{ color: '#DC262660', fontSize: '9px', fontFamily: 'monospace', letterSpacing: '2px' }}>ARMED FORCES COMMAND CENTER — INDIA</p>
                    <p style={{ color: '#ffffff20', fontSize: '8px', fontFamily: 'monospace', marginTop: 8 }}>UNAUTHORIZED ACCESS IS A CRIMINAL OFFENSE UNDER OFFICIAL SECRETS ACT, 1923</p>
                </div>

                {verifying ? (
                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                        <motion.div animate={{ rotate: scanPhase === 'GRANTED' ? 0 : 360 }} transition={{ repeat: scanPhase === 'GRANTED' ? 0 : Infinity, duration: 2, ease: 'linear' }}
                            style={{ margin: '0 auto 20px', width: 64, height: 64 }}>
                            {scanPhase === 'GRANTED' ? <CheckCircle size={64} color="#34D399" /> : <Activity size={64} color={scanPhase === 'BIOMETRIC' ? '#FBBF24' : scanPhase === 'RETINAL' ? '#60A5FA' : '#A78BFA'} />}
                        </motion.div>
                        <div style={{ color: scanPhase === 'GRANTED' ? '#34D399' : '#FBBF24', fontSize: '13px', fontFamily: 'Orbitron, monospace', fontWeight: 900, marginBottom: 8 }}>
                            {scanPhase === 'BIOMETRIC' && 'BIOMETRIC VERIFICATION...'}
                            {scanPhase === 'RETINAL' && 'RETINAL SCAN IN PROGRESS...'}
                            {scanPhase === 'CLEARANCE' && 'VERIFYING SECURITY CLEARANCE...'}
                            {scanPhase === 'GRANTED' && 'ACCESS GRANTED'}
                        </div>
                        {scanPhase !== 'GRANTED' && (
                            <motion.div animate={{ width: ['0%', '100%'] }} transition={{ duration: 4.5 }}
                                style={{ height: 3, background: '#FBBF24', margin: '16px auto 0', maxWidth: 300, borderRadius: 2 }} />
                        )}
                        {scanPhase === 'GRANTED' && (
                            <div style={{ color: '#34D39960', fontSize: '10px', fontFamily: 'monospace' }}>
                                Welcome, {AUTHORIZED_USERS.find(u => u.id === selectedUser)?.name}
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {/* User Selection */}
                        <div style={{ marginBottom: '20px' }}>
                            <div style={{ color: '#DC262680', fontSize: '9px', fontFamily: 'monospace', letterSpacing: '1px', marginBottom: '10px' }}>SELECT IDENTITY</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                {AUTHORIZED_USERS.map(user => (
                                    <motion.div key={user.id} whileHover={{ borderColor: '#DC262660' }}
                                        onClick={() => { setSelectedUser(user.id); setError(''); }}
                                        style={{ padding: '12px', background: selectedUser === user.id ? 'rgba(220,38,38,0.15)' : 'rgba(0,0,0,0.3)', border: `2px solid ${selectedUser === user.id ? '#DC2626' : 'rgba(255,255,255,0.05)'}`, cursor: 'pointer', textAlign: 'center' }}>
                                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: selectedUser === user.id ? 'rgba(220,38,38,0.3)' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontSize: '11px', fontWeight: 900, color: selectedUser === user.id ? '#DC2626' : '#ffffff40', fontFamily: 'monospace' }}>
                                            {user.avatar}
                                        </div>
                                        <div style={{ color: selectedUser === user.id ? '#fff' : '#ffffff60', fontSize: '10px', fontWeight: 700 }}>{user.name}</div>
                                        <div style={{ color: selectedUser === user.id ? '#DC262680' : '#ffffff30', fontSize: '8px', fontFamily: 'monospace', marginTop: 2 }}>{user.title}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Password */}
                        <div style={{ marginBottom: '20px' }}>
                            <div style={{ color: '#DC262680', fontSize: '9px', fontFamily: 'monospace', letterSpacing: '1px', marginBottom: '8px' }}>AUTHORIZATION CODE</div>
                            <input type="password" placeholder="Enter classified authorization code"
                                value={password} onChange={e => { setPassword(e.target.value); setError(''); }}
                                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                                style={{ width: '100%', padding: '14px 18px', background: 'rgba(0,0,0,0.5)', border: '2px solid rgba(220,38,38,0.2)', color: '#DC2626', fontFamily: 'JetBrains Mono, monospace', fontSize: '14px', fontWeight: 700, letterSpacing: '4px', outline: 'none', boxSizing: 'border-box' }} />
                        </div>

                        {error && (
                            <motion.div initial={{ x: -10 }} animate={{ x: 0 }}
                                style={{ padding: '10px 14px', background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <XCircle size={14} color="#DC2626" />
                                <span style={{ color: '#DC2626', fontSize: '10px', fontFamily: 'monospace' }}>{error}</span>
                            </motion.div>
                        )}

                        <motion.button whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(220,38,38,0.3)' }} whileTap={{ scale: 0.98 }}
                            onClick={handleLogin}
                            style={{ width: '100%', padding: '14px', background: 'rgba(220,38,38,0.2)', border: '2px solid #DC2626', color: '#DC2626', cursor: 'pointer', fontFamily: 'Orbitron, monospace', fontSize: '13px', fontWeight: 900, letterSpacing: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                            <Lock size={18} /> AUTHENTICATE
                        </motion.button>

                        <div style={{ marginTop: '20px', textAlign: 'center', color: '#ffffff15', fontSize: '8px', fontFamily: 'monospace', lineHeight: '1.8' }}>
                            SESSION: {loginTime.toISOString()} | ENCRYPTION: AES-256-GCM<br />
                            ALL ACCESS ATTEMPTS MONITORED BY NIA CYBERSECURITY DIVISION
                        </div>
                    </>
                )}
            </motion.div>
        </motion.div>
    );
};

/* ========================================================================== */
/*  INCOMING MISSILE DEFENSE SYSTEM                                            */
/* ========================================================================== */
const IncomingMissileDefense = ({ incomingThreats, defenseSystems, threatIntel, onClose }) => (
    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
        style={{ background: 'rgba(220,38,38,0.06)', borderBottom: '2px solid rgba(220,38,38,0.3)', padding: '16px 24px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}>
                <AlertTriangle size={20} color="#DC2626" />
            </motion.div>
            <span style={{ color: '#DC2626', fontSize: '12px', fontFamily: 'Orbitron, monospace', fontWeight: 900, letterSpacing: '2px' }}>MISSILE DEFENSE SHIELD — INTEGRATED AIR DEFENSE</span>
            <div style={{ flex: 1 }} />
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onClose}
                style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', padding: 4, display: 'flex' }}>
                <X size={14} color="#ffffff60" />
            </motion.button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            {/* Incoming Threats */}
            <div>
                <div style={{ color: '#DC262680', fontSize: '9px', fontFamily: 'monospace', letterSpacing: '1px', marginBottom: '8px' }}>INCOMING THREATS ({incomingThreats.length})</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '200px', overflow: 'auto' }}>
                    {incomingThreats.map(t => {
                        const isLive = t.status !== 'INTERCEPTED';
                        const statusColor = t.status === 'INTERCEPTED' ? '#34D399' : t.status === 'S-400 ENGAGING' ? '#FBBF24' : '#DC2626';
                        return (
                            <motion.div key={t.uid}
                                animate={isLive ? { borderColor: ['#DC262630', '#DC2626', '#DC262630'] } : {}}
                                transition={{ repeat: Infinity, duration: 1 }}
                                style={{ padding: '10px', background: 'rgba(0,0,0,0.4)', border: `1px solid ${statusColor}30` }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                    <span style={{ color: '#fff', fontSize: '11px', fontWeight: 700 }}>{t.missile}</span>
                                    <motion.span animate={isLive ? { opacity: [1, 0.3, 1] } : {}} transition={{ repeat: Infinity, duration: 0.6 }}
                                        style={{ padding: '2px 8px', fontSize: '8px', fontWeight: 900, fontFamily: 'monospace', background: `${statusColor}20`, color: statusColor }}>
                                        {t.status}
                                    </motion.span>
                                </div>
                                <div style={{ color: '#ffffff50', fontSize: '9px', fontFamily: 'monospace' }}>
                                    Origin: {t.origin} | Target: {t.targetCity} | Speed: {t.speed}
                                </div>
                                <div style={{ width: '100%', height: 3, background: 'rgba(255,255,255,0.05)', marginTop: 6, borderRadius: 2, overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: `${t.progress}%`, background: statusColor, transition: 'width 0.3s', borderRadius: 2 }} />
                                </div>
                                {t.interceptedBy && <div style={{ color: '#34D39980', fontSize: '8px', fontFamily: 'monospace', marginTop: 4 }}>Intercepted by: {t.interceptedBy}</div>}
                            </motion.div>
                        );
                    })}
                    {incomingThreats.length === 0 && (
                        <div style={{ padding: '20px', textAlign: 'center', color: '#ffffff20', fontSize: '10px', fontFamily: 'monospace' }}>No incoming threats detected</div>
                    )}
                </div>
            </div>

            {/* Defense Systems Status */}
            <div>
                <div style={{ color: '#34D39980', fontSize: '9px', fontFamily: 'monospace', letterSpacing: '1px', marginBottom: '8px' }}>DEFENSE SYSTEMS STATUS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '200px', overflow: 'auto' }}>
                    {defenseSystems.map(d => {
                        const sColor = d.status === 'KILL CONFIRMED' ? '#34D399' : d.status === 'ENGAGING' || d.status === 'ENGAGING (BACKUP)' ? '#DC2626' : d.status === 'TRACKING' ? '#FBBF24' : '#00FFCC';
                        return (
                            <motion.div key={d.id}
                                animate={d.status === 'ENGAGING' ? { borderColor: ['#DC262630', '#DC2626', '#DC262630'] } : {}}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                style={{ padding: '8px 10px', background: 'rgba(0,0,0,0.3)', border: `1px solid ${sColor}20`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div>
                                    <div style={{ color: '#fff', fontSize: '10px', fontWeight: 700 }}>{d.name}</div>
                                    <div style={{ color: '#ffffff40', fontSize: '8px', fontFamily: 'monospace' }}>{d.location} | Range: {d.range} | P(kill): {d.killProb}</div>
                                </div>
                                <motion.span
                                    animate={d.status === 'ENGAGING' || d.status === 'ENGAGING (BACKUP)' ? { opacity: [1, 0.3, 1] } : {}}
                                    transition={{ repeat: Infinity, duration: 0.5 }}
                                    style={{ padding: '2px 8px', fontSize: '7px', fontWeight: 900, fontFamily: 'monospace', background: `${sColor}15`, color: sColor, whiteSpace: 'nowrap' }}>
                                    {d.status}
                                </motion.span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Intelligence Reports */}
            <div>
                <div style={{ color: '#FBBF2480', fontSize: '9px', fontFamily: 'monospace', letterSpacing: '1px', marginBottom: '8px' }}>THREAT INTELLIGENCE</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '200px', overflow: 'auto' }}>
                    {threatIntel.map(intel => (
                        <div key={intel.id} style={{ padding: '10px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(251,191,36,0.15)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                <span style={{ color: '#FBBF24', fontSize: '10px', fontWeight: 900, fontFamily: 'Orbitron, monospace' }}>{intel.missile}</span>
                                <span style={{ padding: '2px 8px', fontSize: '7px', fontWeight: 900, fontFamily: 'monospace', background: 'rgba(52,211,153,0.2)', color: '#34D399' }}>{intel.result}</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                                <IntelItem label="Origin Country" value={intel.origin} color="#DC2626" />
                                <IntelItem label="Launch Site" value={intel.launchSite} color="#F87171" />
                                <IntelItem label="Target" value={intel.targetCity} color="#FBBF24" />
                                <IntelItem label="Speed" value={intel.speed} color="#60A5FA" />
                                <IntelItem label="Warhead" value={intel.warhead} color="#A78BFA" />
                                <IntelItem label="Intercepted By" value={intel.interceptedBy} color="#34D399" />
                            </div>
                            <div style={{ marginTop: '6px', padding: '6px 8px', background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.1)' }}>
                                <div style={{ color: '#ffffff30', fontSize: '7px', fontFamily: 'monospace', letterSpacing: '1px', marginBottom: '2px' }}>MISSILE TECHNOLOGY ANALYSIS</div>
                                <div style={{ color: '#FBBF24CC', fontSize: '9px', fontFamily: 'monospace', lineHeight: '1.5' }}>{intel.technology}</div>
                            </div>
                        </div>
                    ))}
                    {threatIntel.length === 0 && (
                        <div style={{ padding: '20px', textAlign: 'center', color: '#ffffff20', fontSize: '10px', fontFamily: 'monospace' }}>No intelligence reports yet</div>
                    )}
                </div>
            </div>
        </div>
    </motion.div>
);

const IntelItem = ({ label, value, color }) => (
    <div>
        <div style={{ color: '#ffffff25', fontSize: '7px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
        <div style={{ color, fontSize: '9px', fontWeight: 700, fontFamily: 'monospace' }}>{value}</div>
    </div>
);

/* ========================================================================== */
/*  REUSABLE COMPONENTS                                                        */
/* ========================================================================== */
const StatCard = ({ icon, label, value, color }) => (
    <motion.div whileHover={{ borderColor: color + '50', y: -2 }}
        style={{ padding: '16px 20px', background: 'rgba(0,0,0,0.4)', border: `1px solid ${color}20`, display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ color }}>{icon}</div>
        <div>
            <div style={{ color: color + '80', fontSize: '8px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</div>
            <div style={{ color: '#fff', fontSize: '18px', fontWeight: 900, fontFamily: 'JetBrains Mono, monospace' }}>{value}</div>
        </div>
    </motion.div>
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
    <div style={{ marginBottom: '6px' }}>
        <div style={{ color: '#ffffff30', fontSize: '8px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>{label}</div>
        <div style={{ color, fontSize: '11px', fontWeight: 700, fontFamily: 'monospace' }}>{value}</div>
    </div>
);

export default ArmedForcesCommand;
