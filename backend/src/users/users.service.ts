import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOneBy({ email });
    }

    async create(email: string, name?: string): Promise<User> {
        const user = this.usersRepository.create({ email, name });
        return this.usersRepository.save(user);
    }

    async setOtp(user: User, otp: string): Promise<User> {
        user.otpCode = otp;
        // Set expiry to 15 minutes from now
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 15);
        user.otpExpiresAt = expires;

        return this.usersRepository.save(user);
    }

    async clearOtp(user: User): Promise<User> {
        user.otpCode = null;
        user.otpExpiresAt = null;
        return this.usersRepository.save(user);
    }
}
