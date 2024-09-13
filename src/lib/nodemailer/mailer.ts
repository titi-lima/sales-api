import { createTransport } from 'nodemailer';

interface EmailConfig {
  subjectText: string;
  html: string;
  userEmail: string;
}

export class MailService {
  private transporter;

  constructor() {
    this.transporter = createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
  }

  async sendMail(emailConfig: EmailConfig): Promise<boolean> {
    try {
      await this.transporter.sendMail({
        from: `Titi <${process.env.EMAIL}>`,
        to: emailConfig.userEmail,
        subject: emailConfig.subjectText,
        html: emailConfig.html,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
