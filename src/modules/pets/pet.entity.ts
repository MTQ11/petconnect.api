import { Column, Entity, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "src/common/entities/base.entity";
import { Species } from "../species/species.entity";
import { Breed } from "../breeds/breed.entity";
import { User } from "../users/user.entity";

export enum Gender {
    MALE = 'male',
    FEMALE = 'female'
}

export enum AgeUnit {
    YEAR = 'year',
    MONTH = 'month',
    WEEK = 'week'
}

export enum TransactionType {
    NOT_SELL = "not_sell",
    SELL = "sell",
    EXCHANGE = "exchange",
    ADOPT = "adopt",
    LOST = "lost",
    FOUND = "found"
}

@Entity('pets')
export class Pet extends BaseEntity {
    @Column()
    name: string;

    @Column()
    age: number;

    @Column({ name: 'age_unit', default: AgeUnit.YEAR })
    ageUnit: AgeUnit;

    @Column({
        type: 'enum',
        enum: Gender,
    })
    gender: Gender;

    @Column({ type: 'float', nullable: true })
    weight: number;

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

    @Column({ default: true })
    vaccinated: boolean;

    @Column({ name: 'is_for_rehoming', default: false })
    isForRehoming: boolean;

    @Column({ name: 'transaction_type', default: TransactionType.NOT_SELL })
    transactionType: TransactionType;

    @Column({ type: 'float', nullable: true })
    price: number;

    @Column({ type: 'float', default: 0, nullable: true })
    rating: number;

    @Column({ type: 'int', default: 0 })
    view: number;

    @Column({ type: 'uuid', name: 'owner_id' })
    ownerId: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'owner_id' })
    owner: User;
}