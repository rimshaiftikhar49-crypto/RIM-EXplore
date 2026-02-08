# AUR Blockchain Explorer - Backend Setup

This guide will help you set up the backend infrastructure to make your AUR blockchain explorer fully functional.

## 🏗️ Architecture Overview

```
Frontend (Next.js) → API Routes → Blockchain Service → AUR Node
                                ↓
                              Database (PostgreSQL)
                                ↓
                              WebSocket (Real-time updates)
```

## 📋 Prerequisites

1. **Node.js** (v18 or higher)
2. **PostgreSQL** database
3. **AUR Blockchain Node** (or testnet access)
4. **Redis** (optional, for caching)

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Setup
```bash
# Install PostgreSQL (if not already installed)
# Windows: Download from https://www.postgresql.org/download/windows/
# Create database
createdb aur_explorer

# Copy environment file
cp env.example .env

# Edit .env file with your database credentials
# DATABASE_URL="postgresql://username:password@localhost:5432/aur_explorer?schema=public"

# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push
```

### 3. Environment Configuration
Edit `.env` file:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/aur_explorer?schema=public"

# AUR Blockchain Node
AUR_RPC_URL="http://localhost:8545"  # Your AUR node RPC
AUR_WS_URL="ws://localhost:8546"     # Your AUR node WebSocket

# External APIs (optional)
COINGECKO_API_KEY="your_api_key"     # For price data
```

### 4. Start Backend Services
```bash
# Start the Next.js development server
npm run dev

# In a separate terminal, start blockchain sync
npm run sync:start

# Optional: View database in Prisma Studio
npm run db:studio
```

## 🔗 API Endpoints

### Blocks
- `GET /api/blocks` - Get latest blocks
- `GET /api/blocks/[number]` - Get specific block

### Transactions  
- `GET /api/transactions` - Get latest transactions
- `GET /api/transactions/[hash]` - Get specific transaction

### Statistics
- `GET /api/stats` - Get network statistics

### Tokens
- `GET /api/tokens` - Get token list
- `GET /api/tokens/[address]` - Get token details

### Search
- `GET /api/search?q=[query]` - Search addresses, transactions, blocks

## 🔄 Real-time Features

The backend includes WebSocket support for real-time updates:

- **New blocks** - Automatically broadcast when new blocks are mined
- **New transactions** - Real-time transaction updates  
- **Price updates** - Live price and statistics updates
- **Network stats** - Gas price, block time, etc.

## 🗄️ Database Schema

The database stores:
- **Blocks** - Block data, miner info, gas usage
- **Transactions** - Transaction details, from/to addresses
- **Tokens** - Token contracts, metadata, prices
- **Addresses** - Address balances, transaction counts
- **Network Stats** - Historical network statistics

## 🔧 Blockchain Integration

### Connecting to AUR Node

1. **Local Node**: Run your own AUR node
2. **Remote Node**: Use a hosted AUR RPC service
3. **Testnet**: Connect to AUR testnet for development

Update `AUR_RPC_URL` in `.env` with your node endpoint.

### Web3 Features

The backend includes:
- **Block monitoring** - Real-time block detection
- **Transaction parsing** - Automatic transaction indexing
- **Contract interaction** - Token contract data
- **Address tracking** - Balance and transaction monitoring

## 📊 Data Flow

1. **Blockchain Listener** monitors AUR node for new blocks
2. **Sync Service** processes and stores blockchain data
3. **API Routes** serve data to frontend
4. **WebSocket Service** broadcasts real-time updates
5. **Database** stores historical data for fast queries

## 🚦 Production Deployment

For production deployment:

1. **Database**: Use managed PostgreSQL (AWS RDS, Google Cloud SQL)
2. **Caching**: Add Redis for better performance
3. **Load Balancing**: Use multiple API instances
4. **Monitoring**: Add logging and error tracking
5. **Security**: Implement rate limiting and API keys

## 🔍 Monitoring & Debugging

```bash
# Check sync status
curl http://localhost:3000/api/sync/status

# View database
npm run db:studio

# Check logs
tail -f logs/sync.log
```

## 🆘 Troubleshooting

### Common Issues:

1. **Database Connection Error**
   - Check PostgreSQL is running
   - Verify DATABASE_URL in .env

2. **Blockchain Node Connection**
   - Ensure AUR node is running
   - Check AUR_RPC_URL is correct

3. **Sync Not Working**
   - Check node connectivity
   - Verify WebSocket endpoint

## 🔮 Next Steps

After setup, you can:
1. Connect to real AUR blockchain node
2. Implement token price feeds
3. Add advanced analytics
4. Create user accounts and watchlists
5. Add smart contract verification
6. Implement advanced search features

## 🎯 Current Status

✅ **Completed:**
- Frontend UI (Etherscan-style)
- API route structure
- Database schema
- WebSocket setup
- Sync service framework

🔄 **Next Steps:**
- Connect to real AUR node
- Configure database
- Start sync service
- Test real-time updates



