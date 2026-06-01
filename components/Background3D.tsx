"use client"

import { useEffect, useRef } from "react"

type Point = {
  x: number
  y: number
}

type CircuitTrace = {
  points: Point[]
  phase: number
  speed: number
  width: number
}

type Dust = Point & {
  size: number
  phase: number
}

type BinaryGlyph = Point & {
  size: number
  phase: number
  value: string
}

type EnergyRibbon = {
  y: number
  width: number
  phase: number
  speed: number
}

const BLUE = "0, 174, 255"
const ICE = "190, 235, 255"
const ELECTRIC = "45, 212, 255"

function seeded(seed: number) {
  const value = Math.sin(seed * 9301 + 49297) * 233280
  return value - Math.floor(value)
}

function createBrainPath(cx: number, cy: number, scale: number) {
  const path = new Path2D()

  path.moveTo(cx - 0.61 * scale, cy + 0.1 * scale)
  path.bezierCurveTo(cx - 0.82 * scale, cy - 0.08 * scale, cx - 0.75 * scale, cy - 0.41 * scale, cx - 0.48 * scale, cy - 0.47 * scale)
  path.bezierCurveTo(cx - 0.44 * scale, cy - 0.68 * scale, cx - 0.16 * scale, cy - 0.73 * scale, cx - 0.02 * scale, cy - 0.58 * scale)
  path.bezierCurveTo(cx + 0.14 * scale, cy - 0.78 * scale, cx + 0.46 * scale, cy - 0.69 * scale, cx + 0.51 * scale, cy - 0.49 * scale)
  path.bezierCurveTo(cx + 0.78 * scale, cy - 0.44 * scale, cx + 0.88 * scale, cy - 0.16 * scale, cx + 0.72 * scale, cy + 0.02 * scale)
  path.bezierCurveTo(cx + 0.88 * scale, cy + 0.23 * scale, cx + 0.62 * scale, cy + 0.55 * scale, cx + 0.3 * scale, cy + 0.48 * scale)
  path.bezierCurveTo(cx + 0.12 * scale, cy + 0.69 * scale, cx - 0.22 * scale, cy + 0.56 * scale, cx - 0.26 * scale, cy + 0.36 * scale)
  path.bezierCurveTo(cx - 0.45 * scale, cy + 0.39 * scale, cx - 0.72 * scale, cy + 0.3 * scale, cx - 0.61 * scale, cy + 0.1 * scale)
  path.closePath()

  return path
}

function createBrainDividerPath(cx: number, cy: number, scale: number) {
  const path = new Path2D()
  path.moveTo(cx - 0.02 * scale, cy - 0.56 * scale)
  path.bezierCurveTo(cx - 0.1 * scale, cy - 0.36 * scale, cx + 0.05 * scale, cy - 0.17 * scale, cx - 0.04 * scale, cy + 0.02 * scale)
  path.bezierCurveTo(cx - 0.13 * scale, cy + 0.2 * scale, cx + 0.03 * scale, cy + 0.36 * scale, cx - 0.04 * scale, cy + 0.53 * scale)
  return path
}

function drawPathLine(context: CanvasRenderingContext2D, points: Point[]) {
  if (points.length < 2) return

  context.beginPath()
  context.moveTo(points[0].x, points[0].y)
  for (let index = 1; index < points.length; index += 1) {
    context.lineTo(points[index].x, points[index].y)
  }
  context.stroke()
}

function pointOnTrace(trace: CircuitTrace, progress: number) {
  const segments = trace.points.slice(1).map((point, index) => {
    const previous = trace.points[index]
    const length = Math.hypot(point.x - previous.x, point.y - previous.y)
    return { from: previous, to: point, length }
  })
  const total = segments.reduce((sum, segment) => sum + segment.length, 0)
  let target = total * progress

  for (const segment of segments) {
    if (target <= segment.length) {
      const amount = target / Math.max(segment.length, 1)
      return {
        x: segment.from.x + (segment.to.x - segment.from.x) * amount,
        y: segment.from.y + (segment.to.y - segment.from.y) * amount,
      }
    }

    target -= segment.length
  }

  return trace.points[trace.points.length - 1]
}

export default function Background3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let width = 0
    let height = 0
    let animationFrame = 0
    let traces: CircuitTrace[] = []
    let dust: Dust[] = []
    let binary: BinaryGlyph[] = []
    let ribbons: EnergyRibbon[] = []

    const makeTraces = (cx: number, cy: number, scale: number) => {
      const nextTraces: CircuitTrace[] = []
      const rows = 21

      for (let row = 0; row < rows; row += 1) {
        const y = cy - scale * 0.48 + row * scale * 0.047
        const startX = cx - scale * (0.55 - seeded(row) * 0.14)
        const endX = cx + scale * (0.5 + seeded(row + 14) * 0.18)
        const midOne = startX + (endX - startX) * (0.28 + seeded(row + 2) * 0.15)
        const midTwo = startX + (endX - startX) * (0.62 + seeded(row + 8) * 0.16)
        const lift = (seeded(row + 22) - 0.5) * scale * 0.16

        nextTraces.push({
          points: [
            { x: startX, y },
            { x: midOne, y },
            { x: midOne, y: y + lift },
            { x: midTwo, y: y + lift },
            { x: midTwo, y: y + lift * 0.24 },
            { x: endX, y: y + lift * 0.24 },
          ],
          phase: seeded(row + 41),
          speed: 0.06 + seeded(row + 64) * 0.06,
          width: row % 5 === 0 ? 1.8 : 1.16,
        })
      }

      for (let column = 0; column < 17; column += 1) {
        const x = cx - scale * 0.5 + column * scale * 0.062
        const y1 = cy - scale * (0.42 - seeded(column + 91) * 0.12)
        const y2 = cy + scale * (0.42 - seeded(column + 33) * 0.14)
        const turnY = y1 + (y2 - y1) * (0.36 + seeded(column + 18) * 0.3)
        const jog = (seeded(column + 9) - 0.5) * scale * 0.12

        nextTraces.push({
          points: [
            { x, y: y1 },
            { x, y: turnY },
            { x: x + jog, y: turnY },
            { x: x + jog, y: y2 },
          ],
          phase: seeded(column + 75),
          speed: 0.05 + seeded(column + 111) * 0.05,
          width: 1,
        })
      }

      for (let branch = 0; branch < 18; branch += 1) {
        const left = branch % 2 === 0
        const startX = cx + scale * (left ? -0.06 : 0.06)
        const startY = cy - scale * 0.45 + seeded(branch + 301) * scale * 0.9
        const endX = cx + scale * (left ? -0.5 : 0.53) * (0.72 + seeded(branch + 302) * 0.28)
        const endY = startY + (seeded(branch + 303) - 0.5) * scale * 0.2
        const kneeX = startX + (endX - startX) * (0.42 + seeded(branch + 304) * 0.22)

        nextTraces.push({
          points: [
            { x: startX, y: startY },
            { x: kneeX, y: startY },
            { x: kneeX, y: endY },
            { x: endX, y: endY },
          ],
          phase: seeded(branch + 305),
          speed: 0.08 + seeded(branch + 306) * 0.06,
          width: branch % 3 === 0 ? 1.35 : 0.95,
        })
      }

      return nextTraces
    }

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.7)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * pixelRatio)
      canvas.height = Math.floor(height * pixelRatio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

      const scale = Math.min(width * 0.68, height * 0.9, 860)
      const cx = width < 900 ? width * 0.5 : width * 0.67
      const cy = height * 0.4

      traces = makeTraces(cx, cy, scale)
      dust = Array.from({ length: 165 }, (_, index) => ({
        x: seeded(index + 5) * width,
        y: seeded(index + 200) * height,
        size: index % 11 === 0 ? 2.5 : index % 5 === 0 ? 1.7 : 1,
        phase: seeded(index + 17) * Math.PI * 2,
      }))
      binary = Array.from({ length: 88 }, (_, index) => ({
        x: cx - scale * 0.76 + seeded(index + 61) * scale * 0.26,
        y: cy - scale * 0.2 + seeded(index + 89) * scale * 0.84,
        size: 9 + seeded(index + 144) * 7,
        phase: seeded(index + 201) * Math.PI * 2,
        value: seeded(index + 222) > 0.5 ? "1" : "0",
      }))
      ribbons = Array.from({ length: 7 }, (_, index) => ({
        y: cy - scale * 0.36 + seeded(index + 410) * scale * 0.76,
        width: scale * (0.55 + seeded(index + 411) * 0.36),
        phase: seeded(index + 412) * Math.PI * 2,
        speed: 0.28 + seeded(index + 413) * 0.42,
      }))
    }

    const drawBackground = () => {
      const gradient = context.createRadialGradient(width * 0.68, height * 0.38, 20, width * 0.5, height * 0.52, Math.max(width, height) * 0.9)
      gradient.addColorStop(0, "#062a68")
      gradient.addColorStop(0.27, "#03142e")
      gradient.addColorStop(0.58, "#01050d")
      gradient.addColorStop(1, "#000000")
      context.fillStyle = gradient
      context.fillRect(0, 0, width, height)

      const halo = context.createRadialGradient(width * 0.67, height * 0.4, 0, width * 0.67, height * 0.4, Math.min(width, height) * 0.58)
      halo.addColorStop(0, "rgba(0, 174, 255, 0.18)")
      halo.addColorStop(0.36, "rgba(0, 92, 255, 0.06)")
      halo.addColorStop(1, "rgba(0, 0, 0, 0)")
      context.fillStyle = halo
      context.fillRect(0, 0, width, height)
    }

    const drawCircuitFrame = (time: number) => {
      const scale = Math.min(width * 0.68, height * 0.9, 860)
      const cx = width < 900 ? width * 0.5 : width * 0.67
      const cy = height * 0.4

      context.save()
      context.globalCompositeOperation = "lighter"
      context.lineCap = "round"
      context.lineJoin = "round"

      ribbons.forEach((ribbon, index) => {
        const drift = ((time * 0.00005 * ribbon.speed + ribbon.phase) % 1) * ribbon.width
        const startX = cx - scale * 0.92 + drift
        const endX = startX + ribbon.width
        const y = ribbon.y + Math.sin(time * 0.0008 + ribbon.phase) * scale * 0.018
        const gradient = context.createLinearGradient(startX, y, endX, y)
        gradient.addColorStop(0, "rgba(0, 174, 255, 0)")
        gradient.addColorStop(0.22, `rgba(${BLUE}, 0.2)`)
        gradient.addColorStop(0.5, `rgba(${ICE}, 0.34)`)
        gradient.addColorStop(1, "rgba(0, 174, 255, 0)")

        context.strokeStyle = gradient
        context.lineWidth = index % 2 === 0 ? 1.6 : 1
        context.shadowColor = `rgba(${BLUE}, 0.44)`
        context.shadowBlur = 18
        context.beginPath()
        context.moveTo(startX, y)
        context.bezierCurveTo(
          startX + ribbon.width * 0.26,
          y - scale * 0.08,
          startX + ribbon.width * 0.58,
          y + scale * 0.08,
          endX,
          y,
        )
        context.stroke()
      })

      context.strokeStyle = `rgba(${BLUE}, 0.1)`
      context.shadowColor = `rgba(${BLUE}, 0.28)`
      context.shadowBlur = 10
      context.lineWidth = 1

      for (let index = 0; index < 8; index += 1) {
        const x = cx - scale * 0.9 + index * scale * 0.24
        const top = cy - scale * 0.64
        const bottom = cy + scale * 0.62
        context.beginPath()
        context.moveTo(x, top)
        context.lineTo(x, top + scale * (0.08 + seeded(index + 500) * 0.18))
        context.lineTo(x + scale * (seeded(index + 501) - 0.5) * 0.12, top + scale * 0.24)
        context.stroke()

        context.beginPath()
        context.moveTo(x + scale * 0.04, bottom)
        context.lineTo(x + scale * 0.04, bottom - scale * (0.08 + seeded(index + 502) * 0.18))
        context.lineTo(x + scale * (seeded(index + 503) - 0.5) * 0.14, bottom - scale * 0.25)
        context.stroke()
      }

      context.restore()
    }

    const drawDust = (time: number) => {
      dust.forEach((dot) => {
        const alpha = 0.18 + Math.sin(time * 0.0014 + dot.phase) * 0.12
        context.fillStyle = `rgba(${dot.size > 2 ? ICE : BLUE}, ${alpha})`
        context.beginPath()
        context.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
        context.fill()
      })
    }

    const drawBinary = (time: number) => {
      context.save()
      context.font = "13px Consolas, monospace"
      context.textAlign = "center"
      binary.forEach((bit, index) => {
        const alpha = 0.16 + Math.sin(time * 0.001 + bit.phase) * 0.1
        context.fillStyle = `rgba(0, 174, 255, ${alpha})`
        context.font = `${bit.size}px Consolas, monospace`
        context.fillText(bit.value, bit.x, bit.y + Math.sin(time * 0.0008 + index) * 6)
      })
      context.restore()
    }

    const drawBrainTexture = (cx: number, cy: number, scale: number, time: number) => {
      const groovePaths = [
        [
          { x: -0.48, y: -0.2 },
          { x: -0.36, y: -0.36 },
          { x: -0.16, y: -0.32 },
          { x: -0.08, y: -0.46 },
        ],
        [
          { x: -0.52, y: 0.03 },
          { x: -0.34, y: -0.04 },
          { x: -0.2, y: 0.08 },
          { x: -0.04, y: -0.02 },
        ],
        [
          { x: -0.4, y: 0.27 },
          { x: -0.23, y: 0.18 },
          { x: -0.06, y: 0.28 },
          { x: 0.05, y: 0.18 },
        ],
        [
          { x: 0.08, y: -0.34 },
          { x: 0.24, y: -0.47 },
          { x: 0.44, y: -0.34 },
          { x: 0.54, y: -0.16 },
        ],
        [
          { x: 0.07, y: -0.08 },
          { x: 0.28, y: -0.18 },
          { x: 0.5, y: -0.02 },
          { x: 0.62, y: 0.1 },
        ],
        [
          { x: 0.05, y: 0.25 },
          { x: 0.24, y: 0.36 },
          { x: 0.48, y: 0.28 },
          { x: 0.58, y: 0.12 },
        ],
      ]

      context.save()
      context.globalCompositeOperation = "lighter"
      context.strokeStyle = `rgba(${ELECTRIC}, ${0.18 + Math.sin(time * 0.001) * 0.05})`
      context.lineWidth = 1.2
      context.shadowColor = `rgba(${BLUE}, 0.42)`
      context.shadowBlur = 12

      groovePaths.forEach((groove) => {
        context.beginPath()
        context.moveTo(cx + groove[0].x * scale, cy + groove[0].y * scale)
        context.bezierCurveTo(
          cx + groove[1].x * scale,
          cy + groove[1].y * scale,
          cx + groove[2].x * scale,
          cy + groove[2].y * scale,
          cx + groove[3].x * scale,
          cy + groove[3].y * scale,
        )
        context.stroke()
      })

      context.restore()
    }

    const drawBrain = (time: number) => {
      const scale = Math.min(width * 0.68, height * 0.9, 860)
      const cx = width < 900 ? width * 0.5 : width * 0.67
      const cy = height * 0.4
      const brainPath = createBrainPath(cx, cy, scale)
      const glow = 0.72 + Math.sin(time * 0.0012) * 0.18

      context.save()
      context.shadowColor = `rgba(${BLUE}, 0.95)`
      context.shadowBlur = 72
      context.fillStyle = `rgba(0, 92, 190, ${0.18 * glow})`
      context.fill(brainPath)
      context.lineWidth = 4.4
      context.strokeStyle = `rgba(${ELECTRIC}, ${0.22 * glow})`
      context.stroke(brainPath)
      context.shadowBlur = 28
      context.lineWidth = 1.4
      context.strokeStyle = `rgba(${ICE}, ${0.74 * glow})`
      context.stroke(brainPath)
      context.restore()

      context.save()
      context.globalCompositeOperation = "lighter"
      context.strokeStyle = `rgba(${BLUE}, ${0.2 + Math.sin(time * 0.001) * 0.04})`
      context.lineWidth = 1
      context.shadowColor = `rgba(${BLUE}, 0.42)`
      context.shadowBlur = 20
      for (let index = 0; index < 4; index += 1) {
        context.beginPath()
        context.ellipse(
          cx,
          cy + scale * 0.02,
          scale * (0.52 + index * 0.09),
          scale * (0.28 + index * 0.05),
          -0.18,
          0,
          Math.PI * 2,
        )
        context.stroke()
      }
      context.restore()

      context.save()
      context.clip(brainPath)
      context.globalCompositeOperation = "lighter"
      drawBrainTexture(cx, cy, scale, time)

      traces.forEach((trace) => {
        context.shadowColor = `rgba(${BLUE}, 0.95)`
        context.shadowBlur = 18
        context.lineCap = "round"
        context.lineJoin = "round"
        context.lineWidth = trace.width
        context.strokeStyle = `rgba(${ICE}, 0.72)`
        drawPathLine(context, trace.points)

        context.shadowBlur = 14
        context.fillStyle = `rgba(${ICE}, 0.96)`
        trace.points.forEach((point, index) => {
          if (index % 2 === 0 || index === trace.points.length - 1) {
            context.beginPath()
            context.arc(point.x, point.y, 2.4 + trace.width, 0, Math.PI * 2)
            context.fill()
            if (index === trace.points.length - 1) {
              context.strokeStyle = `rgba(${ELECTRIC}, 0.6)`
              context.lineWidth = 1
              context.strokeRect(point.x - 5, point.y - 5, 10, 10)
            }
          }
        })

        const pulse = (time * 0.0012 * trace.speed + trace.phase) % 1
        const point = pointOnTrace(trace, pulse)
        context.shadowBlur = 34
        context.fillStyle = `rgba(${ICE}, 1)`
        context.beginPath()
        context.arc(point.x, point.y, 4.8, 0, Math.PI * 2)
        context.fill()
      })

      context.restore()

      context.save()
      context.globalCompositeOperation = "lighter"
      context.strokeStyle = `rgba(${ICE}, 0.38)`
      context.shadowColor = `rgba(${BLUE}, 0.64)`
      context.shadowBlur = 24
      context.lineWidth = 1.6
      context.stroke(createBrainDividerPath(cx, cy, scale))
      context.restore()

      context.save()
      context.globalCompositeOperation = "lighter"
      context.strokeStyle = `rgba(${BLUE}, 0.82)`
      context.fillStyle = `rgba(${ICE}, 0.86)`
      context.shadowColor = `rgba(${BLUE}, 0.88)`
      context.shadowBlur = 22
      context.lineWidth = 2

      const stemX = cx - scale * 0.16
      const stemTop = cy + scale * 0.42
      context.beginPath()
      context.moveTo(stemX, stemTop)
      context.lineTo(stemX, stemTop + scale * 0.22)
      context.lineTo(stemX - scale * 0.18, stemTop + scale * 0.22)
      context.stroke()

      for (let index = 0; index < 4; index += 1) {
        context.beginPath()
        context.arc(stemX - index * scale * 0.045, stemTop + scale * 0.22, 2.8, 0, Math.PI * 2)
        context.fill()
      }

      context.restore()
    }

    const render = (time = 0) => {
      drawBackground()
      drawCircuitFrame(time)
      drawDust(time)
      drawBinary(time)
      drawBrain(time)

      if (!prefersReducedMotion) {
        animationFrame = window.requestAnimationFrame(render)
      }
    }

    resize()
    render()
    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("resize", resize)
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_67%_39%,rgba(0,170,255,0.14),transparent_34%),linear-gradient(90deg,rgba(0,0,0,0.44),transparent_42%,rgba(0,0,0,0.14)),linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.58))]" />
    </div>
  )
}
