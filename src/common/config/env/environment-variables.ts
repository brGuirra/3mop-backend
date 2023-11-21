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
  DATABASE_URL: string;
}
