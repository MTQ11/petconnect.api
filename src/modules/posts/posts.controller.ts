import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Query } from '@nestjs/common';
import { Post as PostEntity } from './post.entity';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import type { ICurrentUser } from 'src/common/interfaces/user.interface';
import { DetailPostDto } from './dto/detail-post.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get()
    @ApiOperation({ summary: 'Lấy danh sách tất cả bài viết với phân trang' })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Trang hiện tại (mặc định là 1)' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Số bài viết trên mỗi trang (mặc định là 10)' })
    async findAll(
        @CurrentUser() currentUser: ICurrentUser,
        @Query('page') page?: number,
        @Query('limit') limit?: number
    ): Promise<{ posts: DetailPostDto[], totalPages: number, currentPage: number, hasMore: boolean }> {
        const pageNumber = page ? Number(page) : 1;
        const pageSize = limit ? Number(limit) : 10;
        
        if(currentUser) {
            return this.postsService.getAll(currentUser.userId, pageNumber, pageSize);
        }else{
            return this.postsService.getAll(undefined, pageNumber, pageSize);
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
    @Put(':id')
    @ApiOperation({ summary: 'Cập nhật bài viết' })
    async update(
        @Param('id') id: string,
        @CurrentUser() currentUser: ICurrentUser,
        @Body() updatePostDto: UpdatePostDto
    ): Promise<PostEntity> {
        return this.postsService.update(id, currentUser.userId, updatePostDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Delete(':id')
    @ApiOperation({ summary: 'Xóa bài viết' })
    async remove(
        @Param('id') id: string,
        @CurrentUser() currentUser: ICurrentUser
    ): Promise<void> {
        return this.postsService.delete(id, currentUser.userId);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'Lấy danh sách bài viết của user' })
    async getPostsByUser(@Param('userId') userId: string): Promise<PostEntity[]> {
        return this.postsService.getPostsByUser(userId);
    }
}
