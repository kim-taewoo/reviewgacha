export const DEFAULT_URL = process.env.APP_URL || (process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000")
