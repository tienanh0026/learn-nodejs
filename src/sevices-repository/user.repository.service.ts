import { UserCreateParams } from '@/domain/entity/user.entity'
import { UserModel } from '@/database/models/user/user.model'
import { UserRepository } from '@/repository/user.repository'
import { UserEditReq } from '@/modules/dto/user/user.request'

export class UserRepositoryService implements UserRepository {
  async create(user: UserCreateParams) {
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
  async findOneByEmail(email: string) {
    return await UserModel.scope('withPassword').findOne({
      where: { email: email }
    })
  }
  async findOneById(id: string) {
    return await UserModel.findOne({
      where: { id: id }
    })
  }
  async update(userId: string, params: UserEditReq) {
    await UserModel.update(params, {
      where: {
        id: userId
      }
    })
    return await this.findOneById(userId)
  }
}
