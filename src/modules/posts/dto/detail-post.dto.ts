import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DetailPostDto {
    @ApiProperty()
    @Expose()
    id: string;

    @ApiProperty()
    @Expose()
    content: string;

    @ApiProperty({ type: [String] })
    @Expose()
    images: string[];

    @ApiProperty()
    @Expose()
    createdAt: Date;

    @ApiProperty()
    @Expose()
    updatedAt: Date;

    @ApiProperty({
        type: 'object',
        properties: {
            id: { type: 'string' },
            username: { type: 'string' },
            avatar: { type: 'string' }
        }
    })
    @Expose()
    user: {
        id: string;
        name: string;
        avatar: string;
    };

    @ApiProperty({
        type: 'array',
        items: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                breed_vi: { type: 'string' },
                breed_en: { type: 'string' },
                species_vi: { type: 'string' },
                species_en: { type: 'string' },
                images: { type: 'array', items: { type: 'string' } },
                price: { type: 'number' }
            }
        }
    })
    @Expose()
    pets: {
        id: string;
        name: string;
        breed_vi: string;
        breed_en: string;
        species_vi: string;
        species_en: string;
        images: string[];
    }[];

    @ApiProperty()
    @Expose()
    likeCount: number;

    @ApiProperty()
    @Expose()
    commentCount: number;

    @ApiProperty()
    @Expose()
    isLikedByCurrentUser: boolean;
}