"use client"

import { useEffect, useRef, useState } from "react"

export default function Background3D() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [src, setSrc] = useState("/desktopvideo.mp4")

  useEffect(() => {
    // pick source based on viewport — runs only on client
    const update = () => {
      setSrc(window.innerWidth < 768 ? "/mobvideo.mp4" : "/desktopvideo.mp4")
    }
    update()
  }, [])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.load()
    v.play().catch(() => {})
  }, [src])

  // resume after tab switch
  useEffect(() => {
    const onVis = () => {
      const v = videoRef.current
      if (!document.hidden && v && v.paused) v.play().catch(() => {})
    }
    document.addEventListener("visibilitychange", onVis)
    return () => document.removeEventListener("visibilitychange", onVis)
  }, [])

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#000308]"
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        key={src}
        src={src}
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
