"use client"

import { useEffect, useRef } from "react"
import type { ReactNode } from "react"
import { Canvas, useThree } from "@react-three/fiber"

const BLUE = "#5a9de0"
const CYAN = "#8bbef0"

type BoxProps = {
  args: [number, number, number]
  position: [number, number, number]
  rotation?: [number, number, number]
}

function WireBox({ args, position, rotation = [0, 0, 0] }: BoxProps) {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={args} />
      <meshBasicMaterial color={BLUE} wireframe transparent opacity={0.28} />
    </mesh>
  )
}

type AnimatedGroupProps = {
  children: ReactNode
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  speed?: [number, number, number]
}

function AnimatedGroup({
  children,
  position,
  rotation = [0, 0, 0],
  scale = 1,
  speed = [0, 0.006, 0],
}: AnimatedGroupProps) {
  const ref = useRef<any>(null)
  const invalidate = useThree((state) => state.invalidate)

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (!ref.current) return

      ref.current.rotation.x += speed[0]
      ref.current.rotation.y += speed[1]
      ref.current.rotation.z += speed[2]
      invalidate()
    }, 1000 / 12)

    return () => window.clearInterval(interval)
  }, [invalidate, speed])

  return (
    <group ref={ref} position={position} rotation={rotation} scale={scale}>
      {children}
    </group>
  )
}

function Laptop({ position, rotation = [0, 0, 0], scale = 1 }: {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <WireBox args={[1.9, 0.08, 1.15]} position={[0, -0.35, 0]} />
      <WireBox args={[1.9, 1.1, 0.08]} position={[0, 0.25, -0.52]} rotation={[-0.15, 0, 0]} />
      <WireBox args={[0.55, 0.03, 0.28]} position={[0, -0.29, 0.22]} />
    </group>
  )
}

function Phone({ position, rotation = [0, 0, 0], scale = 1 }: {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <WireBox args={[0.66, 1.35, 0.08]} position={[0, 0, 0]} />
      <WireBox args={[0.32, 0.03, 0.04]} position={[0, 0.54, 0.06]} />
      <mesh position={[0, -0.52, 0.06]}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.42} />
      </mesh>
    </group>
  )
}

function Dashboard({ position, rotation = [0, 0, 0], scale = 1 }: {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <WireBox args={[2.1, 1.25, 0.08]} position={[0, 0, 0]} />
      <WireBox args={[0.48, 0.28, 0.05]} position={[-0.62, 0.26, 0.07]} />
      <WireBox args={[0.48, 0.28, 0.05]} position={[0, 0.26, 0.07]} />
      <WireBox args={[0.48, 0.28, 0.05]} position={[0.62, 0.26, 0.07]} />
      <mesh position={[0, -0.23, 0.07]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.38, 0.015, 12, 42]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.35} />
      </mesh>
    </group>
  )
}

function Chip({ position, rotation = [0, 0, 0], scale = 1 }: {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <WireBox args={[0.95, 0.95, 0.12]} position={[0, 0, 0]} />
      <WireBox args={[0.45, 0.45, 0.08]} position={[0, 0, 0.08]} />
      {[-0.58, -0.29, 0.29, 0.58].map((offset) => (
        <WireBox key={`x-${offset}`} args={[0.08, 0.02, 0.08]} position={[offset, 0.62, 0]} />
      ))}
      {[-0.58, -0.29, 0.29, 0.58].map((offset) => (
        <WireBox key={`y-${offset}`} args={[0.02, 0.08, 0.08]} position={[0.62, offset, 0]} />
      ))}
    </group>
  )
}

function Cloud({ position, rotation = [0, 0, 0], scale = 1 }: {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh position={[-0.34, -0.03, 0]}>
        <sphereGeometry args={[0.32, 16, 16]} />
        <meshBasicMaterial color={BLUE} wireframe transparent opacity={0.22} />
      </mesh>
      <mesh position={[0.05, 0.15, 0]}>
        <sphereGeometry args={[0.43, 16, 16]} />
        <meshBasicMaterial color={BLUE} wireframe transparent opacity={0.22} />
      </mesh>
      <mesh position={[0.46, -0.02, 0]}>
        <sphereGeometry args={[0.34, 16, 16]} />
        <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.2} />
      </mesh>
      <WireBox args={[1.16, 0.06, 0.08]} position={[0.08, -0.32, 0]} />
    </group>
  )
}

function ServerRack() {
  return (
    <group>
      <WireBox args={[0.92, 1.55, 0.28]} position={[0, 0, 0]} />
      {[-0.45, -0.15, 0.15, 0.45].map((offset) => (
        <WireBox key={offset} args={[0.76, 0.18, 0.08]} position={[0, offset, 0.16]} />
      ))}
      {[-0.23, 0, 0.23].map((offset) => (
        <mesh key={offset} position={[offset, -0.62, 0.2]}>
          <sphereGeometry args={[0.035, 10, 10]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  )
}

function Database() {
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.46, 0.46, 0.9, 24, 1, true]} />
        <meshBasicMaterial color={BLUE} wireframe transparent opacity={0.24} />
      </mesh>
      <mesh position={[0, 0.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.46, 0.015, 8, 48]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.38} />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.46, 0.012, 8, 48]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.22} />
      </mesh>
      <mesh position={[0, -0.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.46, 0.015, 8, 48]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.34} />
      </mesh>
    </group>
  )
}

function CodeWindow() {
  return (
    <group>
      <WireBox args={[1.55, 1.05, 0.08]} position={[0, 0, 0]} />
      {[-0.27, 0, 0.27].map((offset, index) => (
        <WireBox
          key={offset}
          args={[index === 1 ? 0.82 : 0.58, 0.035, 0.04]}
          position={[0.05, offset, 0.09]}
        />
      ))}
      <WireBox args={[0.36, 0.035, 0.04]} position={[-0.43, 0.41, 0.09]} />
    </group>
  )
}

function NetworkNodes() {
  const nodes: [number, number, number][] = [
    [-0.6, 0.16, 0],
    [-0.1, 0.46, 0],
    [0.52, 0.18, 0],
    [0.12, -0.36, 0],
    [-0.52, -0.42, 0],
  ]

  return (
    <group>
      {nodes.map(([x, y, z], index) => (
        <mesh key={index} position={[x, y, z]}>
          <sphereGeometry args={[0.075, 12, 12]} />
          <meshBasicMaterial color={index % 2 ? BLUE : CYAN} transparent opacity={0.45} />
        </mesh>
      ))}
      {[
        [[-0.6, 0.16, 0], [-0.1, 0.46, 0]],
        [[-0.1, 0.46, 0], [0.52, 0.18, 0]],
        [[0.52, 0.18, 0], [0.12, -0.36, 0]],
        [[0.12, -0.36, 0], [-0.52, -0.42, 0]],
        [[-0.52, -0.42, 0], [-0.6, 0.16, 0]],
      ].map(([start, end], index) => {
        const [x1, y1] = start
        const [x2, y2] = end
        const dx = x2 - x1
        const dy = y2 - y1
        const length = Math.sqrt(dx * dx + dy * dy)
        const angle = Math.atan2(dy, dx)

        return (
          <mesh key={index} position={[(x1 + x2) / 2, (y1 + y2) / 2, 0]} rotation={[0, 0, angle]}>
            <boxGeometry args={[length, 0.018, 0.018]} />
            <meshBasicMaterial color={BLUE} transparent opacity={0.24} />
          </mesh>
        )
      })}
    </group>
  )
}

function TechScene() {
  return (
    <>
      <AnimatedGroup position={[-5.1, 2.1, -1.5]} rotation={[0.1, 0.42, -0.08]} scale={0.86} speed={[0, 0.004, 0]}>
        <Laptop position={[0, 0, 0]} />
      </AnimatedGroup>
      <AnimatedGroup position={[4.7, 2.05, -1.8]} rotation={[0.04, -0.35, 0.08]} scale={0.88} speed={[0, -0.004, 0]}>
        <Dashboard position={[0, 0, 0]} />
      </AnimatedGroup>
      <AnimatedGroup position={[-5.35, -1.25, -1.2]} rotation={[0.05, -0.36, 0.16]} scale={0.9} speed={[0.002, 0.003, 0]}>
        <Phone position={[0, 0, 0]} />
      </AnimatedGroup>
      <AnimatedGroup position={[4.9, -1.6, -1.4]} rotation={[0.38, -0.24, 0.74]} scale={0.96} speed={[0, 0.006, 0.002]}>
        <Chip position={[0, 0, 0]} />
      </AnimatedGroup>
      <AnimatedGroup position={[0.15, 2.85, -2.2]} rotation={[0.16, 0.1, -0.04]} scale={0.85} speed={[0, 0.002, -0.002]}>
        <Cloud position={[0, 0, 0]} />
      </AnimatedGroup>
      <AnimatedGroup position={[-2.15, -2.45, -1.9]} rotation={[0.12, 0.3, -0.16]} scale={0.78} speed={[0, 0.005, 0]}>
        <ServerRack />
      </AnimatedGroup>
      <AnimatedGroup position={[2.45, -2.55, -2.1]} rotation={[0.35, -0.22, 0.08]} scale={0.82} speed={[0, -0.005, 0]}>
        <Database />
      </AnimatedGroup>
      <AnimatedGroup position={[-1.9, 0.78, -2.25]} rotation={[0.08, -0.14, 0.04]} scale={0.72} speed={[0.001, 0.003, 0]}>
        <CodeWindow />
      </AnimatedGroup>
      <AnimatedGroup position={[2.1, 0.65, -2.35]} rotation={[0.05, 0.18, -0.08]} scale={0.75} speed={[0, 0.004, 0.003]}>
        <NetworkNodes />
      </AnimatedGroup>
      <AnimatedGroup position={[0, -2.55, -2.5]} rotation={[1.22, 0, 0]} scale={1} speed={[0, 0, 0.004]}>
        <mesh>
          <torusGeometry args={[1.55, 0.018, 12, 96]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.18} />
        </mesh>
      </AnimatedGroup>
    </>
  )
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#070e1a]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,14,26,0.72),rgba(7,14,26,1)),linear-gradient(115deg,rgba(61,126,199,0.16),transparent_44%,rgba(139,190,240,0.08))]" />
      <Canvas
        orthographic
        frameloop="demand"
        dpr={[1, 1]}
        camera={{ position: [0, 0, 10], zoom: 72 }}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        className="opacity-80"
      >
        <TechScene />
      </Canvas>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,14,26,0.84),transparent_18%,transparent_82%,rgba(7,14,26,0.84))]" />
    </div>
  )
}
