import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsArray } from 'class-validator';

export class UpdatePostDto {
    @ApiProperty({ description: 'Nội dung bài viết', required: false })
    @IsOptional()
    @IsString()
    content?: string;

    @ApiProperty({ description: 'URL ảnh bài viết (sẽ được chuyển thành array)', required: false })
    @IsOptional()
    @IsString()
    imageUrl?: string;

    @ApiProperty({ description: 'Vị trí', required: false })
    @IsOptional()
    @IsString()
    location?: string;
}