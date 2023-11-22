import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';

// Models
import { Environments } from './environments';

export class EnvironmentVariables {
  // COMMON
  @IsEnum(Environments)
  NODE_ENV: Environments;

  @IsInt()
  @IsPositive()
  APP_PORT: number;

  // DATABASE
  @IsString()
  @IsNotEmpty()
  DATABASE_NAME: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_USERNAME: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_URL: string;

  @IsString()
  @IsNotEmpty()
  MONGO_EXPRESS_USERNAME: string;

  @IsString()
  @IsNotEmpty()
  MONGO_EXPRESS_PASSWORD: string;

  @IsInt()
  @IsPositive()
  MONGO_EXPRESS_PORT: number;
}
