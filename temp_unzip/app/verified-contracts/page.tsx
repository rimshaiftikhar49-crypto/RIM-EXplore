'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Shield, Code, CheckCircle, ExternalLink, Search } from 'lucide-react'

const VerifiedContractsPage = () => {
  const [contracts, setContracts] = useState<Array<{
    address: string
    contractName: string
    compiler: string
    version: string
    balance: string
    txCount: number
    verifiedDate: string
    license: string
    optimization: boolean
    constructorArgs: boolean
  }>>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const contractsPerPage = 25

  useEffect(() => {
    fetchVerifiedContracts()
  }, [])

  const fetchVerifiedContracts = async () => {
    try {
      // TODO: Replace with real verified contracts API
      // Mock verified contracts data
      const contractNames = [
        'AURToken', 'MultiSigWallet', 'UniswapV2Router', 'CompoundProtocol', 'AaveProtocol',
        'ChainlinkOracle', 'OpenZeppelinProxy', 'GovernanceToken', 'StakingRewards', 'LiquidityPool',
        'NFTMarketplace', 'DecentralizedExchange', 'LendingProtocol', 'YieldFarming', 'TokenBridge'
      ]
      
      const licenses = ['MIT', 'GPL-3.0', 'Apache-2.0', 'BSD-3-Clause', 'Unlicense']
      const compilers = ['Solidity', 'Vyper']
      const versions = ['0.8.19', '0.8.18', '0.8.17', '0.8.16', '0.8.15', '0.7.6', '0.6.12']
      
      const mockContracts = Array.from({ length: 100 }, (_, i) => {
        const balance = Math.random() * 10000
        const txCount = Math.floor(Math.random() * 50000)
        const verifiedDate = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
        
        return {
          address: `0x${Math.random().toString(16).substr(2, 40)}`,
          contractName: contractNames[i % contractNames.length] + (i > 14 ? `_${Math.floor(i/15)}` : ''),
          compiler: compilers[Math.floor(Math.random() * compilers.length)],
          version: versions[Math.floor(Math.random() * versions.length)],
          balance: balance.toFixed(4),
          txCount,
          verifiedDate: verifiedDate.toLocaleDateString(),
          license: licenses[Math.floor(Math.random() * licenses.length)],
          optimization: Math.random() > 0.3,
          constructorArgs: Math.random() > 0.5
        }
      })

      // Sort by verification date (newest first)
      mockContracts.sort((a, b) => new Date(b.verifiedDate).getTime() - new Date(a.verifiedDate).getTime())
      
      setContracts(mockContracts)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching verified contracts:', error)
      setLoading(false)
    }
  }

  const filteredContracts = contracts.filter(contract =>
    contract.contractName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.address.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredContracts.length / contractsPerPage)
  const startIndex = (currentPage - 1) * contractsPerPage
  const currentContracts = filteredContracts.slice(startIndex, startIndex + contractsPerPage)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading verified contracts...</p>
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
            <span className="text-yellow-600">Verified Contracts</span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-8 h-8 text-yellow-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Verified Contracts</h1>
              <p className="text-gray-600">Smart contracts with verified and published source code</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{contracts.length.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Verified Contracts</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Code className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {contracts.filter(c => c.compiler === 'Solidity').length}
                </div>
                <div className="text-sm text-gray-600">Solidity Contracts</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Code className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {contracts.filter(c => c.compiler === 'Vyper').length}
                </div>
                <div className="text-sm text-gray-600">Vyper Contracts</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <div className="text-yellow-600 font-bold text-sm">%</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {((contracts.filter(c => c.optimization).length / contracts.length) * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">With Optimization</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by contract name or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Showing {currentContracts.length} of {filteredContracts.length} contracts
            </div>
          </div>
        </div>

        {/* Contracts Table */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Verified Smart Contracts</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contract Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compiler</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Txns</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verified</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">License</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentContracts.map((contract, index) => (
                  <tr key={contract.address} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link href={`/address/${contract.address}`} className="text-blue-600 hover:text-blue-800 font-mono text-sm">
                        {contract.address.slice(0, 8)}...{contract.address.slice(-6)}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{contract.contractName}</span>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-900">{contract.compiler}</span>
                        {contract.optimization && (
                          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">Optimized</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      v{contract.version}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {contract.balance} AUR
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {contract.txCount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contract.verifiedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold bg-gray-100 text-gray-800 rounded">
                        {contract.license}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1}-{Math.min(startIndex + contractsPerPage, filteredContracts.length)} of {filteredContracts.length} contracts
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-medium text-green-900 mb-3">✅ Benefits of Verified Contracts</h3>
            <div className="text-sm text-green-800 space-y-2">
              <p>• <strong>Transparency:</strong> Users can review the source code</p>
              <p>• <strong>Trust:</strong> Verified contracts are more trustworthy</p>
              <p>• <strong>Interaction:</strong> Enable direct contract interaction</p>
              <p>• <strong>Analysis:</strong> Better debugging and security analysis</p>
              <p>• <strong>Compliance:</strong> Meets regulatory requirements</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-medium text-blue-900 mb-3">🔍 How to Verify Your Contract</h3>
            <div className="text-sm text-blue-800 space-y-2">
              <p>1. Go to the <Link href="/verify-contract" className="text-yellow-600 hover:text-yellow-700 font-medium">Contract Verification</Link> page</p>
              <p>2. Enter your contract address and source code</p>
              <p>3. Select the correct compiler version and settings</p>
              <p>4. Provide constructor arguments if applicable</p>
              <p>5. Submit for verification - usually takes a few minutes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifiedContractsPage


