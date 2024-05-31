// import { IsEmail, IsString, MinLength } from 'class-validator'

type LoginRequest = {
  email: string
  password: string
}

// class RegisterRequest {
//   @IsString()
//   name!: string

//   @IsEmail()
//   email!: string

//   @IsString()
//   @MinLength(6)
//   password!: string
// }

type RegisterRequest = {
  email: string
  password: string
  name: string
}

export type { LoginRequest, RegisterRequest }
