import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from './post.entity';
import { LikesModule } from '../likes/likes.module';
import { Pet } from '../pets/pet.entity';
import { OptionalJwtMiddleware } from 'src/common/middleware/optional-jwt.middleware';
import { User } from '../users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Pet, User]),
    LikesModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(OptionalJwtMiddleware)
      .forRoutes({
        path: 'posts', method: RequestMethod.GET,
      });
  }
}
