import React, { useEffect, useRef, useState } from "react";
import {
  Check,
  CalendarCheck,
  Code2,
  Database,
  Globe,
  Mic2,
  Plug,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import VoiceSectionTitle from "./VoiceSectionTitle";

const STEPS = [
  {
    icon: Code2,
    title: "Install",
    tag: "2 minutes",
    description: "Paste one line of code and the AI voice widget goes live on your website.",
  },
  {
    icon: Plug,
    title: "Connect",
    tag: "No-code",
    description: "Link your business info, calendar and tools so the agent knows your business.",
  },
  {
    icon: Mic2,
    title: "Talk",
    tag: "Real-time",
    description: "Customers speak naturally and get instant, human-like answers, 24/7.",
  },
  {
    icon: TrendingUp,
    title: "Convert",
    tag: "Automatic",
    description: "The AI qualifies visitors, captures leads and books meetings for you.",
  },
];

const INTERVAL = 3800;

/* ---------- mini previews ---------- */
const InstallVisual = () => (
  <div className="hw-code">
    <div className="hw-code-bar">
      <i /><i /><i />
      <span>index.html</span>
    </div>
    <pre>
      <span style={{ "--i": 0 }}><u>&lt;script</u></span>
      <span style={{ "--i": 1 }}>  <b>src</b>=<s>"fexa.ai/voice.js"</s></span>
      <span style={{ "--i": 2 }}>  <b>data-agent</b>=<s>"your-brand"</s>&gt;</span>
      <span style={{ "--i": 3 }}><u>&lt;/script&gt;</u></span>
    </pre>
    <div className="hw-live">
      <Check size={13} /> Widget is live
    </div>
  </div>
);

const ConnectVisual = () => {
  const items = [
    [Globe, "Website & FAQs"],
    [CalendarCheck, "Google Calendar"],
    [Database, "CRM & Leads"],
    [Sparkles, "Knowledge base"],
  ];
  return (
    <div className="hw-connect">
      {items.map(([Icon, label], i) => (
        <div className="hw-conn-row" style={{ "--i": i }} key={label}>
          <span className="hw-conn-icon"><Icon size={15} /></span>
          <b>{label}</b>
          <span className="hw-conn-check"><Check size={12} strokeWidth={3} /></span>
        </div>
      ))}
    </div>
  );
};

const TalkVisual = () => (
  <div className="hw-talk">
    <div className="hw-bars">
      {Array.from({ length: 26 }).map((_, i) => (
        <span key={i} style={{ "--d": `${(i % 7) * -0.17}s`, "--h": `${30 + ((i * 37) % 70)}%` }} />
      ))}
    </div>
    <div className="hw-bubble cust" style={{ "--i": 0 }}>Do you have a slot tomorrow?</div>
    <div className="hw-bubble agent" style={{ "--i": 1 }}>Yes! 4:00 PM works. Shall I book it?</div>
  </div>
);

const ConvertVisual = () => (
  <div className="hw-lead">
    <div className="hw-lead-card">
      <div className="hw-lead-top">
        <span className="hw-avatar">SR</span>
        <div>
          <b>Sara Rahman</b>
          <small>via AI Voice Chat</small>
        </div>
        <span className="hw-pill">Qualified</span>
      </div>
      <div className="hw-lead-row"><CalendarCheck size={14} /> Demo booked · Tue 4:00 PM</div>
      <div className="hw-lead-row"><Users size={14} /> Added to CRM automatically</div>
    </div>
    <div className="hw-toast"><TrendingUp size={13} /> +1 new lead captured</div>
  </div>
);

const VISUALS = [InstallVisual, ConnectVisual, TalkVisual, ConvertVisual];

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);

  // section screen-e ashle cycle shuru
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused) return undefined;
    const id = setInterval(() => setActive((a) => (a + 1) % STEPS.length), INTERVAL);
    return () => clearInterval(id);
  }, [inView, paused]);

  // cursor spotlight
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section className="how-section hw" ref={sectionRef}>
      <VoiceSectionTitle eyebrow="HOW IT WORKS">
        Go Live in Minutes. Convert Around the Clock.
      </VoiceSectionTitle>

      {/* stepper */}
      <div className="hw-stepper" aria-hidden="true">
        <div className="hw-line">
          <div
            className="hw-line-fill"
            style={{ transform: `scaleX(${active / (STEPS.length - 1)})` }}
          />
        </div>
        {STEPS.map(({ icon: Icon, title }, i) => (
          <button
            key={title}
            type="button"
            tabIndex={-1}
            className={`hw-node ${i === active ? "is-active" : ""} ${i < active ? "is-done" : ""}`}
            onClick={() => setActive(i)}
          >
            <span className="hw-node-dot">
              {i < active ? <Check size={16} strokeWidth={3} /> : <Icon size={17} />}
            </span>
          </button>
        ))}
      </div>

      {/* cards */}
      <div
        className="hw-grid"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {STEPS.map(({ icon: Icon, title, description, tag }, i) => {
          const Visual = VISUALS[i];
          return (
            <article
              key={title}
              className={`hw-card ${i === active ? "is-active" : ""}`}
              onClick={() => setActive(i)}
              onMouseMove={onMove}
            >
              <span className="hw-ghost">0{i + 1}</span>

              <div className="hw-visual">
                <Visual />
              </div>

              <div className="hw-body">
                <div className="hw-head">
                  <span className="hw-icon"><Icon size={18} /></span>
                  <h3>{title}</h3>
                  <em>{tag}</em>
                </div>
                <p>{description}</p>
              </div>

              <div className="hw-progress">
                {i === active && !paused && inView && (
                  <span key={active} style={{ animationDuration: `${INTERVAL}ms` }} />
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;