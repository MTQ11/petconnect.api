import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SpeciesService } from './species.service';
import { Species } from './species.entity';

@ApiTags('Species')
@Controller('species')
export class SpeciesController {
    constructor(private readonly speciesService: SpeciesService) {}

    @Get()
    @ApiOperation({ summary: 'Lấy danh sách tất cả các loài' })
    @ApiResponse({ status: 200, description: 'Danh sách các loài', type: [Species] })
    async findAll(): Promise<Species[]> {
        return this.speciesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Lấy thông tin loài theo ID' })
    @ApiResponse({ status: 200, description: 'Thông tin loài', type: Species })
    @ApiResponse({ status: 404, description: 'Không tìm thấy loài' })
    async findOne(@Param('id') id: string): Promise<Species> {
        return this.speciesService.findOne(id);
    }
}
