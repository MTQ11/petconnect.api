import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "src/common/entities/base.entity";
import { Species } from "../species/species.entity";
import { Breed } from "../breeds/breed.entity";

export enum Gender {
    MALE = 'male',
    FEMALE = 'female'
}

@Entity('pets')
export class Pet extends BaseEntity {
    @Column()
    name: string;

    @Column()
    age: number;

    @Column({
        type: 'enum',
        enum: Gender,
    })
    gender: Gender;

    @Column()
    description: string;

    @Column('simple-array', { nullable: true })
    images: string[];

    @Column({ type: 'uuid', name: 'species_id' })
    speciesId: string;

    @ManyToOne(() => Species)
    @JoinColumn({ name: 'species_id' })
    species: Species;

    @Column({ type: 'uuid', name: 'breed_id', nullable: true })
    breedId: string;

    @ManyToOne(() => Breed)
    @JoinColumn({ name: 'breed_id' })
    breed: Breed;
    
    @Column({ name: 'custom_breed_name', nullable: true })
    customBreedName: string;

    @Column({ default: false })
    vaccinated: boolean;

    @Column({type: 'float', nullable: true})
    price: number;

    @Column({ type: 'float', default: 0, nullable: true })
    rating: number;
}