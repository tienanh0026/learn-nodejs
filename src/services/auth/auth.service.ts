import { LoginRequest, RegisterRequest } from '@/modules/dto/auth/auth.request'
import bcrypt from 'bcrypt'
import BaseError from '@/libs/error/error.model'
import { UserRepositoryService } from '@/sevices-repository/user.repository.service'
import { JwtPayload, JwtService } from '@/libs/jwt/jwt.service'
import { AuthRepositoryService } from '@/sevices-repository/auth.repository.service'
import { uid } from 'uid'
import HttpStatusCode from 'http-status-codes'
import { MailService } from '@/libs/mail/mail.service'

const userRepository_ = new UserRepositoryService()
const authRepository_ = new AuthRepositoryService()

const jwtService_ = new JwtService()
const mailService_ = new MailService()
export class AuthService {
  async login(user: LoginRequest) {
    try {
      const existedUser = await userRepository_.findOneByEmail(user.email)

      console.log(
        'so sanh password',
        user.password,
        existedUser?.password,
        bcrypt.compareSync(user.password, existedUser?.password || '')
      )

      if (!existedUser || !bcrypt.compareSync(user.password, existedUser.password)) {
        throw new BaseError('sai pass', HttpStatusCode.CONFLICT)
      }
      const payload: JwtPayload = {
        id: existedUser.id,
        email: existedUser.email
      }
      const accessToken = jwtService_.generateToken(payload)
      const refreshToken = jwtService_.generateRefreshToken(payload)
      await authRepository_.saveToken({ id: uid(), token: accessToken, userId: existedUser.id })
      return {
        accessToken,
        refreshToken
      }
    } catch (error) {
      throw new BaseError('sai pass', HttpStatusCode.CONFLICT)
    }
  }
  async currentAuth(email: string) {
    const extstedUser = await userRepository_.findByEmail(email)
    if (!extstedUser) throw new BaseError('User not found', HttpStatusCode.NOT_FOUND)
    return extstedUser
  }
  async register(user: RegisterRequest) {
    const existedUser = await userRepository_.findByEmail(user.email)
    if (existedUser) throw new BaseError('Existed email', HttpStatusCode.CONFLICT)
    console.log('user', user)
    user.password = await bcrypt.hash(user.password, 10)
    const newUser = await userRepository_.create(user)
    const userPayload: JwtPayload = {
      email: newUser.email,
      id: newUser.id
    }
    const token = jwtService_.generateToken(userPayload)
    await authRepository_.saveToken({
      id: uid(),
      token: token,
      userId: newUser.id
    })
    await mailService_.sendRegisterSuccessfull(newUser.email, newUser)
    return {
      accessToken: token,
      user: newUser
    }
  }
  async refresh(token: string) {
    try {
      const refreshPayload = jwtService_.verifyRefreshToken(token)
      console.log(refreshPayload)
      const tokenPayload = {
        id: refreshPayload.id,
        email: refreshPayload.email
      }
      const accessToken = jwtService_.generateToken(tokenPayload)
      await authRepository_.saveToken({
        id: uid(),
        token: accessToken,
        userId: tokenPayload.id
      })
      return {
        accessToken
      }
    } catch (error) {
      throw new BaseError('Please authenticate', HttpStatusCode.UNAUTHORIZED)
    }
  }
}
