import { type NextRequest, NextResponse } from "next/server"

interface SavedPlan {
  id: string
  address: string
  title: string
  description: string
  recommendations: any[]
  createdAt: string
  updatedAt: string
}

// In-memory storage for demo (replace with database in production)
const savedPlans: Map<string, SavedPlan[]> = new Map()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const address = searchParams.get("address")

    if (!address) {
      return NextResponse.json({ error: "Address is required" }, { status: 400 })
    }

    const plans = savedPlans.get(address) || []
    return NextResponse.json({ plans })
  } catch (error) {
    console.error("Plans API error:", error)
    return NextResponse.json({ error: "Failed to fetch plans" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { address, title, description, recommendations } = body

    if (!address || !title) {
      return NextResponse.json({ error: "Address and title are required" }, { status: 400 })
    }

    const plan: SavedPlan = {
      id: Math.random().toString(36).substring(7),
      address,
      title,
      description,
      recommendations,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    if (!savedPlans.has(address)) {
      savedPlans.set(address, [])
    }

    savedPlans.get(address)!.push(plan)

    return NextResponse.json({ plan }, { status: 201 })
  } catch (error) {
    console.error("Plans API error:", error)
    return NextResponse.json({ error: "Failed to save plan" }, { status: 500 })
  }
}
