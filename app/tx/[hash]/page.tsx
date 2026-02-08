'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Copy, ExternalLink, CheckCircle, XCircle, Clock, ArrowRight, Fuel, Zap } from 'lucide-react'

interface TransactionPageProps {
  params: {
    hash: string
  }
}

const TransactionPage = ({ params }: TransactionPageProps) => {
  const [copied, setCopied] = useState(false)

  // Mock transaction data
  const txData = {
    hash: params.hash,
    status: Math.random() > 0.1 ? 'success' : 'failed',
    block: 18542891,
    confirmations: 1247,
    timestamp: '2024-01-15 14:32:18 UTC',
    from: '0x742d35Cc6634C0532925a3b8D29fbb23c4a4f5e1',
    to: '0x8ba1f109551bD432803012645Hac136c4b4f5e1',
    value: '2.5678',
    valueUSD: '$7,321.45',
    gasLimit: 21000,
    gasUsed: 21000,
    gasPrice: '25.5',
    maxFeePerGas: '30.2',
    maxPriorityFeePerGas: '2.5',
    baseFee: '22.7',
    transactionFee: '0.000535',
    transactionFeeUSD: '$1.52',
    nonce: 1542,
    position: 156,
    method: 'Transfer',
    inputData: '0xa9059cbb000000000000000000000000742d35cc6634c0532925a3b8d29fbb23c4a4f5e1000000000000000000000000000000000000000000000000002386f26fc10000'
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
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
          <Link href="/txs" className="hover:text-yellow-600">Transactions</Link>
          <span>/</span>
          <span className="text-gray-900">Transaction Details</span>
        </div>

        {/* Transaction Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Transaction Details</h1>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600 font-mono break-all">{params.hash}</span>
                <button 
                  onClick={() => copyToClipboard(params.hash)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Copy transaction hash"
                >
                  <Copy className={`w-4 h-4 ${copied ? 'text-green-600' : 'text-gray-400'}`} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              txData.status === 'success' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {txData.status === 'success' ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <XCircle className="w-5 h-5" />
              )}
              <span className="font-medium capitalize">{txData.status}</span>
            </div>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Basic Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Overview</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-600">Transaction Hash:</span>
                <div className="text-right">
                  <span className="text-sm text-gray-900 font-mono break-all">{formatAddress(txData.hash)}</span>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-600">Status:</span>
                <div className={`flex items-center space-x-1 ${
                  txData.status === 'success' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {txData.status === 'success' ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <XCircle className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium capitalize">{txData.status}</span>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-600">Block:</span>
                <div className="text-right">
                  <Link href={`/block/${txData.block}`} className="text-sm text-yellow-600 hover:text-yellow-700">
                    {txData.block.toLocaleString()}
                  </Link>
                  <div className="text-xs text-gray-500">{txData.confirmations} confirmations</div>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-600">Timestamp:</span>
                <div className="text-right">
                  <div className="text-sm text-gray-900">{txData.timestamp}</div>
                  <div className="text-xs text-gray-500">12 mins ago</div>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-600">From:</span>
                <div className="text-right">
                  <Link href={`/address/${txData.from}`} className="text-sm text-yellow-600 hover:text-yellow-700">
                    {formatAddress(txData.from)}
                  </Link>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-600">To:</span>
                <div className="text-right">
                  <Link href={`/address/${txData.to}`} className="text-sm text-yellow-600 hover:text-yellow-700">
                    {formatAddress(txData.to)}
                  </Link>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-gray-600">Value:</span>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{txData.value} AUR</div>
                    <div className="text-xs text-gray-500">{txData.valueUSD}</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-600">Transaction Fee:</span>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{txData.transactionFee} AUR</div>
                  <div className="text-xs text-gray-500">{txData.transactionFeeUSD}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Gas Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <Fuel className="w-5 h-5 text-yellow-600 mr-2" />
              Gas Details
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-600">Gas Limit:</span>
                <span className="text-sm text-gray-900">{txData.gasLimit.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-600">Gas Used:</span>
                <div className="text-right">
                  <span className="text-sm text-gray-900">{txData.gasUsed.toLocaleString()}</span>
                  <div className="text-xs text-gray-500">
                    {((txData.gasUsed / txData.gasLimit) * 100).toFixed(2)}%
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-600">Gas Price:</span>
                <span className="text-sm text-gray-900">{txData.gasPrice} Gwei</span>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-gray-600">Base Fee:</span>
                  <span className="text-sm text-gray-900">{txData.baseFee} Gwei</span>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-600">Max Fee Per Gas:</span>
                <span className="text-sm text-gray-900">{txData.maxFeePerGas} Gwei</span>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-600">Max Priority Fee:</span>
                <span className="text-sm text-gray-900">{txData.maxPriorityFeePerGas} Gwei</span>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-gray-600">Nonce:</span>
                  <span className="text-sm text-gray-900">{txData.nonce}</span>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-600">Position in Block:</span>
                <span className="text-sm text-gray-900">{txData.position}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mt-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Additional Information</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium text-gray-600">Transaction Type:</span>
              <span className="text-sm text-gray-900">2 (EIP-1559)</span>
            </div>

            <div className="flex justify-between items-start">
              <span className="text-sm font-medium text-gray-600">Method:</span>
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {txData.method}
              </div>
            </div>

            <div>
              <span className="text-sm font-medium text-gray-600 block mb-2">Input Data:</span>
              <div className="bg-gray-50 rounded-lg p-4 border">
                <code className="text-xs font-mono text-gray-700 break-all">
                  {txData.inputData}
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Link 
            href="/txs" 
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <span>← Back to Transactions</span>
          </Link>
          
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
              View on Block Explorer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionPage



