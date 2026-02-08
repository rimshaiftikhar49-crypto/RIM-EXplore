'use client'

import React, { useState } from 'react'
import { Search, TrendingUp, Shield, Zap } from 'lucide-react'

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery)
    }
  }

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            The AUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Blockchain</span> Explorer
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Search, verify and track AUR transactions, blocks, addresses, tokens, and smart contracts on the AUR blockchain
          </p>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-12">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Address / Transaction Hash / Block Number / Token / ENS"
                className="w-full px-6 py-4 pr-16 text-lg rounded-xl border-2 border-gray-600 bg-gray-800/50 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 px-6 py-2 rounded-lg text-white font-medium transition-all duration-200 hover:scale-105"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-6 rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Real-time Analytics</h3>
              <p className="text-gray-400 text-center">Track network activity, transaction volumes, and market trends in real-time</p>
            </div>

            <div className="flex flex-col items-center p-6 rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Verified Contracts</h3>
              <p className="text-gray-400 text-center">Access verified smart contract source code and interact with contracts safely</p>
            </div>

            <div className="flex flex-col items-center p-6 rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast & Reliable</h3>
              <p className="text-gray-400 text-center">Lightning-fast search and data retrieval with 99.9% uptime guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

