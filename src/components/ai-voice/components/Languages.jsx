import React from "react";
import VoiceSectionTitle from "./VoiceSectionTitle";
import { languages } from "../data/voiceData";

const Languages = () => {
  return (
    <section className="language-section">
      <VoiceSectionTitle eyebrow="LANGUAGES">
        Speak With Customers in Their Language.
      </VoiceSectionTitle>

      <div className="language-grid">
        {languages.map((language) => (
          <div className="language-item" key={language}>
            {language}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Languages;