import { body, ContextRunner, query } from 'express-validator'

const createMessageValidator: ContextRunner[] = [
  body('content')
    .custom((value, { req }) => {
      if (!value && !req.file) return false
      else return true
    })
    .withMessage('Message content is required')
]

const getMessageListValidator = [
  query('perPage').custom((value) => {
    if (!value) return true
    if (Number(value) === 0 || !!Number(value)) return true
    else return false
  }),
  query('page').custom((value) => {
    if (!value) return true
    if (Number(value) === 0 || !!Number(value)) return true
    else return false
  })
]

export { createMessageValidator, getMessageListValidator }
