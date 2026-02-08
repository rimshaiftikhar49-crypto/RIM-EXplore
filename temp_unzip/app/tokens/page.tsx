'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { TrendingUp, TrendingDown, ArrowLeft, ArrowRight, Search, Filter, ExternalLink } from 'lucide-react'

// Types for token data
interface Token {
  address: string
  name: string
  symbol: string
  decimals: number
  totalSupply: string
  price: number
  marketCap: number
  volume24h: number
  change24h: number
  holders: number
}

const TokensPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('market_cap')
  const [tokens, setTokens] = useState<Token[]>([])
  const [loading, setLoading] = useState(true)
  const [totalTokens, setTotalTokens] = useState(0)
  const tokensPerPage = 50

  useEffect(() => {
    fetchTokens()
  }, [currentPage, sortBy])

  const fetchTokens = async () => {
    try {
      setLoading(true)
      const offset = (currentPage - 1) * tokensPerPage
      const response = await fetch('/api/tokens')
      const data = await response.json()
      
      if (data.success) {
        setTokens(data.tokens)
        setTotalTokens(data.totalTokens)
      }
    } catch (error) {
      console.error('Error fetching tokens:', error)
    } finally {
      setLoading(false)
    }
  }


  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const totalPages = Math.ceil(totalTokens / tokensPerPage)
  // No need to slice since API handles pagination
  const currentTokens = tokens

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tokens...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-yellow-600">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Tokens</span>
          </div>
        </div>

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Top Tokens by Market Capitalization</h1>
          <p className="text-gray-600">
            View the top tokens by Market Capitalization on AUR (AUR) including the latest price, 24h change, 
            and percentage change in USD. Updated every few seconds.
          </p>
        </div>

        {/* Network stats */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-sm font-medium text-gray-600 mb-1">AUR PRICE</div>
              <div className="text-lg font-bold text-gray-900">$2,847.32 @ 0.023847 BTC (+2.45%)</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-gray-600 mb-1">MARKET CAP</div>
              <div className="text-lg font-bold text-gray-900">$342,847,119,347.00</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-gray-600 mb-1">TRANSACTIONS</div>
              <div className="text-lg font-bold text-gray-900">1,847.32 M (12.4 TPS)</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-gray-600 mb-1">MED GAS PRICE</div>
              <div className="text-lg font-bold text-gray-900">0.089 Gwei ($0.01)</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Filter by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded text-sm"
              >
                <option value="market_cap">Market Cap</option>
                <option value="volume">Volume</option>
                <option value="holders">Holders</option>
                <option value="price">Price</option>
              </select>
            </div>
            <div className="text-sm text-gray-600">
              Showing {(currentPage - 1) * tokensPerPage + 1}-{Math.min(currentPage * tokensPerPage, totalTokens)} of {totalTokens} tokens
            </div>
          </div>
        </div>

        {/* Tokens table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    #
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Symbol
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Price Change (24h)
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Volume (24h)
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Market Cap
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Holders
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentTokens.map((token, index) => (
                  <tr key={token.address} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <span className="text-sm font-medium text-gray-900">
                        {(currentPage - 1) * tokensPerPage + index + 1}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-semibold text-sm">
                            {token.symbol.charAt(0)}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-gray-900 truncate">
                            {token.name}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center space-x-2">
                            <Link 
                              href={`/address/${token.address}`}
                              className="text-yellow-600 hover:text-yellow-700 truncate"
                            >
                              {formatAddress(token.address)}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-medium text-gray-900">
                        {token.symbol}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">
                        ${token.price?.toFixed(token.price < 1 ? 6 : 2) || '0.00'}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className={`flex items-center space-x-1 font-medium ${
                        token.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {token.change24h >= 0 ? (
                          <TrendingUp size={16} />
                        ) : (
                          <TrendingDown size={16} />
                        )}
                        <span>{token.change24h >= 0 ? '+' : ''}{token.change24h?.toFixed(2)}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">
                        ${token.volume24h?.toLocaleString('en-US', { maximumFractionDigits: 0 }) || '0'}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">
                        ${token.marketCap?.toLocaleString('en-US', { maximumFractionDigits: 0 }) || '0'}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">
                        {token.holders?.toLocaleString() || '0'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft size={16} />
                  <span>Previous</span>
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span>Next</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TokensPage
