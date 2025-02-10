import { UserCreateParams, UserEntityDefault, UserWithOptionalPassword } from '@/domain/entity/user.entity'
import { UserEditReq } from '@/modules/dto/user/user.request'

export interface UserRepository {
  create(user: UserCreateParams): Promise<UserEntityDefault>
  findAll(): Promise<UserEntityDefault[]>
  findByEmail<T extends boolean>(email: string, withPassword: T): Promise<UserWithOptionalPassword<T> | null>
  findOneById<T extends boolean>(id: string, withPassword: T): Promise<UserWithOptionalPassword<T> | null>
  update(userId: string, params: UserEditReq): Promise<UserEntityDefault | null>
}
