import { UserCreateParams } from '@/domain/entity/user.entity'

export type FindByEmailReq = {
  email: string
}

export type UserReq = {
  name: string
  email: string
  password: string
}

export type UserEditReq = Partial<Omit<UserCreateParams, 'email'>>

export type UserEditQueryParams = {
  userId: string
}
