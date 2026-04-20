import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Helper component for consistent glassmorphic cards.
 */
const GlassCard = ({ children, title, icon, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl ${className}`}
  >
    {title && (
      <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon && <span className="text-xl">{icon}</span>}
          <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400 font-syne">{title}</h3>
        </div>
      </div>
    )}
    <div className="p-6">
      {children}
    </div>
  </motion.div>
);

const ReviewPanel = ({ review, loading, error, onApplyFix }) => {
  const [appliedIdx, setAppliedIdx] = useState(null);

  const handleApplyFix = (idx, fix) => {
    onApplyFix(fix);
    setAppliedIdx(idx);
    setTimeout(() => setAppliedIdx(null), 2000);
  };
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-indigo-400 font-syne relative z-10">
        <div className="relative w-24 h-24 mb-10">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-[3px] border-indigo-500/10 rounded-full"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 border-[3px] border-purple-500/20 rounded-full"
          />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-[3px] border-t-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.4)]"
          />
          <div className="absolute inset-0 flex items-center justify-center text-2xl">⚡</div>
        </div>
        <div className="space-y-3 text-center">
          <p className="text-xl font-black tracking-[0.3em] uppercase bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Synthesizing Architecture
          </p>
          <p className="text-[10px] text-gray-500 font-medium tracking-widest uppercase opacity-60">
            Deep Scan In Progress • Llama-3.3-70b
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 h-full flex items-center justify-center relative z-10">
        <GlassCard title="System Error" icon="🔴" className="max-w-md w-full border-red-500/30">
          <p className="text-red-400 font-medium font-syne">Something went wrong during analysis. Please check your connection and try again.</p>
        </GlassCard>
      </div>
    );
  }

  if (!review) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-indigo-400 font-syne relative z-10">
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            scale: [1, 1.05, 1],
            filter: ["drop-shadow(0 0 0px rgba(99,102,241,0))", "drop-shadow(0 0 20px rgba(99,102,241,0.4))", "drop-shadow(0 0 0px rgba(99,102,241,0))"]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="text-7xl mb-10 overflow-visible"
        >
          ⚡
        </motion.div>
        <div className="space-y-3 text-center">
          <p className="text-lg font-black tracking-[0.2em] uppercase text-white/40">
            Awaiting Source Code
          </p>
          <p className="text-[10px] text-gray-600 font-medium tracking-widest uppercase max-w-[240px] leading-relaxed mx-auto">
            Input your logic on the left to initiate senior-level AI analysis
          </p>
        </div>
      </div>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 8) return 'from-emerald-400 to-green-500';
    if (score >= 5) return 'from-amber-400 to-orange-500';
    return 'from-rose-400 to-red-500';
  };

  const getSeverityStyles = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return {
          bg: 'bg-rose-500/20',
          border: 'border-rose-500/40',
          text: 'text-rose-400',
          label: 'text-rose-400/60',
          accent: 'bg-rose-500',
          icon: '💀'
        };
      case 'warning':
        return {
          bg: 'bg-amber-500/20',
          border: 'border-amber-500/40',
          text: 'text-amber-400',
          label: 'text-amber-400/60',
          accent: 'bg-amber-500',
          icon: '⚠️'
        };
      case 'info':
        return {
          bg: 'bg-indigo-500/20',
          border: 'border-indigo-500/40',
          text: 'text-indigo-400',
          label: 'text-indigo-400/60',
          accent: 'bg-indigo-500',
          icon: 'ℹ️'
        };
      default:
        return {
          bg: 'bg-gray-500/20',
          border: 'border-gray-500/40',
          text: 'text-gray-400',
          label: 'text-gray-400/60',
          accent: 'bg-gray-500',
          icon: '•'
        };
    }
  };

  return (
    <div className="p-6 space-y-6 h-full overflow-y-auto font-sans relative">
      {/* ─── Language Mismatch Warning ─── */}
      <AnimatePresence>
        {review.languageMismatch && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-4 flex items-center gap-4 mb-6 backdrop-blur-md">
              <span className="text-2xl">🚨</span>
              <div>
                <h4 className="text-rose-400 font-bold text-sm uppercase tracking-wider">Language Mismatch Detected</h4>
                <p className="text-rose-200/80 text-xs mt-1 font-medium">
                  Selected: <span className="text-white font-bold">{review.selectedLanguage}</span> • 
                  Detected: <span className="text-white font-bold">{review.detectedLanguage}</span>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Header Section ─── */}
      <GlassCard className="border-indigo-500/20 shadow-indigo-500/10">
        <div className="flex items-center justify-between gap-6">
          <div className="flex-1">
             <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-400/80 mb-2">Systems Analysis Overview</div>
             <p className="text-xl font-bold font-syne leading-tight text-white mb-2">
               {review.detectedLanguage} Architecture Verification
             </p>
             <p className="text-xs text-gray-500 font-medium tracking-wide">
               Processed by Expert Analysis Engine • Deep Inspection Success
             </p>
          </div>
          <div className="flex flex-col items-center justify-center bg-white/5 rounded-2xl p-4 min-w-[100px] border border-white/5">
            <div className={`text-4xl font-black bg-gradient-to-br ${getScoreColor(review.healthScore)} bg-clip-text text-transparent`}>
              {review.healthScore}
            </div>
            <div className="text-[9px] font-black uppercase tracking-widest text-gray-600">Health Score</div>
          </div>
        </div>
      </GlassCard>

      {/* ─── Complexity Breakdown ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard title="Time Complexity" icon="⏱️" delay={0.1}>
          <div className="space-y-3">
            <div className="text-2xl font-mono text-indigo-100 font-bold bg-white/5 px-3 py-1 rounded-lg border border-white/5 w-fit">
              {review.timeComplexity}
            </div>
            <p className="text-xs text-indigo-200/60 font-medium leading-relaxed italic">
              {review.timeComplexityExplanation}
            </p>
          </div>
        </GlassCard>

        <GlassCard title="Space Complexity" icon="💾" delay={0.2}>
          <div className="space-y-3">
            <div className="text-2xl font-mono text-indigo-100 font-bold bg-white/5 px-3 py-1 rounded-lg border border-white/5 w-fit">
              {review.spaceComplexity}
            </div>
            <p className="text-xs text-indigo-200/60 font-medium leading-relaxed italic">
              {review.spaceComplexityExplanation}
            </p>
          </div>
        </GlassCard>
      </div>

      {/* ─── Defects & Resolutions Grid ─── */}
      <div className="space-y-4 pb-6">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/80 flex items-center gap-3 px-2">
          <span className="w-1 h-4 bg-indigo-500 rounded-full" />
          Stability & Security Audit
        </h3>
        
        <AnimatePresence>
          {review.bugs && review.bugs.length > 0 ? (
            review.bugs.map((bug, idx) => {
              const styles = getSeverityStyles(bug.severity);
              return (
                <motion.div
                  key={`bug-card-${idx}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="grid grid-cols-1 xl:grid-cols-2 gap-4"
                >
                  {/* Bug Description */}
                  <GlassCard className={`border-${bug.severity === 'critical' ? 'rose-500' : bug.severity === 'warning' ? 'amber-500' : 'indigo-500'}/20`}>
                    <div className="flex items-start gap-4">
                      <span className={`w-8 h-8 rounded-xl ${styles.bg} flex items-center justify-center text-lg border ${styles.border}`}>
                        {styles.icon}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div className={`text-[10px] font-black uppercase ${styles.label}`}>
                             {bug.severity} ISSUE • LINE {bug.line}
                          </div>
                        </div>
                        <p className="text-sm font-medium text-white leading-relaxed font-syne">
                          {bug.description}
                        </p>
                      </div>
                    </div>
                  </GlassCard>

                  {/* Fix Recommendation */}
                  <GlassCard className="border-emerald-500/20 bg-emerald-500/[0.02]">
                    <div className="flex items-start gap-4 h-full">
                      <span className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-sm font-bold text-emerald-400 border border-emerald-500/40">
                         ✨
                      </span>
                      <div className="flex-1">
                         <div className="text-[10px] font-black uppercase text-emerald-400/60 mb-2">Recommended Fix</div>
                         <code className="text-[12px] font-mono text-emerald-100 p-2 block bg-black/40 rounded-lg border border-white/5 overflow-x-auto leading-relaxed">
                           {bug.fix}
                         </code>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })
          ) : (
            <GlassCard className="border-emerald-500/20 bg-emerald-500/5 py-12">
              <div className="flex flex-col items-center gap-4">
                 <span className="text-4xl text-emerald-400">✨</span>
                 <p className="text-emerald-400 text-sm font-bold text-center tracking-widest uppercase">
                   Architecture is production-ready. Zero defects identified.
                 </p>
              </div>
            </GlassCard>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ReviewPanel;
