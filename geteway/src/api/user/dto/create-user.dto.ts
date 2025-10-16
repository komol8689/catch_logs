import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {
    @ApiProperty({ type: 'string', example: 'John Doe', description: 'User full name' })
    full_name: string

    @ApiProperty({ type: 'string', example: 'www.example@gmail.com', description: 'User email' })
    email: string

    @ApiProperty({ type: 'string', example: 'JohnDoe!@123', description: 'User password' })
    password: string

    @ApiProperty({ type: 'number', example: 28, description: 'User age' })
    age: number

    @ApiProperty({ type: 'boolean', example: true, description: 'User is married' })
    is_married: boolean
}
