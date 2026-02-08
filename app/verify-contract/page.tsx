'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Shield, Upload, CheckCircle, AlertCircle, Info } from 'lucide-react'

const VerifyContractPage = () => {
  const [formData, setFormData] = useState({
    contractAddress: '',
    contractName: '',
    compilerVersion: '0.8.19',
    optimizationEnabled: false,
    optimizationRuns: '200',
    sourceCode: '',
    constructorArguments: '',
    libraries: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [verificationResult, setVerificationResult] = useState<'success' | 'error' | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // TODO: Implement actual contract verification
      // For demo purposes, simulate verification process
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Simulate random success/failure
      const success = Math.random() > 0.3
      setVerificationResult(success ? 'success' : 'error')
    } catch (error) {
      setVerificationResult('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const compilerVersions = [
    '0.8.19', '0.8.18', '0.8.17', '0.8.16', '0.8.15', '0.8.14', '0.8.13',
    '0.8.12', '0.8.11', '0.8.10', '0.8.9', '0.8.8', '0.8.7', '0.8.6'
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-yellow-600">Home</Link>
            <span>/</span>
            <Link href="/developers" className="hover:text-yellow-600">Developers</Link>
            <span>/</span>
            <span className="text-yellow-600">Verify Contract</span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-8 h-8 text-yellow-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Verify Smart Contract</h1>
              <p className="text-gray-600">Verify and publish your smart contract source code</p>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Contract Verification Benefits:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Increases transparency and trust</li>
                <li>Enables source code viewing on the explorer</li>
                <li>Allows interaction with contract functions</li>
                <li>Provides better debugging and analysis tools</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Verification Form */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Contract Verification Form</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Contract Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contract Address *
              </label>
              <input
                type="text"
                name="contractAddress"
                value={formData.contractAddress}
                onChange={handleInputChange}
                placeholder="0x..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                required
              />
            </div>

            {/* Contract Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contract Name *
              </label>
              <input
                type="text"
                name="contractName"
                value={formData.contractName}
                onChange={handleInputChange}
                placeholder="MyContract"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                required
              />
            </div>

            {/* Compiler Version */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Compiler Version *
              </label>
              <select
                name="compilerVersion"
                value={formData.compilerVersion}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              >
                {compilerVersions.map(version => (
                  <option key={version} value={version}>v{version}</option>
                ))}
              </select>
            </div>

            {/* Optimization */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="optimizationEnabled"
                    checked={formData.optimizationEnabled}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Optimization Enabled</span>
                </label>
              </div>
              
              {formData.optimizationEnabled && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Optimization Runs
                  </label>
                  <input
                    type="number"
                    name="optimizationRuns"
                    value={formData.optimizationRuns}
                    onChange={handleInputChange}
                    placeholder="200"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
              )}
            </div>

            {/* Source Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Solidity Source Code *
              </label>
              <textarea
                name="sourceCode"
                value={formData.sourceCode}
                onChange={handleInputChange}
                placeholder="// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    // Your contract code here
}"
                rows={15}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 font-mono text-sm"
                required
              />
            </div>

            {/* Constructor Arguments */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Constructor Arguments (if any)
              </label>
              <textarea
                name="constructorArguments"
                value={formData.constructorArguments}
                onChange={handleInputChange}
                placeholder="ABI-encoded constructor arguments (without 0x prefix)"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 font-mono text-sm"
              />
            </div>

            {/* Libraries */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Library Addresses (if any)
              </label>
              <textarea
                name="libraries"
                value={formData.libraries}
                onChange={handleInputChange}
                placeholder="LibraryName:0x1234567890123456789012345678901234567890"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 font-mono text-sm"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Verifying Contract...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    <span>Verify Contract</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Verification Result */}
          {verificationResult && (
            <div className="px-6 py-4 border-t border-gray-200">
              {verificationResult === 'success' ? (
                <div className="flex items-center space-x-3 text-green-600">
                  <CheckCircle className="w-6 h-6" />
                  <div>
                    <p className="font-medium">Contract Verified Successfully!</p>
                    <p className="text-sm text-gray-600">Your contract source code has been verified and published.</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3 text-red-600">
                  <AlertCircle className="w-6 h-6" />
                  <div>
                    <p className="font-medium">Verification Failed</p>
                    <p className="text-sm text-gray-600">Please check your source code and compiler settings.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-medium text-yellow-800 mb-2">Verification Tips:</h3>
          <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
            <li>Make sure the compiler version matches exactly</li>
            <li>Include all imported contracts in your source code</li>
            <li>Constructor arguments should be ABI-encoded</li>
            <li>Optimization settings must match those used during deployment</li>
            <li>Remove any comments or formatting that wasn't in the original code</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default VerifyContractPage


