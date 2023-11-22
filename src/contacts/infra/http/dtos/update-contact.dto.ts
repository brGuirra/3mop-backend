import { PartialType } from '@nestjs/swagger';
import { UpdateContact } from '@src/contacts/domain';
import { CreateContactDto } from './create-contact.dto';

export class UpdateContactDto
  extends PartialType(CreateContactDto)
  implements UpdateContact {}
