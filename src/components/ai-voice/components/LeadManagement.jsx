import React, { useEffect, useRef, useState } from "react";
import {
  CalendarCheck,
  Check,
  Clock,
  Globe,
  Mail,
  MessageCircle,
  Mic2,
  Phone,
  Search,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import VoiceSectionTitle from "./VoiceSectionTitle";

/* ---------- data ---------- */
const SOURCES = {
  voice: { label: "AI Voice", icon: Mic2, color: "#06845d" },
  whatsapp: { label: "WhatsApp", icon: MessageCircle, color: "#1fa855" },
  messenger: { label: "Messenger", icon: MessageCircle, color: "#0a84ff" },
  website: { label: "Website", icon: Globe, color: "#7c3aed" },
};

const STAGES = ["All", "New", "Contacted", "Qualified", "Booked"];

const AVATARS = [
  "linear-gradient(135deg,#06845d,#0a9f72)",
  "linear-gradient(135deg,#0a6a8a,#09b5dc)",
  "linear-gradient(135deg,#6d3bd2,#9b6bff)",
  "linear-gradient(135deg,#d9731a,#f5a742)",
  "linear-gradient(135deg,#c2410c,#f0654a)",
];

const INITIAL = [
  {
    id: 1, name: "John Smith", email: "john@example.com", phone: "+1 555 123 456",
    source: "voice", status: "New", score: 82, time: "2m ago",
    summary: "Asked about enterprise pricing and whether the agent can handle Spanish calls.",
    tags: ["Pricing", "Multilingual", "High intent"],
    chat: [["c", "Do you support Spanish customers?"], ["a", "Yes, 30+ languages. Want a quick demo?"]],
    next: "Send pricing sheet",
  },
  {
    id: 2, name: "Sarah Wilson", email: "sarah@example.com", phone: "+1 555 987 654",
    source: "whatsapp", status: "Contacted", score: 64, time: "11m ago",
    summary: "Wants the agent on her clinic website to take appointment bookings after hours.",
    tags: ["Healthcare", "Bookings"],
    chat: [["c", "Can it book appointments at night?"], ["a", "Absolutely, 24/7. I can set it up today."]],
    next: "Follow up tomorrow 10 AM",
  },
  {
    id: 3, name: "Daniel Okafor", email: "daniel@brightlogix.io", phone: "+44 7700 900 214",
    source: "website", status: "Qualified", score: 91, time: "26m ago",
    summary: "Runs a 40-person logistics team. Needs lead capture and CRM sync before next quarter.",
    tags: ["B2B", "CRM sync", "Decision maker"],
    chat: [["c", "We need leads pushed to our CRM."], ["a", "Done automatically. Shall I book a call?"]],
    next: "Schedule onboarding call",
  },
  {
    id: 4, name: "Priya Nair", email: "priya@glowstudio.co", phone: "+91 98765 43210",
    source: "messenger", status: "Booked", score: 96, time: "1h ago",
    summary: "Booked a product demo for Thursday. Interested in the Instagram and Messenger agents.",
    tags: ["Demo booked", "Social channels"],
    chat: [["c", "Thursday 3 PM works for me."], ["a", "Booked! Calendar invite is on its way."]],
    next: "Prepare demo deck",
  },
];

const INCOMING = [
  {
    name: "Marco Rossi", email: "marco@trattoriaroma.it", phone: "+39 333 123 4567",
    source: "voice", status: "New", score: 74,
    summary: "Restaurant owner asking if the agent can take table reservations by voice.",
    tags: ["Restaurant", "Reservations"],
    chat: [["c", "Can it take reservations?"], ["a", "Yes, and confirm them by SMS."]],
    next: "Send reservation demo",
  },
  {
    name: "Aisha Rahman", email: "aisha@nexora.com", phone: "+880 1711 234 567",
    source: "whatsapp", status: "Qualified", score: 88,
    summary: "Needs a Bangla and English support agent for an e-commerce store with high ticket volume.",
    tags: ["E-commerce", "Bangla", "High volume"],
    chat: [["c", "Does it speak Bangla?"], ["a", "Yes, fluent Bangla and English."]],
    next: "Share onboarding plan",
  },
  {
    name: "Liam O'Connor", email: "liam@oconnorlaw.ie", phone: "+353 85 123 4567",
    source: "website", status: "Contacted", score: 58,
    summary: "Law firm exploring after-hours intake. Wants to understand data privacy first.",
    tags: ["Legal", "Privacy"],
    chat: [["c", "Is client data kept private?"], ["a", "Encrypted end to end. Sending details."]],
    next: "Send security overview",
  },
  {
    name: "Yuki Tanaka", email: "yuki@sakuratech.jp", phone: "+81 90 1234 5678",
    source: "messenger", status: "Booked", score: 93,
    summary: "Booked a strategy call to roll the agent out across three regional offices.",
    tags: ["Enterprise", "Multi-office"],
    chat: [["c", "Friday morning is best."], ["a", "Locked in for Friday 9 AM."]],
    next: "Assign account manager",
  },
  {
    name: "Emma Johansson", email: "emma@nordicfit.se", phone: "+46 70 123 45 67",
    source: "voice", status: "New", score: 69,
    summary: "Gym chain asking about membership enquiries and class booking by voice.",
    tags: ["Fitness", "Bookings"],
    chat: [["c", "Can members book classes?"], ["a", "Yes, right from the call."]],
    next: "Send class booking demo",
  },
];

/* ---------- helpers ---------- */
const initials = (name) =>
  name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();

const avatarBg = (name) =>
  AVATARS[[...name].reduce((a, c) => a + c.charCodeAt(0), 0) % AVATARS.length];

const useCountUp = (target, run, duration = 1400) => {
  const [value, setValue] = useState(0);
  const fromRef = useRef(0);
  useEffect(() => {
    if (!run) return undefined;
    const from = fromRef.current;
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const next = from + (target - from) * eased;
      fromRef.current = next;
      setValue(next);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return value;
};

const Kpi = ({ icon: Icon, label, value, decimals = 0, suffix = "", delta, path, run }) => {
  const v = useCountUp(value, run);
  const text = decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-US");
  return (
    <div className="lm-kpi">
      <div className="lm-kpi-top">
        <span className="lm-kpi-icon"><Icon size={16} /></span>
        <span className="lm-kpi-delta"><TrendingUp size={11} /> {delta}</span>
      </div>
      <strong>{text}{suffix}</strong>
      <small>{label}</small>
      <svg className="lm-spark" viewBox="0 0 120 32" preserveAspectRatio="none" aria-hidden="true">
        <path d={`${path} L120 32 L0 32 Z`} className="lm-spark-fill" />
        <path d={path} className="lm-spark-line" />
      </svg>
    </div>
  );
};

/* ---------- component ---------- */
const LeadManagement = () => {
  const sectionRef = useRef(null);
  const uid = useRef(100);
  const cursor = useRef(0);
  const picked = useRef(false);

  const [leads, setLeads] = useState(INITIAL);
  const [extra, setExtra] = useState(0);
  const [stage, setStage] = useState("All");
  const [selectedId, setSelectedId] = useState(1);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // live: notun lead ashe
  useEffect(() => {
    if (!inView || paused) return undefined;
    const id = setInterval(() => {
      const tpl = INCOMING[cursor.current % INCOMING.length];
      cursor.current += 1;
      uid.current += 1;
      const lead = { ...tpl, id: uid.current, fresh: true, time: "Just now" };
      setLeads((prev) => [lead, ...prev.map((l) => ({ ...l, fresh: false }))].slice(0, 6));
      setExtra((n) => n + 1);
      setToast({ id: lead.id, name: lead.name, source: lead.source });
      if (!picked.current) setSelectedId(lead.id);
    }, 4600);
    return () => clearInterval(id);
  }, [inView, paused]);

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  const visible = stage === "All" ? leads : leads.filter((l) => l.status === stage);
  const counts = STAGES.reduce((acc, s) => {
    acc[s] = s === "All" ? leads.length : leads.filter((l) => l.status === s).length;
    return acc;
  }, {});
  const selected = leads.find((l) => l.id === selectedId) || leads[0];
  const SelSrc = SOURCES[selected.source];

  return (
    <section className="lead-management-section lm-section" ref={sectionRef}>
      <VoiceSectionTitle eyebrow="LEAD MANAGEMENT">
        Turn Conversations Into Customers.
      </VoiceSectionTitle>

      <div className="lm-shell">
        {/* window bar */}
        <div className="lm-bar">
          <div className="lm-dots"><i /><i /><i /></div>
          <span className="lm-bar-title">Fexa AI · Leads</span>
          <div className="lm-search"><Search size={13} /> Search leads…</div>
          <span className="lm-live"><i /> Live</span>
        </div>

        {/* KPIs */}
        <div className="lm-kpis">
          <Kpi icon={Users} label="Leads captured" value={1284 + extra} delta="+12.4%" run={inView}
            path="M0 26 L18 22 L36 24 L54 15 L72 17 L90 8 L120 4" />
          <Kpi icon={TrendingUp} label="Conversion rate" value={38.4} decimals={1} suffix="%" delta="+4.1%" run={inView}
            path="M0 24 L20 20 L40 22 L60 12 L80 14 L100 7 L120 5" />
          <Kpi icon={Zap} label="Avg. response time" value={0.8} decimals={1} suffix="s" delta="-0.3s" run={inView}
            path="M0 6 L20 10 L40 8 L60 16 L80 14 L100 22 L120 25" />
          <Kpi icon={CalendarCheck} label="Meetings booked" value={212 + Math.floor(extra / 2)} delta="+18%" run={inView}
            path="M0 27 L22 23 L44 25 L66 14 L88 12 L120 3" />
        </div>

        {/* body */}
        <div className="lm-body">
          {/* table */}
          <div
            className="lm-table-wrap"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="lm-tabs">
              {STAGES.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`lm-tab ${stage === s ? "is-on" : ""}`}
                  onClick={() => setStage(s)}
                >
                  {s} <em>{counts[s]}</em>
                </button>
              ))}
            </div>

            <div className="lm-cols">
              <span>Lead</span>
              <span>Source</span>
              <span>Status</span>
              <span className="lm-hide-sm">Score</span>
              <span className="lm-hide-sm">Active</span>
            </div>

            <div className="lm-rows">
              {visible.length === 0 && (
                <div className="lm-empty">No leads in this stage yet.</div>
              )}
              {visible.map((l) => {
                const S = SOURCES[l.source];
                const SIcon = S.icon;
                return (
                  <div
                    key={l.id}
                    role="button"
                    tabIndex={0}
                    className={`lm-row ${l.fresh ? "is-new" : ""} ${l.id === selected.id ? "is-sel" : ""}`}
                    onClick={() => {
                      picked.current = true;
                      setSelectedId(l.id);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        picked.current = true;
                        setSelectedId(l.id);
                      }
                    }}
                  >
                    <span className="lm-lead">
                      <span className="lm-avatar" style={{ background: avatarBg(l.name) }}>
                        {initials(l.name)}
                      </span>
                      <span className="lm-lead-text">
                        <b>{l.name}</b>
                        <small>{l.email}</small>
                      </span>
                    </span>

                    <span className="lm-src" style={{ "--brand": S.color }}>
                      <SIcon size={13} /> {S.label}
                    </span>

                    <span><span className={`lm-pill lm-s-${l.status.toLowerCase()}`}>{l.status}</span></span>

                    <span className="lm-score lm-hide-sm">
                      <span className="lm-score-bar"><i style={{ width: `${l.score}%` }} /></span>
                      <b>{l.score}</b>
                    </span>

                    <span className="lm-time lm-hide-sm"><Clock size={12} /> {l.time}</span>
                  </div>
                );
              })}
            </div>

            {toast && (
              <div className="lm-toast" key={toast.id}>
                <Zap size={13} /> New lead from {SOURCES[toast.source].label}: {toast.name}
              </div>
            )}
          </div>

          {/* detail */}
          <aside className="lm-detail" key={selected.id}>
            <div className="lm-d-head">
              <span className="lm-avatar lm-avatar-lg" style={{ background: avatarBg(selected.name) }}>
                {initials(selected.name)}
              </span>
              <div>
                <b>{selected.name}</b>
                <small style={{ color: SelSrc.color }}>via {SelSrc.label}</small>
              </div>
              <span className={`lm-pill lm-s-${selected.status.toLowerCase()}`}>{selected.status}</span>
            </div>

            <div className="lm-d-contact">
              <span><Mail size={13} /> {selected.email}</span>
              <span><Phone size={13} /> {selected.phone}</span>
            </div>

            <div className="lm-d-ai">
              <div className="lm-d-label"><Sparkles size={13} /> AI summary</div>
              <p>{selected.summary}</p>
              <div className="lm-tags">
                {selected.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
            </div>

            <div className="lm-d-chat">
              {selected.chat.map(([who, text], i) => (
                <div key={i} className={`lm-bubble ${who === "a" ? "agent" : "cust"}`} style={{ "--i": i }}>
                  {text}
                </div>
              ))}
            </div>

            <div className="lm-d-next">
              <small>Suggested next step</small>
              <b>{selected.next}</b>
            </div>

            <div className="lm-d-actions">
              <button type="button" className="lm-btn lm-btn-main"><Phone size={14} /> Call</button>
              <button type="button" className="lm-btn"><Mail size={14} /> Email</button>
              <button type="button" className="lm-btn"><CalendarCheck size={14} /> Book</button>
            </div>

            <div className="lm-synced"><Check size={12} strokeWidth={3} /> Synced to CRM automatically</div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default LeadManagement;