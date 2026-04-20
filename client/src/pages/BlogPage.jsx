import React from 'react';
import { motion } from 'framer-motion';

const BlogPost = ({ title, category, date, readTime, excerpt, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.6 }}
    className="group bg-white/5 border border-white/10 p-8 rounded-[2rem] backdrop-blur-md hover:bg-white/[0.08] transition-all cursor-pointer flex flex-col"
  >
    <div className="flex items-center gap-3 mb-6">
       <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest rounded-lg">
          {category}
       </span>
       <span className="text-white/20 text-[10px] uppercase font-bold tracking-widest">
          {date} • {readTime}
       </span>
    </div>
    <h3 className="text-2xl font-bold text-white mb-4 font-syne group-hover:text-indigo-400 transition-colors leading-tight">
      {title}
    </h3>
    <p className="text-white/40 text-base leading-relaxed mb-8 flex-1">
      {excerpt}
    </p>
    <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
       Read Full Article <span className="group-hover:translate-x-1 transition-transform">→</span>
    </div>
  </motion.div>
);

const BlogPage = () => {
  const posts = [
    {
      title: "Complexity Metrics: How AI Analyzes Big O Efficiency",
      category: "Engineering",
      date: "APR 15, 2026",
      readTime: "8 MIN READ",
      excerpt: "Go under the hood of our complexity analysis engine. Learn how we use LLMs to predict algorithmic behavior across 40+ languages.",
    },
    {
      title: "Why Strict Bug Reporting Outperforms Standard Linting",
      category: "Trends",
      date: "APR 12, 2026",
      readTime: "5 MIN READ",
      excerpt: "Drowning in naming convention flags? Discover why focusing solely on functional integrity leads to 10x faster shipping cycles.",
    },
    {
      title: "Detecting SQL Injection with AI Pattern Matching",
      category: "Security",
      date: "APR 08, 2026",
      readTime: "12 MIN READ",
      excerpt: "Security vulnerabilities are getting smarter. Learn how Debugify's security audit keeps you 10 steps ahead of potential threats.",
    },
    {
      title: "The Future of Autonomous Code Reviews",
      category: "AI",
      date: "APR 03, 2026",
      readTime: "6 MIN READ",
      excerpt: "Will AI eventually replace manual peer reviews? We explore the symbiotic relationship between humans and machine-led analysis.",
    },
    {
      title: "Announcing Language Mismatch Detection",
      category: "Updates",
      date: "MAR 28, 2026",
      readTime: "3 MIN READ",
      excerpt: "Never waste a scan on the wrong environment again. Our new cross-language detection engine is now live in the latest version.",
    },
    {
      title: "Optimizing Your Engineering Workflow",
      category: "Productivity",
      date: "MAR 22, 2026",
      readTime: "7 MIN READ",
      excerpt: "Tips and tricks for the Debugify ecosystem to help your team ship production-ready code with confidence and speed.",
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <span className="text-indigo-400 font-bold uppercase tracking-widest text-xs mb-4 block">Insights</span>
        <h2 className="text-5xl font-extrabold text-white mb-6 font-syne">Developer Blog</h2>
        <p className="text-white/40 text-lg max-w-2xl mx-auto">
          Deep dives into code quality, AI engineering, and technical best practices.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {posts.map((p, i) => (
          <BlogPost key={i} {...p} index={i} />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
