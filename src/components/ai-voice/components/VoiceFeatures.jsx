import React from "react";
import VoiceSectionTitle from "./VoiceSectionTitle";
import {
  Mic2,
  Globe2,
  Sparkles,
  Share2,
  MessageCircle,
  Bot,
} from "lucide-react";

const VoiceFeatures = () => {
  const items = [
    [Mic2, "Natural Voice"],
    [Globe2, "100+ Languages"],
    [Sparkles, "Smart Navigation"],
    [Share2, "Social Media"],
    [MessageCircle, "Real-time Text"],
    [Bot, "AI Powered"],
  ];

  return (
    <section className="voice-features">
      <VoiceSectionTitle eyebrow="">
        Everything Your AI Voice Agent Needs
      <h1>From natural conversations to intelligent customer engagement, everything your business needs to deliver exceptional voice experiences. </h1>
      </VoiceSectionTitle>
      <div className="voice-features-grid">
        {items.map(([Icon, title]) => (
          <div className="voice-feature-item" key={title}>
            <div className="feature-icon">
              <Icon size={22} />
            </div>

            <span>{title}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VoiceFeatures;