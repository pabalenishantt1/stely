"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, TrendingUp, AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { useAIRecommendations } from "@/hooks/use-ai-recommendations"

interface AIRecommendationsProps {
  walletAddress: string | null
  onRecommendationsLoaded?: (recommendations: any[]) => void
}

export function AIRecommendations({ walletAddress, onRecommendationsLoaded }: AIRecommendationsProps) {
  const [portfolioData, setPortfolioData] = useState(null)

  useState(() => {
    if (!walletAddress) return

    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`/api/portfolio?address=${walletAddress}`)
        if (response.ok) {
          const data = await response.json()
          setPortfolioData(data)
        }
      } catch (error) {
        console.error("Failed to fetch portfolio:", error)
      }
    }

    fetchPortfolio()
  })

  const { recommendations, isLoading, error } = useAIRecommendations(portfolioData)

  useState(() => {
    if (recommendations.length > 0 && onRecommendationsLoaded) {
      onRecommendationsLoaded(recommendations)
    }
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-500 border-red-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
      default:
        return "bg-green-500/20 text-green-500 border-green-500/30"
    }
  }

  if (isLoading) {
    return (
      <Card className="p-8 flex items-center justify-center gap-2">
        <Loader2 className="w-5 h-5 animate-spin" />
        <p>Analyzing your portfolio...</p>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="p-8 text-center text-destructive">
        <p>Failed to generate recommendations</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {recommendations.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No recommendations available yet</p>
        </Card>
      ) : (
        recommendations.map((rec) => {
          const iconMap: Record<string, any> = {
            "Rebalance Your Portfolio": TrendingUp,
            "Diversify into Stacks": Lightbulb,
            "Risk Alert": AlertCircle,
            "Tax Optimization": CheckCircle,
            "Diversify Your Holdings": TrendingUp,
            "Implement Risk Management": AlertCircle,
            "Enable STX Staking": CheckCircle,
            "Explore DeFi Opportunities": Lightbulb,
          }

          const Icon = iconMap[rec.title] || Lightbulb

          return (
            <Card key={rec.id} className="p-6 border-l-4 border-l-blue-500 hover:bg-card/80 transition-colors">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-blue-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{rec.title}</h3>
                      <p className="text-muted-foreground mt-1">{rec.description}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(rec.priority)} flex-shrink-0`}
                    >
                      {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-sm font-medium text-green-500">{rec.impact}</p>
                    <Button size="sm" variant="outline">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )
        })
      )}
    </div>
  )
}
