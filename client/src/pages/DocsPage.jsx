import React from 'react';
import { motion } from 'framer-motion';

const DocSection = ({ title, content, index }) => (
  <motion.section
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="mb-12"
  >
    <h3 className="text-2xl font-bold text-white mb-6 font-syne flex items-center gap-3">
      <span className="w-1.5 h-6 bg-indigo-500 rounded-full" />
      {title}
    </h3>
    <div className="text-white/60 space-y-4 leading-relaxed font-medium">
      {content}
    </div>
  </motion.section>
);

const DocsPage = () => {
  const sections = [
    {
      title: "Getting Started",
      content: (
        <>
          <p>Debugify is designed to be plug-and-play. No configuration files or complex setup required.</p>
          <ol className="list-decimal list-inside space-y-3 mt-4 text-indigo-100/70 bg-white/5 p-6 rounded-2xl border border-white/10">
            <li>Paste your code snippet into the high-performance editor.</li>
            <li>Select the target environment (Language) from the navigation bar.</li>
            <li>Click <span className="text-indigo-400 font-bold">"Review My Code"</span> to initiate the AI analysis.</li>
            <li>Apply the recommended fixes with a single click.</li>
          </ol>
        </>
      ),
    },
    {
      title: "Strict Analysis Rules",
      content: (
        <>
          <p>Unlike traditional linters, Debugify focuses on **functional integrity**. We prioritize bugs that actually break software:</p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>Memory leaks and buffer overflows.</li>
            <li>Logic flaws and edge-case failures.</li>
            <li>Security vulnerabilities (SQLi, XSS, etc.).</li>
            <li>Undefined behavior and race conditions.</li>
          </ul>
          <p className="mt-4 p-4 bg-amber-500/10 border border-amber-500/20 text-amber-200 text-sm rounded-xl">
             Note: We ignore code style preferences, naming conventions, and cosmetic issues to keep your feedback actionable.
          </p>
        </>
      ),
    },
    {
      title: "Complexity Metrics",
      content: (
        <>
          <p>Our AI calculates Big-O complexity for every submission. We provide:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
             <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                <span className="text-indigo-400 font-bold block mb-1">Time Complexity</span>
                Estimation of how execution time grows with input size.
             </div>
             <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                <span className="text-indigo-400 font-bold block mb-1">Space Complexity</span>
                Estimation of auxiliary memory usage.
             </div>
          </div>
        </>
      ),
    },
    {
      title: "Supported Environments",
      content: (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {["JavaScript", "Python", "C++", "Java", "TypeScript", "Go", "Rust", "Ruby", "PHP", "Swift"].map(lang => (
            <div key={lang} className="p-3 text-center bg-white/5 border border-white/5 rounded-xl text-sm font-mono text-white/40 group-hover:text-white transition-colors">
              {lang}
            </div>
          ))}
        </div>
      ),
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <span className="text-indigo-400 font-bold uppercase tracking-widest text-xs mb-4 block">Documentation</span>
        <h2 className="text-5xl font-extrabold text-white mb-6 font-syne">Documentation Center</h2>
        <p className="text-white/40 text-lg leading-relaxed">
          Master the Debugify engine. Learn how to interpret AI feedback and integrate our scanning into your daily workflow.
        </p>
      </motion.div>

      <div className="space-y-4">
        {sections.map((s, i) => (
          <DocSection key={i} {...s} index={i} />
        ))}
      </div>
    </div>
  );
};

export default DocsPage;
