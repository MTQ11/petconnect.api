import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiProperty({ description: 'Nội dung comment mới' })
  @IsNotEmpty()
  @IsString()
  content: string;
}
