import { Controller, Get, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { APIError } from '@src/common/swagger';
import { ListContactsService } from '@src/contacts/services';
import { ContactDto } from '../dtos';

@Controller('v1/contacts')
@ApiTags('Contacts')
export class ListContactsController {
  constructor(
    @Inject(ListContactsService)
    private readonly listContactsService: ListContactsService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiOperation({
    summary: 'List contacts',
    description: 'List contacts',
    operationId: 'ListContacts',
  })
  @ApiOkResponse({
    description: 'Contacts list',
    type: () => ContactDto,
    isArray: true,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: () => APIError,
  })
  async execute(): Promise<ContactDto[]> {
    return this.listContactsService.execute();
  }
}
