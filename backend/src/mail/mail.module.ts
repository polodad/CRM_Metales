import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';

@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => {
                const host = config.get('SMTP_HOST');
                const port = config.get('SMTP_PORT', 587);
                const secureRaw = config.get('SMTP_SECURE');
                const secure = String(secureRaw).toLowerCase() === 'true';

                console.log(`[MailModule] Initializing with: Host=${host}, Port=${port}, Secure=${secure} (Raw=${secureRaw})`);

                return {
                    transport: {
                        host,
                        port,
                        secure,
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
