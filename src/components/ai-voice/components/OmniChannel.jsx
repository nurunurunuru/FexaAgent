import React, { useEffect, useRef, useState } from "react";
import { Globe2, Bot, UserPlus, CheckCircle2 } from "lucide-react";
import { SiFacebook, SiInstagram, SiWhatsapp, SiMessenger } from "react-icons/si";

const brand = {
  Website: { Icon: Globe2, color: "#06845d" },
  Facebook: { Icon: SiFacebook, color: "#1877F2" },
  Instagram: { Icon: SiInstagram, color: "#E4405F" },
  WhatsApp: { Icon: SiWhatsapp, color: "#25D366" },
  Messenger: { Icon: SiMessenger, color: "#0A7CFF" },
};
const channels = Object.keys(brand);

const pool = [
  { name: "Rahim Uddin", email: "rahim.uddin@gmail.com", phone: "+880 1712 ••• 421", status: "New", src: "WhatsApp" },
  { name: "Nadia Rahman", email: "nadia@brightmail.com", phone: "+880 1819 ••• 305", status: "Qualified", src: "Facebook" },
  { name: "Karim Hossain", email: "karim.h@outlook.com", phone: "+880 1915 ••• 872", status: "Booked", src: "Website" },
  { name: "Sara Ahmed", email: "sara.ahmed@gmail.com", phone: "+1 415 ••• 2209", status: "New", src: "Instagram" },
  { name: "Farhan Islam", email: "farhan.islam@mail.com", phone: "+880 1611 ••• 548", status: "Qualified", src: "Messenger" },
  { name: "Tania Akter", email: "tania.akter@gmail.com", phone: "+880 1717 ••• 093", status: "New", src: "Website" },
  { name: "Daniel Moore", email: "d.moore@company.co", phone: "+44 7700 ••• 612", status: "Booked", src: "WhatsApp" },
  { name: "Ayesha Khan", email: "ayesha.k@gmail.com", phone: "+92 300 ••• 7741", status: "New", src: "Facebook" },
];

const hues = [160, 200, 265, 20, 340, 45];
const initials = (n) => n.split(" ").map((w) => w[0]).join("").slice(0, 2);

const OmniChannel = () => {
  const [leads, setLeads] = useState(() =>
    pool.slice(0, 4).reverse().map((l, i) => ({ ...l, id: i }))
  );
  const [count, setCount] = useState(128);
  const nextRef = useRef(4);
  const idRef = useRef(4);

  useEffect(() => {
    const t = setInterval(() => {
      const l = pool[nextRef.current % pool.length];
      nextRef.current += 1;
      setLeads((p) => [{ ...l, id: idRef.current++ }, ...p].slice(0, 4));
      setCount((c) => c + 1);
    }, 3400);
    return () => clearInterval(t);
  }, []);

  const latest = leads[0];
  const LatestIcon = brand[latest.src].Icon;

  return (
    <section className="lead-section">
      {/* ---------- OMNICHANNEL ---------- */}
      <div className="omnichannel-card ox-card">
        <div className="omnichannel-icon">
          <Globe2 size={26} />
        </div>

        <h2 className="fexa-title fexa-title-sm">
          <span>One AI.</span>
          <strong>Every Channel.</strong>
        </h2>

        <p>
          Connect your AI voice agent with your website, Facebook, Instagram,
          WhatsApp and Messenger.
        </p>

        <div className="ox-visual">
          <div className="ox-orbit">
            <span className="ox-ring ox-ring-1" />
            <span className="ox-ring ox-ring-2" />

            <div className="ox-spin">
              {channels.map((c, i) => {
                const { Icon, color } = brand[c];
                return (
                  <div
                    className="ox-node"
                    key={c}
                    style={{ "--a": `${i * 72}deg`, "--brand": color }}
                  >
                    <span className="ox-badge" title={c}>
                      <Icon size={22} />
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="ox-core">
              <span className="ox-pulse" />
              <span className="ox-pulse ox-pulse-2" />
              <Bot size={34} />
            </div>
          </div>
        </div>

        <div className="ox-stats">
          <span><i /> 5 channels live</span>
          <span>Replies in under 1s</span>
        </div>
      </div>

      {/* ---------- LEAD CAPTURE ---------- */}
      <div className="lead-management ox-card">
        <div className="omnichannel-icon">
          <UserPlus size={26} />
        </div>

        <h2 className="fexa-title fexa-title-sm">
          <span>Capture</span>
          <strong>Every Lead</strong>
        </h2>

        <p>
          Automatically collect customer information and manage every
          conversation from your dashboard.
        </p>

        <div className="ox-visual">
          <div className="ox-dash">
            <div className="ox-dash-head">
              <span className="ox-live"><i /> Leads · Live</span>
              <span className="ox-count">
                <b key={count}>{count}</b> captured today
              </span>
            </div>

            <div className="ox-cols">
              <span>Name</span>
              <span className="ox-email">Email</span>
              <span>Phone</span>
              <span>Status</span>
            </div>

            <div className="ox-rows">
              {leads.map((l, i) => {
                const { Icon, color } = brand[l.src];
                const hue = hues[l.name.charCodeAt(0) % hues.length];
                return (
                  <div className={`ox-row ${i === 0 ? "is-new" : ""}`} key={l.id}>
                    <span className="ox-name">
                      <span
                        className="ox-avatar"
                        style={{ background: `linear-gradient(135deg, hsl(${hue} 70% 55%), hsl(${hue + 30} 70% 40%))` }}
                      >
                        {initials(l.name)}
                        <span className="ox-src" style={{ color }} title={l.src}>
                          <Icon size={9} />
                        </span>
                      </span>
                      <b>{l.name}</b>
                    </span>
                    <span className="ox-email ox-muted">{l.email}</span>
                    <span className="ox-muted">{l.phone}</span>
                    <span className={`ox-pill ox-${l.status.toLowerCase()}`}>{l.status}</span>
                  </div>
                );
              })}
            </div>

            <div className="ox-toast" key={latest.id}>
              <CheckCircle2 size={14} /> New lead captured via <LatestIcon size={12} /> {latest.src}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OmniChannel;