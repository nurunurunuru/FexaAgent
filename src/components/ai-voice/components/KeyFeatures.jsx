import React from "react";
import VoiceSectionTitle from "./VoiceSectionTitle";
import { features } from "../data/voiceData";

const KeyFeatures = () => {
  return (
    <section className="key-features">
      <VoiceSectionTitle eyebrow="KEY FEATURES">
        Everything Your AI Voice Agent Needs.
      </VoiceSectionTitle>

      <div className="key-features-grid">
        {features.map(([Icon, title, description]) => (
          <div className="key-feature-card" key={title}>
            <div className="key-feature-icon">
              <Icon size={24} />
            </div>

            <h3>{title}</h3>

            <p>{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KeyFeatures;