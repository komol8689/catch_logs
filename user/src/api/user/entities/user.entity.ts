import { Column, CreateDateColumn, Entity, ObjectIdColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 128 })
    full_name!: string

    @Column({ type: 'varchar', length: 128, unique: true })
    email!: string

    @Column({ type: 'varchar', length: 128 })
    password!: string

    @Column({ type: 'int', })
    age!: number

    @Column({ type: 'boolean', default: false })
    is_married!: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
