import { NextRequest, NextResponse } from 'next/server'
import { ethers } from 'ethers'

// Mock transaction data for development
const mockTransactions = [
  {
    hash: "0x3d6d9c0ead...",
    from: "0x4833B106...B0BAD5f97",
    to: "0x7a987584...b93ab8C14",
    value: "0.0087",
    timestamp: Date.now() - 9000,
    blockNumber: 23394849,
    gasPrice: "20000000000",
    gasUsed: "21000"
  },
  {
    hash: "0xafd4253d405...",
    from: "0x7830c87C...31FA86F43",
    to: "0xA9D1e08C...FB81d3E43", 
    value: "0",
    timestamp: Date.now() - 9000,
    blockNumber: 23394849,
    gasPrice: "20000000000",
    gasUsed: "21000"
  },
  {
    hash: "0x7eaa8ec79e...",
    from: "0x331AF223...323D5ED83",
    to: "0xDf31A70a...6c45cfd0f",
    value: "0.00102",
    timestamp: Date.now() - 9000,
    blockNumber: 23394849,
    gasPrice: "20000000000", 
    gasUsed: "21000"
  },
  {
    hash: "0x9edd78d0a6...",
    from: "0x8C8D7C46...D564d7465",
    to: "0x1181d030...5692759b3",
    value: "0.03203",
    timestamp: Date.now() - 9000,
    blockNumber: 23394849,
    gasPrice: "20000000000",
    gasUsed: "21000"
  },
  {
    hash: "0x40ff9d2c997...",
    from: "0x8C8D7C46...D564d7465", 
    to: "0x6F7A51f6...77D5187d2",
    value: "0.00782",
    timestamp: Date.now() - 9000,
    blockNumber: 23394849,
    gasPrice: "20000000000",
    gasUsed: "21000"
  },
  {
    hash: "0x7c0c3f6781e...",
    from: "0x4E5B2e1d...34C7e972F",
    to: "0xCeEdd5b6...4680aBedA",
    value: "0.0064",
    timestamp: Date.now() - 9000,
    blockNumber: 23394849,
    gasPrice: "20000000000",
    gasUsed: "21000"
  }
]

export async function GET() {
  try {
    // TODO: Replace with real blockchain node connection
    // const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
    // const latestBlock = await provider.getBlock('latest')
    // const transactions = latestBlock.transactions
    
    const transactions = mockTransactions.map(tx => ({
      ...tx,
      timeAgo: getTimeAgo(tx.timestamp)
    }))

    return NextResponse.json({
      success: true,
      transactions: transactions,
      total: mockTransactions.length
    })
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch transactions' },
      { status: 500 }
    )
  }
}

function getTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000)
  if (seconds < 60) return `${seconds} secs ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  return `${hours} hrs ago`
}


