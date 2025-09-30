import { Injectable, NotFoundException } from '@nestjs/common';
import { Pet } from './pet.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePetDto } from './dto/create-pet.dto';
import { EditPetDto } from './dto/edit-pet.dto';
import { DetailPetDto, OwnerInfoDto, SpeciesInfoDto, BreedInfoDto } from './dto/detail-pet.dto';

@Injectable()
export class PetsService {
    constructor(
        @InjectRepository(Pet)
        private readonly petRepo: Repository<Pet>
    ){}

    async getAllPets(userId?: string, specieId?: string, breedIds?: string[], startPrice?: number, endPrice?: number, sortBy?: string): Promise<Pet[] | (Pet & { isLiked: boolean })[]> {
        let query;

        if (userId) {
            // Query với isLiked
            query = this.petRepo
                .createQueryBuilder('pet')
                .leftJoin(
                    'favorite_pets',
                    'favorite',
                    'favorite.petId = pet.id AND favorite.userId = :userId',
                    { userId }
                )
                .leftJoinAndSelect('pet.species', 'species')
                .leftJoinAndSelect('pet.breed', 'breed')
                .leftJoinAndSelect('pet.owner', 'owner')
                .addSelect('CASE WHEN favorite.id IS NOT NULL THEN true ELSE false END', 'isLiked');
        } else {
            // Query bình thường
            query = this.petRepo.createQueryBuilder('pet')
                .leftJoinAndSelect('pet.species', 'species')
                .leftJoinAndSelect('pet.breed', 'breed')
                .leftJoinAndSelect('pet.owner', 'owner');
        }

        // Áp dụng sắp xếp
        if (sortBy === 'price_asc') {
            query.orderBy('pet.price', 'ASC');
        } else if (sortBy === 'price_desc') {
            query.orderBy('pet.price', 'DESC');
        } else if (sortBy === 'view_desc') {
            query.orderBy('pet.view', 'DESC');
        } else {
            query.orderBy('pet.createdAt', 'DESC');
        }

        if (specieId) {
            query.andWhere('species.id = :specieId', { specieId });
        }

        if (breedIds && breedIds.length > 0) {
            query.andWhere('breed.id IN (:...breedIds)', { breedIds });
        }

        if (startPrice) {
            query.andWhere('pet.price >= :startPrice', { startPrice });
        }

        if (endPrice) {
            query.andWhere('pet.price <= :endPrice', { endPrice });
        }

        if (userId) {
            const pets = await query.getRawAndEntities();
            return pets.entities.map((pet, index) => ({
                ...pet,
                isLiked: pets.raw[index].isLiked === true || pets.raw[index].isLiked === 'true',
            }));
        } else {
            return query.getMany();
        }
    }

    async getMyFavoritePet(userId: string): Promise<(Pet & { isLiked: boolean })[]> {
        const pets = await this.petRepo
            .createQueryBuilder('pet')
            .innerJoin('favorite_pets', 'favorite', 'favorite.petId = pet.id AND favorite.userId = :userId', { userId })
            .leftJoinAndSelect('pet.species', 'species')
            .leftJoinAndSelect('pet.breed', 'breed')
            .leftJoinAndSelect('pet.owner', 'owner')
            .orderBy('pet.createdAt', 'DESC')
            .getMany();

        return pets.map(pet => ({
            ...pet,
            isLiked: true,
        }));
    }

    async getSimilarPets(breedId: string): Promise<Pet[]> {
        return this.petRepo.find({
            where: {breedId: breedId},
            relations: ['species', 'breed', 'owner']
        });
    }

    async findById(id: string): Promise<Pet> {
        const exitsPet = await this.petRepo.findOne({
            where: {id: id},
            relations: ['species', 'breed', 'owner']
        });

        if(!exitsPet) throw new NotFoundException('Pet not found');

        return exitsPet;
    }

    async getDetailById(id: string): Promise<DetailPetDto> {
        const pet = await this.petRepo.findOne({
            where: { id },
            relations: ['species', 'breed', 'owner']
        });

        if (!pet) {
            throw new NotFoundException(`Không tìm thấy thú cưng với ID: ${id}`);
        }

        // Map entity sang DTO với cấu trúc nested
        const ownerInfo: OwnerInfoDto = {
            id: pet.ownerId,
            name: pet.owner?.name || '',
            avatar: pet.owner?.avatar || undefined,
            phone: pet.owner?.phone || undefined,
            email: pet.owner?.email || undefined,
            address: pet.owner?.address || undefined,
            rating: pet.owner?.rating || 0,
            verified: true, // Có thể thêm field verified vào User entity sau
            memberSince: pet.owner?.createdAt || new Date()
        };

        const speciesInfo: SpeciesInfoDto = {
            id: pet.speciesId,
            nameVi: pet.species?.name_vi || '',
            nameEn: pet.species?.name_en || ''
        };

        let breedInfo: BreedInfoDto | undefined = undefined;
        if (pet.breed) {
            breedInfo = {
                id: pet.breedId!,
                nameVi: pet.breed.name_vi,
                nameEn: pet.breed.name_en
            };
        }

        const detailPet: DetailPetDto = {
            id: pet.id,
            name: pet.name,
            age: pet.age,
            ageUnit: pet.ageUnit,
            gender: pet.gender,
            weight: pet.weight || 0,
            description: pet.description,
            images: pet.images,
            species: speciesInfo,
            breed: breedInfo,
            customBreedName: pet.customBreedName,
            vaccinated: pet.vaccinated,
            isForRehoming: pet.isForRehoming,
            transactionType: pet.transactionType,
            price: pet.price,
            rating: pet.rating,
            view: pet.view,
            owner: ownerInfo,
            createdAt: pet.createdAt,
            updatedAt: pet.updatedAt
        };

        return detailPet;
    }

    async getPetByUser(userId: string): Promise<Pet[]> {
        const pets = await this.petRepo.find({
            where: {ownerId: userId},
            relations: ['species', 'breed']
        });

        return pets;
    }

    async create(data: CreatePetDto, ownerId: string): Promise<Pet> {
        const pet = this.petRepo.create({...data, ownerId});
        await this.petRepo.save(pet);
        
        return pet;
    }

    async edit(data: EditPetDto): Promise<Pet> {
        const exitsPet = await this.findById(data.id);
        
        Object.assign(exitsPet, data);
        
        await this.petRepo.save(exitsPet);
        return exitsPet;
    }

    async toggleStatus(id: string): Promise<Pet> {
        const pet = await this.findById(id);
        
        pet.isAvailableAtSite = !pet.isAvailableAtSite;
        
        await this.petRepo.save(pet);
        return pet;
    }

    async remove(id: string): Promise<Pet> {
        const pet = await this.findById(id)
        await this.petRepo.remove(pet)

        return pet;
    }
}
