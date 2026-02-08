'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Clock, Zap, AlertCircle, RefreshCw } from 'lucide-react'

const PendingTransactionsPage = () => {
  const [pendingTxs, setPendingTxs] = useState<Array<{
    hash: string
    from: string
    to: string
    value: string
    gasPrice: string
    gasLimit: string
    nonce: number
    timeInPool: string
    priority: 'high' | 'medium' | 'low'
  }>>([])
  const [loading, setLoading] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)

  useEffect(() => {
    fetchPendingTransactions()
    let interval: NodeJS.Timeout | undefined
    
    if (autoRefresh) {
      interval = setInterval(fetchPendingTransactions, 5000) // Refresh every 5 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [autoRefresh])

  const fetchPendingTransactions = async () => {
    try {
      // TODO: Replace with real pending transactions API
      // Mock pending transaction data
      const mockTxs = Array.from({ length: 50 }, (_, i) => {
        const gasPrice = Math.random() * 50 + 10 // 10-60 Gwei
        const value = Math.random() * 10
        const timeInPool = Math.floor(Math.random() * 300) + 1 // 1-300 seconds
        
        let priority: 'high' | 'medium' | 'low' = 'medium'
        if (gasPrice > 40) priority = 'high'
        else if (gasPrice < 20) priority = 'low'
        
        return {
          hash: `0x${Math.random().toString(16).substr(2, 64)}`,
          from: `0x${Math.random().toString(16).substr(2, 40)}`,
          to: `0x${Math.random().toString(16).substr(2, 40)}`,
          value: value.toFixed(4),
          gasPrice: gasPrice.toFixed(1),
          gasLimit: (21000 + Math.floor(Math.random() * 100000)).toString(),
          nonce: Math.floor(Math.random() * 1000),
          timeInPool: `${timeInPool}s`,
          priority
        }
      })
      
      // Sort by gas price (highest first)
      mockTxs.sort((a, b) => parseFloat(b.gasPrice) - parseFloat(a.gasPrice))
      
      setPendingTxs(mockTxs)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching pending transactions:', error)
      setLoading(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <Zap className="w-3 h-3" />
      case 'medium': return <Clock className="w-3 h-3" />
      case 'low': return <AlertCircle className="w-3 h-3" />
      default: return <Clock className="w-3 h-3" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading pending transactions...</p>
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
            <span className="text-yellow-600">Pending Transactions</span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Clock className="w-8 h-8 text-yellow-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Pending Transactions</h1>
                <p className="text-gray-600">Transactions waiting to be included in the next block</p>
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
                onClick={fetchPendingTransactions}
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
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{pendingTxs.length.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Pending</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {pendingTxs.filter(tx => tx.priority === 'high').length}
                </div>
                <div className="text-sm text-gray-600">High Priority</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <div className="text-yellow-600 font-bold text-sm">Ⓖ</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {pendingTxs.length > 0 ? Math.max(...pendingTxs.map(tx => parseFloat(tx.gasPrice))).toFixed(1) : '0'}
                </div>
                <div className="text-sm text-gray-600">Max Gas Price (Gwei)</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="text-blue-600 font-bold text-sm">Ⓐ</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {pendingTxs.length > 0 ? (pendingTxs.reduce((sum, tx) => sum + parseFloat(tx.gasPrice), 0) / pendingTxs.length).toFixed(1) : '0'}
                </div>
                <div className="text-sm text-gray-600">Avg Gas Price (Gwei)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Pending Transactions</h2>
            <div className="text-sm text-gray-600">
              Showing latest {pendingTxs.length} pending transactions
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Txn Hash</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gas Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time in Pool</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingTxs.map((tx, index) => (
                  <tr key={tx.hash} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link href={`/tx/${tx.hash}`} className="text-blue-600 hover:text-blue-800 font-mono text-sm">
                        {tx.hash.slice(0, 12)}...
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link href={`/address/${tx.from}`} className="text-blue-600 hover:text-blue-800 font-mono text-sm">
                        {tx.from.slice(0, 6)}...{tx.from.slice(-4)}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link href={`/address/${tx.to}`} className="text-blue-600 hover:text-blue-800 font-mono text-sm">
                        {tx.to.slice(0, 6)}...{tx.to.slice(-4)}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {tx.value} AUR
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {tx.gasPrice} Gwei
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(tx.priority)}`}>
                        {getPriorityIcon(tx.priority)}
                        <span className="capitalize">{tx.priority}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {tx.timeInPool}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-medium text-blue-900 mb-3">ℹ️ About Pending Transactions</h3>
          <div className="text-sm text-blue-800 space-y-2">
            <p>
              <strong>Pending transactions</strong> are transactions that have been submitted to the network but not yet included in a block.
            </p>
            <p>
              <strong>Priority</strong> is determined by gas price. Higher gas prices typically get confirmed faster.
            </p>
            <p>
              <strong>Time in pool</strong> shows how long the transaction has been waiting to be mined.
            </p>
            <p>
              Transactions may be dropped from the mempool if they remain pending for too long or if gas prices are too low.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PendingTransactionsPage


