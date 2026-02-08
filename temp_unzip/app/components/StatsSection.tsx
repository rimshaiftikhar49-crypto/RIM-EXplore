'use client'

import React from 'react'
import { TrendingUp, TrendingDown, Activity, Users, Coins, Clock } from 'lucide-react'

const StatsSection = () => {
  const stats = [
    {
      title: 'AUR PRICE',
      value: '$2,845.32',
      change: '+2.45%',
      changeType: 'positive',
      icon: TrendingUp,
      subtitle: 'Last 24h'
    },
    {
      title: 'MARKET CAP',
      value: '$342.8B',
      change: '+1.82%',
      changeType: 'positive',
      icon: Coins,
      subtitle: 'Total Value'
    },
    {
      title: 'TRANSACTIONS',
      value: '1,234,567',
      change: '+5.2%',
      changeType: 'positive',
      icon: Activity,
      subtitle: 'Last 24h'
    },
    {
      title: 'ACTIVE ADDRESSES',
      value: '543,210',
      change: '+3.1%',
      changeType: 'positive',
      icon: Users,
      subtitle: 'Last 24h'
    },
    {
      title: 'AVG BLOCK TIME',
      value: '12.3s',
      change: '-0.5s',
      changeType: 'positive',
      icon: Clock,
      subtitle: 'Current'
    },
    {
      title: 'NETWORK HASHRATE',
      value: '245.7 TH/s',
      change: '+8.3%',
      changeType: 'positive',
      icon: Activity,
      subtitle: 'Current'
    }
  ]

  return (
    <section className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 card-hover">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  index === 0 || index === 1 ? 'bg-yellow-100' : 'bg-gray-100'
                }`}>
                  <stat.icon className={`w-5 h-5 ${
                    index === 0 || index === 1 ? 'text-yellow-600' : 'text-gray-600'
                  }`} />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.changeType === 'positive' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  {stat.title}
                </h3>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <p className="text-xs text-gray-500">
                  {stat.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection



