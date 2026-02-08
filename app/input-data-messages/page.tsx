'use client'

import React, { useState } from 'react'
import { MessageSquare, Copy, Check, RefreshCw, AlertCircle, Hash, Clock } from 'lucide-react'

interface DataMessage {
  id: string
  transactionHash: string
  blockNumber: number
  from: string
  to: string
  message: string
  timestamp: number
  timeAgo: string
  gasUsed: string
  status: 'success' | 'failed'
}

const InputDataMessagesPage = () => {
  const [messages, setMessages] = useState<DataMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')

  // Mock data for demonstration
  React.useEffect(() => {
    const mockMessages: DataMessage[] = [
      {
        id: '1',
        transactionHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890',
        blockNumber: 18945678,
        from: '0x742d35Cc6634C0532925a3b8D82A5eB6fD7D4e7a',
        to: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
        message: 'Transfer 1000 AUR tokens to user wallet',
        timestamp: Date.now() - 300000,
        timeAgo: '5 mins ago',
        gasUsed: '21,000',
        status: 'success'
      },
      {
        id: '2',
        transactionHash: '0x2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890ab',
        blockNumber: 18945679,
        from: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
        to: '0xA0b86a33E6441e9e3DF7d0E7B8a5C123456789abc',
        message: 'Approve spending of 500 AUR tokens for DEX contract',
        timestamp: Date.now() - 600000,
        timeAgo: '10 mins ago',
        gasUsed: '46,000',
        status: 'success'
      },
      {
        id: '3',
        transactionHash: '0x3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcd',
        blockNumber: 18945680,
        from: '0xA0b86a33E6441e9e3DF7d0E7B8a5C123456789abc',
        to: '0x742d35Cc6634C0532925a3b8D82A5eB6fD7D4e7a',
        message: 'Failed: Insufficient balance for swap operation',
        timestamp: Date.now() - 900000,
        timeAgo: '15 mins ago',
        gasUsed: '0',
        status: 'failed'
      }
    ]

    setMessages(mockMessages)
    setLoading(false)
  }, [])

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = searchQuery === '' || 
      msg.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.transactionHash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.to.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = filter === 'all' || 
      (filter === 'success' && msg.status === 'success') ||
      (filter === 'failed' && msg.status === 'failed')
    
    return matchesSearch && matchesFilter
  })

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Input Data Messages</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Decode and view human-readable messages from transaction input data
                </p>
              </div>
              <div className="flex items-center space-x-2 text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                <span>Beta</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by message content, transaction hash, or address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="all">All Messages</option>
                <option value="success">Successful</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Total Messages</div>
              <div className="text-2xl font-bold text-gray-900">{messages.length}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Successful</div>
              <div className="text-2xl font-bold text-green-600">
                {messages.filter(m => m.status === 'success').length}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Failed</div>
              <div className="text-2xl font-bold text-red-600">
                {messages.filter(m => m.status === 'failed').length}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Showing</div>
              <div className="text-2xl font-bold text-gray-900">{filteredMessages.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <div key={message.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Status and Message */}
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        message.status === 'success' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {message.status === 'success' ? 'Success' : 'Failed'}
                      </div>
                      <div className="text-sm text-gray-500">
                        Block #{message.blockNumber.toLocaleString()}
                      </div>
                    </div>
                    
                    {/* Message Content */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="flex items-start space-x-3">
                        <MessageSquare className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-700 mb-1">Message</div>
                          <div className="text-gray-900">{message.message}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Transaction Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Transaction Hash</div>
                        <div className="flex items-center space-x-2">
                          <code className="text-sm font-mono text-blue-600">
                            {message.transactionHash.slice(0, 10)}...{message.transactionHash.slice(-8)}
                          </code>
                          <button
                            onClick={() => copyToClipboard(message.transactionHash)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">From</div>
                        <div className="flex items-center space-x-2">
                          <code className="text-sm font-mono text-blue-600">
                            {message.from.slice(0, 8)}...{message.from.slice(-6)}
                          </code>
                          <button
                            onClick={() => copyToClipboard(message.from)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">To</div>
                        <div className="flex items-center space-x-2">
                          <code className="text-sm font-mono text-blue-600">
                            {message.to.slice(0, 8)}...{message.to.slice(-6)}
                          </code>
                          <button
                            onClick={() => copyToClipboard(message.to)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Metadata */}
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{message.timeAgo}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Hash className="w-3 h-3" />
                        <span>Gas: {message.gasUsed}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredMessages.length === 0 && !loading && (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No messages found</h3>
                <p className="text-gray-600">Try adjusting your search terms or filters</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            About Input Data Messages
          </h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              Input Data Messages decode transaction input data into human-readable format, making it easier to understand what smart contracts are doing.
            </p>
            <p>
              <strong>Features:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Decode function calls and parameters</li>
              <li>Display transaction context and metadata</li>
              <li>Track success and failure status</li>
              <li>Search by message content or addresses</li>
              <li>Copy transaction hashes and addresses</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InputDataMessagesPage
