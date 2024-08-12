import BaseError from '@/libs/error/error.model'
import { UserEditQueryParams, UserEditReq, UserReq } from '@/modules/dto/user/user.request'
import HttpStatusCode from 'http-status-codes'
import bcrypt from 'bcryptjs'
import { UserRepositoryService } from '@/sevices-repository/user.repository.service'
import { UserEntityDefault } from '@/domain/entity/user.entity'
import { User } from '@/database/models/user/user.model'
import { ResponseBody } from '@/controllers/types'
import { Request } from 'express'
import { JwtService } from '@/libs/jwt/jwt.service'
export class UserService {
  constructor(
    private _jwtService: JwtService,
    private _userRepository: UserRepositoryService
  ) {}
  async create(user: UserReq): Promise<UserEntityDefault> {
    const existedUser = await this._userRepository.findByEmail(user.email)
    if (existedUser) {
      throw new BaseError('existed', HttpStatusCode.CONFLICT)
    }
    const newUser = user
    newUser.password = await bcrypt.hash(user.password, 10)

    return await this._userRepository.create(newUser)
  }
  async findAll(): Promise<UserEntityDefault[]> {
    return await this._userRepository.findAll()
  }
  async findByEmail(email: string): Promise<User | null> {
    return await this._userRepository.findByEmail(email)
  }
  async findOneById(id: string) {
    const user = await this._userRepository.findOneById(id)
    if (!user) throw new BaseError('Not found', HttpStatusCode.NOT_FOUND)
    return user
  }
  async update(req: Request<UserEditQueryParams, ResponseBody<null>, UserEditReq>) {
    const user = await this._jwtService.getUserInfo(req)
    if (user.id !== req.params.userId)
      throw new BaseError('You dont have permission to update this account', HttpStatusCode.UNAUTHORIZED)
    const params = req.body
    await this._userRepository.update(user.id, params)
    return null
  }
}
