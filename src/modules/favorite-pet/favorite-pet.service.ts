import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoritePet } from './favorite-pet.entity';

@Injectable()
export class FavoritePetService {
    constructor(
        @InjectRepository(FavoritePet)
        private readonly favoritePetRepository: Repository<FavoritePet>,
    ) {}

    async like(userId: string, petId: string): Promise<FavoritePet> {
        const existed = await this.favoritePetRepository.findOne({ where: { userId, petId } });
        if (existed) return existed;
        const favorite = this.favoritePetRepository.create({ userId, petId });
        return await this.favoritePetRepository.save(favorite);
    }

    async dislike(userId: string, petId: string): Promise<void> {
        await this.favoritePetRepository.delete({ userId, petId });
    }
}
