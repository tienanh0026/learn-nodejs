type LoginRequest = {
  email: string
  password: string
}

type RegisterRequest = {
  email: string
  password: string
  name: string
}

type RefreshRequest = {
  refreshToken: string
}

export type { LoginRequest, RegisterRequest, RefreshRequest }
