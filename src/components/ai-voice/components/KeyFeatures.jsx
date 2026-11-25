import React, { useEffect, useState } from "react";
import { Globe2, Check, CheckCircle2 } from "lucide-react";
import { SiFacebook, SiInstagram, SiWhatsapp, SiMessenger, SiWordpress, SiShopify, SiWoocommerce } from "react-icons/si";
import { US, ES, FR, IN, JP } from "country-flag-icons/react/3x2";
import VoiceSectionTitle from "./VoiceSectionTitle";
import { features } from "../data/voiceData";

const useTick = (ms, n) => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % n), ms);
    return () => clearInterval(t);
  }, [ms, n]);
  return i;
};

/* 1. natural voice */
const Voice = () => (
  <div className="kf-voice">
    <div className="kf-pill"><i /> Aria · speaking <em>00:42</em></div>
    <div className="kf-bars">
      {Array.from({ length: 38 }, (_, i) => (
        <span key={i} style={{ "--d": `${(i * 0.07) % 1.2}s`, "--h": `${28 + Math.abs(Math.sin(i * 0.5)) * 72}%` }} />
      ))}
    </div>
  </div>
);

/* 2. multi-language */
const greet = [[US, "Hello", "English"], [ES, "Hola", "Spanish"], [FR, "Bonjour", "French"], [IN, "नमस्ते", "Hindi"], [JP, "こんにちは", "Japanese"]];
const Lang = () => {
  const i = useTick(1800, greet.length);
  const [F, t, n] = greet[i];
  return (
    <div className="kf-lang">
      <div className="kf-lang-main" key={i}>
        <span className="kf-flag kf-flag-lg"><F /></span>
        <div><b>{t}</b><small>{n} detected</small></div>
      </div>
      <div className="kf-lang-row">
        {greet.map(([G], j) => (
          <span key={j} className={`kf-flag ${j === i ? "on" : ""}`}><G /></span>
        ))}
      </div>
    </div>
  );
};

/* 3. smart navigation */
const targets = [["Where can I see pricing?", "/pricing"], ["Show me running shoes", "/shop/running-shoes"], ["How do I contact you?", "/contact"]];
const Nav = () => {
  const i = useTick(4200, targets.length);
  const [url, setUrl] = useState("");
  useEffect(() => {
    const full = targets[i][1];
    let k = 0, t;
    setUrl("");
    const d = setTimeout(() => {
      t = setInterval(() => {
        k += 1;
        setUrl(full.slice(0, k));
        if (k >= full.length) clearInterval(t);
      }, 55);
    }, 900);
    return () => { clearTimeout(d); clearInterval(t); };
  }, [i]);
  return (
    <div className="kf-nav">
      <div className="kf-ask" key={i}>{targets[i][0]}</div>
      <div className="kf-browser">
        <div className="kf-browser-bar">
          <i /><i /><i />
          <span>fexa.ai<b>{url}</b><u /></span>
        </div>
        <div className="kf-page" key={`p${i}`}>
          <span className="kf-skel w60" /><span className="kf-skel w90" />
          <span className="kf-hit" />
        </div>
      </div>
    </div>
  );
};

/* 4. social connection */
const socials = [[Globe2, "#06845d", "Website"], [SiFacebook, "#1877F2", "Facebook"], [SiInstagram, "#E4405F", "Instagram"], [SiWhatsapp, "#25D366", "WhatsApp"], [SiMessenger, "#0A7CFF", "Messenger"]];
const Social = () => {
  const i = useTick(1500, socials.length);
  return (
    <div className="kf-social">
      <div className="kf-brands">
        {socials.map(([Icon, c, n], j) => (
          <span key={n} className={`kf-brand ${j === i ? "ping" : ""}`} style={{ "--brand": c }}>
            <Icon size={20} /><i />
          </span>
        ))}
      </div>
      <div className="kf-pill" key={i}><i /> {socials[i][2]} · new message</div>
    </div>
  );
};

/* 5. real-time transcript */
const lines = [["c", "Do you deliver on weekends?"], ["a", "Yes! Delivery is available Saturday and Sunday."], ["c", "Great, please book Saturday."], ["a", "Done! You're booked for Saturday."]];
const Transcript = () => {
  const s = useTick(1700, lines.length + 2);
  const shown = lines.slice(0, Math.min(s + 1, lines.length));
  return (
    <div className="kf-tr">
      <div className="kf-pill"><i /> LIVE TRANSCRIPT</div>
      {shown.slice(-3).map(([w, t]) => (
        <div key={t} className={`kf-msg ${w === "a" ? "agent" : "cust"}`}>{t}</div>
      ))}
    </div>
  );
};

/* 6. lead capture */
const fields = [["Name", "Rahim Uddin"], ["Email", "rahim@mail.com"], ["Phone", "+880 17•• ••• 421"]];
const Lead = () => {
  const s = useTick(1100, 5);
  return (
    <div className="kf-lead">
      {fields.map(([l, v], idx) => (
        <div className="kf-field" key={l}>
          <small>{l}</small>
          <b>{s > idx ? v : "—"}</b>
          <span className={s > idx ? "ok" : ""}><Check size={11} /></span>
        </div>
      ))}
      <div className={`kf-saved ${s === 4 ? "on" : ""}`}><CheckCircle2 size={13} /> Saved to dashboard</div>
    </div>
  );
};

/* 7. 24/7 */
const Always = () => {
  const h = useTick(420, 24);
  return (
    <div className="kf-always">
      <div className="kf-pill"><i /> {String(h).padStart(2, "0")}:00 · answering</div>
      <div className="kf-hours">
        {Array.from({ length: 24 }, (_, i) => (
          <span key={i} className={i < h ? "done" : i === h ? "now" : ""} style={{ height: `${28 + Math.abs(Math.sin(i * 0.9)) * 62}%` }} />
        ))}
      </div>
      <div className="kf-axis"><span>12 AM</span><span>12 PM</span><span>11 PM</span></div>
    </div>
  );
};

/* 8. easy integration */
const Integrate = () => (
  <div className="kf-code">
    <div className="kf-code-bar"><i /><i /><i /><span>index.html</span></div>
    <pre>
      <span className="kf-t1"><b>&lt;script</b> <u>src</u>=<s>"https://cdn.fexa.ai/widget.js"</s></span>
      <span className="kf-t2">  <u>defer</u><b>&gt;&lt;/script&gt;</b></span>
    </pre>
    <div className="kf-installed">
      <CheckCircle2 size={14} /> Installed in 30 seconds
      <span><SiWordpress size={13} /><SiShopify size={13} /><SiWoocommerce size={13} /></span>
    </div>
  </div>
);

const visuals = {
  "Natural & Human-like Voice": Voice,
  "Multi-language Support": Lang,
  "Smart Page & Product Navigation": Nav,
  "Social Media Connection": Social,
  "Real-time Voice + Text Preview": Transcript,
  "Lead Capture & Dashboard": Lead,
  "24/7 Always Active": Always,
  "Easy Integration": Integrate,
};

// bento order + width (columns)
const layout = [
  ["Natural & Human-like Voice", 2], ["Multi-language Support", 1], ["24/7 Always Active", 1],
  ["Smart Page & Product Navigation", 2], ["Social Media Connection", 1], ["Lead Capture & Dashboard", 1],
  ["Real-time Voice + Text Preview", 2], ["Easy Integration", 2],
];

const spot = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

const KeyFeatures = () => {
  const ordered = [
    ...layout.map(([t, span]) => ({ f: features.find((x) => x[1] === t), span })).filter((x) => x.f),
    ...features.filter((x) => !layout.some(([t]) => t === x[1])).map((f) => ({ f, span: 1 })),
  ];

  return (
    <section className="key-features">
      <VoiceSectionTitle eyebrow="KEY FEATURES">
        Everything Your AI Voice Agent Needs.
      </VoiceSectionTitle>

      <div className="key-features-grid">
        {ordered.map(({ f: [Icon, title, description], span }) => {
          const Visual = visuals[title];
          return (
            <div className={`key-feature-card kf-card kf-span-${span}`} key={title} onMouseMove={spot}>
              <div className="kf-visual">{Visual && <Visual />}</div>
              <div className="kf-body">
                <div className="kf-head">
                  <span className="key-feature-icon"><Icon size={20} /></span>
                  <h3>{title}</h3>
                </div>
                <p>{description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default KeyFeatures;