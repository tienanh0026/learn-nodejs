import { ResponseBody } from '@/controllers/types'
import { Message } from '@/database/models/message/message.model'
import { MessageCreateParams, MessageDetailModel } from '@/domain/entity/message.entity'
import BaseError from '@/libs/error/error.model'
import { GetMessageListRequestQuery } from '@/modules/dto/message/message.request'
import { GetMessageListResponse } from '@/modules/dto/message/message.response'
import { MessageRepositoryService } from '@/sevices-repository/message.repository.service'
import { RoomRepositoryService } from '@/sevices-repository/room.repository.service'
import { RoomUserRepositoryService } from '@/sevices-repository/roomUser.repository.service'
import { Request } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import HttpStatusCode from 'http-status-codes'
import { uid } from 'uid'

export class MessageService {
  constructor(
    private _messageRepositoryService: MessageRepositoryService,
    private _roomRepositoryService: RoomRepositoryService,
    private _roomUserRepositoryService: RoomUserRepositoryService
  ) {}
  async createMessage(params: MessageCreateParams) {
    try {
      const roomId = params.roomId
      const room = await this._roomRepositoryService.findOneById(roomId)
      if (!room) throw new BaseError('room not found', HttpStatusCode.NOT_FOUND)
      if (room.type === '2') {
        const roomUser = await this._roomUserRepositoryService.findOne({
          roomId,
          userId: params.ownerId
        })
        if (!roomUser)
          throw new BaseError("You don't have permission to send message in this room", HttpStatusCode.FORBIDDEN)
      }
      const newMessage = {
        content: params.content,
        id: uid(),
        ownerId: params.ownerId,
        roomId: room.id,
        type: params.type || '1',
        media: params.media
      }
      return await this._messageRepositoryService.create(newMessage)
    } catch (error) {
      if (error instanceof BaseError) {
        throw error
      } else throw new BaseError('cannot create message', HttpStatusCode.FORBIDDEN)
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
    const messageList = await this._messageRepositoryService.findAndCountAll(
      { roomId },
      { offset, order: [['createdAt', 'DESC']], limit: limit }
    )
    const response: GetMessageListResponse = {
      list: messageList.rows as MessageDetailModel<Message>[],
      perPage: limit,
      currentPage: page,
      total: messageList.count,
      totalPages: Math.ceil(messageList.count / limit) === 0 ? 1 : Math.ceil(messageList.count / limit)
    }
    return response
  }
}
