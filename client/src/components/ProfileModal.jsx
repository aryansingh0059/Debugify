import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ProfileModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    location: user.location
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="w-full max-w-2xl bg-[#0d1021] border border-white/10 rounded-[2.5rem] shadow-[0_32px_64px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        <div className="p-10 relative">
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors"
          >
            <span className="text-2xl">✕</span>
          </button>

          {/* Header */}
          <div className="flex items-center gap-6 mb-12">
            <div className="relative group">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5 shadow-2xl transition-transform group-hover:scale-105">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-full h-full rounded-[22px] object-cover bg-[#050714]"
                />
              </div>
              <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-black text-sm shadow-xl hover:scale-110 transition-transform">
                ✎
              </button>
            </div>
            <div>
              <h2 className="text-2xl font-bold font-syne text-white capitalize">{user.name}</h2>
              <p className="text-white/40 font-medium">{user.email}</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">Full Name</label>
                <input 
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-medium focus:border-indigo-500/50 focus:bg-white/[0.08] outline-none transition-all placeholder:text-white/10"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">Email Account</label>
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-medium focus:border-indigo-500/50 focus:bg-white/[0.08] outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">Mobile Number</label>
                <input 
                  type="text"
                  value={formData.mobile}
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-medium focus:border-indigo-500/50 focus:bg-white/[0.08] outline-none transition-all"
                  placeholder="Add number"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">Location</label>
                <input 
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-medium focus:border-indigo-500/50 focus:bg-white/[0.08] outline-none transition-all"
                />
              </div>
            </div>

            <div className="pt-6">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(99,102,241,0.4)" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-indigo-600/20"
              >
                Save Change
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileModal;
