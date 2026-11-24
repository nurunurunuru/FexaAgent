import React from "react";
import VoiceSectionTitle from "./VoiceSectionTitle";
import { useCases } from "../data/voiceData";

const UseCases = () => {
  return (
    <section className="voice-usecases">
      <VoiceSectionTitle eyebrow="USE CASES">
        Perfect for Every Business.
        <h1>One AI Voice Agent. Every Business. Every Customer</h1>
      </VoiceSectionTitle>

      <div className="usecases-grid">
        {useCases.map(({ slug, title, description, image }) => (
          <a
            href={`/ai-voice/use-cases/${slug}`}
            className="usecase-card"
            key={slug}
          >
            <div
              className="usecase-image"
              style={{ backgroundImage: `url(${image})` }}
            />
            <div className="usecase-body">
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="voice-stats">
        <div><strong>5x</strong><span>More Engagement</span></div>
        <div><strong>24/7</strong><span>Availability</span></div>
        <div><strong>10x</strong><span>Faster Response</span></div>
        <div><strong>99.9%</strong><span>Uptime</span></div>
      </div>
    </section>
  );
};

export default UseCases;