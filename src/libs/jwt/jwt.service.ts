import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

export type JwtPayload = {
  sub: string
  email: string
}

dotenv.config()
const { JWT_SECRET = '', JWT_EXPIRES_IN, JWT_REFRESH_SECRET = '', JWT_REFRESH_EXPIRES_IN } = process.env
export class JwtService {
  generateToken(payload: JwtPayload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
  }
  verifyAccessToken(token: string) {
    return jwt.verify(token, JWT_SECRET) as JwtPayload
  }
  generateRefreshToken(payload: JwtPayload) {
    return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN })
  }
  verifyRefreshToken(token: string) {
    return jwt.verify(token, JWT_REFRESH_SECRET) as JwtPayload
  }
}
