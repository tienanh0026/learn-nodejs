import { SubscriptionController as SubscriptionControllerClass } from '@/controllers/subscription/subscription.controller'
import express from 'express'
import { JwtAuthGuard as JwtAuthGuardClass } from '@/common/guard/jwt-auth.guard'
import { SubscriptionService } from '@/services/subscription/subscription.service'
import { JwtService } from '@/libs/jwt/jwt.service'
import { UserRepositoryService } from '@/sevices-repository/user.repository.service'

const subscriptionRoute = express()

const jwtService = new JwtService(new UserRepositoryService())
const subscriptionService = new SubscriptionService(jwtService)
const SubscriptionController = new SubscriptionControllerClass(subscriptionService)
const JwtAuthGuard = new JwtAuthGuardClass()

subscriptionRoute
  .post('/subscribe/room/:roomId', JwtAuthGuard.checkToken, SubscriptionController.subscribeRoomNoti)
  .post('/unsubscribe/room/:roomId', JwtAuthGuard.checkToken, SubscriptionController.unsubscribeRoomNoti)

export default subscriptionRoute
