import React from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import VoiceSectionTitle from "./VoiceSectionTitle";

const Testimonials = () => {
  return (
    <section className="testimonial-section">
      <VoiceSectionTitle eyebrow="TESTIMONIALS">
        Loved by Businesses Worldwide.
      </VoiceSectionTitle>

      <div className="testimonial-main">
        <button className="testimonial-arrow">
          <ChevronLeft />
        </button>

        <div className="testimonial-content">
          <p>
            “Fexa AI completely changed the way we communicate
            with our customers. Our team saves hours every day.”
          </p>

          <strong>Business Owner</strong>
          <span>CEO, E-commerce Company</span>
        </div>

        <button className="testimonial-arrow">
          <ChevronRight />
        </button>
      </div>

      <div className="testimonial-mini-grid">
        <div className="mini-testimonial">
          “Amazing AI voice experience.”
        </div>

        <div className="mini-testimonial">
          “Our customer engagement increased significantly.”
        </div>

        <div className="mini-testimonial">
          “Easy to integrate and extremely powerful.”
        </div>

        <div className="mini-testimonial">
          “The 24/7 support is a game changer.”
        </div>
      </div>
    </section>
  );
};

export default Testimonials;