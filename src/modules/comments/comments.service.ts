import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { LikesService } from '../likes/likes.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly likesService: LikesService,
  ) {}

  async createComment(
    userId: string,
    postId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const comment = this.commentRepository.create({
      ...createCommentDto,
      userId,
      postId,
    });
    
    return this.commentRepository.save(comment);
  }

  async getCommentsByPost(postId: string): Promise<Comment[]> {
    const comments = await this.commentRepository.find({
      where: { postId, parentId: IsNull() }, // Chỉ lấy comment gốc
      relations: ['user', 'replies', 'replies.user'],
      order: { createdAt: 'DESC' },
    });

    // Thêm thông tin like count cho từng comment
    for (const comment of comments) {
      comment.likeCount = await this.likesService.getLikeCount(comment.id);
      comment.replyCount = comment.replies?.length || 0;

      // Thêm like count cho replies
      if (comment.replies) {
        for (const reply of comment.replies) {
          reply.likeCount = await this.likesService.getLikeCount(reply.id);
        }
      }
    }

    return comments;
  }

  async getRepliesByComment(commentId: string): Promise<Comment[]> {
    const replies = await this.commentRepository.find({
      where: { parentId: commentId },
      relations: ['user'],
      order: { createdAt: 'ASC' },
    });

    // Thêm thông tin like count cho từng reply
    for (const reply of replies) {
      reply.likeCount = await this.likesService.getLikeCount(reply.id);
    }

    return replies;
  }

  async updateComment(
    commentId: string,
    userId: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
    });

    if (!comment) {
      throw new NotFoundException('Comment không tồn tại');
    }

    if (comment.userId !== userId) {
      throw new ForbiddenException('Bạn không có quyền chỉnh sửa comment này');
    }

    Object.assign(comment, updateCommentDto);
    return this.commentRepository.save(comment);
  }

  async deleteComment(commentId: string, userId: string): Promise<void> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
    });

    if (!comment) {
      throw new NotFoundException('Comment không tồn tại');
    }

    if (comment.userId !== userId) {
      throw new ForbiddenException('Bạn không có quyền xóa comment này');
    }

    await this.commentRepository.remove(comment);
  }

  async getCommentById(commentId: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ['user', 'post', 'parent', 'replies'],
    });

    if (!comment) {
      throw new NotFoundException('Comment không tồn tại');
    }

    // Thêm thông tin like count
    comment.likeCount = await this.likesService.getLikeCount(comment.id);
    comment.replyCount = comment.replies?.length || 0;

    return comment;
  }
}
