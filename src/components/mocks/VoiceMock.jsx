import { Mic, Phone, PhoneOff, Users } from "lucide-react";

function VoiceMock() {
  const bars = Array.from({ length: 22 });
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-50/80 p-6 text-center">
      <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
        <span className="absolute inset-0 rounded-full border border-emerald-400/40" style={{ animation: "ringPulse 2.2s ease-out infinite" }} />
        <span className="absolute inset-0 rounded-full border border-emerald-400/25" style={{ animation: "ringPulse 2.2s ease-out infinite 0.7s" }} />
        <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-600 shadow-[0_0_30px_rgba(52,211,153,0.35)]">
          <Users size={22} />
        </div>
      </div>
      <p className="mt-3 text-xs font-medium text-emerald-700">Speaking with customer...</p>
      <div className="mt-3 flex items-end justify-center gap-[3px]">
        {bars.map((_, i) => (
          <span
            key={i}
            className="w-[3px] rounded-full bg-emerald-400/70"
            style={{ height: 5 + (i % 6) * 3, animation: "wave 1s ease-in-out infinite", animationDelay: `${i * 0.05}s` }}
          />
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center gap-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/[0.06] text-slate-600">
          <Mic size={14} />
        </span>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white">
          <PhoneOff size={15} />
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/[0.06] text-slate-600">
          <Phone size={14} />
        </span>
      </div>
    </div>
  );
}

export default VoiceMock;
