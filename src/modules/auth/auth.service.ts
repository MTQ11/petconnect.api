import { Injectable, UnauthorizedException, BadRequestException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.tdo';
import { jwtConstants } from './constants';
import { User } from '../users/user.entity';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string) {
        const user = await this.usersService.findOneWithPassword(username);
        if (!user) return null;

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return null;

        const { password: userPassword, ...result } = user;

        return result;
    }

    async login(user: any): Promise<any> {
        const payload = { sub: user.id, username: user.email || user.phone };
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                avatar: user.avatar,
                rating: user.rating,
                social_login: user.social_login,
                address: user.address,
                description: user.description,
                verified: user.verified,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async register(registerDto: RegisterDto): Promise<any> {
        const { email, phone, password, name } = registerDto;

        // Kiểm tra xem email hoặc phone có được cung cấp hay không
        if (!email && !phone) {
            throw new BadRequestException('Email hoặc số điện thoại là bắt buộc');
        }

        // Kiểm tra người dùng đã tồn tại hay chưa
        const identifier = email || phone;
        if (identifier) {
            const existingUser = await this.usersService.findOne(identifier);
            if (existingUser) {
                throw new ConflictException('Người dùng với email hoặc số điện thoại này đã tồn tại');
            }
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Tạo user mới
        const userData = {
            name,
            password: hashedPassword,
            ...(email && { email }),
            ...(phone && { phone }),
        };

        const newUser = await this.usersService.create(userData);

        // Tạo JWT token
        const payload = { sub: newUser.id, username: newUser.email || newUser.phone };

        return {
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
                avatar: newUser.avatar,
                rating: newUser.rating,
                social_login: newUser.social_login,
                address: newUser.address,
            },
            access_token: await this.jwtService.signAsync(payload, {
                secret: jwtConstants.secret,
                expiresIn: '7d'
            }),
        };
    }

}
