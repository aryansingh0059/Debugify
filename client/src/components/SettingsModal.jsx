import React from 'react';
import { motion } from 'framer-motion';

const SettingsModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="w-full max-w-sm bg-[#0d1021] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold font-syne text-white">Settings</h2>
            <button 
              onClick={onClose}
              className="text-white/20 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3">
                <span className="text-xl">🌙</span>
                <span className="text-sm font-bold text-white/70">Theme</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-white/40">
                Light <span className="rotate-90">›</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3">
                <span className="text-xl">🌎</span>
                <span className="text-sm font-bold text-white/70">Language</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-white/40">
                Eng <span className="rotate-90">›</span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
             <p className="text-[10px] uppercase font-black tracking-widest text-white/20">Version 1.4.2 — Stable</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsModal;
