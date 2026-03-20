“use client”;
import { useState } from “react”;

const G = {
bg: “#06070A”,
glass: “rgba(255,255,255,0.04)”,
glassBorder: “rgba(255,255,255,0.08)”,
glassHover: “rgba(255,255,255,0.07)”,
text: “#E8E8E3”,
textMuted: “#707070”,
textDim: “#454545”,
aram: “#10B981”,
porul: “#F59E0B”,
inbam: “#8B5CF6”,
conductor: “#3B82F6”,
vibe: “#EC4899”,
anios: “#06B6D4”,
};

export default function ArchDiagram() {
const [active, setActive] = useState(null);
const [view, setView] = useState(“full”); // full, agents, data, marketplace

const layers = {
user: {
label: “User Layer”,
desc: “Mobile PWA, Web App, API endpoints”,
items: [
{ id: “pwa”, label: “Mobile PWA”, sub: “iOS / Android via PWABuilder” },
{ id: “web”, label: “Web App”, sub: “Next.js on Vercel” },
{ id: “ext”, label: “API Gateway”, sub: “REST + WebSocket” },
],
color: G.text,
},
experience: {
label: “Experience Layer”,
desc: “What users see and interact with”,
items: [
{ id: “lifeboard”, label: “LifeBoard”, sub: “Unified dashboard” },
{ id: “vibe”, label: “Vibe Engine”, sub: “Personalization & onboarding”, color: G.vibe },
{ id: “flowstack”, label: “FlowStack”, sub: “Solopreneur automation” },
],
color: G.anios,
},
agents: {
label: “Agent Layer”,
desc: “Specialized AI agents with domain expertise”,
items: [
{ id: “aram-agent”, label: “Aram Agent”, sub: “Health & Wellness”, color: G.aram },
{ id: “porul-agent”, label: “Porul Agent”, sub: “Finance & Productivity”, color: G.porul },
{ id: “inbam-agent”, label: “Inbam Agent”, sub: “Joy & Creativity”, color: G.inbam },
{ id: “conductor”, label: “Conductor”, sub: “Orchestration & routing”, color: G.conductor },
],
color: G.conductor,
},
anios: {
label: “AniOS Runtime”,
desc: “The operating system powering everything”,
items: [
{ id: “orchestrator”, label: “Orchestrator”, sub: “Multi-agent coordination” },
{ id: “memory”, label: “Memory Store”, sub: “User context & preferences” },
{ id: “router”, label: “Intent Router”, sub: “Cross-domain request routing” },
{ id: “eval”, label: “Eval Engine”, sub: “Quality & safety checks” },
],
color: G.anios,
},
infra: {
label: “Infrastructure”,
desc: “AI models, data, payments, deployment”,
items: [
{ id: “llm”, label: “LLM Layer”, sub: “Claude API + OpenAI” },
{ id: “db”, label: “Database”, sub: “Supabase (PostgreSQL)” },
{ id: “stripe”, label: “Payments”, sub: “Stripe Connect” },
{ id: “deploy”, label: “Deploy”, sub: “Vercel + Cloudflare” },
],
color: G.textMuted,
},
marketplace: {
label: “AgentHive Marketplace”,
desc: “Expert workflows, developer integrations”,
items: [
{ id: “workflows”, label: “Expert Workflows”, sub: “Sellable agent routines” },
{ id: “sdk”, label: “Developer SDK”, sub: “Build life-apps on AniOS” },
{ id: “certify”, label: “Certification”, sub: “Verified expert badges” },
],
color: G.inbam,
},
};

const connections = [
{ from: “aram-agent”, to: “conductor”, label: “health signals” },
{ from: “porul-agent”, to: “conductor”, label: “financial context” },
{ from: “inbam-agent”, to: “conductor”, label: “creative energy” },
{ from: “conductor”, to: “orchestrator”, label: “orchestration” },
{ from: “vibe”, to: “memory”, label: “preferences” },
{ from: “lifeboard”, to: “conductor”, label: “user requests” },
{ from: “orchestrator”, to: “llm”, label: “inference” },
{ from: “workflows”, to: “conductor”, label: “marketplace agents” },
];

const dataFlows = [
{ label: “User inputs health data”, path: “PWA → Aram Agent → Memory Store → LifeBoard” },
{ label: “Stress detected, cross-domain”, path: “Aram Agent → Conductor → Porul Agent adjusts tasks → Inbam Agent schedules break” },
{ label: “Expert workflow activated”, path: “AgentHive → Conductor → Domain Agent → User dashboard” },
{ label: “Daily briefing generated”, path: “Memory Store → Conductor → All Agents → LifeBoard → Push notification” },
];

const viewFilters = {
full: null,
agents: [“agents”, “anios”],
data: [“user”, “experience”, “agents”, “anios”, “infra”],
marketplace: [“marketplace”, “agents”, “anios”],
};

const isVisible = (layerKey) => {
if (!viewFilters[view]) return true;
return viewFilters[view].includes(layerKey);
};

const Box = ({ item, layerColor }) => {
const c = item.color || layerColor;
const isActive = active === item.id;
return (
<div
onMouseEnter={() => setActive(item.id)}
onMouseLeave={() => setActive(null)}
onClick={() => setActive(isActive ? null : item.id)}
style={{
flex: “1 1 140px”, padding: “14px 16px”,
background: isActive ? `${c}12` : G.glass,
border: `1px solid ${isActive ? c + "40" : G.glassBorder}`,
borderRadius: 12, cursor: “pointer”,
transition: “all 0.25s ease”,
transform: isActive ? “scale(1.02)” : “scale(1)”,
}}
>
<div style={{ fontFamily: “‘Outfit’, sans-serif”, fontSize: 13, fontWeight: 500, color: isActive ? c : G.text, marginBottom: 3 }}>{item.label}</div>
<div style={{ fontFamily: “‘Outfit’, sans-serif”, fontSize: 11, color: G.textDim }}>{item.sub}</div>
</div>
);
};

const Layer = ({ layerKey, layer }) => {
if (!isVisible(layerKey)) return null;
return (
<div style={{ marginBottom: 12 }}>
<div style={{ display: “flex”, alignItems: “center”, gap: 10, marginBottom: 10 }}>
<div style={{ width: 4, height: 16, background: layer.color, borderRadius: 2 }} />
<span style={{ fontFamily: “‘Outfit’, sans-serif”, fontSize: 12, fontWeight: 600, color: layer.color, letterSpacing: “0.1em”, textTransform: “uppercase” }}>{layer.label}</span>
<span style={{ fontFamily: “‘Outfit’, sans-serif”, fontSize: 11, color: G.textDim }}>— {layer.desc}</span>
</div>
<div style={{ display: “flex”, gap: 8, flexWrap: “wrap” }}>
{layer.items.map(item => <Box key={item.id} item={item} layerColor={layer.color} />)}
</div>
</div>
);
};

return (
<div style={{ fontFamily: “‘Cormorant Garamond’, Georgia, serif”, background: G.bg, color: G.text, minHeight: “100vh”, padding: “32px 16px” }}>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Outfit:wght@300;400;500;600;700&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; } ::selection { background: rgba(16,185,129,0.25); } @media (max-width: 600px) { .view-tabs { flex-wrap: wrap !important; } }`}</style>

```
  <div style={{ maxWidth: 800, margin: "0 auto" }}>
    {/* Header */}
    <div style={{ marginBottom: 32 }}>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: G.anios, marginBottom: 12 }}>System Architecture</div>
      <h1 style={{ fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 10 }}>
        API Platform Architecture
      </h1>
      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: G.textMuted, lineHeight: 1.7 }}>
        Six layers, from user interface to infrastructure. Tap any component to highlight it.
      </p>
    </div>

    {/* View Tabs */}
    <div className="view-tabs" style={{ display: "flex", gap: 6, marginBottom: 28 }}>
      {[
        { key: "full", label: "Full Stack" },
        { key: "agents", label: "Agent System" },
        { key: "data", label: "Data Flow" },
        { key: "marketplace", label: "Marketplace" },
      ].map(v => (
        <button key={v.key} onClick={() => setView(v.key)} style={{
          fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 500,
          padding: "8px 18px", borderRadius: 100, cursor: "pointer",
          border: `1px solid ${view === v.key ? G.anios + "40" : G.glassBorder}`,
          background: view === v.key ? G.anios + "15" : G.glass,
          color: view === v.key ? G.anios : G.textMuted,
          transition: "all 0.2s",
        }}>{v.label}</button>
      ))}
    </div>

    {/* Architecture Layers */}
    <div style={{
      background: G.glass, border: `1px solid ${G.glassBorder}`,
      borderRadius: 20, padding: "24px 20px", marginBottom: 24,
      backdropFilter: "blur(20px)",
    }}>
      {Object.entries(layers).map(([key, layer], i) => (
        <div key={key}>
          <Layer layerKey={key} layer={layer} />
          {i < Object.keys(layers).length - 1 && isVisible(key) && (
            <div style={{ display: "flex", justifyContent: "center", padding: "6px 0" }}>
              <div style={{ width: 1, height: 16, background: `linear-gradient(180deg, ${G.glassBorder}, transparent)` }} />
            </div>
          )}
        </div>
      ))}
    </div>

    {/* Data Flow Examples */}
    {(view === "data" || view === "full") && (
      <div style={{
        background: G.glass, border: `1px solid ${G.glassBorder}`,
        borderRadius: 20, padding: "24px 20px", marginBottom: 24,
      }}>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 600, color: G.porul, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Data Flow Examples</div>
        {dataFlows.map((flow, i) => (
          <div key={i} style={{ padding: "14px 0", borderBottom: i < dataFlows.length - 1 ? `1px solid ${G.glassBorder}` : "none" }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{flow.label}</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: G.anios, letterSpacing: "0.02em" }}>{flow.path}</div>
          </div>
        ))}
      </div>
    )}

    {/* Connection Map */}
    {view === "agents" && (
      <div style={{
        background: G.glass, border: `1px solid ${G.glassBorder}`,
        borderRadius: 20, padding: "24px 20px", marginBottom: 24,
      }}>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 600, color: G.conductor, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Agent Communication Map</div>
        {connections.filter(c => ["aram-agent", "porul-agent", "inbam-agent", "conductor", "orchestrator"].includes(c.from)).map((conn, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0" }}>
            <span style={{
              fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 500,
              color: layers.agents.items.find(a => a.id === conn.from)?.color || G.text,
              minWidth: 90,
            }}>{conn.from.replace("-agent", "").replace("-", " ")}</span>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${G.glassBorder}, ${G.conductor}40, ${G.glassBorder})` }} />
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: G.textDim, minWidth: 100, textAlign: "center" }}>{conn.label}</span>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${G.glassBorder}, ${G.conductor}40, ${G.glassBorder})` }} />
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 500, color: G.conductor, minWidth: 90, textAlign: "right" }}>{conn.to.replace("-", " ")}</span>
          </div>
        ))}
      </div>
    )}

    {/* Tech Stack Summary */}
    <div style={{
      background: G.glass, border: `1px solid ${G.glassBorder}`,
      borderRadius: 20, padding: "24px 20px",
    }}>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 600, color: G.textMuted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Tech Stack</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 8 }}>
        {[
          { label: "Frontend", tech: "Next.js · React · Tailwind", color: G.text },
          { label: "AI / LLM", tech: "Claude API · LangGraph", color: G.aram },
          { label: "Backend", tech: "FastAPI · Supabase", color: G.porul },
          { label: "Payments", tech: "Stripe Connect", color: G.inbam },
          { label: "Deploy", tech: "Vercel · Cloudflare", color: G.anios },
          { label: "Mobile", tech: "PWA · PWABuilder", color: G.vibe },
        ].map(t => (
          <div key={t.label} style={{ padding: "12px 14px", background: `${t.color}06`, border: `1px solid ${t.color}15`, borderRadius: 10 }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 600, color: t.color, marginBottom: 3 }}>{t.label}</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: G.textDim }}>{t.tech}</div>
          </div>
        ))}
      </div>
    </div>

    <div style={{ textAlign: "center", marginTop: 32, fontFamily: "'Outfit', sans-serif", fontSize: 11, color: G.textDim }}>
      API — Aram Porul Inbam · Architecture v1.0 · Powered by AniOS
    </div>
  </div>
</div>
```

);
}
