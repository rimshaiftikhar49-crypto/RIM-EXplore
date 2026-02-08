'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Search, Globe, Monitor, Fuel, Clock, Shield } from 'lucide-react'

// Types for API responses
interface Block {
  number: number
  timestamp: number
  miner: string
  txCount: number
  reward: string
  timeAgo: string
}

interface Transaction {
  hash: string
  from: string
  to: string
  value: string
  timeAgo: string
}

interface NetworkStats {
  aurPrice: {
    usd: number
    btc: number
    change24h: number
  }
  marketCap: number
  totalTransactions: number
  tps: number
  lastFinalizedBlock: number
  lastSafeBlock: number
  gasPrice: {
    gwei: number
    usd: number
  }
  transactionHistory?: number[]
}

export default function Home() {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [stats, setStats] = useState<NetworkStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [liveChartData, setLiveChartData] = useState<number[]>([])
  const [isLiveChartActive, setIsLiveChartActive] = useState(true)

  useEffect(() => {
    fetchData()

    // Set up auto-refresh every 30 seconds for live data
    const interval = setInterval(() => {
      fetchData()
    }, 30000)

    // Fallback timeout to ensure loading doesn't last forever
    const timeout = setTimeout(() => {
      if (loading) {
        setLoading(false)
      }
    }, 5000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  // Live chart animation effect
  useEffect(() => {
    if (!isLiveChartActive) return

    const generateLiveData = () => {
      const newData = []
      for (let i = 0; i < 14; i++) {
        // Generate realistic transaction volume data (1200k-2000k range)
        const baseVolume = 1200 + Math.random() * 800 // 1200-2000k range
        const timeFactor = Math.sin(Date.now() / 15000 + i * 0.5) * 200 // Time-based oscillation
        const randomFactor = (Math.random() - 0.5) * 300 // Random fluctuation

        const finalVolume = Math.max(1200, Math.min(2000, Math.round(baseVolume + timeFactor + randomFactor)))
        newData.push(finalVolume)
      }
      return newData
    }

    // Initialize with first data
    setLiveChartData(generateLiveData())

    // Update chart every 2 seconds for live effect
    const chartInterval = setInterval(() => {
      setLiveChartData(generateLiveData())
    }, 2000)

    return () => clearInterval(chartInterval)
  }, [isLiveChartActive])

  const fetchData = async () => {
    try {
      const [blocksRes, transactionsRes, statsRes] = await Promise.all([
        fetch('/api/blocks'),
        fetch('/api/transactions'),
        fetch('/api/stats')
      ])

      if (blocksRes.ok && transactionsRes.ok && statsRes.ok) {
        const [blocksData, transactionsData, statsData] = await Promise.all([
          blocksRes.json(),
          transactionsRes.json(),
          statsRes.json()
        ])

        setBlocks(blocksData.blocks || [])
        setTransactions(transactionsData.transactions || [])
        setStats(statsData.data || statsData)
      } else {
        // Fallback data if APIs fail
        setBlocks([
          { number: 12345678, timestamp: Date.now(), miner: '0x1234567890123456789012345678901234567890', txCount: 150, reward: '2.0', timeAgo: '2 mins' },
          { number: 12345677, timestamp: Date.now() - 120000, miner: '0x1234567890123456789012345678901234567890', txCount: 180, reward: '2.1', timeAgo: '4 mins' }
        ])
        setTransactions([
          { hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890', from: '0x1234567890123456789012345678901234567890', to: '0x0987654321098765432109876543210987654321', value: '1.5', timeAgo: '1 min' },
          { hash: '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321', from: '0x0987654321098765432109876543210987654321', to: '0x1234567890123456789012345678901234567890', value: '0.8', timeAgo: '3 mins' }
        ])
        setStats({
          aurPrice: { usd: 4554.69, btc: 0.038914, change24h: -1.28 },
          marketCap: 549769119347.00,
          totalTransactions: 2999670000,
          tps: 19.4,
          lastFinalizedBlock: 23394757,
          lastSafeBlock: 23394821,
          gasPrice: { gwei: 0.199, usd: 0.02 }
        })
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      // Fallback data on error
      setBlocks([
        { number: 12345678, timestamp: Date.now(), miner: '0x1234567890123456789012345678901234567890', txCount: 150, reward: '2.0', timeAgo: '2 mins' }
      ])
      setTransactions([
        { hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890', from: '0x1234567890123456789012345678901234567890', to: '0x0987654321098765432109876543210987654321', value: '1.5', timeAgo: '1 min' }
      ])
      setStats({
        aurPrice: { usd: 4554.69, btc: 0.038914, change24h: -1.28 },
        marketCap: 549769119347.00,
        totalTransactions: 2999670000,
        tps: 19.4,
        lastFinalizedBlock: 23394757,
        lastSafeBlock: 23394821,
        gasPrice: { gwei: 0.199, usd: 0.02 }
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (query: string) => {
    if (!query.trim()) return

    try {
      // Basic search logic - can be enhanced
      if (query.startsWith('0x')) {
        if (query.length === 66) {
          // Transaction hash
          window.location.href = `/tx/${query}`
        } else if (query.length === 42) {
          // Address
          window.location.href = `/address/${query}`
        } else {
          alert('Invalid hash format')
        }
      } else if (/^\d+$/.test(query)) {
        // Block number
        window.location.href = `/block/${query}`
      } else if (query.endsWith('.eth') || query.endsWith('.aur')) {
        // Domain name
        window.location.href = `/domain-name-lookup?domain=${encodeURIComponent(query)}`
      } else if (query.toLowerCase() === 'tokens' || query.toLowerCase() === 'token') {
        window.location.href = `/tokens`
      } else {
        alert('No results found for your search query.')
      }
    } catch (error) {
      console.error('Search error:', error)
      alert('Search failed. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blockchain data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Golden Hero Section */}
      <div className="bg-gradient-to-br from-yellow-400 via-yellow-600 to-yellow-500 relative overflow-hidden shadow-lg">
        {/* Topographic pattern background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="topography" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M0,50 Q25,25 50,50 T100,50" stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.3" />
                <path d="M0,75 Q25,50 50,75 T100,75" stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.2" />
                <path d="M0,25 Q25,0 50,25 T100,25" stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.4" />
                <path d="M0,100 Q25,75 50,100 T100,100" stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#topography)" />
          </svg>
        </div>

        {/* Etherscan exact container spacing */}
        <div className="relative container mx-auto px-4 py-16 max-w-6xl">
          {/* Main Heading - Etherscan style */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              The RIM Blockchain Explorer
            </h1>
          </div>

          {/* Search Bar - Golden Theme */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex bg-white rounded-md shadow-lg border border-gray-200">
              <select className="px-4 py-3 border-r border-gray-200 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm rounded-l-md">
                <option>All Filters</option>
                <option>Addresses</option>
                <option>Tokens</option>
                <option>Name Tags</option>
                <option>Labels</option>
                <option>Websites</option>
              </select>
              <input
                type="text"
                placeholder="Search by Address / Txn Hash / Block / Token / Domain Name"
                className="flex-1 px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch((e.target as HTMLInputElement).value)
                  }
                }}
              />
              <button
                className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 rounded-r-md shadow-sm"
                onClick={(e) => {
                  const input = (e.currentTarget.previousElementSibling as HTMLInputElement)
                  handleSearch(input.value)
                }}
              >
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Sponsored Content - Golden Theme */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
            <div className="flex-1">
              <div className="text-white/80 text-sm">
                Sponsored: ⭐ 1inch - Swap Solana tokens on 8 off EVM chains. No bridges. MEV protection by design. The best rates.
                <span className="text-white underline cursor-pointer ml-1 hover:text-yellow-300 transition-colors">Swap Now!</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section - Golden & Dark Grey Theme */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* AUR PRICE Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 bg-white rounded transform rotate-45"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">RIM PRICE</div>
                  <div className="text-sm font-semibold text-gray-900 mb-1">
                    ${stats?.aurPrice?.usd?.toFixed(2) || '0.00'} @ {stats?.aurPrice?.btc?.toFixed(6) || '0.000000'} RIM
                  </div>
                  <div className={`text-xs font-medium ${stats?.aurPrice?.change24h && stats.aurPrice.change24h < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    ({stats?.aurPrice?.change24h && stats.aurPrice.change24h > 0 ? '+' : ''}{stats?.aurPrice?.change24h?.toFixed(2) || '0.00'}%)
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 text-gray-700">
                  <Globe size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">MARKET CAP</div>
                  <div className="text-sm font-semibold text-gray-900">
                    ${stats?.marketCap.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </div>
                </div>
              </div>
            </div>

            {/* TRANSACTIONS Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 text-gray-700">
                  <Monitor size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">TRANSACTIONS</div>
                  <div className="text-sm font-semibold text-gray-900">
                    {stats ? (stats.totalTransactions / 1000000).toFixed(2) : '0'} M ({stats?.tps.toFixed(1)} TPS)
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white">
                  <Clock size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">LAST FINALIZED BLOCK</div>
                  <div className="text-sm font-semibold text-gray-900">{stats?.lastFinalizedBlock.toLocaleString()}</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 text-gray-700">
                  <Shield size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">LAST SAFE BLOCK</div>
                  <div className="text-sm font-semibold text-gray-900">{stats?.lastSafeBlock.toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* MED GAS PRICE Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white">
                  <Fuel size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">MED GAS PRICE</div>
                  <div className="text-sm font-semibold text-gray-900">
                    {stats?.gasPrice.gwei.toFixed(3)} Gwei (${stats?.gasPrice.usd.toFixed(2)})
                  </div>
                </div>
              </div>
            </div>

            {/* TRANSACTION HISTORY Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">TRANSACTION HISTORY IN 14 DAYS</div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsLiveChartActive(!isLiveChartActive)}
                    className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium transition-colors ${isLiveChartActive
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${isLiveChartActive ? 'bg-white animate-pulse' : 'bg-gray-500'}`}></div>
                    <span>{isLiveChartActive ? 'Live' : 'Static'}</span>
                  </button>
                </div>
              </div>
              <div className="relative h-28 mb-3">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-600">
                  <span>2 000k</span>
                  <span>1 600k</span>
                  <span>1 200k</span>
                </div>

                {/* Chart area */}
                <div className="ml-8 h-full relative">
                  <svg className="w-full h-full" viewBox="0 0 300 120">
                    {/* Generate line graph data */}
                    {(() => {
                      const data = liveChartData.length > 0 ? liveChartData : [1600, 1200, 1400, 1600, 1800, 1700, 1400, 1600, 1900, 2000, 1800, 1700, 1900, 1700]
                      const maxValue = 2000
                      const minValue = 1200
                      const range = maxValue - minValue
                      const width = 280
                      const height = 100

                      // Convert values to SVG coordinates
                      const points = data.map((value, index) => {
                        const x = (index / (data.length - 1)) * width + 10
                        const y = height - ((value - minValue) / range) * height + 10
                        return `${x},${y}`
                      }).join(' ')

                      // Find peak point for pink dot
                      const maxIndex = data.indexOf(Math.max(...data))
                      const peakX = (maxIndex / (data.length - 1)) * width + 10
                      const peakY = height - ((data[maxIndex] - minValue) / range) * height + 10

                      return (
                        <>
                          {/* Line path */}
                          <polyline
                            points={points}
                            fill="none"
                            stroke="#D97706"
                            strokeWidth="2"
                            className={`transition-all duration-1000 ease-in-out ${isLiveChartActive ? 'animate-pulse' : ''}`}
                          />

                          {/* Pink dot on peak */}
                          {isLiveChartActive && (
                            <circle
                              cx={peakX}
                              cy={peakY}
                              r="3"
                              fill="#ec4899"
                              className="animate-pulse"
                            />
                          )}

                          {/* Data points */}
                          {data.map((value, index) => {
                            const x = (index / (data.length - 1)) * width + 10
                            const y = height - ((value - minValue) / range) * height + 10
                            return (
                              <circle
                                key={index}
                                cx={x}
                                cy={y}
                                r="2"
                                fill="#D97706"
                                className={`transition-all duration-1000 ease-in-out ${isLiveChartActive ? 'animate-pulse' : ''}`}
                              />
                            )
                          })}
                        </>
                      )
                    })()}
                  </svg>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-600 ml-8">
                <span>Sep 5</span>
                <span>Sep 12</span>
                <span>Sep 19</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Latest Blocks and Transactions Section - Etherscan exact layout */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Latest Blocks */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Latest Blocks</h2>
                <Link href="/blocks" className="text-yellow-600 hover:text-yellow-700 text-sm font-medium transition-colors">
                  VIEW ALL BLOCKS →
                </Link>
              </div>
              <div className="space-y-3">
                {blocks.slice(0, 6).map((block, index) => (
                  <div key={block.number} className="flex items-center space-x-3 py-2 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors rounded">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded flex items-center justify-center flex-shrink-0">
                      <div className="w-3 h-3 bg-white rounded"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <Link href={`/block/${block.number}`} className="text-yellow-600 hover:text-yellow-700 font-medium text-sm transition-colors">
                          {block.number.toLocaleString()}
                        </Link>
                        <span className="text-xs text-gray-500">{block.timeAgo}</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        Fee Recipient: <Link href={`/address/${block.miner}`} className="text-yellow-600 hover:text-yellow-700 transition-colors">
                          {block.miner.slice(0, 8)}...{block.miner.slice(-6)}
                        </Link>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-medium text-gray-900">{block.txCount} txns</div>
                      <div className="text-xs text-gray-500">{block.reward} RIM</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest Transactions */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Latest Transactions</h2>
                <Link href="/txs" className="text-yellow-600 hover:text-yellow-700 text-sm font-medium transition-colors">
                  VIEW ALL TRANSACTIONS →
                </Link>
              </div>
              <div className="space-y-3">
                {transactions.slice(0, 6).map((tx, index) => (
                  <div key={tx.hash} className="flex items-center space-x-3 py-2 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors rounded">
                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                      <div className="w-3 h-3 bg-green-600 rounded"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <Link href={`/tx/${tx.hash}`} className="text-yellow-600 hover:text-yellow-700 font-medium text-sm transition-colors">
                          {tx.hash.slice(0, 10)}...
                        </Link>
                        <span className="text-xs text-gray-500">{tx.timeAgo}</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        From: <Link href={`/address/${tx.from}`} className="text-yellow-600 hover:text-yellow-700 transition-colors">
                          {tx.from.slice(0, 8)}...{tx.from.slice(-6)}
                        </Link>
                        {' '}To: <Link href={`/address/${tx.to}`} className="text-yellow-600 hover:text-yellow-700 transition-colors">
                          {tx.to.slice(0, 8)}...{tx.to.slice(-6)}
                        </Link>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-medium text-gray-900">{tx.value} RIM</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Footer Section with Golden Theme */}
      <div className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex space-x-4">
              <button className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center hover:bg-yellow-600 transition-colors">
                <span className="text-white text-sm font-bold">X</span>
              </button>
              <button className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center hover:bg-yellow-600 transition-colors">
                <span className="text-white text-sm">👁</span>
              </button>
              <button className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center hover:bg-yellow-600 transition-colors">
                <span className="text-white text-sm font-bold">f</span>
              </button>
            </div>
            <Link href="#" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
              ↑ Back to Top
            </Link>
          </div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Powered by RIM */}
            <div>
              <h4 className="text-lg font-semibold text-yellow-400 mb-4">Powered by RIM</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">RIM</Link></li>
                <li><Link href="/blocks" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">Blocks</Link></li>
                <li><Link href="/txs" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">Transactions</Link></li>
                <li><Link href="/tokens" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">Tokens</Link></li>
                <li><Link href="/nfts" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">NFTs</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-lg font-semibold text-yellow-400 mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">About Us</Link></li>
                <li><Link href="/brand" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">Brand Assets</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">Contact Us</Link></li>
                <li><Link href="/careers" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">Careers</Link></li>
                <li><Link href="/terms" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">Terms of Service</Link></li>
                <li><Link href="/bug-bounty" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">Bug Bounty</Link></li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h4 className="text-lg font-semibold text-yellow-400 mb-4">Community</h4>
              <ul className="space-y-2">
                <li><Link href="/api-docs" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">API Documentation</Link></li>
                <li><Link href="/knowledge-base" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">Knowledge Base</Link></li>
                <li><Link href="/status" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">Network Status</Link></li>
                <li><Link href="/newsletter" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm flex items-center">
                  <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
                  Newsletters
                </Link></li>
                <li><Link href="/comments" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">Disqus Comments</Link></li>
              </ul>
            </div>

            {/* Products & Services */}
            <div>
              <h4 className="text-lg font-semibold text-yellow-400 mb-4">Products & Services</h4>
              <ul className="space-y-2">
                <li><Link href="/gas-tracker" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">Gas Tracker</Link></li>
                <li><Link href="/dex-tracker" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">DEX Tracker</Link></li>
                <li><Link href="/node-tracker" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">Node Tracker</Link></li>
                <li><Link href="/label-cloud" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">Label Cloud</Link></li>
                <li><Link href="/unit-converter" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">Unit Converter</Link></li>
                <li><Link href="/csv-export" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">CSV Export</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
              <span className="text-gray-300 text-sm">RIM (RIM) Blockchain Explorer</span>
              <span className="text-gray-400 text-xs">Donations: aur1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</span>
            </div>
            <div className="text-gray-400 text-sm mt-4 md:mt-0">
              © 2025 RIM Blockchain Explorer
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Consent Banner */}
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-gray-800 text-xs">🍪</span>
              </div>
              <span className="text-gray-700 text-sm">
                This website uses cookies to improve your experience. By continuing to use this website, you agree to their use.
                <Link href="/privacy" className="text-blue-600 hover:text-blue-700 ml-1">Privacy Policy</Link>
              </span>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
              Got it!
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}
