import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "b7d5b0cc4232de",
    pass: "aa79949b06c1d9"
  }
});

export class NodeMailerMailerAdapter implements MailAdapter {
  async sendMail({ body, subject }: SendMailData) {
    await transport.sendMail({
      from: 'me <carlos@email.com>',
      to: 'you <you@gmail.com>',
      subject,
      html: body,
    });
  }
}