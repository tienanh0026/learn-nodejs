import { Router } from 'express'
import { JwtAuthGuard as JwtAuthGuardClass } from '@/common/guard/jwt-auth.guard'
import { MessageController as MessageControllerClass } from '@/controllers/message/message.controller'
import { upload } from '@/libs/storage'
import { MessageService } from '@/services/message/message.service'
import { DiscordNotificationBotService } from '@/services/discord-notification-bot/discord-notification-bot.service'
import { MessageRepositoryService } from '@/sevices-repository/message.repository.service'
import { JwtService } from '@/libs/jwt/jwt.service'
import { UserRepositoryService } from '@/sevices-repository/user.repository.service'
import { RoomRepositoryService } from '@/sevices-repository/room.repository.service'
import { DiscordNotificationBotRepositoryService } from '@/sevices-repository/discord-notification-bot.repository.service'
import { RoomUserRepositoryService } from '@/sevices-repository/roomUser.repository.service'
import { createMessageValidator, getMessageListValidator } from '@/modules/validation/message'
import { validate } from '@/modules/validation'

const messageRoute = Router()

const jwtService = new JwtService(new UserRepositoryService())
const messageService = new MessageService(
  new MessageRepositoryService(),
  jwtService,
  new RoomRepositoryService(),
  new RoomUserRepositoryService()
)
const discordNotificationBotService = new DiscordNotificationBotService(new DiscordNotificationBotRepositoryService())
const JwtAuthGuard = new JwtAuthGuardClass()
const MessageController = new MessageControllerClass(messageService, discordNotificationBotService)

messageRoute
  .post(
    '/:roomId/message/',
    JwtAuthGuard.checkToken,
    upload.single('file'),
    validate(createMessageValidator),
    MessageController.sendMessage
  )
  .get(
    '/:roomId/message/list',
    JwtAuthGuard.checkToken,
    validate(getMessageListValidator),
    MessageController.getMessageList
  )

export default messageRoute
