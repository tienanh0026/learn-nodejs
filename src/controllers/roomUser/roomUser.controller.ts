import {
  AddUserRequestBody,
  AddUserRequestParams,
  ReadMessageRequestBody,
  RemoveUserRequestBody
} from '@/modules/dto/roomUser/roomUser.request'
import { RoomUserServiceClass } from '@/services/roomUser/roomUser.service'
import { RequestHandler } from 'express'
import { ResponseBody } from '../types'
import { formatResponse } from '@/common/response/response'
import { getIo } from '@/libs/socket'

export class RoomUserController {
  constructor(private _roomUserService: RoomUserServiceClass) {}
  getUserList: RequestHandler<AddUserRequestParams> = async (req, res, next) => {
    try {
      const userList = await this._roomUserService.getUserList(req.params.roomId)
      res.json(formatResponse(userList))
    } catch (error) {
      next(error)
    }
  }
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
  readMessage: RequestHandler<AddUserRequestParams, ResponseBody<null>, ReadMessageRequestBody> = async (
    req,
    res,
    next
  ) => {
    try {
      const newRoomUser = await this._roomUserService.readMessage(req)
      const io = getIo()
      io.emit(`${req.params.roomId}-room-user`, newRoomUser)
      res.json(formatResponse(null, 'Read message'))
    } catch (error) {
      next(error)
    }
  }
}
