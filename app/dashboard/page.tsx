"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WalletConnect } from "@/components/wallet-connect"
import { PortfolioOverview } from "@/components/portfolio-overview"
import { PortfolioChart } from "@/components/portfolio-chart"
import { AIRecommendations } from "@/components/ai-recommendations"
import { SavePlanDialog } from "@/components/save-plan-dialog"
import { LogOut, Menu, X } from "lucide-react"

export default function DashboardPage() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [recommendations, setRecommendations] = useState([])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">PA</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline">PortfolioAI</span>
          </div>

          <div className="hidden sm:flex items-center gap-4">
            {isConnected ? (
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 rounded-lg bg-card border border-border/50">
                  <p className="text-sm text-muted-foreground">Connected</p>
                  <p className="text-sm font-mono">
                    {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsConnected(false)
                    setWalletAddress(null)
                  }}
                  className="gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Disconnect
                </Button>
              </div>
            ) : (
              <WalletConnect
                onConnect={(address) => {
                  setIsConnected(true)
                  setWalletAddress(address)
                }}
              />
            )}
          </div>

          <button className="sm:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden border-t border-border/40 p-4 space-y-4">
            {isConnected ? (
              <>
                <div className="px-4 py-2 rounded-lg bg-card border border-border/50">
                  <p className="text-sm text-muted-foreground">Connected</p>
                  <p className="text-sm font-mono">
                    {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsConnected(false)
                    setWalletAddress(null)
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Disconnect
                </Button>
              </>
            ) : (
              <WalletConnect
                onConnect={(address) => {
                  setIsConnected(true)
                  setWalletAddress(address)
                  setIsMobileMenuOpen(false)
                }}
              />
            )}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Connect Your Wallet</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Connect your Stacks wallet to start analyzing your DeFi portfolio with AI
              </p>
            </div>
            <WalletConnect
              onConnect={(address) => {
                setIsConnected(true)
                setWalletAddress(address)
              }}
            />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Portfolio Overview */}
            <PortfolioOverview walletAddress={walletAddress} />

            {/* Tabs */}
            <Tabs defaultValue="analytics" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="recommendations">AI Insights</TabsTrigger>
                <TabsTrigger value="plans">Plans</TabsTrigger>
              </TabsList>

              <TabsContent value="analytics" className="space-y-6">
                <PortfolioChart walletAddress={walletAddress} />
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-6">
                <div className="flex justify-end">
                  <SavePlanDialog walletAddress={walletAddress} recommendations={recommendations} />
                </div>
                <AIRecommendations walletAddress={walletAddress} onRecommendationsLoaded={setRecommendations} />
              </TabsContent>

              <TabsContent value="plans" className="space-y-6">
                <Card className="p-8 text-center">
                  <h3 className="text-lg font-semibold mb-2">Your Saved Plans</h3>
                  <p className="text-muted-foreground mb-6">
                    Plans are saved locally and can be exported for on-chain storage
                  </p>
                  <Button disabled>Coming Soon</Button>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>
    </div>
  )
}
