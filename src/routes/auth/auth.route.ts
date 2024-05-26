import { JwtAuthGuard as JwtAuthGuardClass } from '@/common/guard/jwt-auth.guard'
import { AuthController as AuthControllerClass } from '@/controllers/auth/auth.controller'
import { AuthService } from '@/services/auth/auth.service'
import express from 'express'

const authRoute = express()
const AuthController = new AuthControllerClass(new AuthService())
const JwtAuthGuard = new JwtAuthGuardClass()
authRoute.post('/login', AuthController.login)
authRoute.get('/current', JwtAuthGuard.checkToken, AuthController.currentAuth)
export default authRoute
