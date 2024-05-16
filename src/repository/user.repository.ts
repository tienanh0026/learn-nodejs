import { UserCreateParams } from '@/domain/entity/user.entity'
import { User } from '@/models/user/user.model'

export interface UserRepository {
  create(user: UserCreateParams): Promise<User>
  findAll(): Promise<User[]>
  findByEmail(email: string): Promise<User | null>
}
