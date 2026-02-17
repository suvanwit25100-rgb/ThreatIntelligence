import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Calendar } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { countryData } from '../data/countryData';

const ReportGenerator = ({ country, onClose }) => {
    const [dateRange, setDateRange] = useState('30');
    const [includeAnalytics, setIncludeAnalytics] = useState(true);
    const [includeNews, setIncludeNews] = useState(true);

    const generatePDF = () => {
        const doc = new jsPDF();
        const data = countryData[country];

        if (!data) return;

        // Header
        doc.setFontSize(20);
        doc.setTextColor(0, 255, 204);
        doc.text('INTELLIGENCE REPORT', 105, 20, { align: 'center' });

        doc.setFontSize(16);
        doc.text(country, 105, 30, { align: 'center' });

        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Generated: ${new Date().toLocaleString()}`, 105, 38, { align: 'center' });
        doc.text(`Classification: CONFIDENTIAL`, 105, 43, { align: 'center' });

        let yPos = 55;

        // Executive Summary
        doc.setFontSize(14);
        doc.setTextColor(0);
        doc.text('EXECUTIVE SUMMARY', 20, yPos);
        yPos += 8;

        doc.setFontSize(10);
        doc.text(`Threat Level: ${data.threatLevel}`, 20, yPos);
        yPos += 6;
        doc.text(`Threat Score: ${data.threatScore}/100`, 20, yPos);
        yPos += 6;
        doc.text(`Government: ${data.government}`, 20, yPos);
        yPos += 6;
        doc.text(`Leader: ${data.leader} (${data.leaderTitle})`, 20, yPos);
        yPos += 10;

        // Basic Information Table
        doc.autoTable({
            startY: yPos,
            head: [['Category', 'Details']],
            body: [
                ['Population', data.population],
                ['Area', data.area],
                ['GDP', data.gdp],
                ['GDP Growth', data.gdpGrowth],
                ['Capital', data.capital]
            ],
            theme: 'grid',
            headStyles: { fillColor: [0, 100, 100] }
        });

        yPos = doc.lastAutoTable.finalY + 10;

        // Military Capabilities
        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }

        doc.setFontSize(14);
        doc.text('MILITARY CAPABILITIES', 20, yPos);
        yPos += 8;

        doc.autoTable({
            startY: yPos,
            head: [['Metric', 'Value']],
            body: [
                ['Active Personnel', data.military.personnel],
                ['Reserves', data.military.reserves],
                ['Budget', data.military.budget],
                ['Budget % of GDP', data.military.budgetPercent],
                ['Nuclear Capable', data.military.nuclear ? 'YES' : 'NO'],
                ['ICBMs', data.military.icbm?.toString() || 'N/A']
            ],
            theme: 'grid',
            headStyles: { fillColor: [100, 0, 0] }
        });

        yPos = doc.lastAutoTable.finalY + 10;

        // Economic Overview
        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }

        doc.setFontSize(14);
        doc.text('ECONOMIC OVERVIEW', 20, yPos);
        yPos += 8;

        doc.autoTable({
            startY: yPos,
            head: [['Indicator', 'Value']],
            body: [
                ['Growth Rate', data.economy.growth],
                ['Unemployment', data.economy.unemployment],
                ['Inflation', data.economy.inflation],
                ['Exports', data.economy.exports],
                ['Imports', data.economy.imports],
                ['Currency', data.economy.currency]
            ],
            theme: 'grid',
            headStyles: { fillColor: [0, 100, 0] }
        });

        yPos = doc.lastAutoTable.finalY + 10;

        // Relations
        if (yPos > 230) {
            doc.addPage();
            yPos = 20;
        }

        doc.setFontSize(14);
        doc.text('DIPLOMATIC RELATIONS', 20, yPos);
        yPos += 8;

        doc.autoTable({
            startY: yPos,
            head: [['Type', 'Countries/Organizations']],
            body: [
                ['Allies', data.relations.allies.join(', ')],
                ['Partners', data.relations.partners.join(', ')],
                ['Tensions', data.relations.tensions.join(', ')],
                ['Status', data.relations.status]
            ],
            theme: 'grid',
            headStyles: { fillColor: [0, 0, 100] }
        });

        // Recent Intelligence
        if (data.recentIntel && data.recentIntel.length > 0) {
            doc.addPage();
            yPos = 20;

            doc.setFontSize(14);
            doc.text('RECENT INTELLIGENCE', 20, yPos);
            yPos += 8;

            doc.autoTable({
                startY: yPos,
                head: [['Date', 'Event', 'Priority']],
                body: data.recentIntel.map(intel => [
                    intel.date,
                    intel.event,
                    intel.priority
                ]),
                theme: 'grid',
                headStyles: { fillColor: [100, 50, 0] }
            });
        }

        // Footer
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(150);
            doc.text(
                `Page ${i} of ${pageCount} | CONFIDENTIAL | ThreatIntelligence System`,
                105,
                290,
                { align: 'center' }
            );
        }

        // Save
        doc.save(`${country}_Intelligence_Report_${new Date().toISOString().split('T')[0]}.pdf`);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: 'rgba(0, 20, 40, 0.98)',
                    border: '2px solid #00FFCC',
                    borderRadius: '12px',
                    padding: '32px',
                    maxWidth: '500px',
                    width: '100%'
                }}
            >
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '24px'
                }}>
                    <FileText size={24} color="#00FFCC" />
                    <h2 style={{
                        color: '#00FFCC',
                        fontSize: '20px',
                        fontFamily: 'Orbitron, monospace',
                        margin: 0
                    }}>
                        GENERATE REPORT
                    </h2>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <div style={{
                        color: '#00FFCC',
                        fontSize: '12px',
                        marginBottom: '8px'
                    }}>
                        COUNTRY
                    </div>
                    <div style={{
                        padding: '12px',
                        background: 'rgba(0, 255, 204, 0.1)',
                        border: '1px solid rgba(0, 255, 204, 0.3)',
                        borderRadius: '6px',
                        color: '#00FFCC',
                        fontSize: '14px'
                    }}>
                        {country}
                    </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <div style={{
                        color: '#00FFCC',
                        fontSize: '12px',
                        marginBottom: '8px'
                    }}>
                        DATE RANGE
                    </div>
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px',
                            background: 'rgba(0, 255, 204, 0.05)',
                            border: '1px solid rgba(0, 255, 204, 0.3)',
                            borderRadius: '6px',
                            color: '#00FFCC',
                            fontSize: '14px',
                            fontFamily: 'Orbitron, monospace',
                            outline: 'none'
                        }}
                    >
                        <option value="7">Last 7 Days</option>
                        <option value="30">Last 30 Days</option>
                        <option value="90">Last 90 Days</option>
                        <option value="365">Last Year</option>
                    </select>
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#00FFCC',
                        fontSize: '12px',
                        marginBottom: '8px',
                        cursor: 'pointer'
                    }}>
                        <input
                            type="checkbox"
                            checked={includeAnalytics}
                            onChange={(e) => setIncludeAnalytics(e.target.checked)}
                        />
                        Include Analytics & Charts
                    </label>
                    <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#00FFCC',
                        fontSize: '12px',
                        cursor: 'pointer'
                    }}>
                        <input
                            type="checkbox"
                            checked={includeNews}
                            onChange={(e) => setIncludeNews(e.target.checked)}
                        />
                        Include Recent News
                    </label>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        onClick={onClose}
                        style={{
                            flex: 1,
                            padding: '12px',
                            background: 'rgba(255, 0, 0, 0.1)',
                            border: '1px solid rgba(255, 0, 0, 0.3)',
                            borderRadius: '6px',
                            color: '#FF6B6B',
                            fontSize: '14px',
                            fontFamily: 'Orbitron, monospace',
                            cursor: 'pointer'
                        }}
                    >
                        CANCEL
                    </button>
                    <button
                        onClick={generatePDF}
                        style={{
                            flex: 1,
                            padding: '12px',
                            background: 'rgba(0, 255, 204, 0.2)',
                            border: '1px solid #00FFCC',
                            borderRadius: '6px',
                            color: '#00FFCC',
                            fontSize: '14px',
                            fontFamily: 'Orbitron, monospace',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}
                    >
                        <Download size={16} />
                        GENERATE PDF
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ReportGenerator;
