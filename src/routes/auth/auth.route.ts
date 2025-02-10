import { JwtAuthGuard as JwtAuthGuardClass } from '@/common/guard/jwt-auth.guard'
import { AuthController as AuthControllerClass } from '@/controllers/auth/auth.controller'
import { JwtService } from '@/libs/jwt/jwt.service'
import { MailService } from '@/libs/mail/mail.service'
import { otpLimiter } from '@/middlewares/rateLimit/otp'
import { validate } from '@/modules/validation'
import {
  changePasswordValidator,
  forgotPasswordValidator,
  loginValidator,
  otpVerifyValidator,
  registerValidator
} from '@/modules/validation/auth'
import { AuthService } from '@/services/auth/auth.service'
import { AuthRepositoryService } from '@/sevices-repository/auth.repository.service'
import { OtpRepositoryService } from '@/sevices-repository/otp.repository.service'
import { UserRepositoryService } from '@/sevices-repository/user.repository.service'
import { Router } from 'express'

const authRoute = Router()

const jwtService = new JwtService(new UserRepositoryService())
const authService = new AuthService(
  new UserRepositoryService(),
  new AuthRepositoryService(),
  new OtpRepositoryService(),
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
  .post('/forget-password', otpLimiter, validate(forgotPasswordValidator), AuthController.forgetPassword)
  .post('/otp/verify', validate(otpVerifyValidator), AuthController.verifyOtp)
  .post('/change-password', JwtAuthGuard.checkToken, validate(changePasswordValidator), AuthController.changePassword)

export default authRoute
