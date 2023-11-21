import type { DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type {
  ModelDefinition,
  MongooseModuleFactoryOptions,
} from '@nestjs/mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentVariables } from '../config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (
        configService: ConfigService<EnvironmentVariables>,
      ): MongooseModuleFactoryOptions => ({
        uri: configService.get('DATABASE_URL'),
        authSource: 'admin',
      }),
    }),
  ],
})
export class DatabaseModule {
  public static forFeature(models: ModelDefinition[]): DynamicModule {
    return MongooseModule.forFeature(models);
  }
}
