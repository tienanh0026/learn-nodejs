import { formatResponse } from '@/common/response/response'
import { JwtService } from '@/libs/jwt/jwt.service'
import ScheduleMessageService from '@/services/scheduleMessage/scheduleMessage.service'
import { RequestHandler } from 'express'
import {
  CreateScheduleMessageBody,
  MessageScheduleMessageParams
} from '@/modules/dto/scheduleMessage/scheduleMessage.request'
import { getFilePathname } from '@/libs/storage'
import cron from '@/jobs'
import { MessageRepositoryService } from '@/sevices-repository/message.repository.service'
import { uid } from 'uid'
import { getIo } from '@/libs/socket'
import { RoomService } from '@/services/room/room.service'
import { sendPushNotification } from '@/libs/web-push'
import { DiscordNotificationBotService } from '@/services/discord-notification-bot/discord-notification-bot.service'
import { ScheduleMessageCreateParams } from '@/domain/entity/scheduleMessage.entity'
import { compareTimeWithoutSeconds } from '@/utilities/time'

export default class ScheduleMessageController {
  constructor(
    private _jwtService: JwtService,
    private _scheduleMessageService: ScheduleMessageService,
    private _messageRepositoryService: MessageRepositoryService,
    private _roomService: RoomService,
    private _discordService: DiscordNotificationBotService
  ) {
    this.schedule()
  }
  schedule() {
    cron.schedule('* * * * *', () => {
      // cron.schedule('*/1 * * * * *', () => {
      console.log('Schedule at ', new Date().toLocaleString())
      this.sendScheduleMessage()
    })
  }
  createScheduleMessage: RequestHandler<MessageScheduleMessageParams, unknown, CreateScheduleMessageBody> = async (
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
      const scheduleMessage: Omit<ScheduleMessageCreateParams, 'id'> = {
        media,
        content: req.body.content,
        ownerId: user.id,
        roomId: req.params.roomId,
        scheduleAt: new Date(req.body.scheduleAt).toUTCString(),
        type: req.body.type,
        messageId: uid()
      }
      await this._scheduleMessageService.createScheduleMessage(scheduleMessage)
      const response = formatResponse(null)
      res.json(response)
    } catch (error) {
      return next(error)
    }
  }
  async sendScheduleMessage() {
    const scheduleMessageArr = await this._scheduleMessageService.getAllScheduleMessage()
    for (const messageItem of scheduleMessageArr) {
      console.log(compareTimeWithoutSeconds(messageItem.scheduleAt))
      if (compareTimeWithoutSeconds(messageItem.scheduleAt) === 'now') {
        const message = await this._scheduleMessageService.getOneByMessageId(messageItem.messageId)
        if (!message) continue
        const newMessage = await this._messageRepositoryService.create({
          content: message.content,
          id: message.messageId,
          ownerId: message.ownerId,
          roomId: message.roomId,
          type: message.type,
          media: message.media
        })

        const io = getIo()
        io.emit(`${newMessage.roomId}-message`, newMessage)

        await Promise.all([
          this._roomService.updateRoomLatestMessage({ id: newMessage.roomId, latestMessageId: newMessage.id }),
          sendPushNotification(newMessage.id, newMessage.ownerId),
          this._discordService.sendMessage(newMessage)
        ])
      }
      if (compareTimeWithoutSeconds(messageItem.scheduleAt) === 'past') {
        await this._scheduleMessageService.delete(messageItem.id)
      }
    }
  }
  getScheduleMessageList: RequestHandler = async (req, res, next) => {
    try {
      const user = await this._jwtService.getUserInfo(req)
      const scheduleMessageList = await this._scheduleMessageService.getListByUserId(user.id)
      const response = formatResponse(scheduleMessageList)
      res.json(response)
    } catch (error) {
      return next(error)
    }
  }
}
