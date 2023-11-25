import { OmitType } from '@nestjs/swagger';
import { SearchAddressResult } from '@src/addresses/domain/models';
import { AddressDto } from '@src/contacts/infra/http';

export class SearchAddressResultDto
  extends OmitType(AddressDto, ['buildingNumber'])
  implements SearchAddressResult {}
