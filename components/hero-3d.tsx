"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, PerspectiveCamera, Environment, Stars, MeshDistortMaterial, Sphere } from "@react-three/drei"
import type * as THREE from "three"
import * as THREE_NS from "three"

// Animated Torus Knot with glow
function TorusKnot() {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.3
            meshRef.current.rotation.y += delta * 0.2
        }
    })

    return (
        <Float speed={2} rotationIntensity={0.8} floatIntensity={1.5}>
            <mesh ref={meshRef} position={[3, 0, -2]} scale={0.8}>
                <torusKnotGeometry args={[1, 0.3, 128, 16]} />
                <meshStandardMaterial
                    color="#00ffff"
                    emissive="#00ffff"
                    emissiveIntensity={0.8}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>
        </Float>
    )
}

// Distorted Sphere with animation
function DistortedSphere() {
    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
            <Sphere args={[1, 64, 64]} position={[-3, 1, -1]} scale={1.5}>
                <MeshDistortMaterial
                    color="#a855f7"
                    emissive="#a855f7"
                    emissiveIntensity={0.6}
                    distort={0.4}
                    speed={2}
                    roughness={0.3}
                    metalness={0.7}
                />
            </Sphere>
        </Float>
    )
}

// Wireframe Icosahedron
function WireframeIcosahedron() {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.15
            meshRef.current.rotation.y += delta * 0.25
            meshRef.current.rotation.z += delta * 0.1
        }
    })

    return (
        <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.2}>
            <mesh ref={meshRef} position={[0, -2, 0]} scale={2}>
                <icosahedronGeometry args={[1, 1]} />
                <meshStandardMaterial
                    color="#ec4899"
                    emissive="#ec4899"
                    emissiveIntensity={0.7}
                    wireframe
                    transparent
                    opacity={0.6}
                />
            </mesh>
        </Float>
    )
}

// Floating Octahedron
function FloatingOctahedron() {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x -= delta * 0.2
            meshRef.current.rotation.y += delta * 0.3
        }
    })

    return (
        <Float speed={1.8} rotationIntensity={0.7} floatIntensity={1.3}>
            <mesh ref={meshRef} position={[-1, -1, -3]} scale={1.2}>
                <octahedronGeometry args={[1, 0]} />
                <meshStandardMaterial
                    color="#fbbf24"
                    emissive="#fbbf24"
                    emissiveIntensity={0.5}
                    metalness={0.9}
                    roughness={0.1}
                />
            </mesh>
        </Float>
    )
}

// Particle Field
function ParticleField() {
    const particlesRef = useRef<THREE.Points>(null)

    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < 1000; i++) {
            const x = (Math.random() - 0.5) * 20
            const y = (Math.random() - 0.5) * 20
            const z = (Math.random() - 0.5) * 20
            temp.push(x, y, z)
        }
        return new Float32Array(temp)
    }, [])

    useFrame((state, delta) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y += delta * 0.05
        }
    })

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.length / 3}
                    array={particles}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#00ffff"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    )
}

// Animated Camera
function AnimatedCamera() {
    const cameraRef = useRef<THREE.PerspectiveCamera>(null)

    useFrame((state) => {
        if (cameraRef.current) {
            cameraRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.5
            cameraRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.15) * 0.3
            cameraRef.current.lookAt(0, 0, 0)
        }
    })

    return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 10]} fov={50} />
}

export function Hero3D() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
            <Canvas>
                <AnimatedCamera />
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#00ffff" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#a855f7" />
                <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.3} penumbra={1} color="#ec4899" />

                <Stars radius={100} depth={50} count={7000} factor={6} saturation={0.5} fade speed={1.5} />
                <ParticleField />
                <TorusKnot />
                <DistortedSphere />
                <WireframeIcosahedron />
                <FloatingOctahedron />

                <Environment preset="night" />
            </Canvas>
        </div>
    )
}
