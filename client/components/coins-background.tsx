"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Text } from "@react-three/drei"
import * as THREE from "three"

const COUNT = 40
const SPEED_FACTOR = 1.5

type ItemType = 'coin' | 'dollar' | 'bitcoin'

function FloatingItem({
    position,
    speed,
    rotationSpeed,
    type,
    scale
}: {
    position: [number, number, number]
    speed: number
    rotationSpeed: [number, number, number]
    type: ItemType
    scale: number
}) {
    const ref = useRef<THREE.Group>(null)

    useFrame((state, delta) => {
        if (!ref.current) return

        // Fall down
        ref.current.position.y -= speed * delta * SPEED_FACTOR

        // Reset position when out of view
        if (ref.current.position.y < -10) {
            ref.current.position.y = 10
            ref.current.position.x = (Math.random() - 0.5) * 20
            ref.current.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
        }

        // Rotate
        ref.current.rotation.x += rotationSpeed[0] * delta
        ref.current.rotation.y += rotationSpeed[1] * delta
        ref.current.rotation.z += rotationSpeed[2] * delta
    })

    // Color palette
    const goldColor = "#fbbf24" // Amber 400
    const greenColor = "#4ade80" // Green 400
    const bitcoinColor = "#f97316" // Orange 500

    return (
        <group ref={ref} position={position} scale={[scale, scale, scale]}>
            {type === 'coin' && (
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.3, 0.3, 0.05, 32]} />
                    <meshStandardMaterial color={goldColor} metalness={0.8} roughness={0.2} />
                </mesh>
            )}
            {type === 'dollar' && (
                <Text
                    color={greenColor}
                    anchorX="center"
                    anchorY="middle"
                    fontSize={0.8}
                    font="https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff" // Standard Roboto
                >
                    $
                </Text>
            )}
            {type === 'bitcoin' && (
                <Text
                    color={bitcoinColor}
                    anchorX="center"
                    anchorY="middle"
                    fontSize={0.8}
                    font="https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff"
                >
                    ₿
                </Text>
            )}
        </group>
    )
}

function FloatingItems() {
    const data = useMemo(
        () =>
            Array.from({ length: COUNT }, () => {
                const types: ItemType[] = ['coin', 'dollar', 'bitcoin']
                return {
                    position: [
                        (Math.random() - 0.5) * 25,
                        (Math.random() - 0.5) * 20,
                        (Math.random() - 0.5) * 5
                    ] as [number, number, number],
                    speed: 0.5 + Math.random() * 1.5,
                    rotationSpeed: [
                        Math.random() * 2,
                        Math.random() * 2,
                        Math.random() * 2
                    ] as [number, number, number],
                    type: types[Math.floor(Math.random() * types.length)],
                    scale: 0.6 + Math.random() * 0.4 // Varying sizes slightly
                }
            }),
        [],
    )

    return (
        <>
            {data.map((props, i) => (
                <FloatingItem key={i} {...props} />
            ))}
        </>
    )
}

export function CoinsBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none fade-in bg-multicolor-gradient opacity-20 mix-blend-overlay" aria-hidden="true">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <ambientLight intensity={0.8} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                <FloatingItems />
                <Environment preset="city" />
            </Canvas>
        </div>
    )
}
