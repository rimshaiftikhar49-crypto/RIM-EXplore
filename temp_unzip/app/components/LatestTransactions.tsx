'use client'

import React from 'react'
import Link from 'next/link'
import { Clock, ArrowRight, ArrowUpRight, ArrowDownLeft } from 'lucide-react'

const LatestTransactions = () => {
  // Mock data for latest transactions
  const transactions = [
    {
      hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      from: '0x742d35Cc6634C0532925a3b8D29fbb23',
      to: '0x8ba1f109551bD432803012645Hac136c',
      value: '0.5234',
      timestamp: '8 secs ago',
      fee: '0.00123',
      status: 'success'
    },
    {
      hash: '0x2345678901bcdef12345678901bcdef12345678901bcdef12345678901bcdef1',
      from: '0x853e46Dd7645D543936736746Iac247d',
      to: '0x9cb2g210662cE543914123756Ibd247e',
      value: '1.2567',
      timestamp: '15 secs ago',
      fee: '0.00087',
      status: 'success'
    },
    {
      hash: '0x3456789012cdef123456789012cdef123456789012cdef123456789012cdef12',
      from: '0x964f57Ee8756E654047847857Jce358f',
      to: '0xAdc3h321773dF654025234867Jdf358g',
      value: '2.8934',
      timestamp: '22 secs ago',
      fee: '0.00156',
      status: 'success'
    },
    {
      hash: '0x456789013def23456789013def23456789013def23456789013def23456789013',
      from: '0xB75g68Ff9867F765158958968Kdf469g',
      to: '0xBed4i432884eG765136345978Keg469h',
      value: '0.0789',
      timestamp: '34 secs ago',
      fee: '0.00098',
      status: 'pending'
    },
    {
      hash: '0x56789014ef3456789014ef3456789014ef3456789014ef3456789014ef345678',
      from: '0xC86h79Gg0978G876269069079Leg570h',
      to: '0xCfe5j543995fH876247456089Lfh570i',
      value: '5.4321',
      timestamp: '41 secs ago',
      fee: '0.00234',
      status: 'success'
    }
  ]

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const formatHash = (hash: string) => {
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Latest Transactions</h2>
          <Link 
            href="/txs"
            className="flex items-center space-x-1 text-yellow-600 hover:text-yellow-700 transition-colors text-sm font-medium"
          >
            <span>View all transactions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {transactions.map((tx, index) => (
          <div key={tx.hash} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                {/* Transaction Icon */}
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className={`w-4 h-4 rounded-sm ${
                    tx.status === 'success' ? 'bg-green-500' : 
                    tx.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                </div>

                {/* Transaction Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <Link 
                      href={`/tx/${tx.hash}`}
                      className="text-yellow-600 hover:text-yellow-700 font-medium text-sm"
                    >
                      {formatHash(tx.hash)}
                    </Link>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{tx.timestamp}</span>
                    </div>
                    <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      tx.status === 'success' ? 'bg-green-100 text-green-700' :
                      tx.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {tx.status}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="flex items-center space-x-1">
                      <span className="text-gray-600">From:</span>
                      <Link 
                        href={`/address/${tx.from}`}
                        className="text-yellow-600 hover:text-yellow-700"
                      >
                        {formatAddress(tx.from)}
                      </Link>
                    </div>
                    
                    <ArrowRight className="w-3 h-3 text-gray-400" />
                    
                    <div className="flex items-center space-x-1">
                      <span className="text-gray-600">To:</span>
                      <Link 
                        href={`/address/${tx.to}`}
                        className="text-yellow-600 hover:text-yellow-700"
                      >
                        {formatAddress(tx.to)}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transaction Value */}
              <div className="text-right flex-shrink-0 ml-4">
                <div className="text-sm font-medium text-gray-900 flex items-center">
                  {tx.value} AUR
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Fee: {tx.fee} AUR
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LatestTransactions



