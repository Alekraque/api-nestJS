import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("clients")
export class ClientEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
      name: 'user_id',
      type: 'uuid',
      nullable: false
    })
    user_id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    telefone: string

    @CreateDateColumn()
    create_at: string

    @UpdateDateColumn()
    update_at: string

    @OneToMany(() => UserEntity, (user) => user.client)
    @JoinColumn({ name: 'id', referencedColumnName: 'user_id'})
    user: ClientEntity[]
}
