import { ResponseBody } from '@/controllers/types'
import { MessageEntity } from '@/domain/entity/message.entity'
import BaseError from '@/libs/error/error.model'
import { JwtService } from '@/libs/jwt/jwt.service'
import { getIo } from '@/libs/socket'
import { CreateMessageRequest } from '@/modules/dto/message/message.request'
import { MessageRepositoryService } from '@/sevices-repository/message.repository.service'
import { RoomRepositoryService } from '@/sevices-repository/room.repository.service'
import { UserRepositoryService } from '@/sevices-repository/user.repository.service'
import { getToken } from '@/utilities/jwt'
import { Request } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import HttpStatusCode from 'http-status-codes'
import { uid } from 'uid'

const _messageRepositoryService = new MessageRepositoryService()
const _jwtService = new JwtService()
const _userRepositoryService = new UserRepositoryService()
const _roomRepositoryService = new RoomRepositoryService()

export class MessageService {
  async createMessage(req: Request<ParamsDictionary, ResponseBody<null>, CreateMessageRequest>) {
    try {
      const token = getToken(req)
      const jwtPayload = _jwtService.verifyAccessToken(token)
      const user = await _userRepositoryService.findByEmail(jwtPayload.email)
      if (!user) throw new BaseError('user not found', HttpStatusCode.NOT_FOUND)
      const roomId = req.params.roomId
      const room = await _roomRepositoryService.findOneById(roomId)
      if (!room) throw new BaseError('room not found', HttpStatusCode.NOT_FOUND)
      const newMessage = {
        content: req.body.content,
        id: uid(),
        ownerId: user.id,
        roomId: room.id
      }
      const message = await _messageRepositoryService.create(newMessage)
      const io = getIo()
      io.emit(`${roomId}-message`, message)
    } catch (error) {
      if (error instanceof BaseError) {
        throw new BaseError('cannot create message', HttpStatusCode.BAD_REQUEST)
      }
    }
  }
  async getMessageList(req: Request<ParamsDictionary, ResponseBody<MessageEntity[]>>) {
    const roomId = req.params.roomId
    return await _messageRepositoryService.getList(roomId)
  }
}
