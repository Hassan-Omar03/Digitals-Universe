import React from "react";

interface NeonCardProps {
  children: React.ReactNode;
  className?: string;
}

export function NeonCard({ children, className = "" }: NeonCardProps) {
  return (
    <div className={`du-neon-card ${className}`}>
      {children}
    </div>
  );
}

/* ── Demo usage — delete or move to a page ── */
export function NeonCardDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#070e1a] p-8">
      <NeonCard className="max-w-sm w-full p-8">
        {/* Icon orb */}
        <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[rgba(77,163,255,0.22)] bg-[rgba(77,163,255,0.08)]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4DA3FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </div>

        {/* Label */}
        <p className="mb-2 text-[0.68rem] font-bold tracking-[0.16em] uppercase text-[#4DA3FF]">
          Premium Feature
        </p>

        {/* Heading */}
        <h3 className="mb-3 text-[1.35rem] font-bold leading-snug text-white">
          Intelligent Automation
        </h3>

        {/* Body */}
        <p className="mb-6 text-[0.875rem] leading-relaxed text-[rgba(255,255,255,0.55)]">
          Deploy AI-powered workflows that adapt in real-time, reducing manual overhead by up to 80% while maintaining enterprise-grade reliability.
        </p>

        {/* Footer row */}
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {["#3B82F6", "#06B6D4", "#8B5CF6"].map((c, i) => (
              <div
                key={i}
                className="h-7 w-7 rounded-full border-2 border-[#070e1a]"
                style={{ background: c }}
              />
            ))}
          </div>
          <button className="group flex items-center gap-1.5 text-[0.8rem] font-semibold text-[#4DA3FF] transition-opacity hover:opacity-75">
            Explore
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </NeonCard>
    </div>
  );
}
