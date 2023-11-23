import { HttpStatus } from '@nestjs/common';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class APIError {
  @ApiProperty({
    type: 'string',
    description: 'Error message',
    example: 'document not found',
  })
  message: string;
  @ApiProperty({
    type: 'string',
    description: 'Error name',
    example: 'Not Found',
  })
  error: string;
  @ApiProperty({
    type: 'integer',
    description: 'Status code of the error',
    example: HttpStatus.NOT_FOUND,
  })
  statusCode: number;
}

export class UnprocessableEntityErrorDto extends OmitType(APIError, [
  'message',
]) {
  @ApiProperty({
    type: 'string',
    description: 'Error message',
    example: ['name cannot be empty'],
    isArray: true,
  })
  message: string[];
}
