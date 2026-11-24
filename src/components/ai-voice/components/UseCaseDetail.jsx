import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Play,
  Mic,
  PhoneOff,
  Sparkles,
  Activity,
  User,
  Code2,
  AudioLines,
  Globe2,
  Clock3,
  Link2,
  MessageSquareHeart,
  Users,
} from "lucide-react";
import { useCases } from "../data/voiceData";
import "../AIVoicePage.css";
import "./UseCaseDetail.css";

const strip = [
  [AudioLines, "Natural Human-like Voice"],
  [Globe2, "Multi-language Support"],
  [Clock3, "24/7 Always Active"],
  [Link2, "Guide to Products & Pages"],
  [MessageSquareHeart, "Social Media Connection"],
  [Users, "Capture Leads in Dashboard"],
];

const wave = [14, 22, 34, 44, 52, 58, 52, 44, 34, 22, 14];

const UseCaseVideo = ({ src, poster, title }) => {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    if (!ref.current) return;
    ref.current.play();
    setPlaying(true);
  };

  return (
    <div
      className={`ucd-video ${playing ? "ucd-video-playing" : ""}`}
      style={!src ? { backgroundImage: `url(${poster})` } : undefined}
    >
      {src && (
        <video
          ref={ref}
          src={src}
          poster={poster}
          preload="metadata"
          playsInline
          controls={playing}
          onEnded={() => setPlaying(false)}
          aria-label={`${title} video`}
        />
      )}
      {!playing && (
        <button className="ucd-play" onClick={play} aria-label="Play video">
          <Play size={28} fill="currentColor" />
        </button>
      )}
    </div>
  );
};

const UseCaseDetail = ({ slug }) => {
  const item = useCases.find((u) => u.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!item) {
    return (
      <main className="ai-voice-page">
        <section className="ucd-hero ucd-notfound">
          <h1 className="fexa-title">
            <span>Use case</span>
            <strong>not found</strong>
          </h1>
          <a href="/ai-voice" className="ucd-back">
            <ArrowLeft size={16} /> Back to Use Cases
          </a>
        </section>
      </main>
    );
  }

  const { title, image, demo } = item;
  const profile = demo.profile || [];

  return (
    <main className="ai-voice-page">
      {/* 1. HERO */}
      <section className="ucd-hero">
        <div className="ucd-hero-text">
          <a href="/ai-voice" className="ucd-back">
            <ArrowLeft size={16} /> Back to Use Cases
          </a>

          <span className="eyebrow-light">
            <span className="eyebrow-light-content">{title}</span>
          </span>

          <h1 className="fexa-title">
            <span>{title}</span>
            <strong>{demo.headline}</strong>
          </h1>

          <p className="ucd-sub">{demo.text}</p>

          <div className="voice-hero-actions">
            <button className="voice-primary-btn">Try Live Demo</button>
            <a href="#ucd-demo" className="voice-secondary-btn">
              Explore what&rsquo;s possible
            </a>
          </div>

          <div className="voice-hero-checks">
            {/* {demo.points.map((p) => (
              <span key={p}>
                <CheckCircle2 size={16} /> {p}
              </span>
            ))} */}
          </div>
        </div>

        <UseCaseVideo
          src={demo.video?.src}
          poster={demo.video?.poster || image}
          title={title}
        />
      </section>

      {/* 2. HEADING */}
      <section className="ucd-works">
        <h2 className="fexa-title fexa-title-center fexa-title-lg">
          <span>AI agents that work</span>
          <strong>for you.</strong>
        </h2>
        <p className="voice-section-subtitle">{demo.worksText}</p>
        <span className="eyebrow-light">
          <span className="eyebrow-light-content">
            AI automation is always running
          </span>
        </span>
      </section>

      {/* 3. DEMO PANEL */}
      <section className="ucd-demo-wrap" id="ucd-demo">
        <div className="ucd-demo">
          <div className="ucd-col">
            <div className="ucd-meta">
              <div>
                <small>Channel</small>
                <b>{demo.channel}</b>
              </div>
              <div>
                <small>Scenario</small>
                <b>{demo.scenario}</b>
              </div>
            </div>
            <hr />
            <h4>
              <User size={16} /> Profile
            </h4>
            {profile.map(({ label, value }) => (
              <div className="ucd-field" key={label}>
                <small>{label}</small>
                <b>{value}</b>
              </div>
            ))}
            <hr />
            <h4 className="ucd-muted">
              <Code2 size={16} /> Under the hood
            </h4>
          </div>

          <div className="ucd-phone">
            <div className="ucd-timer">
              <Mic size={12} /> 00:00
            </div>
            <div className="ucd-wave" aria-hidden="true">
              {wave.map((h, i) => (
                <span key={i} style={{ height: h }} />
              ))}
            </div>
            <div className="ucd-empty">
              <b>Nothing yet</b>
              <span>Turns appear here as they happen.</span>
            </div>
            <div className="ucd-call">
              <button className="ucd-mute">
                <Mic size={14} /> Mute
              </button>
              <button className="ucd-end">
                <PhoneOff size={14} /> End
              </button>
            </div>
          </div>

          <div className="ucd-col">
            <h4>
              <Activity size={16} /> Real-time signals
              <em>Analyzing</em>
            </h4>
            <small>Sentiment</small>
            <h4 className="ucd-gap">
              <Sparkles size={16} /> Summary
            </h4>
            <h4 className="ucd-gap">
              <Activity size={16} /> Observations
            </h4>
          </div>
        </div>

        <p className="ucd-legal">
          By enabling your microphone, you agree to this AI-powered demo. Your
          voice audio may be processed in real-time to optimize connection
          quality. Please avoid sharing sensitive financial, health, or
          personal data. Responses use LLMs and may be inaccurate.
        </p>
      </section>

      {/* 4. FEATURE STRIP (existing voice-features classes) */}
      <section className="voice-features">
        <div className="voice-features-grid">
          {strip.map(([Icon, label]) => (
            <div className="voice-feature-item" key={label}>
              <span className="feature-icon">
                <Icon size={22} />
              </span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default UseCaseDetail;