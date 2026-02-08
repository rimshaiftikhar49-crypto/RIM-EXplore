'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Send, AlertTriangle, CheckCircle, Info, ExternalLink } from 'lucide-react'

const BroadcastTransactionPage = () => {
  const [rawTransaction, setRawTransaction] = useState('')
  const [broadcasting, setBroadcasting] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    txHash?: string
    error?: string
  } | null>(null)

  const handleBroadcast = async () => {
    if (!rawTransaction.trim()) return
    
    setBroadcasting(true)
    setResult(null)
    
    try {
      // TODO: Implement actual transaction broadcasting
      // For demo purposes, simulate the broadcast process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulate success/failure
      const success = Math.random() > 0.2
      
      if (success) {
        const mockTxHash = '0x' + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('')
        setResult({
          success: true,
          txHash: mockTxHash
        })
      } else {
        setResult({
          success: false,
          error: 'Transaction rejected: insufficient funds or invalid signature'
        })
      }
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      })
    } finally {
      setBroadcasting(false)
    }
  }

  const loadExample = () => {
    setRawTransaction('0xf86c0a8504a817c800825208943535353535353535353535353535353535353535880de0b6b3a76400008025a04f4c17305743700648bc4f6cd3038ec6f6af0df73e31757d64a07e776bb2dfe47a07e1d3be5151e95363a726b0a4fcfe7f6c7a8b9b1c7a8b9b1c7a8b9b1c7a8b9b1')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-yellow-600">Home</Link>
            <span>/</span>
            <Link href="/developers" className="hover:text-yellow-600">Developers</Link>
            <span>/</span>
            <span className="text-yellow-600">Broadcast Transaction</span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Send className="w-8 h-8 text-yellow-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Broadcast Raw Transaction</h1>
              <p className="text-gray-600">Submit a signed raw transaction to the AUR network</p>
            </div>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-1">Important Security Notice:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Only broadcast transactions that you have signed yourself</li>
                <li>Never share your private keys or seed phrases</li>
                <li>Double-check transaction details before broadcasting</li>
                <li>Transactions cannot be reversed once confirmed</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">How to use this tool:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Sign your transaction offline using a wallet or signing tool</li>
                <li>Copy the raw transaction hex data (including 0x prefix)</li>
                <li>Paste it in the field below and click "Broadcast Transaction"</li>
                <li>The transaction will be submitted to the AUR network</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Broadcast Form */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Raw Transaction Data</h2>
            <button
              onClick={loadExample}
              className="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
            >
              Load Example
            </button>
          </div>

          <div className="p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Signed Raw Transaction *
              </label>
              <textarea
                value={rawTransaction}
                onChange={(e) => setRawTransaction(e.target.value)}
                placeholder="0xf86c0a8504a817c800825208943535353535353535353535353535353535353535880de0b6b3a76400008025a04f4c17305743700648bc4f6cd3038ec6f6af0df73e31757d64a07e776bb2dfe47a07e1d3be5151e95363a726b0a4fcfe7f6c7a8b9b1c7a8b9b1c7a8b9b1c7a8b9b1"
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 font-mono text-sm"
              />
              <p className="mt-2 text-sm text-gray-600">
                Enter the complete signed transaction hex string (must start with 0x)
              </p>
            </div>

            {/* Transaction Info */}
            {rawTransaction.trim() && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Transaction Preview:</h3>
                <div className="text-sm text-gray-600 space-y-1 font-mono">
                  <div>Length: {rawTransaction.replace(/^0x/, '').length / 2} bytes</div>
                  <div>Valid Format: {rawTransaction.startsWith('0x') && rawTransaction.length > 10 ? '✅' : '❌'}</div>
                </div>
              </div>
            )}

            {/* Broadcast Button */}
            <button
              onClick={handleBroadcast}
              disabled={broadcasting || !rawTransaction.trim() || !rawTransaction.startsWith('0x')}
              className="w-full px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-colors"
            >
              {broadcasting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Broadcasting Transaction...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Broadcast Transaction</span>
                </>
              )}
            </button>
          </div>

          {/* Result Display */}
          {result && (
            <div className="px-6 py-4 border-t border-gray-200">
              {result.success ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-green-800 mb-2">Transaction Broadcasted Successfully!</p>
                      <div className="text-sm text-green-700">
                        <p className="mb-2">Your transaction has been submitted to the network.</p>
                        <div className="bg-white rounded p-3 border border-green-200">
                          <p className="font-medium mb-1">Transaction Hash:</p>
                          <div className="flex items-center justify-between">
                            <code className="text-sm font-mono text-gray-800 break-all">{result.txHash}</code>
                            <Link 
                              href={`/tx/${result.txHash}`}
                              className="ml-4 text-yellow-600 hover:text-yellow-700 flex items-center space-x-1 text-sm font-medium"
                            >
                              <span>View</span>
                              <ExternalLink className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                        <p className="mt-2 text-xs">
                          Note: It may take a few moments for the transaction to be confirmed and appear in the explorer.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800 mb-1">Transaction Broadcast Failed</p>
                      <p className="text-sm text-red-700">{result.error}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Common Use Cases</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Broadcasting transactions signed offline for security</li>
              <li>• Submitting transactions from hardware wallets</li>
              <li>• Testing custom transaction formats</li>
              <li>• Recovering stuck transactions with higher gas prices</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Troubleshooting</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Ensure the transaction is properly signed</li>
              <li>• Check that you have sufficient balance for gas fees</li>
              <li>• Verify the transaction format is valid</li>
              <li>• Make sure the nonce is correct for your account</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BroadcastTransactionPage


