import { ResponseBody } from '@/controllers/types'
import BaseError from '@/libs/error/error.model'
import { NextFunction, Request, Response } from 'express'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log(error)
  if (error instanceof BaseError) {
    res.statusCode = error.httpCode
    const response: ResponseBody<undefined> = {
      message: error.message,
      data: error.data
    }
    res.end(JSON.stringify(response))
  } else {
    const response: ResponseBody<undefined> = {
      message: 'Unknown error',
      data: undefined
    }

    res.status(500).end(JSON.stringify(response))
  }
}

export { errorHandler }
