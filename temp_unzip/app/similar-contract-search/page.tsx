'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Search, GitCompare, Code, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react'

const SimilarContractSearchPage = () => {
  const [contractAddress, setContractAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Array<{
    address: string
    name: string
    similarity: number
    verified: boolean
    deployedDate: string
    compiler: string
    matchingFunctions: string[]
    riskLevel: 'low' | 'medium' | 'high'
  }>>([])

  const handleSearch = async () => {
    if (!contractAddress.trim()) return
    
    setLoading(true)
    try {
      // TODO: Implement actual similar contract search
      // Mock similar contracts data
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockResults = [
        {
          address: '0x1234567890123456789012345678901234567890',
          name: 'ERC20Token',
          similarity: 95.8,
          verified: true,
          deployedDate: '2024-01-15',
          compiler: 'Solidity 0.8.19',
          matchingFunctions: ['transfer', 'approve', 'transferFrom', 'balanceOf'],
          riskLevel: 'low' as const
        },
        {
          address: '0x2345678901234567890123456789012345678901',
          name: 'SafeERC20',
          similarity: 87.3,
          verified: true,
          deployedDate: '2024-02-20',
          compiler: 'Solidity 0.8.18',
          matchingFunctions: ['transfer', 'approve', 'safeTransfer'],
          riskLevel: 'low' as const
        },
        {
          address: '0x3456789012345678901234567890123456789012',
          name: 'UnknownToken',
          similarity: 76.2,
          verified: false,
          deployedDate: '2024-03-10',
          compiler: 'Unknown',
          matchingFunctions: ['transfer', 'approve'],
          riskLevel: 'high' as const
        },
        {
          address: '0x4567890123456789012345678901234567890123',
          name: 'CustomToken',
          similarity: 68.9,
          verified: true,
          deployedDate: '2024-01-08',
          compiler: 'Solidity 0.8.17',
          matchingFunctions: ['transfer', 'mint', 'burn'],
          riskLevel: 'medium' as const
        }
      ]
      
      setResults(mockResults)
    } catch (error) {
      console.error('Error searching similar contracts:', error)
      alert('Failed to search for similar contracts')
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

  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 90) return 'text-green-600'
    if (similarity >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-yellow-600">Home</Link>
            <span>/</span>
            <Link href="/developers" className="hover:text-yellow-600">Developers</Link>
            <span>/</span>
            <span className="text-yellow-600">Similar Contract Search</span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <GitCompare className="w-8 h-8 text-yellow-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Similar Contract Search</h1>
              <p className="text-gray-600">Find contracts with similar code patterns and functionality</p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Search for Similar Contracts</h2>
          
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contract Address
              </label>
              <input
                type="text"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                placeholder="0x..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                disabled={loading || !contractAddress.trim()}
                className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <Search className="w-5 h-5" />
                )}
                <span>{loading ? 'Searching...' : 'Find Similar'}</span>
              </button>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <p>Enter a contract address to find other contracts with similar code patterns, function signatures, and behavior.</p>
            <p className="mt-1">Example: <code className="bg-gray-100 px-2 py-1 rounded">0xA0b86a33E6441e9e3DF7d0E7B8a5C123456789</code></p>
          </div>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Similar Contracts Found</h2>
              <p className="text-sm text-gray-600 mt-1">Found {results.length} contracts with similar patterns</p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contract</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Similarity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verification</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matching Functions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {results.map((contract, index) => (
                    <tr key={contract.address} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-medium text-gray-900">{contract.name}</div>
                          <Link 
                            href={`/address/${contract.address}`}
                            className="text-sm text-blue-600 hover:text-blue-800 font-mono"
                          >
                            {contract.address.slice(0, 8)}...{contract.address.slice(-6)}
                          </Link>
                          <div className="text-xs text-gray-500">{contract.deployedDate}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-lg font-bold ${getSimilarityColor(contract.similarity)}`}>
                          {contract.similarity.toFixed(1)}%
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className={`h-2 rounded-full ${
                              contract.similarity >= 90 ? 'bg-green-500' : 
                              contract.similarity >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${contract.similarity}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {contract.verified ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-red-500" />
                          )}
                          <div>
                            <div className={`text-sm font-medium ${contract.verified ? 'text-green-700' : 'text-red-700'}`}>
                              {contract.verified ? 'Verified' : 'Unverified'}
                            </div>
                            <div className="text-xs text-gray-500">{contract.compiler}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {contract.matchingFunctions.map((func, idx) => (
                            <span key={idx} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                              {func}()
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(contract.riskLevel)}`}>
                          {contract.riskLevel.charAt(0).toUpperCase() + contract.riskLevel.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                        <Link 
                          href={`/contract-diff-checker?contract1=${contractAddress}&contract2=${contract.address}`}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Compare
                        </Link>
                        <Link 
                          href={`/address/${contract.address}`}
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
          </div>
        )}

        {/* How it Works */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Bytecode Analysis</h3>
            <p className="text-gray-600 text-sm">
              Analyzes contract bytecode patterns to identify similar implementation approaches.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <GitCompare className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Function Matching</h3>
            <p className="text-gray-600 text-sm">
              Compares function signatures and identifies contracts with similar interfaces.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Risk Assessment</h3>
            <p className="text-gray-600 text-sm">
              Evaluates potential security risks based on contract patterns and verification status.
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-medium text-blue-900 mb-3">🔍 How Similar Contract Search Works</h3>
          <div className="text-sm text-blue-800 space-y-2">
            <p>
              Our algorithm analyzes contract bytecode, function signatures, and deployment patterns to find similar contracts.
            </p>
            <p>
              <strong>Similarity Score:</strong> Based on matching bytecode patterns, function signatures, and contract structure.
            </p>
            <p>
              <strong>Risk Assessment:</strong> Considers verification status, deployment date, and known security patterns.
            </p>
            <p>
              Use this tool to identify potential clones, find reference implementations, or assess contract uniqueness.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimilarContractSearchPage


