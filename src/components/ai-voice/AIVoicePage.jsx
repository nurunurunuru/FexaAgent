import React, { useEffect } from "react";

import "./AIVoicePage.css";

import VoiceHero from "./components/VoiceHero";
import UseCases from "./components/UseCases";
import TrustedBusinesses from "./components/TrustedBusinesses";
import VoiceFeatures from "./components/VoiceFeatures";
import VoiceDemo from "./components/VoiceDemo";
import HowItWorks from "./components/HowItWorks";
import Languages from "./components/Languages";
import OmniChannel from "./components/OmniChannel";
import LeadManagement from "./components/LeadManagement";
import KeyFeatures from "./components/KeyFeatures";
import Infrastructure from "./components/Infrastructure";
import Integrations from "./components/Integrations";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import VoiceFooter from "./components/VoiceFooter";

const AIVoicePage = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".ai-voice-page section, .ai-voice-page .animate-item"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main className="ai-voice-page">
      <VoiceHero />
      
      <UseCases />

      <TrustedBusinesses />

      <VoiceFeatures />

      <VoiceDemo />

      <HowItWorks />

      <Languages />

      <OmniChannel />

      <LeadManagement />

      <KeyFeatures />

      <Infrastructure />

      <Integrations />

      <Testimonials />

      <FAQ />

      <VoiceFooter />
    </main>
  );
};

export default AIVoicePage;