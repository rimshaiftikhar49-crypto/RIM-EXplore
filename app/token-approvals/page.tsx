'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Shield, AlertTriangle, CheckCircle, Search, ExternalLink } from 'lucide-react'

const TokenApprovalsPage = () => {
  const [walletAddress, setWalletAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [approvals, setApprovals] = useState<Array<{
    token: string
    tokenName: string
    spender: string
    spenderName: string
    allowance: string
    risk: 'low' | 'medium' | 'high'
    lastUsed: string
  }>>([])

  const handleSearch = async () => {
    if (!walletAddress.trim()) return
    
    setLoading(true)
    try {
      // TODO: Replace with real approval data fetching
      // Mock approval data
      const mockApprovals = [
        {
          token: '0xA0b86a33E6441e9e3DF7d0E7B8a5C123456789',
          tokenName: 'AUR Token',
          spender: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
          spenderName: 'Uniswap V2 Router',
          allowance: 'Unlimited',
          risk: 'medium' as const,
          lastUsed: '2 days ago'
        },
        {
          token: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          tokenName: 'USDT',
          spender: '0x1f98431c8aD98523631AE4a59f267346ea31F984',
          spenderName: 'Uniswap V3 Router',
          allowance: '50,000 USDT',
          risk: 'low' as const,
          lastUsed: '1 week ago'
        },
        {
          token: '0xA0b473E6441e9e3DF7d0E7B8a5C987654321',
          tokenName: 'USDC',
          spender: '0x3328F5f2cEcAF00a2443082B657CedeAF70bfAEf',
          spenderName: 'Unknown Contract',
          allowance: 'Unlimited',
          risk: 'high' as const,
          lastUsed: '3 months ago'
        }
      ]
      
      setApprovals(mockApprovals)
    } catch (error) {
      console.error('Error fetching approvals:', error)
      alert('Failed to fetch token approvals')
    } finally {
      setLoading(false)
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'high': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low': return <CheckCircle className="w-4 h-4" />
      case 'medium': return <Shield className="w-4 h-4" />
      case 'high': return <AlertTriangle className="w-4 h-4" />
      default: return <Shield className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-yellow-600">Home</Link>
            <span>/</span>
            <span className="text-yellow-600">Token Approvals</span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-8 h-8 text-yellow-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Token Approvals</h1>
              <p className="text-gray-600">Monitor and manage your token spending approvals</p>
            </div>
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded font-medium">Beta</span>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-1">Security Notice:</p>
              <p>
                Token approvals allow smart contracts to spend your tokens. Review and revoke unnecessary approvals to protect your assets. 
                Unlimited approvals pose higher risks if contracts are compromised.
              </p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Check Token Approvals</h2>
          
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Wallet Address
              </label>
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="0x..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                disabled={loading || !walletAddress.trim()}
                className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <Search className="w-5 h-5" />
                )}
                <span>{loading ? 'Searching...' : 'Check Approvals'}</span>
              </button>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <p>Enter a wallet address to view all token approvals and their risk levels.</p>
            <p className="mt-1">Example: <code className="bg-gray-100 px-2 py-1 rounded">0x742d35Cc6634C0532925a3b8D82A5eB6fD7D4</code></p>
          </div>
        </div>

        {/* Results */}
        {approvals.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Active Token Approvals</h2>
                <p className="text-sm text-gray-600">Found {approvals.length} active approvals</p>
              </div>
              <div className="text-sm text-gray-500">
                Address: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Token</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approved Spender</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allowance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Used</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {approvals.map((approval, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-medium text-gray-900">{approval.tokenName}</div>
                          <div className="text-sm text-gray-500 font-mono">
                            {approval.token.slice(0, 6)}...{approval.token.slice(-4)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-medium text-gray-900">{approval.spenderName}</div>
                          <div className="text-sm text-gray-500 font-mono">
                            {approval.spender.slice(0, 6)}...{approval.spender.slice(-4)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{approval.allowance}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(approval.risk)}`}>
                          {getRiskIcon(approval.risk)}
                          <span className="capitalize">{approval.risk}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {approval.lastUsed}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                        <button className="text-yellow-600 hover:text-yellow-700 font-medium">
                          Revoke
                        </button>
                        <Link 
                          href={`/tx/${approval.spender}`}
                          className="text-gray-600 hover:text-gray-700 font-medium inline-flex items-center space-x-1"
                        >
                          <span>View</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center text-sm">
                <div className="flex space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Low Risk: {approvals.filter(a => a.risk === 'low').length}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>Medium Risk: {approvals.filter(a => a.risk === 'medium').length}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>High Risk: {approvals.filter(a => a.risk === 'high').length}</span>
                  </div>
                </div>
                <button className="text-red-600 hover:text-red-700 font-medium">
                  Revoke All High Risk
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Understanding Risk Levels</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-green-700">Low Risk</p>
                  <p>Well-known, audited protocols with limited allowances</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-yellow-100 rounded-full flex items-center justify-center mt-0.5">
                  <Shield className="w-3 h-3 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-yellow-700">Medium Risk</p>
                  <p>Popular protocols with unlimited approvals</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                  <AlertTriangle className="w-3 h-3 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-red-700">High Risk</p>
                  <p>Unknown contracts or unused approvals</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Security Best Practices</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Regularly review and revoke unused approvals</li>
              <li>• Avoid unlimited approvals when possible</li>
              <li>• Only approve trusted, audited contracts</li>
              <li>• Revoke approvals for inactive protocols</li>
              <li>• Monitor approval activity regularly</li>
              <li>• Use hardware wallets for high-value accounts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TokenApprovalsPage


