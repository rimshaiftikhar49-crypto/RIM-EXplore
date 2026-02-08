'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Book, Code, Copy, ExternalLink, ChevronRight } from 'lucide-react'

const APIDocsPage = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string | null>(null)

  const apiEndpoints = [
    {
      id: 'blocks',
      title: 'Blocks API',
      description: 'Get blockchain block information',
      endpoints: [
        {
          method: 'GET',
          path: '/api/blocks',
          description: 'Get latest blocks',
          parameters: [
            { name: 'limit', type: 'number', description: 'Number of blocks to return (default: 10)' },
            { name: 'offset', type: 'number', description: 'Offset for pagination (default: 0)' }
          ],
          example: `curl "https://aur-explorer.com/api/blocks?limit=5&offset=0"`,
          response: `{
  "success": true,
  "data": [
    {
      "number": 23394849,
      "timestamp": 1758266356022,
      "miner": "Titan Builder",
      "txCount": 264,
      "gasUsed": "12000000",
      "reward": "0.00881",
      "hash": "0x1234567890abcdef...",
      "timeAgo": "9 secs ago"
    }
  ],
  "total": 1000
}`
        }
      ]
    },
    {
      id: 'transactions',
      title: 'Transactions API',
      description: 'Get transaction data',
      endpoints: [
        {
          method: 'GET',
          path: '/api/transactions',
          description: 'Get latest transactions',
          parameters: [
            { name: 'limit', type: 'number', description: 'Number of transactions to return (default: 10)' },
            { name: 'offset', type: 'number', description: 'Offset for pagination (default: 0)' }
          ],
          example: `curl "https://aur-explorer.com/api/transactions?limit=5"`,
          response: `{
  "success": true,
  "data": [
    {
      "hash": "0x3d6d9c0ead...",
      "from": "0x4833B106...B0BAD5f97",
      "to": "0x7a987584...b93ab8C14",
      "value": "0.0087",
      "timeAgo": "9 secs ago"
    }
  ],
  "total": 5000000
}`
        }
      ]
    },
    {
      id: 'stats',
      title: 'Network Stats API',
      description: 'Get network statistics',
      endpoints: [
        {
          method: 'GET',
          path: '/api/stats',
          description: 'Get current network statistics',
          parameters: [],
          example: `curl "https://aur-explorer.com/api/stats"`,
          response: `{
  "success": true,
  "data": {
    "aurPrice": {
      "usd": 4554.69,
      "btc": 0.038914,
      "change24h": -1.28
    },
    "marketCap": 549769119347,
    "totalTransactions": 2999670000,
    "tps": 19.4,
    "lastFinalizedBlock": 23394757,
    "lastSafeBlock": 23394821,
    "gasPrice": {
      "gwei": 0.199,
      "usd": 0.02
    }
  },
  "timestamp": 1758266356022
}`
        }
      ]
    },
    {
      id: 'tokens',
      title: 'Tokens API',
      description: 'Get token information',
      endpoints: [
        {
          method: 'GET',
          path: '/api/tokens',
          description: 'Get token list with pagination and sorting',
          parameters: [
            { name: 'limit', type: 'number', description: 'Number of tokens to return (default: 50)' },
            { name: 'offset', type: 'number', description: 'Offset for pagination (default: 0)' },
            { name: 'sortBy', type: 'string', description: 'Sort by field: marketCap, volume, price, holders' },
            { name: 'order', type: 'string', description: 'Sort order: asc or desc (default: desc)' }
          ],
          example: `curl "https://aur-explorer.com/api/tokens?limit=10&sortBy=marketCap&order=desc"`,
          response: `{
  "success": true,
  "data": [
    {
      "address": "0xA0b86a33E6441e9e3DF7d0E7B8a5C123456789",
      "name": "AUR Token",
      "symbol": "AUR",
      "decimals": 18,
      "price": 4554.69,
      "marketCap": 549769119347,
      "volume24h": 15000000000,
      "change24h": -1.28,
      "holders": 150000
    }
  ],
  "total": 1000,
  "pagination": {
    "limit": 10,
    "offset": 0,
    "hasMore": true
  }
}`
        }
      ]
    },
    {
      id: 'search',
      title: 'Search API',
      description: 'Search blockchain data',
      endpoints: [
        {
          method: 'GET',
          path: '/api/search',
          description: 'Search for addresses, transactions, blocks, or tokens',
          parameters: [
            { name: 'q', type: 'string', description: 'Search query (address, tx hash, block number, token symbol)' }
          ],
          example: `curl "https://aur-explorer.com/api/search?q=0x1234567890abcdef"`,
          response: `{
  "success": true,
  "data": [
    {
      "type": "address",
      "address": "0x1234567890abcdef...",
      "found": true
    }
  ],
  "query": "0x1234567890abcdef"
}`
        }
      ]
    }
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
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
            <span className="text-yellow-600">API Documentation</span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Book className="w-8 h-8 text-yellow-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AUR Explorer API Documentation</h1>
              <p className="text-gray-600">RESTful API for accessing AUR blockchain data</p>
            </div>
          </div>
        </div>

        {/* Quick Start */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Quick Start</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Base URL</h3>
                <div className="bg-gray-100 rounded p-3 font-mono text-sm">
                  https://aur-explorer.com
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Response Format</h3>
                <div className="bg-gray-100 rounded p-3 font-mono text-sm">
                  JSON
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="font-medium text-gray-900 mb-2">Authentication</h3>
              <p className="text-gray-600 text-sm">
                No authentication required for public endpoints. Rate limiting applies: 100 requests per minute.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 sticky top-8">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">API Endpoints</h3>
              </div>
              <div className="p-2">
                {apiEndpoints.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedEndpoint(selectedEndpoint === category.id ? null : category.id)}
                    className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center justify-between transition-colors"
                  >
                    <span className="font-medium text-gray-700">{category.title}</span>
                    <ChevronRight className={`w-4 h-4 text-gray-400 transform transition-transform ${selectedEndpoint === category.id ? 'rotate-90' : ''}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedEndpoint ? (
              <div className="space-y-6">
                {apiEndpoints
                  .filter(category => category.id === selectedEndpoint)
                  .map(category => (
                    <div key={category.id}>
                      <div className="bg-white rounded-lg shadow-lg border border-gray-200">
                        <div className="px-6 py-4 border-b border-gray-200">
                          <h2 className="text-2xl font-semibold text-gray-900">{category.title}</h2>
                          <p className="text-gray-600 mt-1">{category.description}</p>
                        </div>
                        
                        {category.endpoints.map((endpoint, idx) => (
                          <div key={idx} className="p-6 border-b border-gray-200 last:border-b-0">
                            <div className="flex items-center space-x-3 mb-4">
                              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                {endpoint.method}
                              </span>
                              <code className="font-mono text-lg text-gray-900">{endpoint.path}</code>
                            </div>
                            
                            <p className="text-gray-600 mb-4">{endpoint.description}</p>
                            
                            {/* Parameters */}
                            {endpoint.parameters.length > 0 && (
                              <div className="mb-6">
                                <h4 className="font-medium text-gray-900 mb-3">Parameters</h4>
                                <div className="overflow-x-auto">
                                  <table className="min-w-full">
                                    <thead>
                                      <tr className="bg-gray-50">
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Type</th>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Description</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                      {endpoint.parameters.map((param, paramIdx) => (
                                        <tr key={paramIdx}>
                                          <td className="px-4 py-2 text-sm font-mono text-gray-900">{param.name}</td>
                                          <td className="px-4 py-2 text-sm text-gray-600">{param.type}</td>
                                          <td className="px-4 py-2 text-sm text-gray-600">{param.description}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}
                            
                            {/* Example Request */}
                            <div className="mb-6">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-gray-900">Example Request</h4>
                                <button
                                  onClick={() => copyToClipboard(endpoint.example)}
                                  className="text-sm text-yellow-600 hover:text-yellow-700 flex items-center space-x-1"
                                >
                                  <Copy className="w-3 h-3" />
                                  <span>Copy</span>
                                </button>
                              </div>
                              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                                <code>{endpoint.example}</code>
                              </pre>
                            </div>
                            
                            {/* Example Response */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-gray-900">Example Response</h4>
                                <button
                                  onClick={() => copyToClipboard(endpoint.response)}
                                  className="text-sm text-yellow-600 hover:text-yellow-700 flex items-center space-x-1"
                                >
                                  <Copy className="w-3 h-3" />
                                  <span>Copy</span>
                                </button>
                              </div>
                              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                                <code>{endpoint.response}</code>
                              </pre>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-12 text-center">
                <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">Select an API Endpoint</h3>
                <p className="text-gray-600">Choose an endpoint from the sidebar to view detailed documentation</p>
              </div>
            )}
          </div>
        </div>

        {/* Rate Limits & Support */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rate Limits</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Free tier:</span>
                <span className="font-medium">100 requests/minute</span>
              </div>
              <div className="flex justify-between">
                <span>Pro tier:</span>
                <span className="font-medium">1,000 requests/minute</span>
              </div>
              <div className="flex justify-between">
                <span>Enterprise:</span>
                <span className="font-medium">Custom limits</span>
              </div>
            </div>
            <Link 
              href="/api-plans"
              className="inline-flex items-center space-x-1 text-yellow-600 hover:text-yellow-700 text-sm font-medium mt-4"
            >
              <span>View API Plans</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div>
                <span className="font-medium">Email Support:</span>
                <br />
                <a href="mailto:api@aur-explorer.com" className="text-yellow-600 hover:text-yellow-700">
                  api@aur-explorer.com
                </a>
              </div>
              <div>
                <span className="font-medium">Community Discord:</span>
                <br />
                <a href="#" className="text-yellow-600 hover:text-yellow-700">
                  Join our Discord server
                </a>
              </div>
              <div>
                <span className="font-medium">Status Page:</span>
                <br />
                <a href="#" className="text-yellow-600 hover:text-yellow-700">
                  status.aur-explorer.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default APIDocsPage


