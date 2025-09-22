import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  // -------------------- ID --------------------

  @PrimaryGeneratedColumn()
  id: number;
  // -------------------- CREATED AT --------------------
  @CreateDateColumn()
  createdAt: Date;

  // -------------------- UPDATED AT --------------------

  @UpdateDateColumn()
  updatedAt: Date;

  // -------------------- DELETED AT --------------------

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;
}
