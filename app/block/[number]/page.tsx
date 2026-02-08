'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Copy, ExternalLink, Clock, User, ArrowLeft, ArrowRight, Fuel, Activity } from 'lucide-react'

interface BlockPageProps {
  params: {
    number: string
  }
}

const BlockPage = ({ params }: BlockPageProps) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [copied, setCopied] = useState(false)

  const blockNumber = parseInt(params.number)

  // Mock block data
  const blockData = {
    number: blockNumber,
    hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12',
    parentHash: '0x0987654321fedcba0987654321fedcba0987654321fedcba0987654321fedcba09',
    timestamp: '2024-01-15 14:32:18 UTC',
    miner: '0x742d35Cc6634C0532925a3b8D29fbb23c4a4f5e1',
    reward: '2.1234',
    difficulty: '15,847,291,352,745',
    totalDifficulty: '58,750,003,716,598,352,816,469',
    size: '85,432',
    gasUsed: 28567891,
    gasLimit: 30000000,
    baseFeePerGas: '22.5',
    burntFees: '0.643',
    extraData: '0x476574682f76312e302e302f6c696e75782f676f312e342e32',
    transactions: 156,
    uncles: 0,
    stateRoot: '0xabcd1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab',
    receiptsRoot: '0x1234abcd567890ef1234abcd567890ef1234abcd567890ef1234abcd567890ef',
    nonce: '0x0000000000000042'
  }

  // Mock transactions in this block
  const transactions = Array.from({ length: blockData.transactions }, (_, i) => ({
    hash: `0x${Math.random().toString(16).substring(2, 66)}`,
    from: `0x${Math.random().toString(16).substring(2, 42)}`,
    to: `0x${Math.random().toString(16).substring(2, 42)}`,
    value: (Math.random() * 5).toFixed(4),
    fee: (Math.random() * 0.01).toFixed(6),
    gasPrice: Math.floor(Math.random() * 50) + 20,
    gasUsed: Math.floor(Math.random() * 100000) + 21000,
    status: Math.random() > 0.05 ? 'success' : 'failed',
    method: ['Transfer', 'Swap', 'Approve', 'Mint'][Math.floor(Math.random() * 4)]
  }))

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const formatHash = (hash: string) => {
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const gasUsedPercentage = ((blockData.gasUsed / blockData.gasLimit) * 100).toFixed(2)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-yellow-600">Home</Link>
          <span>/</span>
          <Link href="/blocks" className="hover:text-yellow-600">Blocks</Link>
          <span>/</span>
          <span className="text-gray-900">Block #{blockNumber.toLocaleString()}</span>
        </div>

        {/* Block Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Block #{blockNumber.toLocaleString()}
              </h1>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600 font-mono break-all">{formatHash(blockData.hash)}</span>
                <button 
                  onClick={() => copyToClipboard(blockData.hash)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Copy block hash"
                >
                  <Copy className={`w-4 h-4 ${copied ? 'text-green-600' : 'text-gray-400'}`} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Block Navigation */}
          <div className="flex items-center justify-between mb-6">
            <Link 
              href={`/block/${blockNumber - 1}`}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Block</span>
            </Link>
            
            <div className="text-sm text-gray-600">
              Block Height: {blockNumber.toLocaleString()}
            </div>
            
            <Link 
              href={`/block/${blockNumber + 1}`}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <span>Next Block</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Block Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-medium text-gray-600">Transactions</h3>
              </div>
              <p className="text-xl font-bold text-gray-900">{blockData.transactions}</p>
              <p className="text-sm text-gray-500">In this block</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Fuel className="w-5 h-5 text-yellow-600" />
                <h3 className="text-sm font-medium text-gray-600">Gas Used</h3>
              </div>
              <p className="text-xl font-bold text-gray-900">{gasUsedPercentage}%</p>
              <p className="text-sm text-gray-500">{blockData.gasUsed.toLocaleString()} / {blockData.gasLimit.toLocaleString()}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <User className="w-5 h-5 text-green-600" />
                <h3 className="text-sm font-medium text-gray-600">Miner Reward</h3>
              </div>
              <p className="text-xl font-bold text-gray-900">{blockData.reward} AUR</p>
              <p className="text-sm text-gray-500">Block reward</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-purple-600" />
                <h3 className="text-sm font-medium text-gray-600">Timestamp</h3>
              </div>
              <p className="text-xl font-bold text-gray-900">12 mins ago</p>
              <p className="text-sm text-gray-500">{blockData.timestamp}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'transactions', label: `Transactions (${blockData.transactions})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-yellow-500 text-yellow-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Block Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Block Height:</span>
                      <span className="text-sm font-medium text-gray-900">{blockData.number.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Block Hash:</span>
                      <span className="text-sm font-mono text-gray-900">{formatHash(blockData.hash)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Parent Hash:</span>
                      <Link href={`/block/${blockNumber - 1}`} className="text-sm font-mono text-yellow-600 hover:text-yellow-700">
                        {formatHash(blockData.parentHash)}
                      </Link>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Timestamp:</span>
                      <span className="text-sm text-gray-900">{blockData.timestamp}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Miner:</span>
                      <Link href={`/address/${blockData.miner}`} className="text-sm text-yellow-600 hover:text-yellow-700">
                        {formatAddress(blockData.miner)}
                      </Link>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Block Reward:</span>
                      <span className="text-sm font-medium text-gray-900">{blockData.reward} AUR</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Block Size:</span>
                      <span className="text-sm text-gray-900">{parseInt(blockData.size).toLocaleString()} bytes</span>
                    </div>
                  </div>
                </div>

                {/* Gas and Technical Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Gas Used:</span>
                      <span className="text-sm text-gray-900">{blockData.gasUsed.toLocaleString()} ({gasUsedPercentage}%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Gas Limit:</span>
                      <span className="text-sm text-gray-900">{blockData.gasLimit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Base Fee:</span>
                      <span className="text-sm text-gray-900">{blockData.baseFeePerGas} Gwei</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Burnt Fees:</span>
                      <span className="text-sm text-gray-900">{blockData.burntFees} AUR</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Difficulty:</span>
                      <span className="text-sm text-gray-900">{blockData.difficulty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Difficulty:</span>
                      <span className="text-sm text-gray-900">{blockData.totalDifficulty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Nonce:</span>
                      <span className="text-sm font-mono text-gray-900">{blockData.nonce}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'transactions' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 rounded-lg">
                    <tr>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Txn Hash</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Method</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">From</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">To</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Value</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Fee</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {transactions.slice(0, 25).map((tx, index) => (
                      <tr key={tx.hash} className="hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-sm ${
                              tx.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                            }`}></div>
                            <Link href={`/tx/${tx.hash}`} className="text-yellow-600 hover:text-yellow-700 text-sm font-mono">
                              {formatHash(tx.hash)}
                            </Link>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {tx.method}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Link href={`/address/${tx.from}`} className="text-yellow-600 hover:text-yellow-700 text-sm">
                            {formatAddress(tx.from)}
                          </Link>
                        </td>
                        <td className="py-3 px-4">
                          <Link href={`/address/${tx.to}`} className="text-yellow-600 hover:text-yellow-700 text-sm">
                            {formatAddress(tx.to)}
                          </Link>
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">{tx.value} AUR</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{tx.fee} AUR</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlockPage



