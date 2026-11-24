import React from "react";

const VoiceSectionTitle = ({ eyebrow, children }) => {
  return (
    <div className="voice-section-title">
      {eyebrow && <div className="section-eyebrow">{eyebrow}</div>}

      <h2>{children}</h2>
    </div>
  );
};

export default VoiceSectionTitle;