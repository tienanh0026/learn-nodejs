import { reqFileErrorHandler } from '@/common/error/error'
import { formatErrorReponse } from '@/common/response/response'
import BaseError from '@/libs/error/error.model'
import { NextFunction, Request, Response } from 'express'
import { ContextRunner, FieldValidationError, validationResult } from 'express-validator'
import HttpStatusCode from 'http-status-codes'

const myValidationResult = validationResult.withDefaults<FieldValidationError>()

const formatErrorObj = (errorArr: FieldValidationError[]): Record<string, string> => {
  const errors: Record<string, string> = {}
  errorArr.forEach((error) => {
    errors[error.path] = error.msg
  })
  return errors
}

const checkReqValidationError = (req: Request) => {
  const errorsArr = myValidationResult(req).array()
  const errors = formatErrorObj(errorsArr)
  if (errorsArr.length !== 0) {
    throw new BaseError('Validation failed', HttpStatusCode.PRECONDITION_FAILED, errors)
  }
}

const validate = (validations: ContextRunner[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const validateError: Record<string, string> = {}
    for (const validation of validations) {
      const result = await validation.run(req)
      result.array().forEach((error) => {
        if (error.type === 'field') validateError[error.path] = error.msg
      })
    }
    if (Object.keys(validateError).length !== 0) {
      reqFileErrorHandler(req)
      const response = formatErrorReponse(validateError, 'Validation failed')
      return res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).json(response)
    }
    return next()
  }
}

export { validate }

export default checkReqValidationError
