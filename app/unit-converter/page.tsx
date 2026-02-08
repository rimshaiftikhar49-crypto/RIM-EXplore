'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calculator, ArrowUpDown, Copy } from 'lucide-react'

const UnitConverterPage = () => {
  const [inputValue, setInputValue] = useState('')
  const [inputUnit, setInputUnit] = useState('ether')
  const [outputUnit, setOutputUnit] = useState('wei')
  const [result, setResult] = useState('')

  const units = [
    { value: 'wei', label: 'Wei', factor: '1' },
    { value: 'kwei', label: 'Kwei (Babbage)', factor: '1,000' },
    { value: 'mwei', label: 'Mwei (Lovelace)', factor: '1,000,000' },
    { value: 'gwei', label: 'Gwei (Shannon)', factor: '1,000,000,000' },
    { value: 'szabo', label: 'Szabo', factor: '1,000,000,000,000' },
    { value: 'finney', label: 'Finney', factor: '1,000,000,000,000,000' },
    { value: 'ether', label: 'Ether', factor: '1,000,000,000,000,000,000' },
    { value: 'kether', label: 'Kether (Grand)', factor: '1,000,000,000,000,000,000,000' },
    { value: 'mether', label: 'Mether', factor: '1,000,000,000,000,000,000,000,000' },
    { value: 'gether', label: 'Gether', factor: '1,000,000,000,000,000,000,000,000,000' }
  ]

  const getUnitFactor = (unit: string): bigint => {
    const factors: { [key: string]: bigint } = {
      wei: BigInt(1),
      kwei: BigInt(1000),
      mwei: BigInt(1000000),
      gwei: BigInt(1000000000),
      szabo: BigInt(1000000000000),
      finney: BigInt(1000000000000000),
      ether: BigInt(1000000000000000000),
      kether: BigInt(1000000000000000000000),
      mether: BigInt(1000000000000000000000000),
      gether: BigInt(1000000000000000000000000000)
    }
    return factors[unit] || BigInt(1)
  }

  const convertUnits = () => {
    if (!inputValue.trim()) {
      setResult('')
      return
    }

    try {
      // Handle decimal inputs by converting to wei first
      const inputNumber = parseFloat(inputValue)
      if (isNaN(inputNumber)) {
        setResult('Invalid number')
        return
      }

      // Convert input to wei
      const inputFactor = getUnitFactor(inputUnit)
      const weiValue = BigInt(Math.floor(inputNumber * Number(inputFactor)))

      // Convert from wei to output unit
      const outputFactor = getUnitFactor(outputUnit)
      const outputValue = weiValue / outputFactor
      const remainder = weiValue % outputFactor

      if (remainder === BigInt(0)) {
        setResult(outputValue.toString())
      } else {
        // Handle decimal results
        const decimalPart = Number(remainder) / Number(outputFactor)
        const integerPart = Number(outputValue)
        setResult((integerPart + decimalPart).toString())
      }
    } catch (error) {
      setResult('Conversion error')
    }
  }

  useEffect(() => {
    convertUnits()
  }, [inputValue, inputUnit, outputUnit])

  const swapUnits = () => {
    const tempUnit = inputUnit
    setInputUnit(outputUnit)
    setOutputUnit(tempUnit)
    setInputValue(result)
  }

  const copyResult = () => {
    navigator.clipboard.writeText(result)
    alert('Result copied to clipboard!')
  }

  const commonConversions = [
    { from: '1', fromUnit: 'ether', to: '1000000000000000000', toUnit: 'wei' },
    { from: '1', fromUnit: 'ether', to: '1000000000', toUnit: 'gwei' },
    { from: '1', fromUnit: 'gwei', to: '1000000000', toUnit: 'wei' },
    { from: '21000', fromUnit: 'gwei', to: '21000000000000', toUnit: 'wei' },
    { from: '0.001', fromUnit: 'ether', to: '1000000000000000', toUnit: 'wei' },
    { from: '1000000000', fromUnit: 'wei', to: '1', toUnit: 'gwei' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-yellow-600">Home</Link>
            <span>/</span>
            <span className="text-yellow-600">Unit Converter</span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Calculator className="w-8 h-8 text-yellow-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AUR Unit Converter</h1>
              <p className="text-gray-600">Convert between different AUR denominations</p>
            </div>
          </div>
        </div>

        {/* Converter */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Unit Converter</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              {/* Input */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-lg"
                  />
                </div>
                <div>
                  <select
                    value={inputUnit}
                    onChange={(e) => setInputUnit(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  >
                    {units.map(unit => (
                      <option key={unit.value} value={unit.value}>{unit.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <button
                  onClick={swapUnits}
                  className="p-3 bg-yellow-100 text-yellow-600 rounded-full hover:bg-yellow-200 transition-colors"
                >
                  <ArrowUpDown className="w-6 h-6" />
                </button>
              </div>

              {/* Output */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={result}
                      readOnly
                      placeholder="Result"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-lg pr-12"
                    />
                    {result && (
                      <button
                        onClick={copyResult}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-600"
                      >
                        <Copy className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <select
                    value={outputUnit}
                    onChange={(e) => setOutputUnit(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  >
                    {units.map(unit => (
                      <option key={unit.value} value={unit.value}>{unit.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Unit Reference Table */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">AUR Unit Reference</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alternative Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wei Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Common Use</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Wei</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">-</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 font-mono">1</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">Smallest unit</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Gwei</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">Shannon</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 font-mono">1,000,000,000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">Gas prices</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Finney</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">-</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 font-mono">1,000,000,000,000,000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">Small payments</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Ether</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">AUR</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 font-mono">1,000,000,000,000,000,000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">Standard unit</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Common Conversions */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Common Conversions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {commonConversions.map((conversion, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => {
                    setInputValue(conversion.from)
                    setInputUnit(conversion.fromUnit)
                    setOutputUnit(conversion.toUnit)
                  }}
                >
                  <div className="font-mono text-sm">
                    {conversion.from} {conversion.fromUnit}
                  </div>
                  <div className="text-gray-400">→</div>
                  <div className="font-mono text-sm">
                    {conversion.to} {conversion.toUnit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-medium text-blue-900 mb-3">💡 About AUR Units</h3>
          <div className="text-sm text-blue-800 space-y-2">
            <p>
              <strong>Wei</strong> is the smallest denomination of AUR, named after Wei Dai, creator of the b-money cryptocurrency concept.
            </p>
            <p>
              <strong>Gwei</strong> (Gigwei) is commonly used for gas prices. 1 Gwei = 1,000,000,000 Wei.
            </p>
            <p>
              <strong>Ether</strong> is the primary unit used for transactions and account balances. 1 Ether = 10^18 Wei.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UnitConverterPage


