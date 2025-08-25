import { Body, Controller, Delete, Get, Param, Post, UseGuards, Query } from '@nestjs/common';
import { Post as PostEntity } from './post.entity';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import type { ICurrentUser } from 'src/common/interfaces/user.interface';
import { DetailPostDto } from './dto/detail-post.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get()
    @ApiOperation({ summary: 'Lấy danh sách tất cả bài viết' })
    async findAll(@CurrentUser() currentUser: ICurrentUser): Promise<DetailPostDto[]> {
        if(currentUser) {
            return this.postsService.getAll(currentUser.userId);
        }else{
            return this.postsService.getAll();
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Post()
    @ApiOperation({ summary: 'Tạo bài viết mới' })
    async create(@CurrentUser() currentUser: ICurrentUser, @Body() post: CreatePostDto): Promise<PostEntity> {
        return this.postsService.create(currentUser.userId, post);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Lấy chi tiết bài viết' })
    async findOne(
        @Param('id') id: string,
        @Query('userId') userId?: string
    ): Promise<PostEntity> {
        return this.postsService.getById(id, userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Delete(':id')
    @ApiOperation({ summary: 'Xóa bài viết' })
    async remove(@Param('id') id: string): Promise<void> {
        return this.postsService.delete(id);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'Lấy danh sách bài viết của user' })
    async getPostsByUser(@Param('userId') userId: string): Promise<PostEntity[]> {
        return this.postsService.getPostsByUser(userId);
    }
}
