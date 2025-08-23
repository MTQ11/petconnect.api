import { Test, TestingModule } from '@nestjs/testing';
import { FavoritePetService } from './favorite-pet.service';

describe('FavoritePetService', () => {
  let service: FavoritePetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoritePetService],
    }).compile();

    service = module.get<FavoritePetService>(FavoritePetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
