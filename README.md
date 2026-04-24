# PredictX - Prediction Markets UI

A complete, production-ready Polymarket-like prediction market website UI built with React, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will start at `http://localhost:3000`.

## 📦 Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Data visualization
- **React Router v6** - Client-side routing
- **Axios** - HTTP client

## 🏗️ Project Structure

```
src/
├── components/
│   ├── common/          # Header, Sidebar, Footer, Loading
│   ├── markets/         # MarketCard, MarketGrid, MarketDetail, MarketFilters
│   ├── trading/         # OrderBook, TradeChart, TradeHistory
│   └── ui/              # Button, Card, Modal
├── pages/               # HomePage, MarketPage, NotFound
├── services/            # Mock data & API service
├── hooks/               # useMarkets, useTrades
├── types/               # TypeScript interfaces
└── styles/              # Global CSS
```

## ✨ Features

### Markets Overview
- Grid display of prediction markets
- Search & filter by category, status
- Sort by: Trending, Volume, Liquidity, Ends Soon, Newest
- Platform stats (total volume, active markets, trades)

### Market Detail Page
- Full market information with odds display
- Interactive price/volume charts (1H, 1D, 1W, ALL)
- Real-time order book visualization
- Recent trade history feed

### UI/UX
- Dark crypto-style theme
- Responsive design (mobile, tablet, desktop)
- Loading skeleton screens
- Smooth animations
- Professional layout

## 🔄 Mock Data

The app uses a mock data service (`src/services/mockData.ts`) that simulates:
- 12 prediction markets across categories
- Trade history with realistic timing
- Order book depth data
- Price chart data generation

To connect to a real API, update `src/services/api.ts` with your actual API endpoints.

## 📝 Customization

- **Colors**: Edit `tailwind.config.js` theme colors
- **Markets**: Add/edit markets in `src/services/mockData.ts`
- **API**: Replace mock calls in `src/services/api.ts`
