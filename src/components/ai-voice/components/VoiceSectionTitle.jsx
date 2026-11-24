import React from "react";

// Splits a plain-text title into a light first part and a bold gradient second part.
const splitTitle = (text) => {
  const words = String(text).trim().split(/\s+/);
  const k = Math.ceil(words.length / 2);
  return [words.slice(0, k).join(" "), words.slice(k).join(" ")];
};

const VoiceSectionTitle = ({ eyebrow, children, light, bold, subtitle }) => {
  let first = light;
  let second = bold;

  if (first === undefined && typeof children === "string") {
    [first, second] = splitTitle(children);
  }

  return (
    <div className="voice-section-title">
      {eyebrow && <div className="section-eyebrow">{eyebrow}</div>}

      {first !== undefined ? (
        <h2 className="fexa-title fexa-title-center">
          <span>{first}</span>
          {second && <strong>{second}</strong>}
        </h2>
      ) : (
        <h2 className="fexa-title fexa-title-center">{children}</h2>
      )}

      {subtitle && <p className="voice-section-subtitle">{subtitle}</p>}
    </div>
  );
};

export default VoiceSectionTitle;
