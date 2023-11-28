import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Put,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { APIError, UnprocessableEntityErrorDto } from '@src/common/swagger';
import { UpdateContactService } from '@src/contacts/services';
import { ContactDto, UpdateContactDto } from '../dtos';

@Controller('v1/contacts')
@ApiTags('Contacts')
export class UpdateContactController {
  constructor(
    @Inject(UpdateContactService)
    private readonly updateContactService: UpdateContactService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  @ApiOperation({
    summary: 'Update a contact',
    description: 'Update a contact',
    operationId: 'UpdateContact',
  })
  @ApiOkResponse({
    description: 'Updated contact',
    type: () => ContactDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
    type: () => APIError,
  })
  @ApiNotFoundResponse({
    description: 'Contact not found',
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
  async execute(
    @Param('id') id: string,
    @Body() data: UpdateContactDto,
  ): Promise<ContactDto> {
    return this.updateContactService.execute(id, data);
  }
}
