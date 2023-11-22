import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FindContactService } from '@src/contacts/services';
import { plainToInstance } from 'class-transformer';
import { ContactDto } from '../dtos';

@Controller('v1/contacts')
@ApiTags('Contacts')
export class FindContactController {
  constructor(
    @Inject(FindContactService)
    private readonly findContactService: FindContactService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get('{id}')
  @ApiOperation({
    summary: 'Find a contact by its id',
    description: 'Find a contact by its id',
    operationId: 'FindContact',
  })
  @ApiOkResponse({
    description: 'Contact data',
    type: () => ContactDto,
  })
  @ApiNotFoundResponse({
    description: 'Contact not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async execute(@Param('id') id: string): Promise<ContactDto> {
    const contact = await this.findContactService.execute(id);

    return plainToInstance(ContactDto, contact);
  }
}
