import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.configService.get('GMAIL_USER'),
        clientId: this.configService.get('GOOGLE_CLIENT_ID'),
        clientSecret: this.configService.get('GOOGLE_CLIENT_SECRET'),
        refreshToken: this.configService.get('GOOGLE_REFRESH_TOKEN'),
      },
    });
  }

  async sendMail(options: {
    to: string;
    subject?: string;
    html?: string;
  }): Promise<any> {
    return this.transporter.sendMail({
      from: this.configService.get('GMAIL_USER'),
      ...options,
    });
  }
}
