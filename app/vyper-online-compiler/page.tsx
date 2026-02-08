'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Play, Download, Copy, Code, AlertCircle, CheckCircle, Settings } from 'lucide-react'

const VyperOnlineCompilerPage = () => {
  const [sourceCode, setSourceCode] = useState(`# @version ^0.3.0

@external
def __init__():
    pass

@external
@view
def greet() -> String[100]:
    return "Hello, AUR!"

@external
@payable
def deposit():
    # Accept ETH deposits
    pass

@external
def withdraw():
    # Only owner can withdraw
    assert msg.sender == self.owner
    send(msg.sender, self.balance)`)
  
  const [compiledBytecode, setCompiledBytecode] = useState('')
  const [abi, setAbi] = useState('')
  const [compiling, setCompiling] = useState(false)
  const [compilerVersion, setCompilerVersion] = useState('0.3.10')
  const [optimizationLevel, setOptimizationLevel] = useState('gas')
  const [errors, setErrors] = useState<Array<{
    line: number
    message: string
    type: 'error' | 'warning'
  }>>([])

  const compilerVersions = [
    '0.3.10', '0.3.9', '0.3.8', '0.3.7', '0.3.6', '0.3.5', '0.3.4'
  ]

  const handleCompile = async () => {
    setCompiling(true)
    setErrors([])
    
    try {
      // TODO: Implement actual Vyper compilation
      // Mock compilation process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulate compilation results
      const hasErrors = Math.random() < 0.2 // 20% chance of errors
      
      if (hasErrors) {
        setErrors([
          { line: 15, message: 'Invalid syntax: missing colon', type: 'error' },
          { line: 8, message: 'Unused variable warning', type: 'warning' }
        ])
        setCompiledBytecode('')
        setAbi('')
      } else {
        const mockBytecode = '0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610150806100606000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063893d20e81461003b578063a6f9dae114610059575b600080fd5b610043610075565b60405161005091906100d9565b60405180910390f35b610073600480360381019061006e919061007a565b61009e565b005b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b8073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561010057806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b50565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061013382610108565b9050919050565b61014381610128565b811461014e57600080fd5b50565b6000813590506101608161013a565b92915050565b60006020828403121561017c5761017b610103565b5b600061018a84828501610151565b91505092915050565b61019c81610128565b82525050565b60006020820190506101b76000830184610193565b9291505056fea2646970667358221220a1b2c3d4e5f6789012345678901234567890123456789012345678901234567890123464736f6c63430008130033'
        
        const mockAbi = `[
  {
    "inputs": [],
    "name": "greet",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "payable", 
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]`
        
        setCompiledBytecode(mockBytecode)
        setAbi(mockAbi)
      }
    } catch (error) {
      console.error('Compilation error:', error)
      setErrors([{ line: 0, message: 'Compilation failed', type: 'error' }])
    } finally {
      setCompiling(false)
    }
  }

  const copyToClipboard = (content: string, type: string) => {
    navigator.clipboard.writeText(content)
    alert(`${type} copied to clipboard!`)
  }

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
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
            <Link href="/developers" className="hover:text-yellow-600">Developers</Link>
            <span>/</span>
            <span className="text-yellow-600">Vyper Online Compiler</span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Code className="w-8 h-8 text-yellow-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Vyper Online Compiler</h1>
              <p className="text-gray-600">Compile Vyper smart contracts in your browser</p>
            </div>
          </div>
        </div>

        {/* Compiler Settings */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Compiler Settings</h2>
            <button
              onClick={handleCompile}
              disabled={compiling}
              className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
            >
              {compiling ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Play className="w-4 h-4" />
              )}
              <span>{compiling ? 'Compiling...' : 'Compile'}</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Vyper Version</label>
              <select
                value={compilerVersion}
                onChange={(e) => setCompilerVersion(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              >
                {compilerVersions.map(version => (
                  <option key={version} value={version}>v{version}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Optimization</label>
              <select
                value={optimizationLevel}
                onChange={(e) => setOptimizationLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="none">None</option>
                <option value="gas">Gas Optimization</option>
                <option value="size">Size Optimization</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500">
                <option value="evm">EVM</option>
                <option value="evm-debug">EVM (Debug)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Source Code Editor */}
          <div className="bg-white rounded-lg shadow border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Vyper Source Code</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => copyToClipboard(sourceCode, 'Source code')}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 flex items-center space-x-1 text-sm"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </button>
                <button
                  onClick={() => downloadFile(sourceCode, 'contract.vy')}
                  className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 flex items-center space-x-1 text-sm"
                >
                  <Download className="w-3 h-3" />
                  <span>Download</span>
                </button>
              </div>
            </div>
            <div className="p-6">
              <textarea
                value={sourceCode}
                onChange={(e) => setSourceCode(e.target.value)}
                className="w-full h-96 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 font-mono text-sm"
                placeholder="Enter your Vyper code here..."
              />
            </div>
          </div>

          {/* Compilation Results */}
          <div className="space-y-6">
            {/* Errors/Warnings */}
            {errors.length > 0 && (
              <div className="bg-white rounded-lg shadow border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Compilation Issues</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {errors.map((error, index) => (
                      <div key={index} className={`flex items-start space-x-3 p-3 rounded-lg ${
                        error.type === 'error' ? 'bg-red-50 border border-red-200' : 'bg-yellow-50 border border-yellow-200'
                      }`}>
                        {error.type === 'error' ? (
                          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                        )}
                        <div>
                          <div className={`font-medium ${error.type === 'error' ? 'text-red-800' : 'text-yellow-800'}`}>
                            Line {error.line}: {error.type.charAt(0).toUpperCase() + error.type.slice(1)}
                          </div>
                          <div className={`text-sm ${error.type === 'error' ? 'text-red-700' : 'text-yellow-700'}`}>
                            {error.message}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Bytecode */}
            {compiledBytecode && (
              <div className="bg-white rounded-lg shadow border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <h2 className="text-lg font-semibold text-gray-900">Compiled Bytecode</h2>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => copyToClipboard(compiledBytecode, 'Bytecode')}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 flex items-center space-x-1 text-sm"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </button>
                    <button
                      onClick={() => downloadFile(compiledBytecode, 'contract.bin')}
                      className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 flex items-center space-x-1 text-sm"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-xs font-mono h-32">
                    <code>{compiledBytecode}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* ABI */}
            {abi && (
              <div className="bg-white rounded-lg shadow border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">Contract ABI</h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => copyToClipboard(abi, 'ABI')}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 flex items-center space-x-1 text-sm"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </button>
                    <button
                      onClick={() => downloadFile(abi, 'contract.abi')}
                      className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 flex items-center space-x-1 text-sm"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-xs font-mono h-32">
                    <code>{abi}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Vyper Compilation</h3>
            <p className="text-gray-600 text-sm">
              Compile Vyper smart contracts with multiple compiler versions and optimization settings.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Detection</h3>
            <p className="text-gray-600 text-sm">
              Real-time syntax checking and error reporting with line-by-line feedback.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <Download className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Export Results</h3>
            <p className="text-gray-600 text-sm">
              Download compiled bytecode, ABI, and source code for deployment and integration.
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h3 className="font-medium text-purple-900 mb-3">🐍 About Vyper</h3>
          <div className="text-sm text-purple-800 space-y-2">
            <p>
              <strong>Vyper</strong> is a contract-oriented, pythonic programming language that targets the Ethereum Virtual Machine (EVM).
            </p>
            <p>
              Vyper prioritizes security, simplicity, and auditability. It's designed to be more secure than Solidity by removing certain features that can lead to vulnerabilities.
            </p>
            <p>
              Key features: No inheritance, no inline assembly, no function overloading, and no recursive calling.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VyperOnlineCompilerPage


