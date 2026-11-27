import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  Crown,
  Gem,
  Rocket,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import VoiceSectionTitle from "./VoiceSectionTitle";

/* =========================================================
   Google Form link gulo ekhane boshan (3-ta package-er jonno)
   ========================================================= */
const FORM_LINKS = {
  basic: "https://docs.google.com/forms/d/e/1FAIpQLSfbw4CUVXyaYG8s95kRMoFCBMDR03NKryLEBXGf1CjaKkQEhA/viewform",
  premium: "https://docs.google.com/forms/d/e/1FAIpQLSfbw4CUVXyaYG8s95kRMoFCBMDR03NKryLEBXGf1CjaKkQEhA/viewform",
  platinum: "https://docs.google.com/forms/d/e/1FAIpQLSfbw4CUVXyaYG8s95kRMoFCBMDR03NKryLEBXGf1CjaKkQEhA/viewform",
};

const PLANS = [
  {
    key: "basic",
    icon: Rocket,
    name: "Basic",
    tagline: "Perfect to get started and test the results.",
    price: 500,
    leads: 500,
    cta: "Get Basic Package",
    features: [
      "500 verified leads",
      "Name, email and phone details",
      "Lead dashboard access",
      "Standard email support",
    ],
  },
  {
    key: "premium",
    icon: Gem,
    name: "Premium",
    tagline: "Best value for growing businesses.",
    price: 1000,
    leads: 1000,
    cta: "Get Premium Package",
    featured: true,
    badge: "MOST POPULAR",
    features: [
      "1,000 verified leads",
      "Name, email and phone details",
      "Lead scoring and source tracking",
      "Priority support",
      "Faster lead delivery",
    ],
  },
  {
    key: "platinum",
    icon: Crown,
    name: "Platinum",
    tagline: "Maximum volume for serious scaling.",
    price: 1500,
    leads: 1500,
    cta: "Get Platinum Package",
    dark: true,
    badge: "BEST FOR SCALE",
    features: [
      "1,500 verified leads",
      "Name, email and phone details",
      "Lead scoring and source tracking",
      "Dedicated account manager",
      "Fastest lead delivery",
    ],
  },
];

const TRUST = [
  [ShieldCheck, "Secure & transparent"],
  [Zap, "Fast delivery"],
  [Sparkles, "No hidden charges"],
];

/* ---------- helpers ---------- */
const useCountUp = (target, run, duration = 1500) => {
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

const onMove = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

const PlanCard = ({ plan, run }) => {
  const { icon: Icon } = plan;
  const price = useCountUp(plan.price, run);
  const leads = useCountUp(plan.leads, run);

  return (
    <article
      className={`pk-card ${plan.featured ? "is-featured" : ""} ${plan.dark ? "is-dark" : ""}`}
      onMouseMove={onMove}
    >
      <span className="pk-spot" />

      {plan.badge && <span className="pk-badge">{plan.badge}</span>}

      <div className="pk-head">
        <span className="pk-icon">
          <Icon size={22} />
        </span>
        <div>
          <h3>{plan.name}</h3>
          <p>{plan.tagline}</p>
        </div>
      </div>

      <div className="pk-price">
        <span className="pk-cur">৳</span>
        <strong>{Math.round(price).toLocaleString("en-US")}</strong>
        <small>one-time</small>
      </div>

      <div className="pk-leads">
        <div>
          <b>{Math.round(leads).toLocaleString("en-US")}</b>
          <span>Leads included</span>
        </div>
        <em>৳1 / lead</em>
      </div>

      <ul className="pk-list">
        {plan.features.map((f) => (
          <li key={f}>
            <span className="pk-tick">
              <Check size={12} strokeWidth={3.5} />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <a
        className="pk-btn"
        href={FORM_LINKS[plan.key]}
        target="_blank"
        rel="noopener noreferrer"
      >
        {plan.cta}
        <ArrowRight size={17} />
      </a>
    </article>
  );
};

/* ---------- component ---------- */
const LeadPackages = () => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="pk" ref={ref}>
      <VoiceSectionTitle eyebrow="LEAD PACKAGES">
        Choose Your Lead Package. Start Growing Today.
      </VoiceSectionTitle>

      <div className="pk-grid">
        {PLANS.map((plan) => (
          <PlanCard key={plan.key} plan={plan} run={inView} />
        ))}
      </div>

      <div className="pk-trust">
        {TRUST.map(([Icon, label]) => (
          <span key={label}>
            <Icon size={14} /> {label}
          </span>
        ))}
      </div>
    </section>
  );
};

export default LeadPackages;