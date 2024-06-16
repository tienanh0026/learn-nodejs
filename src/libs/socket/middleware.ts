import { ExtendedError } from 'node_modules/socket.io/dist/namespace'
import { Socket } from 'socket.io'

const socketMiddleware = (socket: Socket, next: (err?: ExtendedError) => void) => {
  if (socket.handshake.headers.auth) {
    const { auth } = socket.handshake.headers
    const token = (auth as string).split(' ')[1]
    if (process.env.JWT_SOCKET_SECRET === token) {
      return next()
    }
  } else throw new Error('Cannot connect to socket')
}

export { socketMiddleware }
