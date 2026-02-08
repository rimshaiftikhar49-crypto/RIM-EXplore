'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Star, Trophy, Gift, Users, TrendingUp, Calendar, Award } from 'lucide-react'

const AURPointsPage = () => {
  const [userPoints, setUserPoints] = useState(0)
  const [userRank, setUserRank] = useState(0)
  const [loading, setLoading] = useState(true)
  const [activities, setActivities] = useState<Array<{
    id: string
    type: string
    description: string
    points: number
    date: string
    status: 'completed' | 'pending' | 'available'
  }>>([])

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      // TODO: Replace with real user points API
      // Mock user data
      setUserPoints(2847)
      setUserRank(1523)
      
      const mockActivities = [
        {
          id: '1',
          type: 'daily_login',
          description: 'Daily Login Bonus',
          points: 10,
          date: '2025-01-19',
          status: 'completed' as const
        },
        {
          id: '2',
          type: 'transaction_view',
          description: 'View Transaction Details',
          points: 5,
          date: '2025-01-19',
          status: 'completed' as const
        },
        {
          id: '3',
          type: 'contract_verify',
          description: 'Verify Smart Contract',
          points: 100,
          date: '2025-01-18',
          status: 'completed' as const
        },
        {
          id: '4',
          type: 'social_share',
          description: 'Share on Social Media',
          points: 25,
          date: '2025-01-18',
          status: 'pending' as const
        },
        {
          id: '5',
          type: 'api_usage',
          description: 'Use API Documentation',
          points: 15,
          date: '2025-01-17',
          status: 'available' as const
        }
      ]
      
      setActivities(mockActivities)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching user data:', error)
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'available': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✅'
      case 'pending': return '⏳'
      case 'available': return '🎯'
      default: return '⭕'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading AUR Points...</p>
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
            <span className="text-yellow-600">AUR Points</span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Star className="w-8 h-8 text-yellow-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AUR Points</h1>
              <p className="text-gray-600">Earn points by using AUR Explorer features and services</p>
            </div>
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded font-medium">Beta</span>
          </div>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{userPoints.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Points</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">#{userRank.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Global Rank</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">7</div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">12</div>
                <div className="text-sm text-gray-600">Achievements</div>
              </div>
            </div>
          </div>
        </div>

        {/* How to Earn Points */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">How to Earn AUR Points</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Daily Activities</h3>
                <p className="text-sm text-gray-600 mb-3">Login daily, view transactions, explore blocks</p>
                <div className="text-lg font-bold text-yellow-600">5-15 points</div>
              </div>

              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Developer Tools</h3>
                <p className="text-sm text-gray-600 mb-3">Use API, verify contracts, analyze code</p>
                <div className="text-lg font-bold text-yellow-600">25-100 points</div>
              </div>

              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Gift className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Community</h3>
                <p className="text-sm text-gray-600 mb-3">Share content, refer friends, participate</p>
                <div className="text-lg font-bold text-yellow-600">50-200 points</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Point Activities</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {activities.map((activity) => (
                  <tr key={activity.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{getStatusIcon(activity.status)}</span>
                        <span className="font-medium text-gray-900">{activity.description}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-bold text-yellow-600">+{activity.points}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(activity.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(activity.status)}`}>
                        {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Rewards */}
        <div className="mt-8 bg-gradient-to-r from-yellow-50 to-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-medium text-yellow-900 mb-4">🎁 Available Rewards</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-yellow-200">
              <div className="text-center">
                <div className="text-2xl mb-2">🏆</div>
                <h4 className="font-medium text-gray-900 mb-1">Premium Badge</h4>
                <p className="text-sm text-gray-600 mb-2">Exclusive profile badge</p>
                <div className="text-lg font-bold text-yellow-600 mb-2">1,000 points</div>
                <button className="w-full px-3 py-2 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700 transition-colors">
                  Claim
                </button>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-center">
                <div className="text-2xl mb-2">🎯</div>
                <h4 className="font-medium text-gray-900 mb-1">API Access</h4>
                <p className="text-sm text-gray-600 mb-2">Higher rate limits</p>
                <div className="text-lg font-bold text-gray-600 mb-2">2,500 points</div>
                <button className="w-full px-3 py-2 bg-gray-400 text-white rounded text-sm cursor-not-allowed">
                  Need 2,500
                </button>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-center">
                <div className="text-2xl mb-2">🎁</div>
                <h4 className="font-medium text-gray-900 mb-1">NFT Reward</h4>
                <p className="text-sm text-gray-600 mb-2">Exclusive AUR NFT</p>
                <div className="text-lg font-bold text-gray-600 mb-2">5,000 points</div>
                <button className="w-full px-3 py-2 bg-gray-400 text-white rounded text-sm cursor-not-allowed">
                  Need 5,000
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="mt-8 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Top Contributors</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { rank: 1, username: 'CryptoExplorer', points: 15847, badge: '🥇' },
                { rank: 2, username: 'BlockchainDev', points: 12359, badge: '🥈' },
                { rank: 3, username: 'AURWhale', points: 9876, badge: '🥉' },
                { rank: 4, username: 'SmartContractGuru', points: 8234, badge: '🏆' },
                { rank: 5, username: 'DeFiMaster', points: 7123, badge: '⭐' }
              ].map((user) => (
                <div key={user.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{user.badge}</div>
                    <div>
                      <div className="font-medium text-gray-900">#{user.rank} {user.username}</div>
                      <div className="text-sm text-gray-600">{user.points.toLocaleString()} points</div>
                    </div>
                  </div>
                  <div className="text-yellow-600 font-bold">
                    {user.points.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-medium text-blue-900 mb-3">ℹ️ About AUR Points</h3>
          <div className="text-sm text-blue-800 space-y-2">
            <p>
              <strong>AUR Points</strong> is a gamification system that rewards users for actively using AUR Explorer features.
            </p>
            <p>
              Earn points by exploring the blockchain, using developer tools, verifying contracts, and participating in the community.
            </p>
            <p>
              Points can be redeemed for exclusive rewards including premium features, NFTs, and special recognition badges.
            </p>
            <p className="font-medium">
              This is a beta feature - point values and rewards may change during the testing period.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AURPointsPage


