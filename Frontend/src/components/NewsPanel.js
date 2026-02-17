import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, ExternalLink, RefreshCw } from 'lucide-react';
import { getCountryNews } from '../api/client';

const NewsPanel = ({ country }) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (country) {
            fetchNews();
        }
    }, [country]);

    const fetchNews = async () => {
        setLoading(true);
        setError(null);
        try {
            const articles = await getCountryNews(country);
            setNews(articles.slice(0, 5));
        } catch (err) {
            setError('Unable to fetch news. API key may not be configured.');
            // Fallback to mock data
            setNews(generateMockNews(country));
        } finally {
            setLoading(false);
        }
    };

    const generateMockNews = (country) => {
        return [
            {
                title: `${country} announces new economic reforms`,
                description: 'Government unveils comprehensive plan to boost economic growth and attract foreign investment.',
                url: '#',
                publishedAt: new Date().toISOString(),
                source: { name: 'Intelligence Brief' }
            },
            {
                title: `Military exercises conducted in ${country}`,
                description: 'Large-scale military drills demonstrate readiness and capabilities.',
                url: '#',
                publishedAt: new Date(Date.now() - 86400000).toISOString(),
                source: { name: 'Defense News' }
            },
            {
                title: `${country} strengthens diplomatic ties`,
                description: 'New bilateral agreements signed with key strategic partners.',
                url: '#',
                publishedAt: new Date(Date.now() - 172800000).toISOString(),
                source: { name: 'Diplomatic Wire' }
            }
        ];
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;
        const hours = Math.floor(diff / 3600000);

        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        return `${days}d ago`;
    };

    return (
        <div style={{
            background: 'rgba(0, 20, 40, 0.8)',
            border: '1px solid rgba(0, 255, 204, 0.3)',
            borderRadius: '8px',
            padding: '20px',
            maxWidth: '600px'
        }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Newspaper size={20} color="#00FFCC" />
                    <h3 style={{
                        color: '#00FFCC',
                        fontSize: '14px',
                        fontFamily: 'Orbitron, monospace',
                        margin: 0
                    }}>
                        LATEST INTEL - {country}
                    </h3>
                </div>
                <RefreshCw
                    size={18}
                    color="#00FFCC"
                    style={{ cursor: 'pointer', opacity: loading ? 0.5 : 1 }}
                    onClick={fetchNews}
                    className={loading ? 'spinning' : ''}
                />
            </div>

            {/* News Articles */}
            {loading ? (
                <div style={{ color: 'rgba(255, 255, 255, 0.5)', textAlign: 'center', padding: '20px' }}>
                    Loading intelligence...
                </div>
            ) : error ? (
                <div style={{ color: '#FFD700', fontSize: '12px', marginBottom: '12px' }}>
                    {error}
                </div>
            ) : null}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {news.map((article, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        style={{
                            padding: '12px',
                            background: 'rgba(0, 255, 204, 0.05)',
                            border: '1px solid rgba(0, 255, 204, 0.2)',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(0, 255, 204, 0.1)';
                            e.currentTarget.style.borderColor = 'rgba(0, 255, 204, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(0, 255, 204, 0.05)';
                            e.currentTarget.style.borderColor = 'rgba(0, 255, 204, 0.2)';
                        }}
                        onClick={() => article.url !== '#' && window.open(article.url, '_blank')}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'start',
                            marginBottom: '8px'
                        }}>
                            <div style={{
                                color: '#00FFCC',
                                fontSize: '13px',
                                fontWeight: 'bold',
                                flex: 1,
                                lineHeight: '1.4'
                            }}>
                                {article.title}
                            </div>
                            {article.url !== '#' && (
                                <ExternalLink size={14} color="#00FFCC" style={{ marginLeft: '8px', flexShrink: 0 }} />
                            )}
                        </div>
                        <div style={{
                            color: 'rgba(255, 255, 255, 0.6)',
                            fontSize: '11px',
                            marginBottom: '8px',
                            lineHeight: '1.4'
                        }}>
                            {article.description}
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '10px',
                            color: 'rgba(255, 255, 255, 0.4)'
                        }}>
                            <span>{article.source?.name || 'Unknown Source'}</span>
                            <span>{formatDate(article.publishedAt)}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default NewsPanel;
