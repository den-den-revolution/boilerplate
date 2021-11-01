import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import { config } from 'node-config-ts';
import { JwtPayloadInterface } from './jwt-payload.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const { authorization } = request.headers;

    if (!authorization) {
      throw new UnauthorizedException('Authorization header not provided');
    }

    const [type, token] = authorization && authorization.split(' ');

    if (type !== 'Bearer') {
      throw new UnauthorizedException('Use Bearer with auth token');
    }
    try {
      const payload: JwtPayloadInterface = verify(
        token,
        config.auth.secret,
      ) as JwtPayloadInterface;
      request['user'] = { id: payload.id };
      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
