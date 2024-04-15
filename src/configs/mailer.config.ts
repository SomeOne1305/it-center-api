import { registerAs } from "@nestjs/config";
import {MailerOptions} from '@nestjs-modules/mailer'

export default registerAs('mailerConfig',():MailerOptions=>({
  transport:{
    host:"smtp.mail.ru",
    auth:{
      user:process.env.MAILER_MAIL,
      pass:process.env.MAILER_PASS
    }
  }
}))