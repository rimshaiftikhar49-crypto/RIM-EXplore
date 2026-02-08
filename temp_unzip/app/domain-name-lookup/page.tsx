'use client'

import React, { useState } from 'react'
import { Search, Globe, Copy, Check, RefreshCw, AlertCircle, ExternalLink } from 'lucide-react'

interface DomainInfo {
  domain: string
  address: string
  reverse: boolean
  resolver: string
  ttl: number
  records: {
    type: string
    value: string
  }[]
  createdAt: string
  expiresAt?: string
}

const DomainNameLookupPage = () => {
  const [query, setQuery] = useState('')
  const [domainInfo, setDomainInfo] = useState<DomainInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleLookup = async () => {
    if (!query.trim()) {
      setError('Please enter a domain name or address')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock domain data
      const mockDomainInfo: DomainInfo = {
        domain: query.includes('.') ? query : 'example.aur',
        address: query.includes('.') ? '0x742d35Cc6634C0532925a3b8D82A5eB6fD7D4e7a' : query,
        reverse: !query.includes('.'),
        resolver: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
        ttl: 3600,
        records: [
          { type: 'A', value: '192.168.1.1' },
          { type: 'CNAME', value: 'example.com' },
          { type: 'TXT', value: 'v=spf1 include:_spf.google.com ~all' },
          { type: 'MX', value: '10 mail.example.com' }
        ],
        createdAt: '2024-01-15T10:30:00Z'
      }
      
      setDomainInfo(mockDomainInfo)
    } catch (err) {
      setError('Failed to lookup domain information. Please check the format.')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const exampleQueries = [
    'example.aur',
    'vitalik.aur',
    '0x742d35Cc6634C0532925a3b8D82A5eB6fD7D4e7a',
    'uniswap.aur'
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Domain Name Lookup</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Resolve AUR domain names to addresses and vice versa
                </p>
              </div>
              <div className="flex items-center space-x-2 text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                <Globe className="w-3 h-3" />
                <span>DNS</span>
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
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Domain Lookup</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Domain Name or Address
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="example.aur or 0x742d35Cc6634C0532925a3b8D82A5eB6fD7D4e7a"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      onKeyPress={(e) => e.key === 'Enter' && handleLookup()}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Enter a .aur domain name or wallet address
                  </p>
                </div>
                
                <button
                  onClick={handleLookup}
                  disabled={loading || !query.trim()}
                  className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                  <span>Lookup</span>
                </button>
              </div>
            </div>

            {/* Examples */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Example Queries</h3>
              <div className="space-y-2">
                {exampleQueries.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setQuery(example)}
                    className="block w-full text-left p-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-red-700">{error}</span>
                </div>
              </div>
            )}

            {domainInfo ? (
              <div className="space-y-6">
                {/* Main Result */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Lookup Result</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="text-sm text-gray-600">Domain</div>
                        <div className="text-lg font-semibold text-gray-900">{domainInfo.domain}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="w-5 h-5 text-yellow-600" />
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          {domainInfo.reverse ? 'Reverse Lookup' : 'Forward Lookup'}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Resolved Address</div>
                        <div className="flex items-center space-x-2">
                          <code className="px-3 py-2 bg-gray-100 rounded-lg text-sm font-mono flex-1">
                            {domainInfo.address}
                          </code>
                          <button
                            onClick={() => copyToClipboard(domainInfo.address)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-600 mb-1">Resolver Contract</div>
                        <div className="flex items-center space-x-2">
                          <code className="px-3 py-2 bg-gray-100 rounded-lg text-sm font-mono flex-1">
                            {domainInfo.resolver}
                          </code>
                          <button
                            onClick={() => copyToClipboard(domainInfo.resolver)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-600">TTL</div>
                          <div className="text-sm font-medium text-gray-900">{domainInfo.ttl} seconds</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Created</div>
                          <div className="text-sm font-medium text-gray-900">
                            {new Date(domainInfo.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* DNS Records */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">DNS Records</h3>
                  <div className="space-y-3">
                    {domainInfo.records.map((record, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">
                            {record.type}
                          </div>
                          <div className="text-sm font-mono text-gray-900">{record.value}</div>
                        </div>
                        <button
                          onClick={() => copyToClipboard(record.value)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`/address/${domainInfo.address}`}
                      className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>View Address</span>
                    </a>
                    <button
                      onClick={() => copyToClipboard(domainInfo.address)}
                      className="flex items-center space-x-2 border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>Copy Address</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : !loading && !error && (
              <div className="bg-white rounded-lg border border-gray-200 p-12">
                <div className="text-center">
                  <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Domain Lookup</h3>
                  <p className="text-gray-600">Enter a domain name or address to resolve</p>
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
            About Domain Name Lookup
          </h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              AUR domains allow users to associate human-readable names with blockchain addresses, making it easier to send and receive cryptocurrency.
            </p>
            <p>
              <strong>Features:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Resolve .aur domain names to addresses</li>
              <li>Reverse lookup addresses to domain names</li>
              <li>View DNS records and resolver information</li>
              <li>Copy addresses and contract addresses</li>
              <li>Navigate directly to address pages</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DomainNameLookupPage
