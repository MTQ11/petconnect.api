import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SocialLoginProvider } from '../user.entity';

export class CreateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiPropertyOptional()
  avatar?: string;

  @ApiPropertyOptional()
  rating?: number;

  @ApiPropertyOptional()
  social_login?: SocialLoginProvider;

  @ApiPropertyOptional()
  address?: string;
}
