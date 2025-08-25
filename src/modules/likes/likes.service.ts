import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './like.entity';
// import { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) { }

  async toggleLike(userId: string, postId: string): Promise<{ liked: boolean; likeCount: number }> {
    // Kiểm tra xem user đã like chưa
    const existingLike = await this.likeRepository.findOne({
      where: {
        userId,
        postId,
      },
    });

    if (existingLike) {
      // Unlike
      await this.likeRepository.remove(existingLike);
      const likeCount = await this.getLikeCount(postId);
      return { liked: false, likeCount };
    } else {
      // Like
      const like = this.likeRepository.create({
        userId,
        postId,
      });
      await this.likeRepository.save(like);
      const likeCount = await this.getLikeCount(postId);
      return { liked: true, likeCount };
    }
  }

  async getLikeCount(postId: string): Promise<number> {
    return this.likeRepository.count({
      where: { postId }
    });
  }

  async isLikedByUser(userId: string, postId: string): Promise<boolean> {
    const like = await this.likeRepository.findOne({
      where: { userId, postId },
    });
    return !!like;
  }

  async getLikesByUser(userId: string): Promise<Like[]> {
    return this.likeRepository.find({
      where: { userId },
      relations: ['post'],
      order: { createdAt: 'DESC' },
    });
  }

  async getLikesByPost(postId: string): Promise<Like[]> {
    return this.likeRepository.find({
      where: {
        postId,
      },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }
}
