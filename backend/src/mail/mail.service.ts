import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name);

    constructor(private readonly mailerService: MailerService) { }

    async sendUserOtp(email: string, otp: string) {
        this.logger.log(`\n\n==============================\nSENDING OTP TO: ${email}\nOTP CODE: ${otp}\n==============================\n\n`);

        // In a real env, we would send the email here.
        // For now, we just log it to ensure development velocity without needing valid SMTP creds immediately.
        try {
            await this.mailerService.sendMail({
                to: email,
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
        } catch (e) {
            // If email fails (e.g. no config), we still rely on the console log for dev
            this.logger.warn(`Failed to send real email (expected if no SMTP config): ${e.message}`);
        }
    }
}
