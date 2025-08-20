import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { BreedsService } from './breeds.service';
import { Breed } from './breed.entity';

@ApiTags('Breeds')
@Controller('breeds')
export class BreedsController {
    constructor(private readonly breedsService: BreedsService) {}

    @Get()
    @ApiOperation({ summary: 'Lấy danh sách tất cả các giống' })
    @ApiResponse({ status: 200, description: 'Danh sách các giống', type: [Breed] })
    @ApiQuery({ name: 'speciesId', required: false, description: 'Lọc theo ID loài' })
    async findAll(@Query('speciesId') speciesId?: string): Promise<Breed[]> {
        return this.breedsService.findAll(speciesId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Lấy thông tin giống theo ID' })
    @ApiResponse({ status: 200, description: 'Thông tin giống', type: Breed })
    @ApiResponse({ status: 404, description: 'Không tìm thấy giống' })
    async findOne(@Param('id') id: string): Promise<Breed> {
        return this.breedsService.findOne(id);
    }

    @Get('by-species/:speciesId')
    @ApiOperation({ summary: 'Lấy danh sách giống theo loài' })
    @ApiResponse({ status: 200, description: 'Danh sách giống của loài', type: [Breed] })
    async findBySpecies(@Param('speciesId') speciesId: string): Promise<Breed[]> {
        return this.breedsService.findBySpecies(speciesId);
    }
}
