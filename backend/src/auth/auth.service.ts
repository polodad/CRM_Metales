import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private mailService: MailService,
    ) { }

    async sendOtp(email: string) {
        // 1. Find or Create User
        // We auto-register for simplicity in this flow, or strictly login.
        // Let's do find-or-create to be seamless.
        let user = await this.usersService.findByEmail(email);
        if (!user) {
            user = await this.usersService.create(email);
        }

        // 2. Generate 6 digit code
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // 3. Save to User
        await this.usersService.setOtp(user, otp);

        // 4. Send Email
        await this.mailService.sendUserOtp(email, otp);

        return { message: 'OTP sent successfully' };
    }

    async verifyOtp(email: string, code: string) {
        const user = await this.usersService.findByEmail(email);

        if (!user || user.otpCode !== code) {
            throw new UnauthorizedException('Invalid OTP');
        }

        // Check expiry
        if (user.otpExpiresAt && new Date() > user.otpExpiresAt) {
            throw new UnauthorizedException('OTP has expired');
        }

        // Clear OTP so it can't be reused
        await this.usersService.clearOtp(user);

        // Generate Token
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            }
        };
    }
}
