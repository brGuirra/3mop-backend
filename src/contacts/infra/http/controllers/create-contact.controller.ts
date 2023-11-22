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
import { CreateContactService } from '@src/contacts/services';
import { CreateContactDto } from '../dtos';

@Controller('v1/contacts')
@ApiTags('Contacts')
export class CreateContactController {
  constructor(
    @Inject(CreateContactService)
    private readonly createContactUseCase: CreateContactService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiOperation({
    summary: 'Create a contact',
    description: 'Create a contact',
    operationId: 'CreateContact',
  })
  @ApiCreatedResponse({
    description: 'Squad created',
  })
  @ApiConflictResponse({
    description: 'Conflict error',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Validation error',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async execute(@Body() data: CreateContactDto): Promise<any> {
    return this.createContactUseCase.execute(data);
  }
}
