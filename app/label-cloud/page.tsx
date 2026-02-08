'use client'

import React, { useState, useEffect } from 'react'
import { Tag, Search, Filter, TrendingUp, Users, DollarSign } from 'lucide-react'

interface Label {
  name: string
  address: string
  category: string
  count: number
  type: 'contract' | 'exchange' | 'token' | 'wallet' | 'defi' | 'nft'
  description: string
  verified: boolean
  tags: string[]
}

const LabelCloudPage = () => {
  const [labels, setLabels] = useState<Label[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('count')

  useEffect(() => {
    // Mock data for demonstration
    const mockLabels: Label[] = [
      {
        name: 'Uniswap V2',
        address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
        category: 'DeFi',
        count: 15420,
        type: 'defi',
        description: 'Uniswap V2 Router - Decentralized Exchange',
        verified: true,
        tags: ['DEX', 'AMM', 'Router', 'V2']
      },
      {
        name: 'USDC Token',
        address: '0xA0b86a33E6441e9e3DF7d0E7B8a5C123456789abc',
        category: 'Token',
        count: 8930,
        type: 'token',
        description: 'USD Coin - Stablecoin',
        verified: true,
        tags: ['Stablecoin', 'USD', 'ERC20']
      },
      {
        name: 'Binance Hot Wallet',
        address: '0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE',
        category: 'Exchange',
        count: 7620,
        type: 'exchange',
        description: 'Binance Exchange Hot Wallet',
        verified: true,
        tags: ['Exchange', 'Binance', 'Hot Wallet']
      },
      {
        name: 'Vitalik Buterin',
        address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
        category: 'Wallet',
        count: 5430,
        type: 'wallet',
        description: 'Ethereum Founder Personal Wallet',
        verified: true,
        tags: ['Founder', 'Ethereum', 'Personal']
      },
      {
        name: 'OpenSea',
        address: '0x7Be8076f4EA4A4AD08075C2508e481d6C946D12b',
        category: 'NFT',
        count: 4210,
        type: 'nft',
        description: 'OpenSea NFT Marketplace',
        verified: true,
        tags: ['NFT', 'Marketplace', 'OpenSea']
      },
      {
        name: 'Compound Protocol',
        address: '0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B',
        category: 'DeFi',
        count: 3890,
        type: 'defi',
        description: 'Compound Lending Protocol',
        verified: true,
        tags: ['Lending', 'DeFi', 'Compound']
      }
    ]

    setLabels(mockLabels)
    setLoading(false)
  }, [])

  const filteredLabels = labels.filter(label => {
    const matchesSearch = searchQuery === '' || 
      label.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      label.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      label.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      label.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = category === 'all' || label.category.toLowerCase() === category.toLowerCase()
    
    return matchesSearch && matchesCategory
  })

  const sortedLabels = [...filteredLabels].sort((a, b) => {
    switch (sortBy) {
      case 'count':
        return b.count - a.count
      case 'name':
        return a.name.localeCompare(b.name)
      case 'category':
        return a.category.localeCompare(b.category)
      default:
        return b.count - a.count
    }
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'defi': return 'bg-blue-100 text-blue-700'
      case 'token': return 'bg-green-100 text-green-700'
      case 'exchange': return 'bg-purple-100 text-purple-700'
      case 'wallet': return 'bg-orange-100 text-orange-700'
      case 'nft': return 'bg-pink-100 text-pink-700'
      case 'contract': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getCategoryStats = () => {
    const stats = labels.reduce((acc, label) => {
      acc[label.category] = (acc[label.category] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    return stats
  }

  const categoryStats = getCategoryStats()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Label Cloud</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Explore labeled addresses and smart contracts on AUR blockchain
                </p>
              </div>
              <div className="flex items-center space-x-2 text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                <Tag className="w-3 h-3" />
                <span>Verified</span>
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
                  placeholder="Search labels, addresses, or descriptions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                >
                  <option value="all">All Categories</option>
                  <option value="defi">DeFi</option>
                  <option value="token">Token</option>
                  <option value="exchange">Exchange</option>
                  <option value="wallet">Wallet</option>
                  <option value="nft">NFT</option>
                  <option value="contract">Contract</option>
                </select>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="count">Sort by Count</option>
                <option value="name">Sort by Name</option>
                <option value="category">Sort by Category</option>
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
              <div className="text-sm text-gray-600">Total Labels</div>
              <div className="text-2xl font-bold text-gray-900">{labels.length}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Verified</div>
              <div className="text-2xl font-bold text-green-600">
                {labels.filter(l => l.verified).length}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Categories</div>
              <div className="text-2xl font-bold text-gray-900">{Object.keys(categoryStats).length}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Showing</div>
              <div className="text-2xl font-bold text-gray-900">{sortedLabels.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Labels Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedLabels.map((label, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{label.name}</h3>
                      {label.verified && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{label.description}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Category</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(label.type)}`}>
                      {label.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Usage Count</span>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">
                        {label.count.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-2">Address</div>
                    <div className="text-xs font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded break-all">
                      {label.address.slice(0, 10)}...{label.address.slice(-8)}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-2">Tags</div>
                    <div className="flex flex-wrap gap-1">
                      {label.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <a
                      href={`/address/${label.address}`}
                      className="block w-full text-center bg-yellow-600 hover:bg-yellow-700 text-white text-sm py-2 rounded-lg transition-colors"
                    >
                      View Address
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {sortedLabels.length === 0 && !loading && (
          <div className="text-center py-12">
            <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No labels found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            About Label Cloud
          </h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              The Label Cloud provides a comprehensive view of labeled addresses and smart contracts on the AUR blockchain, making it easier to identify and explore different entities.
            </p>
            <p>
              <strong>Features:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Browse labeled addresses by category</li>
              <li>Search by name, address, or description</li>
              <li>View usage statistics and verification status</li>
              <li>Filter by DeFi, Token, Exchange, Wallet, NFT, and Contract types</li>
              <li>Navigate directly to address details</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LabelCloudPage
