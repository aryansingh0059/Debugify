export const FEATURES = [
  {
    icon: "⚡",
    title: "Instant Bug Detection",
    desc: "AI scans your code in milliseconds, identifying syntax errors, logic flaws, and edge cases before they reach production.",
    color: "#6366f1",
  },
  {
    icon: "🧠",
    title: "Deep Code Understanding",
    desc: "Context-aware analysis understands your entire codebase, not just isolated snippets.",
    color: "#8b5cf6",
  },
  {
    icon: "🔐",
    title: "Security Vulnerability Scanner",
    desc: "Detects SQL injections, XSS, CSRF, and 200+ security patterns automatically.",
    color: "#06b6d4",
  },
  {
    icon: "📊",
    title: "Performance Profiling",
    desc: "Spots inefficient loops, memory leaks, and algorithmic bottlenecks with fix suggestions.",
    color: "#10b981",
  },
  {
    icon: "🔁",
    title: "Auto-Fix Suggestions",
    desc: "One-click patch generation with explanations so your team learns as they ship.",
    color: "#f59e0b",
  },
  {
    icon: "🌐",
    title: "Multi-Language Support",
    desc: "Python, JavaScript, TypeScript, Go, Rust, Java, C++ — 40+ languages supported.",
    color: "#ec4899",
  },
];

export const STATS = [
  { value: "99.8%", label: "Bug Detection Rate" },
  { value: "2.4s", label: "Avg. Review Time" },
  { value: "40+", label: "Languages" },
  { value: "50K+", label: "Devs Onboard" },
];

export const CODE_LINES = [
  { text: "function calculateTotal(items) {", color: "#c084fc" },
  { text: "  let total = 0;", color: "#94a3b8" },
  { text: "  for (let i = 0; i <= items.length; i++) {", color: "#f87171", error: true },
  { text: "    total += items[i].price;", color: "#94a3b8" },
  { text: "  }", color: "#94a3b8" },
  { text: "  return total;", color: "#94a3b8" },
  { text: "}", color: "#c084fc" },
];

export const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 8 + 6,
  delay: Math.random() * 4,
}));
