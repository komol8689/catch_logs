import { type } from 'src/config/enum';
import { Entity, ObjectIdColumn, ObjectId, Column, BeforeInsert, BeforeUpdate } from 'typeorm';

@Entity('info')
export class InfoLog {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    info: string;

    @Column({ enum: type, default: type.INFO })
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
