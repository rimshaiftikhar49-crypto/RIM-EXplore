'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { GitCompare, Upload, Download, Copy, RefreshCw } from 'lucide-react'

const ContractDiffCheckerPage = () => {
  const [contract1, setContract1] = useState('')
  const [contract2, setContract2] = useState('')
  const [loading, setLoading] = useState(false)
  const [diffResult, setDiffResult] = useState<{
    contract1Info: any
    contract2Info: any
    differences: Array<{
      type: 'added' | 'removed' | 'modified'
      line: number
      content: string
      description: string
    }>
    similarity: number
  } | null>(null)

  const handleCompare = async () => {
    if (!contract1.trim() || !contract2.trim()) return
    
    setLoading(true)
    try {
      // TODO: Implement actual contract diff checking
      // Mock diff results
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const mockDiff = {
        contract1Info: {
          address: contract1,
          name: 'TokenA',
          compiler: 'Solidity 0.8.19',
          verified: true
        },
        contract2Info: {
          address: contract2,
          name: 'TokenB', 
          compiler: 'Solidity 0.8.18',
          verified: true
        },
        differences: [
          {
            type: 'modified' as const,
            line: 45,
            content: 'function transfer(address to, uint256 amount)',
            description: 'Transfer function signature differs'
          },
          {
            type: 'added' as const,
            line: 67,
            content: 'function burn(uint256 amount) external',
            description: 'Burn function added in contract 2'
          },
          {
            type: 'removed' as const,
            line: 89,
            content: 'modifier onlyOwner()',
            description: 'Owner modifier removed from contract 2'
          },
          {
            type: 'modified' as const,
            line: 123,
            content: 'uint256 public totalSupply = 1000000',
            description: 'Total supply value differs'
          }
        ],
        similarity: 78.5
      }
      
      setDiffResult(mockDiff)
    } catch (error) {
      console.error('Error comparing contracts:', error)
      alert('Failed to compare contracts')
    } finally {
      setLoading(false)
    }
  }

  const getDiffTypeColor = (type: string) => {
    switch (type) {
      case 'added': return 'bg-green-100 text-green-800 border-green-200'
      case 'removed': return 'bg-red-100 text-red-800 border-red-200'
      case 'modified': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getDiffTypeIcon = (type: string) => {
    switch (type) {
      case 'added': return '+'
      case 'removed': return '-'
      case 'modified': return '~'
      default: return '?'
    }
  }

  const copyDiffReport = () => {
    if (!diffResult) return
    
    const report = `Contract Diff Report
Contract 1: ${diffResult.contract1Info.address} (${diffResult.contract1Info.name})
Contract 2: ${diffResult.contract2Info.address} (${diffResult.contract2Info.name})
Similarity: ${diffResult.similarity}%

Differences:
${diffResult.differences.map(diff => 
  `${getDiffTypeIcon(diff.type)} Line ${diff.line}: ${diff.description}`
).join('\n')}
`
    
    navigator.clipboard.writeText(report)
    alert('Diff report copied to clipboard!')
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
            <span className="text-yellow-600">Contract Diff Checker</span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <GitCompare className="w-8 h-8 text-yellow-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Contract Diff Checker</h1>
              <p className="text-gray-600">Compare two smart contracts and identify differences</p>
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Compare Contracts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contract 1 Address
              </label>
              <input
                type="text"
                value={contract1}
                onChange={(e) => setContract1(e.target.value)}
                placeholder="0x..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contract 2 Address
              </label>
              <input
                type="text"
                value={contract2}
                onChange={(e) => setContract2(e.target.value)}
                placeholder="0x..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleCompare}
              disabled={loading || !contract1.trim() || !contract2.trim()}
              className="px-8 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <GitCompare className="w-5 h-5" />
              )}
              <span>{loading ? 'Comparing Contracts...' : 'Compare Contracts'}</span>
            </button>
          </div>
        </div>

        {/* Results */}
        {diffResult && (
          <div className="space-y-8">
            {/* Summary */}
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Comparison Summary</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={copyDiffReport}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 flex items-center space-x-1 text-sm"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy Report</span>
                  </button>
                  <button className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 flex items-center space-x-1 text-sm">
                    <Download className="w-3 h-3" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-1">{diffResult.similarity.toFixed(1)}%</div>
                  <div className="text-sm text-gray-600">Similarity Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{diffResult.differences.length}</div>
                  <div className="text-sm text-gray-600">Differences Found</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">2</div>
                  <div className="text-sm text-gray-600">Contracts Compared</div>
                </div>
              </div>
            </div>

            {/* Contract Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contract 1</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Name:</span> {diffResult.contract1Info.name}</div>
                  <div><span className="font-medium">Address:</span> <code className="bg-gray-100 px-2 py-1 rounded">{diffResult.contract1Info.address}</code></div>
                  <div><span className="font-medium">Compiler:</span> {diffResult.contract1Info.compiler}</div>
                  <div><span className="font-medium">Verified:</span> {diffResult.contract1Info.verified ? '✅ Yes' : '❌ No'}</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contract 2</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Name:</span> {diffResult.contract2Info.name}</div>
                  <div><span className="font-medium">Address:</span> <code className="bg-gray-100 px-2 py-1 rounded">{diffResult.contract2Info.address}</code></div>
                  <div><span className="font-medium">Compiler:</span> {diffResult.contract2Info.compiler}</div>
                  <div><span className="font-medium">Verified:</span> {diffResult.contract2Info.verified ? '✅ Yes' : '❌ No'}</div>
                </div>
              </div>
            </div>

            {/* Differences */}
            <div className="bg-white rounded-lg shadow border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Detailed Differences</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {diffResult.differences.map((diff, index) => (
                    <div key={index} className={`border rounded-lg p-4 ${getDiffTypeColor(diff.type)}`}>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-white bg-opacity-50 flex items-center justify-center font-bold text-sm">
                          {getDiffTypeIcon(diff.type)}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium mb-1">Line {diff.line}: {diff.description}</div>
                          <code className="text-sm bg-white bg-opacity-50 px-2 py-1 rounded">{diff.content}</code>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Help */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-medium text-yellow-900 mb-3">💡 Tips for Contract Comparison</h3>
          <div className="text-sm text-yellow-800 space-y-2">
            <p>• Both contracts should be verified for accurate comparison</p>
            <p>• Large differences may indicate completely different functionality</p>
            <p>• Pay attention to security-critical functions like access controls</p>
            <p>• Use this tool to identify potential contract clones or forks</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContractDiffCheckerPage


