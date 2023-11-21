import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './common/config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const configService =
    app.get<ConfigService<EnvironmentVariables>>(ConfigService);

  app.useLogger(app.get(Logger));

  await app.listen(configService.get('APP_PORT') || 4000);
}

void bootstrap();
