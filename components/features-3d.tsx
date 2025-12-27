"use client"

import React, { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment, Sphere } from "@react-three/drei"
import type * as THREE from "three"

// DNA Helix Structure
function DNAHelix() {
    const groupRef = useRef<THREE.Group>(null)

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.2
        }
    })

    const helixPoints = useMemo(() => {
        const points: JSX.Element[] = []
        const segments = 30
        const radius = 3
        const height = 10

        for (let i = 0; i < segments; i++) {
            const angle1 = (i / segments) * Math.PI * 4
            const angle2 = angle1 + Math.PI
            const y = (i / segments) * height - height / 2

            points.push(
                <Sphere key={`helix1-${i}`} args={[0.15, 16, 16]} position={[Math.cos(angle1) * radius, y, Math.sin(angle1) * radius]}>
                    <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.8} />
                </Sphere>,
                <Sphere key={`helix2-${i}`} args={[0.15, 16, 16]} position={[Math.cos(angle2) * radius, y, Math.sin(angle2) * radius]}>
                    <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.8} />
                </Sphere>
            )
        }
        return points
    }, [])

    return <group ref={groupRef} position={[6, 0, -15]}>{helixPoints}</group>
}

// Rotating Ring System
function RingSystem() {
    const ring1Ref = useRef<THREE.Mesh>(null)
    const ring2Ref = useRef<THREE.Mesh>(null)
    const ring3Ref = useRef<THREE.Mesh>(null)

    useFrame((state, delta) => {
        if (ring1Ref.current) ring1Ref.current.rotation.x += delta * 0.3
        if (ring2Ref.current) ring2Ref.current.rotation.y += delta * 0.4
        if (ring3Ref.current) ring3Ref.current.rotation.z += delta * 0.2
    })

    return (
        <group position={[-6, 0, -15]}>
            <mesh ref={ring1Ref}>
                <torusGeometry args={[4, 0.1, 16, 100]} />
                <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.6} />
            </mesh>
            <mesh ref={ring2Ref}>
                <torusGeometry args={[3.5, 0.08, 16, 100]} />
                <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.6} />
            </mesh>
            <mesh ref={ring3Ref}>
                <torusGeometry args={[3, 0.06, 16, 100]} />
                <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.6} />
            </mesh>
        </group>
    )
}

// Energy Orbs
function EnergyOrbs() {
    const orb1Ref = useRef<THREE.Mesh>(null)
    const orb2Ref = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (orb1Ref.current) {
            orb1Ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 8
            orb1Ref.current.position.y = Math.cos(state.clock.elapsedTime * 0.7) * 4
        }
        if (orb2Ref.current) {
            orb2Ref.current.position.x = Math.cos(state.clock.elapsedTime * 0.6) * 8
            orb2Ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 4
        }
    })

    return (
        <>
            <mesh ref={orb1Ref} position={[0, 0, -12]}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial
                    color="#fbbf24"
                    emissive="#fbbf24"
                    emissiveIntensity={1.2}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>
            <mesh ref={orb2Ref} position={[0, 0, -12]}>
                <sphereGeometry args={[0.4, 32, 32]} />
                <meshStandardMaterial
                    color="#10b981"
                    emissive="#10b981"
                    emissiveIntensity={1.2}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>
        </>
    )
}

// Dynamic Grid
function DynamicGrid() {
    const gridRef = useRef<THREE.Mesh>(null)

    useFrame((state, delta) => {
        if (gridRef.current) {
            gridRef.current.rotation.x += delta * 0.05
            gridRef.current.rotation.z += delta * 0.03
        }
    })

    return (
        <mesh ref={gridRef} position={[0, -5, -20]} rotation={[Math.PI / 4, 0, 0]}>
            <planeGeometry args={[30, 30, 30, 30]} />
            <meshStandardMaterial
                color="#00ffff"
                emissive="#00ffff"
                emissiveIntensity={0.3}
                wireframe
                transparent
                opacity={0.15}
            />
        </mesh>
    )
}

// Floating Cubes
function FloatingCubes() {
    const cubes = useMemo(() => {
        const temp: JSX.Element[] = []
        for (let i = 0; i < 15; i++) {
            const x = (Math.random() - 0.5) * 20
            const y = (Math.random() - 0.5) * 15
            const z = -Math.random() * 20 - 5
            const scale = Math.random() * 0.5 + 0.3
            const colors = ["#00ffff", "#a855f7", "#ec4899", "#fbbf24"]
            const color = colors[Math.floor(Math.random() * colors.length)]

            temp.push(
                <Float key={`cube-${i}`} speed={Math.random() * 2 + 1} rotationIntensity={Math.random() + 0.5} floatIntensity={Math.random() + 0.5}>
                    <mesh position={[x, y, z]} scale={scale}>
                        <boxGeometry args={[1, 1, 1]} />
                        <meshStandardMaterial
                            color={color}
                            emissive={color}
                            emissiveIntensity={0.5}
                            transparent
                            opacity={0.6}
                        />
                    </mesh>
                </Float>
            )
        }
        return temp
    }, [])

    return <>{cubes}</>
}

export function Features3D() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-40">
            <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
                <pointLight position={[-10, -10, -10]} intensity={0.8} color="#a855f7" />

                <DNAHelix />
                <RingSystem />
                <EnergyOrbs />
                <DynamicGrid />
                <FloatingCubes />

                <Environment preset="night" />
            </Canvas>
        </div>
    )
}
