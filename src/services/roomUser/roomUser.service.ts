import { ResponseBody } from '@/controllers/types'
import BaseError from '@/libs/error/error.model'
import { JwtService } from '@/libs/jwt/jwt.service'
import {
  AddUserRequestBody,
  AddUserRequestParams,
  RemoveUserRequestBody
} from '@/modules/dto/roomUser/roomUser.request'
import { RoomUserRepositoryService } from '@/sevices-repository/roomUser.repository.service'
import { Request } from 'express'
import HttpStatusCode from 'http-status-codes'
import { uid } from 'uid'

export class RoomUserServiceClass {
  constructor(
    private _roomUserRepository: RoomUserRepositoryService,
    private _jwtService: JwtService
  ) {}
  async checkRole(req: Request) {
    try {
      const user = await this._jwtService.getUserInfo(req)
      if (!user) throw new BaseError('User not found', HttpStatusCode.FORBIDDEN)
      const roomId = req.params.roomId
      const roomUser = await this._roomUserRepository.findOne({
        userId: user.id,
        roomId
      })
      if (roomUser?.role !== 'admin') throw new Error()
      return {
        roomId,
        user
      }
    } catch (error) {
      if (error instanceof BaseError) {
        throw error
      } else throw new BaseError("Don't have permisstion", HttpStatusCode.FORBIDDEN)
    }
  }
  async create(req: Request<AddUserRequestParams, ResponseBody<null>, AddUserRequestBody>) {
    const { roomId } = await this.checkRole(req)
    for (const user of req.body.user) {
      await this._roomUserRepository.create({
        id: uid(),
        role: user.role || 'user',
        roomId,
        userId: user.id
      })
    }
    return
  }
  async removeUser(req: Request<AddUserRequestParams, ResponseBody<null>, RemoveUserRequestBody>) {
    try {
      const { roomId } = await this.checkRole(req)
      await this._roomUserRepository.delete({
        roomId,
        userId: req.body.userId
      })
    } catch (error) {
      if (error instanceof BaseError) {
        throw error
      } else throw new BaseError('Cannot remove user', HttpStatusCode.FORBIDDEN)
    }
  }
}
