import { UserEntityDefault } from '@/domain/entity/user.entity'

type LoginResponse = {
  accessToken: string
}

type CurrentAuthResponse = UserEntityDefault

export type { LoginResponse, CurrentAuthResponse }
