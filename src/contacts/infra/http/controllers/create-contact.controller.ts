import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { APIError, UnprocessableEntityErrorDto } from '@src/common/swagger';
import { CreateContactService } from '@src/contacts/services';
import { ContactDto, CreateContactDto } from '../dtos';

@ApiTags('Contacts')
@ApiSecurity('Api-Key')
@Controller('v1/contacts')
export class CreateContactController {
  constructor(
    @Inject(CreateContactService)
    private readonly createContactService: CreateContactService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiOperation({
    summary: 'Create a contact',
    description: 'Create a contact',
    operationId: 'CreateContact',
  })
  @ApiCreatedResponse({
    description: 'Created contact',
    type: () => ContactDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
    type: () => APIError,
  })
  @ApiConflictResponse({
    description: 'Conflict error',
    type: () => APIError,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Validation error',
    type: () => UnprocessableEntityErrorDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: () => APIError,
  })
  async execute(@Body() data: CreateContactDto): Promise<ContactDto> {
    return this.createContactService.execute(data);
  }
}
