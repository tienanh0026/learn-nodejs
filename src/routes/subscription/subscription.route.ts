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
/** POST Methods */
/**
 * @openapi
 * '/api/user/register':
 *  post:
 *     tags:
 *     - User Controller
 *     summary: Create a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - username
 *              - email
 *              - password
 *            properties:
 *              username:
 *                type: string
 *                default: johndoe
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
subscriptionRoute
  .post('/subscribe/room/:roomId', JwtAuthGuard.checkToken, SubscriptionController.subscribeRoomNoti)
  .post('/unsubscribe/room/:roomId', JwtAuthGuard.checkToken, SubscriptionController.unsubscribeRoomNoti)

export default subscriptionRoute
