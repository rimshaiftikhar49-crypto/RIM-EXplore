'use client'

import React, { useState, useEffect } from 'react'
import { ArrowRight, Search, Filter, Clock, Hash, User, ExternalLink, Eye } from 'lucide-react'

interface NFTTransfer {
  id: string
  collection: string
  name: string
  image: string
  tokenId: string
  from: string
  to: string
  transactionHash: string
  timestamp: number
  timeAgo: string
  blockNumber: number
  verified: boolean
  transferType: 'sale' | 'transfer' | 'mint' | 'burn'
  value?: string
  valueUSD?: string
}

const LatestTransfersPage = () => {
  const [transfers, setTransfers] = useState<NFTTransfer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    // Mock data for demonstration
    const mockTransfers: NFTTransfer[] = [
      {
        id: '1',
        collection: 'Aurum Punks',
        name: 'Aurum Punk #1234',
        image: '/api/placeholder/64/64',
        tokenId: '1234',
        from: '0x742d35Cc6634C0532925a3b8D82A5eB6fD7D4e7a',
        to: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
        transactionHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890',
        timestamp: Date.now() - 300000,
        timeAgo: '5 mins ago',
        blockNumber: 18945678,
        verified: true,
        transferType: 'sale',
        value: '2.5',
        valueUSD: '5,250.00'
      },
      {
        id: '2',
        collection: 'AUR Apes',
        name: 'AUR Ape #5678',
        image: '/api/placeholder/64/64',
        tokenId: '5678',
        from: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
        to: '0xA0b86a33E6441e9e3DF7d0E7B8a5C123456789abc',
        transactionHash: '0x2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890ab',
        timestamp: Date.now() - 600000,
        timeAgo: '10 mins ago',
        blockNumber: 18945679,
        verified: true,
        transferType: 'transfer'
      },
      {
        id: '3',
        collection: 'Aurum Cats',
        name: 'Aurum Cat #9012',
        image: '/api/placeholder/64/64',
        tokenId: '9012',
        from: '0x0000000000000000000000000000000000000000',
        to: '0x742d35Cc6634C0532925a3b8D82A5eB6fD7D4e7a',
        transactionHash: '0x3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcd',
        timestamp: Date.now() - 900000,
        timeAgo: '15 mins ago',
        blockNumber: 18945680,
        verified: false,
        transferType: 'mint'
      },
      {
        id: '4',
        collection: 'Aurum Dogs',
        name: 'Aurum Dog #3456',
        image: '/api/placeholder/64/64',
        tokenId: '3456',
        from: '0xA0b86a33E6441e9e3DF7d0E7B8a5C123456789abc',
        to: '0x0000000000000000000000000000000000000000',
        transactionHash: '0x4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        timestamp: Date.now() - 1200000,
        timeAgo: '20 mins ago',
        blockNumber: 18945681,
        verified: true,
        transferType: 'burn'
      }
    ]

    setTransfers(mockTransfers)
    setLoading(false)
  }, [])

  const filteredTransfers = transfers.filter(transfer => {
    const matchesSearch = searchQuery === '' || 
      transfer.collection.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transfer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transfer.tokenId.includes(searchQuery) ||
      transfer.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transfer.to.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = filter === 'all' || transfer.transferType === filter
    
    return matchesSearch && matchesFilter
  })

  const formatAddress = (address: string) => {
    if (address === '0x0000000000000000000000000000000000000000') {
      return 'Null Address'
    }
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getTransferTypeColor = (type: string) => {
    switch (type) {
      case 'sale': return 'bg-green-100 text-green-700'
      case 'transfer': return 'bg-blue-100 text-blue-700'
      case 'mint': return 'bg-purple-100 text-purple-700'
      case 'burn': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTransferTypeIcon = (type: string) => {
    switch (type) {
      case 'sale': return '💰'
      case 'transfer': return '↔️'
      case 'mint': return '✨'
      case 'burn': return '🔥'
      default: return '↔️'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Latest NFT Transfers</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Track NFT movement across the AUR blockchain
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-pink-600 font-medium">Live</span>
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
                  placeholder="Search by collection, name, token ID, or address..."
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
                <option value="all">All Transfers</option>
                <option value="sale">Sales</option>
                <option value="transfer">Transfers</option>
                <option value="mint">Mints</option>
                <option value="burn">Burns</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Total Transfers</div>
              <div className="text-2xl font-bold text-gray-900">{transfers.length}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Sales</div>
              <div className="text-2xl font-bold text-green-600">
                {transfers.filter(t => t.transferType === 'sale').length}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Mints</div>
              <div className="text-2xl font-bold text-purple-600">
                {transfers.filter(t => t.transferType === 'mint').length}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Burns</div>
              <div className="text-2xl font-bold text-red-600">
                {transfers.filter(t => t.transferType === 'burn').length}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Collections</div>
              <div className="text-2xl font-bold text-gray-900">4</div>
            </div>
          </div>
        </div>
      </div>

      {/* Transfers List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTransfers.map((transfer) => (
              <div key={transfer.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* NFT Image */}
                    <div className="relative">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-gray-500">NFT</span>
                      </div>
                      {transfer.verified && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white">✓</span>
                        </div>
                      )}
                    </div>

                    {/* Transfer Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{transfer.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTransferTypeColor(transfer.transferType)}`}>
                          {getTransferTypeIcon(transfer.transferType)} {transfer.transferType}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{transfer.collection}</p>
                      
                      {/* Transfer Flow */}
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">From:</span>
                          <a
                            href={`/address/${transfer.from}`}
                            className="text-xs text-blue-600 hover:text-blue-800 hover:underline font-mono"
                          >
                            {formatAddress(transfer.from)}
                          </a>
                        </div>
                        
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">To:</span>
                          <a
                            href={`/address/${transfer.to}`}
                            className="text-xs text-blue-600 hover:text-blue-800 hover:underline font-mono"
                          >
                            {formatAddress(transfer.to)}
                          </a>
                        </div>
                      </div>

                      {/* Value (for sales) */}
                      {transfer.value && (
                        <div className="mt-2 text-sm">
                          <span className="text-gray-600">Value: </span>
                          <span className="font-medium text-gray-900">{transfer.value} AUR</span>
                          <span className="text-gray-500 ml-1">(${transfer.valueUSD})</span>
                        </div>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="text-right text-sm text-gray-500">
                      <div className="flex items-center space-x-1 mb-1">
                        <Clock className="w-3 h-3" />
                        <span>{transfer.timeAgo}</span>
                      </div>
                      <div className="flex items-center space-x-1 mb-1">
                        <Hash className="w-3 h-3" />
                        <span>Block {transfer.blockNumber.toLocaleString()}</span>
                      </div>
                      <a
                        href={`/tx/${transfer.transactionHash}`}
                        className="flex items-center space-x-1 text-yellow-600 hover:text-yellow-700"
                      >
                        <Eye className="w-3 h-3" />
                        <span>View TX</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredTransfers.length === 0 && !loading && (
              <div className="text-center py-12">
                <ArrowRight className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No transfers found</h3>
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
            About Latest Transfers
          </h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              Monitor all NFT transfers across the AUR blockchain, including sales, mints, burns, and regular transfers.
            </p>
            <p>
              <strong>Transfer Types:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><strong>Sales:</strong> NFTs sold on marketplaces</li>
              <li><strong>Transfers:</strong> Direct transfers between addresses</li>
              <li><strong>Mints:</strong> New NFTs created/minted</li>
              <li><strong>Burns:</strong> NFTs destroyed/permanently removed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LatestTransfersPage
