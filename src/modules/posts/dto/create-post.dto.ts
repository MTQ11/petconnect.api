import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsArray } from "class-validator";

export class CreatePostDto {

    @ApiProperty({ description: 'Content of the post' })
    @IsString()
    content: string;

    @ApiProperty({ description: 'Array of image URLs', required: false })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    images?: string[];

    @ApiProperty({ description: 'Array of pet IDs', required: false })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    petId?: string[];

    @ApiProperty({ description: 'Location of the post', required: false })
    @IsOptional()
    @IsString()
    location?: string;
}
