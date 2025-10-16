export interface ISuccess {
  data: object;
  message: boolean;
  statusCode: number;
}
export const successRes = async (
  data: object,
  statusCode: number = 200,
): Promise<ISuccess> => {
  return {
    statusCode,
    message: true,
    data,
  };
};
