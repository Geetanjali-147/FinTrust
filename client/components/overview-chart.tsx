"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
    {
        name: "Jan",
        total: 12,
    },
    {
        name: "Feb",
        total: 25,
    },
    {
        name: "Mar",
        total: 18,
    },
    {
        name: "Apr",
        total: 35,
    },
    {
        name: "May",
        total: 42,
    },
    {
        name: "Jun",
        total: 55,
    },
    {
        name: "Jul",
        total: 48,
    },
    {
        name: "Aug",
        total: 52,
    },
    {
        name: "Sep",
        total: 60,
    },
    {
        name: "Oct",
        total: 58,
    },
    {
        name: "Nov",
        total: 65,
    },
    {
        name: "Dec",
        total: 72,
    },
]

export function OverviewChart() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
            </BarChart>
        </ResponsiveContainer>
    )
}
