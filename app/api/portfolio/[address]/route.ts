import { stacksClient } from "@/lib/stacks-client"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { address: string } }) {
  try {
    const { address } = params

    if (!address) {
      return NextResponse.json({ error: "Address is required" }, { status: 400 })
    }

    const [accountInfo, balances, transactions] = await Promise.all([
      stacksClient.getAccountInfo(address),
      stacksClient.getAccountBalance(address),
      stacksClient.getAccountTransactions(address, 20),
    ])

    // Calculate portfolio metrics
    const stxBalance = Number.parseFloat(accountInfo.balance) / 1000000 // Convert from microSTX
    const stxPrice = 25 // Mock price: $25 per STX
    const totalValue = stxBalance * stxPrice

    // Calculate 24h change (mock)
    const change24h = totalValue * 0.057
    const changePercent = 5.7

    return NextResponse.json({
      address,
      stxBalance,
      stxPrice,
      totalValue,
      change24h,
      changePercent,
      holdings: 1,
      riskScore: 6.2,
      accountInfo,
      balances,
      transactions: transactions.slice(0, 10),
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Portfolio API error:", error)
    return NextResponse.json({ error: "Failed to fetch portfolio data" }, { status: 500 })
  }
}
