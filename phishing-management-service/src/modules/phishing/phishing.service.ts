
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PhishingAttempt, PhishingAttemptDocument } from './schemas/phishing-attempt.schema';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PhishingService {
    constructor(
        @InjectModel(PhishingAttempt.name) private phishingAttemptModel: Model<PhishingAttemptDocument>,
        private configService: ConfigService,
    ) { }

    async findAll() {
        return this.phishingAttemptModel.find().sort({ createdAt: -1 }).exec();
    }

    async sendPhishingEmail(email: string) {
        const simulationUrl = this.configService.get<string>('PHISHING_SIMULATION_URL') + '/send';

        try {
            const response = await axios.post(simulationUrl, {
                email,
            });
            return response.data;
        } catch (error) {
            console.error('Error triggering phishing simulation:', error);
            throw error;
        }
    }
}
