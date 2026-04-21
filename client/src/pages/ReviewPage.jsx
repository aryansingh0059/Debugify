import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Editor from '../components/Editor';
import ReviewPanel from '../components/ReviewPanel';
import { useCodeReview } from '../hooks/useCodeReview';

const ReviewPage = ({ 
  code, 
  setCode, 
  language, 
  setLanguage, 
  onBackToLanding 
}) => {
  const { review, loading, error, submitReview } = useCodeReview();

  const handleReviewClick = () => {
    submitReview(code, language);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] text-white overflow-hidden relative">
      <style>{`
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { 
          background: rgba(99, 102, 241, 0.2); 
          border-radius: 10px; 
          border: 1px solid rgba(255,255,255,0.05);
        }
        ::-webkit-scrollbar-thumb:hover { background: rgba(99, 102, 241, 0.4); }
      `}</style>


      {/* Main Content: Split Layout */}
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-1 overflow-hidden relative z-10 p-6 gap-6"
      >
        
        {/* Left Section: Editor */}
        <div className="flex flex-col w-1/2 h-full gap-4">
          <div className="flex-1 overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-white/[0.04] backdrop-blur-2xl relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            {/* Editor Toolbar: Language Dropdown + AI Status */}
            <div className="flex items-center justify-end gap-3 px-4 py-2.5 border-b border-white/5 bg-black/20">
              {/* Language Dropdown */}
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="appearance-none bg-white/5 border border-white/10 text-white/80 text-xs font-semibold rounded-lg pl-3 pr-7 py-1.5 cursor-pointer hover:bg-white/10 hover:border-indigo-500/40 transition-all outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30"
                  style={{ backgroundImage: 'none' }}
                >
                  {[
                    ['javascript', 'JavaScript'],
                    ['typescript', 'TypeScript'],
                    ['python', 'Python'],
                    ['java', 'Java'],
                    ['cpp', 'C++'],
                    ['csharp', 'C#'],
                    ['go', 'Go'],
                    ['rust', 'Rust'],
                    ['php', 'PHP'],
                    ['ruby', 'Ruby'],
                    ['swift', 'Swift'],
                    ['kotlin', 'Kotlin'],
                    ['html', 'HTML'],
                    ['css', 'CSS'],
                    ['sql', 'SQL'],
                    ['bash', 'Bash'],
                  ].map(([val, label]) => (
                    <option key={val} value={val} style={{ background: '#0d0f1e', color: '#fff' }}>
                      {label}
                    </option>
                  ))}
                </select>
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white/30 text-[9px] pointer-events-none">▼</span>
              </div>

              {/* AI Online Badge */}
              <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-2.5 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-semibold text-emerald-400 tracking-wide">AI Online</span>
              </div>
            </div>

            <Editor
              code={code}
              setCode={setCode}
              language={language}
              bugs={review?.bugs || []}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.01, boxShadow: "0 0 32px rgba(99, 102, 241, 0.45)" }}
            whileTap={{ scale: 0.98 }}
            onClick={handleReviewClick}
            disabled={loading || code.trim().length < 10}
            className="w-full relative overflow-hidden group py-5 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 disabled:from-gray-800 disabled:to-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all shadow-xl shadow-indigo-500/10"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="font-syne tracking-wide">Synthesizing Analysis...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <span className="font-syne tracking-widest uppercase text-sm">Review My Code — ⚡</span>
              </div>
            )}
          </motion.button>
        </div>

        {/* Right Section: Results Panel */}
        <div className="w-1/2 h-full rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-3xl shadow-2xl relative">
          <div className="absolute inset-0 bg-gradient-to-tl from-purple-500/10 to-transparent pointer-events-none" />
          <ReviewPanel
            review={review}
            loading={loading}
            error={error}
            onApplyFix={(fix) => setCode(fix)}
          />
        </div>
      </motion.main>

      {/* Footer */}
      <footer className="py-2.5 px-8 border-t border-white/5 bg-black/40 text-[10px] font-medium text-gray-500 flex justify-center uppercase tracking-[0.2em] relative z-10">
        <span>© 2026 Debugify Ecosystem • Infinite Intelligence</span>
      </footer>

      <style jsx="true">{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default ReviewPage;
