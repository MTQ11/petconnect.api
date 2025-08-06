import { Column, Entity, ManyToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { BaseEntity } from "src/common/entities/base.entity";
import { Pet } from "../pets/pet.entity";
import { User } from "../users/user.entity";

export enum PostStatus {
    DRAFT = 'draft',
    PUBLISHED = 'published',
    CLOSED = 'closed'
}

@Entity('posts')
export class Post extends BaseEntity {
    @Column({ type: 'text' })
    content: string;

    @Column('simple-array', { nullable: true })
    images: string[];

    @ManyToMany(() => Pet)
    @JoinTable({
        name: 'post_pets',
        joinColumn: { name: 'post_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'pet_id', referencedColumnName: 'id' },
    })
    pets: Pet[];

    @Column({ type: 'uuid', name: 'user_id' })
    userId: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ nullable: true })
    location: string;

    @Column({
        type: 'enum',
        enum: PostStatus,
        default: PostStatus.DRAFT
    })
    status: PostStatus;
}