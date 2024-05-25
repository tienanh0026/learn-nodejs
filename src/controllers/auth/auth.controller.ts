import { LoginRequest } from '@/modules/dto/auth/auth.request'
import { LoginResponse } from '@/modules/dto/auth/auth.response'
import { RequestHandler } from 'express'
import { ResponseBody } from '../types'
import { AuthService } from '@/services/auth/auth.service'
import { BaseError } from '@/models/error/error.model'

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
}
