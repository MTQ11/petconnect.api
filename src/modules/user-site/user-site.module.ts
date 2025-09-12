import { Module } from '@nestjs/common';
import { UserSiteController } from './user-site.controller';
import { UserSiteService } from './user-site.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSite } from './user-site.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserSite, User])],
  controllers: [UserSiteController],
  providers: [UserSiteService]
})
export class UserSiteModule {}
