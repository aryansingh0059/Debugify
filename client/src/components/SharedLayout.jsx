import React from 'react';
import { motion } from 'framer-motion';
import UnifiedNavbar from './UnifiedNavbar';

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 8 + 6,
  delay: Math.random() * 4,
}));

const FloatingParticles = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {PARTICLES.map((p) => (
      <motion.div
        key={p.id}
        style={{
          position: "absolute",
          left: `${p.x}%`,
          top: `${p.y}%`,
          width: p.size,
          height: p.size,
          borderRadius: "50%",
          background: `rgba(${Math.random() > 0.5 ? "99,102,241" : "139,92,246"},0.4)`,
        }}
        animate={{
          y: [0, -40, 0],
          opacity: [0.2, 0.6, 0.2],
          scale: [1, 1.4, 1],
        }}
        transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
      />
    ))}
  </div>
);

const SharedLayout = ({ children, onNavigate, currentPage, user, onLogout }) => {
  const isAuthPage = currentPage === 'auth';

  return (
    <div className={`min-h-screen bg-[#050714] text-white relative overflow-x-hidden ${isAuthPage ? '' : 'pt-20'}`}>
      <style>{`
        @keyframes gridMove { 0%{background-position:0 0} 100%{background-position:60px 60px} }
      `}</style>
      
      {/* Ambient BG */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 60% at 20% 10%, rgba(99,102,241,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(139,92,246,0.15) 0%, transparent 60%)",
      }} />
      <div className="fixed inset-0 z-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",
        backgroundSize: "60px 60px",
        animation: "gridMove 8s linear infinite",
      }} />

      <FloatingParticles />

      {!isAuthPage && (
        <UnifiedNavbar 
          onNavigate={onNavigate} 
          currentPage={currentPage}
          user={user}
          onLogout={onLogout}
        />
      )}

      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
};

export default SharedLayout;
