import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, MinLength, ValidateIf, Matches } from "class-validator";

export class RegisterDto {
    @ApiProperty({ description: 'Tên người dùng' })
    @IsString({ message: 'Tên phải là chuỗi ký tự' })
    name: string;

    @ApiProperty({ required: false, description: 'Email (bắt buộc nếu không có số điện thoại)' })
    @IsOptional()
    @ValidateIf(o => !o.phone || o.email)
    @IsEmail({}, { message: 'Email không hợp lệ' })
    email?: string;

    @ApiProperty({ required: false, description: 'Số điện thoại (bắt buộc nếu không có email)' })
    @IsOptional()
    @ValidateIf(o => !o.email || o.phone)
    @IsString({ message: 'Số điện thoại phải là chuỗi ký tự' })
    @Matches(/^[0-9]{10,11}$/, { message: 'Số điện thoại phải có 10-11 chữ số' })
    phone?: string;

    @ApiProperty({ description: 'Mật khẩu' })
    @IsString({ message: 'Mật khẩu phải là chuỗi ký tự' })
    @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
    password: string;
}