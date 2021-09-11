import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";


@Entity('TempUser')
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
  
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}