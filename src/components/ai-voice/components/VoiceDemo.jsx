import React, { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import VoiceSectionTitle from "./VoiceSectionTitle";
import VoiceWidget from "./VoiceWidget";


/* =========================================================
   Video upload korar por shudhu ei duita line change korun.
   File ta public/videos/ folder-e rakhun.
   Khali "" rakhle ager VoiceWidget demo dekhabe.
   ========================================================= */
const DEMO_VIDEO = "/public/videos/ecommerce.mp4";                       // e.g. "/videos/ai-voice-demo.mp4"
const DEMO_POSTER = "/public/images/usecases/ecommerce.png";                      // optional, e.g. "/videos/ai-voice-poster.jpg"

const VoiceDemo = () => {
  const videoRef = useRef(null);
  const screenRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  const hasVideo = Boolean(DEMO_VIDEO);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  const handlePlayDemo = () => {
    screenRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    if (!hasVideo) return;
    const video = videoRef.current;
    if (video && video.paused) video.play().catch(() => {});
  };

  return (
    <section className="voice-demo-section">
      <VoiceSectionTitle eyebrow="LIVE DEMO">
        See How AI Voice Chat Works for Your Business.
      </VoiceSectionTitle>

      <div className="voice-demo-action">
        <button className="voice-primary-btn" onClick={handlePlayDemo}>
          <Play size={16} fill="currentColor" />
          Play Demo
        </button>
      </div>

      <div className="voice-laptop">
        <div
          ref={screenRef}
          className={`voice-laptop-screen ${hasVideo ? "has-video" : ""}`}
        >
          {hasVideo ? (
            <>
              <video
                ref={videoRef}
                className="voice-demo-video"
                src={DEMO_VIDEO}
                poster={DEMO_POSTER || undefined}
                controls={started}
                playsInline
                preload="metadata"
                onPlay={() => {
                  setPlaying(true);
                  setStarted(true);
                }}
                onPause={() => setPlaying(false)}
                onEnded={() => {
                  setPlaying(false);
                  setStarted(false);
                }}
              />

              {!playing && (
                <button
                  className="voice-video-overlay"
                  onClick={togglePlay}
                  aria-label={started ? "Resume demo" : "Play demo video"}
                >
                  <span className="voice-video-play">
                    {started ? (
                      <Pause size={30} fill="currentColor" />
                    ) : (
                      <Play size={30} fill="currentColor" />
                    )}
                  </span>
                  <span className="voice-video-caption">
                    {started ? "Resume" : "Watch the 60-second demo"}
                  </span>
                </button>
              )}
            </>
          ) : (
            <VoiceWidget />
          )}
        </div>
      </div>

      <div className="voice-laptop-base" aria-hidden="true" />
    </section>
  );
};

export default VoiceDemo;