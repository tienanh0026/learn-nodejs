import { body } from 'express-validator'

const editUserValidator = [body('name').optional().exists({ values: 'falsy' }).withMessage('Name cannot be empty')]

export { editUserValidator }
