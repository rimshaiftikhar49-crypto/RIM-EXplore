'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRightLeft, Search, Filter, ExternalLink, RefreshCw } from 'lucide-react'

interface TokenTransfer {
  txHash: string
  blockNumber: number
  timestamp: string
  from: string
  to: string
  tokenAddress: string
  tokenName: string
  tokenSymbol: string
  value: string
  valueUSD: number
  timeAgo: string
}

const TokenTransfersPage = () => {
  const [transfers, setTransfers] = useState<TokenTransfer[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedToken, setSelectedToken] = useState('all')
  const [autoRefresh, setAutoRefresh] = useState(true)
  const transfersPerPage = 25

  useEffect(() => {
    fetchTokenTransfers()
    let interval: NodeJS.Timeout | undefined
    
    if (autoRefresh) {
      interval = setInterval(fetchTokenTransfers, 10000) // Refresh every 10 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [currentPage, selectedToken, autoRefresh])

  const fetchTokenTransfers = async () => {
    try {
      setLoading(true)
      // TODO: Replace with real token transfers API
      // Mock token transfer data
      const tokenNames = ['USDT', 'USDC', 'LINK', 'UNI', 'WBTC', 'DAI', 'MATIC', 'SHIB', 'AAVE', 'CRV']
      const tokenAddresses = [
        '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        '0xA0b86a33E6441e9e3DF7d0E7B8a5C123456789',
        '0x514910771AF9Ca656af840dff83E8264EcF986CA',
        '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
        '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599'
      ]

      const mockTransfers = Array.from({ length: 100 }, (_, i) => {
        const tokenIndex = Math.floor(Math.random() * tokenNames.length)
        const value = Math.random() * 100000 + 100
        const timestamp = Date.now() - (i * 30000) // 30 seconds apart
        
        return {
          txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
          blockNumber: 23394849 - Math.floor(i / 10),
          timestamp: new Date(timestamp).toLocaleString(),
          from: `0x${Math.random().toString(16).substr(2, 40)}`,
          to: `0x${Math.random().toString(16).substr(2, 40)}`,
          tokenAddress: tokenAddresses[tokenIndex % tokenAddresses.length],
          tokenName: `${tokenNames[tokenIndex]} Token`,
          tokenSymbol: tokenNames[tokenIndex],
          value: value.toFixed(2),
          valueUSD: value * (Math.random() * 2 + 0.5),
          timeAgo: getTimeAgo(timestamp)
        }
      })

      const offset = (currentPage - 1) * transfersPerPage
      setTransfers(mockTransfers.slice(offset, offset + transfersPerPage))
      setLoading(false)
    } catch (error) {
      console.error('Error fetching token transfers:', error)
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

  const filteredTransfers = transfers.filter(transfer => {
    const matchesSearch = !searchTerm || 
      transfer.tokenSymbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.tokenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.txHash.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesToken = selectedToken === 'all' || transfer.tokenSymbol === selectedToken
    
    return matchesSearch && matchesToken
  })

  const uniqueTokens = Array.from(new Set(transfers.map(t => t.tokenSymbol)))

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading token transfers...</p>
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
            <span className="text-yellow-600">Token Transfers</span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ArrowRightLeft className="w-8 h-8 text-yellow-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Token Transfers (ERC-20)</h1>
                <p className="text-gray-600">Real-time ERC-20 token transfer activity</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
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
                onClick={fetchTokenTransfers}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center space-x-2 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by token name, symbol, or transaction hash..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={selectedToken}
                  onChange={(e) => setSelectedToken(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                >
                  <option value="all">All Tokens</option>
                  {uniqueTokens.map(token => (
                    <option key={token} value={token}>{token}</option>
                  ))}
                </select>
              </div>
              <div className="text-sm text-gray-600">
                {filteredTransfers.length} transfers
              </div>
            </div>
          </div>
        </div>

        {/* Transfers Table */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Latest Token Transfers</h2>
            <div className="text-sm text-gray-600">
              Showing latest {filteredTransfers.length} transfers
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Txn Hash</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Block</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Token</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransfers.map((transfer, index) => (
                  <tr key={transfer.txHash} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link href={`/tx/${transfer.txHash}`} className="text-blue-600 hover:text-blue-800 font-mono text-sm">
                        {transfer.txHash.slice(0, 12)}...
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link href={`/block/${transfer.blockNumber}`} className="text-blue-600 hover:text-blue-800 font-medium">
                        {transfer.blockNumber.toLocaleString()}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transfer.timeAgo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link href={`/address/${transfer.from}`} className="text-blue-600 hover:text-blue-800 font-mono text-sm">
                        {transfer.from.slice(0, 6)}...{transfer.from.slice(-4)}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <ArrowRightLeft className="w-4 h-4 text-gray-400" />
                        <Link href={`/address/${transfer.to}`} className="text-blue-600 hover:text-blue-800 font-mono text-sm">
                          {transfer.to.slice(0, 6)}...{transfer.to.slice(-4)}
                        </Link>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xs">{transfer.tokenSymbol.charAt(0)}</span>
                        </div>
                        <div>
                          <Link href={`/token/${transfer.tokenAddress}`} className="font-medium text-gray-900 hover:text-yellow-600">
                            {transfer.tokenSymbol}
                          </Link>
                          <div className="text-xs text-gray-500">{transfer.tokenName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900">{transfer.value} {transfer.tokenSymbol}</div>
                        <div className="text-sm text-gray-500">${transfer.valueUSD.toFixed(2)}</div>
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
              Showing {(currentPage - 1) * transfersPerPage + 1}-{Math.min(currentPage * transfersPerPage, 1000)} of 1000+ transfers
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
                Page {currentPage} of 40
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(40, currentPage + 1))}
                disabled={currentPage === 40}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Transfer Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <ArrowRightLeft className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {transfers.length.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Transfers (24h)</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <div className="text-green-600 font-bold text-sm">$</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  ${transfers.reduce((sum, t) => sum + t.valueUSD, 0).toFixed(0)}
                </div>
                <div className="text-sm text-gray-600">Total Value (24h)</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <div className="text-purple-600 font-bold text-sm">🪙</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{uniqueTokens.length}</div>
                <div className="text-sm text-gray-600">Active Tokens</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <div className="text-yellow-600 font-bold text-sm">Ⓐ</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  ${(transfers.reduce((sum, t) => sum + t.valueUSD, 0) / transfers.length).toFixed(0)}
                </div>
                <div className="text-sm text-gray-600">Avg Transfer Value</div>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-medium text-blue-900 mb-3">🪙 About Token Transfers</h3>
          <div className="text-sm text-blue-800 space-y-2">
            <p>
              <strong>Token transfers</strong> show the movement of ERC-20 tokens between addresses on the AUR network.
            </p>
            <p>
              Each transfer represents a successful token transaction, including the sender, recipient, amount, and associated transaction hash.
            </p>
            <p>
              Use the filters to search for specific tokens or addresses, and enable auto-refresh to see transfers in real-time.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TokenTransfersPage


