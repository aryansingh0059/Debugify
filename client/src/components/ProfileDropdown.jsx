import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileDropdown = ({ user, onNavigate, onLogout, onClose }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const menuItems = [
    { label: "My Profile", icon: "👤", action: () => onNavigate('profile') },
    { label: "Settings", icon: "⚙️", action: () => onNavigate('settings') },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute top-16 right-0 w-72 bg-[#0d1021]/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-[1000]"
    >
      {/* Header: User Info */}
      <div className="p-6 border-b border-white/5 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5 mb-4 shadow-xl">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-full h-full rounded-[14px] object-cover bg-[#050714]"
          />
        </div>
        <h3 className="text-lg font-bold text-white font-syne capitalize">{user.name}</h3>
        <p className="text-xs text-white/40 font-medium">{user.email}</p>
      </div>

      {/* Menu Links */}
      <div className="p-2">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => { item.action(); onClose(); }}
            className="w-full flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-all group"
          >
            <div className="flex items-center gap-4">
               <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
               <span className="text-sm font-bold text-white/70 group-hover:text-white transition-colors capitalize">{item.label}</span>
            </div>
            <span className="text-white/20 group-hover:text-white/40 transition-colors">→</span>
          </button>
        ))}

        {/* Notifications with Submenu Toggle */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-full flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-all group"
          >
            <div className="flex items-center gap-4">
               <span className="text-xl group-hover:scale-110 transition-transform">🔔</span>
               <span className="text-sm font-bold text-white/70 group-hover:text-white transition-colors">Notifications</span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-400/10 px-2 py-1 rounded-md">Allow</span>
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="absolute right-[calc(100%+8px)] top-0 w-32 bg-[#1a1d35] border border-white/10 rounded-2xl p-1 shadow-2xl"
              >
                 {['Allow', 'Mute'].map(opt => (
                   <button 
                    key={opt}
                    onClick={() => setShowNotifications(false)}
                    className="w-full p-3 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                   >
                     {opt}
                   </button>
                 ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer: Log Out */}
      <div className="p-2 border-t border-white/5">
        <button
          onClick={() => { onLogout(); onClose(); }}
          className="w-full flex items-center gap-4 p-4 hover:bg-red-500/10 rounded-2xl transition-all group text-red-400"
        >
          <span className="text-xl group-hover:scale-110 transition-transform">↪️</span>
          <span className="text-sm font-bold uppercase tracking-widest">Log Out</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ProfileDropdown;
