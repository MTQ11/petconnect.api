import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  avatar?: string;

  @ApiPropertyOptional()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional()
  @IsOptional()
  description?: string;
}
