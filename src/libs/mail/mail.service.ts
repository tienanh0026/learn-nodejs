import BaseError from '@/libs/error/error.model'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import HttpStatusCode from 'http-status-codes'
import { UserEntityDefault } from '@/domain/entity/user.entity'
import { promisify } from 'util'
import fs from 'fs'
import { OtpEntity } from '@/domain/entity/otp.entity'

const readFile = promisify(fs.readFile)

const mailConfig = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tienanh0026@gmail.com',
    pass: 'yqti yadx fjuo ypel'
  },
  tls: {
    rejectUnauthorized: false
  }
})

export class MailService {
  async sendMail(mailOptions: Mail.Options) {
    try {
      await mailConfig.sendMail(mailOptions) // Use the async version
    } catch (err) {
      throw new BaseError('Send mail error', HttpStatusCode.SERVICE_UNAVAILABLE)
    }
  }

  async sendRegisterSuccessful(email: string, user: UserEntityDefault) {
    try {
      let htmlString = await readFile(`${__dirname}/template/register_success.html`, 'utf8')
      htmlString = htmlString.replace('{account_name}', user.name)

      await this.sendMail({
        from: 'tienanh0026@gmail.com', // Ensure the sender address is set
        to: email,
        subject: 'Register successfully',
        html: htmlString
      })
    } catch (err) {
      throw new BaseError('Error sending registration email', HttpStatusCode.INTERNAL_SERVER_ERROR)
    }
  }
  async sendResetPasswordOtp(email: string, otp: OtpEntity['otp']) {
    try {
      let htmlString = await readFile(`${__dirname}/template/reset_password.html`, 'utf8')
      htmlString = htmlString.replace('{otp}', otp)

      await this.sendMail({
        from: 'tienanh0026@gmail.com', // Ensure the sender address is set
        to: email,
        subject: 'Reset Your Password',
        html: htmlString
      })
    } catch (error) {
      throw new BaseError('Error sending forgot password email', HttpStatusCode.INTERNAL_SERVER_ERROR)
    }
  }
}
