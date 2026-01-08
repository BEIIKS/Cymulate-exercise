import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PhishingAttemptDocument = HydratedDocument<PhishingAttempt>;

@Schema({ timestamps: true })
export class PhishingAttempt {
    @Prop({ required: true })
    emailId: string;

    @Prop({
        required: true,
        enum: ['pending', 'success'],
        default: 'pending',
    })
    status: string;
}

export const PhishingAttemptSchema = SchemaFactory.createForClass(PhishingAttempt);
