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
    name_vi: string;

    @Column()
    name_en: string;

    @Column({ nullable: true })
    image_url: string;

    @Column({ nullable: true })
    description_vi: string;

    @Column({ nullable: true })
    description_en: string;
}