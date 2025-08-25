import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
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

    async getAll(userId?: string): Promise<DetailPostDto[]> {
        const posts = await this.postsRepo.find({
            relations: [
                'user',
                'pets',
                'pets.breed',
                'pets.species',
                'comments'
            ],
            order: { createdAt: 'DESC' }
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
                avatarUrl: post.user.avatar
            } : {
                id: '',
                name: '',
                avatarUrl: ''
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
        return result;
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
            userId
        });
        return this.postsRepo.save(newPost);
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

    async delete(id: string): Promise<void> {
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
