import React from "react";
import { Globe2 } from "lucide-react";
import {
  US,
  ES,
  FR,
  DE,
  SA,
  IN,
  CN,
  JP,
  BD,
  PT,
  IT,
} from "country-flag-icons/react/3x2";
import VoiceSectionTitle from "./VoiceSectionTitle";
import { languages } from "../data/voiceData";

// real SVG flags (emoji flags do not render on Windows)
const meta = {
  English: { Flag: US, hello: "Hello", lang: "en" },
  Spanish: { Flag: ES, hello: "Hola", lang: "es" },
  French: { Flag: FR, hello: "Bonjour", lang: "fr" },
  German: { Flag: DE, hello: "Hallo", lang: "de" },
  Arabic: { Flag: SA, hello: "مرحبا", lang: "ar" },
  Hindi: { Flag: IN, hello: "नमस्ते", lang: "hi" },
  Chinese: { Flag: CN, hello: "你好", lang: "zh" },
  Japanese: { Flag: JP, hello: "こんにちは", lang: "ja" },
  Bengali: { Flag: BD, hello: "হ্যালো", lang: "bn" },
  Portuguese: { Flag: PT, hello: "Olá", lang: "pt" },
  Italian: { Flag: IT, hello: "Ciao", lang: "it" },
};

const Languages = () => {
  return (
    <section className="language-section">
      <VoiceSectionTitle eyebrow="LANGUAGES">
        Speak With Customers in Their Language.
      </VoiceSectionTitle>

      <div className="language-grid">
        {languages.map((language) => {
          // "🇺🇸 English" -> "English"  (emoji part is dropped)
          const name = language.replace(/^\S+\s+/, "");
          const item = meta[name];

          if (!item) {
            return (
              <div className="language-item lang-more" key={language}>
                <span className="lang-globe">
                  <Globe2 size={20} />
                </span>
                <span className="lang-text">
                  <span className="lang-name">{name}</span>
                  <span className="lang-sub">and growing</span>
                </span>
              </div>
            );
          }

          const { Flag, hello, lang } = item;
          return (
            <div className="language-item" key={language}>
              <span className="lang-flag">
                <Flag title={name} />
              </span>
              <span className="lang-text">
                <span className="lang-name">{name}</span>
                <span className="lang-sub" lang={lang}>
                  {hello}
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Languages;