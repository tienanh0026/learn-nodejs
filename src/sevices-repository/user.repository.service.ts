import { UserCreateParams, UserWithOptionalPassword, UserEntity, UserEntityDefault } from '@/domain/entity/user.entity'
import { UserModel } from '@/database/models/user/user.model'
import { UserRepository } from '@/repository/user.repository'
import { UserEditReq } from '@/modules/dto/user/user.request'

export class UserRepositoryService implements UserRepository {
  async create(user: UserCreateParams): Promise<UserEntity> {
    return await UserModel.create(user)
  }

  async findAll(): Promise<UserEntityDefault[]> {
    return await UserModel.findAll()
  }

  async findByEmail<T extends boolean>(email: string, withPassword: T): Promise<UserWithOptionalPassword<T> | null> {
    return UserModel.scope(withPassword ? 'withPassword' : undefined).findOne({
      where: { email: email }
    })
  }

  async findOneById<T extends boolean>(id: string, withPassword: T): Promise<UserWithOptionalPassword<T> | null> {
    return await UserModel.scope(withPassword ? 'withPassword' : undefined).findOne({
      where: { id: id }
    })
  }

  async update(userId: string, params: UserEditReq): Promise<UserEntity | null> {
    await UserModel.update(params, {
      where: {
        id: userId
      }
    })
    return await this.findOneById(userId, true)
  }
}
