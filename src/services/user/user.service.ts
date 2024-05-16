import { BaseError, HttpException } from '@/models/error/error.model'
import { UserModel } from '@/models/user/user.model'
import { UserRes } from '@/modules/dto/user.response'
import { UserRepository } from '@/repository/user.repository'
import HttpStatusCode from 'http-status-codes'

export class UserService implements UserRepository {
  async create(user: UserRes) {
    const existedUser = await this.findByEmail(user.email)
    if (existedUser) {
      throw new BaseError('existed', HttpStatusCode.CONFLICT)
    }
    return await UserModel.create(user)
  }
  async findAll() {
    return await UserModel.findAll()
  }
  async findByEmail(email: string) {
    return await UserModel.findOne({
      where: { email: email }
    })
  }
}
