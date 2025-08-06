import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity('species')
export class Species extends BaseEntity {
    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;
}