'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { TrendingUp, TrendingDown, ExternalLink, Image as ImageIcon, Search } from 'lucide-react'

interface NFTCollection {
  address: string
  name: string
  symbol: string
  floorPrice: number
  volume24h: number
  change24h: number
  owners: number
  totalSupply: number
  sales24h: number
  avgPrice24h: number
  verified: boolean
}

const NFTsPage = () => {
  const [collections, setCollections] = useState<NFTCollection[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('volume24h')
  const collectionsPerPage = 25

  useEffect(() => {
    fetchNFTCollections()
  }, [currentPage, sortBy])

  const fetchNFTCollections = async () => {
    try {
      setLoading(true)
      // TODO: Replace with real NFT API
      // Mock NFT collections data
      const collectionNames = [
        'Bored Ape Yacht Club', 'CryptoPunks', 'Mutant Ape Yacht Club', 'Azuki', 'CloneX',
        'Moonbirds', 'Doodles', 'Art Blocks Curated', 'World of Women', 'Cool Cats NFT',
        'Pudgy Penguins', 'VeeFriends', 'Chromie Squiggle', 'Meebits', 'CyberKongz',
        'The Sandbox', 'Decentraland', 'Otherdeeds', 'MAYC', 'Fidenza'
      ]

      const mockCollections = Array.from({ length: 100 }, (_, i) => {
        const floorPrice = Math.random() * 50 + 0.1
        const volume24h = Math.random() * 10000 + 100
        const change24h = (Math.random() - 0.5) * 50
        const owners = Math.floor(Math.random() * 10000) + 500
        const totalSupply = Math.floor(Math.random() * 10000) + 1000
        const sales24h = Math.floor(Math.random() * 200) + 1
        
        return {
          address: `0x${Math.random().toString(16).substr(2, 40)}`,
          name: collectionNames[i % collectionNames.length] + (i > 19 ? ` ${Math.floor(i/20)}` : ''),
          symbol: `NFT${i + 1}`,
          floorPrice,
          volume24h,
          change24h,
          owners,
          totalSupply,
          sales24h,
          avgPrice24h: volume24h / sales24h,
          verified: Math.random() > 0.3
        }
      })

      // Sort collections
      mockCollections.sort((a, b) => {
        const aVal = a[sortBy as keyof NFTCollection] as number
        const bVal = b[sortBy as keyof NFTCollection] as number
        return bVal - aVal
      })

      const offset = (currentPage - 1) * collectionsPerPage
      setCollections(mockCollections.slice(offset, offset + collectionsPerPage))
      setLoading(false)
    } catch (error) {
      console.error('Error fetching NFT collections:', error)
      setLoading(false)
    }
  }

  const filteredCollections = collections.filter(collection =>
    collection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collection.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading NFT collections...</p>
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
            <span className="text-yellow-600">Top NFTs</span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <ImageIcon className="w-8 h-8 text-yellow-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Top NFT Collections</h1>
              <p className="text-gray-600">Most popular NFT collections on AUR blockchain</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search NFT collections..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                >
                  <option value="volume24h">Volume (24h)</option>
                  <option value="floorPrice">Floor Price</option>
                  <option value="owners">Owners</option>
                  <option value="sales24h">Sales (24h)</option>
                </select>
              </div>
              <div className="text-sm text-gray-600">
                Showing {filteredCollections.length} collections
              </div>
            </div>
          </div>
        </div>

        {/* NFT Collections Table */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">NFT Collections</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collection</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Floor Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume (24h)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change (24h)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owners</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supply</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales (24h)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCollections.map((collection, index) => (
                  <tr key={collection.address} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {(currentPage - 1) * collectionsPerPage + index + 1}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <ImageIcon className="w-5 h-5 text-white" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center space-x-2">
                            <Link 
                              href={`/nft/${collection.address}`}
                              className="font-medium text-gray-900 hover:text-yellow-600 truncate"
                            >
                              {collection.name}
                            </Link>
                            {collection.verified && (
                              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            <Link 
                              href={`/address/${collection.address}`}
                              className="text-yellow-600 hover:text-yellow-700 font-mono"
                            >
                              {collection.address.slice(0, 6)}...{collection.address.slice(-4)}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {collection.floorPrice.toFixed(3)} AUR
                      </div>
                      <div className="text-sm text-gray-500">
                        ${(collection.floorPrice * 4554.69).toFixed(0)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {collection.volume24h.toFixed(1)} AUR
                      </div>
                      <div className="text-sm text-gray-500">
                        ${(collection.volume24h * 4554.69).toFixed(0)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center space-x-1 font-medium ${
                        collection.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {collection.change24h >= 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span>{collection.change24h >= 0 ? '+' : ''}{collection.change24h.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {collection.owners.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {((collection.owners / collection.totalSupply) * 100).toFixed(1)}% unique
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {collection.totalSupply.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {collection.sales24h}
                      </div>
                      <div className="text-sm text-gray-500">
                        Avg: {collection.avgPrice24h.toFixed(2)} AUR
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {(currentPage - 1) * collectionsPerPage + 1}-{Math.min(currentPage * collectionsPerPage, 100)} of 100 collections
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {Math.ceil(100 / collectionsPerPage)}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(Math.ceil(100 / collectionsPerPage), currentPage + 1))}
                disabled={currentPage === Math.ceil(100 / collectionsPerPage)}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Market Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {collections.reduce((sum, c) => sum + c.volume24h, 0).toFixed(0)}
                </div>
                <div className="text-sm text-gray-600">Total Volume (24h)</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {collections.reduce((sum, c) => sum + c.sales24h, 0)}
                </div>
                <div className="text-sm text-gray-600">Sales (24h)</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="text-blue-600 font-bold text-sm">Ⓐ</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {(collections.reduce((sum, c) => sum + c.floorPrice, 0) / collections.length).toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">Avg Floor Price (AUR)</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <div className="text-yellow-600 font-bold text-sm">#</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {collections.reduce((sum, c) => sum + c.owners, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Owners</div>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-medium text-blue-900 mb-3">🖼️ About NFT Collections</h3>
          <div className="text-sm text-blue-800 space-y-2">
            <p>
              <strong>Floor Price:</strong> The lowest price for any NFT in the collection currently listed for sale.
            </p>
            <p>
              <strong>Volume (24h):</strong> Total trading volume for the collection in the last 24 hours.
            </p>
            <p>
              <strong>Owners:</strong> Number of unique wallet addresses that own at least one NFT from this collection.
            </p>
            <p>
              Collections are ranked by 24-hour trading volume by default. Use the sort dropdown to change ranking criteria.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NFTsPage


