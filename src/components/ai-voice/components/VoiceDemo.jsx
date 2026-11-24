import React from "react";
import VoiceSectionTitle from "./VoiceSectionTitle";
import VoiceWidget from "./VoiceWidget";

const VoiceDemo = () => {
  return (
    <section className="voice-demo-section">
      <VoiceSectionTitle eyebrow="LIVE DEMO">
        See How AI Voice Chat Works for Your Business.
      </VoiceSectionTitle>

      <div className="voice-demo-action">
        <button className="voice-primary-btn">
          ▶ Play Demo
        </button>
      </div>

      <div className="voice-laptop">
        <div className="voice-laptop-screen">
          <VoiceWidget />
        </div>
      </div>
    </section>
  );
};

export default VoiceDemo;