import { Global, Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';

// Helpers
import { validate } from './env';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.${process.env.NODE_ENV}.env`,
      validate,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
