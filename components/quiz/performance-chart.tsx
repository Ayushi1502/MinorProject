"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

const performanceData = [
  { date: "Jan 15", score: 45 },
  { date: "Jan 20", score: 52 },
  { date: "Jan 25", score: 48 },
  { date: "Feb 01", score: 65 },
  { date: "Feb 05", score: 72 },
  { date: "Feb 10", score: 68 },
  { date: "Feb 15", score: 78 },
  { date: "Feb 20", score: 85 },
]

export function PerformanceChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={performanceData}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis dataKey="date" className="text-xs" tick={{ fontSize: 12 }} />
          <YAxis domain={[0, 100]} className="text-xs" tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
