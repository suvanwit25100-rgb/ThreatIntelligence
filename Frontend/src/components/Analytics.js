import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, Activity } from 'lucide-react';
import { countryData } from '../data/countryData';

const Analytics = ({ selectedCountries = [] }) => {
    const [view, setView] = useState('trends'); // trends, comparison, distribution

    // Generate threat trend data (simulated)
    const generateTrendData = () => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        return months.map((month, index) => {
            const data = { month };
            selectedCountries.forEach(country => {
                if (countryData[country]) {
                    // Simulate trend with some variation
                    const base = countryData[country].threatScore || 0;
                    data[country] = Math.max(0, Math.min(100, base + (Math.random() * 20 - 10)));
                }
            });
            return data;
        });
    };

    // Generate comparison data
    const generateComparisonData = () => {
        return selectedCountries.map(country => {
            const data = countryData[country];
            if (!data) return null;

            return {
                country: country,
                threatScore: data.threatScore || 0,
                militaryBudget: parseFloat(data.military?.budget?.replace(/[^0-9.]/g, '') || 0),
                gdp: parseFloat(data.gdp?.replace(/[^0-9.]/g, '') || 0),
                personnel: parseFloat(data.military?.personnel?.replace(/[^0-9.]/g, '') || 0)
            };
        }).filter(Boolean);
    };

    // Generate radar chart data for capabilities
    const generateCapabilitiesData = (country) => {
        const data = countryData[country];
        if (!data) return [];

        return [
            { capability: 'Military', value: Math.min(100, (data.threatScore || 0) * 1.2) },
            { capability: 'Economic', value: Math.min(100, parseFloat(data.gdp?.replace(/[^0-9.]/g, '') || 0) / 300) },
            { capability: 'Nuclear', value: data.military?.nuclear ? 100 : 0 },
            { capability: 'Technology', value: Math.random() * 100 }, // Simulated
            { capability: 'Influence', value: (data.relations?.allies?.length || 0) * 10 }
        ];
    };

    const trendData = generateTrendData();
    const comparisonData = generateComparisonData();

    const colors = ['#00FFCC', '#FF6B6B', '#FFD700', '#9B59B6', '#3498DB'];

    return (
        <div style={{ width: '100%', padding: '20px' }}>
            {/* View Selector */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                {[
                    { id: 'trends', label: 'THREAT TRENDS', icon: TrendingUp },
                    { id: 'comparison', label: 'COMPARISON', icon: BarChart3 },
                    { id: 'capabilities', label: 'CAPABILITIES', icon: Activity }
                ].map(({ id, label, icon: Icon }) => (
                    <motion.div
                        key={id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setView(id)}
                        style={{
                            flex: 1,
                            padding: '12px',
                            background: view === id ? 'rgba(0, 255, 204, 0.2)' : 'rgba(0, 255, 204, 0.05)',
                            border: `1px solid ${view === id ? '#00FFCC' : 'rgba(0, 255, 204, 0.3)'}`,
                            borderRadius: '8px',
                            color: '#00FFCC',
                            fontSize: '12px',
                            fontFamily: 'Orbitron, monospace',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}
                    >
                        <Icon size={16} />
                        {label}
                    </motion.div>
                ))}
            </div>

            {/* Charts */}
            <div style={{
                background: 'rgba(0, 20, 40, 0.8)',
                border: '1px solid rgba(0, 255, 204, 0.3)',
                borderRadius: '12px',
                padding: '24px'
            }}>
                {view === 'trends' && (
                    <div>
                        <h3 style={{ color: '#00FFCC', marginBottom: '20px', fontSize: '16px' }}>
                            THREAT LEVEL TRENDS (6 MONTHS)
                        </h3>
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={trendData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 204, 0.1)" />
                                <XAxis dataKey="month" stroke="#00FFCC" />
                                <YAxis stroke="#00FFCC" />
                                <Tooltip
                                    contentStyle={{
                                        background: 'rgba(0, 20, 40, 0.95)',
                                        border: '1px solid #00FFCC',
                                        borderRadius: '4px'
                                    }}
                                />
                                <Legend />
                                {selectedCountries.map((country, index) => (
                                    <Line
                                        key={country}
                                        type="monotone"
                                        dataKey={country}
                                        stroke={colors[index % colors.length]}
                                        strokeWidth={2}
                                        dot={{ r: 4 }}
                                    />
                                ))}
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}

                {view === 'comparison' && (
                    <div>
                        <h3 style={{ color: '#00FFCC', marginBottom: '20px', fontSize: '16px' }}>
                            MULTI-METRIC COMPARISON
                        </h3>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={comparisonData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 204, 0.1)" />
                                <XAxis dataKey="country" stroke="#00FFCC" />
                                <YAxis stroke="#00FFCC" />
                                <Tooltip
                                    contentStyle={{
                                        background: 'rgba(0, 20, 40, 0.95)',
                                        border: '1px solid #00FFCC',
                                        borderRadius: '4px'
                                    }}
                                />
                                <Legend />
                                <Bar dataKey="threatScore" fill="#FF6B6B" name="Threat Score" />
                                <Bar dataKey="militaryBudget" fill="#00FFCC" name="Military Budget ($B)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}

                {view === 'capabilities' && selectedCountries.length > 0 && (
                    <div>
                        <h3 style={{ color: '#00FFCC', marginBottom: '20px', fontSize: '16px' }}>
                            CAPABILITY ANALYSIS - {selectedCountries[0]}
                        </h3>
                        <ResponsiveContainer width="100%" height={400}>
                            <RadarChart data={generateCapabilitiesData(selectedCountries[0])}>
                                <PolarGrid stroke="rgba(0, 255, 204, 0.3)" />
                                <PolarAngleAxis dataKey="capability" stroke="#00FFCC" />
                                <PolarRadiusAxis stroke="#00FFCC" />
                                <Radar
                                    name={selectedCountries[0]}
                                    dataKey="value"
                                    stroke="#00FFCC"
                                    fill="#00FFCC"
                                    fillOpacity={0.3}
                                />
                                <Tooltip
                                    contentStyle={{
                                        background: 'rgba(0, 20, 40, 0.95)',
                                        border: '1px solid #00FFCC',
                                        borderRadius: '4px'
                                    }}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Analytics;
