import { BaseEntity } from 'src/common/entities/base.entity'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { User } from '../users/user.entity'

enum typeReport {
  post = 'POST',
  user = 'USER',
  pet = 'PET',
}

enum status {
  pending = 'PENDING',
  approved = 'APPROVED',
  rejected = 'REJECTED',
}

@Entity('reports')
export class Report extends BaseEntity {
  @Column({ type: 'uuid', name: 'user_id' })
  userId: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column({ type: 'uuid', name: 'reporter_id' })
  reporterId: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'reporter_id' })
  reporter: User

  @Column({ type: 'enum', enum: typeReport, name: 'target_type' })
  targetType: typeReport

  @Column({ type: 'uuid', name: 'target_id' })
  targetId: string

  @Column({ type: 'text' })
  reason: string

  @Column({ type: 'enum', enum: status, default: status.pending })
  status: status
}