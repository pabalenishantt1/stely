"use client"
import useSWR from "swr"

interface PortfolioData {
  address: string
  stxBalance: number
  totalValue: number
  accountInfo: any
  balances: any
  lastUpdated: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function usePortfolio(address: string | null) {
  const { data, error, isLoading } = useSWR(address ? `/api/portfolio?address=${address}` : null, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60000, // 1 minute
  })

  return {
    portfolio: data as PortfolioData | undefined,
    isLoading,
    error,
  }
}
