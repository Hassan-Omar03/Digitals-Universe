"use client"

import { useEffect, useRef, useState } from "react"

const VIDEO_SRC = "/background-seamless.mp4?v=source-loop-v2"
const MOBILE_VIDEO_SRC = "/mobvideo.mp4?v=source-loop-v2"
const OPACITY = 0.9

export default function Background3D() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.load()
    video.play().catch(() => {})
  }, [isMobile])

  useEffect(() => {
    const onVis = () => {
      if (document.hidden) return
      if (videoRef.current?.paused) videoRef.current.play().catch(() => {})
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
        src={isMobile ? MOBILE_VIDEO_SRC : VIDEO_SRC}
        key={isMobile ? "mobile" : "desktop"}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: OPACITY }}
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
