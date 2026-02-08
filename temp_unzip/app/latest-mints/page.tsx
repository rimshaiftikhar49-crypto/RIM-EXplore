'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Sparkles, Image as ImageIcon, RefreshCw, Filter, TrendingUp } from 'lucide-react'

interface NFTMint {
  txHash: string
  collection: string
  collectionName: string
  tokenId: string
  minter: string
  recipient: string
  mintPrice: number
  gasUsed: string
  timestamp: string
  timeAgo: string
  verified: boolean
  blockNumber: number
  marketplace?: string
}

const LatestMintsPage = () => {
  const [mints, setMints] = useState<NFTMint[]>([])
  const [loading, setLoading] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [priceFilter, setPriceFilter] = useState('all')

  useEffect(() => {
    fetchLatestMints()
    let interval: NodeJS.Timeout | undefined
    
    if (autoRefresh) {
      interval = setInterval(fetchLatestMints, 12000) // Refresh every 12 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [autoRefresh])

  const fetchLatestMints = async () => {
    try {
      setLoading(true)
      // TODO: Replace with real NFT mints API
      // Mock NFT mints data
      const collections = [
        'Bored Ape Yacht Club', 'CryptoPunks', 'Azuki', 'CloneX', 'Moonbirds',
        'Doodles', 'Art Blocks', 'World of Women', 'Cool Cats', 'Pudgy Penguins',
        'Otherdeeds', 'Meebits', 'VeeFriends', 'Chromie Squiggle', 'The Sandbox'
      ]
      
      const marketplaces = ['OpenSea', 'Foundation', 'SuperRare', 'AsyncArt', 'KnownOrigin']

      const mockMints = Array.from({ length: 75 }, (_, i) => {
        const mintPrice = Math.random() * 10 + 0.01
        const timestamp = Date.now() - (i * 45000) // 45 seconds apart
        
        return {
          txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
          collection: `0x${Math.random().toString(16).substr(2, 40)}`,
          collectionName: collections[Math.floor(Math.random() * collections.length)],
          tokenId: (Math.floor(Math.random() * 10000) + 1).toString(),
          minter: `0x${Math.random().toString(16).substr(2, 40)}`,
          recipient: `0x${Math.random().toString(16).substr(2, 40)}`,
          mintPrice,
          gasUsed: (Math.random() * 300000 + 100000).toFixed(0),
          timestamp: new Date(timestamp).toLocaleString(),
          timeAgo: getTimeAgo(timestamp),
          verified: Math.random() > 0.15,
          blockNumber: 23394849 - Math.floor(i / 8),
          marketplace: Math.random() > 0.3 ? marketplaces[Math.floor(Math.random() * marketplaces.length)] : undefined
        }
      })

      // Sort by timestamp (newest first)
      mockMints.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      
      setMints(mockMints)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching latest mints:', error)
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

  const filteredMints = () => {
    switch (priceFilter) {
      case 'free': return mints.filter(m => m.mintPrice === 0)
      case 'paid': return mints.filter(m => m.mintPrice > 0)
      case 'high': return mints.filter(m => m.mintPrice > 1)
      default: return mints
    }
  }

  const currentMints = filteredMints()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading latest mints...</p>
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
            <span className="text-yellow-600">Latest Mints</span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-8 h-8 text-yellow-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Latest NFT Mints</h1>
                <p className="text-gray-600">Newest NFTs minted on the AUR network</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                >
                  <option value="all">All Mints</option>
                  <option value="free">Free Mints</option>
                  <option value="paid">Paid Mints</option>
                  <option value="high">High Value (&gt;1 ETH)</option>
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
                onClick={fetchLatestMints}
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
                <div className="text-2xl font-bold text-gray-900">{currentMints.length}</div>
                <div className="text-sm text-gray-600">Total Mints</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <div className="text-green-600 font-bold text-sm">💰</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {currentMints.filter(m => m.mintPrice > 0).length}
                </div>
                <div className="text-sm text-gray-600">Paid Mints</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="text-blue-600 font-bold text-sm">🆓</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {currentMints.filter(m => m.mintPrice === 0).length}
                </div>
                <div className="text-sm text-gray-600">Free Mints</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {currentMints.length > 0 ? (currentMints.reduce((sum, m) => sum + m.mintPrice, 0) / currentMints.filter(m => m.mintPrice > 0).length).toFixed(3) : '0'}
                </div>
                <div className="text-sm text-gray-600">Avg Mint Price (ETH)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Mints Table */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Latest NFT Mints</h2>
            <div className="text-sm text-gray-600">
              Showing {currentMints.length} mints
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NFT</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collection</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Minter</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mint Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gas Used</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marketplace</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentMints.map((mint, index) => (
                  <tr key={mint.txHash} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                          <ImageIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <Link href={`/nft/${mint.collection}/${mint.tokenId}`} className="font-medium text-blue-600 hover:text-blue-800">
                            #{mint.tokenId}
                          </Link>
                          <div className="text-xs text-gray-500">
                            {mint.mintPrice === 0 ? (
                              <span className="text-green-600 font-medium">Free Mint</span>
                            ) : (
                              <span className="text-purple-600 font-medium">Paid Mint</span>
                            )}
                          </div>
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
                      <Link href={`/address/${mint.recipient}`} className="text-blue-600 hover:text-blue-800 font-mono text-sm">
                        {mint.recipient.slice(0, 6)}...{mint.recipient.slice(-4)}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {mint.mintPrice === 0 ? (
                        <div className="text-green-600 font-medium">Free</div>
                      ) : (
                        <div>
                          <div className="font-medium text-gray-900">{mint.mintPrice.toFixed(3)} ETH</div>
                          <div className="text-sm text-gray-500">${(mint.mintPrice * 4554.69).toFixed(0)}</div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {parseInt(mint.gasUsed).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {mint.marketplace ? (
                        <span className="text-sm text-gray-900">{mint.marketplace}</span>
                      ) : (
                        <span className="text-sm text-gray-500">Direct</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <Link href={`/tx/${mint.txHash}`} className="text-blue-600 hover:text-blue-800 text-sm">
                          {mint.timeAgo}
                        </Link>
                        <div className="text-xs text-gray-500">
                          Block {mint.blockNumber.toLocaleString()}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mint Statistics */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Popular Collections */}
          <div className="bg-white rounded-lg shadow border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Most Active Collections</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {Array.from(new Set(mints.map(m => m.collectionName))).slice(0, 5).map((collection) => {
                  const collectionMints = mints.filter(m => m.collectionName === collection)
                  const totalValue = collectionMints.reduce((sum, mint) => sum + mint.mintPrice, 0)
                  
                  return (
                    <div key={collection} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                          <ImageIcon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{collection}</div>
                          <div className="text-sm text-gray-500">{collectionMints.length} mints</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-yellow-600">{totalValue.toFixed(2)} ETH</div>
                        <div className="text-sm text-gray-500">${(totalValue * 4554.69).toFixed(0)}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Mint Type Distribution */}
          <div className="bg-white rounded-lg shadow border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Mint Distribution</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">🆓</div>
                    <div>
                      <div className="font-medium text-gray-900">Free Mints</div>
                      <div className="text-sm text-gray-600">No cost to mint</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    {mints.filter(m => m.mintPrice === 0).length}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">💰</div>
                    <div>
                      <div className="font-medium text-gray-900">Paid Mints</div>
                      <div className="text-sm text-gray-600">Requires payment</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">
                    {mints.filter(m => m.mintPrice > 0).length}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">🔥</div>
                    <div>
                      <div className="font-medium text-gray-900">High Value</div>
                      <div className="text-sm text-gray-600">&gt;1 ETH mint price</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-yellow-600">
                    {mints.filter(m => m.mintPrice > 1).length}
                  </div>
                </div>
              </div>
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
              <strong>Free mints</strong> don't require payment beyond gas fees, while <strong>paid mints</strong> require additional payment to the collection creator.
            </p>
            <p>
              Minting can happen directly through collection contracts or via NFT marketplaces and launchpads.
            </p>
            <p>
              Gas costs vary based on contract complexity and network congestion at the time of minting.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LatestMintsPage


