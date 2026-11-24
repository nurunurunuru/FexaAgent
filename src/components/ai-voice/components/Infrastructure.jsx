import React from "react";
import {
  Bot,
  Sparkles,
  Zap,
  Volume2,
  Globe2,
  ArrowRight,
} from "lucide-react";

const Infrastructure = () => {
  const apis = [
    [Bot, "AI Engine", "Intelligent conversation processing"],
    [Sparkles, "LLM", "Natural language understanding"],
    [Zap, "Realtime API", "Fast response generation"],
    [Volume2, "Voice API", "Natural speech synthesis"],
  ];

  return (
    <section className="infra-section">
      <div className="infra-header">
        <span className="section-eyebrow">
          INFRASTRUCTURE
        </span>

        <h2>
          Built With Powerful AI Infrastructure.
        </h2>
      </div>

      <div className="api-cards">
        {apis.map(([Icon, title, description]) => (
          <div className="api-card" key={title}>
            <div className="api-icon">
              <Icon size={24} />
            </div>

            <h3>{title}</h3>

            <p>{description}</p>
          </div>
        ))}
      </div>

      <div className="architecture-flow">
        <div className="architecture-node">
          <Globe2 />
          <span>Customer</span>
        </div>

        <ArrowRight />

        <div className="architecture-node">
          <Bot />
          <span>AI Agent</span>
        </div>

        <ArrowRight />

        <div className="architecture-node">
          <Sparkles />
          <span>AI Engine</span>
        </div>

        <ArrowRight />

        <div className="architecture-node">
          <Volume2 />
          <span>Voice Response</span>
        </div>
      </div>
    </section>
  );
};

export default Infrastructure;