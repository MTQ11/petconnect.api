import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/signIn.dto';
import { RegisterDto } from './dto/register.tdo';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    @ApiBody({ type: SignInDto })
    login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('register')
    @ApiBody({ type: RegisterDto })
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    checkAuth(@Request() req) {
        // req.user được set bởi JwtStrategy.validate
        return req.user;
    }
}
