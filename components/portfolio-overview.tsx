"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Loader2 } from "lucide-react"
import { usePortfolio } from "@/hooks/use-portfolio"

interface PortfolioOverviewProps {
  walletAddress: string | null
}

export function PortfolioOverview({ walletAddress }: PortfolioOverviewProps) {
  const { portfolio, isLoading, error } = usePortfolio(walletAddress)
  const [displayData, setDisplayData] = useState({
    totalValue: 45230.5,
    change24h: 2450.75,
    changePercent: 5.7,
    holdings: 12,
  })

  useEffect(() => {
    if (portfolio) {
      setDisplayData({
        totalValue: portfolio.totalValue,
        change24h: portfolio.totalValue * 0.057,
        changePercent: 5.7,
        holdings: 1,
      })
    }
  }, [portfolio])

  if (error) {
    return (
      <Card className="p-6 text-center text-destructive">
        <p>Failed to load portfolio data</p>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Portfolio Value</p>
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <p className="text-3xl font-bold">
                ${displayData.totalValue.toLocaleString("en-US", { maximumFractionDigits: 2 })}
              </p>
            )}
          </div>
          <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-blue-500" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">24h Change</p>
            <p className="text-3xl font-bold">
              ${displayData.change24h.toLocaleString("en-US", { maximumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-green-500 mt-1">+{displayData.changePercent}%</p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-green-500" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Active Holdings</p>
            <p className="text-3xl font-bold">{displayData.holdings}</p>
            <p className="text-sm text-muted-foreground mt-1">Assets</p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-cyan-500" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Risk Score</p>
            <p className="text-3xl font-bold">6.2</p>
            <p className="text-sm text-yellow-500 mt-1">Moderate</p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
            <TrendingDown className="w-6 h-6 text-yellow-500" />
          </div>
        </div>
      </Card>
    </div>
  )
}
