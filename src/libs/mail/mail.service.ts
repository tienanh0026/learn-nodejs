import BaseError from '@/libs/error/error.model'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import HttpStatusCode from 'http-status-codes'
import { UserEntityDefault } from '@/domain/entity/user.entity'
import { promisify } from 'util'
import fs from 'fs'

const readFile = promisify(fs.readFile)

const mailConfig = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tienanh0026@gmail.com',
    pass: 'yqti yadx fjuo ypel' // Ensure this app password is correct
  },
  tls: {
    rejectUnauthorized: false // Allows self-signed certificates if needed
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
}
