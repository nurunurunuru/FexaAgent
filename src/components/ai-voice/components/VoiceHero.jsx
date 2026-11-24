import React from "react";
import { ArrowRight, Check } from "lucide-react";
import VoiceWidget from "./VoiceWidget";

const VoiceHero = () => {
  return (
    <section className="voice-hero">
      <div className="voice-hero-content">
        <div className="voice-hero-badge">AI POWERED</div>

        <h1>Your Website, Now Powered by AI Voice</h1>

        <h2>Turn Every Website Visit Into a Real Conversation.</h2>

        <p>
          Give your customers an intelligent voice experience that feels natural
          and effortless. Answer questions instantly, discover products, navigate
          website pages, book appointments, and capture valuable leads — all
          through human-like AI conversations, 24/7 in 100+ languages.
        </p>

        <div className="voice-hero-actions">
          <button className="voice-primary-btn">
            Get Started
            <ArrowRight size={18} />
          </button>

          <button className="voice-secondary-btn">Try Demo</button>
        </div>

        <div className="voice-hero-checks">
          <span>
            <Check size={15} />
            No coding required
          </span>

          <span>
            <Check size={15} />
            100+ languages
          </span>

          <span>
            <Check size={15} />
            24/7 available
          </span>
        </div>
      </div>

      <div className="voice-hero-widget">
        <VoiceWidget />
      </div>
    </section>
  );
};

export default VoiceHero;