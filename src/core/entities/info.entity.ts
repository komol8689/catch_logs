import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('info')
export class InfoEntity extends BaseEntity {
  @Column({ type: 'json' })
  data: object;

  @Column({ type: 'int' })
  statusCode: number;
}
