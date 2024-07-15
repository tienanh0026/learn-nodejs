import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { Request } from 'express'
import { UserRepositoryService } from '@/sevices-repository/user.repository.service'
import { getToken } from '@/utilities/jwt'
import BaseError from '../error/error.model'
import HttpStatusCode from 'http-status-codes'

export type JwtPayload = {
  id: string
  email: string
}

dotenv.config()
const { JWT_SECRET = '', JWT_EXPIRES_IN, JWT_REFRESH_SECRET = '', JWT_REFRESH_EXPIRES_IN } = process.env
export class JwtService {
  constructor(private _userRepositoryService: UserRepositoryService) {}
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
  getUserPayload(req: Request) {
    const token = getToken(req)
    return this.verifyAccessToken(token)
  }
  async getUserInfo(req: Request) {
    const { id } = this.getUserPayload(req)
    const user = await this._userRepositoryService.findOneById(id)
    if (!user) throw new BaseError('Unauthorized', HttpStatusCode.FORBIDDEN)
    return user
  }
}
