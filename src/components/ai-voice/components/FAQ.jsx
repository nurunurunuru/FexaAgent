import React from "react";
import VoiceSectionTitle from "./VoiceSectionTitle";

const FAQ = () => {
  return (
    <section className="faq-section">
      <VoiceSectionTitle eyebrow="FAQ">
        Frequently Asked Questions.
      </VoiceSectionTitle>

      <div className="faq-list">
        <details open>
          <summary>
            What is Fexa AI Voice Agent?
          </summary>

          <p>
            Fexa AI Voice Agent is an AI-powered assistant
            that can talk with your customers naturally.
          </p>
        </details>

        <details>
          <summary>
            Do I need coding knowledge?
          </summary>

          <p>
            No. You can integrate the agent with your website
            without advanced coding knowledge.
          </p>
        </details>

        <details>
          <summary>
            How many languages does it support?
          </summary>

          <p>
            It can communicate in more than 100 languages.
          </p>
        </details>

        <details>
          <summary>
            Can it capture leads?
          </summary>

          <p>
            Yes. The agent can collect customer information
            such as name, email and phone number.
          </p>
        </details>

        <details>
          <summary>
            Can it work 24/7?
          </summary>

          <p>
            Yes. The AI agent can handle conversations
            continuously.
          </p>
        </details>
      </div>
    </section>
  );
};

export default FAQ;