import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";

const FEATURES = [
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

const STATS = [
  { value: "99.8%", label: "Bug Detection Rate" },
  { value: "2.4s", label: "Avg. Review Time" },
  { value: "40+", label: "Languages" },
  { value: "50K+", label: "Devs Onboard" },
];

const CODE_LINES = [
  { text: "function calculateTotal(items) {", color: "#c084fc" },
  { text: "  let total = 0;", color: "#94a3b8" },
  { text: "  for (let i = 0; i <= items.length; i++) {", color: "#f87171", error: true },
  { text: "    total += items[i].price;", color: "#94a3b8" },
  { text: "  }", color: "#94a3b8" },
  { text: "  return total;", color: "#94a3b8" },
  { text: "}", color: "#c084fc" },
];

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 8 + 6,
  delay: Math.random() * 4,
}));

function HeroSubtitle() {
  const [text, setText] = useState("");
  const fullText = "AI-powered code review";
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer = setTimeout(() => {
      handleType();
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, typingSpeed]);

  const handleType = () => {
    const current = text;
    const isFinished = !isDeleting && current === fullText;
    const isDeleted = isDeleting && current === "";

    if (isFinished) {
      setTimeout(() => setIsDeleting(true), 2000);
      setTypingSpeed(100);
    } else if (isDeleted) {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setTypingSpeed(150);
    } else {
      const nextText = isDeleting 
        ? fullText.substring(0, current.length - 1)
        : fullText.substring(0, current.length + 1);
      
      setText(nextText);
      setTypingSpeed(isDeleting ? 50 : 100);
    }
  };

  return (
    <div style={{ 
      fontSize: "clamp(20px, 2.5vw, 32px)", 
      fontWeight: 600, 
      color: "rgba(255,255,255,0.7)", 
      fontFamily: "'Syne', sans-serif",
      minHeight: "1.4em",
      display: "flex",
      alignItems: "center",
      gap: "2px"
    }}>
      <span>{text}</span>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        style={{
          width: "3px",
          height: "0.9em",
          background: "linear-gradient(135deg, #6366f1, #06b6d4)",
          display: "inline-block",
          borderRadius: "2px",
          marginLeft: "4px"
        }}
      />
    </div>
  );
}


function FloatingParticles() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
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
}

function GlassCard({ children, style = {}, hover = true }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 20,
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

function CodePreview() {
  const [activeError, setActiveError] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setActiveError(true), 1200);
    return () => clearTimeout(t1);
  }, []);

  const handleFix = () => {
    setTyping(true);
    setTimeout(() => { setFixed(true); setTyping(false); }, 1400);
  };

  return (
    <GlassCard style={{ padding: 0, overflow: "hidden", width: "100%" }}>
      <div style={{ padding: "12px 16px", background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 8 }}>
        {["#ff5f56", "#ffbd2e", "#27c93f"].map((c, i) => (
          <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
        ))}
        <span style={{ marginLeft: 8, fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>calculate.js</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#6366f1", animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: 11, color: "#6366f1" }}>AI Scanning...</span>
        </div>
      </div>
      <div style={{ padding: "20px 24px", fontFamily: "monospace", fontSize: 13, lineHeight: 1.9 }}>
        {CODE_LINES.map((line, i) => {
          const displayText = line.error && !fixed ? line.text : line.error && fixed ? line.text.replace("<=", "<") : line.text;
          const characters = Array.from(displayText);

          return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            style={{ display: "flex", alignItems: "center", gap: 12, position: "relative" }}
          >
            <span style={{ color: "rgba(255,255,255,0.2)", width: 16, textAlign: "right", userSelect: "none", fontSize: 11 }}>{i + 1}</span>
            <span style={{ color: line.error && !fixed ? "#f87171" : line.error && fixed ? "#4ade80" : line.color, display: "inline-block" }}>
              {characters.map((char, charIdx) => (
                <motion.span
                  key={charIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.05,
                    delay: i * 0.08 + charIdx * 0.02,
                  }}
                  style={{
                    display: "inline-block",
                    whiteSpace: char === " " ? "pre" : "normal",
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
            {line.error && activeError && !fixed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  marginLeft: "auto",
                  background: "rgba(239,68,68,0.15)",
                  border: "1px solid rgba(239,68,68,0.4)",
                  color: "#f87171",
                  fontSize: 11,
                  padding: "2px 8px",
                  borderRadius: 6,
                  whiteSpace: "nowrap",
                }}
              >
                ⚠ Off-by-one error
              </motion.div>
            )}
            {line.error && fixed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  marginLeft: "auto",
                  background: "rgba(74,222,128,0.1)",
                  border: "1px solid rgba(74,222,128,0.3)",
                  color: "#4ade80",
                  fontSize: 11,
                  padding: "2px 8px",
                  borderRadius: 6,
                }}
              >
                ✓ Fixed
              </motion.div>
            )}
          </motion.div>
          );
        })}
      </div>
      <AnimatePresence>
        {activeError && !fixed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{
              margin: "0 16px 16px",
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.25)",
              borderRadius: 12,
              padding: "12px 16px",
            }}
          >
            <div style={{ fontSize: 12, color: "#f87171", fontWeight: 600, marginBottom: 4 }}>🔴 Bug Found: Line 3</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 10 }}>
              Loop condition <code style={{ background: "rgba(255,255,255,0.1)", padding: "1px 5px", borderRadius: 4 }}>i &lt;= items.length</code> causes array index out of bounds. Change to <code style={{ background: "rgba(255,255,255,0.1)", padding: "1px 5px", borderRadius: 4 }}>i &lt; items.length</code>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleFix}
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                border: "none",
                borderRadius: 8,
                padding: "6px 16px",
                color: "#fff",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {typing ? "Applying fix..." : "⚡ Auto-fix"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}

function FeatureCard({ feature, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassCard style={{ padding: "28px 24px", height: "100%" }}>
        <div style={{
          width: 48, height: 48, borderRadius: 14,
          background: `${feature.color}22`,
          border: `1px solid ${feature.color}44`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, marginBottom: 16,
        }}>
          {feature.icon}
        </div>
        <div style={{ fontSize: 16, fontWeight: 600, color: "#fff", marginBottom: 8 }}>{feature.title}</div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{feature.desc}</div>
      </GlassCard>
    </motion.div>
  );
}

export default function LandingPage({ onGetStarted, onLogin, user }) {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -80]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const [navScrolled, setNavScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setNavScrolled(v > 40));
    return unsub;
  }, [scrollY]);

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });

  return (
    <div className="font-sans">


      {/* HERO — Two-column layout */}
      <motion.section style={{ y: heroY, opacity: heroOpacity, position: "relative", zIndex: 1 }}>
        <div style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "120px 8% 100px",
          gap: 60,
          maxWidth: 1400,
          margin: "0 auto",
        }}>

          {/* Left Column: Content */}
          <div style={{ flex: 1.2, textAlign: "left" }}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(99,102,241,0.12)",
                border: "1px solid rgba(99,102,241,0.35)",
                borderRadius: 100, padding: "8px 18px",
                fontSize: 14, color: "#a5b4fc", marginBottom: 36,
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#6366f1", display: "inline-block", animation: "pulse 2s infinite" }} />
              AI-Powered Code Review — Now in Beta
            </motion.div>

            <div style={{ marginBottom: 12 }}>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: "clamp(48px, 6vw, 92px)",
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: "-0.04em",
                  color: "#fff",
                  marginBottom: 10,
                }}
              >
                Ship <span style={{
                  background: "linear-gradient(135deg, #f59e0b, #6366f1)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>10x</span> Faster
              </motion.h1>
              <HeroSubtitle />
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              style={{ fontSize: 17, color: "rgba(255,255,255,0.45)", maxWidth: 480, lineHeight: 1.6, marginBottom: 40 }}
            >
              The industry standard for automated code reviews. Catch bugs before they reach production.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 40 }}
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(99,102,241,0.5)" }}
                whileTap={{ scale: 0.96 }}
                onClick={onGetStarted}
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  border: "none", borderRadius: 14,
                  padding: "16px 36px", color: "#fff",
                  fontSize: 16, fontWeight: 700, cursor: "pointer",
                  boxShadow: "0 0 30px rgba(99,102,241,0.4)",
                }}
              >
                {user ? '⚡ Debug My Code →' : '⚡ Review My Code — Free'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04, background: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.96 }}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 14,
                  padding: "16px 32px", color: "rgba(255,255,255,0.9)",
                  fontSize: 16, fontWeight: 600, cursor: "pointer",
                }}
              >
                ▶ Watch Demo
              </motion.button>
            </motion.div>
          </div>

          {/* Right Column: Code Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{
              flex: 1.0,
              position: "sticky",
              top: 120,
              width: "100%",
              maxWidth: 620,
              height: "fit-content"
            }}
          >
            <div style={{
              position: "absolute", inset: -80,
              background: "radial-gradient(circle at center, rgba(99,102,241,0.2) 0%, transparent 70%)",
              filter: "blur(50px)",
              zIndex: -1,
              pointerEvents: "none",
            }} />
            <CodePreview />
          </motion.div>

        </div>
      </motion.section>

      {/* STATS */}
      <section ref={statsRef} style={{ position: "relative", zIndex: 1, padding: "60px 5%", maxWidth: 1100, margin: "0 auto" }}>
        <GlassCard style={{ padding: "40px 5%", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, textAlign: "center" }} hover={false}>
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
            >
              <div style={{
                fontSize: 38, fontWeight: 800,
                background: "linear-gradient(135deg, #6366f1, #a855f7)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                letterSpacing: "-1.5px", marginBottom: 6,
              }}>{s.value}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", letterSpacing: "0.5px" }}>{s.label}</div>
            </motion.div>
          ))}
        </GlassCard>
      </section>

      {/* FEATURES */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 5%", maxWidth: 1100, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <div style={{
            display: "inline-block",
            fontSize: 12, fontWeight: 600, letterSpacing: 2,
            color: "#8b5cf6", textTransform: "uppercase",
            background: "rgba(139,92,246,0.1)",
            border: "1px solid rgba(139,92,246,0.25)",
            borderRadius: 100, padding: "5px 16px", marginBottom: 20,
          }}>Everything You Need</div>
          <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: 14 }}>
            Built for Modern Developers
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", maxWidth: 480, margin: "0 auto" }}>
            Every tool you need to ship clean, secure, production-ready code — powered by state-of-the-art AI.
          </p>
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16 }}>
          {FEATURES.map((f, i) => <FeatureCard key={i} feature={f} index={i} />)}
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 5% 120px", maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        <GlassCard style={{ padding: "60px 40px" }} hover={false}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ fontSize: 48, marginBottom: 16 }}>🚀</div>
            <h2 style={{ fontSize: "clamp(24px,4vw,40px)", fontWeight: 800, letterSpacing: "-1px", marginBottom: 12 }}>
              Start Shipping<br />Bug-Free Code Today
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", marginBottom: 32 }}>
              Join 50,000+ developers who ship with confidence. No credit card required.
            </p>
            {!submitted ? (
              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 12, padding: "13px 20px",
                    color: "#fff", fontSize: 14, outline: "none",
                    width: 260,
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(99,102,241,0.5)" }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => email && setSubmitted(true)}
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    border: "none", borderRadius: 12,
                    padding: "13px 28px", color: "#fff",
                    fontSize: 14, fontWeight: 700, cursor: "pointer",
                    boxShadow: "0 0 24px rgba(99,102,241,0.3)",
                  }}
                >
                  Get Early Access →
                </motion.button>
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{
                  display: "inline-block",
                  background: "rgba(74,222,128,0.1)",
                  border: "1px solid rgba(74,222,128,0.3)",
                  borderRadius: 12, padding: "14px 32px",
                  color: "#4ade80", fontSize: 15, fontWeight: 600,
                }}
              >
                ✓ You're on the list! We'll be in touch soon.
              </motion.div>
            )}
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", marginTop: 16 }}>
              Free forever plan available · No spam · Cancel anytime
            </p>
          </motion.div>
        </GlassCard>
      </section>

      {/* FOOTER */}
      <footer style={{ position: "relative", zIndex: 1, marginTop: 40 }}>
        <div style={{
          height: 1,
          background: "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.5) 30%, rgba(139,92,246,0.6) 60%, transparent 100%)",
        }} />
        <div style={{
          background: "rgba(255,255,255,0.02)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "72px 6% 0",
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "48px 32px",
            maxWidth: 1100,
            margin: "0 auto 64px",
          }}>
            {/* Brand column */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, flexShrink: 0,
                }}>⚡</div>
                <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px" }}>
                  Debug<span style={{ color: "#6366f1" }}>ify</span>
                </span>
              </div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.8, maxWidth: 280, marginBottom: 28 }}>
                The AI-powered code review platform that catches bugs, security issues, and performance problems before they ship.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                {[
                  { label: "𝕏", title: "Twitter" },
                  { label: "in", title: "LinkedIn" },
                  { label: "gh", title: "GitHub" },
                  { label: "yt", title: "YouTube" },
                ].map((s) => (
                  <motion.div
                    key={s.title}
                    whileHover={{ scale: 1.12, background: "rgba(99,102,241,0.25)" }}
                    title={s.title}
                    style={{
                      width: 36, height: 36, borderRadius: 9,
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.55)",
                      cursor: "pointer", transition: "all 0.2s",
                      userSelect: "none",
                    }}
                  >{s.label}</motion.div>
                ))}
              </div>
            </motion.div>

            {[
              { heading: "Product", links: ["Home", "Features", "Docs", "Blog"] },
              { heading: "Developers", links: ["Documentation", "API Reference", "SDKs", "CLI Tool", "GitHub"] },
              { heading: "Company", links: ["About Us", "Blog", "Careers", "Press Kit", "Contact"] },
            ].map((col, ci) => (
              <motion.div
                key={col.heading}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + ci * 0.08, duration: 0.5 }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#6366f1", marginBottom: 20 }}>{col.heading}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {col.links.map((link) => (
                    <span key={link}
                      style={{ fontSize: 14, color: "rgba(255,255,255,0.42)", cursor: "pointer", transition: "color 0.2s", width: "fit-content" }}
                      onMouseEnter={e => e.target.style.color = "#fff"}
                      onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.42)"}
                    >{link}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Newsletter strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              maxWidth: 1100, margin: "0 auto 48px",
              background: "rgba(99,102,241,0.07)",
              border: "1px solid rgba(99,102,241,0.2)",
              borderRadius: 18, padding: "28px 36px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              gap: 24, flexWrap: "wrap",
            }}
          >
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>🚀 Stay in the loop</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>Get weekly tips, changelogs, and AI debugging insights.</div>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <input type="email" placeholder="dev@yourteam.com" style={{
                background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 10, padding: "11px 18px", color: "#fff", fontSize: 14, outline: "none", width: 220,
              }} />
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(99,102,241,0.45)" }}
                whileTap={{ scale: 0.96 }}
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  border: "none", borderRadius: 10, padding: "11px 22px",
                  color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer",
                }}
              >Subscribe →</motion.button>
            </div>
          </motion.div>

          {/* Language tags */}
          <div style={{ maxWidth: 1100, margin: "0 auto 48px" }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Supports</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["Python", "JavaScript", "TypeScript", "Rust", "Go", "Java", "C++", "Ruby", "PHP", "Swift", "Kotlin", "Scala"].map((lang) => (
                <motion.div key={lang}
                  whileHover={{ scale: 1.06, borderColor: "rgba(99,102,241,0.5)", color: "#a5b4fc" }}
                  style={{
                    fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 100,
                    border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.35)",
                    background: "rgba(255,255,255,0.03)", cursor: "default", transition: "all 0.2s",
                    fontFamily: "'DM Mono', monospace",
                  }}
                >{lang}</motion.div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.06)", padding: "24px 0 28px",
            maxWidth: 1100, margin: "0 auto",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: 14,
          }}>
              © 2026 Debugify, Inc. · All rights reserved · Built with ⚡ for developers worldwide
            <div style={{ display: "flex", gap: 28, fontSize: 13 }}>
              {["Privacy Policy", "Terms of Service", "Cookie Settings", "Security"].map((l) => (
                <span key={l}
                  style={{ color: "rgba(255,255,255,0.28)", cursor: "pointer", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.7)"}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.28)"}
                >{l}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
