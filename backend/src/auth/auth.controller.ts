import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('send-otp')
    async sendOtp(@Body('email') email: string) {
        return this.authService.sendOtp(email);
    }

    @HttpCode(HttpStatus.OK)
    @Post('verify-otp')
    async verifyOtp(@Body('email') email: string, @Body('code') code: string) {
        return this.authService.verifyOtp(email, code);
    }
}
