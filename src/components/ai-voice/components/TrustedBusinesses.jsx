import React from "react";
import * as Fa from "react-icons/fa";
import * as Fa6 from "react-icons/fa6";
import * as Fc from "react-icons/fc";
import * as Si from "react-icons/si";

/* Microsoft er official 4-colour logo (nijer SVG) */
const MicrosoftLogo = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 23 23" aria-hidden="true">
    <rect x="1" y="1" width="10" height="10" fill="#F25022" />
    <rect x="12" y="1" width="10" height="10" fill="#7FBA00" />
    <rect x="1" y="12" width="10" height="10" fill="#00A4EF" />
    <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
  </svg>
);

/* Kono icon na pele crash na kore ekta letter badge dekhabe */
const makeFallback = (letter, color = "#35ffc0") => {
  const Fallback = ({ size = 26 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="none" stroke={color} strokeWidth="1.5" />
      <text x="12" y="16.5" textAnchor="middle" fontSize="12" fontWeight="700" fill={color}>
        {letter}
      </text>
    </svg>
  );
  return Fallback;
};

/* Namespace import + fallback chain: version e kono icon na thakleo build bhangbe na */
const logos = [
  { name: "Google", Icon: Fc.FcGoogle || Fa.FaGoogle || makeFallback("G") },
  { name: "Microsoft", Icon: MicrosoftLogo },
  {
    name: "Amazon",
    Icon: Fa.FaAmazon || Si.SiAmazon || makeFallback("A", "#FF9900"),
    color: "#FF9900",
  },
  {
    name: "Meta",
    Icon: Si.SiMeta || Fa6.FaMeta || makeFallback("M", "#0866FF"),
    color: "#0866FF",
  },
  {
    name: "Shopify",
    Icon: Si.SiShopify || Fa.FaShopify || makeFallback("S", "#95BF47"),
    color: "#95BF47",
  },
  {
    name: "HubSpot",
    Icon: Si.SiHubspot || Fa.FaHubspot || makeFallback("H", "#FF7A59"),
    color: "#FF7A59",
  },
  {
    name: "Salesforce",
    Icon: Fa.FaSalesforce || Si.SiSalesforce || makeFallback("S", "#00A1E0"),
    color: "#00A1E0",
  },
  {
    name: "OpenAI",
    Icon: Si.SiOpenai || makeFallback("O", "#FFFFFF"),
    color: "#FFFFFF",
  },
];

const TrustedBusinesses = () => {
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="trusted-section">
      <div className="trusted-heading">
        TRUSTED BY 1,000+ BUSINESSES WORLDWIDE
      </div>

      <div className="trusted-marquee">
        <div className="trusted-track">
          {duplicatedLogos.map(({ name, Icon, color }, index) => (
            <div className="trusted-logo" key={`${name}-${index}`}>
              <Icon size={26} color={color} aria-label={name} />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBusinesses;