'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Shield, TrendingUp, Users, Zap } from 'lucide-react'

const BeaconDepositsPage = () => {
  const [deposits, setDeposits] = useState<Array<{
    blockNumber: number
    txHash: string
    from: string
    publicKey: string
    amount: string
    withdrawalCredentials: string
    signature: string
    depositIndex: number
    timestamp: string
    status: 'valid' | 'pending' | 'invalid'
  }>>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalDeposits: 0,
    totalAmount: 0,
    uniqueValidators: 0,
    avgDepositAmount: 32
  })

  useEffect(() => {
    fetchBeaconDeposits()
  }, [])

  const fetchBeaconDeposits = async () => {
    try {
      // TODO: Replace with real beacon chain deposits API
      // Mock beacon deposits data
      const mockDeposits = Array.from({ length: 25 }, (_, i) => {
        const amount = Math.random() > 0.8 ? (32 + Math.random() * 10).toFixed(1) : '32.0'
        const blockNumber = 23394849 - i
        const timestamp = Date.now() - (i * 300000) // 5 minutes apart
        
        return {
          blockNumber,
          txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
          from: `0x${Math.random().toString(16).substr(2, 40)}`,
          publicKey: `0x${Math.random().toString(16).substr(2, 96)}`,
          amount,
          withdrawalCredentials: `0x${Math.random().toString(16).substr(2, 64)}`,
          signature: `0x${Math.random().toString(16).substr(2, 192)}`,
          depositIndex: 1500000 + i,
          timestamp: new Date(timestamp).toLocaleString(),
          status: Math.random() > 0.1 ? 'valid' : (Math.random() > 0.5 ? 'pending' : 'invalid') as 'valid' | 'pending' | 'invalid'
        }
      })

      setDeposits(mockDeposits)
      
      // Calculate stats
      const totalAmount = mockDeposits.reduce((sum, deposit) => sum + parseFloat(deposit.amount), 0)
      setStats({
        totalDeposits: mockDeposits.length,
        totalAmount,
        uniqueValidators: mockDeposits.length, // Simplified - assume each deposit is from unique validator
        avgDepositAmount: totalAmount / mockDeposits.length
      })
      
      setLoading(false)
    } catch (error) {
      console.error('Error fetching beacon deposits:', error)
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid': return 'text-green-600 bg-green-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'invalid': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading beacon deposits...</p>
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
            <span className="text-yellow-600">Beacon Deposits</span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white">
              <Shield size={20} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Beacon Chain Deposits</h1>
              <p className="text-gray-600">AUR 2.0 validator deposits to the Beacon Chain</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                <TrendingUp size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalDeposits.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Deposits</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                <Zap size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalAmount.toFixed(1)}</div>
                <div className="text-sm text-gray-600">Total AUR Deposited</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                <Users size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.uniqueValidators.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Unique Validators</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <div className="text-yellow-600 font-bold text-sm">Ⓐ</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.avgDepositAmount.toFixed(1)}</div>
                <div className="text-sm text-gray-600">Avg Deposit Amount</div>
              </div>
            </div>
          </div>
        </div>

        {/* Deposits Table */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Recent Beacon Deposits</h2>
            <div className="text-sm text-gray-600">
              Showing latest {deposits.length} deposits
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Block</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction Hash</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Public Key</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deposit Index</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {deposits.map((deposit, index) => (
                  <tr key={deposit.txHash} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link href={`/block/${deposit.blockNumber}`} className="text-yellow-600 hover:text-yellow-700 font-medium">
                        {deposit.blockNumber.toLocaleString()}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link href={`/tx/${deposit.txHash}`} className="text-yellow-600 hover:text-yellow-700 font-mono text-sm">
                        {deposit.txHash.slice(0, 12)}...
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link href={`/address/${deposit.from}`} className="text-yellow-600 hover:text-yellow-700 font-mono text-sm">
                        {deposit.from.slice(0, 6)}...{deposit.from.slice(-4)}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-mono text-sm text-gray-900" title={deposit.publicKey}>
                        {deposit.publicKey.slice(0, 10)}...{deposit.publicKey.slice(-6)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <span className="font-medium text-gray-900">{deposit.amount}</span>
                        <span className="text-sm text-gray-500">AUR</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(deposit.status)}`}>
                        {deposit.status.charAt(0).toUpperCase() + deposit.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      #{deposit.depositIndex.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="font-medium text-yellow-900 mb-3">🔗 About Beacon Chain Deposits</h3>
            <div className="text-sm text-yellow-800 space-y-2">
              <p>
                <strong>Beacon Chain deposits</strong> are transactions that stake AUR to become a validator on the AUR 2.0 Proof-of-Stake network.
              </p>
              <p>
                Each validator requires a minimum deposit of <strong>32 AUR</strong> along with a valid public key and withdrawal credentials.
              </p>
              <p>
                Deposits are irreversible until withdrawals are enabled on the Beacon Chain.
              </p>
            </div>
          </div>

          <div className="bg-gray-100 border border-gray-300 rounded-lg p-6">
            <h3 className="font-medium text-gray-900 mb-3">⚠️ Validator Requirements</h3>
            <div className="text-sm text-gray-800 space-y-2">
              <p>
                <strong>Minimum deposit:</strong> 32 AUR per validator
              </p>
              <p>
                <strong>Public key:</strong> BLS12-381 public key for validator identity
              </p>
              <p>
                <strong>Withdrawal credentials:</strong> Address for future withdrawals
              </p>
              <p>
                <strong>Signature:</strong> Proof of possession of the private key
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BeaconDepositsPage
