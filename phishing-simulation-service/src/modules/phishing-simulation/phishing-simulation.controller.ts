import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PhishingService } from './phishing-simulation.service';

@Controller('phishing-simulation')
export class PhishingSimulationController {
  constructor(private readonly phishingService: PhishingService) { }

  @Post('send')
  async send(@Body('email') email: string) {
    await this.phishingService.sendPhishingEmail(email);
    return { status: 'sent' };
  }

  @Get('click')
  async click(@Query('id') id: string) {
    await this.phishingService.markAttemptAsSuccess(id);
    return 'You have been phished!';
  }
}
