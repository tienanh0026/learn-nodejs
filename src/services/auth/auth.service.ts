import { LoginRequest } from '@/modules/dto/auth/auth.request'
import bcrypt from 'bcrypt'
import { BaseError } from '@/models/error/error.model'
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
    const existedUser = await userRepository_.findOneByEmail(user.email)
    if (!existedUser || !bcrypt.compareSync(user.password, existedUser.password)) {
      throw new BaseError('sai pass', HttpStatusCode.CONFLICT)
    }
    const payload: JwtPayload = {
      sub: existedUser.id,
      email: existedUser.email
    }
    const accessToken = jwtService_.generateToken(payload)
    await authRepository_.create({ id: uid(), token: accessToken, userId: existedUser.id })
    return {
      accessToken: accessToken
    }
  }
}
