import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from 'nodemailer'

export default class MailtrapMailProvider implements IMailProvider {

    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            auth: {
              user: "591daf7d74da4d",
              pass: "7b88e0e6614ac4",
            },
        });
    }

    async sendMail(message: IMessage): Promise<void> {
        console.log('sendMail')
        await this.transporter.sendMail({
            to: {
                name: message.to.name,
                address: message.to.email,

            },
            from: {
                name: message.from.name,
                address: message.from.email,
            },
            subject: message.subject,
            html: message.body,
        })
    }
}
