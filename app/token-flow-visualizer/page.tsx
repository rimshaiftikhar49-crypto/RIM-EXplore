'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { GitBranch, Search, Play, Download, Settings, Zap } from 'lucide-react'

const TokenFlowVisualizerPage = () => {
  const [tokenAddress, setTokenAddress] = useState('')
  const [timeRange, setTimeRange] = useState('1h')
  const [minValue, setMinValue] = useState('0.01')
  const [maxNodes, setMaxNodes] = useState('50')
  const [loading, setLoading] = useState(false)
  const [flowData, setFlowData] = useState<any>(null)

  const handleAnalyze = async () => {
    if (!tokenAddress.trim()) return
    
    setLoading(true)
    try {
      // TODO: Implement actual token flow analysis
      // For demo purposes, simulate flow analysis
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Mock flow data
      setFlowData({
        token: {
          name: 'AUR Token',
          symbol: 'AUR',
          address: tokenAddress
        },
        nodes: [
          { id: 'central', label: 'Token Contract', type: 'contract', x: 400, y: 300, size: 40 },
          { id: 'exchange1', label: 'Uniswap V3', type: 'exchange', x: 200, y: 150, size: 30 },
          { id: 'exchange2', label: 'Binance', type: 'exchange', x: 600, y: 150, size: 35 },
          { id: 'whale1', label: 'Whale #1', type: 'whale', x: 150, y: 400, size: 25 },
          { id: 'whale2', label: 'Whale #2', type: 'whale', x: 650, y: 400, size: 25 },
          { id: 'user1', label: 'User 1', type: 'user', x: 300, y: 500, size: 15 },
          { id: 'user2', label: 'User 2', type: 'user', x: 500, y: 500, size: 15 }
        ],
        flows: [
          { from: 'central', to: 'exchange1', value: 1000000, width: 8 },
          { from: 'central', to: 'exchange2', value: 2000000, width: 12 },
          { from: 'exchange1', to: 'whale1', value: 500000, width: 6 },
          { from: 'exchange2', to: 'whale2', value: 800000, width: 8 },
          { from: 'whale1', to: 'user1', value: 100000, width: 3 },
          { from: 'whale2', to: 'user2', value: 150000, width: 4 }
        ],
        stats: {
          totalTransfers: 156,
          totalValue: '4.55M AUR',
          uniqueAddresses: 89,
          timeAnalyzed: '1 hour'
        }
      })
    } catch (error) {
      console.error('Error analyzing token flow:', error)
      alert('Failed to analyze token flow')
    } finally {
      setLoading(false)
    }
  }

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'contract': return '#f59e0b' // gold
      case 'exchange': return '#3b82f6' // blue
      case 'whale': return '#8b5cf6' // purple
      case 'user': return '#10b981' // green
      default: return '#6b7280' // gray
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
            <Link href="/tokens" className="hover:text-yellow-600">Tokens</Link>
            <span>/</span>
            <span className="text-yellow-600">Token Flow Visualizer</span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <GitBranch className="w-8 h-8 text-yellow-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Token Flow Visualizer</h1>
              <p className="text-gray-600">Visualize token transfer patterns and relationships</p>
            </div>
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded font-medium">Beta</span>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Analysis Parameters</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Token Address</label>
              <input
                type="text"
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
                placeholder="0x..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="1h">Last 1 Hour</option>
                <option value="6h">Last 6 Hours</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Value (AUR)</label>
              <input
                type="number"
                value={minValue}
                onChange={(e) => setMinValue(e.target.value)}
                placeholder="0.01"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Nodes</label>
              <input
                type="number"
                value={maxNodes}
                onChange={(e) => setMaxNodes(e.target.value)}
                placeholder="50"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <p>Enter a token contract address to visualize its transfer patterns and network relationships.</p>
              <p className="mt-1">Example: <code className="bg-gray-100 px-2 py-1 rounded">0xA0b86a33E6441e9e3DF7d0E7B8a5C123456789</code></p>
            </div>
            <button
              onClick={handleAnalyze}
              disabled={loading || !tokenAddress.trim()}
              className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <Play className="w-5 h-5" />
              )}
              <span>{loading ? 'Analyzing...' : 'Analyze Flow'}</span>
            </button>
          </div>
        </div>

        {/* Visualization */}
        {flowData && (
          <div className="bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Token Flow Visualization</h2>
                <p className="text-sm text-gray-600">
                  {flowData.token.name} ({flowData.token.symbol}) - {flowData.stats.timeAnalyzed}
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 flex items-center space-x-1 text-sm">
                  <Settings className="w-3 h-3" />
                  <span>Settings</span>
                </button>
                <button className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 flex items-center space-x-1 text-sm">
                  <Download className="w-3 h-3" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* Flow Chart */}
            <div className="p-6">
              <div className="relative bg-gray-50 rounded-lg h-96 overflow-hidden">
                <svg className="w-full h-full">
                  {/* Draw flow lines */}
                  {flowData.flows.map((flow: any, index: number) => {
                    const fromNode = flowData.nodes.find((n: any) => n.id === flow.from)
                    const toNode = flowData.nodes.find((n: any) => n.id === flow.to)
                    if (!fromNode || !toNode) return null
                    
                    return (
                      <line
                        key={index}
                        x1={fromNode.x}
                        y1={fromNode.y}
                        x2={toNode.x}
                        y2={toNode.y}
                        stroke="#yellow-400"
                        strokeWidth={flow.width}
                        opacity="0.6"
                      />
                    )
                  })}
                  
                  {/* Draw nodes */}
                  {flowData.nodes.map((node: any) => (
                    <g key={node.id}>
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={node.size}
                        fill={getNodeColor(node.type)}
                        stroke="white"
                        strokeWidth="2"
                        className="cursor-pointer hover:opacity-80"
                      />
                      <text
                        x={node.x}
                        y={node.y + node.size + 15}
                        textAnchor="middle"
                        className="text-xs fill-gray-700 font-medium"
                      >
                        {node.label}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>

              {/* Legend */}
              <div className="mt-4 flex justify-center">
                <div className="flex space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <span>Contract</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <span>Exchange</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                    <span>Whale</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span>User</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-gray-900">{flowData.stats.totalTransfers}</div>
                  <div className="text-sm text-gray-600">Total Transfers</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">{flowData.stats.totalValue}</div>
                  <div className="text-sm text-gray-600">Total Value</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">{flowData.stats.uniqueAddresses}</div>
                  <div className="text-sm text-gray-600">Unique Addresses</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">{flowData.stats.timeAnalyzed}</div>
                  <div className="text-sm text-gray-600">Time Period</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <GitBranch className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Flow Visualization</h3>
            <p className="text-gray-600 text-sm">
              Interactive network graph showing token transfer relationships and patterns.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Analysis</h3>
            <p className="text-gray-600 text-sm">
              Analyze token flows in real-time with customizable time ranges and value filters.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <Download className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Export & Share</h3>
            <p className="text-gray-600 text-sm">
              Export visualizations as images or share analysis results with others.
            </p>
          </div>
        </div>

        {/* Beta Notice */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-medium text-yellow-900 mb-3">🚧 Beta Feature Notice</h3>
          <div className="text-sm text-yellow-800 space-y-2">
            <p>
              The <strong>Token Flow Visualizer</strong> is currently in beta testing. Features and visualizations may change based on user feedback.
            </p>
            <p>
              For complex tokens with high transaction volumes, analysis may take longer to complete.
            </p>
            <p>
              We're continuously improving the accuracy and performance of flow analysis algorithms.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TokenFlowVisualizerPage


