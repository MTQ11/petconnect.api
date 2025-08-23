import { Module } from '@nestjs/common';
import { FavoritePetController } from './favorite-pet.controller';
import { FavoritePetService } from './favorite-pet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritePet } from './favorite-pet.entity';

@Module({
    imports: [TypeOrmModule.forFeature([FavoritePet])],
    controllers: [FavoritePetController],
    providers: [FavoritePetService],

})
export class FavoritePetModule { }
