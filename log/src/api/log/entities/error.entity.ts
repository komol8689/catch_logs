import { type } from "src/config/enum";
import { Column, CreateDateColumn, Entity, ObjectId, ObjectIdColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class ErrorLog {
    @ObjectIdColumn()
    id: ObjectId

    @Column({ type: 'text' })
    error: string

    @Column({ type: 'varchar', enum: type, default: type.ERROR })
    type: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
