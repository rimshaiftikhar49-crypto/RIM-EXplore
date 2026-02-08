'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Search, Upload, Copy, Download, FileText } from 'lucide-react'

const CodeReaderPage = () => {
  const [contractAddress, setContractAddress] = useState('')
  const [sourceCode, setSourceCode] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLoadContract = async () => {
    if (!contractAddress.trim()) return
    
    setLoading(true)
    try {
      // TODO: Implement actual contract source code fetching
      // For now, show mock Solidity code
      const mockCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title AUR Token
 * @dev Implementation of the AUR Token
 */
contract AURToken is ERC20, Ownable {
    uint256 private constant INITIAL_SUPPLY = 1000000000 * 10**18; // 1 billion tokens
    
    mapping(address => bool) public blacklisted;
    
    event Blacklisted(address indexed account);
    event UnBlacklisted(address indexed account);
    
    constructor() ERC20("AUR Token", "AUR") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
    
    /**
     * @dev Blacklist an address from transferring tokens
     */
    function blacklist(address account) external onlyOwner {
        blacklisted[account] = true;
        emit Blacklisted(account);
    }
    
    /**
     * @dev Remove address from blacklist
     */
    function unBlacklist(address account) external onlyOwner {
        blacklisted[account] = false;
        emit UnBlacklisted(account);
    }
    
    /**
     * @dev Override transfer to check blacklist
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override {
        require(!blacklisted[from], "Sender is blacklisted");
        require(!blacklisted[to], "Recipient is blacklisted");
        super._beforeTokenTransfer(from, to, amount);
    }
    
    /**
     * @dev Mint new tokens (only owner)
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
    
    /**
     * @dev Burn tokens
     */
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}`
      
      setSourceCode(mockCode)
    } catch (error) {
      console.error('Error loading contract:', error)
      alert('Failed to load contract source code')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sourceCode)
    alert('Source code copied to clipboard!')
  }

  const downloadCode = () => {
    const blob = new Blob([sourceCode], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${contractAddress || 'contract'}.sol`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-yellow-600">Home</Link>
            <span>/</span>
            <span className="text-yellow-600">Code Reader</span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="w-8 h-8 text-yellow-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Smart Contract Code Reader</h1>
              <p className="text-gray-600">Read and analyze smart contract source code</p>
            </div>
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded font-medium">Beta</span>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Load Contract Source Code</h2>
          
          <div className="flex space-x-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contract Address
              </label>
              <input
                type="text"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                placeholder="0x..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleLoadContract}
                disabled={loading || !contractAddress.trim()}
                className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <Search className="w-5 h-5" />
                )}
                <span>{loading ? 'Loading...' : 'Load Code'}</span>
              </button>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <p>Enter a contract address to load and view its verified source code.</p>
            <p className="mt-1">Example: <code className="bg-gray-100 px-2 py-1 rounded">0xA0b86a33E6441e9e3DF7d0E7B8a5C123456789</code></p>
          </div>
        </div>

        {/* Code Display */}
        {sourceCode && (
          <div className="bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Source Code</h2>
                <p className="text-sm text-gray-600">Contract: {contractAddress}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center space-x-2 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </button>
                <button
                  onClick={downloadCode}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center space-x-2 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                <code>{sourceCode}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Source Code Analysis</h3>
            <p className="text-gray-600 text-sm">
              View and analyze verified smart contract source code with syntax highlighting.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Search</h3>
            <p className="text-gray-600 text-sm">
              Instantly load contract source code by entering the contract address.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <Download className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Export & Share</h3>
            <p className="text-gray-600 text-sm">
              Copy to clipboard or download source code files for offline analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodeReaderPage


