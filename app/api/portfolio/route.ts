import { stacksClient } from "@/lib/stacks-client"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const address = searchParams.get("address")

    if (!address) {
      return NextResponse.json({ error: "Address is required" }, { status: 400 })
    }

    const [accountInfo, balances] = await Promise.all([
      stacksClient.getAccountInfo(address),
      stacksClient.getAccountBalance(address),
    ])

    // Calculate portfolio metrics
    const stxBalance = Number.parseFloat(accountInfo.balance) / 1000000 // Convert from microSTX
    const stxPrice = 25 // Mock price: $25 per STX
    const totalValue = stxBalance * stxPrice

    return NextResponse.json({
      address,
      stxBalance,
      stxPrice,
      totalValue,
      accountInfo,
      balances,
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Portfolio API error:", error)
    return NextResponse.json({ error: "Failed to fetch portfolio data" }, { status: 500 })
  }
}
