import { InfoEntity } from '../../core/entities/info.entity';
import { WinstonService } from '../winston/Winston';
import { AppDataSource } from './data-source';

export interface ISuccess {
  data: object;
  message: boolean;
  statusCode: number;
}

const winston = new WinstonService();

export const successRes = async (
  data: object,
  statusCode: number = 200,
): Promise<ISuccess> => {
  // Winston log
  winston.log('Success Response', { data, statusCode });

  // DB ga saqlash
  const repo = AppDataSource.getRepository(InfoEntity);
  const successRecord = repo.create({ data, statusCode });
  await repo.save(successRecord);

  return {
    statusCode,
    message: true,
    data,
  };
};
