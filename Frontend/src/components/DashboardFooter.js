import React from 'react';
import { motion } from 'framer-motion';

const DashboardFooter = () => {
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return (
        <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-[#020617]/80 backdrop-blur-md border-t border-[#00FFCC]/10 py-8 px-4 font-mono z-[100]"
        >
            <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
                {/* Official Text Section */}
                <div className="text-center space-y-1">
                    <p className="text-[#00FFCC]/60 text-[10px] md:text-xs uppercase tracking-wider">
                        Designed, Developed and hosted by <span className="text-[#00FFCC] font-bold">National Informatics Centre</span>,
                    </p>
                    <p className="text-[#00FFCC]/60 text-[10px] md:text-xs uppercase tracking-wider">
                        <span className="text-blue-400">Ministry of Electronics & Information Technology</span>, Government of India
                    </p>
                </div>

                {/* Last Updated Section */}
                <div className="flex items-center gap-2">
                    <span className="text-[#00FFCC]/40 text-[9px] uppercase tracking-[0.2em]">Last Updated:</span>
                    <span className="text-white font-bold text-[10px]">{currentDate}</span>
                </div>

                {/* Logo Sections */}
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mt-4 opacity-80 hover:opacity-100 transition-opacity">
                    {/* SwaaS Badge */}
                    <div className="flex flex-col items-center gap-1 group">
                        <span className="text-[7px] text-[#00FFCC]/40 uppercase font-bold self-start ml-1 leading-none">Powered by</span>
                        <div className="flex items-center bg-white rounded-sm px-3 py-1 scale-110 shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                            <span className="text-black font-black text-lg tracking-tighter">SwaaS</span>
                            <div className="w-1 h-3 bg-amber-500 ml-1 rounded-full animate-bounce" />
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block w-[1px] h-10 bg-white/10" />

                    {/* NIC Badge */}
                    <div className="flex items-center bg-[#0047AB] px-3 py-1 rounded-sm shadow-[0_0_15px_rgba(0,71,171,0.2)]">
                        <div className="flex flex-col leading-none">
                            <span className="text-white font-black text-xl tracking-tighter">NIC</span>
                        </div>
                        <div className="w-[1px] h-6 bg-white/30 mx-2" />
                        <div className="flex flex-col text-[7px] text-white/90 font-bold uppercase leading-tight">
                            <span>National</span>
                            <span>Informatics</span>
                            <span>Centre</span>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block w-[1px] h-10 bg-white/10" />

                    {/* Digital India Badge */}
                    <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 flex items-center justify-center">
                            <div className="absolute inset-0 border-2 border-orange-500 rounded-full border-t-transparent animate-spin-slow" />
                            <div className="absolute inset-1 border-2 border-white rounded-full border-b-transparent animate-reverse-spin" />
                            <div className="absolute inset-2 border-2 border-green-500 rounded-full border-l-transparent animate-spin-fast" />
                            <span className="text-white font-bold text-[8px] z-10 italic">i</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white font-black text-sm tracking-tight leading-none">Digital India</span>
                            <span className="text-[7px] text-white/50 uppercase font-bold tracking-tighter">Power To Empower</span>
                        </div>
                    </div>
                </div>

                {/* Footer Security Note */}
                <div className="mt-4 pt-4 border-t border-[#00FFCC]/5 w-full text-center">
                    <p className="text-[7px] text-[#00FFCC]/20 uppercase tracking-[0.5em]">
                        Classified Intelligence Network — For Official Use Only
                    </p>
                </div>
            </div>
        </motion.footer>
    );
};

export default DashboardFooter;
