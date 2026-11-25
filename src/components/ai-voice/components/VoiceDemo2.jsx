import React, { useEffect, useRef, useState } from "react";
import {
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  RotateCcw,
  Sparkles,
  Activity,
  User,
  Code2,
} from "lucide-react";

const HEIGHTS = [10, 16, 24, 34, 44, 52, 58, 60, 58, 52, 44, 34, 24, 16, 10];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const fmt = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
const emptySig = { sentiment: null, summary: "", observations: [], tools: [] };

const VoiceDemo2 = ({ demo, slug }) => {
  const script = demo.script || [];
  const profile = demo.profile || [];

  const [status, setStatus] = useState("idle"); // idle | live | ended
  const [seconds, setSeconds] = useState(0);
  const [turns, setTurns] = useState([]);
  const [speaking, setSpeaking] = useState(null); // customer | agent | null
  const [muted, setMuted] = useState(false);
  const [fills, setFills] = useState({});
  const [sig, setSig] = useState(emptySig);

  const runRef = useRef(0);
  const mutedRef = useRef(false);
  const voicesRef = useRef({});
  const chatRef = useRef(null);
  const stopRef = useRef(null);

  // pick two different English voices (agent = female-ish, customer = male-ish)
  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return undefined;
    const load = () => {
      const en = synth.getVoices().filter((v) => v.lang?.toLowerCase().startsWith("en"));
      const nat = en.filter((v) => /natural|neural|online/i.test(v.name));
      const female =
        nat.find((v) => /aria|jenny|sonia|libby|michelle|female/i.test(v.name)) ||
        en.find((v) => /zira|samantha|google us english|female/i.test(v.name)) ||
        nat[0] || en[0];
      const male =
        nat.find((v) => v !== female && /guy|davis|ryan|brian|christopher|eric|male/i.test(v.name)) ||
        en.find((v) => v !== female && /david|daniel|mark|google uk english male|male/i.test(v.name)) ||
        en.find((v) => v !== female) || en[0];
      voicesRef.current = { female, male };
    };
    load();
    synth.addEventListener("voiceschanged", load);
    return () => {
      synth.removeEventListener("voiceschanged", load);
      runRef.current++;
      synth.cancel();
    };
  }, []);

  useEffect(() => {
    if (status !== "live") return undefined;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [status]);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [turns]);

  const stopSpeech = () => {
    window.speechSynthesis?.cancel();
    const stop = stopRef.current;
    stopRef.current = null;
    stop?.();
  };

  // 1) tries /audio/<slug>/<n>.mp3  2) falls back to the browser voice
  const speak = (text, who, src) =>
    new Promise((resolve) => {
      const synth = window.speechSynthesis;
      const wait = () => setTimeout(resolve, text.length * 45 + 500);
      if (mutedRef.current) return wait();

      const useBrowserVoice = () => {
        if (!synth) return wait();
        const u = new SpeechSynthesisUtterance(text);
        const v = voicesRef.current[who === "agent" ? "female" : "male"];
        if (v) u.voice = v;
        u.lang = "en-US";
        u.pitch = who === "agent" ? 1.05 : 0.85;
        u.rate = 0.96;
        let done = false;
        const finish = () => {
          if (done) return;
          done = true;
          clearTimeout(timer);
          resolve();
        };
        const timer = setTimeout(finish, text.length * 90 + 3000);
        u.onend = finish;
        u.onerror = finish;
        synth.speak(u);
      };

      if (!src) return useBrowserVoice();
      let fellBack = false;
      const fallback = () => {
        if (fellBack) return;
        fellBack = true;
        stopRef.current = null;
        useBrowserVoice();
      };
      const audio = new Audio(src);
      stopRef.current = () => {
        fellBack = true;
        audio.pause();
        resolve();
      };
      audio.onended = () => {
        stopRef.current = null;
        resolve();
      };
      audio.onerror = fallback;
      audio.play().catch(fallback);
    });

  const start = async () => {
    const id = ++runRef.current;
    stopSpeech();
    setTurns([]);
    setFills({});
    setSig(emptySig);
    setSeconds(0);
    setStatus("live");
    await sleep(700);

    for (const [i, step] of script.entries()) {
      if (runRef.current !== id) return;
      setTurns((t) => [...t, step]);
      setSpeaking(step.who);
      if (step.fill) setFills((f) => ({ ...f, ...step.fill }));
      setSig((s) => ({
        sentiment: step.sentiment || s.sentiment,
        summary: step.summary || s.summary,
        observations: step.observation ? [...s.observations, step.observation].slice(-3) : s.observations,
        tools: step.tool ? [...s.tools, step.tool].slice(-3) : s.tools,
      }));
      await speak(step.text, step.who, `/audio/${slug}/${i + 1}.mp3`);
      if (runRef.current !== id) return;
      setSpeaking(null);
      await sleep(600);
    }
    if (runRef.current === id) setStatus("ended");
  };

  const end = () => {
    runRef.current++;
    stopSpeech();
    setSpeaking(null);
    setStatus("ended");
  };

  const toggleMute = () => {
    const next = !mutedRef.current;
    mutedRef.current = next;
    setMuted(next);
    if (next) stopSpeech(); // stop current line, text keeps flowing
  };

  const label =
    status === "idle"
      ? "Ready"
      : status === "ended"
      ? "Call ended"
      : speaking === "customer"
      ? "Customer is speaking…"
      : speaking === "agent"
      ? "AI agent is replying…"
      : "Listening…";

  return (
    <div className="ucd-demo">
      {/* LEFT */}
      <div className="ucd-col">
        <div className="ucd-meta">
          <div>
            <small>Channel</small>
            <b>{demo.channel}</b>
          </div>
          <div>
            <small>Scenario</small>
            <b>{demo.scenario}</b>
          </div>
        </div>
        <hr />
        <h4>
          <User size={16} /> Profile
        </h4>
        {profile.map(({ label: l, value }) => (
          <div className="ucd-field" key={l}>
            <small>{l}</small>
            <b className={fills[l] ? "ucd-filled" : ""}>{fills[l] || value}</b>
          </div>
        ))}
        <hr />
        <h4 className="ucd-muted">
          <Code2 size={16} /> Under the hood
        </h4>
        <ul className="ucd-hood">
          {sig.tools.length === 0 && <li className="ucd-dim">Waiting for the first turn…</li>}
          {sig.tools.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>

      {/* PHONE */}
      <div className="ucd-phone">
        <div className="ucd-timer">
          <Mic size={12} /> {fmt(seconds)}
        </div>
        <div className={`ucd-status ${speaking ? "is-" + speaking : ""}`}>{label}</div>

        <div className={`ucd-wave ${speaking ? "is-" + speaking : ""}`} aria-hidden="true">
          {HEIGHTS.map((h, i) => (
            <span key={i} style={{ "--h": `${h}px`, animationDelay: `${(i % 5) * 0.12}s` }} />
          ))}
        </div>

        <div className="ucd-chat" ref={chatRef}>
          {turns.length === 0 && (
            <div className="ucd-empty">
              <b>{status === "idle" ? "Start the demo call" : "Nothing yet"}</b>
              <span>
                {status === "idle"
                  ? "Hear a real customer conversation with the AI agent."
                  : "Turns appear here as they happen."}
              </span>
            </div>
          )}
          {turns.map((t, i) => (
            <div key={i} className={`ucd-bubble ucd-bubble-${t.who}`}>
              <small>{t.who === "agent" ? "AI Agent" : "Customer"}</small>
              {t.text}
            </div>
          ))}
        </div>

        <div className="ucd-call">
          {status === "live" ? (
            <>
              <button className={`ucd-mute ${muted ? "is-muted" : ""}`} onClick={toggleMute}>
                {muted ? <MicOff size={14} /> : <Mic size={14} />} {muted ? "Unmute" : "Mute"}
              </button>
              <button className="ucd-end" onClick={end}>
                <PhoneOff size={14} /> End
              </button>
            </>
          ) : (
            <button className="ucd-start" onClick={start}>
              {status === "ended" ? <RotateCcw size={14} /> : <Phone size={14} />}
              {status === "ended" ? "Call again" : "Start demo call"}
            </button>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div className="ucd-col">
        <h4>
          <Activity size={16} /> Real-time signals
          <em>{status === "live" ? "Analyzing" : status === "ended" ? "Done" : "Idle"}</em>
        </h4>
        <small className="ucd-sent-label">Sentiment</small>
        {sig.sentiment ? (
          <div className="ucd-sent">
            <b>{sig.sentiment.label}</b>
            <div className="ucd-sent-track">
              <i style={{ width: `${sig.sentiment.score}%` }} />
            </div>
          </div>
        ) : (
          <p className="ucd-dim">—</p>
        )}

        <h4 className="ucd-block">
          <Sparkles size={16} /> Summary
        </h4>
        <p className="ucd-text">{sig.summary || <span className="ucd-dim">Summary appears as the call goes on.</span>}</p>

        <h4 className="ucd-block">
          <Activity size={16} /> Observations
        </h4>
        <ul className="ucd-list">
          {sig.observations.length === 0 && <li className="ucd-dim">No observations yet.</li>}
          {sig.observations.map((o, i) => (
            <li key={i}>{o}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VoiceDemo2;