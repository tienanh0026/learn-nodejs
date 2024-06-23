import { SubscriptionController as SubscriptionControllerClass } from '@/controllers/subscription/subscription.controller'
import express from 'express'
import { JwtAuthGuard as JwtAuthGuardClass } from '@/common/guard/jwt-auth.guard'

const subscriptionRoute = express()
const SubscriptionController = new SubscriptionControllerClass()
const JwtAuthGuard = new JwtAuthGuardClass()

subscriptionRoute.post('/subscribe/room/:roomId', JwtAuthGuard.checkToken, SubscriptionController.subscribeRoomNoti)

subscriptionRoute.post('/unsubscribe/room/:roomId', JwtAuthGuard.checkToken, SubscriptionController.unsubscribeRoomNoti)

export default subscriptionRoute
