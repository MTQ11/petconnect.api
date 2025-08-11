import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity('species')
export class Species extends BaseEntity {
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