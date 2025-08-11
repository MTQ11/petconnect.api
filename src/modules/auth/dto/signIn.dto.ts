import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SignInDto {
    @ApiProperty({ example: 'user@example.com hoặc 0987654321', description: 'Email hoặc số điện thoại' })
    @IsString({ message: 'Email hoặc số điện thoại là bắt buộc' })
    username: string;

    @ApiProperty({ description: 'Mật khẩu' })
    @IsString({ message: 'Mật khẩu là bắt buộc' })
    password: string;
}