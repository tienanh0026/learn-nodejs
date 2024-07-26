import { body } from 'express-validator'

const loginValidator = [
  body('email')
    .notEmpty()
    .bail()
    .withMessage('Email is required')
    .isEmail()
    .withMessage((value) => `${value} is not a valid email`),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
]

const registerValidator = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage((value) => `${value} is not a valid email`),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name').notEmpty().withMessage('Name is required')
]

export { loginValidator, registerValidator }
