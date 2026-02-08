import { NextRequest, NextResponse } from 'next/server'
import { ethers } from 'ethers'

// Mock data for development - replace with real blockchain data
const mockBlocks = [
  {
    number: 23394849,
    timestamp: Date.now() - 9000,
    miner: "Titan Builder",
    txCount: 264,
    gasUsed: "12000000",
    reward: "0.00881",
    hash: "0x1234567890abcdef..."
  },
  {
    number: 23394848,
    timestamp: Date.now() - 21000,
    miner: "Titan Builder", 
    txCount: 377,
    gasUsed: "12000000",
    reward: "0.01006",
    hash: "0x2345678901bcdef0..."
  },
  {
    number: 23394847,
    timestamp: Date.now() - 33000,
    miner: "Titan Builder",
    txCount: 260,
    gasUsed: "12000000", 
    reward: "0.00843",
    hash: "0x3456789012cdef01..."
  },
  {
    number: 23394846,
    timestamp: Date.now() - 45000,
    miner: "BuilderNet",
    txCount: 442,
    gasUsed: "12000000",
    reward: "0.02159", 
    hash: "0x456789013def012..."
  },
  {
    number: 23394845,
    timestamp: Date.now() - 57000,
    miner: "CoinEx: Cold",
    txCount: 0,
    gasUsed: "12000000",
    reward: "0",
    hash: "0x56789014ef0123..."
  },
  {
    number: 23394844,
    timestamp: Date.now() - 60000,
    miner: "Titan Builder",
    txCount: 167,
    gasUsed: "12000000",
    reward: "0.01203",
    hash: "0x6789015f01234..."
  }
]

export async function GET() {
  try {
    // TODO: Replace with real blockchain node connection
    // const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
    // const latestBlock = await provider.getBlockNumber()
    
    const blocks = mockBlocks.map(block => ({
      ...block,
      timeAgo: getTimeAgo(block.timestamp)
    }))

    return NextResponse.json({
      success: true,
      blocks: blocks,
      total: mockBlocks.length
    })
  } catch (error) {
    console.error('Error fetching blocks:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blocks' },
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


