import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { type } from "src/config/enum";

export class CreateLogDto {
    @IsString()
    @IsEnum(type)
    @IsNotEmpty()
    type: type

    @IsString()
    @IsNotEmpty()
    info: string
}
