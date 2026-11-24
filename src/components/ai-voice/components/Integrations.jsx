import React from "react";
import {
  Globe2,
  Plug,
  MessageCircle,
  Zap,
  MoreHorizontal,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";

import { platforms } from "../data/voiceData";
import VoiceSectionTitle from "./VoiceSectionTitle";

const Integrations = () => {
  const icons = {
    Website: Globe2,
    Facebook: FaFacebookF,
    Instagram: FaInstagram,
    WhatsApp: MessageCircle,
    Messenger: MessageCircle,
    Shopify: Plug,
    WooCommerce: Plug,
    WordPress: Globe2,
    Zapier: Zap,
    More: MoreHorizontal,
  };

  return (
    <section className="integrate-section">
      <VoiceSectionTitle eyebrow="INTEGRATIONS">
        Connect With the Tools You Already Use.
      </VoiceSectionTitle>

      <div className="platform-grid">
        {platforms.map((platform) => {
          const Icon = icons[platform] || Plug;

          return (
            <div className="platform-item" key={platform}>
              <Icon size={22} />
              <span>{platform}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Integrations;