import React from 'react';
import { motion } from 'framer-motion';

const FeatureDetail = ({ title, description, icon, color, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.6 }}
    className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md hover:bg-white/[0.07] transition-all group"
  >
    <div className={`w-14 h-14 rounded-2xl bg-${color}/20 border border-${color}/40 flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-4 font-syne capitalize">{title}</h3>
    <p className="text-white/50 text-base leading-relaxed">{description}</p>
  </motion.div>
);

const FeaturesPage = () => {
  const features = [
    {
      title: "AI Code Analysis",
      description: "Our advanced Llama-3.3-70b powered engine performs senior-level architectural reviews in under 3 seconds. It prioritizes functional logic over styling, ensuring your core business logic is sound.",
      icon: "🧠",
      color: "indigo-500",
    },
    {
      title: "Security & Vulnerability",
      description: "Automatic detection of SQLi, XSS, Buffer Overflows and 200+ security patterns. We don't just find bugs; we evaluate the security posture of your entire application.",
      icon: "🔐",
      color: "rose-500",
    },
    {
      title: "Performance Metrics",
      description: "Real-time Time and Space complexity analysis with technical justifications. Optimize your Big-O efficiency while you write, not after you deploy.",
      icon: "📊",
      color: "emerald-500",
    },
    {
      title: "One-Click Auto Fix",
      description: "Generate instant patches for detected bugs with detailed explanations. High-quality code injection directly into your editor, saving hours of manual debugging.",
      icon: "⚡",
      color: "amber-500",
    },
    {
      title: "Multi-Language Sync",
      description: "Supports 40+ languages with environment-aware analysis. Our language mismatch detection ensures you're always analyzing the right syntax for your project.",
      icon: "🌐",
      color: "sky-500",
    },
    {
      title: "Strict Functional Focus",
      description: "Debugify ignores naming conventions and style preferences to focus solely on what matters: code that works, doesn't crash, and is secure.",
      icon: "🎯",
      color: "fuchsia-500",
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <span className="text-indigo-400 font-bold uppercase tracking-widest text-xs mb-4 block">Capabilities</span>
        <h2 className="text-5xl font-extrabold text-white mb-6 font-syne">Built for High-Velocity Engineering</h2>
        <p className="text-white/40 text-lg max-w-2xl mx-auto">
          Every tool you need to ship clean, secure, and production-ready code — powered by state-of-the-art AI.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <FeatureDetail key={i} {...f} index={i} />
        ))}
      </div>

      {/* Interactive Demo Section Placeholder */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-24 p-12 bg-indigo-600/10 border border-indigo-500/20 rounded-[3rem] text-center"
      >
        <h3 className="text-3xl font-bold mb-6 font-syne">Experience 10x Faster Development</h3>
        <p className="text-white/60 mb-10 max-w-xl mx-auto">
          Debugify isn't just a linter. It's an automated senior engineer that reviews every line of code as you write it.
        </p>
        <button className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20">
          Try Debugify Now — Free
        </button>
      </motion.div>
    </div>
  );
};

export default FeaturesPage;
