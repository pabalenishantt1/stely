const STACKS_API_URL = "https://api.testnet.hiro.so"

export interface StacksAccount {
  address: string
  balance: string
  nonce: number
  locked: string
}

export interface StacksTransaction {
  tx_id: string
  tx_type: string
  from_address: string
  to_address: string
  amount: string
  fee: string
  status: string
  block_height: number
  tx_index: number
  block_time: number
}

export interface StacksAsset {
  name: string
  symbol: string
  balance: string
  decimals: number
  value: number
}

export class StacksClient {
  private baseUrl: string

  constructor(baseUrl: string = STACKS_API_URL) {
    this.baseUrl = baseUrl
  }

  async getAccountInfo(address: string): Promise<StacksAccount> {
    try {
      const response = await fetch(`${this.baseUrl}/extended/v1/address/${address}/stx`)
      if (!response.ok) throw new Error("Failed to fetch account info")
      return response.json()
    } catch (error) {
      console.error("Error fetching account info:", error)
      throw error
    }
  }

  async getAccountTransactions(address: string, limit = 50): Promise<StacksTransaction[]> {
    try {
      const response = await fetch(`${this.baseUrl}/extended/v1/address/${address}/transactions?limit=${limit}`)
      if (!response.ok) throw new Error("Failed to fetch transactions")
      const data = await response.json()
      return data.results || []
    } catch (error) {
      console.error("Error fetching transactions:", error)
      throw error
    }
  }

  async getAccountBalance(address: string): Promise<{ stx: string; tokens: StacksAsset[] }> {
    try {
      const response = await fetch(`${this.baseUrl}/extended/v1/address/${address}/balances`)
      if (!response.ok) throw new Error("Failed to fetch balances")
      return response.json()
    } catch (error) {
      console.error("Error fetching balances:", error)
      throw error
    }
  }

  async getTokenInfo(contractId: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/extended/v1/tokens/${contractId}`)
      if (!response.ok) throw new Error("Failed to fetch token info")
      return response.json()
    } catch (error) {
      console.error("Error fetching token info:", error)
      throw error
    }
  }
}

export const stacksClient = new StacksClient()
