'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Clock, ArrowLeft, ArrowRight, Search, Filter, ArrowUpRight } from 'lucide-react'

const TransactionsPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const txnsPerPage = 25

  // Mock data for transactions
  const transactions = Array.from({ length: 100 }, (_, i) => ({
    hash: `0x${Math.random().toString(16).substring(2, 66)}`,
    from: `0x${Math.random().toString(16).substring(2, 42)}`,
    to: `0x${Math.random().toString(16).substring(2, 42)}`,
    value: (Math.random() * 10).toFixed(4),
    timestamp: `${15 + (i * 8)} secs ago`,
    fee: (Math.random() * 0.01).toFixed(6),
    gasPrice: Math.floor(Math.random() * 50) + 20,
    gasUsed: Math.floor(Math.random() * 100000) + 21000,
    status: Math.random() > 0.05 ? 'success' : Math.random() > 0.5 ? 'pending' : 'failed',
    method: ['Transfer', 'Swap', 'Approve', 'Mint', 'Burn', 'Stake'][Math.floor(Math.random() * 6)]
  }))

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const formatHash = (hash: string) => {
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`
  }

  const totalPages = Math.ceil(transactions.length / txnsPerPage)
  const startIndex = (currentPage - 1) * txnsPerPage
  const endIndex = startIndex + txnsPerPage
  const currentTransactions = transactions.slice(startIndex, endIndex)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-yellow-600">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Transactions</span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Transactions</h1>
          <p className="text-gray-600">
            Browse and search all transactions on the AUR blockchain. Track AUR transfers, smart contract interactions, and more.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by transaction hash, address, or block number"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
                <option value="">All Methods</option>
                <option value="transfer">Transfer</option>
                <option value="swap">Swap</option>
                <option value="approve">Approve</option>
                <option value="mint">Mint</option>
              </select>
              <button className="flex items-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Latest Transactions</h2>
            <p className="text-sm text-gray-600 mt-1">
              Showing {startIndex + 1}-{Math.min(endIndex, transactions.length)} of {transactions.length} transactions
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Transaction Hash
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    From
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    To
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Fee
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentTransactions.map((tx, index) => (
                  <tr key={tx.hash} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          tx.status === 'success' ? 'bg-green-100' : 
                          tx.status === 'pending' ? 'bg-yellow-100' : 'bg-red-100'
                        }`}>
                          <div className={`w-3 h-3 rounded-sm ${
                            tx.status === 'success' ? 'bg-green-500' : 
                            tx.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                        </div>
                        <div>
                          <Link 
                            href={`/tx/${tx.hash}`}
                            className="text-yellow-600 hover:text-yellow-700 font-medium text-sm"
                          >
                            {formatHash(tx.hash)}
                          </Link>
                          <div className={`text-xs font-medium mt-0.5 ${
                            tx.status === 'success' ? 'text-green-600' :
                            tx.status === 'pending' ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {tx.status}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {tx.method}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{tx.timestamp}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Link 
                        href={`/address/${tx.from}`}
                        className="text-yellow-600 hover:text-yellow-700 text-sm"
                      >
                        {formatAddress(tx.from)}
                      </Link>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-1">
                        <Link 
                          href={`/address/${tx.to}`}
                          className="text-yellow-600 hover:text-yellow-700 text-sm"
                        >
                          {formatAddress(tx.to)}
                        </Link>
                        <ArrowUpRight className="w-3 h-3 text-gray-400" />
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm font-medium text-gray-900">
                        {tx.value} AUR
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-600">
                        {tx.fee} AUR
                      </div>
                      <div className="text-xs text-gray-500">
                        {tx.gasPrice} Gwei
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionsPage



