import { ResponseBody } from '../types'
import { RequestHandler } from 'express'
import { UserService } from '@/services/user/user.service'
import { FindByEmailReq, UserEditQueryParams, UserEditReq, UserReq } from '@/modules/dto/user/user.request'
import { UserRes } from '@/modules/dto/user/user.response'
import { UserEntityDefault } from '@/domain/entity/user.entity'
import { formatResponse } from '@/common/response/response'

export class UserController {
  constructor(private _userService: UserService) {}
  create: RequestHandler<unknown, ResponseBody<UserRes>, UserReq> = async (req, res, next) => {
    try {
      const newUser = req.body
      const user = await this._userService.create(newUser)
      const response = formatResponse(user)
      res.json(response)
    } catch (error) {
      return next(error)
    }
  }
  findAll: RequestHandler = async (_req, res, next) => {
    try {
      const users = await this._userService.findAll()
      const response = formatResponse(users)
      res.json(response)
    } catch (error) {
      return next(error)
    }
  }
  findByEmail: RequestHandler<undefined, ResponseBody<UserEntityDefault | null>, FindByEmailReq> = async (
    req,
    res,
    next
  ) => {
    try {
      const body = req.body
      const user = await this._userService.findByEmail(body.email)
      const response = formatResponse(user)
      res.json(response)
    } catch (error) {
      return next(error)
    }
  }
  findById: RequestHandler = async (req, res, next) => {
    try {
      const id = req.params.id
      const user = await this._userService.findOneById(id)
      const response = formatResponse(user)
      res.json(response)
    } catch (error) {
      return next(error)
    }
  }
  update: RequestHandler<UserEditQueryParams, ResponseBody<null>, UserEditReq> = async (req, res, next) => {
    try {
      const user = await this._userService.update(req)
      const response = formatResponse(user)
      res.json(response)
    } catch (error) {
      return next(error)
    }
  }
}
