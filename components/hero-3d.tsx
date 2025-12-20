"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, PerspectiveCamera, Environment, Stars } from "@react-three/drei"
import type * as THREE from "three"

function FloatingShape() {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2
            meshRef.current.rotation.y += delta * 0.3
        }
    })

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={meshRef} position={[2, 0, 0]} scale={2.5}>
                <icosahedronGeometry args={[1, 1]} />
                <meshStandardMaterial
                    color="#4f46e5"
                    emissive="#4f46e5"
                    emissiveIntensity={0.5}
                    wireframe
                    transparent
                    opacity={0.8}
                />
            </mesh>
        </Float>
    )
}

function FloatingShape2() {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x -= delta * 0.1
            meshRef.current.rotation.y -= delta * 0.2
        }
    })

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
            <mesh ref={meshRef} position={[-2, -1, -2]} scale={1.5}>
                <dodecahedronGeometry args={[1, 0]} />
                <meshStandardMaterial
                    color="#ec4899"
                    emissive="#ec4899"
                    emissiveIntensity={0.5}
                    wireframe
                    transparent
                    opacity={0.6}
                />
            </mesh>
        </Float>
    )
}

export function Hero3D() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <FloatingShape />
                <FloatingShape2 />
                <Environment preset="city" />
            </Canvas>
        </div>
    )
}
