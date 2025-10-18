"use client"

import { useState, useEffect } from "react"

interface AIRecommendation {
  id: number
  title: string
  description: string
  priority: "high" | "medium" | "low"
  impact: string
}

interface RecommendationsData {
  recommendations: AIRecommendation[]
  generatedAt: string
}

export function useAIRecommendations(portfolioData: any) {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!portfolioData) return

    const fetchRecommendations = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch("/api/ai-analysis", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ portfolioData }),
        })

        if (!response.ok) throw new Error("Failed to fetch recommendations")

        const data: RecommendationsData = await response.json()
        setRecommendations(data.recommendations)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecommendations()
  }, [portfolioData])

  return { recommendations, isLoading, error }
}
