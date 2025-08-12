import { Injectable } from '@nestjs/common';
import { Pet } from './pet.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePetDto } from './dto/create-pet.dto';
import { EditPetDto } from './dto/edit-pet.dto';

@Injectable()
export class PetsService {
    constructor(
        @InjectRepository(Pet)
        private readonly petRepo: Repository<Pet>
    ){}

    async findAll(): Promise<Pet[]> {
        return this.petRepo.find();
    }

    async findById(id: string): Promise<Pet> {
        const exitsPet = await this.petRepo.findOne({where: {id: id}});

        if(!exitsPet) throw new Error('Pet not found');

        return exitsPet;
    }

    async create(data: CreatePetDto): Promise<Pet> {
        const pet = this.petRepo.create(data)
        await this.petRepo.save(pet);
        
        return pet;
    }

    async edit(data: EditPetDto): Promise<Pet> {
        const exitsPet = await this.findById(data.id);
        
        Object.assign(exitsPet, data);
        
        await this.petRepo.save(exitsPet);
        return exitsPet;
    }

    async remove(id: string): Promise<Pet> {
        const pet = await this.findById(id)
        await this.petRepo.remove(pet)

        return pet;
    }
}
