import { AuthController as AuthControllerClass } from '@/controllers/auth/auth.controller'
import { AuthService } from '@/services/auth/auth.service'
import express from 'express'

const authRoute = express()
const AuthController = new AuthControllerClass(new AuthService())

authRoute.post('/login', AuthController.login)

export default authRoute
