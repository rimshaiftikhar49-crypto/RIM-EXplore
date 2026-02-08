'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowUp } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 mt-16">
      <div className="container mx-auto px-4 max-w-6xl py-8">
        {/* Social Media Icons and Back to Top */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
          <div className="flex space-x-3">
            <a href="#" className="w-7 h-7 bg-gray-600 rounded flex items-center justify-center hover:bg-gray-500 transition-colors">
              <span className="text-white text-xs font-bold">✕</span>
            </a>
            <a href="#" className="w-7 h-7 bg-gray-600 rounded flex items-center justify-center hover:bg-gray-500 transition-colors">
              <span className="text-white text-xs font-bold">👁</span>
            </a>
            <a href="#" className="w-7 h-7 bg-gray-600 rounded flex items-center justify-center hover:bg-gray-500 transition-colors">
              <span className="text-white text-xs font-bold">f</span>
            </a>
            <a href="#" className="w-7 h-7 bg-gray-600 rounded flex items-center justify-center hover:bg-gray-500 transition-colors">
              <span className="text-white text-xs font-bold">r</span>
            </a>
          </div>
          <button 
            className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
          >
            <ArrowUp size={16} />
            <span className="text-sm">Back to Top</span>
          </button>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {/* Powered by AUR */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Powered by AUR</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-xs text-gray-400 hover:text-white transition-colors">AUR</Link></li>
              <li><Link href="/blocks" className="text-xs text-gray-400 hover:text-white transition-colors">Blocks</Link></li>
              <li><Link href="/txs" className="text-xs text-gray-400 hover:text-white transition-colors">Transactions</Link></li>
              <li><Link href="/tokens" className="text-xs text-gray-400 hover:text-white transition-colors">Tokens</Link></li>
              <li><Link href="/nfts" className="text-xs text-gray-400 hover:text-white transition-colors">NFTs</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Company</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-xs text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-xs text-gray-400 hover:text-white transition-colors">Brand Assets</Link></li>
              <li><Link href="#" className="text-xs text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="text-xs text-gray-400 hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-xs text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="text-xs text-gray-400 hover:text-white transition-colors">Bug Bounty</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Community</h3>
            <ul className="space-y-2">
              <li><Link href="/api-docs" className="text-xs text-gray-400 hover:text-white transition-colors">API Documentation</Link></li>
              <li><Link href="/knowledge-base" className="text-xs text-gray-400 hover:text-white transition-colors">Knowledge Base</Link></li>
              <li><Link href="#" className="text-xs text-gray-400 hover:text-white transition-colors">Network Status</Link></li>
              <li><Link href="#" className="text-xs text-gray-400 hover:text-white transition-colors">Newsletters</Link></li>
              <li><Link href="#" className="text-xs text-gray-400 hover:text-white transition-colors">Disqus Comments</Link></li>
            </ul>
          </div>

          {/* Products & Services */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Products & Services</h3>
            <ul className="space-y-2">
              <li><Link href="/gas-tracker" className="text-xs text-gray-400 hover:text-white transition-colors">Gas Tracker</Link></li>
              <li><Link href="/dex-tracker" className="text-xs text-gray-400 hover:text-white transition-colors">DEX Tracker</Link></li>
              <li><Link href="/node-tracker" className="text-xs text-gray-400 hover:text-white transition-colors">Node Tracker</Link></li>
              <li><Link href="/label-cloud" className="text-xs text-gray-400 hover:text-white transition-colors">Label Cloud</Link></li>
              <li><Link href="/unit-converter" className="text-xs text-gray-400 hover:text-white transition-colors">Unit Converter</Link></li>
              <li><Link href="/csv-export" className="text-xs text-gray-400 hover:text-white transition-colors">CSV Export</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div className="flex items-center space-x-4">
              <span className="text-xs text-gray-400">AUR (AUR) Blockchain Explorer</span>
              <span className="text-xs text-gray-400">Donations: aur1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</span>
            </div>
            <div className="text-xs text-gray-400">
              © 2025 AUR Blockchain Explorer
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Notice */}
      <div className="bg-gray-900 border-t border-gray-700">
        <div className="container mx-auto px-4 max-w-6xl py-3">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="text-xs text-gray-400">
              🍪 This website uses cookies to improve your experience. By continuing to use this website, you agree to their use.
              <Link href="#" className="text-blue-400 hover:text-blue-300 ml-1">Privacy Policy</Link>
            </div>
            <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors">
              Got it!
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
