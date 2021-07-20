import { Column, CreateDateColumn, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";



export class Access {
    @PrimaryColumn()
    readonly id: string

    @Column()
    alphanumeric: string

    @Column()
    checkin: Date

    @Column()
    checkout: Date

    @Column()
    is_active: boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @Column()
    user_id: string

    @JoinColumn({name: 'user_id'})
    @ManyToOne(() => User)
    user: User
}