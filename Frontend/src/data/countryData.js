// Comprehensive geopolitical intelligence data for countries
// This file contains detailed intelligence profiles for major countries worldwide

export const countryData = {
    // EXISTING COUNTRIES (keeping all 7 original entries)
    "China": {
        name: "People's Republic of China", code: "CN", capital: "Beijing", coords: [116.4074, 39.9042],
        population: "1.412B", area: "9.597M km²", gdp: "$17.96T", gdpGrowth: "+5.2%",
        government: "Communist State", leader: "Xi Jinping", leaderTitle: "President & General Secretary",
        threatLevel: "HIGH", threatScore: 78,
        riskFactors: ["Military Expansion", "Cyber Warfare", "Economic Coercion", "Territorial Disputes"],
        military: {
            personnel: "2.0M active", reserves: "510K", budget: "$293B", budgetPercent: "1.7% GDP", nuclear: true, icbm: 350,
            capabilities: ["ICBM", "Aircraft Carriers", "Hypersonic Missiles", "Cyber Warfare", "Space Weapons"]
        },
        economy: {
            growth: "5.2%", unemployment: "5.1%", inflation: "0.2%",
            industries: ["Manufacturing", "Technology", "Export", "Infrastructure"],
            exports: "$3.59T", imports: "$2.56T", tradePartners: ["USA", "EU", "ASEAN", "Japan", "South Korea"], currency: "Yuan (CNY)"
        },
        relations: {
            allies: ["Russia", "Pakistan", "North Korea", "Iran"], partners: ["ASEAN", "African Union", "SCO"],
            tensions: ["India", "Taiwan", "USA", "Japan", "Australia"], status: "Strategic Competitor"
        },
        recentIntel: [
            { date: "2026-02-15", event: "Increased naval activity in South China Sea", priority: "HIGH" },
            { date: "2026-02-12", event: "Belt and Road expansion in 15 African nations", priority: "MEDIUM" },
            { date: "2026-02-08", event: "New semiconductor manufacturing breakthrough", priority: "HIGH" },
            { date: "2026-02-05", event: "Joint military exercises with Russia", priority: "MEDIUM" }
        ],
        strategicAssets: ["Rare Earth Minerals", "Manufacturing Hub", "Tech Innovation", "Belt & Road Initiative"]
    },

    "Pakistan": {
        name: "Islamic Republic of Pakistan", code: "PK", capital: "Islamabad", coords: [73.0479, 33.6844],
        population: "231.4M", area: "881,913 km²", gdp: "$376.5B", gdpGrowth: "+2.1%",
        government: "Federal Parliamentary Republic", leader: "Shehbaz Sharif", leaderTitle: "Prime Minister",
        threatLevel: "CRITICAL", threatScore: 92,
        riskFactors: ["Terrorism", "Nuclear Arsenal", "Border Conflicts", "Political Instability", "Extremism"],
        military: {
            personnel: "654K active", reserves: "550K", budget: "$10.3B", budgetPercent: "4.0% GDP", nuclear: true, icbm: 165,
            capabilities: ["Nuclear Weapons", "Ballistic Missiles", "F-16 Fleet", "Tactical Nukes"]
        },
        economy: {
            growth: "2.1%", unemployment: "6.2%", inflation: "29.2%",
            industries: ["Textiles", "Agriculture", "Services", "Remittances"],
            exports: "$31.8B", imports: "$55.0B", tradePartners: ["China", "USA", "UAE", "UK"], currency: "Pakistani Rupee (PKR)"
        },
        relations: {
            allies: ["China", "Saudi Arabia", "Turkey"], partners: ["OIC", "SCO"],
            tensions: ["India", "Afghanistan", "USA"], status: "Critical Threat"
        },
        recentIntel: [
            { date: "2026-02-16", event: "Cross-border infiltration attempts detected", priority: "CRITICAL" },
            { date: "2026-02-14", event: "ISI operations in Kashmir region", priority: "HIGH" },
            { date: "2026-02-10", event: "Economic crisis deepens, IMF negotiations", priority: "MEDIUM" },
            { date: "2026-02-07", event: "Terrorist training camps identified in PoK", priority: "CRITICAL" }
        ],
        strategicAssets: ["Nuclear Weapons", "CPEC Corridor", "Gwadar Port", "Strategic Location"]
    },

    "India": {
        name: "Republic of India", code: "IN", capital: "New Delhi", coords: [77.2090, 28.6139],
        population: "1.428B", area: "3.287M km²", gdp: "$3.73T", gdpGrowth: "+7.2%",
        government: "Federal Parliamentary Democratic Republic", leader: "Narendra Modi", leaderTitle: "Prime Minister",
        threatLevel: "STRATEGIC_CORE", threatScore: 0, riskFactors: [],
        military: {
            personnel: "1.46M active", reserves: "1.15M", budget: "$81.4B", budgetPercent: "2.4% GDP", nuclear: true, icbm: 160,
            capabilities: ["Nuclear Triad", "Aircraft Carriers", "Ballistic Missiles", "Cyber Defense", "Space Program"]
        },
        economy: {
            growth: "7.2%", unemployment: "3.2%", inflation: "5.1%",
            industries: ["IT Services", "Manufacturing", "Pharmaceuticals", "Agriculture"],
            exports: "$776B", imports: "$854B", tradePartners: ["USA", "UAE", "China", "EU"], currency: "Indian Rupee (INR)"
        },
        relations: {
            allies: ["USA", "Israel", "France", "Japan", "UAE"], partners: ["Quad", "BRICS", "SCO", "G20"],
            tensions: ["Pakistan", "China"], status: "Strategic Partner"
        },
        recentIntel: [
            { date: "2026-02-16", event: "Successful Agni-VI ICBM test", priority: "HIGH" },
            { date: "2026-02-13", event: "New defense agreements with USA and France", priority: "MEDIUM" },
            { date: "2026-02-11", event: "Digital India initiative reaches 1B users", priority: "LOW" },
            { date: "2026-02-09", event: "Border infrastructure development accelerated", priority: "MEDIUM" }
        ],
        strategicAssets: ["IT Hub", "Pharmaceutical Manufacturing", "Space Program", "Democratic Stability"]
    },

    "United States of America": {
        name: "United States of America", code: "US", capital: "Washington D.C.", coords: [-77.0369, 38.9072],
        population: "334.9M", area: "9.834M km²", gdp: "$27.36T", gdpGrowth: "+2.5%",
        government: "Federal Presidential Constitutional Republic", leader: "Joe Biden", leaderTitle: "President",
        threatLevel: "LOW", threatScore: 15, riskFactors: ["Political Polarization", "Debt Levels"],
        military: {
            personnel: "1.39M active", reserves: "800K", budget: "$877B", budgetPercent: "3.5% GDP", nuclear: true, icbm: 5550,
            capabilities: ["Global Reach", "11 Aircraft Carriers", "Stealth Technology", "Cyber Dominance", "Space Force"]
        },
        economy: {
            growth: "2.5%", unemployment: "3.7%", inflation: "3.4%",
            industries: ["Technology", "Finance", "Healthcare", "Defense"],
            exports: "$3.05T", imports: "$3.83T", tradePartners: ["Canada", "Mexico", "China", "EU"], currency: "US Dollar (USD)"
        },
        relations: {
            allies: ["NATO", "Japan", "South Korea", "Australia", "India"], partners: ["Quad", "AUKUS", "Five Eyes"],
            tensions: ["China", "Russia", "Iran", "North Korea"], status: "Strategic Ally"
        },
        recentIntel: [
            { date: "2026-02-15", event: "Indo-Pacific strategy strengthened", priority: "HIGH" },
            { date: "2026-02-12", event: "AI defense systems deployment", priority: "MEDIUM" },
            { date: "2026-02-09", event: "NATO expansion discussions", priority: "MEDIUM" },
            { date: "2026-02-06", event: "Semiconductor manufacturing expansion", priority: "LOW" }
        ],
        strategicAssets: ["Tech Innovation", "Reserve Currency", "Military Supremacy", "Global Alliances"]
    },

    "Russia": {
        name: "Russian Federation", code: "RU", capital: "Moscow", coords: [37.6173, 55.7558],
        population: "144.4M", area: "17.10M km²", gdp: "$2.24T", gdpGrowth: "+1.5%",
        government: "Federal Semi-Presidential Republic", leader: "Vladimir Putin", leaderTitle: "President",
        threatLevel: "LOW", threatScore: 25, riskFactors: ["Regional Conflicts", "Economic Sanctions"],
        military: {
            personnel: "1.15M active", reserves: "2.0M", budget: "$86.4B", budgetPercent: "4.1% GDP", nuclear: true, icbm: 5977,
            capabilities: ["Nuclear Arsenal", "Hypersonic Missiles", "Cyber Warfare", "Arctic Presence"]
        },
        economy: {
            growth: "1.5%", unemployment: "3.3%", inflation: "5.9%",
            industries: ["Energy", "Defense", "Mining", "Agriculture"],
            exports: "$552B", imports: "$345B", tradePartners: ["China", "EU", "India", "Turkey"], currency: "Russian Ruble (RUB)"
        },
        relations: {
            allies: ["China", "Belarus", "Iran", "Syria"], partners: ["BRICS", "SCO", "CSTO"],
            tensions: ["NATO", "Ukraine", "USA", "EU"], status: "Strategic Partner"
        },
        recentIntel: [
            { date: "2026-02-14", event: "Joint military drills with China", priority: "MEDIUM" },
            { date: "2026-02-11", event: "Arctic military base expansion", priority: "MEDIUM" },
            { date: "2026-02-08", event: "Energy deals with India", priority: "LOW" },
            { date: "2026-02-05", event: "New hypersonic missile deployment", priority: "HIGH" }
        ],
        strategicAssets: ["Energy Resources", "Nuclear Arsenal", "Arctic Territory", "Space Technology"]
    },

    "United Kingdom": {
        name: "United Kingdom", code: "GB", capital: "London", coords: [-0.1278, 51.5074],
        population: "67.7M", area: "242,495 km²", gdp: "$3.34T", gdpGrowth: "+0.5%",
        government: "Constitutional Monarchy & Parliamentary Democracy", leader: "Rishi Sunak", leaderTitle: "Prime Minister",
        threatLevel: "LOW", threatScore: 12, riskFactors: ["Economic Uncertainty", "Post-Brexit Adjustments"],
        military: {
            personnel: "153K active", reserves: "37K", budget: "$68.4B", budgetPercent: "2.3% GDP", nuclear: true, icbm: 225,
            capabilities: ["Nuclear Submarines", "Aircraft Carriers", "Special Forces", "Intelligence"]
        },
        economy: {
            growth: "0.5%", unemployment: "3.8%", inflation: "4.0%",
            industries: ["Finance", "Services", "Manufacturing", "Technology"],
            exports: "$886B", imports: "$945B", tradePartners: ["USA", "EU", "China", "India"], currency: "Pound Sterling (GBP)"
        },
        relations: {
            allies: ["USA", "NATO", "Commonwealth", "Five Eyes"], partners: ["AUKUS", "G7", "UN Security Council"],
            tensions: ["Russia"], status: "Strategic Ally"
        },
        recentIntel: [
            { date: "2026-02-13", event: "AUKUS submarine deal progress", priority: "MEDIUM" },
            { date: "2026-02-10", event: "Financial sector reforms announced", priority: "LOW" },
            { date: "2026-02-07", event: "Indo-Pacific tilt strategy update", priority: "MEDIUM" },
            { date: "2026-02-04", event: "AI regulation framework proposed", priority: "LOW" }
        ],
        strategicAssets: ["Financial Hub", "Intelligence Services", "Nuclear Deterrent", "Global Influence"]
    },

    "Japan": {
        name: "Japan", code: "JP", capital: "Tokyo", coords: [139.6917, 35.6895],
        population: "123.3M", area: "377,975 km²", gdp: "$4.41T", gdpGrowth: "+1.9%",
        government: "Constitutional Monarchy & Parliamentary Democracy", leader: "Fumio Kishida", leaderTitle: "Prime Minister",
        threatLevel: "LOW", threatScore: 8, riskFactors: ["Regional Tensions", "Natural Disasters"],
        military: {
            personnel: "247K active", reserves: "56K", budget: "$54.1B", budgetPercent: "1.4% GDP", nuclear: false, icbm: 0,
            capabilities: ["Advanced Navy", "Missile Defense", "F-35 Fleet", "Cyber Defense"]
        },
        economy: {
            growth: "1.9%", unemployment: "2.6%", inflation: "3.3%",
            industries: ["Automotive", "Electronics", "Robotics", "Manufacturing"],
            exports: "$922B", imports: "$1.08T", tradePartners: ["China", "USA", "South Korea", "Taiwan"], currency: "Japanese Yen (JPY)"
        },
        relations: {
            allies: ["USA", "Australia", "India", "South Korea"], partners: ["Quad", "G7", "CPTPP"],
            tensions: ["China", "North Korea", "Russia"], status: "Strategic Ally"
        },
        recentIntel: [
            { date: "2026-02-15", event: "Defense budget increase approved", priority: "MEDIUM" },
            { date: "2026-02-12", event: "Quad summit hosted in Tokyo", priority: "HIGH" },
            { date: "2026-02-09", event: "Semiconductor partnership with USA", priority: "MEDIUM" },
            { date: "2026-02-06", event: "Maritime security patrols increased", priority: "LOW" }
        ],
        strategicAssets: ["Technology Hub", "Strategic Location", "Economic Power", "US Alliance"]
    },

    // NEW COUNTRIES - EUROPE
    "Germany": {
        name: "Federal Republic of Germany", code: "DE", capital: "Berlin", coords: [13.4050, 52.5200],
        population: "83.2M", area: "357,022 km²", gdp: "$4.31T", gdpGrowth: "+0.3%",
        government: "Federal Parliamentary Republic", leader: "Olaf Scholz", leaderTitle: "Chancellor",
        threatLevel: "LOW", threatScore: 10, riskFactors: ["Energy Dependency", "Economic Slowdown"],
        military: {
            personnel: "184K active", reserves: "15K", budget: "$55.8B", budgetPercent: "1.5% GDP", nuclear: false, icbm: 0,
            capabilities: ["NATO Integration", "Leopard Tanks", "Advanced Engineering", "Cyber Defense"]
        },
        economy: {
            growth: "0.3%", unemployment: "3.0%", inflation: "6.1%",
            industries: ["Automotive", "Engineering", "Chemicals", "Technology"],
            exports: "$1.63T", imports: "$1.44T", tradePartners: ["USA", "China", "France", "Netherlands"], currency: "Euro (EUR)"
        },
        relations: {
            allies: ["France", "USA", "NATO", "EU"], partners: ["G7", "UN Security Council"],
            tensions: ["Russia"], status: "Strategic Ally"
        },
        recentIntel: [
            { date: "2026-02-14", event: "Defense spending increase to 2% GDP", priority: "MEDIUM" },
            { date: "2026-02-10", event: "Renewable energy expansion accelerated", priority: "LOW" },
            { date: "2026-02-07", event: "EU leadership on Ukraine support", priority: "MEDIUM" }
        ],
        strategicAssets: ["Industrial Base", "EU Leadership", "Engineering Excellence", "Economic Power"]
    },

    "France": {
        name: "French Republic", code: "FR", capital: "Paris", coords: [2.3522, 48.8566],
        population: "67.8M", area: "643,801 km²", gdp: "$3.05T", gdpGrowth: "+0.7%",
        government: "Semi-Presidential Republic", leader: "Emmanuel Macron", leaderTitle: "President",
        threatLevel: "LOW", threatScore: 11, riskFactors: ["Social Unrest", "Terrorism Threat"],
        military: {
            personnel: "204K active", reserves: "35K", budget: "$53.6B", budgetPercent: "1.9% GDP", nuclear: true, icbm: 290,
            capabilities: ["Nuclear Deterrent", "Aircraft Carrier", "Foreign Legion", "Strategic Autonomy"]
        },
        economy: {
            growth: "0.7%", unemployment: "7.3%", inflation: "5.2%",
            industries: ["Aerospace", "Luxury Goods", "Tourism", "Nuclear Energy"],
            exports: "$582B", imports: "$687B", tradePartners: ["Germany", "USA", "Italy", "Spain"], currency: "Euro (EUR)"
        },
        relations: {
            allies: ["Germany", "USA", "NATO", "India"], partners: ["EU", "G7", "UN Security Council"],
            tensions: ["Russia"], status: "Strategic Ally"
        },
        recentIntel: [
            { date: "2026-02-13", event: "Indo-Pacific strategy deployment", priority: "MEDIUM" },
            { date: "2026-02-09", event: "Nuclear submarine cooperation with India", priority: "HIGH" },
            { date: "2026-02-05", event: "EU defense initiative leadership", priority: "MEDIUM" }
        ],
        strategicAssets: ["Nuclear Capability", "UN Security Council Seat", "Global Military Presence", "Aerospace Industry"]
    },

    "Italy": {
        name: "Italian Republic", code: "IT", capital: "Rome", coords: [12.4964, 41.9028],
        population: "59.1M", area: "301,340 km²", gdp: "$2.19T", gdpGrowth: "+0.9%",
        government: "Parliamentary Republic", leader: "Giorgia Meloni", leaderTitle: "Prime Minister",
        threatLevel: "LOW", threatScore: 14, riskFactors: ["Economic Debt", "Political Instability"],
        military: {
            personnel: "171K active", reserves: "18K", budget: "$33.5B", budgetPercent: "1.5% GDP", nuclear: false, icbm: 0,
            capabilities: ["NATO Member", "Naval Power", "Alpine Troops", "Carabinieri"]
        },
        economy: {
            growth: "0.9%", unemployment: "7.8%", inflation: "5.9%",
            industries: ["Manufacturing", "Tourism", "Fashion", "Automotive"],
            exports: "$626B", imports: "$598B", tradePartners: ["Germany", "France", "USA", "Spain"], currency: "Euro (EUR)"
        },
        relations: {
            allies: ["USA", "France", "Germany", "NATO"], partners: ["EU", "G7"],
            tensions: [], status: "Strategic Ally"
        },
        recentIntel: [
            { date: "2026-02-11", event: "Mediterranean security operations", priority: "LOW" },
            { date: "2026-02-08", event: "Economic recovery measures announced", priority: "LOW" }
        ],
        strategicAssets: ["Mediterranean Position", "NATO Southern Flank", "Cultural Influence", "Manufacturing"]
    },

    "Spain": {
        name: "Kingdom of Spain", code: "ES", capital: "Madrid", coords: [-3.7038, 40.4168],
        population: "47.4M", area: "505,990 km²", gdp: "$1.58T", gdpGrowth: "+2.5%",
        government: "Constitutional Monarchy", leader: "Pedro Sánchez", leaderTitle: "Prime Minister",
        threatLevel: "LOW", threatScore: 9, riskFactors: ["Separatist Movements", "Unemployment"],
        military: {
            personnel: "121K active", reserves: "16K", budget: "$17.2B", budgetPercent: "1.3% GDP", nuclear: false, icbm: 0,
            capabilities: ["NATO Member", "Naval Forces", "Peacekeeping", "Counter-terrorism"]
        },
        economy: {
            growth: "2.5%", unemployment: "12.9%", inflation: "3.3%",
            industries: ["Tourism", "Automotive", "Renewable Energy", "Agriculture"],
            exports: "$419B", imports: "$452B", tradePartners: ["France", "Germany", "Italy", "Portugal"], currency: "Euro (EUR)"
        },
        relations: {
            allies: ["France", "Portugal", "USA", "NATO"], partners: ["EU", "Latin America"],
            tensions: [], status: "Strategic Ally"
        },
        recentIntel: [
            { date: "2026-02-10", event: "Renewable energy targets exceeded", priority: "LOW" },
            { date: "2026-02-06", event: "Tourism sector recovery complete", priority: "LOW" }
        ],
        strategicAssets: ["Strategic Location", "Renewable Energy", "Tourism Industry", "Latin American Ties"]
    },

    // MIDDLE EAST
    "Saudi Arabia": {
        name: "Kingdom of Saudi Arabia", code: "SA", capital: "Riyadh", coords: [46.7382, 24.7136],
        population: "35.9M", area: "2.15M km²", gdp: "$1.11T", gdpGrowth: "+3.7%",
        government: "Absolute Monarchy", leader: "Mohammed bin Salman", leaderTitle: "Crown Prince",
        threatLevel: "MEDIUM", threatScore: 35, riskFactors: ["Regional Tensions", "Oil Dependency", "Yemen Conflict"],
        military: {
            personnel: "227K active", reserves: "0", budget: "$75.0B", budgetPercent: "7.4% GDP", nuclear: false, icbm: 0,
            capabilities: ["Modern Air Force", "US Equipment", "Ballistic Missiles", "Naval Forces"]
        },
        economy: {
            growth: "3.7%", unemployment: "4.8%", inflation: "2.5%",
            industries: ["Oil & Gas", "Petrochemicals", "Construction", "Tourism"],
            exports: "$326B", imports: "$186B", tradePartners: ["China", "India", "Japan", "South Korea"], currency: "Saudi Riyal (SAR)"
        },
        relations: {
            allies: ["USA", "UAE", "Egypt", "Pakistan"], partners: ["GCC", "OIC", "OPEC"],
            tensions: ["Iran", "Yemen"], status: "Strategic Partner"
        },
        recentIntel: [
            { date: "2026-02-15", event: "Vision 2030 diversification progress", priority: "MEDIUM" },
            { date: "2026-02-11", event: "Regional security cooperation enhanced", priority: "MEDIUM" },
            { date: "2026-02-07", event: "Oil production adjustments", priority: "LOW" }
        ],
        strategicAssets: ["Oil Reserves", "Islamic Holy Sites", "Regional Influence", "Sovereign Wealth Fund"]
    },

    "Iran": {
        name: "Islamic Republic of Iran", code: "IR", capital: "Tehran", coords: [51.3890, 35.6892],
        population: "88.5M", area: "1.65M km²", gdp: "$388B", gdpGrowth: "+2.0%",
        government: "Islamic Republic", leader: "Ebrahim Raisi", leaderTitle: "President",
        threatLevel: "HIGH", threatScore: 72, riskFactors: ["Nuclear Program", "Regional Proxy Networks", "Sanctions", "Terrorism Support"],
        military: {
            personnel: "610K active", reserves: "350K", budget: "$24.6B", budgetPercent: "3.8% GDP", nuclear: false, icbm: 0,
            capabilities: ["Ballistic Missiles", "Proxy Forces", "Naval Mines", "Cyber Warfare"]
        },
        economy: {
            growth: "2.0%", unemployment: "9.1%", inflation: "40.0%",
            industries: ["Oil & Gas", "Petrochemicals", "Agriculture", "Manufacturing"],
            exports: "$101B", imports: "$76B", tradePartners: ["China", "UAE", "Turkey", "India"], currency: "Iranian Rial (IRR)"
        },
        relations: {
            allies: ["Russia", "China", "Syria", "Hezbollah"], partners: ["SCO"],
            tensions: ["USA", "Israel", "Saudi Arabia", "UAE"], status: "Adversary"
        },
        recentIntel: [
            { date: "2026-02-16", event: "Nuclear enrichment levels increased", priority: "CRITICAL" },
            { date: "2026-02-13", event: "Proxy activity in Iraq and Syria", priority: "HIGH" },
            { date: "2026-02-09", event: "Drone technology proliferation", priority: "HIGH" }
        ],
        strategicAssets: ["Oil & Gas Reserves", "Strategic Location", "Proxy Networks", "Ballistic Missiles"]
    },

    "Israel": {
        name: "State of Israel", code: "IL", capital: "Jerusalem", coords: [35.2137, 31.7683],
        population: "9.6M", area: "22,072 km²", gdp: "$525B", gdpGrowth: "+2.0%",
        government: "Parliamentary Democracy", leader: "Benjamin Netanyahu", leaderTitle: "Prime Minister",
        threatLevel: "LOW", threatScore: 18, riskFactors: ["Regional Conflicts", "Security Threats"],
        military: {
            personnel: "170K active", reserves: "465K", budget: "$23.4B", budgetPercent: "4.5% GDP", nuclear: true, icbm: 90,
            capabilities: ["Nuclear Arsenal", "Iron Dome", "F-35 Fleet", "Intelligence", "Cyber Warfare"]
        },
        economy: {
            growth: "2.0%", unemployment: "3.4%", inflation: "4.6%",
            industries: ["Technology", "Defense", "Pharmaceuticals", "Agriculture"],
            exports: "$138B", imports: "$119B", tradePartners: ["USA", "China", "India", "UK"], currency: "New Shekel (ILS)"
        },
        relations: {
            allies: ["USA", "India", "UAE", "Bahrain"], partners: ["Abraham Accords"],
            tensions: ["Iran", "Hezbollah", "Hamas"], status: "Strategic Ally"
        },
        recentIntel: [
            { date: "2026-02-14", event: "Abraham Accords expansion talks", priority: "MEDIUM" },
            { date: "2026-02-10", event: "Tech sector innovation surge", priority: "LOW" },
            { date: "2026-02-06", event: "Regional security cooperation", priority: "MEDIUM" }
        ],
        strategicAssets: ["Technology Hub", "Intelligence Capabilities", "Military Innovation", "US Alliance"]
    },

    "Turkey": {
        name: "Republic of Turkey", code: "TR", capital: "Ankara", coords: [32.8597, 39.9334],
        population: "85.3M", area: "783,562 km²", gdp: "$906B", gdpGrowth: "+4.5%",
        government: "Presidential Republic", leader: "Recep Tayyip Erdoğan", leaderTitle: "President",
        threatLevel: "MEDIUM", threatScore: 42, riskFactors: ["Regional Conflicts", "Economic Instability", "Authoritarian Drift"],
        military: {
            personnel: "355K active", reserves: "379K", budget: "$10.6B", budgetPercent: "1.3% GDP", nuclear: false, icbm: 0,
            capabilities: ["NATO Member", "Drone Technology", "Large Army", "Strategic Location"]
        },
        economy: {
            growth: "4.5%", unemployment: "10.4%", inflation: "64.8%",
            industries: ["Manufacturing", "Tourism", "Textiles", "Automotive"],
            exports: "$255B", imports: "$364B", tradePartners: ["Germany", "USA", "UK", "Iraq"], currency: "Turkish Lira (TRY)"
        },
        relations: {
            allies: ["Pakistan", "Azerbaijan", "Qatar"], partners: ["NATO"],
            tensions: ["Greece", "Armenia", "Syria"], status: "Complex Partner"
        },
        recentIntel: [
            { date: "2026-02-12", event: "Drone exports to multiple countries", priority: "MEDIUM" },
            { date: "2026-02-08", event: "Economic stabilization efforts", priority: "MEDIUM" },
            { date: "2026-02-05", event: "Regional mediation role expansion", priority: "LOW" }
        ],
        strategicAssets: ["Strategic Location", "Drone Technology", "NATO Membership", "Regional Influence"]
    },

    // ASIA-PACIFIC
    "South Korea": {
        name: "Republic of Korea", code: "KR", capital: "Seoul", coords: [126.9780, 37.5665],
        population: "51.7M", area: "100,210 km²", gdp: "$1.81T", gdpGrowth: "+2.6%",
        government: "Presidential Republic", leader: "Yoon Suk-yeol", leaderTitle: "President",
        threatLevel: "LOW", threatScore: 16, riskFactors: ["North Korea Threat", "Regional Tensions"],
        military: {
            personnel: "555K active", reserves: "3.1M", budget: "$46.4B", budgetPercent: "2.8% GDP", nuclear: false, icbm: 0,
            capabilities: ["Advanced Military", "Missile Defense", "K2 Tanks", "Naval Forces"]
        },
        economy: {
            growth: "2.6%", unemployment: "2.8%", inflation: "3.6%",
            industries: ["Electronics", "Automotive", "Shipbuilding", "Semiconductors"],
            exports: "$683B", imports: "$731B", tradePartners: ["China", "USA", "Vietnam", "Japan"], currency: "South Korean Won (KRW)"
        },
        relations: {
            allies: ["USA", "Japan", "India", "Australia"], partners: ["Quad Plus"],
            tensions: ["North Korea", "China"], status: "Strategic Ally"
        },
        recentIntel: [
            { date: "2026-02-15", event: "Defense cooperation with USA strengthened", priority: "MEDIUM" },
            { date: "2026-02-11", event: "Semiconductor industry expansion", priority: "MEDIUM" },
            { date: "2026-02-07", event: "North Korea monitoring increased", priority: "HIGH" }
        ],
        strategicAssets: ["Technology Hub", "Semiconductor Manufacturing", "US Alliance", "Economic Power"]
    },

    "Australia": {
        name: "Commonwealth of Australia", code: "AU", capital: "Canberra", coords: [149.1300, -35.2809],
        population: "26.1M", area: "7.69M km²", gdp: "$1.69T", gdpGrowth: "+1.8%",
        government: "Federal Parliamentary Constitutional Monarchy", leader: "Anthony Albanese", leaderTitle: "Prime Minister",
        threatLevel: "LOW", threatScore: 7, riskFactors: ["Regional Security", "Climate Change"],
        military: {
            personnel: "60K active", reserves: "32K", budget: "$32.3B", budgetPercent: "2.1% GDP", nuclear: false, icbm: 0,
            capabilities: ["AUKUS Submarines", "F-35 Fleet", "Naval Forces", "Intelligence"]
        },
        economy: {
            growth: "1.8%", unemployment: "3.7%", inflation: "5.4%",
            industries: ["Mining", "Agriculture", "Services", "Tourism"],
            exports: "$449B", imports: "$330B", tradePartners: ["China", "Japan", "South Korea", "USA"], currency: "Australian Dollar (AUD)"
        },
        relations: {
            allies: ["USA", "UK", "India", "Japan"], partners: ["AUKUS", "Quad", "Five Eyes"],
            tensions: ["China"], status: "Strategic Ally"
        },
        recentIntel: [
            { date: "2026-02-14", event: "AUKUS submarine program progress", priority: "HIGH" },
            { date: "2026-02-10", event: "Indo-Pacific security commitment", priority: "MEDIUM" },
            { date: "2026-02-06", event: "Critical minerals export strategy", priority: "LOW" }
        ],
        strategicAssets: ["Critical Minerals", "Strategic Location", "Five Eyes Intelligence", "AUKUS Partnership"]
    },

    "North Korea": {
        name: "Democratic People's Republic of Korea", code: "KP", capital: "Pyongyang", coords: [125.7625, 39.0392],
        population: "26.0M", area: "120,538 km²", gdp: "$28B", gdpGrowth: "+0.5%",
        government: "Totalitarian Dictatorship", leader: "Kim Jong-un", leaderTitle: "Supreme Leader",
        threatLevel: "CRITICAL", threatScore: 88, riskFactors: ["Nuclear Weapons", "Ballistic Missiles", "Regime Instability", "Human Rights"],
        military: {
            personnel: "1.28M active", reserves: "600K", budget: "$10B", budgetPercent: "24% GDP", nuclear: true, icbm: 60,
            capabilities: ["Nuclear Weapons", "ICBMs", "Chemical Weapons", "Cyber Warfare"]
        },
        economy: {
            growth: "0.5%", unemployment: "25%", inflation: "N/A",
            industries: ["Military", "Mining", "Agriculture", "Textiles"],
            exports: "$222M", imports: "$2.9B", tradePartners: ["China", "Russia"], currency: "North Korean Won (KPW)"
        },
        relations: {
            allies: ["China", "Russia"], partners: [],
            tensions: ["South Korea", "USA", "Japan"], status: "Critical Threat"
        },
        recentIntel: [
            { date: "2026-02-16", event: "ICBM test launch detected", priority: "CRITICAL" },
            { date: "2026-02-13", event: "Nuclear facility activity increased", priority: "CRITICAL" },
            { date: "2026-02-09", event: "Cyber attacks on South Korea", priority: "HIGH" }
        ],
        strategicAssets: ["Nuclear Weapons", "Ballistic Missiles", "Rare Earth Minerals", "Strategic Buffer"]
    },

    "Indonesia": {
        name: "Republic of Indonesia", code: "ID", capital: "Jakarta", coords: [106.8456, -6.2088],
        population: "277.5M", area: "1.91M km²", gdp: "$1.32T", gdpGrowth: "+5.3%",
        government: "Presidential Republic", leader: "Joko Widodo", leaderTitle: "President",
        threatLevel: "LOW", threatScore: 19, riskFactors: ["Terrorism", "Separatism", "Natural Disasters"],
        military: {
            personnel: "400K active", reserves: "400K", budget: "$9.3B", budgetPercent: "0.8% GDP", nuclear: false, icbm: 0,
            capabilities: ["Large Army", "Naval Forces", "Counter-terrorism", "Peacekeeping"]
        },
        economy: {
            growth: "5.3%", unemployment: "5.8%", inflation: "3.7%",
            industries: ["Manufacturing", "Agriculture", "Mining", "Tourism"],
            exports: "$292B", imports: "$237B", tradePartners: ["China", "USA", "Japan", "Singapore"], currency: "Indonesian Rupiah (IDR)"
        },
        relations: {
            allies: ["USA", "Australia", "Singapore"], partners: ["ASEAN", "G20"],
            tensions: [], status: "Strategic Partner"
        },
        recentIntel: [
            { date: "2026-02-12", event: "ASEAN leadership on regional issues", priority: "MEDIUM" },
            { date: "2026-02-08", event: "Infrastructure development surge", priority: "LOW" },
            { date: "2026-02-05", event: "Counter-terrorism operations", priority: "MEDIUM" }
        ],
        strategicAssets: ["Strategic Location", "Large Population", "Natural Resources", "ASEAN Leadership"]
    },

    // AFRICA
    "South Africa": {
        name: "Republic of South Africa", code: "ZA", capital: "Pretoria", coords: [28.1881, -25.7479],
        population: "60.1M", area: "1.22M km²", gdp: "$406B", gdpGrowth: "+0.9%",
        government: "Parliamentary Republic", leader: "Cyril Ramaphosa", leaderTitle: "President",
        threatLevel: "MEDIUM", threatScore: 28, riskFactors: ["Crime", "Corruption", "Energy Crisis", "Unemployment"],
        military: {
            personnel: "73K active", reserves: "15K", budget: "$3.6B", budgetPercent: "1.1% GDP", nuclear: false, icbm: 0,
            capabilities: ["Peacekeeping", "Naval Forces", "Air Force", "Regional Power"]
        },
        economy: {
            growth: "0.9%", unemployment: "32.9%", inflation: "5.9%",
            industries: ["Mining", "Manufacturing", "Finance", "Tourism"],
            exports: "$123B", imports: "$108B", tradePartners: ["China", "USA", "Germany", "India"], currency: "South African Rand (ZAR)"
        },
        relations: {
            allies: ["India", "Brazil", "Russia"], partners: ["BRICS", "African Union", "SADC"],
            tensions: [], status: "Strategic Partner"
        },
        recentIntel: [
            { date: "2026-02-11", event: "Energy crisis mitigation efforts", priority: "MEDIUM" },
            { date: "2026-02-07", event: "BRICS expansion discussions", priority: "LOW" },
            { date: "2026-02-04", event: "Regional peacekeeping deployment", priority: "LOW" }
        ],
        strategicAssets: ["Mineral Resources", "Regional Leadership", "Financial Hub", "BRICS Member"]
    },

    "Egypt": {
        name: "Arab Republic of Egypt", code: "EG", capital: "Cairo", coords: [31.2357, 30.0444],
        population: "106.2M", area: "1.01M km²", gdp: "$476B", gdpGrowth: "+3.8%",
        government: "Presidential Republic", leader: "Abdel Fattah el-Sisi", leaderTitle: "President",
        threatLevel: "MEDIUM", threatScore: 32, riskFactors: ["Terrorism", "Economic Challenges", "Regional Instability"],
        military: {
            personnel: "440K active", reserves: "480K", budget: "$4.5B", budgetPercent: "1.2% GDP", nuclear: false, icbm: 0,
            capabilities: ["Large Army", "F-16 Fleet", "Naval Forces", "Counter-terrorism"]
        },
        economy: {
            growth: "3.8%", unemployment: "7.1%", inflation: "25.8%",
            industries: ["Tourism", "Agriculture", "Natural Gas", "Suez Canal"],
            exports: "$51B", imports: "$89B", tradePartners: ["UAE", "Saudi Arabia", "Turkey", "Italy"], currency: "Egyptian Pound (EGP)"
        },
        relations: {
            allies: ["USA", "Saudi Arabia", "UAE", "France"], partners: ["Arab League", "African Union"],
            tensions: ["Ethiopia"], status: "Strategic Partner"
        },
        recentIntel: [
            { date: "2026-02-13", event: "Suez Canal expansion completed", priority: "MEDIUM" },
            { date: "2026-02-09", event: "Counter-terrorism operations in Sinai", priority: "MEDIUM" },
            { date: "2026-02-06", event: "Economic reform program progress", priority: "LOW" }
        ],
        strategicAssets: ["Suez Canal", "Strategic Location", "Regional Influence", "Large Military"]
    },

    // AMERICAS
    "Canada": {
        name: "Canada", code: "CA", capital: "Ottawa", coords: [-75.6972, 45.4215],
        population: "39.0M", area: "9.98M km²", gdp: "$2.14T", gdpGrowth: "+1.5%",
        government: "Federal Parliamentary Constitutional Monarchy", leader: "Justin Trudeau", leaderTitle: "Prime Minister",
        threatLevel: "LOW", threatScore: 5, riskFactors: ["Arctic Sovereignty", "Economic Dependency"],
        military: {
            personnel: "68K active", reserves: "27K", budget: "$26.5B", budgetPercent: "1.3% GDP", nuclear: false, icbm: 0,
            capabilities: ["NATO Member", "Arctic Operations", "Peacekeeping", "Special Forces"]
        },
        economy: {
            growth: "1.5%", unemployment: "5.0%", inflation: "3.9%",
            industries: ["Energy", "Manufacturing", "Technology", "Natural Resources"],
            exports: "$593B", imports: "$607B", tradePartners: ["USA", "China", "Mexico", "Japan"], currency: "Canadian Dollar (CAD)"
        },
        relations: {
            allies: ["USA", "UK", "France", "NATO"], partners: ["Five Eyes", "G7", "USMCA"],
            tensions: [], status: "Strategic Ally"
        },
        recentIntel: [
            { date: "2026-02-12", event: "Arctic sovereignty operations", priority: "MEDIUM" },
            { date: "2026-02-08", event: "Critical minerals strategy launched", priority: "LOW" },
            { date: "2026-02-05", event: "Defense spending increase planned", priority: "LOW" }
        ],
        strategicAssets: ["Natural Resources", "Arctic Territory", "Five Eyes Member", "US Alliance"]
    },

    "Brazil": {
        name: "Federative Republic of Brazil", code: "BR", capital: "Brasília", coords: [-47.8825, -15.7942],
        population: "215.3M", area: "8.52M km²", gdp: "$2.08T", gdpGrowth: "+2.9%",
        government: "Federal Presidential Republic", leader: "Luiz Inácio Lula da Silva", leaderTitle: "President",
        threatLevel: "LOW", threatScore: 21, riskFactors: ["Crime", "Deforestation", "Political Polarization"],
        military: {
            personnel: "360K active", reserves: "340K", budget: "$19.7B", budgetPercent: "1.1% GDP", nuclear: false, icbm: 0,
            capabilities: ["Large Army", "Aircraft Carrier", "Amazon Operations", "Peacekeeping"]
        },
        economy: {
            growth: "2.9%", unemployment: "8.5%", inflation: "4.6%",
            industries: ["Agriculture", "Mining", "Manufacturing", "Services"],
            exports: "$335B", imports: "$271B", tradePartners: ["China", "USA", "Argentina", "Netherlands"], currency: "Brazilian Real (BRL)"
        },
        relations: {
            allies: ["Argentina", "India", "South Africa"], partners: ["BRICS", "Mercosur", "G20"],
            tensions: [], status: "Strategic Partner"
        },
        recentIntel: [
            { date: "2026-02-10", event: "Amazon protection measures strengthened", priority: "MEDIUM" },
            { date: "2026-02-07", event: "BRICS cooperation expanded", priority: "LOW" },
            { date: "2026-02-04", event: "Agricultural exports surge", priority: "LOW" }
        ],
        strategicAssets: ["Amazon Rainforest", "Agricultural Power", "Natural Resources", "Regional Leadership"]
    },

    "Mexico": {
        name: "United Mexican States", code: "MX", capital: "Mexico City", coords: [-99.1332, 19.4326],
        population: "128.9M", area: "1.96M km²", gdp: "$1.66T", gdpGrowth: "+3.1%",
        government: "Federal Presidential Republic", leader: "Andrés Manuel López Obrador", leaderTitle: "President",
        threatLevel: "MEDIUM", threatScore: 38, riskFactors: ["Drug Cartels", "Organized Crime", "Corruption", "Migration"],
        military: {
            personnel: "277K active", reserves: "82K", budget: "$7.6B", budgetPercent: "0.6% GDP", nuclear: false, icbm: 0,
            capabilities: ["Counter-narcotics", "National Guard", "Naval Forces", "Border Security"]
        },
        economy: {
            growth: "3.1%", unemployment: "2.8%", inflation: "4.7%",
            industries: ["Manufacturing", "Automotive", "Oil & Gas", "Tourism"],
            exports: "$578B", imports: "$605B", tradePartners: ["USA", "China", "Canada", "Germany"], currency: "Mexican Peso (MXN)"
        },
        relations: {
            allies: ["USA", "Canada"], partners: ["USMCA", "Pacific Alliance"],
            tensions: [], status: "Strategic Partner"
        },
        recentIntel: [
            { date: "2026-02-14", event: "Cartel violence in northern states", priority: "HIGH" },
            { date: "2026-02-10", event: "Nearshoring manufacturing boom", priority: "MEDIUM" },
            { date: "2026-02-06", event: "Migration cooperation with USA", priority: "MEDIUM" }
        ],
        strategicAssets: ["Strategic Location", "Manufacturing Hub", "Energy Resources", "US Border"]
    },

    "Argentina": {
        name: "Argentine Republic", code: "AR", capital: "Buenos Aires", coords: [-58.3816, -34.6037],
        population: "45.8M", area: "2.78M km²", gdp: "$641B", gdpGrowth: "-2.5%",
        government: "Federal Presidential Republic", leader: "Javier Milei", leaderTitle: "President",
        threatLevel: "LOW", threatScore: 23, riskFactors: ["Economic Crisis", "Inflation", "Debt"],
        military: {
            personnel: "83K active", reserves: "0", budget: "$2.7B", budgetPercent: "0.7% GDP", nuclear: false, icbm: 0,
            capabilities: ["Naval Forces", "Air Force", "Peacekeeping", "Antarctic Operations"]
        },
        economy: {
            growth: "-2.5%", unemployment: "6.2%", inflation: "211.4%",
            industries: ["Agriculture", "Manufacturing", "Mining", "Services"],
            exports: "$89B", imports: "$82B", tradePartners: ["Brazil", "China", "USA", "Chile"], currency: "Argentine Peso (ARS)"
        },
        relations: {
            allies: ["Brazil", "Chile", "Uruguay"], partners: ["Mercosur", "G20"],
            tensions: [], status: "Partner"
        },
        recentIntel: [
            { date: "2026-02-11", event: "Economic shock therapy initiated", priority: "MEDIUM" },
            { date: "2026-02-07", event: "IMF negotiations ongoing", priority: "MEDIUM" },
            { date: "2026-02-04", event: "Agricultural exports maintained", priority: "LOW" }
        ],
        strategicAssets: ["Agricultural Power", "Lithium Reserves", "Antarctic Presence", "Regional Influence"]
    },

    "Poland": {
        name: "Republic of Poland", code: "PL", capital: "Warsaw", coords: [21.0122, 52.2297],
        population: "38.0M", area: "312,696 km²", gdp: "$688B", gdpGrowth: "+4.9%",
        government: "Parliamentary Republic", leader: "Donald Tusk", leaderTitle: "Prime Minister",
        threatLevel: "LOW", threatScore: 13, riskFactors: ["Border Security", "Migration"],
        military: {
            personnel: "114K active", reserves: "0", budget: "$16.6B", budgetPercent: "2.4% GDP", nuclear: false, icbm: 0,
            capabilities: ["NATO Eastern Flank", "F-35 Acquisition", "Patriot Systems", "Modern Army"]
        },
        economy: {
            growth: "4.9%", unemployment: "2.9%", inflation: "10.9%",
            industries: ["Manufacturing", "IT Services", "Agriculture", "Mining"],
            exports: "$395B", imports: "$371B", tradePartners: ["Germany", "Czech Republic", "UK", "France"], currency: "Polish Zloty (PLN)"
        },
        relations: {
            allies: ["USA", "UK", "Baltic States", "NATO"], partners: ["EU", "Visegrad Group"],
            tensions: ["Russia", "Belarus"], status: "Strategic Ally"
        },
        recentIntel: [
            { date: "2026-02-15", event: "Enhanced NATO presence on eastern border", priority: "HIGH" },
            { date: "2026-02-11", event: "Defense modernization accelerated", priority: "MEDIUM" }
        ],
        strategicAssets: ["NATO Eastern Flank", "EU Member", "Strategic Location", "Growing Economy"]
    },

    "Netherlands": {
        name: "Kingdom of the Netherlands", code: "NL", capital: "Amsterdam", coords: [4.8952, 52.3702],
        population: "17.6M", area: "41,543 km²", gdp: "$1.01T", gdpGrowth: "+1.7%",
        government: "Constitutional Monarchy", leader: "Mark Rutte", leaderTitle: "Prime Minister",
        threatLevel: "LOW", threatScore: 6, riskFactors: ["Cyber Threats", "Climate Change"],
        military: {
            personnel: "36K active", reserves: "3K", budget: "$13.9B", budgetPercent: "1.7% GDP", nuclear: false, icbm: 0,
            capabilities: ["NATO Member", "Naval Forces", "F-35 Fleet", "Special Forces"]
        },
        economy: {
            growth: "1.7%", unemployment: "3.5%", inflation: "4.1%",
            industries: ["Trade", "Agriculture", "Technology", "Chemicals"],
            exports: "$836B", imports: "$752B", tradePartners: ["Germany", "Belgium", "UK", "France"], currency: "Euro (EUR)"
        },
        relations: {
            allies: ["Belgium", "Germany", "USA", "NATO"], partners: ["EU", "Benelux"],
            tensions: [], status: "Strategic Ally"
        },
        recentIntel: [
            { date: "2026-02-12", event: "Port of Rotterdam expansion", priority: "LOW" },
            { date: "2026-02-08", event: "Cyber defense capabilities enhanced", priority: "MEDIUM" }
        ],
        strategicAssets: ["Port of Rotterdam", "Trade Hub", "Agricultural Innovation", "Financial Center"]
    },

    "Sweden": {
        name: "Kingdom of Sweden", code: "SE", capital: "Stockholm", coords: [18.0686, 59.3293],
        population: "10.5M", area: "450,295 km²", gdp: "$593B", gdpGrowth: "+0.8%",
        government: "Constitutional Monarchy", leader: "Ulf Kristersson", leaderTitle: "Prime Minister",
        threatLevel: "LOW", threatScore: 11, riskFactors: ["Russian Proximity", "Hybrid Threats"],
        military: {
            personnel: "24K active", reserves: "31K", budget: "$8.7B", budgetPercent: "1.3% GDP", nuclear: false, icbm: 0,
            capabilities: ["NATO Accession", "Gripen Fighters", "Submarine Forces", "Advanced Technology"]
        },
        economy: {
            growth: "0.8%", unemployment: "7.5%", inflation: "8.5%",
            industries: ["Manufacturing", "Technology", "Forestry", "Mining"],
            exports: "$221B", imports: "$203B", tradePartners: ["Germany", "Norway", "USA", "Denmark"], currency: "Swedish Krona (SEK)"
        },
        relations: {
            allies: ["Finland", "Norway", "USA", "NATO"], partners: ["EU", "Nordic Council"],
            tensions: ["Russia"], status: "Strategic Ally"
        },
        recentIntel: [
            { date: "2026-02-14", event: "NATO membership finalized", priority: "HIGH" },
            { date: "2026-02-09", event: "Defense spending increase approved", priority: "MEDIUM" }
        ],
        strategicAssets: ["Advanced Technology", "Iron Ore", "Strategic Baltic Position", "Innovation Hub"]
    },

    "Norway": {
        name: "Kingdom of Norway", code: "NO", capital: "Oslo", coords: [10.7522, 59.9139],
        population: "5.5M", area: "385,207 km²", gdp: "$579B", gdpGrowth: "+2.3%",
        government: "Constitutional Monarchy", leader: "Jonas Gahr Støre", leaderTitle: "Prime Minister",
        threatLevel: "LOW", threatScore: 9, riskFactors: ["Arctic Security", "Energy Dependency"],
        military: {
            personnel: "23K active", reserves: "40K", budget: "$7.9B", budgetPercent: "1.7% GDP", nuclear: false, icbm: 0,
            capabilities: ["NATO Member", "F-35 Fleet", "Naval Forces", "Arctic Operations"]
        },
        economy: {
            growth: "2.3%", unemployment: "3.2%", inflation: "5.7%",
            industries: ["Oil & Gas", "Shipping", "Fishing", "Technology"],
            exports: "$185B", imports: "$108B", tradePartners: ["UK", "Germany", "Netherlands", "Sweden"], currency: "Norwegian Krone (NOK)"
        },
        relations: {
            allies: ["USA", "UK", "Nordic Countries", "NATO"], partners: ["EU (EEA)", "Nordic Council"],
            tensions: ["Russia"], status: "Strategic Ally"
        },
        recentIntel: [
            { date: "2026-02-13", event: "Arctic defense infrastructure expanded", priority: "MEDIUM" },
            { date: "2026-02-10", event: "Energy exports to EU increased", priority: "LOW" }
        ],
        strategicAssets: ["Oil & Gas Reserves", "Sovereign Wealth Fund", "Arctic Territory", "Strategic Location"]
    },

    "Switzerland": {
        name: "Swiss Confederation", code: "CH", capital: "Bern", coords: [7.4474, 46.9480],
        population: "8.7M", area: "41,285 km²", gdp: "$818B", gdpGrowth: "+0.9%",
        government: "Federal Republic", leader: "Alain Berset", leaderTitle: "President",
        threatLevel: "LOW", threatScore: 4, riskFactors: ["Neutrality Challenges"],
        military: {
            personnel: "21K active", reserves: "120K", budget: "$5.8B", budgetPercent: "0.7% GDP", nuclear: false, icbm: 0,
            capabilities: ["Mountain Warfare", "Air Defense", "Militia System", "Cyber Defense"]
        },
        economy: {
            growth: "0.9%", unemployment: "2.0%", inflation: "2.2%",
            industries: ["Banking", "Pharmaceuticals", "Precision Manufacturing", "Tourism"],
            exports: "$443B", imports: "$348B", tradePartners: ["Germany", "USA", "Italy", "France"], currency: "Swiss Franc (CHF)"
        },
        relations: {
            allies: [], partners: ["EU (Bilateral)", "EFTA"],
            tensions: [], status: "Neutral"
        },
        recentIntel: [
            { date: "2026-02-11", event: "Banking sector reforms announced", priority: "LOW" },
            { date: "2026-02-07", event: "Neutrality policy reaffirmed", priority: "LOW" }
        ],
        strategicAssets: ["Financial Center", "Political Neutrality", "Pharmaceutical Industry", "Precision Manufacturing"]
    },

    "Belgium": {
        name: "Kingdom of Belgium", code: "BE", capital: "Brussels", coords: [4.3517, 50.8503],
        population: "11.6M", area: "30,528 km²", gdp: "$594B", gdpGrowth: "+1.4%",
        government: "Federal Constitutional Monarchy", leader: "Alexander De Croo", leaderTitle: "Prime Minister",
        threatLevel: "LOW", threatScore: 7, riskFactors: ["Terrorism", "Political Fragmentation"],
        military: {
            personnel: "25K active", reserves: "0", budget: "$6.2B", budgetPercent: "1.3% GDP", nuclear: false, icbm: 0,
            capabilities: ["NATO Member", "F-16 Fleet", "Special Forces", "Cyber Defense"]
        },
        economy: {
            growth: "1.4%", unemployment: "5.6%", inflation: "5.5%",
            industries: ["Services", "Chemicals", "Pharmaceuticals", "Automotive"],
            exports: "$474B", imports: "$467B", tradePartners: ["Germany", "France", "Netherlands", "UK"], currency: "Euro (EUR)"
        },
        relations: {
            allies: ["France", "Netherlands", "Germany", "NATO"], partners: ["EU", "Benelux"],
            tensions: [], status: "Strategic Ally"
        },
        recentIntel: [
            { date: "2026-02-12", event: "EU headquarters security enhanced", priority: "MEDIUM" },
            { date: "2026-02-08", event: "Counter-terrorism operations ongoing", priority: "MEDIUM" }
        ],
        strategicAssets: ["EU Capital", "NATO Headquarters", "Port of Antwerp", "Diamond Trade"]
    },

    "Austria": {
        name: "Republic of Austria", code: "AT", capital: "Vienna", coords: [16.3738, 48.2082],
        population: "9.0M", area: "83,879 km²", gdp: "$477B", gdpGrowth: "+0.4%",
        government: "Federal Parliamentary Republic", leader: "Karl Nehammer", leaderTitle: "Chancellor",
        threatLevel: "LOW", threatScore: 5, riskFactors: ["Migration", "Energy Security"],
        military: {
            personnel: "22K active", reserves: "55K", budget: "$3.8B", budgetPercent: "0.8% GDP", nuclear: false, icbm: 0,
            capabilities: ["Mountain Troops", "Peacekeeping", "Air Defense", "Border Security"]
        },
        economy: {
            growth: "0.4%", unemployment: "5.3%", inflation: "7.8%",
            industries: ["Tourism", "Manufacturing", "Services", "Technology"],
            exports: "$204B", imports: "$203B", tradePartners: ["Germany", "Italy", "Switzerland", "Czech Republic"], currency: "Euro (EUR)"
        },
        relations: {
            allies: ["Germany", "Switzerland"], partners: ["EU", "EFTA"],
            tensions: [], status: "Neutral Partner"
        },
        recentIntel: [
            { date: "2026-02-10", event: "Energy diversification strategy announced", priority: "LOW" },
            { date: "2026-02-06", event: "Tourism sector recovery continues", priority: "LOW" }
        ],
        strategicAssets: ["Strategic Location", "Tourism Industry", "Cultural Influence", "Neutrality"]
    },

    "Denmark": {
        name: "Kingdom of Denmark", code: "DK", capital: "Copenhagen", coords: [12.5683, 55.6761],
        population: "5.9M", area: "42,933 km²", gdp: "$406B", gdpGrowth: "+1.8%",
        government: "Constitutional Monarchy", leader: "Mette Frederiksen", leaderTitle: "Prime Minister",
        threatLevel: "LOW", threatScore: 8, riskFactors: ["Arctic Security", "Cyber Threats"],
        military: {
            personnel: "16K active", reserves: "50K", budget: "$5.9B", budgetPercent: "1.4% GDP", nuclear: false, icbm: 0,
            capabilities: ["NATO Member", "F-35 Fleet", "Naval Forces", "Arctic Operations"]
        },
        economy: {
            growth: "1.8%", unemployment: "4.5%", inflation: "3.4%",
            industries: ["Shipping", "Pharmaceuticals", "Renewable Energy", "Agriculture"],
            exports: "$136B", imports: "$128B", tradePartners: ["Germany", "Sweden", "Norway", "USA"], currency: "Danish Krone (DKK)"
        },
        relations: {
            allies: ["USA", "UK", "Nordic Countries", "NATO"], partners: ["EU", "Nordic Council"],
            tensions: [], status: "Strategic Ally"
        },
        recentIntel: [
            { date: "2026-02-14", event: "Greenland defense cooperation expanded", priority: "MEDIUM" },
            { date: "2026-02-09", event: "Renewable energy exports increased", priority: "LOW" }
        ],
        strategicAssets: ["Greenland Territory", "Shipping Industry", "Renewable Energy", "Pharmaceutical Sector"]
    },

    "Finland": {
        name: "Republic of Finland", code: "FI", capital: "Helsinki", coords: [24.9384, 60.1695],
        population: "5.5M", area: "338,424 km²", gdp: "$297B", gdpGrowth: "+0.5%",
        government: "Parliamentary Republic", leader: "Petteri Orpo", leaderTitle: "Prime Minister",
        threatLevel: "LOW", threatScore: 12, riskFactors: ["Russian Border", "Hybrid Threats"],
        military: {
            personnel: "23K active", reserves: "280K", budget: "$6.2B", budgetPercent: "2.0% GDP", nuclear: false, icbm: 0,
            capabilities: ["NATO Member", "F-35 Acquisition", "Artillery", "Reserve System"]
        },
        economy: {
            growth: "0.5%", unemployment: "7.2%", inflation: "6.3%",
            industries: ["Technology", "Forestry", "Manufacturing", "Services"],
            exports: "$89B", imports: "$88B", tradePartners: ["Germany", "Sweden", "USA", "Netherlands"], currency: "Euro (EUR)"
        },
        relations: {
            allies: ["Sweden", "USA", "NATO"], partners: ["EU", "Nordic Council"],
            tensions: ["Russia"], status: "Strategic Ally"
        },
        recentIntel: [
            { date: "2026-02-15", event: "NATO integration accelerated", priority: "HIGH" },
            { date: "2026-02-11", event: "Border security enhanced", priority: "MEDIUM" }
        ],
        strategicAssets: ["NATO Eastern Flank", "Technology Sector", "Strategic Location", "Reserve Forces"]
    },

    "Greece": {
        name: "Hellenic Republic", code: "GR", capital: "Athens", coords: [23.7275, 37.9838],
        population: "10.4M", area: "131,957 km²", gdp: "$239B", gdpGrowth: "+2.0%",
        government: "Parliamentary Republic", leader: "Kyriakos Mitsotakis", leaderTitle: "Prime Minister",
        threatLevel: "MEDIUM", threatScore: 28, riskFactors: ["Turkish Tensions", "Migration", "Debt"],
        military: {
            personnel: "142K active", reserves: "220K", budget: "$7.5B", budgetPercent: "3.1% GDP", nuclear: false, icbm: 0,
            capabilities: ["NATO Member", "F-16 Fleet", "Naval Forces", "Island Defense"]
        },
        economy: {
            growth: "2.0%", unemployment: "11.2%", inflation: "4.2%",
            industries: ["Tourism", "Shipping", "Agriculture", "Services"],
            exports: "$72B", imports: "$93B", tradePartners: ["Italy", "Germany", "Turkey", "Cyprus"], currency: "Euro (EUR)"
        },
        relations: {
            allies: ["USA", "France", "Cyprus", "NATO"], partners: ["EU"],
            tensions: ["Turkey"], status: "Strategic Ally"
        },
        recentIntel: [
            { date: "2026-02-13", event: "Aegean Sea tensions with Turkey", priority: "HIGH" },
            { date: "2026-02-09", event: "Defense modernization program ongoing", priority: "MEDIUM" }
        ],
        strategicAssets: ["Strategic Location", "Shipping Industry", "Tourism", "Naval Bases"]
    },

    "Portugal": {
        name: "Portuguese Republic", code: "PT", capital: "Lisbon", coords: [-9.1393, 38.7223],
        population: "10.3M", area: "92,090 km²", gdp: "$267B", gdpGrowth: "+2.3%",
        government: "Parliamentary Republic", leader: "António Costa", leaderTitle: "Prime Minister",
        threatLevel: "LOW", threatScore: 6, riskFactors: ["Economic Challenges", "Migration"],
        military: {
            personnel: "27K active", reserves: "211K", budget: "$4.2B", budgetPercent: "1.5% GDP", nuclear: false, icbm: 0,
            capabilities: ["NATO Member", "F-16 Fleet", "Naval Forces", "Peacekeeping"]
        },
        economy: {
            growth: "2.3%", unemployment: "6.5%", inflation: "5.3%",
            industries: ["Tourism", "Services", "Manufacturing", "Agriculture"],
            exports: "$99B", imports: "$110B", tradePartners: ["Spain", "France", "Germany", "UK"], currency: "Euro (EUR)"
        },
        relations: {
            allies: ["Spain", "USA", "NATO"], partners: ["EU", "CPLP"],
            tensions: [], status: "Strategic Ally"
        },
        recentIntel: [
            { date: "2026-02-11", event: "Renewable energy expansion", priority: "LOW" },
            { date: "2026-02-07", event: "Tourism sector recovery", priority: "LOW" }
        ],
        strategicAssets: ["Strategic Atlantic Location", "Tourism Industry", "Renewable Energy", "Maritime Heritage"]
    },

    "Vietnam": {
        name: "Socialist Republic of Vietnam", code: "VN", capital: "Hanoi", coords: [105.8342, 21.0285],
        population: "98.2M", area: "331,212 km²", gdp: "$449B", gdpGrowth: "+6.8%",
        government: "Communist State", leader: "Võ Văn Thưởng", leaderTitle: "President",
        threatLevel: "MEDIUM", threatScore: 26, riskFactors: ["South China Sea Disputes", "Political Repression"],
        military: {
            personnel: "482K active", reserves: "5M", budget: "$7.8B", budgetPercent: "2.3% GDP", nuclear: false, icbm: 0,
            capabilities: ["Large Army", "Coastal Defense", "Russian Equipment", "Guerrilla Warfare"]
        },
        economy: {
            growth: "6.8%", unemployment: "2.3%", inflation: "3.2%",
            industries: ["Manufacturing", "Electronics", "Textiles", "Agriculture"],
            exports: "$371B", imports: "$361B", tradePartners: ["China", "USA", "South Korea", "Japan"], currency: "Vietnamese Dong (VND)"
        },
        relations: {
            allies: ["Russia"], partners: ["ASEAN"],
            tensions: ["China"], status: "Partner"
        },
        recentIntel: [
            { date: "2026-02-14", event: "South China Sea patrol increased", priority: "MEDIUM" },
            { date: "2026-02-10", event: "Manufacturing sector expansion", priority: "LOW" }
        ],
        strategicAssets: ["Manufacturing Hub", "Strategic Location", "Young Workforce", "Economic Growth"]
    },

    "Thailand": {
        name: "Kingdom of Thailand", code: "TH", capital: "Bangkok", coords: [100.5018, 13.7563],
        population: "71.8M", area: "513,120 km²", gdp: "$514B", gdpGrowth: "+2.6%",
        government: "Constitutional Monarchy", leader: "Srettha Thavisin", leaderTitle: "Prime Minister",
        threatLevel: "LOW", threatScore: 18, riskFactors: ["Political Instability", "Southern Insurgency"],
        military: {
            personnel: "361K active", reserves: "200K", budget: "$7.6B", budgetPercent: "1.4% GDP", nuclear: false, icbm: 0,
            capabilities: ["F-16 Fleet", "Naval Forces", "Counter-insurgency", "Regional Influence"]
        },
        economy: {
            growth: "2.6%", unemployment: "1.1%", inflation: "2.3%",
            industries: ["Tourism", "Manufacturing", "Agriculture", "Automotive"],
            exports: "$287B", imports: "$270B", tradePartners: ["China", "USA", "Japan", "Malaysia"], currency: "Thai Baht (THB)"
        },
        relations: {
            allies: ["USA"], partners: ["ASEAN"],
            tensions: [], status: "Strategic Partner"
        },
        recentIntel: [
            { date: "2026-02-12", event: "Tourism sector recovery continues", priority: "LOW" },
            { date: "2026-02-08", event: "Southern insurgency operations", priority: "MEDIUM" }
        ],
        strategicAssets: ["Tourism Industry", "Strategic Location", "Manufacturing Base", "Regional Hub"]
    },

    "Singapore": {
        name: "Republic of Singapore", code: "SG", capital: "Singapore", coords: [103.8198, 1.3521],
        population: "5.9M", area: "728 km²", gdp: "$515B", gdpGrowth: "+1.1%",
        government: "Parliamentary Republic", leader: "Lee Hsien Loong", leaderTitle: "Prime Minister",
        threatLevel: "LOW", threatScore: 7, riskFactors: ["Regional Tensions", "Resource Dependency"],
        military: {
            personnel: "72K active", reserves: "312K", budget: "$12.9B", budgetPercent: "3.2% GDP", nuclear: false, icbm: 0,
            capabilities: ["F-35 Fleet", "Advanced Navy", "Cyber Defense", "Regional Power"]
        },
        economy: {
            growth: "1.1%", unemployment: "2.1%", inflation: "4.8%",
            industries: ["Finance", "Technology", "Shipping", "Petrochemicals"],
            exports: "$626B", imports: "$571B", tradePartners: ["China", "Malaysia", "USA", "Hong Kong"], currency: "Singapore Dollar (SGD)"
        },
        relations: {
            allies: ["USA", "Australia", "India"], partners: ["ASEAN", "Five Power Defense"],
            tensions: [], status: "Strategic Ally"
        },
        recentIntel: [
            { date: "2026-02-13", event: "Financial hub status strengthened", priority: "LOW" },
            { date: "2026-02-09", event: "Defense technology innovation", priority: "MEDIUM" }
        ],
        strategicAssets: ["Financial Hub", "Strategic Port", "Technology Innovation", "Regional Stability"]
    },

    "Malaysia": {
        name: "Malaysia", code: "MY", capital: "Kuala Lumpur", coords: [101.6869, 3.1390],
        population: "33.9M", area: "330,803 km²", gdp: "$407B", gdpGrowth: "+4.2%",
        government: "Federal Constitutional Monarchy", leader: "Anwar Ibrahim", leaderTitle: "Prime Minister",
        threatLevel: "LOW", threatScore: 14, riskFactors: ["South China Sea Disputes", "Ethnic Tensions"],
        military: {
            personnel: "113K active", reserves: "51K", budget: "$3.9B", budgetPercent: "1.1% GDP", nuclear: false, icbm: 0,
            capabilities: ["Naval Forces", "Air Force", "Counter-terrorism", "Peacekeeping"]
        },
        economy: {
            growth: "4.2%", unemployment: "3.5%", inflation: "2.5%",
            industries: ["Electronics", "Palm Oil", "Petroleum", "Tourism"],
            exports: "$311B", imports: "$283B", tradePartners: ["China", "Singapore", "USA", "Japan"], currency: "Malaysian Ringgit (MYR)"
        },
        relations: {
            allies: ["Singapore", "Indonesia", "Australia"], partners: ["ASEAN", "Commonwealth"],
            tensions: ["China"], status: "Strategic Partner"
        },
        recentIntel: [
            { date: "2026-02-12", event: "Economic diversification progress", priority: "LOW" },
            { date: "2026-02-08", event: "ASEAN chairmanship preparations", priority: "LOW" }
        ],
        strategicAssets: ["Palm Oil Production", "Strategic Waterways", "Natural Resources", "Regional Stability"]
    },

    "Philippines": {
        name: "Republic of the Philippines", code: "PH", capital: "Manila", coords: [120.9842, 14.5995],
        population: "115.6M", area: "300,000 km²", gdp: "$440B", gdpGrowth: "+5.5%",
        government: "Presidential Republic", leader: "Ferdinand Marcos Jr.", leaderTitle: "President",
        threatLevel: "MEDIUM", threatScore: 31, riskFactors: ["South China Sea Disputes", "Terrorism", "Natural Disasters"],
        military: {
            personnel: "143K active", reserves: "131K", budget: "$4.3B", budgetPercent: "1.1% GDP", nuclear: false, icbm: 0,
            capabilities: ["US Alliance", "Naval Modernization", "Counter-terrorism", "Island Defense"]
        },
        economy: {
            growth: "5.5%", unemployment: "4.5%", inflation: "6.0%",
            industries: ["Services", "Manufacturing", "Agriculture", "BPO"],
            exports: "$79B", imports: "$131B", tradePartners: ["China", "USA", "Japan", "Hong Kong"], currency: "Philippine Peso (PHP)"
        },
        relations: {
            allies: ["USA", "Japan", "Australia"], partners: ["ASEAN"],
            tensions: ["China"], status: "Strategic Ally"
        },
        recentIntel: [
            { date: "2026-02-15", event: "Enhanced US defense cooperation", priority: "HIGH" },
            { date: "2026-02-11", event: "South China Sea tensions escalate", priority: "HIGH" }
        ],
        strategicAssets: ["Strategic Location", "US Alliance", "Young Population", "BPO Industry"]
    },

    "Bangladesh": {
        name: "People's Republic of Bangladesh", code: "BD", capital: "Dhaka", coords: [90.4125, 23.8103],
        population: "171.2M", area: "148,460 km²", gdp: "$460B", gdpGrowth: "+6.0%",
        government: "Parliamentary Republic", leader: "Sheikh Hasina", leaderTitle: "Prime Minister",
        threatLevel: "MEDIUM", threatScore: 35, riskFactors: ["Political Instability", "Climate Change", "Rohingya Crisis"],
        military: {
            personnel: "163K active", reserves: "0", budget: "$4.8B", budgetPercent: "1.3% GDP", nuclear: false, icbm: 0,
            capabilities: ["Large Army", "Peacekeeping", "Counter-terrorism", "Border Security"]
        },
        economy: {
            growth: "6.0%", unemployment: "5.2%", inflation: "7.7%",
            industries: ["Textiles", "Garments", "Agriculture", "Pharmaceuticals"],
            exports: "$52B", imports: "$82B", tradePartners: ["USA", "Germany", "UK", "India"], currency: "Bangladeshi Taka (BDT)"
        },
        relations: {
            allies: ["India"], partners: ["SAARC", "Commonwealth"],
            tensions: ["Myanmar"], status: "Partner"
        },
        recentIntel: [
            { date: "2026-02-13", event: "Rohingya refugee crisis ongoing", priority: "MEDIUM" },
            { date: "2026-02-09", event: "Garment industry expansion", priority: "LOW" }
        ],
        strategicAssets: ["Garment Industry", "Strategic Location", "Large Workforce", "Economic Growth"]
    },

    "Myanmar": {
        name: "Republic of the Union of Myanmar", code: "MM", capital: "Naypyidaw", coords: [96.1951, 19.7633],
        population: "54.8M", area: "676,578 km²", gdp: "$65B", gdpGrowth: "-18.4%",
        government: "Military Junta", leader: "Min Aung Hlaing", leaderTitle: "Chairman",
        threatLevel: "HIGH", threatScore: 72, riskFactors: ["Civil War", "Military Coup", "Ethnic Conflicts", "Human Rights"],
        military: {
            personnel: "406K active", reserves: "0", budget: "$2.4B", budgetPercent: "3.7% GDP", nuclear: false, icbm: 0,
            capabilities: ["Large Army", "Counter-insurgency", "Chinese Equipment", "Internal Security"]
        },
        economy: {
            growth: "-18.4%", unemployment: "1.7%", inflation: "8.8%",
            industries: ["Agriculture", "Natural Gas", "Mining", "Textiles"],
            exports: "$17B", imports: "$18B", tradePartners: ["China", "Thailand", "Singapore", "India"], currency: "Myanmar Kyat (MMK)"
        },
        relations: {
            allies: ["China", "Russia"], partners: ["ASEAN"],
            tensions: ["Western Nations", "Bangladesh"], status: "Adversary"
        },
        recentIntel: [
            { date: "2026-02-16", event: "Civil war intensifies", priority: "CRITICAL" },
            { date: "2026-02-12", event: "International sanctions expanded", priority: "HIGH" }
        ],
        strategicAssets: ["Natural Resources", "Strategic Location", "Natural Gas", "Rare Earth Minerals"]
    },

    "UAE": {
        name: "United Arab Emirates", code: "AE", capital: "Abu Dhabi", coords: [54.3773, 24.4539],
        population: "9.9M", area: "83,600 km²", gdp: "$507B", gdpGrowth: "+3.4%",
        government: "Federal Absolute Monarchy", leader: "Mohamed bin Zayed", leaderTitle: "President",
        threatLevel: "LOW", threatScore: 16, riskFactors: ["Regional Tensions", "Yemen Conflict"],
        military: {
            personnel: "63K active", reserves: "0", budget: "$23.1B", budgetPercent: "5.6% GDP", nuclear: false, icbm: 0,
            capabilities: ["F-35 Acquisition", "Advanced Air Force", "Naval Forces", "Modern Equipment"]
        },
        economy: {
            growth: "3.4%", unemployment: "2.8%", inflation: "4.8%",
            industries: ["Oil & Gas", "Tourism", "Finance", "Real Estate"],
            exports: "$359B", imports: "$246B", tradePartners: ["India", "China", "Saudi Arabia", "USA"], currency: "UAE Dirham (AED)"
        },
        relations: {
            allies: ["Saudi Arabia", "USA", "Israel"], partners: ["GCC", "Arab League"],
            tensions: ["Iran"], status: "Strategic Ally"
        },
        recentIntel: [
            { date: "2026-02-14", event: "Abraham Accords expansion", priority: "MEDIUM" },
            { date: "2026-02-10", event: "Economic diversification progress", priority: "LOW" }
        ],
        strategicAssets: ["Oil Reserves", "Financial Hub", "Strategic Location", "Modern Infrastructure"]
    },

    "Qatar": {
        name: "State of Qatar", code: "QA", capital: "Doha", coords: [51.5310, 25.2854],
        population: "2.9M", area: "11,586 km²", gdp: "$237B", gdpGrowth: "+2.4%",
        government: "Absolute Monarchy", leader: "Tamim bin Hamad Al Thani", leaderTitle: "Emir",
        threatLevel: "LOW", threatScore: 19, riskFactors: ["Regional Isolation", "Blockade History"],
        military: {
            personnel: "12K active", reserves: "0", budget: "$15.4B", budgetPercent: "4.0% GDP", nuclear: false, icbm: 0,
            capabilities: ["F-15 Fleet", "Advanced Air Defense", "US Base", "Modern Equipment"]
        },
        economy: {
            growth: "2.4%", unemployment: "0.1%", inflation: "5.0%",
            industries: ["Natural Gas", "Petrochemicals", "Finance", "Construction"],
            exports: "$113B", imports: "$31B", tradePartners: ["China", "India", "Japan", "South Korea"], currency: "Qatari Riyal (QAR)"
        },
        relations: {
            allies: ["Turkey", "USA"], partners: ["GCC", "Arab League"],
            tensions: ["Saudi Arabia (historical)"], status: "Strategic Partner"
        },
        recentIntel: [
            { date: "2026-02-12", event: "LNG exports expansion", priority: "LOW" },
            { date: "2026-02-08", event: "Regional diplomacy efforts", priority: "MEDIUM" }
        ],
        strategicAssets: ["Natural Gas Reserves", "Al Udeid Air Base", "Sovereign Wealth Fund", "Media Influence"]
    },

    "Iraq": {
        name: "Republic of Iraq", code: "IQ", capital: "Baghdad", coords: [44.3661, 33.3152],
        population: "43.5M", area: "438,317 km²", gdp: "$264B", gdpGrowth: "+4.0%",
        government: "Federal Parliamentary Republic", leader: "Mohammed Shia al-Sudani", leaderTitle: "Prime Minister",
        threatLevel: "HIGH", threatScore: 68, riskFactors: ["Terrorism", "Political Instability", "Sectarian Violence", "Iranian Influence"],
        military: {
            personnel: "193K active", reserves: "0", budget: "$6.5B", budgetPercent: "3.5% GDP", nuclear: false, icbm: 0,
            capabilities: ["Counter-terrorism", "US Training", "Iranian Influence", "Militia Groups"]
        },
        economy: {
            growth: "4.0%", unemployment: "16.5%", inflation: "5.0%",
            industries: ["Oil & Gas", "Agriculture", "Construction", "Services"],
            exports: "$108B", imports: "$56B", tradePartners: ["China", "India", "USA", "Turkey"], currency: "Iraqi Dinar (IQD)"
        },
        relations: {
            allies: ["Iran"], partners: ["Arab League"],
            tensions: ["ISIS remnants", "Turkey"], status: "Complex Partner"
        },
        recentIntel: [
            { date: "2026-02-15", event: "ISIS resurgence concerns", priority: "HIGH" },
            { date: "2026-02-11", event: "Iranian militia activity", priority: "HIGH" }
        ],
        strategicAssets: ["Oil Reserves", "Strategic Location", "Shia Influence", "Reconstruction Potential"]
    },

    "Jordan": {
        name: "Hashemite Kingdom of Jordan", code: "JO", capital: "Amman", coords: [35.9106, 31.9454],
        population: "11.1M", area: "89,342 km²", gdp: "$50B", gdpGrowth: "+2.4%",
        government: "Constitutional Monarchy", leader: "Abdullah II", leaderTitle: "King",
        threatLevel: "MEDIUM", threatScore: 32, riskFactors: ["Refugee Crisis", "Regional Instability", "Water Scarcity"],
        military: {
            personnel: "100K active", reserves: "65K", budget: "$2.5B", budgetPercent: "4.7% GDP", nuclear: false, icbm: 0,
            capabilities: ["Special Forces", "US Alliance", "Counter-terrorism", "Border Security"]
        },
        economy: {
            growth: "2.4%", unemployment: "22.6%", inflation: "4.2%",
            industries: ["Services", "Tourism", "Pharmaceuticals", "Mining"],
            exports: "$11B", imports: "$22B", tradePartners: ["USA", "Saudi Arabia", "India", "China"], currency: "Jordanian Dinar (JOD)"
        },
        relations: {
            allies: ["USA", "Saudi Arabia", "UAE"], partners: ["Arab League"],
            tensions: [], status: "Strategic Ally"
        },
        recentIntel: [
            { date: "2026-02-13", event: "Syrian refugee support ongoing", priority: "MEDIUM" },
            { date: "2026-02-09", event: "Economic reforms implemented", priority: "LOW" }
        ],
        strategicAssets: ["Strategic Location", "Stability", "US Alliance", "Regional Mediator"]
    },

    "Nigeria": {
        name: "Federal Republic of Nigeria", code: "NG", capital: "Abuja", coords: [7.4951, 9.0765],
        population: "223.8M", area: "923,768 km²", gdp: "$574B", gdpGrowth: "+2.9%",
        government: "Federal Presidential Republic", leader: "Bola Tinubu", leaderTitle: "President",
        threatLevel: "HIGH", threatScore: 71, riskFactors: ["Terrorism", "Boko Haram", "Corruption", "Ethnic Violence"],
        military: {
            personnel: "143K active", reserves: "0", budget: "$3.1B", budgetPercent: "0.6% GDP", nuclear: false, icbm: 0,
            capabilities: ["Large Army", "Counter-terrorism", "Peacekeeping", "Regional Power"]
        },
        economy: {
            growth: "2.9%", unemployment: "33.3%", inflation: "21.8%",
            industries: ["Oil & Gas", "Agriculture", "Services", "Telecommunications"],
            exports: "$62B", imports: "$66B", tradePartners: ["India", "Spain", "USA", "France"], currency: "Nigerian Naira (NGN)"
        },
        relations: {
            allies: ["USA", "UK"], partners: ["ECOWAS", "African Union", "Commonwealth"],
            tensions: ["Terrorist Groups"], status: "Strategic Partner"
        },
        recentIntel: [
            { date: "2026-02-16", event: "Boko Haram attacks continue", priority: "CRITICAL" },
            { date: "2026-02-12", event: "Oil production challenges", priority: "MEDIUM" }
        ],
        strategicAssets: ["Oil Reserves", "Largest African Economy", "Population", "Regional Influence"]
    },

    "Kenya": {
        name: "Republic of Kenya", code: "KE", capital: "Nairobi", coords: [36.8219, -1.2921],
        population: "54.0M", area: "580,367 km²", gdp: "$118B", gdpGrowth: "+5.3%",
        government: "Presidential Republic", leader: "William Ruto", leaderTitle: "President",
        threatLevel: "MEDIUM", threatScore: 38, riskFactors: ["Terrorism", "Al-Shabaab", "Political Violence"],
        military: {
            personnel: "24K active", reserves: "0", budget: "$1.1B", budgetPercent: "1.2% GDP", nuclear: false, icbm: 0,
            capabilities: ["Counter-terrorism", "Peacekeeping", "Regional Operations", "AMISOM"]
        },
        economy: {
            growth: "5.3%", unemployment: "5.7%", inflation: "7.7%",
            industries: ["Agriculture", "Tourism", "Services", "Technology"],
            exports: "$7B", imports: "$21B", tradePartners: ["Uganda", "USA", "Netherlands", "Pakistan"], currency: "Kenyan Shilling (KES)"
        },
        relations: {
            allies: ["USA", "UK"], partners: ["East African Community", "African Union", "Commonwealth"],
            tensions: ["Al-Shabaab", "Somalia"], status: "Strategic Partner"
        },
        recentIntel: [
            { date: "2026-02-14", event: "Al-Shabaab border incidents", priority: "HIGH" },
            { date: "2026-02-10", event: "Tech hub expansion in Nairobi", priority: "LOW" }
        ],
        strategicAssets: ["Regional Hub", "Technology Sector", "Tourism", "Strategic Location"]
    },

    "Ethiopia": {
        name: "Federal Democratic Republic of Ethiopia", code: "ET", capital: "Addis Ababa", coords: [38.7578, 9.0320],
        population: "123.4M", area: "1,104,300 km²", gdp: "$156B", gdpGrowth: "+6.4%",
        government: "Federal Parliamentary Republic", leader: "Abiy Ahmed", leaderTitle: "Prime Minister",
        threatLevel: "HIGH", threatScore: 65, riskFactors: ["Civil War", "Tigray Conflict", "Ethnic Violence", "Famine"],
        military: {
            personnel: "162K active", reserves: "0", budget: "$1.1B", budgetPercent: "0.7% GDP", nuclear: false, icbm: 0,
            capabilities: ["Large Army", "Counter-insurgency", "Regional Power", "Peacekeeping"]
        },
        economy: {
            growth: "6.4%", unemployment: "3.8%", inflation: "28.2%",
            industries: ["Agriculture", "Manufacturing", "Services", "Coffee"],
            exports: "$7B", imports: "$19B", tradePartners: ["China", "USA", "Germany", "Saudi Arabia"], currency: "Ethiopian Birr (ETB)"
        },
        relations: {
            allies: ["China"], partners: ["African Union"],
            tensions: ["Tigray Forces", "Egypt"], status: "Complex Partner"
        },
        recentIntel: [
            { date: "2026-02-15", event: "Tigray peace process fragile", priority: "HIGH" },
            { date: "2026-02-11", event: "GERD dam operations continue", priority: "MEDIUM" }
        ],
        strategicAssets: ["Strategic Location", "AU Headquarters", "Coffee Production", "Nile River"]
    },

    "Morocco": {
        name: "Kingdom of Morocco", code: "MA", capital: "Rabat", coords: [-6.8498, 33.9716],
        population: "37.5M", area: "446,550 km²", gdp: "$142B", gdpGrowth: "+3.1%",
        government: "Constitutional Monarchy", leader: "Mohammed VI", leaderTitle: "King",
        threatLevel: "LOW", threatScore: 21, riskFactors: ["Western Sahara Dispute", "Migration"],
        military: {
            personnel: "196K active", reserves: "150K", budget: "$5.4B", budgetPercent: "3.4% GDP", nuclear: false, icbm: 0,
            capabilities: ["F-16 Fleet", "Modern Army", "Counter-terrorism", "Peacekeeping"]
        },
        economy: {
            growth: "3.1%", unemployment: "11.5%", inflation: "6.6%",
            industries: ["Tourism", "Agriculture", "Phosphates", "Textiles"],
            exports: "$39B", imports: "$61B", tradePartners: ["Spain", "France", "India", "Italy"], currency: "Moroccan Dirham (MAD)"
        },
        relations: {
            allies: ["USA", "France", "Saudi Arabia"], partners: ["Arab League", "African Union"],
            tensions: ["Algeria", "Polisario Front"], status: "Strategic Ally"
        },
        recentIntel: [
            { date: "2026-02-12", event: "Western Sahara normalization progress", priority: "MEDIUM" },
            { date: "2026-02-08", event: "Tourism sector recovery", priority: "LOW" }
        ],
        strategicAssets: ["Strategic Location", "Phosphate Reserves", "Tourism", "Stability"]
    },

    "Algeria": {
        name: "People's Democratic Republic of Algeria", code: "DZ", capital: "Algiers", coords: [3.0588, 36.7538],
        population: "45.6M", area: "2,381,741 km²", gdp: "$195B", gdpGrowth: "+3.2%",
        government: "Presidential Republic", leader: "Abdelmadjid Tebboune", leaderTitle: "President",
        threatLevel: "MEDIUM", threatScore: 29, riskFactors: ["Terrorism", "Political Instability", "Economic Challenges"],
        military: {
            personnel: "130K active", reserves: "150K", budget: "$13.9B", budgetPercent: "6.0% GDP", nuclear: false, icbm: 0,
            capabilities: ["Russian Equipment", "Large Army", "Counter-terrorism", "Regional Power"]
        },
        economy: {
            growth: "3.2%", unemployment: "12.7%", inflation: "9.3%",
            industries: ["Oil & Gas", "Mining", "Agriculture", "Construction"],
            exports: "$55B", imports: "$42B", tradePartners: ["Italy", "France", "Spain", "USA"], currency: "Algerian Dinar (DZD)"
        },
        relations: {
            allies: ["Russia"], partners: ["Arab League", "African Union"],
            tensions: ["Morocco", "France"], status: "Partner"
        },
        recentIntel: [
            { date: "2026-02-13", event: "Energy exports to Europe increased", priority: "MEDIUM" },
            { date: "2026-02-09", event: "Border security operations", priority: "LOW" }
        ],
        strategicAssets: ["Oil & Gas Reserves", "Strategic Location", "Largest African Country", "Regional Influence"]
    },

    "Chile": {
        name: "Republic of Chile", code: "CL", capital: "Santiago", coords: [-70.6693, -33.4489],
        population: "19.6M", area: "756,102 km²", gdp: "$344B", gdpGrowth: "+2.4%",
        government: "Presidential Republic", leader: "Gabriel Boric", leaderTitle: "President",
        threatLevel: "LOW", threatScore: 11, riskFactors: ["Social Unrest", "Economic Inequality"],
        military: {
            personnel: "77K active", reserves: "40K", budget: "$6.1B", budgetPercent: "1.9% GDP", nuclear: false, icbm: 0,
            capabilities: ["F-16 Fleet", "Naval Forces", "Mountain Warfare", "Peacekeeping"]
        },
        economy: {
            growth: "2.4%", unemployment: "8.7%", inflation: "7.6%",
            industries: ["Mining", "Agriculture", "Services", "Wine"],
            exports: "$101B", imports: "$94B", tradePartners: ["China", "USA", "Japan", "South Korea"], currency: "Chilean Peso (CLP)"
        },
        relations: {
            allies: ["USA", "Argentina", "Peru"], partners: ["Pacific Alliance", "APEC"],
            tensions: [], status: "Strategic Partner"
        },
        recentIntel: [
            { date: "2026-02-11", event: "Lithium mining expansion", priority: "MEDIUM" },
            { date: "2026-02-07", event: "Constitutional reform process", priority: "LOW" }
        ],
        strategicAssets: ["Copper Reserves", "Lithium Deposits", "Strategic Pacific Location", "Stability"]
    },

    "Colombia": {
        name: "Republic of Colombia", code: "CO", capital: "Bogotá", coords: [-74.0721, 4.7110],
        population: "51.9M", area: "1,141,748 km²", gdp: "$363B", gdpGrowth: "+1.2%",
        government: "Presidential Republic", leader: "Gustavo Petro", leaderTitle: "President",
        threatLevel: "MEDIUM", threatScore: 42, riskFactors: ["Drug Trafficking", "FARC Remnants", "Violence"],
        military: {
            personnel: "293K active", reserves: "35K", budget: "$10.6B", budgetPercent: "3.2% GDP", nuclear: false, icbm: 0,
            capabilities: ["Counter-narcotics", "Counter-insurgency", "US Training", "Special Forces"]
        },
        economy: {
            growth: "1.2%", unemployment: "10.7%", inflation: "11.8%",
            industries: ["Oil & Gas", "Coffee", "Mining", "Manufacturing"],
            exports: "$58B", imports: "$74B", tradePartners: ["USA", "China", "Panama", "Brazil"], currency: "Colombian Peso (COP)"
        },
        relations: {
            allies: ["USA"], partners: ["Pacific Alliance", "OAS"],
            tensions: ["Venezuela", "Drug Cartels"], status: "Strategic Ally"
        },
        recentIntel: [
            { date: "2026-02-14", event: "Peace process with ELN ongoing", priority: "MEDIUM" },
            { date: "2026-02-10", event: "Drug trafficking operations", priority: "HIGH" }
        ],
        strategicAssets: ["Oil Reserves", "Coffee Production", "Strategic Location", "Biodiversity"]
    },

    "Peru": {
        name: "Republic of Peru", code: "PE", capital: "Lima", coords: [-77.0428, -12.0464],
        population: "34.0M", area: "1,285,216 km²", gdp: "$268B", gdpGrowth: "+2.7%",
        government: "Presidential Republic", leader: "Dina Boluarte", leaderTitle: "President",
        threatLevel: "MEDIUM", threatScore: 27, riskFactors: ["Political Instability", "Protests", "Corruption"],
        military: {
            personnel: "81K active", reserves: "188K", budget: "$2.9B", budgetPercent: "1.2% GDP", nuclear: false, icbm: 0,
            capabilities: ["Counter-narcotics", "Mountain Warfare", "Naval Forces", "Peacekeeping"]
        },
        economy: {
            growth: "2.7%", unemployment: "7.2%", inflation: "8.5%",
            industries: ["Mining", "Agriculture", "Fishing", "Tourism"],
            exports: "$63B", imports: "$55B", tradePartners: ["China", "USA", "South Korea", "India"], currency: "Peruvian Sol (PEN)"
        },
        relations: {
            allies: ["USA", "Chile"], partners: ["Pacific Alliance", "APEC"],
            tensions: [], status: "Strategic Partner"
        },
        recentIntel: [
            { date: "2026-02-13", event: "Political protests continue", priority: "MEDIUM" },
            { date: "2026-02-09", event: "Mining sector expansion", priority: "LOW" }
        ],
        strategicAssets: ["Mineral Reserves", "Copper Production", "Tourism", "Strategic Location"]
    },

    "Venezuela": {
        name: "Bolivarian Republic of Venezuela", code: "VE", capital: "Caracas", coords: [-66.9036, 10.4806],
        population: "28.2M", area: "916,445 km²", gdp: "$98B", gdpGrowth: "+4.0%",
        government: "Federal Presidential Republic", leader: "Nicolás Maduro", leaderTitle: "President",
        threatLevel: "HIGH", threatScore: 76, riskFactors: ["Political Crisis", "Economic Collapse", "Authoritarianism", "Refugee Crisis"],
        military: {
            personnel: "123K active", reserves: "8K", budget: "$1.2B", budgetPercent: "1.2% GDP", nuclear: false, icbm: 0,
            capabilities: ["Russian Equipment", "Cuban Support", "Militia Groups", "Internal Security"]
        },
        economy: {
            growth: "4.0%", unemployment: "7.1%", inflation: "360.0%",
            industries: ["Oil & Gas", "Mining", "Agriculture", "Manufacturing"],
            exports: "$13B", imports: "$8B", tradePartners: ["China", "Turkey", "Russia", "India"], currency: "Venezuelan Bolívar (VES)"
        },
        relations: {
            allies: ["Russia", "China", "Cuba", "Iran"], partners: [],
            tensions: ["USA", "Colombia", "Brazil"], status: "Adversary"
        },
        recentIntel: [
            { date: "2026-02-16", event: "Economic crisis deepens", priority: "HIGH" },
            { date: "2026-02-12", event: "Opposition crackdown continues", priority: "HIGH" }
        ],
        strategicAssets: ["Oil Reserves", "Gold Deposits", "Strategic Location", "Natural Resources"]
    },

    "Cuba": {
        name: "Republic of Cuba", code: "CU", capital: "Havana", coords: [-82.3666, 23.1136],
        population: "11.3M", area: "109,884 km²", gdp: "$107B", gdpGrowth: "+1.8%",
        government: "Communist State", leader: "Miguel Díaz-Canel", leaderTitle: "President",
        threatLevel: "MEDIUM", threatScore: 33, riskFactors: ["US Embargo", "Economic Crisis", "Political Repression"],
        military: {
            personnel: "49K active", reserves: "39K", budget: "$1.9B", budgetPercent: "2.9% GDP", nuclear: false, icbm: 0,
            capabilities: ["Russian Equipment", "Coastal Defense", "Intelligence Services", "Regional Influence"]
        },
        economy: {
            growth: "1.8%", unemployment: "1.3%", inflation: "77.0%",
            industries: ["Tourism", "Sugar", "Tobacco", "Nickel"],
            exports: "$2.6B", imports: "$6.7B", tradePartners: ["Spain", "China", "Netherlands", "Canada"], currency: "Cuban Peso (CUP)"
        },
        relations: {
            allies: ["Russia", "China", "Venezuela"], partners: [],
            tensions: ["USA"], status: "Adversary"
        },
        recentIntel: [
            { date: "2026-02-14", event: "Economic reforms announced", priority: "MEDIUM" },
            { date: "2026-02-10", event: "Protests suppressed", priority: "MEDIUM" }
        ],
        strategicAssets: ["Strategic Location", "Intelligence Services", "Medical Diplomacy", "Nickel Reserves"]
    },

    "New Zealand": {
        name: "New Zealand", code: "NZ", capital: "Wellington", coords: [174.7762, -41.2865],
        population: "5.1M", area: "268,021 km²", gdp: "$249B", gdpGrowth: "+2.2%",
        government: "Parliamentary Constitutional Monarchy", leader: "Christopher Luxon", leaderTitle: "Prime Minister",
        threatLevel: "LOW", threatScore: 3, riskFactors: ["Natural Disasters", "Isolation"],
        military: {
            personnel: "9K active", reserves: "2K", budget: "$3.7B", budgetPercent: "1.5% GDP", nuclear: false, icbm: 0,
            capabilities: ["Naval Forces", "Peacekeeping", "Special Forces", "Five Eyes"]
        },
        economy: {
            growth: "2.2%", unemployment: "3.4%", inflation: "4.7%",
            industries: ["Agriculture", "Tourism", "Manufacturing", "Technology"],
            exports: "$46B", imports: "$51B", tradePartners: ["China", "Australia", "USA", "Japan"], currency: "New Zealand Dollar (NZD)"
        },
        relations: {
            allies: ["Australia", "USA", "UK"], partners: ["Five Eyes", "Commonwealth", "CPTPP"],
            tensions: [], status: "Strategic Ally"
        },
        recentIntel: [
            { date: "2026-02-12", event: "Pacific security cooperation enhanced", priority: "LOW" },
            { date: "2026-02-08", event: "Agricultural exports strong", priority: "LOW" }
        ],
        strategicAssets: ["Strategic Pacific Location", "Agriculture", "Tourism", "Five Eyes Intelligence"]
    }
};

// Helper function to get threat level color
export const getThreatColor = (level) => {
    const colors = {
        "STRATEGIC_CORE": "#00FFCC",
        "LOW": "#34D399",
        "MEDIUM": "#FBBF24",
        "HIGH": "#F87171",
        "CRITICAL": "#DC2626"
    };
    return colors[level] || "#00FFCC";
};

// Helper function to get threat level label
export const getThreatLabel = (level) => {
    const labels = {
        "STRATEGIC_CORE": "Strategic Core",
        "LOW": "Low Risk",
        "MEDIUM": "Medium Risk",
        "HIGH": "High Threat",
        "CRITICAL": "Critical Threat"
    };
    return labels[level] || level;
};
