import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@src/common';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly HEADER_KEY = 'x-api-key';

  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const apiKey = req.headers[this.HEADER_KEY];

    if (!apiKey) {
      throw new UnauthorizedException('API Key is missing');
    }

    if (apiKey !== this.configService.get('FRONTEND_API_KEY')) {
      throw new UnauthorizedException('Invalid API Key');
    }

    return true;
  }
}
