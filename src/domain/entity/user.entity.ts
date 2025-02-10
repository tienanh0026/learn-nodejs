export type UserEntity = {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
  password: string
}

export type UserEntityDefault = Omit<UserEntity, 'password'>

export interface UserCreateParams extends Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'> {}

export type UserWithOptionalPassword<T extends boolean> = T extends true ? UserEntity : UserEntityDefault
