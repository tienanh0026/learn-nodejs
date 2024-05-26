import { LoginRequest } from '@/modules/dto/auth/auth.request'
import { CurrentAuthResponse, LoginResponse } from '@/modules/dto/auth/auth.response'
import { RequestHandler } from 'express'
import { ResponseBody } from '../types'
import { AuthService } from '@/services/auth/auth.service'
import { BaseError } from '@/models/error/error.model'
import { CustomRequest } from '@/common/guard/jwt-auth.guard'

export class AuthController {
  constructor(private _authService: AuthService) {}
  login: RequestHandler<LoginRequest, ResponseBody<LoginResponse>> = async (req, res) => {
    try {
      //
      const loginUser = req.body
      const loginResponse = await this._authService.login(loginUser)
      const response: ResponseBody<LoginResponse> = {
        message: 'success',
        data: loginResponse
      }
      res.json(response)
    } catch (error) {
      if (error instanceof BaseError) {
        res.statusCode = error.httpCode
        const response: ResponseBody<undefined> = {
          message: error.message,
          data: undefined
        }
        res.end(JSON.stringify(response))
      } else res.end(JSON.stringify(error))
    }
  }
  currentAuth: RequestHandler<unknown, ResponseBody<CurrentAuthResponse>> = async (req, res) => {
    try {
      const token = (req as CustomRequest).token
      const user = await this._authService.currentAuth(token.email)
      const response: ResponseBody<CurrentAuthResponse> = {
        message: 'success',
        data: user
      }
      res.json(response)
    } catch (error) {
      if (error instanceof BaseError) {
        res.statusCode = error.httpCode
        const response: ResponseBody<undefined> = {
          message: error.message,
          data: undefined
        }
        res.end(JSON.stringify(response))
      } else res.end(JSON.stringify(error))
    }
  }
}
