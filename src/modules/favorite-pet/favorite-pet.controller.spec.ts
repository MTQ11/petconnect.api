import { Test, TestingModule } from '@nestjs/testing';
import { FavoritePetController } from './favorite-pet.controller';

describe('FavoritePetController', () => {
  let controller: FavoritePetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoritePetController],
    }).compile();

    controller = module.get<FavoritePetController>(FavoritePetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
