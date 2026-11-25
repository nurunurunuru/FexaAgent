import React from "react";
import { Globe2, MoreHorizontal } from "lucide-react";
import {
  SiFacebook,
  SiInstagram,
  SiWhatsapp,
  SiMessenger,
  SiShopify,
  SiWoocommerce,
  SiWordpress,
  SiZapier,
} from "react-icons/si";

import { platforms } from "../data/voiceData";
import VoiceSectionTitle from "./VoiceSectionTitle";

// real brand logos + official brand colors
const brands = {
  Website: { Icon: Globe2, color: "#06845d" },
  Facebook: { Icon: SiFacebook, color: "#1877F2" },
  Instagram: { Icon: SiInstagram, color: "#E4405F" },
  WhatsApp: { Icon: SiWhatsapp, color: "#25D366" },
  Messenger: { Icon: SiMessenger, color: "#0A7CFF" },
  Shopify: { Icon: SiShopify, color: "#5E8E3E" },
  WooCommerce: { Icon: SiWoocommerce, color: "#96588A" },
  WordPress: { Icon: SiWordpress, color: "#21759B" },
  Zapier: { Icon: SiZapier, color: "#FF4A00" },
  More: { Icon: MoreHorizontal, color: "#06845d" },
};

const Integrations = () => (
  <section className="integrate-section">
    <VoiceSectionTitle eyebrow="INTEGRATIONS">
      Connect With the Tools You Already Use.
    </VoiceSectionTitle>

    <div className="platform-grid">
      {platforms.map((platform) => {
        const { Icon, color } = brands[platform] || brands.More;
        return (
          <div
            className="platform-item"
            key={platform}
            style={{ "--brand": color }}
          >
            <span className="platform-logo">
              <Icon size={26} />
            </span>
            <span>{platform}</span>
          </div>
        );
      })}
    </div>
  </section>
);

export default Integrations;