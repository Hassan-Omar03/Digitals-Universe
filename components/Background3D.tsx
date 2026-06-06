"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

const IMAGE_URL = "/digital-universe-living-bg.png"
const IMAGE_SIZE = new THREE.Vector2(1536, 1024)

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`

const fragmentShader = `
precision highp float;

uniform sampler2D uImage;
uniform vec2 uResolution;
uniform vec2 uImageSize;
uniform float uTime;
uniform float uDpr;
uniform float uReducedMotion;

varying vec2 vUv;

float saturate(float v) {
  return clamp(v, 0.0, 1.0);
}

vec2 coverUv(vec2 uv) {
  float screenRatio = uResolution.x / uResolution.y;
  float imageRatio = uImageSize.x / uImageSize.y;
  vec2 scale = screenRatio > imageRatio
    ? vec2(1.0, imageRatio / screenRatio)
    : vec2(screenRatio / imageRatio, 1.0);

  return (uv - 0.5) * scale + 0.5;
}

float softLine(vec2 p, vec2 a, vec2 b, float width, float feather) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  float d = length(pa - ba * h);
  return smoothstep(width + feather, width, d);
}

float lineProgress(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  return clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
}

float ellipseMask(vec2 p, vec2 center, vec2 radius, float feather) {
  float d = length((p - center) / radius);
  return smoothstep(1.0 + feather, 1.0, d);
}

float rectMask(vec2 p, vec2 center, vec2 size, float feather) {
  vec2 d = abs(p - center) - size;
  float outside = length(max(d, 0.0));
  float inside = min(max(d.x, d.y), 0.0);
  return 1.0 - smoothstep(0.0, feather, outside + inside);
}

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 345.45));
  p += dot(p, p + 34.345);
  return fract(p.x * p.y);
}

vec3 sampleImage(vec2 uv) {
  return texture2D(uImage, clamp(uv, vec2(0.001), vec2(0.999))).rgb;
}

float blueLight(vec3 c) {
  return saturate(c.b * 1.34 + c.g * 0.42 - c.r * 0.36 - 0.25);
}

float brightBlue(vec3 c) {
  return saturate(c.b * 1.62 + c.g * 0.48 - c.r * 0.44 - 0.42);
}

void main() {
  float motion = 1.0 - uReducedMotion;
  vec2 uv = coverUv(vUv);
  vec2 p = vec2(uv.x, 1.0 - uv.y);

  vec2 globeCenter = vec2(0.78, 0.33);
  vec2 globeRadius = vec2(0.285, 0.315);
  vec2 globeSpace = (p - globeCenter) / globeRadius;
  float globe = ellipseMask(p, globeCenter, globeRadius, 0.13);
  float globeSoft = ellipseMask(p, globeCenter, globeRadius, 0.13);

  float city =
    smoothstep(0.96, 0.60, p.y) *
    smoothstep(-0.02, 0.27, p.x) *
    smoothstep(0.78, 0.46, p.x);

  float streamA = softLine(p, vec2(0.29, 0.82), vec2(0.74, 0.50), 0.070, 0.055);
  float streamB = softLine(p, vec2(0.36, 0.76), vec2(0.72, 0.43), 0.047, 0.040);
  float streamC = softLine(p, vec2(0.42, 0.69), vec2(0.62, 0.55), 0.035, 0.030);
  float stream = saturate(max(streamA, max(streamB, streamC)));
  float streamTravel = lineProgress(p, vec2(0.29, 0.82), vec2(0.74, 0.50));

  float panels =
    rectMask(p, vec2(0.07, 0.18), vec2(0.044, 0.055), 0.014) +
    rectMask(p, vec2(0.19, 0.30), vec2(0.036, 0.025), 0.012) +
    rectMask(p, vec2(0.12, 0.44), vec2(0.058, 0.048), 0.014) +
    rectMask(p, vec2(0.82, 0.76), vec2(0.060, 0.046), 0.014) +
    rectMask(p, vec2(0.93, 0.14), vec2(0.045, 0.058), 0.014) +
    rectMask(p, vec2(0.80, 0.84), vec2(0.056, 0.046), 0.014);
  panels = saturate(panels);

  float starZone =
    smoothstep(0.88, 0.10, p.y) *
    (1.0 - smoothstep(0.10, 0.84, stream)) *
    (1.0 - smoothstep(0.08, 0.70, globe));

  vec2 bgUv = uv;
  vec2 cityUv = uv;
  vec2 streamUv = uv;
  vec2 panelUv = uv;

  vec2 globeUv = uv;

  vec3 base = sampleImage(bgUv);
  vec3 citySample = sampleImage(cityUv);
  vec2 streamDrift = normalize(vec2(0.45, -0.32)) * (sin(streamTravel * 15.0) * 0.0012);
  vec3 streamSample = sampleImage(streamUv + streamDrift * stream);
  vec3 globeSample = sampleImage(globeUv);
  vec3 panelSample = sampleImage(panelUv);

  float outsideGlobe = 1.0 - globeSoft * 0.96;
  vec3 color = mix(base, globeSample, globe);
  color = mix(color, citySample, city * 0.18 * outsideGlobe);
  color = mix(color, streamSample, stream * 0.26 * outsideGlobe);
  color = mix(color, panelSample, panels * 0.18 * outsideGlobe);

  float cityEnergy = brightBlue(citySample) * city * outsideGlobe;
  float cityGrid = hash21(floor(p * vec2(145.0, 95.0)));
  float cityFlicker = 0.80 + cityGrid * 0.08;
  color += citySample * cityEnergy * cityFlicker * 0.08;

  float streamEnergy = brightBlue(streamSample) * stream * outsideGlobe;
  float flow = smoothstep(0.70, 1.0, sin(streamTravel * 20.0) * 0.5 + 0.5);
  float fineFlow = smoothstep(0.68, 1.0, sin(streamTravel * 58.0 + p.y * 6.0) * 0.5 + 0.5);
  color += streamSample * streamEnergy * (flow * 0.16 + fineFlow * 0.05) * 0.36;
  color += vec3(0.0, 0.28, 0.82) * streamEnergy * flow * 0.045;

  float globeEnergy = brightBlue(globeSample) * globe;
  color += vec3(0.0, 0.34, 1.0) * globeEnergy * 0.08;

  float panelEnergy = brightBlue(panelSample) * panels * outsideGlobe;
  color += panelSample * panelEnergy * 0.10;

  vec3 center = sampleImage(uv);
  float luma = dot(center, vec3(0.2126, 0.7152, 0.0722));
  float blueStar = brightBlue(center);
  color += center * blueStar * starZone * 0.025;

  vec2 pixel = 1.0 / uResolution * uDpr * 2.0;
  vec3 blur = vec3(0.0);
  blur += sampleImage(uv + vec2(pixel.x * 4.0, 0.0));
  blur += sampleImage(uv - vec2(pixel.x * 4.0, 0.0));
  blur += sampleImage(uv + vec2(0.0, pixel.y * 4.0));
  blur += sampleImage(uv - vec2(0.0, pixel.y * 4.0));
  blur += sampleImage(uv + pixel * vec2(7.0, 5.0));
  blur += sampleImage(uv - pixel * vec2(7.0, 5.0));
  blur *= 0.1667;
  float bloomMask = brightBlue(blur);
  float glowMask = saturate(stream * 0.52 * outsideGlobe + globe * 0.56 + city * 0.12 * outsideGlobe + panels * 0.12 * outsideGlobe);
  color += blur * bloomMask * glowMask * 0.22;
  color += vec3(0.0, 0.20, 0.66) * bloomMask * glowMask * 0.04;

  float vignette = smoothstep(0.95, 0.22, length(vUv - 0.5));
  color *= 0.62 + vignette * 0.46;
  color *= 0.82 + luma * 0.18;
  color = pow(color, vec3(0.94));

  gl_FragColor = vec4(color, 1.0);
}
`

export default function Background3D() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const renderer = new THREE.WebGLRenderer({
      alpha: false,
      antialias: false,
      powerPreference: "high-performance",
    })
    renderer.setClearColor(0x000308, 1)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const loader = new THREE.TextureLoader()
    const texture = loader.load(IMAGE_URL)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.generateMipmaps = false

    const uniforms = {
      uImage: { value: texture },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uImageSize: { value: IMAGE_SIZE },
      uTime: { value: 0 },
      uDpr: { value: 1 },
      uReducedMotion: {
        value: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 0,
      },
    }

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      depthTest: false,
      depthWrite: false,
    })

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
    scene.add(mesh)

    let frame = 0

    const resize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const mobile = width < 768 || window.matchMedia("(pointer: coarse)").matches
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.1 : 1.6)

      renderer.setPixelRatio(dpr)
      renderer.setSize(width, height, true)
      renderer.domElement.style.position = "absolute"
      renderer.domElement.style.inset = "0"
      renderer.domElement.style.width = "100%"
      renderer.domElement.style.height = "100%"
      renderer.domElement.style.display = "block"
      uniforms.uResolution.value.set(width, height)
      uniforms.uDpr.value = dpr
    }

    const render = (time: number) => {
      uniforms.uTime.value = time * 0.001
      renderer.render(scene, camera)
      frame = window.requestAnimationFrame(render)
    }

    resize()
    window.addEventListener("resize", resize, { passive: true })
    frame = window.requestAnimationFrame(render)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("resize", resize)
      mesh.geometry.dispose()
      material.dispose()
      texture.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="du-live-background fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#000308]"
      aria-hidden="true"
    />
  )
}
