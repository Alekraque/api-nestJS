import { ClientEntity } from 'src/clients/entities/client.entity'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  telefone: string

  @Column()
  cpf: string

  @Column()
  role: string

  @Column()
  password: string

  @CreateDateColumn()
  create_at: string

  @UpdateDateColumn()
  update_at: string

  @OneToMany(() => ClientEntity, (user) => user.user)
  @JoinColumn({ name: 'id', referencedColumnName: 'user_id' })
  client: ClientEntity[]
}
