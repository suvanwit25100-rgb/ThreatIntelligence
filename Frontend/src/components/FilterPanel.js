import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, ChevronUp, X, Save } from 'lucide-react';
import { countryData } from '../data/countryData';
import * as storage from '../utils/storage';

const FilterPanel = ({ onFilterChange, isOpen, onToggle }) => {
    const [filters, setFilters] = useState({
        threatLevels: [],
        regions: [],
        gdpRange: [0, 30],
        militaryBudgetRange: [0, 900],
        hasNuclear: null,
        alliances: [],
    });

    const [presetName, setPresetName] = useState('');
    const [showSavePreset, setShowSavePreset] = useState(false);

    const threatLevels = ['STRATEGIC_CORE', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
    const regions = ['Asia', 'Europe', 'Middle East', 'Africa', 'Americas'];
    const alliances = ['NATO', 'BRICS', 'Quad', 'SCO', 'G7', 'G20'];

    const handleFilterChange = (key, value) => {
        const updated = { ...filters, [key]: value };
        setFilters(updated);
        if (onFilterChange) {
            onFilterChange(updated);
        }
    };

    const toggleArrayFilter = (key, value) => {
        const current = filters[key];
        const updated = current.includes(value)
            ? current.filter(v => v !== value)
            : [...current, value];
        handleFilterChange(key, updated);
    };

    const clearFilters = () => {
        const cleared = {
            threatLevels: [],
            regions: [],
            gdpRange: [0, 30],
            militaryBudgetRange: [0, 900],
            hasNuclear: null,
            alliances: [],
        };
        setFilters(cleared);
        if (onFilterChange) {
            onFilterChange(cleared);
        }
    };

    const savePreset = () => {
        if (presetName.trim()) {
            storage.saveSearchPreset(presetName, filters);
            setPresetName('');
            setShowSavePreset(false);
        }
    };

    const loadPreset = (preset) => {
        setFilters(preset.filters);
        if (onFilterChange) {
            onFilterChange(preset.filters);
        }
    };

    const savedPresets = storage.getSearchPresets();

    return (
        <div style={{ width: '100%', maxWidth: '800px' }}>
            {/* Toggle Button */}
            <div
                onClick={onToggle}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    background: 'rgba(0, 255, 204, 0.1)',
                    border: '1px solid rgba(0, 255, 204, 0.3)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 255, 204, 0.15)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 255, 204, 0.1)';
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Filter size={20} color="#00FFCC" />
                    <span style={{ color: '#00FFCC', fontFamily: 'Orbitron, monospace', fontSize: '14px' }}>
                        ADVANCED FILTERS
                    </span>
                </div>
                {isOpen ? <ChevronUp size={20} color="#00FFCC" /> : <ChevronDown size={20} color="#00FFCC" />}
            </div>

            {/* Filter Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            overflow: 'hidden',
                            marginTop: '12px',
                            background: 'rgba(0, 20, 40, 0.8)',
                            border: '1px solid rgba(0, 255, 204, 0.3)',
                            borderRadius: '8px',
                            padding: '20px'
                        }}
                    >
                        {/* Threat Levels */}
                        <div style={{ marginBottom: '20px' }}>
                            <div style={{ color: '#00FFCC', fontSize: '12px', marginBottom: '8px', fontWeight: 'bold' }}>
                                THREAT LEVEL
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {threatLevels.map(level => (
                                    <div
                                        key={level}
                                        onClick={() => toggleArrayFilter('threatLevels', level)}
                                        style={{
                                            padding: '8px 16px',
                                            background: filters.threatLevels.includes(level)
                                                ? 'rgba(0, 255, 204, 0.3)'
                                                : 'rgba(0, 255, 204, 0.05)',
                                            border: `1px solid ${filters.threatLevels.includes(level)
                                                ? '#00FFCC'
                                                : 'rgba(0, 255, 204, 0.3)'}`,
                                            borderRadius: '4px',
                                            color: '#00FFCC',
                                            fontSize: '12px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {level}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Nuclear Capability */}
                        <div style={{ marginBottom: '20px' }}>
                            <div style={{ color: '#00FFCC', fontSize: '12px', marginBottom: '8px', fontWeight: 'bold' }}>
                                NUCLEAR CAPABILITY
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                {[
                                    { label: 'ALL', value: null },
                                    { label: 'NUCLEAR', value: true },
                                    { label: 'NON-NUCLEAR', value: false }
                                ].map(option => (
                                    <div
                                        key={option.label}
                                        onClick={() => handleFilterChange('hasNuclear', option.value)}
                                        style={{
                                            padding: '8px 16px',
                                            background: filters.hasNuclear === option.value
                                                ? 'rgba(0, 255, 204, 0.3)'
                                                : 'rgba(0, 255, 204, 0.05)',
                                            border: `1px solid ${filters.hasNuclear === option.value
                                                ? '#00FFCC'
                                                : 'rgba(0, 255, 204, 0.3)'}`,
                                            borderRadius: '4px',
                                            color: '#00FFCC',
                                            fontSize: '12px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {option.label}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Alliances */}
                        <div style={{ marginBottom: '20px' }}>
                            <div style={{ color: '#00FFCC', fontSize: '12px', marginBottom: '8px', fontWeight: 'bold' }}>
                                ALLIANCES
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {alliances.map(alliance => (
                                    <div
                                        key={alliance}
                                        onClick={() => toggleArrayFilter('alliances', alliance)}
                                        style={{
                                            padding: '8px 16px',
                                            background: filters.alliances.includes(alliance)
                                                ? 'rgba(0, 255, 204, 0.3)'
                                                : 'rgba(0, 255, 204, 0.05)',
                                            border: `1px solid ${filters.alliances.includes(alliance)
                                                ? '#00FFCC'
                                                : 'rgba(0, 255, 204, 0.3)'}`,
                                            borderRadius: '4px',
                                            color: '#00FFCC',
                                            fontSize: '12px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {alliance}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Saved Presets */}
                        {savedPresets.length > 0 && (
                            <div style={{ marginBottom: '20px' }}>
                                <div style={{ color: '#00FFCC', fontSize: '12px', marginBottom: '8px', fontWeight: 'bold' }}>
                                    SAVED PRESETS
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {savedPresets.map(preset => (
                                        <div
                                            key={preset.name}
                                            onClick={() => loadPreset(preset)}
                                            style={{
                                                padding: '8px 16px',
                                                background: 'rgba(255, 215, 0, 0.1)',
                                                border: '1px solid rgba(255, 215, 0, 0.3)',
                                                borderRadius: '4px',
                                                color: '#FFD700',
                                                fontSize: '12px',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            {preset.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                            <button
                                onClick={clearFilters}
                                style={{
                                    flex: 1,
                                    padding: '10px',
                                    background: 'rgba(255, 0, 0, 0.1)',
                                    border: '1px solid rgba(255, 0, 0, 0.3)',
                                    borderRadius: '4px',
                                    color: '#FF6B6B',
                                    fontSize: '12px',
                                    cursor: 'pointer',
                                    fontFamily: 'Orbitron, monospace',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px'
                                }}
                            >
                                <X size={16} />
                                CLEAR ALL
                            </button>
                            <button
                                onClick={() => setShowSavePreset(!showSavePreset)}
                                style={{
                                    flex: 1,
                                    padding: '10px',
                                    background: 'rgba(0, 255, 204, 0.1)',
                                    border: '1px solid rgba(0, 255, 204, 0.3)',
                                    borderRadius: '4px',
                                    color: '#00FFCC',
                                    fontSize: '12px',
                                    cursor: 'pointer',
                                    fontFamily: 'Orbitron, monospace',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px'
                                }}
                            >
                                <Save size={16} />
                                SAVE PRESET
                            </button>
                        </div>

                        {/* Save Preset Input */}
                        {showSavePreset && (
                            <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                                <input
                                    type="text"
                                    value={presetName}
                                    onChange={(e) => setPresetName(e.target.value)}
                                    placeholder="Preset name..."
                                    style={{
                                        flex: 1,
                                        padding: '10px',
                                        background: 'rgba(0, 255, 204, 0.05)',
                                        border: '1px solid rgba(0, 255, 204, 0.3)',
                                        borderRadius: '4px',
                                        color: '#00FFCC',
                                        fontSize: '12px',
                                        fontFamily: 'Orbitron, monospace',
                                        outline: 'none'
                                    }}
                                />
                                <button
                                    onClick={savePreset}
                                    style={{
                                        padding: '10px 20px',
                                        background: 'rgba(0, 255, 204, 0.2)',
                                        border: '1px solid #00FFCC',
                                        borderRadius: '4px',
                                        color: '#00FFCC',
                                        fontSize: '12px',
                                        cursor: 'pointer',
                                        fontFamily: 'Orbitron, monospace'
                                    }}
                                >
                                    SAVE
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FilterPanel;
