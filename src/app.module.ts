import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { PetsModule } from './modules/pets/pets.module';
import { SpeciesModule } from './modules/species/species.module';
import { PostsModule } from './modules/posts/posts.module';
import { BreedsModule } from './modules/breeds/breeds.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { ReportsModule } from './modules/reports/reports.module';
import { CommentsModule } from './modules/comments/comments.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false
    }),
    UsersModule,
    PetsModule,
    PostsModule,
    SpeciesModule,
    BreedsModule,
    PostsModule,
    ReviewsModule,
    ReportsModule,
    CommentsModule,
    AuthModule,
  ]
})
export class AppModule {}
