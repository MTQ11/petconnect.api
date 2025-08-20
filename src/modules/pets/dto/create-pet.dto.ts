import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNumber, IsEnum, IsOptional, IsArray, IsBoolean, IsUUID } from "class-validator";
import { AgeUnit, Gender, TransactionType } from "../pet.entity";

export class CreatePetDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNumber()
    age: number;

    @ApiProperty()
    @IsEnum(AgeUnit)
    ageUnit: AgeUnit;

    @ApiProperty({ enum: Gender })
    @IsEnum(Gender)
    gender: Gender;

    @ApiProperty()
    @IsNumber()
    weight: number;

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
    @IsBoolean()
    isForRehoming?: boolean;

    @ApiPropertyOptional()
    @IsEnum(TransactionType)
    transactionType: TransactionType;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    price?: number;
}