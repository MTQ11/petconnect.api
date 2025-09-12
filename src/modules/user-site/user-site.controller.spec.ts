import { Test, TestingModule } from '@nestjs/testing';
import { UserSiteController } from './user-site.controller';

describe('UserSiteController', () => {
  let controller: UserSiteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserSiteController],
    }).compile();

    controller = module.get<UserSiteController>(UserSiteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
