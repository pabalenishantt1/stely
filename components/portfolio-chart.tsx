"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface PortfolioChartProps {
  walletAddress: string | null
}

export function PortfolioChart({ walletAddress }: PortfolioChartProps) {
  const [chartData] = useState([
    { date: "Mon", value: 42000 },
    { date: "Tue", value: 43200 },
    { date: "Wed", value: 41800 },
    { date: "Thu", value: 44100 },
    { date: "Fri", value: 45230 },
    { date: "Sat", value: 44900 },
    { date: "Sun", value: 45230 },
  ])

  const [assetData] = useState([
    { name: "Bitcoin", value: 18500, percentage: 41 },
    { name: "Ethereum", value: 12300, percentage: 27 },
    { name: "Stacks", value: 8200, percentage: 18 },
    { name: "Other", value: 6230, percentage: 14 },
  ])

  const COLORS = ["#3b82f6", "#06b6d4", "#10b981", "#f59e0b"]

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Portfolio Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="date" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Asset Allocation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={assetData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name} ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {assetData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="space-y-4">
            {assetData.map((asset, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-border/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                  <div>
                    <p className="font-medium">{asset.name}</p>
                    <p className="text-sm text-muted-foreground">${asset.value.toLocaleString()}</p>
                  </div>
                </div>
                <p className="font-semibold">{asset.percentage}%</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
