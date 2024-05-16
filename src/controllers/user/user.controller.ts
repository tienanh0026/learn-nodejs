import { User } from '@/models/user/user.model'
import { RequestListener } from 'http'
import { ResponseBody } from '../types'
import { RequestHandler } from 'express'
import { UserRes } from '@/modules/dto/user.response'
import { UserService } from '@/services/user/user.service'
import { BaseError, HttpException } from '@/models/error/error.model'
import { FindByEmailReq } from '@/modules/dto/user.request'

export class UserController {
  constructor(private _userService: UserService) {}
  create: RequestHandler<unknown, unknown, UserRes> = async (req, res) => {
    try {
      const newUser = req.body
      const user = await this._userService.create(newUser)
      console.log(user)
    } catch (error) {
      console.log((error as BaseError)?.httpCode)

      if (error instanceof BaseError) {
        console.log('Error type:', error)
        res.statusCode = error.httpCode
        const response: ResponseBody<undefined> = {
          message: error.message,
          data: undefined
        }
        res.end(JSON.stringify(response))
      } else responseError(req, res)
    }
  }
  findAll: RequestHandler = async (req, res) => {
    try {
      const users = await this._userService.findAll()
      const response: ResponseBody<User[]> = {
        message: 'success',
        data: users
      }
      res.json(response)
    } catch (error) {
      responseError(req, res)
    }
  }
  findByEmail: RequestHandler<undefined, ResponseBody<User | null>, FindByEmailReq> = async (req, res) => {
    try {
      const body = req.body
      const user = await this._userService.findByEmail(body.email)
      const response: ResponseBody<User | null> = {
        message: 'success',
        data: user
      }
      res.json(response)
    } catch (error) {
      responseError(req, res)
    }
  }
}

const responseError: RequestListener = (_req, res) => {
  res.statusCode = 422
  res.setHeader('content-Type', 'Application/json')
  const response: ResponseBody<undefined> = {
    message: 'Error occurred   123123123',
    data: undefined
  }
  res.end(JSON.stringify(response))
}
