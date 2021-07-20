import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid'
import { Access } from "./Access";

@Entity('users')
export class User {
  @PrimaryColumn()
  readonly id: string

  @Column()
  username: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  avatar: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @OneToMany(() => Access, access => access.user, {
    onDelete: 'CASCADE'
  })
  accesses: Access[]

  constructor() {
    if(!this.id) this.id = uuid()
  }
  
}