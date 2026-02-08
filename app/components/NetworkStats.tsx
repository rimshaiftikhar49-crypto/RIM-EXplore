'use client'

import React from 'react'
import { Fuel, Zap, Shield, Globe } from 'lucide-react'

const NetworkStats = () => {
  return (
    <div className="mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Gas Tracker */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 card-hover">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Fuel className="w-5 h-5 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Gas Tracker</h3>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Standard</span>
              <span className="text-sm font-medium text-gray-900">25 Gwei</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Fast</span>
              <span className="text-sm font-medium text-gray-900">35 Gwei</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Instant</span>
              <span className="text-sm font-medium text-gray-900">45 Gwei</span>
            </div>
          </div>
        </div>

        {/* Latest Block */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 card-hover">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Latest Block</h3>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Height</span>
              <span className="text-sm font-medium text-blue-600">#18,542,891</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Timestamp</span>
              <span className="text-sm font-medium text-gray-900">12 secs ago</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Transactions</span>
              <span className="text-sm font-medium text-gray-900">156</span>
            </div>
          </div>
        </div>

        {/* Network Security */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 card-hover">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Network Security</h3>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Validators</span>
              <span className="text-sm font-medium text-gray-900">892,456</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active Validators</span>
              <span className="text-sm font-medium text-green-600">891,234</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Staked RIM</span>
              <span className="text-sm font-medium text-gray-900">29.2M</span>
            </div>
          </div>
        </div>

        {/* Network Overview */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 card-hover">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Network Overview</h3>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Supply</span>
              <span className="text-sm font-medium text-gray-900">120.3M RIM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Circulating</span>
              <span className="text-sm font-medium text-gray-900">118.7M RIM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Burned</span>
              <span className="text-sm font-medium text-red-600">4.2M RIM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NetworkStats



