import { IsArray, IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Breed } from 'src/modules/breeds/breed.entity';
import { Species } from 'src/modules/species/species.entity';
import { ApiProperty } from '@nestjs/swagger';

// Enum cho section types
export enum SectionType {
  HEADER = 'header',
  HERO = 'hero',
  PET_LIST = 'pet_list',
  REVIEW = 'review',
  ABOUT = 'about',
  FOOTER = 'footer',
}

// Base class cho section
export abstract class BaseSectionDto {
  @IsNotEmpty()
  @IsEnum(SectionType)
  type: SectionType;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  subtitle?: string;
}

export class HeaderSectionDto extends BaseSectionDto {
  type: SectionType.HEADER = SectionType.HEADER;

  @IsOptional()
  @IsString()
  logoUrl?: string;

  @IsOptional()
  @IsString()
  businessName?: string;
}

// Specific sections (sử dụng enum và initializer)
export class HeroSectionDto extends BaseSectionDto {
  type: SectionType.HERO = SectionType.HERO;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imageUrls?: string[];
}

export class PetListSectionDto extends BaseSectionDto {
  type: SectionType.PET_LIST = SectionType.PET_LIST;

  @IsOptional()
  @IsBoolean()
  isPetFilter?: boolean;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Species)
  species?: Species[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Breed)
  breed?: Breed[];
}

// export class ReviewSectionDto extends BaseSectionDto {
//   type: SectionType.REVIEW = SectionType.REVIEW;

//   @IsOptional()
//   @IsString()
//   content?: string;
// }

export class AboutSectionDto extends BaseSectionDto {
  type: SectionType.ABOUT = SectionType.ABOUT;

  @IsOptional()
  @IsString()
  content?: string;
}

export class FooterSectionDto extends BaseSectionDto {
  type: SectionType.FOOTER = SectionType.FOOTER;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  facebook?: string;

  @IsOptional()
  @IsString()
  zalo?: string;
}

// Union type cho section
export type SectionDto = 
HeaderSectionDto |
HeroSectionDto | 
PetListSectionDto | 
// ReviewSectionDto | 
AboutSectionDto | 
FooterSectionDto;

// Main DTO
export class LayoutConfigDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object, {
    discriminator: {
      property: 'type',
      subTypes: [
        { value: HeaderSectionDto, name: SectionType.HEADER },
        { value: HeroSectionDto, name: SectionType.HERO },
        { value: PetListSectionDto, name: SectionType.PET_LIST },
        // { value: ReviewSectionDto, name: SectionType.REVIEW },
        { value: AboutSectionDto, name: SectionType.ABOUT },
        { value: FooterSectionDto, name: SectionType.FOOTER },
      ],
    },
  })
  @ApiProperty({ type: [Object] })
  sections: SectionDto[];
}

// Function tạo default layout config (plain object khớp với DTO)
export function createDefaultLayoutConfig(): LayoutConfigDto {
  return {
    sections: [
      {
        type: SectionType.HEADER,
        logoUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fwebsite-logo-png&psig=AOvVaw0ufT0LXv7cNZYPkwfHPHpW&ust=1756999013682000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCPiN6cfxvI8DFQAAAAAdAAAAABAK',
        businessName: 'My Pet Shop',
      },
      {
        type: SectionType.HERO,
        title: 'Welcome to My Pet Site',
        subtitle: 'Discover amazing pets',
        imageUrls: [],
      },
      {
        type: SectionType.PET_LIST,
        isPetFilter: true,
        species: [],
        breed: [],
      },
      {
        type: SectionType.ABOUT,
        title: 'About Me',
        content: 'This is a default about section.',
      },
      {
        type: SectionType.FOOTER,
        phone: '0123-456-789',
        email: 'user@example.com',
      },
    ],
  };
}