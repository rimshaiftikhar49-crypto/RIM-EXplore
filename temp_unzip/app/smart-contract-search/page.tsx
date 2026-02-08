'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Search, Code, Hash, Clock, Star, Filter, RefreshCw } from 'lucide-react'

interface SmartContract {
  address: string
  name: string
  description: string
  compiler: string
  version: string
  verifiedAt: string
  functions: number
  events: number
  sourceCode: string
  abi: any[]
  license: string
  creator: string
  gasUsed: string
}

const SmartContractSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [contracts, setContracts] = useState<SmartContract[]>([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('all')

  // Mock data for demonstration
  const mockContracts: SmartContract[] = [
    {
      address: '0x742d35Cc6634C0532925a3b8D82A5eB6fD7D4e7a',
      name: 'ERC20Token',
      description: 'Standard ERC20 token implementation with additional features',
      compiler: 'solidity',
      version: '0.8.19',
      verifiedAt: '2024-01-15',
      functions: 15,
      events: 3,
      sourceCode: 'contract ERC20Token { ... }',
      abi: [],
      license: 'MIT',
      creator: '0x1234...5678',
      gasUsed: '1,234,567'
    },
    {
      address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
      name: 'DaiStablecoin',
      description: 'Dai stablecoin contract - MakerDAO',
      compiler: 'solidity',
      version: '0.5.12',
      verifiedAt: '2024-01-10',
      functions: 28,
      events: 8,
      sourceCode: 'contract DaiStablecoin { ... }',
      abi: [],
      license: 'GPL-3.0',
      creator: '0xabcd...efgh',
      gasUsed: '2,345,678'
    },
    {
      address: '0xA0b86a33E6441e9e3DF7d0E7B8a5C123456789abc',
      name: 'UniswapV2Factory',
      description: 'Uniswap V2 Factory contract for creating trading pairs',
      compiler: 'solidity',
      version: '0.5.16',
      verifiedAt: '2024-01-08',
      functions: 12,
      events: 4,
      sourceCode: 'contract UniswapV2Factory { ... }',
      abi: [],
      license: 'MIT',
      creator: '0x9876...5432',
      gasUsed: '987,654'
    }
  ]

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      const filtered = mockContracts.filter(contract => 
        contract.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contract.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contract.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setContracts(filtered)
      setLoading(false)
    }, 1000)
  }

  const filteredContracts = contracts.filter(contract => {
    if (filter === 'all') return true
    if (filter === 'erc20') return contract.name.toLowerCase().includes('erc20')
    if (filter === 'factory') return contract.name.toLowerCase().includes('factory')
    if (filter === 'token') return contract.name.toLowerCase().includes('token')
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Smart Contract Search</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Search and explore verified smart contracts on AUR blockchain
                </p>
              </div>
              <Link 
                href="/verify-contract"
                className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Code className="w-4 h-4" />
                <span>Verify Contract</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by contract name, address, or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-lg"
                  />
                </div>
              </div>
              <button
                onClick={handleSearch}
                disabled={loading}
                className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg transition-colors"
              >
                {loading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
                <span>Search</span>
              </button>
            </div>

            {/* Filters */}
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  filter === 'all' 
                    ? 'bg-yellow-100 text-yellow-700 border border-yellow-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Contracts
              </button>
              <button
                onClick={() => setFilter('erc20')}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  filter === 'erc20' 
                    ? 'bg-yellow-100 text-yellow-700 border border-yellow-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                ERC20 Tokens
              </button>
              <button
                onClick={() => setFilter('factory')}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  filter === 'factory' 
                    ? 'bg-yellow-100 text-yellow-700 border border-yellow-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Factory Contracts
              </button>
              <button
                onClick={() => setFilter('token')}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  filter === 'token' 
                    ? 'bg-yellow-100 text-yellow-700 border border-yellow-300' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Token Contracts
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
          </div>
        ) : filteredContracts.length > 0 ? (
          <div className="space-y-4">
            <div className="text-sm text-gray-600">
              Found {filteredContracts.length} contract{filteredContracts.length !== 1 ? 's' : ''}
            </div>
            
            {filteredContracts.map((contract) => (
              <div key={contract.address} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{contract.name}</h3>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        Verified
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{contract.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider">Contract Address</div>
                        <Link 
                          href={`/address/${contract.address}`}
                          className="text-sm font-mono text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {contract.address.slice(0, 10)}...{contract.address.slice(-8)}
                        </Link>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider">Compiler</div>
                        <div className="text-sm text-gray-900">{contract.compiler} {contract.version}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider">Functions</div>
                        <div className="text-sm text-gray-900">{contract.functions}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider">Events</div>
                        <div className="text-sm text-gray-900">{contract.events}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>Verified {contract.verifiedAt}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Hash className="w-3 h-3" />
                        <span>Gas Used: {contract.gasUsed}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3" />
                        <span>License: {contract.license}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <Link
                      href={`/address/${contract.address}`}
                      className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm rounded-lg transition-colors text-center"
                    >
                      View Contract
                    </Link>
                    <button className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm rounded-lg transition-colors">
                      View Source
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : searchQuery ? (
          <div className="text-center py-12">
            <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No contracts found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters</p>
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Search Smart Contracts</h3>
            <p className="text-gray-600">Enter a contract name, address, or description to get started</p>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            About Smart Contract Search
          </h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              Search through verified smart contracts deployed on the AUR blockchain. All contracts shown here have been verified and their source code is publicly available.
            </p>
            <p>
              <strong>Features:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Search by contract name, address, or description</li>
              <li>Filter by contract type (ERC20, Factory, Token, etc.)</li>
              <li>View verified source code and ABI</li>
              <li>Access contract functions and events</li>
              <li>Check compilation details and gas usage</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SmartContractSearchPage
