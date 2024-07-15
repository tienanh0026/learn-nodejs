import { RoomSubcribeNotiRequest } from '@/modules/dto/subscription/subscription.request'
import { RequestHandler } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ResponseBody } from '../types'
import { RoomSubcribeNotiResponse } from '@/modules/dto/subscription/subscription.response'
import { SubscriptionService } from '@/services/subscription/subscription.service'
import { formatResponse } from '@/common/response/response'

export class SubscriptionController {
  constructor(private _subcriptionService: SubscriptionService) {}
  subscribeRoomNoti: RequestHandler<ParamsDictionary, ResponseBody<RoomSubcribeNotiResponse>, RoomSubcribeNotiRequest> =
    async (req, res, next) => {
      try {
        const newSubscription = await this._subcriptionService.subscribeRoomNoti(req)
        const response = formatResponse(newSubscription)
        res.json(response)
      } catch (error) {
        return next(error)
      }
    }
  unsubscribeRoomNoti: RequestHandler<ParamsDictionary> = async (req, res, next) => {
    try {
      await this._subcriptionService.unsubscribeRoomNoti(req)
      const response = formatResponse('unsubscribe success')
      res.json(response)
    } catch (error) {
      return next(error)
    }
  }
}
