import BaseError from '@/libs/error/error.model'
import { JwtService } from '@/libs/jwt/jwt.service'
import { RoomCreateReq, RoomEditReq } from '@/modules/dto/room/room.request'
import { RoomRepositoryService } from '@/sevices-repository/room.repository.service'
import { Request } from 'express'
import HttpStatusCode from 'http-status-codes'
import { uid } from 'uid'
import { ParamsDictionary } from 'express-serve-static-core'
import { getIo } from '@/libs/socket'
import { RoomUserRepositoryService } from '@/sevices-repository/roomUser.repository.service'
import { ResponseBody } from '@/controllers/types'
import { RoomCreateResponse, RoomGetListResponse } from '@/modules/dto/room/room.response'
import { getFilePathname } from '@/libs/storage'
import { RoomCreateParams } from '@/domain/entity/room.entity'

export class RoomService {
  constructor(
    private _roomRepository: RoomRepositoryService,
    private _jwtService: JwtService,
    private _roomUserRepository: RoomUserRepositoryService
  ) {}
  async createRoom(req: Request<ParamsDictionary, ResponseBody<RoomCreateResponse>, RoomCreateReq>) {
    try {
      const user = await this._jwtService.getUserInfo(req)
      const newRoom: RoomCreateParams = {
        name: req.body.name,
        ownerId: user.id,
        id: uid(),
        type: req.body.type || '1'
      }
      if (req.file) {
        const filename = getFilePathname(req.file)
        newRoom.image = filename
      }
      const room = await this._roomRepository.create(newRoom)
      await this._roomUserRepository.create({
        id: uid(),
        role: 'admin',
        roomId: room.id,
        userId: user.id
      })
      const io = getIo()
      io.emit('room-list', room)
      return room
    } catch (error) {
      throw new BaseError('co loi xay ra', HttpStatusCode.SERVICE_UNAVAILABLE)
    }
  }
  async getRoom(roomId: string) {
    return await this._roomRepository.findOneById(roomId)
  }
  async editRoom(req: Request<ParamsDictionary, unknown, RoomEditReq>) {
    const user = await this._jwtService.getUserInfo(req)
    const roomId = req.params.roomId
    const room = await this._roomRepository.findOneById(roomId)
    if (room.ownerId !== user.id) {
      throw new BaseError('not owner', HttpStatusCode.BAD_REQUEST)
    }
    if (req.file) {
      const filename = getFilePathname(req.file)
      room.image = filename
    }
    if (req.body.name) room.name = req.body.name
    const roomParam = {
      ...room,
      updatedAt: new Date().toISOString()
    }
    return this._roomRepository.update(roomParam)
  }
  async getRoomList(req: Request<ParamsDictionary, ResponseBody<RoomGetListResponse>>) {
    const user = await this._jwtService.getUserInfo(req)
    const roomUser = await this._roomUserRepository.findById({
      userId: user.id
    })
    const roomIdArr = roomUser.map((roomUser) => roomUser.roomId)
    return await this._roomRepository.findAllAvailableRoom(roomIdArr)
  }
  async updateRoomLatestMessage({ id, latestMessageId }: { id: string; latestMessageId: string }) {
    const updatedRoom = await this._roomRepository.update({
      id,
      latestMessageId
    })
    const io = getIo()
    io.emit('room-list', updatedRoom)
    return
  }
}
