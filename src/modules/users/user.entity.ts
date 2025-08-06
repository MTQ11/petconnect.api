import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity } from "typeorm";

export enum SocialLoginProvider {
    GOOGLE = 'google',
    FACEBOOK = 'facebook',
    ZALO = 'zalo',
    LOCAL = 'local',
}

@Entity()
export class User extends BaseEntity {
    @Column()
    name: string;

    @Column({unique: true})
    phone: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    avatar: string;

    @Column({ type: 'float', default: 0, nullable: true })
    rating: number;

    @Column({
        type: 'enum',
        enum: SocialLoginProvider,
        nullable: true,
        default: SocialLoginProvider.LOCAL,
    })
    social_login: SocialLoginProvider;

    @Column({ nullable: true })
    address: string;
}