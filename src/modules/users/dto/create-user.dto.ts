import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SocialLoginProvider } from '../user.entity';

export class CreateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;
  
  @ApiProperty()
  name?: string;

  @ApiPropertyOptional()
  avatar?: string;

  @ApiPropertyOptional()
  rating?: number;

  @ApiPropertyOptional()
  social_login?: SocialLoginProvider;

  @ApiPropertyOptional()
  address?: string;
}
