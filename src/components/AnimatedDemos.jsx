“use client”;
import { useState, useEffect, useRef } from “react”;

// ═══════════════════════════════════════════
// SHARED CONSTANTS & HELPERS
// ═══════════════════════════════════════════
const G = {
bg: “#06070A”,
surface: “rgba(255,255,255,0.03)”,
glass: “rgba(255,255,255,0.04)”,
glassBorder: “rgba(255,255,255,0.08)”,
text: “#E8E8E3”,
textMuted: “#707070”,
textDim: “#454545”,
aram: “#10B981”,
porul: “#F59E0B”,
inbam: “#8B5CF6”,
};

const font = (size, weight = 400, color = G.text) => ({
fontFamily: “‘Outfit’, sans-serif”,
fontSize: size,
fontWeight: weight,
color,
});

const glassCard = (extra = {}) => ({
background: G.glass,
border: `1px solid ${G.glassBorder}`,
backdropFilter: “blur(20px)”,
WebkitBackdropFilter: “blur(20px)”,
borderRadius: 12,
…extra,
});

// ═══════════════════════════════════════════
// ANIMATED DEMO WRAPPER
// ═══════════════════════════════════════════
const DemoShell = ({ color, steps, moduleName }) => {
const [activeStep, setActiveStep] = useState(0);
const [isPlaying, setIsPlaying] = useState(false);
const [hasStarted, setHasStarted] = useState(false);
const timerRef = useRef(null);

useEffect(() => {
if (isPlaying) {
timerRef.current = setInterval(() => {
setActiveStep((prev) => {
if (prev >= steps.length - 1) {
setIsPlaying(false);
return prev;
}
return prev + 1;
});
}, 2800);
}
return () => clearInterval(timerRef.current);
}, [isPlaying, steps.length]);

const play = () => {
setActiveStep(0);
setIsPlaying(true);
setHasStarted(true);
};

const restart = () => {
clearInterval(timerRef.current);
setActiveStep(0);
setIsPlaying(false);
setHasStarted(false);
};

return (
<div style={{
…glassCard({ padding: 4, overflow: “hidden” }),
marginBottom: 48,
}}>
<div style={{
position: “relative”,
borderRadius: 10,
overflow: “hidden”,
background: `linear-gradient(145deg, ${G.bg}, ${color}06)`,
minHeight: 420,
}}>
{/* Top bar */}
<div style={{
display: “flex”,
justifyContent: “space-between”,
alignItems: “center”,
padding: “16px 20px 12px”,
borderBottom: `1px solid ${G.glassBorder}`,
}}>
<div style={{ display: “flex”, alignItems: “center”, gap: 10 }}>
<div style={{
width: 8, height: 8, borderRadius: “50%”,
background: isPlaying ? color : G.textDim,
boxShadow: isPlaying ? `0 0 8px ${color}60` : “none”,
transition: “all 0.4s ease”,
}} />
<span style={font(11, 500, G.textMuted)}>
{moduleName} · Interactive Demo
</span>
</div>
<div style={{ display: “flex”, gap: 6 }}>
{steps.map((_, i) => (
<div key={i} style={{
width: i === activeStep ? 20 : 6,
height: 6,
borderRadius: 3,
background: i <= activeStep && hasStarted ? color : G.glassBorder,
transition: “all 0.4s ease”,
}} />
))}
</div>
</div>

```
    {/* Demo content area */}
    <div style={{ padding: "28px 24px 24px", minHeight: 340 }}>
      {!hasStarted ? (
        /* Play button overlay */
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 300,
          gap: 20,
        }}>
          <div
            onClick={play}
            style={{
              width: 80, height: 80,
              borderRadius: "50%",
              background: `${color}15`,
              border: `2px solid ${color}40`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${color}25`;
              e.currentTarget.style.transform = "scale(1.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `${color}15`;
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <span style={{ fontSize: 28, marginLeft: 4, color }}>▶</span>
          </div>
          <span style={font(13, 400, G.textMuted)}>
            See how {moduleName} works
          </span>
        </div>
      ) : (
        /* Animated steps */
        <div>
          {steps.map((step, i) => (
            <div
              key={i}
              style={{
                opacity: i === activeStep ? 1 : 0,
                transform: i === activeStep ? "translateY(0)" : "translateY(12px)",
                transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                position: i === activeStep ? "relative" : "absolute",
                pointerEvents: i === activeStep ? "auto" : "none",
              }}
            >
              {i === activeStep && step.render(color)}
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Bottom controls */}
    {hasStarted && (
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 20px 16px",
        borderTop: `1px solid ${G.glassBorder}`,
      }}>
        <span style={font(11, 400, G.textDim)}>
          Step {activeStep + 1} of {steps.length}
        </span>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={restart}
            style={{
              ...font(11, 500, G.textMuted),
              background: "none",
              border: `1px solid ${G.glassBorder}`,
              borderRadius: 100,
              padding: "6px 14px",
              cursor: "pointer",
            }}
          >
            Restart
          </button>
          {!isPlaying && activeStep < steps.length - 1 && (
            <button
              onClick={() => {
                setIsPlaying(true);
              }}
              style={{
                ...font(11, 500, "#000"),
                background: color,
                border: "none",
                borderRadius: 100,
                padding: "6px 14px",
                cursor: "pointer",
              }}
            >
              Continue
            </button>
          )}
        </div>
      </div>
    )}
  </div>
</div>
```

);
};

// ═══════════════════════════════════════════
// STEP BUILDING BLOCKS
// ═══════════════════════════════════════════

const StepTitle = ({ icon, text, color }) => (

  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
    <span style={{ fontSize: 18 }}>{icon}</span>
    <span style={font(14, 600, color)}>{text}</span>
  </div>
);

const MockCard = ({ children, color, glow, style = {} }) => (

  <div style={{
    ...glassCard({
      padding: "16px 18px",
      background: glow ? `${color}08` : G.glass,
      border: `1px solid ${glow ? color + "25" : G.glassBorder}`,
    }),
    ...style,
  }}>
    {children}
  </div>
);

const AnimBar = ({ width, color, delay = 0 }) => (

  <div style={{
    height: 6, borderRadius: 3,
    background: `${color}30`,
    overflow: "hidden",
    marginBottom: 6,
  }}>
    <div style={{
      width,
      height: "100%",
      borderRadius: 3,
      background: color,
      animation: `barGrow 1.2s ${delay}s ease-out forwards`,
      transformOrigin: "left",
    }} />
  </div>
);

const Tag = ({ text, color }) => (
<span style={{
…font(10, 600, color),
padding: “3px 10px”,
borderRadius: 100,
background: `${color}12`,
border: `1px solid ${color}20`,
letterSpacing: “0.05em”,
textTransform: “uppercase”,
}}>
{text}
</span>
);

// ═══════════════════════════════════════════
// ARAM DEMO (Health & Wellness)
// ═══════════════════════════════════════════
const aramSteps = [
{
render: (c) => (
<div>
<StepTitle icon="📋" text="Upload your lab results" color={c} />
<MockCard color={c} style={{ marginBottom: 12 }}>
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “center”, marginBottom: 14 }}>
<span style={font(13, 500)}>blood_panel_2026.pdf</span>
<Tag text="Processing" color={c} />
</div>
<div style={{
height: 4, borderRadius: 2, background: `${c}15`, overflow: “hidden”,
}}>
<div style={{
width: “100%”, height: “100%”, borderRadius: 2,
background: `linear-gradient(90deg, ${c}40, ${c})`,
animation: “progressSlide 2s ease-in-out infinite”,
}} />
</div>
</MockCard>
<div style={{ display: “flex”, gap: 8, flexWrap: “wrap” }}>
{[“CBC”, “Metabolic Panel”, “Lipids”, “Thyroid”].map(t => (
<span key={t} style={{
…font(11, 400, G.textMuted),
padding: “6px 12px”,
borderRadius: 8,
background: G.glass,
border: `1px solid ${G.glassBorder}`,
}}>{t}</span>
))}
</div>
</div>
),
},
{
render: (c) => (
<div>
<StepTitle icon="🧬" text="AI interprets your results" color={c} />
<div style={{ display: “flex”, flexDirection: “column”, gap: 10 }}>
{[
{ label: “Vitamin D”, value: “22 ng/mL”, status: “Low”, statusColor: “#EF4444”, bar: “35%” },
{ label: “Cholesterol (LDL)”, value: “142 mg/dL”, status: “Borderline”, statusColor: “#F59E0B”, bar: “62%” },
{ label: “Iron”, value: “85 μg/dL”, status: “Normal”, statusColor: c, bar: “78%” },
{ label: “Glucose (Fasting)”, value: “92 mg/dL”, status: “Normal”, statusColor: c, bar: “70%” },
].map((item) => (
<MockCard key={item.label} color={c}>
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “center”, marginBottom: 8 }}>
<span style={font(13, 500)}>{item.label}</span>
<div style={{ display: “flex”, alignItems: “center”, gap: 8 }}>
<span style={font(12, 400, G.textMuted)}>{item.value}</span>
<Tag text={item.status} color={item.statusColor} />
</div>
</div>
<AnimBar width={item.bar} color={item.statusColor} />
</MockCard>
))}
</div>
</div>
),
},
{
render: (c) => (
<div>
<StepTitle icon="💊" text="Personalized action plan" color={c} />
<MockCard color={c} glow style={{ marginBottom: 12 }}>
<div style={{ …font(11, 600, c), letterSpacing: “0.1em”, textTransform: “uppercase”, marginBottom: 10 }}>AI Recommendation</div>
<p style={font(13, 400, G.textMuted)}>
Based on your labs, I recommend prioritizing Vitamin D supplementation (2000 IU daily) and adjusting your diet to reduce LDL cholesterol. Here is your personalized plan:
</p>
</MockCard>
<div style={{ display: “grid”, gridTemplateColumns: “1fr 1fr”, gap: 8 }}>
{[
{ title: “Morning”, items: “Vitamin D + Omega-3” },
{ title: “Diet Adjust”, items: “Add oats, reduce red meat” },
{ title: “Exercise”, items: “30 min cardio, 3x/week” },
{ title: “Follow-up”, items: “Retest in 90 days” },
].map(r => (
<MockCard key={r.title} color={c}>
<div style={font(11, 600, c)}>{r.title}</div>
<div style={font(12, 400, G.textMuted)}>{r.items}</div>
</MockCard>
))}
</div>
</div>
),
},
{
render: (c) => (
<div>
<StepTitle icon="📊" text="Continuous monitoring on LifeBoard" color={c} />
<MockCard color={c} glow style={{ marginBottom: 12 }}>
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “center”, marginBottom: 16 }}>
<span style={font(13, 500)}>Health Score</span>
<span style={{ …font(28, 300, c) }}>78</span>
</div>
<div style={{ display: “flex”, gap: 4, alignItems: “flex-end”, height: 60 }}>
{[40, 52, 48, 55, 60, 58, 65, 68, 72, 70, 75, 78].map((v, i) => (
<div key={i} style={{
flex: 1,
height: `${v}%`,
background: i === 11 ? c : `${c}30`,
borderRadius: “3px 3px 0 0”,
transition: “height 0.6s ease”,
animation: `barGrow 0.6s ${i * 0.08}s ease-out forwards`,
}} />
))}
</div>
<div style={{ display: “flex”, justifyContent: “space-between”, marginTop: 6 }}>
<span style={font(10, 400, G.textDim)}>Jan</span>
<span style={font(10, 400, G.textDim)}>Dec</span>
</div>
</MockCard>
<div style={{
…font(12, 400, G.textDim),
fontStyle: “italic”,
textAlign: “center”,
padding: “8px 0”,
}}>
Aram detects rising stress → notifies Porul to lighten your workload
</div>
</div>
),
},
];

// ═══════════════════════════════════════════
// PORUL DEMO (Finance & Productivity)
// ═══════════════════════════════════════════
const porulSteps = [
{
render: (c) => (
<div>
<StepTitle icon="🔗" text="Connect your accounts" color={c} />
<div style={{ display: “flex”, flexDirection: “column”, gap: 10 }}>
{[
{ name: “Chase Checking”, status: “Connected”, icon: “🏦” },
{ name: “Amex Platinum”, status: “Connected”, icon: “💳” },
{ name: “Robinhood”, status: “Connected”, icon: “📈” },
{ name: “Venmo”, status: “Syncing…”, icon: “💸” },
].map(acc => (
<MockCard key={acc.name} color={c}>
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “center” }}>
<div style={{ display: “flex”, alignItems: “center”, gap: 10 }}>
<span style={{ fontSize: 18 }}>{acc.icon}</span>
<span style={font(13, 500)}>{acc.name}</span>
</div>
<Tag text={acc.status} color={acc.status === “Syncing…” ? G.textMuted : c} />
</div>
</MockCard>
))}
</div>
</div>
),
},
{
render: (c) => (
<div>
<StepTitle icon="📊" text="AI categorizes your spending" color={c} />
<MockCard color={c} glow style={{ marginBottom: 12 }}>
<div style={{ display: “flex”, justifyContent: “space-between”, marginBottom: 12 }}>
<span style={font(13, 500)}>March 2026</span>
<span style={font(13, 400, G.textMuted)}>$4,280 spent</span>
</div>
{[
{ cat: “Housing”, amount: “$1,800”, pct: “42%”, w: “42%”, color: c },
{ cat: “Food & Dining”, amount: “$620”, pct: “14%”, w: “14%”, color: “#F97316” },
{ cat: “Transportation”, amount: “$340”, pct: “8%”, w: “8%”, color: “#06B6D4” },
{ cat: “Subscriptions”, amount: “$285”, pct: “7%”, w: “7%”, color: G.inbam },
{ cat: “Savings & Invest”, amount: “$1,235”, pct: “29%”, w: “29%”, color: G.aram },
].map((cat, i) => (
<div key={cat.cat} style={{ marginBottom: 10 }}>
<div style={{ display: “flex”, justifyContent: “space-between”, marginBottom: 4 }}>
<span style={font(12, 400, G.textMuted)}>{cat.cat}</span>
<span style={font(12, 500)}>{cat.amount}</span>
</div>
<AnimBar width={cat.w} color={cat.color} delay={i * 0.15} />
</div>
))}
</MockCard>
</div>
),
},
{
render: (c) => (
<div>
<StepTitle icon="💡" text="Smart financial insights" color={c} />
<div style={{ display: “flex”, flexDirection: “column”, gap: 10 }}>
{[
{ icon: “🔔”, title: “Subscription alert”, msg: “You’re paying for 3 overlapping streaming services. Consolidating could save $28/mo.”, priority: “Medium” },
{ icon: “📈”, title: “Investment opportunity”, msg: “Your emergency fund is fully stocked. Consider moving $500 to your index fund.”, priority: “High” },
{ icon: “🧾”, title: “Tax optimization”, msg: “You have $2,400 in deductible home office expenses this quarter. I’ve flagged them.”, priority: “Action” },
].map(insight => (
<MockCard key={insight.title} color={c} glow={insight.priority === “Action”}>
<div style={{ display: “flex”, gap: 12, alignItems: “flex-start” }}>
<span style={{ fontSize: 20, flexShrink: 0 }}>{insight.icon}</span>
<div>
<div style={{ display: “flex”, gap: 8, alignItems: “center”, marginBottom: 4 }}>
<span style={font(13, 500)}>{insight.title}</span>
<Tag text={insight.priority} color={insight.priority === “Action” ? c : G.textMuted} />
</div>
<p style={font(12, 400, G.textMuted)}>{insight.msg}</p>
</div>
</div>
</MockCard>
))}
</div>
</div>
),
},
{
render: (c) => (
<div>
<StepTitle icon="⚡" text="FlowStack automation" color={c} />
<MockCard color={c} glow style={{ marginBottom: 16 }}>
<div style={{ …font(11, 600, c), letterSpacing: “0.1em”, textTransform: “uppercase”, marginBottom: 10 }}>Active Workflow</div>
<div style={font(15, 400)}>Freelance Invoice Pipeline</div>
<p style={{ …font(12, 400, G.textMuted), marginTop: 6 }}>
Auto-generates invoices from tracked hours, sends reminders on Day 15, and logs payments when received.
</p>
</MockCard>
<div style={{ display: “flex”, flexDirection: “column”, gap: 6 }}>
{[
{ step: “Hours tracked”, status: “done” },
{ step: “Invoice generated”, status: “done” },
{ step: “Sent to client”, status: “done” },
{ step: “Payment reminder (Day 15)”, status: “active” },
{ step: “Payment received → log”, status: “pending” },
].map((s, i) => (
<div key={s.step} style={{
display: “flex”, alignItems: “center”, gap: 12, padding: “10px 14px”,
borderRadius: 8,
background: s.status === “active” ? `${c}10` : “transparent”,
border: s.status === “active” ? `1px solid ${c}25` : `1px solid transparent`,
}}>
<div style={{
width: 20, height: 20, borderRadius: “50%”,
display: “flex”, alignItems: “center”, justifyContent: “center”,
background: s.status === “done” ? c : s.status === “active” ? `${c}30` : G.glassBorder,
fontSize: 10, color: s.status === “done” ? “#000” : G.textMuted,
}}>
{s.status === “done” ? “✓” : i + 1}
</div>
<span style={font(12, s.status === “active” ? 500 : 400, s.status === “pending” ? G.textDim : G.textMuted)}>
{s.step}
</span>
</div>
))}
</div>
<div style={{
…font(12, 400, G.textDim),
fontStyle: “italic”,
textAlign: “center”,
padding: “12px 0 0”,
}}>
Porul detects cash surplus → signals Inbam to unlock creative tools budget
</div>
</div>
),
},
];

// ═══════════════════════════════════════════
// INBAM DEMO (Creativity & Joy)
// ═══════════════════════════════════════════
const inbamSteps = [
{
render: (c) => (
<div>
<StepTitle icon="🎨" text="Tell Inbam what inspires you" color={c} />
<MockCard color={c} glow style={{ marginBottom: 16 }}>
<div style={{ …font(11, 600, c), letterSpacing: “0.1em”, textTransform: “uppercase”, marginBottom: 10 }}>Vibe Profile</div>
<div style={{ display: “flex”, gap: 8, flexWrap: “wrap”, marginBottom: 16 }}>
{[“Photography”, “Writing”, “Music Prod”, “Travel”, “Cooking”, “Side Projects”].map(t => (
<span key={t} style={{
…font(11, 500, c),
padding: “6px 14px”, borderRadius: 100,
background: `${c}12`, border: `1px solid ${c}25`,
}}>{t}</span>
))}
</div>
<div style={{ display: “flex”, gap: 8, flexWrap: “wrap” }}>
{[“Chill Mornings”, “Weekend Warrior”, “Night Owl Creative”].map(t => (
<span key={t} style={{
…font(11, 400, G.textMuted),
padding: “6px 14px”, borderRadius: 100,
background: G.glass, border: `1px solid ${G.glassBorder}`,
}}>{t}</span>
))}
</div>
</MockCard>
</div>
),
},
{
render: (c) => (
<div>
<StepTitle icon="💡" text="AI generates content ideas" color={c} />
<div style={{ display: “flex”, flexDirection: “column”, gap: 10 }}>
{[
{ title: “Photo essay: ‘Morning light in your city’”, type: “Photography”, match: “94%”, tags: [“Trending”, “Quick Win”] },
{ title: “Thread: 5 tools that changed my creative process”, type: “Writing”, match: “89%”, tags: [“High Engagement”] },
{ title: “Lo-fi beat using kitchen sounds”, type: “Music”, match: “82%”, tags: [“Unique”, “Fun”] },
].map(idea => (
<MockCard key={idea.title} color={c} glow>
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “flex-start”, marginBottom: 8 }}>
<div>
<span style={font(13, 500)}>{idea.title}</span>
<div style={{ …font(11, 400, G.textMuted), marginTop: 2 }}>{idea.type}</div>
</div>
<span style={font(13, 600, c)}>{idea.match}</span>
</div>
<div style={{ display: “flex”, gap: 6 }}>
{idea.tags.map(t => <Tag key={t} text={t} color={c} />)}
</div>
</MockCard>
))}
</div>
</div>
),
},
{
render: (c) => (
<div>
<StepTitle icon="📋" text="Creative project tracker" color={c} />
<MockCard color={c} style={{ marginBottom: 12 }}>
<div style={{ display: “flex”, justifyContent: “space-between”, marginBottom: 16 }}>
<span style={font(13, 500)}>Active Projects</span>
<span style={font(12, 400, G.textMuted)}>3 in progress</span>
</div>
{[
{ name: “Travel photography series”, progress: 72, color: c },
{ name: “Personal blog relaunch”, progress: 45, color: “#06B6D4” },
{ name: “Lo-fi mixtape vol. 2”, progress: 20, color: “#EC4899” },
].map(proj => (
<div key={proj.name} style={{ marginBottom: 14 }}>
<div style={{ display: “flex”, justifyContent: “space-between”, marginBottom: 4 }}>
<span style={font(12, 400)}>{proj.name}</span>
<span style={font(11, 500, proj.color)}>{proj.progress}%</span>
</div>
<AnimBar width={`${proj.progress}%`} color={proj.color} />
</div>
))}
</MockCard>
<MockCard color={c}>
<div style={font(11, 600, c)}>Next up today</div>
<div style={font(13, 400, G.textMuted)}>Edit 3 photos from Sunday shoot (est. 45 min)</div>
</MockCard>
</div>
),
},
{
render: (c) => (
<div>
<StepTitle icon="✨" text="Joy dashboard — your life, curated" color={c} />
<div style={{ display: “grid”, gridTemplateColumns: “1fr 1fr”, gap: 10, marginBottom: 12 }}>
<MockCard color={c} glow>
<div style={font(11, 600, c)}>Mood</div>
<div style={{ fontSize: 28, marginTop: 4 }}>😊</div>
<div style={font(11, 400, G.textDim)}>Trending up this week</div>
</MockCard>
<MockCard color={c}>
<div style={font(11, 600, “#06B6D4”)}>Creative Hours</div>
<div style={font(24, 300)}>14.5h</div>
<div style={font(11, 400, G.textDim)}>+3h vs last week</div>
</MockCard>
<MockCard color={c}>
<div style={font(11, 600, “#EC4899”)}>Content Published</div>
<div style={font(24, 300)}>7</div>
<div style={font(11, 400, G.textDim)}>This month</div>
</MockCard>
<MockCard color={c}>
<div style={font(11, 600, G.porul)}>Joy Score</div>
<div style={font(24, 300, c)}>86</div>
<div style={font(11, 400, G.textDim)}>All-time high</div>
</MockCard>
</div>
<div style={{
…font(12, 400, G.textDim),
fontStyle: “italic”,
textAlign: “center”,
padding: “8px 0”,
}}>
Inbam senses creative energy dipping → tells Aram to suggest a recovery day
</div>
</div>
),
},
];

// ═══════════════════════════════════════════
// KEYFRAME STYLES (injected once)
// ═══════════════════════════════════════════
export const DemoKeyframes = () => (

  <style>{`
    @keyframes barGrow {
      from { transform: scaleX(0); }
      to { transform: scaleX(1); }
    }
    @keyframes progressSlide {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
  `}</style>

);

// ═══════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════
export const AramDemo = () => <DemoShell color={G.aram} steps={aramSteps} moduleName="Aram" />;
export const PorulDemo = () => <DemoShell color={G.porul} steps={porulSteps} moduleName="Porul" />;
export const InbamDemo = () => <DemoShell color={G.inbam} steps={inbamSteps} moduleName="Inbam" />;