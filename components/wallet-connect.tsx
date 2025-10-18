"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"

interface WalletConnectProps {
  onConnect: (address: string) => void
}

export function WalletConnect({ onConnect }: WalletConnectProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleConnect = async () => {
    setIsLoading(true)
    setError(null)
    try {
      if (typeof window !== "undefined") {
        const provider = (window as any).LeatherProvider

        if (!provider) {
          setError("Leather wallet not detected. Please install the Leather extension.")
          setIsLoading(false)
          return
        }

        try {
          const response = await provider.request("getAddresses")
          console.log("[v0] Wallet response:", response)

          if (response?.result?.addresses) {
            // Find the Stacks (STX) address from the addresses array
            const stacksAddress = response.result.addresses.find((addr: any) => addr.symbol === "STX")

            if (stacksAddress?.address) {
              console.log("[v0] Connected address:", stacksAddress.address)
              onConnect(stacksAddress.address)
            } else {
              setError("No Stacks address found in wallet")
            }
          } else {
            setError("Failed to get wallet addresses")
          }
        } catch (walletError: any) {
          console.error("[v0] Wallet request error:", walletError)
          setError(walletError?.message || "Failed to connect wallet. Please try again.")
        }
      } else {
        setError("Window object not available")
      }
    } catch (error) {
      console.error("[v0] Connection error:", error)
      setError("Failed to connect wallet. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Button onClick={handleConnect} disabled={isLoading} size="lg" className="gap-2">
        <Wallet className="w-5 h-5" />
        {isLoading ? "Connecting..." : "Connect Wallet"}
      </Button>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
