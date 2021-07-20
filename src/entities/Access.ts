import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";


@Entity('accesses')
export class Access {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    alphanumeric: string;

    @Column()
    checkin: Date;

    @Column()
    checkout: Date;

    @Column()
    is_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    user_id: string;

    @JoinColumn({name: 'user_id'})
    @ManyToOne(() => User, {
        onDelete: 'CASCADE',
    })
    user: User
}