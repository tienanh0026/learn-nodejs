import { Server as HttpServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'

let io: SocketIOServer

export const initSocket = (server: HttpServer): void => {
  io = new SocketIOServer(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  })
  io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })
}

export const getIo = (): SocketIOServer => {
  if (!io) {
    throw new Error('Socket.io not initialized!')
  }
  return io
}
