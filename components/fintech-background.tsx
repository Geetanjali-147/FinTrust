"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"

function ParticleNetwork(props: any) {
    const ref = useRef<THREE.Points>(null)

    // Generate particles in a spherical/organic distribution
    const [positions, hiddenPositions] = useMemo(() => {
        const count = 300 // Number of particles
        const positions = new Float32Array(count * 3)
        const hidden = new Float32Array(count * 3) // For a secondary layer

        for (let i = 0; i < count; i++) {
            // Random spread
            positions[i * 3] = (Math.random() - 0.5) * 25
            positions[i * 3 + 1] = (Math.random() - 0.5) * 25
            positions[i * 3 + 2] = (Math.random() - 0.5) * 25
        }
        return [positions, hidden]
    }, [])

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 20
            ref.current.rotation.y -= delta / 30
        }
    })

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#3b82f6" // Primary Blue
                    size={0.15}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6} // More visible
                />
            </Points>
        </group>
    )
}

function FloatingSymbol({ position, color }: { position: [number, number, number], color: string }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.5
            meshRef.current.rotation.y += delta * 0.5
        }
    })

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} position={position}>
                <octahedronGeometry args={[0.5, 0]} />
                <meshStandardMaterial color={color} wireframe transparent opacity={0.4} />
            </mesh>
        </Float>
    )

}

export function FintechBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
                <ambientLight intensity={0.5} />
                <ParticleNetwork />
                {/* Floating "Data Blocks" or "Nodes" */}
                <FloatingSymbol position={[4, 2, -2]} color="#ec4899" /> {/* Pink Node */}
                <FloatingSymbol position={[-4, -3, -1]} color="#3b82f6" /> {/* Blue Node */}
                <FloatingSymbol position={[3, -2, 1]} color="#10b981" /> {/* Green Node */}
            </Canvas>
        </div>
    )
}
