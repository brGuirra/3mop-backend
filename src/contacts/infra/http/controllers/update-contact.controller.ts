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
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { UpdateContactService } from '@src/contacts/services';
import { plainToInstance } from 'class-transformer';
import { ContactDto, UpdateContactDto } from '../dtos';

@Controller('v1/contacts')
@ApiTags('Contacts')
export class UpdateContactController {
  constructor(
    @Inject(UpdateContactService)
    private readonly updateContactService: UpdateContactService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Put('{id}')
  @ApiOperation({
    summary: 'Update a contact',
    description: 'Update a contact',
    operationId: 'UpdateContact',
  })
  @ApiOkResponse({
    description: 'Updated contact',
    type: () => ContactDto,
  })
  @ApiNotFoundResponse({
    description: 'Contact not found',
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
  async execute(
    @Param('id') id: string,
    @Body() data: UpdateContactDto,
  ): Promise<ContactDto> {
    const updatedContact = await this.updateContactService.execute(id, data);

    return plainToInstance(ContactDto, updatedContact);
  }
}
