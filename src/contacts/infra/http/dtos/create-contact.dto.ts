import { OmitType } from '@nestjs/swagger';
import { CreateContact } from '@src/contacts/domain';
import { ContactDto } from './contact.dto';

export class CreateContactDto
  extends OmitType(ContactDto, ['_id'])
  implements CreateContact {}
