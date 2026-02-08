'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Fuel, TrendingUp, TrendingDown, Clock, Zap } from 'lucide-react'

const GasTrackerPage = () => {
  const [gasData, setGasData] = useState({
    standard: { price: 12, time: '2 min' },
    fast: { price: 15, time: '1 min' },
    rapid: { price: 18, time: '30 sec' }
  })
  const [loading, setLoading] = useState(true)
  const [history, setHistory] = useState<Array<{time: string, price: number}>>([])

  useEffect(() => {
    fetchGasData()
    const interval = setInterval(fetchGasData, 10000) // Update every 10 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchGasData = async () => {
    try {
      // TODO: Replace with real gas price API
      // Simulate real-time gas price fluctuations
      const basePrice = 12 + Math.random() * 8
      setGasData({
        standard: { 
          price: Math.round(basePrice), 
          time: Math.random() > 0.5 ? '2 min' : '3 min' 
        },
        fast: { 
          price: Math.round(basePrice + 3 + Math.random() * 2), 
          time: Math.random() > 0.5 ? '1 min' : '90 sec' 
        },
        rapid: { 
          price: Math.round(basePrice + 6 + Math.random() * 4), 
          time: Math.random() > 0.5 ? '30 sec' : '45 sec' 
        }
      })

      // Add to history
      const now = new Date()
      const timeStr = now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      })
      
      setHistory(prev => {
        const newHistory = [...prev, { time: timeStr, price: Math.round(basePrice) }]
        return newHistory.slice(-20) // Keep last 20 entries
      })
      
      setLoading(false)
    } catch (error) {
      console.error('Error fetching gas data:', error)
      setLoading(false)
    }
  }

  const getGasInUSD = (gwei: number) => {
    const ethPrice = 4554.69 // Mock ETH price
    const gasLimit = 21000 // Standard transfer
    const gasCostEth = (gwei * gasLimit) / 1000000000
    return (gasCostEth * ethPrice).toFixed(2)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading gas tracker...</p>
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
            <span className="text-yellow-600">Gas Tracker</span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Fuel className="w-8 h-8 text-yellow-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AUR Gas Tracker</h1>
              <p className="text-gray-600">Real-time gas price monitoring and recommendations</p>
            </div>
          </div>
        </div>

        {/* Current Gas Prices */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Standard */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h3 className="text-lg font-semibold text-gray-900">Standard</h3>
              </div>
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {gasData.standard.price} <span className="text-lg font-normal text-gray-500">Gwei</span>
            </div>
            <div className="text-sm text-gray-600 mb-3">~{gasData.standard.time}</div>
            <div className="text-sm text-gray-500">
              Cost: ${getGasInUSD(gasData.standard.price)}
            </div>
            <div className="mt-4 text-xs text-gray-500">
              Recommended for regular transactions
            </div>
          </div>

          {/* Fast */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 border-yellow-200 bg-yellow-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <h3 className="text-lg font-semibold text-gray-900">Fast</h3>
              </div>
              <Zap className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {gasData.fast.price} <span className="text-lg font-normal text-gray-500">Gwei</span>
            </div>
            <div className="text-sm text-gray-600 mb-3">~{gasData.fast.time}</div>
            <div className="text-sm text-gray-500">
              Cost: ${getGasInUSD(gasData.fast.price)}
            </div>
            <div className="mt-4 text-xs text-yellow-700 font-medium">
              Recommended for most users
            </div>
          </div>

          {/* Rapid */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <h3 className="text-lg font-semibold text-gray-900">Rapid</h3>
              </div>
              <TrendingUp className="w-5 h-5 text-red-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {gasData.rapid.price} <span className="text-lg font-normal text-gray-500">Gwei</span>
            </div>
            <div className="text-sm text-gray-600 mb-3">~{gasData.rapid.time}</div>
            <div className="text-sm text-gray-500">
              Cost: ${getGasInUSD(gasData.rapid.price)}
            </div>
            <div className="mt-4 text-xs text-gray-500">
              For urgent transactions
            </div>
          </div>
        </div>

        {/* Gas Price Chart */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Gas Price History</h2>
          </div>
          <div className="p-6">
            <div className="h-64 flex items-end space-x-2">
              {history.map((entry, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-yellow-400 rounded-t"
                    style={{ height: `${(entry.price / 25) * 100}%` }}
                  ></div>
                  {index % 4 === 0 && (
                    <div className="text-xs text-gray-500 mt-2 transform -rotate-45">
                      {entry.time}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-4">
              <span>0 Gwei</span>
              <span>25 Gwei</span>
            </div>
          </div>
        </div>

        {/* Gas Calculator */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Gas Calculator</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">21,000</div>
                <div className="text-sm text-gray-600">Standard Transfer</div>
                <div className="text-xs text-gray-500 mt-1">
                  ${getGasInUSD(gasData.fast.price)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">65,000</div>
                <div className="text-sm text-gray-600">Token Transfer</div>
                <div className="text-xs text-gray-500 mt-1">
                  ${(parseFloat(getGasInUSD(gasData.fast.price)) * 3.1).toFixed(2)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">46,000</div>
                <div className="text-sm text-gray-600">Uniswap Swap</div>
                <div className="text-xs text-gray-500 mt-1">
                  ${(parseFloat(getGasInUSD(gasData.fast.price)) * 2.2).toFixed(2)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">84,000</div>
                <div className="text-sm text-gray-600">NFT Transfer</div>
                <div className="text-xs text-gray-500 mt-1">
                  ${(parseFloat(getGasInUSD(gasData.fast.price)) * 4).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-medium text-blue-900 mb-3">💡 Gas Optimization Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <p className="font-medium mb-1">⏰ Time your transactions</p>
              <p>Gas prices are typically lower during weekends and off-peak hours (UTC).</p>
            </div>
            <div>
              <p className="font-medium mb-1">⚡ Use appropriate gas prices</p>
              <p>Don't overpay for gas unless your transaction is urgent.</p>
            </div>
            <div>
              <p className="font-medium mb-1">🔄 Batch transactions</p>
              <p>Combine multiple operations into a single transaction when possible.</p>
            </div>
            <div>
              <p className="font-medium mb-1">📊 Monitor trends</p>
              <p>Watch gas price patterns to predict optimal transaction times.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GasTrackerPage


