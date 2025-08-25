import { 
  Controller, 
  Post, 
  Get, 
  Put, 
  Delete, 
  Body, 
  Param, 
  UseGuards,
  Query
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import type { ICurrentUser } from 'src/common/interfaces/user.interface';
import { Comment } from './comment.entity';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('posts/:postId')
  @ApiOperation({ summary: 'Tạo comment cho bài viết' })
  async createComment(
    @CurrentUser() currentUser: ICurrentUser,
    @Param('postId') postId: string,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    return this.commentsService.createComment(
      currentUser.userId,
      postId,
      createCommentDto,
    );
  }

  @Get('posts/:postId')
  @ApiOperation({ summary: 'Lấy danh sách comment của bài viết' })
  async getCommentsByPost(
    @Param('postId') postId: string,
  ): Promise<Comment[]> {
    return this.commentsService.getCommentsByPost(postId);
  }

  @Get(':commentId/replies')
  @ApiOperation({ summary: 'Lấy danh sách reply của comment' })
  async getRepliesByComment(
    @Param('commentId') commentId: string,
  ): Promise<Comment[]> {
    return this.commentsService.getRepliesByComment(commentId);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Put(':commentId')
  @ApiOperation({ summary: 'Cập nhật comment' })
  async updateComment(
    @CurrentUser() currentUser: ICurrentUser,
    @Param('commentId') commentId: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    return this.commentsService.updateComment(
      commentId,
      currentUser.userId,
      updateCommentDto,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete(':commentId')
  @ApiOperation({ summary: 'Xóa comment' })
  async deleteComment(
    @CurrentUser() currentUser: ICurrentUser,
    @Param('commentId') commentId: string,
  ): Promise<void> {
    return this.commentsService.deleteComment(commentId, currentUser.userId);
  }

  @Get(':commentId')
  @ApiOperation({ summary: 'Lấy thông tin chi tiết comment' })
  async getCommentById(
    @Param('commentId') commentId: string,
  ): Promise<Comment> {
    return this.commentsService.getCommentById(commentId);
  }
}
