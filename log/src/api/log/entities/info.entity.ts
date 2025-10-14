import { type } from "src/config/enum";
import { Column, CreateDateColumn, Entity, ObjectId, ObjectIdColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class InfoLog {
    @ObjectIdColumn()
    id?: ObjectId

    @Column({ type: 'text' })
    info!: string

    @Column({ type: 'varchar', enum: type, default: type.INFO })
    type?: string

    @CreateDateColumn()
    createdAt?: Date

    @UpdateDateColumn()
    updatedAt?: Date
}
