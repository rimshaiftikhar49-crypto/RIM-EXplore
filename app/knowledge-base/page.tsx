'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Book, Search, ChevronRight, ExternalLink, HelpCircle, FileText, Video, Code, Shield, BarChart3, Users } from 'lucide-react'

const KnowledgeBasePage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: HelpCircle,
      description: 'Basic guides for new users',
      articles: [
        { title: 'What is AUR Blockchain?', type: 'article', readTime: '5 min' },
        { title: 'How to Search the Explorer', type: 'article', readTime: '3 min' },
        { title: 'Understanding Transaction Details', type: 'article', readTime: '7 min' },
        { title: 'Reading Block Information', type: 'article', readTime: '4 min' }
      ]
    },
    {
      id: 'developers',
      title: 'Developer Guides',
      icon: Code,
      description: 'Technical documentation for developers',
      articles: [
        { title: 'API Documentation', type: 'article', readTime: '15 min' },
        { title: 'Smart Contract Verification', type: 'video', readTime: '8 min' },
        { title: 'Using the Code Reader', type: 'article', readTime: '6 min' },
        { title: 'Bytecode Analysis Tutorial', type: 'video', readTime: '12 min' },
        { title: 'Broadcasting Transactions', type: 'article', readTime: '5 min' }
      ]
    },
    {
      id: 'tokens',
      title: 'Tokens & NFTs',
      icon: FileText,
      description: 'Understanding tokens and NFTs',
      articles: [
        { title: 'ERC-20 Token Standards', type: 'article', readTime: '10 min' },
        { title: 'NFT Collection Analysis', type: 'article', readTime: '8 min' },
        { title: 'Token Approval Security', type: 'video', readTime: '6 min' },
        { title: 'Reading Token Contracts', type: 'article', readTime: '12 min' }
      ]
    },
    {
      id: 'security',
      title: 'Security & Best Practices',
      icon: Shield,
      description: 'Stay safe while using blockchain',
      articles: [
        { title: 'Wallet Security Guide', type: 'article', readTime: '15 min' },
        { title: 'Identifying Scam Contracts', type: 'video', readTime: '10 min' },
        { title: 'Transaction Safety Tips', type: 'article', readTime: '7 min' },
        { title: 'Gas Optimization Strategies', type: 'article', readTime: '9 min' }
      ]
    },
    {
      id: 'advanced',
      title: 'Advanced Features',
      icon: BarChart3,
      description: 'Advanced blockchain analysis',
      articles: [
        { title: 'Using Advanced Filters', type: 'video', readTime: '8 min' },
        { title: 'Network Statistics Explained', type: 'article', readTime: '12 min' },
        { title: 'MEV and Transaction Ordering', type: 'article', readTime: '18 min' },
        { title: 'Beacon Chain Deep Dive', type: 'video', readTime: '25 min' }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: HelpCircle,
      description: 'Common issues and solutions',
      articles: [
        { title: 'Transaction Not Found', type: 'article', readTime: '3 min' },
        { title: 'Why is my transaction pending?', type: 'article', readTime: '5 min' },
        { title: 'Contract Verification Failed', type: 'article', readTime: '8 min' },
        { title: 'API Rate Limit Errors', type: 'article', readTime: '4 min' }
      ]
    }
  ]

  const allArticles = categories.flatMap(cat => 
    cat.articles.map(article => ({ ...article, category: cat.title }))
  )

  const filteredArticles = searchTerm 
    ? allArticles.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4 text-red-500" />
      case 'article': return <FileText className="w-4 h-4 text-blue-500" />
      default: return <FileText className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-yellow-600">Home</Link>
            <span>/</span>
            <span className="text-yellow-600">Knowledge Base</span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Book className="w-8 h-8 text-yellow-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Knowledge Base</h1>
              <p className="text-gray-600">Learn how to use AUR Explorer and understand blockchain data</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles, guides, and tutorials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-lg"
            />
          </div>
        </div>

        {/* Search Results */}
        {searchTerm && (
          <div className="bg-white rounded-lg shadow border border-gray-200 mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Search Results ({filteredArticles.length})
              </h2>
            </div>
            <div className="p-6">
              {filteredArticles.length > 0 ? (
                <div className="space-y-4">
                  {filteredArticles.map((article, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      {getTypeIcon(article.type)}
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{article.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                          <span>{article.category}</span>
                          <span>•</span>
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-500 mb-2">No articles found matching "{searchTerm}"</div>
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Categories */}
        {!searchTerm && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <div key={category.id} className="bg-white rounded-lg shadow border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {category.articles.map((article, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                          <div className="flex items-center space-x-3">
                            {getTypeIcon(article.type)}
                            <span className="text-sm font-medium text-gray-900">{article.title}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">{article.readTime}</span>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <button className="text-sm text-yellow-600 hover:text-yellow-700 font-medium flex items-center space-x-1">
                        <span>View All {category.articles.length} Articles</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Popular Articles */}
        <div className="mt-12 bg-white rounded-lg shadow border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Popular This Week</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'How to Verify Smart Contracts', views: '12.3k', type: 'video' },
                { title: 'Understanding Gas Fees', views: '8.7k', type: 'article' },
                { title: 'Token Security Best Practices', views: '6.2k', type: 'article' },
                { title: 'API Integration Guide', views: '4.9k', type: 'video' }
              ].map((article, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  {getTypeIcon(article.type)}
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{article.title}</h3>
                    <div className="text-sm text-gray-500 mt-1">{article.views} views this week</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-medium text-yellow-900 mb-3">💬 Need More Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Book className="w-6 h-6 text-yellow-600" />
              </div>
              <h4 className="font-medium text-yellow-900 mb-1">Documentation</h4>
              <p className="text-yellow-700">Comprehensive technical docs</p>
              <Link href="/api-docs" className="text-yellow-600 hover:text-yellow-700 font-medium">
                View API Docs →
              </Link>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
              <h4 className="font-medium text-yellow-900 mb-1">Community</h4>
              <p className="text-yellow-700">Join our Discord community</p>
              <a href="#" className="text-yellow-600 hover:text-yellow-700 font-medium">
                Join Discord →
              </a>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <HelpCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <h4 className="font-medium text-yellow-900 mb-1">Support</h4>
              <p className="text-yellow-700">Contact our support team</p>
              <a href="mailto:support@aur-explorer.com" className="text-yellow-600 hover:text-yellow-700 font-medium">
                Email Support →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KnowledgeBasePage
