import { BaseEntity } from 'src/common/entities/base.entity'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { User } from '../users/user.entity'
import { Post } from '../posts/post.entity'

@Entity('comments')
export class Comment extends BaseEntity {
  @Column({ type: 'uuid', name: 'user_id' })
  userId: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column({ type: 'uuid', name: 'post_id' })
  postId: string

  @ManyToOne(() => Post)
  @JoinColumn({ name: 'post_id' })
  post: Post

  @Column({ type: 'text' })
  content: string

  @Column({ type: 'uuid', name: 'parent_id', nullable: true })
  parentId: string

  @ManyToOne(() => Comment, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent: Comment
}