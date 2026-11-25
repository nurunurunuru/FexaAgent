import React, { useEffect, useRef, useState } from "react";
import {
  Activity,
  Bot,
  Check,
  Cpu,
  Globe2,
  Lock,
  Mic2,
  Server,
  ShieldCheck,
  Sparkles,
  Volume2,
  Zap,
} from "lucide-react";

/* ---------- data ---------- */
const NODES = [
  { icon: Mic2, title: "Customer", sub: "Speaks", label: "Audio in", ms: 60 },
  { icon: Bot, title: "AI Agent", sub: "Understands", label: "Routing", ms: 120 },
  { icon: Cpu, title: "AI Engine", sub: "Reasons", label: "Reasoning", ms: 340 },
  { icon: Volume2, title: "Voice Response", sub: "Replies", label: "Speech out", ms: 120 },
];

const TRACE = [
  ["00:00.060", "audio.in", "Customer speech captured · 16 kHz stream"],
  ["00:00.180", "agent.route", "Intent detected: book_appointment · 0.97"],
  ["00:00.520", "engine.reason", "Answer generated · 42 tokens"],
  ["00:00.640", "voice.synth", "Natural speech streamed · en-US"],
  ["00:00.640", "response.complete", "Delivered to customer in 640 ms"],
];

const APIS = [
  {
    icon: Bot,
    title: "AI Engine",
    description: "Intelligent conversation processing",
    metric: { label: "Uptime", base: 99.99, decimals: 2, unit: "%", jitter: 0 },
  },
  {
    icon: Sparkles,
    title: "LLM",
    description: "Natural language understanding",
    metric: { label: "Tokens / sec", base: 118, decimals: 0, unit: "", jitter: 18 },
  },
  {
    icon: Zap,
    title: "Realtime API",
    description: "Fast response generation",
    metric: { label: "Latency", base: 86, decimals: 0, unit: " ms", jitter: 14 },
  },
  {
    icon: Volume2,
    title: "Voice API",
    description: "Natural speech synthesis",
    metric: { label: "Voices", base: 40, decimals: 0, unit: "+", jitter: 0 },
  },
];

const STATS = [
  { prefix: "", value: 99.99, decimals: 2, suffix: "%", label: "Uptime" },
  { prefix: "<", value: 800, decimals: 0, suffix: " ms", label: "Avg. response time" },
  { prefix: "", value: 30, decimals: 0, suffix: "+", label: "Languages" },
  { prefix: "", value: 24, decimals: 0, suffix: "/7", label: "Always on" },
];

const CHIPS = [
  [Lock, "End-to-end encryption"],
  [Server, "Auto-scaling servers"],
  [Globe2, "Global edge network"],
  [ShieldCheck, "Secure by design"],
  [Activity, "Real-time monitoring"],
];

const INTERVAL = 1700;
const LAST = NODES.length; // 4 = "complete" state

/* ---------- helpers ---------- */
const useCountUp = (target, run, duration = 1600) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return undefined;
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min((t - start) / duration, 1);
      setValue(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return value;
};

const Stat = ({ prefix, value, decimals, suffix, label, run }) => {
  const v = useCountUp(value, run);
  return (
    <div className="inf-stat">
      <strong>
        {prefix}
        {decimals ? v.toFixed(decimals) : Math.round(v)}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  );
};

const onMove = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

const ApiCard = ({ icon: Icon, title, description, metric, run, index }) => {
  const [val, setVal] = useState(metric.base);

  useEffect(() => {
    if (!run || !metric.jitter) return undefined;
    const id = setInterval(
      () => setVal(metric.base + (Math.random() - 0.5) * metric.jitter),
      1700
    );
    return () => clearInterval(id);
  }, [run, metric]);

  return (
    <div className="inf-card" onMouseMove={onMove}>
      <div className="inf-card-top">
        <span className="inf-card-icon">
          <Icon size={22} />
        </span>
        <span className="inf-ok">
          <i /> Operational
        </span>
      </div>

      <h3>{title}</h3>
      <p>{description}</p>

      <div className="inf-card-foot">
        <div>
          <small>{metric.label}</small>
          <b>
            {val.toFixed(metric.decimals)}
            {metric.unit}
          </b>
        </div>
        <div className="inf-mini" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              style={{
                "--h": `${30 + ((i * 41 + index * 17) % 70)}%`,
                "--d": `${(i % 7) * -0.18}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------- component ---------- */
const Infrastructure = () => {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.25,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused) return undefined;
    const t = setTimeout(
      () => setActive((a) => (a + 1) % (LAST + 1)),
      active === LAST ? 3200 : INTERVAL
    );
    return () => clearTimeout(t);
  }, [active, inView, paused]);

  return (
    <section className="infra-section inf" ref={sectionRef}>
      <div className="infra-header">
        <span className="section-eyebrow">INFRASTRUCTURE</span>

        <h2 className="fexa-title fexa-title-center">
          <span>Built With Powerful</span>
          <strong>AI Infrastructure.</strong>
        </h2>

        <p className="voice-section-subtitle">
          Every conversation runs through a real-time pipeline built for speed,
          accuracy and scale.
        </p>
      </div>

      {/* ---------- live pipeline ---------- */}
      <div
        className="inf-shell"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="inf-bar">
          <div className="inf-dots">
            <i />
            <i />
            <i />
          </div>
          <span className="inf-bar-title">Live request pipeline</span>
          <span className="inf-live">
            <i /> Live
          </span>
        </div>

        {/* nodes */}
        <div className="inf-pipe">
          {NODES.map(({ icon: Icon, title, sub }, i) => (
            <React.Fragment key={title}>
              <button
                type="button"
                className={`inf-node ${i === active ? "is-active" : ""} ${
                  i < active ? "is-done" : ""
                }`}
                onClick={() => setActive(i)}
              >
                <span className="inf-node-box">
                  <Icon size={28} />
                  {i < active && (
                    <span className="inf-node-check">
                      <Check size={11} strokeWidth={3.5} />
                    </span>
                  )}
                </span>
                <b>{title}</b>
                <small>{sub}</small>
              </button>

              {i < NODES.length - 1 && (
                <div
                  className={`inf-link ${i < active ? "is-done" : ""} ${
                    i === active ? "is-flow" : ""
                  }`}
                  style={{ "--dur": `${INTERVAL}ms` }}
                >
                  <span className="inf-link-fill" />
                  <span className="inf-packet" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* latency */}
        <div className="inf-lat">
          <div className="inf-lat-head">
            <span>Response latency</span>
            <b className={active === LAST ? "is-on" : ""}>Total ≈ 640 ms</b>
          </div>

          <div className="inf-lat-track">
            {NODES.map(({ title, ms }, i) => (
              <div
                key={title}
                className={`inf-seg ${i < active ? "is-done" : ""} ${
                  i === active ? "is-run" : ""
                }`}
                style={{ "--ms": ms, "--dur": `${INTERVAL}ms` }}
              >
                <i />
              </div>
            ))}
          </div>

          <div className="inf-lat-labels">
            {NODES.map(({ title, label, ms }, i) => (
              <span
                key={title}
                className={i <= active ? "is-on" : ""}
                style={{ "--ms": ms }}
              >
                {label} <em>{ms} ms</em>
              </span>
            ))}
          </div>
        </div>

        {/* trace console */}
        <div className="inf-console">
          <div className="inf-console-bar">
            <i />
            <i />
            <i />
            <span>request_id: req_8f3a21 · region: global-edge</span>
          </div>

          <div className="inf-console-body">
            {TRACE.slice(0, active + 1).map(([ts, tag, msg], i) => (
              <div
                key={`${i}-${tag}`}
                className={`inf-line ${i === LAST ? "is-ok" : ""}`}
              >
                <span className="ts">{ts}</span>
                <span className="tag">{tag}</span>
                <span className="msg">{msg}</span>
              </div>
            ))}
            <span className="inf-caret" />
          </div>
        </div>
      </div>

      {/* ---------- api cards ---------- */}
      <div className="inf-cards">
        {APIS.map((api, i) => (
          <ApiCard key={api.title} {...api} run={inView} index={i} />
        ))}
      </div>

      {/* ---------- stats ---------- */}
      <div className="inf-stats">
        {STATS.map((s) => (
          <Stat key={s.label} {...s} run={inView} />
        ))}
      </div>

      <div className="inf-chips">
        {CHIPS.map(([Icon, label]) => (
          <span key={label}>
            <Icon size={14} /> {label}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Infrastructure;