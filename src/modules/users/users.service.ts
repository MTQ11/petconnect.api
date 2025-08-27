import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from '../auth/dto/register.tdo';
import * as bcrypt from 'bcrypt'
import { ProfileDto } from './dto/profile.dto';

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

    async findById(id: string): Promise<User> {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) throw new Error('User not found');

        return user;
    }

    async getProfile(id: string): Promise<ProfileDto> {
        const profile = await this.userRepo.findOne({ where: { id } });
        if (!profile) throw new Error('User not found');

        const postCount = await this.userRepo.createQueryBuilder('user')
            .leftJoinAndSelect('user.posts', 'post')
            .where('user.id = :id', { id })
            .getCount();

        const petCount = await this.userRepo.createQueryBuilder('user')
            .leftJoinAndSelect('user.pets', 'pet')
            .where('user.id = :id', { id })
            .getCount();

        return {
            id: profile.id,
            name: profile.name,
            email: profile.email,
            phone: profile.phone,
            avatar: profile.avatar,
            address: profile.address,
            description: profile.description,
            rating: profile.rating,
            verified: profile.verified,
            createdAt: profile.createdAt,
            updatedAt: profile.updatedAt,
            postCount: postCount,
            petCount: petCount,
            totalPetsSold: 0 //tạm thời mở rộng sau
        };
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

    async create(data: Partial<User>): Promise<User> {
        const user = this.userRepo.create(data);
        return await this.userRepo.save(user);
    }

    async update(id: string, data: Partial<User>): Promise<User> {
        await this.userRepo.update(id, data);
        return this.findById(id);
    }
}
