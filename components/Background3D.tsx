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

type GlowDot = Point & {
  size: number
  phase: number
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

function makeTraces(cx: number, cy: number, scale: number, lightMode: boolean) {
  const traces: CircuitTrace[] = []
  const rows = lightMode ? 12 : 16
  const columns = lightMode ? 8 : 11
  const branches = lightMode ? 8 : 12

  for (let row = 0; row < rows; row += 1) {
    const y = cy - scale * 0.48 + row * scale * (0.9 / Math.max(rows - 1, 1))
    const startX = cx - scale * (0.5 - seeded(row) * 0.12)
    const endX = cx + scale * (0.46 + seeded(row + 14) * 0.15)
    const midOne = startX + (endX - startX) * (0.28 + seeded(row + 2) * 0.14)
    const midTwo = startX + (endX - startX) * (0.62 + seeded(row + 8) * 0.14)
    const lift = (seeded(row + 22) - 0.5) * scale * 0.13

    traces.push({
      points: [
        { x: startX, y },
        { x: midOne, y },
        { x: midOne, y: y + lift },
        { x: midTwo, y: y + lift },
        { x: midTwo, y: y + lift * 0.24 },
        { x: endX, y: y + lift * 0.24 },
      ],
      phase: seeded(row + 41),
      speed: 0.08 + seeded(row + 64) * 0.08,
      width: row % 4 === 0 ? 1.65 : 1.05,
    })
  }

  for (let column = 0; column < columns; column += 1) {
    const x = cx - scale * 0.46 + column * scale * (0.92 / Math.max(columns - 1, 1))
    const y1 = cy - scale * (0.4 - seeded(column + 91) * 0.12)
    const y2 = cy + scale * (0.4 - seeded(column + 33) * 0.14)
    const turnY = y1 + (y2 - y1) * (0.36 + seeded(column + 18) * 0.3)
    const jog = (seeded(column + 9) - 0.5) * scale * 0.1

    traces.push({
      points: [
        { x, y: y1 },
        { x, y: turnY },
        { x: x + jog, y: turnY },
        { x: x + jog, y: y2 },
      ],
      phase: seeded(column + 75),
      speed: 0.07 + seeded(column + 111) * 0.06,
      width: 0.95,
    })
  }

  for (let branch = 0; branch < branches; branch += 1) {
    const left = branch % 2 === 0
    const startX = cx + scale * (left ? -0.05 : 0.05)
    const startY = cy - scale * 0.42 + seeded(branch + 301) * scale * 0.84
    const endX = cx + scale * (left ? -0.5 : 0.52) * (0.74 + seeded(branch + 302) * 0.24)
    const endY = startY + (seeded(branch + 303) - 0.5) * scale * 0.18
    const kneeX = startX + (endX - startX) * (0.42 + seeded(branch + 304) * 0.22)

    traces.push({
      points: [
        { x: startX, y: startY },
        { x: kneeX, y: startY },
        { x: kneeX, y: endY },
        { x: endX, y: endY },
      ],
      phase: seeded(branch + 305),
      speed: 0.1 + seeded(branch + 306) * 0.07,
      width: branch % 3 === 0 ? 1.2 : 0.9,
    })
  }

  return traces
}

export default function Background3D() {
  const shellRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const shell = shellRef.current
    const canvas = canvasRef.current
    if (!shell || !canvas) return

    const context = canvas.getContext("2d", { alpha: false })
    if (!context) return

    const staticCanvas = document.createElement("canvas")
    const staticContext = staticCanvas.getContext("2d", { alpha: false })
    if (!staticContext) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches
    let width = 0
    let height = 0
    let pixelRatio = 1
    let animationFrame = 0
    let lastFrame = 0
    let traces: CircuitTrace[] = []
    let dots: GlowDot[] = []
    let cx = 0
    let cy = 0
    let scale = 0
    let lightMode = false
    let cameraX = 0
    let cameraY = 0
    let targetCameraX = 0
    let targetCameraY = 0

    const setupCanvas = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, isCoarsePointer ? 1 : 1.2)
      width = window.innerWidth
      height = window.innerHeight
      lightMode = isCoarsePointer || width < 760 || height < 620
      scale = Math.min(width * (lightMode ? 0.78 : 0.68), height * 0.86, lightMode ? 600 : 760)
      cx = width < 900 ? width * 0.52 : width * 0.67
      cy = height * 0.39

      canvas.width = Math.floor(width * pixelRatio)
      canvas.height = Math.floor(height * pixelRatio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

      staticCanvas.width = canvas.width
      staticCanvas.height = canvas.height
      staticContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

      traces = makeTraces(cx, cy, scale, lightMode)
      dots = Array.from({ length: lightMode ? 46 : 72 }, (_, index) => ({
        x: seeded(index + 5) * width,
        y: seeded(index + 200) * height,
        size: index % 9 === 0 ? 1.9 : 1,
        phase: seeded(index + 17) * Math.PI * 2,
      }))
    }

    const drawBackground = (target: CanvasRenderingContext2D) => {
      const gradient = target.createRadialGradient(width * 0.68, height * 0.38, 20, width * 0.5, height * 0.52, Math.max(width, height) * 0.9)
      gradient.addColorStop(0, "#062a68")
      gradient.addColorStop(0.28, "#03142e")
      gradient.addColorStop(0.62, "#01050d")
      gradient.addColorStop(1, "#000000")
      target.fillStyle = gradient
      target.fillRect(0, 0, width, height)

      const halo = target.createRadialGradient(cx, cy, 0, cx, cy, Math.min(width, height) * 0.55)
      halo.addColorStop(0, "rgba(0, 174, 255, 0.2)")
      halo.addColorStop(0.38, "rgba(0, 92, 255, 0.06)")
      halo.addColorStop(1, "rgba(0, 0, 0, 0)")
      target.fillStyle = halo
      target.fillRect(0, 0, width, height)
    }

    const drawStaticCircuitFrame = (target: CanvasRenderingContext2D) => {
      target.save()
      target.globalCompositeOperation = "lighter"
      target.lineCap = "round"
      target.lineJoin = "round"
      target.strokeStyle = `rgba(${BLUE}, ${lightMode ? 0.08 : 0.12})`
      target.lineWidth = 1

      const lineCount = lightMode ? 4 : 7
      for (let index = 0; index < lineCount; index += 1) {
        const x = cx - scale * 0.85 + index * scale * 0.27
        const top = cy - scale * 0.62
        const bottom = cy + scale * 0.6
        target.beginPath()
        target.moveTo(x, top)
        target.lineTo(x, top + scale * (0.09 + seeded(index + 500) * 0.16))
        target.lineTo(x + scale * (seeded(index + 501) - 0.5) * 0.1, top + scale * 0.22)
        target.stroke()

        target.beginPath()
        target.moveTo(x + scale * 0.04, bottom)
        target.lineTo(x + scale * 0.04, bottom - scale * (0.09 + seeded(index + 502) * 0.16))
        target.lineTo(x + scale * (seeded(index + 503) - 0.5) * 0.12, bottom - scale * 0.22)
        target.stroke()
      }

      target.restore()
    }

    const drawBinary = (target: CanvasRenderingContext2D) => {
      target.save()
      target.textAlign = "center"
      const count = lightMode ? 26 : 54
      for (let index = 0; index < count; index += 1) {
        const size = 9 + seeded(index + 144) * 6
        const x = cx - scale * 0.76 + seeded(index + 61) * scale * 0.24
        const y = cy - scale * 0.18 + seeded(index + 89) * scale * 0.8
        target.fillStyle = `rgba(0, 174, 255, ${0.1 + seeded(index + 201) * 0.1})`
        target.font = `${size}px Consolas, monospace`
        target.fillText(seeded(index + 222) > 0.5 ? "1" : "0", x, y)
      }
      target.restore()
    }

    const drawBrainTexture = (target: CanvasRenderingContext2D) => {
      const grooves = [
        [[-0.48, -0.2], [-0.36, -0.36], [-0.16, -0.32], [-0.08, -0.46]],
        [[-0.52, 0.03], [-0.34, -0.04], [-0.2, 0.08], [-0.04, -0.02]],
        [[-0.4, 0.27], [-0.23, 0.18], [-0.06, 0.28], [0.05, 0.18]],
        [[0.08, -0.34], [0.24, -0.47], [0.44, -0.34], [0.54, -0.16]],
        [[0.07, -0.08], [0.28, -0.18], [0.5, -0.02], [0.62, 0.1]],
        [[0.05, 0.25], [0.24, 0.36], [0.48, 0.28], [0.58, 0.12]],
      ]

      target.save()
      target.globalCompositeOperation = "lighter"
      target.strokeStyle = `rgba(${ELECTRIC}, 0.16)`
      target.lineWidth = 1.1
      if (!lightMode) {
        target.shadowColor = `rgba(${BLUE}, 0.28)`
        target.shadowBlur = 8
      }

      grooves.forEach((groove) => {
        target.beginPath()
        target.moveTo(cx + groove[0][0] * scale, cy + groove[0][1] * scale)
        target.bezierCurveTo(
          cx + groove[1][0] * scale,
          cy + groove[1][1] * scale,
          cx + groove[2][0] * scale,
          cy + groove[2][1] * scale,
          cx + groove[3][0] * scale,
          cy + groove[3][1] * scale,
        )
        target.stroke()
      })

      target.restore()
    }

    const drawStaticBrain = (target: CanvasRenderingContext2D) => {
      const brainPath = createBrainPath(cx, cy, scale)

      target.save()
      target.shadowColor = `rgba(${BLUE}, 0.8)`
      target.shadowBlur = lightMode ? 20 : 38
      target.fillStyle = "rgba(0, 92, 190, 0.16)"
      target.fill(brainPath)
      target.lineWidth = lightMode ? 2.6 : 3.6
      target.strokeStyle = `rgba(${ELECTRIC}, 0.28)`
      target.stroke(brainPath)
      target.shadowBlur = lightMode ? 8 : 16
      target.lineWidth = 1.3
      target.strokeStyle = `rgba(${ICE}, 0.68)`
      target.stroke(brainPath)
      target.restore()

      target.save()
      target.clip(brainPath)
      target.globalCompositeOperation = "lighter"
      drawBrainTexture(target)

      traces.forEach((trace) => {
        target.lineCap = "round"
        target.lineJoin = "round"
        target.lineWidth = trace.width
        target.strokeStyle = `rgba(${ICE}, ${lightMode ? 0.48 : 0.66})`
        if (!lightMode) {
          target.shadowColor = `rgba(${BLUE}, 0.5)`
          target.shadowBlur = 8
        }
        drawPathLine(target, trace.points)
        target.shadowBlur = 0
        target.fillStyle = `rgba(${ICE}, 0.78)`
        trace.points.forEach((point, index) => {
          if (index % 2 === 0 || index === trace.points.length - 1) {
            target.beginPath()
            target.arc(point.x, point.y, 2.1 + trace.width, 0, Math.PI * 2)
            target.fill()
          }
        })
      })

      target.restore()

      target.save()
      target.globalCompositeOperation = "lighter"
      target.strokeStyle = `rgba(${ICE}, 0.35)`
      target.lineWidth = 1.4
      target.stroke(createBrainDividerPath(cx, cy, scale))

      if (!lightMode) {
        target.strokeStyle = `rgba(${BLUE}, 0.14)`
        target.lineWidth = 1
        for (let index = 0; index < 3; index += 1) {
          target.beginPath()
          target.ellipse(cx, cy + scale * 0.02, scale * (0.54 + index * 0.1), scale * (0.3 + index * 0.05), -0.18, 0, Math.PI * 2)
          target.stroke()
        }
      }

      target.strokeStyle = `rgba(${BLUE}, 0.72)`
      target.fillStyle = `rgba(${ICE}, 0.78)`
      target.lineWidth = 1.8
      const stemX = cx - scale * 0.16
      const stemTop = cy + scale * 0.42
      target.beginPath()
      target.moveTo(stemX, stemTop)
      target.lineTo(stemX, stemTop + scale * 0.22)
      target.lineTo(stemX - scale * 0.18, stemTop + scale * 0.22)
      target.stroke()

      for (let index = 0; index < 4; index += 1) {
        target.beginPath()
        target.arc(stemX - index * scale * 0.045, stemTop + scale * 0.22, 2.4, 0, Math.PI * 2)
        target.fill()
      }

      target.restore()
    }

    const renderStaticLayer = () => {
      drawBackground(staticContext)
      drawStaticCircuitFrame(staticContext)
      drawBinary(staticContext)
      dots.forEach((dot) => {
        staticContext.fillStyle = `rgba(${dot.size > 1.5 ? ICE : BLUE}, 0.16)`
        staticContext.beginPath()
        staticContext.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
        staticContext.fill()
      })
      drawStaticBrain(staticContext)
    }

    const drawDynamicSignals = (time: number) => {
      const activeTraces = lightMode ? traces.slice(0, 9) : traces.slice(0, 18)
      context.save()
      context.globalCompositeOperation = "lighter"

      activeTraces.forEach((trace) => {
        const pulse = (time * 0.00018 * trace.speed + trace.phase) % 1
        const point = pointOnTrace(trace, pulse)
        context.shadowColor = `rgba(${BLUE}, 0.82)`
        context.shadowBlur = lightMode ? 10 : 18
        context.fillStyle = `rgba(${ICE}, 0.95)`
        context.beginPath()
        context.arc(point.x, point.y, lightMode ? 3.1 : 4, 0, Math.PI * 2)
        context.fill()
      })

      const ribbonCount = lightMode ? 2 : 4
      for (let index = 0; index < ribbonCount; index += 1) {
        const y = cy - scale * 0.28 + index * scale * 0.18 + Math.sin(time * 0.0007 + index) * scale * 0.012
        const startX = cx - scale * 0.86 + ((time * 0.035 + index * scale * 0.22) % (scale * 0.6))
        const endX = startX + scale * 0.45
        const gradient = context.createLinearGradient(startX, y, endX, y)
        gradient.addColorStop(0, "rgba(0, 174, 255, 0)")
        gradient.addColorStop(0.5, `rgba(${ICE}, ${lightMode ? 0.16 : 0.28})`)
        gradient.addColorStop(1, "rgba(0, 174, 255, 0)")
        context.strokeStyle = gradient
        context.lineWidth = 1.2
        context.shadowColor = `rgba(${BLUE}, 0.34)`
        context.shadowBlur = lightMode ? 6 : 12
        context.beginPath()
        context.moveTo(startX, y)
        context.bezierCurveTo(startX + scale * 0.12, y - scale * 0.05, startX + scale * 0.28, y + scale * 0.05, endX, y)
        context.stroke()
      }

      context.restore()
    }

    const resize = () => {
      setupCanvas()
      renderStaticLayer()
    }

    const render = (time = 0) => {
      const frameInterval = lightMode ? 1000 / 18 : 1000 / 24
      if (time - lastFrame < frameInterval) {
        animationFrame = window.requestAnimationFrame(render)
        return
      }
      lastFrame = time

      cameraX += (targetCameraX - cameraX) * 0.08
      cameraY += (targetCameraY - cameraY) * 0.08
      canvas.style.transform = `translate3d(${cameraX.toFixed(2)}px, ${cameraY.toFixed(2)}px, 0) scale(1.035)`

      context.drawImage(staticCanvas, 0, 0, width, height)
      if (!prefersReducedMotion) {
        drawDynamicSignals(time)
        animationFrame = window.requestAnimationFrame(render)
      }
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (lightMode || prefersReducedMotion) return

      const x = event.clientX / Math.max(width, 1) - 0.5
      const y = event.clientY / Math.max(height, 1) - 0.5
      targetCameraX = x * -24
      targetCameraY = y * -18
    }

    const resetCamera = () => {
      targetCameraX = 0
      targetCameraY = 0
    }

    resize()
    render()
    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerleave", resetCamera)
    window.addEventListener("blur", resetCamera)

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerleave", resetCamera)
      window.removeEventListener("blur", resetCamera)
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div ref={shellRef} className="du-canvas-shell fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full will-change-transform" aria-hidden="true" />
      <div className="du-canvas-polish absolute inset-0" />
    </div>
  )
}
