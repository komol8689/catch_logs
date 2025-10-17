import { Entity, ObjectIdColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm";
import { ObjectId } from "mongodb";
import { type } from "src/config/enum";

@Entity('error')
export class ErrorLog {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column({ enum: type, default: type.INFO })
    info: string;

    @Column()
    type: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @BeforeInsert()
    setCreatedAt() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @BeforeUpdate()
    setUpdatedAt() {
        this.updatedAt = new Date();
    }
}
