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

type ForgetPasswordRequest = {
  email: string
}

type VerifyOtpRequest = {
  email: string
  otp: string
}

type VerifyOtpResponse = {
  accessToken: string
}

export type {
  LoginResponse,
  CurrentAuthResponse,
  RegisterResponse,
  RefreshResponse,
  ForgetPasswordRequest,
  VerifyOtpRequest,
  VerifyOtpResponse
}
