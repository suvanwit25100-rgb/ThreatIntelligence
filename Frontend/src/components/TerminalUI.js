import React from 'react';
import { Shield, Radio, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const TerminalUI = ({ selectedCountry }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex flex-col justify-between p-8">
      <div className="flex justify-between items-start">
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="p-5 border border-[#00FFCC]/40 bg-black/70 backdrop-blur-xl w-80 pointer-events-auto shadow-[0_0_20px_rgba(0,255,204,0.1)]"
        >
          <div className="flex items-center gap-3 mb-4 border-b border-[#00FFCC]/40 pb-3 text-[#00FFCC]">
            <Shield size={20} className="glow-text" />
            <h2 className="text-sm font-bold tracking-widest uppercase glow-text">Intelligence_Dossier</h2>
          </div>
          
          <div className="space-y-5">
            <div>
              <p className="text-[10px] opacity-40 uppercase tracking-tighter text-[#00FFCC]">Target_Entity</p>
              <p className="text-xl text-[#00FFCC] font-mono glow-text">{selectedCountry || "GLOBAL_SCAN"}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 border border-[#00FFCC]/20 bg-[#00FFCC]/5">
                <p className="text-[9px] opacity-40 text-[#00FFCC]">THREAT_LVL</p>
                <p className="text-sm text-[#FF4C4C] font-bold">CRITICAL</p>
              </div>
              <div className="p-3 border border-[#00FFCC]/20 bg-[#00FFCC]/5">
                <p className="text-[9px] opacity-40 text-[#00FFCC]">STABILITY</p>
                <p className="text-sm text-[#00FFCC]">42.8%</p>
              </div>
            </div>

            <div className="text-[11px] leading-relaxed opacity-60 text-[#00FFCC] font-mono">
              <p className="flex items-center gap-2"><Activity size={12}/> Monitoring chokepoints...</p>
              <p className="flex items-center gap-2"><Activity size={12}/> Analysis: kinetic risk high</p>
              <p className="flex items-center gap-2"><Activity size={12}/> Deploying OSINT sensors...</p>
            </div>
          </div>
        </motion.div>

        <div className="p-4 border border-[#00FFCC]/40 bg-black/70 backdrop-blur-xl text-right pointer-events-auto shadow-[0_0_20px_rgba(0,255,204,0.1)]">
          <div className="flex items-center justify-end gap-3">
            <span className="text-[10px] font-bold text-[#00FFCC] glow-text tracking-widest">SECURE_LINE: ACTIVE</span>
            <div className="w-2 h-2 bg-[#00FFCC] rounded-full animate-pulse shadow-[0_0_8px_#00FFCC]" />
          </div>
          <p className="text-[10px] mt-1 opacity-40 text-[#00FFCC]">NODE: RA-01-BENGALURU</p>
        </div>
      </div>

      <div className="w-full h-14 border-t border-[#00FFCC]/40 bg-black/90 backdrop-blur-2xl pointer-events-auto flex items-center px-10 overflow-hidden">
        <div className="flex items-center gap-5 text-[#FF4C4C] animate-pulse mr-12">
          <Radio size={22} />
          <span className="text-xs font-black tracking-widest uppercase">Live_Signals:</span>
        </div>
        <div className="marquee-content whitespace-nowrap text-xs flex gap-16 text-[#00FFCC] font-mono tracking-wider">
          <span>&gt; [ALERT] UNUSUAL_TROOP_MOVEMENT_DETECTED_NEAR_BORDER_SECTOR_4</span>
          <span>&gt; [SIGNAL] CYBER_EXFILTRATION_ATTEMPT_ON_POWER_GRID_MINISTRY</span>
          <span>&gt; [OSINT] SUDDEN_TONE_DROP_IN_REGIONAL_NEWS_OUTLETS_DETECTED</span>
          <span>&gt; [SAT] ORBITAL_REVISIT_CONFIRMED: KH-11_SURVEILLANCE_TRANSIT</span>
        </div>
      </div>
    </div>
  );
};

export default TerminalUI;