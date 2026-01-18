import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name);
    private resend: Resend;

    constructor(
        private readonly configService: ConfigService,
    ) {
        const apiKey = this.configService.get('RESEND_API_KEY');
        if (!apiKey) {
            this.logger.error('RESEND_API_KEY is not defined in environment variables');
        } else {
            this.resend = new Resend(apiKey);
        }
    }

    async sendUserOtp(email: string, otp: string) {
        this.logger.log(`\n\n==============================\nSENDING OTP TO: ${email}\nOTP CODE: ${otp}\n==============================\n\n`);

        if (!this.resend) {
            this.logger.error('Resend client is not initialized (missing API Key). Cannot send email.');
            return;
        }

        try {
            this.logger.debug(`Attempting to send email via Resend...`);

            const from = 'onboarding@resend.dev'; // Use verified domain in production if available
            // const from = this.configService.get('SMTP_FROM', 'onboarding@resend.dev');

            const { data, error } = await this.resend.emails.send({
                from,
                to: email, // Must be the verified email for testing unless domain is verified
                subject: 'Your CRM Login Code',
                html: `
              <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h2>Your Login Code</h2>
                <p>Please use the following code to sign in to the CRM:</p>
                <h1 style="background: #f4f4f4; padding: 10px; display: inline-block; border-radius: 4px;">${otp}</h1>
                <p>This code will expire in 15 minutes.</p>
                <p>If you did not request this email, you can safely ignore it.</p>
              </div>
            `,
            });

            if (error) {
                this.logger.error(`Resend Error: ${JSON.stringify(error)}`);
            } else {
                this.logger.log(`Email sent successfully. ID: ${data?.id}`);
            }
        } catch (e) {
            this.logger.error(`Failed to send email: ${e.message}`);
        }
    }
}
