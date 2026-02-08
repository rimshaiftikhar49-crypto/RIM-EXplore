'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Clock, User, ArrowLeft, ArrowRight, Search, Filter } from 'lucide-react'

const BlocksPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const blocksPerPage = 25

  // Mock data for blocks
  const blocks = Array.from({ length: 100 }, (_, i) => ({
    number: 18542891 - i,
    timestamp: `${12 + (i * 12)} secs ago`,
    miner: `0x${Math.random().toString(16).substring(2, 42)}`,
    txnCount: Math.floor(Math.random() * 300) + 50,
    reward: (2 + Math.random() * 0.5).toFixed(4),
    gasUsed: Math.floor(Math.random() * 30) + 70,
    gasLimit: 30000000,
    size: (Math.random() * 100 + 50).toFixed(2)
  }))

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const totalPages = Math.ceil(blocks.length / blocksPerPage)
  const startIndex = (currentPage - 1) * blocksPerPage
  const endIndex = startIndex + blocksPerPage
  const currentBlocks = blocks.slice(startIndex, endIndex)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-yellow-600">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Blocks</span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Blocks</h1>
          <p className="text-gray-600">
            Browse and search all blocks on the AUR blockchain. Each block contains transaction data and is secured by miners.
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
                  placeholder="Search by block number, hash, or miner address"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
            </div>
            <button className="flex items-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Blocks Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Latest Blocks</h2>
            <p className="text-sm text-gray-600 mt-1">
              Showing {startIndex + 1}-{Math.min(endIndex, blocks.length)} of {blocks.length} blocks
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Block
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Txn
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Miner
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Gas Used
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Gas Limit
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Reward
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Size
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentBlocks.map((block, index) => (
                  <tr key={block.number} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div>
                        </div>
                        <Link 
                          href={`/block/${block.number}`}
                          className="text-yellow-600 hover:text-yellow-700 font-medium"
                        >
                          {block.number.toLocaleString()}
                        </Link>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{block.timestamp}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Link 
                        href={`/block/${block.number}#transactions`}
                        className="text-yellow-600 hover:text-yellow-700 font-medium"
                      >
                        {block.txnCount}
                      </Link>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4 text-gray-400" />
                        <Link 
                          href={`/address/${block.miner}`}
                          className="text-yellow-600 hover:text-yellow-700"
                        >
                          {formatAddress(block.miner)}
                        </Link>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {block.gasUsed}%
                        </div>
                        <div className="w-16 bg-gray-200 rounded-full h-1.5 mt-1">
                          <div 
                            className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-1.5 rounded-full"
                            style={{ width: `${block.gasUsed}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-900">
                        {block.gasLimit.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm font-medium text-gray-900">
                        {block.reward} AUR
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-900">
                        {block.size} KB
                      </span>
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

export default BlocksPage



