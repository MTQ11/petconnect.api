import { Body, Controller, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { Profile } from 'passport';
import { ProfileDto } from './dto/profile.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { ICurrentUser } from 'src/common/interfaces/user.interface';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Get()
    getUsers(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Get('me')
    getMe(@CurrentUser() currentUser: ICurrentUser): Promise<User> {
        return this.usersService.findById(currentUser.userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Get(':id')
    getUserById(@Param('id') id: string): Promise<ProfileDto> {
        return this.usersService.getProfile(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Post()
    createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Put()
    updateUser(@CurrentUser() currentUser: ICurrentUser, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.usersService.update(currentUser.userId, updateUserDto);
    }
}
