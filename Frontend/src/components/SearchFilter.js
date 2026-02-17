import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Star, Clock, Filter } from 'lucide-react';
import { countryData } from '../data/countryData';
import * as storage from '../utils/storage';

const SearchFilter = ({ onFilterChange, onCountrySelect }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [recentSearches, setRecentSearches] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        setRecentSearches(storage.getLastViewed());
        setFavorites(storage.getFavorites());
    }, []);

    useEffect(() => {
        if (searchQuery.length > 0) {
            const filtered = Object.keys(countryData).filter(country =>
                country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                countryData[country].name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                countryData[country].capital.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSuggestions(filtered.slice(0, 8));
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, [searchQuery]);

    const handleSelectCountry = (country) => {
        setSearchQuery('');
        setShowSuggestions(false);
        storage.addLastViewed(country);
        setRecentSearches(storage.getLastViewed());
        if (onCountrySelect) {
            onCountrySelect(country);
        }
    };

    const clearSearch = () => {
        setSearchQuery('');
        setShowSuggestions(false);
    };

    return (
        <div className="search-filter-container" style={{ position: 'relative', width: '100%', maxWidth: '600px' }}>
            {/* Search Input */}
            <div style={{
                position: 'relative',
                background: 'rgba(0, 255, 204, 0.05)',
                border: '1px solid rgba(0, 255, 204, 0.3)',
                borderRadius: '8px',
                overflow: 'hidden'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px' }}>
                    <Search size={20} color="#00FFCC" style={{ marginRight: '12px' }} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => searchQuery && setShowSuggestions(true)}
                        placeholder="Search countries, capitals, or regions..."
                        style={{
                            flex: 1,
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            color: '#00FFCC',
                            fontSize: '16px',
                            fontFamily: 'Orbitron, monospace'
                        }}
                    />
                    {searchQuery && (
                        <X
                            size={20}
                            color="#00FFCC"
                            style={{ cursor: 'pointer', opacity: 0.7 }}
                            onClick={clearSearch}
                        />
                    )}
                </div>
            </div>

            {/* Suggestions Dropdown */}
            <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            marginTop: '8px',
                            background: 'rgba(0, 20, 40, 0.98)',
                            border: '1px solid rgba(0, 255, 204, 0.3)',
                            borderRadius: '8px',
                            maxHeight: '400px',
                            overflowY: 'auto',
                            zIndex: 1000,
                            boxShadow: '0 8px 32px rgba(0, 255, 204, 0.2)'
                        }}
                    >
                        {suggestions.map((country, index) => {
                            const data = countryData[country];
                            const isFav = favorites.includes(country);

                            return (
                                <motion.div
                                    key={country}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                    onClick={() => handleSelectCountry(country)}
                                    style={{
                                        padding: '12px 16px',
                                        borderBottom: index < suggestions.length - 1 ? '1px solid rgba(0, 255, 204, 0.1)' : 'none',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(0, 255, 204, 0.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent';
                                    }}
                                >
                                    <div>
                                        <div style={{
                                            color: '#00FFCC',
                                            fontSize: '14px',
                                            fontWeight: 'bold',
                                            marginBottom: '4px'
                                        }}>
                                            {country}
                                        </div>
                                        <div style={{
                                            color: 'rgba(255, 255, 255, 0.5)',
                                            fontSize: '12px'
                                        }}>
                                            {data.capital} • {data.threatLevel}
                                        </div>
                                    </div>
                                    {isFav && <Star size={16} color="#FFD700" fill="#FFD700" />}
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Recent Searches & Favorites */}
            {!showSuggestions && !searchQuery && (recentSearches.length > 0 || favorites.length > 0) && (
                <div style={{
                    marginTop: '16px',
                    display: 'flex',
                    gap: '16px',
                    flexWrap: 'wrap'
                }}>
                    {/* Recent */}
                    {recentSearches.length > 0 && (
                        <div style={{ flex: 1, minWidth: '200px' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginBottom: '8px',
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontSize: '12px'
                            }}>
                                <Clock size={14} />
                                <span>RECENT</span>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                {recentSearches.slice(0, 5).map(country => (
                                    <div
                                        key={country}
                                        onClick={() => handleSelectCountry(country)}
                                        style={{
                                            padding: '6px 12px',
                                            background: 'rgba(0, 255, 204, 0.1)',
                                            border: '1px solid rgba(0, 255, 204, 0.3)',
                                            borderRadius: '4px',
                                            color: '#00FFCC',
                                            fontSize: '12px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'rgba(0, 255, 204, 0.2)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'rgba(0, 255, 204, 0.1)';
                                        }}
                                    >
                                        {country}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Favorites */}
                    {favorites.length > 0 && (
                        <div style={{ flex: 1, minWidth: '200px' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginBottom: '8px',
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontSize: '12px'
                            }}>
                                <Star size={14} />
                                <span>FAVORITES</span>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                {favorites.slice(0, 5).map(country => (
                                    <div
                                        key={country}
                                        onClick={() => handleSelectCountry(country)}
                                        style={{
                                            padding: '6px 12px',
                                            background: 'rgba(255, 215, 0, 0.1)',
                                            border: '1px solid rgba(255, 215, 0, 0.3)',
                                            borderRadius: '4px',
                                            color: '#FFD700',
                                            fontSize: '12px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'rgba(255, 215, 0, 0.2)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'rgba(255, 215, 0, 0.1)';
                                        }}
                                    >
                                        {country}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchFilter;
