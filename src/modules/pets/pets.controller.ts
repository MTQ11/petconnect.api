import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PetsService } from './pets.service';
import { Pet } from './pet.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EditPetDto } from './dto/edit-pet.dto';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import type { ICurrentUser } from 'src/common/interfaces/user.interface';
import { DetailPetDto } from './dto/detail-pet.dto';

@ApiTags('Pets')
@Controller('pets')
export class PetsController {
    constructor (private readonly petsService: PetsService) {}

    @Get()
    @ApiOperation({ summary: 'Lấy danh sách tất cả thú cưng' })
    @ApiResponse({ status: 200, description: 'Danh sách thú cưng', type: [Pet] })
    getAll(): Promise<Pet[]> {
        return this.petsService.getAllPets();
    }

    @Get('/similar/:breedId')
    @ApiOperation({ summary: 'Lấy danh sách thú cưng cùng giống' })
    @ApiResponse({ status: 200, description: 'Danh sách thú cưng cùng giống', type: [Pet] })
    getSimilarPets(@Param('breedId') breedId: string): Promise<Pet[]> {
        return this.petsService.getSimilarPets(breedId);
    }

    @Get('/detail/:id')
    @ApiOperation({ summary: 'Lấy thông tin chi tiết thú cưng' })
    @ApiResponse({ status: 200, description: 'Thông tin chi tiết thú cưng', type: DetailPetDto })
    @ApiResponse({ status: 404, description: 'Không tìm thấy thú cưng' })
    getDetailById(@Param('id') id: string): Promise<DetailPetDto> {
        return this.petsService.getDetailById(id);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Lấy thông tin thú cưng theo ID' })
    @ApiResponse({ status: 200, description: 'Thông tin thú cưng', type: Pet })
    getById(@Param('id') id: string): Promise<Pet> {
        return this.petsService.findById(id);
    }

    @Get('/personal')
    getPersonalPetList(@CurrentUser() currentUser: ICurrentUser): Promise<Pet[]> {
        return this.petsService.getPetByUser(currentUser.userId)
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Post()
    createPet(@Body() data: CreatePetDto, @CurrentUser() currentUser: ICurrentUser): Promise<Pet> {
        return this.petsService.create(data, currentUser.userId);
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
