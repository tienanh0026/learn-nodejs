import BaseError from '@/libs/error/error.model'
import { JwtService } from '@/libs/jwt/jwt.service'
import { RoomEditReq } from '@/modules/dto/room/room.request'
import { RoomRepositoryService } from '@/sevices-repository/room.repository.service'
import { Request } from 'express'
import HttpStatusCode from 'http-status-codes'
import { uid } from 'uid'
import { ParamsDictionary } from 'express-serve-static-core'
import { getToken } from '@/utilities/jwt'
import { UserService } from '../user/user.service'
type RoomCreateReq = {
  name: string
  token: string
}

const _roomRepository = new RoomRepositoryService()

const _userService = new UserService()

const _jwtService = new JwtService()
export class RoomService {
  async createRoom(params: RoomCreateReq) {
    try {
      const jwtPayload = _jwtService.verifyAccessToken(params.token)
      const createRoomParams = {
        name: params.name,
        ownerId: jwtPayload.id,
        id: uid()
      }
      const newRoom = await _roomRepository.create(createRoomParams)
      return newRoom
    } catch (error) {
      throw new BaseError('co loi xay ra', HttpStatusCode.SERVICE_UNAVAILABLE)
    }
  }
  async editRoom(req: Request<ParamsDictionary, unknown, RoomEditReq>) {
    const roomId = req.params.roomId
    const token = getToken(req)
    const editBody = req.body
    const jwtPayload = _jwtService.verifyAccessToken(token)
    const user = await _userService.findOneById(jwtPayload.id)
    const room = await _roomRepository.findOneById(roomId)
    const room1 = await _roomRepository.findDetailOneById(roomId, user.id)
    console.log(room1.toJSON())

    if (room.ownerId !== user.id) {
      throw new BaseError('not owner', HttpStatusCode.UNAUTHORIZED)
    }
    const roomParam = {
      ...editBody,
      id: roomId,
      updatedAt: new Date().toISOString()
    }
    return _roomRepository.update(roomParam)
    //   const jwtPayload = _jwtService.verifyAccessToken(params.token)
  }
}
