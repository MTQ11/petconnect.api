import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) { }

    findAll() {
        return this.userRepo.find();
    }

    create(data: Partial<User>) {
        const user = this.userRepo.create(data);
        return this.userRepo.save(user);
    }
}
