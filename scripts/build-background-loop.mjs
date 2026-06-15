import { spawnSync } from "node:child_process"
import { writeFileSync } from "node:fs"

const input = "public/background.mp4"
const output = "public/background-seamless.mp4"
const fps = 24
const sampleWidth = 96
const sampleHeight = 54
const overlapFrames = 60

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { encoding: "buffer", ...options })
  if (result.status !== 0) {
    process.stderr.write(result.stderr)
    process.exit(result.status ?? 1)
  }
  return result.stdout
}

const probe = JSON.parse(
  run("ffprobe", [
    "-v", "error",
    "-select_streams", "v:0",
    "-show_entries", "stream=nb_frames,r_frame_rate,width,height",
    "-show_entries", "format=duration",
    "-of", "json",
    input,
  ], { encoding: "utf8" })
)

const duration = Number(probe.format.duration)
const frameCount = Number(probe.streams[0].nb_frames || Math.floor(duration * fps))
const frameSize = sampleWidth * sampleHeight

const raw = run("ffmpeg", [
  "-v", "error",
  "-i", input,
  "-vf", `fps=${fps},scale=${sampleWidth}:${sampleHeight}:flags=area,format=gray`,
  "-f", "rawvideo",
  "-",
])

const frames = []
for (let offset = 0; offset + frameSize <= raw.length; offset += frameSize) {
  frames.push(raw.subarray(offset, offset + frameSize))
}

function frameMse(a, b) {
  let sum = 0
  for (let i = 0; i < frameSize; i += 4) {
    const d0 = a[i] - b[i]
    const d1 = a[i + 1] - b[i + 1]
    const d2 = a[i + 2] - b[i + 2]
    const d3 = a[i + 3] - b[i + 3]
    sum += d0 * d0 + d1 * d1 + d2 * d2 + d3 * d3
  }
  return sum / frameSize
}

function overlapMse(start, end) {
  let sum = 0
  for (let i = 0; i < overlapFrames; i += 1) {
    sum += frameMse(frames[start + i], frames[end - overlapFrames + i])
  }
  return sum / overlapFrames
}

const maxFrame = Math.min(frameCount, frames.length)
let cutFrame = Math.floor(maxFrame / 2)
let cutScore = Infinity

for (let frame = overlapFrames; frame <= maxFrame - overlapFrames; frame += 1) {
  const adjacentDiff = frameMse(frames[frame - 1], frames[frame])
  const balancePenalty = Math.abs(frame - maxFrame / 2) * 0.03
  const score = adjacentDiff + balancePenalty
  if (score < cutScore) {
    cutScore = score
    cutFrame = frame
  }
}

const originalJoinDiff = frameMse(frames[maxFrame - 1], frames[0])
const naturalLoopDiff = frameMse(frames[cutFrame - 1], frames[cutFrame])
const transitionDiff = overlapMse(0, maxFrame)
const baseOutputSeconds = (maxFrame - overlapFrames) / fps
const targetOutputSeconds = duration
const stretchFactor = targetOutputSeconds / baseOutputSeconds

const report = [
  `Input: ${input}`,
  `Frames sampled: ${frames.length}`,
  `Output strategy: source-only rotated loop with quiet loop boundary, long baked transition, and restored duration`,
  `Crossfade overlap: ${(overlapFrames / fps).toFixed(2)}s`,
  `Loop boundary cut frame: ${cutFrame}`,
  `Base loop duration before stretch: ${baseOutputSeconds.toFixed(3)}s`,
  `Final loop duration: ${targetOutputSeconds.toFixed(3)}s`,
  `Timing stretch factor: ${stretchFactor.toFixed(3)}`,
  `Original last-to-first frame MSE: ${originalJoinDiff.toFixed(3)}`,
  `New loop-boundary adjacent-frame MSE: ${naturalLoopDiff.toFixed(3)}`,
  `End/start overlap MSE blended inside file: ${transitionDiff.toFixed(3)}`,
  "",
].join("\n")

writeFileSync("tmp_frames/background-loop-report.txt", report)
process.stdout.write(report)

const startOverlapEnd = overlapFrames
const endOverlapStart = maxFrame - overlapFrames
const overlapSeconds = overlapFrames / fps

const filter = [
  `[0:v]trim=start_frame=${cutFrame}:end_frame=${endOverlapStart},setpts=PTS-STARTPTS[part1]`,
  `[0:v]trim=start_frame=${endOverlapStart}:end_frame=${maxFrame},setpts=PTS-STARTPTS[end]`,
  `[0:v]trim=start_frame=0:end_frame=${startOverlapEnd},setpts=PTS-STARTPTS[start]`,
  `[0:v]trim=start_frame=${startOverlapEnd}:end_frame=${cutFrame},setpts=PTS-STARTPTS[part2]`,
  `[end][start]xfade=transition=fadeslow:duration=${overlapSeconds}:offset=0[transition]`,
  `[part1][transition][part2]concat=n=3:v=1:a=0,format=yuv420p,setpts=${stretchFactor.toFixed(8)}*PTS,minterpolate=fps=${fps}:mi_mode=blend[out]`,
].join(";")

run("ffmpeg", [
  "-y",
  "-i", input,
  "-filter_complex", filter,
  "-map", "[out]",
  "-an",
  "-c:v", "libx264",
  "-preset", "slow",
  "-crf", "16",
  "-profile:v", "high",
  "-pix_fmt", "yuv420p",
  "-movflags", "+faststart",
  output,
], { stdio: "inherit" })
