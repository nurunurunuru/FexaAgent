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

        <h2 className="fexa-title fexa-title-sm">
<span>One AI.</span>
<strong>Every Channel.</strong>
</h2>

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
        <h2 className="fexa-title fexa-title-sm">
<span>Capture</span>
<strong>Every Lead</strong>
</h2>

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