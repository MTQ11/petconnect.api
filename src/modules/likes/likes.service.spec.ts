import { Test, TestingModule } from '@nestjs/testing';
import { LikesService } from './likes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Like, LikeableType } from './like.entity';
import { Repository } from 'typeorm';

describe('LikesService', () => {
  let service: LikesService;
  let repository: Repository<Like>;

  const mockRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
    count: jest.fn(),
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LikesService,
        {
          provide: getRepositoryToken(Like),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<LikesService>(LikesService);
    repository = module.get<Repository<Like>>(getRepositoryToken(Like));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('toggleLike', () => {
    it('should create like when not exists', async () => {
      const userId = 'user-1';
      const createLikeDto = {
        likeableId: 'post-1',
        likeableType: LikeableType.POST,
      };

      mockRepository.findOne.mockResolvedValue(null);
      mockRepository.create.mockReturnValue(createLikeDto);
      mockRepository.save.mockResolvedValue(createLikeDto);
      mockRepository.count.mockResolvedValue(1);

      const result = await service.toggleLike(userId, createLikeDto);

      expect(result).toEqual({ liked: true, likeCount: 1 });
      expect(mockRepository.create).toHaveBeenCalledWith({
        userId,
        ...createLikeDto,
      });
    });

    it('should remove like when exists', async () => {
      const userId = 'user-1';
      const createLikeDto = {
        likeableId: 'post-1',
        likeableType: LikeableType.POST,
      };
      const existingLike = { id: 'like-1', ...createLikeDto, userId };

      mockRepository.findOne.mockResolvedValue(existingLike);
      mockRepository.remove.mockResolvedValue(existingLike);
      mockRepository.count.mockResolvedValue(0);

      const result = await service.toggleLike(userId, createLikeDto);

      expect(result).toEqual({ liked: false, likeCount: 0 });
      expect(mockRepository.remove).toHaveBeenCalledWith(existingLike);
    });
  });

  describe('getLikeCount', () => {
    it('should return like count', async () => {
      const likeableId = 'post-1';
      const likeableType = LikeableType.POST;

      mockRepository.count.mockResolvedValue(5);

      const result = await service.getLikeCount(likeableId, likeableType);

      expect(result).toBe(5);
      expect(mockRepository.count).toHaveBeenCalledWith({
        where: { likeableId, likeableType },
      });
    });
  });

  describe('isLikedByUser', () => {
    it('should return true when user liked', async () => {
      const userId = 'user-1';
      const likeableId = 'post-1';
      const likeableType = LikeableType.POST;

      mockRepository.findOne.mockResolvedValue({ id: 'like-1' });

      const result = await service.isLikedByUser(userId, likeableId, likeableType);

      expect(result).toBe(true);
    });

    it('should return false when user not liked', async () => {
      const userId = 'user-1';
      const likeableId = 'post-1';
      const likeableType = LikeableType.POST;

      mockRepository.findOne.mockResolvedValue(null);

      const result = await service.isLikedByUser(userId, likeableId, likeableType);

      expect(result).toBe(false);
    });
  });
});
