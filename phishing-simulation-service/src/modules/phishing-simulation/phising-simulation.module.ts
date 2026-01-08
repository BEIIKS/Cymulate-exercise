import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from '../mail/mail.module';
import { PhishingService } from './phishing-simulation.service';
import { PhishingSimulationController } from './phishing-simulation.controller';
import {
  PhishingAttempt,
  PhishingAttemptSchema,
} from './schemas/phishing-attempt.schema';

@Module({
  imports: [
    MailModule,
    MongooseModule.forFeature([
      { name: PhishingAttempt.name, schema: PhishingAttemptSchema },
    ]),
  ],
  controllers: [PhishingSimulationController],
  providers: [PhishingService],
})
export class PhishingSimulationModule { }
