const fs = require('fs');

const newCountries = `,

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
    }`;

const filePath = './src/data/countryData.js';
let content = fs.readFileSync(filePath, 'utf8');

// Find the closing brace and insert before it
content = content.replace(/(\s+)\}\s*;\s*$/, newCountries + '$1};');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Added 2 more countries successfully!');
