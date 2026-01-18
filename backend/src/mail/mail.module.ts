import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';

@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => {
                console.log(`[MailModule] Initializing with: Service=gmail, User=${config.get('SMTP_USER')}`);

                return {
                    transport: {
                        service: 'gmail',
                        auth: {
                            user: config.get('SMTP_USER'),
                            pass: config.get('SMTP_PASS'),
                        },
                    },
                    defaults: {
                        from: `"No Reply" <${config.get('SMTP_FROM', 'noreply@example.com')}>`,
                    },
                };
            },
            inject: [ConfigService],
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule { }
