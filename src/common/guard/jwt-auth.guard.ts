import { JwtPayload, JwtService } from '@/libs/jwt/jwt.service'
import { NextFunction, Request, Response } from 'express'

const jwtService_ = new JwtService()

export interface CustomRequest extends Request {
  token: JwtPayload
}

export class JwtAuthGuard {
  async checkToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '')
      if (!token) throw new Error()
      const jwt = jwtService_.verifyAccessToken(token)
      if (jwt) {
        ;(req as CustomRequest).token = jwt
        next()
      } else throw new Error()
    } catch (error) {
      res.status(401).send('Please authenticate')
    }
  }
}
