'use client'

import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Search, Filter, Clock, Hash, User, ExternalLink } from 'lucide-react'

interface NFTTrade {
  id: string
  collection: string
  name: string
  image: string
  tokenId: string
  seller: string
  buyer: string
  price: string
  priceUSD: string
  change24h: number
  transactionHash: string
  timestamp: number
  timeAgo: string
  marketplace: string
  verified: boolean
}

const LatestTradesPage = () => {
  const [trades, setTrades] = useState<NFTTrade[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('timestamp')

  useEffect(() => {
    // Mock data for demonstration
    const mockTrades: NFTTrade[] = [
      {
        id: '1',
        collection: 'Aurum Punks',
        name: 'Aurum Punk #1234',
        image: '/api/placeholder/64/64',
        tokenId: '1234',
        seller: '0x742d35Cc6634C0532925a3b8D82A5eB6fD7D4e7a',
        buyer: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
        price: '2.5',
        priceUSD: '5,250.00',
        change24h: 12.5,
        transactionHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890',
        timestamp: Date.now() - 300000,
        timeAgo: '5 mins ago',
        marketplace: 'OpenSea',
        verified: true
      },
      {
        id: '2',
        collection: 'AUR Apes',
        name: 'AUR Ape #5678',
        image: '/api/placeholder/64/64',
        tokenId: '5678',
        seller: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
        buyer: '0xA0b86a33E6441e9e3DF7d0E7B8a5C123456789abc',
        price: '1.8',
        priceUSD: '3,780.00',
        change24h: -5.2,
        transactionHash: '0x2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890ab',
        timestamp: Date.now() - 600000,
        timeAgo: '10 mins ago',
        marketplace: 'LooksRare',
        verified: true
      },
      {
        id: '3',
        collection: 'Aurum Cats',
        name: 'Aurum Cat #9012',
        image: '/api/placeholder/64/64',
        tokenId: '9012',
        seller: '0xA0b86a33E6441e9e3DF7d0E7B8a5C123456789abc',
        buyer: '0x742d35Cc6634C0532925a3b8D82A5eB6fD7D4e7a',
        price: '0.75',
        priceUSD: '1,575.00',
        change24h: 8.3,
        transactionHash: '0x3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcd',
        timestamp: Date.now() - 900000,
        timeAgo: '15 mins ago',
        marketplace: 'X2Y2',
        verified: false
      }
    ]

    setTrades(mockTrades)
    setLoading(false)
  }, [])

  const filteredTrades = trades.filter(trade => {
    const matchesSearch = searchQuery === '' || 
      trade.collection.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trade.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trade.tokenId.includes(searchQuery)
    
    const matchesFilter = filter === 'all' || 
      (filter === 'verified' && trade.verified) ||
      (filter === 'high-value' && parseFloat(trade.price) > 2) ||
      (filter === 'trending' && trade.change24h > 0)
    
    return matchesSearch && matchesFilter
  })

  const sortedTrades = [...filteredTrades].sort((a, b) => {
    switch (sortBy) {
      case 'timestamp':
        return b.timestamp - a.timestamp
      case 'price':
        return parseFloat(b.price) - parseFloat(a.price)
      case 'change':
        return b.change24h - a.change24h
      default:
        return b.timestamp - a.timestamp
    }
  })

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Latest NFT Trades</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Real-time NFT trading activity on AUR blockchain
                </p>
              </div>
              <div className="flex items-center space-x-2 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                <span>Live</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by collection, name, or token ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="all">All Trades</option>
                <option value="verified">Verified Collections</option>
                <option value="high-value">High Value (&gt;2 AUR)</option>
                <option value="trending">Trending Up</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="timestamp">Sort by Time</option>
                <option value="price">Sort by Price</option>
                <option value="change">Sort by Change</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Total Trades</div>
              <div className="text-2xl font-bold text-gray-900">{trades.length}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Volume (24h)</div>
              <div className="text-2xl font-bold text-gray-900">12.5 AUR</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Avg Price</div>
              <div className="text-2xl font-bold text-gray-900">1.68 AUR</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Collections</div>
              <div className="text-2xl font-bold text-gray-900">3</div>
            </div>
          </div>
        </div>
      </div>

      {/* Trades List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedTrades.map((trade) => (
              <div key={trade.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* NFT Image */}
                    <div className="relative">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-gray-500">NFT</span>
                      </div>
                      {trade.verified && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white">✓</span>
                        </div>
                      )}
                    </div>

                    {/* NFT Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{trade.name}</h3>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {trade.marketplace}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{trade.collection}</p>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-600">From:</span>
                          <a
                            href={`/address/${trade.seller}`}
                            className="text-blue-600 hover:text-blue-800 hover:underline font-mono"
                          >
                            {formatAddress(trade.seller)}
                          </a>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-600">To:</span>
                          <a
                            href={`/address/${trade.buyer}`}
                            className="text-blue-600 hover:text-blue-800 hover:underline font-mono"
                          >
                            {formatAddress(trade.buyer)}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Price Info */}
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xl font-bold text-gray-900">{trade.price} AUR</span>
                        {trade.change24h > 0 ? (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                      <div className="text-sm text-gray-600 mb-1">${trade.priceUSD}</div>
                      <div className={`text-sm font-medium ${
                        trade.change24h > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {trade.change24h > 0 ? '+' : ''}{trade.change24h.toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <div className="text-right text-sm text-gray-500 mr-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{trade.timeAgo}</span>
                      </div>
                    </div>
                    <a
                      href={`/tx/${trade.transactionHash}`}
                      className="flex items-center space-x-1 text-yellow-600 hover:text-yellow-700"
                    >
                      <Hash className="w-4 h-4" />
                      <span>View TX</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
            
            {sortedTrades.length === 0 && !loading && (
              <div className="text-center py-12">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No trades found</h3>
                <p className="text-gray-600">Try adjusting your search terms or filters</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            About Latest Trades
          </h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              Track real-time NFT trading activity across all major marketplaces on the AUR blockchain.
            </p>
            <p>
              <strong>Features:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Real-time trade monitoring</li>
              <li>Price tracking and 24h changes</li>
              <li>Collection and marketplace filtering</li>
              <li>Verified collection indicators</li>
              <li>Direct links to transactions and addresses</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LatestTradesPage
