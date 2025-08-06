import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    getUsers(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Post()
    @ApiOperation({ summary: 'Tạo người dùng mới' })
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }
}
