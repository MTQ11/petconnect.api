import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "src/common/entities/base.entity";
import { User } from "../users/user.entity";
import { Pet } from "../pets/pet.entity";

@Entity('favorite_pets')
export class FavoritePet extends BaseEntity {
    @Column({ type: 'uuid', name: 'user_id' })
    userId: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ type: 'uuid', name: 'pet_id' })
    petId: string;

    @ManyToOne(() => Pet)
    @JoinColumn({ name: 'pet_id' })
    pet: Pet;
}
