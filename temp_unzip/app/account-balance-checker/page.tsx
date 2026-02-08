'use client'

import React, { useState } from 'react'
import { Wallet, Copy, Check, RefreshCw, AlertCircle, Eye, EyeOff } from 'lucide-react'

interface BalanceInfo {
  address: string
  balance: string
  balanceUSD: string
  tokenCount: number
  tokens: {
    symbol: string
    name: string
    balance: string
    balanceUSD: string
    contractAddress: string
  }[]
}

const AccountBalanceCheckerPage = () => {
  const [address, setAddress] = useState('')
  const [balanceInfo, setBalanceInfo] = useState<BalanceInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [showPrivate, setShowPrivate] = useState(false)

  const handleCheckBalance = async () => {
    if (!address.trim()) {
      setError('Please enter a wallet address')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock balance data
      const mockBalanceInfo: BalanceInfo = {
        address: address,
        balance: '1.23456789',
        balanceUSD: '2,456.78',
        tokenCount: 5,
        tokens: [
          {
            symbol: 'AUR',
            name: 'Aurum',
            balance: '1.23456789',
            balanceUSD: '2,456.78',
            contractAddress: '0x0000000000000000000000000000000000000000'
          },
          {
            symbol: 'USDC',
            name: 'USD Coin',
            balance: '500.00',
            balanceUSD: '500.00',
            contractAddress: '0xA0b86a33E6441e9e3DF7d0E7B8a5C123456789abc'
          },
          {
            symbol: 'DAI',
            name: 'Dai Stablecoin',
            balance: '1,250.50',
            balanceUSD: '1,250.50',
            contractAddress: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063'
          },
          {
            symbol: 'WETH',
            name: 'Wrapped Ether',
            balance: '0.75',
            balanceUSD: '1,875.00',
            contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
          },
          {
            symbol: 'UNI',
            name: 'Uniswap',
            balance: '25.5',
            balanceUSD: '425.25',
            contractAddress: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'
          }
        ]
      }
      
      setBalanceInfo(mockBalanceInfo)
    } catch (err) {
      setError('Failed to fetch balance information. Please check the address format.')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const exampleAddresses = [
    '0x742d35Cc6634C0532925a3b8D82A5eB6fD7D4e7a',
    '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    '0xA0b86a33E6441e9e3DF7d0E7B8a5C123456789abc'
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Account Balance Checker</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Check wallet balances across multiple tokens and networks
                </p>
              </div>
              <div className="flex items-center space-x-2 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                <Wallet className="w-3 h-3" />
                <span>Live Data</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Check Balance</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Wallet Address
                  </label>
                  <div className="relative">
                    <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="0x742d35Cc6634C0532925a3b8D82A5eB6fD7D4e7a"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 font-mono text-sm"
                    />
                  </div>
                </div>
                
                <button
                  onClick={handleCheckBalance}
                  disabled={loading || !address.trim()}
                  className="w-full flex items-center justify-center space-x-2 bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Wallet className="w-4 h-4" />
                  )}
                  <span>Check Balance</span>
                </button>
              </div>
            </div>

            {/* Examples */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Example Addresses</h3>
              <div className="space-y-2">
                {exampleAddresses.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setAddress(example)}
                    className="block w-full text-left p-2 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors font-mono break-all"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-red-700">{error}</span>
                </div>
              </div>
            )}

            {balanceInfo ? (
              <div className="space-y-6">
                {/* Summary */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Balance Summary</h2>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setShowPrivate(!showPrivate)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {showPrivate ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <span className="text-xs text-gray-500">
                        {showPrivate ? 'Hide' : 'Show'} Values
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600">Total Balance</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {showPrivate ? balanceInfo.balance : '***.***'} AUR
                      </div>
                      <div className="text-sm text-gray-600">
                        ${showPrivate ? balanceInfo.balanceUSD : '***.***'}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600">Token Count</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {balanceInfo.tokenCount}
                      </div>
                      <div className="text-sm text-gray-600">tokens</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600">Address</div>
                      <div className="flex items-center space-x-2">
                        <code className="text-sm font-mono text-gray-900">
                          {balanceInfo.address.slice(0, 10)}...{balanceInfo.address.slice(-8)}
                        </code>
                        <button
                          onClick={() => copyToClipboard(balanceInfo.address)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Token Balances */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Token Balances</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Token
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Balance
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            USD Value
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contract
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {balanceInfo.tokens.map((token, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{token.symbol}</div>
                                <div className="text-sm text-gray-500">{token.name}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {showPrivate ? token.balance : '***.***'} {token.symbol}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                ${showPrivate ? token.balanceUSD : '***.***'}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <code className="text-xs font-mono text-blue-600">
                                  {token.contractAddress.slice(0, 8)}...{token.contractAddress.slice(-6)}
                                </code>
                                <button
                                  onClick={() => copyToClipboard(token.contractAddress)}
                                  className="text-gray-400 hover:text-gray-600"
                                >
                                  <Copy className="w-3 h-3" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : !loading && !error && (
              <div className="bg-white rounded-lg border border-gray-200 p-12">
                <div className="text-center">
                  <Wallet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Check Wallet Balance</h3>
                  <p className="text-gray-600">Enter a wallet address to view its token balances</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            About Balance Checker
          </h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              The Account Balance Checker allows you to view the token balances of any wallet address on the AUR blockchain.
            </p>
            <p>
              <strong>Features:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Check native AUR balance</li>
              <li>View all ERC-20 token balances</li>
              <li>Real-time USD value calculations</li>
              <li>Copy addresses and contract addresses</li>
              <li>Privacy toggle for sensitive information</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountBalanceCheckerPage
