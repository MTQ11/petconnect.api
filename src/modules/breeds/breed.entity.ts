import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from "src/common/entities/base.entity";
import { Species } from '../species/species.entity';

@Entity('breeds')
export class Breed extends BaseEntity {
    @Column({ type: 'uuid', name: 'species_id' })
    speciesId: string;

    @ManyToOne(() => Species)
    @JoinColumn({ name: 'species_id' })
    species: Species;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;
}