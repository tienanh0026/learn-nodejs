import http from 'http'
import dotenv from 'dotenv'
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import app from './app'
import { setupSocket } from './libs/socket'
import sequelizeConnection from './database/connection'
import { initDiscordClient } from './libs/discord-bot'
import { logger } from './libs/logger'

dotenv.config()

// Handle Uncaught Exceptions
process.on('uncaughtException', (err: Error) => {
  logger.error('Uncaught Exception:', { message: err.message, stack: err.stack })
  process.exit(1) // Exit the process to avoid inconsistent state
})

// Handle Unhandled Promise Rejections
// eslint-disable-next-line @typescript-eslint/no-explicit-any
process.on('unhandledRejection', (reason: any) => {
  logger.error('Unhandled Rejection:', { reason })
  process.exit(1) // Exit the process to avoid inconsistent state
})

// Parse CLI arguments
const argv = parseArgs()
const port = argv.port || Number(process.env.SERVER_PORT) || 3000

// Initialize server
const server = createServer()

async function initApp() {
  try {
    await sequelizeConnection.authenticate()
    console.log('Data Source has been initialized!')
    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`)
    })
    setupSocket(server)
    initDiscordClient()
  } catch (error) {
    console.error('Database connection failed:', error)
    process.exit(1)
  }
}

// Start the application
initApp()

// Function to parse arguments using yargs
function parseArgs() {
  return yargs(hideBin(process.argv))
    .option('port', {
      type: 'number',
      description: 'Port to run the server on'
    })
    .parseSync()
}

// Create HTTP server
function createServer() {
  const server = http.createServer(app)
  return server
}
