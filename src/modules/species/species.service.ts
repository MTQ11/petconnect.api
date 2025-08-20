import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Species } from './species.entity';

@Injectable()
export class SpeciesService {
    constructor(
        @InjectRepository(Species)
        private readonly speciesRepository: Repository<Species>
    ) {}

    async findAll(): Promise<Species[]> {
        return this.speciesRepository.find({
            order: {
                name_vi: 'ASC'
            }
        });
    }

    async findOne(id: string): Promise<Species> {
        const species = await this.speciesRepository.findOne({
            where: { id }
        });

        if (!species) {
            throw new NotFoundException(`Không tìm thấy loài với ID: ${id}`);
        }

        return species;
    }
}
