import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ description: 'Nội dung comment' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ description: 'ID của comment cha (cho reply)', required: false })
  @IsOptional()
  @IsString()
  parentId?: string;
}
