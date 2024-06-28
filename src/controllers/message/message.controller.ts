import { formatResponse } from '@/common/response/response'
import { MessageService as MessageServiceClass } from '@/services/message/message.service'
import { RequestHandler } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ResponseBody } from '../types'
import { CreateMessageRequest, GetMessageListRequestQuery } from '@/modules/dto/message/message.request'
import { sendPushNotification } from '@/libs/web-push'
import { GetMessageListResponse } from '@/modules/dto/message/message.response'
const MessageService = new MessageServiceClass()

export class MessageController {
  sendMessage: RequestHandler<ParamsDictionary, ResponseBody<null>, CreateMessageRequest> = async (req, res, next) => {
    try {
      const message = await MessageService.createMessage(req)
      const response = formatResponse(null)
      res.json(response)
      if (message) sendPushNotification(message.id, message.ownerId)
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
      const messageList = await MessageService.getMessageList(req)
      const response = formatResponse(messageList)
      res.json(response)
    } catch (error) {
      next(error)
    }
  }
}
