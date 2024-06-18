import { Router } from 'express'
import { JwtAuthGuard as JwtAuthGuardClass } from '@/common/guard/jwt-auth.guard'
import { MessageController as MessageControllerClass } from '@/controllers/message/message.controller'

const messageRoute = Router()
const JwtAuthGuard = new JwtAuthGuardClass()
const MessageController = new MessageControllerClass()
messageRoute
  .use(JwtAuthGuard.checkToken)
  .post('/:roomId/message/', MessageController.sendMessage)
  .get('/:roomId/message/list', MessageController.getMessageList)
export default messageRoute
