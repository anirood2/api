“use client”;
import { useState, useEffect } from “react”;
import { AramDemo, PorulDemo, InbamDemo, DemoKeyframes } from “./AnimatedDemos”;

const PAGES = {
home: “home”,
about: “about”,
modules: “modules”,
aram: “aram”,
porul: “porul”,
inbam: “inbam”,
pricing: “pricing”,
agenthive: “agenthive”,
blog: “blog”,
contact: “contact”,
careers: “careers”,
};

const MODULES = [
{
id: “aram”, name: “Aram”, tamil: “அறம்”, meaning: “Virtue”,
domain: “Health & Wellness”, icon: “◯”, color: “#10B981”,
tagline: “Your health, understood.”,
desc: “AI agents that interpret lab results, track vitals, build nutrition plans, monitor sleep patterns, and detect early health risks — all personalized to your body.”,
features: [“Lab result interpretation”, “Personalized nutrition plans”, “Sleep & stress monitoring”, “Early risk detection”, “Medication reminders”, “Mental health check-ins”],
videoId: “dQw4w9WgXcQ”,
},
{
id: “porul”, name: “Porul”, tamil: “பொருள்”, meaning: “Wealth”,
domain: “Finance & Productivity”, icon: “△”, color: “#F59E0B”,
tagline: “Your wealth, amplified.”,
desc: “Smart budgeting, investment insights, tax optimization, and workflow automation — designed for solopreneurs and professionals who want their money working as hard as they do.”,
features: [“Automated budgeting”, “Investment insights”, “Tax optimization”, “Invoice management”, “Cash flow forecasting”, “Business workflow automation”],
videoId: “dQw4w9WgXcQ”,
},
{
id: “inbam”, name: “Inbam”, tamil: “இன்பம்”, meaning: “Joy”,
domain: “Creativity & Life”, icon: “◇”, color: “#8B5CF6”,
tagline: “Your joy, cultivated.”,
desc: “Content creation tools, creative project management, personalized entertainment curation, and life journaling — because a meaningful life needs more than just health and wealth.”,
features: [“Content idea generation”, “Creative project tracker”, “Entertainment curation”, “Life journaling”, “Social media automation”, “Hobby & skill tracking”],
videoId: “dQw4w9WgXcQ”,
},
];

const G = {
bg: “#06070A”,
surface: “rgba(255,255,255,0.03)”,
glass: “rgba(255,255,255,0.04)”,
glassBorder: “rgba(255,255,255,0.08)”,
glassHover: “rgba(255,255,255,0.07)”,
text: “#E8E8E3”,
textMuted: “#707070”,
textDim: “#454545”,
aram: “#10B981”,
porul: “#F59E0B”,
inbam: “#8B5CF6”,
accent: “#10B981”,
};

export default function APIApp() {
const [page, setPage] = useState(PAGES.home);
const [scrollY, setScrollY] = useState(0);
const [menuOpen, setMenuOpen] = useState(false);
const [email, setEmail] = useState(””);
const [submitted, setSubmitted] = useState(false);
const [mounted, setMounted] = useState(false);
const [archUnlocked, setArchUnlocked] = useState(false);
const [archPw, setArchPw] = useState(””);
const [archError, setArchError] = useState(false);

useEffect(() => { setMounted(true); }, []);
useEffect(() => {
const h = () => setScrollY(window.scrollY);
window.addEventListener(“scroll”, h);
return () => window.removeEventListener(“scroll”, h);
}, []);
useEffect(() => { window.scrollTo(0, 0); setMenuOpen(false); }, [page]);

const nav = (p) => (e) => { e.preventDefault(); setPage(p); };
const submit = () => { if (email) { setSubmitted(true); setEmail(””); setTimeout(() => setSubmitted(false), 3000); } };

const Glass = ({ children, style, hover, onClick, …props }) => {
const [h, setH] = useState(false);
return (
<div
onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} onClick={onClick}
style={{
background: h && hover ? G.glassHover : G.glass,
border: `1px solid ${G.glassBorder}`,
backdropFilter: “blur(20px)”, WebkitBackdropFilter: “blur(20px)”,
borderRadius: 16, transition: “all 0.3s ease”, …style,
}} {…props}
>{children}</div>
);
};

const Btn = ({ children, primary, style, onClick }) => (
<button onClick={onClick} style={{
fontFamily: “‘Outfit’, sans-serif”, fontSize: 14, fontWeight: 500, letterSpacing: “0.02em”,
padding: “12px 28px”, border: primary ? “none” : `1px solid ${G.glassBorder}`,
borderRadius: 100, cursor: “pointer”, transition: “all 0.3s ease”,
background: primary ? G.accent : “rgba(255,255,255,0.04)”,
color: primary ? “#000” : G.text, backdropFilter: “blur(12px)”,
…style,
}}>{children}</button>
);

const SectionLabel = ({ children, color }) => (
<div style={{ fontFamily: “‘Outfit’, sans-serif”, fontSize: 11, letterSpacing: “0.25em”, textTransform: “uppercase”, color: color || G.textMuted, marginBottom: 16 }}>{children}</div>
);

const PageTitle = ({ children, sub }) => (
<div style={{ marginBottom: 48 }}>
<h1 style={{ fontSize: “clamp(32px, 6vw, 56px)”, fontWeight: 300, letterSpacing: “-0.03em”, lineHeight: 1.1, marginBottom: sub ? 16 : 0 }}>{children}</h1>
{sub && <p style={{ fontFamily: “‘Outfit’, sans-serif”, fontSize: 16, color: G.textMuted, lineHeight: 1.7, maxWidth: 500 }}>{sub}</p>}
</div>
);

// ─── NAV ───
const Nav = () => (
<nav style={{
position: “fixed”, top: 0, left: 0, right: 0, zIndex: 100,
background: scrollY > 20 ? “rgba(6,7,10,0.85)” : “transparent”,
backdropFilter: scrollY > 20 ? “blur(24px)” : “none”,
WebkitBackdropFilter: scrollY > 20 ? “blur(24px)” : “none”,
borderBottom: scrollY > 20 ? `1px solid ${G.glassBorder}` : “1px solid transparent”,
transition: “all 0.4s ease”,
}}>
<div style={{ maxWidth: 1100, margin: “0 auto”, padding: “18px 24px”, display: “flex”, justifyContent: “space-between”, alignItems: “center” }}>
<a href=”#” onClick={nav(PAGES.home)} style={{ textDecoration: “none”, color: G.text, display: “flex”, alignItems: “baseline”, gap: 10 }}>
<span style={{ fontSize: 22, fontWeight: 300, letterSpacing: “0.15em” }}>API</span>
<span style={{ fontSize: 10, fontFamily: “‘Outfit’, sans-serif”, color: G.textDim, letterSpacing: “0.15em”, textTransform: “uppercase” }}>Aram · Porul · Inbam</span>
</a>
<div className=“dsk-nav” style={{ display: “flex”, gap: 28, alignItems: “center” }}>
{[
{ label: “Modules”, p: PAGES.modules },
{ label: “Pricing”, p: PAGES.pricing },
{ label: “AgentHive”, p: PAGES.agenthive },
{ label: “About”, p: PAGES.about },
].map(n => (
<a key={n.label} href=”#” onClick={nav(n.p)} style={{
fontFamily: “‘Outfit’, sans-serif”, fontSize: 13, color: page === n.p ? G.text : G.textMuted,
textDecoration: “none”, transition: “color 0.2s”, letterSpacing: “0.02em”,
}}>{n.label}</a>
))}
<Btn primary onClick={nav(PAGES.home)}>Early Access</Btn>
</div>
<button className=“mob-nav” onClick={() => setMenuOpen(!menuOpen)} style={{
display: “none”, background: “none”, border: “none”, color: G.text,
fontSize: 20, cursor: “pointer”, padding: 4,
}}>{menuOpen ? “✕” : “☰”}</button>
</div>
{menuOpen && (
<div style={{ padding: “8px 24px 24px”, background: “rgba(6,7,10,0.95)”, backdropFilter: “blur(24px)” }}>
{[“Modules”, “Pricing”, “AgentHive”, “About”, “Blog”, “Contact”].map(n => (
<a key={n} href=”#” onClick={nav(PAGES[n.toLowerCase()] || PAGES.home)} style={{
display: “block”, padding: “14px 0”, fontFamily: “‘Outfit’, sans-serif”, fontSize: 15,
color: G.textMuted, textDecoration: “none”, borderBottom: `1px solid ${G.glassBorder}`,
}}>{n}</a>
))}
</div>
)}
</nav>
);

// ─── FOOTER ───
const Footer = () => (
<footer style={{ padding: “64px 24px 40px”, borderTop: `1px solid ${G.glassBorder}` }}>
<div style={{ maxWidth: 1100, margin: “0 auto” }}>
<div className=“ft-grid” style={{ display: “grid”, gridTemplateColumns: “1.5fr 1fr 1fr 1fr”, gap: 48, marginBottom: 48 }}>
<div>
<div style={{ fontSize: 20, fontWeight: 300, letterSpacing: “0.15em”, marginBottom: 12 }}>API</div>
<p style={{ fontFamily: “‘Outfit’, sans-serif”, fontSize: 13, color: G.textDim, lineHeight: 1.7, maxWidth: 260 }}>
The AI-powered life operating system. Inspired by the Thirukkural — virtue, wealth, and joy in balance.
</p>
<p style={{ fontFamily: “‘Outfit’, sans-serif”, fontSize: 11, color: G.textDim, marginTop: 16 }}>Powered by AniOS</p>
</div>
{[
{ title: “Product”, links: [[“Aram”, PAGES.aram], [“Porul”, PAGES.porul], [“Inbam”, PAGES.inbam], [“AgentHive”, PAGES.agenthive], [“Pricing”, PAGES.pricing]] },
{ title: “Company”, links: [[“About”, PAGES.about], [“Blog”, PAGES.blog], [“Careers”, PAGES.careers], [“Contact”, PAGES.contact]] },
{ title: “Legal”, links: [[“Privacy”, PAGES.home], [“Terms”, PAGES.home], [“Cookies”, PAGES.home]] },
].map(col => (
<div key={col.title}>
<div style={{ fontFamily: “‘Outfit’, sans-serif”, fontSize: 11, fontWeight: 600, color: G.textDim, letterSpacing: “0.15em”, textTransform: “uppercase”, marginBottom: 16 }}>{col.title}</div>
{col.links.map(([label, p]) => (
<a key={label} href=”#” onClick={nav(p)} style={{ display: “block”, fontFamily: “‘Outfit’, sans-serif”, fontSize: 13, color: G.textMuted, textDecoration: “none”, padding: “5px 0”, transition: “color 0.2s” }}>{label}</a>
))}
</div>
))}
</div>
<div style={{ borderTop: `1px solid ${G.glassBorder}`, paddingTop: 24, display: “flex”, justifyContent: “space-between”, flexWrap: “wrap”, gap: 8, fontFamily: “‘Outfit’, sans-serif”, fontSize: 11, color: G.textDim }}>
<span>© 2026 API — Aram Porul Inbam. All rights reserved.</span>
<span>Founded by Anirudh Ravikumar</span>
</div>
</div>
</footer>
);

const EmailCapture = ({ dark }) => (
<div style={{ display: “flex”, gap: 10, maxWidth: 420, flexWrap: “wrap” }}>
<input value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === “Enter” && submit()}
placeholder=“you@email.com” style={{
flex: 1, minWidth: 200, fontFamily: “‘Outfit’, sans-serif”, fontSize: 14,
padding: “12px 20px”, border: `1px solid ${G.glassBorder}`, borderRadius: 100,
background: G.glass, color: G.text, outline: “none”, backdropFilter: “blur(12px)”,
}} />
<Btn primary onClick={submit}>{submitted ? “✓ Joined” : “Join Waitlist”}</Btn>
</div>
);

// ═══════════════════════════════════
// PAGES
// ═══════════════════════════════════

const HomePage = () => (
<>
{/* HERO */}
<section style={{ minHeight: “100vh”, display: “flex”, alignItems: “center”, padding: “120px 24px 80px”, position: “relative”, overflow: “hidden” }}>
<div style={{ position: “absolute”, width: 500, height: 500, borderRadius: “50%”, background: “radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)”, top: “-10%”, right: “-10%”, pointerEvents: “none” }} />
<div style={{ position: “absolute”, width: 400, height: 400, borderRadius: “50%”, background: “radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)”, bottom: “10%”, left: “-5%”, pointerEvents: “none” }} />

```
    <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
      <div style={{ maxWidth: 680 }}>
        <SectionLabel color={G.accent}>The AI Life Operating System</SectionLabel>
        <h1 className={mounted ? "hero-in" : ""} style={{
          fontSize: "clamp(40px, 7vw, 72px)", fontWeight: 300, letterSpacing: "-0.04em",
          lineHeight: 1.05, marginBottom: 28,
        }}>
          Virtue. Wealth.<br />
          <span style={{ color: G.accent }}>Joy.</span>
        </h1>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(15px, 2vw, 18px)", color: G.textMuted, lineHeight: 1.8, maxWidth: 480, marginBottom: 40 }}>
          Three pillars from the ancient Thirukkural, unified by AI agents that collaborate to optimize your entire life. Health, finances, and creativity — connected.
        </p>
        <EmailCapture />
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: G.textDim, marginTop: 12 }}>Free to start · No credit card required</p>
      </div>
    </div>
  </section>

  {/* THREE PILLARS — MINIMAL */}
  <section style={{ padding: "80px 24px" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <div className="pill-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {MODULES.map(m => (
          <Glass key={m.id} hover onClick={nav(PAGES[m.id])} style={{ padding: "36px 28px", cursor: "pointer" }}>
            <div style={{ fontSize: 11, fontFamily: "'Outfit', sans-serif", letterSpacing: "0.2em", textTransform: "uppercase", color: m.color, marginBottom: 20 }}>{m.tamil}</div>
            <h3 style={{ fontSize: 28, fontWeight: 300, letterSpacing: "-0.02em", marginBottom: 6 }}>{m.name}</h3>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: G.textDim, marginBottom: 16 }}>{m.meaning} · {m.domain}</div>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: G.textMuted, lineHeight: 1.7 }}>{m.tagline}</p>
            <div style={{ marginTop: 20, fontFamily: "'Outfit', sans-serif", fontSize: 12, color: m.color, display: "flex", alignItems: "center", gap: 6 }}>
              Explore <span style={{ fontSize: 14 }}>→</span>
            </div>
          </Glass>
        ))}
      </div>
    </div>
  </section>

  {/* HOW AGENTS WORK — CLEAN */}
  <section style={{ padding: "80px 24px" }}>
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <SectionLabel>How It Works</SectionLabel>
      <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 300, letterSpacing: "-0.03em", marginBottom: 48 }}>
        Agents that think<br />together.
      </h2>
      {[
        { n: "01", t: "Set your vibe", d: "Choose your priorities — health, finance, creativity, or all three. The system adapts to you." },
        { n: "02", t: "Agents activate", d: "Specialized AI agents spin up for each domain, learning your patterns and preferences." },
        { n: "03", t: "Cross-domain intelligence", d: "Your health data informs your schedule. Your stress levels adjust your financial decisions. Everything connects through AniOS." },
        { n: "04", t: "Grow with the marketplace", d: "Browse AgentHive for expert-built workflows — a nutritionist's plan, a CPA's tax strategy, a coach's routine." },
      ].map((s, i) => (
        <div key={s.n} style={{ display: "flex", gap: 24, padding: "28px 0", borderBottom: i < 3 ? `1px solid ${G.glassBorder}` : "none" }}>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: G.accent, fontWeight: 500, minWidth: 28 }}>{s.n}</span>
          <div>
            <h4 style={{ fontSize: 18, fontWeight: 400, marginBottom: 6 }}>{s.t}</h4>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: G.textMuted, lineHeight: 1.7 }}>{s.d}</p>
          </div>
        </div>
      ))}
    </div>
  </section>

  {/* AGENT VIS */}
  <section style={{ padding: "60px 24px" }}>
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <Glass style={{ padding: "40px 32px", textAlign: "center" }}>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: G.textMuted, marginBottom: 24 }}>Agent Orchestration · Live</div>
        <div className="pill-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
          {[
            { name: "Aram", status: "Monitoring vitals", c: G.aram },
            { name: "Porul", status: "Tracking budget", c: G.porul },
            { name: "Inbam", status: "Planning weekend", c: G.inbam },
          ].map(a => (
            <div key={a.name} style={{ padding: "20px 12px", background: `${a.c}08`, border: `1px solid ${a.c}15`, borderRadius: 12 }}>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{a.name}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: a.c }}>{a.status}</div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: G.textDim, fontStyle: "italic", lineHeight: 1.6 }}>
          "Stressful week ahead — Aram adjusts meals, Porul postpones invoices, Inbam schedules a creative break."
        </div>
      </Glass>
    </div>
  </section>

  {/* FINAL CTA */}
  <section style={{ padding: "100px 24px", textAlign: "center" }}>
    <div style={{ maxWidth: 500, margin: "0 auto" }}>
      <h2 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 300, letterSpacing: "-0.03em", marginBottom: 16 }}>Begin.</h2>
      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: G.textMuted, lineHeight: 1.7, marginBottom: 36 }}>
        Join the waitlist and be among the first to experience what happens when ancient wisdom meets agentic AI.
      </p>
      <div style={{ display: "flex", justifyContent: "center" }}><EmailCapture /></div>
    </div>
  </section>
</>
```

);

// ─── ABOUT PAGE ───
const AboutPage = () => {
const checkArch = () => {
if (archPw === “api2019”) { setArchUnlocked(true); setArchError(false); }
else { setArchError(true); }
};

```
const ArchPreview = () => (
  <div style={{ position: "relative", marginBottom: 48 }}>
    <h3 style={{ fontSize: 22, fontWeight: 400, marginBottom: 16 }}>Platform Architecture</h3>
    <div style={{ position: "relative", borderRadius: 16, overflow: "hidden" }}>
      {/* Blurred architecture preview */}
      <div style={{
        filter: archUnlocked ? "none" : "blur(8px)",
        transition: "filter 0.5s ease",
        pointerEvents: archUnlocked ? "auto" : "none",
      }}>
        <Glass style={{ padding: "24px 20px" }}>
          {[
            { label: "User Layer", desc: "Mobile PWA · Web App · API Gateway", color: G.text },
            { label: "Experience Layer", desc: "LifeBoard · Vibe Engine · FlowStack", color: "#06B6D4" },
            { label: "Agent Layer", desc: "Aram Agent · Porul Agent · Inbam Agent · Conductor", color: "#3B82F6" },
            { label: "AniOS Runtime", desc: "Orchestrator · Memory Store · Intent Router · Eval Engine", color: "#06B6D4" },
            { label: "Infrastructure", desc: "Claude API · Supabase · Stripe Connect · Vercel", color: G.textMuted },
            { label: "AgentHive Marketplace", desc: "Expert Workflows · Developer SDK · Certification", color: G.inbam },
          ].map((layer, i) => (
            <div key={layer.label}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 4, height: 14, background: layer.color, borderRadius: 2 }} />
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 600, color: layer.color, letterSpacing: "0.1em", textTransform: "uppercase" }}>{layer.label}</span>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: i < 5 ? 16 : 0, paddingBottom: i < 5 ? 16 : 0, borderBottom: i < 5 ? "1px solid " + G.glassBorder : "none" }}>
                {layer.desc.split(" · ").map(item => (
                  <span key={item} style={{
                    fontFamily: "'Outfit', sans-serif", fontSize: 12, color: G.textMuted,
                    padding: "6px 14px", borderRadius: 8, background: G.glass, border: "1px solid " + G.glassBorder,
                  }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
          {archUnlocked && (
            <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid " + G.glassBorder }}>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 600, color: G.porul, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Data Flow Examples</div>
              {[
                { label: "Health input flow", path: "PWA → Aram Agent → Memory Store → LifeBoard" },
                { label: "Cross-domain stress response", path: "Aram Agent → Conductor → Porul adjusts tasks → Inbam schedules break" },
                { label: "Marketplace activation", path: "AgentHive → Conductor → Domain Agent → User dashboard" },
                { label: "Daily briefing", path: "Memory Store → Conductor → All Agents → LifeBoard → Push notification" },
              ].map((flow, i) => (
                <div key={i} style={{ padding: "10px 0", borderBottom: i < 3 ? "1px solid " + G.glassBorder : "none" }}>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 500, marginBottom: 3 }}>{flow.label}</div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: "#06B6D4" }}>{flow.path}</div>
                </div>
              ))}
              <div style={{ marginTop: 16 }}>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 600, color: G.textMuted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Tech Stack</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 6 }}>
                  {[
                    { label: "Frontend", tech: "Next.js · React", color: G.text },
                    { label: "AI / LLM", tech: "Claude API · LangGraph", color: G.aram },
                    { label: "Backend", tech: "FastAPI · Supabase", color: G.porul },
                    { label: "Payments", tech: "Stripe Connect", color: G.inbam },
                    { label: "Deploy", tech: "Vercel · Cloudflare", color: "#06B6D4" },
                    { label: "Mobile", tech: "PWA · PWABuilder", color: "#EC4899" },
                  ].map(t => (
                    <div key={t.label} style={{ padding: "10px 12px", background: t.color + "06", border: "1px solid " + t.color + "15", borderRadius: 8 }}>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 600, color: t.color }}>{t.label}</div>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: G.textDim }}>{t.tech}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Glass>
      </div>

      {/* Password overlay - shown when locked */}
      {!archUnlocked && (
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(6,7,10,0.4)", borderRadius: 16,
        }}>
          <div style={{ textAlign: "center", maxWidth: 300 }}>
            <div style={{ fontSize: 20, marginBottom: 8 }}>🔒</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Restricted Access</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: G.textMuted, marginBottom: 16 }}>Enter access code to view full architecture</div>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="password" value={archPw}
                onChange={e => { setArchPw(e.target.value); setArchError(false); }}
                onKeyDown={e => e.key === "Enter" && checkArch()}
                placeholder="Access code"
                style={{
                  flex: 1, fontFamily: "'Outfit', sans-serif", fontSize: 13,
                  padding: "10px 16px", border: "1px solid " + (archError ? "#EF4444" : G.glassBorder),
                  borderRadius: 100, background: "rgba(6,7,10,0.8)", color: G.text,
                  outline: "none", textAlign: "center",
                }}
              />
              <button onClick={checkArch} style={{
                fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 500,
                padding: "10px 20px", border: "none", borderRadius: 100, cursor: "pointer",
                background: G.accent, color: "#000",
              }}>Unlock</button>
            </div>
            {archError && <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "#EF4444", marginTop: 8 }}>Incorrect code</div>}
          </div>
        </div>
      )}
    </div>
  </div>
);

return (
<section style={{ padding: "140px 24px 80px" }}>
  <div style={{ maxWidth: 800, margin: "0 auto" }}>
    <SectionLabel color={G.accent}>About</SectionLabel>
    <PageTitle sub="The story behind API — Aram Porul Inbam.">The origin.</PageTitle>

    <div style={{ marginBottom: 48 }}>
      <h3 style={{ fontSize: 22, fontWeight: 400, marginBottom: 16 }}>The Inspiration</h3>
      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: G.textMuted, lineHeight: 1.8, marginBottom: 20 }}>
        Over 2,000 years ago, the Tamil poet-philosopher Thiruvalluvar composed the Thirukkural — 1,330 couplets distilling the art of living into three pillars: <strong style={{ color: G.aram }}>Aram</strong> (virtue), <strong style={{ color: G.porul }}>Porul</strong> (wealth), and <strong style={{ color: G.inbam }}>Inbam</strong> (joy). It remains one of the most translated non-religious works in human history.
      </p>
      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: G.textMuted, lineHeight: 1.8, marginBottom: 20 }}>
        API was born from a simple realization: modern life is fragmented across dozens of disconnected tools — a fitness tracker here, a budgeting app there, a to-do list elsewhere. None of them talk to each other. The Thirukkural taught that a meaningful life requires all three pillars in balance. API makes that possible with AI.
      </p>
      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: G.textMuted, lineHeight: 1.8 }}>
        Founded in March 2026, API is the world's first agentic AI platform that unifies health, wealth, and creativity into a single intelligent system — where specialized AI agents collaborate across domains to deliver holistic, personalized guidance.
      </p>
    </div>

    <Glass style={{ padding: "36px 32px", marginBottom: 48 }}>
      <SectionLabel>Founder</SectionLabel>
      <h3 style={{ fontSize: 28, fontWeight: 300, letterSpacing: "-0.02em", marginBottom: 8 }}>Anirudh Ravikumar</h3>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: G.accent, marginBottom: 20 }}>Founder & CEO · Builder · AI-Native Product Leader</div>
      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: G.textMuted, lineHeight: 1.8, marginBottom: 16 }}>
        Anirudh brings 19+ years of product and technology leadership across fintech, payments, B2B SaaS, cloud infrastructure, and data governance. His career has spanned some of the most impactful organizations in technology and finance.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
        {[
          { role: "Chief of Staff to CTO", co: "Capital One" },
          { role: "Senior Product Leader", co: "Atlassian" },
          { role: "Product & Technology", co: "Convera" },
          { role: "Technology Leadership", co: "Fannie Mae" },
        ].map(r => (
          <div key={r.co} style={{ padding: "12px 16px", background: G.glass, borderRadius: 10, border: `1px solid ${G.glassBorder}` }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 500, color: G.text }}>{r.co}</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: G.textDim }}>{r.role}</div>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: G.textMuted, lineHeight: 1.8, marginBottom: 16 }}>
        Credentials include an MS from Virginia Tech, AWS Developer Associate certification, and Six Sigma Black Belt. Anirudh is also an active builder — creating children's content platforms, enterprise AI quality tools, and consumer web products in his spare time.
      </p>
      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: G.textMuted, lineHeight: 1.8 }}>
        API represents the convergence of his technical depth, product instincts, and cultural heritage — a platform that brings Tamil philosophical wisdom into the AI age.
      </p>
    </Glass>

    <div style={{ marginBottom: 48 }}>
      <h3 style={{ fontSize: 22, fontWeight: 400, marginBottom: 16 }}>The Name</h3>
      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: G.textMuted, lineHeight: 1.8, marginBottom: 16 }}>
        "API" stands for Aram Porul Inbam — the three books of the Thirukkural. In technology, API means "Application Programming Interface," the connective tissue between systems. Our name carries both meanings: the ancient wisdom that guides our mission, and the technical architecture that powers it.
      </p>
      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: G.textMuted, lineHeight: 1.8 }}>
        The runtime engine powering the platform is called <strong style={{ color: G.text }}>AniOS</strong> — a nod to the founder's name and the "operating system" vision for managing your entire life.
      </p>
    </div>

    <ArchPreview />
  </div>
</section>
);
```

};

// ─── MODULES PAGE ───
const ModulesPage = () => (
<section style={{ padding: “140px 24px 80px” }}>
<div style={{ maxWidth: 900, margin: “0 auto” }}>
<SectionLabel>Modules</SectionLabel>
<PageTitle sub="Three pillars. Three AI-powered products. One unified platform.">The three pillars.</PageTitle>
<div style={{ display: “flex”, flexDirection: “column”, gap: 24 }}>
{MODULES.map(m => (
<Glass key={m.id} hover onClick={nav(PAGES[m.id])} style={{ padding: “36px 32px”, cursor: “pointer”, display: “flex”, gap: 32, alignItems: “flex-start”, flexWrap: “wrap” }}>
<div style={{ flex: “1 1 300px” }}>
<div style={{ fontSize: 11, fontFamily: “‘Outfit’, sans-serif”, letterSpacing: “0.2em”, color: m.color, marginBottom: 12 }}>{m.tamil} · {m.meaning.toUpperCase()}</div>
<h3 style={{ fontSize: 32, fontWeight: 300, letterSpacing: “-0.02em”, marginBottom: 8 }}>{m.name}</h3>
<p style={{ fontFamily: “‘Outfit’, sans-serif”, fontSize: 14, color: G.textMuted, lineHeight: 1.8, marginBottom: 16 }}>{m.desc}</p>
<span style={{ fontFamily: “‘Outfit’, sans-serif”, fontSize: 13, color: m.color }}>View demo & details →</span>
</div>
<div style={{ flex: “1 1 250px”, display: “flex”, flexWrap: “wrap”, gap: 8 }}>
{m.features.map(f => (
<span key={f} style={{
fontFamily: “‘Outfit’, sans-serif”, fontSize: 12, color: G.textMuted,
padding: “6px 14px”, borderRadius: 100, border: `1px solid ${G.glassBorder}`, background: G.glass,
}}>{f}</span>
))}
</div>
</Glass>
))}
</div>
</div>
</section>
);

// ─── INDIVIDUAL MODULE PAGE ───
const ModulePage = ({ mod }) => (
<section style={{ padding: “140px 24px 80px” }}>
<div style={{ maxWidth: 800, margin: “0 auto” }}>
<SectionLabel color={mod.color}>{mod.tamil} · {mod.meaning}</SectionLabel>
<PageTitle sub={mod.desc}>{mod.name}</PageTitle>

```
    {/* Interactive Animated Demo */}
    <DemoKeyframes />
    {mod.id === "aram" && <AramDemo />}
    {mod.id === "porul" && <PorulDemo />}
    {mod.id === "inbam" && <InbamDemo />}

    <h3 style={{ fontSize: 22, fontWeight: 400, marginBottom: 24 }}>Features</h3>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginBottom: 48 }}>
      {mod.features.map((f, i) => (
        <Glass key={f} style={{ padding: "20px 20px" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: mod.color, marginBottom: 6 }}>0{i + 1}</div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: G.text }}>{f}</div>
        </Glass>
      ))}
    </div>

    <h3 style={{ fontSize: 22, fontWeight: 400, marginBottom: 16 }}>How {mod.name} connects</h3>
    <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: G.textMuted, lineHeight: 1.8, marginBottom: 16 }}>
      {mod.name} doesn't work in isolation. Through AniOS, it communicates with the other two pillars in real-time. Your {mod.name === "Aram" ? "health data informs your financial and creative decisions" : mod.name === "Porul" ? "financial status adjusts your wellness priorities and creative bandwidth" : "creative energy and joy metrics inform your health and productivity goals"}.
    </p>

    <div style={{ marginTop: 40, display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Btn primary onClick={nav(PAGES.home)}>Get Early Access</Btn>
      <Btn onClick={nav(PAGES.modules)}>← All Modules</Btn>
    </div>
  </div>
</section>
```

);

// ─── PRICING PAGE ───
const PricingPage = () => (
<section style={{ padding: “140px 24px 80px” }}>
<div style={{ maxWidth: 950, margin: “0 auto” }}>
<SectionLabel color={G.porul}>Pricing</SectionLabel>
<PageTitle sub="Start free. Scale when you're ready.">Simple, honest pricing.</PageTitle>
<div className=“pill-grid” style={{ display: “grid”, gridTemplateColumns: “repeat(3, 1fr)”, gap: 16 }}>
{[
{ tier: “Free”, price: “$0”, period: “forever”, features: [“1 module of your choice”, “Basic LifeBoard”, “1 AI agent”, “Community access”], accent: G.textMuted, pop: false },
{ tier: “Pro”, price: “$14.99”, period: “/mo”, features: [“All 3 modules”, “Vibe Engine”, “FlowStack basics”, “5 agent workflows”, “Priority AI”], accent: G.accent, pop: true },
{ tier: “Premium”, price: “$29.99”, period: “/mo”, features: [“Everything in Pro”, “AgentHive access”, “Unlimited workflows”, “Custom agents”, “Priority support”], accent: G.inbam, pop: false },
].map(p => (
<Glass key={p.tier} style={{ padding: “32px 28px”, position: “relative”, border: p.pop ? `1px solid ${G.accent}30` : undefined, background: p.pop ? `${G.accent}05` : undefined }}>
{p.pop && <div style={{ position: “absolute”, top: -10, left: “50%”, transform: “translateX(-50%)”, background: G.accent, color: “#000”, fontFamily: “‘Outfit’, sans-serif”, fontSize: 10, fontWeight: 600, padding: “3px 14px”, borderRadius: 100, letterSpacing: “0.1em”, textTransform: “uppercase” }}>Popular</div>}
<div style={{ fontFamily: “‘Outfit’, sans-serif”, fontSize: 11, fontWeight: 600, color: p.accent, letterSpacing: “0.15em”, textTransform: “uppercase”, marginBottom: 16 }}>{p.tier}</div>
<div style={{ display: “flex”, alignItems: “baseline”, gap: 4, marginBottom: 24 }}>
<span style={{ fontSize: 40, fontWeight: 300 }}>{p.price}</span>
<span style={{ fontFamily: “‘Outfit’, sans-serif”, fontSize: 13, color: G.textDim }}>{p.period}</span>
</div>
{p.features.map(f => (
<div key={f} style={{ fontFamily: “‘Outfit’, sans-serif”, fontSize: 13, color: G.textMuted, padding: “7px 0”, borderBottom: `1px solid ${G.glassBorder}`, display: “flex”, gap: 8 }}>
<span style={{ color: p.accent, fontSize: 12 }}>✓</span>{f}
</div>
))}
<div style={{ marginTop: 20 }}>
<Btn primary={p.pop} style={{ width: “100%”, textAlign: “center” }}>{p.tier === “Free” ? “Get Started” : “Subscribe”}</Btn>
</div>
</Glass>
))}
</div>
<Glass style={{ padding: “28px 32px”, marginTop: 24, display: “flex”, justifyContent: “space-between”, alignItems: “center”, flexWrap: “wrap”, gap: 16 }}>
<div>
<div style={{ fontFamily: “‘Outfit’, sans-serif”, fontSize: 14, fontWeight: 500 }}>Enterprise</div>
<div style={{ fontFamily: “‘Outfit’, sans-serif”, fontSize: 13, color: G.textMuted }}>Custom agents, SSO, SLA, dedicated support — for teams and organizations.</div>
</div>
<Btn onClick={nav(PAGES.contact)}>Contact Sales</Btn>
</Glass>
</div>
</section>
);

// ─── AGENTHIVE PAGE ───
const AgentHivePage = () => (
<section style={{ padding: “140px 24px 80px” }}>
<div style={{ maxWidth: 800, margin: “0 auto” }}>
<SectionLabel color={G.inbam}>Marketplace</SectionLabel>
<PageTitle sub="The first marketplace where experts sell AI agent workflows. A nutritionist's meal plan. A CPA's tax strategy. A coach's morning routine. All powered by AI.">AgentHive</PageTitle>

```
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginBottom: 48 }}>
      {[
        { title: "For Experts", desc: "Sell your expertise as automated AI workflows. Reach thousands of users without 1:1 sessions.", icon: "◯" },
        { title: "For Users", desc: "Browse and activate expert-built agent workflows. One click to add a nutritionist, trainer, or advisor to your API.", icon: "△" },
        { title: "For Developers", desc: "Build custom integrations and life-apps on the AniOS platform. Monetize your code.", icon: "◇" },
      ].map(c => (
        <Glass key={c.title} style={{ padding: "28px 24px" }}>
          <div style={{ fontSize: 20, marginBottom: 12, color: G.textMuted }}>{c.icon}</div>
          <h4 style={{ fontSize: 16, fontWeight: 400, marginBottom: 8 }}>{c.title}</h4>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: G.textMuted, lineHeight: 1.7 }}>{c.desc}</p>
        </Glass>
      ))}
    </div>

    <h3 style={{ fontSize: 22, fontWeight: 400, marginBottom: 16 }}>How it works</h3>
    {[
      { n: "01", t: "Experts create workflows", d: "Package your expertise into repeatable AI agent routines — meal plans, investment strategies, fitness programs, creative frameworks." },
      { n: "02", t: "Users browse & activate", d: "Discover workflows by category, rating, and expert credentials. One-tap activation adds them to your API dashboard." },
      { n: "03", t: "Agents execute", d: "The workflow's AI agents run daily — adapting to the user's data, preferences, and cross-module intelligence from AniOS." },
      { n: "04", t: "Revenue flows", d: "Experts earn on every activation. API takes 18% marketplace fee. Users get professional-grade guidance at a fraction of the cost." },
    ].map((s, i) => (
      <div key={s.n} style={{ display: "flex", gap: 24, padding: "24px 0", borderBottom: i < 3 ? `1px solid ${G.glassBorder}` : "none" }}>
        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: G.inbam, fontWeight: 500, minWidth: 28 }}>{s.n}</span>
        <div>
          <h4 style={{ fontSize: 16, fontWeight: 400, marginBottom: 6 }}>{s.t}</h4>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: G.textMuted, lineHeight: 1.7 }}>{s.d}</p>
        </div>
      </div>
    ))}

    <div style={{ marginTop: 40 }}><Btn primary onClick={nav(PAGES.home)}>Join the Waitlist →</Btn></div>
  </div>
</section>
```

);

// ─── BLOG PAGE ───
const BlogPage = () => (
<section style={{ padding: “140px 24px 80px” }}>
<div style={{ maxWidth: 800, margin: “0 auto” }}>
<SectionLabel>Blog</SectionLabel>
<PageTitle sub="Thoughts on AI, the Thirukkural, building in public, and the future of personal technology.">Writing.</PageTitle>
{[
{ title: “Why I Named My Startup After a 2,000-Year-Old Tamil Text”, date: “March 19, 2026”, tag: “Origin Story”, color: G.accent },
{ title: “The Case for Multi-Agent AI in Personal Life Management”, date: “Coming Soon”, tag: “Technology”, color: G.porul },
{ title: “From Chief of Staff to CTO → Solo Founder: Lessons Learned”, date: “Coming Soon”, tag: “Founder Journey”, color: G.inbam },
].map((post, i) => (
<Glass key={i} hover style={{ padding: “28px 28px”, marginBottom: 12, cursor: “pointer” }}>
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “flex-start”, flexWrap: “wrap”, gap: 8 }}>
<div>
<span style={{ fontFamily: “‘Outfit’, sans-serif”, fontSize: 11, color: post.color, letterSpacing: “0.1em”, textTransform: “uppercase” }}>{post.tag}</span>
<h3 style={{ fontSize: 18, fontWeight: 400, marginTop: 6 }}>{post.title}</h3>
</div>
<span style={{ fontFamily: “‘Outfit’, sans-serif”, fontSize: 12, color: G.textDim }}>{post.date}</span>
</div>
</Glass>
))}
</div>
</section>
);

// ─── CONTACT PAGE ───
const ContactPage = () => (
<section style={{ padding: “140px 24px 80px” }}>
<div style={{ maxWidth: 600, margin: “0 auto” }}>
<SectionLabel>Contact</SectionLabel>
<PageTitle sub="Reach out for partnerships, enterprise inquiries, press, or just to say hello.">Get in touch.</PageTitle>
<Glass style={{ padding: “32px 28px” }}>
{[“Name”, “Email”, “Message”].map(field => (
<div key={field} style={{ marginBottom: 20 }}>
<label style={{ fontFamily: “‘Outfit’, sans-serif”, fontSize: 12, color: G.textMuted, display: “block”, marginBottom: 6 }}>{field}</label>
{field === “Message” ? (
<textarea rows={5} style={{
width: “100%”, fontFamily: “‘Outfit’, sans-serif”, fontSize: 14,
padding: “12px 16px”, border: `1px solid ${G.glassBorder}`, borderRadius: 12,
background: G.glass, color: G.text, outline: “none”, resize: “vertical”,
}} />
) : (
<input style={{
width: “100%”, fontFamily: “‘Outfit’, sans-serif”, fontSize: 14,
padding: “12px 16px”, border: `1px solid ${G.glassBorder}`, borderRadius: 12,
background: G.glass, color: G.text, outline: “none”,
}} />
)}
</div>
))}
<Btn primary style={{ width: “100%” }}>Send Message</Btn>
</Glass>
</div>
</section>
);

// ─── CAREERS PAGE ───
const CareersPage = () => (
<section style={{ padding: “140px 24px 80px” }}>
<div style={{ maxWidth: 700, margin: “0 auto” }}>
<SectionLabel>Careers</SectionLabel>
<PageTitle sub="We're just getting started. If you're excited about building the future of AI-powered life management, we'd love to hear from you.">Build with us.</PageTitle>
<Glass style={{ padding: “28px 28px”, marginBottom: 16 }}>
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “center”, flexWrap: “wrap”, gap: 12 }}>
<div>
<h4 style={{ fontSize: 16, fontWeight: 400, marginBottom: 4 }}>Full-Stack Engineer</h4>
<div style={{ fontFamily: “‘Outfit’, sans-serif”, fontSize: 12, color: G.textMuted }}>Remote · Starting Month 3</div>
</div>
<span style={{ fontFamily: “‘Outfit’, sans-serif”, fontSize: 11, color: G.accent, padding: “4px 12px”, borderRadius: 100, border: `1px solid ${G.accent}30`, background: `${G.accent}10` }}>Upcoming</span>
</div>
</Glass>
<Glass style={{ padding: “28px 28px”, marginBottom: 16 }}>
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “center”, flexWrap: “wrap”, gap: 12 }}>
<div>
<h4 style={{ fontSize: 16, fontWeight: 400, marginBottom: 4 }}>Growth Marketer</h4>
<div style={{ fontFamily: “‘Outfit’, sans-serif”, fontSize: 12, color: G.textMuted }}>Remote · Starting Month 6</div>
</div>
<span style={{ fontFamily: “‘Outfit’, sans-serif”, fontSize: 11, color: G.porul, padding: “4px 12px”, borderRadius: 100, border: `1px solid ${G.porul}30`, background: `${G.porul}10` }}>Planned</span>
</div>
</Glass>
<p style={{ fontFamily: “‘Outfit’, sans-serif”, fontSize: 14, color: G.textMuted, marginTop: 32, lineHeight: 1.7 }}>
Don’t see your role? Reach out anyway — we value builders who believe in the mission.
</p>
<div style={{ marginTop: 20 }}><Btn onClick={nav(PAGES.contact)}>Get in Touch</Btn></div>
</div>
</section>
);

// ═══════════════════════════════════
// RENDER
// ═══════════════════════════════════
const renderPage = () => {
switch (page) {
case PAGES.home: return <HomePage />;
case PAGES.about: return <AboutPage />;
case PAGES.modules: return <ModulesPage />;
case PAGES.aram: return <ModulePage mod={MODULES[0]} />;
case PAGES.porul: return <ModulePage mod={MODULES[1]} />;
case PAGES.inbam: return <ModulePage mod={MODULES[2]} />;
case PAGES.pricing: return <PricingPage />;
case PAGES.agenthive: return <AgentHivePage />;
case PAGES.blog: return <BlogPage />;
case PAGES.contact: return <ContactPage />;
case PAGES.careers: return <CareersPage />;
default: return <HomePage />;
}
};

return (
<div style={{ fontFamily: “‘Cormorant Garamond’, Georgia, serif”, background: G.bg, color: G.text, minHeight: “100vh” }}>
<style>{`
@import url(‘https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Outfit:wght@300;400;500;600;700&display=swap’);
* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
::selection { background: rgba(16,185,129,0.25); }

```
    @keyframes heroIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    .hero-in { animation: heroIn 1s ease-out forwards; }

    @media (max-width: 768px) {
      .dsk-nav { display: none !important; }
      .mob-nav { display: flex !important; }
      .pill-grid { grid-template-columns: 1fr !important; }
      .ft-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
    }
    @media (min-width: 769px) {
      .mob-nav { display: none !important; }
    }

    input:focus, textarea:focus { border-color: ${G.accent} !important; }
    input::placeholder { color: #404040; }

    a:hover { color: ${G.text} !important; }
  `}</style>
  <Nav />
  {renderPage()}
  <Footer />
</div>
```

);
}