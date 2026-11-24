import React, { useEffect } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useCases } from "../data/voiceData";
import "../AIVoicePage.css";

const UseCaseDetail = ({ slug }) => {
  const item = useCases.find((u) => u.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!item) {
    return (
      <main className="ai-voice-page">
        <section className="usecase-detail">
          <h1>Use case not found</h1>
          <a href="/ai-voice" className="voice-secondary-btn">
            <ArrowLeft size={18} /> Back
          </a>
        </section>
      </main>
    );
  }

  const { title, description, image, demo } = item;

  return (
    <main className="ai-voice-page">
      <section className="usecase-detail">
        <a href="/ai-voice" className="usecase-back">
          <ArrowLeft size={16} /> Back to Use Cases
        </a>

        <div className="usecase-detail-hero">
          <div
            className="usecase-detail-image"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="usecase-detail-content">
            <span className="section-eyebrow">USE CASE</span>
            <h1>{title}</h1>
            <p className="usecase-detail-sub">{description}</p>
            <h2>{demo.headline}</h2>
            <p>{demo.text}</p>
            <ul className="usecase-detail-points">
              {demo.points.map((point) => (
                <li key={point}>
                  <CheckCircle2 size={18} /> {point}
                </li>
              ))}
            </ul>
            <div className="voice-hero-actions">
              <button className="voice-primary-btn">Try Live Demo</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default UseCaseDetail;