'use client'

import React, { useState, useEffect } from 'react'
import { Server, MapPin, Activity, Clock, Users, Globe, Wifi, WifiOff } from 'lucide-react'

interface Node {
  id: string
  name: string
  location: string
  country: string
  ip: string
  port: number
  version: string
  peers: number
  status: 'online' | 'offline' | 'syncing'
  lastSeen: string
  uptime: string
  latency: number
  blocks: number
  syncProgress: number
}

const NodeTrackerPage = () => {
  const [nodes, setNodes] = useState<Node[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    // Mock data for demonstration
    const mockNodes: Node[] = [
      {
        id: '1',
        name: 'AUR Node #1',
        location: 'New York, NY',
        country: 'United States',
        ip: '192.168.1.100',
        port: 30303,
        version: 'v1.12.3',
        peers: 45,
        status: 'online',
        lastSeen: '2 minutes ago',
        uptime: '99.9%',
        latency: 12,
        blocks: 18945678,
        syncProgress: 100
      },
      {
        id: '2',
        name: 'AUR Node #2',
        location: 'London, UK',
        country: 'United Kingdom',
        ip: '192.168.1.101',
        port: 30303,
        version: 'v1.12.3',
        peers: 38,
        status: 'online',
        lastSeen: '1 minute ago',
        uptime: '99.8%',
        latency: 25,
        blocks: 18945678,
        syncProgress: 100
      },
      {
        id: '3',
        name: 'AUR Node #3',
        location: 'Tokyo, Japan',
        country: 'Japan',
        ip: '192.168.1.102',
        port: 30303,
        version: 'v1.12.2',
        peers: 52,
        status: 'syncing',
        lastSeen: '30 seconds ago',
        uptime: '99.7%',
        latency: 45,
        blocks: 18945650,
        syncProgress: 98.5
      },
      {
        id: '4',
        name: 'AUR Node #4',
        location: 'Singapore',
        country: 'Singapore',
        ip: '192.168.1.103',
        port: 30303,
        version: 'v1.12.3',
        peers: 0,
        status: 'offline',
        lastSeen: '2 hours ago',
        uptime: '95.2%',
        latency: 0,
        blocks: 18945000,
        syncProgress: 0
      },
      {
        id: '5',
        name: 'AUR Node #5',
        location: 'Sydney, Australia',
        country: 'Australia',
        ip: '192.168.1.104',
        port: 30303,
        version: 'v1.12.3',
        peers: 41,
        status: 'online',
        lastSeen: '45 seconds ago',
        uptime: '99.5%',
        latency: 38,
        blocks: 18945678,
        syncProgress: 100
      }
    ]

    setNodes(mockNodes)
    setLoading(false)
  }, [])

  const filteredNodes = nodes.filter(node => {
    if (filter === 'all') return true
    return node.status === filter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-700'
      case 'offline': return 'bg-red-100 text-red-700'
      case 'syncing': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <Wifi className="w-4 h-4" />
      case 'offline': return <WifiOff className="w-4 h-4" />
      case 'syncing': return <Activity className="w-4 h-4" />
      default: return <WifiOff className="w-4 h-4" />
    }
  }

  const stats = {
    total: nodes.length,
    online: nodes.filter(n => n.status === 'online').length,
    offline: nodes.filter(n => n.status === 'offline').length,
    syncing: nodes.filter(n => n.status === 'syncing').length,
    avgLatency: Math.round(nodes.filter(n => n.status === 'online').reduce((sum, n) => sum + n.latency, 0) / nodes.filter(n => n.status === 'online').length) || 0,
    totalPeers: nodes.reduce((sum, n) => sum + n.peers, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Node Tracker</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Monitor AUR blockchain nodes and network health
                </p>
              </div>
              <div className="flex items-center space-x-2 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                <Server className="w-3 h-3" />
                <span>Live Data</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Total Nodes</div>
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Online</div>
              <div className="text-2xl font-bold text-green-600">{stats.online}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Offline</div>
              <div className="text-2xl font-bold text-red-600">{stats.offline}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Syncing</div>
              <div className="text-2xl font-bold text-yellow-600">{stats.syncing}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Avg Latency</div>
              <div className="text-2xl font-bold text-gray-900">{stats.avgLatency}ms</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Total Peers</div>
              <div className="text-2xl font-bold text-gray-900">{stats.totalPeers}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option value="all">All Nodes</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="syncing">Syncing</option>
            </select>
          </div>
        </div>
      </div>

      {/* Nodes List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Node
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Peers
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Latency
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Blocks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Seen
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredNodes.map((node) => (
                    <tr key={node.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedNode(node)}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Server className="w-4 h-4 text-yellow-600 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{node.name}</div>
                            <div className="text-xs text-gray-500">{node.version}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                          <div>
                            <div className="text-sm text-gray-900">{node.location}</div>
                            <div className="text-xs text-gray-500">{node.country}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(node.status)}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(node.status)}`}>
                            {node.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 text-gray-400 mr-1" />
                          <span className="text-sm text-gray-900">{node.peers}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">
                          {node.latency > 0 ? `${node.latency}ms` : '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900">{node.blocks.toLocaleString()}</div>
                          {node.syncProgress < 100 && (
                            <div className="text-xs text-gray-500">
                              {node.syncProgress.toFixed(1)}% synced
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-gray-400 mr-1" />
                          <span className="text-sm text-gray-600">{node.lastSeen}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Node Details Modal */}
      {selectedNode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">{selectedNode.name}</h2>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600">Status</div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(selectedNode.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedNode.status)}`}>
                        {selectedNode.status}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600">Location</div>
                    <div className="text-sm text-gray-900">{selectedNode.location}, {selectedNode.country}</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600">IP Address</div>
                    <div className="text-sm font-mono text-gray-900">{selectedNode.ip}:{selectedNode.port}</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600">Version</div>
                    <div className="text-sm text-gray-900">{selectedNode.version}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600">Peers</div>
                    <div className="text-sm text-gray-900">{selectedNode.peers}</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600">Latency</div>
                    <div className="text-sm text-gray-900">
                      {selectedNode.latency > 0 ? `${selectedNode.latency}ms` : 'N/A'}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600">Uptime</div>
                    <div className="text-sm text-gray-900">{selectedNode.uptime}</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600">Last Seen</div>
                    <div className="text-sm text-gray-900">{selectedNode.lastSeen}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div>
                  <div className="text-sm text-gray-600 mb-2">Sync Progress</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${selectedNode.syncProgress}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {selectedNode.syncProgress.toFixed(1)}% ({selectedNode.blocks.toLocaleString()} blocks)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            About Node Tracker
          </h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              The Node Tracker monitors the health and status of AUR blockchain nodes worldwide, providing real-time insights into network connectivity and performance.
            </p>
            <p>
              <strong>Features:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Real-time node status monitoring</li>
              <li>Geographic distribution of nodes</li>
              <li>Network latency and performance metrics</li>
              <li>Sync progress and block height tracking</li>
              <li>Peer connectivity information</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NodeTrackerPage
