import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Post } from '../posts/post.entity';
import { Pet } from '../pets/pet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Pet])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
