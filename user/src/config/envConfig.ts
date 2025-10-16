import dotenv from 'dotenv'
dotenv.config()

export const config = {
    PORT: Number(process.env.PORT),
    DB_URL: String(process.env.DB_URL)
}