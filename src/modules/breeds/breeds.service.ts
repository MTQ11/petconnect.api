import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Breed } from './breed.entity';

@Injectable()
export class BreedsService {
    constructor(
        @InjectRepository(Breed)
        private readonly breedRepository: Repository<Breed>
    ) {}

    async findAll(speciesId?: string): Promise<Breed[]> {
        const queryBuilder = this.breedRepository.createQueryBuilder('breed')
            .leftJoinAndSelect('breed.species', 'species')
            .orderBy('breed.name_vi', 'ASC');

        if (speciesId) {
            queryBuilder.where('breed.speciesId = :speciesId', { speciesId });
        }

        return queryBuilder.getMany();
    }

    async findOne(id: string): Promise<Breed> {
        const breed = await this.breedRepository.findOne({
            where: { id },
            relations: ['species']
        });

        if (!breed) {
            throw new NotFoundException(`Không tìm thấy giống với ID: ${id}`);
        }

        return breed;
    }

    async findBySpecies(speciesId: string): Promise<Breed[]> {
        return this.breedRepository.find({
            where: { speciesId },
            relations: ['species'],
            order: {
                name_vi: 'ASC'
            }
        });
    }
}
