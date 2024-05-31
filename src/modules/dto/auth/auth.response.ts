import { UserEntityDefault } from '@/domain/entity/user.entity'

type LoginResponse = {
  accessToken: string
}

type CurrentAuthResponse = UserEntityDefault

type RegisterResponse = {
  accessToken: string
  user: UserEntityDefault
}

export type { LoginResponse, CurrentAuthResponse, RegisterResponse }
