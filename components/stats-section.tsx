"use client"

import { useEffect, useRef, useState } from "react"
import { Users, Shield, Lock } from "lucide-react"

function Counter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
    const [count, setCount] = useState(0)
    const countRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.1 }
        )

        if (countRef.current) {
            observer.observe(countRef.current)
        }

        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!isVisible) return

        let startTime: number | null = null
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / duration, 1)
            setCount(Math.floor(progress * end))

            if (progress < 1) {
                window.requestAnimationFrame(step)
            }
        }

        window.requestAnimationFrame(step)
    }, [end, duration, isVisible])

    return (
        <span ref={countRef} className="tabular-nums">
            {count}
            {suffix}
        </span>
    )
}

export function StatsSection() {
    return (
        <section className="w-full py-12 md:py-24 border-y bg-secondary/20 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="flex flex-col items-center justify-center p-6 space-y-4 rounded-lg hover:bg-secondary/40 transition-colors duration-300">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <Users className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground">
                                <Counter end={5} suffix="M+" />
                            </h3>
                            <p className="text-muted-foreground font-medium">Active Users</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center p-6 space-y-4 rounded-lg hover:bg-secondary/40 transition-colors duration-300">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <Shield className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground">
                                24/7
                            </h3>
                            <p className="text-muted-foreground font-medium">Data Protection</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center p-6 space-y-4 rounded-lg hover:bg-secondary/40 transition-colors duration-300">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <Lock className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground">
                                100%
                            </h3>
                            <p className="text-muted-foreground font-medium">Secure</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
