'use client'

import React from 'react'
import Link from 'next/link'
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react'

const TopTokens = () => {
  // Mock data for top tokens
  const tokens = [
    {
      name: 'Tether USD',
      symbol: 'USDT',
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      price: '$1.00',
      change24h: '+0.01%',
      changeType: 'positive',
      volume24h: '$45.2B',
      marketCap: '$88.5B',
      holders: '4.8M'
    },
    {
      name: 'USD Coin',
      symbol: 'USDC',
      address: '0xA0b86a33E6441e0e5e7613ce0A7C7e2b8c8b8c8b',
      price: '$0.9998',
      change24h: '-0.02%',
      changeType: 'negative',
      volume24h: '$8.9B',
      marketCap: '$24.1B',
      holders: '2.1M'
    },
    {
      name: 'Chainlink',
      symbol: 'LINK',
      address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
      price: '$14.82',
      change24h: '+5.67%',
      changeType: 'positive',
      volume24h: '$892M',
      marketCap: '$8.2B',
      holders: '678K'
    },
    {
      name: 'Uniswap',
      symbol: 'UNI',
      address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
      price: '$6.43',
      change24h: '+3.21%',
      changeType: 'positive',
      volume24h: '$234M',
      marketCap: '$4.8B',
      holders: '432K'
    },
    {
      name: 'Wrapped Bitcoin',
      symbol: 'WBTC',
      address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
      price: '$43,256.78',
      change24h: '+2.89%',
      changeType: 'positive',
      volume24h: '$156M',
      marketCap: '$6.7B',
      holders: '89K'
    },
    {
      name: 'Dai Stablecoin',
      symbol: 'DAI',
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      price: '$1.0002',
      change24h: '+0.01%',
      changeType: 'positive',
      volume24h: '$789M',
      marketCap: '$5.3B',
      holders: '567K'
    }
  ]

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Top Tokens by Market Cap</h2>
          <Link 
            href="/tokens"
            className="flex items-center space-x-1 text-yellow-600 hover:text-yellow-700 transition-colors text-sm font-medium"
          >
            <span>View all tokens</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Token
              </th>
              <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Price
              </th>
              <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                24h Change
              </th>
              <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Volume (24h)
              </th>
              <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Market Cap
              </th>
              <th className="text-left py-3 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Holders
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tokens.map((token, index) => (
              <tr key={token.address} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold text-sm">
                        {token.symbol.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {token.name}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center space-x-2">
                        <span>{token.symbol}</span>
                        <span>•</span>
                        <Link 
                          href={`/token/${token.address}`}
                          className="text-yellow-600 hover:text-yellow-700"
                        >
                          {formatAddress(token.address)}
                        </Link>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="font-medium text-gray-900">
                    {token.price}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className={`flex items-center space-x-1 font-medium ${
                    token.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {token.changeType === 'positive' ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>{token.change24h}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="font-medium text-gray-900">
                    {token.volume24h}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="font-medium text-gray-900">
                    {token.marketCap}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="font-medium text-gray-900">
                    {token.holders}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TopTokens



