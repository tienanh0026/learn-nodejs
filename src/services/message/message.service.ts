import { ResponseBody } from '@/controllers/types'
import BaseError from '@/libs/error/error.model'
import { JwtService } from '@/libs/jwt/jwt.service'
import { getIo } from '@/libs/socket'
import { CreateMessageRequest, GetMessageListRequestQuery } from '@/modules/dto/message/message.request'
import { GetMessageListResponse } from '@/modules/dto/message/message.response'
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
      return message
    } catch (error) {
      if (error instanceof BaseError) {
        throw new BaseError('cannot create message', HttpStatusCode.BAD_REQUEST)
      }
    }
  }
  async getMessageList(
    req: Request<ParamsDictionary, ResponseBody<GetMessageListResponse>, null, GetMessageListRequestQuery>
  ) {
    const roomId = req.params.roomId
    const query = req.query
    const limit = query.perPage ? parseInt(query.perPage) : 10 // default limit to 10
    const page = parseInt(query.page || '1') > 0 ? parseInt(query.page || '1') : 1 // default page to 1
    const offset = (page - 1) * limit
    const messageList = await _messageRepositoryService.findAndCountAll(
      { roomId },
      { offset, order: [['createdAt', 'DESC']], limit: limit }
    )
    const response: GetMessageListResponse = {
      list: messageList.rows,
      perPage: limit,
      currentPage: page,
      total: messageList.count,
      totalPages: Math.ceil(messageList.count / limit) === 0 ? 1 : Math.ceil(messageList.count / limit)
    }
    return response
  }
}
