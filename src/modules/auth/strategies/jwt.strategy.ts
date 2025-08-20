import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';
import { ICurrentUser } from 'src/common/interfaces/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // lấy token từ header
      ignoreExpiration: false, // không bỏ qua hạn dùng
      secretOrKey: jwtConstants.secret, // khóa bí mật
    });
  }

  async validate(payload: any): Promise<ICurrentUser> {
    console.log('JWT Strategy - Payload:', payload);
    return { 
      userId: payload.sub,
      username: payload.username,
      iat: payload.iat,
      exp: payload.exp,  
    };
  }
}