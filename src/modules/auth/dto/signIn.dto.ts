import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SignInDto {
    @ApiProperty({ example: 'mtquyen1002@gmail.com', description: 'Email hoặc số điện thoại' })
    @IsString({ message: 'Email hoặc số điện thoại là bắt buộc' })
    username: string;

    @ApiProperty({ example: '111201', description: 'Mật khẩu' })
    @IsString({ message: 'Mật khẩu là bắt buộc' })
    password: string;
}