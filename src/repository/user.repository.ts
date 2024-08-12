import { UserCreateParams, UserEntityDefault } from '@/domain/entity/user.entity'
import { User } from '@/database/models/user/user.model'
import { UserEditReq } from '@/modules/dto/user/user.request'

export interface UserRepository {
  create(user: UserCreateParams): Promise<UserEntityDefault>
  findAll(): Promise<UserEntityDefault[]>
  findByEmail(email: string): Promise<UserEntityDefault | null>
  findOneByEmail(email: string): Promise<User | null>
  findOneById(id: string): Promise<UserEntityDefault | null>
  update(userId: string, params: UserEditReq): Promise<User | null>
}
