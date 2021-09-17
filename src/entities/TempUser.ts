import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity('tempusers')
export class TempUser {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  registration: string;

  @Column()
  cpf: string;

  @Column()
  username: string;

  @Column()
  email: string;
  
  @Column()
  avatar: string;

  @Column()
  role: string;

  @Column()
  confirmation_token: string
  
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}