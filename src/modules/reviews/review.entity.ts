import { BaseEntity } from 'src/common/entities/base.entity'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { User } from '../users/user.entity'

@Entity('reviews')
export class Review extends BaseEntity {
  @Column({ type: 'uuid', name: 'user_id' })
  userId: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column({ type: 'uuid', name: 'target_user_id' })
  targetUserId: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'target_user_id' })
  targetUser: User

  @Column({ type: 'float' })
  rating: number

  @Column({ type: 'text' })
  comment: string
}