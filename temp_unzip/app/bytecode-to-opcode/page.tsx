'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Code, Copy, Download, ArrowRight, Info } from 'lucide-react'

const BytecodeToOpcodePage = () => {
  const [bytecode, setBytecode] = useState('')
  const [opcodes, setOpcodes] = useState('')
  const [loading, setLoading] = useState(false)

  // Mock opcode mapping for demonstration
  const opcodeMap: { [key: string]: string } = {
    '60': 'PUSH1',
    '61': 'PUSH2',
    '62': 'PUSH3',
    '63': 'PUSH4',
    '64': 'PUSH5',
    '65': 'PUSH6',
    '66': 'PUSH7',
    '67': 'PUSH8',
    '68': 'PUSH9',
    '69': 'PUSH10',
    '6a': 'PUSH11',
    '6b': 'PUSH12',
    '6c': 'PUSH13',
    '6d': 'PUSH14',
    '6e': 'PUSH15',
    '6f': 'PUSH16',
    '70': 'PUSH17',
    '71': 'PUSH18',
    '72': 'PUSH19',
    '73': 'PUSH20',
    '74': 'PUSH21',
    '75': 'PUSH22',
    '76': 'PUSH23',
    '77': 'PUSH24',
    '78': 'PUSH25',
    '79': 'PUSH26',
    '7a': 'PUSH27',
    '7b': 'PUSH28',
    '7c': 'PUSH29',
    '7d': 'PUSH30',
    '7e': 'PUSH31',
    '7f': 'PUSH32',
    '80': 'DUP1',
    '81': 'DUP2',
    '82': 'DUP3',
    '83': 'DUP4',
    '84': 'DUP5',
    '85': 'DUP6',
    '86': 'DUP7',
    '87': 'DUP8',
    '88': 'DUP9',
    '89': 'DUP10',
    '8a': 'DUP11',
    '8b': 'DUP12',
    '8c': 'DUP13',
    '8d': 'DUP14',
    '8e': 'DUP15',
    '8f': 'DUP16',
    '90': 'SWAP1',
    '91': 'SWAP2',
    '92': 'SWAP3',
    '93': 'SWAP4',
    '94': 'SWAP5',
    '95': 'SWAP6',
    '96': 'SWAP7',
    '97': 'SWAP8',
    '98': 'SWAP9',
    '99': 'SWAP10',
    '9a': 'SWAP11',
    '9b': 'SWAP12',
    '9c': 'SWAP13',
    '9d': 'SWAP14',
    '9e': 'SWAP15',
    '9f': 'SWAP16',
    'a0': 'LOG0',
    'a1': 'LOG1',
    'a2': 'LOG2',
    'a3': 'LOG3',
    'a4': 'LOG4',
    'f0': 'CREATE',
    'f1': 'CALL',
    'f2': 'CALLCODE',
    'f3': 'RETURN',
    'f4': 'DELEGATECALL',
    'f5': 'CREATE2',
    'fa': 'STATICCALL',
    'fd': 'REVERT',
    'fe': 'INVALID',
    'ff': 'SELFDESTRUCT',
    '00': 'STOP',
    '01': 'ADD',
    '02': 'MUL',
    '03': 'SUB',
    '04': 'DIV',
    '05': 'SDIV',
    '06': 'MOD',
    '07': 'SMOD',
    '08': 'ADDMOD',
    '09': 'MULMOD',
    '0a': 'EXP',
    '0b': 'SIGNEXTEND',
    '10': 'LT',
    '11': 'GT',
    '12': 'SLT',
    '13': 'SGT',
    '14': 'EQ',
    '15': 'ISZERO',
    '16': 'AND',
    '17': 'OR',
    '18': 'XOR',
    '19': 'NOT',
    '1a': 'BYTE',
    '1b': 'SHL',
    '1c': 'SHR',
    '1d': 'SAR',
    '20': 'SHA3',
    '30': 'ADDRESS',
    '31': 'BALANCE',
    '32': 'ORIGIN',
    '33': 'CALLER',
    '34': 'CALLVALUE',
    '35': 'CALLDATALOAD',
    '36': 'CALLDATASIZE',
    '37': 'CALLDATACOPY',
    '38': 'CODESIZE',
    '39': 'CODECOPY',
    '3a': 'GASPRICE',
    '3b': 'EXTCODESIZE',
    '3c': 'EXTCODECOPY',
    '3d': 'RETURNDATASIZE',
    '3e': 'RETURNDATACOPY',
    '3f': 'EXTCODEHASH',
    '40': 'BLOCKHASH',
    '41': 'COINBASE',
    '42': 'TIMESTAMP',
    '43': 'NUMBER',
    '44': 'DIFFICULTY',
    '45': 'GASLIMIT',
    '46': 'CHAINID',
    '47': 'SELFBALANCE',
    '48': 'BASEFEE',
    '50': 'POP',
    '51': 'MLOAD',
    '52': 'MSTORE',
    '53': 'MSTORE8',
    '54': 'SLOAD',
    '55': 'SSTORE',
    '56': 'JUMP',
    '57': 'JUMPI',
    '58': 'PC',
    '59': 'MSIZE',
    '5a': 'GAS',
    '5b': 'JUMPDEST'
  }

  const convertBytecodeToOpcodes = () => {
    if (!bytecode.trim()) return

    setLoading(true)
    
    setTimeout(() => {
      try {
        // Clean the bytecode input
        let cleanBytecode = bytecode.replace(/^0x/, '').replace(/\s+/g, '').toLowerCase()
        
        if (cleanBytecode.length % 2 !== 0) {
          throw new Error('Invalid bytecode: odd number of characters')
        }

        let result = ''
        let pc = 0
        
        for (let i = 0; i < cleanBytecode.length; i += 2) {
          const byte = cleanBytecode.substr(i, 2)
          const opcode = opcodeMap[byte] || `UNKNOWN_${byte.toUpperCase()}`
          
          result += `${pc.toString().padStart(4, '0')}: ${byte.toUpperCase()} ${opcode}`
          
          // Handle PUSH operations
          if (byte >= '60' && byte <= '7f') {
            const pushSize = parseInt(byte, 16) - 0x5f
            const pushData = cleanBytecode.substr(i + 2, pushSize * 2)
            if (pushData.length === pushSize * 2) {
              result += ` 0x${pushData.toUpperCase()}`
              i += pushSize * 2
              pc += pushSize
            }
          }
          
          result += '\n'
          pc += 1
        }
        
        setOpcodes(result.trim())
      } catch (error) {
        setOpcodes(`Error: ${error instanceof Error ? error.message : 'Invalid bytecode'}`)
      } finally {
        setLoading(false)
      }
    }, 500)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(opcodes)
    alert('Opcodes copied to clipboard!')
  }

  const downloadOpcodes = () => {
    const blob = new Blob([opcodes], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'opcodes.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const loadExample = () => {
    setBytecode('0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610150806100606000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063893d20e81461003b578063a6f9dae114610059575b600080fd5b610043610075565b60405161005091906100d9565b60405180910390f35b610073600480360381019061006e919061007a565b61009e565b005b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b8073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561010057806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b50565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061013382610108565b9050919050565b61014381610128565b811461014e57600080fd5b50565b6000813590506101608161013a565b92915050565b60006020828403121561017c5761017b610103565b5b600061018a84828501610151565b91505092915050565b61019c81610128565b82525050565b60006020820190506101b76000830184610193565b9291505056fea2646970667358221220a1b2c3d4e5f6789012345678901234567890123456789012345678901234567890123464736f6c63430008130033')
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
            <span className="text-yellow-600">Bytecode to Opcode</span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Code className="w-8 h-8 text-yellow-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Bytecode to Opcode Disassembler</h1>
              <p className="text-gray-600">Convert EVM bytecode to human-readable opcodes</p>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">About EVM Bytecode:</p>
              <p>
                EVM bytecode is the low-level machine code that runs on the Ethereum Virtual Machine. 
                This tool converts the hexadecimal bytecode into readable opcodes with their corresponding operations.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Bytecode Input</h2>
              <button
                onClick={loadExample}
                className="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
              >
                Load Example
              </button>
            </div>
            
            <div className="p-6">
              <textarea
                value={bytecode}
                onChange={(e) => setBytecode(e.target.value)}
                placeholder="Enter EVM bytecode (with or without 0x prefix)..."
                rows={12}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 font-mono text-sm"
              />
              
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  {bytecode.replace(/^0x/, '').replace(/\s+/g, '').length / 2} bytes
                </div>
                <button
                  onClick={convertBytecodeToOpcodes}
                  disabled={loading || !bytecode.trim()}
                  className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                  <span>{loading ? 'Converting...' : 'Convert'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Opcodes Output</h2>
              {opcodes && (
                <div className="flex space-x-2">
                  <button
                    onClick={copyToClipboard}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 flex items-center space-x-1 text-sm transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </button>
                  <button
                    onClick={downloadOpcodes}
                    className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 flex items-center space-x-1 text-sm transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download</span>
                  </button>
                </div>
              )}
            </div>
            
            <div className="p-6">
              {opcodes ? (
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-xs font-mono h-80 overflow-y-auto">
                  <code>{opcodes}</code>
                </pre>
              ) : (
                <div className="h-80 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <Code className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p>Enter bytecode and click "Convert" to see opcodes</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">EVM Disassembly</h3>
            <p className="text-gray-600 text-sm">
              Convert raw bytecode into readable EVM opcodes with program counter addresses.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <ArrowRight className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">PUSH Data Extraction</h3>
            <p className="text-gray-600 text-sm">
              Automatically extracts and displays data for PUSH operations with proper formatting.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <Download className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Export Results</h3>
            <p className="text-gray-600 text-sm">
              Copy to clipboard or download the disassembled opcodes for further analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BytecodeToOpcodePage


