import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { Pet } from './pet.entity';
import { Species } from '../species/species.entity';
import { Breed } from '../breeds/breed.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pet, Species, Breed, User])],
  controllers: [PetsController],
  providers: [PetsService]
})
export class PetsModule {}
