# PortfolioAI - AI-Powered DeFi Portfolio Builder

A modern web3 application that helps users optimize their DeFi portfolios using AI-powered analysis and Stacks blockchain integration.

## Features

- **Wallet Connection**: Seamlessly connect your Stacks wallet using Stacks.js
- **Portfolio Analytics**: Real-time portfolio visualization with performance charts
- **AI Recommendations**: Get personalized portfolio optimization strategies powered by OpenAI
- **Asset Allocation**: View detailed breakdown of your holdings
- **Risk Analysis**: Understand your portfolio's risk profile
- **Plan Saving**: Save and track your investment strategies

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Blockchain**: Stacks (STX), Stacks.js
- **AI**: OpenAI GPT-4 via Vercel AI SDK
- **Data Fetching**: Stacks API, SWR for client-side caching
- **UI Components**: shadcn/ui

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Stacks wallet extension (for production)

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

4. Add your OpenAI API key:
   \`\`\`
   OPENAI_API_KEY=your_api_key_here
   \`\`\`

5. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

\`\`\`
├── app/
│   ├── page.tsx              # Landing page
│   ├── dashboard/
│   │   └── page.tsx          # Dashboard page
│   ├── api/
│   │   ├── portfolio/        # Portfolio data endpoints
│   │   ├── ai-analysis/      # AI recommendations endpoint
│   │   └── plans/            # Plan management endpoints
│   └── layout.tsx            # Root layout
├── components/
│   ├── wallet-connect.tsx    # Wallet connection component
│   ├── portfolio-overview.tsx # Portfolio stats
│   ├── portfolio-chart.tsx   # Charts and analytics
│   ├── ai-recommendations.tsx # AI recommendations display
│   └── save-plan-dialog.tsx  # Plan saving dialog
├── hooks/
│   ├── use-portfolio.ts      # Portfolio data hook
│   └── use-ai-recommendations.ts # AI recommendations hook
├── lib/
│   ├── stacks-client.ts      # Stacks API client
│   └── env.ts                # Environment variables
└── public/                   # Static assets
\`\`\`

## API Endpoints

### Portfolio Data
- `GET /api/portfolio?address={address}` - Get portfolio overview
- `GET /api/portfolio/{address}` - Get detailed portfolio data

### AI Analysis
- `POST /api/ai-analysis` - Generate AI recommendations

### Plans
- `GET /api/plans?address={address}` - Get saved plans
- `POST /api/plans` - Save a new plan

## Environment Variables

\`\`\`
OPENAI_API_KEY=your_openai_api_key
STACKS_API_URL=https://api.testnet.hiro.so
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

\`\`\`bash
vercel deploy
\`\`\`

## Features in Development

- On-chain plan storage using Clarity smart contracts
- Advanced portfolio rebalancing strategies
- Historical performance tracking
- Multi-wallet support
- Mobile app

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Support

For support, please open an issue on GitHub or visit our documentation.

## Disclaimer

This application is for educational and informational purposes only. It is not financial advice. Always do your own research before making investment decisions.
