import { WinstonService } from '../winston/Winston';

export interface ISuccess {
  data: object;
  message: boolean;
  statusCode: number;
}
const winston = new WinstonService();

export const successRes = (
  data: object,
  statusCode: number = 200,
): ISuccess => {

  winston.log('Success Repsonse', { data, statusCode });
  return {
    data,
    message: true,
    statusCode,
  };
};
