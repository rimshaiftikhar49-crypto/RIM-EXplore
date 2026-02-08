'use client'

import React from 'react'
import Link from 'next/link'
import { Clock, User, ArrowRight } from 'lucide-react'

const LatestBlocks = () => {
  // Mock data for latest blocks
  const blocks = [
    {
      number: 18542891,
      timestamp: '12 secs ago',
      miner: '0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326',
      txnCount: 156,
      reward: '2.1234',
      gasUsed: 89.5,
      gasLimit: 30000000
    },
    {
      number: 18542890,
      timestamp: '24 secs ago',
      miner: '0x2aE28b8a3dCeaDf281B0F12828e676c326f9090a',
      txnCount: 203,
      reward: '2.0987',
      gasUsed: 94.2,
      gasLimit: 30000000
    },
    {
      number: 18542889,
      timestamp: '36 secs ago',
      miner: '0x3dCeaDf281B0F12828e676c326f9090aaE28b8a3',
      txnCount: 178,
      reward: '2.1456',
      gasUsed: 87.3,
      gasLimit: 30000000
    },
    {
      number: 18542888,
      timestamp: '48 secs ago',
      miner: '0x4f281B0F12828e676c326f9090aaE28b8a3dCeaD',
      txnCount: 189,
      reward: '2.0654',
      gasUsed: 91.8,
      gasLimit: 30000000
    },
    {
      number: 18542887,
      timestamp: '1 min ago',
      miner: '0x5828e676c326f9090aaE28b8a3dCeaDf281B0F12',
      txnCount: 167,
      reward: '2.1123',
      gasUsed: 88.9,
      gasLimit: 30000000
    }
  ]

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Latest Blocks</h2>
          <Link 
            href="/blocks"
            className="flex items-center space-x-1 text-yellow-600 hover:text-yellow-700 transition-colors text-sm font-medium"
          >
            <span>View all blocks</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {blocks.map((block, index) => (
          <div key={block.number} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Block Icon */}
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="w-4 h-4 bg-yellow-500 rounded-sm"></div>
                </div>

                {/* Block Info */}
                <div>
                  <div className="flex items-center space-x-2">
                    <Link 
                      href={`/block/${block.number}`}
                      className="text-yellow-600 hover:text-yellow-700 font-medium"
                    >
                      {block.number.toLocaleString()}
                    </Link>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{block.timestamp}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-sm text-gray-600 mt-1">
                    <User className="w-3 h-3" />
                    <span>Miner:</span>
                    <Link 
                      href={`/address/${block.miner}`}
                      className="text-yellow-600 hover:text-yellow-700"
                    >
                      {formatAddress(block.miner)}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Block Stats */}
              <div className="text-right">
                <div className="text-sm text-gray-900 font-medium">
                  {block.txnCount} txns
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {block.reward} AUR
                </div>
                <div className="text-xs text-gray-500">
                  {block.gasUsed}% gas used
                </div>
              </div>
            </div>

            {/* Gas Usage Bar */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Gas Usage</span>
                <span>{block.gasUsed}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${block.gasUsed}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LatestBlocks



