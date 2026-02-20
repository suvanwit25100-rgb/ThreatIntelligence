from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta, date
import random
import hashlib

from accounts.models import User
from intel.models import Alert, ThreatHistory
from agents.models import Candidate, Agent, TrainingRecord, AgentID, ClearanceRequest
from operations.models import Mission, Deployment
from comms.models import Thread, Message, CheckIn, DeadDrop, ExtractionRequest
from files.models import GovFile


class Command(BaseCommand):
    help = 'Seed the database with sample intelligence data'

    def handle(self, *args, **options):
        self.stdout.write('Seeding database...')

        self._create_users()
        self._create_alerts()
        self._create_candidates()
        self._create_agents()
        self._create_missions()
        self._create_comms()
        self._create_files()

        self.stdout.write(self.style.SUCCESS('Database seeded successfully.'))

    def _create_users(self):
        if User.objects.exists():
            self.stdout.write('Users already exist, skipping.')
            return

        users = [
            {'username': 'admin', 'password': 'admin123', 'first_name': 'Ajay', 'last_name': 'Sharma', 'role': 'ADMIN', 'clearance_level': 'COSMIC', 'division': 'RAW', 'is_staff': True, 'is_superuser': True, 'email': 'admin@intel.gov.in'},
            {'username': 'commander', 'password': 'cmd123', 'first_name': 'Vikram', 'last_name': 'Singh', 'role': 'COMMANDER', 'clearance_level': 'TOP_SECRET', 'division': 'RAW', 'email': 'commander@intel.gov.in'},
            {'username': 'operator', 'password': 'ops123', 'first_name': 'Priya', 'last_name': 'Nair', 'role': 'OPERATOR', 'clearance_level': 'SECRET', 'division': 'IB', 'email': 'operator@intel.gov.in'},
            {'username': 'agent', 'password': 'agt123', 'first_name': 'Rahul', 'last_name': 'Mehra', 'role': 'AGENT', 'clearance_level': 'CONFIDENTIAL', 'division': 'DIA', 'email': 'agent@intel.gov.in'},
        ]
        for u in users:
            pwd = u.pop('password')
            User.objects.create_user(password=pwd, **u)
        self.stdout.write(f'  Created {len(users)} users')

    def _create_alerts(self):
        if Alert.objects.exists():
            return
        alerts_data = [
            ('China', 'PLA troop movement detected near Aksai Chin', 'CRITICAL', 'MILITARY'),
            ('Pakistan', 'ISI operatives identified in Mumbai surveillance', 'HIGH', 'TERRORISM'),
            ('Russia', 'New S-500 deployment near Central Asia', 'MEDIUM', 'MILITARY'),
            ('China', 'Cyber intrusion attempt on DRDO network', 'CRITICAL', 'CYBER'),
            ('North Korea', 'ICBM test launch detected from Sohae', 'HIGH', 'NUCLEAR'),
            ('Pakistan', 'Cross-border infiltration attempt in J&K', 'HIGH', 'TERRORISM'),
            ('Iran', 'Uranium enrichment activity increased at Natanz', 'MEDIUM', 'NUCLEAR'),
            ('China', 'Naval buildup in South China Sea intensifies', 'HIGH', 'MILITARY'),
            ('Turkey', 'Arms shipment to Pakistan via third parties', 'MEDIUM', 'DIPLOMATIC'),
            ('USA', 'Intelligence sharing agreement renewal pending', 'LOW', 'DIPLOMATIC'),
            ('China', 'Satellite repositioning over Indian Ocean detected', 'HIGH', 'MILITARY'),
            ('Pakistan', 'Tactical nuclear weapons moved to forward positions', 'CRITICAL', 'NUCLEAR'),
            ('Bangladesh', 'Refugee crisis escalating at eastern border', 'MEDIUM', 'DIPLOMATIC'),
            ('Afghanistan', 'Taliban faction planning cross-border operations', 'HIGH', 'TERRORISM'),
            ('China', 'Economic sanctions threat over trade dispute', 'MEDIUM', 'ECONOMIC'),
            ('Russia', 'Joint military exercise proposal received', 'LOW', 'DIPLOMATIC'),
            ('Pakistan', 'JeM training camps detected via satellite imagery', 'CRITICAL', 'TERRORISM'),
            ('China', 'Aggressive patrolling at Doklam plateau', 'HIGH', 'MILITARY'),
            ('Iran', 'Oil supply agreement under negotiation', 'LOW', 'ECONOMIC'),
            ('North Korea', 'Missile technology transfer to Pakistan suspected', 'CRITICAL', 'NUCLEAR'),
        ]
        for country, event, priority, category in alerts_data:
            Alert.objects.create(country=country, event=event, priority=priority, category=category)
        self.stdout.write(f'  Created {len(alerts_data)} alerts')

    def _create_candidates(self):
        if Candidate.objects.exists():
            return
        names = [
            ('Arjun Reddy', 24, 'B.Tech', 'IIT Delhi', ['Hindi', 'English', 'Telugu'], 88, 132, 'MILITARY', 'HUMINT'),
            ('Sneha Kapoor', 26, 'MA Intelligence Studies', 'JNU', ['Hindi', 'English', 'Urdu', 'Arabic'], 75, 141, 'CIVILIAN', 'ANALYSIS'),
            ('Rajesh Iyer', 28, 'B.Tech + MBA', 'IIT Bombay', ['Hindi', 'English', 'Tamil', 'Mandarin'], 92, 138, 'MILITARY', 'CYBER'),
            ('Fatima Khan', 25, 'MA Int. Relations', 'Jamia Millia', ['Hindi', 'English', 'Urdu', 'Pashto'], 70, 136, 'CIVILIAN', 'HUMINT'),
            ('Vikrant Chauhan', 30, 'NDA Graduate', 'NDA Khadakwasla', ['Hindi', 'English', 'Punjabi'], 96, 128, 'MILITARY', 'COVERT_OPS'),
            ('Ananya Sharma', 23, 'B.Sc Forensics', 'LNJN NICFS', ['Hindi', 'English', 'Russian'], 80, 144, 'POLICE', 'COUNTER_INTEL'),
            ('Suresh Pillai', 27, 'M.Tech Signals', 'IISc Bangalore', ['Hindi', 'English', 'Malayalam', 'French'], 78, 147, 'CIVILIAN', 'SIGINT'),
            ('Deepak Yadav', 29, 'NDA + IMA', 'IMA Dehradun', ['Hindi', 'English', 'Nepali'], 94, 131, 'MILITARY', 'COVERT_OPS'),
            ('Kavitha Menon', 26, 'MA Criminology', 'TISS Mumbai', ['Hindi', 'English', 'Malayalam', 'Arabic'], 72, 139, 'POLICE', 'ANALYSIS'),
            ('Rohit Saxena', 31, 'M.Tech Cyber Security', 'IIT Kanpur', ['Hindi', 'English', 'German'], 82, 142, 'INTELLIGENCE', 'CYBER'),
            ('Nisha Gupta', 24, 'B.Tech ECE', 'NIT Trichy', ['Hindi', 'English', 'Tamil'], 76, 135, 'CIVILIAN', 'SIGINT'),
            ('Manish Tiwari', 28, 'MA Defence Studies', 'Pune University', ['Hindi', 'English', 'Marathi', 'Chinese'], 90, 130, 'MILITARY', 'HUMINT'),
            ('Aisha Bano', 25, 'BA Linguistics', 'DU', ['Hindi', 'English', 'Urdu', 'Persian', 'Arabic'], 68, 148, 'CIVILIAN', 'HUMINT'),
            ('Karthik Raman', 27, 'ME Aerospace', 'IISc', ['Hindi', 'English', 'Tamil', 'Japanese'], 84, 140, 'CIVILIAN', 'SIGINT'),
            ('Pradeep Joshi', 32, 'Army Officer', 'OTA Chennai', ['Hindi', 'English', 'Punjabi', 'Urdu'], 97, 126, 'MILITARY', 'COVERT_OPS'),
        ]
        stages = ['APPLIED', 'APPLIED', 'SCREENING', 'SCREENING', 'FIELD_TEST', 'FIELD_TEST', 'INTERVIEW', 'INTERVIEW', 'POLYGRAPH', 'POLYGRAPH', 'CLEARANCE', 'CLEARANCE', 'INDUCTED', 'INDUCTED', 'APPLIED']
        for i, (name, age, edu, uni, langs, phys, iq, svc, spec) in enumerate(names):
            Candidate.objects.create(
                name=name, age=age, education=edu, university=uni,
                languages=langs, physical_score=phys, iq_score=iq,
                service=svc, specialization=spec, stage=stages[i],
                priority=random.choice([True, False])
            )
        self.stdout.write(f'  Created {len(names)} candidates')

    def _create_agents(self):
        if Agent.objects.exists():
            return
        agents_data = [
            ('PHANTOM', 'Arjun Malhotra', 'David Chen', 'Alpha-7', 'HUMINT', 'TOP_SECRET', 'ACTIVE', 'RAW', 'China', ['Hindi', 'English', 'Mandarin', 'Cantonese']),
            ('SHADOW', 'Ravi Krishnan', 'Karim Sheikh', 'Alpha-7', 'COVERT_OPS', 'COSMIC', 'ACTIVE', 'RAW', 'Pakistan', ['Hindi', 'English', 'Urdu', 'Pashto']),
            ('VIPER', 'Neha Saxena', 'Sarah Williams', 'Bravo-3', 'CYBER', 'TOP_SECRET', 'ACTIVE', 'NTRO', 'UAE', ['Hindi', 'English', 'Arabic', 'French']),
            ('COBRA', 'Amit Verma', 'Ahmed Al-Rashid', 'Bravo-3', 'COUNTER_INTEL', 'SECRET', 'ACTIVE', 'IB', 'Iran', ['Hindi', 'English', 'Persian', 'Arabic']),
            ('EAGLE', 'Sanjay Patel', 'Michael Thompson', 'Alpha-7', 'ANALYSIS', 'TOP_SECRET', 'ACTIVE', 'RAW', 'USA', ['Hindi', 'English', 'Russian']),
            ('WOLF', 'Deepa Nair', 'Olga Volkov', 'Charlie-1', 'SIGINT', 'SECRET', 'COMPROMISED', 'DIA', 'Russia', ['Hindi', 'English', 'Russian', 'Ukrainian']),
            ('SPARROW', 'Meera Joshi', 'Li Wei', 'Charlie-1', 'HUMINT', 'TOP_SECRET', 'ACTIVE', 'RAW', 'China', ['Hindi', 'English', 'Mandarin']),
            ('HAWK', 'Raj Kumar', 'Unknown', 'Alpha-7', 'COVERT_OPS', 'COSMIC', 'MIA', 'RAW', 'Afghanistan', ['Hindi', 'English', 'Pashto', 'Dari']),
            ('TIGER', 'Venkat Rao', 'Tariq Mahmood', 'Bravo-3', 'HUMINT', 'TOP_SECRET', 'ACTIVE', 'RAW', 'Pakistan', ['Hindi', 'English', 'Urdu', 'Sindhi']),
            ('LOTUS', 'Kavita Sharma', 'Ayesha Siddiqui', 'Charlie-1', 'ANALYSIS', 'SECRET', 'DORMANT', 'IB', 'Bangladesh', ['Hindi', 'English', 'Bengali', 'Urdu']),
            ('PHOENIX', 'Arun Das', 'Hans Muller', 'Alpha-7', 'CYBER', 'TOP_SECRET', 'ACTIVE', 'NTRO', 'UK', ['Hindi', 'English', 'German', 'French']),
            ('SERPENT', 'Mohit Singh', 'Kenji Tanaka', 'Bravo-3', 'SIGINT', 'CONFIDENTIAL', 'COMPROMISED', 'DIA', 'Turkey', ['Hindi', 'English', 'Turkish', 'Japanese']),
        ]
        skill_sets = [
            {'Combat': 72, 'Intelligence': 95, 'Technology': 60, 'Stealth': 88, 'Languages': 90, 'Endurance': 80, 'Leadership': 75},
            {'Combat': 94, 'Intelligence': 82, 'Technology': 55, 'Stealth': 96, 'Languages': 85, 'Endurance': 92, 'Leadership': 70},
            {'Combat': 58, 'Intelligence': 88, 'Technology': 97, 'Stealth': 72, 'Languages': 78, 'Endurance': 65, 'Leadership': 60},
            {'Combat': 80, 'Intelligence': 90, 'Technology': 70, 'Stealth': 85, 'Languages': 82, 'Endurance': 78, 'Leadership': 68},
            {'Combat': 55, 'Intelligence': 96, 'Technology': 80, 'Stealth': 60, 'Languages': 70, 'Endurance': 50, 'Leadership': 90},
            {'Combat': 65, 'Intelligence': 85, 'Technology': 92, 'Stealth': 70, 'Languages': 88, 'Endurance': 60, 'Leadership': 55},
            {'Combat': 70, 'Intelligence': 92, 'Technology': 65, 'Stealth': 90, 'Languages': 80, 'Endurance': 75, 'Leadership': 72},
            {'Combat': 96, 'Intelligence': 78, 'Technology': 50, 'Stealth': 98, 'Languages': 86, 'Endurance': 95, 'Leadership': 82},
            {'Combat': 85, 'Intelligence': 88, 'Technology': 55, 'Stealth': 92, 'Languages': 90, 'Endurance': 88, 'Leadership': 65},
            {'Combat': 50, 'Intelligence': 94, 'Technology': 75, 'Stealth': 65, 'Languages': 92, 'Endurance': 55, 'Leadership': 80},
            {'Combat': 60, 'Intelligence': 82, 'Technology': 95, 'Stealth': 75, 'Languages': 85, 'Endurance': 62, 'Leadership': 58},
            {'Combat': 68, 'Intelligence': 80, 'Technology': 88, 'Stealth': 70, 'Languages': 78, 'Endurance': 66, 'Leadership': 52},
        ]
        modules = [
            ('Surveillance & Counter-Surveillance', 8, 4), ('Close Quarter Combat', 6, 5), ('Weapons & Explosives', 6, 4),
            ('Cyber Operations', 10, 3), ('Interrogation & Resistance', 4, 5), ('Disguise & Identity', 4, 3),
            ('Language Immersion', 12, 2), ('Covert Communications', 6, 3), ('Parachute & Underwater', 8, 5),
            ('Psychological Warfare', 6, 4),
        ]
        for i, (codename, real, cover, batch, spec, clr, st, div, country, langs) in enumerate(agents_data):
            agent = Agent.objects.create(
                codename=codename, real_name=real, cover_identity=cover,
                batch=batch, specialization=spec, clearance=clr, status=st,
                division=div, skills=skill_sets[i], handler=f'HANDLER-{random.randint(100,999)}',
                deployed_country=country, languages=langs
            )
            for mod_name, weeks, diff in modules:
                score = random.randint(55, 100)
                TrainingRecord.objects.create(
                    agent=agent, module_name=mod_name, duration_weeks=weeks,
                    difficulty=diff, score=score, passed=score >= 65,
                    completed_date=date.today() - timedelta(days=random.randint(30, 365))
                )
            bio = hashlib.sha256(f"{codename}{real}".encode()).hexdigest()[:16]
            AgentID.objects.create(
                agent=agent, id_number=f"IND-{div}-{random.randint(10000,99999)}",
                agency=div, clearance=clr, bio_hash=bio.upper(),
                blood_type=random.choice(['A+', 'B+', 'O+', 'AB+', 'A-', 'O-']),
                expiry=date.today() + timedelta(days=random.randint(180, 730))
            )
        ClearanceRequest.objects.create(agent=Agent.objects.get(codename='COBRA'), current_level='SECRET', requested_level='TOP_SECRET', supervisor='HANDLER-201')
        ClearanceRequest.objects.create(agent=Agent.objects.get(codename='LOTUS'), current_level='SECRET', requested_level='TOP_SECRET', supervisor='HANDLER-305')
        ClearanceRequest.objects.create(agent=Agent.objects.get(codename='SERPENT'), current_level='CONFIDENTIAL', requested_level='SECRET', supervisor='HANDLER-118')
        self.stdout.write(f'  Created {len(agents_data)} agents with training records and IDs')

    def _create_missions(self):
        if Mission.objects.exists():
            return
        missions = [
            ('OP-7734', 'SILENT THUNDER', 'INFILTRATION', 'Islamabad, Pakistan', 5, '30 days', ['HUMINT', 'Stealth', 'Languages'], 'TOP_SECRET'),
            ('OP-8821', 'IRON CURTAIN', 'SURVEILLANCE', 'Aksai Chin, China', 4, '60 days', ['Intelligence', 'Technology', 'Endurance'], 'SECRET'),
            ('OP-5519', 'DESERT STORM', 'INTELLIGENCE', 'Tehran, Iran', 3, '45 days', ['Languages', 'Analysis', 'Stealth'], 'SECRET'),
            ('OP-3301', 'RED SPARROW', 'EXTRACTION', 'Moscow, Russia', 5, '14 days', ['Combat', 'Stealth', 'Languages'], 'COSMIC'),
            ('OP-6642', 'GHOST PROTOCOL', 'SABOTAGE', 'Kahuta, Pakistan', 5, '7 days', ['Combat', 'Technology', 'Stealth'], 'COSMIC'),
            ('OP-9917', 'BLUE HORIZON', 'RECON', 'South China Sea', 2, '90 days', ['Technology', 'Endurance', 'Intelligence'], 'SECRET'),
            ('OP-1105', 'DARK WINTER', 'INTELLIGENCE', 'Kabul, Afghanistan', 4, '30 days', ['HUMINT', 'Languages', 'Combat'], 'TOP_SECRET'),
            ('OP-4478', 'GOLDEN BRIDGE', 'SURVEILLANCE', 'Beijing, China', 3, '120 days', ['Languages', 'Technology', 'Stealth'], 'TOP_SECRET'),
            ('OP-2290', 'SHADOW NET', 'INFILTRATION', 'Dhaka, Bangladesh', 2, '21 days', ['HUMINT', 'Languages', 'Intelligence'], 'CONFIDENTIAL'),
            ('OP-8856', 'CRIMSON TIDE', 'EXTRACTION', 'Istanbul, Turkey', 4, '10 days', ['Combat', 'Stealth', 'Endurance'], 'SECRET'),
        ]
        phantom = Agent.objects.filter(codename='PHANTOM').first()
        shadow = Agent.objects.filter(codename='SHADOW').first()
        tiger = Agent.objects.filter(codename='TIGER').first()

        for i, (mid, name, mtype, loc, risk, dur, skills, cls) in enumerate(missions):
            assigned = None
            st = 'UNASSIGNED'
            if i == 0 and shadow:
                assigned = shadow
                st = 'IN_PROGRESS'
            elif i == 1 and phantom:
                assigned = phantom
                st = 'ASSIGNED'
            elif i == 6 and tiger:
                assigned = tiger
                st = 'IN_PROGRESS'

            mission = Mission.objects.create(
                mission_id=mid, codename=name, type=mtype, location=loc,
                risk_level=risk, duration=dur, required_skills=skills,
                classification=cls, status=st, assigned_agent=assigned,
                briefing=f'Classified briefing for {name}. Objectives and operational parameters enclosed.'
            )
            if assigned:
                Deployment.objects.create(
                    agent=assigned, mission=mission,
                    status='ON_MISSION', days_deployed=random.randint(5, 45)
                )
        self.stdout.write(f'  Created {len(missions)} missions with deployments')

    def _create_comms(self):
        if Thread.objects.exists():
            return
        threads_data = [
            (['HANDLER-201', 'PHANTOM'], 'AES-256-GCM', 'PRIORITY', 'Beijing Station Update'),
            (['HANDLER-305', 'SHADOW'], 'AES-256-GCM', 'CRITIC', 'Islamabad Emergency'),
            (['HANDLER-118', 'VIPER'], 'ChaCha20-Poly1305', 'ROUTINE', 'Dubai Asset Report'),
            (['HANDLER-201', 'EAGLE'], 'AES-256-GCM', 'ROUTINE', 'Washington Intelligence'),
            (['HANDLER-305', 'TIGER'], 'RSA-4096+AES', 'FLASH', 'Karachi Situation'),
            (['HANDLER-118', 'COBRA'], 'AES-256-GCM', 'PRIORITY', 'Tehran Network Status'),
            (['CMD-OPS', 'HANDLER-201', 'HANDLER-305'], 'Quantum-Safe', 'CRITIC', 'Operation SILENT THUNDER'),
            (['HANDLER-201', 'SPARROW'], 'AES-256-GCM', 'ROUTINE', 'Shanghai Cover Check'),
        ]
        conversations = [
            [('HANDLER-201', 'PHANTOM, confirm your position. Awaiting SITREP.'), ('PHANTOM', 'Position confirmed. Cover intact. New intel on PLA 76th Group Army movements. Transmitting encrypted packet.')],
            [('HANDLER-305', 'SHADOW, extraction window opening in 48hrs. Confirm readiness.'), ('SHADOW', 'Negative. Asset meeting scheduled. Cannot break cover. Request 72hr extension.'), ('HANDLER-305', 'Approved. Exercise extreme caution. ISI surveillance increased.')],
            [('HANDLER-118', 'VIPER, monthly check-in. Status?'), ('VIPER', 'All clear. Monitoring UAE-Pakistan financial channels. Suspicious transfers flagged.')],
            [('HANDLER-201', 'EAGLE, new tasking from Delhi. Priority intelligence requirement on congressional briefing.'), ('EAGLE', 'Acknowledged. Will activate source BLUEBIRD.')],
            [('HANDLER-305', 'TIGER, report on Karachi naval base construction.'), ('TIGER', 'New submarine pen construction confirmed. Chinese engineers present. Photos attached via dead drop ORCHID.')],
            [('HANDLER-118', 'COBRA, network status check.'), ('COBRA', 'Three sub-assets active. One went dark 72hrs ago. Investigating.')],
            [('CMD-OPS', 'All handlers: Operation SILENT THUNDER is GO. D-Day confirmed.'), ('HANDLER-201', 'PHANTOM in position.'), ('HANDLER-305', 'SHADOW standing by.')],
            [('HANDLER-201', 'SPARROW, cover verification required per protocol.'), ('SPARROW', 'Cover verified. Teaching position at university confirmed for next semester.')],
        ]
        for i, (participants, enc, priority, subject) in enumerate(threads_data):
            thread = Thread.objects.create(participants=participants, encryption_type=enc, priority=priority, subject=subject)
            for sender, content in conversations[i]:
                encrypted = hashlib.sha256(content.encode()).hexdigest()[:48]
                Message.objects.create(thread=thread, sender=sender, content=content, encrypted_content=encrypted)

        now = timezone.now()
        checkins = [
            ('PHANTOM', now - timedelta(hours=2), now + timedelta(hours=10), 'ON_TIME'),
            ('SHADOW', now - timedelta(hours=18), now - timedelta(hours=6), 'LATE'),
            ('VIPER', now - timedelta(hours=1), now + timedelta(hours=23), 'ON_TIME'),
            ('COBRA', now - timedelta(hours=4), now + timedelta(hours=8), 'ON_TIME'),
            ('EAGLE', now - timedelta(hours=6), now + timedelta(hours=18), 'ON_TIME'),
            ('WOLF', now - timedelta(days=3), now - timedelta(days=2), 'CRITICAL'),
            ('SPARROW', now - timedelta(hours=8), now + timedelta(hours=4), 'ON_TIME'),
            ('HAWK', now - timedelta(days=14), now - timedelta(days=13), 'MISSED'),
            ('TIGER', now - timedelta(hours=3), now + timedelta(hours=9), 'ON_TIME'),
            ('LOTUS', now - timedelta(hours=24), now + timedelta(hours=48), 'ON_TIME'),
            ('PHOENIX', now - timedelta(hours=5), now + timedelta(hours=7), 'ON_TIME'),
        ]
        for codename, last, nxt, st in checkins:
            CheckIn.objects.create(agent_codename=codename, last_checkin=last, next_expected=nxt, status=st)

        drops = [
            ('OASIS', 'Dubai', '25.2048° N, 55.2708° E', 'VIPER', 'SCHEDULED'),
            ('ORCHID', 'Karachi', '24.8607° N, 67.0011° E', 'TIGER', 'COMPLETED'),
            ('BAZAAR', 'Istanbul', '41.0082° N, 28.9784° E', 'SERPENT', 'COMPROMISED'),
            ('SUMMIT', 'Kathmandu', '27.7172° N, 85.3240° E', 'HAWK', 'SCHEDULED'),
            ('PEARL', 'Colombo', '6.9271° N, 79.8612° E', 'LOTUS', 'SCHEDULED'),
            ('GLACIER', 'Moscow', '55.7558° N, 37.6173° E', 'EAGLE', 'COMPLETED'),
        ]
        for name, city, coords, agent, st in drops:
            DeadDrop.objects.create(
                location_codename=name, city=city, coords=coords,
                assigned_agent=agent, status=st,
                next_scheduled=now + timedelta(days=random.randint(3, 30)) if st == 'SCHEDULED' else None
            )

        ExtractionRequest.objects.create(agent_codename='WOLF', location='St. Petersburg, Russia', threat_level=5, reason='Cover blown. FSB surveillance confirmed. Immediate extraction required.')
        ExtractionRequest.objects.create(agent_codename='HAWK', location='Jalalabad, Afghanistan', threat_level=4, reason='Lost contact 14 days ago. Last known position near Taliban territory.')
        self.stdout.write('  Created comms data (threads, messages, check-ins, dead drops, extractions)')

    def _create_files(self):
        if GovFile.objects.exists():
            return
        admin_user = User.objects.filter(role='ADMIN').first()
        files_data = [
            ('China LAC Assessment 2026', 'TOP_SECRET', 'MILITARY', 'Defence Intelligence Agency', 'Comprehensive assessment of Chinese military posture along the Line of Actual Control including force disposition, infrastructure development, and capability analysis.'),
            ('Pakistan Nuclear Doctrine Update', 'COSMIC', 'NUCLEAR', 'Strategic Forces Command', 'Analysis of recent changes in Pakistan nuclear posture, tactical nuclear weapons deployment, and implications for Indian deterrence strategy.'),
            ('Cyber Threat Landscape Q1 2026', 'SECRET', 'CYBER', 'NTRO', 'Quarterly assessment of cyber threats to Indian critical infrastructure with focus on state-sponsored APT groups from China and North Korea.'),
            ('Indian Ocean Region Maritime Survey', 'SECRET', 'MILITARY', 'Naval Intelligence', 'Survey of maritime activities in the Indian Ocean including Chinese naval expansion, submarine deployments, and port access agreements.'),
            ('R&AW Annual Operations Summary', 'COSMIC', 'INTELLIGENCE', 'R&AW HQ', 'Classified summary of all covert operations conducted by R&AW in the past fiscal year including success metrics and lessons learned.'),
            ('Economic Warfare Assessment — China', 'TOP_SECRET', 'ECONOMIC', 'Cabinet Secretariat', 'Assessment of Chinese economic coercion tactics and recommendations for Indian countermeasures in trade and technology sectors.'),
            ('J&K Security Situation Report', 'SECRET', 'INTELLIGENCE', 'Intelligence Bureau', 'Monthly security situation report for Jammu & Kashmir covering cross-border infiltration, terror financing, and radicalisation trends.'),
            ('DRDO Project Status — Classified Programs', 'TOP_SECRET', 'MILITARY', 'DRDO HQ', 'Status update on classified defence research programs including hypersonic vehicles, directed energy weapons, and quantum computing initiatives.'),
            ('Diplomatic Cable — India-Russia Defence Cooperation', 'CONFIDENTIAL', 'DIPLOMATIC', 'Ministry of External Affairs', 'Summary of recent diplomatic exchanges regarding S-400 delivery schedule and joint development of 5th generation fighter aircraft.'),
            ('Signal Intelligence Report — Pakistan Military Communications', 'COSMIC', 'INTELLIGENCE', 'DIA SIGINT Division', 'Intercepted communications analysis revealing Pakistan military contingency plans for potential escalation scenarios along the LoC.'),
        ]
        for title, cls, cat, dept, summary in files_data:
            GovFile.objects.create(title=title, classification=cls, category=cat, department=dept, content_summary=summary, created_by=admin_user)
        self.stdout.write(f'  Created {len(files_data)} government files')
