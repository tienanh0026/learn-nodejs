import { BaseError } from '@/models/error/error.model'
import { UserReq } from '@/modules/dto/user/user.request'
import HttpStatusCode from 'http-status-codes'
import bcrypt from 'bcrypt'
import { UserRepositoryService } from '@/sevices-repository/user.repository.service'
import { UserEntityDefault } from '@/domain/entity/user.entity'
import { User } from '@/models/user/user.model'

const userRepository_ = new UserRepositoryService()
export class UserService {
  async create(user: UserReq): Promise<UserEntityDefault> {
    const existedUser = await userRepository_.findByEmail(user.email)
    if (existedUser) {
      throw new BaseError('existed', HttpStatusCode.CONFLICT)
    }
    const newUser = user
    newUser.password = await bcrypt.hash(user.password, 10)

    return await userRepository_.create(newUser)
  }
  async findAll(): Promise<UserEntityDefault[]> {
    return await userRepository_.findAll()
  }
  async findByEmail(email: string): Promise<User | null> {
    return await userRepository_.findByEmail(email)
  }
}
