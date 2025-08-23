
import { Controller, Post, Delete, UseGuards, Param } from '@nestjs/common';
import { FavoritePetService } from './favorite-pet.service';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { User } from '../users/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import type { ICurrentUser } from 'src/common/interfaces/user.interface';

@Controller('favorite-pets')
export class FavoritePetController {
    constructor(private readonly favoritePetService: FavoritePetService) {}

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Post('like/:petId')
    async like(@CurrentUser() currentUser: ICurrentUser, @Param('petId') petId: string) {
        return await this.favoritePetService.like(currentUser.userId, petId);
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Delete('dislike/:petId')
    async dislike(@CurrentUser() currentUser: ICurrentUser, @Param('petId') petId: string) {
        await this.favoritePetService.dislike(currentUser.userId, petId);
        return { success: true };
    }
}
