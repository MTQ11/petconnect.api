import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { User } from "../users/user.entity";
import { BaseEntity } from "src/common/entities/base.entity";
import { createDefaultLayoutConfig } from "./dto/layout-config.dto";

@Entity('user_site')
export class UserSite extends BaseEntity {
    @Column({ name: "user_id" })
    userId: string;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column({ name: "sub_domain" })
    subDomain: string;

    @Column({ name: "is_active", default: true })
    isActive: boolean;

    @Column({ name: "layout_config", type: "json", nullable: true, default: () => JSON.stringify(createDefaultLayoutConfig()) })
    layoutConfig: JSON;
}