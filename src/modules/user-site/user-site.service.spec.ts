import { Test, TestingModule } from '@nestjs/testing';
import { UserSiteService } from './user-site.service';

describe('UserSiteService', () => {
  let service: UserSiteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSiteService],
    }).compile();

    service = module.get<UserSiteService>(UserSiteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
