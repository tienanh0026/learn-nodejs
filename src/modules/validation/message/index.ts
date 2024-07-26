import { body, ContextRunner } from 'express-validator'
import { buffer } from 'stream/consumers'

const createMessageValidator: ContextRunner[] = [
  body('content')
    // .notEmpty()
    .custom((value, { req }) => {
      try {
        const a = Buffer.concat(req.body).toString()
        console.log('ádasdas', req)
      } catch (error) {
        console.log(error)
      }
      return false
    })
]

export { createMessageValidator }
