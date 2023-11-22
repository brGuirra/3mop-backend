import { Controller, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ListContactsService } from '@src/contacts/services';
import { ContactDto } from '../dtos/contact.dto';
import { plainToInstance } from 'class-transformer';

@Controller('v1/contacts')
@ApiTags('Contacts')
export class ListContactsController {
  constructor(
    @Inject(ListContactsService)
    private readonly listContactsService: ListContactsService,
  ) {}

  @HttpCode(HttpStatus.OK)
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
  })
  async execute(): Promise<ContactDto[]> {
    const contacts = await this.listContactsService.execute();

    return plainToInstance(ContactDto, contacts);
  }
}
