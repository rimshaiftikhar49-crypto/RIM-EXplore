'use client'

import React, { useState, useEffect, useRef } from 'react'
import { MessageCircle, Send, ExternalLink, Users, Clock, Hash } from 'lucide-react'

interface ChatMessage {
  id: string
  sender: string
  address: string
  message: string
  timestamp: number
  type: 'user' | 'system' | 'transaction'
  transactionHash?: string
  verified: boolean
}

const BlockscanChatPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isConnected, setIsConnected] = useState(true)
  const [userCount, setUserCount] = useState(42)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Mock initial messages
    const initialMessages: ChatMessage[] = [
      {
        id: '1',
        sender: 'Alice',
        address: '0x742d35Cc6634C0532925a3b8D82A5eB6fD7D4e7a',
        message: 'Just completed a large AUR transfer! 🚀',
        timestamp: Date.now() - 300000,
        type: 'user',
        verified: true
      },
      {
        id: '2',
        sender: 'Bob',
        address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
        message: 'Nice! Gas fees are really low today',
        timestamp: Date.now() - 240000,
        type: 'user',
        verified: false
      },
      {
        id: '3',
        sender: 'System',
        address: '',
        message: 'New block #18945678 mined with 127 transactions',
        timestamp: Date.now() - 180000,
        type: 'system',
        transactionHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890',
        verified: false
      },
      {
        id: '4',
        sender: 'Charlie',
        address: '0xA0b86a33E6441e9e3DF7d0E7B8a5C123456789abc',
        message: 'Anyone else excited about the new DeFi protocol launch?',
        timestamp: Date.now() - 120000,
        type: 'user',
        verified: true
      }
    ]
    setMessages(initialMessages)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: Date.now().toString(),
      sender: 'You',
      address: '0xYourAddress1234567890abcdef1234567890abcdef12',
      message: newMessage,
      timestamp: Date.now(),
      type: 'user',
      verified: true
    }

    setMessages([...messages, message])
    setNewMessage('')

    // Simulate response
    setTimeout(() => {
      const responses = [
        'That\'s interesting!',
        'I agree with you on that.',
        'Has anyone tried the new feature?',
        'The network seems really fast today!',
        'Thanks for sharing!'
      ]
      
      const response: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'Community Member',
        address: '0x' + Math.random().toString(16).substr(2, 40),
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: Date.now() + 1000,
        type: 'user',
        verified: Math.random() > 0.5
      }
      
      setMessages(prev => [...prev, response])
    }, 2000)
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const formatAddress = (address: string) => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Blockscan Chat</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Real-time community chat for AUR blockchain discussions
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Live</span>
                </div>
                <div className="flex items-center space-x-2 text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  <span>Beta</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg border border-gray-200 flex flex-col h-[600px]">
          {/* Chat Header */}
          <div className="border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-yellow-600" />
                <h2 className="text-lg font-semibold text-gray-900">AUR Community Chat</h2>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{userCount} online</span>
                </div>
                <div className={`flex items-center space-x-1 ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
                  <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' && message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md ${message.type === 'user' && message.sender === 'You' ? 'order-2' : 'order-1'}`}>
                  {message.type === 'system' ? (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-medium text-yellow-700">System</span>
                        <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                      </div>
                      <p className="text-sm text-gray-900 mb-2">{message.message}</p>
                      {message.transactionHash && (
                        <a
                          href={`/tx/${message.transactionHash}`}
                          className="inline-flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800"
                        >
                          <Hash className="w-3 h-3" />
                          <span>View Transaction</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  ) : (
                    <div className={`rounded-lg p-3 ${message.sender === 'You' ? 'bg-yellow-600 text-white' : 'bg-gray-100'}`}>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium">{message.sender}</span>
                        {message.verified && (
                          <span className="text-xs bg-green-500 text-white px-1 rounded">✓</span>
                        )}
                        <span className="text-xs opacity-75">{formatTime(message.timestamp)}</span>
                      </div>
                      <p className="text-sm">{message.message}</p>
                      {message.address && (
                        <div className="mt-2 text-xs opacity-75">
                          <a
                            href={`/address/${message.address}`}
                            className="hover:underline"
                          >
                            {formatAddress(message.address)}
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Send</span>
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Press Enter to send • Messages are public and permanent
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            About Blockscan Chat
          </h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              Blockscan Chat is a decentralized communication platform built on the AUR blockchain, allowing users to discuss transactions, share insights, and build community.
            </p>
            <p>
              <strong>Features:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Real-time messaging with blockchain integration</li>
              <li>Verified user addresses and transaction links</li>
              <li>System notifications for new blocks and transactions</li>
              <li>Public and permanent message history</li>
              <li>Community-driven discussions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlockscanChatPage
