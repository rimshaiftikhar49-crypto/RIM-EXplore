'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { BarChart3, TrendingUp, TrendingDown, RefreshCw, ExternalLink } from 'lucide-react'

const DEXTrackerPage = () => {
  const [dexData, setDexData] = useState<Array<{
    name: string
    protocol: string
    volume24h: number
    change24h: number
    tvl: number
    trades24h: number
    pairs: number
    fees24h: number
  }>>([])
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('24h')

  useEffect(() => {
    fetchDEXData()
  }, [timeRange])

  const fetchDEXData = async () => {
    try {
      setLoading(true)
      // TODO: Replace with real DEX data API
      // Mock DEX data
      const dexNames = [
        'Uniswap V3', 'Uniswap V2', 'SushiSwap', 'Curve', 'Balancer',
        '1inch', 'PancakeSwap', 'Kyber Network', 'Bancor', '0x Protocol'
      ]

      const mockData = dexNames.map(name => ({
        name,
        protocol: name.includes('Uniswap') ? 'AMM' : name.includes('Curve') ? 'Stable AMM' : 'DEX Aggregator',
        volume24h: Math.random() * 1000000000 + 10000000,
        change24h: (Math.random() - 0.5) * 30,
        tvl: Math.random() * 5000000000 + 100000000,
        trades24h: Math.floor(Math.random() * 100000) + 1000,
        pairs: Math.floor(Math.random() * 5000) + 100,
        fees24h: Math.random() * 5000000 + 100000
      }))

      // Sort by volume
      mockData.sort((a, b) => b.volume24h - a.volume24h)
      
      setDexData(mockData)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching DEX data:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading DEX data...</p>
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
            <span className="text-yellow-600">DEX Tracker</span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-8 h-8 text-yellow-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">DEX Tracker</h1>
                <p className="text-gray-600">Decentralized exchange analytics and performance metrics</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
              >
                <option value="24h">24 Hours</option>
                <option value="7d">7 Days</option>
                <option value="30d">30 Days</option>
              </select>
              <button
                onClick={fetchDEXData}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center space-x-2 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* DEX Rankings */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">DEX Rankings by Volume</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DEX</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume (24h)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TVL</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trades</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pairs</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fees (24h)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dexData.map((dex, index) => (
                  <tr key={dex.name} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {index < 3 && (
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                            index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-600'
                          }`}>
                            {index + 1}
                          </div>
                        )}
                        <span className="font-medium text-gray-900">#{index + 1}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900">{dex.name}</div>
                        <div className="text-sm text-gray-500">{dex.protocol}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900">${(dex.volume24h / 1000000).toFixed(1)}M</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center space-x-1 text-sm font-medium ${
                        dex.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {dex.change24h >= 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span>{dex.change24h >= 0 ? '+' : ''}{dex.change24h.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">${(dex.tvl / 1000000).toFixed(1)}M</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{dex.trades24h.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{dex.pairs.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">${(dex.fees24h / 1000).toFixed(0)}K</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Market Overview */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">
              ${(dexData.reduce((sum, dex) => sum + dex.volume24h, 0) / 1000000000).toFixed(1)}B
            </div>
            <div className="text-sm text-gray-600">Total Volume (24h)</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">
              ${(dexData.reduce((sum, dex) => sum + dex.tvl, 0) / 1000000000).toFixed(1)}B
            </div>
            <div className="text-sm text-gray-600">Total TVL</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">
              {dexData.reduce((sum, dex) => sum + dex.trades24h, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Trades (24h)</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">
              ${(dexData.reduce((sum, dex) => sum + dex.fees24h, 0) / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-gray-600">Total Fees (24h)</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DEXTrackerPage


