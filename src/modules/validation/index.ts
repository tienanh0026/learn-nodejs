import { reqFileErrorHandler } from '@/common/error/error'
import { formatResponse } from '@/common/response/response'
import BaseError from '@/libs/error/error.model'
import { NextFunction, Request, Response } from 'express'
import { ContextRunner, FieldValidationError, validationResult } from 'express-validator'
import HttpStatusCode from 'http-status-codes'

type ValidateObj = {
  msg: string
  field: string
}

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
    const validateError: ValidateObj[] = []
    for (const validation of validations) {
      const result = await validation.run(req)
      result.array().forEach((error) => {
        if (error.type === 'field')
          validateError.push({
            msg: error.msg,
            field: error.path
          })
      })
    }
    if (validateError.length !== 0) {
      reqFileErrorHandler(req)
      const response = formatResponse(validateError, 'Validation failed')
      return res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).json(response)
    }
    return next()
  }
}

export { validate }

export default checkReqValidationError
