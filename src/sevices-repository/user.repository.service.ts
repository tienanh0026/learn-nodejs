import { UserCreateParams } from '@/domain/entity/user.entity'
import { UserModel } from '@/models/user/user.model'
import { UserRepository } from '@/repository/user.repository'

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
}
