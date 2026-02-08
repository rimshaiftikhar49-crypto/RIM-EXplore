import { ethers } from 'ethers'

// Blockchain service for AUR network
export class AURBlockchainService {
  private provider: ethers.JsonRpcProvider
  private wsProvider: ethers.WebSocketProvider | null = null

  constructor() {
    // TODO: Replace with actual AUR RPC endpoint
    const rpcUrl = process.env.AUR_RPC_URL || 'http://localhost:8545'
    const wsUrl = process.env.AUR_WS_URL || 'ws://localhost:8546'
    
    this.provider = new ethers.JsonRpcProvider(rpcUrl)
    
    // Setup WebSocket for real-time updates
    try {
      this.wsProvider = new ethers.WebSocketProvider(wsUrl)
    } catch (error) {
      console.warn('WebSocket connection failed, using HTTP only:', error)
    }
  }

  // Get latest block information
  async getLatestBlock() {
    try {
      const blockNumber = await this.provider.getBlockNumber()
      const block = await this.provider.getBlock(blockNumber, true)
      
      if (!block) throw new Error('Block not found')
      
      return {
        number: block.number,
        hash: block.hash,
        timestamp: block.timestamp,
        miner: block.miner,
        gasUsed: block.gasUsed.toString(),
        gasLimit: block.gasLimit.toString(),
        baseFee: block.baseFeePerGas?.toString(),
        txCount: block.transactions.length,
        transactions: block.transactions
      }
    } catch (error) {
      console.error('Error fetching latest block:', error)
      throw error
    }
  }

  // Get block by number or hash
  async getBlock(identifier: string | number) {
    try {
      const block = await this.provider.getBlock(identifier, true)
      if (!block) throw new Error('Block not found')
      
      return {
        number: block.number,
        hash: block.hash,
        parentHash: block.parentHash,
        timestamp: block.timestamp,
        miner: block.miner,
        gasUsed: block.gasUsed.toString(),
        gasLimit: block.gasLimit.toString(),
        baseFee: block.baseFeePerGas?.toString(),
        txCount: block.transactions.length,
        size: block.length || 0,
        transactions: block.transactions
      }
    } catch (error) {
      console.error('Error fetching block:', error)
      throw error
    }
  }

  // Get transaction by hash
  async getTransaction(hash: string) {
    try {
      const tx = await this.provider.getTransaction(hash)
      if (!tx) throw new Error('Transaction not found')
      
      const receipt = await this.provider.getTransactionReceipt(hash)
      
      return {
        hash: tx.hash,
        blockNumber: tx.blockNumber,
        blockHash: tx.blockHash,
        transactionIndex: tx.index,
        from: tx.from,
        to: tx.to,
        value: tx.value.toString(),
        gasPrice: tx.gasPrice?.toString(),
        gasLimit: tx.gasLimit.toString(),
        gasUsed: receipt?.gasUsed.toString(),
        nonce: tx.nonce,
        input: tx.data,
        status: receipt?.status
      }
    } catch (error) {
      console.error('Error fetching transaction:', error)
      throw error
    }
  }

  // Get address balance and transaction count
  async getAddress(address: string) {
    try {
      const balance = await this.provider.getBalance(address)
      const txCount = await this.provider.getTransactionCount(address)
      const code = await this.provider.getCode(address)
      
      return {
        address,
        balance: balance.toString(),
        txCount,
        isContract: code !== '0x',
        balanceEth: ethers.formatEther(balance)
      }
    } catch (error) {
      console.error('Error fetching address:', error)
      throw error
    }
  }

  // Get current gas price
  async getGasPrice() {
    try {
      const feeData = await this.provider.getFeeData()
      const gasPrice = feeData.gasPrice || ethers.parseUnits('20', 'gwei')
      return {
        wei: gasPrice.toString(),
        gwei: ethers.formatUnits(gasPrice, 'gwei'),
        eth: ethers.formatEther(gasPrice)
      }
    } catch (error) {
      console.error('Error fetching gas price:', error)
      throw error
    }
  }

  // Listen for new blocks (WebSocket)
  onNewBlock(callback: (block: any) => void) {
    if (!this.wsProvider) {
      console.warn('WebSocket not available for real-time updates')
      return
    }

    this.wsProvider.on('block', async (blockNumber) => {
      try {
        const block = await this.getBlock(blockNumber)
        callback(block)
      } catch (error) {
        console.error('Error in block listener:', error)
      }
    })
  }

  // Listen for new transactions
  onNewTransaction(callback: (tx: any) => void) {
    if (!this.wsProvider) {
      console.warn('WebSocket not available for real-time updates')
      return
    }

    this.wsProvider.on('pending', async (txHash) => {
      try {
        const tx = await this.getTransaction(txHash)
        callback(tx)
      } catch (error) {
        // Pending transactions might not be available immediately
        console.debug('Pending transaction not yet available:', txHash)
      }
    })
  }

  // Cleanup connections
  destroy() {
    if (this.wsProvider) {
      this.wsProvider.removeAllListeners()
      this.wsProvider.destroy()
    }
  }
}

// Singleton instance
export const blockchainService = new AURBlockchainService()


