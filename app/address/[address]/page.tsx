'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Copy, ExternalLink, ArrowUpRight, ArrowDownLeft, Clock, Coins, Activity, TrendingUp } from 'lucide-react'

interface AddressPageProps {
  params: {
    address: string
  }
}

const AddressPage = ({ params }: AddressPageProps) => {
  const [activeTab, setActiveTab] = useState('transactions')
  const [copied, setCopied] = useState(false)

  // Mock address data
  const addressData = {
    address: params.address,
    balance: '1,234.5678',
    balanceUSD: '$3,521,847.23',
    transactions: 15420,
    tokenTransfers: 8934,
    firstSeen: '2021-03-15',
    lastSeen: '2 mins ago',
    nonce: 1542,
    isContract: Math.random() > 0.7,
    contractName: 'UniswapV2Router02',
    tags: ['DeFi', 'DEX', 'Router']
  }

  // Mock transactions
  const transactions = Array.from({ length: 25 }, (_, i) => ({
    hash: `0x${Math.random().toString(16).substring(2, 66)}`,
    from: Math.random() > 0.5 ? params.address : `0x${Math.random().toString(16).substring(2, 42)}`,
    to: Math.random() > 0.5 ? params.address : `0x${Math.random().toString(16).substring(2, 42)}`,
    value: (Math.random() * 5).toFixed(4),
    timestamp: `${Math.floor(Math.random() * 60)} mins ago`,
    fee: (Math.random() * 0.01).toFixed(6),
    status: Math.random() > 0.05 ? 'success' : 'failed',
    method: ['Transfer', 'Swap', 'Approve', 'Mint'][Math.floor(Math.random() * 4)],
    block: 18542891 - i
  }))

  // Mock token holdings
  const tokenHoldings = Array.from({ length: 10 }, (_, i) => ({
    name: ['USDT', 'USDC', 'WETH', 'LINK', 'UNI', 'AAVE', 'COMP', 'MKR', 'SNX', 'CRV'][i],
    symbol: ['USDT', 'USDC', 'WETH', 'LINK', 'UNI', 'AAVE', 'COMP', 'MKR', 'SNX', 'CRV'][i],
    balance: (Math.random() * 10000).toFixed(2),
    value: `$${(Math.random() * 50000).toFixed(2)}`,
    address: `0x${Math.random().toString(16).substring(2, 42)}`
  }))

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(params.address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-yellow-600">Home</Link>
          <span>/</span>
          <span className="text-gray-900">Address</span>
        </div>

        {/* Address Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {addressData.isContract ? 'Contract' : 'Address'}
              </h1>
              {addressData.isContract && (
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-lg font-semibold text-gray-900">{addressData.contractName}</span>
                  <div className="flex space-x-1">
                    {addressData.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600 font-mono break-all">{params.address}</span>
                <button 
                  onClick={copyToClipboard}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Copy address"
                >
                  <Copy className={`w-4 h-4 ${copied ? 'text-green-600' : 'text-gray-400'}`} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Balance and Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Coins className="w-5 h-5 text-yellow-600" />
                <h3 className="text-sm font-medium text-gray-600">AUR Balance</h3>
              </div>
              <p className="text-xl font-bold text-gray-900">{addressData.balance} AUR</p>
              <p className="text-sm text-gray-500">{addressData.balanceUSD}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-medium text-gray-600">Transactions</h3>
              </div>
              <p className="text-xl font-bold text-gray-900">{addressData.transactions.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Total txns</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h3 className="text-sm font-medium text-gray-600">Token Transfers</h3>
              </div>
              <p className="text-xl font-bold text-gray-900">{addressData.tokenTransfers.toLocaleString()}</p>
              <p className="text-sm text-gray-500">ERC-20 transfers</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-purple-600" />
                <h3 className="text-sm font-medium text-gray-600">Last Activity</h3>
              </div>
              <p className="text-xl font-bold text-gray-900">{addressData.lastSeen}</p>
              <p className="text-sm text-gray-500">First seen: {addressData.firstSeen}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'transactions', label: 'Transactions', count: addressData.transactions },
                { id: 'tokens', label: 'Token Holdings', count: tokenHoldings.length },
                { id: 'transfers', label: 'Token Transfers', count: addressData.tokenTransfers },
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
                  {tab.label} ({tab.count.toLocaleString()})
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'transactions' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 rounded-lg">
                    <tr>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Txn Hash</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Method</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Block</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Age</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">From</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">To</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Value</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Fee</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {transactions.slice(0, 10).map((tx, index) => (
                      <tr key={tx.hash} className="hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <Link href={`/tx/${tx.hash}`} className="text-yellow-600 hover:text-yellow-700 text-sm font-mono">
                            {formatAddress(tx.hash)}
                          </Link>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {tx.method}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Link href={`/block/${tx.block}`} className="text-yellow-600 hover:text-yellow-700 text-sm">
                            {tx.block}
                          </Link>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{tx.timestamp}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-1">
                            {tx.from === params.address ? (
                              <ArrowUpRight className="w-3 h-3 text-red-500" />
                            ) : (
                              <ArrowDownLeft className="w-3 h-3 text-green-500" />
                            )}
                            <Link href={`/address/${tx.from}`} className="text-yellow-600 hover:text-yellow-700 text-sm">
                              {formatAddress(tx.from)}
                            </Link>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Link href={`/address/${tx.to}`} className="text-yellow-600 hover:text-yellow-700 text-sm">
                            {formatAddress(tx.to)}
                          </Link>
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">{tx.value} AUR</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{tx.fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'tokens' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 rounded-lg">
                    <tr>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Token</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Balance</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Value</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Contract</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {tokenHoldings.map((token, index) => (
                      <tr key={token.address} className="hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">{token.symbol.charAt(0)}</span>
                            </div>
                            <span className="font-medium">{token.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium">{token.balance} {token.symbol}</td>
                        <td className="py-3 px-4 text-gray-600">{token.value}</td>
                        <td className="py-3 px-4">
                          <Link href={`/token/${token.address}`} className="text-yellow-600 hover:text-yellow-700 text-sm">
                            {formatAddress(token.address)}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'transfers' && (
              <div className="text-center py-12">
                <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Token Transfers</h3>
                <p className="text-gray-600">Token transfer history would be displayed here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddressPage



