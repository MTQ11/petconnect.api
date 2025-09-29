import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { LikesService } from '../likes/likes.service';
import { Pet } from '../pets/pet.entity';
import { DetailPostDto } from './dto/detail-post.dto';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postsRepo: Repository<Post>,
        private readonly likesService: LikesService,
    ) { }

    async getAll(userId?: string, page: number = 1, limit: number = 10): Promise<{ posts: DetailPostDto[], totalPages: number, currentPage: number, hasMore: boolean }> {
        const skip = (page - 1) * limit;

        const [posts, total] = await this.postsRepo.findAndCount({
            relations: [
                'user',
                'pets',
                'pets.breed',
                'pets.species',
                'comments'
            ],
            order: { createdAt: 'DESC' },
            skip,
            take: limit
        });

        const result: DetailPostDto[] = [];
        for (const post of posts) {
            const likeCount = await this.likesService.getLikeCount(post.id);
            const commentCount = post.comments?.length || 0;
            let isLikedByCurrentUser = false;
            if (userId) {
                isLikedByCurrentUser = await this.likesService.isLikedByUser(userId, post.id);
            }

            // Map user
            const user = post.user ? {
                id: post.user.id,
                name: post.user.name,
                avatar: post.user.avatar
            } : {
                id: '',
                name: '',
                avatar: ''
            };

            // Map pets
            const pets = (post.pets || []).map(pet => ({
                id: pet.id,
                name: pet.name,
                breed_vi: pet.breed?.name_vi || '',
                breed_en: pet.breed?.name_en || '',
                species_vi: pet.species?.name_vi || '',
                species_en: pet.species?.name_en || '',
                images: pet.images || [],
                price: pet.price || 0
            }));

            result.push({
                id: post.id,
                content: post.content,
                images: post.images,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
                user,
                pets,
                likeCount,
                commentCount,
                isLikedByCurrentUser
            });
        }

        const totalPages = Math.ceil(total / limit);
        const hasMore = page < totalPages;

        return {
            posts: result,
            totalPages,
            currentPage: page,
            hasMore
        };
    }

    async create(userId: string, post: CreatePostDto): Promise<Post> {
        // Tách petId và image đúng chuẩn
        const { petId, images: image, ...rest } = post;
        let pets: Pet[] = [];
        if (petId && petId.length > 0) {
            // Lấy danh sách Pet từ DB
            pets = await this.postsRepo.manager.findByIds(Pet, petId);
        }
        const newPost = this.postsRepo.create({
            ...rest,
            images: image,
            pets,
            userId,
        });
        const savedPost = await this.postsRepo.save(newPost);

        const postResult = await this.postsRepo.findOne({
            where: { id: savedPost.id },
            relations: ['user', 'pets']
        });

        if (!postResult) {
            throw new NotFoundException('Post not found after creation');
        }

        return postResult;

    }

    async getById(id: string, userId?: string): Promise<Post> {
        const post = await this.postsRepo.findOne({
            where: { id },
            relations: ['user', 'pets', 'comments', 'comments.user', 'comments.replies']
        });

        if (!post) {
            throw new NotFoundException('Post not found');
        }

        // Thêm thông tin like count và isLiked
        post.likeCount = await this.likesService.getLikeCount(post.id);
        post.commentCount = post.comments?.length || 0;
        if (userId) {
            post.isLikedByCurrentUser = await this.likesService.isLikedByUser(
                userId,
                post.id
            );
        }

        return post;
    }

    async update(id: string, userId: string, updatePostDto: UpdatePostDto): Promise<Post> {
        const post = await this.postsRepo.findOne({
            where: { id },
            relations: ['user']
        });

        if (!post) {
            throw new NotFoundException('Post not found');
        }

        if (post.userId !== userId) {
            throw new ForbiddenException('You can only update your own posts');
        }

        // Chỉ cập nhật những trường được gửi lên
        if (updatePostDto.content !== undefined) {
            post.content = updatePostDto.content;
        }
        if (updatePostDto.imageUrl !== undefined) {
            // Cập nhật array images nếu có imageUrl
            post.images = updatePostDto.imageUrl ? [updatePostDto.imageUrl] : [];
        }
        if (updatePostDto.location !== undefined) {
            post.location = updatePostDto.location;
        }

        post.updatedAt = new Date();

        return await this.postsRepo.save(post);
    }

    async delete(id: string, userId: string): Promise<void> {
        const post = await this.postsRepo.findOne({
            where: { id }
        });

        if (!post) {
            throw new NotFoundException('Post not found');
        }

        if (post.userId !== userId) {
            throw new ForbiddenException('You can only delete your own posts');
        }

        const result = await this.postsRepo.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('Post not found');
        }
    }

    async getPostsByUser(userId: string): Promise<Post[]> {
        const posts = await this.postsRepo.find({
            where: { userId },
            relations: ['user', 'pets', 'comments'],
            order: { createdAt: 'DESC' }
        });

        // Thêm thông tin like count cho từng post
        for (const post of posts) {
            post.likeCount = await this.likesService.getLikeCount(post.id);
            post.commentCount = post.comments?.length || 0;
        }

        return posts;
    }
}
