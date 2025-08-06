import { Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', nullable: true, name: 'created_by' })
    createdBy: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Column({ type: 'uuid', nullable: true, name: 'updated_by' })
    updatedBy: string;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Column({ type: 'uuid', nullable: true, name: 'deleted_by' })
    deletedBy: string;

    @CreateDateColumn({ name: 'deleted_at' })
    deletedAt: Date;
}