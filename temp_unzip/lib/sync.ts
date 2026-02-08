import { blockchainService } from './blockchain'
import { databaseService } from './database'
import { websocketService } from './websocket'

export class SyncService {
  private isSyncing = false
  private syncInterval: NodeJS.Timeout | null = null

  // Start synchronization process
  async startSync() {
    if (this.isSyncing) {
      console.log('Sync already in progress')
      return
    }

    this.isSyncing = true
    console.log('Starting blockchain synchronization...')

    try {
      // Initial sync of latest blocks
      await this.syncLatestBlocks()
      
      // Setup periodic sync
      this.syncInterval = setInterval(() => {
        this.syncLatestBlocks()
      }, 30000) // Sync every 30 seconds

      console.log('Blockchain sync started successfully')
    } catch (error) {
      console.error('Error starting sync:', error)
      this.isSyncing = false
    }
  }

  // Stop synchronization
  stopSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval)
      this.syncInterval = null
    }
    this.isSyncing = false
    console.log('Blockchain sync stopped')
  }

  // Sync latest blocks and transactions
  private async syncLatestBlocks() {
    try {
      console.log('Syncing latest blocks...')
      
      // Get latest block from blockchain
      const latestBlock = await blockchainService.getLatestBlock()
      
      // Store in database
      await databaseService.storeBlock(latestBlock)
      
      // Sync transactions for this block
      await this.syncBlockTransactions(latestBlock.number)
      
      // Broadcast update via WebSocket
      websocketService.broadcast('blockUpdate', {
        block: latestBlock,
        timestamp: Date.now()
      })
      
      console.log(`Synced block ${latestBlock.number}`)
    } catch (error) {
      console.error('Error syncing latest blocks:', error)
    }
  }

  // Sync transactions for a specific block
  private async syncBlockTransactions(blockNumber: number) {
    try {
      const block = await blockchainService.getBlock(blockNumber)
      
      // Process each transaction in the block
      for (const txHash of block.transactions) {
        try {
          const tx = await blockchainService.getTransaction(txHash)
          await databaseService.storeTransaction({
            ...tx,
            timestamp: block.timestamp
          })
        } catch (txError) {
          console.error(`Error syncing transaction ${txHash}:`, txError)
        }
      }
    } catch (error) {
      console.error(`Error syncing transactions for block ${blockNumber}:`, error)
    }
  }

  // Sync historical data (for initial setup)
  async syncHistoricalData(fromBlock: number, toBlock: number) {
    console.log(`Syncing historical data from block ${fromBlock} to ${toBlock}`)
    
    for (let blockNum = fromBlock; blockNum <= toBlock; blockNum++) {
      try {
        const block = await blockchainService.getBlock(blockNum)
        await databaseService.storeBlock(block)
        await this.syncBlockTransactions(blockNum)
        
        // Log progress every 100 blocks
        if (blockNum % 100 === 0) {
          console.log(`Synced ${blockNum - fromBlock + 1}/${toBlock - fromBlock + 1} blocks`)
        }
      } catch (error) {
        console.error(`Error syncing block ${blockNum}:`, error)
      }
    }
    
    console.log('Historical data sync completed')
  }

  // Get sync status
  getSyncStatus() {
    return {
      isSyncing: this.isSyncing,
      hasInterval: this.syncInterval !== null
    }
  }
}

export const syncService = new SyncService()


