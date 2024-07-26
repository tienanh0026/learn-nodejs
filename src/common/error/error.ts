import { ResponseBody } from '@/controllers/types'
import BaseError from '@/libs/error/error.model'
import { NextFunction, Request, Response } from 'express'
import * as fs from 'fs'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (error: Error, req: Request, res: Response, _next: NextFunction) => {
  console.log(error)
  reqFileErrorHandler(req)
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

const reqFileErrorHandler = (req: Request) => {
  if (!req.file) return
  const fileName = req.file.path
  console.log(fileName)
  fs.unlink(fileName, (err) => {
    if (err) {
      console.error(`Error removing file: ${err}`)
      return
    }
    console.log(`File ${fileName} has been successfully removed.`)
  })
}

export { errorHandler, reqFileErrorHandler }
