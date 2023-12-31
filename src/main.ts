import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { EnvironmentVariables } from './common/config';
import { setupSwagger } from './common/swagger';
import { AuthGuard } from './auth/guards';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: true,
  });
  const configService =
    app.get<ConfigService<EnvironmentVariables>>(ConfigService);

  app.useLogger(app.get(Logger));

  app.setGlobalPrefix('api');

  setupSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      validationError: {
        target: true,
        value: true,
      },
    }),
  );

  app.useGlobalGuards(new AuthGuard(configService));

  await app.listen(configService.get('APP_PORT') || 4000);
}

void bootstrap();
