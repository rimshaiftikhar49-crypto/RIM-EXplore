'use client'

import React, { useState } from 'react'
import { Code, Copy, Check, RefreshCw, AlertCircle } from 'lucide-react'

interface DecodedData {
  function: string
  signature: string
  parameters: {
    name: string
    type: string
    value: string
  }[]
}

const InputDataDecoderPage = () => {
  const [inputData, setInputData] = useState('')
  const [decodedData, setDecodedData] = useState<DecodedData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleDecode = async () => {
    if (!inputData.trim()) {
      setError('Please enter input data to decode')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      // Simulate decoding logic
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock decoded data based on common function signatures
      const mockDecodedData: DecodedData = {
        function: 'transfer(address,uint256)',
        signature: '0xa9059cbb',
        parameters: [
          {
            name: 'to',
            type: 'address',
            value: '0x742d35Cc6634C0532925a3b8D82A5eB6fD7D4e7a'
          },
          {
            name: 'amount',
            type: 'uint256',
            value: '1000000000000000000'
          }
        ]
      }
      
      setDecodedData(mockDecodedData)
    } catch (err) {
      setError('Failed to decode input data. Please check the format.')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatValue = (type: string, value: string) => {
    if (type === 'uint256') {
      return `${value} (${parseInt(value) / 1e18} tokens)`
    } else if (type === 'address') {
      return value
    }
    return value
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Input Data Decoder</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Decode transaction input data to human-readable format
                </p>
              </div>
              <div className="flex items-center space-x-2 text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                <span>Beta</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Input Data</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transaction Input Data (hex)
                  </label>
                  <textarea
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                    placeholder="0xa9059cbb000000000000000000000000742d35cc6634c0532925a3b8d82a5eb6fd7d4e7a0000000000000000000000000000000000000000000000000de0b6b3a7640000"
                    className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 font-mono text-sm"
                  />
                </div>
                
                <button
                  onClick={handleDecode}
                  disabled={loading || !inputData.trim()}
                  className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Code className="w-4 h-4" />
                  )}
                  <span>Decode Input Data</span>
                </button>
              </div>
            </div>

            {/* Examples */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Example Input Data</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">ERC20 Transfer</div>
                  <button
                    onClick={() => setInputData('0xa9059cbb000000000000000000000000742d35cc6634c0532925a3b8d82a5eb6fd7d4e7a0000000000000000000000000000000000000000000000000de0b6b3a7640000')}
                    className="text-xs font-mono text-blue-600 hover:text-blue-800 hover:underline break-all"
                  >
                    0xa9059cbb000000000000000000000000742d35cc6634c0532925a3b8d82a5eb6fd7d4e7a0000000000000000000000000000000000000000000000000de0b6b3a7640000
                  </button>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">ERC20 Approve</div>
                  <button
                    onClick={() => setInputData('0x095ea7b3000000000000000000000000742d35cc6634c0532925a3b8d82a5eb6fd7d4e7a0000000000000000000000000000000000000000000000000de0b6b3a7640000')}
                    className="text-xs font-mono text-blue-600 hover:text-blue-800 hover:underline break-all"
                  >
                    0x095ea7b3000000000000000000000000742d35cc6634c0532925a3b8d82a5eb6fd7d4e7a0000000000000000000000000000000000000000000000000de0b6b3a7640000
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Decoded Data</h2>
              
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-red-700">{error}</span>
                  </div>
                </div>
              )}

              {decodedData ? (
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Function</div>
                    <div className="flex items-center space-x-2">
                      <code className="px-3 py-2 bg-gray-100 rounded-lg text-sm font-mono">
                        {decodedData.function}
                      </code>
                      <button
                        onClick={() => copyToClipboard(decodedData.function)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Function Signature</div>
                    <div className="flex items-center space-x-2">
                      <code className="px-3 py-2 bg-gray-100 rounded-lg text-sm font-mono">
                        {decodedData.signature}
                      </code>
                      <button
                        onClick={() => copyToClipboard(decodedData.signature)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Parameters</div>
                    <div className="space-y-3">
                      {decodedData.parameters.map((param, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-medium text-gray-900">{param.name}</div>
                            <div className="text-xs text-gray-500 font-mono">{param.type}</div>
                          </div>
                          <div className="text-sm font-mono text-gray-700 break-all">
                            {formatValue(param.type, param.value)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : !loading && !error && (
                <div className="text-center py-8">
                  <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Enter input data to see decoded results</p>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How it works
              </h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p>
                  The Input Data Decoder analyzes the hexadecimal input data from transactions and converts it into human-readable format.
                </p>
                <p>
                  <strong>Supported formats:</strong>
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Function calls with parameters</li>
                  <li>ERC20 token operations</li>
                  <li>Smart contract interactions</li>
                  <li>Custom function signatures</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InputDataDecoderPage
