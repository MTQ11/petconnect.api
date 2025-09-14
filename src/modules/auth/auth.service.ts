import { Injectable, UnauthorizedException, BadRequestException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { jwtConstants } from './constants';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { SocialLoginProvider } from '../users/user.entity';

@Injectable()
export class AuthService {
    private googleClient: OAuth2Client;

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {
        const env = this.configService.get('NODE_ENV');
        this.googleClient = new OAuth2Client(this.configService.get('GOOGLE_CLIENT_ID'));
    }

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

    async loginWithGoogle(idToken: string): Promise<any> {
        try {
            const googleUser = await this.validateGoogleToken(idToken);
            if (!googleUser) throw new UnauthorizedException('Google user validation failed');

            let user = await this.usersService.findByGoogleId(googleUser.googleId);
            if (!user) {
                user = await this.usersService.findOne(googleUser.email);

                if (!user) {
                    user = await this.usersService.create({
                        name: googleUser.name,
                        email: googleUser.email,
                        avatar: googleUser.picture,
                        google_id: googleUser.googleId,
                        verified: googleUser.emailVerified,
                        social_login: SocialLoginProvider.GOOGLE
                    });
                } else {
                    user = await this.usersService.update(user.id, {
                        google_id: googleUser.googleId,
                        verified: googleUser.emailVerified || user.verified,
                        avatar: user.avatar || googleUser.picture,
                        social_login: user.social_login === SocialLoginProvider.ZALO ? SocialLoginProvider.ALL : SocialLoginProvider.GOOGLE
                    });
                }
            }

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
        } catch (error) {
            console.error('Google login error:', error.message);
            throw error;
        }
    }

    async validateGoogleToken(idToken: string): Promise<any> {
        try {
            const ticket = await this.googleClient.verifyIdToken({
                idToken,
                audience: this.configService.get('GOOGLE_CLIENT_ID'),
            });

            const payload = ticket.getPayload();
            if (!payload) throw new UnauthorizedException('Invalid Google token');

            return {
                googleId: payload.sub,
                email: payload.email,
                emailVerified: payload.email_verified,
                name: payload.name,
                picture: payload.picture,
            };
        } catch (error) {
            throw new UnauthorizedException('Failed to validate Google token');  // Throw lỗi để controller xử lý
        }
    }
}
