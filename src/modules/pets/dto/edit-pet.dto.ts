import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNumber, IsEnum, IsOptional, IsArray, IsBoolean, IsUUID } from "class-validator";
import { Gender } from "../pet.entity";

export class EditPetDto {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty()
    @IsString()
    name: string;
    
    @ApiProperty()
    @IsNumber()
    age: number;
    
    @ApiProperty({ enum: Gender })
    @IsEnum(Gender)
    gender: Gender;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    images?: string[];

    @ApiProperty()
    @IsUUID()
    speciesId: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
    breedId?: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    customBreedName?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    vaccinated?: boolean;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    price?: number;
}