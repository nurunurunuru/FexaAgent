import React from "react";
import {
  Bot,
  Send,
  MoreHorizontal,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";

const VoiceFooter = () => {
  return (
    <footer className="voice-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <div className="footer-logo">
            <Bot size={22} />
            <span>Fexa AI</span>
          </div>

          <p>
            Intelligent AI voice agents for modern businesses.
          </p>

          <div className="footer-socials">
            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>

            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>

            <a href="#" aria-label="More">
              <MoreHorizontal />
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h4>Product</h4>
          <a href="#">AI Voice</a>
          <a href="#">AI Chat</a>
          <a href="#">Integrations</a>
          <a href="#">Pricing</a>
        </div>

        <div className="footer-column">
          <h4>Company</h4>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Careers</a>
        </div>

        <div className="footer-column">
          <h4>Resources</h4>
          <a href="#">Documentation</a>
          <a href="#">Help Center</a>
          <a href="#">Blog</a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © 2026 Fexa AI. All rights reserved.
        </span>

        <button>
          Contact Us
          <Send size={16} />
        </button>
      </div>
    </footer>
  );
};

export default VoiceFooter;