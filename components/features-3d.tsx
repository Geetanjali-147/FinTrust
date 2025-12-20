"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment } from "@react-three/drei"
import type * as THREE from "three"

function RotatingGrid() {
    const groupRef = useRef<THREE.Group>(null)

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.z += delta * 0.05
            groupRef.current.rotation.y += delta * 0.05
        }
    })

    return (
        <group ref={groupRef} rotation={[0.5, 0, 0]}>
            <mesh position={[5, 5, -10]}>
                <icosahedronGeometry args={[4, 1]} />
                <meshStandardMaterial
                    color="#3b82f6"
                    wireframe
                    transparent
                    opacity={0.03}
                />
            </mesh>
            <mesh position={[-5, -5, -10]}>
                <icosahedronGeometry args={[5, 1]} />
                <meshStandardMaterial
                    color="#8b5cf6"
                    wireframe
                    transparent
                    opacity={0.03}
                />
            </mesh>
        </group>
    )
}

export function Features3D() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <RotatingGrid />
                <Environment preset="city" />
            </Canvas>
        </div>
    )
}
