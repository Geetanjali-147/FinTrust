"use client"

import React, { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Sphere } from "@react-three/drei"
import type * as THREE from "three"

// Floating Orb
function FloatingOrb({ position, color, scale = 1 }: { position: [number, number, number], color: string, scale?: number }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5
        }
    })

    return (
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
            <mesh ref={meshRef} position={position} scale={scale}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.4}
                    transparent
                    opacity={0.6}
                />
            </mesh>
        </Float>
    )
}

// Wireframe Cube
function WireframeCube({ position }: { position: [number, number, number] }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.1
            meshRef.current.rotation.y += delta * 0.15
        }
    })

    return (
        <mesh ref={meshRef} position={position}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
                color="#00ffff"
                emissive="#00ffff"
                emissiveIntensity={0.3}
                wireframe
                transparent
                opacity={0.3}
            />
        </mesh>
    )
}

export function DashboardBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
            <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={0.5} color="#00ffff" />
                <pointLight position={[-10, -10, -10]} intensity={0.3} color="#a855f7" />

                <FloatingOrb position={[3, 2, -5]} color="#00ffff" scale={0.8} />
                <FloatingOrb position={[-3, -2, -5]} color="#a855f7" scale={1} />
                <FloatingOrb position={[0, 0, -8]} color="#ec4899" scale={0.6} />
                <FloatingOrb position={[4, -1, -6]} color="#fbbf24" scale={0.7} />
                <FloatingOrb position={[-4, 1, -7]} color="#10b981" scale={0.9} />

                <WireframeCube position={[-2, 3, -10]} />
                <WireframeCube position={[2, -3, -12]} />
            </Canvas>
        </div>
    )
}
