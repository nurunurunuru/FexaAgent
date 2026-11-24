import React, { useCallback, useEffect, useRef, useState } from "react";
import { Bot, Mic2, Phone, Volume2, VolumeX, X } from "lucide-react";

const GREETING =
  "Hello, I am the representative from Fexa Agent. How can I help you?";

// Page e ek-ta widget-i greeting bolbe (hero + demo, dui jaygay widget ache)
let hasGreeted = false;

const supportsSpeech =
  typeof window !== "undefined" && "speechSynthesis" in window;

const pickVoice = () => {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) =>
      /Google US English|Samantha|Microsoft (Zira|Aria|Jenny)/i.test(v.name)
    ) ||
    voices.find((v) => v.lang && v.lang.toLowerCase().startsWith("en")) ||
    null
  );
};

const VoiceWidget = () => {
  const bars = Array.from({ length: 30 });

  const rootRef = useRef(null);
  const ownsSpeech = useRef(false);
  const ownsGreeting = useRef(false);
  const mutedRef = useRef(false);

  const [speaking, setSpeaking] = useState(false);
  const [muted, setMuted] = useState(false);

  const stop = useCallback(() => {
    if (!supportsSpeech) return;
    ownsSpeech.current = false;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  const speak = useCallback(() => {
    if (!supportsSpeech || mutedRef.current) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(GREETING);
    const voice = pickVoice();
    if (voice) utterance.voice = voice;
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1.05;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    ownsSpeech.current = true;
    window.speechSynthesis.speak(utterance);
  }, []);

  // Section screen e ashle ekbar greeting bolbe
  useEffect(() => {
    if (!supportsSpeech || !rootRef.current) return undefined;

    // Chrome e voices late load hoy
    window.speechSynthesis.getVoices();

    let visible = false;

    const tryGreet = () => {
      if (!visible || hasGreeted || mutedRef.current) return;
      hasGreeted = true;
      ownsGreeting.current = true;
      speak();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        // Browser autoplay policy: user ekbar click/key korle-i voice allow
        if (visible && navigator.userActivation?.hasBeenActive) {
          tryGreet();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(rootRef.current);

    // Direct refresh e ashle prothom click/key er por bolbe
    const onFirstInteraction = () => tryGreet();
    window.addEventListener("pointerdown", onFirstInteraction, { once: true });
    window.addEventListener("keydown", onFirstInteraction, { once: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
      if (ownsSpeech.current) window.speechSynthesis.cancel();
      if (ownsGreeting.current) hasGreeted = false; // abar page e ashle abar bolbe
    };
  }, [speak]);

  const toggleMute = () => {
    const next = !mutedRef.current;
    mutedRef.current = next;
    setMuted(next);
    if (next) stop();
  };

  return (
    <div className="voice-widget" ref={rootRef}>
      <div className="voice-widget-header">
        <div className="voice-agent-info">
          <div className="voice-agent-avatar">
            <Bot size={22} />
          </div>

          <div>
            <strong>Fexa AI</strong>
            <span>Online</span>
          </div>
        </div>

        <button className="voice-close">
          <X size={18} />
        </button>
      </div>

      <div className="voice-widget-body">
        <div className="voice-avatar-large">
          <Bot size={42} />
        </div>

        <div className="voice-agent-name">
          <h3>Fexa AI</h3>
          <span>AI Voice Assistant</span>
        </div>

        <div className="voice-timer">00:32</div>

        <div className="voice-waveform">
          {bars.map((_, index) => (
            <span key={index} />
          ))}
        </div>

        <div className="voice-status">
          <Volume2 size={15} />
          <span>{speaking ? "Speaking..." : "Listening..."}</span>
        </div>
      </div>

      <div className="voice-widget-controls">
        <button
          className="voice-control"
          onClick={toggleMute}
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        {/* Mic button: greeting abar shunte chaile click korun */}
        <button
          className="voice-control voice-main-control"
          onClick={speak}
          aria-label="Replay greeting"
        >
          <Mic2 size={22} />
        </button>

        <button
          className="voice-control voice-end"
          onClick={stop}
          aria-label="Stop"
        >
          <Phone size={18} />
        </button>
      </div>
    </div>
  );
};

export default VoiceWidget;