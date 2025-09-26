# The BaseTrix

> *"Initializing with blockchain data... The Basetrix has you..."*

A Matrix-style visualization of real-time Base blockchain activity. Watch the digital rain of actual transactions, blocks, and addresses flowing down your screen.

## 🌟 Features

- **🌧️ Matrix Digital Rain** - Smooth falling character streams covering the full screen
- **📊 Real Base Blockchain Data** - Live transaction hashes, block numbers, and wallet addresses  
- **⚡ Flashblocks Integration** - Ultra-fast Base blockchain updates via Flashblocks-aware RPC
- **🎨 Calming Visual Effect** - Meditative blue-on-black aesthetic with random glow effects
- **🔄 Live Updates** - Fresh blockchain data every 10 seconds
- **💾 Reliable Fallback** - Mock data ensures smooth operation even if API is unavailable

## 🎯 What You're Seeing

Each falling character represents actual Base blockchain activity:

- **Transaction Hashes** - From live Base Sepolia transactions
- **Wallet Addresses** - Real addresses interacting on Base  
- **Block Data** - Numbers, hashes, timestamps from live blocks
- **Gas Usage** - Actual gas consumption from transactions

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/jnix2007/thebasetrix.git
cd thebasetrix

# Install dependencies
npm install

# Start the development server
npm run dev

# Open http://localhost:3000
```

## 🔧 Technical Details

- **Framework:** Next.js 15 with TypeScript
- **Data Source:** Base Sepolia Flashblocks-aware RPC endpoint
- **Update Frequency:** Every 10 seconds for smooth performance
- **Fallback:** Realistic mock data when API is unavailable
- **Animation:** Pure CSS for smooth, performant streams

## 🎨 Visual Design

- **Matrix Rain:** Dense vertical character streams (12px columns)
- **Depth Effect:** Varied opacity (0.3-1.0) for layered appearance  
- **Base Logo:** Pulsing blue square in center
- **Colors:** Blue characters on black background
- **Glow Effects:** Random cyan highlights for visual appeal

## 🌐 Live Demo

Experience The BaseTrix: **[thebasetrix.xyz](https://thebasetrix.xyz)** *(coming soon)*

## 📋 Environment Setup

Copy `.env.local` (optional):
```bash
cp .env.local.example .env.local
```

All configuration has sensible defaults - no setup required!

## 🙏 Acknowledgments

- **Base** for the Flashblocks infrastructure and blockchain platform
- **The Matrix** for the iconic digital rain inspiration
- **Base community** for building the future of onchain

---

*"Welcome to the real world."* 🌉
