import { body } from 'express-validator'

const createRoomValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('type').optional().isIn(['1', '2']).withMessage('Type field is not in correct type')
]

const editRoomValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('type').optional().isIn(['1', '2']).withMessage('Type field is not in correct type')
]

export { createRoomValidator, editRoomValidator }
