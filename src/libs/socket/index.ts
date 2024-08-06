import { Server as HttpServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import WebSocket from 'ws'
import fs from 'fs'
import path from 'path'

let io: SocketIOServer

export const initSocket = (server: HttpServer): void => {
  io = new SocketIOServer(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  })
  console.log('1231231')

  io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })
}

let webSocket: WebSocket.Server

export const initWebsocket = (server: HttpServer) => {
  webSocket = new WebSocket.Server({ server, path: '/stream' })
  webSocket.on('connection', (ws) => {
    console.log('WebSocket connection established')
    const livestreamPath = path.join('src', 'output.webm')
    const fileStream = fs.createWriteStream(livestreamPath)
    ws.on('message', (message) => {
      console.log(message)

      fileStream.write(message)
    })

    ws.on('close', () => {
      console.log('WebSocket connection closed')
      fileStream.end()
    })
    ws.on('error', (error) => {
      console.error('WebSocket error:', error)
    })
  })
  webSocket.on('error', (error) => {
    console.error('WebSocket server error:', error)
  })
}

export const getWebSocket = (): WebSocket.Server => {
  if (!webSocket) {
    throw new Error('Websocket not initialized!')
  }
  return webSocket
}

export const getIo = (): SocketIOServer => {
  if (!io) {
    throw new Error('Socket.io not initialized!')
  }
  return io
}
