import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileDropdown from './ProfileDropdown';

const UnifiedNavbar = ({ onNavigate, currentPage, user, onLogout }) => {
  const [showProfile, setShowProfile] = useState(false);
  const navLinks = ["Home", "Features", "Docs", "Blog"];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 py-4 bg-transparent"
    >
      {/* Logo */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onNavigate('landing')}
        className="flex items-center gap-3 group"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
          <span className="text-base group-hover:rotate-12 transition-transform">⚡</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight font-syne text-white">
          Debug<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">ify</span>
        </h1>
      </motion.button>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8 px-6">
        {navLinks.map((item) => (
          <button
            key={item}
            onClick={() => onNavigate(item.toLowerCase() === 'home' ? 'landing' : item.toLowerCase())}
            className={`text-sm font-medium transition-colors ${currentPage === item.toLowerCase() || (currentPage === 'landing' && item === 'Home')
                ? 'text-indigo-400'
                : 'text-white/55 hover:text-white'
              }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Action Area: Debug Button + Member Profile/Guest CTA */}
      <div className="flex items-center gap-4 relative">
        {currentPage !== 'review' && (
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 24px rgba(99,102,241,0.35)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('review')}
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold rounded-xl shadow-lg transition-all"
          >
            Debug Code
          </motion.button>
        )}

        {user && currentPage !== 'review' ? (
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-3 bg-white/5 border border-white/10 p-1 pr-4 rounded-2xl hover:bg-white/10 transition-all group"
            >
              <div className="w-9 h-9 rounded-xl overflow-hidden bg-indigo-500/20 border border-white/10 shadow-lg group-hover:shadow-indigo-500/20 transition-all">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 leading-none mb-1">Account</p>
                <p className="text-xs font-bold text-white/80 group-hover:text-white transition-colors capitalize">{user.name.split(' ')[0]}</p>
              </div>
              <span className={`text-[10px] text-white/20 transition-transform duration-300 ${showProfile ? 'rotate-180' : ''}`}>▼</span>
            </motion.button>

            <AnimatePresence>
              {showProfile && (
                <ProfileDropdown
                  user={user}
                  onNavigate={onNavigate}
                  onLogout={onLogout}
                  onClose={() => setShowProfile(false)}
                />
              )}
            </AnimatePresence>
          </div>
        ) : (
          !user && currentPage === 'landing' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('auth')}
              className="hidden sm:block text-sm font-bold text-white/50 hover:text-white transition-colors px-2"
            >
              Sign In
            </motion.button>
          )
        )}
      </div>
    </motion.nav>
  );
};

export default UnifiedNavbar;
