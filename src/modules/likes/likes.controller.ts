import { 
  Controller, 
  Post, 
  Delete,
  Get,
  Body, 
  Param, 
  UseGuards 
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { LikesService } from './likes.service';
// import { CreateLikeDto } from './dto/create-like.dto';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import type { ICurrentUser } from 'src/common/interfaces/user.interface';
import { Like } from './like.entity';

@ApiTags('Likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('toggle')
  @ApiOperation({ summary: 'Toggle like/unlike cho post' })
  async toggleLike(
    @CurrentUser() currentUser: ICurrentUser,
    @Body('postId') postId: string,
  ): Promise<{ liked: boolean; likeCount: number }> {
    return this.likesService.toggleLike(currentUser.userId, postId);
  }

  @Get(':postId/count')
  @ApiOperation({ summary: 'Lấy số lượng like của bài viết' })
  async getLikeCount(
    @Param('postId') postId: string,
  ): Promise<{ count: number }> {
    const count = await this.likesService.getLikeCount(postId);
    return { count };
  }

  @Get(':postId')
  @ApiOperation({ summary: 'Lấy danh sách người like bài viết' })
  async getLikesByPost(
    @Param('postId') postId: string,
  ): Promise<Like[]> {
    return this.likesService.getLikesByPost(postId);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('user/my-likes')
  @ApiOperation({ summary: 'Lấy danh sách bài viết đã like của user' })
  async getMyLikes(
    @CurrentUser() currentUser: ICurrentUser,
  ): Promise<Like[]> {
    return this.likesService.getLikesByUser(currentUser.userId);
  }
}
