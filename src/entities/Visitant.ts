import { Column, CreateDateColumn, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";


export class Visitant {
    @PrimaryColumn()
    readonly id: string

    @Column()
    cpf: string

    @Column()
    last_login: Date

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @Column()
    user_id: string

    @JoinColumn({name: 'user_id'})
    @OneToOne(() => User)
    user: User

    constructor() {
        if(!this.id) this.id = uuid()
    }
    
}