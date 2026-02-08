import { Server as SocketIOServer } from 'socket.io'
import { Server as HTTPServer } from 'http'
import { blockchainService } from './blockchain'
import { databaseService } from './database'

export class WebSocketService {
  private io: SocketIOServer | null = null
  private isListening = false

  initialize(server: HTTPServer) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: process.env.NEXTAUTH_URL || "http://localhost:3000",
        methods: ["GET", "POST"]
      }
    })

    this.setupEventHandlers()
    this.startBlockchainListeners()
  }

  private setupEventHandlers() {
    if (!this.io) return

    this.io.on('connection', (socket) => {
      console.log('Client connected:', socket.id)

      // Join specific rooms for targeted updates
      socket.on('subscribe', (room: string) => {
        socket.join(room)
        console.log(`Client ${socket.id} subscribed to ${room}`)
      })

      socket.on('unsubscribe', (room: string) => {
        socket.leave(room)
        console.log(`Client ${socket.id} unsubscribed from ${room}`)
      })

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id)
      })
    })
  }

  private startBlockchainListeners() {
    if (this.isListening) return
    this.isListening = true

    // Listen for new blocks
    blockchainService.onNewBlock(async (block) => {
      try {
        // Store block in database
        await databaseService.storeBlock(block)
        
        // Broadcast to connected clients
        this.broadcast('newBlock', {
          number: block.number,
          timestamp: block.timestamp,
          miner: block.miner,
          txCount: block.txCount,
          gasUsed: block.gasUsed,
          reward: block.reward,
          timeAgo: this.getTimeAgo(block.timestamp * 1000)
        })

        // Update network statistics
        this.broadcast('statsUpdate', {
          lastBlock: block.number,
          gasPrice: await blockchainService.getGasPrice()
        })
      } catch (error) {
        console.error('Error processing new block:', error)
      }
    })

    // Listen for new transactions
    blockchainService.onNewTransaction(async (tx) => {
      try {
        // Store transaction in database
        await databaseService.storeTransaction(tx)
        
        // Broadcast to connected clients
        this.broadcast('newTransaction', {
          hash: tx.hash,
          from: tx.from,
          to: tx.to,
          value: tx.value,
          timeAgo: this.getTimeAgo(tx.timestamp * 1000)
        })
      } catch (error) {
        console.error('Error processing new transaction:', error)
      }
    })
  }

  // Broadcast to all connected clients
  broadcast(event: string, data: any) {
    if (this.io) {
      this.io.emit(event, data)
    }
  }

  // Broadcast to specific room
  broadcastToRoom(room: string, event: string, data: any) {
    if (this.io) {
      this.io.to(room).emit(event, data)
    }
  }

  private getTimeAgo(timestamp: number): string {
    const seconds = Math.floor((Date.now() - timestamp) / 1000)
    if (seconds < 60) return `${seconds} secs ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes} min ago`
    const hours = Math.floor(minutes / 60)
    return `${hours} hrs ago`
  }
}

export const websocketService = new WebSocketService()


