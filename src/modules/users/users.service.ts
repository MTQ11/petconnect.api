import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from '../auth/dto/register.tdo';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) { }

    findOne(identifier: string): Promise<User | null> {
        return this.userRepo.findOne({ 
            where: [
                { email: identifier },
                { phone: identifier }
            ]
        });
    }

    findOneWithPassword(identifier: string): Promise<User | null> {
        return this.userRepo.findOne({ 
            where: [
                { email: identifier },
                { phone: identifier }
            ],
            select: ['id', 'name', 'email', 'phone', 'password', 'avatar', 'rating', 'social_login', 'address', 'createdAt', 'updatedAt']
        });
    }

    findAll() {
        return this.userRepo.find();
    }

    async create(data: Partial<User>): Promise<any> {
        const user = this.userRepo.create(data);
        return await this.userRepo.save(user);
    }
}
