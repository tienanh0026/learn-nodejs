import { formatResponse } from '@/common/response/response'
import { MessageService as MessageServiceClass } from '@/services/message/message.service'
import { RequestHandler } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ResponseBody } from '../types'
import { CreateMessageRequest, GetMessageListRequestQuery } from '@/modules/dto/message/message.request'
import { sendPushNotification } from '@/libs/web-push'
import { GetMessageListResponse } from '@/modules/dto/message/message.response'
import { getIo } from '@/libs/socket'
import { MessageDetail } from '@/domain/entity/message.entity'
import { DiscordNotificationBotService } from '@/services/discord-notification-bot/discord-notification-bot.service'

export class MessageController {
  constructor(
    private _messageService: MessageServiceClass,
    private _discordService: DiscordNotificationBotService
  ) {}
  sendMessage: RequestHandler<ParamsDictionary, ResponseBody<MessageDetail>, CreateMessageRequest> = async (
    req,
    res,
    next
  ) => {
    try {
      const message = await this._messageService.createMessage(req)
      const response = formatResponse(message)
      res.json(response)
      const io = getIo()
      io.emit(`${message.roomId}-message`, message)
      sendPushNotification(message.id, message.ownerId)
      this._discordService.sendMessage(message)
    } catch (error) {
      next(error)
    }
  }
  getMessageList: RequestHandler<
    ParamsDictionary,
    ResponseBody<GetMessageListResponse>,
    null,
    GetMessageListRequestQuery
  > = async (req, res, next) => {
    try {
      const messageList = await this._messageService.getMessageList(req)
      const response = formatResponse(messageList)
      res.json(response)
    } catch (error) {
      next(error)
    }
  }
}
