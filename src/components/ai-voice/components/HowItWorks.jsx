import React from "react";
import {
  Bot,
  Users,
  Mic2,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    [Bot, "Install", "Add the AI voice widget to your website."],
    [Users, "Connect", "Connect your business information and tools."],
    [Mic2, "Talk", "Customers talk naturally with your AI agent."],
    [MessageCircle, "Convert", "AI answers, helps and captures leads."],
  ];

  return (
    <section className="how-section">
      <div className="how-grid">
        {steps.map(([Icon, title, description], index) => (
          <React.Fragment key={title}>
            <div className="how-step">
              <div className="how-icon">
                <Icon size={24} />
              </div>

              <span className="how-number">
                0{index + 1}
              </span>

              <h3>{title}</h3>

              <p>{description}</p>
            </div>

            {index < steps.length - 1 && (
              <ArrowRight className="how-arrow" />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;