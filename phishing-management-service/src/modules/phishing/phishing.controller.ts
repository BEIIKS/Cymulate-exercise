
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PhishingService } from './phishing.service';

@Controller('phishing')
export class PhishingController {
    constructor(private readonly phishingService: PhishingService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async findAll() {
        return this.phishingService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async send(@Body('email') email: string) {
        return this.phishingService.sendPhishingEmail(email);
    }
}
