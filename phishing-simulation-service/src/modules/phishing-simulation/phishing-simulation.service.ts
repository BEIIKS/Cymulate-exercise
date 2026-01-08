import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailService } from '../mail/mail.service';
import {
  PhishingAttempt,
  PhishingAttemptDocument,
} from './schemas/phishing-attempt.schema';

@Injectable()
export class PhishingService {
  constructor(
    private readonly mailService: MailService,
    @InjectModel(PhishingAttempt.name)
    private phishingAttemptModel: Model<PhishingAttemptDocument>,
    private readonly configService: ConfigService,
  ) { }

  async sendPhishingEmail(targetEmail: string) {
    const attempt = new this.phishingAttemptModel({
      emailId: targetEmail,
      status: 'pending',
    });
    await attempt.save();

    const link = this.generatePhishingLink(attempt._id.toString());

    await this.mailService.sendMail({
      to: targetEmail,
      subject: 'this is the phishing email',
      html: `Hello World! <a href="${link}">Click me</a>`,
    });
  }

  private generatePhishingLink(attemptId: string): string {
    const baseUrl =
      this.configService.get('APP_URL') || 'http://localhost:9845';
    return `${baseUrl}/phishing-simulation/click?id=${attemptId}`;
  }

  async markAttemptAsSuccess(id: string) {
    return this.phishingAttemptModel.findByIdAndUpdate(
      id,
      { status: 'success' },
      { new: true },
    );
  }
}
