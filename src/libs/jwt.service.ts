import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

export type JwtPayload = {
  sub: string
  email: string
}

dotenv.config()
const { JWT_SECRET = '', JWT_EXPIRES_IN } = process.env
export class JwtService {
  generateToken(payload: JwtPayload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
  }
}
