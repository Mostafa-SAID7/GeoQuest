"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, Text } from "@react-three/drei"
import * as THREE from "three"

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }
  })

  // Sample country markers
  const countries = [
    { name: "USA", position: [-2, 1, 1], color: "#ff6b6b" },
    { name: "Brazil", position: [-1, -1, 1.5], color: "#4ecdc4" },
    { name: "China", position: [2, 0.5, 0.5], color: "#45b7d1" },
    { name: "Australia", position: [1.5, -1.5, 0], color: "#96ceb4" },
    { name: "Egypt", position: [0.5, 0, 1.8], color: "#feca57" },
  ]

  return (
    <group>
      {/* Main Globe */}
      <Sphere
        ref={meshRef}
        args={[2, 64, 64]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={hovered ? "#4a90e2" : "#6bb6ff"}
          wireframe={false}
          transparent
          opacity={0.8}
        />
      </Sphere>

      {/* Country Markers */}
      {countries.map((country, index) => (
        <group key={country.name}>
          <Sphere
            position={country.position}
            args={[0.1, 16, 16]}
          >
            <meshStandardMaterial color={country.color} />
          </Sphere>
          <Text
            position={[country.position[0], country.position[1] + 0.3, country.position[2]]}
            fontSize={0.15}
            color="white"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Inter-Bold.ttf"
          >
            {country.name}
          </Text>
        </group>
      ))}

      {/* Atmosphere */}
      <Sphere args={[2.1, 64, 64]}>
        <meshStandardMaterial
          color="#87ceeb"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  )
}

export function InteractiveGlobe() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-blue-900 to-blue-600 rounded-lg">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Globe />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          autoRotate={false}
        />
      </Canvas>
    </div>
  )
}
