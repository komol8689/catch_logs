import dotenv from "dotenv";
dotenv.config()

export const config = {
    PORT: Number(process.env.PORT),
    DATABASE: {
        PORT: Number(process.env.DB_PORT),
        HOST: String(process.env.DB_HOST),
        NAME: String(process.env.DB_NAME),
        TYPE: String(process.env.DB_TYPE)
    }
}