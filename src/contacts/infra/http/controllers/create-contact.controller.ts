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
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { APIError, UnprocessableEntityErrorDto } from '@src/common/swagger';
import { CreateContactService } from '@src/contacts/services';
import { ContactDto, CreateContactDto } from '../dtos';

@Controller('v1/contacts')
@ApiTags('Contacts')
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