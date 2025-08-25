import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { Pet } from './pet.entity';
import { Species } from '../species/species.entity';
import { Breed } from '../breeds/breed.entity';
import { User } from '../users/user.entity';
import { OptionalJwtMiddleware } from 'src/common/middleware/optional-jwt.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Pet, Species, Breed, User])],
  controllers: [PetsController],
  providers: [PetsService]
})
export class PetsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(OptionalJwtMiddleware)
      .forRoutes({
        path: 'pets', method: RequestMethod.GET
      });
  }
}
