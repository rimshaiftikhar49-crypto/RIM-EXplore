'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, User } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm">
      {/* Top Bar - Golden Theme */}
      <div className="bg-gray-800 border-b border-gray-700 py-2">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <span className="text-gray-300">AUR Price: <span className="text-red-400">$4,554.69 (-1.28%)</span></span>
              <span className="text-gray-300">Gas: <span className="text-yellow-400">0.199 Gwei</span></span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-yellow-500 rounded flex items-center justify-center relative hover:bg-yellow-600 transition-colors">
                  <svg className="w-3 h-3 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                </div>
                <div className="w-5 h-5 bg-gray-600 rounded flex items-center justify-center hover:bg-yellow-500 transition-colors">
                  <svg className="w-3 h-3 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 18c1.657 0 3-4.686 3-10.714C15 5.686 13.657 1 12 1s-3 4.686-3 10.286C9 13.314 10.343 18 12 18z"/>
                  </svg>
                </div>
                <div className="w-5 h-5 bg-gray-600 rounded flex items-center justify-center hover:bg-yellow-500 transition-colors">
                  <svg className="w-3 h-3 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.364 5.636a9 9 0 0 1 0 12.728m-2.829-9.9a5 5 0 0 1 0 7.072"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation - Exact Etherscan layout */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded flex items-center justify-center shadow-sm">
                <span className="text-gray-800 font-bold text-xs">A</span>
              </div>
              <span className="text-lg font-bold text-gray-900">AUR</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-yellow-600 font-medium text-sm transition-colors">
                Home
              </Link>

              {/* Blockchain Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium text-sm">
                  <span>Blockchain</span>
                  <ChevronDown size={16} />
                </button>
                <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-2">
                    <div className="mb-2">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">Transactions</div>
                      <Link href="/txs" className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Transactions</Link>
                      <Link href="/pending-txs" className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Pending Transactions</Link>
                      <Link href="/contract-internal-txs" className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Contract Internal Transactions</Link>
                      <Link href="/beacon-deposits" className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Beacon Deposits</Link>
                      <Link href="/beacon-withdrawals" className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Beacon Withdrawals</Link>
                      <Link href="/view-blobs" className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">View Blobs</Link>
                      <Link href="/aa-transactions" className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">AA Transactions <span className="text-xs bg-gray-200 text-gray-600 px-1 rounded">Beta</span></Link>
                      <Link href="/eip-7702-authorizations" className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">EIP-7702 Authorizations <span className="text-xs bg-gray-200 text-gray-600 px-1 rounded">Beta</span> <span className="w-2 h-2 bg-pink-500 rounded-full inline-block ml-1"></span></Link>
                    </div>
                    <div className="border-t border-gray-200 my-2"></div>
                    <div className="mb-2">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">Blocks</div>
                      <Link href="/blocks" className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">View Blocks</Link>
                      <Link href="/forked-blocks" className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Forked Blocks (Reorgs)</Link>
                      <Link href="/uncles" className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Uncles</Link>
                    </div>
                    <div className="border-t border-gray-200 my-2"></div>
                    <div>
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">Accounts</div>
                      <Link href="/top-accounts" className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Top Accounts</Link>
                      <Link href="/verified-contracts" className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Verified Contracts</Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tokens Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium text-sm">
                  <span>Tokens</span>
                  <ChevronDown size={16} />
                </button>
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-2">
                    <Link href="/tokens" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">Top Tokens (ERC-20)</Link>
                    <Link href="/token-transfers" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">Token Transfers (ERC-20)</Link>
                    <Link href="/token-flow-visualizer" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">Token Flow Visualizer <span className="text-xs bg-gray-200 text-gray-600 px-1 rounded">Beta</span></Link>
                  </div>
                </div>
              </div>

              {/* NFTs Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium text-sm">
                  <span>NFTs</span>
                  <ChevronDown size={16} />
                </button>
                <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-2">
                    <Link href="/nfts" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">Top NFTs</Link>
                    <Link href="/top-mints" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">Top Mints</Link>
                    <Link href="/latest-trades" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">Latest Trades</Link>
                    <Link href="/latest-transfers" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">Latest Transfers <span className="w-2 h-2 bg-pink-500 rounded-full inline-block ml-1"></span></Link>
                    <Link href="/latest-mints" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">Latest Mints</Link>
                  </div>
                </div>
              </div>

              {/* Resources Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium text-sm">
                  <span>Resources</span>
                  <ChevronDown size={16} />
                </button>
                <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-2">
                    <Link href="/charts" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">Charts And Stats</Link>
                    <Link href="/top-statistics" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">Top Statistics</Link>
                    <Link href="/leaderboard" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">Leaderboard</Link>
                    <Link href="/aur-points" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">AUR Points <span className="text-xs bg-gray-200 text-gray-600 px-1 rounded">Beta</span></Link>
                    <Link href="/directory" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">Directory</Link>
                    <Link href="/newsletter" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">Newsletter</Link>
                    <Link href="/knowledge-base" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">Knowledge Base</Link>
                  </div>
                </div>
              </div>

              {/* Developers Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium text-sm">
                  <span>Developers</span>
                  <ChevronDown size={16} />
                </button>
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-2">
                    <div className="mb-2">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">API & Documentation</div>
                      <Link href="/api-plans" className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">API Plans</Link>
                      <Link href="/api-docs" className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">API Documentation</Link>
                    </div>
                    <div className="mb-2">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">Developer Tools</div>
                      <Link href="/code-reader" className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Code Reader <span className="text-xs bg-gray-200 text-gray-600 px-1 rounded">Beta</span></Link>
                      <Link href="/verify-contract" className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Verify Contract</Link>
                      <Link href="/similar-contract-search" className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Similar Contract Search</Link>
                      <Link href="/smart-contract-search" className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Smart Contract Search</Link>
                      <Link href="/contract-diff-checker" className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Contract Diff Checker</Link>
                      <Link href="/vyper-online-compiler" className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Vyper Online Compiler</Link>
                      <Link href="/bytecode-to-opcode" className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Bytecode to Opcode</Link>
                      <Link href="/broadcast-transaction" className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded">Broadcast Transaction</Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* More Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium text-sm">
                  <span>More</span>
                  <ChevronDown size={16} />
                </button>
                <div className="absolute top-full right-0 mt-1 w-[600px] bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-6">
                    {/* Header Section */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Tools & Services</h3>
                      <p className="text-sm text-gray-600">Discover more of AURscan's tools and services in one place.</p>
                    </div>
                    
                    {/* Sponsored Section */}
                    <div className="mb-6">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Sponsored</div>
                      <div className="flex items-center bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-3">
                          <span className="text-xs font-bold text-black">b</span>
                        </div>
                        <span className="font-medium">Blockscan Chat</span>
                      </div>
                    </div>
                    
                    {/* Main Grid */}
                    <div className="grid grid-cols-3 gap-8">
                      {/* Tools Column */}
                      <div>
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Tools</div>
                        <div className="space-y-3">
                          <Link href="/input-data-decoder" className="flex items-center space-x-3 text-sm text-gray-700 hover:text-gray-900 transition-colors">
                            <div className="w-5 h-5 flex items-center justify-center">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span>Input Data Decoder</span>
                            <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">Beta</span>
                          </Link>
                          <Link href="/unit-converter" className="flex items-center space-x-3 text-sm text-gray-700 hover:text-gray-900 transition-colors">
                            <div className="w-5 h-5 flex items-center justify-center">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span>Unit Converter</span>
                          </Link>
                          <Link href="/csv-export" className="flex items-center space-x-3 text-sm text-gray-700 hover:text-gray-900 transition-colors">
                            <div className="w-5 h-5 flex items-center justify-center">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span>CSV Export</span>
                          </Link>
                          <Link href="/account-balance-checker" className="flex items-center space-x-3 text-sm text-gray-700 hover:text-gray-900 transition-colors">
                            <div className="w-5 h-5 flex items-center justify-center">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span>Account Balance Checker</span>
                          </Link>
                        </div>
                      </div>
                      
                      {/* Explore Column */}
                      <div>
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Explore</div>
                        <div className="space-y-3">
                          <Link href="/gas-tracker" className="flex items-center space-x-3 text-sm text-gray-700 hover:text-gray-900 transition-colors">
                            <div className="w-5 h-5 flex items-center justify-center">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span>Gas Tracker</span>
                          </Link>
                          <Link href="/dex-tracker" className="flex items-center space-x-3 text-sm text-gray-700 hover:text-gray-900 transition-colors">
                            <div className="w-5 h-5 flex items-center justify-center">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span>DEX Tracker</span>
                          </Link>
                          <Link href="/node-tracker" className="flex items-center space-x-3 text-sm text-gray-700 hover:text-gray-900 transition-colors">
                            <div className="w-5 h-5 flex items-center justify-center">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                                <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V9a1 1 0 00-1-1h-1v-1z" />
                              </svg>
                            </div>
                            <span>Node Tracker</span>
                          </Link>
                          <Link href="/label-cloud" className="flex items-center space-x-3 text-sm text-gray-700 hover:text-gray-900 transition-colors">
                            <div className="w-5 h-5 flex items-center justify-center">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span>Label Cloud</span>
                          </Link>
                          <Link href="/domain-name-lookup" className="flex items-center space-x-3 text-sm text-gray-700 hover:text-gray-900 transition-colors">
                            <div className="w-5 h-5 flex items-center justify-center">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span>Domain Name Lookup</span>
                          </Link>
                        </div>
                      </div>
                      
                      {/* Services Column */}
                      <div>
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Services</div>
                        <div className="space-y-3">
                          <Link href="/token-approvals" className="flex items-center space-x-3 text-sm text-gray-700 hover:text-gray-900 transition-colors">
                            <div className="w-5 h-5 flex items-center justify-center">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span>Token Approvals</span>
                            <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">Beta</span>
                          </Link>
                          <Link href="/verified-signature" className="flex items-center space-x-3 text-sm text-gray-700 hover:text-gray-900 transition-colors">
                            <div className="w-5 h-5 flex items-center justify-center">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span>Verified Signature</span>
                          </Link>
                          <Link href="/input-data-messages" className="flex items-center space-x-3 text-sm text-gray-700 hover:text-gray-900 transition-colors">
                            <div className="w-5 h-5 flex items-center justify-center">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span>Input Data Messages (IDM)</span>
                            <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">Beta</span>
                          </Link>
                          <Link href="/advanced-filter" className="flex items-center space-x-3 text-sm text-gray-700 hover:text-gray-900 transition-colors">
                            <div className="w-5 h-5 flex items-center justify-center">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span>Advanced Filter</span>
                            <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">Beta</span>
                          </Link>
                          <Link href="/blockscan-chat" className="flex items-center space-x-3 text-sm text-gray-700 hover:text-gray-900 transition-colors">
                            <div className="w-5 h-5 flex items-center justify-center">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span>Blockscan Chat</span>
                            <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">Beta</span>
                            <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>

            {/* Sign In Button */}
            <div className="flex items-center space-x-4">
              <Link href="/signin" className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-yellow-600 transition-colors">
                <User size={16} />
                <span>Sign In</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 max-w-6xl py-4">
            <nav className="space-y-2">
              <Link href="/" className="block py-2 text-gray-700 hover:text-blue-600">Home</Link>
              <Link href="/blocks" className="block py-2 text-gray-700 hover:text-blue-600">Blocks</Link>
              <Link href="/txs" className="block py-2 text-gray-700 hover:text-blue-600">Transactions</Link>
              <Link href="/tokens" className="block py-2 text-gray-700 hover:text-blue-600">Tokens</Link>
              <Link href="/nfts" className="block py-2 text-gray-700 hover:text-blue-600">NFTs</Link>
              <Link href="/gas-tracker" className="block py-2 text-gray-700 hover:text-blue-600">Gas Tracker</Link>
              <Link href="/signin" className="block py-2 text-gray-700 hover:text-blue-600">Sign In</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
