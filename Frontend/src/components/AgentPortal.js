import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserPlus, GraduationCap, CreditCard, Crosshair, TrendingUp, Radio,
  Shield, ArrowLeft, Clock, Star, Search, Plus, Check, X, AlertTriangle,
  Eye, EyeOff, Lock, Send, MapPin, Target, Award, Zap, Hash, Activity,
  Users, Globe, FileText, ChevronRight, Flag, User, AlertCircle,
  CheckCircle, XCircle, Calendar, ChevronDown
} from 'lucide-react';

const STAGES = ['APPLIED', 'SCREENING', 'FIELD TEST', 'INTERVIEW', 'POLYGRAPH', 'CLEARANCE', 'INDUCTED'];

const STAGE_COLORS = {
  APPLIED: '#60A5FA', SCREENING: '#FBBF24', 'FIELD TEST': '#F97316',
  INTERVIEW: '#A78BFA', POLYGRAPH: '#F472B6', CLEARANCE: '#00FFCC', INDUCTED: '#34D399'
};

const LANGUAGES_LIST = ['Hindi', 'English', 'Urdu', 'Mandarin', 'Arabic', 'Russian', 'Pashto', 'Tamil', 'Bengali', 'Punjabi', 'French', 'German', 'Japanese', 'Korean', 'Farsi'];

const SPECIALIZATIONS = ['HUMINT', 'SIGINT', 'CYBER', 'COVERT OPS', 'ANALYSIS', 'COUNTER-INTEL'];

const SERVICE_OPTIONS = ['Military', 'Police', 'Civilian', 'Intelligence'];

const INITIAL_CANDIDATES = [
  { id: 'RAW-2026-0147', name: 'Arjun Krishnamurthy', age: 27, education: 'IIT Delhi — Computer Science', languages: ['Hindi', 'English', 'Tamil'], physicalScore: 89, iqScore: 142, stage: 'APPLIED', priority: false, service: 'Civilian', specialization: 'CYBER', dob: '1999-03-14', university: 'IIT Delhi', degree: 'B.Tech', notes: 'Strong analytical background. Published papers on cryptography.' },
  { id: 'RAW-2026-0152', name: 'Sneha Iyer', age: 24, education: 'JNU — International Relations', languages: ['Hindi', 'English', 'French', 'Arabic'], physicalScore: 76, iqScore: 148, stage: 'APPLIED', priority: true, service: 'Civilian', specialization: 'ANALYSIS', dob: '2002-07-22', university: 'JNU', degree: 'M.A.', notes: 'Exceptional language skills. Middle East focus area.' },
  { id: 'RAW-2026-0098', name: 'Ravi Venkatesh', age: 29, education: 'NDA — Defence Studies', languages: ['Hindi', 'English', 'Urdu'], physicalScore: 96, iqScore: 131, stage: 'SCREENING', priority: false, service: 'Military', specialization: 'COVERT OPS', dob: '1997-01-08', university: 'NDA Khadakwasla', degree: 'B.Sc.', notes: 'Army captain. Two tours in J&K. Commando-trained.' },
  { id: 'RAW-2026-0103', name: 'Meera Deshpande', age: 26, education: 'IIT Bombay — Electronics', languages: ['Hindi', 'English', 'Mandarin'], physicalScore: 82, iqScore: 145, stage: 'SCREENING', priority: true, service: 'Civilian', specialization: 'SIGINT', dob: '2000-11-30', university: 'IIT Bombay', degree: 'M.Tech', notes: 'Signal processing specialist. Mandarin proficiency from 2 years in Beijing.' },
  { id: 'RAW-2026-0067', name: 'Vikram Chauhan', age: 31, education: 'IMA Dehradun — Infantry', languages: ['Hindi', 'English', 'Pashto', 'Urdu'], physicalScore: 98, iqScore: 128, stage: 'FIELD TEST', priority: false, service: 'Military', specialization: 'COVERT OPS', dob: '1995-05-19', university: 'IMA Dehradun', degree: 'B.A.', notes: 'Para SF veteran. 4 cross-border operations. Fluent Pashto.' },
  { id: 'RAW-2026-0071', name: 'Anjali Nair', age: 25, education: 'IISC Bangalore — Cybersecurity', languages: ['Hindi', 'English', 'Russian', 'German'], physicalScore: 84, iqScore: 151, stage: 'FIELD TEST', priority: true, service: 'Civilian', specialization: 'CYBER', dob: '2001-09-03', university: 'IISc Bangalore', degree: 'M.S.', notes: 'Cyber warfare prodigy. Won national CTF competition twice.' },
  { id: 'RAW-2026-0045', name: 'Rohan Malhotra', age: 28, education: 'NDA — Naval Studies', languages: ['Hindi', 'English', 'Mandarin'], physicalScore: 91, iqScore: 136, stage: 'INTERVIEW', priority: false, service: 'Military', specialization: 'HUMINT', dob: '1998-02-14', university: 'NDA Khadakwasla', degree: 'B.Sc.', notes: 'Naval intelligence background. Deployed to South China Sea theater.' },
  { id: 'RAW-2026-0049', name: 'Sanya Gupta', age: 30, education: 'Delhi University — Psychology', languages: ['Hindi', 'English', 'Urdu', 'Arabic'], physicalScore: 78, iqScore: 155, stage: 'INTERVIEW', priority: false, service: 'Intelligence', specialization: 'COUNTER-INTEL', dob: '1996-06-28', university: 'Delhi University', degree: 'Ph.D.', notes: 'Behavioral profiling expert. 3 years with IB debrief division.' },
  { id: 'RAW-2026-0031', name: 'Karthik Sundaram', age: 27, education: 'IIT Madras — AI/ML', languages: ['Hindi', 'English', 'Tamil', 'Japanese'], physicalScore: 80, iqScore: 160, stage: 'POLYGRAPH', priority: true, service: 'Civilian', specialization: 'SIGINT', dob: '1999-12-05', university: 'IIT Madras', degree: 'M.Tech', notes: 'AI specialist for signal intelligence. Built ML models for pattern recognition.' },
  { id: 'RAW-2026-0034', name: 'Deepika Rao', age: 26, education: 'NDA — Air Force', languages: ['Hindi', 'English', 'Mandarin', 'Korean'], physicalScore: 93, iqScore: 139, stage: 'POLYGRAPH', priority: false, service: 'Military', specialization: 'COVERT OPS', dob: '2000-04-17', university: 'NDA Khadakwasla', degree: 'B.Sc.', notes: 'Fighter pilot trainee. Advanced parachute certification.' },
  { id: 'RAW-2026-0018', name: 'Aditya Joshi', age: 29, education: 'LBSNAA — Public Admin', languages: ['Hindi', 'English', 'Urdu', 'Farsi'], physicalScore: 85, iqScore: 143, stage: 'CLEARANCE', priority: false, service: 'Intelligence', specialization: 'HUMINT', dob: '1997-08-21', university: 'LBSNAA Mussoorie', degree: 'M.A.', notes: 'IPS officer. Undercover experience in organized crime units.' },
  { id: 'RAW-2026-0022', name: 'Neha Reddy', age: 25, education: 'IIT Hyderabad — Cryptography', languages: ['Hindi', 'English', 'Telugu', 'Russian'], physicalScore: 79, iqScore: 158, stage: 'CLEARANCE', priority: true, service: 'Civilian', specialization: 'CYBER', dob: '2001-01-11', university: 'IIT Hyderabad', degree: 'M.Tech', notes: 'Cryptanalysis genius. Cracked simulated adversary comms in record time.' },
  { id: 'RAW-2026-0005', name: 'Rahul Kapoor', age: 32, education: 'IMA — Special Forces', languages: ['Hindi', 'English', 'Pashto', 'Arabic', 'Urdu'], physicalScore: 99, iqScore: 134, stage: 'INDUCTED', priority: false, service: 'Military', specialization: 'COVERT OPS', dob: '1994-10-03', university: 'IMA Dehradun', degree: 'B.A.', notes: 'Para SF decorated. 6 cross-border ops. Inducted as field operative.' },
  { id: 'RAW-2026-0009', name: 'Tanvi Bhatt', age: 28, education: 'JNU — East Asian Studies', languages: ['Hindi', 'English', 'Mandarin', 'Japanese', 'Korean'], physicalScore: 81, iqScore: 152, stage: 'INDUCTED', priority: false, service: 'Civilian', specialization: 'ANALYSIS', dob: '1998-03-25', university: 'JNU', degree: 'Ph.D.', notes: 'China desk analyst. Five East Asian languages. Inducted as intelligence analyst.' },
];

const TRAINEES = [
  { id: 'T001', codename: 'PHOENIX', realName: 'Vikram Rathore', batch: 'Alpha-7', specialization: 'HUMINT', progress: 78, status: 'ACTIVE TRAINING', clearance: 'SECRET', skills: { combat: 85, intelligence: 72, technology: 65, stealth: 90, languages: 70, endurance: 88, leadership: 75 }, modules: { 'Surveillance & Counter-Surveillance': 82, 'Close Quarter Combat': 91, 'Weapons & Explosives': 88, 'Cyber Operations': 55, 'Interrogation & Resistance': 78, 'Disguise & Identity': 85 } },
  { id: 'T002', codename: 'SPECTER', realName: 'Anil Deshpande', batch: 'Alpha-7', specialization: 'SIGINT', progress: 85, status: 'ACTIVE TRAINING', clearance: 'TOP SECRET', skills: { combat: 60, intelligence: 92, technology: 95, stealth: 70, languages: 65, endurance: 58, leadership: 80 }, modules: { 'Surveillance & Counter-Surveillance': 90, 'Close Quarter Combat': 55, 'Cyber Operations': 98, 'Covert Communications': 92, 'Language Immersion': 70 } },
  { id: 'T003', codename: 'WRAITH', realName: 'Sunita Patel', batch: 'Bravo-3', specialization: 'COVERT OPS', progress: 92, status: 'ACTIVE TRAINING', clearance: 'TOP SECRET', skills: { combat: 94, intelligence: 85, technology: 72, stealth: 97, languages: 80, endurance: 91, leadership: 88 }, modules: { 'Surveillance & Counter-Surveillance': 96, 'Close Quarter Combat': 95, 'Weapons & Explosives': 90, 'Disguise & Identity': 98, 'Parachute & Underwater': 94, 'Psychological Warfare': 88 } },
  { id: 'T004', codename: 'GHOST', realName: 'Rajesh Iyer', batch: 'Bravo-3', specialization: 'CYBER', progress: 65, status: 'ACTIVE TRAINING', clearance: 'SECRET', skills: { combat: 45, intelligence: 88, technology: 96, stealth: 55, languages: 50, endurance: 42, leadership: 60 }, modules: { 'Cyber Operations': 99, 'Covert Communications': 85, 'Surveillance & Counter-Surveillance': 62 } },
  { id: 'T005', codename: 'HAWK', realName: 'Deepa Singh', batch: 'Alpha-7', specialization: 'ANALYSIS', progress: 88, status: 'ACTIVE TRAINING', clearance: 'TOP SECRET', skills: { combat: 70, intelligence: 96, technology: 82, stealth: 65, languages: 90, endurance: 72, leadership: 85 }, modules: { 'Surveillance & Counter-Surveillance': 94, 'Interrogation & Resistance': 91, 'Language Immersion': 95, 'Psychological Warfare': 92, 'Covert Communications': 86 } },
  { id: 'T006', codename: 'VENOM', realName: 'Arjun Tiwari', batch: 'Charlie-1', specialization: 'COUNTER-INTEL', progress: 45, status: 'ACTIVE TRAINING', clearance: 'CONFIDENTIAL', skills: { combat: 55, intelligence: 60, technology: 40, stealth: 50, languages: 45, endurance: 65, leadership: 35 }, modules: { 'Surveillance & Counter-Surveillance': 48, 'Close Quarter Combat': 52, 'Interrogation & Resistance': 40 } },
  { id: 'T007', codename: 'STORM', realName: 'Kavita Sharma', batch: 'Charlie-1', specialization: 'HUMINT', progress: 71, status: 'ACTIVE TRAINING', clearance: 'SECRET', skills: { combat: 68, intelligence: 82, technology: 55, stealth: 78, languages: 85, endurance: 70, leadership: 72 }, modules: { 'Surveillance & Counter-Surveillance': 76, 'Disguise & Identity': 82, 'Language Immersion': 88, 'Interrogation & Resistance': 70 } },
  { id: 'T008', codename: 'BLADE', realName: 'Suresh Nair', batch: 'Delta-2', specialization: 'COVERT OPS', progress: 55, status: 'SUSPENDED', clearance: 'SECRET', skills: { combat: 92, intelligence: 50, technology: 35, stealth: 80, languages: 40, endurance: 85, leadership: 45 }, modules: { 'Close Quarter Combat': 96, 'Weapons & Explosives': 94, 'Parachute & Underwater': 72 } },
  { id: 'T009', codename: 'ECHO', realName: 'Priyanka Das', batch: 'Delta-2', specialization: 'SIGINT', progress: 82, status: 'ACTIVE TRAINING', clearance: 'SECRET', skills: { combat: 52, intelligence: 90, technology: 88, stealth: 60, languages: 75, endurance: 55, leadership: 70 }, modules: { 'Surveillance & Counter-Surveillance': 85, 'Cyber Operations': 90, 'Covert Communications': 88, 'Language Immersion': 72 } },
  { id: 'T010', codename: 'CIPHER', realName: 'Manoj Kumar', batch: 'Alpha-7', specialization: 'CYBER', progress: 96, status: 'GRADUATED', clearance: 'COSMIC TOP SECRET', skills: { combat: 65, intelligence: 95, technology: 99, stealth: 70, languages: 60, endurance: 68, leadership: 82 }, modules: { 'Surveillance & Counter-Surveillance': 92, 'Close Quarter Combat': 68, 'Cyber Operations': 100, 'Covert Communications': 96, 'Psychological Warfare': 90, 'Language Immersion': 65 } },
  { id: 'T011', codename: 'RAVEN', realName: 'Leela Menon', batch: 'Bravo-3', specialization: 'ANALYSIS', progress: 38, status: 'FAILED', clearance: 'RESTRICTED', skills: { combat: 30, intelligence: 55, technology: 42, stealth: 35, languages: 48, endurance: 28, leadership: 40 }, modules: { 'Surveillance & Counter-Surveillance': 42, 'Interrogation & Resistance': 35 } },
];

const TRAINING_MODULES = [
  { name: 'Surveillance & Counter-Surveillance', weeks: 8, difficulty: 4, passRate: 72 },
  { name: 'Close Quarter Combat', weeks: 6, difficulty: 5, passRate: 65 },
  { name: 'Weapons & Explosives', weeks: 6, difficulty: 4, passRate: 70 },
  { name: 'Cyber Operations', weeks: 10, difficulty: 5, passRate: 58 },
  { name: 'Interrogation & Resistance', weeks: 4, difficulty: 5, passRate: 52 },
  { name: 'Disguise & Identity', weeks: 4, difficulty: 3, passRate: 80 },
  { name: 'Language Immersion', weeks: 12, difficulty: 3, passRate: 75 },
  { name: 'Covert Communications', weeks: 6, difficulty: 4, passRate: 68 },
  { name: 'Parachute & Underwater', weeks: 8, difficulty: 5, passRate: 55 },
  { name: 'Psychological Warfare', weeks: 6, difficulty: 4, passRate: 62 },
];

const CLEARANCE_LEVELS = ['RESTRICTED', 'CONFIDENTIAL', 'SECRET', 'TOP SECRET', 'COSMIC TOP SECRET'];

const INITIAL_IDS = [
  { idNumber: 'RAW-ID-7821', codename: 'PHANTOM', agency: 'R&AW', clearance: 'COSMIC TOP SECRET', status: 'ACTIVE', issued: '2020-03-15', expiry: '2027-03-15', realName: 'Vikram Rathore', rank: 'Senior Field Officer', bloodType: 'O+', biometric: 'a7f3c9e2d1b8' },
  { idNumber: 'IB-ID-3345', codename: 'SHADOW', agency: 'IB', clearance: 'TOP SECRET', status: 'ACTIVE', issued: '2019-08-22', expiry: '2026-08-22', realName: 'Amit Saxena', rank: 'Deputy Director', bloodType: 'A+', biometric: 'b4e6f1a8c3d7' },
  { idNumber: 'DIA-ID-1198', codename: 'VIPER', agency: 'DIA', clearance: 'TOP SECRET', status: 'ACTIVE', issued: '2021-01-10', expiry: '2028-01-10', realName: 'Suresh Nair', rank: 'Field Operative', bloodType: 'B+', biometric: 'c9d2e5f8a1b4' },
  { idNumber: 'NTRO-ID-5562', codename: 'GHOST', agency: 'NTRO', clearance: 'SECRET', status: 'ACTIVE', issued: '2022-06-30', expiry: '2029-06-30', realName: 'Rajesh Iyer', rank: 'Tech Specialist', bloodType: 'AB+', biometric: 'd1f4a7c2e5b8' },
  { idNumber: 'RAW-ID-7834', codename: 'WRAITH', agency: 'R&AW', clearance: 'TOP SECRET', status: 'ACTIVE', issued: '2021-11-05', expiry: '2028-11-05', realName: 'Sunita Patel', rank: 'Senior Operative', bloodType: 'O-', biometric: 'e3a6b9d2f5c8' },
  { idNumber: 'IB-ID-3401', codename: 'COBRA', agency: 'IB', clearance: 'SECRET', status: 'EXPIRED', issued: '2018-04-18', expiry: '2025-04-18', realName: 'Pradeep Kumar', rank: 'Analyst', bloodType: 'A-', biometric: 'f5c8e1a4b7d0' },
  { idNumber: 'RAW-ID-7856', codename: 'HAWK', agency: 'R&AW', clearance: 'TOP SECRET', status: 'ACTIVE', issued: '2022-09-12', expiry: '2029-09-12', realName: 'Deepa Singh', rank: 'Intelligence Analyst', bloodType: 'B-', biometric: 'a1b4c7d0e3f6' },
  { idNumber: 'DIA-ID-1215', codename: 'STORM', agency: 'DIA', clearance: 'SECRET', status: 'ACTIVE', issued: '2023-02-28', expiry: '2030-02-28', realName: 'Kavita Sharma', rank: 'Field Agent', bloodType: 'O+', biometric: 'b7d0e3f6a9c2' },
  { idNumber: 'NTRO-ID-5589', codename: 'CIPHER', agency: 'NTRO', clearance: 'COSMIC TOP SECRET', status: 'ACTIVE', issued: '2020-12-01', expiry: '2027-12-01', realName: 'Manoj Kumar', rank: 'Chief Tech Officer', bloodType: 'A+', biometric: 'c2e5f8a1b4d7' },
  { idNumber: 'RAW-ID-7801', codename: 'SPECTER', agency: 'R&AW', clearance: 'TOP SECRET', status: 'ACTIVE', issued: '2021-07-20', expiry: '2028-07-20', realName: 'Anil Deshpande', rank: 'Signal Operative', bloodType: 'AB-', biometric: 'd4f7a0c3e6b9' },
  { idNumber: 'IB-ID-3422', codename: 'EAGLE', agency: 'IB', clearance: 'CONFIDENTIAL', status: 'REVOKED', issued: '2019-05-14', expiry: '2026-05-14', realName: 'Neeraj Gupta', rank: 'Junior Agent', bloodType: 'B+', biometric: 'e6b9c2d5f8a1' },
  { idNumber: 'DIA-ID-1230', codename: 'BLADE', agency: 'DIA', clearance: 'SECRET', status: 'ACTIVE', issued: '2023-08-09', expiry: '2030-08-09', realName: 'Suresh Nair', rank: 'Combat Specialist', bloodType: 'O+', biometric: 'f8a1b4c7d0e3' },
  { idNumber: 'RAW-ID-7878', codename: 'ECHO', agency: 'R&AW', clearance: 'SECRET', status: 'ACTIVE', issued: '2024-01-15', expiry: '2031-01-15', realName: 'Priyanka Das', rank: 'SIGINT Analyst', bloodType: 'A-', biometric: 'a0c3e6b9d2f5' },
  { idNumber: 'NTRO-ID-5601', codename: 'RAVEN', agency: 'NTRO', clearance: 'RESTRICTED', status: 'REVOKED', issued: '2022-03-22', expiry: '2029-03-22', realName: 'Leela Menon', rank: 'Trainee', bloodType: 'B-', biometric: 'b2d5f8a1c4e7' },
  { idNumber: 'IB-ID-3456', codename: 'VENOM', agency: 'IB', clearance: 'CONFIDENTIAL', status: 'ACTIVE', issued: '2024-06-01', expiry: '2031-06-01', realName: 'Arjun Tiwari', rank: 'Trainee Agent', bloodType: 'AB+', biometric: 'c4e7a0b3d6f9' },
  { idNumber: 'RAW-ID-7890', codename: 'PHOENIX-2', agency: 'R&AW', clearance: 'SECRET', status: 'ACTIVE', issued: '2024-11-20', expiry: '2031-11-20', realName: 'Rohit Malhotra', rank: 'Field Agent', bloodType: 'O-', biometric: 'd6f9b2c5e8a1' },
];

const INITIAL_CLEARANCE_REQUESTS = [
  { id: 'CR-001', codename: 'PHOENIX', currentLevel: 'SECRET', requestedLevel: 'TOP SECRET', supervisor: 'DIR-CONTROL-7', supervisorApproval: 'PENDING', dateRequested: '2026-02-15' },
  { id: 'CR-002', codename: 'STORM', currentLevel: 'SECRET', requestedLevel: 'TOP SECRET', supervisor: 'DIR-CONTROL-3', supervisorApproval: 'APPROVED', dateRequested: '2026-02-10' },
  { id: 'CR-003', codename: 'ECHO', currentLevel: 'SECRET', requestedLevel: 'TOP SECRET', supervisor: 'DIR-CONTROL-5', supervisorApproval: 'PENDING', dateRequested: '2026-02-18' },
  { id: 'CR-004', codename: 'VENOM', currentLevel: 'CONFIDENTIAL', requestedLevel: 'SECRET', supervisor: 'DIR-CONTROL-1', supervisorApproval: 'DENIED', dateRequested: '2026-02-08' },
];

const INITIAL_MISSIONS = [
  { id: 'OP-4471', codename: 'OPERATION SILENT THUNDER', type: 'Infiltration', location: 'Islamabad, Pakistan', risk: 5, duration: '45 days', requiredSkills: ['HUMINT', 'Pashto', 'Combat'], classification: 'TOP SECRET', objectives: 'Infiltrate ISI safe house in Sector G-9. Establish contact with asset NIGHTINGALE. Extract documents relating to cross-border terror financing.', assigned: false },
  { id: 'OP-4472', codename: 'OPERATION JADE MIRROR', type: 'Surveillance', location: 'Shanghai, China', risk: 4, duration: '90 days', requiredSkills: ['SIGINT', 'Mandarin', 'Technology'], classification: 'TOP SECRET', objectives: 'Monitor PLA Navy communications from Pudong listening post. Identify submarine deployment schedules for South China Sea theater.', assigned: false },
  { id: 'OP-4473', codename: 'OPERATION RED FALCON', type: 'Extraction', location: 'Kabul, Afghanistan', risk: 5, duration: '7 days', requiredSkills: ['COVERT OPS', 'Pashto', 'Combat'], classification: 'SECRET', objectives: 'Extract burned asset SANDSTORM from Taliban-controlled district. Provide safe passage to Indian embassy. Time-critical operation.', assigned: false },
  { id: 'OP-4474', codename: 'OPERATION GOLDEN HORIZON', type: 'Intelligence', location: 'Dubai, UAE', risk: 2, duration: '120 days', requiredSkills: ['HUMINT', 'Arabic', 'Finance'], classification: 'SECRET', objectives: 'Map hawala network connections between Dubai financial district and terror funding channels. Identify key node operators.', assigned: false },
  { id: 'OP-4475', codename: 'OPERATION IRON VEIL', type: 'Sabotage', location: 'Rawalpindi, Pakistan', risk: 5, duration: '30 days', requiredSkills: ['COVERT OPS', 'Explosives', 'Urdu'], classification: 'COSMIC TOP SECRET', objectives: 'Disable communications relay used by terror network for coordinating cross-border attacks. Zero attribution required.', assigned: false },
  { id: 'OP-4476', codename: 'OPERATION BLUE LOTUS', type: 'Surveillance', location: 'Colombo, Sri Lanka', risk: 3, duration: '60 days', requiredSkills: ['SIGINT', 'Tamil', 'Technology'], classification: 'SECRET', objectives: 'Monitor Chinese naval activity at Hambantota port. Track submarine docking patterns and military cargo movements.', assigned: false },
  { id: 'OP-4477', codename: 'OPERATION SHADOW GATE', type: 'Infiltration', location: 'Dhaka, Bangladesh', risk: 3, duration: '75 days', requiredSkills: ['HUMINT', 'Bengali', 'COUNTER-INTEL'], classification: 'SECRET', objectives: 'Penetrate DGFI intelligence network. Identify double agents compromising Indian border security operations.', assigned: false },
  { id: 'OP-4478', codename: 'OPERATION CRIMSON TIDE', type: 'Intelligence', location: 'Moscow, Russia', risk: 4, duration: '180 days', requiredSkills: ['HUMINT', 'Russian', 'COUNTER-INTEL'], classification: 'TOP SECRET', objectives: 'Re-establish contact with dormant Russian assets. Gather intelligence on arms deals with hostile neighbors.', assigned: false },
  { id: 'OP-4479', codename: 'OPERATION CYBER STORM', type: 'Intelligence', location: 'Cyberspace / Beijing', risk: 3, duration: '60 days', requiredSkills: ['CYBER', 'Mandarin', 'Technology'], classification: 'TOP SECRET', objectives: 'Identify and neutralize APT group targeting Indian defence networks. Trace command infrastructure to state sponsors.', assigned: false },
];

const FIELD_AGENTS = [
  { codename: 'PHANTOM', skills: ['HUMINT', 'Mandarin', 'Combat', 'COUNTER-INTEL'], availability: 'AVAILABLE', division: 'R&AW' },
  { codename: 'SHADOW', skills: ['HUMINT', 'Urdu', 'Pashto', 'COUNTER-INTEL'], availability: 'ON MISSION', division: 'R&AW' },
  { codename: 'WRAITH', skills: ['COVERT OPS', 'Combat', 'Stealth', 'Explosives'], availability: 'AVAILABLE', division: 'R&AW' },
  { codename: 'HAWK', skills: ['ANALYSIS', 'Languages', 'SIGINT'], availability: 'AVAILABLE', division: 'R&AW' },
  { codename: 'SPECTER', skills: ['SIGINT', 'Technology', 'CYBER', 'Mandarin'], availability: 'AVAILABLE', division: 'NTRO' },
  { codename: 'STORM', skills: ['HUMINT', 'Bengali', 'Disguise', 'Languages'], availability: 'AVAILABLE', division: 'IB' },
  { codename: 'CIPHER', skills: ['CYBER', 'Technology', 'SIGINT'], availability: 'AVAILABLE', division: 'NTRO' },
  { codename: 'COBRA', skills: ['HUMINT', 'Russian', 'COUNTER-INTEL', 'English'], availability: 'AVAILABLE', division: 'R&AW' },
  { codename: 'PHOENIX', skills: ['HUMINT', 'Combat', 'Stealth', 'Pashto'], availability: 'AVAILABLE', division: 'R&AW' },
  { codename: 'ECHO', skills: ['SIGINT', 'Technology', 'Tamil'], availability: 'ON MISSION', division: 'R&AW' },
];

const INITIAL_DEPLOYMENTS = [
  { codename: 'SHADOW', mission: 'OP SCORPION NEST', location: 'Karachi, Pakistan', daysDeployed: 82, lastCheckIn: '2026-02-19 22:30', status: 'ON MISSION' },
  { codename: 'ECHO', mission: 'OP MONSOON WATCH', location: 'Colombo, Sri Lanka', daysDeployed: 34, lastCheckIn: '2026-02-20 06:15', status: 'ON MISSION' },
  { codename: 'VIPER', mission: 'OP FALCON EYE', location: 'Dubai, UAE', daysDeployed: 97, lastCheckIn: '2026-02-20 08:00', status: 'RETURNING' },
  { codename: 'COBRA', mission: 'OP NORTHERN LIGHT', location: 'Moscow, Russia', daysDeployed: 210, lastCheckIn: '2026-02-17 14:20', status: 'OVERDUE' },
  { codename: 'NIGHTHAWK', mission: 'OP JADE SERPENT', location: 'Beijing, China', daysDeployed: 156, lastCheckIn: '2026-02-14 03:45', status: 'OVERDUE' },
  { codename: 'TEMPEST', mission: 'OP IRON CURTAIN', location: 'Dhaka, Bangladesh', daysDeployed: 21, lastCheckIn: '2026-02-20 09:30', status: 'ON MISSION' },
];

const PERF_AGENTS = [
  { codename: 'PHANTOM', division: 'R&AW', missionsCompleted: 47, successRate: 94, reportsFile: 312, riskIncidents: 3, rating: 'S', physical: 96, psychEval: 'CLEAR', psychDate: '2026-01-15', retirementYears: 12, injuries: ['Minor shrapnel — 2023', 'Concussion — 2024'] },
  { codename: 'SHADOW', division: 'R&AW', missionsCompleted: 38, successRate: 89, reportsFile: 256, riskIncidents: 5, rating: 'A', physical: 91, psychEval: 'CLEAR', psychDate: '2026-02-01', retirementYears: 8, injuries: ['Gunshot wound (arm) — 2022'] },
  { codename: 'WRAITH', division: 'R&AW', missionsCompleted: 52, successRate: 96, reportsFile: 189, riskIncidents: 2, rating: 'S', physical: 98, psychEval: 'CLEAR', psychDate: '2026-01-28', retirementYears: 15, injuries: [] },
  { codename: 'HAWK', division: 'R&AW', missionsCompleted: 31, successRate: 90, reportsFile: 445, riskIncidents: 1, rating: 'A', physical: 82, psychEval: 'CLEAR', psychDate: '2026-02-10', retirementYears: 18, injuries: [] },
  { codename: 'SPECTER', division: 'NTRO', missionsCompleted: 28, successRate: 93, reportsFile: 380, riskIncidents: 0, rating: 'A', physical: 75, psychEval: 'CLEAR', psychDate: '2025-12-20', retirementYears: 20, injuries: [] },
  { codename: 'STORM', division: 'IB', missionsCompleted: 22, successRate: 86, reportsFile: 178, riskIncidents: 4, rating: 'B', physical: 88, psychEval: 'MONITORING', psychDate: '2026-02-05', retirementYears: 16, injuries: ['Knee injury — 2025'] },
  { codename: 'CIPHER', division: 'NTRO', missionsCompleted: 19, successRate: 100, reportsFile: 520, riskIncidents: 0, rating: 'S', physical: 70, psychEval: 'CLEAR', psychDate: '2026-01-22', retirementYears: 22, injuries: [] },
  { codename: 'COBRA', division: 'R&AW', missionsCompleted: 41, successRate: 85, reportsFile: 290, riskIncidents: 7, rating: 'B', physical: 84, psychEval: 'CONCERN', psychDate: '2026-02-12', retirementYears: 6, injuries: ['Broken ribs — 2024', 'Chemical exposure — 2025'] },
  { codename: 'VIPER', division: 'DIA', missionsCompleted: 15, successRate: 87, reportsFile: 145, riskIncidents: 2, rating: 'B', physical: 79, psychEval: 'CLEAR', psychDate: '2025-11-30', retirementYears: 19, injuries: [] },
  { codename: 'PHOENIX', division: 'R&AW', missionsCompleted: 12, successRate: 92, reportsFile: 98, riskIncidents: 1, rating: 'A', physical: 94, psychEval: 'CLEAR', psychDate: '2026-02-08', retirementYears: 24, injuries: [] },
  { codename: 'EAGLE', division: 'IB', missionsCompleted: 35, successRate: 80, reportsFile: 210, riskIncidents: 6, rating: 'C', physical: 72, psychEval: 'MONITORING', psychDate: '2026-01-18', retirementYears: 10, injuries: ['Back injury — 2023', 'PTSD treatment — 2024'] },
  { codename: 'TEMPEST', division: 'DIA', missionsCompleted: 8, successRate: 88, reportsFile: 67, riskIncidents: 1, rating: 'B', physical: 90, psychEval: 'CLEAR', psychDate: '2026-02-14', retirementYears: 26, injuries: [] },
];

const DIVISION_DATA = [
  { name: 'R&AW', agents: 156, missionsYear: 342, successRate: 91, budget: 87, intelScore: 94 },
  { name: 'IB', agents: 218, missionsYear: 512, successRate: 85, budget: 92, intelScore: 88 },
  { name: 'DIA', agents: 89, missionsYear: 178, successRate: 88, budget: 78, intelScore: 82 },
  { name: 'NTRO', agents: 67, missionsYear: 245, successRate: 94, budget: 95, intelScore: 96 },
];

const INITIAL_THREADS = [
  { id: 'TH-001', participants: ['CONTROL-7', 'PHANTOM'], lastMessage: 'Asset confirmed. Proceeding to extraction point Charlie.', timestamp: '2026-02-20 08:42', encryption: 'AES-256-GCM', priority: 'FLASH', messages: [
    { sender: 'CONTROL-7', text: 'PHANTOM, confirm asset location in Sector 7.', time: '08:30', encrypted: 'a4f7e2c9d1b6a8f3e5c2d7b9a1f4e6c8d3b5a7f9e1c4d6b8a2f5e7c9d1b3a6' },
    { sender: 'PHANTOM', text: 'Asset confirmed at coordinates 31.52N, 74.35E. Moving to intercept.', time: '08:35', encrypted: 'b7d3f9a1c5e8b2d6f4a8c1e5b9d3f7a2c6e0b4d8f1a5c9e3b7d2f6a0c4e8b1' },
    { sender: 'CONTROL-7', text: 'Proceed with caution. Hostile surveillance detected in area.', time: '08:38', encrypted: 'c9e5b1d7f3a9c2e6b0d4f8a1c5e9b3d7f2a6c0e4b8d1f5a9c3e7b2d6f0a4c8' },
    { sender: 'PHANTOM', text: 'Asset confirmed. Proceeding to extraction point Charlie.', time: '08:42', encrypted: 'd2f8a4c0e6b2d5f9a3c7e1b5d9f4a8c2e6b0d3f7a1c5e9b4d8f2a6c0e3b7d1' },
  ]},
  { id: 'TH-002', participants: ['CONTROL-3', 'SHADOW'], lastMessage: 'Cover identity compromised. Activating backup legend.', timestamp: '2026-02-19 22:15', encryption: 'ChaCha20-Poly1305', priority: 'CRITIC', messages: [
    { sender: 'SHADOW', text: 'ISI tailing confirmed. Three vehicles rotating surveillance.', time: '21:45', encrypted: 'e5a1c7d3f9b5e8a2c6d0f4b8e1a5c9d3f7b2e6a0c4d8f1b5e9a3c7d2f6b0e4' },
    { sender: 'CONTROL-3', text: 'Abort current operation. Fall back to safe house DELTA.', time: '21:52', encrypted: 'f8b4d0e6a2c8f1b5d9e3a7c2f6b0d4e8a1c5f9b3d7e2a6c0f4b8d1e5a9c3f7' },
    { sender: 'SHADOW', text: 'Cover identity compromised. Activating backup legend.', time: '22:15', encrypted: 'a1c5d9e3f7b1a4c8d2e6f0b4a8c1d5e9f3b7a2c6d0e4f8b1a5c9d3e7f2b6a0' },
  ]},
  { id: 'TH-003', participants: ['CONTROL-5', 'VIPER'], lastMessage: 'Hawala ledger photographed. 47 transactions documented.', timestamp: '2026-02-20 03:20', encryption: 'AES-256-GCM', priority: 'PRIORITY', messages: [
    { sender: 'VIPER', text: 'Target entered Al-Rashid trading office at 0215 local.', time: '02:18', encrypted: 'b3d7e1f5a9c3b6d0e4f8a2c6b9d3e7f1a5c8b2d6e0f4a8c1b5d9e3f7a1c4b8' },
    { sender: 'CONTROL-5', text: 'Maintain surveillance. Do not engage.', time: '02:25', encrypted: 'c6e0f4a8b2d6c9e3f7a1b5c8d2e6f0a4b8c1d5e9f3a7b2c5d9e2f6a0b4c7d1' },
    { sender: 'VIPER', text: 'Hawala ledger photographed. 47 transactions documented.', time: '03:20', encrypted: 'd9f3a7b1c5d8e2f6a0b4c7d1e5f9a3b7c0d4e8f2a6b9c3d7e1f5a8b2c6d0e4' },
  ]},
  { id: 'TH-004', participants: ['DIR-OPS', 'WRAITH'], lastMessage: 'Exfil complete. Package secured. RTB.', timestamp: '2026-02-19 18:30', encryption: 'AES-256-GCM', priority: 'ROUTINE', messages: [
    { sender: 'DIR-OPS', text: 'WRAITH, mission update required.', time: '17:00', encrypted: 'e2f6a0b4c8e1d5f9a3b7c1d4e8f2a6b0c3d7e1f5a9b2c6d0e4f8a1b5c9d3e7' },
    { sender: 'WRAITH', text: 'Exfil complete. Package secured. RTB.', time: '18:30', encrypted: 'f5a9b3c7d1e5f8a2b6c0d4e7f1a5b9c2d6e0f4a8b1c5d9e3f6a0b4c8d2e5f9' },
  ]},
  { id: 'TH-005', participants: ['CONTROL-1', 'COBRA'], lastMessage: 'No check-in for 72 hours. Emergency protocol initiated.', timestamp: '2026-02-17 14:20', encryption: 'ChaCha20-Poly1305', priority: 'CRITIC', messages: [
    { sender: 'CONTROL-1', text: 'COBRA, respond. Mandatory check-in overdue.', time: '12:00', encrypted: 'a8b2c6d0e4f7a1b5c9d3e6f0a4b8c2d5e9f3a7b1c4d8e2f6a0b3c7d1e5f8a2' },
    { sender: 'CONTROL-1', text: 'COBRA, respond immediately. This is a CRITIC-level alert.', time: '13:00', encrypted: 'b1c5d9e3f6a0b4c8d1e5f9a3b7c0d4e8f2a5b9c3d7e0f4a8b2c6d9e3f7a1b5' },
    { sender: 'CONTROL-1', text: 'No check-in for 72 hours. Emergency protocol initiated.', time: '14:20', encrypted: 'c4d8e2f5a9b3c7d0e4f8a2b6c9d3e7f1a4b8c2d6e0f3a7b1c5d8e2f6a0b4c7' },
  ]},
  { id: 'TH-006', participants: ['TECH-OPS', 'CIPHER'], lastMessage: 'Zero-day deployed. Target infrastructure mapped.', timestamp: '2026-02-20 07:55', encryption: 'AES-256-GCM', priority: 'PRIORITY', messages: [
    { sender: 'TECH-OPS', text: 'CIPHER, target network scan results?', time: '07:30', encrypted: 'd7e1f5a8b2c6d0e3f7a1b5c8d2e6f0a3b7c1d5e9f2a6b0c4d8e1f5a9b3c6d0' },
    { sender: 'CIPHER', text: 'Zero-day deployed. Target infrastructure mapped.', time: '07:55', encrypted: 'e0f4a7b1c5d9e2f6a0b4c7d1e5f8a2b6c0d3e7f1a5b9c2d6e0f4a8b1c5d9e3' },
  ]},
  { id: 'TH-007', participants: ['CONTROL-7', 'STORM'], lastMessage: 'DGFI officer identified. Building dossier.', timestamp: '2026-02-19 16:40', encryption: 'AES-256-GCM', priority: 'ROUTINE', messages: [
    { sender: 'STORM', text: 'Established cover in Dhaka diplomatic circuit.', time: '14:20', encrypted: 'f3a7b0c4d8e2f5a9b3c6d0e4f8a1b5c9d3e6f0a4b8c1d5e9f3a6b0c4d8e2f5' },
    { sender: 'CONTROL-7', text: 'Good. Focus on DGFI counter-intelligence division.', time: '15:10', encrypted: 'a6b0c3d7e1f5a8b2c6d9e3f7a1b4c8d2e6f0a3b7c1d5e8f2a6b0c4d7e1f5a9' },
    { sender: 'STORM', text: 'DGFI officer identified. Building dossier.', time: '16:40', encrypted: 'b9c3d6e0f4a8b1c5d9e2f6a0b4c7d1e5f9a2b6c0d4e8f1a5b9c3d6e0f4a8b1' },
  ]},
  { id: 'TH-008', participants: ['DIR-INTEL', 'HAWK'], lastMessage: 'PLA deployment analysis complete. 340-page report ready.', timestamp: '2026-02-20 09:10', encryption: 'AES-256-GCM', priority: 'PRIORITY', messages: [
    { sender: 'DIR-INTEL', text: 'HAWK, status on PLA order-of-battle assessment?', time: '08:00', encrypted: 'c2d6e9f3a7b1c4d8e2f5a9b3c7d0e4f8a2b6c9d3e7f1a4b8c2d5e9f3a7b0c4' },
    { sender: 'HAWK', text: 'PLA deployment analysis complete. 340-page report ready.', time: '09:10', encrypted: 'd5e9f2a6b0c4d7e1f5a9b2c6d0e3f7a1b5c8d2e6f0a4b7c1d5e9f2a6b0c3d7' },
  ]},
];

const INITIAL_DEAD_DROPS = [
  { id: 'DD-001', locationCode: 'PARK BENCH ALPHA', city: 'New Delhi', gps: '28.6139°N, 77.2090°E', nextDrop: '2026-02-22 05:00', assignedAgent: 'PHANTOM', status: 'SCHEDULED' },
  { id: 'DD-002', locationCode: 'TEMPLE GATE BRAVO', city: 'Kathmandu', gps: '27.7172°N, 85.3240°E', nextDrop: '2026-02-21 03:30', assignedAgent: 'STORM', status: 'SCHEDULED' },
  { id: 'DD-003', locationCode: 'MARKET CHARLIE', city: 'Kabul', gps: '34.5553°N, 69.2075°E', nextDrop: '2026-02-20 23:00', assignedAgent: 'WRAITH', status: 'SCHEDULED' },
  { id: 'DD-004', locationCode: 'PIER DELTA', city: 'Colombo', gps: '6.9271°N, 79.8612°E', nextDrop: '2026-02-19 04:00', assignedAgent: 'ECHO', status: 'COMPLETED' },
  { id: 'DD-005', locationCode: 'CAFÉ ECHO', city: 'Istanbul', gps: '41.0082°N, 28.9784°E', nextDrop: '2026-02-18 02:00', assignedAgent: 'COBRA', status: 'COMPROMISED' },
  { id: 'DD-006', locationCode: 'BRIDGE FOXTROT', city: 'Dubai', gps: '25.2048°N, 55.2708°E', nextDrop: '2026-02-23 06:00', assignedAgent: 'VIPER', status: 'SCHEDULED' },
];

const INITIAL_CHECK_INS = [
  { codename: 'PHANTOM', lastCheckIn: '2026-02-20 08:42', nextExpected: '2026-02-20 20:42', status: 'ON TIME' },
  { codename: 'SHADOW', lastCheckIn: '2026-02-19 22:15', nextExpected: '2026-02-20 10:15', status: 'LATE' },
  { codename: 'VIPER', lastCheckIn: '2026-02-20 08:00', nextExpected: '2026-02-20 20:00', status: 'ON TIME' },
  { codename: 'COBRA', lastCheckIn: '2026-02-17 14:20', nextExpected: '2026-02-18 02:20', status: 'CRITICAL' },
  { codename: 'NIGHTHAWK', lastCheckIn: '2026-02-14 03:45', nextExpected: '2026-02-14 15:45', status: 'CRITICAL' },
  { codename: 'TEMPEST', lastCheckIn: '2026-02-20 09:30', nextExpected: '2026-02-20 21:30', status: 'ON TIME' },
  { codename: 'WRAITH', lastCheckIn: '2026-02-20 07:00', nextExpected: '2026-02-20 19:00', status: 'ON TIME' },
  { codename: 'ECHO', lastCheckIn: '2026-02-20 06:15', nextExpected: '2026-02-20 18:15', status: 'ON TIME' },
  { codename: 'STORM', lastCheckIn: '2026-02-19 16:40', nextExpected: '2026-02-20 04:40', status: 'MISSED' },
  { codename: 'HAWK', lastCheckIn: '2026-02-20 09:10', nextExpected: '2026-02-20 21:10', status: 'ON TIME' },
  { codename: 'CIPHER', lastCheckIn: '2026-02-20 07:55', nextExpected: '2026-02-20 19:55', status: 'ON TIME' },
];

const INITIAL_EXTRACTIONS = [
  { id: 'EX-001', codename: 'COBRA', location: 'Moscow, Russia', threatLevel: 'CRITICAL', reason: 'No contact for 72+ hours. Suspected FSB detention.', timeRequested: '2026-02-18 06:00' },
  { id: 'EX-002', codename: 'NIGHTHAWK', location: 'Beijing, China', threatLevel: 'HIGH', reason: 'Cover potentially blown. MSS surveillance detected.', timeRequested: '2026-02-15 12:30' },
  { id: 'EX-003', codename: 'STORM', location: 'Dhaka, Bangladesh', threatLevel: 'MEDIUM', reason: 'DGFI closing in on network. Precautionary extraction recommended.', timeRequested: '2026-02-20 05:00' },
];

const PRIORITY_COLORS = { ROUTINE: '#34D399', PRIORITY: '#FBBF24', FLASH: '#F97316', CRITIC: '#DC2626' };

const STATUS_BADGE_COLORS = { ACTIVE: '#34D399', EXPIRED: '#FBBF24', REVOKED: '#DC2626' };

const CHECK_IN_COLORS = { 'ON TIME': '#34D399', LATE: '#FBBF24', MISSED: '#F97316', CRITICAL: '#DC2626' };

const DEAD_DROP_COLORS = { SCHEDULED: '#60A5FA', COMPLETED: '#34D399', COMPROMISED: '#DC2626' };

const RATING_COLORS = { S: '#00FFCC', A: '#34D399', B: '#60A5FA', C: '#FBBF24', D: '#DC2626' };

const NAV_ITEMS = [
  { key: 'recruitment', label: 'RECRUITMENT', icon: UserPlus },
  { key: 'training', label: 'TRAINING ACADEMY', icon: GraduationCap },
  { key: 'clearance', label: 'ID & CLEARANCE', icon: CreditCard },
  { key: 'operations', label: 'FIELD OPERATIONS', icon: Crosshair },
  { key: 'performance', label: 'PERFORMANCE', icon: TrendingUp },
  { key: 'comms', label: 'COMMS HUB', icon: Radio },
];

const sectionVariants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.2 } }
};

const DEFAULT_NEW_APP = { name: '', dob: '', education: '', degree: '', university: '', languages: [], physicalScore: '', service: '', specialization: '' };
const DEFAULT_NEW_MISSION = { codename: '', type: 'Infiltration', location: '', duration: '', risk: 3, requiredSkills: [], objectives: '', classification: 'SECRET' };

const AgentPortal = ({ agentName, onBack }) => {
  const [activeSection, setActiveSection] = useState('recruitment');
  const [systemTime, setSystemTime] = useState(new Date());

  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showNewAppForm, setShowNewAppForm] = useState(false);
  const [newApp, setNewApp] = useState(DEFAULT_NEW_APP);

  const [selectedTrainee, setSelectedTrainee] = useState(null);

  const [idCards, setIdCards] = useState(INITIAL_IDS);
  const [idSearchTerm, setIdSearchTerm] = useState('');
  const [clearanceRequests, setClearanceRequests] = useState(INITIAL_CLEARANCE_REQUESTS);
  const [selectedIdAgency, setSelectedIdAgency] = useState('R&AW');
  const [idCodename, setIdCodename] = useState('');
  const [idRank, setIdRank] = useState('');
  const [idClearance, setIdClearance] = useState('SECRET');

  const [missions, setMissions] = useState(INITIAL_MISSIONS);
  const [selectedMission, setSelectedMission] = useState(null);
  const [deployments] = useState(INITIAL_DEPLOYMENTS);
  const [showMissionForm, setShowMissionForm] = useState(false);
  const [newMission, setNewMission] = useState(DEFAULT_NEW_MISSION);
  const [expandedMission, setExpandedMission] = useState(null);

  const [selectedPerfAgent, setSelectedPerfAgent] = useState(null);

  const [threads, setThreads] = useState(INITIAL_THREADS);
  const [selectedThread, setSelectedThread] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [showEncrypted, setShowEncrypted] = useState(false);
  const [deadDrops] = useState(INITIAL_DEAD_DROPS);
  const [checkIns] = useState(INITIAL_CHECK_INS);
  const [extractions, setExtractions] = useState(INITIAL_EXTRACTIONS);
  const [sendingMsg, setSendingMsg] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setSystemTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const advanceCandidate = useCallback((candidateId) => {
    setCandidates(prev => prev.map(c => {
      if (c.id === candidateId) {
        const idx = STAGES.indexOf(c.stage);
        if (idx < STAGES.length - 1) return { ...c, stage: STAGES[idx + 1] };
      }
      return c;
    }));
    setSelectedCandidate(null);
  }, []);

  const rejectCandidate = useCallback((candidateId) => {
    setCandidates(prev => prev.filter(c => c.id !== candidateId));
    setSelectedCandidate(null);
  }, []);

  const submitApplication = useCallback(() => {
    if (!newApp.name || !newApp.specialization) return;
    const appId = `RAW-2026-${String(Math.floor(Math.random() * 9000) + 1000)}`;
    const entry = {
      id: appId, name: newApp.name, age: newApp.dob ? new Date().getFullYear() - new Date(newApp.dob).getFullYear() : 25,
      education: `${newApp.university} — ${newApp.degree}`, languages: newApp.languages,
      physicalScore: parseInt(newApp.physicalScore) || 75, iqScore: Math.floor(Math.random() * 30) + 125,
      stage: 'APPLIED', priority: false, service: newApp.service, specialization: newApp.specialization,
      dob: newApp.dob, university: newApp.university, degree: newApp.degree,
      notes: 'New application. Pending initial review.'
    };
    setCandidates(prev => [entry, ...prev]);
    setNewApp(DEFAULT_NEW_APP);
    setShowNewAppForm(false);
  }, [newApp]);

  const generateId = useCallback(() => {
    if (!idCodename) return;
    const prefix = selectedIdAgency === 'R&AW' ? 'RAW' : selectedIdAgency === 'IB' ? 'IB' : selectedIdAgency === 'DIA' ? 'DIA' : 'NTRO';
    const num = Math.floor(Math.random() * 9000) + 1000;
    const hex = Array.from({ length: 12 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const newId = {
      idNumber: `${prefix}-ID-${num}`, codename: idCodename.toUpperCase(), agency: selectedIdAgency,
      clearance: idClearance, status: 'ACTIVE', issued: new Date().toISOString().split('T')[0],
      expiry: `${new Date().getFullYear() + 7}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`,
      realName: 'CLASSIFIED', rank: idRank || 'Field Agent', bloodType: ['O+', 'A+', 'B+', 'AB+', 'O-', 'A-'][Math.floor(Math.random() * 6)],
      biometric: hex
    };
    setIdCards(prev => [newId, ...prev]);
    setIdCodename('');
    setIdRank('');
  }, [idCodename, selectedIdAgency, idClearance, idRank]);

  const revokeId = useCallback((idNumber) => {
    setIdCards(prev => prev.map(c => c.idNumber === idNumber ? { ...c, status: 'REVOKED' } : c));
  }, []);

  const approveClearance = useCallback((crId) => {
    setClearanceRequests(prev => prev.map(cr => cr.id === crId ? { ...cr, supervisorApproval: 'APPROVED' } : cr));
  }, []);

  const denyClearance = useCallback((crId) => {
    setClearanceRequests(prev => prev.map(cr => cr.id === crId ? { ...cr, supervisorApproval: 'DENIED' } : cr));
  }, []);

  const assignAgent = useCallback((missionId, agentCodename) => {
    setMissions(prev => prev.map(m => m.id === missionId ? { ...m, assigned: true, assignedAgent: agentCodename } : m));
    setSelectedMission(null);
  }, []);

  const fileMission = useCallback(() => {
    if (!newMission.codename || !newMission.location) return;
    const id = `OP-${Math.floor(Math.random() * 9000) + 1000}`;
    setMissions(prev => [...prev, { ...newMission, id, codename: `OPERATION ${newMission.codename.toUpperCase()}`, assigned: false }]);
    setNewMission(DEFAULT_NEW_MISSION);
    setShowMissionForm(false);
  }, [newMission]);

  const sendMessage = useCallback(() => {
    if (!messageInput.trim() || !selectedThread) return;
    setSendingMsg(true);
    setTimeout(() => {
      const hex = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      setThreads(prev => prev.map(t => {
        if (t.id === selectedThread) {
          return { ...t, lastMessage: messageInput, timestamp: `${now.toISOString().split('T')[0]} ${timeStr}`,
            messages: [...t.messages, { sender: agentName || 'OPERATOR', text: messageInput, time: timeStr, encrypted: hex }]
          };
        }
        return t;
      }));
      setMessageInput('');
      setSendingMsg(false);
    }, 800);
  }, [messageInput, selectedThread, agentName]);

  const approveExtraction = useCallback((exId) => {
    setExtractions(prev => prev.filter(e => e.id !== exId));
  }, []);

  const denyExtraction = useCallback((exId) => {
    setExtractions(prev => prev.filter(e => e.id !== exId));
  }, []);

  const getMatchScore = useCallback((agent, mission) => {
    if (!mission) return 0;
    const required = mission.requiredSkills || [];
    const matched = required.filter(s => agent.skills.some(as => as.toLowerCase().includes(s.toLowerCase())));
    return Math.min(100, Math.round((matched.length / Math.max(required.length, 1)) * 80 + Math.random() * 20));
  }, []);

  const StatCard = ({ label, value, color }) => (
    <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 8, padding: '12px 16px', flex: 1, minWidth: 140 }}>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#64748b', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
      <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 22, color: color || '#00FFCC', fontWeight: 700 }}>{value}</div>
    </div>
  );

  const renderRecruitment = () => {
    const stats = STAGES.reduce((acc, s) => { acc[s] = candidates.filter(c => c.stage === s).length; return acc; }, {});
    return (
      <motion.div key="recruitment" variants={sectionVariants} initial="initial" animate="animate" exit="exit" style={{ height: '100%', overflow: 'auto', padding: 24 }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
          <StatCard label="Total Applications" value={candidates.length} />
          <StatCard label="Under Screening" value={stats.SCREENING || 0} color="#FBBF24" />
          <StatCard label="Field Tests" value={stats['FIELD TEST'] || 0} color="#F97316" />
          <StatCard label="Interviews" value={stats.INTERVIEW || 0} color="#A78BFA" />
          <StatCard label="Inducted This Year" value={stats.INDUCTED || 0} color="#34D399" />
          <StatCard label="Rejection Rate" value="18%" color="#DC2626" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontFamily: 'Orbitron, monospace', fontSize: 16, color: '#00FFCC', margin: 0 }}>APPLICATION PIPELINE</h2>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowNewAppForm(true)}
            style={{ background: 'linear-gradient(135deg, #00FFCC22, #00FFCC11)', border: '1px solid #00FFCC55', color: '#00FFCC', padding: '8px 20px', borderRadius: 6, cursor: 'pointer', fontFamily: 'Orbitron, monospace', fontSize: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Plus size={14} /> NEW APPLICATION
          </motion.button>
        </div>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 16, minHeight: 400 }}>
          {STAGES.map(stage => (
            <div key={stage} style={{ minWidth: 220, maxWidth: 240, flex: '0 0 auto' }}>
              <div style={{ background: STAGE_COLORS[stage] + '22', border: `1px solid ${STAGE_COLORS[stage]}44`, borderRadius: 8, padding: 12, marginBottom: 8, textAlign: 'center' }}>
                <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 11, color: STAGE_COLORS[stage], fontWeight: 700 }}>{stage}</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#64748b', marginLeft: 8 }}>({stats[stage] || 0})</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <AnimatePresence>
                  {candidates.filter(c => c.stage === stage).map(c => (
                    <motion.div key={c.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8, backgroundColor: '#DC262644' }}
                      transition={{ duration: 0.3 }} onClick={() => setSelectedCandidate(c)}
                      style={{ background: '#0a0a1a', border: `1px solid ${STAGE_COLORS[stage]}33`, borderRadius: 8, padding: 10, cursor: 'pointer', position: 'relative' }}>
                      {c.priority && <Flag size={12} style={{ position: 'absolute', top: 8, right: 8, color: '#DC2626' }} />}
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#e2e8f0', fontWeight: 600, marginBottom: 4 }}>{c.name}</div>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#64748b', marginBottom: 2 }}>{c.id}</div>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#94a3b8', marginBottom: 2 }}>Age: {c.age} | IQ: {c.iqScore}</div>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#94a3b8', marginBottom: 4 }}>{c.education?.split(' — ')[0]}</div>
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 4 }}>
                        {c.languages?.slice(0, 3).map(l => (
                          <span key={l} style={{ fontSize: 9, padding: '1px 5px', borderRadius: 3, background: '#1e293b', color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }}>{l}</span>
                        ))}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>
                        <span style={{ color: '#60A5FA' }}>PHY: {c.physicalScore}</span>
                        <span style={{ color: '#A78BFA' }}>{c.specialization}</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {selectedCandidate && (
            <motion.div initial={{ opacity: 0, x: 300 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 300 }}
              style={{ position: 'fixed', top: 0, right: 0, width: 420, height: '100vh', background: '#0a0a1a', borderLeft: '1px solid #00FFCC33', zIndex: 100, padding: 24, overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: 14, color: '#00FFCC', margin: 0 }}>CANDIDATE PROFILE</h3>
                <button onClick={() => setSelectedCandidate(null)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}><X size={18} /></button>
              </div>
              <div style={{ background: '#0f172a', borderRadius: 8, padding: 16, marginBottom: 16, border: '1px solid #1e293b' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: `${STAGE_COLORS[selectedCandidate.stage]}33`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={20} color={STAGE_COLORS[selectedCandidate.stage]} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 16, color: '#e2e8f0' }}>{selectedCandidate.name}</div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#64748b' }}>{selectedCandidate.id}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                  <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 4, background: STAGE_COLORS[selectedCandidate.stage] + '22', color: STAGE_COLORS[selectedCandidate.stage], fontFamily: 'Orbitron, monospace', fontWeight: 700 }}>{selectedCandidate.stage}</span>
                  {selectedCandidate.priority && <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 4, background: '#DC262622', color: '#F87171', fontFamily: 'Orbitron, monospace' }}>PRIORITY</span>}
                </div>
                {[
                  ['Age', selectedCandidate.age], ['DOB', selectedCandidate.dob], ['Education', selectedCandidate.education],
                  ['University', selectedCandidate.university], ['Degree', selectedCandidate.degree],
                  ['Service', selectedCandidate.service], ['Specialization', selectedCandidate.specialization],
                  ['Physical Score', `${selectedCandidate.physicalScore}/100`], ['IQ Score', selectedCandidate.iqScore],
                  ['Languages', selectedCandidate.languages?.join(', ')],
                ].map(([k, v]) => v ? (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #1e293b' }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#64748b' }}>{k}</span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#e2e8f0', textAlign: 'right', maxWidth: 200 }}>{v}</span>
                  </div>
                ) : null)}
              </div>
              {selectedCandidate.notes && (
                <div style={{ background: '#0f172a', borderRadius: 8, padding: 12, marginBottom: 16, border: '1px solid #1e293b' }}>
                  <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 11, color: '#64748b', marginBottom: 6 }}>EVALUATION NOTES</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#94a3b8', lineHeight: 1.5 }}>{selectedCandidate.notes}</div>
                </div>
              )}
              <div style={{ display: 'flex', gap: 12 }}>
                {selectedCandidate.stage !== 'INDUCTED' && (
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => advanceCandidate(selectedCandidate.id)}
                    style={{ flex: 1, padding: '10px 16px', borderRadius: 6, background: '#00FFCC22', border: '1px solid #00FFCC55', color: '#00FFCC', cursor: 'pointer', fontFamily: 'Orbitron, monospace', fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    <ChevronRight size={14} /> ADVANCE TO NEXT STAGE
                  </motion.button>
                )}
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => rejectCandidate(selectedCandidate.id)}
                  style={{ flex: selectedCandidate.stage === 'INDUCTED' ? 1 : 'none', padding: '10px 16px', borderRadius: 6, background: '#DC262622', border: '1px solid #DC262655', color: '#F87171', cursor: 'pointer', fontFamily: 'Orbitron, monospace', fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <XCircle size={14} /> REJECT
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showNewAppForm && (
            <motion.div initial={{ opacity: 0, x: 300 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 300 }}
              style={{ position: 'fixed', top: 0, right: 0, width: 440, height: '100vh', background: '#0a0a1a', borderLeft: '1px solid #00FFCC33', zIndex: 100, padding: 24, overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: 14, color: '#00FFCC', margin: 0 }}>NEW APPLICATION</h3>
                <button onClick={() => setShowNewAppForm(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}><X size={18} /></button>
              </div>
              {[
                { label: 'Full Name', key: 'name', type: 'text' },
                { label: 'Date of Birth', key: 'dob', type: 'date' },
                { label: 'University', key: 'university', type: 'text' },
                { label: 'Degree', key: 'degree', type: 'text' },
                { label: 'Physical Fitness Score (0-100)', key: 'physicalScore', type: 'number' },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 14 }}>
                  <label style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#64748b', display: 'block', marginBottom: 4 }}>{f.label}</label>
                  <input type={f.type} value={newApp[f.key]} onChange={e => setNewApp(p => ({ ...p, [f.key]: e.target.value }))}
                    style={{ width: '100%', padding: '8px 12px', background: '#0f172a', border: '1px solid #1e293b', borderRadius: 6, color: '#e2e8f0', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              ))}
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#64748b', display: 'block', marginBottom: 6 }}>Languages</label>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {LANGUAGES_LIST.map(l => (
                    <motion.button key={l} whileTap={{ scale: 0.9 }}
                      onClick={() => setNewApp(p => ({ ...p, languages: p.languages.includes(l) ? p.languages.filter(x => x !== l) : [...p.languages, l] }))}
                      style={{ padding: '4px 10px', borderRadius: 4, fontSize: 10, fontFamily: 'JetBrains Mono, monospace', cursor: 'pointer', border: newApp.languages.includes(l) ? '1px solid #00FFCC' : '1px solid #1e293b', background: newApp.languages.includes(l) ? '#00FFCC22' : '#0f172a', color: newApp.languages.includes(l) ? '#00FFCC' : '#64748b' }}>
                      {l}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#64748b', display: 'block', marginBottom: 6 }}>Previous Service</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {SERVICE_OPTIONS.map(s => (
                    <motion.button key={s} whileTap={{ scale: 0.9 }}
                      onClick={() => setNewApp(p => ({ ...p, service: s }))}
                      style={{ padding: '6px 14px', borderRadius: 6, fontSize: 11, fontFamily: 'JetBrains Mono, monospace', cursor: 'pointer', border: newApp.service === s ? '1px solid #60A5FA' : '1px solid #1e293b', background: newApp.service === s ? '#60A5FA22' : '#0f172a', color: newApp.service === s ? '#60A5FA' : '#64748b' }}>
                      {s}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#64748b', display: 'block', marginBottom: 6 }}>Specialization Preference</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {SPECIALIZATIONS.map(s => (
                    <motion.button key={s} whileTap={{ scale: 0.9 }}
                      onClick={() => setNewApp(p => ({ ...p, specialization: s }))}
                      style={{ padding: '6px 14px', borderRadius: 6, fontSize: 11, fontFamily: 'JetBrains Mono, monospace', cursor: 'pointer', border: newApp.specialization === s ? '1px solid #A78BFA' : '1px solid #1e293b', background: newApp.specialization === s ? '#A78BFA22' : '#0f172a', color: newApp.specialization === s ? '#A78BFA' : '#64748b' }}>
                      {s}
                    </motion.button>
                  ))}
                </div>
              </div>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={submitApplication}
                style={{ width: '100%', padding: '12px 20px', borderRadius: 8, background: 'linear-gradient(135deg, #00FFCC33, #00FFCC11)', border: '1px solid #00FFCC', color: '#00FFCC', cursor: 'pointer', fontFamily: 'Orbitron, monospace', fontSize: 13, fontWeight: 700 }}>
                SUBMIT APPLICATION
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  const renderTraining = () => {
    const topFive = [...TRAINEES].filter(t => t.status !== 'FAILED').sort((a, b) => b.progress - a.progress).slice(0, 5);
    return (
      <motion.div key="training" variants={sectionVariants} initial="initial" animate="animate" exit="exit" style={{ height: '100%', overflow: 'auto', padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontFamily: 'Orbitron, monospace', fontSize: 16, color: '#00FFCC', margin: 0 }}>PHANTOM SCHOOL — TRAINING ACADEMY</h2>
        </div>
        <div style={{ display: 'flex', gap: 20, marginBottom: 24 }}>
          <div style={{ flex: 3 }}>
            <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 12, color: '#64748b', marginBottom: 10 }}>TRAINEE ROSTER</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
              {TRAINEES.map(t => (
                <motion.div key={t.id} whileHover={{ borderColor: '#00FFCC55' }}
                  onClick={() => setSelectedTrainee(selectedTrainee?.id === t.id ? null : t)}
                  style={{ background: selectedTrainee?.id === t.id ? '#0f172a' : '#0a0a1a', border: `1px solid ${selectedTrainee?.id === t.id ? '#00FFCC55' : '#1e293b'}`, borderRadius: 8, padding: 12, cursor: 'pointer', transition: 'border-color 0.2s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 13, color: '#e2e8f0', fontWeight: 700 }}>{t.codename}</span>
                    <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 3, fontFamily: 'JetBrains Mono, monospace', background: t.status === 'ACTIVE TRAINING' ? '#34D39922' : t.status === 'GRADUATED' ? '#00FFCC22' : t.status === 'FAILED' ? '#DC262622' : '#FBBF2422', color: t.status === 'ACTIVE TRAINING' ? '#34D399' : t.status === 'GRADUATED' ? '#00FFCC' : t.status === 'FAILED' ? '#F87171' : '#FBBF24' }}>{t.status}</span>
                  </div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#94a3b8', marginBottom: 2 }}>{t.realName}</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#64748b', marginBottom: 6 }}>{t.batch} | {t.specialization}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ flex: 1, height: 4, background: '#1e293b', borderRadius: 2, overflow: 'hidden' }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${t.progress}%` }} transition={{ duration: 1, delay: 0.2 }}
                        style={{ height: '100%', background: t.progress >= 80 ? '#34D399' : t.progress >= 50 ? '#FBBF24' : '#F87171', borderRadius: 2 }} />
                    </div>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#94a3b8', minWidth: 32 }}>{t.progress}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 12, color: '#64748b', marginBottom: 10 }}>LEADERBOARD</div>
            <div style={{ background: '#0a0a1a', border: '1px solid #1e293b', borderRadius: 8, padding: 12 }}>
              {topFive.map((t, i) => (
                <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < 4 ? '1px solid #1e293b' : 'none' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Orbitron, monospace', fontSize: 11, fontWeight: 700, background: i === 0 ? '#FBBF2433' : i === 1 ? '#94a3b833' : i === 2 ? '#F9731633' : '#1e293b', color: i === 0 ? '#FBBF24' : i === 1 ? '#94a3b8' : i === 2 ? '#F97316' : '#64748b' }}>
                    {i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 11, color: '#e2e8f0' }}>{t.codename}</div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#64748b' }}>{t.batch}</div>
                  </div>
                  <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 13, color: '#00FFCC', fontWeight: 700 }}>{t.progress}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {selectedTrainee && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', gap: 20, marginBottom: 24 }}>
            <div style={{ flex: 1, background: '#0a0a1a', border: '1px solid #1e293b', borderRadius: 8, padding: 16 }}>
              <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 12, color: '#00FFCC', marginBottom: 12 }}>SKILL ASSESSMENT — {selectedTrainee.codename}</div>
              {Object.entries(selectedTrainee.skills).map(([skill, val]) => (
                <div key={skill} style={{ marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#94a3b8', textTransform: 'capitalize' }}>{skill}</span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#e2e8f0' }}>{val}</span>
                  </div>
                  <div style={{ height: 6, background: '#1e293b', borderRadius: 3, overflow: 'hidden' }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${val}%` }} transition={{ duration: 0.8 }}
                      style={{ height: '100%', borderRadius: 3, background: val >= 80 ? '#00FFCC' : val >= 60 ? '#60A5FA' : val >= 40 ? '#FBBF24' : '#F87171' }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ flex: 1, background: '#0a0a1a', border: '1px solid #1e293b', borderRadius: 8, padding: 16 }}>
              <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 12, color: '#00FFCC', marginBottom: 12 }}>CLEARANCE PROGRESSION</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {CLEARANCE_LEVELS.map((level, i) => {
                  const currentIdx = CLEARANCE_LEVELS.indexOf(selectedTrainee.clearance);
                  const isActive = i <= currentIdx;
                  const isCurrent = i === currentIdx;
                  return (
                    <div key={level} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 12, height: 12, borderRadius: '50%', background: isCurrent ? '#00FFCC' : isActive ? '#00FFCC55' : '#1e293b', border: isCurrent ? '2px solid #00FFCC' : '2px solid #1e293b', boxShadow: isCurrent ? '0 0 10px #00FFCC55' : 'none' }} />
                      {i < CLEARANCE_LEVELS.length - 1 && <div style={{ position: 'absolute', left: 29, top: 12, width: 2, height: 20, background: isActive ? '#00FFCC33' : '#1e293b' }} />}
                      <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 10, color: isCurrent ? '#00FFCC' : isActive ? '#94a3b8' : '#475569' }}>{level}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 12, color: '#64748b', marginBottom: 10 }}>TRAINING MODULES</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
          {TRAINING_MODULES.map(m => (
            <div key={m.name} style={{ background: '#0a0a1a', border: '1px solid #1e293b', borderRadius: 8, padding: 12 }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#e2e8f0', fontWeight: 600, marginBottom: 6 }}>{m.name}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#64748b' }}>{m.weeks} weeks</span>
                <div style={{ display: 'flex', gap: 2 }}>
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={10} fill={i < m.difficulty ? '#FBBF24' : 'none'} color={i < m.difficulty ? '#FBBF24' : '#475569'} />)}
                </div>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#94a3b8' }}>Pass: {m.passRate}%</span>
              </div>
              {selectedTrainee && selectedTrainee.modules[m.name] !== undefined && (
                <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ flex: 1, height: 4, background: '#1e293b', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ width: `${selectedTrainee.modules[m.name]}%`, height: '100%', background: selectedTrainee.modules[m.name] >= 70 ? '#34D399' : '#FBBF24', borderRadius: 2 }} />
                  </div>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#00FFCC' }}>{selectedTrainee.modules[m.name]}%</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    );
  };

  const renderIdClearance = () => {
    const filteredIds = idCards.filter(c =>
      (!idSearchTerm || c.codename.toLowerCase().includes(idSearchTerm.toLowerCase()) || c.idNumber.toLowerCase().includes(idSearchTerm.toLowerCase()) || c.agency.toLowerCase().includes(idSearchTerm.toLowerCase()))
    );
    return (
      <motion.div key="clearance" variants={sectionVariants} initial="initial" animate="animate" exit="exit" style={{ height: '100%', overflow: 'auto', padding: 24 }}>
        <h2 style={{ fontFamily: 'Orbitron, monospace', fontSize: 16, color: '#00FFCC', margin: '0 0 20px' }}>AGENT ID & CLEARANCE MANAGEMENT</h2>

        <div style={{ display: 'flex', gap: 24, marginBottom: 28 }}>
          <div style={{ position: 'relative', width: 380, minHeight: 240, borderRadius: 12, padding: 3, background: 'linear-gradient(135deg, #00FFCC, #60A5FA, #A78BFA, #F472B6, #00FFCC)', backgroundSize: '400% 400%' }}>
            <motion.div animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              style={{ position: 'absolute', inset: 0, borderRadius: 12, background: 'linear-gradient(135deg, #00FFCC, #60A5FA, #A78BFA, #F472B6, #00FFCC)', backgroundSize: '400% 400%', opacity: 0.7 }} />
            <div style={{ position: 'relative', background: '#0a0a1a', borderRadius: 10, padding: 20, height: '100%', boxSizing: 'border-box' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 8, color: '#64748b', letterSpacing: 2 }}>GOVERNMENT OF INDIA</div>
                  <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 10, color: '#94a3b8' }}>{selectedIdAgency}</div>
                </div>
                <Shield size={28} color="#00FFCC" />
              </div>
              <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
                <div style={{ width: 60, height: 72, borderRadius: 6, background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={28} color="#475569" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 18, color: '#00FFCC', fontWeight: 700, marginBottom: 2 }}>{idCodename || 'CODENAME'}</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#475569' }}>CLASSIFIED</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#94a3b8', marginTop: 4 }}>{idRank || 'Field Agent'}</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 9, padding: '2px 8px', borderRadius: 3, fontFamily: 'Orbitron, monospace', background: CLEARANCE_LEVELS.indexOf(idClearance) >= 3 ? '#DC262633' : '#FBBF2433', color: CLEARANCE_LEVELS.indexOf(idClearance) >= 3 ? '#F87171' : '#FBBF24' }}>{idClearance}</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#64748b' }}>BIO: {Array.from({ length: 12 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#64748b' }}>BLOOD: O+</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#64748b' }}>ISSUED: {new Date().toISOString().split('T')[0]}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 6px)', gap: 2 }}>
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div key={i} style={{ width: 6, height: 6, background: Math.random() > 0.4 ? '#1e293b' : '#475569', borderRadius: 1 }} />
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 1 }}>
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div key={i} style={{ width: Math.random() > 0.5 ? 2 : 1, height: 20, background: '#475569' }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#64748b', display: 'block', marginBottom: 4 }}>Codename</label>
              <input value={idCodename} onChange={e => setIdCodename(e.target.value)} placeholder="e.g. PHANTOM"
                style={{ width: '100%', padding: '8px 12px', background: '#0f172a', border: '1px solid #1e293b', borderRadius: 6, color: '#e2e8f0', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#64748b', display: 'block', marginBottom: 4 }}>Rank / Designation</label>
              <input value={idRank} onChange={e => setIdRank(e.target.value)} placeholder="e.g. Senior Field Officer"
                style={{ width: '100%', padding: '8px 12px', background: '#0f172a', border: '1px solid #1e293b', borderRadius: 6, color: '#e2e8f0', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#64748b', display: 'block', marginBottom: 4 }}>Agency</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {['R&AW', 'IB', 'DIA', 'NTRO'].map(a => (
                  <motion.button key={a} whileTap={{ scale: 0.9 }} onClick={() => setSelectedIdAgency(a)}
                    style={{ padding: '6px 14px', borderRadius: 6, fontSize: 11, fontFamily: 'Orbitron, monospace', cursor: 'pointer', border: selectedIdAgency === a ? '1px solid #00FFCC' : '1px solid #1e293b', background: selectedIdAgency === a ? '#00FFCC22' : '#0f172a', color: selectedIdAgency === a ? '#00FFCC' : '#64748b' }}>
                    {a}
                  </motion.button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#64748b', display: 'block', marginBottom: 4 }}>Clearance Level</label>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {CLEARANCE_LEVELS.map(cl => (
                  <motion.button key={cl} whileTap={{ scale: 0.9 }} onClick={() => setIdClearance(cl)}
                    style={{ padding: '4px 10px', borderRadius: 4, fontSize: 9, fontFamily: 'Orbitron, monospace', cursor: 'pointer', border: idClearance === cl ? '1px solid #FBBF24' : '1px solid #1e293b', background: idClearance === cl ? '#FBBF2422' : '#0f172a', color: idClearance === cl ? '#FBBF24' : '#64748b' }}>
                    {cl}
                  </motion.button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={generateId}
                style={{ flex: 1, padding: '10px 16px', borderRadius: 6, background: '#00FFCC22', border: '1px solid #00FFCC55', color: '#00FFCC', cursor: 'pointer', fontFamily: 'Orbitron, monospace', fontSize: 11 }}>
                GENERATE NEW ID
              </motion.button>
            </div>
          </div>
        </div>

        <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 12, color: '#64748b', marginBottom: 10 }}>ACTIVE IDS REGISTRY</div>
        <div style={{ marginBottom: 12 }}>
          <div style={{ position: 'relative', maxWidth: 300 }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: 9, color: '#475569' }} />
            <input value={idSearchTerm} onChange={e => setIdSearchTerm(e.target.value)} placeholder="Search IDs..."
              style={{ width: '100%', padding: '8px 12px 8px 32px', background: '#0f172a', border: '1px solid #1e293b', borderRadius: 6, color: '#e2e8f0', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, outline: 'none', boxSizing: 'border-box' }} />
          </div>
        </div>
        <div style={{ background: '#0a0a1a', border: '1px solid #1e293b', borderRadius: 8, overflow: 'hidden', marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 0.8fr 1fr 0.8fr 0.8fr 0.6fr', gap: 0, padding: '10px 16px', background: '#0f172a', borderBottom: '1px solid #1e293b' }}>
            {['ID Number', 'Codename', 'Agency', 'Clearance', 'Status', 'Issued', 'Action'].map(h => (
              <span key={h} style={{ fontFamily: 'Orbitron, monospace', fontSize: 9, color: '#64748b', textTransform: 'uppercase' }}>{h}</span>
            ))}
          </div>
          <div style={{ maxHeight: 300, overflowY: 'auto' }}>
            {filteredIds.map(card => (
              <div key={card.idNumber} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 0.8fr 1fr 0.8fr 0.8fr 0.6fr', gap: 0, padding: '8px 16px', borderBottom: '1px solid #0f172a', alignItems: 'center' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#94a3b8' }}>{card.idNumber}</span>
                <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 11, color: '#e2e8f0' }}>{card.codename}</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#60A5FA' }}>{card.agency}</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#FBBF24' }}>{card.clearance}</span>
                <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 3, fontFamily: 'JetBrains Mono, monospace', background: (STATUS_BADGE_COLORS[card.status] || '#64748b') + '22', color: STATUS_BADGE_COLORS[card.status] || '#64748b', width: 'fit-content' }}>{card.status}</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#64748b' }}>{card.issued}</span>
                <div>
                  {card.status === 'ACTIVE' && (
                    <button onClick={() => revokeId(card.idNumber)}
                      style={{ padding: '3px 8px', borderRadius: 4, background: '#DC262622', border: '1px solid #DC262644', color: '#F87171', cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace', fontSize: 9 }}>
                      REVOKE
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 12, color: '#64748b', marginBottom: 10 }}>CLEARANCE UPGRADE WORKFLOW</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
          {clearanceRequests.map(cr => (
            <div key={cr.id} style={{ background: '#0a0a1a', border: '1px solid #1e293b', borderRadius: 8, padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 13, color: '#e2e8f0' }}>{cr.codename}</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#64748b' }}>{cr.id}</span>
              </div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#94a3b8', marginBottom: 6 }}>
                {cr.currentLevel} → <span style={{ color: '#FBBF24' }}>{cr.requestedLevel}</span>
              </div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#64748b', marginBottom: 4 }}>Supervisor: {cr.supervisor}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#64748b', marginBottom: 8 }}>Requested: {cr.dateRequested}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 3, fontFamily: 'Orbitron, monospace', background: cr.supervisorApproval === 'APPROVED' ? '#34D39922' : cr.supervisorApproval === 'DENIED' ? '#DC262622' : '#FBBF2422', color: cr.supervisorApproval === 'APPROVED' ? '#34D399' : cr.supervisorApproval === 'DENIED' ? '#F87171' : '#FBBF24' }}>{cr.supervisorApproval}</span>
                {cr.supervisorApproval === 'PENDING' && (
                  <>
                    <motion.button whileTap={{ scale: 0.9 }} onClick={() => approveClearance(cr.id)}
                      style={{ padding: '4px 10px', borderRadius: 4, background: '#34D39922', border: '1px solid #34D39944', color: '#34D399', cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace', fontSize: 9 }}>
                      APPROVE
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.9 }} onClick={() => denyClearance(cr.id)}
                      style={{ padding: '4px 10px', borderRadius: 4, background: '#DC262622', border: '1px solid #DC262644', color: '#F87171', cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace', fontSize: 9 }}>
                      DENY
                    </motion.button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  };

  const renderFieldOps = () => {
    const unassigned = missions.filter(m => !m.assigned);
    const selMission = selectedMission ? missions.find(m => m.id === selectedMission) : null;
    const recommended = selMission ? FIELD_AGENTS.filter(a => a.availability === 'AVAILABLE').map(a => ({ ...a, matchScore: getMatchScore(a, selMission) })).sort((a, b) => b.matchScore - a.matchScore).slice(0, 5) : [];

    return (
      <motion.div key="operations" variants={sectionVariants} initial="initial" animate="animate" exit="exit" style={{ height: '100%', overflow: 'auto', padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontFamily: 'Orbitron, monospace', fontSize: 16, color: '#00FFCC', margin: 0 }}>FIELD OPERATIONS ASSIGNMENT</h2>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowMissionForm(true)}
            style={{ background: '#00FFCC22', border: '1px solid #00FFCC55', color: '#00FFCC', padding: '8px 20px', borderRadius: 6, cursor: 'pointer', fontFamily: 'Orbitron, monospace', fontSize: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Plus size={14} /> FILE NEW MISSION
          </motion.button>
        </div>

        <div style={{ display: 'flex', gap: 20, marginBottom: 24 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 12, color: '#64748b', marginBottom: 10 }}>MISSION QUEUE ({unassigned.length} UNASSIGNED)</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {unassigned.map(m => (
                <motion.div key={m.id} whileHover={{ borderColor: '#00FFCC33' }}
                  style={{ background: selectedMission === m.id ? '#0f172a' : '#0a0a1a', border: `1px solid ${selectedMission === m.id ? '#00FFCC44' : '#1e293b'}`, borderRadius: 8, padding: 12, cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }} onClick={() => setSelectedMission(selectedMission === m.id ? null : m.id)}>
                    <div>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#64748b', marginRight: 8 }}>{m.id}</span>
                      <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 12, color: '#e2e8f0' }}>{m.codename}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 3, fontFamily: 'JetBrains Mono, monospace', background: '#60A5FA22', color: '#60A5FA' }}>{m.type}</span>
                      <div style={{ display: 'flex', gap: 1 }}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: i < m.risk ? '#DC2626' : '#1e293b' }} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#94a3b8', marginBottom: 4 }}>
                    <MapPin size={10} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />{m.location} | {m.duration}
                  </div>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 4 }}>
                    {m.requiredSkills.map(s => (
                      <span key={s} style={{ fontSize: 9, padding: '1px 5px', borderRadius: 3, background: '#1e293b', color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }}>{s}</span>
                    ))}
                  </div>
                  {expandedMission === m.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      style={{ marginTop: 8, padding: 10, background: '#020617', borderRadius: 6 }}>
                      <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 9, color: '#64748b', marginBottom: 4 }}>BRIEFING</div>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#94a3b8', lineHeight: 1.5 }}>{m.objectives}</div>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#DC2626', marginTop: 6 }}>CLASSIFICATION: {m.classification}</div>
                    </motion.div>
                  )}
                  <button onClick={(e) => { e.stopPropagation(); setExpandedMission(expandedMission === m.id ? null : m.id); }}
                    style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace', fontSize: 9, padding: '4px 0', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <ChevronDown size={10} style={{ transform: expandedMission === m.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                    {expandedMission === m.id ? 'HIDE BRIEFING' : 'VIEW BRIEFING'}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {selMission && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ width: 300 }}>
              <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 12, color: '#64748b', marginBottom: 10 }}>RECOMMENDED AGENTS</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {recommended.map(a => (
                  <div key={a.codename} style={{ background: '#0a0a1a', border: '1px solid #1e293b', borderRadius: 8, padding: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 12, color: '#e2e8f0' }}>{a.codename}</span>
                      <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 14, color: a.matchScore >= 80 ? '#34D399' : a.matchScore >= 50 ? '#FBBF24' : '#F87171', fontWeight: 700 }}>{a.matchScore}%</span>
                    </div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#64748b', marginBottom: 4 }}>{a.division} | {a.availability}</div>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 8 }}>
                      {a.skills.slice(0, 4).map(s => (
                        <span key={s} style={{ fontSize: 9, padding: '1px 5px', borderRadius: 3, background: '#1e293b', color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }}>{s}</span>
                      ))}
                    </div>
                    <motion.button whileTap={{ scale: 0.95 }} onClick={() => assignAgent(selMission.id, a.codename)}
                      style={{ width: '100%', padding: '6px 12px', borderRadius: 4, background: '#00FFCC22', border: '1px solid #00FFCC44', color: '#00FFCC', cursor: 'pointer', fontFamily: 'Orbitron, monospace', fontSize: 10 }}>
                      ASSIGN AGENT
                    </motion.button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 12, color: '#64748b', marginBottom: 10 }}>ACTIVE DEPLOYMENTS</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 10, marginBottom: 24 }}>
          {deployments.map(d => (
            <div key={d.codename} style={{ background: '#0a0a1a', border: `1px solid ${d.status === 'OVERDUE' ? '#DC262644' : '#1e293b'}`, borderRadius: 8, padding: 12, position: 'relative' }}>
              {d.status === 'OVERDUE' && (
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: '50%', background: '#DC2626' }} />
              )}
              <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 13, color: '#e2e8f0', marginBottom: 4 }}>{d.codename}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#60A5FA', marginBottom: 2 }}>{d.mission}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#94a3b8', marginBottom: 2 }}>{d.location}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#64748b', marginBottom: 4 }}>Day {d.daysDeployed} | Last: {d.lastCheckIn}</div>
              <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 3, fontFamily: 'Orbitron, monospace', background: d.status === 'ON MISSION' ? '#34D39922' : d.status === 'RETURNING' ? '#60A5FA22' : '#DC262622', color: d.status === 'ON MISSION' ? '#34D399' : d.status === 'RETURNING' ? '#60A5FA' : '#F87171' }}>{d.status}</span>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {showMissionForm && (
            <motion.div initial={{ opacity: 0, x: 300 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 300 }}
              style={{ position: 'fixed', top: 0, right: 0, width: 440, height: '100vh', background: '#0a0a1a', borderLeft: '1px solid #00FFCC33', zIndex: 100, padding: 24, overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: 14, color: '#00FFCC', margin: 0 }}>MISSION BRIEFING CREATOR</h3>
                <button onClick={() => setShowMissionForm(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}><X size={18} /></button>
              </div>
              {[
                { label: 'Mission Codename', key: 'codename', type: 'text' },
                { label: 'Location', key: 'location', type: 'text' },
                { label: 'Duration Estimate', key: 'duration', type: 'text' },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 12 }}>
                  <label style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#64748b', display: 'block', marginBottom: 4 }}>{f.label}</label>
                  <input value={newMission[f.key]} onChange={e => setNewMission(p => ({ ...p, [f.key]: e.target.value }))}
                    style={{ width: '100%', padding: '8px 12px', background: '#0f172a', border: '1px solid #1e293b', borderRadius: 6, color: '#e2e8f0', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              ))}
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#64748b', display: 'block', marginBottom: 4 }}>Type</label>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {['Infiltration', 'Surveillance', 'Extraction', 'Sabotage', 'Intelligence'].map(t => (
                    <motion.button key={t} whileTap={{ scale: 0.9 }} onClick={() => setNewMission(p => ({ ...p, type: t }))}
                      style={{ padding: '4px 10px', borderRadius: 4, fontSize: 10, fontFamily: 'JetBrains Mono, monospace', cursor: 'pointer', border: newMission.type === t ? '1px solid #60A5FA' : '1px solid #1e293b', background: newMission.type === t ? '#60A5FA22' : '#0f172a', color: newMission.type === t ? '#60A5FA' : '#64748b' }}>
                      {t}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#64748b', display: 'block', marginBottom: 4 }}>Risk Level: {newMission.risk}</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[1, 2, 3, 4, 5].map(r => (
                    <motion.button key={r} whileTap={{ scale: 0.9 }} onClick={() => setNewMission(p => ({ ...p, risk: r }))}
                      style={{ width: 32, height: 32, borderRadius: '50%', fontSize: 12, fontFamily: 'Orbitron, monospace', cursor: 'pointer', border: newMission.risk === r ? '1px solid #DC2626' : '1px solid #1e293b', background: newMission.risk >= r ? '#DC262633' : '#0f172a', color: newMission.risk >= r ? '#F87171' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {r}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#64748b', display: 'block', marginBottom: 4 }}>Required Skills</label>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {[...SPECIALIZATIONS, 'Combat', 'Explosives', 'Technology', 'Finance', 'Languages'].map(s => (
                    <motion.button key={s} whileTap={{ scale: 0.9 }}
                      onClick={() => setNewMission(p => ({ ...p, requiredSkills: p.requiredSkills.includes(s) ? p.requiredSkills.filter(x => x !== s) : [...p.requiredSkills, s] }))}
                      style={{ padding: '4px 10px', borderRadius: 4, fontSize: 9, fontFamily: 'JetBrains Mono, monospace', cursor: 'pointer', border: newMission.requiredSkills.includes(s) ? '1px solid #A78BFA' : '1px solid #1e293b', background: newMission.requiredSkills.includes(s) ? '#A78BFA22' : '#0f172a', color: newMission.requiredSkills.includes(s) ? '#A78BFA' : '#64748b' }}>
                      {s}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#64748b', display: 'block', marginBottom: 4 }}>Objectives</label>
                <textarea value={newMission.objectives} onChange={e => setNewMission(p => ({ ...p, objectives: e.target.value }))} rows={4}
                  style={{ width: '100%', padding: '8px 12px', background: '#0f172a', border: '1px solid #1e293b', borderRadius: 6, color: '#e2e8f0', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#64748b', display: 'block', marginBottom: 4 }}>Classification</label>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['SECRET', 'TOP SECRET', 'COSMIC TOP SECRET'].map(cl => (
                    <motion.button key={cl} whileTap={{ scale: 0.9 }} onClick={() => setNewMission(p => ({ ...p, classification: cl }))}
                      style={{ padding: '4px 10px', borderRadius: 4, fontSize: 9, fontFamily: 'Orbitron, monospace', cursor: 'pointer', border: newMission.classification === cl ? '1px solid #DC2626' : '1px solid #1e293b', background: newMission.classification === cl ? '#DC262622' : '#0f172a', color: newMission.classification === cl ? '#F87171' : '#64748b' }}>
                      {cl}
                    </motion.button>
                  ))}
                </div>
              </div>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={fileMission}
                style={{ width: '100%', padding: '12px 20px', borderRadius: 8, background: 'linear-gradient(135deg, #00FFCC33, #00FFCC11)', border: '1px solid #00FFCC', color: '#00FFCC', cursor: 'pointer', fontFamily: 'Orbitron, monospace', fontSize: 13, fontWeight: 700 }}>
                FILE MISSION
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  const renderPerformance = () => {
    const topThree = [...PERF_AGENTS].sort((a, b) => {
      const order = { S: 4, A: 3, B: 2, C: 1, D: 0 };
      return (order[b.rating] - order[a.rating]) || (b.successRate - a.successRate);
    }).slice(0, 3);
    const sel = selectedPerfAgent ? PERF_AGENTS.find(a => a.codename === selectedPerfAgent) : null;

    return (
      <motion.div key="performance" variants={sectionVariants} initial="initial" animate="animate" exit="exit" style={{ height: '100%', overflow: 'auto', padding: 24 }}>
        <h2 style={{ fontFamily: 'Orbitron, monospace', fontSize: 16, color: '#00FFCC', margin: '0 0 20px' }}>PERFORMANCE & ANALYTICS</h2>

        <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 12, color: '#64748b', marginBottom: 10 }}>TOP PERFORMERS</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 28, alignItems: 'flex-end' }}>
          {[1, 0, 2].map(idx => {
            const agent = topThree[idx];
            if (!agent) return null;
            const isGold = idx === 0;
            const isSilver = idx === 1;
            const color = isGold ? '#FBBF24' : isSilver ? '#94a3b8' : '#F97316';
            const height = isGold ? 160 : isSilver ? 130 : 110;
            return (
              <motion.div key={agent.codename} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: idx * 0.15 }}
                style={{ width: 160, textAlign: 'center' }}>
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: isGold ? 16 : 14, color, fontWeight: 700, marginBottom: 8 }}>
                  {isGold ? '★' : ''} {agent.codename} {isGold ? '★' : ''}
                </div>
                <div style={{ height, background: `linear-gradient(180deg, ${color}33, ${color}11)`, border: `1px solid ${color}55`, borderRadius: '8px 8px 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <Award size={isGold ? 32 : 24} color={color} />
                  <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 28, color, fontWeight: 900, marginTop: 4 }}>{['1st', '2nd', '3rd'][idx]}</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#94a3b8', marginTop: 4 }}>{agent.division}</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#94a3b8' }}>{agent.missionsCompleted} missions | {agent.successRate}%</div>
                  <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 16, color: RATING_COLORS[agent.rating], fontWeight: 900, marginTop: 4 }}>{agent.rating}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 12, color: '#64748b', marginBottom: 10 }}>AGENT SCORECARDS</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10, marginBottom: 24 }}>
          {PERF_AGENTS.map(a => (
            <motion.div key={a.codename} whileHover={{ borderColor: '#00FFCC33' }}
              onClick={() => setSelectedPerfAgent(selectedPerfAgent === a.codename ? null : a.codename)}
              style={{ background: selectedPerfAgent === a.codename ? '#0f172a' : '#0a0a1a', border: `1px solid ${selectedPerfAgent === a.codename ? '#00FFCC44' : '#1e293b'}`, borderRadius: 8, padding: 12, cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 13, color: '#e2e8f0', fontWeight: 700 }}>{a.codename}</span>
                <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 16, color: RATING_COLORS[a.rating], fontWeight: 900 }}>{a.rating}</span>
              </div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#60A5FA', marginBottom: 4 }}>{a.division}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#94a3b8' }}>Missions: {a.missionsCompleted}</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#34D399' }}>Success: {a.successRate}%</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#94a3b8' }}>Reports: {a.reportsFile}</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: a.riskIncidents > 4 ? '#F87171' : '#94a3b8' }}>Incidents: {a.riskIncidents}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {sel && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: '#0a0a1a', border: '1px solid #1e293b', borderRadius: 8, padding: 16, marginBottom: 24 }}>
            <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 13, color: '#00FFCC', marginBottom: 12 }}>FITNESS & PSYCHOLOGICAL TRACKING — {sel.codename}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
              <div style={{ background: '#0f172a', borderRadius: 6, padding: 12 }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#64748b', marginBottom: 4 }}>Physical Fitness</div>
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 22, color: sel.physical >= 85 ? '#34D399' : sel.physical >= 70 ? '#FBBF24' : '#F87171', fontWeight: 700 }}>{sel.physical}/100</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#64748b', marginTop: 4 }}>Trend: {sel.physical >= 85 ? '▲ Excellent' : sel.physical >= 70 ? '► Stable' : '▼ Declining'}</div>
              </div>
              <div style={{ background: '#0f172a', borderRadius: 6, padding: 12 }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#64748b', marginBottom: 4 }}>Psychological Eval</div>
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 16, color: sel.psychEval === 'CLEAR' ? '#34D399' : sel.psychEval === 'MONITORING' ? '#FBBF24' : '#F87171', fontWeight: 700 }}>{sel.psychEval}</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#64748b', marginTop: 4 }}>Last: {sel.psychDate}</div>
              </div>
              <div style={{ background: '#0f172a', borderRadius: 6, padding: 12 }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#64748b', marginBottom: 4 }}>Retirement Eligibility</div>
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 16, color: sel.retirementYears <= 5 ? '#FBBF24' : '#94a3b8', fontWeight: 700 }}>{sel.retirementYears} years</div>
              </div>
              <div style={{ background: '#0f172a', borderRadius: 6, padding: 12 }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#64748b', marginBottom: 4 }}>Injury / Incident History</div>
                {sel.injuries.length === 0 ? (
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#34D399' }}>No incidents</div>
                ) : sel.injuries.map((inj, i) => (
                  <div key={i} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#F87171', marginBottom: 2 }}>• {inj}</div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 12, color: '#64748b', marginBottom: 10 }}>DIVISION COMPARISON</div>
        <div style={{ background: '#0a0a1a', border: '1px solid #1e293b', borderRadius: 8, padding: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 1fr 1fr 1fr 1fr', gap: 8, marginBottom: 8 }}>
            <span />
            {['Agents', 'Missions/Yr', 'Success %', 'Budget %', 'Intel Score'].map(h => (
              <span key={h} style={{ fontFamily: 'Orbitron, monospace', fontSize: 9, color: '#64748b', textAlign: 'center' }}>{h}</span>
            ))}
          </div>
          {DIVISION_DATA.map((d, di) => {
            const colors = ['#00FFCC', '#60A5FA', '#A78BFA', '#F97316'];
            return (
              <div key={d.name} style={{ display: 'grid', gridTemplateColumns: '100px 1fr 1fr 1fr 1fr 1fr', gap: 8, marginBottom: 8, alignItems: 'center' }}>
                <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 11, color: colors[di], fontWeight: 700 }}>{d.name}</span>
                {[d.agents, d.missionsYear, d.successRate, d.budget, d.intelScore].map((val, vi) => {
                  const max = [220, 520, 100, 100, 100][vi];
                  return (
                    <div key={vi} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ flex: 1, height: 8, background: '#1e293b', borderRadius: 4, overflow: 'hidden' }}>
                        <motion.div initial={{ width: 0 }} animate={{ width: `${(val / max) * 100}%` }} transition={{ duration: 1, delay: di * 0.1 }}
                          style={{ height: '100%', background: colors[di], borderRadius: 4 }} />
                      </div>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#94a3b8', minWidth: 28, textAlign: 'right' }}>{val}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </motion.div>
    );
  };

  const renderComms = () => {
    const activeThread = selectedThread ? threads.find(t => t.id === selectedThread) : null;
    return (
      <motion.div key="comms" variants={sectionVariants} initial="initial" animate="animate" exit="exit" style={{ height: '100%', overflow: 'hidden', padding: 24, display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontFamily: 'Orbitron, monospace', fontSize: 16, color: '#00FFCC', margin: '0 0 16px' }}>SECURE COMMUNICATIONS HUB</h2>

        <div style={{ display: 'flex', gap: 16, flex: 1, overflow: 'hidden', marginBottom: 16 }}>
          <div style={{ width: 320, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 11, color: '#64748b', marginBottom: 4 }}>MESSAGE THREADS</div>
            {threads.map(t => (
              <motion.div key={t.id} whileHover={{ borderColor: '#00FFCC33' }}
                onClick={() => setSelectedThread(selectedThread === t.id ? null : t.id)}
                style={{ background: selectedThread === t.id ? '#0f172a' : '#0a0a1a', border: `1px solid ${selectedThread === t.id ? '#00FFCC44' : '#1e293b'}`, borderRadius: 8, padding: 10, cursor: 'pointer', position: 'relative' }}>
                {(t.priority === 'CRITIC') && (
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }}
                    style={{ position: 'absolute', top: 8, right: 8, width: 6, height: 6, borderRadius: '50%', background: '#DC2626' }} />
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 11, color: '#e2e8f0' }}>{t.participants.join(' ↔ ')}</span>
                </div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#94a3b8', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.lastMessage}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#475569' }}>{t.timestamp}</span>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <span style={{ fontSize: 8, padding: '1px 5px', borderRadius: 3, fontFamily: 'JetBrains Mono, monospace', background: (PRIORITY_COLORS[t.priority] || '#64748b') + '22', color: PRIORITY_COLORS[t.priority] || '#64748b' }}>{t.priority}</span>
                    <Lock size={9} color="#475569" />
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 8, color: '#475569' }}>{t.encryption}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#0a0a1a', border: '1px solid #1e293b', borderRadius: 8, overflow: 'hidden' }}>
            {activeThread ? (
              <>
                <div style={{ padding: '10px 16px', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 12, color: '#e2e8f0' }}>{activeThread.participants.join(' ↔ ')}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#64748b' }}>{activeThread.encryption}</span>
                    <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowEncrypted(!showEncrypted)}
                      style={{ background: 'none', border: '1px solid #1e293b', borderRadius: 4, padding: '3px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: showEncrypted ? '#F87171' : '#34D399', fontFamily: 'JetBrains Mono, monospace', fontSize: 9 }}>
                      {showEncrypted ? <Lock size={10} /> : <Eye size={10} />}
                      {showEncrypted ? 'ENCRYPTED' : 'DECRYPTED'}
                    </motion.button>
                  </div>
                </div>
                <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {activeThread.messages.map((msg, i) => {
                    const isOp = msg.sender.includes('CONTROL') || msg.sender.includes('DIR') || msg.sender.includes('TECH');
                    return (
                      <div key={i} style={{ alignSelf: isOp ? 'flex-start' : 'flex-end', maxWidth: '75%' }}>
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: isOp ? '#60A5FA' : '#00FFCC', marginBottom: 3 }}>
                          {msg.sender} — {msg.time}
                        </div>
                        <div style={{ padding: '8px 12px', borderRadius: 8, background: isOp ? '#0f172a' : '#00FFCC11', border: `1px solid ${isOp ? '#1e293b' : '#00FFCC33'}`, fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: showEncrypted ? '#475569' : '#e2e8f0', wordBreak: 'break-all', letterSpacing: showEncrypted ? 1 : 0 }}>
                          {showEncrypted ? msg.encrypted : msg.text}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ padding: '10px 16px', borderTop: '1px solid #1e293b', display: 'flex', gap: 8 }}>
                  <input value={messageInput} onChange={e => setMessageInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
                    placeholder="Type encrypted message..." disabled={sendingMsg}
                    style={{ flex: 1, padding: '8px 12px', background: '#0f172a', border: '1px solid #1e293b', borderRadius: 6, color: '#e2e8f0', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, outline: 'none' }} />
                  <motion.button whileTap={{ scale: 0.9 }} onClick={sendMessage} disabled={sendingMsg}
                    style={{ padding: '8px 16px', borderRadius: 6, background: sendingMsg ? '#FBBF2422' : '#00FFCC22', border: `1px solid ${sendingMsg ? '#FBBF2455' : '#00FFCC55'}`, color: sendingMsg ? '#FBBF24' : '#00FFCC', cursor: sendingMsg ? 'wait' : 'pointer', fontFamily: 'Orbitron, monospace', fontSize: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                    {sendingMsg ? <Activity size={12} /> : <Send size={12} />}
                    {sendingMsg ? 'ENCRYPTING...' : 'SEND ENCRYPTED'}
                  </motion.button>
                </div>
              </>
            ) : (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
                <Lock size={32} color="#1e293b" />
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#475569' }}>Select a thread to view messages</span>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, overflowY: 'auto', flexShrink: 0 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 11, color: '#64748b', marginBottom: 8 }}>DEAD DROP SCHEDULER</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {deadDrops.map(dd => (
                <div key={dd.id} style={{ background: '#0a0a1a', border: '1px solid #1e293b', borderRadius: 6, padding: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 11, color: '#e2e8f0' }}>{dd.locationCode}</div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#64748b' }}>{dd.city} | {dd.gps}</div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#94a3b8' }}>Next: {dd.nextDrop} | Agent: {dd.assignedAgent}</div>
                  </div>
                  <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 3, fontFamily: 'Orbitron, monospace', background: (DEAD_DROP_COLORS[dd.status] || '#64748b') + '22', color: DEAD_DROP_COLORS[dd.status] || '#64748b' }}>{dd.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 11, color: '#64748b', marginBottom: 8 }}>CHECK-IN MONITOR</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {checkIns.map(ci => (
                <div key={ci.codename} style={{ background: '#0a0a1a', border: `1px solid ${ci.status === 'CRITICAL' || ci.status === 'MISSED' ? '#DC262633' : '#1e293b'}`, borderRadius: 6, padding: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                  {(ci.status === 'MISSED' || ci.status === 'CRITICAL') && (
                    <motion.div animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 1.2, repeat: Infinity }}
                      style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, borderRadius: '6px 0 0 6px', background: '#DC2626' }} />
                  )}
                  <div style={{ paddingLeft: ci.status === 'MISSED' || ci.status === 'CRITICAL' ? 8 : 0 }}>
                    <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 11, color: '#e2e8f0' }}>{ci.codename}</span>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#64748b' }}>Last: {ci.lastCheckIn}</div>
                  </div>
                  <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 3, fontFamily: 'JetBrains Mono, monospace', background: (CHECK_IN_COLORS[ci.status] || '#64748b') + '22', color: CHECK_IN_COLORS[ci.status] || '#64748b' }}>{ci.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 11, color: '#64748b', marginBottom: 8 }}>EMERGENCY EXTRACTIONS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {extractions.map(ex => (
                <div key={ex.id} style={{ background: '#0a0a1a', border: '1px solid #DC262633', borderRadius: 6, padding: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 12, color: '#F87171', fontWeight: 700 }}>{ex.codename}</span>
                    <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 3, fontFamily: 'Orbitron, monospace', background: ex.threatLevel === 'CRITICAL' ? '#DC262633' : ex.threatLevel === 'HIGH' ? '#F9731633' : '#FBBF2433', color: ex.threatLevel === 'CRITICAL' ? '#F87171' : ex.threatLevel === 'HIGH' ? '#F97316' : '#FBBF24' }}>{ex.threatLevel}</span>
                  </div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#94a3b8', marginBottom: 2 }}>{ex.location}</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#64748b', marginBottom: 6 }}>{ex.reason}</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#475569', marginBottom: 8 }}>Requested: {ex.timeRequested}</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <motion.button whileTap={{ scale: 0.9 }} onClick={() => approveExtraction(ex.id)}
                      style={{ flex: 1, padding: '5px 10px', borderRadius: 4, background: '#34D39922', border: '1px solid #34D39944', color: '#34D399', cursor: 'pointer', fontFamily: 'Orbitron, monospace', fontSize: 9 }}>
                      APPROVE EXTRACTION
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.9 }} onClick={() => denyExtraction(ex.id)}
                      style={{ padding: '5px 10px', borderRadius: 4, background: '#DC262622', border: '1px solid #DC262644', color: '#F87171', cursor: 'pointer', fontFamily: 'Orbitron, monospace', fontSize: 9 }}>
                      DENY
                    </motion.button>
                  </div>
                </div>
              ))}
              {extractions.length === 0 && (
                <div style={{ padding: 16, textAlign: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#475569' }}>
                  <CheckCircle size={20} color="#34D399" style={{ marginBottom: 6, display: 'block', margin: '0 auto 6px' }} />
                  No active extraction requests
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const activeAgents = idCards.filter(c => c.status === 'ACTIVE').length;

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', background: '#020617', position: 'relative', overflow: 'hidden' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: 52, background: '#0a0a1a', borderBottom: '1px solid #1e293b', flexShrink: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h1 style={{ fontFamily: 'Orbitron, monospace', fontSize: 14, color: '#00FFCC', margin: 0, letterSpacing: 2 }}>AGENT OPERATIONS PORTAL</h1>
          {['R&AW', 'IB', 'DIA'].map(b => (
            <span key={b} style={{ fontSize: 9, padding: '2px 8px', borderRadius: 3, background: '#00FFCC11', border: '1px solid #00FFCC33', color: '#00FFCC', fontFamily: 'Orbitron, monospace', letterSpacing: 1 }}>{b}</span>
          ))}
        </div>
        <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 10, color: '#DC2626', letterSpacing: 3, textAlign: 'center' }}>
          CLASSIFIED — NEED TO KNOW BASIS
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 11, color: '#e2e8f0' }}>{agentName || 'OPERATOR'}</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#64748b', display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
              <Clock size={10} />
              {systemTime.toLocaleTimeString('en-GB', { hour12: false })}
            </div>
          </div>
          <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 15px #00FFCC33' }} whileTap={{ scale: 0.95 }} onClick={onBack}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 6, background: '#00FFCC11', border: '1px solid #00FFCC44', color: '#00FFCC', cursor: 'pointer', fontFamily: 'Orbitron, monospace', fontSize: 10 }}>
            <ArrowLeft size={12} /> RETURN TO COMMAND
          </motion.button>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <nav style={{ width: 220, background: '#0a0a1a', borderRight: '1px solid #1e293b', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          <div style={{ padding: '20px 16px', textAlign: 'center', borderBottom: '1px solid #1e293b' }}>
            <div style={{ width: 48, height: 48, margin: '0 auto 8px', borderRadius: 8, background: 'linear-gradient(135deg, #00FFCC22, #60A5FA22)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #00FFCC33' }}>
              <Shield size={24} color="#00FFCC" />
            </div>
            <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 9, color: '#64748b', letterSpacing: 2 }}>INTELLIGENCE BUREAU</div>
          </div>
          <div style={{ flex: 1, padding: '12px 0' }}>
            {NAV_ITEMS.map(item => {
              const isActive = activeSection === item.key;
              const Icon = item.icon;
              return (
                <motion.button key={item.key} whileHover={{ backgroundColor: '#0f172a' }}
                  onClick={() => setActiveSection(item.key)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', background: isActive ? '#0f172a' : 'transparent', border: 'none', borderLeft: isActive ? '3px solid #00FFCC' : '3px solid transparent', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
                  <Icon size={16} color={isActive ? '#00FFCC' : '#475569'} />
                  <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 10, color: isActive ? '#00FFCC' : '#64748b', letterSpacing: 1 }}>{item.label}</span>
                  {isActive && (
                    <motion.div layoutId="navGlow" style={{ position: 'absolute', inset: 0, background: '#00FFCC08', borderLeft: '3px solid #00FFCC', pointerEvents: 'none' }} />
                  )}
                </motion.button>
              );
            })}
          </div>
          <div style={{ padding: 16, borderTop: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#64748b' }}>Active IDs</span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#00FFCC' }}>{activeAgents}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#64748b' }}>Deployed</span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#60A5FA' }}>{deployments.length}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
              <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}
                style={{ width: 6, height: 6, borderRadius: '50%', background: '#34D399' }} />
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#34D399' }}>SYSTEM OPERATIONAL</span>
            </div>
          </div>
        </nav>

        <main style={{ flex: 1, overflow: 'hidden', background: '#020617' }}>
          <AnimatePresence mode="wait">
            {activeSection === 'recruitment' && renderRecruitment()}
            {activeSection === 'training' && renderTraining()}
            {activeSection === 'clearance' && renderIdClearance()}
            {activeSection === 'operations' && renderFieldOps()}
            {activeSection === 'performance' && renderPerformance()}
            {activeSection === 'comms' && renderComms()}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AgentPortal;
