export type UserEntity = {
  id: number
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

export type UserCreateParams = {
  name: string
  email: string
}
