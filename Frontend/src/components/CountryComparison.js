import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight, X } from 'lucide-react';
import Select from 'react-select';
import { countryData } from '../data/countryData';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const CountryComparison = ({ onClose }) => {
    const [selectedCountries, setSelectedCountries] = useState([]);

    const countryOptions = Object.keys(countryData).map(country => ({
        value: country,
        label: country
    }));

    const customStyles = {
        control: (provided) => ({
            ...provided,
            background: 'rgba(0, 255, 204, 0.05)',
            border: '1px solid rgba(0, 255, 204, 0.3)',
            color: '#00FFCC',
            minHeight: '40px'
        }),
        menu: (provided) => ({
            ...provided,
            background: 'rgba(0, 20, 40, 0.98)',
            border: '1px solid rgba(0, 255, 204, 0.3)'
        }),
        option: (provided, state) => ({
            ...provided,
            background: state.isFocused ? 'rgba(0, 255, 204, 0.2)' : 'transparent',
            color: '#00FFCC',
            cursor: 'pointer'
        }),
        multiValue: (provided) => ({
            ...provided,
            background: 'rgba(0, 255, 204, 0.2)',
            border: '1px solid rgba(0, 255, 204, 0.5)'
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: '#00FFCC'
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            color: '#00FFCC',
            ':hover': {
                background: 'rgba(255, 0, 0, 0.3)',
                color: '#FF6B6B'
            }
        })
    };

    const getComparisonData = () => {
        return selectedCountries.map(country => {
            const data = countryData[country.value];
            return {
                country: country.value,
                threatScore: data.threatScore || 0,
                gdp: parseFloat(data.gdp?.replace(/[^0-9.]/g, '') || 0),
                militaryBudget: parseFloat(data.military?.budget?.replace(/[^0-9.]/g, '') || 0),
                personnel: parseFloat(data.military?.personnel?.replace(/[^0-9.]/g, '') || 0),
                nuclear: data.military?.nuclear,
                icbm: data.military?.icbm || 0,
                allies: data.relations?.allies?.length || 0
            };
        });
    };

    const comparisonData = getComparisonData();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.9)',
                zIndex: 10000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                style={{
                    background: 'rgba(0, 20, 40, 0.98)',
                    border: '2px solid #00FFCC',
                    borderRadius: '12px',
                    padding: '32px',
                    maxWidth: '1200px',
                    width: '100%',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    position: 'relative'
                }}
            >
                {/* Close Button */}
                <X
                    size={24}
                    color="#00FFCC"
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        cursor: 'pointer'
                    }}
                    onClick={onClose}
                />

                {/* Header */}
                <div style={{ marginBottom: '24px' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '16px'
                    }}>
                        <ArrowLeftRight size={24} color="#00FFCC" />
                        <h2 style={{
                            color: '#00FFCC',
                            fontSize: '24px',
                            fontFamily: 'Orbitron, monospace',
                            margin: 0
                        }}>
                            COUNTRY COMPARISON
                        </h2>
                    </div>

                    {/* Country Selector */}
                    <Select
                        isMulti
                        options={countryOptions}
                        value={selectedCountries}
                        onChange={setSelectedCountries}
                        styles={customStyles}
                        placeholder="Select countries to compare (up to 4)..."
                        isOptionDisabled={() => selectedCountries.length >= 4}
                    />
                </div>

                {/* Comparison Table */}
                {comparisonData.length > 0 && (
                    <div style={{
                        background: 'rgba(0, 255, 204, 0.05)',
                        border: '1px solid rgba(0, 255, 204, 0.3)',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        marginBottom: '24px'
                    }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: 'rgba(0, 255, 204, 0.1)' }}>
                                    <th style={{ padding: '12px', textAlign: 'left', color: '#00FFCC', fontSize: '12px' }}>
                                        METRIC
                                    </th>
                                    {comparisonData.map(data => (
                                        <th key={data.country} style={{
                                            padding: '12px',
                                            textAlign: 'center',
                                            color: '#00FFCC',
                                            fontSize: '12px'
                                        }}>
                                            {data.country}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { label: 'Threat Score', key: 'threatScore', suffix: '' },
                                    { label: 'GDP', key: 'gdp', suffix: 'T' },
                                    { label: 'Military Budget', key: 'militaryBudget', suffix: 'B' },
                                    { label: 'Personnel', key: 'personnel', suffix: 'M' },
                                    { label: 'Nuclear', key: 'nuclear', suffix: '' },
                                    { label: 'ICBMs', key: 'icbm', suffix: '' },
                                    { label: 'Allies', key: 'allies', suffix: '' }
                                ].map((metric, index) => (
                                    <tr key={metric.key} style={{
                                        borderTop: '1px solid rgba(0, 255, 204, 0.1)',
                                        background: index % 2 === 0 ? 'transparent' : 'rgba(0, 255, 204, 0.02)'
                                    }}>
                                        <td style={{
                                            padding: '12px',
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            fontSize: '13px'
                                        }}>
                                            {metric.label}
                                        </td>
                                        {comparisonData.map(data => (
                                            <td key={data.country} style={{
                                                padding: '12px',
                                                textAlign: 'center',
                                                color: '#00FFCC',
                                                fontSize: '13px',
                                                fontWeight: 'bold'
                                            }}>
                                                {metric.key === 'nuclear'
                                                    ? (data[metric.key] ? '✓' : '✗')
                                                    : `${data[metric.key].toFixed(metric.key === 'threatScore' ? 0 : 1)}${metric.suffix}`
                                                }
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Radar Chart Comparison */}
                {comparisonData.length >= 2 && (
                    <div style={{
                        background: 'rgba(0, 255, 204, 0.05)',
                        border: '1px solid rgba(0, 255, 204, 0.3)',
                        borderRadius: '8px',
                        padding: '20px'
                    }}>
                        <h3 style={{ color: '#00FFCC', marginBottom: '16px', fontSize: '14px' }}>
                            CAPABILITY COMPARISON
                        </h3>
                        <ResponsiveContainer width="100%" height={400}>
                            <RadarChart data={[
                                { metric: 'Threat', ...Object.fromEntries(comparisonData.map(d => [d.country, d.threatScore])) },
                                { metric: 'Economy', ...Object.fromEntries(comparisonData.map(d => [d.country, d.gdp * 3])) },
                                { metric: 'Military', ...Object.fromEntries(comparisonData.map(d => [d.country, d.militaryBudget / 10])) },
                                { metric: 'Nuclear', ...Object.fromEntries(comparisonData.map(d => [d.country, d.nuclear ? 100 : 0])) },
                                { metric: 'Alliances', ...Object.fromEntries(comparisonData.map(d => [d.country, d.allies * 10])) }
                            ]}>
                                <PolarGrid stroke="rgba(0, 255, 204, 0.3)" />
                                <PolarAngleAxis dataKey="metric" stroke="#00FFCC" />
                                <PolarRadiusAxis stroke="#00FFCC" />
                                {comparisonData.map((data, index) => (
                                    <Radar
                                        key={data.country}
                                        name={data.country}
                                        dataKey={data.country}
                                        stroke={['#00FFCC', '#FF6B6B', '#FFD700', '#9B59B6'][index]}
                                        fill={['#00FFCC', '#FF6B6B', '#FFD700', '#9B59B6'][index]}
                                        fillOpacity={0.2}
                                    />
                                ))}
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default CountryComparison;
