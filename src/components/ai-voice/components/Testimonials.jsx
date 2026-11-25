import React from "react";
import { Star, Quote, BadgeCheck, TrendingUp, ArrowRight } from "lucide-react";
import VoiceSectionTitle from "./VoiceSectionTitle";

/* PLACEHOLDER content — live korar age real customer-er real review diye bodle nin */
const summary = { rating: "4.9", businesses: "2,000+" };

const reviews = [
  { name: "Rahim Chowdhury", role: "Founder, Urban Soles", tag: "E-commerce", result: "+38% after-hours orders",
    text: "Our customers get answers at 2 AM now. Orders that used to wait until morning are completed while we sleep." },
  { name: "Dr. Nusrat Jahan", role: "Director, CareFirst Clinic", tag: "Healthcare", result: "62% fewer missed calls",
    text: "The agent books appointments and answers fee questions in Bengali and English. Our front desk finally has time for patients." },
  { name: "Farhan Islam", role: "Broker, Dhanmondi Homes", tag: "Real Estate",
    text: "Setup took one afternoon. I pasted a single script on our website and the voice agent started handling listing questions." },
  { name: "Tania Akter", role: "Admissions Head, BrightPath Academy", tag: "Education", result: "3x more admission leads",
    text: "Parents call after office hours to ask about admissions. The agent answers every time and captures their number." },
  { name: "Daniel Moore", role: "Owner, Moore & Sons Cleaning", tag: "Services",
    text: "The voice sounds so natural that customers often don't realise they're talking to an AI until we tell them." },
  { name: "Sara Ahmed", role: "Marketing Lead, Nova Fashion", tag: "E-commerce",
    text: "Leads land straight in the dashboard with name, phone and what they asked for. My team just follows up." },
  { name: "Karim Hossain", role: "COO, QuickMart", tag: "Retail",
    text: "We connected WhatsApp and Facebook in minutes. One agent now covers every channel our customers use." },
  { name: "Ayesha Khan", role: "E-commerce Manager, Lumen Home", tag: "E-commerce", result: "-24% bounce rate",
    text: "It guides visitors to the right product page by voice. Our bounce rate dropped noticeably in the first month." },
  { name: "Omar Al-Farsi", role: "Founder, Gulf Travel Desk", tag: "Travel",
    text: "Our customers speak Arabic, Hindi and English. The agent replies in the same language every single time." },
  { name: "Julian Sterling", role: "Owner, Sterling Auto Care", tag: "Services", result: "0 calls missed",
    text: "We stopped losing calls during busy hours. Every inquiry gets answered and booked automatically." },
  { name: "Claire Beauchamp", role: "Ops Director, Atelier Studio", tag: "Agency",
    text: "The real-time transcript helps us review conversations quickly and improve what the agent says." },
  { name: "Hiroshi Tanaka", role: "Head of Support, Pulse Dynamics", tag: "SaaS",
    text: "Support costs went down while customer satisfaction went up. It paid for itself in the first month." },
];

const hue = (s) => [...s].reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
const initials = (n) => n.replace(/^Dr\.\s*/, "").split(" ").map((w) => w[0]).join("").slice(0, 2);
const avatarBg = (n) => `linear-gradient(135deg, hsl(${hue(n)} 75% 58%), hsl(${(hue(n) + 40) % 360} 75% 42%))`;

const spot = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

const Stars = () => (
  <span className="tm-stars" aria-label="5 out of 5 stars">
    {[0, 1, 2, 3, 4].map((i) => <Star key={i} size={14} fill="currentColor" />)}
  </span>
);

const Card = ({ r, hidden }) => (
  <article className="tm-card" onMouseMove={spot} aria-hidden={hidden || undefined}>
    <div className="tm-top">
      <Stars />
      <Quote size={22} className="tm-quote" />
    </div>
    <p>{r.text}</p>
    {r.result && (
      <span className="tm-result"><TrendingUp size={13} /> {r.result}</span>
    )}
    <div className="tm-user">
      <span className="tm-avatar" style={{ background: avatarBg(r.name) }}>{initials(r.name)}</span>
      <div className="tm-who">
        <b>{r.name} <BadgeCheck size={14} /></b>
        <small>{r.role}</small>
      </div>
      <span className="tm-tag">{r.tag}</span>
    </div>
  </article>
);

const Row = ({ items, reverse, duration }) => (
  <div className="tm-row">
    <div className={`tm-track ${reverse ? "rev" : ""}`} style={{ animationDuration: duration }}>
      {[...items, ...items].map((r, i) => (
        <Card key={i} r={r} hidden={i >= items.length} />
      ))}
    </div>
  </div>
);

const Testimonials = () => (
  <section className="testimonial-section tm-section">
    <VoiceSectionTitle eyebrow="TESTIMONIALS">
      Loved by Businesses Worldwide.
    </VoiceSectionTitle>

    <div className="tm-summary">
      <div className="tm-stack">
        {reviews.slice(0, 5).map((r) => (
          <span key={r.name} style={{ background: avatarBg(r.name) }}>{initials(r.name)}</span>
        ))}
      </div>
      <div className="tm-rating">
        <Stars />
        <b>{summary.rating}</b><small>/ 5 average rating</small>
      </div>
      <span className="tm-sep" />
      <div className="tm-trust"><b>{summary.businesses}</b> businesses trust Fexa</div>
    </div>

    <div className="tm-rows">
      <Row items={reviews.slice(0, 6)} duration="70s" />
      <Row items={reviews.slice(6)} reverse duration="80s" />
    </div>

    <a href="#" className="tm-link">
      Read every customer story <ArrowRight size={15} />
    </a>
  </section>
);

export default Testimonials;