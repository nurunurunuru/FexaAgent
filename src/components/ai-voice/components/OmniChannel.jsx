import React from "react";
import {
  Globe2,
  MessageCircle,
  MoreHorizontal,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";

const OmniChannel = () => {
  return (
    <section className="lead-section">
      <div className="omnichannel-card">
        <div className="omnichannel-icon">
          <Globe2 size={26} />
        </div>

        <h2>One AI. Every Channel.</h2>

        <p>
          Connect your AI voice agent with your website,
          Facebook, Instagram, WhatsApp and Messenger.
        </p>

        <div className="channel-icons">
          <Globe2 />
          <FaFacebookF />
          <FaInstagram />
          <MessageCircle />
          <MoreHorizontal />
        </div>
      </div>

      <div className="lead-management">
        <h2>Capture Every Lead</h2>

        <p>
          Automatically collect customer information
          and manage every conversation from your dashboard.
        </p>

        <div className="lead-table">
          <div>Name</div>
          <div>Email</div>
          <div>Phone</div>
          <div>Status</div>
        </div>
      </div>
    </section>
  );
};

export default OmniChannel;