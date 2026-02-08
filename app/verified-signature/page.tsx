'use client'

import React, { useState } from 'react'
import { CheckCircle, AlertCircle, Copy, Check, RefreshCw, FileText } from 'lucide-react'

interface SignatureVerification {
  isValid: boolean
  signer: string
  message: string
  hash: string
  signature: string
  algorithm: string
  timestamp?: number
}

const VerifiedSignaturePage = () => {
  const [message, setMessage] = useState('')
  const [signature, setSignature] = useState('')
  const [verification, setVerification] = useState<SignatureVerification | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleVerify = async () => {
    if (!message.trim() || !signature.trim()) {
      setError('Please enter both message and signature')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      // Simulate verification logic
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock verification result
      const mockVerification: SignatureVerification = {
        isValid: Math.random() > 0.3, // 70% chance of valid signature
        signer: '0x742d35Cc6634C0532925a3b8D82A5eB6fD7D4e7a',
        message: message,
        hash: '0x' + Math.random().toString(16).substr(2, 64),
        signature: signature,
        algorithm: 'eth_personal_sign',
        timestamp: Date.now()
      }
      
      setVerification(mockVerification)
    } catch (err) {
      setError('Failed to verify signature. Please check the format.')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const exampleMessages = [
    'Welcome to AUR Blockchain Explorer!',
    'Sign this message to authenticate with your wallet.',
    'I agree to the terms and conditions of this service.',
    'Verify ownership of this wallet address.'
  ]

  const exampleSignatures = [
    '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1b',
    '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1c'
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Verified Signature</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Verify message signatures and authenticate wallet ownership
                </p>
              </div>
              <div className="flex items-center space-x-2 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                <CheckCircle className="w-3 h-3" />
                <span>Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Signature Verification</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter the original message that was signed..."
                    className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Signature (hex)
                  </label>
                  <textarea
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    placeholder="0x1234567890abcdef..."
                    className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 font-mono text-sm"
                  />
                </div>
                
                <button
                  onClick={handleVerify}
                  disabled={loading || !message.trim() || !signature.trim()}
                  className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle className="w-4 h-4" />
                  )}
                  <span>Verify Signature</span>
                </button>
              </div>
            </div>

            {/* Examples */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Example Messages</h3>
              <div className="space-y-2">
                {exampleMessages.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setMessage(example)}
                    className="block w-full text-left p-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                  >
                    "{example}"
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Verification Result</h2>
              
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-red-700">{error}</span>
                  </div>
                </div>
              )}

              {verification ? (
                <div className="space-y-4">
                  {/* Status */}
                  <div className={`p-4 rounded-lg border-2 ${
                    verification.isValid 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex items-center space-x-2">
                      {verification.isValid ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-600" />
                      )}
                      <span className={`font-semibold ${
                        verification.isValid ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {verification.isValid ? 'Signature Valid' : 'Signature Invalid'}
                      </span>
                    </div>
                    <p className={`text-sm mt-1 ${
                      verification.isValid ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {verification.isValid 
                        ? 'The signature has been successfully verified against the message.'
                        : 'The signature does not match the provided message or is malformed.'
                      }
                    </p>
                  </div>

                  {/* Details */}
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-1">Signer Address</div>
                      <div className="flex items-center space-x-2">
                        <code className="px-3 py-2 bg-gray-100 rounded-lg text-sm font-mono">
                          {verification.signer}
                        </code>
                        <button
                          onClick={() => copyToClipboard(verification.signer)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-1">Message Hash</div>
                      <div className="flex items-center space-x-2">
                        <code className="px-3 py-2 bg-gray-100 rounded-lg text-sm font-mono break-all">
                          {verification.hash}
                        </code>
                        <button
                          onClick={() => copyToClipboard(verification.hash)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-1">Signature</div>
                      <div className="flex items-center space-x-2">
                        <code className="px-3 py-2 bg-gray-100 rounded-lg text-sm font-mono break-all">
                          {verification.signature}
                        </code>
                        <button
                          onClick={() => copyToClipboard(verification.signature)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-1">Algorithm</div>
                      <div className="px-3 py-2 bg-gray-100 rounded-lg text-sm font-mono">
                        {verification.algorithm}
                      </div>
                    </div>
                  </div>
                </div>
              ) : !loading && !error && (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Enter message and signature to verify</p>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                About Signature Verification
              </h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p>
                  Signature verification allows you to prove ownership of a wallet address by verifying that a message was signed by the private key corresponding to that address.
                </p>
                <p>
                  <strong>Common use cases:</strong>
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Wallet authentication</li>
                  <li>Proving ownership of addresses</li>
                  <li>Secure message verification</li>
                  <li>Smart contract interactions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifiedSignaturePage
