"use client"

import { useEffect, useRef } from "react"

export default function Background3D() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.play().catch(() => {})
  }, [])

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#000308]"
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        src="/video.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 0.90 }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 44%, transparent 25%, rgba(0,2,8,0.50) 100%)," +
            "linear-gradient(to bottom, rgba(0,2,8,0.20) 0%, transparent 15%, transparent 70%, rgba(0,2,8,0.55) 100%)",
        }}
      />
    </div>
  )
}
