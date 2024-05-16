import { UserEntity } from '@/domain/entity/user.entity'

export class UserRes {
  id: number
  name: string
  email: string
  createdAt: string
  updatedAt: string
  constructor(user: UserEntity) {
    this.id = user.id
    this.name = user.name
    this.email = user.email
    this.createdAt = user.createdAt
    this.updatedAt = user.updatedAt
  }
}
