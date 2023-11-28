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
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { APIError } from '@src/common/swagger';
import { FindContactService } from '@src/contacts/services';
import { ContactDto } from '../dtos';

@Controller('v1/contacts')
@ApiTags('Contacts')
export class FindContactController {
  constructor(
    @Inject(FindContactService)
    private readonly findContactService: FindContactService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @ApiOperation({
    summary: 'Find a contact by its id',
    description: 'Find a contact by its id',
    operationId: 'FindContact',
  })
  @ApiOkResponse({
    description: 'Contact data',
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
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: () => APIError,
  })
  async execute(@Param('id') id: string): Promise<ContactDto> {
    return this.findContactService.execute(id);
  }
}
