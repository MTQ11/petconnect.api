import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PetsService } from './pets.service';
import { Pet } from './pet.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { EditPetDto } from './dto/edit-pet.dto';

@Controller('pets')
export class PetsController {
    constructor (private readonly petsService: PetsService) {}

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Get()
    getAll(): Promise<Pet[]> {
        return this.petsService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Get(':id')
    getById(@Param('id') id: string): Promise<Pet> {
        return this.petsService.findById(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Post()
    createPet(@Body() data: CreatePetDto): Promise<Pet> {
        return this.petsService.create(data);
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Put()
    editPet(@Body() data: EditPetDto): Promise<Pet> {
        return this.petsService.edit(data);
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Delete(':id')
    removePet(@Param('id') id: string): Promise<Pet> {
        return this.petsService.remove(id);
    }
}
