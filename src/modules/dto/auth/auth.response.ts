import { UserEntityDefault } from '@/domain/entity/user.entity'

type LoginResponse = {
  accessToken: string
  refreshToken: string
}

type CurrentAuthResponse = UserEntityDefault

type RegisterResponse = {
  accessToken: string
  user: UserEntityDefault
}

type RefreshResponse = {
  accessToken: string
}

export type { LoginResponse, CurrentAuthResponse, RegisterResponse, RefreshResponse }
