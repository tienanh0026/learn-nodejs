import { JwtPayload, JwtService } from '@/libs/jwt/jwt.service'
import BaseError from '@/libs/error/error.model'
import { AuthRepositoryService } from '@/sevices-repository/auth.repository.service'
import { NextFunction, Request, Response } from 'express'
import HttpStatusCode from 'http-status-codes'
import { TokenExpiredError } from 'jsonwebtoken'
import { getToken } from '@/utilities/jwt'

const jwtService_ = new JwtService()
const authRepository_ = new AuthRepositoryService()
export interface CustomRequest extends Request {
  token: JwtPayload
}

export class JwtAuthGuard {
  async checkToken(req: Request, res: Response, next: NextFunction) {
    const token = getToken(req)
    try {
      if (!token) throw new Error()
      const jwt = jwtService_.verifyAccessToken(token)
      if (jwt) {
        ;(req as CustomRequest).token = jwt
        next()
      } else throw new Error()
    } catch (err) {
      console.log(err)
      if (err instanceof TokenExpiredError) {
        const error = new BaseError('Token expired', HttpStatusCode.UNAUTHORIZED)
        await authRepository_.deleteToken(token)
        return next(error)
      }
      const error = new BaseError('Please authenticate', HttpStatusCode.UNAUTHORIZED)
      return next(error)
    }
  }
}
