'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Trophy, Medal, Award, TrendingUp, Users, Zap, Target } from 'lucide-react'

const LeaderboardPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('transactions')
  const [timeRange, setTimeRange] = useState('7d')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeaderboardData()
  }, [selectedCategory, timeRange])

  const fetchLeaderboardData = async () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => setLoading(false), 1000)
  }

  const categories = [
    { id: 'transactions', name: 'Top Transactors', icon: TrendingUp, description: 'Most active transaction senders' },
    { id: 'gas', name: 'Gas Spenders', icon: Zap, description: 'Highest gas fee spenders' },
    { id: 'validators', name: 'Top Validators', icon: Award, description: 'Most successful validators' },
    { id: 'developers', name: 'Developers', icon: Target, description: 'Most active smart contract deployers' },
    { id: 'holders', name: 'Token Holders', icon: Users, description: 'Largest token holders' }
  ]

  const timeRanges = [
    { id: '24h', name: '24 Hours' },
    { id: '7d', name: '7 Days' },
    { id: '30d', name: '30 Days' },
    { id: 'all', name: 'All Time' }
  ]

  // Mock leaderboard data
  const generateLeaderboardData = () => {
    const addresses = [
      'Binance: Hot Wallet', 'Coinbase: Custody', 'Kraken: Exchange', 'Uniswap V3: Router',
      'OpenSea: Marketplace', 'MetaMask: Swap Router', 'Compound: Protocol', 'Aave: Lending Pool',
      'SushiSwap: Router', 'Curve: Pool', '1inch: Aggregator', 'Tornado: Cash', 'Gitcoin: Grants',
      'ENS: Registrar', 'Chainlink: Oracle', 'MakerDAO: Vault', 'Yearn: Vault', 'Synthetix: Exchange',
      'Balancer: Pool', 'dYdX: Exchange'
    ]

    return Array.from({ length: 20 }, (_, i) => {
      const value = Math.floor(Math.random() * 1000000) + 10000
      const change = (Math.random() - 0.5) * 20
      
      return {
        rank: i + 1,
        address: `0x${Math.random().toString(16).substr(2, 40)}`,
        label: addresses[i] || `Unknown ${i + 1}`,
        value,
        change,
        percentage: Math.random() * 5 + 0.1
      }
    })
  }

  const leaderboardData = generateLeaderboardData()

  const getValueLabel = () => {
    switch (selectedCategory) {
      case 'transactions': return 'Transactions'
      case 'gas': return 'Gas Spent (AUR)'
      case 'validators': return 'Blocks Validated'
      case 'developers': return 'Contracts Deployed'
      case 'holders': return 'Token Balance'
      default: return 'Value'
    }
  }

  const formatValue = (value: number) => {
    switch (selectedCategory) {
      case 'transactions': return value.toLocaleString()
      case 'gas': return `${(value / 1000).toFixed(2)}K AUR`
      case 'validators': return value.toLocaleString()
      case 'developers': return value.toLocaleString()
      case 'holders': return `${(value / 1000).toFixed(1)}K tokens`
      default: return value.toLocaleString()
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-6 h-6 text-yellow-500" />
      case 2: return <Medal className="w-6 h-6 text-gray-400" />
      case 3: return <Award className="w-6 h-6 text-amber-600" />
      default: return <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">#{rank}</div>
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading leaderboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-yellow-600">Home</Link>
            <span>/</span>
            <span className="text-yellow-600">Leaderboard</span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Trophy className="w-8 h-8 text-yellow-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AUR Network Leaderboard</h1>
              <p className="text-gray-600">Top performers and most active participants</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Category Selection */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const IconComponent = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-yellow-100 border-yellow-300 text-yellow-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="text-sm font-medium">{category.name}</span>
                  </button>
                )
              })}
            </div>

            {/* Time Range */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Time Range:</span>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
              >
                {timeRanges.map(range => (
                  <option key={range.id} value={range.id}>{range.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {categories.find(c => c.id === selectedCategory)?.name} - {timeRanges.find(r => r.id === timeRange)?.name}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {categories.find(c => c.id === selectedCategory)?.description}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{getValueLabel()}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Share</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leaderboardData.map((entry) => (
                  <tr key={entry.rank} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        {getRankIcon(entry.rank)}
                        <span className="font-medium text-gray-900">#{entry.rank}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900">{entry.label}</div>
                        <Link 
                          href={`/address/${entry.address}`}
                          className="text-sm text-blue-600 hover:text-blue-800 font-mono"
                        >
                          {entry.address.slice(0, 8)}...{entry.address.slice(-6)}
                        </Link>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{formatValue(entry.value)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{entry.percentage.toFixed(2)}%</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center space-x-1 text-sm font-medium ${
                        entry.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <span>{entry.change >= 0 ? '+' : ''}{entry.change.toFixed(1)}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-medium text-blue-900 mb-3">🏆 About the Leaderboard</h3>
          <div className="text-sm text-blue-800 space-y-2">
            <p>
              The leaderboard tracks the most active participants across different categories on the AUR network.
            </p>
            <p>
              Rankings are updated in real-time and show both current standings and recent changes in activity.
            </p>
            <p>
              Use the category and time range filters to explore different aspects of network activity.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeaderboardPage


