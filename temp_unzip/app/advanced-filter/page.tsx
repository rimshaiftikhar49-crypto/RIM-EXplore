'use client'

import React, { useState } from 'react'
import { Filter, Search, RefreshCw, Download, X, Plus } from 'lucide-react'

interface FilterCriteria {
  id: string
  type: 'address' | 'transaction' | 'block' | 'token' | 'value' | 'gas' | 'date'
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'between'
  value: string
  value2?: string
}

const AdvancedFilterPage = () => {
  const [filters, setFilters] = useState<FilterCriteria[]>([])
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [filterName, setFilterName] = useState('')

  const addFilter = () => {
    const newFilter: FilterCriteria = {
      id: Date.now().toString(),
      type: 'address',
      operator: 'equals',
      value: ''
    }
    setFilters([...filters, newFilter])
  }

  const updateFilter = (id: string, updates: Partial<FilterCriteria>) => {
    setFilters(filters.map(filter => 
      filter.id === id ? { ...filter, ...updates } : filter
    ))
  }

  const removeFilter = (id: string) => {
    setFilters(filters.filter(filter => filter.id !== id))
  }

  const handleSearch = async () => {
    if (filters.length === 0) return
    
    setLoading(true)
    // Simulate search
    setTimeout(() => {
      const mockResults = [
        {
          type: 'transaction',
          hash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890',
          from: '0x742d35Cc6634C0532925a3b8D82A5eB6fD7D4e7a',
          to: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
          value: '1.5',
          gasUsed: '21000',
          timestamp: Date.now() - 300000
        }
      ]
      setResults(mockResults)
      setLoading(false)
    }, 2000)
  }

  const getOperatorOptions = (type: string) => {
    switch (type) {
      case 'address':
        return [
          { value: 'equals', label: 'Equals' },
          { value: 'contains', label: 'Contains' }
        ]
      case 'value':
      case 'gas':
        return [
          { value: 'equals', label: 'Equals' },
          { value: 'greater_than', label: 'Greater than' },
          { value: 'less_than', label: 'Less than' },
          { value: 'between', label: 'Between' }
        ]
      case 'date':
        return [
          { value: 'equals', label: 'On' },
          { value: 'greater_than', label: 'After' },
          { value: 'less_than', label: 'Before' },
          { value: 'between', label: 'Between' }
        ]
      default:
        return [
          { value: 'equals', label: 'Equals' },
          { value: 'contains', label: 'Contains' }
        ]
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Advanced Filter</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Create complex queries to filter blockchain data
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Filter Builder */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Filter Criteria</h2>
                <button
                  onClick={addFilter}
                  className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Filter</span>
                </button>
              </div>

              {filters.length === 0 ? (
                <div className="text-center py-8">
                  <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Add filter criteria to start searching</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filters.map((filter) => (
                    <div key={filter.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-700">Filter {filters.indexOf(filter) + 1}</span>
                        <button
                          onClick={() => removeFilter(filter.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <select
                          value={filter.type}
                          onChange={(e) => updateFilter(filter.id, { type: e.target.value as any, operator: 'equals' })}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                        >
                          <option value="address">Address</option>
                          <option value="transaction">Transaction Hash</option>
                          <option value="block">Block Number</option>
                          <option value="token">Token</option>
                          <option value="value">Value</option>
                          <option value="gas">Gas</option>
                          <option value="date">Date</option>
                        </select>

                        <select
                          value={filter.operator}
                          onChange={(e) => updateFilter(filter.id, { operator: e.target.value as any })}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                        >
                          {getOperatorOptions(filter.type).map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>

                        <input
                          type="text"
                          value={filter.value}
                          onChange={(e) => updateFilter(filter.id, { value: e.target.value })}
                          placeholder="Enter value..."
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                        />

                        {filter.operator === 'between' && (
                          <input
                            type="text"
                            value={filter.value2 || ''}
                            onChange={(e) => updateFilter(filter.id, { value2: e.target.value })}
                            placeholder="End value..."
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Search Actions */}
            {filters.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handleSearch}
                      disabled={loading}
                      className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      {loading ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Search className="w-4 h-4" />
                      )}
                      <span>Search</span>
                    </button>
                    
                    <button className="flex items-center space-x-2 border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                      <span>Export</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={filterName}
                      onChange={(e) => setFilterName(e.target.value)}
                      placeholder="Save filter as..."
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    />
                    <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Results</h3>
              
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-600"></div>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-3">
                  {results.map((result, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3">
                      <div className="text-sm font-medium text-gray-900 mb-1">
                        Transaction
                      </div>
                      <div className="text-xs font-mono text-blue-600">
                        {result.hash.slice(0, 20)}...
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {result.value} AUR • {result.gasUsed} gas
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Search className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">No results yet</p>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Filter Types
              </h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p><strong>Address:</strong> Filter by wallet addresses</p>
                <p><strong>Transaction:</strong> Filter by transaction hashes</p>
                <p><strong>Block:</strong> Filter by block numbers</p>
                <p><strong>Token:</strong> Filter by token contracts</p>
                <p><strong>Value:</strong> Filter by transaction values</p>
                <p><strong>Gas:</strong> Filter by gas usage</p>
                <p><strong>Date:</strong> Filter by timestamps</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdvancedFilterPage
