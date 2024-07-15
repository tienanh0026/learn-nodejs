import {
  AddUserRequestBody,
  AddUserRequestParams,
  RemoveUserRequestBody
} from '@/modules/dto/roomUser/roomUser.request'
import { RoomUserServiceClass } from '@/services/roomUser/roomUser.service'
import { RequestHandler } from 'express'
import { ResponseBody } from '../types'
import { formatResponse } from '@/common/response/response'

export class RoomUserController {
  constructor(private _roomUserService: RoomUserServiceClass) {}
  addUser: RequestHandler<AddUserRequestParams, ResponseBody<null>, AddUserRequestBody> = async (req, res, next) => {
    try {
      await this._roomUserService.create(req)
      res.json(formatResponse(null))
    } catch (error) {
      next(error)
    }
  }
  removerUser: RequestHandler<AddUserRequestParams, ResponseBody<null>, RemoveUserRequestBody> = async (
    req,
    res,
    next
  ) => {
    try {
      await this._roomUserService.removeUser(req)
      res.json(formatResponse(null, 'Remove user success'))
    } catch (error) {
      next(error)
    }
  }
}
