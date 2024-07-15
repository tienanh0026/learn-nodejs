import { LoginRequest, RegisterRequest } from '@/modules/dto/auth/auth.request'
import bcrypt from 'bcryptjs'
import BaseError from '@/libs/error/error.model'
import { UserRepositoryService } from '@/sevices-repository/user.repository.service'
import { JwtPayload, JwtService } from '@/libs/jwt/jwt.service'
import { AuthRepositoryService } from '@/sevices-repository/auth.repository.service'
import { uid } from 'uid'
import HttpStatusCode from 'http-status-codes'
import { MailService } from '@/libs/mail/mail.service'

export class AuthService {
  constructor(
    private _userRepository: UserRepositoryService,
    private _authRepository: AuthRepositoryService,
    private _jwtService: JwtService,
    private _mailService: MailService
  ) {}
  async login(user: LoginRequest) {
    try {
      const existedUser = await this._userRepository.findOneByEmail(user.email)
      if (!existedUser) throw new BaseError('Email not found', HttpStatusCode.CONFLICT)
      if (!bcrypt.compareSync(user.password, existedUser.password)) {
        throw new BaseError('sai pass', HttpStatusCode.CONFLICT)
      }
      const payload: JwtPayload = {
        id: existedUser.id,
        email: existedUser.email
      }
      const accessToken = this._jwtService.generateToken(payload)
      const refreshToken = this._jwtService.generateRefreshToken(payload)
      await this._authRepository.saveToken({ id: uid(), token: accessToken, userId: existedUser.id })
      return {
        accessToken,
        refreshToken
      }
    } catch (error) {
      if (error instanceof BaseError) {
        throw error
      }
      throw new BaseError('cannot login', HttpStatusCode.BAD_REQUEST)
    }
  }
  async currentAuth(email: string) {
    const extstedUser = await this._userRepository.findByEmail(email)
    if (!extstedUser) throw new BaseError('User not found', HttpStatusCode.NOT_FOUND)
    return extstedUser
  }
  async register(user: RegisterRequest) {
    const existedUser = await this._userRepository.findByEmail(user.email)
    if (existedUser) throw new BaseError('Existed email', HttpStatusCode.CONFLICT)
    console.log('user', user)
    user.password = await bcrypt.hash(user.password, 10)
    const newUser = await this._userRepository.create(user)
    const userPayload: JwtPayload = {
      email: newUser.email,
      id: newUser.id
    }
    const token = this._jwtService.generateToken(userPayload)
    await this._authRepository.saveToken({
      id: uid(),
      token: token,
      userId: newUser.id
    })
    await this._mailService.sendRegisterSuccessfull(newUser.email, newUser)
    return {
      accessToken: token,
      user: newUser
    }
  }
  async refresh(token: string) {
    try {
      console.log('token', token)

      const refreshPayload = this._jwtService.verifyRefreshToken(token)
      console.log(refreshPayload)
      const tokenPayload = {
        id: refreshPayload.id,
        email: refreshPayload.email
      }
      const accessToken = this._jwtService.generateToken(tokenPayload)
      await this._authRepository.saveToken({
        id: uid(),
        token: accessToken,
        userId: tokenPayload.id
      })
      return {
        accessToken
      }
    } catch (error) {
      console.log(error)

      throw new BaseError('Please authenticate', HttpStatusCode.FORBIDDEN)
    }
  }
}
