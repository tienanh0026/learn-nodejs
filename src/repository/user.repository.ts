import { UserCreateParams, UserEntityDefault } from '@/domain/entity/user.entity'

export interface UserRepository {
  create(user: UserCreateParams): Promise<UserEntityDefault>
  findAll(): Promise<UserEntityDefault[]>
  findByEmail(email: string): Promise<UserEntityDefault | null>
}
