"use client"

import { useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, PerspectiveCamera } from "@react-three/drei"
import type * as THREE from "three"

function DeliveryTruck() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} scale={1.5}>
        {/* Truck cabin */}
        <mesh position={[1.2, 0.4, 0]}>
          <boxGeometry args={[1, 1, 1.2]} />
          <meshStandardMaterial color="#1e3a5f" metalness={0.3} roughness={0.7} />
        </mesh>
        {/* Cabin top */}
        <mesh position={[1.2, 1, 0]}>
          <boxGeometry args={[0.9, 0.3, 1.1]} />
          <meshStandardMaterial color="#1e3a5f" metalness={0.3} roughness={0.7} />
        </mesh>
        {/* Cargo box */}
        <mesh position={[-0.5, 0.5, 0]}>
          <boxGeometry args={[2.2, 1.4, 1.4]} />
          <meshStandardMaterial color="#1e3a5f" metalness={0.2} roughness={0.8} />
        </mesh>
        {/* Check mark circle on cargo */}
        <mesh position={[-0.5, 0.5, 0.71]}>
          <circleGeometry args={[0.4, 32]} />
          <meshStandardMaterial color="#22c55e" metalness={0.1} roughness={0.5} />
        </mesh>
        {/* Front wheel */}
        <mesh position={[1, -0.3, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.15, 16]} />
          <meshStandardMaterial color="#0f172a" metalness={0.5} roughness={0.3} />
        </mesh>
        <mesh position={[1, -0.3, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.15, 16]} />
          <meshStandardMaterial color="#0f172a" metalness={0.5} roughness={0.3} />
        </mesh>
        {/* Back wheels */}
        <mesh position={[-0.8, -0.3, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.15, 16]} />
          <meshStandardMaterial color="#0f172a" metalness={0.5} roughness={0.3} />
        </mesh>
        <mesh position={[-0.8, -0.3, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.15, 16]} />
          <meshStandardMaterial color="#0f172a" metalness={0.5} roughness={0.3} />
        </mesh>
        {/* Headlights */}
        <mesh position={[1.7, 0.2, 0.35]}>
          <boxGeometry args={[0.05, 0.15, 0.2]} />
          <meshStandardMaterial color="#fef9c3" emissive="#fef9c3" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[1.7, 0.2, -0.35]}>
          <boxGeometry args={[0.05, 0.15, 0.2]} />
          <meshStandardMaterial color="#fef9c3" emissive="#fef9c3" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </Float>
  )
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 500

  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#22c55e" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

export function Hero3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas>
        <PerspectiveCamera makeDefault position={[5, 2, 5]} fov={45} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#22c55e" />
        <Suspense fallback={null}>
          <DeliveryTruck />
          <ParticleField />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  )
}
