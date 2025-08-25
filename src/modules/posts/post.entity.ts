import { Column, Entity, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { BaseEntity } from "src/common/entities/base.entity";
import { Pet } from "../pets/pet.entity";
import { User } from "../users/user.entity";
import { Comment } from "../comments/comment.entity";
import { Like } from "../likes/like.entity";

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

    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[];

    // Note: Likes sẽ được load thông qua service
    likes?: Like[];

    // Virtual fields for counts
    commentCount?: number;
    likeCount?: number;
    isLikedByCurrentUser?: boolean;
}