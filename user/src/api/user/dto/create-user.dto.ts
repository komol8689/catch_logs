import { Type } from 'class-transformer'
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword } from 'class-validator'

export class CreateUserDto {
    // -------------------- FULL NAME --------------------
    @IsString()
    @Type(() => String)
    @IsNotEmpty()
    full_name: string

    // -------------------- EMAIL --------------------
    @IsEmail()
    @IsNotEmpty()
    email: string

    // -------------------- PASSWORD --------------------
    @IsStrongPassword()
    @Type(() => String)
    @IsNotEmpty()
    password: string

    // -------------------- AGE --------------------
    @IsNumber()
    @Type(() => Number)
    @IsNotEmpty()
    age: number

    // -------------------- IS MARRIED --------------------
    @IsBoolean()
    @Type(() => Boolean)
    @IsNotEmpty()
    is_married: boolean
}
