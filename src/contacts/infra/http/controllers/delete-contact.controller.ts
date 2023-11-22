import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteContactService } from '@src/contacts/services';

@Controller('v1/contacts')
@ApiTags('Contacts')
export class DeleteContactController {
  constructor(
    @Inject(DeleteContactService)
    private readonly deleteContactService: DeleteContactService,
  ) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('{id}')
  @ApiOperation({
    summary: 'Delete a contact by its id',
    description: 'Delete a contact by its id',
    operationId: 'DeleteContact',
  })
  @ApiNoContentResponse({
    description: 'Contact deleted',
  })
  @ApiNotFoundResponse({
    description: 'Contact not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async execute(@Param('id') id: string): Promise<void> {
    await this.deleteContactService.execute(id);
  }
}
