import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText, Folder, Lock, Shield, Rocket, Zap, Building2,
    Factory, Plane, Ship, Radio, Atom, Satellite, ChevronRight,
    Download, Eye, Search, ArrowLeft, AlertTriangle, ShieldCheck,
    Target, Anchor, Wind,

} from 'lucide-react';

// Government Ministries and National Assets Data
const governmentData = {
    ministries: [
        {
            id: 'mod',
            name: 'Ministry of Defence',
            icon: Shield,
            color: '#ff0000',
            classification: 'TOP SECRET',
            files: [
                { name: 'Strategic_Defense_Review_2026.pdf', size: '12.4 MB', classification: 'TOP SECRET', date: '2026-02-15' },
                { name: 'Border_Security_Assessment.pdf', size: '8.7 MB', classification: 'SECRET', date: '2026-02-10' },
                { name: 'Military_Modernization_Plan.pdf', size: '15.2 MB', classification: 'TOP SECRET', date: '2026-02-05' },
                { name: 'Joint_Operations_Protocol.pdf', size: '6.3 MB', classification: 'CONFIDENTIAL', date: '2026-01-28' },
                { name: 'Defense_Procurement_2026.pdf', size: '9.1 MB', classification: 'SECRET', date: '2026-01-20' }
            ]
        },
        {
            id: 'mha',
            name: 'Ministry of Home Affairs',
            icon: ShieldCheck,
            color: '#ff6b00',
            classification: 'SECRET',
            files: [
                { name: 'Internal_Security_Report.pdf', size: '10.2 MB', classification: 'SECRET', date: '2026-02-12' },
                { name: 'Counter_Terrorism_Strategy.pdf', size: '7.8 MB', classification: 'TOP SECRET', date: '2026-02-08' },
                { name: 'Border_Management_Plan.pdf', size: '5.4 MB', classification: 'CONFIDENTIAL', date: '2026-01-30' },
                { name: 'Intelligence_Coordination.pdf', size: '6.9 MB', classification: 'SECRET', date: '2026-01-25' },
                { name: 'Cybersecurity_Framework.pdf', size: '4.2 MB', classification: 'CONFIDENTIAL', date: '2026-01-15' }
            ]
        },
        {
            id: 'mea',
            name: 'Ministry of External Affairs',
            icon: Building2,
            color: '#00FFCC',
            classification: 'CONFIDENTIAL',
            files: [
                { name: 'Diplomatic_Relations_Asia.pdf', size: '8.5 MB', classification: 'CONFIDENTIAL', date: '2026-02-14' },
                { name: 'Strategic_Partnerships_2026.pdf', size: '11.3 MB', classification: 'SECRET', date: '2026-02-09' },
                { name: 'Trade_Negotiations_Summary.pdf', size: '6.7 MB', classification: 'CONFIDENTIAL', date: '2026-02-01' },
                { name: 'Regional_Security_Analysis.pdf', size: '9.8 MB', classification: 'SECRET', date: '2026-01-22' },
                { name: 'UN_Mission_Reports.pdf', size: '5.1 MB', classification: 'UNCLASSIFIED', date: '2026-01-18' }
            ]
        },
        {
            id: 'dae',
            name: 'Department of Atomic Energy',
            icon: Atom,
            color: '#00ff00',
            classification: 'TOP SECRET',
            files: [
                { name: 'Nuclear_Program_Status.pdf', size: '14.6 MB', classification: 'TOP SECRET', date: '2026-02-13' },
                { name: 'Reactor_Safety_Protocols.pdf', size: '7.2 MB', classification: 'SECRET', date: '2026-02-07' },
                { name: 'Research_Initiatives_2026.pdf', size: '10.4 MB', classification: 'CONFIDENTIAL', date: '2026-01-29' },
                { name: 'Fuel_Cycle_Management.pdf', size: '8.9 MB', classification: 'SECRET', date: '2026-01-24' },
                { name: 'International_Cooperation.pdf', size: '5.8 MB', classification: 'CONFIDENTIAL', date: '2026-01-16' }
            ]
        },
        {
            id: 'dos',
            name: 'Department of Space',
            icon: Satellite,
            color: '#9333ea',
            classification: 'SECRET',
            files: [
                { name: 'Satellite_Launch_Schedule.pdf', size: '6.4 MB', classification: 'CONFIDENTIAL', date: '2026-02-11' },
                { name: 'Space_Technology_Roadmap.pdf', size: '12.1 MB', classification: 'SECRET', date: '2026-02-06' },
                { name: 'Gaganyaan_Mission_Update.pdf', size: '9.3 MB', classification: 'CONFIDENTIAL', date: '2026-01-31' },
                { name: 'Remote_Sensing_Data.pdf', size: '15.7 MB', classification: 'SECRET', date: '2026-01-26' },
                { name: 'International_Collaborations.pdf', size: '4.9 MB', classification: 'UNCLASSIFIED', date: '2026-01-19' }
            ]
        }
    ],
    nationalAssets: [
        {
            id: 'isro',
            name: 'Indian Space Research Organisation',
            icon: Rocket,
            color: '#3b82f6',
            classification: 'SECRET',
            files: [
                { name: 'PSLV_Launch_Manifest.pdf', size: '7.8 MB', classification: 'CONFIDENTIAL', date: '2026-02-16' },
                { name: 'Chandrayaan_4_Planning.pdf', size: '13.2 MB', classification: 'SECRET', date: '2026-02-11' },
                { name: 'Navigation_Satellite_System.pdf', size: '10.6 MB', classification: 'SECRET', date: '2026-02-04' },
                { name: 'Mars_Orbiter_Mission_II.pdf', size: '11.9 MB', classification: 'CONFIDENTIAL', date: '2026-01-27' },
                { name: 'Launch_Vehicle_Development.pdf', size: '8.4 MB', classification: 'SECRET', date: '2026-01-21' }
            ]
        },
        {
            id: 'drdo',
            name: 'Defence Research & Development Organisation',
            icon: Zap,
            color: '#ef4444',
            classification: 'TOP SECRET',
            files: [
                { name: 'Missile_Systems_Development.pdf', size: '16.3 MB', classification: 'TOP SECRET', date: '2026-02-14' },
                { name: 'Advanced_Weapons_Research.pdf', size: '14.8 MB', classification: 'TOP SECRET', date: '2026-02-09' },
                { name: 'Hypersonic_Technology.pdf', size: '12.5 MB', classification: 'TOP SECRET', date: '2026-02-03' },
                { name: 'Electronic_Warfare_Systems.pdf', size: '9.7 MB', classification: 'SECRET', date: '2026-01-28' },
                { name: 'Unmanned_Systems_Program.pdf', size: '11.2 MB', classification: 'SECRET', date: '2026-01-23' }
            ]
        },
        {
            id: 'hal',
            name: 'Hindustan Aeronautics Limited',
            icon: Plane,
            color: '#f59e0b',
            classification: 'SECRET',
            files: [
                { name: 'Tejas_MkII_Production.pdf', size: '10.1 MB', classification: 'SECRET', date: '2026-02-13' },
                { name: 'AMCA_Development_Status.pdf', size: '13.7 MB', classification: 'TOP SECRET', date: '2026-02-08' },
                { name: 'Helicopter_Manufacturing.pdf', size: '8.3 MB', classification: 'CONFIDENTIAL', date: '2026-02-02' },
                { name: 'Engine_Technology_Transfer.pdf', size: '7.6 MB', classification: 'SECRET', date: '2026-01-29' },
                { name: 'Export_Opportunities.pdf', size: '5.9 MB', classification: 'CONFIDENTIAL', date: '2026-01-24' }
            ]
        },
        {
            id: 'bhel',
            name: 'Bharat Heavy Electricals Limited',
            icon: Factory,
            color: '#10b981',
            classification: 'CONFIDENTIAL',
            files: [
                { name: 'Power_Plant_Projects.pdf', size: '9.4 MB', classification: 'CONFIDENTIAL', date: '2026-02-12' },
                { name: 'Renewable_Energy_Systems.pdf', size: '11.8 MB', classification: 'UNCLASSIFIED', date: '2026-02-07' },
                { name: 'Nuclear_Equipment_Supply.pdf', size: '8.1 MB', classification: 'SECRET', date: '2026-02-01' },
                { name: 'Defense_Electronics.pdf', size: '6.5 MB', classification: 'CONFIDENTIAL', date: '2026-01-26' },
                { name: 'Export_Contracts.pdf', size: '4.7 MB', classification: 'UNCLASSIFIED', date: '2026-01-20' }
            ]
        },
        {
            id: 'mdl',
            name: 'Mazagon Dock Shipbuilders',
            icon: Ship,
            color: '#06b6d4',
            classification: 'SECRET',
            files: [
                { name: 'Submarine_Construction.pdf', size: '12.9 MB', classification: 'TOP SECRET', date: '2026-02-15' },
                { name: 'Destroyer_Program_Update.pdf', size: '10.7 MB', classification: 'SECRET', date: '2026-02-10' },
                { name: 'Naval_Modernization.pdf', size: '9.2 MB', classification: 'SECRET', date: '2026-02-05' },
                { name: 'Shipbuilding_Technology.pdf', size: '7.4 MB', classification: 'CONFIDENTIAL', date: '2026-01-30' },
                { name: 'Export_Potential.pdf', size: '5.3 MB', classification: 'CONFIDENTIAL', date: '2026-01-25' }
            ]
        },
        {
            id: 'ntpc',
            name: 'National Thermal Power Corporation',
            icon: Zap,
            color: '#eab308',
            classification: 'CONFIDENTIAL',
            files: [
                { name: 'Power_Generation_Report.pdf', size: '8.6 MB', classification: 'UNCLASSIFIED', date: '2026-02-14' },
                { name: 'Green_Energy_Transition.pdf', size: '10.3 MB', classification: 'CONFIDENTIAL', date: '2026-02-09' },
                { name: 'Grid_Infrastructure.pdf', size: '7.9 MB', classification: 'CONFIDENTIAL', date: '2026-02-04' },
                { name: 'Coal_Supply_Chain.pdf', size: '6.2 MB', classification: 'UNCLASSIFIED', date: '2026-01-28' },
                { name: 'Strategic_Reserves.pdf', size: '5.5 MB', classification: 'CONFIDENTIAL', date: '2026-01-22' }
            ]
        },
        {
            id: 'bel',
            name: 'Bharat Electronics Limited',
            icon: Radio,
            color: '#8b5cf6',
            classification: 'SECRET',
            files: [
                { name: 'Radar_Systems_Development.pdf', size: '11.5 MB', classification: 'SECRET', date: '2026-02-13' },
                { name: 'Communication_Equipment.pdf', size: '9.8 MB', classification: 'SECRET', date: '2026-02-08' },
                { name: 'Electronic_Warfare_Tech.pdf', size: '13.4 MB', classification: 'TOP SECRET', date: '2026-02-03' },
                { name: 'Avionics_Systems.pdf', size: '8.7 MB', classification: 'SECRET', date: '2026-01-29' },
                { name: 'Export_Achievements.pdf', size: '6.1 MB', classification: 'CONFIDENTIAL', date: '2026-01-24' }
            ]
        }
    ],
    armedForces: [
        {
            id: 'army',
            name: 'Indian Army',
            icon: Target,
            color: '#4b5320',
            classification: 'TOP SECRET',
            files: [
                { name: 'Border_Deployment_Strategy.pdf', size: '14.2 MB', classification: 'TOP SECRET', date: '2026-02-18' },
                { name: 'Mountain_Warfare_Tactics.pdf', size: '11.5 MB', classification: 'SECRET', date: '2026-02-12' },
                { name: 'Infantry_Modernization.pdf', size: '9.8 MB', classification: 'CONFIDENTIAL', date: '2026-02-05' },
                { name: 'Artillery_Procurement_Plan.pdf', size: '7.4 MB', classification: 'SECRET', date: '2026-01-28' },
                { name: 'Surgical_Strike_Protocols.pdf', size: '5.1 MB', classification: 'TOP SECRET', date: '2026-01-20' }
            ]
        },
        {
            id: 'navy',
            name: 'Indian Navy',
            icon: Anchor,
            color: '#000080',
            classification: 'SECRET',
            files: [
                { name: 'Indo_Pacific_Strategy.pdf', size: '13.6 MB', classification: 'SECRET', date: '2026-02-17' },
                { name: 'Submarine_Fleet_Expansion.pdf', size: '10.9 MB', classification: 'TOP SECRET', date: '2026-02-10' },
                { name: 'Carrier_Battle_Group_Ops.pdf', size: '15.4 MB', classification: 'SECRET', date: '2026-02-03' },
                { name: 'Maritime_Surveillance_Net.pdf', size: '8.2 MB', classification: 'CONFIDENTIAL', date: '2026-01-27' },
                { name: 'Anti_Piracy_Operations.pdf', size: '6.7 MB', classification: 'UNCLASSIFIED', date: '2026-01-19' }
            ]
        },
        {
            id: 'airforce',
            name: 'Indian Air Force',
            icon: Wind,
            color: '#87CEEB',
            classification: 'TOP SECRET',
            files: [
                { name: 'Air_Superiority_Doctrine.pdf', size: '12.8 MB', classification: 'TOP SECRET', date: '2026-02-16' },
                { name: 'Next_Gen_Fighter_Specs.pdf', size: '14.5 MB', classification: 'SECRET', date: '2026-02-09' },
                { name: 'Drone_Swarm_Capabilities.pdf', size: '9.3 MB', classification: 'TOP SECRET', date: '2026-02-02' },
                { name: 'Strategic_Airlift_Review.pdf', size: '7.9 MB', classification: 'CONFIDENTIAL', date: '2026-01-26' },
                { name: 'Space_Warfare_Integration.pdf', size: '6.4 MB', classification: 'SECRET', date: '2026-01-18' }
            ]
        }
    ]
};

const GovernmentFiles = ({ onBack }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedOrg, setSelectedOrg] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewingFile, setViewingFile] = useState(null);
    const [annotations, setAnnotations] = useState({});
    const [showAnnotationTools, setShowAnnotationTools] = useState(false);

    // Export/Download functionality
    const downloadDocument = (file, orgName) => {
        const content = getDocumentContent(file, orgName);
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name.replace('.pdf', '.txt');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // Annotation functionality
    const addAnnotation = (fileId, annotation) => {
        setAnnotations(prev => ({
            ...prev,
            [fileId]: [...(prev[fileId] || []), annotation]
        }));
        // Persist to localStorage
        localStorage.setItem('fileAnnotations', JSON.stringify({
            ...annotations,
            [fileId]: [...(annotations[fileId] || []), annotation]
        }));
    };

    const removeAnnotation = (fileId, annotationId) => {
        setAnnotations(prev => ({
            ...prev,
            [fileId]: prev[fileId].filter(a => a.id !== annotationId)
        }));
    };

    // Load annotations from localStorage on mount
    React.useEffect(() => {
        const saved = localStorage.getItem('fileAnnotations');
        if (saved) {
            setAnnotations(JSON.parse(saved));
        }
    }, []);

    const getClassificationColor = (classification) => {
        switch (classification) {
            case 'TOP SECRET': return 'text-red-500 bg-red-500/20 border-red-500/50';
            case 'SECRET': return 'text-orange-500 bg-orange-500/20 border-orange-500/50';
            case 'CONFIDENTIAL': return 'text-amber-500 bg-amber-500/20 border-amber-500/50';
            default: return 'text-emerald-500 bg-emerald-500/20 border-emerald-500/50';
        }
    };

    const getDocumentContent = (file, orgName) => {
        const docId = Math.random().toString(36).substr(2, 9).toUpperCase();
        const currentDate = new Date().toLocaleDateString('en-IN');

        // Generate content based on file name patterns
        if (file.name.includes('Defense') || file.name.includes('Military')) {
            return `
CLASSIFICATION: ${file.classification}
DOCUMENT ID: DEF-${docId}
ISSUED: ${file.date}
AUTHORITY: ${orgName}

═══════════════════════════════════════════════════════════════

EXECUTIVE SUMMARY

This strategic assessment outlines the current defense posture and 
modernization initiatives for the Indian Armed Forces. Key focus areas 
include border security enhancement, technological advancement, and 
operational readiness.

SECTION 1: OPERATIONAL STATUS
─────────────────────────────────────────────────────────────────
• Active Personnel: 1,455,550 (Army: 1,237,117 | Navy: 67,228 | Air Force: 151,205)
• Reserve Forces: 2,100,000
• Paramilitary Forces: 1,300,000
• Current Deployment: Northern Command (45%), Western Command (30%), Eastern Command (25%)

SECTION 2: MODERNIZATION PROGRAMS
─────────────────────────────────────────────────────────────────
Program Name              Status        Budget (₹ Cr)    Timeline
────────────────────────────────────────────────────────────────
Project 75I (Submarines)  In Progress   43,000          2026-2030
AMCA Fighter Program      Development   15,000          2026-2032
Arjun MBT Mk-II          Production    8,500           2026-2028
S-400 Air Defense        Deployment    35,000          Completed

SECTION 3: STRATEGIC PRIORITIES
─────────────────────────────────────────────────────────────────
1. Border Infrastructure Development
   - LAC: 3,488 km monitoring systems
   - LoC: Enhanced surveillance network
   - Coastal Security: 7,516 km coverage

2. Cyber Defense Capabilities
   - Defense Cyber Agency operational
   - AI-based threat detection systems
   - Quantum encryption research

3. Space-Based Assets
   - GSAT-7 series operational
   - RISAT surveillance constellation
   - Navigation: NavIC system active

THREAT ASSESSMENT: MODERATE-HIGH
NEXT REVIEW: ${new Date(new Date(file.date).getTime() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN')}

[END OF DOCUMENT]
            `.trim();
        } else if (file.name.includes('Nuclear') || file.name.includes('Atomic')) {
            return `
CLASSIFICATION: ${file.classification}
DOCUMENT ID: DAE-${docId}
ISSUED: ${file.date}
AUTHORITY: ${orgName}

═══════════════════════════════════════════════════════════════

NUCLEAR PROGRAM STATUS REPORT

This document provides an overview of India's civilian nuclear program
and strategic capabilities as of ${file.date}.

SECTION 1: CIVILIAN NUCLEAR POWER
─────────────────────────────────────────────────────────────────
Operational Reactors: 22
Total Capacity: 6,780 MW
Under Construction: 8 reactors (6,200 MW)
Planned: 12 reactors (13,800 MW)

Reactor Type Distribution:
• Pressurized Heavy Water Reactors (PHWR): 18 units
• Boiling Water Reactors (BWR): 2 units
• Fast Breeder Reactors (FBR): 2 units

SECTION 2: FUEL CYCLE FACILITIES
─────────────────────────────────────────────────────────────────
Uranium Mining:
- Jaduguda, Jharkhand: 1,000 tonnes/year
- Tummalapalle, Andhra Pradesh: 3,000 tonnes/year
- Domiasiat, Meghalaya: 300 tonnes/year

Enrichment Capacity: CLASSIFIED
Reprocessing Facilities: 3 operational, 2 under construction

SECTION 3: RESEARCH INITIATIVES
─────────────────────────────────────────────────────────────────
• Thorium-based fuel cycle development
• Advanced Heavy Water Reactor (AHWR) design
• Compact High Temperature Reactor (CHTR)
• Fusion research at IPR, Gandhinagar

SECTION 4: SAFETY PROTOCOLS
─────────────────────────────────────────────────────────────────
Incident Rate: 0.02 per reactor-year
IAEA Compliance: 100%
Emergency Response Teams: 12 regional units
Last Safety Audit: ${new Date(new Date(file.date).getTime() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN')}

STRATEGIC RESERVES: ADEQUATE
INTERNATIONAL COOPERATION: NSG waiver operational

[END OF DOCUMENT]
            `.trim();
        } else if (file.name.includes('Space') || file.name.includes('Satellite') || file.name.includes('PSLV') || file.name.includes('Chandrayaan')) {
            return `
CLASSIFICATION: ${file.classification}
DOCUMENT ID: ISRO-${docId}
ISSUED: ${file.date}
AUTHORITY: ${orgName}

═══════════════════════════════════════════════════════════════

SPACE PROGRAM UPDATE

Mission planning and launch schedule for Indian Space Research
Organisation operations.

SECTION 1: UPCOMING LAUNCHES
─────────────────────────────────────────────────────────────────
Mission          Vehicle    Payload           Launch Date
────────────────────────────────────────────────────────────────
GSAT-24         GSLV Mk-II  Communication    March 2026
RISAT-2C        PSLV-C58    Radar Imaging    April 2026
Chandrayaan-4   LVM3        Lunar Sample     July 2026
Aditya-L2       PSLV-XL     Solar Study      Sept 2026
Gaganyaan-1     LVM3        Crew Module      Dec 2026

SECTION 2: OPERATIONAL SATELLITES
─────────────────────────────────────────────────────────────────
Category              Count    Status
────────────────────────────────────────────────────────────────
Communication         18       Operational
Earth Observation     14       Operational
Navigation (NavIC)    8        Operational
Scientific            6        Operational
Technology Demo       4        Operational

SECTION 3: GAGANYAAN PROGRAM STATUS
─────────────────────────────────────────────────────────────────
Crew Module: Flight qualified
Service Module: Integration phase
Escape System: 5 successful tests
Life Support: Validation complete
Astronaut Training: 4 candidates (Russia + India)

Test Flights Completed:
✓ Pad Abort Test (July 2018)
✓ Test Vehicle D1 (Oct 2023)
✓ Test Vehicle D2 (Feb 2024)
○ Uncrewed Mission 1 (Scheduled: Aug 2026)
○ Uncrewed Mission 2 (Scheduled: Dec 2026)
○ Crewed Mission (Scheduled: 2027)

SECTION 4: DEEP SPACE MISSIONS
─────────────────────────────────────────────────────────────────
• Mars Orbiter Mission-2: Design phase
• Venus Orbiter Mission: Approved, 2028 launch
• Lunar Polar Exploration: Joint mission with JAXA
• Asteroid sample return: Feasibility study

BUDGET ALLOCATION: ₹13,700 Cr (FY 2026-27)
INTERNATIONAL PARTNERSHIPS: 15 active MOUs

[END OF DOCUMENT]
            `.trim();
        } else if (file.name.includes('Missile') || file.name.includes('Weapons') || file.name.includes('DRDO')) {
            return `
CLASSIFICATION: ${file.classification}
DOCUMENT ID: DRDO-${docId}
ISSUED: ${file.date}
AUTHORITY: ${orgName}

═══════════════════════════════════════════════════════════════

ADVANCED WEAPONS SYSTEMS DEVELOPMENT

Strategic weapons research and development status report.

SECTION 1: MISSILE SYSTEMS
─────────────────────────────────────────────────────────────────
System Name      Type        Range (km)   Status
────────────────────────────────────────────────────────────────
Agni-V          ICBM        5,000+       Operational
Agni-VI         ICBM        8,000+       Development
Prithvi-III     SRBM        350          Operational
BrahMos-NG      Cruise      800          Testing
Nirbhay         Cruise      1,000        Production
K-4             SLBM        3,500        Operational
K-5             SLBM        5,000        Development

SECTION 2: HYPERSONIC TECHNOLOGY
─────────────────────────────────────────────────────────────────
• HSTDV: Mach 6+ demonstrated (Sept 2024)
• Scramjet Engine: 20-second sustained flight achieved
• Hypersonic Cruise Missile: Design phase
• Target Speed: Mach 7-8
• Expected IOC: 2028-2029

SECTION 3: DIRECTED ENERGY WEAPONS
─────────────────────────────────────────────────────────────────
High Energy Laser (HEL):
- Power Output: 100 kW (achieved)
- Target: 200 kW (by 2027)
- Applications: Anti-drone, C-RAM
- Test Facility: Chitradurga, Karnataka

Electromagnetic Pulse (EMP):
- Research Phase: Advanced
- Applications: CLASSIFIED

SECTION 4: UNMANNED SYSTEMS
─────────────────────────────────────────────────────────────────
• Ghatak UCAV: First flight Q3 2026
• Rustom-II: Operational trials
• CATS Warrior: Production
• Autonomous Swarm Tech: Development
• AI-based Target Recognition: 94% accuracy

SECTION 5: ELECTRONIC WARFARE
─────────────────────────────────────────────────────────────────
Systems Developed:
- Samyukta EW Suite (Airborne)
- Sangraha ELINT System
- Divya Drishti Radar Warning Receiver
- Shakti EW Pod

ANNUAL R&D BUDGET: ₹23,000 Cr
TECHNOLOGY READINESS: Level 7-9

[END OF DOCUMENT]
            `.trim();
        } else if (file.name.includes('Intelligence') || file.name.includes('Security') || file.name.includes('Terrorism')) {
            return `
CLASSIFICATION: ${file.classification}
DOCUMENT ID: MHA-${docId}
ISSUED: ${file.date}
AUTHORITY: ${orgName}

═══════════════════════════════════════════════════════════════

INTERNAL SECURITY ASSESSMENT

Comprehensive analysis of internal security situation and threat
landscape across India.

SECTION 1: THREAT OVERVIEW
─────────────────────────────────────────────────────────────────
Threat Level by Region:
• Jammu & Kashmir: HIGH
• North-East States: MODERATE
• Left Wing Extremism Areas: MODERATE-LOW
• Coastal Areas: LOW-MODERATE
• Metropolitan Cities: MODERATE

SECTION 2: COUNTER-TERRORISM OPERATIONS
─────────────────────────────────────────────────────────────────
Operations Conducted (Last Quarter):
- Neutralized Threats: 47
- Arrests: 156
- Weapons Seized: 234 units
- IED Defused: 89
- Intelligence Inputs Acted Upon: 1,247

Key Operations:
✓ Operation Sindoor (J&K): 12 terrorists neutralized
✓ Operation Octopus (Chhattisgarh): 8 Maoists arrested
✓ Coastal Security Drill: 15 states participated

SECTION 3: INTELLIGENCE COORDINATION
─────────────────────────────────────────────────────────────────
Multi-Agency Centre (MAC):
- Real-time Intelligence Sharing: 24/7
- State Integration: 28 states + 8 UTs
- International Liaison: 47 countries
- Cyber Threat Monitoring: Active

Fusion Centers Operational: 12
Joint Intelligence Committee: Monthly reviews

SECTION 4: CYBERSECURITY INITIATIVES
─────────────────────────────────────────────────────────────────
• National Cyber Coordination Centre: Operational
• CERT-In Incidents Handled: 14,562 (monthly avg)
• Critical Infrastructure Protection: 256 facilities
• Cyber Forensic Labs: 18 operational
• AI-based Threat Detection: Deployed

Threat Sources Identified:
- State-sponsored: 34%
- Organized Crime: 28%
- Hacktivism: 22%
- Individual Actors: 16%

SECTION 5: BORDER MANAGEMENT
─────────────────────────────────────────────────────────────────
Smart Fencing: 2,840 km completed
CIBMS (Comprehensive Integrated Border Management System):
- Sensors: 12,450 units
- Cameras: 8,900 units
- Radars: 145 units
- Drones: 340 units

Illegal Infiltration Attempts Foiled: 892 (YTD)

OVERALL SECURITY POSTURE: ROBUST
NEXT ASSESSMENT: ${new Date(new Date(file.date).getTime() + 60 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN')}

[END OF DOCUMENT]
            `.trim();
        } else if (file.name.includes('Diplomatic') || file.name.includes('Trade') || file.name.includes('Relations')) {
            return `
CLASSIFICATION: ${file.classification}
DOCUMENT ID: MEA-${docId}
ISSUED: ${file.date}
AUTHORITY: ${orgName}

═══════════════════════════════════════════════════════════════

DIPLOMATIC RELATIONS & STRATEGIC PARTNERSHIPS

Analysis of India's bilateral and multilateral engagements.

SECTION 1: STRATEGIC PARTNERSHIPS
─────────────────────────────────────────────────────────────────
Comprehensive Strategic Partnerships:
• United States
• Russia
• France
• Japan
• Australia

Strategic Partnerships:
• United Kingdom, Germany, South Korea, Indonesia
• UAE, Saudi Arabia, Vietnam, Singapore

SECTION 2: REGIONAL ENGAGEMENT
─────────────────────────────────────────────────────────────────
BIMSTEC: Chair (2024-2026)
- Focus: Maritime security, counter-terrorism
- Summit: Scheduled Q4 2026

SAARC: Limited engagement
- Status: Stalled since 2016
- Bilateral focus maintained

Quad (India-US-Japan-Australia):
- Maritime Domain Awareness
- Supply Chain Resilience
- Technology Cooperation
- Next Summit: May 2026, Tokyo

SECTION 3: TRADE AGREEMENTS
─────────────────────────────────────────────────────────────────
Active FTAs: 18
Under Negotiation: 7

Recent Developments:
✓ India-UAE CEPA: Operational (May 2022)
✓ India-Australia ECTA: Operational (Dec 2022)
○ India-UK FTA: Final stages
○ India-EU FTA: Resumed negotiations
○ India-GCC FTA: Under discussion

Trade Volume (FY 2025-26):
- Total: $1.2 trillion
- Exports: $680 billion
- Imports: $520 billion

SECTION 4: MULTILATERAL FORUMS
─────────────────────────────────────────────────────────────────
G20: Presidency (2023) - Legacy initiatives ongoing
UNSC: Non-permanent member (2021-22) - Bid for permanent seat
SCO: Active member - Focus on counter-terrorism
BRICS: Expanded membership discussions

SECTION 5: DIASPORA ENGAGEMENT
─────────────────────────────────────────────────────────────────
Indian Diaspora: 32 million (globally)
Pravasi Bharatiya Divas: Annual
OCI Cardholders: 4.8 million
Remittances: $125 billion (2025)

Key Markets:
• USA: 4.9 million
• UAE: 3.5 million
• Saudi Arabia: 2.8 million
• UK: 1.8 million
• Canada: 1.7 million

DIPLOMATIC MISSIONS: 197 (Embassies + Consulates)
FOREIGN MISSIONS IN INDIA: 168

[END OF DOCUMENT]
            `.trim();
        } else if (file.name.includes('Army') || file.name.includes('Navy') || file.name.includes('Air_Force') ||
            file.name.includes('Border') || file.name.includes('Maritime') || file.name.includes('Fighter') ||
            file.name.includes('Deployment') || file.name.includes('Submarine') || file.name.includes('Strategy')) {
            return `
CLASSIFICATION: ${file.classification}
DOCUMENT ID: AF-${docId}
ISSUED: ${file.date}
AUTHORITY: ${orgName}

═══════════════════════════════════════════════════════════════

ARMED FORCES STRATEGIC REPORT

SUBJECT: ${file.name.replace(/_/g, ' ').replace('.pdf', '')}

SECTION 1: MISSION OBJECTIVES
─────────────────────────────────────────────────────────────────
• Operational Readiness: 98%
• Deployment Status: Active
• Threat Level: ELEVATED

SECTION 2: TACTICAL ASSESSMENT
─────────────────────────────────────────────────────────────────
Recent surveillance indicates increased activity in sector 4.
Counter-measures have been deployed effectively.
Losses: None reported.
Success Rate: 100%

SECTION 3: RESOURCE ALLOCATION
─────────────────────────────────────────────────────────────────
• Personnel: Full strength
• Logistical Support: Secure chain established
• Munitions: Stockpile adequate for 45 days sustained operations

[TOP SECRET - EYES ONLY]
            `.trim();
        } else {
            // Generic government document
            return `
CLASSIFICATION: ${file.classification}
DOCUMENT ID: GOI-${docId}
ISSUED: ${file.date}
AUTHORITY: ${orgName}

═══════════════════════════════════════════════════════════════

OFFICIAL GOVERNMENT DOCUMENT

This document contains official information pertaining to ${orgName}
operations and strategic initiatives.

SECTION 1: EXECUTIVE SUMMARY
─────────────────────────────────────────────────────────────────
This report provides a comprehensive overview of ongoing programs,
initiatives, and strategic objectives for the current fiscal year.

Key Highlights:
• Operational efficiency improved by 18%
• Technology integration: 85% completion
• Budget utilization: 92% (as of ${currentDate})
• Personnel strength: Optimal levels maintained

SECTION 2: OPERATIONAL STATUS
─────────────────────────────────────────────────────────────────
Current Projects: 47 active
Completed Projects: 23 (this quarter)
Pending Approvals: 12
Budget Allocated: ₹15,400 Cr

Performance Metrics:
- On-time Delivery: 89%
- Quality Standards: Met
- Stakeholder Satisfaction: 4.2/5.0
- Safety Record: Excellent

SECTION 3: STRATEGIC INITIATIVES
─────────────────────────────────────────────────────────────────
1. Digital Transformation
   - Cloud migration: 70% complete
   - AI/ML integration: Pilot phase
   - Cybersecurity enhancement: Ongoing

2. Capacity Building
   - Training programs: 156 conducted
   - Skill development: 2,450 personnel
   - International collaboration: 8 MOUs signed

3. Infrastructure Development
   - Modernization projects: 34 active
   - Technology upgrades: Scheduled
   - Facility expansion: Under review

SECTION 4: FUTURE ROADMAP
─────────────────────────────────────────────────────────────────
Short-term (6-12 months):
• Complete ongoing modernization
• Enhance operational capabilities
• Strengthen security protocols

Medium-term (1-3 years):
• Advanced technology adoption
• International partnerships
• Capacity expansion

Long-term (3-5 years):
• Next-generation systems
• Self-reliance initiatives
• Global leadership position

COMPLIANCE STATUS: FULL
NEXT REVIEW: ${new Date(new Date(file.date).getTime() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN')}

[END OF DOCUMENT]
            `.trim();
        }
    };

    const allOrganizations = [
        { category: 'Ministries', items: governmentData.ministries },
        { category: 'National Assets', items: governmentData.nationalAssets },
        { category: 'Armed Forces', items: governmentData.armedForces }
    ];

    const filteredOrgs = selectedCategory
        ? allOrganizations.find(cat => cat.category === selectedCategory)?.items || []
        : [...governmentData.ministries, ...governmentData.nationalAssets];

    const searchResults = searchQuery
        ? filteredOrgs.filter(org =>
            org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            org.files.some(file => file.name.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        : filteredOrgs;

    return (
        <div className="fixed inset-0 h-screen w-full bg-[#020617] text-[#00FFCC] overflow-hidden font-sans z-[200]">
            {/* Animated Background Grid */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(#00FFCC 1px, transparent 1px), linear-gradient(90deg, #00FFCC 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }} />
            </div>

            {/* Header */}
            <div className="relative z-50 bg-black/40 backdrop-blur-md border-b border-[#00FFCC]/20 px-8 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={onBack}
                            className="px-4 py-2 border border-[#00FFCC]/30 text-[#00FFCC] text-xs font-bold uppercase tracking-wider hover:bg-[#00FFCC] hover:text-[#020617] transition-all flex items-center gap-2"
                        >
                            <ArrowLeft size={14} />
                            Back
                        </button>
                        <div className="flex items-center gap-4">
                            <Folder className="text-[#00FFCC]" size={32} />
                            <div>
                                <h1 className="text-2xl font-black uppercase tracking-tight text-white">Government Repository</h1>
                                <p className="text-[8px] tracking-[0.3em] text-[#00FFCC]/40 uppercase font-mono">Classified Files & Intelligence</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Lock className="text-amber-400" size={16} />
                        <span className="text-[8px] text-amber-400 font-bold uppercase tracking-widest">SECURE ACCESS</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 h-[calc(100vh-80px)] overflow-y-auto">
                <div className="p-8 max-w-7xl mx-auto">
                    {/* Search and Filter Bar */}
                    <div className="mb-8 flex gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00FFCC]/40" size={18} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search organizations or files..."
                                className="w-full py-3 pl-12 pr-4 bg-black/60 backdrop-blur-md border border-[#00FFCC]/20 text-[#00FFCC] placeholder-[#00FFCC]/30 outline-none focus:border-[#00FFCC] transition-all text-sm font-mono uppercase"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={`px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all ${!selectedCategory
                                    ? 'bg-[#00FFCC] text-[#020617]'
                                    : 'border border-[#00FFCC]/30 text-[#00FFCC] hover:bg-[#00FFCC]/10'
                                    }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setSelectedCategory('Ministries')}
                                className={`px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all ${selectedCategory === 'Ministries'
                                    ? 'bg-[#00FFCC] text-[#020617]'
                                    : 'border border-[#00FFCC]/30 text-[#00FFCC] hover:bg-[#00FFCC]/10'
                                    }`}
                            >
                                Ministries
                            </button>
                            <button
                                onClick={() => setSelectedCategory('National Assets')}
                                className={`px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all ${selectedCategory === 'National Assets'
                                    ? 'bg-[#00FFCC] text-[#020617]'
                                    : 'border border-[#00FFCC]/30 text-[#00FFCC] hover:bg-[#00FFCC]/10'
                                    }`}
                            >
                                National Assets
                            </button>
                        </div>
                    </div>

                    {/* Organizations Grid */}
                    <AnimatePresence mode="wait">
                        {!selectedOrg ? (
                            <motion.div
                                key="grid"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {searchResults.map((org, idx) => {
                                    const IconComponent = org.icon;
                                    return (
                                        <motion.button
                                            key={org.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            onClick={() => setSelectedOrg(org)}
                                            className="bg-black/40 backdrop-blur-md border border-[#00FFCC]/20 p-6 hover:border-[#00FFCC] hover:bg-black/60 transition-all text-left group"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <IconComponent style={{ color: org.color }} size={28} />
                                                    <div className={`text-[8px] font-bold uppercase px-2 py-1 border ${getClassificationColor(org.classification)}`}>
                                                        {org.classification}
                                                    </div>
                                                </div>
                                                <ChevronRight className="text-[#00FFCC]/40 group-hover:text-[#00FFCC] transition-colors" size={20} />
                                            </div>
                                            <h3 className="text-lg font-black uppercase text-white mb-2">{org.name}</h3>
                                            <p className="text-xs text-[#00FFCC]/60 font-mono">
                                                {org.files.length} classified files
                                            </p>
                                        </motion.button>
                                    );
                                })}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="files"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                            >
                                {/* Organization Header */}
                                <div className="bg-black/40 backdrop-blur-md border border-[#00FFCC]/20 p-8 mb-6">
                                    <button
                                        onClick={() => setSelectedOrg(null)}
                                        className="mb-4 text-xs text-[#00FFCC]/60 hover:text-[#00FFCC] flex items-center gap-2 uppercase font-mono"
                                    >
                                        <ArrowLeft size={14} />
                                        Back to Organizations
                                    </button>
                                    <div className="flex items-center gap-4 mb-4">
                                        {React.createElement(selectedOrg.icon, { style: { color: selectedOrg.color }, size: 48 })}
                                        <div className="flex-1">
                                            <h2 className="text-3xl font-black uppercase text-white mb-2">{selectedOrg.name}</h2>
                                            <div className={`inline-block text-[10px] font-bold uppercase px-3 py-1 border ${getClassificationColor(selectedOrg.classification)}`}>
                                                {selectedOrg.classification}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-[#00FFCC]/60 font-mono">
                                        Total Files: {selectedOrg.files.length} | Last Updated: {selectedOrg.files[0].date}
                                    </p>
                                </div>

                                {/* Files List */}
                                <div className="space-y-3">
                                    {selectedOrg.files.map((file, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="bg-black/40 backdrop-blur-md border border-[#00FFCC]/20 p-5 hover:border-[#00FFCC] hover:bg-black/60 transition-all group"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 flex-1">
                                                    <FileText className="text-[#00FFCC]" size={24} />
                                                    <div className="flex-1">
                                                        <h4 className="text-white font-bold mb-1">{file.name}</h4>
                                                        <div className="flex items-center gap-4 text-[10px] text-[#00FFCC]/60 font-mono">
                                                            <span>Size: {file.size}</span>
                                                            <span>•</span>
                                                            <span>Date: {file.date}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className={`text-[8px] font-bold uppercase px-2 py-1 border ${getClassificationColor(file.classification)}`}>
                                                        {file.classification}
                                                    </div>
                                                    <button
                                                        onClick={() => setViewingFile(file)}
                                                        className="p-2 border border-[#00FFCC]/30 text-[#00FFCC] hover:bg-[#00FFCC] hover:text-[#020617] transition-all"
                                                    >
                                                        <Eye size={16} />
                                                    </button>
                                                    <button className="p-2 border border-[#00FFCC]/30 text-[#00FFCC] hover:bg-[#00FFCC] hover:text-[#020617] transition-all">
                                                        <Download size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* File Viewer Modal */}
            <AnimatePresence>
                {viewingFile && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-8"
                        onClick={() => setViewingFile(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#020617] border-2 border-[#00FFCC]/30 p-8 max-w-2xl w-full"
                        >
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#00FFCC]/20">
                                <div className="flex items-center gap-3">
                                    <FileText className="text-[#00FFCC]" size={32} />
                                    <div>
                                        <h3 className="text-xl font-black uppercase text-white">{viewingFile.name}</h3>
                                        <p className="text-xs text-[#00FFCC]/60 font-mono">Size: {viewingFile.size} | Date: {viewingFile.date}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setViewingFile(null)}
                                    className="text-[#00FFCC]/60 hover:text-[#00FFCC] text-sm font-bold uppercase"
                                >
                                    Close [X]
                                </button>
                            </div>

                            <div className={`mb-6 p-4 border-l-4 ${getClassificationColor(viewingFile.classification)}`}>
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertTriangle size={16} />
                                    <span className="text-xs font-bold uppercase">Classification Notice</span>
                                </div>
                                <p className="text-xs opacity-80">
                                    This document is classified as <strong>{viewingFile.classification}</strong>.
                                    Unauthorized access, distribution, or disclosure is strictly prohibited and may result in legal action.
                                </p>
                            </div>

                            <div className="bg-black/40 border border-[#00FFCC]/20 p-6 max-h-[400px] overflow-y-auto font-mono text-[10px] text-[#00FFCC]/80 leading-relaxed whitespace-pre-wrap">
                                {getDocumentContent(viewingFile, selectedOrg.name)}
                            </div>

                            {/* Annotation Tools */}
                            <AnimatePresence>
                                {showAnnotationTools && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-4 bg-amber-500/10 border border-amber-500/30 p-4"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="text-sm font-bold uppercase text-amber-500">Annotations</h4>
                                            <button
                                                onClick={() => {
                                                    const note = prompt('Enter your annotation:');
                                                    if (note) {
                                                        addAnnotation(viewingFile.name, {
                                                            id: Date.now(),
                                                            text: note,
                                                            timestamp: new Date().toISOString(),
                                                            type: 'note'
                                                        });
                                                    }
                                                }}
                                                className="px-3 py-1 bg-amber-500 text-[#020617] text-xs font-bold uppercase hover:bg-amber-400 transition-all"
                                            >
                                                + Add Note
                                            </button>
                                        </div>
                                        <div className="space-y-2 max-h-[150px] overflow-y-auto">
                                            {(annotations[viewingFile.name] || []).map(annotation => (
                                                <div key={annotation.id} className="bg-black/40 border border-amber-500/20 p-3 flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <p className="text-xs text-amber-500/80 mb-1">
                                                            {new Date(annotation.timestamp).toLocaleString()}
                                                        </p>
                                                        <p className="text-sm text-white">{annotation.text}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => removeAnnotation(viewingFile.name, annotation.id)}
                                                        className="ml-2 text-red-500 hover:text-red-400 text-xs"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                            {(!annotations[viewingFile.name] || annotations[viewingFile.name].length === 0) && (
                                                <p className="text-xs text-amber-500/40 text-center py-4">No annotations yet. Click "+ Add Note" to create one.</p>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="mt-6 flex gap-3">
                                <button
                                    onClick={() => downloadDocument(viewingFile, selectedOrg.name)}
                                    className="flex-1 py-3 bg-[#00FFCC] text-[#020617] font-bold uppercase tracking-wider hover:bg-white transition-all flex items-center justify-center gap-2"
                                >
                                    <Download size={16} />
                                    Download Secure Copy
                                </button>
                                <button
                                    onClick={() => setShowAnnotationTools(!showAnnotationTools)}
                                    className={`px-6 py-3 font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${showAnnotationTools
                                        ? 'bg-amber-500 text-[#020617]'
                                        : 'border border-amber-500/30 text-amber-500 hover:bg-amber-500/10'
                                        }`}
                                >
                                    <FileText size={16} />
                                    Annotate
                                </button>
                                <button
                                    onClick={() => setViewingFile(null)}
                                    className="px-6 py-3 border border-[#00FFCC]/30 text-[#00FFCC] font-bold uppercase tracking-wider hover:bg-[#00FFCC]/10 transition-all"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default GovernmentFiles;
