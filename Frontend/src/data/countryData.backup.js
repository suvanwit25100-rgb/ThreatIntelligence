// Comprehensive geopolitical intelligence data for countries
export const countryData = {
    "China": {
        name: "People's Republic of China",
        code: "CN",
        capital: "Beijing",
        coords: [116.4074, 39.9042],
        population: "1.412B",
        area: "9.597M km²",
        gdp: "$17.96T",
        gdpGrowth: "+5.2%",
        government: "Communist State",
        leader: "Xi Jinping",
        leaderTitle: "President & General Secretary",
        threatLevel: "HIGH",
        threatScore: 78,
        riskFactors: ["Military Expansion", "Cyber Warfare", "Economic Coercion", "Territorial Disputes"],
        military: {
            personnel: "2.0M active",
            reserves: "510K",
            budget: "$293B",
            budgetPercent: "1.7% GDP",
            nuclear: true,
            icbm: 350,
            capabilities: ["ICBM", "Aircraft Carriers", "Hypersonic Missiles", "Cyber Warfare", "Space Weapons"]
        },
        economy: {
            growth: "5.2%",
            unemployment: "5.1%",
            inflation: "0.2%",
            industries: ["Manufacturing", "Technology", "Export", "Infrastructure"],
            exports: "$3.59T",
            imports: "$2.56T",
            tradePartners: ["USA", "EU", "ASEAN", "Japan", "South Korea"],
            currency: "Yuan (CNY)"
        },
        relations: {
            allies: ["Russia", "Pakistan", "North Korea", "Iran"],
            partners: ["ASEAN", "African Union", "SCO"],
            tensions: ["India", "Taiwan", "USA", "Japan", "Australia"],
            status: "Strategic Competitor"
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
        name: "Islamic Republic of Pakistan",
        code: "PK",
        capital: "Islamabad",
        coords: [73.0479, 33.6844],
        population: "231.4M",
        area: "881,913 km²",
        gdp: "$376.5B",
        gdpGrowth: "+2.1%",
        government: "Federal Parliamentary Republic",
        leader: "Shehbaz Sharif",
        leaderTitle: "Prime Minister",
        threatLevel: "CRITICAL",
        threatScore: 92,
        riskFactors: ["Terrorism", "Nuclear Arsenal", "Border Conflicts", "Political Instability", "Extremism"],
        military: {
            personnel: "654K active",
            reserves: "550K",
            budget: "$10.3B",
            budgetPercent: "4.0% GDP",
            nuclear: true,
            icbm: 165,
            capabilities: ["Nuclear Weapons", "Ballistic Missiles", "F-16 Fleet", "Tactical Nukes"]
        },
        economy: {
            growth: "2.1%",
            unemployment: "6.2%",
            inflation: "29.2%",
            industries: ["Textiles", "Agriculture", "Services", "Remittances"],
            exports: "$31.8B",
            imports: "$55.0B",
            tradePartners: ["China", "USA", "UAE", "UK"],
            currency: "Pakistani Rupee (PKR)"
        },
        relations: {
            allies: ["China", "Saudi Arabia", "Turkey"],
            partners: ["OIC", "SCO"],
            tensions: ["India", "Afghanistan", "USA"],
            status: "Critical Threat"
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
        name: "Republic of India",
        code: "IN",
        capital: "New Delhi",
        coords: [77.2090, 28.6139],
        population: "1.428B",
        area: "3.287M km²",
        gdp: "$3.73T",
        gdpGrowth: "+7.2%",
        government: "Federal Parliamentary Democratic Republic",
        leader: "Narendra Modi",
        leaderTitle: "Prime Minister",
        threatLevel: "STRATEGIC_CORE",
        threatScore: 0,
        riskFactors: [],
        military: {
            personnel: "1.46M active",
            reserves: "1.15M",
            budget: "$81.4B",
            budgetPercent: "2.4% GDP",
            nuclear: true,
            icbm: 160,
            capabilities: ["Nuclear Triad", "Aircraft Carriers", "Ballistic Missiles", "Cyber Defense", "Space Program"]
        },
        economy: {
            growth: "7.2%",
            unemployment: "3.2%",
            inflation: "5.1%",
            industries: ["IT Services", "Manufacturing", "Pharmaceuticals", "Agriculture"],
            exports: "$776B",
            imports: "$854B",
            tradePartners: ["USA", "UAE", "China", "EU"],
            currency: "Indian Rupee (INR)"
        },
        relations: {
            allies: ["USA", "Israel", "France", "Japan", "UAE"],
            partners: ["Quad", "BRICS", "SCO", "G20"],
            tensions: ["Pakistan", "China"],
            status: "Strategic Partner"
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
        name: "United States of America",
        code: "US",
        capital: "Washington D.C.",
        coords: [-77.0369, 38.9072],
        population: "334.9M",
        area: "9.834M km²",
        gdp: "$27.36T",
        gdpGrowth: "+2.5%",
        government: "Federal Presidential Constitutional Republic",
        leader: "Joe Biden",
        leaderTitle: "President",
        threatLevel: "LOW",
        threatScore: 15,
        riskFactors: ["Political Polarization", "Debt Levels"],
        military: {
            personnel: "1.39M active",
            reserves: "800K",
            budget: "$877B",
            budgetPercent: "3.5% GDP",
            nuclear: true,
            icbm: 5550,
            capabilities: ["Global Reach", "11 Aircraft Carriers", "Stealth Technology", "Cyber Dominance", "Space Force"]
        },
        economy: {
            growth: "2.5%",
            unemployment: "3.7%",
            inflation: "3.4%",
            industries: ["Technology", "Finance", "Healthcare", "Defense"],
            exports: "$3.05T",
            imports: "$3.83T",
            tradePartners: ["Canada", "Mexico", "China", "EU"],
            currency: "US Dollar (USD)"
        },
        relations: {
            allies: ["NATO", "Japan", "South Korea", "Australia", "India"],
            partners: ["Quad", "AUKUS", "Five Eyes"],
            tensions: ["China", "Russia", "Iran", "North Korea"],
            status: "Strategic Ally"
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
        name: "Russian Federation",
        code: "RU",
        capital: "Moscow",
        coords: [37.6173, 55.7558],
        population: "144.4M",
        area: "17.10M km²",
        gdp: "$2.24T",
        gdpGrowth: "+1.5%",
        government: "Federal Semi-Presidential Republic",
        leader: "Vladimir Putin",
        leaderTitle: "President",
        threatLevel: "LOW",
        threatScore: 25,
        riskFactors: ["Regional Conflicts", "Economic Sanctions"],
        military: {
            personnel: "1.15M active",
            reserves: "2.0M",
            budget: "$86.4B",
            budgetPercent: "4.1% GDP",
            nuclear: true,
            icbm: 5977,
            capabilities: ["Nuclear Arsenal", "Hypersonic Missiles", "Cyber Warfare", "Arctic Presence"]
        },
        economy: {
            growth: "1.5%",
            unemployment: "3.3%",
            inflation: "5.9%",
            industries: ["Energy", "Defense", "Mining", "Agriculture"],
            exports: "$552B",
            imports: "$345B",
            tradePartners: ["China", "EU", "India", "Turkey"],
            currency: "Russian Ruble (RUB)"
        },
        relations: {
            allies: ["China", "Belarus", "Iran", "Syria"],
            partners: ["BRICS", "SCO", "CSTO"],
            tensions: ["NATO", "Ukraine", "USA", "EU"],
            status: "Strategic Partner"
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
        name: "United Kingdom",
        code: "GB",
        capital: "London",
        coords: [-0.1278, 51.5074],
        population: "67.7M",
        area: "242,495 km²",
        gdp: "$3.34T",
        gdpGrowth: "+0.5%",
        government: "Constitutional Monarchy & Parliamentary Democracy",
        leader: "Rishi Sunak",
        leaderTitle: "Prime Minister",
        threatLevel: "LOW",
        threatScore: 12,
        riskFactors: ["Economic Uncertainty", "Post-Brexit Adjustments"],
        military: {
            personnel: "153K active",
            reserves: "37K",
            budget: "$68.4B",
            budgetPercent: "2.3% GDP",
            nuclear: true,
            icbm: 225,
            capabilities: ["Nuclear Submarines", "Aircraft Carriers", "Special Forces", "Intelligence"]
        },
        economy: {
            growth: "0.5%",
            unemployment: "3.8%",
            inflation: "4.0%",
            industries: ["Finance", "Services", "Manufacturing", "Technology"],
            exports: "$886B",
            imports: "$945B",
            tradePartners: ["USA", "EU", "China", "India"],
            currency: "Pound Sterling (GBP)"
        },
        relations: {
            allies: ["USA", "NATO", "Commonwealth", "Five Eyes"],
            partners: ["AUKUS", "G7", "UN Security Council"],
            tensions: ["Russia"],
            status: "Strategic Ally"
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
        name: "Japan",
        code: "JP",
        capital: "Tokyo",
        coords: [139.6917, 35.6895],
        population: "123.3M",
        area: "377,975 km²",
        gdp: "$4.41T",
        gdpGrowth: "+1.9%",
        government: "Constitutional Monarchy & Parliamentary Democracy",
        leader: "Fumio Kishida",
        leaderTitle: "Prime Minister",
        threatLevel: "LOW",
        threatScore: 8,
        riskFactors: ["Regional Tensions", "Natural Disasters"],
        military: {
            personnel: "247K active",
            reserves: "56K",
            budget: "$54.1B",
            budgetPercent: "1.4% GDP",
            nuclear: false,
            icbm: 0,
            capabilities: ["Advanced Navy", "Missile Defense", "F-35 Fleet", "Cyber Defense"]
        },
        economy: {
            growth: "1.9%",
            unemployment: "2.6%",
            inflation: "3.3%",
            industries: ["Automotive", "Electronics", "Robotics", "Manufacturing"],
            exports: "$922B",
            imports: "$1.08T",
            tradePartners: ["China", "USA", "South Korea", "Taiwan"],
            currency: "Japanese Yen (JPY)"
        },
        relations: {
            allies: ["USA", "Australia", "India", "South Korea"],
            partners: ["Quad", "G7", "CPTPP"],
            tensions: ["China", "North Korea", "Russia"],
            status: "Strategic Ally"
        },
        recentIntel: [
            { date: "2026-02-15", event: "Defense budget increase approved", priority: "MEDIUM" },
            { date: "2026-02-12", event: "Quad summit hosted in Tokyo", priority: "HIGH" },
            { date: "2026-02-09", event: "Semiconductor partnership with USA", priority: "MEDIUM" },
            { date: "2026-02-06", event: "Maritime security patrols increased", priority: "LOW" }
        ],
        strategicAssets: ["Technology Hub", "Strategic Location", "Economic Power", "US Alliance"]
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
