import { formatResponse } from '@/common/response/response'
import BaseError from '@/libs/error/error.model'
import { NextFunction, Request, Response } from 'express'
import { ContextRunner, FieldValidationError, validationResult } from 'express-validator'
import HttpStatusCode from 'http-status-codes'

const myValidationResult = validationResult.withDefaults<FieldValidationError>()

const checkReqValidationError = (req: Request) => {
  const errors = myValidationResult(req)
    .array()
    .map((error) => ({
      msg: error.msg,
      field: error.path
    }))
  if (errors.length !== 0) {
    throw new BaseError('Validation failed', HttpStatusCode.PRECONDITION_FAILED, errors)
  }
}

const validate = (validations: ContextRunner[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (const validation of validations) {
      const result = await validation.run(req)
      const errors = result.array().reduce<
        {
          msg: string
          field: string
        }[]
      >((prevArr, error) => {
        if (error.type === 'field')
          prevArr.push({
            msg: error.msg,
            field: error.path
          })
        return prevArr
      }, [])
      if (errors.length !== 0) {
        const response = formatResponse(errors, 'Validation failed')
        return res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).json(response)
      }
    }
    return next()
  }
}

export { validate }

export default checkReqValidationError
