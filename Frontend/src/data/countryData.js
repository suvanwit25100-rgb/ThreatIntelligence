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
