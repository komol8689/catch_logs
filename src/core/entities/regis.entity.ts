import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class RegisEntity {
    // -------------------- ID --------------------

    @PrimaryGeneratedColumn()
    id: number;

    // -------------------- FULL NAME --------------------
    @Column({ type: 'varchar', length: 255 })
    full_name: string;

    // -------------------- EMAIL --------------------
    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    // -------------------- PASSWORD --------------------
    @Column({ type: 'varchar', length: 255 })
    hash_password: string;

    // -------------------- AGE --------------------
    @Column({ type: 'int' })
    age: number;

    // -------------------- IS MARRIED --------------------
    @Column({ type: 'boolean', default: false })
    is_married: boolean;

    // -------------------- CREATED AT --------------------
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
