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

const forgotPasswordValidator = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage((value) => `${value} is not a valid email`)
]

const otpVerifyValidator = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage((value) => `${value} is not a valid email`),
  body('otp')
    .notEmpty()
    .withMessage('Otp is required')
    .isLength({ min: 6, max: 6 })
    .withMessage('Otp must be 6 characters')
]

const changePasswordValidator = [
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
]

export { loginValidator, registerValidator, forgotPasswordValidator, otpVerifyValidator, changePasswordValidator }
