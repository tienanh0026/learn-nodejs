import { RoomCreateReq, RoomEditReq } from '@/modules/dto/room/room.request'
import { RoomService } from '@/services/room/room.service'
import { getToken } from '@/utilities/jwt'
import { RequestHandler } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ResponseBody } from '../types'
import { formatResponse } from '@/common/response/response'
import { RoomCreateResponse, RoomDetailResponse, RoomGetListResponse } from '@/modules/dto/room/room.response'

export class RoomController {
  constructor(private _roomService: RoomService) {}
  createRoom: RequestHandler<ParamsDictionary, ResponseBody<RoomCreateResponse>, RoomCreateReq> = async (
    req,
    res,
    next
  ) => {
    try {
      const token = getToken(req)
      const room = await this._roomService.createRoom({
        name: req.body.name,
        token: token
      })
      const response = formatResponse(room)
      res.json(response)
    } catch (error) {
      return next(error)
    }
  }
  editRoom: RequestHandler<ParamsDictionary, unknown, RoomEditReq> = async (req, res, next) => {
    try {
      const updatedRoom = await this._roomService.editRoom(req)
      const response = formatResponse(updatedRoom)
      res.json(response)
      //
    } catch (error) {
      return next(error)
    }
  }
  getRoom: RequestHandler<ParamsDictionary, ResponseBody<RoomDetailResponse>> = async (req, res, next) => {
    try {
      const roomId = req.params.roomId
      const room = await this._roomService.getRoom(roomId)
      const response = formatResponse(room)
      res.json(response)
    } catch (error) {
      next(error)
    }
  }
  getRoomList: RequestHandler<ParamsDictionary, ResponseBody<RoomGetListResponse>> = async (_req, res, next) => {
    try {
      const roomList = await this._roomService.getRoomList()
      const response = formatResponse(roomList)
      res.json(response)
    } catch (error) {
      next(error)
    }
  }
}
