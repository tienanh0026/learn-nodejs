import { BaseError } from '@/models/error/error.model'
import { UserModel } from '@/models/user/user.model'
import { UserReq } from '@/modules/dto/user.request'
import { UserRepository } from '@/repository/user.repository'
import HttpStatusCode from 'http-status-codes'
import bcrypt from 'bcrypt'
export class UserService implements UserRepository {
  async create(user: UserReq) {
    const existedUser = await this.findByEmail(user.email)
    if (existedUser) {
      throw new BaseError('existed', HttpStatusCode.CONFLICT)
    }
    const newUser = user
    newUser.password = await bcrypt.hash(user.password, 10)

    return await UserModel.create(newUser)
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
