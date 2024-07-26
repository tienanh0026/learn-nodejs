import { JwtAuthGuard as JwtAuthGuardClass } from '@/common/guard/jwt-auth.guard'
import { AuthController as AuthControllerClass } from '@/controllers/auth/auth.controller'
import { JwtService } from '@/libs/jwt/jwt.service'
import { MailService } from '@/libs/mail/mail.service'
import { validate } from '@/modules/validation'
import { loginValidator, registerValidator } from '@/modules/validation/auth'
import { AuthService } from '@/services/auth/auth.service'
import { AuthRepositoryService } from '@/sevices-repository/auth.repository.service'
import { UserRepositoryService } from '@/sevices-repository/user.repository.service'
import { Router } from 'express'

const authRoute = Router()

const jwtService = new JwtService(new UserRepositoryService())
const authService = new AuthService(
  new UserRepositoryService(),
  new AuthRepositoryService(),
  jwtService,
  new MailService()
)
const AuthController = new AuthControllerClass(authService)
const JwtAuthGuard = new JwtAuthGuardClass()

authRoute
  .post('/login', validate(loginValidator), AuthController.login)
  .post('/register', validate(registerValidator), AuthController.register)
  .get('/current', JwtAuthGuard.checkToken, AuthController.currentAuth)
  .post('/refresh', AuthController.refresh)

export default authRoute
