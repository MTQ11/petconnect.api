import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class OptionalJwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const user = this.jwtService.verify(token);
        req.user = {
          userId: user.sub,
          username: user.username,
          iat: user.iat,
          exp: user.exp,
        };
      } catch (error) {
        req.user = undefined;
      }
    }
    next();
  }
}
