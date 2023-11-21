import type { DynamicModule } from '@nestjs/common';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type {
  ModelDefinition,
  MongooseModuleFactoryOptions,
} from '@nestjs/mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentVariables } from '../config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (
        configService: ConfigService<EnvironmentVariables>,
      ): MongooseModuleFactoryOptions => ({
        uri: configService.get('DATABASE_URL'),
      }),
    }),
  ],
})
export class DatabaseModule {
  public static forFeature(models: ModelDefinition[]): DynamicModule {
    return MongooseModule.forFeature(models);
  }
}
