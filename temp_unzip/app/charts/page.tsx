'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { BarChart3, TrendingUp, TrendingDown, Users, Zap, Globe, Activity } from 'lucide-react'

const ChartsPage = () => {
  const [selectedChart, setSelectedChart] = useState('price')
  const [timeRange, setTimeRange] = useState('7d')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading chart data
    setTimeout(() => setLoading(false), 1000)
  }, [selectedChart, timeRange])

  const chartTypes = [
    { id: 'price', name: 'AUR Price', icon: TrendingUp, color: 'text-green-600' },
    { id: 'transactions', name: 'Daily Transactions', icon: Activity, color: 'text-blue-600' },
    { id: 'addresses', name: 'Active Addresses', icon: Users, color: 'text-purple-600' },
    { id: 'gasPrice', name: 'Gas Price', icon: Zap, color: 'text-yellow-600' },
    { id: 'networkGrowth', name: 'Network Growth', icon: Globe, color: 'text-indigo-600' },
    { id: 'hashRate', name: 'Hash Rate', icon: BarChart3, color: 'text-red-600' }
  ]

  const timeRanges = [
    { id: '1d', name: '1 Day' },
    { id: '7d', name: '7 Days' },
    { id: '30d', name: '30 Days' },
    { id: '90d', name: '90 Days' },
    { id: '1y', name: '1 Year' },
    { id: 'all', name: 'All Time' }
  ]

  // Mock chart data
  const generateChartData = () => {
    return Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      value: Math.random() * 100 + 50 + Math.sin(i / 5) * 20
    }))
  }

  const chartData = generateChartData()
  const maxValue = Math.max(...chartData.map(d => d.value))

  const getCurrentStats = () => {
    switch (selectedChart) {
      case 'price':
        return { current: '$4,554.69', change: '-1.28%', changeType: 'negative' }
      case 'transactions':
        return { current: '1,234,567', change: '+5.2%', changeType: 'positive' }
      case 'addresses':
        return { current: '89,432', change: '+2.1%', changeType: 'positive' }
      case 'gasPrice':
        return { current: '12.5 Gwei', change: '-8.7%', changeType: 'negative' }
      case 'networkGrowth':
        return { current: '2.3M', change: '+12.4%', changeType: 'positive' }
      case 'hashRate':
        return { current: '1.2 TH/s', change: '+3.8%', changeType: 'positive' }
      default:
        return { current: '0', change: '0%', changeType: 'neutral' }
    }
  }

  const stats = getCurrentStats()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading charts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-yellow-600">Home</Link>
            <span>/</span>
            <span className="text-yellow-600">Charts And Stats</span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <BarChart3 className="w-8 h-8 text-yellow-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AUR Network Charts & Statistics</h1>
              <p className="text-gray-600">Comprehensive analytics and data visualization</p>
            </div>
          </div>
        </div>

        {/* Chart Controls */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Chart Type Selection */}
            <div className="flex flex-wrap gap-2">
              {chartTypes.map((chart) => {
                const IconComponent = chart.icon
                return (
                  <button
                    key={chart.id}
                    onClick={() => setSelectedChart(chart.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                      selectedChart === chart.id
                        ? 'bg-yellow-100 border-yellow-300 text-yellow-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 ${selectedChart === chart.id ? 'text-yellow-600' : chart.color}`} />
                    <span className="text-sm font-medium">{chart.name}</span>
                  </button>
                )
              })}
            </div>

            {/* Time Range Selection */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Time Range:</span>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
              >
                {timeRanges.map(range => (
                  <option key={range.id} value={range.id}>{range.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Chart Display */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {chartTypes.find(c => c.id === selectedChart)?.name} Chart
              </h2>
              <div className="flex items-center space-x-4 mt-1">
                <div className="text-2xl font-bold text-gray-900">{stats.current}</div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  stats.changeType === 'positive' ? 'text-green-600' : 
                  stats.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {stats.changeType === 'positive' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : stats.changeType === 'negative' ? (
                    <TrendingDown className="w-4 h-4" />
                  ) : null}
                  <span>{stats.change}</span>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleString()}
            </div>
          </div>

          {/* Chart Area */}
          <div className="p-6">
            <div className="h-80 flex items-end space-x-1">
              {chartData.map((point, index) => (
                <div key={index} className="flex-1 flex flex-col items-center group">
                  <div 
                    className="w-full bg-yellow-400 rounded-t hover:bg-yellow-500 transition-colors cursor-pointer"
                    style={{ height: `${(point.value / maxValue) * 100}%` }}
                    title={`${point.date}: ${point.value.toFixed(2)}`}
                  ></div>
                  {index % 5 === 0 && (
                    <div className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-left">
                      {point.date}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-4">
              <span>0</span>
              <span>{maxValue.toFixed(0)}</span>
            </div>
          </div>
        </div>

        {/* Key Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">$4,554.69</div>
                <div className="text-sm text-gray-600">Current AUR Price</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">1.2M</div>
                <div className="text-sm text-gray-600">Daily Transactions</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">89.4K</div>
                <div className="text-sm text-gray-600">Active Addresses</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">12.5</div>
                <div className="text-sm text-gray-600">Avg Gas Price (Gwei)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Charts */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Network Activity */}
          <div className="bg-white rounded-lg shadow border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Network Activity</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Block Time</span>
                  <span className="font-medium">12.1s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Network Utilization</span>
                  <span className="font-medium">67.3%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Pending Transactions</span>
                  <span className="font-medium">142,839</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Supply</span>
                  <span className="font-medium">120,426,315 AUR</span>
                </div>
              </div>
            </div>
          </div>

          {/* Market Data */}
          <div className="bg-white rounded-lg shadow border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Market Data</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Market Cap</span>
                  <span className="font-medium">$549.8B</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">24h Volume</span>
                  <span className="font-medium">$15.2B</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Circulating Supply</span>
                  <span className="font-medium">120.4M AUR</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Value Locked</span>
                  <span className="font-medium">$89.3B</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-medium text-blue-900 mb-3">📊 Export Chart Data</h3>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              Download CSV
            </button>
            <button className="px-4 py-2 bg-white border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm">
              Download PNG
            </button>
            <button className="px-4 py-2 bg-white border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm">
              Share Chart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChartsPage
