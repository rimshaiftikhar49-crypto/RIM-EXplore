'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Sparkles, TrendingUp, Users, Image as ImageIcon, RefreshCw } from 'lucide-react'

interface NFTMint {
  collection: string
  collectionName: string
  tokenId: string
  minter: string
  timestamp: string
  mintPrice: number
  gasUsed: string
  txHash: string
  timeAgo: string
  verified: boolean
}

const TopMintsPage = () => {
  const [mints, setMints] = useState<NFTMint[]>([])
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('24h')
  const [autoRefresh, setAutoRefresh] = useState(true)

  useEffect(() => {
    fetchTopMints()
    let interval: NodeJS.Timeout | undefined
    
    if (autoRefresh) {
      interval = setInterval(fetchTopMints, 15000) // Refresh every 15 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timeRange, autoRefresh])

  const fetchTopMints = async () => {
    try {
      setLoading(true)
      // TODO: Replace with real NFT mints API
      // Mock NFT mints data
      const collections = [
        'Bored Ape Yacht Club', 'CryptoPunks', 'Azuki', 'CloneX', 'Moonbirds',
        'Doodles', 'Art Blocks', 'World of Women', 'Cool Cats', 'Pudgy Penguins'
      ]

      const mockMints = Array.from({ length: 50 }, (_, i) => {
        const mintPrice = Math.random() * 5 + 0.1
        const timestamp = Date.now() - (i * 60000) // 1 minute apart
        
        return {
          collection: `0x${Math.random().toString(16).substr(2, 40)}`,
          collectionName: collections[Math.floor(Math.random() * collections.length)],
          tokenId: (Math.floor(Math.random() * 10000) + 1).toString(),
          minter: `0x${Math.random().toString(16).substr(2, 40)}`,
          timestamp: new Date(timestamp).toLocaleString(),
          mintPrice,
          gasUsed: (Math.random() * 200000 + 50000).toFixed(0),
          txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
          timeAgo: getTimeAgo(timestamp),
          verified: Math.random() > 0.2
        }
      })

      // Sort by mint price (highest first)
      mockMints.sort((a, b) => b.mintPrice - a.mintPrice)
      
      setMints(mockMints)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching top mints:', error)
      setLoading(false)
    }
  }

  const getTimeAgo = (timestamp: number): string => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000)
    if (seconds < 60) return `${seconds} secs ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes} min ago`
    const hours = Math.floor(minutes / 60)
    return `${hours} hrs ago`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading top mints...</p>
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
            <Link href="/nfts" className="hover:text-yellow-600">NFTs</Link>
            <span>/</span>
            <span className="text-yellow-600">Top Mints</span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-8 h-8 text-yellow-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Top NFT Mints</h1>
                <p className="text-gray-600">Highest value NFT mints on AUR network</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Time Range:</label>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                >
                  <option value="1h">1 Hour</option>
                  <option value="24h">24 Hours</option>
                  <option value="7d">7 Days</option>
                  <option value="30d">30 Days</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="autoRefresh"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                />
                <label htmlFor="autoRefresh" className="text-sm text-gray-700">Auto-refresh</label>
              </div>
              <button
                onClick={fetchTopMints}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center space-x-2 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{mints.length}</div>
                <div className="text-sm text-gray-600">Total Mints ({timeRange})</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <div className="text-green-600 font-bold text-sm">Ⓔ</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {mints.reduce((sum, mint) => sum + mint.mintPrice, 0).toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">Total Value (ETH)</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {mints.length > 0 ? Math.max(...mints.map(m => m.mintPrice)).toFixed(2) : '0'}
                </div>
                <div className="text-sm text-gray-600">Highest Mint (ETH)</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {new Set(mints.map(m => m.collection)).size}
                </div>
                <div className="text-sm text-gray-600">Active Collections</div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Mints Table */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Highest Value Mints</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NFT</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collection</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Minter</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mint Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gas Used</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mints.map((mint, index) => (
                  <tr key={mint.txHash} className="hover:bg-gray-50">
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
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                          <ImageIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <Link href={`/nft/${mint.collection}/${mint.tokenId}`} className="font-medium text-blue-600 hover:text-blue-800">
                            #{mint.tokenId}
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Link href={`/nft/${mint.collection}`} className="font-medium text-gray-900 hover:text-yellow-600">
                          {mint.collectionName}
                        </Link>
                        {mint.verified && (
                          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 font-mono">
                        {mint.collection.slice(0, 6)}...{mint.collection.slice(-4)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link href={`/address/${mint.minter}`} className="text-blue-600 hover:text-blue-800 font-mono text-sm">
                        {mint.minter.slice(0, 6)}...{mint.minter.slice(-4)}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900">{mint.mintPrice.toFixed(3)} ETH</div>
                        <div className="text-sm text-gray-500">${(mint.mintPrice * 4554.69).toFixed(0)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {parseInt(mint.gasUsed).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <Link href={`/tx/${mint.txHash}`} className="text-blue-600 hover:text-blue-800 text-sm">
                          {mint.timeAgo}
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Collection Stats */}
        <div className="mt-8 bg-white rounded-lg shadow border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Top Minting Collections</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from(new Set(mints.map(m => m.collectionName))).slice(0, 6).map((collection, index) => {
                const collectionMints = mints.filter(m => m.collectionName === collection)
                const totalValue = collectionMints.reduce((sum, mint) => sum + mint.mintPrice, 0)
                
                return (
                  <div key={collection} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{collection}</div>
                        <div className="text-sm text-gray-500">{collectionMints.length} mints</div>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-yellow-600">
                      {totalValue.toFixed(2)} ETH
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h3 className="font-medium text-purple-900 mb-3">✨ About NFT Mints</h3>
          <div className="text-sm text-purple-800 space-y-2">
            <p>
              <strong>NFT mints</strong> represent the creation of new non-fungible tokens on the AUR blockchain.
            </p>
            <p>
              <strong>Mint price</strong> is the amount paid to create the NFT, which may include both the base price and gas fees.
            </p>
            <p>
              Rankings are based on the total value paid for minting, helping identify the most valuable new NFT creations.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopMintsPage


