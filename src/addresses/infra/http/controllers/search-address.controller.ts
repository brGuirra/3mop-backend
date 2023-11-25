import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
} from '@nestjs/common';
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SearchAdddressService } from '@src/addresses/services';
import { ZipCodeValidationPipe } from '@src/common/pipes';
import { APIError } from '@src/common/swagger';
import { Observable } from 'rxjs';
import { SearchAddressResultDto } from '../dtos';

@Controller('v1/addresses/search')
@ApiTags('Addresses')
export class SearchAddressController {
  constructor(
    @Inject(SearchAdddressService)
    private readonly searchAdddressService: SearchAdddressService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get(':zipCode')
  @ApiParam({
    name: 'zipCode',
    required: true,
    description: 'CEP do endereço',
    schema: {
      type: 'string',
      pattern: '^\\d{8}$',
    },
  })
  @ApiOperation({
    summary: 'Search a address by zip code',
    description: 'Search a address by zip code',
    operationId: 'SearchAddress',
  })
  @ApiOkResponse({
    description: 'Address data',
    type: () => SearchAddressResultDto,
  })
  @ApiBadRequestResponse({
    description: 'Formato inválido de CEP',
    type: () => APIError,
  })
  @ApiNotFoundResponse({
    description: 'No data found',
    type: () => APIError,
  })
  @ApiBadGatewayResponse({
    description: 'Bad Gateway',
    type: () => APIError,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: () => APIError,
  })
  execute(
    @Param('zipCode', new ZipCodeValidationPipe())
    zipCode: string,
  ): Observable<SearchAddressResultDto> {
    console.log(zipCode);
    return this.searchAdddressService.execute(zipCode);
  }
}
