import { UserCreateParams, UserEntityDefault } from '@/domain/entity/user.entity'
import { User } from '@/models/user/user.model'

export interface UserRepository {
  create(user: UserCreateParams): Promise<UserEntityDefault>
  findAll(): Promise<UserEntityDefault[]>
  findByEmail(email: string): Promise<UserEntityDefault | null>
  findOneByEmail(email: string): Promise<User | null>
  findOneById(id: string): Promise<UserEntityDefault | null>
}
