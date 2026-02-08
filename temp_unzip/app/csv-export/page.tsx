'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Download, FileText, Calendar, Filter, Settings } from 'lucide-react'

const CSVExportPage = () => {
  const [exportType, setExportType] = useState('transactions')
  const [address, setAddress] = useState('')
  const [dateRange, setDateRange] = useState({
    from: '',
    to: ''
  })
  const [filters, setFilters] = useState({
    minValue: '',
    maxValue: '',
    status: 'all',
    includeInternal: false
  })
  const [exporting, setExporting] = useState(false)

  const exportTypes = [
    { id: 'transactions', name: 'Transactions', description: 'Export transaction history' },
    { id: 'tokens', name: 'Token Transfers', description: 'Export ERC-20 token transfers' },
    { id: 'nfts', name: 'NFT Transfers', description: 'Export NFT transfers and trades' },
    { id: 'blocks', name: 'Blocks', description: 'Export block information' },
    { id: 'contracts', name: 'Contract Interactions', description: 'Export smart contract calls' }
  ]

  const handleExport = async () => {
    if (!address.trim() && exportType !== 'blocks') {
      alert('Please enter an address for this export type')
      return
    }
    
    setExporting(true)
    
    try {
      // TODO: Implement actual CSV export
      // Mock export process
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Generate mock CSV data
      const csvData = generateMockCSV()
      
      // Download CSV file
      const blob = new Blob([csvData], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${exportType}-${address.slice(0, 8)}-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      alert('CSV file downloaded successfully!')
    } catch (error) {
      console.error('Export error:', error)
      alert('Export failed. Please try again.')
    } finally {
      setExporting(false)
    }
  }

  const generateMockCSV = (): string => {
    switch (exportType) {
      case 'transactions':
        return `Hash,Block,Date,From,To,Value,Gas Price,Gas Used,Status
0x1234...,23394849,2025-01-19,0xabcd...,0xefgh...,1.5 ETH,20 Gwei,21000,Success
0x5678...,23394848,2025-01-19,0xijkl...,0xmnop...,0.5 ETH,18 Gwei,21000,Success`
      
      case 'tokens':
        return `Hash,Block,Date,Token,From,To,Amount,USD Value
0x1234...,23394849,2025-01-19,USDT,0xabcd...,0xefgh...,1000,1000.00
0x5678...,23394848,2025-01-19,USDC,0xijkl...,0xmnop...,500,500.00`
      
      case 'nfts':
        return `Hash,Block,Date,Collection,Token ID,From,To,Price
0x1234...,23394849,2025-01-19,BAYC,1234,0xabcd...,0xefgh...,50 ETH
0x5678...,23394848,2025-01-19,CryptoPunks,5678,0xijkl...,0xmnop...,100 ETH`
      
      default:
        return `Data exported successfully`
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-yellow-600">Home</Link>
            <span>/</span>
            <span className="text-yellow-600">CSV Export</span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="w-8 h-8 text-yellow-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">CSV Export Tool</h1>
              <p className="text-gray-600">Export blockchain data to CSV format for analysis</p>
            </div>
          </div>
        </div>

        {/* Export Configuration */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Export Configuration</h2>
          
          {/* Export Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Export Type</label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {exportTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setExportType(type.id)}
                  className={`p-4 text-left border rounded-lg transition-colors ${
                    exportType === type.id
                      ? 'border-yellow-300 bg-yellow-50 text-yellow-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium">{type.name}</div>
                  <div className="text-sm text-gray-600 mt-1">{type.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Address Input */}
          {exportType !== 'blocks' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address {exportType === 'contracts' ? '(Contract)' : '(Wallet)'}
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="0x..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
          )}

          {/* Date Range */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Date Range</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">From Date</label>
                <input
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">To Date</label>
                <input
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Filters (Optional)</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Min Value (ETH)</label>
                <input
                  type="number"
                  step="0.001"
                  value={filters.minValue}
                  onChange={(e) => setFilters({...filters, minValue: e.target.value})}
                  placeholder="0.001"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Max Value (ETH)</label>
                <input
                  type="number"
                  step="0.001"
                  value={filters.maxValue}
                  onChange={(e) => setFilters({...filters, maxValue: e.target.value})}
                  placeholder="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
            </div>
            
            <div className="mt-4 flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeInternal"
                  checked={filters.includeInternal}
                  onChange={(e) => setFilters({...filters, includeInternal: e.target.checked})}
                  className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                />
                <label htmlFor="includeInternal" className="ml-2 text-sm text-gray-700">
                  Include internal transactions
                </label>
              </div>
            </div>
          </div>

          {/* Export Button */}
          <div className="text-center">
            <button
              onClick={handleExport}
              disabled={exporting}
              className="px-8 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto transition-colors"
            >
              {exporting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <Download className="w-5 h-5" />
              )}
              <span>{exporting ? 'Exporting...' : 'Export to CSV'}</span>
            </button>
          </div>
        </div>

        {/* Export Limits */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-medium text-yellow-900 mb-3">📊 Export Limits</h3>
          <div className="text-sm text-yellow-800 space-y-2">
            <p>• <strong>Free accounts:</strong> Up to 1,000 records per export</p>
            <p>• <strong>Pro accounts:</strong> Up to 10,000 records per export</p>
            <p>• <strong>Enterprise accounts:</strong> Unlimited exports</p>
            <p>• Large exports may take several minutes to process</p>
            <p>• <Link href="/api-plans" className="text-yellow-600 hover:text-yellow-700 font-medium">Upgrade your account</Link> for higher limits</p>
          </div>
        </div>

        {/* Supported Formats */}
        <div className="mt-8 bg-white rounded-lg shadow border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Supported Data Types</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Transaction Data</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Transaction hash and block number</li>
                <li>• From and to addresses</li>
                <li>• Value and gas information</li>
                <li>• Transaction status and timestamp</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Token Data</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Token transfers and approvals</li>
                <li>• Token contract information</li>
                <li>• Transfer amounts and values</li>
                <li>• Token holder analytics</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CSVExportPage


