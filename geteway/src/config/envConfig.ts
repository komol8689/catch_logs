import dotenv from 'dotenv'
dotenv.config()

export interface IConfig {
    PORT: number,
    API_URL: string,
    API_VERSION: string,
    USER_PORT: Number
}

export const config: IConfig = {
    PORT: Number(process.env.PORT),
    API_URL: String(process.env.API_URL),
    API_VERSION: String(process.env.API_VERSION),
    USER_PORT: Number(process.env.USER_PORT)
}