import { LoginRequest, RefreshRequest, RegisterRequest } from '@/modules/dto/auth/auth.request'
import { CurrentAuthResponse, LoginResponse, RefreshResponse, RegisterResponse } from '@/modules/dto/auth/auth.response'
import { RequestHandler } from 'express'
import { ResponseBody } from '../types'
import { AuthService } from '@/services/auth/auth.service'
import { CustomRequest } from '@/common/guard/jwt-auth.guard'
import { formatResponse } from '@/common/response/response'
import { ParamsDictionary } from 'express-serve-static-core'

export class AuthController {
  constructor(private _authService: AuthService) {}
  login: RequestHandler<ParamsDictionary, ResponseBody<LoginResponse>, LoginRequest> = async (req, res, next) => {
    try {
      const loginUser = req.body
      const loginResponse = await this._authService.login(loginUser)
      const response = formatResponse(loginResponse)
      res.json(response)
    } catch (error) {
      return next(error)
    }
  }
  currentAuth: RequestHandler<ParamsDictionary, ResponseBody<CurrentAuthResponse>> = async (req, res, next) => {
    try {
      const token = (req as CustomRequest).token
      const user = await this._authService.currentAuth(token.email)
      const response = formatResponse(user)
      res.json(response)
    } catch (error) {
      return next(error)
    }
  }
  register: RequestHandler<ParamsDictionary, ResponseBody<RegisterResponse>, RegisterRequest> = async (
    req,
    res,
    next
  ) => {
    try {
      const user = req.body
      const registerResponse = await this._authService.register(user)
      const response = formatResponse(registerResponse)
      res.json(response)
    } catch (error) {
      next(error)
    }
  }
  refresh: RequestHandler<ParamsDictionary, ResponseBody<RefreshResponse>, RefreshRequest> = async (req, res, next) => {
    try {
      const { refreshToken } = req.body
      const refreshReponse = await this._authService.refresh(refreshToken)
      const response = formatResponse(refreshReponse)
      res.json(response)
    } catch (error) {
      next(error)
    }
  }
}
