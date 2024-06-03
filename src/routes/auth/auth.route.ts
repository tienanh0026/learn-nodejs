import { JwtAuthGuard as JwtAuthGuardClass } from '@/common/guard/jwt-auth.guard'
import { AuthController as AuthControllerClass } from '@/controllers/auth/auth.controller'
import { AuthService } from '@/services/auth/auth.service'
import { Router } from 'express'
const authRoute = Router()
const AuthController = new AuthControllerClass(new AuthService())
const JwtAuthGuard = new JwtAuthGuardClass()
authRoute
  .post('/login', AuthController.login)
  .post('/register', AuthController.register)
  .get('/current', JwtAuthGuard.checkToken, AuthController.currentAuth)
  .post('/refresh', AuthController.refresh)

export default authRoute
