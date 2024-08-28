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
import { RoomService } from '@/services/room/room.service'
import { JwtService } from '@/libs/jwt/jwt.service'
import { uid } from 'uid'
import { getFilePathname } from '@/libs/storage'

export class MessageController {
  constructor(
    private _messageService: MessageServiceClass,
    private _discordService: DiscordNotificationBotService,
    private _roomService: RoomService,
    private _jwtService: JwtService
  ) {}
  sendMessage: RequestHandler<ParamsDictionary, ResponseBody<MessageDetail>, CreateMessageRequest> = async (
    req,
    res,
    next
  ) => {
    try {
      const user = await this._jwtService.getUserInfo(req)
      let media = undefined
      if (req.file) {
        const filename = getFilePathname(req.file)
        media = filename
      }
      const message = await this._messageService.createMessage({
        content: req.body.content,
        id: uid(),
        ownerId: user.id,
        roomId: req.params.roomId,
        type: req.body.type || '1',
        media
      })
      const response = formatResponse(message)

      // Emit Socket.IO event
      const io = getIo()
      io.emit(`${message.roomId}-message`, message)

      // Send HTTP response
      res.json(response)

      // Perform additional operations asynchronously
      await Promise.all([
        this._roomService.updateRoomLatestMessage({ id: message.roomId, latestMessageId: message.id }),
        sendPushNotification(message.id, message.ownerId),
        this._discordService.sendMessage(message)
      ])
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
