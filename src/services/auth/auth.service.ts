import { LoginRequest, RegisterRequest } from '@/modules/dto/auth/auth.request'
import bcrypt from 'bcrypt'
import BaseError from '@/models/error/error.model'
import { UserRepositoryService } from '@/sevices-repository/user.repository.service'
import { JwtPayload, JwtService } from '@/libs/jwt.service'
import { AuthRepositoryService } from '@/sevices-repository/auth.repository.service'
import { uid } from 'uid'
import HttpStatusCode from 'http-status-codes'

const userRepository_ = new UserRepositoryService()
const authRepository_ = new AuthRepositoryService()

const jwtService_ = new JwtService()
export class AuthService {
  async login(user: LoginRequest) {
    try {
      const existedUser = await userRepository_.findOneByEmail(user.email)
      if (!existedUser || !bcrypt.compareSync(user.password, existedUser.password)) {
        throw new BaseError('sai pass', HttpStatusCode.CONFLICT)
      }
      const payload: JwtPayload = {
        sub: existedUser.id,
        email: existedUser.email
      }
      const accessToken = jwtService_.generateToken(payload)
      await authRepository_.saveToken({ id: uid(), token: accessToken, userId: existedUser.id })
      return {
        accessToken: accessToken
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
    const newUser = await userRepository_.create(user)
    const userPayload: JwtPayload = {
      email: newUser.email,
      sub: newUser.id
    }
    const token = jwtService_.generateToken(userPayload)
    await authRepository_.saveToken({
      id: uid(),
      token: token,
      userId: newUser.id
    })
    return {
      accessToken: token,
      user: newUser
    }
  }
}
