import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

// Prevent multiple instances of Prisma Client in development
export const prisma = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}

// Database service functions
export class DatabaseService {
  
  // Store block data
  async storeBlock(blockData: any) {
    try {
      const block = await prisma.block.upsert({
        where: { number: BigInt(blockData.number) },
        update: {
          hash: blockData.hash,
          parentHash: blockData.parentHash,
          timestamp: new Date(blockData.timestamp * 1000),
          miner: blockData.miner,
          gasLimit: BigInt(blockData.gasLimit),
          gasUsed: BigInt(blockData.gasUsed),
          baseFee: blockData.baseFee ? BigInt(blockData.baseFee) : null,
          reward: blockData.reward || "0",
          txCount: blockData.txCount,
          size: blockData.size || 0
        },
        create: {
          number: BigInt(blockData.number),
          hash: blockData.hash,
          parentHash: blockData.parentHash,
          timestamp: new Date(blockData.timestamp * 1000),
          miner: blockData.miner,
          gasLimit: BigInt(blockData.gasLimit),
          gasUsed: BigInt(blockData.gasUsed),
          baseFee: blockData.baseFee ? BigInt(blockData.baseFee) : null,
          reward: blockData.reward || "0",
          txCount: blockData.txCount,
          size: blockData.size || 0
        }
      })
      return block
    } catch (error) {
      console.error('Error storing block:', error)
      throw error
    }
  }

  // Store transaction data
  async storeTransaction(txData: any) {
    try {
      const transaction = await prisma.transaction.upsert({
        where: { hash: txData.hash },
        update: {
          blockNumber: BigInt(txData.blockNumber),
          blockHash: txData.blockHash,
          transactionIndex: txData.transactionIndex,
          from: txData.from,
          to: txData.to,
          value: txData.value,
          gasPrice: BigInt(txData.gasPrice || 0),
          gasLimit: BigInt(txData.gasLimit),
          gasUsed: txData.gasUsed ? BigInt(txData.gasUsed) : null,
          input: txData.input,
          nonce: txData.nonce,
          status: txData.status,
          timestamp: new Date(txData.timestamp * 1000)
        },
        create: {
          hash: txData.hash,
          blockNumber: BigInt(txData.blockNumber),
          blockHash: txData.blockHash,
          transactionIndex: txData.transactionIndex,
          from: txData.from,
          to: txData.to,
          value: txData.value,
          gasPrice: BigInt(txData.gasPrice || 0),
          gasLimit: BigInt(txData.gasLimit),
          gasUsed: txData.gasUsed ? BigInt(txData.gasUsed) : null,
          input: txData.input,
          nonce: txData.nonce,
          status: txData.status,
          timestamp: new Date(txData.timestamp * 1000)
        }
      })
      return transaction
    } catch (error) {
      console.error('Error storing transaction:', error)
      throw error
    }
  }

  // Get latest blocks from database
  async getLatestBlocks(limit: number = 10) {
    try {
      const blocks = await prisma.block.findMany({
        orderBy: { number: 'desc' },
        take: limit,
        include: {
          _count: {
            select: { transactions: true }
          }
        }
      })
      return blocks
    } catch (error) {
      console.error('Error fetching latest blocks:', error)
      throw error
    }
  }

  // Get latest transactions from database
  async getLatestTransactions(limit: number = 10) {
    try {
      const transactions = await prisma.transaction.findMany({
        orderBy: { timestamp: 'desc' },
        take: limit,
        include: {
          block: {
            select: { timestamp: true, number: true }
          }
        }
      })
      return transactions
    } catch (error) {
      console.error('Error fetching latest transactions:', error)
      throw error
    }
  }

  // Store token information
  async storeToken(tokenData: any) {
    try {
      const token = await prisma.token.upsert({
        where: { address: tokenData.address },
        update: {
          name: tokenData.name,
          symbol: tokenData.symbol,
          decimals: tokenData.decimals,
          totalSupply: tokenData.totalSupply,
          price: tokenData.price,
          marketCap: tokenData.marketCap,
          volume24h: tokenData.volume24h,
          change24h: tokenData.change24h,
          holders: tokenData.holders
        },
        create: {
          address: tokenData.address,
          name: tokenData.name,
          symbol: tokenData.symbol,
          decimals: tokenData.decimals,
          totalSupply: tokenData.totalSupply,
          price: tokenData.price,
          marketCap: tokenData.marketCap,
          volume24h: tokenData.volume24h,
          change24h: tokenData.change24h,
          holders: tokenData.holders
        }
      })
      return token
    } catch (error) {
      console.error('Error storing token:', error)
      throw error
    }
  }

  // Update network statistics
  async updateNetworkStats(statsData: any) {
    try {
      const stats = await prisma.networkStats.create({
        data: {
          blockNumber: BigInt(statsData.blockNumber),
          totalTx: BigInt(statsData.totalTx),
          gasPrice: BigInt(statsData.gasPrice),
          networkHashrate: statsData.networkHashrate,
          difficulty: statsData.difficulty
        }
      })
      return stats
    } catch (error) {
      console.error('Error updating network stats:', error)
      throw error
    }
  }
}

export const databaseService = new DatabaseService()


