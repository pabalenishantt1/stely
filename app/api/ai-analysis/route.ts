import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"

interface PortfolioData {
  address: string
  stxBalance: number
  totalValue: number
}

interface AIRecommendation {
  id: number
  title: string
  description: string
  priority: "high" | "medium" | "low"
  impact: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { portfolioData } = body as { portfolioData: PortfolioData }

    if (!portfolioData) {
      return NextResponse.json({ error: "Portfolio data is required" }, { status: 400 })
    }

    const prompt = `You are a DeFi portfolio advisor. Analyze this Stacks portfolio and provide 3-4 specific, actionable recommendations:

Portfolio Details:
- Address: ${portfolioData.address}
- STX Balance: ${portfolioData.stxBalance.toFixed(2)} STX
- Total Value: $${portfolioData.totalValue.toFixed(2)}

Provide recommendations in JSON format with this structure:
[
  {
    "title": "Recommendation Title",
    "description": "Detailed explanation",
    "priority": "high|medium|low",
    "impact": "Expected outcome or benefit"
  }
]

Focus on: diversification, risk management, yield opportunities, and market conditions.`

    try {
      const { text } = await generateText({
        model: "openai/gpt-4-mini",
        prompt,
      })

      // Parse the AI response
      const jsonMatch = text.match(/\[[\s\S]*\]/)
      if (!jsonMatch) {
        throw new Error("Invalid AI response format")
      }

      const aiRecommendations = JSON.parse(jsonMatch[0])
      const recommendations: AIRecommendation[] = aiRecommendations.map((rec: any, idx: number) => ({
        id: idx + 1,
        title: rec.title,
        description: rec.description,
        priority: rec.priority || "medium",
        impact: rec.impact,
      }))

      return NextResponse.json({
        recommendations,
        generatedAt: new Date().toISOString(),
        source: "openai",
      })
    } catch (aiError: any) {
      const errorMessage = aiError?.message || String(aiError)
      const isBillingError =
        errorMessage.includes("customer_verification_required") ||
        errorMessage.includes("credit card") ||
        errorMessage.includes("403")

      console.warn(
        isBillingError
          ? "AI Gateway billing issue - using mock recommendations"
          : "AI API error - falling back to mock recommendations",
        aiError,
      )

      // Fallback to mock recommendations if OpenAI fails
      const recommendations = generateMockRecommendations(portfolioData)
      return NextResponse.json({
        recommendations,
        generatedAt: new Date().toISOString(),
        source: "mock",
        note: isBillingError
          ? "Using mock recommendations. Add a credit card to your Vercel account to enable AI-powered analysis."
          : "Using mock recommendations due to API error",
      })
    }
  } catch (error) {
    console.error("AI Analysis API error:", error)
    return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 500 })
  }
}

function generateMockRecommendations(portfolio: PortfolioData): AIRecommendation[] {
  const recommendations: AIRecommendation[] = []

  // Recommendation 1: Diversification
  if (portfolio.stxBalance > 1000) {
    recommendations.push({
      id: 1,
      title: "Diversify Your Holdings",
      description:
        "Your portfolio is heavily concentrated in STX. Consider diversifying into other assets like Bitcoin or Ethereum to reduce risk.",
      priority: "high",
      impact: "+2.3% potential return",
    })
  }

  // Recommendation 2: Risk Management
  if (portfolio.totalValue > 10000) {
    recommendations.push({
      id: 2,
      title: "Implement Risk Management",
      description:
        "Your portfolio value is significant. Consider setting stop-loss orders to protect against downturns.",
      priority: "medium",
      impact: "Reduce volatility by 15%",
    })
  }

  // Recommendation 3: Staking
  recommendations.push({
    id: 3,
    title: "Enable STX Staking",
    description: "Earn passive income by staking your STX tokens. Current APY is around 8-12%.",
    priority: "medium",
    impact: "+$" + Math.round(portfolio.totalValue * 0.1).toLocaleString() + "/year",
  })

  // Recommendation 4: DeFi Opportunities
  recommendations.push({
    id: 4,
    title: "Explore DeFi Opportunities",
    description: "Consider providing liquidity on Stacks DEXs to earn trading fees and additional rewards.",
    priority: "low",
    impact: "+1.5% potential return",
  })

  return recommendations
}
