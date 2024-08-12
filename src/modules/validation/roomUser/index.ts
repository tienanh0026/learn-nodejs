import { body } from 'express-validator'

const addRoomUserValidator = [
  body('user[0].id').notEmpty().withMessage('User Id is required'),
  body('user[0].role').optional().isIn(['admin', 'admin']).withMessage('Type role is not in correct type')
]

const removeRoomUserValidator = [body('id').notEmpty().withMessage('User Id is required')]

const readMessageValidator = [body('messageId').notEmpty().withMessage('Message Id is required')]

export { addRoomUserValidator, removeRoomUserValidator, readMessageValidator }
