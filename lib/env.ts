export function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue

  if (!value && !defaultValue) {
    console.warn(`Environment variable ${key} is not set`)
  }

  return value || ""
}

export const OPENAI_API_KEY = getEnvVar("OPENAI_API_KEY")
export const STACKS_API_URL = getEnvVar("STACKS_API_URL", "https://api.testnet.hiro.so")
export const NEXT_PUBLIC_APP_URL = getEnvVar("NEXT_PUBLIC_APP_URL", "http://localhost:3000")
