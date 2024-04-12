import { UserModel } from '@/models/users'
import { RequestListener } from 'http'
import { ResponseBody } from './types'
import { RequestHandler } from 'express'
type UserRequestBody = {
  name: string
  email: string
}

const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const users = await UserModel.findAll()
    console.log(users[0])

    const response: ResponseBody<any> = {
      message: 'success',
      data: users
    }
    res.json(response)
  } catch {
    responseError(req, res)
  }
}

const createUser: RequestHandler<unknown, unknown, UserRequestBody> = async (req, res) => {
  try {
    const { name, email } = req.body
    const newUser = { name, email }
    console.log(newUser)

    const user = await UserModel.create(newUser)
    console.log(user)

    const response: ResponseBody<string> = {
      message: 'success',
      data: ''
    }
    res.json(response)
  } catch {
    responseError(req, res)
  }
}

const responseError: RequestListener = (_req, res) => {
  res.statusCode = 422
  res.setHeader('content-Type', 'Application/json')
  const response: ResponseBody<undefined> = {
    message: 'Error occurred   123123123',
    data: undefined
  }
  res.end(JSON.stringify(response))
}

const UserController = {
  getAllUsers,
  createUser
}
export default UserController

export { getAllUsers }
