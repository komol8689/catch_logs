export interface ISuccess {
    data: object,
    message: boolean,
    statusCode: number
}

export const successRes = (data: object, statusCode: number = 200): ISuccess => {
    return {
        data,
        message: true,
        statusCode
    }
}