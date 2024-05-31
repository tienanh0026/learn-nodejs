import BaseError from '@/models/error/error.model'
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
    user: 'anhnt2@yopaz.vn',
    pass: 'eyyj wdew igca pbux'
  }
})

export class MailService {
  async sendMail(mailOptions: Mail.Options) {
    mailConfig.sendMail(mailOptions, (err) => {
      throw new BaseError(err?.message || 'Send mail error', HttpStatusCode.SERVICE_UNAVAILABLE)
    })
  }
  async sendRegisterSuccessfull(email: string, user: UserEntityDefault) {
    let htmlString = await readFile(__dirname + '/template/register_success.html', 'utf8')
    htmlString = htmlString.replace('{account_name}', user.name)
    this.sendMail({
      to: email,
      subject: 'Register successfully',
      html: htmlString
    })
  }
}
