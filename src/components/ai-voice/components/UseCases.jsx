import React from "react";
import VoiceSectionTitle from "./VoiceSectionTitle";
import { useCases } from "../data/voiceData";

const UseCases = () => {
  return (
    <section className="voice-usecases">
      <VoiceSectionTitle
        eyebrow="USE CASES"
        light="One AI Voice Agent."
        bold="Every Business. Every Customer."
      />
      

      <div className="usecases-grid">
        {useCases.map(([title, description]) => (
          <div className="usecase-card" key={title}>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        ))}
      </div>

      <div className="voice-stats">
        <div>
          <strong>5x</strong>
          <span>More Engagement</span>
        </div>

        <div>
          <strong>24/7</strong>
          <span>Availability</span>
        </div>

        <div>
          <strong>10x</strong>
          <span>Faster Response</span>
        </div>

        <div>
          <strong>99.9%</strong>
          <span>Uptime</span>
        </div>
      </div>
    </section>
  );
};

export default UseCases;