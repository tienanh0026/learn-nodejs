export type UserEntity = {
  id: number
  name: string
  email: string
  createdAt: string
  updatedAt: string
  password: string
}

export type UserEntityDefault = Omit<UserEntity, 'password'>

export interface UserCreateParams extends Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'> {}
