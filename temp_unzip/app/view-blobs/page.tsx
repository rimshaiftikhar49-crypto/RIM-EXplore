'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Filter, Clock, Hash, Database, Eye, Download, RefreshCw } from 'lucide-react'

interface Blob {
  index: number
  blockNumber: number
  blockHash: string
  slot: number
  commitment: string
  proof: string
  blobData: string
  size: number
  timestamp: number
  timeAgo: string
}

const ViewBlobsPage = () => {
  const [blobs, setBlobs] = useState<Blob[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalBlobs, setTotalBlobs] = useState(0)
  const blobsPerPage = 25

  // Mock data for demonstration
  useEffect(() => {
    const mockBlobs: Blob[] = [
      {
        index: 1,
        blockNumber: 18945678,
        blockHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890',
        slot: 123456,
        commitment: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
        proof: '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba',
        blobData: '0x...',
        size: 131072, // 128 KB
        timestamp: Date.now() - 300000,
        timeAgo: '5 mins ago'
      },
      {
        index: 2,
        blockNumber: 18945679,
        blockHash: '0x2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890ab',
        slot: 123457,
        commitment: '0xbcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab',
        proof: '0xa876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba98',
        blobData: '0x...',
        size: 98304, // 96 KB
        timestamp: Date.now() - 600000,
        timeAgo: '10 mins ago'
      },
      {
        index: 3,
        blockNumber: 18945680,
        blockHash: '0x3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcd',
        slot: 123458,
        commitment: '0xcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd',
        proof: '0xb76543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba9876',
        blobData: '0x...',
        size: 131072, // 128 KB
        timestamp: Date.now() - 900000,
        timeAgo: '15 mins ago'
      }
    ]

    setBlobs(mockBlobs)
    setTotalBlobs(mockBlobs.length)
    setLoading(false)
  }, [])

  const formatSize = (bytes: number) => {
    if (bytes >= 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    } else if (bytes >= 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`
    }
    return `${bytes} bytes`
  }

  const filteredBlobs = blobs.filter(blob => {
    const matchesSearch = searchQuery === '' || 
      blob.blockNumber.toString().includes(searchQuery) ||
      blob.commitment.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = filter === 'all' || 
      (filter === 'large' && blob.size >= 131072) ||
      (filter === 'small' && blob.size < 131072)
    
    return matchesSearch && matchesFilter
  })

  const startIndex = (currentPage - 1) * blobsPerPage
  const endIndex = Math.min(startIndex + blobsPerPage, filteredBlobs.length)
  const currentBlobs = filteredBlobs.slice(startIndex, endIndex)

  const totalPages = Math.ceil(filteredBlobs.length / blobsPerPage)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">View Blobs</h1>
                <p className="text-sm text-gray-600 mt-1">
                  EIP-4844 Proto-Danksharding blob data explorer
                </p>
              </div>
              <button className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors">
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by block number or commitment..."
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
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                >
                  <option value="all">All Blobs</option>
                  <option value="large">Large (≥128KB)</option>
                  <option value="small">Small (&lt;128KB)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Total Blobs</div>
              <div className="text-2xl font-bold text-gray-900">{totalBlobs.toLocaleString()}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Showing</div>
              <div className="text-2xl font-bold text-gray-900">
                {startIndex + 1}-{endIndex} of {filteredBlobs.length}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Total Size</div>
              <div className="text-2xl font-bold text-gray-900">
                {formatSize(blobs.reduce((sum, blob) => sum + blob.size, 0))}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Avg Size</div>
              <div className="text-2xl font-bold text-gray-900">
                {formatSize(blobs.length > 0 ? blobs.reduce((sum, blob) => sum + blob.size, 0) / blobs.length : 0)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blobs Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Blob Index
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Block
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Commitment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Age
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentBlobs.map((blob) => (
                    <tr key={blob.index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Database className="w-4 h-4 text-yellow-600 mr-2" />
                          <span className="text-sm font-medium text-gray-900">
                            #{blob.index}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link 
                          href={`/block/${blob.blockNumber}`}
                          className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {blob.blockNumber.toLocaleString()}
                        </Link>
                        <div className="text-xs text-gray-500">
                          {blob.blockHash.slice(0, 10)}...{blob.blockHash.slice(-8)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-mono text-gray-900">
                          {blob.commitment.slice(0, 20)}...{blob.commitment.slice(-20)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{formatSize(blob.size)}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-gray-400 mr-1" />
                          <span className="text-sm text-gray-600">{blob.timeAgo}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button className="text-yellow-600 hover:text-yellow-700">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-yellow-600 hover:text-yellow-700">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                      <span className="font-medium">{endIndex}</span> of{' '}
                      <span className="font-medium">{filteredBlobs.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNum = i + 1
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === pageNum
                                ? 'z-10 bg-yellow-50 border-yellow-500 text-yellow-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        )
                      })}
                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            About EIP-4844 Blobs
          </h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              <strong>Proto-Danksharding (EIP-4844)</strong> introduces a new transaction type that carries large amounts of data called "blobs". 
              These blobs are designed to significantly reduce transaction costs for layer 2 solutions.
            </p>
            <p>
              <strong>Key Features:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Each blob can contain up to ~128 KB of data</li>
              <li>Blobs are committed to using KZG commitments</li>
              <li>Data is available for a limited time (typically ~18 days)</li>
              <li>Much cheaper than calldata for large data transactions</li>
              <li>Enables more efficient Layer 2 scaling solutions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewBlobsPage
