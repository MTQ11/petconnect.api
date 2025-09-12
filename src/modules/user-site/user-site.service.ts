import { Injectable } from '@nestjs/common';
import { UserSite } from './user-site.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createDefaultLayoutConfig, LayoutConfigDto } from './dto/layout-config.dto';
import { ICurrentUser } from 'src/common/interfaces/user.interface';
import { User } from '../users/user.entity';

@Injectable()
export class UserSiteService {
    constructor(
        @InjectRepository(UserSite)
        private readonly userSiteRepo: Repository<UserSite>,
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
    ) { }

    async getLayoutConfigUser(userId: string): Promise<UserSite> {
        const userSite = await this.userSiteRepo.findOne({
            where: { userId },
            relations: ['user']
        });
        if (!userSite) {
            const user = await this.userRepo.findOne({ where: { id: userId } });
            if (!user) {
                throw new Error('User not found');
            }
            const normalizedName = user.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, '');
            await this.createAutoLayoutConfig(userId, normalizedName + (Math.floor(Math.random() * 900000) + 100000));
            const newUserSite = await this.userSiteRepo.findOne({
                where: { userId },
                relations: ['user']
            });
            if (!newUserSite) {
                throw new Error('Failed to create user site');
            }
            return newUserSite;
        }
        return userSite;
    }

    async createAutoLayoutConfig(userId: string, subDomain: string): Promise<UserSite> {
        const newLayoutConfig = this.userSiteRepo.create({
            userId,
            subDomain,
            layoutConfig: createDefaultLayoutConfig() as any
        });
        return this.userSiteRepo.save(newLayoutConfig);
    }

    async updateLayoutConfigUser(userId: string, layoutConfig: LayoutConfigDto): Promise<UserSite> {
        const existing = await this.userSiteRepo.findOne({ where: { userId } });
        if (!existing) {
            throw new Error('User site not found');
        }
        return this.userSiteRepo.save({ ...existing, layoutConfig: layoutConfig as any });
    }
}
