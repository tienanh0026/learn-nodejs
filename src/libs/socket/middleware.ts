import { ExtendedError } from 'node_modules/socket.io/dist/namespace'
import { Socket } from 'socket.io'
import dotenv from 'dotenv'

dotenv.config()

const socketMiddleware = (socket: Socket, next: (err?: ExtendedError) => void) => {
  if (socket.handshake.headers.auth) {
    const { auth: token } = socket.handshake.headers

    if (process.env.JWT_SOCKET_SECRET === token) {
      return next()
    }
  }
}

export { socketMiddleware }
